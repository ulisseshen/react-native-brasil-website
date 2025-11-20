---
ia-translated: true
id: shadow-props
title: Shadow Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Shadow%20Props&supportedPlatforms=ios&ext=js&dependencies=@react-native-community/slider
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

const ShadowPropSlider = ({label, value, ...props}) => {
  return (
    <>
      <Text>
        {label} ({value.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.square,
            {
              shadowOffset: {
                width: shadowOffsetWidth,
                height: -shadowOffsetHeight,
              },
              shadowOpacity,
              shadowRadius,
            },
          ]}
        />
        <View style={styles.controls}>
          <ShadowPropSlider
            label="shadowOffset - X"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetWidth}
            onValueChange={setShadowOffsetWidth}
          />
          <ShadowPropSlider
            label="shadowOffset - Y"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetHeight}
            onValueChange={setShadowOffsetHeight}
          />
          <ShadowPropSlider
            label="shadowRadius"
            minimumValue={0}
            maximumValue={100}
            value={shadowRadius}
            onValueChange={setShadowRadius}
          />
          <ShadowPropSlider
            label="shadowOpacity"
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={shadowOpacity}
            onValueChange={val => setShadowOpacity(val)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
  controls: {
    paddingHorizontal: 12,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Shadow%20Props&supportedPlatforms=ios&ext=tsx&dependencies=@react-native-community/slider
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Slider, {SliderProps} from '@react-native-community/slider';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ShadowPropSliderProps = SliderProps & {
  label: string;
};

const ShadowPropSlider = ({label, value, ...props}: ShadowPropSliderProps) => {
  return (
    <>
      <Text>
        {label} ({value?.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.square,
            {
              shadowOffset: {
                width: shadowOffsetWidth,
                height: -shadowOffsetHeight,
              },
              shadowOpacity,
              shadowRadius,
            },
          ]}
        />
        <View style={styles.controls}>
          <ShadowPropSlider
            label="shadowOffset - X"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetWidth}
            onValueChange={setShadowOffsetWidth}
          />
          <ShadowPropSlider
            label="shadowOffset - Y"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetHeight}
            onValueChange={setShadowOffsetHeight}
          />
          <ShadowPropSlider
            label="shadowRadius"
            minimumValue={0}
            maximumValue={100}
            value={shadowRadius}
            onValueChange={setShadowRadius}
          />
          <ShadowPropSlider
            label="shadowOpacity"
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={shadowOpacity}
            onValueChange={val => setShadowOpacity(val)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
  controls: {
    paddingHorizontal: 12,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# Referência

Existem 3 conjuntos de APIs de sombra no React Native:

- `boxShadow`: Uma prop de estilo do View e uma implementação compatível com a especificação da [prop de estilo web de mesmo nome](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow).
- `dropShadow`: Uma função de filtro específica disponível como parte da prop de estilo [`filter`](./view-style-props#filter) do View.
- Várias props `shadow` (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`): Estas mapeiam diretamente para suas contrapartes nativas expostas pelas APIs de nível de plataforma.

A diferença entre `dropShadow` e `boxShadow` são as seguintes:

- `dropShadow` existe como parte de `filter`, enquanto `boxShadow` é uma prop de estilo independente.
- `dropShadow` é uma máscara alpha, então apenas pixels com um valor alpha positivo irão "projetar" uma sombra. `boxShadow` irá projetar ao redor do border box do elemento independentemente de seu conteúdo (a menos que seja inset).
- `dropShadow` está disponível apenas no Android, `boxShadow` está disponível no iOS e Android.
- `dropShadow` não pode ser inset como `boxShadow`.
- `dropShadow` não possui o argumento `spreadDistance` como `boxShadow`.

Tanto `boxShadow` quanto `dropShadow` são geralmente mais capazes do que as props `shadow`. As props `shadow`, no entanto, mapeiam para APIs nativas de nível de plataforma, então se você precisa apenas de uma sombra simples, essas props são recomendadas. Note que apenas `shadowColor` funciona tanto no Android quanto no iOS, todas as outras props `shadow` funcionam apenas no iOS.

## Props

### `boxShadow`

Veja [View Style Props](./view-style-props#boxshadow) para documentação.

### `dropShadow` <div className="label android">Android</div>

Veja [View Style Props](./view-style-props#filter) para documentação.

### `shadowColor`

Define a cor da sombra projetada.

Esta propriedade funcionará apenas no Android API 28 e superior. Para funcionalidade similar em APIs Android inferiores, use a [propriedade `elevation`](view-style-props#elevation-android).

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `shadowOffset` <div className="label ios">iOS</div>

Define o deslocamento da sombra projetada.

| Type                                     |
| ---------------------------------------- |
| object: `{width: number,height: number}` |

---

### `shadowOpacity` <div className="label ios">iOS</div>

Define a opacidade da sombra projetada (multiplicada pelo componente alpha da cor).

| Type   |
| ------ |
| number |

---

### `shadowRadius` <div className="label ios">iOS</div>

Define o raio de desfoque da sombra projetada.

| Type   |
| ------ |
| number |
