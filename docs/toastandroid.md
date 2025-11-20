---
ia-translated: true
id: toastandroid
title: ToastAndroid
---

A API ToastAndroid do React Native expõe o módulo ToastAndroid da plataforma Android como um módulo JS. Ela fornece o método `show(message, duration)` que recebe os seguintes parâmetros:

- _message_ Uma string com o texto do toast
- _duration_ A duração do toast—pode ser `ToastAndroid.SHORT` ou `ToastAndroid.LONG`

Você também pode usar `showWithGravity(message, duration, gravity)` para especificar onde o toast aparece no layout da tela. Pode ser `ToastAndroid.TOP`, `ToastAndroid.BOTTOM` ou `ToastAndroid.CENTER`.

O método `showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)` adiciona a capacidade de especificar um deslocamento em pixels.

:::note
A partir do Android 11 (API level 30), definir a gravidade não tem efeito em toasts de texto. Leia sobre as mudanças [aqui](https://developer.android.com/about/versions/11/behavior-changes-11#text-toast-api-changes).
:::

```SnackPlayer name=Toast%20Android%20API%20Example&supportedPlatforms=android
import React from 'react';
import {StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const showToast = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title="Toggle Toast" onPress={() => showToast()} />
        <Button
          title="Toggle Toast With Gravity"
          onPress={() => showToastWithGravity()}
        />
        <Button
          title="Toggle Toast With Gravity & Offset"
          onPress={() => showToastWithGravityAndOffset()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#888888',
    padding: 8,
  },
});

export default App;
```

---

# Referência

## Methods

### `show()`

```tsx
static show(message: string, duration: number);
```

---

### `showWithGravity()`

Esta propriedade funcionará apenas no Android API 29 e inferiores. Para funcionalidade similar em APIs Android superiores, considere usar snackbar ou notificação.

```tsx
static showWithGravity(message: string, duration: number, gravity: number);
```

---

### `showWithGravityAndOffset()`

Esta propriedade funcionará apenas no Android API 29 e inferiores. Para funcionalidade similar em APIs Android superiores, considere usar snackbar ou notificação.

```tsx
static showWithGravityAndOffset(
  message: string,
  duration: number,
  gravity: number,
  xOffset: number,
  yOffset: number,
);
```

## Properties

### `SHORT`

Indica a duração na tela.

```tsx
static SHORT: number;
```

---

### `LONG`

Indica a duração na tela.

```tsx
static LONG: number;
```

---

### `TOP`

Indica a posição na tela.

```tsx
static TOP: number;
```

---

### `BOTTOM`

Indica a posição na tela.

```tsx
static BOTTOM: number;
```

---

### `CENTER`

Indica a posição na tela.

```tsx
static CENTER: number;
```
