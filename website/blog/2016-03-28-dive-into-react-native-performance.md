---
ia-translated: true
title: Mergulhe na Performance do React Native
author: Pieter De Baets
authorTitle: Software Engineer at Facebook
authorURL: 'https://github.com/javache'
authorImageURL: 'https://avatars1.githubusercontent.com/u/5676?v=3&s=460'
authorTwitter: javache
tags: [engineering]
---

React Native permite que você construa aplicativos Android e iOS em JavaScript usando o modelo de programação declarativa do React e Relay. Isso leva a código mais conciso e fácil de entender; iteração rápida sem um ciclo de compilação; e fácil compartilhamento de código entre múltiplas plataformas. Você pode enviar mais rápido e se concentrar em detalhes que realmente importam, fazendo seu aplicativo parecer e funcionar fantasticamente. Otimizar a performance é uma grande parte disso. Aqui está a história de como tornamos a inicialização do aplicativo React Native duas vezes mais rápida.

## Por que a pressa?

Com um aplicativo que roda mais rápido, o conteúdo carrega rapidamente, o que significa que as pessoas têm mais tempo para interagir com ele, e animações suaves tornam o aplicativo agradável de usar. Em mercados emergentes, onde [telefones classe 2011](https://code.facebook.com/posts/952628711437136/classes-performance-and-network-segmentation-on-android/) em [redes 2G](https://newsroom.fb.com/news/2015/10/news-feed-fyi-building-for-all-connectivity/) são a maioria, um foco em performance pode fazer a diferença entre um aplicativo que é utilizável e um que não é.

Desde o lançamento do React Native no [iOS](https://reactjs.org/blog/2015/03/26/introducing-react-native.html) e no [Android](https://code.facebook.com/posts/1189117404435352/react-native-for-android-how-we-built-the-first-cross-platform-react-native-app/), temos melhorado a performance de rolagem de listas, eficiência de memória, responsividade da UI e tempo de inicialização do aplicativo. A inicialização define a primeira impressão de um aplicativo e estressa todas as partes do framework, então é o problema mais gratificante e desafiador de enfrentar.

<footer>
  <a
    href="https://code.facebook.com/posts/895897210527114/dive-into-react-native-performance/"
    className="btn">Leia mais</a>
</footer>

> Este é um trecho. Leia o restante do post no [Facebook Code](https://code.facebook.com/posts/895897210527114/dive-into-react-native-performance/).
