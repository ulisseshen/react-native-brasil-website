---
ia-translated: true
id: refreshcontrol
title: RefreshControl
---

Este componente é usado dentro de um ScrollView ou ListView para adicionar a funcionalidade pull to refresh. Quando o ScrollView está em `scrollY: 0`, deslizar para baixo dispara um evento `onRefresh`.

## Exemplo

```SnackPlayer name=RefreshControl&supportedPlatforms=ios,android
import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text>Pull down to see RefreshControl indicator</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

:::note
`refreshing` é uma prop controlada, é por isso que ela precisa ser definida como `true` na função `onRefresh`, caso contrário o indicador de atualização vai parar imediatamente.
:::

---

# Referência

## Props

### [View Props](view.md#props)

Herda [View Props](view.md#props).

---

### <div className="label required basic">Required</div>**`refreshing`**

Se a view deve estar indicando uma atualização ativa.

| Type    |
| ------- |
| boolean |

---

### `colors` <div className="label android">Android</div>

As cores (pelo menos uma) que serão usadas para desenhar o indicador de atualização.

| Type                         |
| ---------------------------- |
| array of [colors](colors.md) |

---

### `enabled` <div className="label android">Android</div>

Se a funcionalidade pull to refresh está habilitada.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `onRefresh`

Chamado quando a view começa a atualizar.

| Type     |
| -------- |
| function |

---

### `progressBackgroundColor` <div className="label android">Android</div>

A cor de fundo do indicador de atualização.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `progressViewOffset`

Deslocamento do topo da view de progresso.

| Type   | Default |
| ------ | ------- |
| number | `0`     |

---

### `size` <div className="label android">Android</div>

Tamanho do indicador de atualização.

| Type                         | Default     |
| ---------------------------- | ----------- |
| enum(`'default'`, `'large'`) | `'default'` |

---

### `tintColor` <div className="label ios">iOS</div>

A cor do indicador de atualização.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `title` <div className="label ios">iOS</div>

O título exibido sob o indicador de atualização.

| Type   |
| ------ |
| string |

---

### `titleColor` <div className="label ios">iOS</div>

A cor do título do indicador de atualização.

| Type               |
| ------------------ |
| [color](colors.md) |
