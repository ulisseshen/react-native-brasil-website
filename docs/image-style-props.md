---
ia-translated: true
id: image-style-props
title: Propriedades de Estilo de Image
---

## Exemplos

### Modo de Redimensionamento de Image

```SnackPlayer name=Image%20Resize%20Modes%20Example
import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const asset = require('@expo/snack-static/react-native-logo.png');

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image style={[styles.image, {resizeMode: 'cover'}]} source={asset} />
          <Text style={styles.text}>resizeMode : cover</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'contain'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : contain</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'stretch'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : stretch</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'repeat'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : repeat</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'center'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : center</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 12,
    alignItems: 'center',
    gap: 16,
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
    width: 200,
  },
  text: {
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default DisplayAnImageWithStyle;
```

### Borda de Image

```SnackPlayer name=Style%20BorderWidth%20and%20BorderColor%20Example
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          borderColor: 'red',
          borderWidth: 5,
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>borderColor & borderWidth</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

### Raio de Borda de Image

```SnackPlayer name=Style%20Border%20Radius%20Example
import React from 'react';
import {View, Image, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const asset = require('@expo/snack-static/react-native-logo.png');

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            style={[styles.image, {borderTopRightRadius: 20}]}
            source={asset}
          />
          <Text>borderTopRightRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderBottomRightRadius: 20}]}
            source={asset}
          />
          <Text>borderBottomRightRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderBottomLeftRadius: 20}]}
            source={asset}
          />
          <Text>borderBottomLeftRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderTopLeftRadius: 20}]}
            source={asset}
          />
          <Text>borderTopLeftRadius</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
    width: 200,
  },
});

export default DisplayAnImageWithStyle;
```

### Matiz de Image

```SnackPlayer name=Style%20tintColor%20Function%20Component
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          tintColor: '#000000',
          resizeMode: 'contain',
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>tintColor</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

# Referência

## Propriedades

### `backfaceVisibility`

A propriedade define se a face traseira de uma imagem rotacionada deve ou não ser visível.

| Tipo                          | Padrão      |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `backgroundColor`

| Tipo               |
| ------------------ |
| [color](colors.md) |

---

### `borderBottomLeftRadius`

| Tipo   |
| ------ |
| number |

---

### `borderBottomRightRadius`

| Tipo   |
| ------ |
| number |

---

### `borderColor`

| Tipo               |
| ------------------ |
| [color](colors.md) |

---

### `borderRadius`

| Tipo   |
| ------ |
| number |

---

### `borderTopLeftRadius`

| Tipo   |
| ------ |
| number |

---

### `borderTopRightRadius`

| Tipo   |
| ------ |
| number |

---

### `borderWidth`

| Tipo   |
| ------ |
| number |

---

### `opacity`

Define um valor de opacidade para a imagem. O número deve estar no intervalo de `0.0` a `1.0`.

| Tipo   | Padrão |
| ------ | ------ |
| number | `1.0`  |

---

### `overflow`

| Tipo                          | Padrão      |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `overlayColor` <div className="label android">Android</div>

Quando a imagem tem cantos arredondados, especificar um overlayColor fará com que o espaço restante nos cantos seja preenchido com uma cor sólida. Isso é útil em casos que não são suportados pela implementação Android de cantos arredondados:

- Certos modos de redimensionamento, como `'contain'`
- GIFs animados

Uma maneira típica de usar esta propriedade é com imagens exibidas em um fundo sólido e definir o `overlayColor` para a mesma cor do fundo.

Para detalhes de como isso funciona internamente, consulte a [documentação do Fresco](https://frescolib.org/docs/rounded-corners-and-circles.html).

| Tipo   |
| ------ |
| string |

---

### `resizeMode`

Determina como redimensionar a imagem quando o quadro não corresponde às dimensões da imagem bruta. O padrão é `cover`.

- `cover`: Dimensiona a imagem uniformemente (mantém a proporção da imagem) de modo que:
  - Ambas as dimensões (largura e altura) da imagem sejam iguais ou maiores que a dimensão correspondente da view (menos padding)
  - Pelo menos uma dimensão da imagem dimensionada seja igual à dimensão correspondente da view (menos padding)

- `contain`: Dimensiona a imagem uniformemente (mantém a proporção da imagem) de modo que ambas as dimensões (largura e altura) da imagem sejam iguais ou menores que a dimensão correspondente da view (menos padding).

- `stretch`: Dimensiona largura e altura independentemente. Isso pode alterar a proporção da imagem original.

- `repeat`: Repete a imagem para cobrir o quadro da view. A imagem manterá seu tamanho e proporção, a menos que seja maior que a view, caso em que será reduzida uniformemente para que esteja contida na view.

- `center`: Centraliza a imagem na view ao longo de ambas as dimensões. Se a imagem for maior que a view, reduz uniformemente para que esteja contida na view.

| Tipo                                                              | Padrão    |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `objectFit`

Determina como redimensionar a imagem quando o quadro não corresponde às dimensões da imagem bruta.

| Tipo                                                   | Padrão    |
| ------------------------------------------------------ | --------- |
| enum(`'cover'`, `'contain'`, `'fill'`, `'scale-down'`) | `'cover'` |

---

### `tintColor`

Altera a cor de todos os pixels não transparentes para o tintColor.

| Tipo               |
| ------------------ |
| [color](colors.md) |
