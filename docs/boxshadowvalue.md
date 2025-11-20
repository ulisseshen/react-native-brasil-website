---
ia-translated: true
id: boxshadowvalue
title: Tipo de Objeto BoxShadowValue
---

O objeto `BoxShadowValue` é recebido pela propriedade de estilo [`boxShadow`](./view-style-props.md#boxshadow). Ele é composto por 2-4 comprimentos, uma cor opcional e um booleano `inset` opcional. Esses valores definem coletivamente a cor, posição, tamanho e desfoque da sombra da caixa.

## Exemplo

```js
{
  offsetX: 10,
  offsetY: -3,
  blurRadius: '15px',
  spreadDistance: '10px',
  color: 'red',
  inset: true,
}
```

## Chaves e valores

### `offsetX`

O deslocamento no eixo x. Pode ser positivo ou negativo. Um valor positivo indica direita e negativo indica esquerda.

| Tipo             | Opcional |
| ---------------- | -------- |
| number \| string | Não      |

### `offsetY`

O deslocamento no eixo y. Pode ser positivo ou negativo. Um valor positivo indica cima e negativo indica baixo.

| Tipo             | Opcional |
| ---------------- | -------- |
| number \| string | Não      |

### `blurRadius`

Representa o raio usado no algoritmo de [Guassian blur](https://en.wikipedia.org/wiki/Gaussian_blur). Quanto maior o valor, mais desfocada fica a sombra. Apenas valores não-negativos são válidos. O padrão é 0.

| Tipo            | Opcional |
| --------------- | -------- |
| numer \| string | Sim      |

### `spreadDistance`

Quanto maior ou menor a sombra cresce ou diminui. Um valor positivo aumentará a sombra, um valor negativo diminuirá a sombra.

| Tipo            | Opcional |
| --------------- | -------- |
| numer \| string | Sim      |

### `color`

A cor da sombra. O padrão é `black`.

| Tipo                 | Opcional |
| -------------------- | -------- |
| [color](./colors.md) | Sim      |

### `inset`

Se a sombra é inset ou não. Sombras inset aparecerão ao redor do interior da caixa de borda do elemento, em oposição ao exterior.

| Tipo    | Opcional |
| ------- | -------- |
| boolean | Sim      |

## Usado por

- [`boxShadow`](./view-style-props.md#boxshadow)
