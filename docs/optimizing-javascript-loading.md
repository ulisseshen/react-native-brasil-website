---
ia-translated: true
id: optimizing-javascript-loading
title: Otimizando o Carregamento de JavaScript
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Fazer o parsing e executar código JavaScript requer memória e tempo. Por causa disso, à medida que seu aplicativo cresce, geralmente é útil adiar o carregamento de código até que seja necessário pela primeira vez. React Native vem com algumas otimizações padrão que estão ativadas por padrão, e há técnicas que você pode adotar em seu próprio código para ajudar React a carregar seu aplicativo de forma mais eficiente. Existem também algumas otimizações automáticas avançadas (com seus próprios trade-offs) que são adequadas para aplicativos muito grandes.

## Recomendado: Use Hermes

Hermes é o mecanismo padrão para novos aplicativos React Native e é altamente otimizado para carregamento eficiente de código. Em builds de release, o código JavaScript é totalmente compilado para bytecode antecipadamente. Bytecode é carregado na memória sob demanda e não precisa ser analisado como JavaScript simples.

:::info
Leia mais sobre o uso do Hermes no React Native [aqui](./hermes).
:::

## Recomendado: Lazy-load de componentes grandes

Se um componente com muito código/dependências não é provável de ser usado ao renderizar inicialmente seu aplicativo, você pode usar a API [`lazy`](https://react.dev/reference/react/lazy) do React para adiar o carregamento de seu código até que seja renderizado pela primeira vez. Normalmente, você deve considerar fazer lazy-loading de componentes no nível de tela em seu aplicativo, para que adicionar novas telas ao seu aplicativo não aumente seu tempo de inicialização.

:::info
Leia mais sobre [lazy-loading de componentes com Suspense](https://react.dev/reference/react/lazy#suspense-for-code-splitting), incluindo exemplos de código, na documentação do React.
:::

### Dica: Evite efeitos colaterais de módulos

Fazer lazy-loading de componentes pode alterar o comportamento do seu aplicativo se os módulos do seu componente (ou suas dependências) tiverem _efeitos colaterais_, como modificar variáveis globais ou se inscrever em eventos fora de um componente. A maioria dos módulos em aplicativos React não deve ter efeitos colaterais.

```tsx title="SideEffects.tsx"
import Logger from './utils/Logger';

//  🚩 🚩 🚩 Efeito colateral! Isso deve ser executado antes que React possa até começar a
// renderizar o componente SplashScreen, e pode quebrar inesperadamente código em outro lugar
// no seu app se você decidir mais tarde fazer lazy-load do SplashScreen.
global.logger = new Logger();

export function SplashScreen() {
  // ...
}
```

## Avançado: Chame `require` inline

Às vezes você pode querer adiar o carregamento de algum código até usá-lo pela primeira vez, sem usar `lazy` ou um `import()` assíncrono. Você pode fazer isso usando a função [`require()`](https://metrobundler.dev/docs/module-api/#require) onde você normalmente usaria um `import` estático no topo do arquivo.

```tsx title="VeryExpensive.tsx"
import {Component} from 'react';
import {Text} from 'react-native';
// ... import some very expensive modules

export default function VeryExpensive() {
  // ... lots and lots of rendering logic
  return <Text>Very Expensive Component</Text>;
}
```

```tsx title="Optimized.tsx"
import {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
// Usually we would write a static import:
// import VeryExpensive from './VeryExpensive';

let VeryExpensive = null;

export default function Optimize() {
  const [needsExpensive, setNeedsExpensive] = useState(false);
  const didPress = useCallback(() => {
    if (VeryExpensive == null) {
      VeryExpensive = require('./VeryExpensive').default;
    }

    setNeedsExpensive(true);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={didPress}>
        <Text>Load</Text>
      </TouchableOpacity>
      {needsExpensive ? <VeryExpensive /> : null}
    </View>
  );
}
```

## Avançado: Inline automático de chamadas `require`

Se você usa o React Native CLI para construir seu aplicativo, chamadas `require` (mas não `import`s) serão automaticamente inline para você, tanto em seu código quanto dentro de quaisquer pacotes de terceiros (`node_modules`) que você usa.

```tsx
import {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

// This top-level require call will be evaluated lazily as part of the component below.
const VeryExpensive = require('./VeryExpensive').default;

export default function Optimize() {
  const [needsExpensive, setNeedsExpensive] = useState(false);
  const didPress = useCallback(() => {
    setNeedsExpensive(true);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={didPress}>
        <Text>Load</Text>
      </TouchableOpacity>
      {needsExpensive ? <VeryExpensive /> : null}
    </View>
  );
}
```

:::info
Alguns frameworks React Native desabilitam esse comportamento. Em particular, em projetos Expo, chamadas `require` não são inline por padrão. Você pode habilitar essa otimização editando a configuração Metro do seu projeto e definindo `inlineRequires: true` em [`getTransformOptions`](https://metrobundler.dev/docs/configuration#gettransformoptions).
:::

### Armadilhas de `require`s inline

Fazer inline de chamadas `require` altera a ordem em que os módulos são avaliados, e pode até fazer com que alguns módulos _nunca_ sejam avaliados. Isso geralmente é seguro fazer automaticamente, porque módulos JavaScript geralmente são escritos para serem livres de efeitos colaterais.

Se um dos seus módulos tiver efeitos colaterais - por exemplo, se ele inicializa algum mecanismo de logging, ou corrige uma API global usada pelo resto do seu código - então você pode ver comportamento inesperado ou até crashes. Nesses casos, você pode querer excluir certos módulos dessa otimização, ou desabilitá-la totalmente.

Para **desabilitar todo inline automático de chamadas `require`:**

Atualize seu `metro.config.js` para definir a opção do transformer `inlineRequires` como `false`:

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: false,
        },
      };
    },
  },
};
```

Para apenas **excluir certos módulos do inline de `require`:**

Existem duas opções relevantes do transformer: `inlineRequires.blockList` e `nonInlinedRequires`. Veja o trecho de código para exemplos de como usar cada um.

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: {
            blockList: {
              // require() calls in `DoNotInlineHere.js` will not be inlined.
              [require.resolve('./src/DoNotInlineHere.js')]: true,

              // require() calls anywhere else will be inlined, unless they
              // match any entry nonInlinedRequires (see below).
            },
          },
          nonInlinedRequires: [
            // require('react') calls will not be inlined anywhere
            'react',
          ],
        },
      };
    },
  },
};
```

