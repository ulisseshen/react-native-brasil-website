---
ia-translated: true
id: react-native-gradle-plugin
title: React Native Gradle Plugin
---

Este guia descreve como configurar o **React Native Gradle Plugin** (frequentemente referido como RNGP), ao compilar seu aplicativo React Native para Android.

## Usando o plugin

O React Native Gradle Plugin é distribuído como um pacote NPM separado que é instalado automaticamente com `react-native`.

O plugin já está **configurado** para novos projetos criados usando `npx react-native init`. Você não precisa fazer nenhuma etapa extra para instalá-lo se criou seu aplicativo com este comando.

Se você está integrando React Native em um projeto existente, consulte [a página correspondente](/docs/next/integration-with-existing-apps#configuring-gradle): ela contém instruções específicas sobre como instalar o plugin.

## Configurando o plugin

Por padrão, o plugin funcionará **out of the box** com padrões sensatos. Você deve consultar este guia e personalizar o comportamento apenas se precisar.

Para configurar o plugin, você pode modificar o bloco `react`, dentro do seu `android/app/build.gradle`:

```groovy
apply plugin: "com.facebook.react"

/**
 * This is the configuration block to customize your React Native Android app.
 * By default you don't need to apply any configuration, just uncomment the lines you need.
 */
react {
  // Custom configuration goes here.
}
```

Cada chave de configuração é descrita abaixo:

### `root`

Esta é a pasta raiz do seu projeto React Native, ou seja, onde o arquivo `package.json` reside. O padrão é `..`. Você pode personalizá-la da seguinte forma:

```groovy
root = file("../")
```

### `reactNativeDir`

Esta é a pasta onde o pacote `react-native` reside. O padrão é `../node_modules/react-native`.
Se você está em um monorepo ou usando um gerenciador de pacotes diferente, você pode ajustar `reactNativeDir` para sua configuração.

Você pode personalizá-la da seguinte forma:

```groovy
reactNativeDir = file("../node_modules/react-native")
```

### `codegenDir`

Esta é a pasta onde o pacote `react-native-codegen` reside. O padrão é `../node_modules/react-native-codegen`.
Se você está em um monorepo ou usando um gerenciador de pacotes diferente, você pode ajustar `codegenDir` para sua configuração.

Você pode personalizá-la da seguinte forma:

```groovy
codegenDir = file("../node_modules/@react-native/codegen")
```

### `cliFile`

Este é o arquivo de ponto de entrada para o React Native CLI. O padrão é `../node_modules/react-native/cli.js`.
O arquivo de ponto de entrada é necessário pois o plugin precisa invocar o CLI para bundling e criação do seu aplicativo.

Se você está em um monorepo ou usando um gerenciador de pacotes diferente, você pode ajustar `cliFile` para sua configuração.
Você pode personalizá-la da seguinte forma:

```groovy
cliFile = file("../node_modules/react-native/cli.js")
```

### `debuggableVariants`

Esta é a lista de variants que são debugáveis (veja [usando variants](#using-flavors--build-variants) para mais contexto sobre variants).

Por padrão, o plugin está considerando como `debuggableVariants` apenas `debug`, enquanto `release` não é. Se você tem outras
variants (como `staging`, `lite`, etc.) você precisará ajustar isso de acordo.

Variants que estão listadas como `debuggableVariants` não virão com um bundle empacotado, então você precisará do Metro para executá-las.

Você pode personalizá-la da seguinte forma:

```groovy
debuggableVariants = ["liteDebug", "prodDebug"]
```

### `nodeExecutableAndArgs`

Esta é a lista de comandos node e argumentos que devem ser invocados para todos os scripts. Por padrão é `[node]` mas pode ser personalizado para adicionar flags extras da seguinte forma:

```groovy
nodeExecutableAndArgs = ["node"]
```

### `bundleCommand`

Este é o nome do comando `bundle` a ser invocado ao criar o bundle para seu aplicativo. Isso é útil se você está usando [RAM Bundles](https://reactnative.dev/docs/0.74/ram-bundles-inline-requires). Por padrão é `bundle` mas pode ser personalizado para adicionar flags extras da seguinte forma:

```groovy
bundleCommand = "ram-bundle"
```

### `bundleConfig`

Este é o caminho para um arquivo de configuração que será passado para `bundle --config <file>` se fornecido. O padrão é vazio (nenhum arquivo de config será fornecido). Mais informações sobre arquivos de config de bundling podem ser encontradas [na documentação do CLI](https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle). Pode ser personalizado da seguinte forma:

```groovy
bundleConfig = file(../rn-cli.config.js)
```

### `bundleAssetName`

Este é o nome do arquivo de bundle que deve ser gerado. O padrão é `index.android.bundle`. Pode ser personalizado da seguinte forma:

```groovy
bundleAssetName = "MyApplication.android.bundle"
```

### `entryFile`

O arquivo de entrada usado para geração de bundle. O padrão é procurar por `index.android.js` ou `index.js`. Pode ser personalizado da seguinte forma:

```groovy
entryFile = file("../js/MyApplication.android.js")
```

### `extraPackagerArgs`

Uma lista de flags extras que serão passadas para o comando `bundle`. A lista de flags disponíveis está na [documentação do CLI](https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle). O padrão é vazio. Pode ser personalizado da seguinte forma:

```groovy
extraPackagerArgs = []
```

### `hermesCommand`

O caminho para o comando `hermesc` (o Hermes Compiler). React Native vem com uma versão do Hermes compiler empacotada com ele, então você geralmente não precisará personalizar isso. O plugin usará o compilador correto para seu sistema por padrão.

### `hermesFlags`

A lista de flags para passar para `hermesc`. Por padrão é `["-O", "-output-source-map"]`. Você pode personalizá-la da seguinte forma

```groovy
hermesFlags = ["-O", "-output-source-map"]
```

### `enableBundleCompression`

Se o Bundle Asset deve ser comprimido quando empacotado em um `.apk`, ou não.

Desabilitar a compressão para o `.bundle` permite que ele seja diretamente mapeado em memória RAM, melhorando o tempo de inicialização - ao custo de um tamanho de aplicativo maior em disco. Observe que o tamanho de download do `.apk` será praticamente inalterado pois os arquivos `.apk` são comprimidos antes de fazer download

Por padrão isso está desabilitado, e você não deve ativá-lo, a menos que esteja realmente preocupado com o espaço em disco para seu aplicativo.

## Usando Flavors & Build Variants

Ao compilar aplicativos Android, você pode querer usar [custom flavors](https://developer.android.com/studio/build/build-variants#product-flavors) para ter versões diferentes do seu aplicativo a partir do mesmo projeto.

Consulte o [guia oficial do Android](https://developer.android.com/studio/build/build-variants) para configurar build types customizados (como `staging`) ou flavors customizados (como `full`, `lite`, etc.).
Por padrão, novos aplicativos são criados com dois build types (`debug` e `release`) e nenhum flavor customizado.

A combinação de todos os build types e todos os flavors gera um conjunto de **build variants**. Por exemplo, para build types `debug`/`staging`/`release` e flavors `full`/`lite` você terá 6 build variants: `fullDebug`, `fullStaging`, `fullRelease` e assim por diante.

Se você está usando variants customizadas além de `debug` e `release`, você precisa instruir o React Native Gradle Plugin especificando quais das suas variants são **debugáveis** usando a configuração [`debuggableVariants`](#debuggablevariants) da seguinte forma:

```diff
apply plugin: "com.facebook.react"

react {
+ debuggableVariants = ["fullStaging", "fullDebug"]
}
```

Isso é necessário porque o plugin pulará o bundling de JS para todas as `debuggableVariants`: você precisará do Metro para executá-las. Por exemplo, se você listar `fullStaging` nas `debuggableVariants`, você não poderá publicá-la em uma loja, pois estará faltando o bundle.

## O que o plugin está fazendo nos bastidores?

O React Native Gradle Plugin é responsável por configurar a build do seu Application para enviar aplicativos React Native para produção.
O plugin também é usado dentro de bibliotecas de terceiros, para executar o [Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md) usado para a New Architecture.

Aqui está um resumo das responsabilidades do plugin:

- Adicionar uma task `createBundle<Variant>JsAndAssets` para cada variant não debugável, que é responsável por invocar os comandos `bundle`, `hermesc` e `compose-source-map`.
- Configurar a versão correta da dependência `com.facebook.react:react-android` e `com.facebook.react:hermes-android`, lendo a versão do React Native do `package.json` de `react-native`.
- Configurar os repositórios Maven apropriados (Maven Central, Google Maven Repo, JSC local Maven repo, etc.) necessários para consumir todas as dependências Maven necessárias.
- Configurar o NDK para permitir que você compile aplicativos que estão usando a New Architecture.
- Configurar os `buildConfigFields` para que você possa saber em tempo de execução se Hermes ou a New Architecture estão habilitados.
- Configurar a porta do Metro DevServer como um recurso Android para que o aplicativo saiba em qual porta se conectar.
- Invocar o [React Native Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md) se uma biblioteca ou aplicativo estiver usando o Codegen para a New Architecture.
