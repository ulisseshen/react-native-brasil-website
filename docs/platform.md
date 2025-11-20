---
ia-translated: true
id: platform
title: Platform
---

## Exemplo

```SnackPlayer name=Platform%20API%20Example&supportedPlatforms=ios,android
import React from 'react';
import {Platform, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>OS</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
          <Text>OS Version</Text>
          <Text style={styles.value}>{Platform.Version}</Text>
          <Text>isTV</Text>
          <Text style={styles.value}>{Platform.isTV.toString()}</Text>
          {Platform.OS === 'ios' && (
            <>
              <Text>isPad</Text>
              <Text style={styles.value}>{Platform.isPad.toString()}</Text>
            </>
          )}
          <Text>Constants</Text>
          <Text style={styles.value}>
            {JSON.stringify(Platform.constants, null, 2)}
          </Text>
        </ScrollView>
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
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8,
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
```

---

# Referência

## Propriedades

### `constants`

```tsx
static constants: PlatformConstants;
```

Retorna um objeto que contém todas as constantes comuns e específicas disponíveis relacionadas à plataforma.

**Propriedades:**

| <div className="widerColumn">Name</div>                   | Type    | Optional | Description                                                                                                                                                                                                         |
| --------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isTesting                                                 | boolean | No       |                                                                                                                                                                                                                     |
| reactNativeVersion                                        | object  | No       | Informações sobre a versão do React Native. As chaves são `major`, `minor`, `patch` com `prerelease` opcional e os valores são `number`s.                                                                          |
| Version <div className="label android">Android</div>      | number  | No       | Constante de versão do SO específica para Android.                                                                                                                                                                 |
| Release <div className="label android">Android</div>      | string  | No       |                                                                                                                                                                                                                     |
| Serial <div className="label android">Android</div>       | string  | No       | Número de série do hardware de um dispositivo Android.                                                                                                                                                             |
| Fingerprint <div className="label android">Android</div>  | string  | No       | Uma string que identifica exclusivamente a build.                                                                                                                                                                  |
| Model <div className="label android">Android</div>        | string  | No       | O nome visível ao usuário final para o dispositivo Android.                                                                                                                                                        |
| Brand <div className="label android">Android</div>        | string  | No       | A marca visível ao consumidor com a qual o produto/hardware será associado.                                                                                                                                        |
| Manufacturer <div className="label android">Android</div> | string  | No       | O fabricante do dispositivo Android.                                                                                                                                                                               |
| ServerHost <div className="label android">Android</div>   | string  | Yes      |                                                                                                                                                                                                                     |
| uiMode <div className="label android">Android</div>       | string  | No       | Os valores possíveis são: `'car'`, `'desk'`, `'normal'`,`'tv'`, `'watch'` e `'unknown'`. Leia mais sobre [Android ModeType](https://developer.android.com/reference/android/app/UiModeManager.html).              |
| forceTouchAvailable <div className="label ios">iOS</div>  | boolean | No       | Indica a disponibilidade do 3D Touch em um dispositivo.                                                                                                                                                            |
| interfaceIdiom <div className="label ios">iOS</div>       | string  | No       | O tipo de interface para o dispositivo. Leia mais sobre [UIUserInterfaceIdiom](https://developer.apple.com/documentation/uikit/uiuserinterfaceidiom).                                                              |
| osVersion <div className="label ios">iOS</div>            | string  | No       | Constante de versão do SO específica para iOS.                                                                                                                                                                     |
| systemName <div className="label ios">iOS</div>           | string  | No       | Constante de nome do SO específica para iOS.                                                                                                                                                                       |

---

### `isPad` <div className="label ios">iOS</div>

```tsx
static isPad: boolean;
```

Retorna um booleano que define se o dispositivo é um iPad.

| Type    |
| ------- |
| boolean |

---

### `isTV`

```tsx
static isTV: boolean;
```

Retorna um booleano que define se o dispositivo é uma TV.

| Type    |
| ------- |
| boolean |

---

### `isVision`

```tsx
static isVision: boolean;
```

Retorna um booleano que define se o dispositivo é um Apple Vision. _Se você estiver usando [Apple Vision Pro (Designed for iPad)](https://developer.apple.com/documentation/visionos/determining-whether-to-bring-your-app-to-visionos), `isVision` será `false`, mas `isPad` será `true`_

| Type    |
| ------- |
| boolean |

---

### `isTesting`

```tsx
static isTesting: boolean;
```

Retorna um booleano que define se a aplicação está sendo executada no Developer Mode com a flag de testes ativada.

| Type    |
| ------- |
| boolean |

---

### `OS`

```tsx
static OS: 'android' | 'ios';
```

Retorna um valor string representando o SO atual.

| Type                       |
| -------------------------- |
| enum(`'android'`, `'ios'`) |

---

### `Version`

```tsx
static Version: 'number' | 'string';
```

Retorna a versão do SO.

| Type                                                                                                 |
| ---------------------------------------------------------------------------------------------------- |
| number <div className="label android">Android</div><hr />string <div className="label ios">iOS</div> |

## Métodos

### `select()`

```tsx
static select(config: Record<string, T>): T;
```

Retorna o valor mais adequado para a plataforma na qual você está executando atualmente.

#### Parâmetros:

| Name   | Type   | Required | Description                           |
| ------ | ------ | -------- | ------------------------------------- |
| config | object | Yes      | Veja a descrição de config abaixo.    |

O método select retorna o valor mais adequado para a plataforma na qual você está executando atualmente. Ou seja, se você estiver executando em um telefone, as chaves `android` e `ios` terão preferência. Se essas não forem especificadas, a chave `native` será usada e depois a chave `default`.

O parâmetro `config` é um objeto com as seguintes chaves:

- `android` (any)
- `ios` (any)
- `native` (any)
- `default` (any)

**Exemplo de uso:**

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        backgroundColor: 'green',
      },
      ios: {
        backgroundColor: 'red',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

Isso resultará em um container com `flex: 1` em todas as plataformas, uma cor de fundo verde no Android, uma cor de fundo vermelha no iOS e uma cor de fundo azul em outras plataformas.

Como o valor da chave da plataforma correspondente pode ser do tipo `any`, o método [`select`](platform.md#select) também pode ser usado para retornar componentes específicos de plataforma, como abaixo:

```tsx
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```
