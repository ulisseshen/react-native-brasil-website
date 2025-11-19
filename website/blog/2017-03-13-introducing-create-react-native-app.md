---
ia-translated: true
title: Apresentando Create React Native App
author: Adam Perry
authorTitle: Software Engineer at Expo
authorURL: 'https://github.com/dikaiosune'
authorImageURL: 'https://avatars2.githubusercontent.com/u/6812281'
authorTwitter: dika10sune
tags: [engineering]
youtubeVideoId: 9baaVjGdBqs
---

Hoje estamos anunciando [Create React Native App](https://github.com/react-community/create-react-native-app): uma nova ferramenta que torna significativamente mais fácil começar com um projeto React Native! É fortemente inspirado no design do [Create React App](https://github.com/facebookincubator/create-react-app) e é o produto de uma colaboração entre [Facebook](https://code.facebook.com) e [Expo](https://expo.io) (anteriormente Exponent).

Muitos desenvolvedores lutam com a instalação e configuração das dependências de build nativas atuais do React Native, especialmente para Android. Com Create React Native App, não há necessidade de usar Xcode ou Android Studio, e você pode desenvolver para seu dispositivo iOS usando Linux ou Windows. Isso é realizado usando o aplicativo Expo, que carrega e executa projetos CRNA escritos em JavaScript puro sem compilar qualquer código nativo.

Tente criar um novo projeto (substitua por comandos yarn adequados se você o tiver instalado):

```sh
$ npm i -g create-react-native-app
$ create-react-native-app my-project
$ cd my-project
$ npm start
```

Isso iniciará o packager do React Native e imprimirá um código QR. Abra-o no [aplicativo Expo](https://expo.io) para carregar seu JavaScript. Chamadas para `console.log` são encaminhadas para seu terminal. Você pode fazer uso de qualquer API padrão do React Native, bem como do [Expo SDK](https://docs.expo.dev/versions/latest/).

## E quanto ao código nativo?

Muitos projetos React Native têm dependências Java ou Objective-C/Swift que precisam ser compiladas. O aplicativo Expo inclui APIs para câmera, vídeo, contatos e muito mais, e agrupa bibliotecas populares como [react-native-maps da Airbnb](https://docs.expo.dev/versions/latest/sdk/map-view/), ou [autenticação Facebook](https://docs.expo.dev/versions/latest/sdk/facebook/). No entanto, se você precisar de uma dependência de código nativo que a Expo não agrupa, provavelmente precisará ter sua própria configuração de build para isso. Assim como Create React App, "ejetar" é suportado pelo CRNA.

Você pode executar `npm run eject` para obter um projeto muito similar ao que `react-native init` geraria. Nesse ponto, você precisará do Xcode e/ou Android Studio assim como você precisaria se começasse com `react-native init`, adicionar bibliotecas com `react-native link` funcionará, e você terá controle total sobre o processo de compilação de código nativo.

## Perguntas? Feedback?

Create React Native App agora está estável o suficiente para uso geral, o que significa que estamos muito ansiosos para ouvir sobre sua experiência usando-o! Você pode me encontrar [no Twitter](https://twitter.com/dika10sune) ou abrir uma issue no [repositório GitHub](https://github.com/react-community/create-react-native-app). Pull requests são muito bem-vindos!
