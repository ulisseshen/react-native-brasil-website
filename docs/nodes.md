---
ia-translated: true
id: nodes
title: Nodes a partir de refs
---

Aplicativos React Native renderizam uma árvore de view nativa que representa a UI, similar a como o React DOM faz na Web (a árvore DOM). O React Native fornece acesso imperativo a esta árvore via [refs](https://react.dev/learn/manipulating-the-dom-with-refs), que são retornados por todos os componentes nativos (incluindo aqueles renderizados por componentes integrados como [`View`](/docs/next/view)).

O React Native fornece 3 tipos de nodes:

- [Elements](/docs/next/element-nodes): element nodes representam componentes nativos na árvore de view nativa (similar aos nodes [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) na Web). Eles são fornecidos por todos os componentes nativos via refs.
- [Text](/docs/next/text-nodes): text nodes representam conteúdo de texto puro na árvore (similar aos nodes [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) na Web). Eles não são diretamente acessíveis via `refs`, mas podem ser acessados usando métodos como [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) em element refs.
- [Documents](/docs/next/document-nodes): document nodes representam uma árvore de view nativa completa (similar aos nodes [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) na Web). Como text nodes, eles só podem ser acessados através de outros nodes, usando propriedades como [`ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument).

Como na Web, estes nodes podem ser usados para percorrer a árvore de UI renderizada, acessar informações de layout ou executar operações imperativas como `focus`.

:::info
**Diferente da Web, estes nodes não permitem mutação** (ex.: [`node.appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)), pois o conteúdo da árvore é totalmente gerenciado pelo renderer React.
:::
