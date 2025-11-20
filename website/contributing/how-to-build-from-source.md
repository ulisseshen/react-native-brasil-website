---
ia-translated: true
title: Como Compilar a Partir do Código-Fonte
---

Você precisará compilar o React Native a partir do código-fonte se quiser trabalhar em uma nova funcionalidade/correção de bug, experimentar as funcionalidades mais recentes que ainda não foram lançadas, ou manter seu próprio fork com patches que não podem ser mesclados no núcleo.

## Android

### Pré-requisitos

Para compilar a partir do código-fonte, você precisa ter o Android SDK instalado. Se você seguiu o guia [Configurando o ambiente de desenvolvimento](/docs/environment-setup), você já deve estar configurado.

Não há necessidade de instalar outras ferramentas como versão específica do NDK ou CMake, pois o Android SDK irá **baixar automaticamente** o que for necessário para a compilação a partir do código-fonte.

### Aponte seu projeto para um nightly

Para usar as correções e funcionalidades mais recentes do React Native, você pode atualizar seu projeto para usar uma versão nightly do React Native com:

```
yarn add react-native@nightly
```

Isso atualizará seu projeto para usar uma versão nightly do React Native que é lançada toda noite com as últimas alterações.

### Atualize seu projeto para compilar a partir do código-fonte

Tanto com versões stable quanto nightlies, você estará consumindo artefatos **pré-compilados**. Se, em vez disso, você quiser mudar para compilar a partir do código-fonte, para que possa testar suas alterações no framework diretamente, você terá que editar o arquivo `android/settings.gradle` da seguinte forma:

```diff
  // ...
  include ':app'
  includeBuild('../node_modules/@react-native/gradle-plugin')

+ includeBuild('../node_modules/react-native') {
+     dependencySubstitution {
+         substitute(module("com.facebook.react:react-android")).using(project(":packages:react-native:ReactAndroid"))
+         substitute(module("com.facebook.react:react-native")).using(project(":packages:react-native:ReactAndroid"))
+         substitute(module("com.facebook.react:hermes-android")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
+         substitute(module("com.facebook.react:hermes-engine")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
+     }
+ }
```

### Notas adicionais

Compilar a partir do código-fonte pode levar muito tempo, especialmente para a primeira compilação, pois precisa baixar ~200 MB de artefatos e compilar o código nativo.

Toda vez que você atualizar a versão do `react-native` do seu repositório, o diretório de build pode ser excluído, e todos os arquivos são baixados novamente.
Para evitar isso, você pode querer alterar o caminho do seu diretório de build editando o arquivo `~/.gradle/init.gradle`:

```groovy
gradle.projectsLoaded {
    rootProject.allprojects {
        buildDir = "/path/to/build/directory/${rootProject.name}/${project.name}"
    }
}
```

## Justificativa

A abordagem recomendada para trabalhar com React Native é sempre atualizar para a versão mais recente. O suporte que fornecemos para versões mais antigas está [descrito em nossa política de suporte](https://github.com/reactwg/react-native-releases/#releases-support-policy).

A abordagem de compilar a partir do código-fonte deve ser usada para testar end-to-end uma correção antes de submeter um pull request para o React Native, e não encorajamos seu uso a longo prazo. Especialmente fazer fork do React Native ou mudar sua configuração para sempre usar uma compilação a partir do código-fonte, resultará em projetos que são mais difíceis de atualizar e geralmente uma pior developer experience.
