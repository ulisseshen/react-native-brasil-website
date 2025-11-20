---
ia-translated: true
id: document-nodes
title: Nós de documento
---

Nós de documento representam uma árvore completa de views nativas. Aplicativos que usam navegação nativa forneceriam um nó de documento separado para cada tela. Aplicativos que não usam navegação nativa geralmente forneceriam um único documento para todo o aplicativo (similar aos aplicativos de página única na Web).

```SnackPlayer ext=js&name=Document%20instance%20example
import * as React from 'react';
import {Text, TextInput, View} from 'react-native';

function MyComponent(props) {
  return (
    <View ref={props.ref}>
      <Text>Start typing below</Text>
      <TextInput id="main-text-input" />
    </View>
  )
}

export default function AccessingDocument() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    // Get the main text input in the screen and focus it after initial load.
    const element = ref.current;
    const doc = element.ownerDocument;
    const textInput = doc.getElementById('main-text-input');
    textInput?.focus();
  }, []);

  return (
    <MyComponent ref={ref} />
  );
}
```

---

## Referência

### API compatível com a Web

De [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement):

- Propriedades
  - [`childElementCount`](https://developer.mozilla.org/en-US/docs/Web/API/Document/childElementCount)
  - [`children`](https://developer.mozilla.org/en-US/docs/Web/API/Document/children)
  - [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
  - [`firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Document/firstElementChild)
  - [`lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Document/lastElementChild)
- Métodos
  - [`getElementById()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)

De [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node):

- Propriedades
  - [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
  - [`firstChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)
  - [`isConnected`](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected)
  - [`lastChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild)
  - [`nextSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)
  - [`nodeName`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)
  - [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
  - [`ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument)
  - [`parentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)
  - [`parentNode`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)
  - [`previousSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling)
  - [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- Métodos
  - [`compareDocumentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)
  - [`contains()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
  - [`getRootNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode)
  - [`hasChildNodes()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)
