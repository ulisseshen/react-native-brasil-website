---
ia-translated: true
id: layout-props
title: Props de Layout
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

:::info
Exemplos mais detalhados sobre essas propriedades podem ser encontrados na página [Layout with Flexbox](flexbox).
:::

### Exemplo

O exemplo a seguir mostra como diferentes propriedades podem afetar ou moldar um layout React Native. Você pode tentar, por exemplo, adicionar ou remover quadrados da UI enquanto altera os valores da propriedade `flexWrap`.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=LayoutProps%20Example&ext=js
import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  };

  const changeSetting = (value, options, setterFunction) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.playingSpace, hookedStyles]}>
          {squares.map(elem => elem)}
        </View>
        <ScrollView style={styles.layoutContainer}>
          <View style={styles.controlSpace}>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Direction"
                onPress={() =>
                  changeSetting(flexDirection, flexDirections, setFlexDirection)
                }
              />
              <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Justify Content"
                onPress={() =>
                  changeSetting(
                    justifyContent,
                    justifyContents,
                    setJustifyContent,
                  )
                }
              />
              <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Align Items"
                onPress={() =>
                  changeSetting(alignItems, alignItemsArr, setAlignItems)
                }
              />
              <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Direction"
                onPress={() =>
                  changeSetting(direction, directions, setDirection)
                }
              />
              <Text style={styles.text}>{directions[direction]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Wrap"
                onPress={() => changeSetting(wrap, wraps, setWrap)}
              />
              <Text style={styles.text}>{wraps[wrap]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Add Square"
                onPress={() => setSquares([...squares, <Square />])}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Delete Square"
                onPress={() =>
                  setSquares(squares.filter((v, i) => i !== squares.length - 1))
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const flexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
const justifyContents = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const alignItemsArr = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
];
const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
const directions = ['inherit', 'ltr', 'rtl'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 0.5,
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
    overflow: 'hidden',
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 14).toString(16);
  });
};

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=LayoutProps%20Example&ext=tsx
import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlexAlignType,
  FlexStyle,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  } as FlexStyle;

  const changeSetting = (
    value: number,
    options: any[],
    setterFunction: (index: number) => void,
  ) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.playingSpace, hookedStyles]}>
          {squares.map(elem => elem)}
        </View>
        <ScrollView style={styles.layoutContainer}>
          <View style={styles.controlSpace}>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Direction"
                onPress={() =>
                  changeSetting(flexDirection, flexDirections, setFlexDirection)
                }
              />
              <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Justify Content"
                onPress={() =>
                  changeSetting(
                    justifyContent,
                    justifyContents,
                    setJustifyContent,
                  )
                }
              />
              <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Align Items"
                onPress={() =>
                  changeSetting(alignItems, alignItemsArr, setAlignItems)
                }
              />
              <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Direction"
                onPress={() =>
                  changeSetting(direction, directions, setDirection)
                }
              />
              <Text style={styles.text}>{directions[direction]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Wrap"
                onPress={() => changeSetting(wrap, wraps, setWrap)}
              />
              <Text style={styles.text}>{wraps[wrap]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Add Square"
                onPress={() => setSquares([...squares, <Square />])}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Delete Square"
                onPress={() =>
                  setSquares(squares.filter((v, i) => i !== squares.length - 1))
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const flexDirections = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
] as FlexStyle['flexDirection'][];
const justifyContents = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as FlexStyle['justifyContent'][];
const alignItemsArr = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
] as FlexAlignType[];
const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
const directions = ['inherit', 'ltr', 'rtl'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 0.5,
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
    overflow: 'hidden',
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 14).toString(16);
  });
};

