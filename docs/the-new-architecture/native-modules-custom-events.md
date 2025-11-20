<!-- ia-translated: true -->
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# Emitindo Eventos em Native Modules

Em algumas circunstâncias, você pode querer ter um Native Module que escuta alguns eventos na camada da plataforma e então os emite para a camada JavaScript, para permitir que sua aplicação reaja a tais eventos nativos. Em outros casos, você pode ter operações de longa duração que podem emitir eventos para que a UI possa ser atualizada quando isso acontecer.

Ambos são bons casos de uso para emitir eventos de um Native Module. Neste guia, você aprenderá como fazer isso.

## Emitindo um Evento quando uma nova chave é adicionada ao storage

Neste exemplo, você aprenderá como emitir um evento quando uma nova chave é adicionada ao storage. Mudar o valor da chave não emitirá o evento, mas adicionar uma nova chave sim.

Este guia começa a partir do guia de [Native Module](/docs/next/turbo-native-modules-introduction).
Certifique-se de estar familiarizado com esse guia antes de mergulhar neste, potencialmente implementando o exemplo no guia.

## Passo 1: Atualizar as Specs do NativeLocalStorage

O primeiro passo seria atualizar as specs do `NativeLocalStorage` para deixar o React Native ciente de que o módulo pode emitir eventos.

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

Abra o arquivo `NativeLocalStorage.ts` e atualize-o da seguinte forma:

```diff title="NativeLocalStorage.ts"
+import type {TurboModule, CodegenTypes} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

+export type KeyValuePair = {
+  key: string,
+  value: string,
+}

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;

+ readonly onKeyAdded: CodegenTypes.EventEmitter<KeyValuePair>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);
```

</TabItem>
<TabItem value="flow">

Abra o arquivo `NativeLocalStorage.js` e atualize-o da seguinte forma:

```diff title="NativeLocalStorage.js"

// @flow
+import type {TurboModule, CodegenTypes} from 'react-native';
import {TurboModule, TurboModuleRegistry} from 'react-native';

+export type KeyValuePair = {
+  key: string,
+  value: string,
+}

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): ?string;
  removeItem(key: string): void;
  clear(): void;
+ onKeyAdded: CodegenTypes.EventEmitter<KeyValuePair>
}
export default (TurboModuleRegistry.get<Spec>(
  'NativeLocalStorage'
): ?Spec);
```

</TabItem>
</Tabs>

Com a instrução `import type`, você está importando os `CodegenTypes` do `react-native`, que incluem o tipo `EventEmitter`. Isso permite que você defina a propriedade `onKeyAdded` usando `CodegenTypes.EventEmitter<KeyValuePair>`, especificando que o evento emitirá um payload do tipo `KeyValuePair`.

Quando o evento é emitido, você espera que ele receba um parâmetro do tipo `KeyValuePair`.

## Passo 2: Gerar o Codegen

Dado que você atualizou as specs para seu Native Module, agora você precisa executar novamente o Codegen para gerar os artefatos no código nativo.

Este é o mesmo processo apresentado no guia de Native Modules.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
O Codegen é executado através da task Gradle `generateCodegenArtifactsFromSchema`:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

Isso é executado automaticamente quando você compila sua aplicação Android.
</TabItem>
<TabItem value="ios" label="iOS">
O Codegen é executado como parte das fases de script que são automaticamente adicionadas ao projeto gerado pelo CocoaPods.

```bash
cd ios
bundle install
bundle exec pod install
```

A saída parecerá com isso:

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for Codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for Codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

</TabItem>
</Tabs>

## Passo 3: Atualizar o código do App

Agora, é hora de atualizar o código do App para lidar com o novo evento.

Abra o arquivo `App.tsx` e modifique-o da seguinte forma:

```diff title="App.tsx"
import React from 'react';
import {
+ Alert,
+ EventSubscription,
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
+ const [key, setKey] = React.useState<string | null>(null);
+ const listenerSubscription = React.useRef<null | EventSubscription>(null);

+ React.useEffect(() => {
+   listenerSubscription.current = NativeLocalStorage?.onKeyAdded((pair) => Alert.alert(`New key added: ${pair.key} with value: ${pair.value}`));

+   return  () => {
+     listenerSubscription.current?.remove();
+     listenerSubscription.current = null;
+   }
+ }, [])

  const [editingValue, setEditingValue] = React.useState<
    string | null
  >(null);

- React.useEffect(() => {
-   const storedValue = NativeLocalStorage?.getItem('myKey');
-   setValue(storedValue ?? '');
- }, []);

  function saveValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, key);
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
    NativeLocalStorage?.removeItem(key);
    setValue('');
  }

+ function retrieveValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
+   const val = NativeLocalStorage?.getItem(key);
+   setValue(val);
+ }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
+     <Text>Key:</Text>
+      <TextInput
+       placeholder="Enter the key you want to store"
+       style={styles.textInput}
+       onChangeText={setKey}
+     />
+     <Text>Value:</Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
+     <Button title="Retrieve" onPress={retrieveValue} />
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

Existem algumas mudanças relevantes a serem observadas:

1. Você precisa importar o tipo `EventSubscription` do `react-native` para lidar com o `EventSubscription`
2. Você precisa usar um `useRef` para manter o rastreamento da referência do `EventSubscription`
3. Você registra o listener usando um hook `useEffect`. A função `onKeyAdded` recebe um callback com um objeto do tipo `KeyValuePair` como parâmetro da função.
4. O callback adicionado ao `onKeyAdded` é executado toda vez que o evento é emitido do Native para o JS.
5. Na função de cleanup do `useEffect`, você `remove` a subscription do evento e define a ref como `null`.

O resto das mudanças são mudanças regulares do React para melhorar o App para essa nova funcionalidade.

## Passo 4: Escrever seu Código Nativo

Com tudo preparado, vamos começar a escrever o código nativo da plataforma.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">

Assumindo que você seguiu o guia para Android descrito no [guia de Native Modules](/docs/turbo-native-modules-introduction?platforms=android&language=typescript#3-write-application-code-using-the-turbo-native-module), o que resta fazer é conectar o código que emite os eventos em seu app.

Para fazer isso, você precisa:

1. Abrir o arquivo `NativeLocalStorage.kt`
2. Modificá-lo da seguinte forma:

```diff title="NativeLocalStorage"
package com.nativelocalstorage