Veja a documentação para [`getTransformOptions` no Metro](https://metrobundler.dev/docs/configuration#gettransformoptions) para mais detalhes sobre configurar e ajustar seus `require`s inline.

## Avançado: Use random access module bundles (não-Hermes)

:::tip
**Não suportado ao [usar Hermes](#use-hermes).** Bytecode Hermes não é compatível com o formato RAM bundle e fornece o mesmo (ou melhor) desempenho em todos os casos de uso.
:::

Random access module bundles (também conhecidos como RAM bundles) funcionam em conjunto com as técnicas mencionadas acima para limitar a quantidade de código JavaScript que precisa ser analisado e carregado na memória. Cada módulo é armazenado como uma string separada (ou arquivo) que é analisada apenas quando o módulo precisa ser executado.

RAM bundles podem ser fisicamente divididos em arquivos separados, ou podem usar o formato _indexed_, consistindo de uma tabela de consulta de múltiplos módulos em um único arquivo.

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms}>
<TabItem value="android">

No Android, habilite o formato RAM editando seu arquivo `android/app/build.gradle`. Antes da linha `apply from: "../../node_modules/react-native/react.gradle"` adicione ou altere o bloco `project.ext.react`:

```
project.ext.react = [
  bundleCommand: "ram-bundle",
]
```

Use as seguintes linhas no Android se você quiser usar um único arquivo indexado:

```
project.ext.react = [
  bundleCommand: "ram-bundle",
  extraPackagerArgs: ["--indexed-ram-bundle"]
]
```

</TabItem>
<TabItem value="ios">

No iOS, RAM bundles são sempre indexados ( = arquivo único).

Habilite o formato RAM no Xcode editando a fase de build "Bundle React Native code and images". Antes de `../node_modules/react-native/scripts/react-native-xcode.sh` adicione `export BUNDLE_COMMAND="ram-bundle"`:

```
export BUNDLE_COMMAND="ram-bundle"
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

</TabItem>
</Tabs>

Veja a documentação para [`getTransformOptions` no Metro](https://metrobundler.dev/docs/configuration#gettransformoptions) para mais detalhes sobre configurar e ajustar seu build de RAM bundle.
