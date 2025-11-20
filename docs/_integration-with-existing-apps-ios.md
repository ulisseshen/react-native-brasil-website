<!-- ia-translated: true -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import CodeBlock from '@theme/CodeBlock';
import RNTemplateRepoLink from '@site/core/RNTemplateRepoLink';
import {getTemplateBranchNameForCurrentVersion} from '@site/src/getTemplateBranchNameForCurrentVersion';

## Conceitos Chave

As chaves para integrar componentes React Native em sua aplicação iOS são:

1. Configurar a estrutura de diretórios correta.
2. Instalar as dependências NPM necessárias.
3. Adicionar React Native à configuração do Podfile.
4. Escrever o código TypeScript para sua primeira tela React Native.
5. Integrar React Native com seu código iOS usando um `RCTRootView`.
6. Testar sua integração executando o bundler e vendo sua aplicação em ação.

## Usando o Template da Comunidade

Enquanto você segue este guia, sugerimos que use o [React Native Community Template](https://github.com/react-native-community/template/) como referência. O template contém uma **aplicação iOS mínima** e ajudará você a entender como integrar React Native em uma aplicação iOS existente.

## Pré-requisitos

Siga o guia sobre [configurar seu ambiente de desenvolvimento](set-up-your-environment) e usar [React Native sem um framework](getting-started-without-a-framework) para configurar seu ambiente de desenvolvimento para construir aplicações React Native para iOS.
Este guia também assume que você está familiarizado com os conceitos básicos de desenvolvimento iOS, como criar um `UIViewController` e editar o arquivo `Podfile`.

### 1. Configurar a estrutura de diretórios

Para garantir uma experiência suave, crie uma nova pasta para seu projeto React Native integrado e então **mova seu projeto iOS existente** para a subpasta `/ios`.

## 2. Instalar dependências NPM

Vá para o diretório raiz e execute o seguinte comando:

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/package.json`}
</CodeBlock>

Isso copiará o arquivo `package.json` <RNTemplateRepoLink href="template/package.json">do template da Comunidade</RNTemplateRepoLink> para seu projeto.

Em seguida, instale os pacotes NPM executando:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

O processo de instalação criou uma nova pasta `node_modules`. Esta pasta armazena todas as dependências JavaScript necessárias para construir seu projeto.

Adicione `node_modules/` ao seu arquivo `.gitignore` (aqui está o <RNTemplateRepoLink href="template/_gitignore">padrão da Comunidade</RNTemplateRepoLink>).

### 3. Instalar ferramentas de desenvolvimento

### Command Line Tools para Xcode

Instale o Command Line Tools. Escolha **Settings... (ou Preferences...)** no menu do Xcode. Vá para o painel Locations e instale as ferramentas selecionando a versão mais recente no dropdown Command Line Tools.

![Xcode Command Line Tools](/docs/assets/GettingStartedXcodeCommandLineTools.png)

### CocoaPods

[CocoaPods](https://cocoapods.org) é uma ferramenta de gerenciamento de pacotes para desenvolvimento iOS e macOS. Nós a usamos para adicionar o código do framework React Native localmente ao seu projeto atual.

Recomendamos instalar CocoaPods usando [Homebrew](https://brew.sh/):

```shell
brew install cocoapods
```

## 4. Adicionando React Native à sua aplicação

### Configurando CocoaPods

Para configurar CocoaPods, precisamos de dois arquivos:

- Um **Gemfile** que define quais dependências Ruby precisamos.
- Um **Podfile** que define como instalar nossas dependências corretamente.

Para o **Gemfile**, vá para o diretório raiz do seu projeto e execute este comando

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/Gemfile`}
</CodeBlock>

Isso fará o download do Gemfile do template.

:::note
Se você criou seu projeto com Xcode 16, você precisa atualizar o Gemfile da seguinte forma:

