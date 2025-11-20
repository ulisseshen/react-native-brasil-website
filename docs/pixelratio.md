---
ia-translated: true
id: pixelratio
title: PixelRatio
---

`PixelRatio` fornece acesso à densidade de pixels e escala de fonte do dispositivo.

## Buscando uma imagem com tamanho correto

Você deve obter uma imagem de resolução mais alta se estiver em um dispositivo com alta densidade de pixels. Uma boa regra prática é multiplicar o tamanho da imagem que você exibe pela proporção de pixels.

```tsx
const image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});
<Image source={image} style={{width: 200, height: 100}} />;
```

## Ajuste à grade de pixels

No iOS, você pode especificar posições e dimensões para elementos com precisão arbitrária, por exemplo 29.674825. Mas, em última análise, a tela física tem apenas um número fixo de pixels, por exemplo 640×1136 para iPhone SE (1ª geração) ou 828×1792 para iPhone 11. O iOS tenta ser o mais fiel possível ao valor do usuário distribuindo um pixel original em vários para enganar o olho. A desvantagem dessa técnica é que ela faz o elemento resultante parecer desfocado.

Na prática, descobrimos que os desenvolvedores não querem esse recurso e precisam contorná-lo fazendo arredondamento manual para evitar elementos desfocados. No React Native, estamos arredondando todos os pixels automaticamente.

Precisamos ter cuidado ao fazer esse arredondamento. Você nunca quer trabalhar com valores arredondados e não arredondados ao mesmo tempo, pois você vai acumular erros de arredondamento. Ter apenas um erro de arredondamento é fatal porque uma borda de um pixel pode desaparecer ou ficar duas vezes maior.

No React Native, tudo em JavaScript e no mecanismo de layout funciona com números de precisão arbitrária. É apenas quando definimos a posição e dimensões do elemento nativo na thread principal que arredondamos. Além disso, o arredondamento é feito em relação à raiz em vez do pai, novamente para evitar acumular erros de arredondamento.

## Exemplo

```SnackPlayer name=PixelRatio%20Example
import React from 'react';
import {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const size = 50;
const cat = {
  uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
  width: size,
  height: size,
};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text>Current Pixel Ratio is:</Text>
          <Text style={styles.value}>{PixelRatio.get()}</Text>
        </View>
        <View style={styles.container}>
          <Text>Current Font Scale is:</Text>
          <Text style={styles.value}>{PixelRatio.getFontScale()}</Text>
        </View>
        <View style={styles.container}>
          <Text>On this device images with a layout width of</Text>
          <Text style={styles.value}>{size} px</Text>
          <Image source={cat} />
        </View>
        <View style={styles.container}>
          <Text>require images with a pixel width of</Text>
          <Text style={styles.value}>
            {PixelRatio.getPixelSizeForLayoutSize(size)} px
          </Text>
          <Image
            source={cat}
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(size),
              height: PixelRatio.getPixelSizeForLayoutSize(size),
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    marginBottom: 12,
    marginTop: 4,
  },
});

export default App;
```

---

# Referência

## Métodos

### `get()`

```tsx
static get(): number;
```

Retorna a densidade de pixels do dispositivo. Alguns exemplos:

- `PixelRatio.get() === 1`
  - [dispositivos Android mdpi](https://material.io/tools/devices/)
- `PixelRatio.get() === 1.5`
  - [dispositivos Android hdpi](https://material.io/tools/devices/)
- `PixelRatio.get() === 2`
  - iPhone SE, 6S, 7, 8
  - iPhone XR
  - iPhone 11
  - [dispositivos Android xhdpi](https://material.io/tools/devices/)
- `PixelRatio.get() === 3`
  - iPhone 6S Plus, 7 Plus, 8 Plus
  - iPhone X, XS, XS Max
  - iPhone 11 Pro, 11 Pro Max
  - Pixel, Pixel 2
  - [dispositivos Android xxhdpi](https://material.io/tools/devices/)
- `PixelRatio.get() === 3.5`
  - Nexus 6
  - Pixel XL, Pixel 2 XL
  - [dispositivos Android xxxhdpi](https://material.io/tools/devices/)

---

### `getFontScale()`

```tsx
static getFontScale(): number;
```

Retorna o fator de escala para tamanhos de fonte. Esta é a proporção usada para calcular o tamanho de fonte absoluto, então qualquer elemento que dependa fortemente disso deve usar isso para fazer cálculos.

- no Android, o valor reflete a preferência do usuário definida em **Settings > Display > Font size**
- no iOS, o valor reflete a preferência do usuário definida em **Settings > Display & Brightness > Text Size**, o valor também pode ser atualizado em **Settings > Accessibility > Display & Text Size > Larger Text**

Se uma escala de fonte não estiver definida, isso retorna a proporção de pixels do dispositivo.

---

### `getPixelSizeForLayoutSize()`

```tsx
static getPixelSizeForLayoutSize(layoutSize: number): number;
```

Converte um tamanho de layout (dp) para tamanho de pixel (px).

Garantido para retornar um número inteiro.

---

### `roundToNearestPixel()`

```tsx
static roundToNearestPixel(layoutSize: number): number;
```

Arredonda um tamanho de layout (dp) para o tamanho de layout mais próximo que corresponde a um número inteiro de pixels. Por exemplo, em um dispositivo com um PixelRatio de 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, que corresponde a exatamente (8.33 \* 3) = 25 pixels.
