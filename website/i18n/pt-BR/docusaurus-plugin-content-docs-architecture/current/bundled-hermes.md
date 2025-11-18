---
ia-translated: true
id: bundled-hermes
title: Bundled Hermes
---

Esta página fornece uma visão geral de **como** Hermes e React Native **são construídos**.

Se você está procurando instruções sobre como usar Hermes no seu aplicativo, você pode encontrar instruções nesta outra página: [usando Hermes](/docs/hermes)

:::caution
Por favor, note que esta página serve como um mergulho técnico profundo e é direcionada para usuários que estão construindo extensões em cima de Hermes ou React Native. Usuários gerais do React Native não devem precisar conhecer informações aprofundadas sobre como React Native e Hermes interagem.
:::

## O que é 'Bundled Hermes'

A partir do React Native 0.69.0, cada versão do React Native será **construída juntamente** com uma versão do Hermes. Chamamos este modelo de distribuição de **Bundled Hermes**.

A partir de 0.69, você sempre terá um motor JS que foi construído e testado juntamente com cada versão do React Native que você pode usar.

## Por que mudamos para 'Bundled Hermes'

Historicamente, React Native e Hermes seguiram dois **processos de lançamento distintos** com versionamento distinto. Ter lançamentos distintos com números distintos criou confusão no ecossistema OSS, onde não estava claro se uma versão específica de Hermes era compatível com uma versão específica de React Native (ou seja, você precisava saber que Hermes 0.11.0 era compatível apenas com React Native 0.68.0, etc.)