import android.content.Context
import android.content.SharedPreferences
import com.nativelocalstorage.NativeLocalStorageSpec
+import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
+import com.facebook.react.bridge.WritableMap

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

  override fun getName() = NAME

  override fun setItem(value: String, key: String) {
+   var shouldEmit = false
+   if (getItem(key) != null) {
+       shouldEmit = true
+   }
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.putString(key, value)
    editor.apply()

+   if (shouldEmit == true) {
+       val eventData = Arguments.createMap().apply {
+           putString("key", key)
+           putString("value", value)
+       }
+       emitOnKeyAdded(eventData)
+   }
  }

  override fun getItem(key: String): String? {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val username = sharedPref.getString(key, null)
    return username.toString()
  }
```

Primeiro, você precisa importar alguns tipos que você precisa usar para criar o eventData que precisa ser enviado do Native para o JS. Esses imports são:

- `import com.facebook.react.bridge.Arguments`
- `import com.facebook.react.bridge.WritableMap`

Em segundo lugar, você precisa implementar a lógica que realmente emite o evento para o JS. No caso de tipos complexos, como o `KeyValuePair` definido nas specs, o Codegen gerará uma função que espera um `ReadableMap` como parâmetro. Você pode criar o `ReadableMap` usando o método factory `Arguments.createMap()`, e usar a função `apply` para popular o map. É sua responsabilidade garantir que as chaves que você está usando no map sejam as mesmas propriedades que estão definidas no tipo da spec em JS.

</TabItem>
<TabItem value="ios" label="iOS">

Assumindo que você seguiu o guia para iOS descrito no [guia de Native Modules](/docs/turbo-native-modules-introduction?platforms=ios&language=typescript#3-write-application-code-using-the-turbo-native-module), o que resta fazer é conectar o código que emite os eventos em seu app.

Para fazer isso, você precisa:

1. Abrir o arquivo `RCTNativeLocalStorage.h`.
2. Mudar a classe base de `NSObject` para `NativeLocalStorageSpecBase`

```diff title="RCTNativeLocalStorage.h"
#import <Foundation/Foundation.h>
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

-@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>
+@interface RCTNativeLocalStorage : NativeLocalStorageSpecBase <NativeLocalStorageSpec>

@end

NS_ASSUME_NONNULL_END
```

3. Abrir o arquivo `RCTNativeLocalStorage.mm`.
4. Modificá-lo para emitir os eventos quando necessário, por exemplo:

```diff title="RCTNativeLocalStorage.mm"
 - (void)setItem:(NSString *)value key:(NSString *)key {
+  BOOL shouldEmitEvent = NO;
+  if (![self getItem:key]) {
+    shouldEmitEvent = YES;
+  }
   [self.localStorage setObject:value forKey:key];

+  if (shouldEmitEvent) {
+    [self emitOnKeyAdded:@{@"key": key, @"value": value}];
+  }
}
```

O `NativeLocalStorageSpecBase` é uma classe base que fornece o método `emitOnKeyAdded` e sua implementação básica e boilerplate. Graças a essa classe, você não precisa lidar com toda a conversão entre Objective-C e JSI que é necessária para enviar o evento para o JS.

No caso de tipos complexos, como o `KeyValuePair` definido nas specs, o Codegen gerará um dicionário genérico que você pode popular no lado nativo. É sua responsabilidade garantir que as chaves que você está usando no dicionário sejam as mesmas propriedades que estão definidas no tipo da spec em JS.

</TabItem>
</Tabs>

## Passo 5: Executar Seu App

Se você tentar executar seu app agora, você deve ver este comportamento.

| <center>Android</center>                                                                                    | <center>iOS</center>                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/turbo-native-modules-events-android.gif" width="75%" height="75%"/></center> | <center><img src="/docs/assets/turbo-native-modules-events-ios.gif" width="75%" height="75%"/></center> |
