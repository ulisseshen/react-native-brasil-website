---
ia-translated: true
id: activityindicator
title: ActivityIndicator
---

Exibe um indicador de carregamento circular.

## Exemplo

```SnackPlayer name=ActivityIndicator%20Example
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff" />
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
```

# Referência

## Props

### [View Props](view#props)

Herda as [View Props](view#props).

---

### `animating`

Define se o indicador deve ser exibido (`true`) ou ocultado (`false`).

| Tipo | Padrão |
| ---- | ------- |
| bool | `true`  |

---

### `color`

A cor do primeiro plano do spinner.

| Tipo            | Padrão                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [color](colors) | `null` (cor de destaque padrão do sistema)<div className="label android">Android</div><hr/><ins style={{background: '#999'}} className="color-box" />`'#999999'` <div className="label ios">iOS</div> |

---

### `hidesWhenStopped` <div className="label ios">iOS</div>

Define se o indicador deve ser ocultado quando não estiver animando.

| Tipo | Padrão |
| ---- | ------- |
| bool | `true`  |

---

### `ref`

Um setter de ref que será atribuído a um [element node](element-nodes) quando montado.

---

### `size`

Tamanho do indicador.

| Tipo                                                                               | Padrão   |
| ---------------------------------------------------------------------------------- | --------- |
| enum(`'small'`, `'large'`)<hr/>number <div className="label android">Android</div> | `'small'` |
