---
ia-translated: true
id: touchableopacity
title: TouchableOpacity
---

:::tip
Se você está procurando uma maneira mais abrangente e à prova de futuro para lidar com entrada baseada em toque, confira a API [Pressable](pressable.md).
:::

Um wrapper para fazer views responderem adequadamente a toques. Ao pressionar, a opacidade da view envolvida é diminuída, escurecendo-a.

A opacidade é controlada envolvendo os children em um `Animated.View`, que é adicionado à hierarquia de view. Esteja ciente de que isso pode afetar o layout.

## Exemplo

```SnackPlayer name=TouchableOpacity%20Example
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
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
});

export default App;
```

---

# Referência

## Props

### [Props do TouchableWithoutFeedback](touchablewithoutfeedback.md#props)

Herda as [Props do TouchableWithoutFeedback](touchablewithoutfeedback.md#props).

---

### `style`

| Type                           |
| ------------------------------ |
| [View.style](view-style-props) |

---

### `activeOpacity`

Determina qual deve ser a opacidade da view envolvida quando o toque está ativo. O padrão é `0.2`.

| Type   |
| ------ |
| number |

---

### `hasTVPreferredFocus` <div className="label ios">iOS</div>

_(Somente Apple TV)_ Foco preferido de TV (veja a documentação do componente View).

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

Próximo foco de TV para baixo (veja a documentação do componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

Próximo foco de TV para frente (veja a documentação do componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

Próximo foco de TV para a esquerda (veja a documentação do componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

Próximo foco de TV para a direita (veja a documentação do componente View).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

Próximo foco de TV para cima (veja a documentação do componente View).

| Type   |
| ------ |
| number |

---

### `ref`

Um setter de ref que será atribuído a um [nó de elemento](element-nodes) quando montado.
