---
ia-translated: true
id: fabric-native-components-introduction
title: Introdução aos Componentes Nativos Fabric
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import {FabricNativeComponentsAndroid,FabricNativeComponentsIOS} from './\_fabric-native-components';

# Native Components

Se você quer construir _novos_ Componentes React Native que envolvem um [Host Component](https://reactnative.dev/architecture/glossary#host-view-tree-and-host-view) como um tipo único de [CheckBox](https://developer.android.com/reference/androidx/appcompat/widget/AppCompatCheckBox) no Android, ou um [UIButton](https://developer.apple.com/documentation/uikit/uibutton?language=objc) no iOS, você deve usar um Fabric Native Component.

Este guia mostrará como construir Fabric Native Components, implementando um componente de web view. Os passos para fazer isso são:

1. Definir uma especificação JavaScript usando Flow ou TypeScript.
2. Configurar o sistema de gerenciamento de dependências para gerar código a partir da especificação fornecida e para ser auto-linkado.
3. Implementar o código nativo.
4. Usar o componente em um app.

Você vai precisar de uma aplicação template simples gerada para usar o componente:

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
```

## Criando um Componente WebView

Este guia mostrará como criar um componente Web View. Criaremos o componente usando o componente [`WebView`](https://developer.android.com/reference/android/webkit/WebView) do Android, e o componente [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview?language=objc) do iOS.

Vamos começar criando a estrutura de pastas para armazenar o código do nosso componente:

```bash
mkdir -p Demo/{specs,android/app/src/main/java/com/webview}
```

Isso dá a você o seguinte layout onde você vai trabalhar:

```
Demo
├── android/app/src/main/java/com/webview
└── ios
└── specs
```

- A pasta `android/app/src/main/java/com/webview` é a pasta que conterá nosso código Android.
- A pasta `ios` é a pasta que conterá nosso código iOS.
- A pasta `specs` é a pasta que conterá o arquivo de especificação do Codegen.

## 1. Definir Especificação para o Codegen

Sua especificação deve ser definida em [TypeScript](https://www.typescriptlang.org/) ou [Flow](https://flow.org/) (veja a documentação do [Codegen](the-new-architecture/what-is-codegen) para mais detalhes). Isso é usado pelo Codegen para gerar o C++, Objective-C++ e Java para conectar seu código de plataforma ao runtime JavaScript onde o React executa.

O arquivo de especificação deve ser nomeado `<MODULE_NAME>NativeComponent.{ts|js}` para funcionar com o Codegen. O sufixo `NativeComponent` não é apenas uma convenção, ele é realmente usado pelo Codegen para detectar um arquivo de especificação.

Use esta especificação para nosso componente WebView:

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="Demo/specs/WebViewNativeComponent.ts"
import type {
  CodegenTypes,
  HostComponent,
  ViewProps,
} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

</TabItem>
<TabItem value="flow">

```ts title="Demo/RCTWebView/js/RCTWebViewNativeComponent.js":
// @flow strict-local

import type {CodegenTypes, HostComponent, ViewProps} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent>?;
|}>;

export default (codegenNativeComponent<NativeProps>(
  'CustomWebView',
): HostComponent<NativeProps>);

```

</TabItem>
</Tabs>

Esta especificação é composta de três partes principais, excluindo os imports:

- O `WebViewScriptLoadedEvent` é um tipo de dados de suporte para os dados que o evento precisa passar do nativo para o JavaScript.
- O `NativeProps` é uma definição das props que podemos definir no componente.
- A declaração `codegenNativeComponent` nos permite fazer a codegeneração do código para o componente customizado e define um nome para o componente usado para corresponder às implementações nativas.

Assim como com Native Modules, você pode ter múltiplos arquivos de especificação no diretório `specs/`. Para mais informações sobre os tipos que você pode usar, e os tipos de plataforma para os quais eles mapeiam, veja o [apêndice](appendix.md#codegen-typings).

## 2. Configurar o Codegen para executar

A especificação é usada pelas ferramentas Codegen do React Native para gerar interfaces específicas da plataforma e boilerplate para nós. Para fazer isso, o Codegen precisa saber onde encontrar nossa especificação e o que fazer com ela. Atualize seu `package.json` para incluir:

```json package.json
    "start": "react-native start",
    "test": "jest"
  },
  // highlight-start
  "codegenConfig": {
    "name": "AppSpec",
    "type": "components",
    "jsSrcsDir": "specs",
    "android": {
      "javaPackageName": "com.webview"
    },
    "ios": {
      "componentProvider": {
        "CustomWebView": "RCTWebView"
      }
    }
  },
  // highlight-end
  "dependencies": {
```

Com tudo configurado para o Codegen, precisamos preparar nosso código nativo para se conectar ao nosso código gerado.

Note que para iOS, estamos mapeando declarativamente o nome do componente JS que é exportado pela especificação (`CustomWebView`) com a classe iOS que implementará o componente nativamente.

## 2. Construindo seu Código Nativo

Agora é hora de escrever o código de plataforma nativo para que quando o React precise renderizar uma view, a plataforma possa criar a view nativa certa e possa renderizá-la na tela.

Você deve trabalhar com ambas as plataformas Android e iOS.

:::note
Este guia mostra como criar um Native Component que funciona apenas com a Nova Arquitetura. Se você precisar suportar tanto a Nova Arquitetura quanto a Arquitetura Legada, por favor consulte nosso [guia de compatibilidade retroativa](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat.md).

:::

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <FabricNativeComponentsAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <FabricNativeComponentsIOS />
    </TabItem>
</Tabs>

## 3. Use seu Native Component

Finalmente, você pode usar o novo componente em seu app. Atualize seu `App.tsx` gerado para:

```javascript title="Demo/App.tsx"
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import WebView from './specs/WebViewNativeComponent';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <WebView
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
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
    height: '100%',
  },
});

export default App;
```

Este código cria um app que usa o novo componente `WebView` que criamos para carregar o site `react.dev`.

O app também mostra um alerta quando a página web é carregada.

## 4. Execute seu App usando o Componente WebView

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
```bash
yarn run android
```
</TabItem>
<TabItem value="ios" label="iOS">
```bash
yarn run ios
```
</TabItem>
</Tabs>

|                                      Android                                      |                                     iOS                                      |
| :-------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img style={{ "max-height": "600px" }} src="/docs/assets/webview-android.webp" /> | <img style={{"max-height": "600px" }} src="/docs/assets/webview-ios.webp" /> |
