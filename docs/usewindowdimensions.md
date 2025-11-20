---
id: usewindowdimensions
ia-translated: true
title: useWindowDimensions
---

```tsx
import {useWindowDimensions} from 'react-native';
```

`useWindowDimensions` atualiza automaticamente todos os seus valores quando o tamanho da tela ou a escala de fonte muda. Você pode obter a largura e altura da janela da sua aplicação assim:

```tsx
const {height, width} = useWindowDimensions();
```

## Exemplo

```SnackPlayer name=useWindowDimensions&supportedPlatforms=ios,android
import React from 'react';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Window Dimension Data</Text>
        <Text>Height: {height}</Text>
        <Text>Width: {width}</Text>
        <Text>Font scale: {fontScale}</Text>
        <Text>Pixel ratio: {scale}</Text>
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
  header: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default App;
```

## Propriedades

### `fontScale`

```tsx
useWindowDimensions().fontScale;
```

A escala da fonte atualmente usada. Alguns sistemas operacionais permitem que os usuários aumentem ou diminuam o tamanho de suas fontes para maior conforto de leitura. Esta propriedade informará o que está em vigor.

---

### `height`

```tsx
useWindowDimensions().height;
```

A altura em pixels da janela ou tela que sua aplicação ocupa.

---

### `scale`

```tsx
useWindowDimensions().scale;
```

A proporção de pixels do dispositivo em que sua aplicação está rodando. Os valores podem ser:

- `1` que indica que um ponto é igual a um pixel (geralmente PPI/DPI de 96, 76 em algumas plataformas).
- `2` ou `3` que indica uma tela Retina ou de alta DPI.

---

### `width`

```tsx
useWindowDimensions().width;
```

A largura em pixels da janela ou tela que sua aplicação ocupa.
