<!-- ia-translated: true -->
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# Invocando funções nativas no seu componente nativo

No [guia base](/docs/fabric-native-components-introduction) para escrever um novo Native Component, você explorou como criar um novo componente, como passar propriedades do lado JS para o lado nativo, e como emitir eventos do lado nativo para o JS.

Componentes customizados também podem chamar algumas das funções implementadas no código nativo de forma imperativa, para alcançar funcionalidades mais avançadas, como recarregar programaticamente uma página web.

Neste guia você aprenderá como alcançar isso, usando um novo conceito: Native Commands.

Este guia parte do guia de [Native Components](/docs/fabric-native-components-introduction) e assume que você está familiarizado com ele e que você está familiarizado com [Codegen](/docs/next/the-new-architecture/what-is-codegen).

## 1. Atualize os specs do seu componente

O primeiro passo é atualizar o spec do componente para declarar o `NativeCommand`.

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

Atualize o `WebViewNativeComponent.ts` como a seguir:

```diff title="Demo/specs/WebViewNativeComponent.ts"
import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
+import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

+interface NativeCommands {
+    reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
+}

+export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
+    supportedCommands: ['reload'],
+});

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

</TabItem>
<TabItem value="flow">

Atualize o `WebViewNativeComponent.js` como a seguir:

```diff title="Demo/specs/WebViewNativeComponent.js"
// @flow strict-local

import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
+import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: BubblingEventHandler<WebViewScriptLoadedEvent>?;
|}>;

+interface NativeCommands {
+    reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
+}

+export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
+    supportedCommands: ['reload'],
+});

export default (codegenNativeComponent<NativeProps>(
  'CustomWebView',
): HostComponent<NativeProps>);

```

</TabItem>
</Tabs>

Essas mudanças requerem que você:

1. Importe a função `codegenNativeCommands` de `react-native`. Isso instrui o codegen que ele tem que gerar o código para `NativeCommands`
2. Defina uma interface que contém os métodos que queremos invocar no nativo. Todos os Native Commands devem ter um primeiro parâmetro do tipo `React.ElementRef`.
3. Exporte a variável `Commands` que é o resultado da invocação de `codegenNativeCommands`, passando uma lista dos comandos suportados.

:::warning
No TypeScript, o `React.ElementRef` está deprecated. O tipo correto a usar é na verdade `React.ComponentRef`. No entanto, devido a um bug no Codegen, usar `ComponentRef` fará o app quebrar. Já temos a correção, mas precisamos lançar uma nova versão do React Native para aplicá-la.
:::

## 2. Atualize o código do App para usar o novo comando

Agora você pode usar o comando no app.

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

Abra o arquivo `App.tsx` e modifique-o como a seguir:

```diff title="App.tsx"
import React from 'react';
-import {Alert, StyleSheet, View} from 'react-native';
-import WebView from '../specs/WebViewNativeComponent';
+import {Alert, StyleSheet, Pressable, Text, View} from 'react-native';
+import WebView, {Commands} from '../specs/WebViewNativeComponent';

function App(): React.JSX.Element {
+    const webViewRef = React.useRef<React.ElementRef<typeof View> | null>(null);
+
+    const refresh = () => {
+        if (webViewRef.current) {
+            Commands.reload(webViewRef.current);
+        }
+    };

  return (
    <View style={styles.container}>
      <WebView
+       ref={webViewRef}
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
+      <View style={styles.tabbar}>
+        <Pressable onPress={refresh} style={styles.button}>
+            {({pressed}) => (
+                !pressed ? <Text style={styles.buttonText}>Refresh</Text> : <Text style={styles.buttonTextPressed}>Refresh</Text>) }
+        </Pressable>
+      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  webview: {
    width: '100%',
-    height: '100%',
+    height: '90%',
  },
+  tabbar: {
+    flex: 1,
+    backgroundColor: 'gray',
+    width: '100%',
+    alignItems: 'center',
+    alignContent: 'center',
+  },
+  button: {
+    margin: 10,
+  },
+  buttonText: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF',
+    width: '100%',
+  },
+  buttonTextPressed: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF77',
+    width: '100%',
+  },
});

export default App;
```

</TabItem>
<TabItem value="flow">

Abra o arquivo `App.tsx` e modifique-o como a seguir:

```diff title="App.jsx"
import React from 'react';
-import {Alert, StyleSheet, View} from 'react-native';
-import WebView from '../specs/WebViewNativeComponent';
+import {Alert, StyleSheet, Pressable, Text, View} from 'react-native';
+import WebView, {Commands} from '../specs/WebViewNativeComponent';

function App(): React.JSX.Element {
+    const webViewRef = React.useRef<React.ElementRef<typeof View> | null>(null);
+
+    const refresh = () => {
+        if (webViewRef.current) {
+            Commands.reload(webViewRef.current);
+        }
+    };

  return (
    <View style={styles.container}>
      <WebView
+       ref={webViewRef}
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
+      <View style={styles.tabbar}>
+        <Pressable onPress={refresh} style={styles.button}>
+            {({pressed}) => (
+                !pressed ? <Text style={styles.buttonText}>Refresh</Text> : <Text style={styles.buttonTextPressed}>Refresh</Text>) }
+        </Pressable>
+      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  webview: {
    width: '100%',
-    height: '100%',
+    height: '90%',
  },
+  tabbar: {
+    flex: 1,
+    backgroundColor: 'gray',
+    width: '100%',
+    alignItems: 'center',
+    alignContent: 'center',
+  },
+  button: {
+    margin: 10,
+  },
+  buttonText: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF',
+    width: '100%',
+  },
+  buttonTextPressed: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF77',
+    width: '100%',
+  },
});

