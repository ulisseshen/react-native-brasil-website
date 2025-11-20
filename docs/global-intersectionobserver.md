---
ia-translated: true
id: global-intersectionobserver
title: IntersectionObserver 🧪
---

import CanaryAPIWarning from './\_canary-channel-api-warning.mdx';

<CanaryAPIWarning />

A interface global [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver), conforme definida nas especificações Web. Ela fornece uma maneira de observar de forma assíncrona mudanças na interseção de um elemento alvo com um elemento ancestral ou com a viewport de um documento de nível superior.

---

# Reference

## Constructor

### `IntersectionObserver()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver).

Cria um novo objeto `IntersectionObserver` que executará uma função callback especificada quando detectar que a visibilidade de um elemento alvo cruzou um ou mais valores de `threshold` ou `rnRootThreshold`.

```ts
new IntersectionObserver(callback, options?)
```

#### Parameters

**`callback`**

Uma função que é chamada quando a porcentagem do elemento alvo visível cruza um threshold. O callback recebe dois parâmetros:

- `entries`: Um array de objetos [`IntersectionObserverEntry`](global-intersectionobserverentry), cada um representando um threshold que foi cruzado, ficando mais ou menos visível do que a porcentagem especificada por esse threshold.
- `observer`: A instância `IntersectionObserver` que invocou o callback.

**`options`** (opcional)

Um objeto opcional com as seguintes propriedades:

| Name                 | Type                             | Description                                                                                                                                                                                                                                |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `root`               | [Element](element-nodes) \| null | Um elemento que é um ancestral do alvo, cujo retângulo delimitador será considerado a viewport. O padrão é a viewport raiz se não for especificado ou se for `null`.                                                                      |
| `rootMargin`         | string                           | Uma string que especifica um conjunto de deslocamentos a serem adicionados à caixa delimitadora da raiz ao calcular interseções. O padrão é `"0px 0px 0px 0px"`.                                                                           |
| `threshold`          | number \| number[]               | Ou um único número ou um array de números entre 0.0 e 1.0, especificando uma proporção da área de interseção em relação à área total da caixa delimitadora para o alvo observado. O padrão é `[0]` se `rnRootThreshold` não estiver definido. |
| `rnRootThreshold` ⚠️ | number \| number[]               | **Específico do React Native.** Ou um único número ou um array de números entre 0.0 e 1.0, especificando uma proporção da área de interseção em relação à área total da raiz.                                                             |

## Instance properties

### `root`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root).

O elemento ou documento cujos limites são usados como a caixa delimitadora ao testar a interseção.

### `rootMargin`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).

Um retângulo de deslocamento aplicado à caixa delimitadora da raiz ao calcular interseções.

### `rnRootThresholds` ⚠️

:::warning Non-standard
Esta é uma extensão específica do React Native.
:::

Uma lista de thresholds de raiz, ordenada em ordem numérica crescente, onde cada threshold é uma proporção da área de interseção em relação à área da caixa delimitadora da view raiz especificada, que tem como padrão a viewport.

As notificações para um alvo são geradas quando qualquer um dos thresholds especificados em `rnRootThresholds` ou `thresholds` é cruzado para esse alvo.

```ts
get rnRootThresholds(): ReadonlyArray<number> | null;
```

### `thresholds`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds).

Uma lista de thresholds, ordenada em ordem numérica crescente, onde cada threshold é uma proporção da área de interseção em relação à área da caixa delimitadora de um alvo observado.

As notificações para um alvo são geradas quando qualquer um dos thresholds especificados em `rnRootThresholds` ou `thresholds` é cruzado para esse alvo.

## Instance methods

### `disconnect()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect).

Para o objeto `IntersectionObserver` de observar qualquer alvo.

### `observe()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe).

Instrui o `IntersectionObserver` a começar a observar um elemento alvo.

### `takeRecords()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/takeRecords).

Retorna um array de objetos `IntersectionObserverEntry` para todos os alvos observados.

### `unobserve()`

Veja a [documentação no MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve).

Instrui o `IntersectionObserver` a parar de observar um elemento alvo específico.
