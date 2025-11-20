---
ia-translated: true
title: Introduzindo Hot Reloading
author: Martín Bigio
authorTitle: Software Engineer at Instagram
authorURL: 'https://twitter.com/martinbigio'
authorImageURL: 'https://avatars3.githubusercontent.com/u/535661?v=3&s=128'
authorTwitter: martinbigio
tags: [engineering]
---

O objetivo do React Native é fornecer a melhor experiência possível para desenvolvedores. Uma grande parte disso é o tempo que leva entre você salvar um arquivo e ser capaz de ver as alterações. Nosso objetivo é fazer com que esse ciclo de feedback fique abaixo de 1 segundo, mesmo à medida que seu aplicativo cresce.

Chegamos perto desse ideal através de três recursos principais:

- Usar JavaScript como linguagem que não tem um longo ciclo de tempo de compilação.
- Implementar uma ferramenta chamada Packager que transforma arquivos es6/flow/jsx em JavaScript normal que a VM pode entender. Foi projetada como um servidor que mantém o estado intermediário na memória para permitir mudanças incrementais rápidas e usa vários núcleos.
- Construir um recurso chamado Live Reload que recarrega o aplicativo ao salvar.

Neste ponto, o gargalo para os desenvolvedores não é mais o tempo que leva para recarregar o aplicativo, mas perder o estado do seu aplicativo. Um cenário comum é trabalhar em um recurso que está a várias telas de distância da tela inicial. Toda vez que você recarrega, você tem que clicar no mesmo caminho repetidas vezes para voltar ao seu recurso, tornando o ciclo de vários segundos.

## Hot Reloading

A ideia por trás do hot reloading é manter o aplicativo rodando e injetar novas versões dos arquivos que você editou em tempo de execução. Dessa forma, você não perde nenhum estado, o que é especialmente útil se você está ajustando a UI.

Um vídeo vale mais que mil palavras. Confira a diferença entre Live Reload (atual) e Hot Reload (novo).

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/2uQzVi-KFuc"
  frameborder="0"
  allowfullscreen></iframe>

Se você olhar atentamente, pode notar que é possível se recuperar de uma tela vermelha e você também pode começar a importar módulos que não estavam lá anteriormente sem ter que fazer um reload completo.

**Aviso:** porque JavaScript é uma linguagem muito stateful, hot reloading não pode ser perfeitamente implementado. Na prática, descobrimos que a configuração atual está funcionando bem para uma grande quantidade de casos de uso comuns e um reload completo está sempre disponível caso algo dê errado.

Hot reloading está disponível a partir da versão 0.22, você pode habilitá-lo:

- Abra o menu de desenvolvedor
- Toque em "Enable Hot Reloading"

## Implementação em resumo

Agora que vimos por que queremos isso e como usá-lo, a parte divertida começa: como realmente funciona.

Hot Reloading é construído em cima de um recurso [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/), ou HMR. Foi introduzido pela primeira vez pelo webpack e nós o implementamos dentro do React Native Packager. HMR faz o Packager observar mudanças de arquivos e enviar atualizações HMR para um runtime HMR fino incluído no aplicativo.

Em resumo, a atualização HMR contém o novo código dos módulos JS que mudaram. Quando o runtime os recebe, ele substitui o código dos módulos antigos pelo novo:

![](/blog/assets/hmr-architecture.png)

A atualização HMR contém um pouco mais do que apenas o código do módulo que queremos alterar porque substituí-lo não é suficiente para o runtime captar as mudanças. O problema é que o sistema de módulos pode já ter armazenado em cache as _exports_ do módulo que queremos atualizar. Por exemplo, digamos que você tenha um aplicativo composto por esses dois módulos:

```
// log.js
function log(message) {
  const time = require('./time');
  console.log(`[${time()}] ${message}`);
}

module.exports = log;
```

```
// time.js
function time() {
  return new Date().getTime();
}

module.exports = time;
```

O módulo `log` imprime a mensagem fornecida incluindo a data atual fornecida pelo módulo `time`.

Quando o aplicativo é empacotado, React Native registra cada módulo no sistema de módulos usando a função `__d`. Para este aplicativo, entre muitas definições `__d`, haverá uma para `log`:

```
__d('log', function() {
  ... // module's code
});
```

Esta invocação envolve o código de cada módulo em uma função anônima que geralmente chamamos de factory function. O runtime do sistema de módulos mantém o controle da factory function de cada módulo, se ela já foi executada e o resultado de tal execução (exports). Quando um módulo é requerido, o sistema de módulos fornece as exports já armazenadas em cache ou executa a factory function do módulo pela primeira vez e salva o resultado.

Então, digamos que você inicie seu aplicativo e requeira `log`. Neste ponto, nem as factory functions de `log` nem de `time` foram executadas, então nenhum export foi armazenado em cache. Então, o usuário modifica `time` para retornar a data em `MM/DD`:

```js
// time.js
function bar() {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

module.exports = bar;
```

O Packager enviará o novo código de time para o runtime (passo 1), e quando `log` for eventualmente requerido, a função exportada será executada com as mudanças de `time` (passo 2):

![](/blog/assets/hmr-step.png)

Agora digamos que o código de `log` requeira `time` como um require de nível superior:

```
const time = require('./time'); // top level require

// log.js
function log(message) {
  console.log(`[${time()}] ${message}`);
}

module.exports = log;
```