export default App;
```

</TabItem>
</Tabs>

---

# Referência

## Props

### `alignContent`

`alignContent` controla como as linhas se alinham na direção transversal, substituindo o `alignContent` do pai. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/align-content para mais detalhes.

| Tipo                                                                                                 | Obrigatório |
| ---------------------------------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly') | Não       |

---

### `alignItems`

`alignItems` alinha os filhos na direção transversal. Por exemplo, se os filhos estão fluindo verticalmente, `alignItems` controla como eles se alinham horizontalmente. Funciona como `align-items` no CSS (padrão: stretch). Veja https://developer.mozilla.org/en-US/docs/Web/CSS/align-items para mais detalhes.

| Tipo                                                            | Obrigatório |
| --------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'baseline') | Não       |

---

### `alignSelf`

`alignSelf` controla como um filho se alinha na direção transversal, substituindo o `alignItems` do pai. Funciona como `align-self` no CSS (padrão: auto). Veja https://developer.mozilla.org/en-US/docs/Web/CSS/align-self para mais detalhes.

| Tipo                                                                    | Obrigatório |
| ----------------------------------------------------------------------- | -------- |
| enum('auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline') | Não       |

---

### `aspectRatio`

Aspect ratio controla o tamanho da dimensão indefinida de um nó. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio para mais detalhes.

- Em um nó com width/height definida, aspect ratio controla o tamanho da dimensão não definida
- Em um nó com flex basis definida, aspect ratio controla o tamanho do nó no eixo transversal se não estiver definido
- Em um nó com uma função de medida, aspect ratio funciona como se a função de medida medisse o flex basis
- Em um nó com flex grow/shrink, aspect ratio controla o tamanho do nó no eixo transversal se não estiver definido
- Aspect ratio leva em conta as dimensões min/max

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `borderBottomWidth`

`borderBottomWidth` funciona como `border-bottom-width` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `borderEndWidth`

Quando direction é `ltr`, `borderEndWidth` é equivalente a `borderRightWidth`. Quando direction é `rtl`, `borderEndWidth` é equivalente a `borderLeftWidth`.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `borderLeftWidth`

`borderLeftWidth` funciona como `border-left-width` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `borderRightWidth`

`borderRightWidth` funciona como `border-right-width` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `borderStartWidth`

Quando direction é `ltr`, `borderStartWidth` é equivalente a `borderLeftWidth`. Quando direction é `rtl`, `borderStartWidth` é equivalente a `borderRightWidth`.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `borderTopWidth`

`borderTopWidth` funciona como `border-top-width` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `borderWidth`

`borderWidth` funciona como `border-width` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/border-width para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `bottom`

`bottom` é o número de pixels lógicos para deslocar a borda inferior deste componente.

Funciona de forma similar a `bottom` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/bottom para mais detalhes sobre como `bottom` afeta o layout.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `boxSizing`

`boxSizing` define como as várias props de dimensionamento do elemento (`width`, `height`, `minWidth`, `minHeight`, etc.) são calculadas. Se `boxSizing` for `border-box`, esses tamanhos se aplicam à border box do elemento. Se for `content-box`, eles se aplicam à content box do elemento. O valor padrão é `border-box`. A [documentação web](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) é uma boa fonte de informação se você deseja aprender mais sobre como essa prop funciona.

| Tipo                              | Obrigatório |
| --------------------------------- | -------- |
| enum('border-box', 'content-box') | Não       |

---

### `columnGap`

`columnGap` funciona como `column-gap` no CSS. Apenas unidades de pixel são suportadas no React Native. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `direction`

`direction` especifica o fluxo direcional da interface do usuário. O padrão é `inherit`, exceto para o nó raiz que terá valor baseado no locale atual. Veja https://www.yogalayout.dev/docs/styling/layout-direction para mais detalhes.

| Tipo                          | Obrigatório | Plataforma |
| ----------------------------- | -------- | -------- |
| enum('inherit', 'ltr', 'rtl') | Não       | iOS      |

---

### `display`

`display` define o tipo de exibição deste componente.

Funciona de forma similar a `display` no CSS, mas suporta apenas os valores 'flex', 'none' e 'contents'. O padrão é `flex`.

| Tipo                             | Obrigatório |
| -------------------------------- | -------- |
| enum('none', 'flex', 'contents') | Não       |

---

### `end`

Quando direction é `ltr`, `end` é equivalente a `right`. Quando direction é `rtl`, `end` é equivalente a `left`.

Este estilo tem precedência sobre os estilos `left` e `right`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `flex`

No React Native, `flex` não funciona da mesma forma que funciona no CSS. `flex` é um número ao invés de uma string, e funciona de acordo com o layout engine [Yoga](https://github.com/facebook/yoga).

Quando `flex` é um número positivo, ele torna o componente flexível, e ele será dimensionado proporcionalmente ao seu valor flex. Assim, um componente com `flex` definido como 2 ocupará o dobro do espaço de um componente com `flex` definido como 1. `flex: <positive number>` equivale a `flexGrow: <positive number>, flexShrink: 1, flexBasis: 0`.

Quando `flex` é 0, o componente é dimensionado de acordo com `width` e `height`, e é inflexível.

Quando `flex` é -1, o componente normalmente é dimensionado de acordo com `width` e `height`. No entanto, se não houver espaço suficiente, o componente encolherá para seu `minWidth` e `minHeight`.

`flexGrow`, `flexShrink` e `flexBasis` funcionam da mesma forma que no CSS.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `flexBasis`

`flexBasis` é uma forma independente de eixo de fornecer o tamanho padrão de um item ao longo do eixo principal. Definir o `flexBasis` de um filho é similar a definir o `width` desse filho se seu pai é um container com `flexDirection: row` ou definir o `height` de um filho se seu pai é um container com `flexDirection: column`. O `flexBasis` de um item é o tamanho padrão desse item, o tamanho do item antes que quaisquer cálculos de `flexGrow` e `flexShrink` sejam realizados.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `flexDirection`

`flexDirection` controla em quais direções os filhos de um container vão. `row` vai da esquerda para a direita, `column` vai de cima para baixo, e você pode conseguir adivinhar o que os outros dois fazem. Funciona como `flex-direction` no CSS, exceto que o padrão é `column`. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction para mais detalhes.

| Tipo                                                   | Obrigatório |
| ------------------------------------------------------ | -------- |
| enum('row', 'row-reverse', 'column', 'column-reverse') | Não       |

---

### `flexGrow`

`flexGrow` descreve como qualquer espaço dentro de um container deve ser distribuído entre seus filhos ao longo do eixo principal. Depois de posicionar seus filhos, um container distribuirá qualquer espaço restante de acordo com os valores de flex grow especificados por seus filhos.

`flexGrow` aceita qualquer valor de ponto flutuante >= 0, sendo 0 o valor padrão. Um container distribuirá qualquer espaço restante entre seus filhos ponderado pelos valores de `flexGrow` dos filhos.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `flexShrink`

[`flexShrink`](layout-props#flexshrink) descreve como encolher filhos ao longo do eixo principal no caso em que o tamanho total dos filhos excede o tamanho do container no eixo principal. `flexShrink` é muito similar a `flexGrow` e pode ser pensado da mesma forma se qualquer tamanho excedente for considerado espaço restante negativo. Essas duas propriedades também funcionam bem juntas, permitindo que os filhos cresçam e encolham conforme necessário.

`flexShrink` aceita qualquer valor de ponto flutuante >= 0, sendo 0 o valor padrão. Um container encolherá seus filhos ponderado pelos valores de `flexShrink` dos filhos.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `flexWrap`

`flexWrap` controla se os filhos podem envolver depois de atingir o fim de um flex container. Funciona como `flex-wrap` no CSS (padrão: nowrap). Veja https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap para mais detalhes. Note que não funciona mais com `alignItems: stretch` (o padrão), então você pode querer usar `alignItems: flex-start` por exemplo (detalhes da mudança: https://github.com/facebook/react-native/releases/tag/v0.28.0).

| Tipo                                   | Obrigatório |
| -------------------------------------- | -------- |
| enum('wrap', 'nowrap', 'wrap-reverse') | Não       |

---

### `gap`

`gap` funciona como `gap` no CSS. Apenas unidades de pixel são suportadas no React Native. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/gap para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `height`

`height` define a altura deste componente.

Funciona de forma similar a `height` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/height para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `isolation`

`isolation` permite formar um [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context). Esta prop está disponível apenas na [Nova Arquitetura](/architecture/landing-page).

Existem dois valores:

- `auto` (padrão): Não faz nada.
- `isolate`: Forma um stacking context.

| Tipo                    | Obrigatório |
| ----------------------- | -------- |
| enum('auto', 'isolate') | Não       |

---

### `justifyContent`

`justifyContent` alinha os filhos na direção principal. Por exemplo, se os filhos estão fluindo verticalmente, `justifyContent` controla como eles se alinham verticalmente. Funciona como `justify-content` no CSS (padrão: flex-start). Veja https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content para mais detalhes.

| Tipo                                                                                      | Obrigatório |
| ----------------------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly') | Não       |

---

### `left`

`left` é o número de pixels lógicos para deslocar a borda esquerda deste componente.

Funciona de forma similar a `left` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/left para mais detalhes sobre como `left` afeta o layout.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `margin`

Definir `margin` tem o mesmo efeito que definir cada um de `marginTop`, `marginLeft`, `marginBottom` e `marginRight`. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/margin para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginBottom`

