---
ia-translated: true
id: pressable
title: Pressable
---

Pressable é um wrapper de Core Component que pode detectar vários estágios de interações de toque em qualquer um de seus filhos definidos.

```tsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

## Como funciona

Em um elemento envolvido por `Pressable`:

- [`onPressIn`](#onpressin) é chamado quando um toque é ativado.
- [`onPressOut`](#onpressout) é chamado quando o gesto de toque é desativado.

Após pressionar [`onPressIn`](#onpressin), uma de duas coisas acontecerá:

1. A pessoa removerá o dedo, disparando [`onPressOut`](#onpressout) seguido por [`onPress`](#onpress).
2. Se a pessoa deixar o dedo por mais de 500 milissegundos antes de removê-lo, [`onLongPress`](#onlongpress) é disparado. ([`onPressOut`](#onpressout) ainda será disparado quando o dedo for removido.)

<img src="/docs/assets/d_pressable_pressing.svg" width="1000" alt="Diagrama dos eventos onPress em sequência." />

Dedos não são os instrumentos mais precisos, e é comum que usuários acidentalmente ativem o elemento errado ou percam a área de ativação. Para ajudar, `Pressable` tem um `HitRect` opcional que você pode usar para definir quão longe um toque pode ser registrado a partir do elemento envolvido. Toques podem começar em qualquer lugar dentro de um `HitRect`.

`PressRect` permite que toques se movam além do elemento e seu `HitRect` enquanto mantêm a ativação e são elegíveis para um "press"—pense em deslizar seu dedo lentamente para longe de um botão que você está pressionando.

:::note
A área de toque nunca se estende além dos limites da view pai e o Z-index de views irmãs sempre tem precedência se um toque atingir duas views sobrepostas.
:::

<figure>
  <img src="/docs/assets/d_pressable_anatomy.svg" width="1000" alt="Diagrama de HitRect e PressRect e como eles funcionam." />
  <figcaption>
    Você pode definir <code>HitRect</code> com <code>hitSlop</code> e definir <code>PressRect</code> com <code>pressRetentionOffset</code>.
  </figcaption>
</figure>

:::info
`Pressable` usa a API `Pressability` do React Native. Para mais informações sobre o fluxo da máquina de estados de Pressability e como ela funciona, confira a implementação de [Pressability](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Pressability/Pressability.js#L350).
:::

## Exemplo

```SnackPlayer name=Pressable
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => {
            setTimesPressed(current => current + 1);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
          )}
        </Pressable>
        <View style={styles.logBox}>
          <Text testID="pressable_press_console">{textLog}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default App;
```

## Props

### `android_disableSound` <div className="label android">Android</div>

Se verdadeiro, não reproduz o som do sistema Android ao pressionar.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `android_ripple` <div className="label android">Android</div>

Habilita o efeito ripple do Android e configura suas propriedades.

| Type                                   |
| -------------------------------------- |
| [RippleConfig](pressable#rippleconfig) |

### `children`

Ou children ou uma função que recebe um booleano refletindo se o componente está sendo pressionado no momento.

| Type                     |
| ------------------------ |
| [React Node](react-node) |

### `unstable_pressDelay`

Duração (em milissegundos) para aguardar após pressionar antes de chamar `onPressIn`.

| Type   |
| ------ |
| number |

### `delayLongPress`

Duração (em milissegundos) desde `onPressIn` até `onLongPress` ser chamado.

| Type   | Default |
| ------ | ------- |
| number | `500`   |

### `disabled`

Se o comportamento de toque está desabilitado.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `hitSlop`

Define distância adicional fora do elemento na qual um toque pode ser detectado.

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

### `onHoverIn`

Chamado quando o hover é ativado para fornecer feedback visual.

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onHoverOut`

Chamado quando o hover é desativado para desfazer o feedback visual.

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onLongPress`

Chamado se o tempo após `onPressIn` durar mais de 500 milissegundos. Este período de tempo pode ser customizado com [`delayLongPress`](#delaylongpress).

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPress`

Chamado após `onPressOut`.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressIn`

Chamado imediatamente quando um toque é iniciado, antes de `onPressOut` e `onPress`.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressMove`

Chamado quando a localização do toque se move.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressOut`

Chamado quando um toque é liberado.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `pressRetentionOffset`

Distância adicional fora desta view na qual um toque é considerado um press antes de `onPressOut` ser disparado.

| Type                   | Default                                      |
| ---------------------- | -------------------------------------------- |
| [Rect](rect) or number | `{bottom: 30, left: 20, right: 20, top: 20}` |

### `style`

Ou estilos de view ou uma função que recebe um booleano refletindo se o componente está sendo pressionado no momento e retorna estilos de view.

| Type                                                                                            |
| ----------------------------------------------------------------------------------------------- |
| [View Style](view-style-props) or `md ({ pressed: boolean }) => [View Style](view-style-props)` |

### `testOnly_pressed`

Usado apenas para documentação ou testes (por exemplo, snapshot testing).

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

## Type Definitions

### RippleConfig

Configuração do efeito ripple para a propriedade `android_ripple`.

| Type   |
| ------ |
| object |

**Properties:**

| Name       | Type            | Required | Description                                                                                                                                                                                                                                                                         |
| ---------- | --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color      | [color](colors) | No       | Define a cor do efeito ripple.                                                                                                                                                                                                                                                      |
| borderless | boolean         | No       | Define se o efeito ripple não deve incluir borda.                                                                                                                                                                                                                                   |
| radius     | number          | No       | Define o raio do efeito ripple.                                                                                                                                                                                                                                                     |
| foreground | boolean         | No       | Defina como true para adicionar o efeito ripple ao primeiro plano da view, em vez do plano de fundo. Isso é útil se uma de suas views filhas tem um plano de fundo próprio, ou se você está, por exemplo, exibindo imagens, e não quer que o ripple seja coberto por elas. |
