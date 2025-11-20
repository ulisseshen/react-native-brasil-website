---
ia-translated: true
id: progressbarandroid
title: '🗑️ ProgressBarAndroid'
---

:::warning Descontinuado
Use um dos [pacotes da comunidade](https://reactnative.directory/?search=progressbar) em vez disso.
:::

Componente React exclusivo para Android usado para indicar que o aplicativo está carregando ou há alguma atividade no aplicativo.

### Exemplo

```SnackPlayer name=ProgressBarAndroid&supportedPlatforms=android
import React from 'react';
import {View, StyleSheet, ProgressBarAndroid, Text} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.example}>
        <Text>Circle Progress Indicator</Text>
        <ProgressBarAndroid />
      </View>
      <View style={styles.example}>
        <Text>Horizontal Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
      </View>
      <View style={styles.example}>
        <Text>Fixed Progress Value</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
});

export default App;
```

---

# Referência

## Props

Herda [View Props](view.md#props).

### `animating`

Se deve mostrar o ProgressBar (true, o padrão) ou ocultá-lo (false).

| Tipo | Obrigatório |
| ---- | -------- |
| bool | Não       |

---

### `color`

Cor da barra de progresso.

| Tipo               | Obrigatório |
| ------------------ | -------- |
| [color](colors.md) | Não       |

---

### `indeterminate`

Se a barra de progresso mostrará progresso indeterminado. Note que isso só pode ser false se styleAttr for Horizontal, e requer um valor `progress`.

| Tipo              | Obrigatório |
| ----------------- | -------- |
| indeterminateType | Não       |

---

### `progress`

O valor de progresso (entre 0 e 1).

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `styleAttr`

Estilo do ProgressBar. Um de:

- Horizontal
- Normal (padrão)
- Small
- Large
- Inverse
- SmallInverse
- LargeInverse

| Tipo                                                                                      | Obrigatório |
| ----------------------------------------------------------------------------------------- | -------- |
| enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | Não       |

---

### `testID`

Usado para localizar esta view em testes end-to-end.

| Tipo   | Obrigatório |
| ------ | -------- |
| string | Não       |
