<!-- ia-translated: true -->
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import CodeBlock from '@theme/CodeBlock';
import RNTemplateRepoLink from '@site/core/RNTemplateRepoLink';
import {getTemplateBranchNameForCurrentVersion} from '@site/src/getTemplateBranchNameForCurrentVersion';

## Conceitos Chave

As chaves para integrar componentes React Native em sua aplicação Android são:

1. Configurar a estrutura de diretórios correta.
2. Instalar as dependências NPM necessárias.
3. Adicionar React Native à sua configuração Gradle.
4. Escrever o código TypeScript para sua primeira tela React Native.
5. Integrar React Native com seu código Android usando uma ReactActivity.
6. Testar sua integração executando o bundler e vendo sua aplicação em ação.

## Usando o Template da Comunidade

Enquanto você segue este guia, sugerimos que você use o [React Native Community Template](https://github.com/react-native-community/template/) como referência. O template contém uma **aplicação Android mínima** e ajudará você a entender como integrar React Native em uma aplicação Android existente.

## Pré-requisitos

Siga o guia sobre [configuração do seu ambiente de desenvolvimento](set-up-your-environment) e usando [React Native sem um framework](getting-started-without-a-framework) para configurar seu ambiente de desenvolvimento para construir aplicações React Native para Android.
Este guia também assume que você está familiarizado com o básico do desenvolvimento Android, como criar Activities e editar o arquivo `AndroidManifest.xml`.

## 1. Configurar a estrutura de diretórios

Para garantir uma experiência tranquila, crie uma nova pasta para seu projeto React Native integrado e, em seguida, **mova seu projeto Android existente** para a subpasta `/android`.

## 2. Instalar dependências NPM

Vá para o diretório raiz e execute o seguinte comando:

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/package.json`}
</CodeBlock>

Isso copiará o <RNTemplateRepoLink href="template/package.json">arquivo `package.json` do template da Comunidade</RNTemplateRepoLink> para o seu projeto.

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

## 3. Adicionando React Native à sua aplicação

### Configurando o Gradle

React Native usa o React Native Gradle Plugin para configurar suas dependências e configuração do projeto.

Primeiro, vamos editar seu arquivo `settings.gradle` adicionando essas linhas (conforme sugerido no <RNTemplateRepoLink href="template/android/settings.gradle">template da Comunidade</RNTemplateRepoLink>):

```groovy
// Configures the React Native Gradle Settings plugin used for autolinking
pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }
extensions.configure(com.facebook.react.ReactSettingsExtension){ ex -> ex.autolinkLibrariesFromCommand() }
// If using .gradle.kts files:
// extensions.configure<com.facebook.react.ReactSettingsExtension> { autolinkLibrariesFromCommand() }
includeBuild("../node_modules/@react-native/gradle-plugin")

// Include your existing Gradle modules here.
// include(":app")
```

Em seguida, você precisa abrir seu `build.gradle` de nível superior e incluir esta linha (conforme sugerido no <RNTemplateRepoLink href="template/android/build.gradle">template da Comunidade</RNTemplateRepoLink>):

```diff
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.3.1")
+       classpath("com.facebook.react:react-native-gradle-plugin")
    }
}
```

Isso garante que o React Native Gradle Plugin (RNGP) esteja disponível dentro do seu projeto.
Finalmente, adicione essas linhas dentro do arquivo `build.gradle` da sua aplicação (é um arquivo `build.gradle` diferente, geralmente dentro da sua pasta `app` - você pode usar o <RNTemplateRepoLink href="template/android/build.gradle">arquivo do template da Comunidade como referência</RNTemplateRepoLink>):

```diff
apply plugin: "com.android.application"
+apply plugin: "com.facebook.react"

repositories {
    mavenCentral()
}

dependencies {
    // Other dependencies here
+   // Note: we intentionally don't specify the version number here as RNGP will take care of it.
+   // If you don't use the RNGP, you'll have to specify version manually.
+   implementation("com.facebook.react:react-android")
+   implementation("com.facebook.react:hermes-android")
}

+react {
+   // Needed to enable Autolinking - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
+   autolinkLibrariesWithApp()
+}
```

Finalmente, abra o arquivo `gradle.properties` da sua aplicação e adicione a seguinte linha (aqui está o <RNTemplateRepoLink href="template/android/gradle.properties">arquivo do template da Comunidade como referência</RNTemplateRepoLink>):

```diff
+reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
+newArchEnabled=true
+hermesEnabled=true
```

### Configurando seu manifest

Primeiro, certifique-se de que você tem a permissão de Internet em seu `AndroidManifest.xml`:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

+   <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">
    </application>
</manifest>
```

