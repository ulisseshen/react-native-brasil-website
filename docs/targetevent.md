---
ia-translated: true
id: targetevent
title: Tipo de Objeto TargetEvent
---

O objeto `TargetEvent` é retornado no callback como resultado de uma mudança de foco, por exemplo `onFocus` ou `onBlur` no componente [TextInput](textinput).

## Exemplo

```
{
    target: 1127
}
```

## Chaves e valores

### `target`

O node id do elemento que recebe o TargetEvent.

| Tipo                        | Opcional |
| --------------------------- | -------- |
| number, `null`, `undefined` | Não       |

## Usado por

- [`TextInput`](textinput)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