Tanto Hermes quanto React Native compartilham o código JSI ([Hermes aqui](https://github.com/facebook/hermes/tree/main/API/jsi/jsi) e [React Native aqui](https://github.com/facebook/react-native/tree/main/packages/react-native/ReactCommon/jsi/jsi)). Se as duas cópias de JSI ficarem dessincronizadas, uma build de Hermes não será compatível com uma build de React Native. Você pode ler mais sobre este [problema de incompatibilidade ABI aqui](https://github.com/react-native-community/discussions-and-proposals/issues/257).

Para superar este problema, estendemos o processo de lançamento do React Native para baixar e construir Hermes e garantimos que apenas uma cópia de JSI seja usada ao construir Hermes.

Graças a isso, podemos lançar uma versão de Hermes sempre que lançamos uma versão do React Native, e ter certeza de que o motor Hermes que construímos é **totalmente compatível** com a versão do React Native que estamos lançando. Estamos enviando esta versão de Hermes juntamente com a versão do React Native que estamos fazendo, daí o nome _Bundled Hermes_.

## Como isso impactará desenvolvedores de aplicativos

Como mencionado na introdução, se você é um desenvolvedor de aplicativos, esta mudança **não deve afetá-lo** diretamente.

Os parágrafos seguintes descrevem quais mudanças fizemos internamente e explicam algumas das justificativas, por uma questão de transparência.

### Usuários iOS

No iOS, movemos o `hermes-engine` que você está usando.

Antes do React Native 0.69, usuários baixavam um pod (aqui você pode encontrar o [podspec](https://github.com/CocoaPods/Specs/blob/master/Specs/5/d/0/hermes-engine/0.11.0/hermes-engine.podspec.json)).

No React Native 0.69, usuários usariam em vez disso um podspec que é definido dentro do arquivo `sdks/hermes-engine/hermes-engine.podspec` no pacote NPM `react-native`.
Esse podspec depende de um tarball pré-construído de Hermes que fazemos upload para Maven e para o React Native GitHub Release, como parte do processo de lançamento do React Native (ou seja, [veja os assets deste lançamento](https://github.com/facebook/react-native/releases/tag/v0.70.4)).

### Usuários Android

No Android, vamos atualizar o arquivo [`android/app/build.gradle`](https://github.com/facebook/react-native/blob/main/template/android/app/build.gradle) no template padrão da seguinte forma:

```diff
dependencies {
    // ...

    if (enableHermes) {
+       implementation("com.facebook.react:hermes-engine:+") {
+           exclude group:'com.facebook.fbjni'
+       }
-       def hermesPath = "../../node_modules/hermes-engine/android/";
-       debugImplementation files(hermesPath + "hermes-debug.aar")
-       releaseImplementation files(hermesPath + "hermes-release.aar")
    } else {
        implementation jscFlavor
    }
}
```

Antes do React Native 0.69, usuários consumirão `hermes-debug.aar` e `hermes-release.aar` do pacote NPM `hermes-engine`.

No React Native 0.69, usuários consumirão os artefatos Android multi-variantes disponíveis dentro da pasta `android/com/facebook/react/hermes-engine/` no pacote NPM `react-native`.
Por favor, note também que vamos [remover a dependência](https://github.com/facebook/react-native/blob/c418bf4c8fe8bf97273e3a64211eaa38d836e0a0/package.json#L105) em `hermes-engine` inteiramente em uma das futuras versões do React Native.

#### Usuários Android na Nova Arquitetura

Devido à natureza de nossa configuração de build de código nativo (ou seja, como usamos o NDK), usuários na Nova Arquitetura estarão **construindo Hermes a partir do código fonte**.

Isso alinha o mecanismo de build do React Native e Hermes para usuários na Nova Arquitetura (eles construirão ambos os frameworks a partir do código fonte).
Isso significa que tais usuários Android podem experimentar uma queda de desempenho no tempo de build em sua primeira build.

Você pode encontrar instruções para otimizar seu tempo de build e reduzir o impacto em sua build nesta página: [Acelerando sua fase de Build](/docs/next/build-speed).

#### Usuários Android na Nova Arquitetura construindo no Windows

Usuários construindo aplicativos React Native, com a Nova Arquitetura, em máquinas Windows precisam seguir esses passos extras para que a build funcione corretamente:

- Certifique-se de que o [ambiente está configurado corretamente](https://reactnative.dev/docs/environment-setup), com Android SDK e node.
- Instale [cmake](https://community.chocolatey.org/packages/cmake) com Chocolatey
- Instale um dos seguintes:
  - [Build Tools for Visual Studio 2022](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022).
  - [Visual Studio 22 Community Edition](https://visualstudio.microsoft.com/vs/community/) - Escolher apenas o desenvolvimento de desktop C++ é suficiente.
- Certifique-se de que o [Visual Studio Command Prompt](https://docs.microsoft.com/en-us/visualstudio/ide/reference/command-prompt-powershell?view=vs-2022) está configurado corretamente. Isso é necessário pois a variável de ambiente adequada do compilador C++ é configurada nesses prompts de comando.
- Execute o aplicativo com `npx react-native run-android` dentro de um Visual Studio Command Prompt.

### Usuários ainda podem usar outro motor?

Sim, usuários são livres para habilitar/desabilitar Hermes (com a variável `enableHermes` no Android, `hermes_enabled` no iOS).
A mudança 'Bundled Hermes' impactará apenas **como Hermes é construído e empacotado** para você.

A partir do React Native 0.70, o padrão para `enableHermes`/`hermes_enabled` é `true`.

## Como isso impactará colaboradores e desenvolvedores de extensões

Se você é um colaborador do React Native ou está construindo uma extensão em cima do React Native ou Hermes, por favor continue lendo enquanto explicamos como Bundled Hermes funciona.

### Como Bundled Hermes está funcionando internamente?

Este mecanismo depende de **baixar um tarball** com o código fonte de Hermes do repositório `facebook/hermes` dentro do repositório `facebook/react-native`. Temos um mecanismo similar em funcionamento para outras dependências nativas (Folly, Glog, etc.) e alinhamos Hermes para seguir a mesma configuração.

Ao construir React Native a partir de `main`, buscaremos um tarball de `main` de facebook/hermes e o construiremos como parte do processo de build do React Native.

Ao construir React Native a partir de um branch de lançamento (digamos `0.69-stable`), usaremos em vez disso uma **tag** no repositório Hermes para **sincronizar o código** entre os dois repositórios. O nome específico da tag usado será então armazenado dentro do arquivo `sdks/.hermesversion` dentro do React Native no branch de lançamento (por exemplo, [este é o arquivo](https://github.com/facebook/react-native/blob/0.69-stable/sdks/.hermesversion) no branch de lançamento 0.69).

Em certo sentido, você pode pensar nesta abordagem de forma similar a um **git submodule**.

Se você está construindo em cima de Hermes, pode confiar nessas tags para entender qual versão de Hermes foi usada ao construir React Native, pois a versão do React Native é especificada no nome da tag (por exemplo, `hermes-2022-05-20-RNv0.69.0-ee8941b8874132b8f83e4486b63ed5c19fc3f111`).

#### Detalhes de implementação Android

Para implementar isso no Android, adicionamos uma nova build dentro de `/ReactAndroid/hermes-engine` do React Native que cuidará de construir Hermes e empacotar para consumo ([Veja aqui para mais contexto](https://github.com/facebook/react-native/pull/33396)).

Você pode agora disparar uma build do motor Hermes invocando:

```bash
// Build a debug version of Hermes
./gradlew :ReactAndroid:hermes-engine:assembleDebug
// Build a release version of Hermes
./gradlew :ReactAndroid:hermes-engine:assembleRelease
```

a partir do branch `main` do React Native.

Você não precisará instalar ferramentas extras (como `cmake`, `ninja` ou `python3`) em sua máquina, pois configuramos a build para usar as versões NDK dessas ferramentas.

No lado do consumidor Gradle, também enviamos uma pequena melhoria no lado do consumidor: mudamos de `releaseImplementation` & `debugImplementation` para `implementation`. Isso é possível porque o artefato Android `hermes-engine` mais novo é **variant aware** e corresponderá adequadamente uma build de debug do motor com uma build de debug do seu aplicativo. Você não precisa de nenhuma configuração personalizada aqui (mesmo se você usar `staging` ou outros tipos/sabores de build).

No entanto, isso tornou esta linha necessária no template:

```
exclude group:'com.facebook.fbjni'
```

Isso é necessário pois React Native está consumindo `fbjni` usando a abordagem não-prefab (ou seja, descompactando o `.aar` e extraindo arquivos `.so`). Hermes-engine, e outras bibliotecas, estão usando prefab em vez disso para consumir fbjni. Estamos investigando [resolver este problema](https://github.com/facebook/react-native/pull/33397) no futuro para que a importação de Hermes seja de uma linha.

#### Detalhes de implementação iOS

A implementação iOS depende de uma série de scripts que vivem nos seguintes locais:

- [`/scripts/hermes`](https://github.com/facebook/react-native/tree/main/scripts/hermes). Esses scripts contêm lógica para baixar o tarball de Hermes, descompactá-lo e configurar a build iOS. Eles são invocados no momento do `pod install` se você tiver o campo `hermes_enabled` definido como `true`.
- [`/sdks/hermes-engine`](https://github.com/facebook/react-native/tree/main/sdks/hermes-engine). Esses scripts contêm a lógica de build que está efetivamente construindo Hermes. Eles foram copiados e adaptados do repositório `facebook/hermes` para funcionar adequadamente dentro do React Native. Especificamente, os scripts dentro da pasta `utils` são responsáveis por construir Hermes para todas as plataformas Mac.

Hermes é construído como parte do Job `build_hermes_macos` no CircleCI. O job produzirá como artefato um tarball que será baixado pelo podspec `hermes-engine` ao usar um lançamento publicado do React Native ([aqui está um exemplo dos artefatos criados para React Native 0.69 em `build_hermes_macos`](https://app.circleci.com/pipelines/github/facebook/react-native/13679/workflows/5172f8e4-6b02-4ccb-ab97-7cb954911fae/jobs/258701/artifacts)).

##### Hermes Pré-construído

Se não houver artefatos pré-construídos para a versão do React Native que está sendo usada (ou seja, você pode estar trabalhando com React Native a partir do branch `main`), então Hermes precisará ser construído a partir do código fonte. Primeiro, o compilador Hermes, `hermesc`, será construído para macOS durante `pod install`, então Hermes em si será construído como parte do pipeline de build do Xcode usando o script `build-hermes-xcode.sh`.

##### Construindo Hermes a partir do código fonte

Hermes é sempre construído a partir do código fonte ao usar React Native a partir do branch `main`. Se você está usando uma versão estável do React Native, pode forçar Hermes a ser construído a partir do código fonte definindo a variável de ambiente `CI` como `true` ao usar CocoaPods: `CI=true pod install`.

##### Símbolos de debug

Os artefatos pré-construídos para Hermes não contêm símbolos de debug (dSYMs) por padrão. Estamos planejando distribuir esses símbolos de debug para cada lançamento no futuro. Até então, se você precisar dos símbolos de debug para Hermes, precisará construir Hermes a partir do código fonte. Um `hermes.framework.dSYM` será criado no diretório de build ao lado de cada um dos frameworks Hermes.

### Tenho medo de que esta mudança esteja me impactando

Gostaríamos de enfatizar que esta é essencialmente uma mudança organizacional sobre _onde_ Hermes é construído e _como_ o código é sincronizado entre os dois repositórios. A mudança deve ser totalmente transparente para nossos usuários.

Historicamente, costumávamos lançar uma versão de Hermes para uma versão específica do React Native (por exemplo, [`v0.11.0 para RN0.68.x`](https://github.com/facebook/hermes/releases/tag/v0.11.0)).

Com 'Bundled Hermes', você pode em vez disso confiar em uma tag que representará a versão usada quando uma versão específica do React Native foi lançada.
