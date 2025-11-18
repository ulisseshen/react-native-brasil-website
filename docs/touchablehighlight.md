---
ia-translated: true
id: touchablehighlight
title: TouchableHighlight
---

:::tip
Se você está procurando uma forma mais extensiva e à prova de futuro para lidar com entrada baseada em toque, confira a API [Pressable](pressable.md).
:::

Um wrapper para fazer views responderem apropriadamente aos toques. Ao pressionar, a opacidade da view envolvida é diminuída, o que permite que a cor do underlay apareça, escurecendo ou tingindo a view.

O underlay vem do envolvimento do filho em uma nova View, o que pode afetar o layout e, às vezes, causar artefatos visuais indesejados se não for usado corretamente, por exemplo, se o backgroundColor da view envolvida não estiver explicitamente definido para uma cor opaca.

TouchableHighlight deve ter um filho (não zero ou mais de um). Se você deseja ter vários componentes filhos, envolva-os em uma View.

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDDDD"
  onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableHighlight>;
```

## Exemplo

```SnackPlayer name=TouchableHighlight%20Example
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TouchableHighlightExample = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count || null}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});

export default TouchableHighlightExample;
```

---

# Referência

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

Herda [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

---

### `activeOpacity`

Determina qual deve ser a opacidade da view envolvida quando o toque está ativo. O valor deve estar entre 0 e 1. O padrão é 0.85. Requer que `underlayColor` esteja definido.

| Type   |
| ------ |
| number |

---

### `onHideUnderlay`

Chamado imediatamente após o underlay ser ocultado.

| Type     |
| -------- |
| function |

---

### `onShowUnderlay`

Chamado imediatamente após o underlay ser mostrado.

| Type     |
| -------- |
| function |

---

### `ref`

Um ref setter que será atribuído a um [element node](element-nodes) quando montado.

---

### `style`

| Type       |
| ---------- |
| View.style |

---

### `underlayColor`

A cor do underlay que aparecerá quando o toque estiver ativo.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `hasTVPreferredFocus` <div className="label ios">iOS</div>

_(Apenas Apple TV)_ TV preferred focus (veja a documentação para o componente View).

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

TV next focus down (veja a documentação para o componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

TV next focus forward (veja a documentação para o componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

TV next focus left (veja a documentação para o componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

TV next focus right (veja a documentação para o componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

TV next focus up (veja a documentação para o componente View).

| Type   |
| ------ |
| number |

---

### `testOnly_pressed`

Útil para testes de snapshot.

| Type |
| ---- |
| bool |
