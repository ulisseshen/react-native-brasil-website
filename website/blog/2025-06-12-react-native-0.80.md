---
ia-translated: true
title: 'React Native 0.80 - React 19.1, Mudanças na API JavaScript, Congelamento da Legacy Arch e muito mais'
authors: [hezi, fabriziocucci, gabrieldonadel, chrfalch]
tags: [engineering]
date: 2025-06-12T16:01
---

# React Native 0.80 - React 19.1, Mudanças na API JavaScript, Congelamento da Legacy Arch e muito mais

Hoje estamos animados em lançar o React Native 0.80!

Este lançamento traz a versão do React que enviamos dentro do React Native para a mais recente versão estável disponível: 19.1.0.

Também estamos lançando uma série de melhorias de estabilidade em nossa API JavaScript: deep imports agora dispararão um aviso e estamos oferecendo uma nova API TypeScript Strict opcional que oferece tipos mais precisos e seguros de usar.

Além disso, a Legacy Architecture do React Native agora está oficialmente congelada, e você começará a ver avisos para APIs que deixarão de funcionar assim que descontinuarmos totalmente a Legacy Architecture.

### Destaques

- [Depreciação de deep imports JavaScript](/blog/2025/06/12/react-native-0.80#javascript-deep-imports-deprecation)
- [Congelamento e Avisos da Legacy Architecture](/blog/2025/06/12/react-native-0.80#legacy-architecture-freezing--warnings)
- [React 19.1.0](/blog/2025/06/12/react-native-0.80#react-1910)
- [Experimental - Dependências iOS do React Native agora são pré-compiladas](/blog/2025/06/12/react-native-0.80#experimental---react-native-ios-dependencies-are-now-prebuilt)

<!--truncate-->

## Destaques

### Depreciação de deep imports JavaScript {:#javascript-deep-imports-deprecation}

Neste lançamento, estamos fazendo mudanças para melhorar e estabilizar a API JavaScript pública do React Native. O primeiro passo nessa direção é um melhor escopo de quais de nossas APIs são importáveis por apps e frameworks. Alinhado com isso, estamos formalmente depreciando deep imports do React Native ([veja RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894)), e estamos introduzindo avisos via ESLint e o console JavaScript.

Esses avisos são limitados a imports de dentro do código-fonte do seu projeto, e podem ser [desativados](/docs/strict-typescript-api). No entanto, tenha em mente que nosso objetivo é remover deep imports da API do React Native em um lançamento futuro, e esses devem ser atualizados para o import raiz.

```js
// Antes - import de subpath
import {Alert} from 'react-native/Libraries/Alert/Alert';

// Depois - import de `react-native`
import {Alert} from 'react-native';
```

Algumas APIs não são exportadas na raiz, e ficarão indisponíveis sem deep imports. Isso é intencional, para reduzir a superfície geral da API do React Native. Temos um [tópico de feedback](https://github.com/react-native-community/discussions-and-proposals/discussions/893) aberto para problemas de usuários, e estaremos trabalhando com a comunidade para finalizar quais APIs exportamos durante (pelo menos) os próximos dois lançamentos do React Native. Por favor, compartilhe seu feedback!

Saiba mais sobre esta mudança em nossa postagem dedicada: [Avançando em Direção a uma API JavaScript Estável](/blog/2025/06/12/moving-towards-a-stable-javascript-api).

#### API TypeScript Strict opcional {:#opt-in-strict-typescript-api}

Com a redefinição acima das exportações em nossa API pública, também estamos enviando um novo conjunto de tipos TypeScript para o pacote `react-native` na versão 0.80, que estamos chamando de API TypeScript Strict.

Optar pela API TypeScript Strict é uma prévia do nosso futuro, uma API JavaScript estável para React Native. Esses novos tipos são:

1. **Gerados diretamente do nosso código-fonte** — melhorando cobertura e correção, para que você possa esperar garantias de compatibilidade mais fortes.
2. **Restritos ao arquivo index do React Native** — definindo mais rigidamente nossa API pública, e significando que não quebraremos a API ao fazer alterações internas de arquivos.

Estamos enviando esses junto com nossos tipos existentes, o que significa que você pode escolher migrar quando estiver pronto. Além disso, se você estiver usando APIs padrão do React Native, muitos apps devem validar **sem alterações**. Encorajamos fortemente adotantes iniciais e apps recém-criados a optar via seu arquivo `tsconfig.json`.

Quando a comunidade estiver pronta, a API TypeScript Strict se tornará nossa API padrão no futuro — sincronizada com a remoção de deep imports.

Saiba mais sobre esta mudança em nossa postagem dedicada: [Avançando em Direção a uma API JavaScript Estável](/blog/2025/06/12/moving-towards-a-stable-javascript-api).

### Congelamento e Avisos da Legacy Architecture {:#legacy-architecture-freezing--warnings}

A New Architecture do React Native é a escolha padrão [desde a versão 0.76](/blog/2024/10/23/the-new-architecture-is-here) e temos lido [histórias de sucesso](https://blog.kraken.com/product/engineering/how-kraken-fixed-performance-issues-via-incremental-adoption-of-the-react-native-new-architecture) de projetos e ferramentas que se beneficiam enormemente dela.

[Compartilhamos recentemente](https://github.com/reactwg/react-native-new-architecture/discussions/290) que agora consideramos a Legacy Architecture como congelada. Não estaremos mais desenvolvendo novos bugfixes ou recursos na Legacy Architecture e vamos parar de testar a Legacy Architecture ao trabalhar em um lançamento.

Para facilitar a migração, ainda estamos permitindo que usuários desativem a New Architecture se você estiver enfrentando bugs ou regressões.

No entanto, enviar duas arquiteturas com React Native é um desafio enorme, que impacta o desempenho em tempo de execução, tamanho do app e manutenção de nossa base de código.

É por isso que eventualmente teremos que descontinuar a Legacy Architecture em algum momento no futuro.

Na versão 0.80, adicionamos uma série de avisos que aparecerão no React Native DevTools para avisá-lo se você estiver usando APIs que não funcionarão na New Architecture.

Recomendamos que você não ignore esses avisos e considere migrar seus apps e bibliotecas para a New Architecture para estar pronto para o futuro.

![legacy architecture warnings](../static/blog/assets/0.80-legacy-arch-warnings.png)

Você pode aprender mais sobre essas mudanças na palestra "Life After Legacy: The New Architecture Future" [que apresentamos recentemente na App.js](https://www.youtube.com/live/K2JTTKpptGs?si=tRkT535f0GzguVGt&t=9011).

### React 19.1.0 {:#react-1910}

Este lançamento do React Native vem com a última versão estável do React: 19.1.0

Você pode ler sobre todos os novos recursos e bugfixes introduzidos no React 19.1.0 na [descrição do lançamento](https://github.com/facebook/react/releases/tag/v19.1.0).

:::warning

Um recurso notável do React 19.1.0 é a implementação e melhorias de owner stacks. Este é um recurso apenas para desenvolvimento que deve ajudá-lo a identificar qual componente é responsável por um erro específico.

No entanto, estamos cientes de que owner stacks não estão funcionando como esperado no React Native se você usar o plugin Babel `@babel/plugin-transform-function-name`, que está habilitado por padrão no React Native Babel Preset. Enviaremos uma correção para isso em um lançamento futuro do React Native.

:::

### Experimental - Dependências iOS do React Native agora são pré-compiladas {:#experimental---react-native-ios-dependencies-are-now-prebuilt}

Se você está construindo um app iOS em React Native, provavelmente notou que a primeira compilação nativa levará algum tempo: alguns minutos ou até mais em máquinas mais antigas. Isso ocorre porque precisamos compilar todo o código iOS do React Native mais todas as suas dependências.

Nas últimas semanas, temos experimentado pré-compilar parte do núcleo do React Native para iOS, de forma similar ao que acontece no Android, para reduzir o tempo de compilação quando você está executando um app React Native pela primeira vez.

O React Native 0.80 é o primeiro lançamento que pode enviar parte do React Native para iOS como pré-compilado para ajudar a reduzir os tempos de compilação.

Durante o processo de lançamento do React Native, estamos produzindo um XCFramework chamado `ReactNativeDependencies.xcframework` que é uma versão pré-compilada apenas das dependências de terceiros das quais o React Native depende.

Experimentamos e medimos quanto tempo esta pré-compilação inicial para iOS está economizando e, em nossos benchmarks, executados em uma máquina M4, as compilações iOS são aproximadamente 12% mais rápidas com a pré-compilação em vez de compilar a partir do código-fonte.

A partir de nossa experiência, também observamos que vários relatórios de bugs de usuários são causados por problemas de compilação relacionados às dependências de terceiros do React Native (exemplo [#39568](https://github.com/facebook/react-native/issues/39568)).
Pré-compilar as dependências de terceiros nos permite compilá-las para você, para que você não enfrente mais esses problemas de compilação.

Observe que não estamos pré-compilando todo o React Native: estamos apenas pré-compilando as bibliotecas que a Meta não controla diretamente, como Folly e GLog.

Em um lançamento futuro, também enviaremos o restante do núcleo do React Native como pré-compilado.

#### Como usá-los {:#how-to-use-them}

Este recurso ainda é experimental, então não está ativado por padrão.

Se você quiser usá-los, pode instalar seus pods adicionando a variável de ambiente `RCT_USE_RN_DEP`:

```bash
RCT_USE_RN_DEP=1 bundle exec pod install
```

Alternativamente, se você quiser habilitá-lo para todos os desenvolvedores trabalhando nisso, pode modificar seu Podfile assim:

```diff
if linkage != nil
  Pod::UI.puts "Configuring Pod with #{linkage}ally linked Frameworks".green
  use_frameworks! :linkage => linkage.to_sym
end

+ENV['RCT_USE_RN_DEP'] = '1'

target 'HelloWorld' do
  config = use_native_modules!
```

Por favor, reporte qualquer problema que as pré-compilações possam causar a você e ao seu app [nesta discussão](https://github.com/react-native-community/discussions-and-proposals/discussions/912). Estamos comprometidos em investigá-los e garantir que seu uso seja transparente para seu app.

## Outras Mudanças

### Android - Tamanho de APK menor graças ao IPO {:#android---smaller-apk-size-thanks-to-ipo}

Este lançamento vem com redução significativa de tamanho para todos os apps Android construídos com React Native. A partir da versão 0.80, habilitamos [Otimização Interprocedural](https://en.wikipedia.org/wiki/Interprocedural_optimization) para compilações do React Native e Hermes.

Isso resultou em uma economia de ~1Mb para todos os apps Android.

![android apk size comparison](../static/blog/assets/0.80-android-apk-size.png)

Você obterá essa redução de tamanho atualizando sua versão do React Native para 0.80 e não há mais alterações necessárias em seu projeto.

### Redesign da tela de novo app {:#new-app-screen-redesign}

Se você não está usando Expo mas está usando o Community CLI & Template, nesta versão movemos a tela de novo app para seu [próprio pacote](https://www.npmjs.com/package/@react-native/new-app-screen) e demos a ela uma nova aparência. Isso reduz o boilerplate de código inicial quando você cria um novo app com o Community Template, e também fornece uma melhor experiência quando visualizado em telas maiores.

![New App Screen redesign](../static/blog/assets/0.80-new-community-template-landing.jpg)

### Aviso sobre suporte comunitário ao JSC {:#notice-about-jsc-community-support}

React Native 0.80 é a última versão do React Native a oferecer suporte JSC de primeira parte. O suporte para JSC será oferecido via pacote mantido pela comunidade `@react-native-community/javascriptcore`.

Caso você tenha perdido o anúncio, você pode [ler mais sobre isso aqui](/blog/2025/04/08/react-native-0.79#jsc-moving-to-community-package)

## Breaking Changes

### Adicionado campo `"exports"` no pacote principal {:#added-exports-field-on-main-package}

Como parte de nossas mudanças na API JavaScript Estável, introduzimos um [campo `"exports"`](https://nodejs.org/api/packages.html#package-entry-points) no manifesto `package.json` do `react-native`.

Na versão 0.80, esse mapeamento continua a expor **todos os subpaths JavaScript** por padrão, e, portanto, não deve ser uma breaking change importante. Ao mesmo tempo, isso pode afetar sutilmente como os módulos dentro do pacote `react-native` são resolvidos:

- No Metro, [extensões específicas de plataforma](https://metrobundler.dev/docs/package-exports#replacing-platform-specific-extensions) não serão automaticamente expandidas contra correspondências de `"exports"`. Fornecemos vários módulos shim para acomodar isso ([#50426](https://github.com/facebook/react-native/pull/50426)).
- No Jest, a capacidade de fazer mock de deep imports pode ser alterada, o que pode exigir a atualização de testes.

### Outras Breaking Changes {:#other-breaking-changes}

Esta lista contém uma série de outras breaking changes que suspeitamos que possam ter um impacto menor no código do seu produto e vale a pena notar:

### JS

- Atualizamos `eslint-plugin-react-hooks` da v4.6.0 para v5.2.0 (veja o [changelog completo aqui](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/CHANGELOG.md)). As regras de lint `react-hooks` podem produzir novos sinais de erro que você terá que corrigir ou suprimir

### Android

- Este lançamento atualiza a versão do Kotlin enviada com React Native para a versão 2.1.20. Kotlin 2.1 introduz novos recursos de linguagem em preview que você pode começar a usar em seus módulos/componentes. Você pode ler mais sobre isso nas [notas de lançamento oficiais](https://kotlinlang.org/docs/whatsnew21.html).
- Excluímos a classe `StandardCharsets`. Ela foi depreciada desde a versão 0.73. Você deve usar a classe `java.nio.charset.StandardCharsets` em vez disso.
- Tornamos várias classes internas. Essas classes não fazem parte da API pública e não devem ser acessadas. Já notificamos ou submetemos patches para as bibliotecas afetadas:
  - `com.facebook.react.fabric.StateWrapperImpl`
  - `com.facebook.react.modules.core.ChoreographerCompat`
  - `com.facebook.react.modules.common.ModuleDataCleaner`
- Migramos várias classes de Java para Kotlin. Se você estiver usando essas classes, a nulabilidade e tipos de alguns parâmetros mudaram, então você pode precisar ajustar seu código:
  - Todas as classes dentro de `com.facebook.react.devsupport`
  - `com.facebook.react.bridge.ColorPropConverter`
  - `com.facebook.react.views.textinput.ReactEditText`
  - `com.facebook.react.views.textinput.ReactTextInputManager`

### iOS

- Excluímos o campo `RCTFloorPixelValue` de RCTUtils.h - O método `RCTFloorPixelValue` não foi usado no React Native e o removemos completamente.

Outras breaking changes menores estão listadas [no CHANGELOG para 0.80](https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0800).

## Agradecimentos

O React Native 0.80 contém mais de 1167 commits de 127 contribuidores. Obrigado por todo o seu trabalho árduo!

Queremos enviar um agradecimento especial àqueles membros da comunidade que enviaram contribuições significativas neste lançamento:

- [Christian Falch](https://github.com/chrfalch) pelo trabalho nas pré-compilações iOS para React Native Dependencies
- [Iwo Plaza](https://x.com/iwoplaza), [Jakub Piasecki](https://x.com/breskin67), e [Dawid Małecki](https://github.com/coado) pelo trabalho na API TypeScript Strict.

Além disso, também queremos agradecer aos autores adicionais que trabalharam na documentação de recursos nesta postagem de lançamento:

- [Riccardo Cipolleschi](https://github.com/cipolleschi) por escrever a parte relacionada às pré-compilações iOS para React Native Dependencies.
- [Alex Hunt](https://x.com/huntie) por Depreciação de deep imports, API TypeScript Strict opcional, Redesign da tela de novo app.
- [Nicola Corti](https://x.com/cortinico) por Congelamento e Avisos da Legacy Architecture.

## Atualizar para 0.80

Por favor, use o [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) para visualizar alterações de código entre versões do React Native para projetos existentes, além da documentação de Atualização.

Para criar um novo projeto:

Se você usa Expo, o React Native 0.80 será suportado em um lançamento canary do Expo SDK. Instruções sobre como usar o React Native 0.80 no Expo também estão disponíveis [em uma postagem de blog dedicada](https://expo.dev/changelog/react-native-80).

:::info

0.80 é agora a versão estável mais recente do React Native e 0.77.x passa para não suportado. Para mais informações, veja a política de suporte do React Native. Pretendemos publicar uma atualização final de fim de vida útil da versão 0.77 em um futuro próximo.

:::