export default App;
```

</TabItem>
</Tabs>

As mudanças relevantes aqui são as seguintes:

1. Importe a const `Commands` do arquivo de spec. O Command é um objeto que nos permite chamar os métodos que temos no nativo.
2. Declare uma ref para o componente nativo customizado `WebView` usando `useRef`. Você precisa passar essa ref para o comando nativo.
3. Implemente a função `refresh`. Essa função verifica se a ref do WebView não é null e se não for, ela chama o comando.
4. Adicione um pressable para chamar o comando quando o usuário tocar no botão.

As mudanças restantes são mudanças normais do React para adicionar um `Pressable` e estilizar a view para que fique mais bonita.

## 3. Execute novamente o Codegen

Agora que os specs estão atualizados e o código está pronto para usar o comando, é hora de implementar o código nativo. No entanto, antes de mergulhar na escrita do código nativo, você tem que executar novamente o codegen, para deixá-lo gerar os novos tipos que são necessários pelo código nativo.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
Codegen é executado através da task Gradle `generateCodegenArtifactsFromSchema`:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

Isso é executado automaticamente quando você compila sua aplicação Android.
</TabItem>
<TabItem value="ios" label="iOS">
Codegen é executado como parte das script phases que são automaticamente adicionadas ao projeto gerado pelo CocoaPods.

```bash
cd ios
bundle install
bundle exec pod install
```

A saída ficará assim:

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

</TabItem>
</Tabs>

## 4. Implemente o código nativo

Agora é hora de implementar as mudanças nativas que permitirão que seu JS invoque diretamente métodos na sua view nativa.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">

Para deixar sua view responder ao Native Command, você só tem que modificar o ReactWebViewManager.

Se você tentar compilar agora, a compilação falhará, porque o `ReactWebViewManager` atual não implementa o novo método `reload`.
Para corrigir o erro de compilação, vamos modificar o `ReactWebViewManager` para implementá-lo.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```diff title="ReactWebViewManager.java"

//...
  @ReactProp(name = "sourceUrl")
  @Override
  public void setSourceURL(ReactWebView view, String sourceURL) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error);
      return;
    }
    view.loadUrl(sourceURL, new HashMap<>());
  }

+  @Override
+  public void reload(ReactWebView view) {
+    view.reload();
+  }

  public static final String REACT_CLASS = "CustomWebView";
//...
```

</TabItem>
<TabItem value="kotlin">

```diff title="ReactWebViewManager.kt"
  @ReactProp(name = "sourceUrl")
  override fun setSourceURL(view: ReactWebView, sourceURL: String?) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error)
      return;
    }
    view.loadUrl(sourceURL, emptyMap())
  }

+  override fun reload(view: ReactWebView) {
+    view.reload()
+  }

  companion object {
    const val REACT_CLASS = "CustomWebView"
  }
```

</TabItem>
</Tabs>

Neste caso, é suficiente chamar diretamente o método `view.reload()` porque nosso ReactWebView herda do `WebView` do Android e ele tem um método reload diretamente disponível. Se você está implementando uma função customizada, que não está disponível na sua view customizada, você também pode ter que implementar o método requerido na View do Android que é gerenciada pelo `ViewManager` do React Native.

</TabItem>
<TabItem value="ios" label="iOS">

Para deixar sua view responder ao Native Command, precisamos implementar alguns métodos no iOS.

Vamos abrir o arquivo `RCTWebView.mm` e vamos modificá-lo como a seguir:

```diff title="RCTWebView.mm"
  // Event emitter convenience method
  - (const CustomWebViewEventEmitter &)eventEmitter
  {
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
  }

+  - (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args
+  {
+  RCTCustomWebViewHandleCommand(self, commandName, args);
+  }
+
+  - (void)reload
+  {
+  [_webView reloadFromOrigin];
+  }

  + (ComponentDescriptorProvider)componentDescriptorProvider
  {
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
  }
```

Para fazer sua view responder aos Native Commands, você precisa aplicar as seguintes mudanças:

1. Adicione uma função `handleCommand:args`. Essa função é invocada pela infraestrutura de componentes para lidar com os comandos. A implementação da função é similar para todo componente: você precisa chamar uma função `RCT<componentNameInJS>HandleCommand` que é gerada pelo Codegen para você. A `RCT<componentNameInJS>HandleCommand` realiza várias validações, verificando que o comando que precisamos invocar está entre os suportados e que os parâmetros passados correspondem aos esperados. Se todas as verificações passarem, a `RCT<componentNameInJS>HandleCommand` então invocará o método nativo apropriado.
2. Implemente o método `reload`. Neste exemplo, o método `reload` chama a função `reloadFromOrigin` do WebView do WebKit.

</TabItem>
</Tabs>

## 5. Execute seu app

Finalmente, você pode executar seu app com os comandos usuais. Uma vez que o app esteja rodando, você pode tocar no botão de refresh para ver a página sendo recarregada.

| <center>Android</center>                                                                         | <center>iOS</center>                                                                         |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/native-commands-android.gif" height="75%" width="75%" /></center> | <center><img src="/docs/assets/native-commands-ios.gif" height="75%" width="75%" /></center> |
