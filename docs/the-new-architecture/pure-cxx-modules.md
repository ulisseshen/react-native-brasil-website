<!-- ia-translated: true -->
import {getCurrentVersion} from '@site/src/getCurrentVersion';
import CodeBlock from '@theme/CodeBlock';

# Módulos Nativos Multiplataforma (C++)

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Escrever um módulo em C++ é a melhor maneira de compartilhar código independente de plataforma entre Android e iOS. Com módulos C++ puros, você pode escrever sua lógica apenas uma vez e reutilizá-la imediatamente em todas as plataformas, sem a necessidade de escrever código específico para cada plataforma.

Neste guia, vamos percorrer a criação de um módulo Turbo Native Module C++ puro:

1. Criar as specs JS
2. Configurar o Codegen para gerar o scaffolding
3. Implementar a lógica nativa
4. Registrar o módulo na aplicação Android e iOS
5. Testar suas alterações em JS

O restante deste guia assume que você criou sua aplicação executando o comando:

<CodeBlock language="bash" title="shell">
{`npx @react-native-community/cli@latest init SampleApp --version ${getCurrentVersion()}`}
</CodeBlock>

## 1. Criar as specs JS

Módulos Turbo Native Module C++ puros são Turbo Native Modules. Eles precisam de um arquivo de especificação (também chamado de arquivo spec) para que o Codegen possa criar o código scaffolding para nós. O arquivo de especificação também é o que usamos para acessar o Turbo Native Module em JS.

Arquivos de spec precisam ser escritos em um dialeto JS tipado. O React Native atualmente suporta Flow ou TypeScript.

1. Dentro da pasta raiz do seu app, crie uma nova pasta chamada `specs`.
2. Crie um novo arquivo chamado `NativeSampleModule.ts` com o seguinte código:

:::warning
Todos os arquivos spec de Turbo Native Module devem ter o prefixo `Native`, caso contrário o Codegen irá ignorá-los.
:::

<Tabs groupId="tnm-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```ts title="specs/NativeSampleModule.ts"
// @flow
import type {TurboModule} from 'react-native'
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
<TabItem value="typescript">

```ts title="specs/NativeSampleModule.ts"
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
</Tabs>

## 2. Configurar o Codegen

O próximo passo é configurar o [Codegen](what-is-codegen.md) no seu `package.json`. Atualize o arquivo para incluir:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
   "codegenConfig": {
     "name": "AppSpecs",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.sampleapp.specs"
     }
   },
   // highlight-add-end
   "dependencies": {
```

Esta configuração diz ao Codegen para procurar arquivos spec na pasta `specs`. Ela também instrui o Codegen a gerar código apenas para `modules` e a dar namespace ao código gerado como `AppSpecs`.

## 3. Escrever o Código Nativo

Escrever um módulo Turbo Native Module C++ permite que você compartilhe o código entre Android e iOS. Portanto, vamos escrever o código uma vez e veremos quais mudanças precisamos aplicar às plataformas para que o código C++ possa ser utilizado.

1. Crie uma pasta chamada `shared` no mesmo nível das pastas `android` e `ios`.
2. Dentro da pasta `shared`, crie um novo arquivo chamado `NativeSampleModule.h`.

   ```cpp title="shared/NativeSampleModule.h"
   #pragma once

   #include <AppSpecsJSI.h>

   #include <memory>
   #include <string>

   namespace facebook::react {

   class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
   public:
     NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

     std::string reverseString(jsi::Runtime& rt, std::string input);
   };

   } // namespace facebook::react

   ```

3. Dentro da pasta `shared`, crie um novo arquivo chamado `NativeSampleModule.cpp`.

   ```cpp title="shared/NativeSampleModule.cpp"
   #include "NativeSampleModule.h"

   namespace facebook::react {

   NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
       : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

   std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
     return std::string(input.rbegin(), input.rend());
   }

   } // namespace facebook::react
   ```

Vamos dar uma olhada nos dois arquivos que criamos:

