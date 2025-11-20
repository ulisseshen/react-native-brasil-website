---
ia-translated: true
title: 'React Native 0.82 - Uma Nova Era'
authors: [vzaidman, cortinico, gabrieldonadel, alanjhughes]
tags: [engineering]
date: 2025-10-08
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# **React Native 0.82 - Uma Nova Era**

Hoje estamos animados em lançar o React Native 0.82: o primeiro React Native que executa inteiramente na New Architecture.

Este é um lançamento marco para o React Native e acreditamos que é o início de uma nova era. Em versões futuras, removeremos o código restante da Legacy Architecture para reduzir o tamanho da instalação e simplificar a base de código.

Além disso, a versão 0.82 também traz um opt-in experimental para uma versão mais recente do Hermes chamada Hermes V1. Também estamos habilitando vários recursos do React atualizando a versão do React para 19.1.1 e fornecendo suporte para DOM Node APIs.

### Destaques

- [Somente New Architecture](/blog/2025/10/08/react-native-0.82#new-architecture-only)
- [Hermes V1 Experimental](/blog/2025/10/08/react-native-0.82#experimental-hermes-v1)
- [React 19.1.1](/blog/2025/10/08/react-native-0.82#react-1911)
- [DOM Node APIs](/blog/2025/10/08/react-native-0.82#dom-node-apis)

<!--truncate-->

## New Architecture Only

No React Native 0.76, anunciamos que [The New Architecture](/blog/2024/10/23/the-new-architecture-is-here) se tornou a arquitetura padrão do React Native.

Desde então, a New Architecture foi testada e refinada e estamos confiantes em torná-la a **única** arquitetura para esta e futuras versões do React Native.

Isso significa que se você tentar definir `newArchEnabled=false` no Android, ou se tentar instalar CocoaPods com `RCT_NEW_ARCH_ENABLED=0` no iOS, essas configurações serão ignoradas e seu app ainda será executado usando a New Architecture.

### Como migrar

Se você ainda não migrou seu projeto para a New Architecture, recomendamos primeiro migrar seu projeto para React Native 0.81 ou Expo SDK 54. Estas são as últimas versões que permitem usar a Legacy Architecture. Elas contêm avisos e melhorias de desempenho especificamente para ajudar na migração para a New Architecture.
<br/> Em seguida, habilite a New Architecture na versão 0.81 e verifique se sua aplicação está funcionando corretamente.
<br/> Uma vez que você esteja usando a New Architecture na versão 0.81, pode atualizar com segurança para React Native 0.82, que impede a habilitação da Legacy Architecture.

Se uma dependência de terceiros incompatível está bloqueando você de migrar para a New Architecture, recomendamos que você entre em contato diretamente com os mantenedores da biblioteca.

Se um bug no núcleo do React Native está bloqueando você de migrar, recomendamos que você entre em contato conosco [através do nosso rastreador de issues](https://github.com/facebook/react-native/issues/new/choose).

### Interop Layers e compatibilidade com bibliotecas de terceiros

Manteremos as interop layers na base de código no futuro previsível. Todas as classes e funções que são necessárias pelas interop layers não serão removidas tão cedo. Compartilharemos mais atualizações no futuro sobre a remoção das Interop Layers.

Também verificamos que as bibliotecas de terceiros que oferecem compatibilidade retroativa com ambas as arquiteturas continuarão funcionando com a versão 0.82, onde a New Architecture é a única arquitetura.

### Remoção de classes da Legacy Architecture

Para garantir compatibilidade retroativa e reduzir breaking changes, não estamos removendo nenhuma API da Legacy Architecture do núcleo do React Native nesta versão. Remover a Legacy Architecture nos permitirá economizar tamanho significativo no tamanho geral do bundle, portanto, a remoção está programada para começar a partir da próxima versão do React Native.

Você pode encontrar mais informações em [RFC0929: Removal of the Legacy Architecture of React Native](https://github.com/react-native-community/discussions-and-proposals/pull/929).

## Experimental Hermes V1

React Native 0.82 adiciona suporte para optar pelo Hermes V1.

Hermes V1 é a próxima evolução do Hermes. Temos experimentado com ele internamente em nossos apps, e agora é hora da comunidade experimentá-lo também. Ele vem com melhorias no compilador e na VM que aumentam o desempenho do Hermes.

A partir de testes e benchmarks iniciais, o Hermes V1 supera o Hermes atual em vários cenários. Vimos melhorias no carregamento de bundle e TTI. As melhorias dependem fortemente dos detalhes de seus apps.

No [app Expensify](https://github.com/Expensify/App), uma aplicação complexa do mundo real, vimos as seguintes melhorias:
| Métrica | Android (dispositivo de baixo desempenho) | iOS |
| --- | --- | --- |
| Tempo de Carregamento do Bundle | 3.2% mais rápido | 9% mais rápido |
| TTI Total | 7.6% mais rápido | 2.5% mais rápido |
| TTI de Conteúdo | 7.2% mais rápido | 7.5% mais rápido |

Para TTI Total, medimos o tempo que leva desde o carregamento do bundle até quando a primeira tela no app é renderizada e está interativa.

Para TTI de Conteúdo, medimos o tempo que leva para um componente ficar interativo, começando da primeira renderização do próprio componente.

Hermes V1 ainda não contém compilação JS-para-nativo (anteriormente conhecida como "Static Hermes") ou a compilação JIT que foi [apresentada durante React Native EU 2023](https://www.youtube.com/watch?v=q-xKYA0EO-c). Ainda estamos testando esses recursos e compartilharemos mais à medida que avançamos.

### Como habilitar o Hermes V1

:::info

Enquanto o Hermes V1 está na fase experimental, você precisará compilar o React Native a partir do código-fonte para experimentá-lo. Uma vez que o Hermes V1 seja enviado como padrão em uma versão futura do React Native, essa restrição será removida.

:::

Para experimentar o Hermes V1 em seu próprio projeto, use os seguintes passos:

1. Force seu gerenciador de pacotes a resolver a versão experimental do pacote do compilador Hermes V1 modificando a seção correspondente do seu arquivo `package.json` (observe que a convenção de versionamento atual é apenas para a fase experimental do Hermes V1):

<Tabs>
  <TabItem label="yarn" value="yarn" default>
    ```
    "resolutions": {
        "hermes-compiler": "250829098.0.1"
    }
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```
    "overrides": {
        "hermes-compiler": "250829098.0.1"
    }
    ```
  </TabItem>
</Tabs>

2. Habilite o Hermes V1 para Android adicionando `hermesV1Enabled=true` dentro do `android/gradle.properties`:

```sh title="android/gradle.properties"
hermesV1Enabled=true
```

Além disso, configure o React Native [para compilar a partir do código-fonte](https://reactnative.dev/contributing/how-to-build-from-source#android) editando `android/settings.gradle`:

```jsx title="android/settings.gradle"
  includeBuild('../node_modules/react-native') {
      dependencySubstitution {
          substitute(module("com.facebook.react:react-android")).using(project(":packages:react-native:ReactAndroid"))
          substitute(module("com.facebook.react:react-native")).using(project(":packages:react-native:ReactAndroid"))
          substitute(project(":packages:react-native:ReactAndroid:hermes-engine")).using(module("com.facebook.hermes:hermes-android:250829098.0.1"))
      }
  }
```

3. Habilite o Hermes V1 para iOS instalando pods com a variável de ambiente `RCT_HERMES_V1_ENABLED=1`.

```sh
RCT_HERMES_V1_ENABLED=1 bundle exec pod install
```

Tenha em mente que o Hermes V1 não é compatível com as compilações pré-compiladas do React Native, então certifique-se de não usar a flag `RCT_USE_PREBUILT_RNCORE` ao instalar pods.

4. Para confirmar se seu app está executando o Hermes V1, execute o seguinte código dentro do seu app ou no console do DevTools. Este código retornará a versão do Hermes, que deve corresponder à versão especificada no passo 1 (`250829098.0.1`):

```jsx
// esperando "250829098.0.1" no Hermes V1
HermesInternal.getRuntimeProperties()['OSS Release Version'];
```

## React 19.1.1

Este lançamento do React Native vem com a versão estável mais recente do React: [React 19.1.1](https://github.com/facebook/react/releases/tag/v19.1.1).

Este lançamento do React contém suporte completo para owner stacks para React Native. No React Native 0.80, quando enviamos suporte para 19.1.0, [mencionamos](/blog/2025/06/12/react-native-0.80#react-1910) que owner stacks não eram totalmente suportados se você estivesse usando o plugin Babel [`@babel/plugin-transform-function-name`](https://babeljs.io/docs/babel-plugin-transform-function-name). Este lançamento remove essa restrição e habilita owner stacks para todos os usuários do React Native.

| ANTES                                                                                                            | DEPOIS                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| <center>![Example error thrown without Owner Stacks](../static/blog/assets/0.82-owners-stack-before.png)</center> | <center>![Example error thrown with Owner Stacks](../static/blog/assets/0.82-owners-stack-after.png)</center> |

React 19.1.1 também melhora a confiabilidade de [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) e [`startTransition`](https://react.dev/reference/react/startTransition) em um limite de Suspense para React Native. Esses são recursos essenciais do React, projetados para aumentar a responsividade do app. Anteriormente, ambos estavam erroneamente mostrando o componente fallback quando usados juntos com um limite de Suspense no React Native. Com React 19.1.1, eles agora funcionam consistentemente conforme esperado no React Native, alinhando seu comportamento com a Web.

## DOM Node APIs

A partir do React Native 0.82, componentes nativos fornecerão nodes semelhantes ao DOM via refs.

<!--alex ignore just retext-equality-->

Antes, componentes nativos forneciam objetos específicos do React Native com apenas um punhado de métodos como `measure` e `setNativeProps`. Após este lançamento, eles fornecerão [nodes implementando um subconjunto da API DOM](https://reactnative.dev/docs/element-nodes) para percorrer a árvore de UI, medir layout e mais, como na Web. Por exemplo:

```jsx
function MyComponent(props) {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;

    // New methods
    element.parentNode;
    element.parentElement;
    element.childNodes;
    element.children;
    const bounds = element.getBoundingClientRect();
    const doc = element.ownerDocument;
    const maybeElement = doc.getElementById('some-view');

    // Legacy methods are still available
    element.measure((x, y, width, height, pageX, pageY) => {
      /* ... */
    });
  }, []);

  return <View ref={ref} />;
}
```

Além disso, isso exporá acesso a [text nodes](https://reactnative.dev/docs/text-nodes) folha (criados pelo componente `Text`) e [document nodes](https://reactnative.dev/docs/document-nodes) representando nodes raiz do React Native.

Esta é uma mudança compatível com versões anteriores, pois os novos nodes continuarão implementando os métodos legados (como `measure`).

Para mais informações, consulte nossa [documentação](https://reactnative.dev/docs/nodes).

## Outras mudanças

### Web Performance APIs (Canary)

React Native agora implementa um subconjunto das APIs de desempenho disponíveis na Web:

- [High Resolution Time](https://www.w3.org/TR/hr-time-3/): define `performance.now()` e `performance.timeOrigin`.
- [Performance Timeline](https://w3c.github.io/performance-timeline/): define `PerformanceObserver` e métodos para acessar entradas de desempenho no objeto performance (`getEntries()`, `getEntriesByType()`, `getEntriesByName()`).
- [User Timing](https://w3c.github.io/user-timing/): define `performance.mark` e `performance.measure`.
- [Event Timing API](https://w3c.github.io/event-timing/): define tipos de entrada `event` relatados ao `PerformanceObserver`.
- [Long Tasks API](https://w3c.github.io/longtasks/): define tipos de entrada `longtask` relatados ao `PerformanceObserver`.

Elas permitem rastrear diferentes aspectos de desempenho em seu app em tempo de execução (para telemetria) e estarão visíveis no painel de desempenho no React Native DevTools (disponível em uma versão futura do React Native).

Atualmente estão **disponíveis apenas no [nível de lançamento canary](https://reactnative.dev/docs/releases/release-levels)**, e serão lançadas como estáveis em uma versão futura do React Native.

### Tipo de Build Debug Otimizado para Android

A partir do React Native 0.82, você poderá usar o tipo de build `debugOptimized` para acelerar sua experiência de desenvolvimento.

Historicamente, o Android cria duas variantes de build padrão:

- `debug`, usado por padrão ao desenvolver e que permite conectar-se às várias ferramentas de depuração como React Native DevTools, Metro, o JVM do Android e o depurador C++
- `release`, usado ao enviar sua aplicação para produção. Este é totalmente otimizado, com ofuscação e otimização que tornarão a depuração mais difícil.

Como a maioria dos desenvolvedores React Native não precisará usar o depurador C++ ao desenvolver, introduzimos o tipo de build `debugOptimized`.

Com `debugOptimized`, suas animações e re-renderizações serão mais rápidas, porque você está executando uma build do React Native com várias otimizações C++ habilitadas. Ao mesmo tempo, você ainda poderá usar React Native Dev Tools para depurar seu código JavaScript.

Ao usar `debugOptimized`, você não poderá usar os depuradores nativos C++, mas ainda poderá usá-lo se usar o tipo de build debug.

Para executar a variante `debugOptimized` para seu app, você pode invocar:

<Tabs>
  <TabItem label="Community CLI" value="Community CLI" default>
    ```
    npx react-native run-android --mode debugOptimized
    ```
  </TabItem>
  <TabItem value="Expo" label="Expo">
    ```
    npx expo run:android --variant debugOptimized
    ```
  </TabItem>
</Tabs>

:::info

O tipo de build `debugOptimized` também foi retroportado para React Native 0.81 e Expo SDK 54.

:::

Você pode ver o `debugOptimized` em ação nesses exemplos onde estamos renderizando várias animações em telas.

A build executando `debug` está rodando a ~20FPS enquanto a `debugOptimized` está rodando a ~60FPS:
| `debug` | `debugOptimized` |
| ------- | ---------------- |
| ![Example build running with `debug`](../static/blog/assets/0.82-debug.gif) | ![Example build running with `debugOptimized`](../static/blog/assets/0.82-debug-optimized.gif) |

## Breaking Changes

### Rejeições de promise não capturadas agora gerarão `console.error`

Seguindo a [melhoria no relato de erros JavaScript não capturados](/blog/2025/08/12/react-native-0.81#improved-reporting-of-uncaught-javascript-errors) na versão anterior, agora estaremos relatando promises não capturadas através desse mecanismo também:

![Example of a promise rejection reported to console](../static/blog/assets/0.82-uncaught-promise-rejection-report.png)

Devido a um bug, esses erros eram completamente suprimidos e ignorados anteriormente, então espere que alguns erros pré-existentes apareçam após atualizar para React Native 0.81. Por esse motivo, erros pré-existentes também podem aparecer em erros JavaScript relatados ao seu backend e criar um aumento nos novos relatórios.

### Outras Breaking Changes

#### Geral

- Move `ReactNativeFeatureFlags` para `src/private`
  - Em geral, você não deve depender de `ReactNativeFeatureFlags`, pois essa é uma API privada.
- Tipo de `Appearance.setColorScheme()` foi atualizado para não aceitar mais um valor nullable
  - Use 'unspecified' em vez de null/undefined no caso extremo em que o esquema de cores precise ser redefinido.

#### iOS

- Migrou `RCTDisplayLink` da API legada `RCTModuleData` pois planejamos removê-la no futuro.

#### Android

- Classe `com.facebook.react.bridge.JSONArguments` foi removida pois estava acidentalmente `public`
- Depreciar `MessageQueueThreadPerfStats`
  - Depreciamos esta API e a substituímos por stub. Você não deve mais confiar em estatísticas desta API, pois as estatísticas fornecidas não eram confiáveis
- Atualizar Gradle de 8.x para 9.0.0
  - Lista de todas as mudanças na próxima versão estável principal do Gradle 9.0.0 está disponível [aqui](https://gradle.org/whats-new/gradle-9/), mas não esperamos nenhum impacto para os usuários

#### C++

- Deletar headers de compatibilidade retroativa para `CallbackWrapper.h` / `LongLivedObject.h`
  - O include correto para esses headers é `#include <react/bridging/LongLivedObject.h>` e `#include <react/bridging/CallbackWrapper.h>`.
  - Você não deve usar os includes antigos sob `#import <ReactCommon/….h>`

Leia a lista completa de breaking changes no [CHANGELOG para 0.82](https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0820).

## Agradecimentos

React Native 0.82 contém mais de 868 commits de 93 contribuidores. Obrigado por todo o trabalho árduo!

Queremos enviar um agradecimento especial aos membros da comunidade que enviaram contribuições significativas neste lançamento:

- [Dawid Małecki](https://github.com/coado) e [Jakub Piasecki](https://github.com/j-piasecki) pela ajuda no lançamento do Hermes V1.
- [Krystof Woldrich](https://github.com/krystofwoldrich) pelo suporte na correção da supressão de rejeições de promise não capturadas.
- [Riccardo Cipolleschi](https://github.com/cipolleschi) pelo suporte na escrita dos parágrafos sobre React 19.1.1 e Hermes V1 acima.
- [Rubén Norte](https://github.com/rubennorte) pelo suporte na escrita dos parágrafos sobre DOM API e Performance API.
- [Tomasz Zawadzki](https://github.com/tomekzaw/) pelo suporte no benchmarking do `debugOptimized`.

## Atualizar para 0.82

Use o [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) para visualizar as mudanças de código entre as versões do React Native para projetos existentes, além da [documentação sobre atualização para novas versões](/docs/upgrading).

Para criar um novo projeto:

```bash
npx @react-native-community/cli@latest init MyProject --version latest
```

Se você usa Expo, React Native 0.82 estará disponível como parte dos lançamentos expo@canary.

O próximo SDK, SDK 55, será enviado com o próximo lançamento estável do React Native: 0.83.

:::info

0.82 agora é a versão estável mais recente do React Native e 0.79.x passa a não ter suporte. Para mais informações, consulte [a política de suporte do React Native](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md).

:::