`marginBottom` funciona como `margin-bottom` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginEnd`

Quando direction é `ltr`, `marginEnd` é equivalente a `marginRight`. Quando direction é `rtl`, `marginEnd` é equivalente a `marginLeft`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginHorizontal`

Definir `marginHorizontal` tem o mesmo efeito que definir ambos `marginLeft` e `marginRight`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginLeft`

`marginLeft` funciona como `margin-left` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginRight`

`marginRight` funciona como `margin-right` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginStart`

Quando direction é `ltr`, `marginStart` é equivalente a `marginLeft`. Quando direction é `rtl`, `marginStart` é equivalente a `marginRight`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginTop`

`marginTop` funciona como `margin-top` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `marginVertical`

Definir `marginVertical` tem o mesmo efeito que definir ambos `marginTop` e `marginBottom`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `maxHeight`

`maxHeight` é a altura máxima para este componente, em pixels lógicos.

Funciona de forma similar a `max-height` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/max-height para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `maxWidth`

`maxWidth` é a largura máxima para este componente, em pixels lógicos.

Funciona de forma similar a `max-width` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/max-width para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `minHeight`

`minHeight` é a altura mínima para este componente, em pixels lógicos.

Funciona de forma similar a `min-height` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/min-height para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `minWidth`