- O arquivo `NativeSampleModule.h` é o arquivo de cabeçalho para um TurboModule C++ puro. As instruções `include` garantem que incluímos as specs que serão criadas pelo Codegen e que contêm a interface e a classe base que precisamos implementar.
- O módulo vive no namespace `facebook::react` para ter acesso a todos os tipos que vivem nesse namespace.
- A classe `NativeSampleModule` é a classe real do Turbo Native Module e ela estende a classe `NativeSampleModuleCxxSpec` que contém algum código de ligação e código boilerplate para permitir que esta classe se comporte como um Turbo Native Module.
- Finalmente, temos o construtor, que aceita um ponteiro para o `CallInvoker`, para se comunicar com JS se necessário, e o protótipo da função que temos que implementar.

O arquivo `NativeSampleModule.cpp` é a implementação real do nosso Turbo Native Module e implementa o construtor e o método que declaramos nas specs.

## 4. Registrar o Módulo na plataforma

Os próximos passos nos permitirão registrar o módulo na plataforma. Este é o passo que expõe o código nativo ao JS para que a aplicação React Native possa finalmente chamar os métodos nativos da camada JS.

Este é o único momento em que teremos que escrever algum código específico para cada plataforma.

### Android

Para garantir que o app Android possa efetivamente compilar o módulo Turbo Native Module C++, precisamos:

1. Criar um `CMakeLists.txt` para acessar nosso código C++.
2. Modificar o `build.gradle` para apontar para o arquivo `CMakeLists.txt` recém-criado.
3. Criar um arquivo `OnLoad.cpp` no nosso app Android para registrar o novo Turbo Native Module.

#### 1. Criar o arquivo `CMakeLists.txt`

Android usa CMake para compilar. O CMake precisa acessar os arquivos que definimos em nossa pasta shared para poder compilá-los.

1. Crie uma nova pasta `SampleApp/android/app/src/main/jni`. A pasta `jni` é onde o lado C++ do Android vive.
2. Crie um arquivo `CMakeLists.txt` e adicione este contexto:

```shell title="CMakeLists.txt"
cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(appmodules)

# This file includes all the necessary to let you build your React Native application
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Define where the additional source code lives. We need to crawl back the jni, main, src, app, android folders
target_sources(${CMAKE_PROJECT_NAME} PRIVATE ../../../../../shared/NativeSampleModule.cpp)

# Define where CMake can find the additional header files. We need to crawl back the jni, main, src, app, android folders
target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ../../../../../shared)
```

O arquivo CMake faz as seguintes coisas:

- Define a biblioteca `appmodules`, onde todo o código C++ do app será incluído.
- Carrega o arquivo CMake base do React Native.
- Adiciona o código fonte C++ do módulo que precisamos compilar com as diretivas `target_sources`. Por padrão, o React Native já irá preencher a biblioteca `appmodules` com as fontes padrão, aqui incluímos nossa fonte customizada. Você pode ver que precisamos voltar da pasta `jni` para a pasta `shared` onde nosso módulo Turbo C++ vive.
- Especifica onde o CMake pode encontrar os arquivos de cabeçalho do módulo. Também neste caso precisamos voltar da pasta `jni`.

#### 2. Modificar `build.gradle` para incluir o código C++ customizado

Gradle é a ferramenta que orquestra a compilação do Android. Precisamos dizer a ele onde pode encontrar os arquivos `CMake` para compilar o Turbo Native Module.

1. Abra o arquivo `SampleApp/android/app/build.gradle`.
2. Adicione o seguinte bloco ao arquivo Gradle, dentro do bloco `android` existente:

```diff title="android/app/build.gradle"
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }

+   externalNativeBuild {
+       cmake {
+           path "src/main/jni/CMakeLists.txt"
+       }
+   }
}
```

Este bloco diz ao arquivo Gradle onde procurar o arquivo CMake. O caminho é relativo à pasta onde o arquivo `build.gradle` vive, então precisamos adicionar o caminho para o arquivo `CMakeLists.txt` na pasta `jni`.

#### 3. Registrar o novo Turbo Native Module

O passo final é registrar o novo módulo Turbo Native Module C++ no runtime, para que quando o JS requisitar o módulo Turbo Native Module C++, o app saiba onde encontrá-lo e possa retorná-lo.

