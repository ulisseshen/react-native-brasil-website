---
ia-translated: true
title: Tornando aplicativos React Native acessíveis
author: Georgiy Kassabli
authorTitle: Software Engineer at Facebook
authorURL: 'https://www.facebook.com/georgiy.kassabli'
authorImageURL: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/1978838_795592927136196_1205041943_n.jpg?_nc_log=1&oh=d7a500fdece1250955a4d27b0a80fee2&oe=59E8165A'
hero: '/blog/assets/blue-hero.png'
tags: [engineering]
---

Com o recente lançamento do React na web e React Native em dispositivos móveis, fornecemos um novo framework front-end para desenvolvedores construírem produtos. Um aspecto chave de construir um produto robusto é garantir que qualquer pessoa possa usá-lo, incluindo pessoas que têm perda de visão ou outras deficiências. A API de Acessibilidade para React e React Native permite que você torne qualquer experiência baseada em React utilizável por alguém que possa usar tecnologia assistiva, como um leitor de tela para cegos e deficientes visuais.

Para este post, vamos focar em aplicativos React Native. Projetamos a API de Acessibilidade do React para parecer e se sentir similar às APIs do Android e iOS. Se você já desenvolveu aplicações acessíveis para Android, iOS ou web antes, você deve se sentir confortável com o framework e nomenclatura da API AX do React. Por exemplo, você pode tornar um elemento de UI _accessible_ (portanto exposto à tecnologia assistiva) e usar _accessibilityLabel_ para fornecer uma descrição em string para o elemento:

```
<View accessible={true} accessibilityLabel="This is simple view">
```

Vamos percorrer uma aplicação um pouco mais envolvente da API AX do React olhando para um dos próprios produtos baseados em React do Facebook: o **aplicativo Ads Manager**.

<footer>
  <a
    href="https://code.facebook.com/posts/435862739941212/making-react-native-apps-accessible/"
    className="btn">Leia mais</a>
</footer>

> Este é um trecho. Leia o resto do post no [Facebook Code](https://code.facebook.com/posts/435862739941212/making-react-native-apps-accessible/).
