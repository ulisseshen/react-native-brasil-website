---
ia-translated: true
id: easing
title: Easing
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

O módulo `Easing` implementa funções de easing comuns. Este módulo é usado por [`Animated.timing()`](animated.md#timing) para transmitir movimento fisicamente plausível em animações.

Você pode encontrar uma visualização de algumas funções de easing comuns em https://easings.net/

### Animações predefinidas

O módulo `Easing` fornece várias animações predefinidas através dos seguintes métodos:

- [`back`](easing.md#back) fornece uma animação básica onde o objeto volta ligeiramente antes de se mover para frente
- [`bounce`](easing.md#bounce) fornece uma animação de salto
- [`ease`](easing.md#ease) fornece uma animação inercial básica
- [`elastic`](easing.md#elastic) fornece uma interação de mola básica

### Funções padrão

Três funções de easing padrão são fornecidas:

- [`linear`](easing.md#linear)
- [`quad`](easing.md#quad)
- [`cubic`](easing.md#cubic)

A função [`poly`](easing.md#poly) pode ser usada para implementar funções quárticas, quínticas e outras funções de potência superior.

### Funções adicionais

Funções matemáticas adicionais são fornecidas pelos seguintes métodos:

- [`bezier`](easing.md#bezier) fornece uma curva de Bézier cúbica
- [`circle`](easing.md#circle) fornece uma função circular
- [`sin`](easing.md#sin) fornece uma função senoidal
- [`exp`](easing.md#exp) fornece uma função exponencial

Os seguintes auxiliares são usados para modificar outras funções de easing.

- [`in`](easing.md#in) executa uma função de easing para frente
- [`inOut`](easing.md#inout) torna qualquer função de easing simétrica
- [`out`](easing.md#out) executa uma função de easing para trás

## Exemplo

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Easing%20Demo&ext=js
import React, {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Easing%20Demo&ext=tsx
import React, {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type EasingFunction,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = (easing: EasingFunction) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# Referência

## Métodos

### `step0()`

```tsx
static step0(n: number);
```

Uma função de passo, retorna 1 para qualquer valor positivo de `n`.

---

### `step1()`

```tsx
static step1(n: number);
```

Uma função de passo, retorna 1 se `n` for maior ou igual a 1.

---

### `linear()`

```tsx
static linear(t: number);
```

Uma função linear, `f(t) = t`. A posição se correlaciona com o tempo decorrido um para um.

https://cubic-bezier.com/#0,0,1,1

---

### `ease()`

```tsx
static ease(t: number);
```

Uma interação inercial básica, semelhante a um objeto acelerando lentamente até a velocidade.

https://cubic-bezier.com/#.42,0,1,1

---

### `quad()`

```tsx
static quad(t: number);
```

Uma função quadrática, `f(t) = t * t`. A posição é igual ao quadrado do tempo decorrido.

https://easings.net/#easeInQuad

---

### `cubic()`

```tsx
static cubic(t: number);
```

Uma função cúbica, `f(t) = t * t * t`. A posição é igual ao cubo do tempo decorrido.

https://easings.net/#easeInCubic

---

### `poly()`

```tsx
static poly(n: number);
```

Uma função de potência. A posição é igual à enésima potência do tempo decorrido.

n = 4: https://easings.net/#easeInQuart n = 5: https://easings.net/#easeInQuint

---

### `sin()`

```tsx
static sin(t: number);
```

Uma função senoidal.

https://easings.net/#easeInSine

---

### `circle()`

```tsx
static circle(t: number);
```

Uma função circular.

https://easings.net/#easeInCirc

---

### `exp()`

```tsx
static exp(t: number);
```

Uma função exponencial.

https://easings.net/#easeInExpo

---

### `elastic()`

```tsx
static elastic(bounciness: number);
```

Uma interação elástica básica, semelhante a uma mola oscilando para frente e para trás.

O valor padrão de bounciness é 1, que ultrapassa um pouco uma vez. Bounciness 0 não ultrapassa de forma alguma, e bounciness de N > 1 ultrapassará cerca de N vezes.

https://easings.net/#easeInElastic

---

### `back()`

```tsx
static back(s)
```

Use com `Animated.parallel()` para criar um efeito básico onde o objeto anima ligeiramente para trás quando a animação começa.

---

### `bounce()`

```tsx
static bounce(t: number);
```

Fornece um efeito básico de salto.

https://easings.net/#easeInBounce

---

### `bezier()`

```tsx
static bezier(x1: number, y1: number, x2: number, y2: number);
```

Fornece uma curva de Bézier cúbica, equivalente ao `transition-timing-function` das Transições CSS.

Uma ferramenta útil para visualizar curvas de Bézier cúbicas pode ser encontrada em https://cubic-bezier.com/

---

### `in()`

```tsx
static in(easing: number);
```

Executa uma função de easing para frente.

---

### `out()`

```tsx
static out(easing: number);
```

Executa uma função de easing para trás.

---

### `inOut()`

```tsx
static inOut(easing: number);
```

Torna qualquer função de easing simétrica. A função de easing será executada para frente durante metade da duração e depois para trás durante o restante da duração.
