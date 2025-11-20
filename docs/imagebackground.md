---
ia-translated: true
id: imagebackground
title: ImageBackground
---

Uma solicitação de recurso comum de desenvolvedores familiarizados com a web é `background-image`. Para lidar com este caso de uso, você pode usar o componente `<ImageBackground>`, que possui os mesmos props que `<Image>`, e adicionar quaisquer children que você desejar para sobrepor em cima dele.

Você pode não querer usar `<ImageBackground>` em alguns casos, já que a implementação é básica. Consulte o [código-fonte](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Image/ImageBackground.js) do `<ImageBackground>` para mais informações e crie seu próprio componente customizado quando necessário.

Note que você deve especificar alguns atributos de estilo de largura e altura.

## Exemplo

```SnackPlayer name=ImageBackground
import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
```

---

# Referência

## Props

### [Image Props](image.md#props)

Herda [Image Props](image.md#props).

---

### `imageStyle`

| Tipo                                |
| ----------------------------------- |
| [Image Style](image-style-props.md) |

---

### `imageRef`

Um ref setter que será atribuído ao [element node](element-nodes) do componente `Image` interno quando montado.

---

### `style`

| Tipo                              |
| --------------------------------- |
| [View Style](view-style-props.md) |
