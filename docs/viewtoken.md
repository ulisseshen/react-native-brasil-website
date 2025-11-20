---
id: viewtoken
title: ViewToken Object Type
ia-translated: true
---

O objeto `ViewToken` é retornado como uma das propriedades no callback `onViewableItemsChanged` (por exemplo, no componente [FlatList](flatlist)). Ele é exportado pelo [`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Lists/ViewabilityHelper.js).

## Exemplo

```js
{
  item: {key: "key-12"},
  key: "key-12",
  index: 11,
  isViewable: true
}
```

## Chaves e valores

### `index`

Identificador numérico único atribuído ao elemento de dados.

| Tipo   | Opcional |
| ------ | -------- |
| number | Sim      |

### `isViewable`

Especifica se pelo menos alguma parte do elemento da lista está visível no viewport.

| Tipo    | Opcional |
| ------- | -------- |
| boolean | Não      |

### `item`

Dados do item

| Tipo | Opcional |
| ---- | -------- |
| any  | Não      |

### `key`

Identificador de chave atribuído ao elemento de dados extraído para o nível superior.

| Tipo   | Opcional |
| ------ | -------- |
| string | Não      |

### `section`

Dados da seção do item quando usado com `SectionList`.

| Tipo | Opcional |
| ---- | -------- |
| any  | Sim      |

## Usado por

- [`FlatList`](flatlist)
- [`SectionList`](sectionlist)
- [`VirtualizedList`](virtualizedlist)
