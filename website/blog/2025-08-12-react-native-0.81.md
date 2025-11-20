---
ia-translated: true
title: 'React Native 0.81 - Suporte ao Android 16, builds iOS mais rápidos e muito mais'
authors: [motiz88, vzaidman, gabrieldonadel, chrfalch]
tags: [engineering]
date: 2025-08-12
---

# **React Native 0.81 - Suporte ao Android 16, builds iOS mais rápidos e muito mais**

Hoje estamos animados em lançar o React Native 0.81!

Esta versão traz suporte ao Android 16 (API level 36) e inclui uma variedade de outras melhorias de estabilidade e correções de bugs, além de suporte experimental para builds iOS mais rápidos usando pré-compilação.

### Destaques

- [Suporte ao Android 16](/blog/2025/08/12/react-native-0.81#android-16-support)
- [Descontinuação do SafeAreaView](/blog/2025/08/12/react-native-0.81#safeareaview-deprecation)
- [Suporte ao JavaScriptCore mantido pela comunidade](/blog/2025/08/12/react-native-0.81#community-maintained-javascriptcore-support)
- [Builds iOS pré-compilados experimentais](/blog/2025/08/12/react-native-0.81#experimental-precompiled-ios-builds)

<!--truncate-->

## Destaques

### Suporte ao Android 16

Aplicativos Android construídos com React Native 0.81 agora terão como alvo padrão o **Android 16** (API level 36).

Como anunciado anteriormente pelo Google, o Android 16 exige que [aplicativos sejam exibidos edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge) sem suporte para [optar por não participar](https://developer.android.com/about/versions/16/behavior-changes-16).

Para suportar isso, estamos descontinuando o componente `<SafeAreaView>` [como anunciado anteriormente](https://github.com/react-native-community/discussions-and-proposals/discussions/827) em favor de alternativas. [Veja abaixo](#safeareaview-deprecation) que fornecerão melhor suporte edge-to-edge.

Também estamos adicionando uma nova propriedade gradle `edgeToEdgeEnabled` para permitir que você escolha se deseja habilitar edge-to-edge em todas as versões do Android suportadas abaixo de 16.

[Predictive back gesture](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture) agora está habilitado por padrão para aplicativos que têm como alvo o Android 16. A API [BackHandler](https://reactnative.dev/docs/backhandler) deve continuar funcionando como antes para a maioria dos casos de uso. No entanto, se seu aplicativo depende de código nativo personalizado para tratamento de navegação de volta (como sobrescrever o método `onBackPressed()`), você pode precisar migrar manualmente seu código ou [optar temporariamente por não participar](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture#opt-out). Por favor, teste a navegação de volta do seu aplicativo completamente após a atualização.

O Google agora espera que os aplicativos suportem [layouts adaptativos](https://developer.android.com/develop/ui/compose/layouts/adaptive) em dispositivos de tela grande, independentemente de restrições de orientação ou tamanho. Embora você possa optar por não participar por enquanto, é recomendado testar e atualizar seu aplicativo para UI responsiva em telas grandes antes do Android 17.

A partir de 1º de novembro de 2025, todos os envios de aplicativos para o Google Play devem atender ao requisito de tamanho de página de 16 KB para binários nativos. Isso se aplica a novos aplicativos e atualizações direcionadas a dispositivos Android 15+. **React Native já está em conformidade com o tamanho de página de 16KB**. Certifique-se de que todo o seu código nativo e bibliotecas de terceiros também estejam em conformidade.

Para mais detalhes sobre as mudanças do Android 16 e etapas de migração, consulte esta [postagem no discussions-and-proposals](https://github.com/react-native-community/discussions-and-proposals/discussions/921).

### Descontinuação do SafeAreaView

O componente integrado `<SafeAreaView>` foi originalmente projetado para fornecer **suporte limitado, apenas para iOS** para manter o conteúdo nas "áreas seguras" da tela (longe de entalhes de câmera, cantos arredondados, etc). Ele não é compatível com renderização edge-to-edge no Android e não permite personalização além do padding. Como resultado, muitos aplicativos optaram por soluções mais portáveis e flexíveis, como <code>[react-native-safe-area-context](https://appandflow.github.io/react-native-safe-area-context/)</code>.

No React Native 0.81, o componente legado `<SafeAreaView>` está descontinuado, e você verá avisos no React Native DevTools se seu aplicativo usá-lo.

Ele será removido em uma versão futura do React Native. Recomendamos que você migre para `react-native-safe-area-context` ou uma biblioteca similar para garantir que seu aplicativo tenha a melhor aparência em todas as plataformas.

### Suporte ao JavaScriptCore mantido pela comunidade

[Como anunciamos no ano passado](https://reactnative.dev/blog/2025/04/08/react-native-0.79#jsc-moving-to-community-package), o suporte para o engine JavaScriptCore (JSC) foi movido para um [pacote mantido pela comunidade](https://github.com/react-native-community/javascriptcore) que é lançado separadamente do próprio React Native. No React Native 0.81, estamos removendo a versão integrada do JavaScriptCore. Todos os aplicativos que exigem JavaScriptCore agora devem usar o pacote da comunidade para atualizar para 0.81. [Leia as instruções de instalação](https://github.com/react-native-community/javascriptcore#installation) para os detalhes.

Esta mudança não afeta aplicativos que estão usando Hermes.

### Builds iOS pré-compilados experimentais

React Native 0.81 introduz builds iOS pré-compilados, reduzindo os tempos de compilação em até 10x em projetos onde React Native é a dependência principal. Este é o resultado de uma colaboração entre Expo e Meta, e expande o [trabalho que enviamos anteriormente no React Native 0.80](https://reactnative.dev/blog/2025/06/12/react-native-0.80#experimental---react-native-ios-dependencies-are-now-prebuilt).

Este recurso ainda é experimental, mas esperamos habilitá-lo para todos os aplicativos em uma versão futura. Se você quiser experimentar builds pré-compilados em seu próprio aplicativo, você pode habilitá-los especificando as seguintes variáveis de ambiente quando executar `pod install`:

```bash
RCT_USE_RN_DEP=1 RCT_USE_PREBUILT_RNCORE=1 bundle exec pod install
```

Por favor, forneça feedback nesta [discussão no GitHub](https://github.com/react-native-community/discussions-and-proposals/discussions/923).

Existem duas limitações das quais já estamos cientes e estamos trabalhando para resolver:

- Em builds pré-compilados, você não pode depurar e entrar nos internos do React Native. Você ainda pode depurar seu _próprio_ código nativo enquanto usa uma versão pré-compilada do React Native.
- Prebuilds não são suportados no Xcode 26 Beta, porque a IDE constrói todos os alvos com [Swift explicit modules](https://developer.apple.com/documentation/xcode-release-notes/xcode-26-release-notes#Resolved-Issues-in-Xcode-26-Beta:~:text=Starting%20from%20Xcode%2026%2C%20Swift%20explicit%20modules%20will%20be%20the%20default%20mode%20for%20building%20all%20Swift%20targets) habilitados. Para usar builds pré-compilados com Xcode 26, defina a flag `SWIFT_ENABLE_EXPLICIT_MODULES` como `NO` no seu projeto Xcode. Abordaremos isso em uma próxima versão de correção.

Você pode ler mais sobre este recurso no post completo do blog do Expo, [Precompiled React Native for iOS: Faster builds are coming in 0.81](https://expo.dev/blog/precompiled-react-native-for-ios).

## Breaking Changes

### Node.js mínimo aumentado para 20

React Native agora requer [Node.js](https://nodejs.org/) versão 20.19.4 (a última versão [Maintenance LTS](https://nodejs.org/en/about/previous-releases) no momento da escrita) ou superior. Você pode precisar atualizar o Node.js em seu ambiente de desenvolvimento ou CI quando atualizar para React Native 0.81.

### Xcode mínimo aumentado para 16.1

React Native agora requer [Xcode 16.1](https://developer.apple.com/documentation/xcode-release-notes/xcode-16_1-release-notes) ou superior para construir projetos iOS. Você pode precisar atualizar o Xcode em seu ambiente de desenvolvimento ou CI quando atualizar para React Native 0.81.

### Metro: Melhor suporte para configuração avançada em projetos Community CLI

Metro agora respeita as opções <code>[resolveRequest](https://metrobundler.dev/docs/configuration#resolverequest)</code> e <code>[getModulesRunBeforeMainModule](https://metrobundler.dev/docs/configuration/#getmodulesrunbeforemainmodule)</code> se especificadas no arquivo `metro.config.js` de um projeto React Native Community CLI. Anteriormente, configurá-las não teria efeito. Se você tiver valores personalizados para essas opções em seu arquivo <code>[metro.config.js](https://metrobundler.dev/docs/configuration/)</code>, você pode precisar excluí-los para restaurar o comportamento anterior.

### Relatório aprimorado de erros JavaScript não capturados

React Native DevTools agora mostra a mensagem original e o stack trace de erros JavaScript não capturados, bem como a [causa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) do erro, se houver, e uma [Owner Stack](https://react.dev/reference/react/captureOwnerStack#owner-stack-vs-component-stack) para erros lançados por componentes. Isso torna os erros mais fáceis de depurar e corrigir.

![Example error including a cause and Owner Stack](../static/blog/assets/0.81-improved-uncaught-error.png)

Se você está registrando erros JavaScript em seu backend ou em um serviço de relatório de erros de terceiros, isso pode afetar os logs que você vê após atualizar para React Native 0.81 (por exemplo: você pode ver mais erros lançados que costumavam ser relatados via `console.error`), e você pode precisar atualizar alguma lógica do backend de acordo.

### `RN_SERIALIZABLE_STATE` e flags C++.

Nesta versão do React Native, introduzimos uma nova macro chamada `RN_SERIALIZABLE_STATE` para suportar estado serializável para os Components na New Architecture.

Se você é autor de biblioteca e tem um arquivo **personalizado** `CMakeLists.txt`, você precisará especificar esta macro em seu arquivo CMakeLists.txt ou seu código C++ pode falhar ao compilar.

Para suportar isso, introduzimos uma nova função CMake chamada `target_compile_reactnative_options` que cuidará de configurar esta macro e todas as flags C++ necessárias para você. Você pode invocá-la da seguinte forma em seu arquivo CMakeLists:

```cmake
target_compile_reactnative_options(myLibraryName PRIVATE)
```

Você pode ver um exemplo de [como react-native-screens configurou esta macro](https://github.com/software-mansion/react-native-screens/pull/3114/commits/b4d283c8fc65e36ec60726fd7513735ccc7e1fe9).

Esta mudança afetará apenas bibliotecas mais avançadas e complexas. Se sua biblioteca está usando codegen e você não tem um arquivo CMake personalizado, você não será afetado por esta mudança.

### Outras Breaking Changes

Esta lista contém uma série de outras breaking changes que suspeitamos que possam ter um impacto menor no seu código de produto e valem a pena notar:

#### Android

- Tornamos várias classes internas. Essas classes não fazem parte da API pública e não devem ser acessadas. Já notificamos ou submetemos patches para as bibliotecas afetadas:
  - `com.facebook.react.fabric.mounting.MountingManager`
  - `com.facebook.react.views.text.TextLayoutManager`
- Movemos a [native prop](https://github.com/facebook/react-native/blob/841866c35401ae05fa9c6a2a3e9b42714bbd291e/packages/react-native/ReactCommon/react/renderer/attributedstring/ParagraphAttributes.h#L83) `textAlignVertical` de `TextAttribute.h` para `ParagraphAttribute.h`
  - A prop `textAlignVertical` afeta apenas a visualização de texto mais superior (visualização de parágrafo). No entanto, ela existe nas props de atributo de texto de qualquer forma. Para melhor refletir esta limitação da plataforma, ela foi movida para props de parágrafo.
  - Esta mudança **não** está afetando a API JS do componente `<Text>`.
  - Você será afetado por esta mudança apenas se implementar um componente Fabric que interage com a API C++ Text.
  - Se você for afetado por esta mudança, você pode substituir `TextAttributes.h` por `ParagraphAttribute.h` em seu código

Leia a lista completa de breaking changes [no CHANGELOG para 0.81](https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0810).

## Agradecimentos

React Native 0.81 contém mais de 1110 commits de 110 colaboradores. Obrigado por todo o seu trabalho árduo!

<!--alex ignore special retext-equality-->

Queremos enviar um agradecimento especial aos membros da comunidade que enviaram contribuições significativas nesta versão:

- [Christian Falch](https://github.com/chrfalch) pelo trabalho incrível em builds iOS pré-compilados. <!-- // @case-police-ignore Mathieu -->
- [Mathieu Acthernoene](https://github.com/zoontek) por contribuições cruciais para o suporte edge-to-edge do Android
- [Enrique López-Mañas](https://github.com/kikoso) por ajudar a testar a integração do Android 16 e a descontinuação do SafeAreaView.

## Atualizar para 0.81

Por favor, use o [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) para visualizar as mudanças de código entre as versões do React Native para projetos existentes, além da documentação de Upgrading.

Para criar um novo projeto:

```
npx @react-native-community/cli@latest init MyProject --version latest
```

Se você usa Expo, React Native 0.81 será suportado no próximo Expo SDK 54 como a versão padrão do React Native.

:::info

0.81 agora é a versão estável mais recente do React Native e 0.78.x passa para não suportado. Para mais informações, consulte [política de suporte do React Native](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md).

:::
