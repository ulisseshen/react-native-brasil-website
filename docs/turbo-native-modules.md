---
ia-translated: true
id: turbo-native-modules-introduction
title: 'Native Modules: Introduction'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import CodeBlock from '@theme/CodeBlock';
import {getCurrentVersion} from '@site/src/getCurrentVersion';
import {TurboNativeModulesAndroid, TurboNativeModulesIOS} from './\_turbo-native-modules-components';

# Native Modules

O código do seu aplicativo React Native pode precisar interagir com APIs da plataforma nativa que não são fornecidas pelo React Native ou por uma biblioteca existente. Você pode escrever o código de integração você mesmo usando um **Turbo Native Module**. Este guia mostrará como escrever um.

Os passos básicos são:

1. **definir uma especificação JavaScript tipada** usando uma das linguagens de anotação de tipo JavaScript mais populares: Flow ou TypeScript;
2. **configurar seu sistema de gerenciamento de dependências para executar o Codegen**, que converte a especificação em interfaces de linguagem nativa;
3. **escrever o código do seu aplicativo** usando sua especificação; e
4. **escrever o código da plataforma nativa usando as interfaces geradas** para escrever e conectar seu código nativo ao ambiente de runtime React Native.

Vamos trabalhar em cada um desses passos construindo um exemplo de Turbo Native Module. O restante deste guia assume que você criou seu aplicativo executando o comando:

<CodeBlock language="bash" title="shell">
{`npx @react-native-community/cli@latest init TurboModuleExample --version ${getCurrentVersion()}`}
</CodeBlock>

## Native Persistent Storage

Este guia mostrará como escrever uma implementação da [Web Storage API](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev): `localStorage`. A API é relacionável a um desenvolvedor React que pode estar escrevendo código de aplicativo em seu projeto.

Para fazer isso funcionar em mobile, precisamos usar APIs Android e iOS:

- Android: [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences), e
- iOS: [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults).

### 1. Declare Typed Specification

React Native fornece uma ferramenta chamada [Codegen](/docs/the-new-architecture/what-is-codegen), que pega uma especificação escrita em TypeScript ou Flow e gera código específico da plataforma para Android e iOS. A especificação declara os métodos e tipos de dados que passarão de um lado para outro entre seu código nativo e o runtime JavaScript React Native. Um Turbo Native Module é sua especificação, o código nativo que você escreve e as interfaces Codegen geradas a partir de sua especificação.

Para criar um arquivo de specs:

1. Dentro da pasta raiz do seu app, crie uma nova pasta chamada `specs`.
2. Crie um novo arquivo chamado `NativeLocalStorage.ts`.

:::info
Você pode ver todos os tipos que você pode usar em sua especificação e os tipos nativos que são gerados na documentação do [Appendix](/docs/appendix).
:::

Aqui está uma implementação da especificação `localStorage`:

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="specs/NativeLocalStorage.ts"
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);
```

</TabItem>
<TabItem value="flow">

```flow title="NativeLocalStorage.js"
import type {TurboModule} from 'react-native';
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): ?string;
  removeItem(key: string): void;
  clear(): void;
}
```

</TabItem>
</Tabs>

### 2. Configure Codegen to run

A especificação é usada pelas ferramentas React Native Codegen para gerar interfaces e boilerplate específicos da plataforma para nós. Para fazer isso, o Codegen precisa saber onde encontrar nossa especificação e o que fazer com ela. Atualize seu `package.json` para incluir:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
   "codegenConfig": {
     "name": "NativeLocalStorageSpec",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.nativelocalstorage"
     }
   },
   // highlight-add-end
   "dependencies": {
```

Com tudo configurado para o Codegen, precisamos preparar nosso código nativo para se conectar ao nosso código gerado.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
O Codegen é executado através da task Gradle `generateCodegenArtifactsFromSchema`:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

Isso é executado automaticamente quando você compila seu aplicativo Android.
</TabItem>
<TabItem value="ios" label="iOS">
O Codegen é executado como parte das fases de script que são automaticamente adicionadas ao projeto gerado pelo CocoaPods.

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

### 3. Write Application Code using the Turbo Native Module

Usando `NativeLocalStorage`, aqui está um `App.tsx` modificado que inclui algum texto que queremos persistir, um campo de entrada e alguns botões para atualizar este valor.

O `TurboModuleRegistry` suporta 2 modos de recuperar um Turbo Native Module:

- `get<T>(name: string): T | null` que retornará `null` se o Turbo Native Module estiver indisponível.
- `getEnforcing<T>(name: string): T` que lançará uma exceção se o Turbo Native Module estiver indisponível. Isso assume que o módulo está sempre disponível.

```tsx title="App.tsx"
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);

  const [editingValue, setEditingValue] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;
```

### 4. Write your Native Platform code

Com tudo preparado, vamos começar a escrever código da plataforma nativa. Fazemos isso em 2 partes:

:::note
Este guia mostra como criar um Turbo Native Module que funciona apenas com a New Architecture. Se você precisar suportar tanto a New Architecture quanto a Legacy Architecture, consulte nosso [guia de compatibilidade com versões anteriores](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat.md).
:::

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <TurboNativeModulesAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <TurboNativeModulesIOS/>
    </TabItem>
</Tabs>
