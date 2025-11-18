---
ia-translated: true
id: systrace
title: Systrace
---

`Systrace` é uma ferramenta de profiling padrão do Android baseada em marcadores (e é instalada quando você instala o pacote Android platform-tools). Blocos de código com profiling são cercados por marcadores de início/fim que são então visualizados em um formato de gráfico colorido. Tanto o Android SDK quanto o React Native framework fornecem marcadores padrão que você pode visualizar.

## Exemplo

`Systrace` permite que você marque eventos JavaScript (JS) com uma tag e um valor inteiro. Capture os eventos JS não-cronometrados no EasyProfiler.

```SnackPlayer name=Systrace%20Example
import React from 'react';
import {Button, Text, View, StyleSheet, Systrace} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const enableProfiling = () => {
    Systrace.setEnabled(true); // Call setEnabled to turn on the profiling.
    Systrace.beginEvent('event_label');
    Systrace.counterEvent('event_label', 10);
  };

  const stopProfiling = () => {
    Systrace.endEvent();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>
          React Native Systrace API
        </Text>
        <View style={styles.buttonsColumn}>
          <Button
            title="Capture the non-Timed JS events in EasyProfiler"
            onPress={() => enableProfiling()}
          />
          <Button
            title="Stop capturing"
            onPress={() => stopProfiling()}
            color="#FF0000"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonsColumn: {
    gap: 16,
  },
});

export default App;
```

---

# Referência

## Métodos

### `isEnabled()`

```tsx
static isEnabled(): boolean;
```

---

### `beginEvent()`

```tsx
static beginEvent(eventName: string | (() => string), args?: EventArgs);
```

beginEvent/endEvent para iniciar e depois encerrar um profile dentro do mesmo call stack frame.

---

### `endEvent()`

```tsx
static endEvent(args?: EventArgs);
```

---

### `beginAsyncEvent()`

```tsx
static beginAsyncEvent(
  eventName: string | (() => string),
  args?: EventArgs,
): number;
```

beginAsyncEvent/endAsyncEvent para iniciar e depois encerrar um profile onde o fim pode ocorrer em outra thread ou fora do call stack frame atual, por exemplo, await. A variável cookie retornada deve ser usada como entrada na chamada endAsyncEvent para encerrar o profile.

---

### `endAsyncEvent()`

```tsx
static endAsyncEvent(
  eventName: EventName,
  cookie: number,
  args?: EventArgs,
);
```

---

### `counterEvent()`

```tsx
static counterEvent(eventName: string | (() => string), value: number);
```

Registra o valor no profileName na timeline do systrace.
