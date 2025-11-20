---
ia-translated: true
id: touchablenativefeedback
title: TouchableNativeFeedback
---

:::tip
Se você está procurando uma maneira mais abrangente e à prova de futuro para lidar com entrada baseada em toque, confira a API [Pressable](pressable.md).
:::

Um wrapper para fazer views responderem adequadamente a toques (somente Android). No Android, este componente usa drawable de estado nativo para exibir feedback de toque.

No momento, ele suporta apenas ter uma única instância de View como nó filho, pois é implementado substituindo essa View por outra instância de nó RCTView com algumas propriedades adicionais definidas.

O drawable de fundo do touchable de feedback nativo pode ser personalizado com a propriedade `background`.

## Exemplo

```SnackPlayer name=TouchableNativeFeedback%20Android%20Component%20Example&supportedPlatforms=android
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [rippleColor, setRippleColor] = useState(randomHexColor());
  const [rippleOverflow, setRippleOverflow] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => {
            setRippleColor(randomHexColor());
            setRippleOverflow(!rippleOverflow);
          }}
          background={TouchableNativeFeedback.Ripple(
            rippleColor,
            rippleOverflow,
          )}>
          <View style={styles.touchable}>
            <Text style={styles.text}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function () {
    return Math.round(Math.random() * 16).toString(16);
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  touchable: {
    flex: 0.33,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default App;
```

---

# Referência

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

Herda [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

---

### `background`

Determina o tipo de drawable de fundo que será usado para exibir feedback. Ele recebe um objeto com a propriedade `type` e dados extras dependendo do `type`. É recomendado usar um dos métodos estáticos para gerar esse dicionário.

| Tipo               |
| ------------------ |
| backgroundPropType |

---

### `useForeground`

Defina como true para adicionar o efeito ripple ao primeiro plano da view, em vez do fundo. Isso é útil se uma de suas views filhas tiver um fundo próprio, ou se você estiver, por exemplo, exibindo imagens e não quiser que o ripple seja coberto por elas.

Verifique primeiro TouchableNativeFeedback.canUseNativeForeground(), pois isso só está disponível no Android 6.0 e superior. Se você tentar usar isso em versões mais antigas, receberá um aviso e voltará ao fundo.

| Tipo |
| ---- |
| bool |

---

### `hasTVPreferredFocus` <div className="label android">Android</div>

Foco preferencial de TV (veja a documentação para o componente View).

| Tipo |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

Próximo foco de TV para baixo (veja a documentação para o componente View).

| Tipo   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

Próximo foco de TV para frente (veja a documentação para o componente View).

| Tipo   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

Próximo foco de TV para esquerda (veja a documentação para o componente View).

| Tipo   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

Próximo foco de TV para direita (veja a documentação para o componente View).

| Tipo   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

Próximo foco de TV para cima (veja a documentação para o componente View).

| Tipo   |
| ------ |
| number |

## Métodos

### `SelectableBackground()`

```tsx
static SelectableBackground(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;
```

Cria um objeto que representa o fundo padrão do tema Android para elementos selecionáveis (`?android:attr/selectableItemBackground`). O parâmetro `rippleRadius` controla o raio do efeito ripple.

---

### `SelectableBackgroundBorderless()`

```tsx
static SelectableBackgroundBorderless(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;
```

Cria um objeto que representa o fundo padrão do tema Android para elementos selecionáveis sem borda (`?android:attr/selectableItemBackgroundBorderless`). Disponível no nível de API Android 21+. O parâmetro `rippleRadius` controla o raio do efeito ripple.

---

### `Ripple()`

```tsx
static Ripple(
  color: ColorValue,
  borderless: boolean,
  rippleRadius?: number | null,
): RippleBackgroundPropType;
```

Cria um objeto que representa drawable ripple com cor especificada (como uma string). Se a propriedade `borderless` for avaliada como true, o ripple será renderizado fora dos limites da view (veja os botões nativos da actionbar como exemplo desse comportamento). Este tipo de fundo está disponível no nível de API Android 21+.

**Parâmetros:**

| Nome         | Tipo    | Obrigatório | Descrição                                         |
| ------------ | ------- | ----------- | ------------------------------------------------- |
| color        | string  | Sim         | A cor do ripple                                   |
| borderless   | boolean | Sim         | Se o ripple pode renderizar fora de seus limites  |
| rippleRadius | ?number | Não         | controla o raio do efeito ripple                  |

---

### `canUseNativeForeground()`

```tsx
static canUseNativeForeground(): boolean;
```