Em seguida, você precisa habilitar [cleartext traffic](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted) em seu `AndroidManifest.xml` de **debug**:

```diff
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
+       android:usesCleartextTraffic="true"
+       tools:targetApi="28"
    />
</manifest>
```

Como de costume, aqui está o arquivo AndroidManifest.xml do template da Comunidade para usar como referência: <RNTemplateRepoLink href="template/android/app/src/main/AndroidManifest.xml">main</RNTemplateRepoLink> e <RNTemplateRepoLink href="template/android/app/src/debug/AndroidManifest.xml">debug</RNTemplateRepoLink>.

Isso é necessário pois sua aplicação se comunicará com seu bundler local, [Metro](https://metrobundler.dev/), via HTTP.

Certifique-se de adicionar isso apenas ao seu manifest de **debug**.

## 4. Escrevendo o Código TypeScript

Agora vamos realmente modificar a aplicação Android nativa para integrar React Native.

O primeiro pedaço de código que escreveremos é o código React Native real para a nova tela que será integrada em nossa aplicação.

### Criar um arquivo `index.js`

Primeiro, crie um arquivo vazio `index.js` na raiz do seu projeto React Native.

`index.js` é o ponto de partida para aplicações React Native e é sempre necessário. Pode ser um arquivo pequeno que faz `import` de outros arquivos que fazem parte do seu componente ou aplicação React Native, ou pode conter todo o código necessário para isso.

Nosso index.js deve ficar assim (aqui está o <RNTemplateRepoLink href="template/index.js">arquivo do template da Comunidade como referência</RNTemplateRepoLink>):

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### Criar um arquivo `App.tsx`

Vamos criar um arquivo `App.tsx`. Este é um arquivo [TypeScript](https://www.typescriptlang.org/) que pode ter expressões [JSX](<https://en.wikipedia.org/wiki/JSX_(JavaScript)>). Ele contém o componente raiz React Native que integraremos em nossa aplicação Android (<RNTemplateRepoLink href="template/App.tsx">link</RNTemplateRepoLink>):

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

## 5. Integrando com seu código Android

Agora precisamos adicionar algum código nativo para iniciar o runtime React Native e instruí-lo a renderizar nossos componentes React.

### Atualizando sua classe Application

Primeiro, precisamos atualizar sua classe `Application` para inicializar corretamente React Native da seguinte forma:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```diff
package <your-package-here>;

import android.app.Application;
+import com.facebook.react.PackageList;
+import com.facebook.react.ReactApplication;
+import com.facebook.react.ReactHost;
+import com.facebook.react.ReactNativeHost;
+import com.facebook.react.ReactPackage;
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
+import com.facebook.react.defaults.DefaultReactHost;
+import com.facebook.react.defaults.DefaultReactNativeHost;
+import com.facebook.soloader.SoLoader;
+import com.facebook.react.soloader.OpenSourceMergedSoMapping
+import java.util.List;

-class MainApplication extends Application {
+class MainApplication extends Application implements ReactApplication {
+ @Override
+ public ReactNativeHost getReactNativeHost() {
+   return new DefaultReactNativeHost(this) {
+     @Override
+     protected List<ReactPackage> getPackages() { return new PackageList(this).getPackages(); }
+     @Override
+     protected String getJSMainModuleName() { return "index"; }
+     @Override
+     public boolean getUseDeveloperSupport() { return BuildConfig.DEBUG; }
+     @Override
+     protected boolean isNewArchEnabled() { return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED; }
+     @Override
+     protected Boolean isHermesEnabled() { return BuildConfig.IS_HERMES_ENABLED; }
+   };
+ }

+ @Override
+ public ReactHost getReactHost() {
+   return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
+ }

  @Override
  public void onCreate() {
    super.onCreate();
+   SoLoader.init(this, OpenSourceMergedSoMapping);
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     DefaultNewArchitectureEntryPoint.load();
+   }
  }
}
```

</TabItem>

<TabItem value="kotlin">

```diff
// package <your-package-here>

import android.app.Application
+import com.facebook.react.PackageList
+import com.facebook.react.ReactApplication
+import com.facebook.react.ReactHost
+import com.facebook.react.ReactNativeHost
+import com.facebook.react.ReactPackage
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
+import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
+import com.facebook.react.defaults.DefaultReactNativeHost
+import com.facebook.soloader.SoLoader
+import com.facebook.react.soloader.OpenSourceMergedSoMapping

-class MainApplication : Application() {
+class MainApplication : Application(), ReactApplication {

+ override val reactNativeHost: ReactNativeHost =
+      object : DefaultReactNativeHost(this) {
+        override fun getPackages(): List<ReactPackage> = PackageList(this).packages
+        override fun getJSMainModuleName(): String = "index"
+        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
+        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
+        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
+      }

+ override val reactHost: ReactHost
+   get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
+   SoLoader.init(this, OpenSourceMergedSoMapping)
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     load()
+   }
  }
}
```

</TabItem>
</Tabs>

Como de costume, aqui está o <RNTemplateRepoLink href="template/android/app/src/main/java/com/helloworld/MainApplication.kt">arquivo do template da Comunidade `MainApplication.kt` como referência</RNTemplateRepoLink>.

#### Criando uma `ReactActivity`

Finalmente, precisamos criar uma nova `Activity` que estenderá `ReactActivity` e hospedará o código React Native. Esta activity será responsável por iniciar o runtime React Native e renderizar o componente React.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
// package <your-package-here>;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MyReactActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "HelloWorld";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(this, getMainComponentName(), DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
// package <your-package-here>

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MyReactActivity : ReactActivity() {

    override fun getMainComponentName(): String = "HelloWorld"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

</TabItem>
</Tabs>

Como de costume, aqui está o <RNTemplateRepoLink href="template/android/app/src/main/java/com/helloworld/MainActivity.kt">arquivo do template da Comunidade `MainActivity.kt` como referência</RNTemplateRepoLink>.

Sempre que você criar uma nova Activity, você precisa adicioná-la ao seu arquivo `AndroidManifest.xml`. Você também precisa definir o tema de `MyReactActivity` para `Theme.AppCompat.Light.NoActionBar` (ou para qualquer tema sem ActionBar), caso contrário sua aplicação renderizará uma ActionBar no topo da sua tela React Native:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">

+     <activity
+       android:name=".MyReactActivity"
+       android:label="@string/app_name"
+       android:theme="@style/Theme.AppCompat.Light.NoActionBar">
+     </activity>
    </application>
</manifest>
```

Agora sua activity está pronta para executar algum código JavaScript.

## 6. Testar sua integração

Você completou todos os passos básicos para integrar React Native com sua aplicação. Agora vamos iniciar o [Metro bundler](https://metrobundler.dev/) para construir seu código de aplicação TypeScript em um bundle. O servidor HTTP do Metro compartilha o bundle de `localhost` no seu ambiente de desenvolvimento para um simulador ou dispositivo. Isso permite [hot reloading](https://reactnative.dev/blog/2016/03/24/introducing-hot-reloading).

Primeiro, você precisa criar um arquivo `metro.config.js` na raiz do seu projeto da seguinte forma:

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

Você pode verificar o <RNTemplateRepoLink href="template/metro.config.js">arquivo `metro.config.js`</RNTemplateRepoLink> do template da Comunidade como referência.

Uma vez que você tenha o arquivo de configuração em vigor, você pode executar o bundler. Execute o seguinte comando no diretório raiz do seu projeto:

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

Agora construa e execute sua aplicação Android normalmente.

Uma vez que você alcance sua Activity alimentada por React dentro da aplicação, ela deve carregar o código JavaScript do servidor de desenvolvimento e exibir:

<center><img src="/docs/assets/EmbeddedAppAndroidVideo.gif" width="300" /></center>

### Criando um build de release no Android Studio

Você pode usar o Android Studio para criar seus builds de release também! É tão rápido quanto criar builds de release da sua aplicação Android nativa previamente existente.

O React Native Gradle Plugin cuidará de fazer o bundle do código JS dentro do seu APK/App Bundle.

Se você não está usando Android Studio, você pode criar um build de release com:

```
cd android
# For a Release APK
./gradlew :app:assembleRelease
# For a Release AAB
./gradlew :app:bundleRelease
```

### E agora?

Neste ponto, você pode continuar desenvolvendo sua aplicação normalmente. Consulte nossa documentação de [debugging](debugging) e [deployment](running-on-device) para saber mais sobre trabalhar com React Native.