`minWidth` é a largura mínima para este componente, em pixels lógicos.

Funciona de forma similar a `min-width` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/min-width para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `overflow`

`overflow` controla como os filhos são medidos e exibidos. `overflow: hidden` faz com que as views sejam cortadas enquanto `overflow: scroll` faz com que as views sejam medidas independentemente do eixo principal de seus pais. Funciona como `overflow` no CSS (padrão: visible). Veja https://developer.mozilla.org/en/docs/Web/CSS/overflow para mais detalhes.

| Tipo                                | Obrigatório |
| ----------------------------------- | -------- |
| enum('visible', 'hidden', 'scroll') | Não       |

---

### `padding`

Definir `padding` tem o mesmo efeito que definir cada um de `paddingTop`, `paddingBottom`, `paddingLeft` e `paddingRight`. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/padding para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `paddingBottom`

`paddingBottom` funciona como `padding-bottom` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `paddingEnd`

Quando direction é `ltr`, `paddingEnd` é equivalente a `paddingRight`. Quando direction é `rtl`, `paddingEnd` é equivalente a `paddingLeft`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `paddingHorizontal`

Definir `paddingHorizontal` é como definir ambos `paddingLeft` e `paddingRight`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `paddingLeft`

`paddingLeft` funciona como `padding-left` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `paddingRight`

