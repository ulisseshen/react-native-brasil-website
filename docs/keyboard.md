---
ia-translated: true
id: keyboard
title: Keyboard
---

Módulo `Keyboard` para controlar eventos do teclado.

### Uso

O módulo Keyboard permite que você escute eventos nativos e reaja a eles, bem como faça alterações no teclado, como descartá-lo.

```SnackPlayer name=Keyboard%20Example&supportedPlatforms=ios,android
import React, {useState, useEffect} from 'react';
import {Keyboard, Text, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Example = () => {
  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
        <TextInput
          style={style.input}
          placeholder="Click here…"
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={style.status}>{keyboardStatus}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 16,
    textAlign: 'center',
  },
});

export default Example;
```

---

# Referência

## Métodos

### `addListener()`

```tsx
static addListener: (
  eventType: KeyboardEventName,
  listener: KeyboardEventListener,
) => EmitterSubscription;
```

A função `addListener` conecta uma função JavaScript a um evento identificado de notificação nativa do teclado.

Esta função então retorna a referência ao listener.

**Parâmetros:**

| Nome                                                                     | Tipo     | Descrição                                                                              |
| ------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------- |
| eventName <div className="label basic two-lines required">Required</div> | string   | A string que identifica o evento que você está escutando. Veja a lista abaixo.        |
| callback <div className="label basic two-lines required">Required</div>  | function | A função a ser chamada quando o evento é disparado                                    |

**`eventName`**

Este pode ser qualquer um dos seguintes:

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

:::note
Apenas os eventos `keyboardDidShow` e `keyboardDidHide` estão disponíveis no Android. Os eventos não serão disparados ao usar Android 10 ou inferior se sua activity tiver `android:windowSoftInputMode` definido como `adjustResize` ou `adjustNothing`.
:::

---

### `dismiss()`

```tsx
static dismiss();
```

Descarta o teclado ativo e remove o foco.

---

### `scheduleLayoutAnimation`

```tsx
static scheduleLayoutAnimation(event: KeyboardEvent);
```

Útil para sincronizar mudanças de tamanho ou posição do TextInput (ou outra view acessória do teclado) com os movimentos do teclado.

---

### `isVisible()`

```tsx
static isVisible(): boolean;
```

Se o teclado é conhecido por estar visível pela última vez.

---

### `metrics()`

```tsx
static metrics(): KeyboardMetrics | undefined;
```

Retorna as métricas do teclado virtual se visível.