1. Da pasta `SampleApp/android/app/src/main/jni`, execute o seguinte comando:

<CodeBlock language="sh" title="shell">
{`curl -O https://raw.githubusercontent.com/facebook/react-native/${getCurrentVersion() === 'latest' ? '' : 'v'}${getCurrentVersion()}/packages/react-native/ReactAndroid/cmake-utils/default-app-setup/OnLoad.cpp`}
</CodeBlock>

2. Em seguida, modifique este arquivo da seguinte forma:

```diff title="android/app/src/main/jni/OnLoad.cpp"
#include <DefaultComponentsRegistry.h>
#include <DefaultTurboModuleManagerDelegate.h>
#include <autolinking.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncore.h>

+ // Include the NativeSampleModule header
+ #include <NativeSampleModule.h>

//...

std::shared_ptr<TurboModule> cxxModuleProvider(
    const std::string& name,
    const std::shared_ptr<CallInvoker>& jsInvoker) {
  // Here you can provide your CXX Turbo Modules coming from
  // either your application or from external libraries. The approach to follow
  // is similar to the following (for a module called `NativeCxxModuleExample`):
  //
  // if (name == NativeCxxModuleExample::kModuleName) {
  //   return std::make_shared<NativeCxxModuleExample>(jsInvoker);
  // }

+  // This code register the module so that when the JS side asks for it, the app can return it
+  if (name == NativeSampleModule::kModuleName) {
+    return std::make_shared<NativeSampleModule>(jsInvoker);
+  }

  // And we fallback to the CXX module providers autolinked
  return autolinking_cxxModuleProvider(name, jsInvoker);
}

// leave the rest of the file
```

Esses passos baixam o arquivo `OnLoad.cpp` original do React Native, para que possamos sobrescrevê-lo com segurança para carregar o módulo Turbo Native Module C++ no app.

Uma vez que baixamos o arquivo, podemos modificá-lo:

- Incluindo o arquivo de cabeçalho que aponta para nosso módulo
- Registrando o Turbo Native Module para que quando o JS o requisitar, o app possa retorná-lo.

Agora, você pode executar `yarn android` da raiz do projeto para ver seu app compilando com sucesso.

### iOS

Para garantir que o app iOS possa efetivamente compilar o módulo Turbo Native Module C++, precisamos:

1. Instalar pods e executar o Codegen.
2. Adicionar a pasta `shared` ao nosso projeto iOS.
3. Registrar o módulo Turbo Native Module C++ na aplicação.

#### 1. Instalar Pods e Executar o Codegen.

O primeiro passo que precisamos executar são os passos usuais que executamos toda vez que temos que preparar nossa aplicação iOS. CocoaPods é a ferramenta que usamos para configurar e instalar as dependências do React Native e, como parte do processo, ele também executará o Codegen para nós.

```bash
cd ios
bundle install
bundle exec pod install
```

#### 2. Adicionar a pasta shared ao projeto iOS

Este passo adiciona a pasta `shared` ao projeto para torná-la visível ao Xcode.

1. Abra o Xcode Workspace gerado pelo CocoaPods.

```bash
cd ios
open SampleApp.xcworkspace
```

2. Clique no projeto `SampleApp` à esquerda e selecione `Add files to "Sample App"...`.

![Add Files to Sample App...](/docs/assets/AddFilesToXcode1.png)

3. Selecione a pasta `shared` e clique em `Add`.

![Add Files to Sample App...](/docs/assets/AddFilesToXcode2.png)

Se você fez tudo certo, seu projeto à esquerda deve parecer assim:

![Xcode Project](/docs/assets/CxxTMGuideXcodeProject.png)

#### 3. Registrando o módulo Cxx Turbo Native Module no seu app

Para registrar um módulo Cxx Turbo Native Module puro no seu app, você precisa:

1. Criar um `ModuleProvider` para o Native Module
2. Configurar o `package.json` para associar o nome do módulo JS com a classe ModuleProvider.

O ModuleProvider é um Objective-C++ que cola o módulo C++ puro com o resto do seu app iOS.

