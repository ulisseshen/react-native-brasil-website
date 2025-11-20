---
ia-translated: true
id: settings
title: Settings
---

`Settings` serve como um wrapper para [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults), um armazenamento persistente de chave-valor disponível apenas no iOS.

## Exemplo

```SnackPlayer name=Settings%20Example&supportedPlatforms=ios
import React, {useState} from 'react';
import {Button, Settings, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [data, setData] = useState(() => Settings.get('data'));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Stored value:</Text>
        <Text style={styles.value}>{data}</Text>
        <Button
          onPress={() => {
            Settings.set({data: 'React'});
            setData(Settings.get('data'));
          }}
          title="Store 'React'"
        />
        <Button
          onPress={() => {
            Settings.set({data: 'Native'});
            setData(Settings.get('data'));
          }}
          title="Store 'Native'"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    marginVertical: 12,
  },
});

export default App;
```

---

# Referência

## Métodos

### `clearWatch()`

```tsx
static clearWatch(watchId: number);
```

`watchId` é o número retornado por `watchKeys()` quando a inscrição foi originalmente configurada.

---

### `get()`

```tsx
static get(key: string): any;
```

Obtém o valor atual para uma determinada `key` em `NSUserDefaults`.

---

### `set()`

```tsx
static set(settings: Record<string, any>);
```

Define um ou mais valores em `NSUserDefaults`.

---

### `watchKeys()`

```tsx
static watchKeys(keys: string | array<string>, callback: () => void): number;
```

Inscreve-se para ser notificado quando o valor de qualquer uma das chaves especificadas pelo parâmetro `keys` for alterado em `NSUserDefaults`. Retorna um número `watchId` que pode ser usado com `clearWatch()` para cancelar a inscrição.

:::note
`watchKeys()` por design ignora chamadas internas de `set()` e dispara o callback apenas em alterações realizadas fora do código React Native.
:::
