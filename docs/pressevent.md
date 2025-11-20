---
ia-translated: true
id: pressevent
title: Tipo de Objeto PressEvent
---

O objeto `PressEvent` é retornado no callback como resultado da interação de pressionamento do usuário, por exemplo `onPress` no componente [Button](button).

## Exemplo

```js
{
    changedTouches: [PressEvent],
    identifier: 1,
    locationX: 8,
    locationY: 4.5,
    pageX: 24,
    pageY: 49.5,
    target: 1127,
    timestamp: 85131876.58868201,
    touches: []
}
```

## Chaves e valores

### `changedTouches`

Array de todos os PressEvents que mudaram desde o último evento.

| Type                 | Optional |
| -------------------- | -------- |
| array of PressEvents | No       |

### `force` <div className="label ios">iOS</div>

Quantidade de força usada durante o pressionamento 3D Touch. Retorna o valor float no intervalo de `0.0` a `1.0`.

| Type   | Optional |
| ------ | -------- |
| number | Yes      |

### `identifier`

Identificador numérico único atribuído ao evento.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `locationX`

Coordenada X de origem do toque dentro da área tocável (relativa ao elemento).

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `locationY`

Coordenada Y de origem do toque dentro da área tocável (relativa ao elemento).

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `pageX`

Coordenada X de origem do toque na tela (relativa à view raiz).

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `pageY`

Coordenada Y de origem do toque na tela (relativa à view raiz).

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `target`

O id do nó do elemento que recebe o PressEvent.

| Type                        | Optional |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

### `timestamp`

Valor do timestamp quando um PressEvent ocorreu. O valor é representado em milissegundos.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `touches`

Array de todos os PressEvents atuais na tela.

| Type                 | Optional |
| -------------------- | -------- |
| array of PressEvents | No       |

## Usado por

- [`Button`](button)
- [`PanResponder`](panresponder)
- [`Pressable`](pressable)
- [`ScrollView`](scrollview)
- [`Text`](text)
- [`TextInput`](textinput)
- [`TouchableHighlight`](touchablenativefeedback)
- [`TouchableOpacity`](touchablewithoutfeedback)
- [`TouchableNativeFeedback`](touchablenativefeedback)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
- [`View`](view)
