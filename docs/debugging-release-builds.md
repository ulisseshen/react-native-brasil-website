---
ia-translated: true
id: debugging-release-builds
title: Depuração de Builds de Release
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Simbolizando um stack trace

Se um aplicativo React Native lançar uma exceção não tratada em um build de release, a saída pode estar ofuscada e difícil de ler.

```shell
07-15 10:58:25.820 18979 18998 E AndroidRuntime: FATAL EXCEPTION: mqt_native_modules
07-15 10:58:25.820 18979 18998 E AndroidRuntime: Process: com.awesomeproject, PID: 18979 07-15 10:58:25.820 18979 18998 E AndroidRuntime: com.facebook.react.common.JavascriptException: Failed, js engine: hermes, stack:
07-15 10:58:25.820 18979 18998 E AndroidRuntime: p@1:132161
07-15 10:58:25.820 18979 18998 E AndroidRuntime: p@1:132084
07-15 10:58:25.820 18979 18998 E AndroidRuntime: f@1:131854
07-15 10:58:25.820 18979 18998 E AndroidRuntime: anonymous@1:131119
```

No stack trace acima, entradas como `p@1:132161` são nomes de funções minificados e offsets de bytecode. Para depurar essas chamadas, queremos traduzi-las em arquivo, linha e nome de função, por exemplo `AwesomeProject/App.js:54:initializeMap`. Isso é conhecido como **simbolização.**

Você pode simbolizar nomes de funções minificados e bytecode como os acima passando o stack trace e um source map gerado para [`metro-symbolicate`](http://npmjs.com/package/metro-symbolicate).

### Habilitando source maps

Source maps são necessários para simbolizar stack traces. Certifique-se de que os source maps estejam habilitados na configuração de build para a plataforma de destino.

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

:::info
No Android, os source maps são **habilitados** por padrão.
:::

Para habilitar a geração de source maps, certifique-se de que os seguintes `hermesFlags` estejam presentes em `android/app/build.gradle`.

```groovy
react {
    hermesFlags = ["-O", "-output-source-map"]
}
```

Se feito corretamente, você deverá ver a localização de saída do source map durante a saída do build do Metro.

```text
Writing bundle output to:, android/app/build/generated/assets/react/release/index.android.bundle
Writing sourcemap output to:, android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
```

</TabItem>
<TabItem value="ios">

:::info
No iOS, os source maps são **desabilitados** por padrão. Use as instruções a seguir para habilitá-los.
:::

Para habilitar a geração de source maps:

- Abra o Xcode e edite a fase de build "Bundle React Native code and images".
- Acima das outras exportações, adicione uma entrada `SOURCEMAP_FILE` com o caminho de saída desejado.

```diff
+ export SOURCEMAP_FILE="$(pwd)/../main.jsbundle.map"
  WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
```

Se feito corretamente, você deverá ver a localização de saída do source map durante a saída do build do Metro.

```text
Writing bundle output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle
Writing sourcemap output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle.map
```

</TabItem>
</Tabs>

### Usando `metro-symbolicate`

Com os source maps sendo gerados, agora podemos traduzir nossos stack traces.

```shell
# Print usage instructions
npx metro-symbolicate

# From a file containing the stack trace
npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map < stacktrace.txt

# From adb logcat (Android)
adb logcat -d | npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map
```

### Notas sobre source maps

- Vários source maps podem ser gerados pelo processo de build. Certifique-se de usar o que está no local mostrado nos exemplos.
- Certifique-se de que o source map que você usa corresponde ao commit exato do aplicativo com falha. Pequenas alterações no código-fonte podem causar grandes diferenças nos offsets.
- Se o `metro-symbolicate` sair imediatamente com sucesso, certifique-se de que a entrada vem de um pipe ou redirecionamento e não de um terminal.
