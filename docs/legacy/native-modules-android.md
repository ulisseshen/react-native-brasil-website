---
id: native-modules-android
title: Módulos Nativos Android
ia-translated: true
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NativeDeprecated />

Bem-vindo aos Módulos Nativos para Android. Comece lendo a [Introdução aos Módulos Nativos](native-modules-intro) para entender o que são módulos nativos.

## Criar um Módulo Nativo de Calendário

No guia a seguir, você criará um módulo nativo chamado `CalendarModule`, que permitirá acessar as APIs de calendário do Android a partir do JavaScript. Ao final, você poderá chamar `CalendarModule.createCalendarEvent('Dinner Party', 'My House');` do JavaScript, invocando um método Java/Kotlin que cria um evento de calendário.

### Setup

Para começar, abra o projeto Android dentro da sua aplicação React Native no Android Studio. Você pode encontrar seu projeto Android aqui dentro de um app React Native:

<figure>
  <img src="/docs/assets/native-modules-android-open-project.png" width="500" alt="Image of opening up an Android project within a React Native app inside of Android Studio." />
  <figcaption>Imagem de onde você pode encontrar seu projeto Android</figcaption>
</figure>

Recomendamos usar o Android Studio para escrever seu código nativo. O Android Studio é uma IDE construída para desenvolvimento Android e usá-la ajudará você a resolver problemas menores como erros de sintaxe de código rapidamente.

