<!-- ia-translated: true -->
# O CLI Codegen

Chamar o Gradle ou chamar manualmente um script pode ser difícil de lembrar e requer muita cerimônia.

Para simplificar, criamos uma ferramenta CLI que pode ajudá-lo a executar essas tarefas: o cli **Codegen**. Este comando executa [@react-native/codegen](https://www.npmjs.com/package/@react-native/codegen) para o seu projeto. As seguintes opções estão disponíveis:

```sh
npx @react-native-community/cli codegen --help
Usage: rnc-cli codegen [options]

Options:
  --verbose            Increase logging verbosity
  --path <path>        Path to the React Native project root. (default: "/Users/MyUsername/projects/my-app")
  --platform <string>  Target platform. Supported values: "android", "ios", "all". (default: "all")
  --outputPath <path>  Path where generated artifacts will be output to.
  -h, --help           display help for command
```

## Exemplos

- Leia `package.json` do diretório de trabalho atual, gere código baseado no seu codegenConfig.

```shell
npx @react-native-community/cli codegen
```

- Leia `package.json` do diretório de trabalho atual, gere código iOS no local definido no codegenConfig.

```shell
npx @react-native-community/cli codegen --platform ios
```

- Leia `package.json` de `third-party/some-library`, gere código Android em `third-party/some-library/android/generated`.

```shell
npx @react-native-community/cli codegen \
    --path third-party/some-library \
    --platform android \
    --outputPath third-party/some-library/android/generated
```

## Incluindo Código Gerado em Bibliotecas

O CLI Codegen é uma ótima ferramenta para desenvolvedores de bibliotecas. Ele pode ser usado para dar uma prévia do código gerado para ver quais interfaces você precisa implementar.

Normalmente o código gerado não é incluído na biblioteca, e o app que usa a biblioteca é responsável por executar o Codegen em tempo de build.
Essa é uma boa configuração para a maioria dos casos, mas o Codegen também oferece um mecanismo para incluir o código gerado na própria biblioteca através da propriedade `includesGeneratedCode`.

É importante entender quais são as implicações de usar `includesGeneratedCode = true`. Incluir o código gerado vem com vários benefícios, como:

- Não há necessidade de depender do app para executar o **Codegen** para você, o código gerado está sempre lá.
- Os arquivos de implementação estão sempre consistentes com as interfaces geradas (isso torna o código da sua biblioteca mais resiliente contra mudanças de API no codegen).
- Não há necessidade de incluir dois conjuntos de arquivos para suportar ambas as arquiteturas no Android. Você pode manter apenas a New Architecture, e é garantido que seja retrocompatível.
- Como todo o código nativo está lá, é possível entregar a parte nativa da biblioteca como um prebuild.

Por outro lado, você também precisa estar ciente de uma desvantagem:

- O código gerado usará a versão do React Native definida dentro da sua biblioteca. Então, se sua biblioteca está sendo entregue com React Native 0.76, o código gerado será baseado nessa versão. Isso pode significar que o código gerado não é compatível com apps usando versões **anteriores** do React Native usadas pelo app (por exemplo, um App rodando no React Native 0.75).

## Habilitando `includesGeneratedCode`

Para habilitar essa configuração:

- Adicione a propriedade `includesGeneratedCode` no campo `codegenConfig` do arquivo `package.json` da sua biblioteca. Defina seu valor como `true`.
- Execute o **Codegen** localmente com o CLI codegen.
- Atualize seu `package.json` para incluir o código gerado.
- Atualize seu `podspec` para incluir o código gerado.
- Atualize seu arquivo `build.Gradle` para incluir o código gerado.
- Atualize `cmakeListsPath` em `react-native.config.js` para que o Gradle não procure pelo arquivo CMakeLists no diretório de build, mas sim no seu outputDir.
