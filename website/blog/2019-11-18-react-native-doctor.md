---
ia-translated: true
title: Conheça o Doctor, um novo comando do React Native
author: Lucas Bento
authorTitle: React Native Community
authorURL: 'https://twitter.com/lbentosilva'
authorImageURL: 'https://avatars3.githubusercontent.com/u/6207220?s=460&v=4'
authorTwitter: lbentosilva
tags: [announcement]
---

Após mais de 20 pull requests de 6 contribuidores na React Native Community, estamos empolgados em lançar o `react-native doctor`, um novo comando para ajudá-lo a começar, solucionar problemas e corrigir automaticamente erros no seu ambiente de desenvolvimento. O comando `doctor` é fortemente inspirado pelo comando doctor do [Expo](https://expo.io/) e do [Homebrew](https://brew.sh/), com um toque de UI inspirada pelo [Jest](https://jestjs.io/).

<!--truncate-->

Aqui está ele em ação:

<p style={{textAlign: 'center'}}>
  <video width={700} controls="controls" autoPlay style={{borderRadius: 5}}>
    <source type="video/mp4" src="/img/homepage/DoctorCommand.mp4" />
  </video>
</p>

## Como funciona

O comando `doctor` atualmente suporta a maioria dos softwares e bibliotecas dos quais o React Native depende, como CocoaPods, Xcode e Android SDK. Com o `doctor` vamos encontrar problemas no seu ambiente de desenvolvimento e dar a você a opção de corrigi-los automaticamente. Se o `doctor` não for capaz de corrigir um problema, ele exibirá uma mensagem e um link útil explicando como corrigi-lo manualmente, conforme o seguinte:

<p style={{textAlign: 'center'}}>
  <img width={700} src="/img/DoctorManualInstallationMessage.png" alt="Doctor command with a link to help on Android SDK's installation" title="Doctor command with a link to help on Android SDK's installation" />
</p>

## Experimente agora

O comando `doctor` está disponível como parte do React Native 0.62. No entanto, você pode experimentá-lo sem atualizar ainda:

```sh
npx @react-native-community/cli doctor
```

## Quais verificações são suportadas atualmente

O `doctor` atualmente suporta as seguintes verificações:

- Node.js (>= 8.3)
- yarn (>= 1.10)
- npm (>= 4)
- Watchman (>= 4), usado para observar mudanças no sistema de arquivos quando em modo de desenvolvimento.

Específico para o ambiente Android:

- Android SDK (>= 26), o software runtime para Android.
- Android NDK (>= 19), o native development toolkit para Android.
- `ANDROID_HOME`, variável de ambiente requerida pela configuração do Android SDK.

E para o ambiente iOS:

- Xcode (>= 10), IDE para desenvolver, compilar e distribuir aplicações iOS.
- CocoaPods, ferramenta de gerenciamento de dependências de bibliotecas para aplicações iOS.
- ios-deploy (opcional), biblioteca usada internamente pelo CLI para instalar aplicações em um dispositivo iOS físico.

## Agradecimentos

Agradecimentos enormes à React Native Community por trabalhar nisso, em particular [@thymikee](https://github.com/thymikee), [@thib92](https://github.com/thib92), [@jmeistrich](https://github.com/jmeistrich), [@tido64](https://github.com/tido64) e [@rickhanlonii](https://github.com/rickhanlonii).
