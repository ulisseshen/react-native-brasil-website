---
ia-translated: true
id: global-console
title: console
---

:::warning
🚧 Esta página está em desenvolvimento, então por favor consulte a [documentação MDN](https://developer.mozilla.org/en-US/docs/Web/API/console) para mais informações.
:::

O objeto global `console`, conforme definido nas especificações Web.

---

## Methods

### `timeStamp()`

```tsx
console.timeStamp(
  label: string,
  start?: string | number,
  end?: string | number,
  trackName?: string,
  trackGroup?: string,
  color?: DevToolsColor
): void;
```

A API `console.timeStamp` permite que você adicione entradas de tempo customizadas na linha do tempo do painel Performance.

**Parameters:**

| Name       | Type               | Required | Description                                                                                                                                                                                                                                                                                   |
| ---------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label      | `string`           | Yes      | O label para a entrada de tempo.                                                                                                                                                                                                                                                              |
| start      | `string \| number` | No       | <ul><li>Se string, o nome de um timestamp previamente gravado com `console.timeStamp`.</li><li>Se number, o [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp). Por exemplo, de `performance.now()`.</li><li>Se undefined, o tempo atual é usado.</li></ul> |
| end        | `string \| number` | No       | <ul><li>Se string, o nome de um timestamp previamente gravado com `console.timeStamp`.</li><li>Se number, o [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp). Por exemplo, de `performance.now()`.</li><li>Se undefined, o tempo atual é usado.</li></ul> |
| trackName  | `string`           | No       | O nome da track customizada.                                                                                                                                                                                                                                                                  |
| trackGroup | `string`           | No       | O nome do grupo de track.                                                                                                                                                                                                                                                                     |
| color      | `DevToolsColor`    | No       | A cor da entrada.                                                                                                                                                                                                                                                                             |

```tsx
type DevToolsColor =
  | 'primary'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-dark'
  | 'tertiary'
  | 'tertiary-light'
  | 'tertiary-dark'
  | 'warning'
  | 'error';
```
