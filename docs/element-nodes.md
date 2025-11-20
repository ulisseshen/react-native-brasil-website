---
ia-translated: true
id: element-nodes
title: Element nodes
---

Element nodes representam componentes nativos na árvore de visualização nativa (similar aos nodes [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) na Web).

Eles são fornecidos por todos os componentes nativos, e por muitos componentes integrados, via refs:

```SnackPlayer ext=js&name=Element%20instances%20example
import * as React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';

const ViewWithRefs = () => {
  const ref = React.useRef(null);
  const [viewInfo, setViewInfo] = React.useState('');

  React.useEffect(() => {
    // `element` is an object implementing the interface described here.
    const element = ref.current;
    const rect = JSON.stringify(element.getBoundingClientRect());
    setViewInfo(
      `Bounding rect is: ${rect}.\nText content is: ${element.textContent}`,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View ref={ref} style={styles.content}>
        <Text>Hello world!</Text>
      </View>
      <Text>{viewInfo}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    backgroundColor: 'gray',
  },
});

export default ViewWithRefs;
```

:::info
Note que alguns componentes integrados são apenas um container para outros componentes (incluindo componentes nativos). Por exemplo, `ScrollView` renderiza internamente uma scroll view nativa e uma view nativa, que são acessíveis através da ref que ele fornece usando métodos como `getNativeScrollRef()` e `getInnerViewRef()`.
:::

---

## Reference

### Web-compatible API

De [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement):

- Properties
  - [`offsetHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)
  - [`offsetLeft`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft)
  - [`offsetParent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)
  - [`offsetTop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)
  - [`offsetWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
- Methods
  - [`blur()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur).
  - [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus).
    - ⚠️ O parâmetro `options` não é suportado.

De [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element):

- Properties
  - [`childElementCount`](https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount)
  - [`children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)
  - [`clientHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight)
  - [`clientLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientLeft)
  - [`clientTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop)
  - [`clientWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
  - [`firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild)
  - [`id`](https://developer.mozilla.org/en-US/docs/Web/API/Element/id)
    - ℹ️ Retorna o valor das props `id` ou `nativeID`.
  - [`lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild)
  - [`nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)
  - [`nodeName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nodeName)
  - [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nodeValue)
  - [`previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)
  - [`scrollHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)
  - [`scrollLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft)
    - ⚠️ Para componentes integrados, apenas instâncias de `ScrollView` podem retornar um valor diferente de zero.
  - [`scrollTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)
    - ⚠️ Para componentes integrados, apenas instâncias de `ScrollView` podem retornar um valor diferente de zero.
  - [`scrollWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth)
  - [`tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
    - ℹ️ Retorna um nome de componente nativo normalizado prefixado com `RN:`, como `RN:View`.
  - [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Element/textContent)
- Methods
  - [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
  - [`hasPointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasPointerCapture)
  - [`setPointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture)
  - [`releasePointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture)

De [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node):

- Properties
  - [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
  - [`firstChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)
  - [`isConnected`](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected)
  - [`lastChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild)
  - [`nextSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)
  - [`nodeName`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)
  - [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
  - [`ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument)
    - ℹ️ Retornará a [instância de document](/docs/next/document-instances) onde este componente foi renderizado.
  - [`parentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)
  - [`parentNode`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)
  - [`previousSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling)
  - [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- Methods
  - [`compareDocumentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)
  - [`contains()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
  - [`getRootNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode)
    - ℹ️ Retornará uma referência para si mesmo se o componente não estiver montado.
  - [`hasChildNodes()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)

### Legacy API

- [`measure()`](/docs/next/legacy/direct-manipulation#measurecallback)
- [`measureInWindow()`](/docs/next/legacy/direct-manipulation#measureinwindowcallback)
- [`measureLayout()`](/docs/next/legacy/direct-manipulation#measurelayoutrelativetonativecomponentref-onsuccess-onfail)
- [`setNativeProps()`](/docs/next/legacy/direct-manipulation#setnativeprops-with-touchableopacity)
