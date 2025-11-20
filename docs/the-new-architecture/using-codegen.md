<!-- ia-translated: true -->
import CodeBlock from '@theme/CodeBlock';
import {getCurrentVersion} from '@site/src/getCurrentVersion';

# Usando o Codegen

Este guia ensina como:

- Configurar o **Codegen**.
- Invocá-lo manualmente para cada plataforma.

Ele também descreve o código gerado.

## Pré-requisitos

Você sempre precisa de um app React Native para gerar o código adequadamente, mesmo ao invocar o **Codegen** manualmente.

O processo do **Codegen** está fortemente acoplado com a compilação do app, e os scripts estão localizados no pacote NPM `react-native`.

Para fins deste guia, crie um projeto usando o React Native CLI da seguinte forma:

<CodeBlock language="bash" title="shell">
{`npx @react-native-community/cli@latest init SampleApp --version ${getCurrentVersion()}`}
</CodeBlock>

O **Codegen** é usado para gerar o código de integração (glue-code) para seus módulos ou componentes personalizados. Veja os guias para Turbo Native Modules e Fabric Native Components para mais detalhes sobre como criá-los.

<!-- TODO: add links -->

## Configurando o **Codegen**

O **Codegen** pode ser configurado no seu app modificando o arquivo `package.json`. O **Codegen** é controlado por um campo customizado chamado `codegenConfig`.

```json title="package.json"
  "codegenConfig": {
    "name": "<SpecName>",
    "type": "<types>",
    "jsSrcsDir": "<source_dir>",
    "android": {
      "javaPackageName": "<java.package.name>"
    },
    "ios": {
      "modules": {
        "TestModule": {
          "className": "<iOS-class-implementing-the-RCTModuleProvider-protocol>",
          "unstableRequiresMainQueueSetup": false,
          "conformsToProtocols": ["RCTImageURLLoader", "RCTURLRequestHandler", "RCTImageDataDecoder"],
        }
      },
      "components": {
        "TestComponent": {
          "className": "<iOS-class-implementing-the-component>"
        }
      }
    }
  },
```

Você pode adicionar este trecho ao seu app e personalizar os vários campos:

- `name:` Nome da configuração do codegen. Isso personalizará a saída do codegen: os nomes de arquivo e o código.
- `type:`
  - `modules:` Gerar código apenas para módulos.
  - `components:` Gerar código apenas para componentes.
  - `all`: Gerar código para tudo.
- `jsSrcsDir`: A pasta raiz onde todas as suas specs vivem.
- `android`: Configuração do Codegen para Android (tudo opcional):
  - `.javaPackageName`: Configurar o nome do pacote da saída do codegen Java do Android.
