---
ia-translated: true
id: keyboardavoidingview
title: KeyboardAvoidingView
---

Este componente ajustará automaticamente sua altura, posição ou padding inferior com base na altura do teclado para permanecer visível enquanto o teclado virtual estiver sendo exibido.

## Exemplo

```SnackPlayer name=KeyboardAvoidingView&supportedPlatforms=android,ios
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default KeyboardAvoidingComponent;
```

---

# Referência

## Props

### [View Props](view.md#props)

Herda [View Props](view.md#props).

---

### `behavior`

Especifica como reagir à presença do teclado.

:::note
Android e iOS interagem com esta prop de maneira diferente. Em ambos iOS e Android, configurar `behavior` é recomendado.
:::

| Type                                        |
| ------------------------------------------- |
| enum(`'height'`, `'position'`, `'padding'`) |

---

### `contentContainerStyle`

O style do container de conteúdo (View) quando behavior é `'position'`.

| Type                              |
| --------------------------------- |
| [View Style](view-style-props.md) |

---

### `enabled`

Habilita ou desabilita o KeyboardAvoidingView.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `keyboardVerticalOffset`

Esta é a distância entre o topo da tela do usuário e a view do React Native, pode ser diferente de zero em alguns casos de uso.

| Type   | Default |
| ------ | ------- |
| number | `0`     |
