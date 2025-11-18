---
ia-translated: true
id: intro-react-native-components
title: Core Components e Native Components
description: 'React Native permite que você componha interfaces de aplicativos usando Native Components. Convenientemente, ele vem com um conjunto desses componentes para você começar a usar agora mesmo — os Core Components!'
---

import ThemedImage from '@theme/ThemedImage';

React Native é um framework open source para construir aplicações Android e iOS usando [React](https://react.dev/) e as capacidades nativas da plataforma do app. Com React Native, você usa JavaScript para acessar as APIs da sua plataforma, assim como para descrever a aparência e o comportamento da sua UI usando componentes React: pacotes de código reutilizável e aninhável. Você pode aprender mais sobre React na próxima seção. Mas primeiro, vamos cobrir como os componentes funcionam no React Native.

## Views e desenvolvimento mobile

No desenvolvimento Android e iOS, uma **view** é o bloco de construção básico da UI: um pequeno elemento retangular na tela que pode ser usado para exibir texto, imagens ou responder a entrada do usuário. Até mesmo os menores elementos visuais de um app, como uma linha de texto ou um botão, são tipos de views. Alguns tipos de views podem conter outras views. São views até o fim!

<figure>
  <img src="/docs/assets/diagram_ios-android-views.svg" width="1000" alt="Diagrama de apps Android e iOS mostrando ambos construídos sobre elementos atômicos chamados views." />
  <figcaption>Apenas uma amostra das muitas views usadas em apps Android e iOS.</figcaption>
</figure>

## Native Components

No desenvolvimento Android, você escreve views em Kotlin ou Java; no desenvolvimento iOS, você usa Swift ou Objective-C. Com React Native, você pode invocar essas views com JavaScript usando componentes React. Em runtime, React Native cria as views Android e iOS correspondentes para esses componentes. Como os componentes React Native são apoiados pelas mesmas views do Android e iOS, os apps React Native têm a aparência, a sensação e o desempenho de qualquer outro app. Chamamos esses componentes apoiados pela plataforma de **Native Components.**

React Native vem com um conjunto de Native Components essenciais e prontos para uso que você pode usar para começar a construir seu app hoje. Estes são os **Core Components** do React Native.

:::caution
Esta documentação referencia um conjunto legado de API e precisa ser atualizada para refletir a New Architecture
:::
React Native também permite que você construa seus próprios Native Components para [Android](legacy/native-components-android.md) e [iOS](legacy/native-components-ios.md) para atender às necessidades únicas do seu app. Também temos um ecossistema próspero desses **componentes contribuídos pela comunidade.** Confira o [Native Directory](https://reactnative.directory) para descobrir o que a comunidade tem criado.

## Core Components

React Native tem muitos Core Components para tudo, desde controles até indicadores de atividade. Você pode encontrar todos eles [documentados na seção de API](components-and-apis). Você trabalhará principalmente com os seguintes Core Components:

| React Native UI Component | Android View   | iOS View         | Web Analog              | Description                                                                                                   |
| ------------------------- | -------------- | ---------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrolling `<div>` | Um container que suporta layout com flexbox, estilo, algum tratamento de toque e controles de acessibilidade |
| `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                   | Exibe, estiliza e aninha strings de texto e até mesmo lida com eventos de toque                              |
| `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                 | Exibe diferentes tipos de imagens                                                                             |
| `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                 | Um container de rolagem genérico que pode conter múltiplos componentes e views                                |
| `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`   | Permite que o usuário insira texto                                                                            |

Na próxima seção, você começará a combinar esses Core Components para aprender sobre como o React funciona. Experimente com eles aqui agora!

```SnackPlayer name=Hello%20World
import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default App;
```

---

Como React Native usa a mesma estrutura de API que os componentes React, você precisará entender as APIs de componentes React para começar. A [próxima seção](intro-react) serve como uma introdução rápida ou revisão sobre o tópico. No entanto, se você já está familiarizado com React, sinta-se à vontade para [pular adiante](handling-text-input).

<ThemedImage
alt="Um diagrama mostrando que os Core Components do React Native são um subconjunto dos React Components que vêm com o React Native."
sources={{
  light: '/docs/assets/diagram_react-native-components.svg',
  dark: '/docs/assets/diagram_react-native-components_dark.svg',
}}
/>