- `ios`: Configuração do Codegen para iOS (tudo opcional):
  - `.modules[moduleName]:`
    - `.className`: A classe ObjC deste módulo. Ou, se for um [módulo somente C++](/docs/next/the-new-architecture/pure-cxx-modules), sua classe `RCTModuleProvider`.
    - `.unstableRequiresMainQueueSetup`: Inicializar este módulo na UI Thread, antes de executar qualquer JavaScript.
    - `.conformsToProtocols`: Anotar a quais destes protocolos este módulo está em conformidade com qualquer um dos seguintes protocolos: [`RCTImageURLLoader`](https://github.com/facebook/react-native/blob/00d5caee9921b6c10be8f7d5b3903c6afe8dbefa/packages/react-native/Libraries/Image/RCTImageURLLoader.h#L26-L81), [`RCTURLRequestHandler`](https://github.com/facebook/react-native/blob/00d5caee9921b6c10be8f7d5b3903c6afe8dbefa/packages/react-native/React/Base/RCTURLRequestHandler.h#L11-L52), [`RCTImageDataDecoder`](https://github.com/facebook/react-native/blob/00d5caee9921b6c10be8f7d5b3903c6afe8dbefa/packages/react-native/Libraries/Image/RCTImageDataDecoder.h#L15-L53).
  - `.components[componentName]`:
    - `.className`: A classe ObjC deste componente (ex: `TextInput` -> `RCTTextInput`).

Quando o **Codegen** executa, ele busca entre todas as dependências do app, procurando por arquivos JS que respeitam algumas convenções específicas, e gera o código necessário:

- Turbo Native Modules requerem que os arquivos de spec sejam prefixados com `Native`. Por exemplo, `NativeLocalStorage.ts` é um nome válido para um arquivo de spec.
- Native Fabric Components requerem que os arquivos de spec sejam sufixados com `NativeComponent`. Por exemplo, `WebViewNativeComponent.ts` é um nome válido para um arquivo de spec.

## Executando o **Codegen**

O restante deste guia assume que você já tem um Native Turbo Module, um Native Fabric Component ou ambos configurados no seu projeto. Também assumimos que você tem arquivos de especificação válidos no `jsSrcsDir` especificado no `package.json`.

### Android

O **Codegen** para Android está integrado com o React Native Gradle Plugin (RNGP). O RNGP contém uma tarefa que pode ser invocada e que lê as configurações definidas no arquivo `package.json` e executa o **Codegen**. Para executar a tarefa gradle, primeiro navegue dentro da pasta `android` do seu projeto. Então execute:

```bash
./gradlew generateCodegenArtifactsFromSchema
```

Esta tarefa invoca o comando `generateCodegenArtifactsFromSchema` em todos os projetos importados do app (o app e todos os módulos node que estão vinculados a ele). Ela gera o código na pasta `node_modules/<dependency>` correspondente. Por exemplo, se você tem um Fabric Native Component cujo módulo Node é chamado `my-fabric-component`, o código gerado está localizado no caminho `SampleApp/node_modules/my-fabric-component/android/build/generated/source/codegen`. Para o app, o código é gerado na pasta `android/app/build/generated/source/codegen`.

#### O Código Gerado

Após executar o comando gradle acima, você encontrará o código do codegen na pasta `SampleApp/android/app/build`. A estrutura ficará assim:

```
build
└── generated
    └── source
        └── codegen
            ├── java
            │   └── com
            │       ├── facebook
            │       │   └── react
            │       │       └── viewmanagers
            │       │           ├── <nativeComponent>ManagerDelegate.java
            │       │           └── <nativeComponent>ManagerInterface.java
            │       └── sampleapp
            │           └── NativeLocalStorageSpec.java
            ├── jni
            │   ├── <codegenConfig.name>-generated.cpp
            │   ├── <codegenConfig.name>.h
            │   ├── CMakeLists.txt
            │   └── react
            │       └── renderer
            │           └── components
            │               └── <codegenConfig.name>
            │                   ├── <codegenConfig.name>JSI-generated.cpp
            │                   ├── <codegenConfig.name>.h
            │                   ├── ComponentDescriptors.cpp
            │                   ├── ComponentDescriptors.h
            │                   ├── EventEmitters.cpp
            │                   ├── EventEmitters.h
            │                   ├── Props.cpp
            │                   ├── Props.h
            │                   ├── ShadowNodes.cpp
            │                   ├── ShadowNodes.h
            │                   ├── States.cpp
            │                   └── States.h
            └── schema.json
```

O código gerado é dividido em duas pastas:

- `java` que contém o código específico da plataforma
- `jni` que contém o código C++ necessário para permitir que JS e Java interajam corretamente.

Na pasta `java`, você pode encontrar o código gerado do Fabric Native component na subpasta `com/facebook/viewmanagers`.

- o `<nativeComponent>ManagerDelegate.java` contém os métodos que o `ViewManager` pode chamar no Native Component customizado
- o `<nativeComponent>ManagerInterface.java` contém a interface do `ViewManager`.

Na pasta cujo nome foi definido no `codegenConfig.android.javaPackageName`, por outro lado, você pode encontrar a classe abstrata que um Turbo Native Module deve implementar para realizar suas tarefas.

Na pasta `jni`, finalmente, há todo o código boilerplate para conectar JS ao Android.

- `<codegenConfig.name>.h` contém a interface dos seus Turbo Native Modules C++ customizados.
- `<codegenConfig.name>-generated.cpp` contém o código de integração dos seus Turbo Native Modules C++ customizados.
- `react/renderer/components/<codegenConfig.name>`: esta pasta contém todo o código de integração necessário pelo seu componente customizado.

Esta estrutura foi gerada usando o valor `all` para o campo `codegenConfig.type`. Se você usar o valor `modules`, espere não ver nenhuma pasta `react/renderer/components/`. Se você usar o valor `components`, espere não ver nenhum dos outros arquivos.

### iOS

O **Codegen** para iOS depende de alguns scripts Node que são invocados durante o processo de compilação. Os scripts estão localizados na pasta `SampleApp/node_modules/react-native/scripts/`.

O script principal é o `generate-codegen-artifacts.js`. Para invocar o script, você pode executar este comando a partir da pasta raiz do seu app:

```bash
node node_modules/react-native/scripts/generate-codegen-artifacts.js

Usage: generate-codegen-artifacts.js -p [path to app] -t [target platform] -o [output path]

Options:
      --help            Show help                                      [boolean]
      --version         Show version number                            [boolean]
  -p, --path            Path to the React Native project root.        [required]
  -t, --targetPlatform  Target platform. Supported values: "android", "ios",
                        "all".                                        [required]
  -o, --outputPath      Path where generated artifacts will be output to.
```

onde:

- `--path` é o caminho para a pasta raiz do seu app.
- `--outputPath` é o destino onde o **Codegen** escreverá os arquivos gerados.
- `--targetPlatform` é a plataforma para a qual você gostaria de gerar o código.

#### O Código Gerado

Executando o script com estes argumentos:

```shell
node node_modules/react-native/scripts/generate-codegen-artifacts.js \
    --path . \
    --outputPath ios/ \
    --targetPlatform ios
```

Irá gerar estes arquivos na pasta `ios/build`:

```
build
└── generated
    └── ios
        ├── <codegenConfig.name>
        │   ├── <codegenConfig.name>-generated.mm
        │   └── <codegenConfig.name>.h
        ├── <codegenConfig.name>JSI-generated.cpp
        ├── <codegenConfig.name>JSI.h
        ├── FBReactNativeSpec
        │   ├── FBReactNativeSpec-generated.mm
        │   └── FBReactNativeSpec.h
        ├── FBReactNativeSpecJSI-generated.cpp
        ├── FBReactNativeSpecJSI.h
        ├── RCTModulesConformingToProtocolsProvider.h
        ├── RCTModulesConformingToProtocolsProvider.mm
        └── react
            └── renderer
                └── components
                    └── <codegenConfig.name>
                        ├── ComponentDescriptors.cpp
                        ├── ComponentDescriptors.h
                        ├── EventEmitters.cpp
                        ├── EventEmitters.h
                        ├── Props.cpp
                        ├── Props.h
                        ├── RCTComponentViewHelpers.h
                        ├── ShadowNodes.cpp
                        ├── ShadowNodes.h
                        ├── States.cpp
                        └── States.h
```

Parte desses arquivos gerados são usados pelo React Native no Core. Depois há um conjunto de arquivos que contêm o mesmo nome que você especificou no campo `codegenConfig.name` do package.json.

- `<codegenConfig.name>/<codegenConfig.name>.h`: contém a interface dos seus Turbo Native Modules iOS customizados.
- `<codegenConfig.name>/<codegenConfig.name>-generated.mm`: contém o código de integração dos seus Turbo Native Modules iOS customizados.
- `<codegenConfig.name>JSI.h`: contém a interface dos seus Turbo Native Modules C++ customizados.
- `<codegenConfig.name>JSI-generated.h`: contém o código de integração dos seus Turbo Native Modules C++ customizados.
- `react/renderer/components/<codegenConfig.name>`: esta pasta contém todo o código de integração necessário pelo seu componente customizado.

Esta estrutura foi gerada usando o valor `all` para o campo `codegenConfig.type`. Se você usar o valor `modules`, espere não ver nenhuma pasta `react/renderer/components/`. Se você usar o valor `components`, espere não ver nenhum dos outros arquivos.
