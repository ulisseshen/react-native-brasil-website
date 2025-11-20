---
ia-translated: true
id: panresponder
title: PanResponder
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`PanResponder` reconcilia vários toques em um único gesto. Ele torna gestos de toque único resilientes a toques extras e pode ser usado para reconhecer gestos básicos de multi-toque.

Por padrão, `PanResponder` mantém um handle do `InteractionManager` para bloquear eventos JS de longa duração de interromper gestos ativos.

Ele fornece um wrapper previsível dos handlers responder fornecidos pelo [sistema responder de gestos](gesture-responder-system.md). Para cada handler, ele fornece um novo objeto `gestureState` junto com o objeto de evento nativo:

```
onPanResponderMove: (event, gestureState) => {}
```

Um evento nativo é um evento de toque sintético com a forma de [PressEvent](pressevent).

Um objeto `gestureState` tem o seguinte:

- `stateID` - ID do gestureState - persistido enquanto houver pelo menos um toque na tela
- `moveX` - as coordenadas de tela mais recentes do toque movido recentemente
- `moveY` - as coordenadas de tela mais recentes do toque movido recentemente
- `x0` - as coordenadas de tela da concessão do responder
- `y0` - as coordenadas de tela da concessão do responder
- `dx` - distância acumulada do gesto desde que o toque começou
- `dy` - distância acumulada do gesto desde que o toque começou
- `vx` - velocidade atual do gesto
- `vy` - velocidade atual do gesto
- `numberActiveTouches` - Número de toques atualmente na tela

## Usage Pattern

```tsx
const ExampleComponent = () => {
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return <View {...panResponder.panHandlers} />;
};
```

## Example

`PanResponder` funciona com a API `Animated` para ajudar a construir gestos complexos na UI. O exemplo a seguir contém um componente `View` animado que pode ser arrastado livremente pela tela

```SnackPlayer name=PanResponder
import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Drag this box!</Text>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;
```

Experimente o [exemplo de PanResponder no RNTester](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/PanResponder/PanResponderExample.js).

---

# Reference

## Methods

### `create()`

```tsx
static create(config: PanResponderCallbacks): PanResponderInstance;
```

**Parameters:**

| Name                                                        | Type   | Description |
| ----------------------------------------------------------- | ------ | ----------- |
| config <div className="label basic required">Required</div> | object | Refer below |

O objeto `config` fornece versões aprimoradas de todos os callbacks responder que fornecem não apenas o [`PressEvent`](pressevent), mas também o estado de gesto do `PanResponder`, substituindo a palavra `Responder` por `PanResponder` em cada um dos callbacks típicos `onResponder*`. Por exemplo, o objeto `config` ficaria assim:

- `onMoveShouldSetPanResponder: (e, gestureState) => {...}`
- `onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}`
- `onStartShouldSetPanResponder: (e, gestureState) => {...}`
- `onStartShouldSetPanResponderCapture: (e, gestureState) => {...}`
- `onPanResponderReject: (e, gestureState) => {...}`
- `onPanResponderGrant: (e, gestureState) => {...}`
- `onPanResponderStart: (e, gestureState) => {...}`
- `onPanResponderEnd: (e, gestureState) => {...}`
- `onPanResponderRelease: (e, gestureState) => {...}`
- `onPanResponderMove: (e, gestureState) => {...}`
- `onPanResponderTerminate: (e, gestureState) => {...}`
- `onPanResponderTerminationRequest: (e, gestureState) => {...}`
- `onShouldBlockNativeResponder: (e, gestureState) => {...}`

Em geral, para eventos que têm equivalentes de captura, atualizamos o gestureState uma vez na fase de captura e podemos usá-lo na fase de bubble também.

Tenha cuidado com os callbacks `onStartShould*`. Eles só refletem o `gestureState` atualizado para eventos de início/fim que fazem bubble/capture para o Node. Uma vez que o node é o responder, você pode confiar que cada evento de início/fim está sendo processado pelo gesto e o `gestureState` está sendo atualizado de acordo. (numberActiveTouches) pode não ser totalmente preciso a menos que você seja o responder.
