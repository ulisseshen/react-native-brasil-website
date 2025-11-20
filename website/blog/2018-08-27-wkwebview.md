---
ia-translated: true
title: Introduzindo Novos iOS WebViews
author: Ramanpreet Nara
authorTitle: Software Engineer at Facebook
authorURL: 'https://github.com/rsnara'
tags: [engineering]
---

Há muito tempo, a Apple tem desencorajado o uso de UIWebViews em favor de WKWebView. No iOS 12, que será lançado nos próximos meses, [UIWebViews serão formalmente descontinuados](https://developer.apple.com/videos/play/wwdc2018/234/?time=104). A implementação do iOS WebView do React Native depende fortemente da classe UIWebView. Portanto, à luz desses desenvolvimentos, construímos um novo backend nativo iOS para o componente WebView React Native que usa WKWebView.

O final dessas mudanças foi incluído [neste commit](https://github.com/facebook/react-native/commit/33b353c97c31190439a22febbd3d2a9ead49d3c9), e estará disponível no lançamento 0.57.

Para optar por esta nova implementação, use a prop [`useWebKit`](https://reactnative.dev/docs/0.63/webview#usewebkit):

```js
<WebView
  useWebKit={true}
  source={{url: 'https://www.google.com'}}
/>
```

## Melhorias

`UIWebView` não tinha uma maneira legítima de facilitar a comunicação entre o JavaScript rodando no WebView e React Native. Quando mensagens eram enviadas do WebView, contávamos com um hack para entregá-las ao React Native. Resumidamente, codificávamos os dados da mensagem em uma url com um esquema especial e navegávamos o WebView para ela. No lado nativo, interceptávamos e cancelávamos essa navegação, parseávamos os dados da url e finalmente chamávamos no React Native. Esta implementação era propensa a erros e insegura. Estou feliz em anunciar que aproveitamos os recursos do `WKWebView` para substituí-la completamente.

Outros benefícios do WKWebView sobre UIWebView incluem execução JavaScript mais rápida e uma arquitetura multi-processo. Consulte este [WWDC 2014](https://developer.apple.com/videos/play/wwdc2014/206) para mais detalhes.

## Ressalvas

Se seus componentes usam as seguintes props, então você pode experimentar problemas ao mudar para WKWebView. Por enquanto, sugerimos que você evite usar essas props:

**Comportamento inconsistente:**

`automaticallyAdjustContentInsets` e `contentInsets` ([commit](https://github.com/facebook/react-native/commit/bacfd9297657569006bab2b1f024ad1f289b1b27))

Quando você adiciona contentInsets a um `WKWebView`, não muda a viewport do `WKWebView`. A viewport permanece do mesmo tamanho que o frame. Com `UIWebView`, o tamanho da viewport realmente muda (fica menor, se os content insets forem positivos).

`backgroundColor` ([commit](https://github.com/facebook/react-native/commit/215fa14efc2a817c7e038075163491c8d21526fd))

Com a nova implementação iOS do WebView, há uma chance de que sua background color pisque na view se você usar esta propriedade. Além disso, `WKWebView` renderiza backgrounds transparentes de forma diferente do `UIWebview`. Consulte a descrição do commit para mais detalhes.

**Não suportado:**

`scalesPageToFit` ([commit](https://github.com/facebook/react-native/commit/b18fddadfeae5512690a0a059a4fa80c864f43a3))

WKWebView não suportou a prop scalesPageToFit, então não conseguimos implementar isso no componente WebView React Native.
