---
ia-translated: true
title: 'A New Architecture chegou'
authors: [reactteam]
tags: [announcement]
date: 2024-10-23T16:01
---

React Native 0.76 com a New Architecture ativada por padrão já está disponível no npm!

No [post do blog sobre a versão 0.76](/blog/2024/10/23/release-0.76-new-architecture), compartilhamos uma lista de mudanças significativas incluídas nesta versão. Neste post, fornecemos uma visão geral da New Architecture e como ela molda o futuro do React Native.

A New Architecture adiciona suporte completo para recursos modernos do React, incluindo [Suspense](https://react.dev/blog/2022/03/29/react-v18#new-suspense-features), [Transitions](https://react.dev/blog/2022/03/29/react-v18#new-feature-transitions), [automatic batching](https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching) e [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect). A New Architecture também inclui novos sistemas de [Native Module](/docs/next/turbo-native-modules-introduction) e [Native Component](/docs/next/fabric-native-components-introduction) que permitem que você escreva código type-safe com acesso direto a interfaces nativas sem uma bridge.

Este lançamento é o resultado de uma reescrita completa do React Native em que trabalhamos desde 2018, e tomamos cuidado extra para tornar a New Architecture uma migração gradual para a maioria dos aplicativos. Em 2021, criamos [o New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture/) para colaborar com a comunidade e garantir uma experiência de atualização suave para todo o ecossistema React.

A maioria dos aplicativos será capaz de adotar o React Native 0.76 com o mesmo nível de esforço de qualquer outro lançamento. As bibliotecas React Native mais populares já suportam a New Architecture. A New Architecture também inclui uma camada de interoperabilidade automática para habilitar compatibilidade retroativa com bibliotecas direcionadas à antiga arquitetura.

<!--truncate-->

Nos últimos anos de desenvolvimento, nossa equipe compartilhou publicamente nossa visão para a New Architecture. Se você perdeu alguma dessas palestras, confira-as aqui:

- [React Native EU 2019 - The New React Native](https://www.youtube.com/watch?v=52El0EUI6D0)
- [React Conf 2021 - React 18 Keynote](https://www.youtube.com/watch?v=FZ0cG47msEk)
- [App.js 2022 - Bringing the New React Native Architecture to the OSS Community](https://www.youtube.com/watch?v=Q6TkkzRJfUo)
- [React Conf 2024 - Day 2 Keynote](https://www.youtube.com/watch?v=Q5SMmKb7qVI)

## O que é a New Architecture

A New Architecture é uma reescrita completa dos principais sistemas que sustentam o React Native, incluindo como os componentes são renderizados, como as abstrações JavaScript se comunicam com as abstrações nativas e como o trabalho é agendado em diferentes threads. Embora a maioria dos usuários não precise pensar em como esses sistemas funcionam, essas mudanças trazem melhorias e novos recursos.

Na antiga arquitetura, o React Native se comunicava com a plataforma nativa usando uma bridge assíncrona. Para renderizar um componente ou chamar uma função nativa, o React Native precisava serializar e enfileirar chamadas de funções nativas com a bridge, que seriam processadas de forma assíncrona. O benefício desta arquitetura é que a thread principal nunca era bloqueada para atualizações de renderização ou tratamento de chamadas de funções de módulos nativos, já que todo o trabalho era feito em uma thread de background.

No entanto, os usuários esperam feedback imediato às interações para que pareça um aplicativo nativo. Isso significa que algumas atualizações precisam ser renderizadas de forma síncrona em resposta à entrada do usuário, potencialmente interrompendo qualquer renderização em andamento. Como a antiga arquitetura era apenas assíncrona, precisávamos reescrevê-la para permitir atualizações síncronas e assíncronas.

Além disso, na antiga arquitetura, serializar chamadas de função pela bridge rapidamente se tornou um gargalo, especialmente para atualizações frequentes ou objetos grandes. Isso dificultava que os aplicativos atingissem 60+ FPS de forma confiável. Também havia problemas de sincronização: quando as camadas JavaScript e nativa ficavam fora de sincronia, era impossível reconciliá-las de forma síncrona, resultando em bugs como listas mostrando quadros de espaço vazio e saltos visuais da UI devido à renderização de estados intermediários.

Finalmente, como a antiga arquitetura mantinha uma única cópia da UI usando a hierarquia nativa e mutava essa cópia no local, o layout só podia ser calculado em uma única thread. Isso tornava impossível processar atualizações urgentes como entradas do usuário, e o layout não podia ser lido de forma síncrona, como ler em um layout effect para atualizar a posição de um tooltip.

Todos esses problemas significavam que não era possível suportar adequadamente os recursos concorrentes do React. Para resolver esses problemas, a New Architecture inclui quatro partes principais:

- O New Native Module System
- O New Renderer
- O Event Loop
- Remoção da Bridge

O New Module system permite que o React Native Renderer tenha acesso síncrono à camada nativa, o que permite lidar com eventos, agendar atualizações e ler layout de forma assíncrona e síncrona. Os novos Native Modules também são carregados lentamente por padrão, dando aos aplicativos um ganho significativo de desempenho.

O New Renderer pode lidar com múltiplas árvores em andamento em múltiplas threads, o que permite que o React processe múltiplas prioridades de atualização concorrentes, seja na thread principal ou em uma thread de background. Ele também suporta leitura de layout de múltiplas threads de forma síncrona ou assíncrona, para suportar UIs mais responsivas sem engasgos.

O novo Event Loop pode processar tarefas na thread JavaScript em uma ordem bem definida. Isso permite que o React interrompa a renderização para processar eventos, para que eventos urgentes do usuário possam ter prioridade sobre transições de UI de menor prioridade. O Event Loop também se alinha com as especificações web, então podemos suportar recursos de navegador como microtasks, `MutationObserver` e `IntersectionObserver`.

Finalmente, remover a bridge permite inicialização mais rápida e comunicação direta entre JavaScript e o runtime nativo, para que o custo de alternar trabalho seja minimizado. Isso também permite melhores relatórios de erro, depuração e redução de crashes de comportamento indefinido.

A New Architecture agora está pronta para ser usada em produção. Ela já é usada em escala na Meta no aplicativo Facebook e em outros produtos. Usamos com sucesso o React Native e a New Architecture no aplicativo Facebook e Instagram que desenvolvemos para nossos [dispositivos Quest](https://engineering.fb.com/2024/10/02/android/react-at-meta-connect-2024/).

Nossos parceiros já estão usando a New Architecture em produção há meses: confira essas histórias de sucesso da [Expensify](https://blog.swmansion.com/sunrising-new-architecture-in-the-new-expensify-app-729d237a02f5) e [Kraken](https://blog.kraken.com/product/engineering/how-kraken-fixed-performance-issues-via-incremental-adoption-of-the-react-native-new-architecture), e experimente o [Bluesky](https://github.com/bluesky-social/social-app/releases/tag/1.92.0-na-rc.2) com seu novo lançamento.

### New Native Modules

O novo Native Module System é uma grande reescrita de como o JavaScript e a plataforma nativa se comunicam. É escrito inteiramente em C++, o que desbloqueia muitos novos recursos:

- Acesso síncrono de e para o runtime nativo
- Type safety entre código JavaScript e nativo
- Compartilhamento de código entre plataformas
- Carregamento lazy de módulos por padrão

No novo Native Module system, o JavaScript e a camada nativa agora podem se comunicar de forma síncrona através do JavaScript Interface (JSI), sem a necessidade de usar uma bridge assíncrona. Isso significa que seus Native Modules personalizados agora podem chamar uma função de forma síncrona, retornar um valor e passar esse valor de volta para outra função de Native Module.

Na antiga arquitetura, para lidar com uma resposta de chamadas de função nativa, você precisava fornecer um callback, e o valor retornado precisava ser serializável:

```ts
// ❌ Sync callback from Native Module
nativeModule.getValue(value => {
  // ❌ value cannot reference a native object
  nativeModule.doSomething(value);
});
```

Na New Architecture, você pode fazer chamadas síncronas para funções nativas:

```ts
// ✅ Sync response from Native Module
const value = nativeModule.getValue();

// ✅ value can be a reference to a native object
nativeModule.doSomething(value);
```

Com a New Architecture, você pode finalmente aproveitar todo o poder de uma implementação nativa em C++ enquanto ainda a acessa de APIs JavaScript/TypeScript. O New Module System suporta [módulos escritos em C++](/docs/next/the-new-architecture/pure-cxx-modules) para que você possa escrever seu módulo uma vez e ele funcione em todas as plataformas, incluindo Android, iOS, Windows e macOS. Implementar módulos em C++ permite gerenciamento de memória mais refinado e otimizações de desempenho.

Além disso, com [Codegen](/docs/next/the-new-architecture/what-is-codegen), seus módulos podem definir um contrato fortemente tipado entre a camada JavaScript e a camada nativa. Em nossa experiência, erros de tipo cross-boundary são uma das fontes mais comuns de crashes em aplicativos multiplataforma. O Codegen permite que você supere esses problemas enquanto também gera código boilerplate para você.

Finalmente, os módulos agora são carregados de forma lazy: eles são carregados na memória apenas quando são efetivamente necessários, em vez de na inicialização. Isso reduz o tempo de inicialização do aplicativo e o mantém baixo à medida que o aplicativo cresce em complexidade.

Bibliotecas populares como [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) já viram benefícios ao migrar para os novos Native Modules:

> "Os novos Native Modules simplificaram muito a configuração, autolinking e inicialização para o `react-native-mmkv`. Graças à New Architecture, o `react-native-mmkv` agora é um Native Module C++ puro, o que permite que funcione em qualquer plataforma. O novo Codegen permite que o MMKV seja totalmente type-safe, o que corrigiu um problema de longa data de `NullPointerReference` ao impor null-safety, e poder chamar funções de Native Module de forma síncrona nos permitiu substituir o acesso JSI personalizado pela nova API de Native Module."
>
> [Marc Rousavy](https://twitter.com/mrousavy), criador do `react-native-mmkv`

### New Renderer

Também reescrevemos completamente o Native Renderer, adicionando vários benefícios:

- Atualizações podem ser renderizadas em diferentes threads com diferentes prioridades.
- Layout pode ser lido de forma síncrona e através de diferentes threads.
- O renderer é escrito em C++ e compartilhado entre todas as plataformas.

O Native Renderer atualizado agora armazena a hierarquia de view em uma estrutura de árvore imutável. Isso significa que a UI é armazenada de uma forma que não pode ser alterada diretamente, permitindo processamento thread-safe de atualizações. Isso permite lidar com múltiplas árvores em andamento, cada uma representando uma versão diferente da interface do usuário. Como resultado, as atualizações podem ser renderizadas em background sem bloquear a UI (como durante transições) ou na thread principal (em resposta à entrada do usuário).

Ao suportar múltiplas threads, o React pode interromper uma atualização de baixa prioridade para renderizar uma urgente, como aquelas geradas por entradas do usuário, e então retomar a atualização de baixa prioridade conforme necessário. O novo renderer também pode ler informações de layout de forma síncrona e através de diferentes threads. Isso permite computação em background para atualizações de baixa prioridade e leituras síncronas quando necessário, como reposicionar um tooltip.

Finalmente, reescrever o renderer em C++ permite que ele seja compartilhado entre todas as plataformas. Isso garante que o mesmo código seja executado no iOS, Android, Windows, macOS e qualquer outra plataforma suportada pelo React Native, fornecendo capacidades de renderização consistentes sem precisar de reimplementação para cada plataforma.

Este é um passo significativo em direção à nossa [Many Platform Vision](/blog/2021/08/26/many-platform-vision). Por exemplo, View Flattening era uma otimização exclusiva do Android para evitar árvores de layout profundas. O novo renderer, com núcleo C++ compartilhado, [traz esse recurso para o iOS](https://github.com/reactwg/react-native-new-architecture/discussions/110). Esta otimização é automática e não requer configuração, ela vem gratuitamente com o renderer compartilhado.

Com essas mudanças, o React Native agora suporta totalmente recursos do Concurrent React como Suspense e Transitions, facilitando a construção de interfaces de usuário complexas que respondem rapidamente à entrada do usuário sem engasgos, atrasos ou saltos visuais. No futuro, aproveitaremos esses novos recursos para trazer mais melhorias aos componentes integrados, como FlatList e TextInput.

Bibliotecas populares como [Reanimated](https://docs.swmansion.com/react-native-reanimated/) já estão aproveitando o New Renderer:

> "O Reanimated 4, atualmente em desenvolvimento, introduz um novo mecanismo de animação que funciona diretamente com o New Renderer, permitindo que ele lide com animações e gerencie layout em diferentes threads. O design do New Renderer é o que realmente permite que esses recursos sejam construídos sem depender de inúmeras soluções alternativas. Além disso, por ser implementado em C++ e compartilhado entre plataformas, grandes porções do Reanimated podem ser escritas uma vez, reduzindo problemas específicos de plataforma, minimizando a base de código e simplificando a adoção para plataformas out-of-tree."
>
> [Krzysztof Magiera](https://x.com/kzzzf), criador do [Reanimated](https://docs.swmansion.com/react-native-reanimated/)

### O Event Loop

A New Architecture nos permitiu implementar um modelo de processamento de event loop bem definido, conforme descrito neste [RFC](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0744-well-defined-event-loop.md). Este RFC segue as especificações descritas no [HTML Standard](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model) e descreve como o React Native deve executar tarefas na thread JavaScript.

Implementar um event loop bem definido fecha lacunas entre React DOM e React Native: o comportamento de um aplicativo React Native agora está mais próximo do comportamento de um aplicativo React DOM, facilitando aprender uma vez e escrever em qualquer lugar.

O event loop traz muitos benefícios para o React Native:

- A capacidade de interromper a renderização para processar eventos e tarefas
- Maior alinhamento com as especificações web
- Fundação para mais recursos de navegador

Com o Event Loop, o React é capaz de ordenar atualizações e eventos de forma previsível. Isso permite que o React interrompa uma atualização de baixa prioridade com um evento urgente do usuário, e o New Renderer nos permite renderizar essas atualizações de forma independente.

O Event Loop também alinha o comportamento de eventos e tarefas como timers com as especificações web, o que significa que o React Native funciona mais como o que os usuários estão familiarizados na Web e permite melhor compartilhamento de código entre React DOM e React Native.

Também permite a implementação de recursos de navegador mais compatíveis como microtasks, `MutationObserver` e `IntersectionObserver`. Esses recursos ainda não estão prontos para uso no React Native, mas estamos trabalhando para trazê-los a você no futuro.

Finalmente, as mudanças no Event Loop e no New Renderer para suportar leitura de layout de forma síncrona permitem que o React Native adicione suporte adequado para `useLayoutEffect` para ler informações de layout de forma síncrona e atualizar a UI no mesmo quadro. Isso permite que você posicione elementos corretamente antes de serem exibidos ao usuário.

Veja [`useLayoutEffect`](/blog/2024/10/23/the-new-architecture-is-here#uselayouteffect) para mais detalhes.

### Removendo a Bridge

Na New Architecture, também removemos completamente a dependência do React Native na bridge, substituindo-a por comunicação direta e eficiente entre JavaScript e código nativo usando JSI:

![](/blog/assets/0.76-bridge-diagram.png)

Remover a bridge melhora o tempo de inicialização ao evitar a inicialização da bridge. Por exemplo, na antiga arquitetura, para fornecer métodos globais ao JavaScript, precisaríamos inicializar um módulo em JavaScript na inicialização, causando um pequeno atraso no tempo de inicialização do aplicativo:

```js
// ❌ Slow initialization
import {NativeTimingModule} from 'NativeTimingModule';
global.setTimeout = timer => {
  NativeTimingModule.setTimeout(timer);
};

// App.js
setTimeout(() => {}, 100);
```

Na New Architecture, podemos vincular métodos diretamente do C++:

```cpp
// ✅ Initialize directly in C++
runtime.global().setProperty(runtime, "setTimeout", createTimer);
```

```js
// App.js
setTimeout(() => {}, 100);
```

A reescrita também melhora os relatórios de erro, particularmente para crashes JavaScript na inicialização, e reduz crashes de comportamento indefinido. Se ocorrerem crashes, o novo [React Native DevTools](/docs/next/react-native-devtools) simplifica a depuração e suporta a New Architecture.

A bridge permanece para compatibilidade retroativa para suportar migração gradual para a New Architecture. No futuro, removeremos completamente o código da bridge.

### Migração Gradual

Esperamos que a maioria dos aplicativos possa atualizar para 0.76 com o mesmo esforço de qualquer outro lançamento.

Quando você atualiza para 0.76, a New Architecture e o React 18 são habilitados por padrão. No entanto, para usar recursos concorrentes e obter os benefícios completos da New Architecture, seu aplicativo e bibliotecas precisarão ser gradualmente migrados para suportar totalmente a New Architecture.

Quando você atualiza pela primeira vez, seu aplicativo será executado na New Architecture com uma camada de interoperabilidade automática com a antiga arquitetura. Para a maioria dos aplicativos, isso funcionará sem alterações, mas existem [limitações conhecidas](https://github.com/reactwg/react-native-new-architecture/discussions/237) com a camada de interoperabilidade, pois ela não suporta acesso a Shadow Nodes personalizados ou recursos concorrentes.

Para usar recursos concorrentes, os aplicativos também precisarão ser atualizados para suportar [Concurrent React](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react) seguindo as [Rules of React](https://react.dev/reference/rules). Para migrar seu código JavaScript para React 18 e sua semântica, siga o [guia de atualização do React 18](https://react.dev/blog/2022/03/08/react-18-upgrade-guide).

A estratégia geral é fazer seu aplicativo rodar na New Architecture sem quebrar o código existente. Você pode então migrar gradualmente seu aplicativo no seu próprio ritmo. Para novas superfícies que migraram todos os módulos para a New Architecture, você pode começar a usar recursos concorrentes imediatamente. Para superfícies existentes, você pode precisar resolver alguns problemas e migrar módulos antes de adicionar recursos concorrentes.

Colaboramos com as bibliotecas React Native mais populares para garantir suporte para a New Architecture. Mais de 850 bibliotecas já são compatíveis, incluindo todas as bibliotecas com mais de 200K downloads semanais (~10% das bibliotecas baixadas). Você pode verificar a compatibilidade da biblioteca com a New Architecture no site [reactnative.directory](https://reactnative.directory):

![](/blog/assets/0.76-directory.png)

Para mais detalhes sobre a atualização, veja [Como Atualizar](/blog/2024/10/23/the-new-architecture-is-here#how-to-upgrade) abaixo.

## Novos Recursos

A New Architecture inclui suporte completo para React 18, recursos concorrentes e `useLayoutEffect` no React Native. Para uma lista completa de recursos do React 18, consulte o [post do blog do React 18](https://react.dev/blog/2021/12/17/react-conf-2021-recap#react-18-and-concurrent-features).

### Transitions

Transitions são um novo conceito no React 18 para distinguir entre atualizações urgentes e não urgentes.

- **Atualizações urgentes** refletem interação direta, como digitar e pressionar.
- **Atualizações de transição** fazem a transição da UI de uma view para outra.

Atualizações urgentes precisam de resposta imediata para corresponder às nossas intuições sobre como objetos físicos se comportam. No entanto, transições são diferentes porque o usuário não espera ver cada valor intermediário na tela. Na New Architecture, o React Native é capaz de suportar renderização de atualizações urgentes e atualizações de transição separadamente.

Normalmente, para a melhor experiência do usuário, uma única entrada do usuário deve resultar tanto em uma atualização urgente quanto em uma não urgente. Semelhante ao ReactDOM, eventos como `press` ou `change` são tratados como urgentes e renderizados imediatamente. Você pode usar a API `startTransition` dentro de um evento de entrada para informar ao React quais atualizações são "transições" e podem ser adiadas para o background:

```jsx
import {startTransition} from 'react';

// Urgent: Show the slider value
setCount(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setNumberOfTiles(input);
});
```

Separar eventos urgentes de transições permite uma interface de usuário mais responsiva e uma experiência de usuário mais intuitiva.

Aqui está uma comparação da antiga arquitetura sem transições e a nova arquitetura com transições. Imagine que cada tile não é uma view trivial com uma cor de fundo, mas um componente rico contendo imagens e outros componentes que são caros para renderizar. **Depois** de usar `useTransition` você evita sobrecarregar seu aplicativo com atualizações e ficar para trás.

<div className="TwoColumns TwoFigures">
  <figure>
    <img src="/img/new-architecture/without-transitions.gif" alt="Um vídeo demonstrando um aplicativo renderizando muitas views (tiles) de acordo com uma entrada de slider. As views são renderizadas em lotes conforme o slider é rapidamente ajustado de 0 para 1000." />
    <figcaption><b>Antes:</b> renderizando tiles sem marcá-las como uma transição.</figcaption>
  </figure>
  <figure>
    <img src="/img/new-architecture/with-transitions.gif" alt="Um vídeo demonstrando um aplicativo renderizando muitas views (tiles) de acordo com uma entrada de slider. As views são renderizadas em lotes conforme o slider é rapidamente ajustado de 0 para 1000. Há menos renderizações em lote em comparação com o vídeo anterior." />
    <figcaption><b>Depois:</b> renderizando tiles <em>com transitions</em> para interromper renderizações em andamento de estado obsoleto.</figcaption>
  </figure>
</div>

Para mais informações, veja [Support for Concurrent Renderer and Features](/architecture/landing-page#support-for-concurrent-renderer-and-features).

### Automatic Batching

Ao atualizar para a New Architecture, você se beneficiará do automatic batching do React 18.

O Automatic batching permite que o React agrupe mais atualizações de estado ao renderizar para evitar a renderização de estados intermediários. Isso permite que o React Native seja mais rápido e menos suscetível a lags, sem nenhum código adicional do desenvolvedor.

<div className="TwoColumns TwoFigures">
  <figure>
    <img src="/img/new-architecture/legacy-renderer.gif" alt="Um vídeo demonstrando um aplicativo renderizando muitas views de acordo com uma entrada de slider. O valor do slider é ajustado de 0 para 1000 e a UI lentamente alcança a renderização de 1000 views." />
    <figcaption><b>Antes:</b> renderizando atualizações frequentes de estado com o renderer legado.</figcaption>
  </figure>
  <figure>
    <img src="/img/new-architecture/react18-renderer.gif" alt="Um vídeo demonstrando um aplicativo renderizando muitas views de acordo com uma entrada de slider. O valor do slider é ajustado de 0 para 1000 e a UI resolve para 1000 views mais rápido que o exemplo anterior, sem tantos estados intermediários." />
    <figcaption><b>Depois:</b> renderizando atualizações frequentes de estado com <em>automatic batching</em>.</figcaption>
  </figure>
</div>

Na antiga arquitetura, mais estados intermediários são renderizados e a UI continua atualizando mesmo quando o slider para de se mover. A New Architecture renderiza menos estados intermediários e completa a renderização muito mais cedo graças ao agrupamento automático das atualizações.

Para mais informações, veja [Support for Concurrent Renderer and Features](/architecture/landing-page#support-for-concurrent-renderer-and-features).

### useLayoutEffect

Baseando-se no Event Loop e na capacidade de ler layout de forma síncrona, na New Architecture adicionamos suporte adequado para `useLayoutEffect` no React Native.

Na antiga arquitetura, você precisava usar o evento assíncrono `onLayout` para ler informações de layout de uma view (que também era assíncrono). Como resultado, haveria pelo menos um quadro onde o layout estava incorreto até que o layout fosse lido e atualizado, causando problemas como tooltips posicionados na posição errada:

```tsx
// ❌ async onLayout after commit
const onLayout = React.useCallback(event => {
  // ❌ async callback to read layout
  ref.current?.measureInWindow((x, y, width, height) => {
    setPosition({x, y, width, height});
  });
}, []);

// ...
<ViewWithTooltip
  onLayout={onLayout}
  ref={ref}
  position={position}
/>;
```

A New Architecture corrige isso permitindo acesso síncrono a informações de layout no `useLayoutEffect`:

```tsx
// ✅ sync layout effect during commit
useLayoutEffect(() => {
  // ✅ sync call to read layout
  const rect = ref.current?.getBoundingClientRect();
  setPosition(rect);
}, []);

// ...
<ViewWithTooltip ref={ref} position={position} />;
```

Esta mudança permite que você leia informações de layout de forma síncrona e atualize a UI no mesmo quadro, permitindo que você posicione elementos corretamente antes de serem exibidos ao usuário:

<div className="TwoColumns TwoFigures">
  <figure>
    <img src="/img/new-architecture/async-on-layout.gif" alt="Uma view que está se movendo para os cantos do viewport e centro com um tooltip renderizado acima ou abaixo dela. O tooltip é renderizado após um curto atraso depois que a view se move" />
    <figcaption>Na antiga arquitetura, o layout era lido de forma assíncrona no `onLayout`, causando o atraso na posição do tooltip.</figcaption>
  </figure>
  <figure>
    <img src="/img/new-architecture/sync-use-layout-effect.gif" alt="Uma view que está se movendo para os cantos do viewport e centro com um tooltip renderizado acima ou abaixo dela. A view e o tooltip se movem em sincronia." />
    <figcaption>Na New Architecture, o layout pode ser lido no `useLayoutEffect` de forma síncrona, atualizando a posição do tooltip antes de exibir.</figcaption>
  </figure>
</div>

Para mais informações, veja a documentação para [Synchronous Layout and Effects](/docs/0.75/the-new-architecture/landing-page#synchronous-layout-and-effects).

### Suporte Completo para Suspense

Suspense permite que você especifique declarativamente o estado de carregamento de uma parte da árvore de componentes se ela ainda não estiver pronta para ser exibida:

```jsx
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

Introduzimos uma versão limitada do Suspense há vários anos, e o React 18 adicionou suporte completo. Até agora, o React Native não conseguia suportar renderização concorrente para Suspense.

A New Architecture inclui suporte completo para Suspense introduzido no React 18. Isso significa que você pode agora usar Suspense no React Native para lidar com estados de carregamento para seus componentes, e o conteúdo suspenso será renderizado em background enquanto o estado de carregamento é exibido, dando maior prioridade à entrada do usuário no conteúdo visível.

Para mais, veja o [RFC para Suspense no React 18](https://github.com/reactjs/rfcs/blob/main/text/0213-suspense-in-react-18.md).

## Como Atualizar

Para atualizar para 0.76, siga os passos no [post de lançamento](/blog/2024/10/23/release-0.76-new-architecture#upgrade-to-076). Como este lançamento também atualiza para React 18, você também precisará seguir o [guia de atualização do React 18](https://react.dev/blog/2022/03/08/react-18-upgrade-guide).

Esses passos devem ser suficientes para a maioria dos aplicativos atualizarem para a New Architecture graças à camada de interoperabilidade com a antiga arquitetura. No entanto, para aproveitar totalmente a New Architecture e começar a usar recursos concorrentes, você precisará migrar seus Native Modules personalizados e Native Components para suportar as novas APIs de Native Module e Native Component.

Sem migrar seus Native Modules personalizados, você não obterá os benefícios de C++ compartilhado, chamadas de método síncronas ou type-safety do codegen. Sem migrar seus Native Components, você não será capaz de usar recursos concorrentes. Recomendamos migrar todos os Native Components e Native Modules para a New Architecture o mais rápido possível.

:::note
Em um lançamento futuro, removeremos a camada de interoperabilidade e os módulos precisarão suportar a New Architecture.
:::

### Aplicativos

Se você é um desenvolvedor de aplicativos, para suportar totalmente a New Architecture, você precisará atualizar suas bibliotecas, Native Components personalizados e Native Modules personalizados para suportar totalmente a New Architecture.

Colaboramos com as bibliotecas React Native mais populares para garantir suporte para a New Architecture. Você pode verificar a compatibilidade da biblioteca com a New Architecture no site [reactnative.directory](https://reactnative.directory).

Se alguma das bibliotecas das quais seu aplicativo depende ainda não for compatível, você pode:

- Abrir um issue com a biblioteca e pedir ao autor para migrar para a New Architecture.
- Se a biblioteca não for mantida, considere bibliotecas alternativas com os mesmos recursos.
- [Optar por não usar a New Architecture](/blog/2024/10/23/the-new-architecture-is-here#opt-out) enquanto essas bibliotecas são migradas.

Se seu aplicativo tiver Native Modules personalizados ou Native Components personalizados, esperamos que funcionem bem, graças à nossa [camada de interoperabilidade](https://github.com/reactwg/react-native-new-architecture/discussions/135). No entanto, recomendamos atualizá-los para as novas APIs de Native Module e Native Component para suportar totalmente a New Architecture e adotar recursos concorrentes.

Por favor, siga estes guias para migrar seus módulos e componentes para a New Architecture:

- [Native Modules](/docs/next/turbo-native-modules-introduction)
- [Native Components](/docs/next/fabric-native-components-introduction)

### Bibliotecas

Se você é um mantenedor de biblioteca, primeiro teste se sua biblioteca funciona com a camada de interoperabilidade. Se não funcionar, por favor abra um issue no [New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture/).

Para suportar totalmente a New Architecture, recomendamos migrar sua biblioteca para as novas APIs de Native Module e Native Component o mais rápido possível. Isso permitirá que os usuários de sua biblioteca aproveitem totalmente a New Architecture e suportem recursos concorrentes.

Você pode seguir estes guias para migrar seus módulos e componentes para a New Architecture:

- [Native Modules](/docs/next/turbo-native-modules-introduction)
- [Native Components](/docs/next/fabric-native-components-introduction)

### Opt-out

Se, por qualquer motivo, a New Architecture não estiver se comportando adequadamente em seu aplicativo, sempre há a opção de optar por não usá-la até que você esteja pronto para ativá-la novamente.

Para optar por não usar a New Architecture:

- No Android, modifique o arquivo `android/gradle.properties` e desative a flag `newArchEnabled`:

```diff title="gradle.properties"
-newArchEnabled=true
+newArchEnabled=false
```

- No iOS, você pode reinstalar as dependências executando o comando:

```shell
RCT_NEW_ARCH_ENABLED=0 bundle exec pod install
```

## Agradecimentos

Entregar a New Architecture para a comunidade OSS foi um esforço enorme que nos levou vários anos de pesquisa e desenvolvimento. Queremos aproveitar este momento para agradecer a todos os membros atuais e anteriores da equipe React que nos ajudaram a alcançar este resultado.

Também somos extremamente gratos a todos os parceiros que colaboraram conosco para tornar isso possível. Especificamente, gostaríamos de destacar:

- [Expo](https://expo.dev/), por adotar a New Architecture desde cedo e por apoiar o trabalho de migração das bibliotecas mais populares.
- [Software Mansion](https://swmansion.com/), por manter bibliotecas cruciais no ecossistema, por migrá-las para a New Architecture cedo e por toda a ajuda na investigação e correção de vários problemas.
- [Callstack](https://www.callstack.com/), por manter bibliotecas cruciais no ecossistema, por migrá-las para a New Architecture cedo e pelo suporte com o trabalho na Community CLI.
- [Microsoft](https://opensource.microsoft.com/), por adicionar a implementação da New Architecture para `react-native-windows` e `react-native-macos`, bem como em várias outras ferramentas de desenvolvedor.
- [Expensify](https://www.expensify.com/), [Kraken](https://www.kraken.com/), [Bluesky](https://bsky.app/) e [Brigad](https://www.brigad.co/) por pioneirar a adoção da New Architecture e reportar vários problemas para que pudéssemos corrigi-los para todos os outros.
- Todos os mantenedores de bibliotecas independentes e desenvolvedores que contribuíram para a New Architecture testando-a, corrigindo alguns dos problemas e abrindo questões sobre assuntos não claros para que pudéssemos esclarecê-los.
