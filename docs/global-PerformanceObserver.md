---
id: global-PerformanceObserver
title: PerformanceObserver
ia-translated: true
---

A classe global [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver), conforme definida nas especificações Web.

## Exemplo

```ts
const observer = new PerformanceObserver(
  (list, observer, options) => {
    for (const entry of list.getEntries()) {
      console.log(
        'Received entry with type',
        entry.entryType,
        'and name',
        entry.name,
        'that started at',
        entry.startTime,
        'and took',
        entry.duration,
        'ms',
      );
    }
  },
);

observer.observe({entryTypes: ['mark', 'measure']});
```

---

# Referência

## Constructor

### `PerformanceObserver()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/PerformanceObserver).

## Static properties

### `supportedEntryTypes`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/supportedEntryTypes).

Retorna `['mark', 'measure', 'event', 'longtask']`.

## Instance methods

### `observe()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/observe).

### `disconnect()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/disconnect).
