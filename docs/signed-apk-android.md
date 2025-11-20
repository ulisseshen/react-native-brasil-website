---
ia-translated: true
id: signed-apk-android
title: Publicando na Google Play Store
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Android requer que todos os aplicativos sejam assinados digitalmente com um certificado antes que possam ser instalados. Para distribuir seu aplicativo Android via [Google Play store](https://play.google.com/store) ele precisa ser assinado com uma chave de release que então precisa ser usada para todas as atualizações futuras. Desde 2017 é possível para o Google Play gerenciar assinatura de releases automaticamente graças à funcionalidade [App Signing by Google Play](https://developer.android.com/studio/publish/app-signing#app-signing-google-play). No entanto, antes que o binário do seu aplicativo seja enviado para o Google Play ele precisa ser assinado com uma chave de upload. A página [Signing Your Applications](https://developer.android.com/tools/publishing/app-signing.html) na documentação do Android Developers descreve o tópico em detalhes. Este guia cobre o processo brevemente, bem como lista os passos necessários para empacotar o JavaScript bundle.

:::info
Se você está usando Expo, leia o guia do Expo para [Deploying to App Stores](https://docs.expo.dev/distribution/app-stores/) para compilar e enviar seu aplicativo para a Google Play Store. Este guia funciona com qualquer aplicativo React Native para automatizar o processo de implantação.
:::

## Gerando uma chave de upload

Você pode gerar uma chave de assinatura privada usando `keytool`.

### Windows

No Windows, `keytool` deve ser executado de `C:\Program Files\Java\jdkx.x.x_x\bin`, como administrador.

```shell
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Este comando solicita senhas para o keystore e chave e para os campos Distinguished Name para sua chave. Ele então gera o keystore como um arquivo chamado `my-upload-key.keystore`.

O keystore contém uma única chave, válida por 10000 dias. O alias é um nome que você usará posteriormente ao assinar seu aplicativo, então lembre-se de anotar o alias.

### macOS

No macOS, se você não tem certeza onde está a pasta bin do seu JDK, execute o seguinte comando para encontrá-la:

```shell
/usr/libexec/java_home
```

Ele retornará o diretório do JDK, que se parecerá com isto:

```shell
/Library/Java/JavaVirtualMachines/jdkX.X.X_XXX.jdk/Contents/Home
```

Navegue até esse diretório usando o comando `cd /your/jdk/path` e use o comando keytool com permissão sudo conforme mostrado abaixo.

```shell
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

:::caution
Lembre-se de manter o arquivo keystore privado. Caso você tenha perdido a chave de upload ou ela foi comprometida, você deve [seguir estas instruções](https://support.google.com/googleplay/android-developer/answer/7384423#reset).
:::

## Configurando variáveis do Gradle

1. Coloque o arquivo `my-upload-key.keystore` sob o diretório `android/app` na pasta do seu projeto.
2. Edite o arquivo `~/.gradle/gradle.properties` ou `android/gradle.properties`, e adicione o seguinte (substitua `*****` com a senha correta do keystore, alias e senha da chave),

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

Essas serão variáveis globais do Gradle, que podemos usar posteriormente em nossa config do Gradle para assinar nosso aplicativo.

:::note Nota sobre uso do git
Salvar as variáveis do Gradle acima em `~/.gradle/gradle.properties` em vez de `android/gradle.properties` as impede de serem verificadas no git. Você pode ter que criar o arquivo `~/.gradle/gradle.properties` no diretório home do seu usuário antes de poder adicionar as variáveis.
:::

:::note Nota sobre segurança
Se você não quer armazenar suas senhas em texto simples, e está executando macOS, você também pode [armazenar suas credenciais no aplicativo Keychain Access](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/). Então você pode pular as duas últimas linhas em `~/.gradle/gradle.properties`.
:::

## Adicionando config de assinatura ao Gradle config do seu aplicativo

O último passo de configuração que precisa ser feito é configurar builds de release para serem assinadas usando a chave de upload. Edite o arquivo `android/app/build.gradle` na pasta do seu projeto, e adicione a config de assinatura,

```groovy
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

## Gerando o AAB de release

Execute o seguinte comando em um terminal:

```shell
npx react-native build-android --mode=release
```

Este comando usa o `bundleRelease` do Gradle nos bastidores que empacota todo o JavaScript necessário para executar seu aplicativo no AAB ([Android App Bundle](https://developer.android.com/guide/app-bundle)). Se você precisa mudar a maneira como o JavaScript bundle e/ou recursos drawable são empacotados (por exemplo, se você mudou os nomes padrão de arquivo/pasta ou a estrutura geral do projeto), dê uma olhada em `android/app/build.gradle` para ver como você pode atualizá-lo para refletir essas mudanças.

:::note
Certifique-se de que `gradle.properties` não inclua `org.gradle.configureondemand=true` pois isso fará a build de release pular o bundling de JS e assets no binário do aplicativo.
:::

O AAB gerado pode ser encontrado em `android/app/build/outputs/bundle/release/app-release.aab`, e está pronto para ser enviado para o Google Play.

Para que o Google Play aceite o formato AAB, o App Signing by Google Play precisa ser configurado para seu aplicativo no Google Play Console. Se você está atualizando um aplicativo existente que não usa App Signing by Google Play, consulte nossa [seção de migração](#migrating-old-android-react-native-apps-to-use-app-signing-by-google-play) para aprender como executar essa mudança de configuração.

## Testando a build de release do seu aplicativo

Antes de enviar a build de release para a Play Store, certifique-se de testá-la completamente. Primeiro desinstale qualquer versão anterior do aplicativo que você já tenha instalado. Instale-a no dispositivo usando o seguinte comando na raiz do projeto:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android -- --mode="release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android --mode release
```

</TabItem>
</Tabs>

Note que `--mode release` só está disponível se você configurou a assinatura conforme descrito acima.

Você pode terminar quaisquer instâncias de bundler em execução, pois todo o seu código framework e JavaScript está empacotado nos assets do APK.

## Publicando em outras lojas

Por padrão, o APK gerado tem o código nativo para arquiteturas de CPU `x86`, `x86_64`, `ARMv7a` e `ARM64-v8a`. Isso torna mais fácil compartilhar APKs que rodam em quase todos os dispositivos Android. No entanto, isso tem a desvantagem de que haverá algum código nativo não utilizado em qualquer dispositivo, levando a APKs desnecessariamente maiores.

Você pode criar um APK para cada CPU adicionando a seguinte linha em seu arquivo `android/app/build.gradle`:

```diff
android {

    splits {
        abi {
            reset()
            enable true
            universalApk false
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }
    }

}
```

Envie esses arquivos para mercados que suportam segmentação de dispositivos, como [Amazon AppStore](https://developer.amazon.com/docs/app-submission/device-filtering-and-compatibility.html) ou [F-Droid](https://f-droid.org/en/), e os usuários receberão automaticamente o APK apropriado. Se você quiser enviar para outros mercados, como [APKFiles](https://www.apkfiles.com/), que não suportam múltiplos APKs para um único aplicativo, mude a linha `universalApk false` para `true` para criar o APK universal padrão com binários para ambas CPUs.

Observe que você também terá que configurar códigos de versão distintos, conforme [sugerido nesta página](https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions) da documentação oficial do Android.

## Habilitando Proguard para reduzir o tamanho do APK (opcional)

Proguard é uma ferramenta que pode reduzir ligeiramente o tamanho do APK. Faz isso removendo partes do bytecode Java do React Native (e suas dependências) que seu aplicativo não está usando.

:::caution Importante
Certifique-se de testar seu aplicativo completamente se você habilitou o Proguard. Proguard frequentemente requer configuração específica para cada biblioteca nativa que você está usando. Veja `app/proguard-rules.pro`.
:::

Para habilitar o Proguard, edite `android/app/build.gradle`:

```groovy
/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```

## Migrando aplicativos React Native Android antigos para usar App Signing by Google Play

Se você está migrando de versão anterior do React Native, há chances de seu aplicativo não usar o recurso App Signing by Google Play. Recomendamos que você habilite isso para tirar vantagem de coisas como divisão automática de aplicativo. Para migrar da maneira antiga de assinar, você precisa começar [gerando nova chave de upload](#generating-an-upload-key) e então substituir a config de assinatura de release em `android/app/build.gradle` para usar a chave de upload em vez da de release (veja seção sobre [adicionar config de assinatura ao gradle](#adding-signing-config-to-your-apps-gradle-config)). Uma vez feito isso, você deve seguir as [instruções do site de Ajuda do Google Play](https://support.google.com/googleplay/android-developer/answer/7384423) para enviar sua chave de release original para o Google Play.

## Permissões Padrão

Por padrão, a permissão `INTERNET` é adicionada ao seu aplicativo Android, pois praticamente todos os aplicativos a usam. A permissão `SYSTEM_ALERT_WINDOW` é adicionada ao seu APK Android no modo debug, mas será removida em produção.
