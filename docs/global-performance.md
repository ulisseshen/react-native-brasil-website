---
ia-translated: true
id: global-performance
title: performance
---

O objeto global [`performance`](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance), conforme definido nas especificações Web.

---

# Referência

## Propriedades da instância

### `eventCounts`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/eventCounts).

### `memory`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory).

### `rnStartupTiming` ⚠️

:::warning Non-standard
Esta é uma extensão específica do React Native.
:::

Fornece informações sobre o tempo de inicialização da aplicação.

```ts
get rnStartupTiming(): ReactNativeStartupTiming;
```

A interface `ReactNativeStartupTiming` fornece os seguintes campos:

| Nome                                     | Tipo           | Descrição                                                               |
| ---------------------------------------- | -------------- | ----------------------------------------------------------------------- |
| `startTime`                              | number \| void | Quando a inicialização do runtime do React Native foi iniciada.         |
| `executeJavaScriptBundleEntryPointStart` | number \| void | Quando a execução do bundle da aplicação foi iniciada.                  |
| `endTime`                                | number \| void | Quando o runtime do React Native foi totalmente inicializado.           |

### `timeOrigin`

:::warning Partial support
Fornece o número de milissegundos desde a época UNIX até a inicialização do sistema, em vez do número de milissegundos desde a época UNIX até a inicialização da aplicação.
:::

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin).

## Métodos da instância

### `clearMarks()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMarks).

### `clearMeasures()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMeasures).

### `getEntries()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries).

### `getEntriesByName()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName).

### `getEntriesByType()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType).

### `mark()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark).

### `measure()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure).

### `now()`

:::warning Partial support
Fornece o número de milissegundos desde a inicialização do sistema, em vez do número de milissegundos desde a inicialização da aplicação.
:::

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now).