`paddingRight` funciona como `padding-right` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `paddingStart`

Quando direction é `ltr`, `paddingStart` é equivalente a `paddingLeft`. Quando direction é `rtl`, `paddingStart` é equivalente a `paddingRight`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `paddingTop`

`paddingTop` funciona como `padding-top` no CSS. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top para mais detalhes.

| Tipo            | Obrigatório |
| --------------- | -------- |
| number, ,string | Não       |

---

### `paddingVertical`

Definir `paddingVertical` é como definir ambos `paddingTop` e `paddingBottom`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `position`

`position` no React Native é similar ao [CSS regular](https://developer.mozilla.org/en-US/docs/Web/CSS/position), mas tudo é definido como `relative` por padrão.

`relative` posicionará um elemento de acordo com o fluxo normal do layout. Insets (`top`, `bottom`, `left`, `right`) serão deslocados em relação a este layout.

`absolute` retira o elemento do fluxo normal do layout. Insets serão deslocados em relação ao seu [containing block](./flexbox.md#the-containing-block).

`static` posicionará um elemento de acordo com o fluxo normal do layout. Insets não terão efeito.
Elementos `static` não formam um containing block para descendentes absolutos.

Para mais informações, veja os [documentos de Layout com Flexbox](./flexbox.md#position). Além disso, [a documentação do Yoga](https://www.yogalayout.dev/docs/styling/position) tem mais detalhes sobre como `position` difere entre React Native e CSS.

| Tipo                                   | Obrigatório |
| -------------------------------------- | -------- |
| enum('absolute', 'relative', 'static') | Não       |

---

### `right`

`right` é o número de pixels lógicos para deslocar a borda direita deste componente.

Funciona de forma similar a `right` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/right para mais detalhes sobre como `right` afeta o layout.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `rowGap`

`rowGap` funciona como `row-gap` no CSS. Apenas unidades de pixel são suportadas no React Native. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap para mais detalhes.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---

### `start`

Quando direction é `ltr`, `start` é equivalente a `left`. Quando direction é `rtl`, `start` é equivalente a `right`.

Este estilo tem precedência sobre os estilos `left`, `right` e `end`.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `top`

`top` é o número de pixels lógicos para deslocar a borda superior deste componente.

Funciona de forma similar a `top` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas.

Veja https://developer.mozilla.org/en-US/docs/Web/CSS/top para mais detalhes sobre como `top` afeta o layout.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `width`

`width` define a largura deste componente.

Funciona de forma similar a `width` no CSS, mas no React Native você deve usar pontos ou porcentagens. Ems e outras unidades não são suportadas. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/width para mais detalhes.

| Tipo           | Obrigatório |
| -------------- | -------- |
| number, string | Não       |

---

### `zIndex`

`zIndex` controla quais componentes são exibidos em cima de outros. Normalmente, você não usa `zIndex`. Componentes renderizam de acordo com sua ordem na árvore do documento, então componentes posteriores são desenhados sobre os anteriores. `zIndex` pode ser útil se você tiver animações ou interfaces modais customizadas onde você não deseja esse comportamento.

Funciona como a propriedade CSS `z-index` - componentes com um `zIndex` maior renderizarão em cima. Pense na direção z como se estivesse apontando do telefone para seu olho. Veja https://developer.mozilla.org/en-US/docs/Web/CSS/z-index para mais detalhes.

No iOS, `zIndex` pode requerer que `View`s sejam irmãs umas das outras para funcionar como esperado.

| Tipo   | Obrigatório |
| ------ | -------- |
| number | Não       |

---