##### 3.1 Criar o ModuleProvider

1. Do Xcode, selecione o projeto `SampleApp` e pressione <kbd>⌘</kbd> + <kbd>N</kbd> para criar um novo arquivo.
2. Selecione o template `Cocoa Touch Class`
3. Adicione o nome `SampleNativeModuleProvider` (mantenha os outros campos como `Subclass of: NSObject` e `Language: Objective-C`)
4. Clique em Next para gerar os arquivos.
5. Renomeie o `SampleNativeModuleProvider.m` para `SampleNativeModuleProvider.mm`. A extensão `mm` denota um arquivo Objective-C++.
6. Implemente o conteúdo do `SampleNativeModuleProvider.h` com o seguinte:

```objc title="NativeSampleModuleProvider.h"

#import <Foundation/Foundation.h>
#import <ReactCommon/RCTTurboModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeSampleModuleProvider : NSObject <RCTModuleProvider>

@end

NS_ASSUME_NONNULL_END
```

Isso declara um objeto `NativeSampleModuleProvider` que está em conformidade com o protocolo `RCTModuleProvider`.

7. Implemente o conteúdo do `SampleNativeModuleProvider.mm` com o seguinte:

```objc title="NativeSampleModuleProvider.mm"

#import "NativeSampleModuleProvider.h"
#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>
#import "NativeSampleModule.h"

@implementation NativeSampleModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeSampleModule>(params.jsInvoker);
}

@end
```

Este código implementa o protocolo `RCTModuleProvider` criando o `NativeSampleModule` C++ puro quando o método `getTurboModule:` é chamado.

##### 3.2 Atualizar o package.json

O último passo consiste em atualizar o `package.json` para dizer ao React Native sobre o link entre as specs JS do Native Module e a implementação concreta dessas specs no código nativo.

Modifique o `package.json` da seguinte forma:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   "codegenConfig": {
     "name": "AppSpecs",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.sampleapp.specs"
     // highlight-add-start
     },
     "ios": {
        "modulesProvider": {
          "NativeSampleModule":  "NativeSampleModuleProvider"
        }
     }
     // highlight-add-end
   },

   "dependencies": {
```

Neste ponto, você precisa reinstalar os pods para garantir que o codegen execute novamente para gerar os novos arquivos:

```bash
# from the ios folder
bundle exec pod install
open SampleApp.xcworkspace
```

Se você agora compilar sua aplicação do Xcode, você deve conseguir compilar com sucesso.

## 5. Testando seu Código

Agora é hora de acessar nosso módulo Turbo Native Module C++ do JS. Para fazer isso, temos que modificar o arquivo `App.tsx` para importar o Turbo Native Module e chamá-lo em nosso código.

1. Abra o arquivo `App.tsx`.
2. Substitua o conteúdo do template pelo seguinte código:

```tsx title="App.tsx"
import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState('');
  const [reversedValue, setReversedValue] = React.useState('');

  const onPress = () => {
    const revString = SampleTurboModule.reverseString(value);
    setReversedValue(revString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here he text you want to revert</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

export default App;
```

As linhas interessantes neste app são:

- `import SampleTurboModule from './specs/NativeSampleModule';`: esta linha importa o Turbo Native Module no app,
- `const revString = SampleTurboModule.reverseString(value);` no callback `onPress`: esta é a forma como você pode usar o Turbo Native Module no seu app.

:::warning
Para fins deste exemplo e para mantê-lo o mais curto possível, importamos diretamente o arquivo spec no nosso app.
A melhor prática neste caso é criar um arquivo separado para envolver as specs e usar esse arquivo na sua aplicação.
Isso permite que você prepare a entrada para as specs e lhe dá mais controle sobre elas em JS.
:::

Parabéns, você escreveu seu primeiro módulo Turbo Native Module C++!

| <center>Android</center>                                                                             | <center>iOS</center>                                                                          |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/CxxGuideAndroidVideo.gif" alt="Android Video" height="600"/></center> | <center><img src="/docs/assets/CxxGuideIOSVideo.gif" alt="iOS video" height="600" /></center> |