Quando `log` é requerido, o runtime armazenará em cache suas exports e as de `time`. (passo 1). Então, quando `time` é modificado, o processo HMR não pode simplesmente terminar depois de substituir o código de `time`. Se o fizesse, quando `log` fosse executado, ele o faria com uma cópia em cache de `time` (código antigo).

Para `log` captar as mudanças de `time`, precisaremos limpar suas exports em cache porque um dos módulos dos quais ele depende foi hot swapped (passo 3). Finalmente, quando `log` for requerido novamente, sua factory function será executada requerendo `time` e obtendo seu novo código.

![](/blog/assets/hmr-log.png)

## HMR API

HMR no React Native estende o sistema de módulos introduzindo o objeto `hot`. Esta API é baseada na do [webpack](https://webpack.github.io/hot-module-replacement.md). O objeto `hot` expõe uma função chamada `accept` que permite definir um callback que será executado quando o módulo precisar ser hot swapped. Por exemplo, se alterássemos o código de `time` da seguinte forma, toda vez que salvássemos time, veríamos "time changed" no console:

```
// time.js
function time() {
  ... // new code
}

module.hot.accept(() => {
  console.log('time changed');
});

module.exports = time;
```

Note que apenas em casos raros você precisaria usar esta API manualmente. Hot Reloading deve funcionar imediatamente para os casos de uso mais comuns.

## HMR Runtime

Como vimos antes, às vezes não é suficiente apenas aceitar a atualização HMR porque um módulo que usa aquele que está sendo hot swapped pode já ter sido executado e suas imports armazenadas em cache. Por exemplo, suponha que a árvore de dependências para o exemplo do aplicativo de filmes tivesse um `MovieRouter` de nível superior que dependesse das views `MovieSearch` e `MovieScreen`, que dependiam dos módulos `log` e `time` dos exemplos anteriores:

![](/blog/assets/hmr-diamond.png)

Se o usuário acessar a view de busca de filmes mas não a outra, todos os módulos exceto `MovieScreen` teriam exports em cache. Se uma mudança for feita no módulo `time`, o runtime terá que limpar as exports de `log` para que ele capte as mudanças de `time`. O processo não terminaria aí: o runtime repetirá este processo recursivamente até que todos os pais tenham sido aceitos. Então, ele pegará os módulos que dependem de `log` e tentará aceitá-los. Para `MovieScreen` ele pode pular, pois ainda não foi requerido. Para `MovieSearch`, ele terá que limpar suas exports e processar seus pais recursivamente. Finalmente, ele fará a mesma coisa para `MovieRouter` e terminará lá, pois nenhum módulo depende dele.

Para percorrer a árvore de dependências, o runtime recebe a árvore de dependências inversa do Packager na atualização HMR. Para este exemplo, o runtime receberá um objeto JSON como este:

```
{
  modules: [
    {
      name: 'time',
      code: /* time's new code */
    }
  ],
  inverseDependencies: {
    MovieRouter: [],
    MovieScreen: ['MovieRouter'],
    MovieSearch: ['MovieRouter'],
    log: ['MovieScreen', 'MovieSearch'],
    time: ['log'],
  }
}
```

## React Components

React components são um pouco mais difíceis de fazer funcionar com Hot Reloading. O problema é que não podemos simplesmente substituir o código antigo pelo novo, pois perderíamos o estado do componente. Para aplicações web React, [Dan Abramov](https://twitter.com/dan_abramov) implementou uma [transform](https://gaearon.github.io/react-hot-loader/) babel que usa a API HMR do webpack para resolver este problema. Em resumo, sua solução funciona criando um proxy para cada componente React no _transform time_. Os proxies mantêm o estado do componente e delegam os métodos de ciclo de vida aos componentes reais, que são os que fazemos hot reload:

![](/blog/assets/hmr-proxy.png)

Além de criar o componente proxy, a transform também define a função `accept` com um pedaço de código para forçar o React a re-renderizar o componente. Dessa forma, podemos fazer hot reload do código de renderização sem perder nenhum estado do aplicativo.

O [transformer](https://github.com/facebook/react-native/blob/master/packager/transformer.js#L92-L95) padrão que vem com React Native usa o `babel-preset-react-native`, que está [configurado](https://github.com/facebook/react-native/blob/master/babel-preset/configs/hmr.js#L24-L31) para usar `react-transform` da mesma forma que você usaria em um projeto web React que usa webpack.

## Redux Stores

Para habilitar Hot Reloading em stores [Redux](https://redux.js.org/), você precisará apenas usar a API HMR de forma semelhante ao que faria em um projeto web que usa webpack:

```
// configureStore.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
```

Quando você altera um reducer, o código para aceitar esse reducer será enviado ao cliente. Então o cliente perceberá que o reducer não sabe como se aceitar, então ele procurará todos os módulos que se referem a ele e tentará aceitá-los. Eventualmente, o fluxo chegará à store única, o módulo `configureStore`, que aceitará a atualização HMR.

## Conclusão

Se você está interessado em ajudar a melhorar o hot reloading, eu encorajo você a ler [o post de Dan Abramov sobre o futuro do hot reloading](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.jmivpvmz4) e a contribuir. Por exemplo, Johny Days vai [fazê-lo funcionar com vários clientes conectados](https://github.com/facebook/react-native/pull/6179). Estamos contando com todos vocês para manter e melhorar este recurso.

Com React Native, temos a oportunidade de repensar a maneira como construímos aplicativos para tornar isso uma ótima experiência para desenvolvedores. Hot reloading é apenas uma peça do quebra-cabeça, que outros hacks malucos podemos fazer para melhorar?
