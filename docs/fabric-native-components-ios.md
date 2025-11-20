---
ia-translated: true
id: fabric-native-components-ios
title: 'Fabric Native Components: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Agora é hora de escrever algum código de plataforma iOS para poder renderizar a web view. Os passos que você precisa seguir são:

- Executar o Codegen.
- Escrever o código para o `RCTWebView`
- Registrar o `RCTWebView` na aplicação

### 1. Executar o Codegen

Você pode [executar manualmente](the-new-architecture/codegen-cli) o Codegen, no entanto, é mais simples usar a aplicação em que você vai demonstrar o componente para fazer isso por você.

```bash
cd ios
bundle install
bundle exec pod install
```

É importante notar que você verá a saída de log do Codegen, que vamos usar no Xcode para construir nosso componente nativo WebView.

:::warning
Você deve ter cuidado ao fazer commit de código gerado em seu repositório. Código gerado é específico para cada versão do React Native. Use [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies) do npm para restringir a compatibilidade com a versão do React Native.
:::

### 3. Escrever o `RCTWebView`

Precisamos preparar seu projeto iOS usando o Xcode completando estes **5 passos**:

1. Abra o Xcode Workspace gerado pelo CocoaPods:

```bash
cd ios
open Demo.xcworkspace
```

<img className="half-size" alt="Open Xcode Workspace" src="/docs/assets/fabric-native-components/1.webp" />

2. Clique com o botão direito no app e selecione <code>New Group</code>, chame o novo grupo de `WebView`.

<img className="half-size" alt="Right click on app and select New Group" src="/docs/assets/fabric-native-components/2.webp" />

3. No grupo `WebView`, crie <code>New</code>→<code>File from Template</code>.

<img className="half-size" alt="Create a new file using the Cocoa Touch Class template" src="/docs/assets/fabric-native-components/3.webp" />

4. Use o template <code>Objective-C File</code>, e nomeie-o <code>RCTWebView</code>.

<img className="half-size" alt="Create an Objective-C RCTWebView class" src="/docs/assets/fabric-native-components/4.webp" />

5. Repita o passo 4 e crie um arquivo de cabeçalho chamado `RCTWebView.h`.

6. Renomeie <code>RCTWebView.m</code> → <code>RCTWebView.mm</code> tornando-o um arquivo Objective-C++.

```text title="Demo/ios"
Podfile
...
Demo
├── AppDelegate.swift
...
// highlight-start
├── RCTWebView.h
└── RCTWebView.mm
// highlight-end
```

Depois de criar o arquivo de cabeçalho e o arquivo de implementação, você pode começar a implementá-los.

Este é o código para o arquivo `RCTWebView.h`, que declara a interface do componente.

```objc title="Demo/RCTWebView/RCTWebView.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTWebView : RCTViewComponentView

// You would declare native methods you'd want to access from the view here

@end

NS_ASSUME_NONNULL_END
```

Esta classe define um `RCTWebView` que estende a classe `RCTViewComponentView`. Esta é a classe base para todos os componentes nativos e é fornecida pelo React Native.

O código para o arquivo de implementação (`RCTWebView.mm`) é o seguinte:

```objc title="Demo/RCTWebView/RCTWebView.mm"
#import "RCTWebView.h"

#import <react/renderer/components/AppSpec/ComponentDescriptors.h>
#import <react/renderer/components/AppSpec/EventEmitters.h>
#import <react/renderer/components/AppSpec/Props.h>
#import <react/renderer/components/AppSpec/RCTComponentViewHelpers.h>
// highlight-next-line
#import <WebKit/WebKit.h>

using namespace facebook::react;

@interface RCTWebView () <RCTCustomWebViewViewProtocol, WKNavigationDelegate>
@end

@implementation RCTWebView {
  NSURL * _sourceURL;
  WKWebView * _webView;
}

-(instancetype)init
{
  if(self = [super init]) {
    // highlight-start
    _webView = [WKWebView new];
    _webView.navigationDelegate = self;
    [self addSubview:_webView];
    // highlight-end
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<CustomWebViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomWebViewProps const>(props);

  // Handle your props here
  if (oldViewProps.sourceURL != newViewProps.sourceURL) {
    NSString *urlString = [NSString stringWithCString:newViewProps.sourceURL.c_str() encoding:NSUTF8StringEncoding];
    _sourceURL = [NSURL URLWithString:urlString];
    // highlight-start
    if ([self urlIsValid:newViewProps.sourceURL]) {
      [_webView loadRequest:[NSURLRequest requestWithURL:_sourceURL]];
    }
    // highlight-end
  }

  [super updateProps:props oldProps:oldProps];
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  _webView.frame = self.bounds;

}

#pragma mark - WKNavigationDelegate

// highlight-start
-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Success};
  self.eventEmitter.onScriptLoaded(result);
}

- (BOOL)urlIsValid:(std::string)propString
{
  if (propString.length() > 0 && !_sourceURL) {
    CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Error};

    self.eventEmitter.onScriptLoaded(result);
    return NO;
  }
  return YES;
}

// Event emitter convenience method
- (const CustomWebViewEventEmitter &)eventEmitter
{
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
}
// highlight-end

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
}

@end
```

Este código é escrito em Objective-C++ e contém vários detalhes:

- a `@interface` implementa dois protocolos:
  - `RCTCustomWebViewViewProtocol`, gerado pelo Codegen;
  - `WKNavigationDelegate`, fornecido pelo framework WebKit para lidar com os eventos de navegação da web view;
- o método `init` que instancia o `WKWebView`, adiciona-o às subviews e define o `navigationDelegate`;
- o método `updateProps` que é chamado pelo React Native quando as props do componente mudam;
- o método `layoutSubviews` que descreve como a view personalizada precisa ser disposta;
- o método `webView:didFinishNavigation:` que permite que você lide com o que fazer quando o `WKWebView` termina de carregar a página;
- o método `urlIsValid:(std::string)propString` que verifica se a URL recebida como prop é válida;
- o método `eventEmitter` que é um utilitário para recuperar uma instância `eventEmitter` fortemente tipada
- o `componentDescriptorProvider` que retorna o `ComponentDescriptor` gerado pelo Codegen;

#### Adicionar framework WebKit

:::note
Este passo é necessário apenas porque estamos criando uma Web view. Componentes web no iOS precisam ser vinculados ao framework WebKit fornecido pela Apple. Se seu componente não precisa acessar recursos específicos da web, você pode pular este passo.
:::

Uma web view requer acesso a alguns recursos que a Apple fornece através de um dos frameworks que acompanham o Xcode e os dispositivos: WebKit.
Você pode vê-lo no código nativo pela linha `#import <WebKit/WebKit.h>` adicionada no `RCTWebView.mm`.

Para vincular o framework WebKit no seu app, siga estes passos:

1. No Xcode, Clique no seu projeto
2. Selecione o target do app
3. Selecione a aba General
4. Role para baixo até encontrar a seção _"Frameworks, Libraries, and Embedded Contents"_, e pressione o botão `+`

<img className="half-size" alt="Add webkit framework to your app 1" src="/docs/assets/AddWebKitFramework1.png" />

5. Na barra de pesquisa, filtre por WebKit
6. Selecione o framework WebKit
7. Clique em Add.

<img className="half-size" alt="Add webkit framework to your app 2" src="/docs/assets/AddWebKitFramework2.png" />