Também recomendamos habilitar o [Gradle Daemon](https://docs.gradle.org/2.9/userguide/gradle_daemon.html) para acelerar as compilações conforme você itera no código Java/Kotlin.

### Criar um Arquivo de Módulo Nativo Customizado

O primeiro passo é criar o arquivo Java/Kotlin (`CalendarModule.java` ou `CalendarModule.kt`) dentro da pasta `android/app/src/main/java/com/your-app-name/` (a pasta é a mesma para Kotlin e Java). Este arquivo Java/Kotlin conterá sua classe de módulo nativo Java/Kotlin.

<figure>
  <img src="/docs/assets/native-modules-android-add-class.png" width="700" alt="Image of adding a class called CalendarModule.java within the Android Studio." />
  <figcaption>Imagem de como adicionar a classe CalendarModule</figcaption>
</figure>

Então adicione o seguinte conteúdo:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
package com.your-apps-package-name; // replace your-apps-package-name with your app's package name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
   CalendarModule(ReactApplicationContext context) {
       super(context);
   }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
package com.your-apps-package-name; // replace your-apps-package-name with your app's package name
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {...}
```

</TabItem>
</Tabs>

Como você pode ver, sua classe `CalendarModule` estende a classe `ReactContextBaseJavaModule`. Para Android, módulos nativos Java/Kotlin são escritos como classes que estendem `ReactContextBaseJavaModule` e implementam a funcionalidade necessária para o JavaScript.

:::note
Vale notar que tecnicamente as classes Java/Kotlin só precisam estender a classe `BaseJavaModule` ou implementar a interface `NativeModule` para serem consideradas um Módulo Nativo pelo React Native.

No entanto, recomendamos que você use `ReactContextBaseJavaModule`, como mostrado acima. `ReactContextBaseJavaModule` dá acesso ao `ReactApplicationContext` (RAC), que é útil para Módulos Nativos que precisam se conectar aos métodos de ciclo de vida da activity. Usar `ReactContextBaseJavaModule` também tornará mais fácil tornar seu módulo nativo type-safe no futuro. Para type-safety de módulos nativos, que está chegando em lançamentos futuros, o React Native olha para a especificação JavaScript de cada módulo nativo e gera uma classe base abstrata que estende `ReactContextBaseJavaModule`.
:::

### Nome do Módulo

Todos os módulos nativos Java/Kotlin no Android precisam implementar o método `getName()`. Este método retorna uma string, que representa o nome do módulo nativo. O módulo nativo pode então ser acessado no JavaScript usando seu nome. Por exemplo, no trecho de código abaixo, `getName()` retorna `"CalendarModule"`.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
// add to CalendarModule.java
@Override
public String getName() {
   return "CalendarModule";
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
// add to CalendarModule.kt
override fun getName() = "CalendarModule"
```

</TabItem>
</Tabs>

O módulo nativo pode então ser acessado em JS assim:

```tsx
const {CalendarModule} = ReactNative.NativeModules;
```

### Exportar um Método Nativo para JavaScript

Em seguida, você precisará adicionar um método ao seu módulo nativo que criará eventos de calendário e pode ser invocado em JavaScript. Todos os métodos de módulos nativos destinados a serem invocados a partir do JavaScript devem ser anotados com `@ReactMethod`.

Configure um método `createCalendarEvent()` para `CalendarModule` que pode ser invocado em JS através de `CalendarModule.createCalendarEvent()`. Por enquanto, o método receberá um nome e localização como strings. As opções de tipo de argumento serão cobertas em breve.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod
public void createCalendarEvent(String name, String location) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod fun createCalendarEvent(name: String, location: String) {}
```

</TabItem>
</Tabs>

Adicione um log de debug no método para confirmar que ele foi invocado quando você o chamar da sua aplicação. Abaixo está um exemplo de como você pode importar e usar a classe [Log](https://developer.android.com/reference/android/util/Log) do pacote util do Android:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import android.util.Log;

@ReactMethod
public void createCalendarEvent(String name, String location) {
   Log.d("CalendarModule", "Create event called with name: " + name
   + " and location: " + location);
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import android.util.Log

@ReactMethod
fun createCalendarEvent(name: String, location: String) {
    Log.d("CalendarModule", "Create event called with name: $name and location: $location")
}
```

</TabItem>
</Tabs>

Depois de terminar de implementar o módulo nativo e conectá-lo no JavaScript, você pode seguir [estas etapas](https://developer.android.com/studio/debug/am-logcat.html) para visualizar os logs do seu app.

### Métodos Síncronos

Você pode passar `isBlockingSynchronousMethod = true` para um método nativo para marcá-lo como um método síncrono.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod(isBlockingSynchronousMethod = true)
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod(isBlockingSynchronousMethod = true)
```

</TabItem>
</Tabs>

No momento, não recomendamos isso, pois chamar métodos de forma síncrona pode ter fortes penalidades de performance e introduzir bugs relacionados a threading nos seus módulos nativos. Além disso, observe que se você optar por habilitar `isBlockingSynchronousMethod`, seu app não poderá mais usar o depurador do Google Chrome. Isso porque métodos síncronos exigem que a VM JS compartilhe memória com o app. Para o depurador do Google Chrome, o React Native roda dentro da VM JS no Google Chrome e se comunica de forma assíncrona com os dispositivos móveis via WebSockets.

### Registrar o Módulo (Específico do Android)

Uma vez que um módulo nativo é escrito, ele precisa ser registrado com o React Native. Para fazer isso, você precisa adicionar seu módulo nativo a um `ReactPackage` e registrar o `ReactPackage` com o React Native. Durante a inicialização, o React Native irá percorrer todos os packages e, para cada `ReactPackage`, registrar cada módulo nativo dentro dele.

O React Native invoca o método `createNativeModules()` em um `ReactPackage` para obter a lista de módulos nativos a serem registrados. Para Android, se um módulo não for instanciado e retornado em createNativeModules, ele não estará disponível a partir do JavaScript.

Para adicionar seu Módulo Nativo ao `ReactPackage`, primeiro crie uma nova Classe Java/Kotlin chamada (`MyAppPackage.java` ou `MyAppPackage.kt`) que implementa `ReactPackage` dentro da pasta `android/app/src/main/java/com/your-app-name/`:

Então adicione o seguinte conteúdo:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
package com.your-app-name; // replace your-app-name with your app's name
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();

       modules.add(new CalendarModule(reactContext));

       return modules;
   }

}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
package com.your-app-name // replace your-app-name with your app's name

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class MyAppPackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(CalendarModule(reactContext)).toMutableList()
}
```

</TabItem>
</Tabs>

Este arquivo importa o módulo nativo que você criou, `CalendarModule`. Ele então instancia `CalendarModule` dentro da função `createNativeModules()` e o retorna como uma lista de `NativeModules` a serem registrados. Se você adicionar mais módulos nativos posteriormente, também pode instanciá-los e adicioná-los à lista retornada aqui.

:::note
Vale notar que essa forma de registrar módulos nativos inicializa todos os módulos nativos imediatamente quando a aplicação inicia, o que adiciona tempo de inicialização à aplicação. Você pode usar [TurboReactPackage](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/TurboReactPackage.kt) como alternativa. Em vez de `createNativeModules`, que retorna uma lista de objetos de módulos nativos instanciados, o TurboReactPackage implementa um método `getModule(String name, ReactApplicationContext rac)` que cria o objeto do módulo nativo quando necessário. TurboReactPackage é um pouco mais complicado de implementar no momento. Além de implementar um método `getModule()`, você precisa implementar um método `getReactModuleInfoProvider()`, que retorna uma lista de todos os módulos nativos que o package pode instanciar junto com uma função que os instancia, veja o exemplo [aqui](https://github.com/facebook/react-native/blob/8ac467c51b94c82d81930b4802b2978c85539925/ReactAndroid/src/main/java/com/facebook/react/CoreModulesPackage.java#L86-L165). Novamente, usar TurboReactPackage permitirá que sua aplicação tenha um tempo de inicialização mais rápido, mas atualmente é um pouco trabalhoso de escrever. Portanto, proceda com cautela se optar por usar TurboReactPackages.
:::

Para registrar o package `CalendarModule`, você deve adicionar `MyAppPackage` à lista de packages retornados no método `getPackages()` do ReactNativeHost. Abra seu arquivo `MainApplication.java` ou `MainApplication.kt`, que pode ser encontrado no seguinte caminho: `android/app/src/main/java/com/your-app-name/`.

Localize o método `getPackages()` do ReactNativeHost e adicione seu package à lista de packages que `getPackages()` retorna:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
protected List<ReactPackage> getPackages() {
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // Packages that cannot be autolinked yet can be added manually here, for example:
    // packages.add(new MyReactNativePackage());
    packages.add(new MyAppPackage());
    return packages;
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // add(MyReactNativePackage())
        add(MyAppPackage())
    }
```

</TabItem>
</Tabs>

Você agora registrou com sucesso seu módulo nativo para Android!

### Testar o que Você Construiu

Neste ponto, você configurou a estrutura básica para seu módulo nativo no Android. Teste isso acessando o módulo nativo e invocando seu método exportado em JavaScript.

Encontre um lugar em sua aplicação onde você gostaria de adicionar uma chamada ao método `createCalendarEvent()` do módulo nativo. Abaixo está um exemplo de um componente, `NewModuleButton`, que você pode adicionar no seu app. Você pode invocar o módulo nativo dentro da função `onPress()` do `NewModuleButton`.

```tsx
import React from 'react';
import {NativeModules, Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = () => {
    console.log('We will invoke the native module here!');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
```

Para acessar seu módulo nativo do JavaScript, você precisa primeiro importar `NativeModules` do React Native:

```tsx
import {NativeModules} from 'react-native';
```

Você pode então acessar o módulo nativo `CalendarModule` a partir de `NativeModules`.

```tsx
const {CalendarModule} = NativeModules;
```

Agora que você tem o módulo nativo CalendarModule disponível, você pode invocar seu método nativo `createCalendarEvent()`. Abaixo ele é adicionado ao método `onPress()` em `NewModuleButton`:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent('testName', 'testLocation');
};
```

O passo final é reconstruir o app React Native para que você possa ter o código nativo mais recente (com seu novo módulo nativo!) disponível. Na sua linha de comando, onde está localizada a aplicação react native, execute o seguinte:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

### Compilando Conforme Você Itera

Conforme você trabalha através desses guias e itera em seu módulo nativo, você precisará fazer uma reconstrução nativa da sua aplicação para acessar suas mudanças mais recentes a partir do JavaScript. Isso porque o código que você está escrevendo fica dentro da parte nativa da sua aplicação. Embora o metro bundler do React Native possa observar mudanças no JavaScript e reconstruir em tempo real para você, ele não fará isso para código nativo. Então, se você quiser testar suas mudanças nativas mais recentes, você precisa reconstruir usando o comando acima.

### Resumo✨

Agora você deve ser capaz de invocar seu método `createCalendarEvent()` no seu módulo nativo no app. No nosso exemplo, isso ocorre ao pressionar o `NewModuleButton`. Você pode confirmar isso visualizando o log que você configurou no seu método `createCalendarEvent()`. Você pode seguir [estas etapas](https://developer.android.com/studio/debug/am-logcat.html) para visualizar os logs ADB no seu app. Você deve então ser capaz de procurar por sua mensagem `Log.d` (no nosso exemplo "Create event called with name: testName and location: testLocation") e ver sua mensagem registrada cada vez que você invoca seu método de módulo nativo.

<figure>
  <img src="/docs/assets/native-modules-android-logs.png" width="1000" alt="Image of logs." />
  <figcaption>Imagem dos logs ADB no Android Studio</figcaption>
</figure>

Neste ponto, você criou um módulo nativo Android e invocou seu método nativo a partir do JavaScript na sua aplicação React Native. Você pode continuar lendo para aprender mais sobre coisas como tipos de argumentos disponíveis para um método de módulo nativo e como configurar callbacks e promises.

## Além de um Módulo Nativo de Calendário

### Melhor Exportação de Módulo Nativo

Importar seu módulo nativo extraindo-o de `NativeModules` como acima é um pouco desajeitado.

Para economizar aos consumidores do seu módulo nativo de ter que fazer isso cada vez que quiserem acessar seu módulo nativo, você pode criar um wrapper JavaScript para o módulo. Crie um novo arquivo JavaScript chamado `CalendarModule.js` com o seguinte conteúdo:

```tsx
/**
* This exposes the native CalendarModule module as a JS module. This has a
* function 'createCalendarEvent' which takes the following parameters:

* 1. String name: A string representing the name of the event
* 2. String location: A string representing the location of the event
*/
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
export default CalendarModule;
```

Este arquivo JavaScript também se torna um bom local para você adicionar qualquer funcionalidade do lado JavaScript. Por exemplo, se você usa um sistema de tipos como TypeScript, pode adicionar anotações de tipo para seu módulo nativo aqui. Embora o React Native ainda não suporte type safety nativo para JS, todo o seu código JS será type safe. Fazer isso também tornará mais fácil para você mudar para módulos nativos type-safe no futuro. Abaixo está um exemplo de adição de type safety ao CalendarModule:

```tsx
/**
 * This exposes the native CalendarModule module as a JS module. This has a
 * function 'createCalendarEvent' which takes the following parameters:
 *
 * 1. String name: A string representing the name of the event
 * 2. String location: A string representing the location of the event
 */
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void;
}
export default CalendarModule as CalendarInterface;
```

Nos seus outros arquivos JavaScript, você pode acessar o módulo nativo e invocar seu método assim:

```tsx
import CalendarModule from './CalendarModule';
CalendarModule.createCalendarEvent('foo', 'bar');
```

:::note
Isso assume que o lugar onde você está importando `CalendarModule` está na mesma hierarquia que `CalendarModule.js`. Atualize o import relativo conforme necessário.
:::

### Tipos de Argumentos

Quando um método de módulo nativo é invocado no JavaScript, o React Native converte os argumentos de objetos JS para seus análogos de objetos Java/Kotlin. Então, por exemplo, se seu método de Módulo Nativo Java aceita um double, em JS você precisa chamar o método com um number. O React Native lidará com a conversão para você. Abaixo está uma lista dos tipos de argumentos suportados para métodos de módulos nativos e os equivalentes JavaScript para os quais eles mapeiam.

| Java          | Kotlin        | JavaScript |
| ------------- | ------------- | ---------- |
| Boolean       | Boolean       | ?boolean   |
| boolean       |               | boolean    |
| Double        | Double        | ?number    |
| double        |               | number     |
| String        | String        | string     |
| Callback      | Callback      | Function   |
| Promise       | Promise       | Promise    |
| ReadableMap   | ReadableMap   | Object     |
| ReadableArray | ReadableArray | Array      |

:::info
Os seguintes tipos são atualmente suportados, mas não serão suportados em TurboModules. Evite usá-los:

- Integer Java/Kotlin -> ?number
- Float Java/Kotlin -> ?number
- int Java -> number
- float Java -> number
  :::

Para tipos de argumentos não listados acima, você precisará lidar com a conversão você mesmo. Por exemplo, no Android, a conversão de `Date` não é suportada pronta para uso. Você pode lidar com a conversão para o tipo `Date` dentro do método nativo você mesmo assim:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
    String dateFormat = "yyyy-MM-dd";
    SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
    Calendar eStartDate = Calendar.getInstance();
    try {
        eStartDate.setTime(sdf.parse(startDate));
    }

```

</TabItem>
<TabItem value="kotlin">

```kotlin
    val dateFormat = "yyyy-MM-dd"
    val sdf = SimpleDateFormat(dateFormat, Locale.US)
    val eStartDate = Calendar.getInstance()
    try {
        sdf.parse(startDate)?.let {
            eStartDate.time = it
        }
    }
```

</TabItem>
</Tabs>

### Exportando Constantes

Um módulo nativo pode exportar constantes implementando o método nativo `getConstants()`, que está disponível em JS. Abaixo você implementará `getConstants()` e retornará um Map que contém uma constante `DEFAULT_EVENT_NAME` que você pode acessar em JavaScript:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public Map<String, Object> getConstants() {
   final Map<String, Object> constants = new HashMap<>();
   constants.put("DEFAULT_EVENT_NAME", "New Event");
   return constants;
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun getConstants(): MutableMap<String, Any> =
    hashMapOf("DEFAULT_EVENT_NAME" to "New Event")
```

</TabItem>
</Tabs>

A constante pode então ser acessada invocando `getConstants` no módulo nativo em JS:

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);
```

Tecnicamente é possível acessar constantes exportadas em `getConstants()` diretamente do objeto do módulo nativo. Isso não será mais suportado com TurboModules, então encorajamos a comunidade a mudar para a abordagem acima para evitar migração necessária no futuro.

:::note
Atualmente as constantes são exportadas apenas no momento da inicialização, então se você alterar os valores de getConstants em tempo de execução, isso não afetará o ambiente JavaScript. Isso mudará com Turbomodules. Com Turbomodules, `getConstants()` se tornará um método de módulo nativo regular, e cada invocação atingirá o lado nativo.
:::

### Callbacks

Módulos nativos também suportam um tipo único de argumento: um callback. Callbacks são usados para passar dados do Java/Kotlin para o JavaScript para métodos assíncronos. Eles também podem ser usados para executar JavaScript de forma assíncrona a partir do lado nativo.

Para criar um método de módulo nativo com um callback, primeiro importe a interface `Callback` e então adicione um novo parâmetro ao seu método de módulo nativo do tipo `Callback`. Há algumas nuances com argumentos de callback que em breve serão eliminadas com TurboModules. Primeiro, você só pode ter dois callbacks nos argumentos da sua função - um successCallback e um failureCallback. Além disso, o último argumento para uma chamada de método de módulo nativo, se for uma função, é tratado como o successCallback, e o penúltimo argumento para uma chamada de método de módulo nativo, se for uma função, é tratado como o failure callback.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import com.facebook.react.bridge.Callback;

@ReactMethod
public void createCalendarEvent(String name, String location, Callback callBack) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import com.facebook.react.bridge.Callback

@ReactMethod fun createCalendarEvent(name: String, location: String, callback: Callback) {}
```

</TabItem>
</Tabs>

Você pode então invocar o callback no seu método Java/Kotlin, fornecendo qualquer resultado que você queira passar para o JavaScript em um array. Note que você só pode passar dados serializáveis do código nativo para o JavaScript. Se você precisa passar de volta um objeto nativo, pode usar `WriteableMaps`, se você precisa usar uma coleção use `WritableArrays`. Também é importante destacar que o callback não é invocado imediatamente após a função nativa ser concluída - lembre-se que a comunicação é assíncrona.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
  @ReactMethod
   public void createCalendarEvent(String name, String location, Callback callBack) {
       Integer eventId = ...
       callBack.invoke(eventId);
   }
```

</TabItem>
<TabItem value="kotlin">

```kotlin
  @ReactMethod
  fun createCalendarEvent(name: String, location: String, callback: Callback) {
      val eventId = ...
      callback.invoke(eventId)
  }
```

</TabItem>
</Tabs>

Este método poderia então ser acessado em JavaScript usando:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'Party',
    'My House',
    eventId => {
      console.log(`Created a new event with id ${eventId}`);
    },
  );
};
```

Outro detalhe importante a notar é que um método de módulo nativo só pode invocar um callback, uma vez. Isso significa que você pode chamar um success callback ou um failure callback, mas não ambos, e cada callback só pode ser invocado no máximo uma vez. Um módulo nativo pode, no entanto, armazenar o callback e invocá-lo mais tarde.

Existem duas abordagens para o tratamento de erros com callbacks. A primeira é seguir a convenção do Node e tratar o primeiro argumento passado para o array de callback como um objeto de erro.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
  @ReactMethod
   public void createCalendarEvent(String name, String location, Callback callBack) {
       Integer eventId = ...
       callBack.invoke(null, eventId);
   }
```

</TabItem>
<TabItem value="kotlin">

```kotlin
  @ReactMethod
  fun createCalendarEvent(name: String, location: String, callback: Callback) {
      val eventId = ...
      callback.invoke(null, eventId)
  }
```

</TabItem>
</Tabs>

Em JavaScript, você pode então verificar o primeiro argumento para ver se um erro foi passado:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'testName',
    'testLocation',
    (error, eventId) => {
      if (error) {
        console.error(`Error found! ${error}`);
      }
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

Outra opção é usar um callback onSuccess e onFailure:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod
public void createCalendarEvent(String name, String location, Callback myFailureCallback, Callback mySuccessCallback) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod
  fun createCalendarEvent(
      name: String,
      location: String,
      myFailureCallback: Callback,
      mySuccessCallback: Callback
  ) {}
```

</TabItem>
</Tabs>

Então em JavaScript você pode adicionar um callback separado para respostas de erro e sucesso:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'testName',
    'testLocation',
    error => {
      console.error(`Error found! ${error}`);
    },
    eventId => {
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

### Promises

Módulos nativos também podem cumprir uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), o que pode simplificar seu JavaScript, especialmente quando se usa a sintaxe [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) do ES2016. Quando o último parâmetro de um método de módulo nativo Java/Kotlin é uma Promise, seu método JS correspondente retornará um objeto Promise JS.

Refatorando o código acima para usar uma promise em vez de callbacks fica assim:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import com.facebook.react.bridge.Promise;

@ReactMethod
public void createCalendarEvent(String name, String location, Promise promise) {
    try {
        Integer eventId = ...
        promise.resolve(eventId);
    } catch(Exception e) {
        promise.reject("Create Event Error", e);
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import com.facebook.react.bridge.Promise

@ReactMethod
fun createCalendarEvent(name: String, location: String, promise: Promise) {
    try {
        val eventId = ...
        promise.resolve(eventId)
    } catch (e: Throwable) {
        promise.reject("Create Event Error", e)
    }
}
```

</TabItem>
</Tabs>

:::note
Semelhante aos callbacks, um método de módulo nativo pode rejeitar ou resolver uma promise (mas não ambos) e pode fazer isso no máximo uma vez. Isso significa que você pode chamar um success callback ou um failure callback, mas não ambos, e cada callback só pode ser invocado no máximo uma vez. Um módulo nativo pode, no entanto, armazenar o callback e invocá-lo mais tarde.
:::

A contraparte JavaScript deste método retorna uma Promise. Isso significa que você pode usar a palavra-chave `await` dentro de uma função async para chamá-lo e aguardar seu resultado:

```tsx
const onSubmit = async () => {
  try {
    const eventId = await CalendarModule.createCalendarEvent(
      'Party',
      'My House',
    );
    console.log(`Created a new event with id ${eventId}`);
  } catch (e) {
    console.error(e);
  }
};
```

O método reject aceita diferentes combinações dos seguintes argumentos:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
String code, String message, WritableMap userInfo, Throwable throwable
```

</TabItem>
<TabItem value="kotlin">

```kotlin
code: String, message: String, userInfo: WritableMap, throwable: Throwable
```

</TabItem>
</Tabs>

Para mais detalhes, você pode encontrar a interface `Promise.java` [aqui](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/bridge/Promise.kt). Se `userInfo` não for fornecido, o ReactNative o definirá como null. Para o resto dos parâmetros, o React Native usará um valor padrão. O argumento `message` fornece a `message` de erro mostrada no topo de uma pilha de chamadas de erro. Abaixo está um exemplo da mensagem de erro mostrada em JavaScript a partir da seguinte chamada reject em Java/Kotlin.

Chamada reject em Java/Kotlin:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
promise.reject("Create Event error", "Error parsing date", e);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
promise.reject("Create Event error", "Error parsing date", e)
```

</TabItem>
</Tabs>

Mensagem de erro no App React Native quando a promise é rejeitada:

<figure>
  <img src="/docs/assets/native-modules-android-errorscreen.png" width="200" alt="Image of error message in React Native app." />
  <figcaption>Imagem da mensagem de erro</figcaption>
</figure>

### Enviando Eventos para JavaScript

Módulos nativos podem sinalizar eventos para JavaScript sem serem invocados diretamente. Por exemplo, você pode querer sinalizar para o JavaScript um lembrete de que um evento de calendário do aplicativo de calendário nativo do Android ocorrerá em breve. A maneira mais fácil de fazer isso é usar o `RCTDeviceEventEmitter` que pode ser obtido do `ReactContext` como no trecho de código abaixo.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
...
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
...
private void sendEvent(ReactContext reactContext,
                      String eventName,
                      @Nullable WritableMap params) {
 reactContext
     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
     .emit(eventName, params);
}

private int listenerCount = 0;

@ReactMethod
public void addListener(String eventName) {
  if (listenerCount == 0) {
    // Set up any upstream listeners or background tasks as necessary
  }

  listenerCount += 1;
}

@ReactMethod
public void removeListeners(Integer count) {
  listenerCount -= count;
  if (listenerCount == 0) {
    // Remove upstream listeners, stop unnecessary background tasks
  }
}
...
WritableMap params = Arguments.createMap();
params.putString("eventProperty", "someValue");
...
sendEvent(reactContext, "EventReminder", params);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
...
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
...

private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
}

private var listenerCount = 0

@ReactMethod
fun addListener(eventName: String) {
  if (listenerCount == 0) {
    // Set up any upstream listeners or background tasks as necessary
  }

  listenerCount += 1
}

@ReactMethod
fun removeListeners(count: Int) {
  listenerCount -= count
  if (listenerCount == 0) {
    // Remove upstream listeners, stop unnecessary background tasks
  }
}
...
val params = Arguments.createMap().apply {
    putString("eventProperty", "someValue")
}
...
sendEvent(reactContext, "EventReminder", params)
```

</TabItem>
</Tabs>

Módulos JavaScript podem então se registrar para receber eventos por `addListener` na classe [NativeEventEmitter](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/EventEmitter/NativeEventEmitter.js).

```tsx
import {NativeEventEmitter, NativeModules} from 'react-native';
...
useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    let eventListener = eventEmitter.addListener('EventReminder', event => {
      console.log(event.eventProperty) // "someValue"
    });

    // Removes the listener once unmounted
    return () => {
      eventListener.remove();
    };
  }, []);
```

### Obtendo o Resultado da Activity de startActivityForResult

Você precisará ouvir `onActivityResult` se quiser obter resultados de uma activity que você iniciou com `startActivityForResult`. Para fazer isso, você deve estender `BaseActivityEventListener` ou implementar `ActivityEventListener`. O primeiro é preferível pois é mais resiliente a mudanças de API. Então, você precisa registrar o listener no construtor do módulo assim:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
reactContext.addActivityEventListener(mActivityResultListener);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
reactContext.addActivityEventListener(mActivityResultListener);
```

</TabItem>
</Tabs>

Agora você pode ouvir `onActivityResult` implementando o seguinte método:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public void onActivityResult(
 final Activity activity,
 final int requestCode,
 final int resultCode,
 final Intent intent) {
 // Your logic here
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun onActivityResult(
    activity: Activity?,
    requestCode: Int,
    resultCode: Int,
    intent: Intent?
) {
    // Your logic here
}
```

</TabItem>
</Tabs>

Vamos implementar um seletor de imagens básico para demonstrar isso. O seletor de imagens exporá o método `pickImage` para JavaScript, que retornará o caminho da imagem quando chamado.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```kotlin
public class ImagePickerModule extends ReactContextBaseJavaModule {

  private static final int IMAGE_PICKER_REQUEST = 1;
  private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
  private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
  private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
  private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";

  private Promise mPickerPromise;

  private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
      if (requestCode == IMAGE_PICKER_REQUEST) {
        if (mPickerPromise != null) {
          if (resultCode == Activity.RESULT_CANCELED) {
            mPickerPromise.reject(E_PICKER_CANCELLED, "Image picker was cancelled");
          } else if (resultCode == Activity.RESULT_OK) {
            Uri uri = intent.getData();

            if (uri == null) {
              mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found");
            } else {
              mPickerPromise.resolve(uri.toString());
            }
          }

          mPickerPromise = null;
        }
      }
    }
  };

  ImagePickerModule(ReactApplicationContext reactContext) {
    super(reactContext);

    // Add the listener for `onActivityResult`
    reactContext.addActivityEventListener(mActivityEventListener);
  }

  @Override
  public String getName() {
    return "ImagePickerModule";
  }

  @ReactMethod
  public void pickImage(final Promise promise) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
      return;
    }

    // Store the promise to resolve/reject when picker returns data
    mPickerPromise = promise;

    try {
      final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

      galleryIntent.setType("image/*");

      final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

      currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST);
    } catch (Exception e) {
      mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
      mPickerPromise = null;
    }
  }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
class ImagePickerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var pickerPromise: Promise? = null

    private val activityEventListener =
        object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity?,
                requestCode: Int,
                resultCode: Int,
                intent: Intent?
            ) {
                if (requestCode == IMAGE_PICKER_REQUEST) {
                    pickerPromise?.let { promise ->
                        when (resultCode) {
                            Activity.RESULT_CANCELED ->
                                promise.reject(E_PICKER_CANCELLED, "Image picker was cancelled")
                            Activity.RESULT_OK -> {
                                val uri = intent?.data

                                uri?.let { promise.resolve(uri.toString())}
                                    ?: promise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found")
                            }
                        }

                        pickerPromise = null
                    }
                }
            }
        }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

    override fun getName() = "ImagePickerModule"

    @ReactMethod
    fun pickImage(promise: Promise) {
        val activity = currentActivity

        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
            return
        }

        pickerPromise = promise

        try {
            val galleryIntent = Intent(Intent.ACTION_PICK).apply { type = "image\/*" }

            val chooserIntent = Intent.createChooser(galleryIntent, "Pick an image")

            activity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST)
        } catch (t: Throwable) {
            pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, t)
            pickerPromise = null
        }
    }

    companion object {
        const val IMAGE_PICKER_REQUEST = 1
        const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        const val E_PICKER_CANCELLED = "E_PICKER_CANCELLED"
        const val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
        const val E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND"
    }
}
```

</TabItem>
</Tabs>

### Ouvindo Eventos de Ciclo de Vida

Ouvir os eventos de ciclo de vida da activity, como `onResume`, `onPause` etc., é muito semelhante a como `ActivityEventListener` foi implementado. O módulo deve implementar `LifecycleEventListener`. Então, você precisa registrar um listener no construtor do módulo assim:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
reactContext.addLifecycleEventListener(this);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
reactContext.addLifecycleEventListener(this)
```

</TabItem>
</Tabs>

Agora você pode ouvir os eventos de ciclo de vida da activity implementando os seguintes métodos:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public void onHostResume() {
   // Activity `onResume`
}
@Override
public void onHostPause() {
   // Activity `onPause`
}
@Override
public void onHostDestroy() {
   // Activity `onDestroy`
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun onHostResume() {
    // Activity `onResume`
}

override fun onHostPause() {
    // Activity `onPause`
}

override fun onHostDestroy() {
    // Activity `onDestroy`
}
```

</TabItem>
</Tabs>

### Threading

Até o momento, no Android, todos os métodos assíncronos de módulos nativos executam em uma thread. Módulos nativos não devem fazer nenhuma suposição sobre em qual thread estão sendo chamados, pois a atribuição atual está sujeita a mudanças no futuro. Se uma chamada bloqueante for necessária, o trabalho pesado deve ser despachado para uma thread de trabalho gerenciada internamente, e quaisquer callbacks distribuídos de lá.