```diff
-gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
+gem 'cocoapods', '1.16.2'
gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
-gem 'xcodeproj', '< 1.26.0'
+gem 'xcodeproj', '1.27.0'
```

Xcode 16 gera um projeto de forma ligeiramente diferente das versões anteriores do Xcode, e você precisa das gems CocoaPods e Xcodeproj mais recentes para fazê-lo funcionar corretamente.
:::

Da mesma forma, para o **Podfile**, vá para a pasta `ios` do seu projeto e execute

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/ios/Podfile`}
</CodeBlock>

Por favor, use o Template da Comunidade como ponto de referência para o <RNTemplateRepoLink href="template/Gemfile">Gemfile</RNTemplateRepoLink> e para o <RNTemplateRepoLink href="template/ios/Podfile">Podfile</RNTemplateRepoLink>.

:::note
Lembre-se de alterar <RNTemplateRepoLink href="template/ios/Podfile#L17">esta linha</RNTemplateRepoLink>.
:::

Agora, precisamos executar alguns comandos extras para instalar as gems Ruby e os Pods.
Navegue até a pasta `ios` e execute os seguintes comandos:

```sh
bundle install
bundle exec pod install
```

O primeiro comando instalará as dependências Ruby e o segundo comando irá realmente integrar o código React Native em sua aplicação para que seus arquivos iOS possam importar os headers React Native.

## 5. Escrevendo o código TypeScript

Agora vamos realmente modificar a aplicação iOS nativa para integrar React Native.

O primeiro pedaço de código que escreveremos é o código React Native real para a nova tela que será integrada em nossa aplicação.

### Criar um arquivo `index.js`

Primeiro, crie um arquivo `index.js` vazio na raiz do seu projeto React Native.

`index.js` é o ponto de partida para aplicações React Native, e é sempre necessário. Ele pode ser um arquivo pequeno que faz `import` de outros arquivos que fazem parte do seu componente ou aplicação React Native, ou pode conter todo o código necessário para isso.

Nosso `index.js` deve se parecer com o seguinte (aqui está o <RNTemplateRepoLink href="template/index.js">arquivo do template da Comunidade como referência</RNTemplateRepoLink>):

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### Criar um arquivo `App.tsx`

Vamos criar um arquivo `App.tsx`. Este é um arquivo [TypeScript](https://www.typescriptlang.org/) que pode ter expressões [JSX](<https://en.wikipedia.org/wiki/JSX_(JavaScript)>). Ele contém o componente React Native raiz que integraremos em nossa aplicação iOS (<RNTemplateRepoLink href="template/App.tsx">link</RNTemplateRepoLink>):

```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.black
              : Colors.white,
            padding: 24,
          }}>
          <Text style={styles.title}>Step One</Text>
          <Text>
            Edit <Text style={styles.bold}>App.tsx</Text> to
            change this screen and see your edits.
          </Text>
          <Text style={styles.title}>See your changes</Text>
          <ReloadInstructions />
          <Text style={styles.title}>Debug</Text>
          <DebugInstructions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

Aqui está o <RNTemplateRepoLink href="template/App.tsx">arquivo do template da Comunidade como referência</RNTemplateRepoLink>.

## 5. Integrando com seu código iOS

Agora precisamos adicionar algum código nativo para iniciar o runtime React Native e dizer a ele para renderizar nossos componentes React.

### Requisitos

A inicialização do React Native agora não está vinculada a nenhuma parte específica de uma aplicação iOS.

React Native pode ser inicializado usando uma classe chamada `RCTReactNativeFactory`, que cuida de gerenciar o ciclo de vida do React Native para você.

Uma vez que a classe é inicializada, você pode iniciar uma view React Native fornecendo um objeto `UIWindow`, ou pode pedir à factory para gerar uma `UIView` que você pode carregar em qualquer `UIViewController`.

No exemplo a seguir, criaremos um ViewController que pode carregar uma view React Native como sua `view`.

#### Criar o ReactViewController

