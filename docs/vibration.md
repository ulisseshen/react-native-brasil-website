---
ia-translated: true
id: vibration
title: Vibration
---

Vibra o dispositivo.

## Example

```SnackPlayer name=Vibration%20Example&supportedPlatforms=ios,android
import React from 'react';
import {
  Button,
  Platform,
  Text,
  Vibration,
  View,
  StyleSheet,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

const App = () => {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  const PATTERN_DESC =
    Platform.OS === 'android'
      ? 'wait 1s, vibrate 2s, wait 3s'
      : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>Vibration API</Text>
        <View>
          <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
        </View>
        <Separator />
        {Platform.OS === 'android'
          ? [
              <View>
                <Button
                  title="Vibrate for 10 seconds"
                  onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
                />
              </View>,
              <Separator />,
            ]
          : null}
        <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text>
        <Button
          title="Vibrate with pattern"
          onPress={() => Vibration.vibrate(PATTERN)}
        />
        <Separator />
        <Button
          title="Vibrate with pattern until cancelled"
          onPress={() => Vibration.vibrate(PATTERN, true)}
        />
        <Separator />
        <Button
          title="Stop vibration pattern"
          onPress={() => Vibration.cancel()}
          color="#FF0000"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

:::info
Aplicativos Android devem solicitar a permissão `android.permission.VIBRATE` adicionando `<uses-permission android:name="android.permission.VIBRATE"/>` ao `AndroidManifest.xml`.
:::

:::note
A API Vibration é implementada como uma chamada `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` no iOS.
:::

---

# Reference

## Methods

### `cancel()`

```tsx
static cancel();
```

Chame isso para parar de vibrar após ter invocado `vibrate()` com repetição habilitada.

---

### `vibrate()`

```tsx
static vibrate(
  pattern?: number | number[],
  repeat?: boolean
);
```

Dispara uma vibração com duração fixa.

**No Android,** a duração da vibração padrão é de 400 milissegundos, e uma duração de vibração arbitrária pode ser especificada passando um número como valor para o argumento `pattern`. **No iOS,** a duração da vibração é fixa em aproximadamente 400 milissegundos.

O método `vibrate()` pode receber um argumento `pattern` com um array de números que representam tempo em milissegundos. Você pode definir `repeat` como true para executar o padrão de vibração em loop até que `cancel()` seja chamado.

**No Android,** os índices ímpares do array `pattern` representam a duração da vibração, enquanto os pares representam o tempo de separação. **No iOS,** os números no array `pattern` representam o tempo de separação, já que a duração da vibração é fixa.

**Parameters:**

| Name    | Type                                                                     | Default | Description                                                                                                                |
| ------- | ------------------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| pattern | number <div className="label android">Android</div><hr/>array of numbers | `400`   | Duração da vibração em milissegundos.<hr/>Padrão de vibração como um array de números em milissegundos. |
| repeat  | boolean                                                                  | `false` | Repetir padrão de vibração até `cancel()`.                                                                                 |