Crie um novo arquivo a partir do template (<kbd>⌘</kbd>+<kbd>N</kbd>) e escolha o template Cocoa Touch Class.

Certifique-se de selecionar `UIViewController` como o campo "Subclass of".

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

Agora abra o arquivo `ReactViewController.m` e aplique as seguintes alterações

```diff title="ReactViewController.m"
#import "ReactViewController.h"
+#import <React/RCTBundleURLProvider.h>
+#import <RCTReactNativeFactory.h>
+#import <RCTDefaultReactNativeFactoryDelegate.h>
+#import <RCTAppDependencyProvider.h>


@interface ReactViewController ()

@end

+@interface ReactNativeFactoryDelegate: RCTDefaultReactNativeFactoryDelegate
+@end

-@implementation ReactViewController
+@implementation ReactViewController {
+  RCTReactNativeFactory *_factory;
+  id<RCTReactNativeFactoryDelegate> _factoryDelegate;
+}

 - (void)viewDidLoad {
     [super viewDidLoad];
     // Do any additional setup after loading the view.
+    _factoryDelegate = [ReactNativeFactoryDelegate new];
+    _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
+    _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
+    self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
 }

@end

+@implementation ReactNativeFactoryDelegate
+
+- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
+{
+  return [self bundleURL];
+}
+
+- (NSURL *)bundleURL
+{
+#if DEBUG
+  return [RCTBundleURLProvider.sharedSettings jsBundleURLForBundleRoot:@"index"];
+#else
+  return [NSBundle.mainBundle URLForResource:@"main" withExtension:@"jsbundle"];
+#endif
+}

@end

```

</TabItem>
<TabItem value="swift">

Agora abra o arquivo `ReactViewController.swift` e aplique as seguintes alterações

```diff title="ReactViewController.swift"
import UIKit
+import React
+import React_RCTAppDelegate
+import ReactAppDependencyProvider

class ReactViewController: UIViewController {
+  var reactNativeFactory: RCTReactNativeFactory?
+  var reactNativeFactoryDelegate: RCTReactNativeFactoryDelegate?

  override func viewDidLoad() {
    super.viewDidLoad()
+    reactNativeFactoryDelegate = ReactNativeDelegate()
+    reactNativeFactoryDelegate!.dependencyProvider = RCTAppDependencyProvider()
+    reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeFactoryDelegate!)
+    view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")

  }
}

+class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
+    override func sourceURL(for bridge: RCTBridge) -> URL? {
+      self.bundleURL()
+    }
+
+    override func bundleURL() -> URL? {
+      #if DEBUG
+      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
+      #else
+      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
+      #endif
+    }
+
+}
```

</TabItem>
</Tabs>

#### Apresentando uma view React Native em um rootViewController

Finalmente, podemos apresentar nossa view React Native. Para fazer isso, precisamos de um novo View Controller que possa hospedar uma view na qual podemos carregar o conteúdo JS.
Já temos o `ViewController` inicial, e podemos fazê-lo apresentar o `ReactViewController`. Existem várias maneiras de fazer isso, dependendo da sua aplicação. Para este exemplo, assumimos que você tem um botão que apresenta React Native modalmente.

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

```diff title="ViewController.m"
#import "ViewController.h"
+#import "ReactViewController.h"

@interface ViewController ()

@end

- @implementation ViewController
+@implementation ViewController {
+  ReactViewController *reactViewController;
+}

 - (void)viewDidLoad {
   [super viewDidLoad];
   // Do any additional setup after loading the view.
   self.view.backgroundColor = UIColor.systemBackgroundColor;
+  UIButton *button = [UIButton new];
+  [button setTitle:@"Open React Native" forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.systemBlueColor forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.blueColor forState:UIControlStateHighlighted];
+  [button addTarget:self action:@selector(presentReactNative) forControlEvents:UIControlEventTouchUpInside];
+  [self.view addSubview:button];

+  button.translatesAutoresizingMaskIntoConstraints = NO;
+  [NSLayoutConstraint activateConstraints:@[
+    [button.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
+    [button.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
+    [button.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
+    [button.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
+  ]];
 }

+- (void)presentReactNative
+{
+  if (reactViewController == NULL) {
+    reactViewController = [ReactViewController new];
+  }
+  [self presentViewController:reactViewController animated:YES];
+}

@end
```

</TabItem>
<TabItem value="swift">

```diff title="ViewController.swift"
import UIKit

class ViewController: UIViewController {

+  var reactViewController: ReactViewController?

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    self.view.backgroundColor = .systemBackground

+    let button = UIButton()
+    button.setTitle("Open React Native", for: .normal)
+    button.setTitleColor(.systemBlue, for: .normal)
+    button.setTitleColor(.blue, for: .highlighted)
+    button.addAction(UIAction { [weak self] _ in
+      guard let self else { return }
+      if reactViewController == nil {
+       reactViewController = ReactViewController()
+      }
+      present(reactViewController!, animated: true)
+    }, for: .touchUpInside)
+    self.view.addSubview(button)
+
+    button.translatesAutoresizingMaskIntoConstraints = false
+    NSLayoutConstraint.activate([
+      button.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
+      button.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
+      button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
+      button.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
+    ])
  }
}
```

</TabItem>
</Tabs>

Certifique-se de desabilitar o Sandbox scripting. Para isso, no Xcode, clique na sua aplicação, depois em build settings. Filtre por script e defina o `User Script Sandboxing` para `NO`. Este passo é necessário para alternar corretamente entre as versões Debug e Release do [Hermes engine](https://github.com/facebook/hermes/blob/main/README.md) que enviamos com React Native.

![Disable Sandboxing](/docs/assets/disable-sandboxing.png)

Finalmente, certifique-se de adicionar a chave `UIViewControllerBasedStatusBarAppearance` no seu arquivo `Info.plist`, com valor de `NO`.

![Disable UIViewControllerBasedStatusBarAppearance](/docs/assets/disable-UIViewControllerBasedStatusBarAppearance.png)

## 6. Testar sua integração

Você completou todos os passos básicos para integrar React Native com sua aplicação. Agora vamos iniciar o [Metro bundler](https://metrobundler.dev/) para construir seu código TypeScript em um bundle. O servidor HTTP do Metro compartilha o bundle de `localhost` no seu ambiente de desenvolvimento para um simulador ou dispositivo. Isso permite o [hot reloading](https://reactnative.dev/blog/2016/03/24/introducing-hot-reloading).

Primeiro, você precisa criar um arquivo `metro.config.js` na raiz do seu projeto da seguinte forma:

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

Você pode verificar o <RNTemplateRepoLink href="template/metro.config.js">arquivo `metro.config.js`</RNTemplateRepoLink> do arquivo do template da Comunidade como referência.

Então, você precisa criar um arquivo `.watchmanconfig` na raiz do seu projeto. O arquivo deve conter um objeto json vazio:

```sh
echo {} > .watchmanconfig
```

Uma vez que você tem o arquivo de configuração no lugar, você pode executar o bundler. Execute o seguinte comando no diretório raiz do seu projeto:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

Agora construa e execute sua aplicação iOS normalmente.

Uma vez que você alcançar sua Activity com React dentro da aplicação, ela deve carregar o código JavaScript do servidor de desenvolvimento e exibir:

<center><img src="/docs/assets/EmbeddedAppIOS078.gif" width="300" /></center>

### Criando um build de release no Xcode

Você também pode usar Xcode para criar seus builds de release! O único passo adicional é adicionar um script que é executado quando a aplicação é construída para empacotar seu JS e imagens na aplicação iOS.

1. No Xcode, selecione sua aplicação
2. Clique em `Build Phases`
3. Clique no `+` no canto superior esquerdo e selecione `New Run Script Phase`
4. Clique na linha `Run Script` e renomeie o Script para `Bundle React Native code and images`
5. Cole na caixa de texto o seguinte script

```sh title="Build React Native code and image"
set -e

WITH_ENVIRONMENT="$REACT_NATIVE_PATH/scripts/xcode/with-environment.sh"
REACT_NATIVE_XCODE="$REACT_NATIVE_PATH/scripts/react-native-xcode.sh"

/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

6. Arraste e solte o script antes daquele chamado `[CP] Embed Pods Frameworks`.

Agora, se você construir sua aplicação para Release, ela funcionará como esperado.

## 7. Passando props iniciais para a view React Native

Em alguns casos, você gostaria de passar algumas informações da aplicação nativa para JavaScript. Por exemplo, você pode querer passar o id do usuário atualmente logado para React Native, junto com um token que pode ser usado para recuperar informações de um banco de dados.

Isso é possível usando o parâmetro `initialProperties` da sobrecarga `view(withModuleName:initialProperty)` da classe `RCTReactNativeFactory`. Os passos a seguir mostram como fazer isso.

### Atualizar o arquivo App.tsx para ler as propriedades iniciais.

Abra o arquivo `App.tsx` e adicione o seguinte código:

```diff title="App.tsx"
import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

-function App(): React.JSX.Element {
+function App(props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
-       <View
-         style={{
-           backgroundColor: isDarkMode
-             ? Colors.black
-             : Colors.white,
-           padding: 24,
-         }}>
-         <Text style={styles.title}>Step One</Text>
-         <Text>
-           Edit <Text style={styles.bold}>App.tsx</Text> to
-           change this screen and see your edits.
-         </Text>
-         <Text style={styles.title}>See your changes</Text>
-         <ReloadInstructions />
-         <Text style={styles.title}>Debug</Text>
-         <DebugInstructions />
+         <Text style={styles.title}>UserID: {props.userID}</Text>
+         <Text style={styles.title}>Token: {props.token}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
+   marginLeft: 20,
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

Essas alterações dirão ao React Native que seu componente App agora está aceitando algumas propriedades. O `RCTreactNativeFactory` cuidará de passá-las para o componente quando ele for renderizado.

### Atualizar o código nativo para passar as propriedades iniciais para JavaScript.

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

Modifique o `ReactViewController.mm` para passar as propriedades iniciais para JavaScript.

```diff title="ReactViewController.mm"
 - (void)viewDidLoad {
   [super viewDidLoad];
   // Do any additional setup after loading the view.

   _factoryDelegate = [ReactNativeFactoryDelegate new];
   _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
   _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
-  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
+  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld" initialProperties:@{
+    @"userID": @"12345678",
+    @"token": @"secretToken"
+  }];
}
```

</TabItem>
<TabItem value="swift">

Modifique o `ReactViewController.swift` para passar as propriedades iniciais para a view React Native.

```diff title="ReactViewController.swift"
  override func viewDidLoad() {
    super.viewDidLoad()
    reactNativeFactoryDelegate = ReactNativeDelegate()
    reactNativeFactoryDelegate!.dependencyProvider = RCTAppDependencyProvider()
    reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeFactoryDelegate!)
-   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")
+   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld" initialProperties: [
+     "userID": "12345678",
+     "token": "secretToken"
+])

  }
}
```

</TabItem>
</Tabs>

3. Execute sua aplicação mais uma vez. Você deve ver a seguinte tela depois de apresentar o `ReactViewController`:

<center>
  <img src="/docs/assets/brownfield-with-initial-props.png" width="30%" height="30%"/>
</center>

## E agora?

Neste ponto você pode continuar desenvolvendo sua aplicação normalmente. Consulte nossa documentação sobre [debugging](debugging) e [deployment](running-on-device) para aprender mais sobre trabalhar com React Native.
