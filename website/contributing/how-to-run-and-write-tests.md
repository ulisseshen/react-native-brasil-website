---
ia-translated: true
title: Como Executar e Escrever Testes
---

## Executando Testes

Esta seção é sobre testar suas alterações no React Native como contribuidor. Se você ainda não o fez, siga os passos para configurar seu ambiente de desenvolvimento para [construir projetos com código nativo](/docs/environment-setup).

### Testes JavaScript

A maneira mais simples de executar a suíte de testes JavaScript é usando o seguinte comando na raiz do seu checkout do React Native:

```bash
yarn test
```

Isso executará os testes usando [Jest](https://jestjs.io).

Você também deve garantir que seu código passe nos testes de [Flow](https://flowtype.org/) e lint:

```bash
yarn flow
yarn lint
```

### Testes iOS

Siga as instruções do [README.md](https://github.com/facebook/react-native/blob/main/packages/rn-tester/README.md) no diretório `packages/rn-tester`.

Em seguida, volte para a raiz do seu checkout do React Native e execute `yarn`. Isso configurará suas dependências JavaScript.

Neste ponto, você pode executar os testes iOS invocando o seguinte script da raiz do seu checkout do React Native:

```bash
./scripts/objc-test.sh test
```

Você também pode usar o Xcode para executar testes iOS. Abra `RNTester/RNTesterPods.xcworkspace` e execute os testes localmente pressionando <kbd>Command + U</kbd> ou selecionando `Product` e depois `Test` na barra de menu.

O Xcode também permite executar testes individuais através do Test Navigator. Você também pode usar o atalho <kbd>Command + 6</kbd>.

:::note
`objc-test.sh` garante que seu ambiente de teste está configurado para executar todos os testes. Ele também desabilita testes que são conhecidos por serem instáveis ou quebrados. Tenha isso em mente ao executar testes usando o Xcode. Se você ver uma falha inesperada, verifique primeiro se está desabilitado em `objc-test.sh`.
:::

#### Testes iOS Podfile/Ruby

Se você está fazendo modificações nas configurações do `Podfile`, então há testes Ruby que podem verificá-las.

Para executar os testes ruby:

```bash
cd scripts
sh run_ruby_tests.sh
```

### Testes Android

Os testes unitários Android não executam em um emulador, mas executam na JVM em sua máquina local.

Para executar os testes unitários Android, invoque o seguinte script da raiz do seu checkout do React Native:

```bash
./gradlew test
```

## Escrevendo Testes

Sempre que você estiver corrigindo um bug ou adicionando nova funcionalidade ao React Native, é uma boa ideia adicionar um teste que cubra isso. Dependendo da mudança que você está fazendo, existem diferentes tipos de testes que podem ser apropriados.

### Testes JavaScript

Os testes JavaScript podem ser encontrados dentro de diretórios `__test__`, colocados ao lado dos arquivos que estão sendo testados. Veja [`TouchableHighlight-test.js`][js-jest-test] para um exemplo básico. Você também pode seguir o tutorial [Testing React Native Apps][jest-tutorial] do Jest para aprender mais.

[js-jest-test]: https://github.com/facebook/react-native/blob/main/Libraries/Components/Touchable/__tests__/TouchableHighlight-test.js
[jest-tutorial]: https://jestjs.io/docs/en/tutorial-react-native

### Testes de Integração iOS

O React Native fornece facilidades para tornar mais fácil testar componentes integrados que requerem que componentes nativos e JS se comuniquem através da bridge.

Os dois componentes principais são `RCTTestRunner` e `RCTTestModule`. O `RCTTestRunner` configura o ambiente React Native e fornece facilidades para executar os testes como `XCTestCase`s no Xcode (`runTest:module` é o método mais simples). O `RCTTestModule` é exportado para JavaScript como `NativeModules.TestModule`.

Os testes em si são escritos em JS e devem chamar `TestModule.markTestCompleted()` quando terminarem, caso contrário o teste expirará e falhará.

Falhas de teste são indicadas principalmente lançando uma exceção JS. Também é possível testar condições de erro com `runTest:module:initialProps:expectErrorRegex:` ou `runTest:module:initialProps:expectErrorBlock:` que esperarão que um erro seja lançado e verificarão se o erro corresponde aos critérios fornecidos.

Veja o seguinte para exemplos de uso e pontos de integração:

- [`IntegrationTestHarnessTest.js`][f-ios-test-harness]
- [`RNTesterIntegrationTests.m`][f-ios-integration-tests]
- [`IntegrationTestsApp.js`][f-ios-integration-test-app]

[f-ios-test-harness]: https://github.com/facebook/react-native/blob/main/IntegrationTests/IntegrationTestHarnessTest.js
[f-ios-integration-tests]: https://github.com/facebook/react-native/blob/main/RNTester/RNTesterIntegrationTests/RNTesterIntegrationTests.m
[f-ios-integration-test-app]: https://github.com/facebook/react-native/blob/main/IntegrationTests/IntegrationTestsApp.js

### Testes de Snapshot iOS

Um tipo comum de teste de integração é o teste de snapshot. Esses testes renderizam um componente e verificam snapshots da tela contra imagens de referência usando `TestModule.verifySnapshot()`, usando a biblioteca [`FBSnapshotTestCase`](https://github.com/facebook/ios-snapshot-test-case) nos bastidores. Imagens de referência são gravadas definindo `recordMode = YES` no `RCTTestRunner` e então executando os testes.

Snapshots diferirão ligeiramente entre 32 e 64 bits e várias versões do SO, então é recomendado que você force a execução dos testes com a [configuração correta](https://github.com/facebook/react-native/blob/main/scripts/.tests.env).

Também é altamente recomendado que todos os dados de rede sejam mockados, junto com outras dependências potencialmente problemáticas. Veja [`SimpleSnapshotTest`](https://github.com/facebook/react-native/blob/main/IntegrationTests/SimpleSnapshotTest.js) para um exemplo básico.

Se você fizer uma alteração que afeta um teste de snapshot em um pull request, como adicionar um novo caso de exemplo a um dos exemplos que é capturado em snapshot, você precisará regravar a imagem de referência do snapshot.

Para fazer isso, altere a flag `recordMode` para `_runner.recordMode = YES;` em [RNTester/RNTesterSnapshotTests.m](https://github.com/facebook/react-native/blob/136666e2e7d2bb8d3d51d599fc1384a2f68c43d3/RNTester/RNTesterIntegrationTests/RNTesterSnapshotTests.m#L29), execute novamente os testes que falharam, depois mude record de volta para `NO` e envie/atualize seu pull request e aguarde para ver se o build do CircleCI passa.

### Testes Unitários Android

É uma boa ideia adicionar um teste unitário Android sempre que você estiver trabalhando em código que pode ser testado apenas por código Java/Kotlin. Os testes unitários Android estão localizados em `packages/react-native/ReactAndroid/src/test/`.

Recomendamos navegar por eles para ter uma ideia de como um bom teste unitário pode ser.

## Testes Contínuos

Usamos o [CircleCI][config-circleci] para executar automaticamente nossos testes de código aberto. O CircleCI executará esses testes sempre que um commit for adicionado a um pull request, como uma forma de ajudar os mantenedores a entender se uma mudança de código introduz uma regressão. Os testes também executam em commits nas branches `main` e `*-stable` para acompanhar a saúde dessas branches.

[config-circleci]: https://github.com/facebook/react-native/blob/main/.circleci/config.yml

Há outro conjunto de testes que executam na infraestrutura de testes interna da Meta. Alguns desses testes são testes de integração definidos por consumidores internos do React Native (por exemplo, testes unitários para uma surface React Native no aplicativo Facebook).

Esses testes executam em cada commit para a cópia do React Native hospedada no controle de código-fonte do Facebook. Eles também executam quando um pull request é importado para o controle de código-fonte do Facebook.

Se um desses testes falhar, você precisará que alguém da Meta dê uma olhada. Como pull requests só podem ser importados por funcionários da Meta, quem importou o pull request deve ser capaz de facilitar quaisquer detalhes.

:::note
**Executando testes CI localmente:**
A maioria dos colaboradores de código aberto depende do CircleCI para ver os resultados desses testes. Se você preferir verificar suas alterações localmente usando a mesma configuração do CircleCI, o CircleCI fornece uma [interface de linha de comando](https://circleci.com/docs/local-cli) com a capacidade de executar jobs localmente.
:::

### F.A.Q.

#### Como atualizar a versão do Xcode usada nos testes CI?

Ao atualizar para uma nova versão do Xcode, primeiro certifique-se de que ela é [suportada pelo CircleCI](https://circleci.com/docs/testing-ios#supported-xcode-versions).

Você também precisará atualizar a configuração do ambiente de teste para garantir que os testes sejam executados em um iOS Simulator que vem instalado na máquina CircleCI.

Isso também pode ser encontrado na [referência de versão do Xcode do CircleCI](https://circleci.com/docs/2.0/testing-ios/#supported-xcode-versions) clicando na versão desejada e procurando em Runtimes.

Você pode então editar esses dois arquivos:

- `.circleci/config.yml`

  Edite a linha `xcode:` em `macos:` (procure por `_XCODE_VERSION`).

- `scripts/.tests.env`

  Edite a variável de ambiente `IOS_TARGET_OS` para corresponder ao iOS Runtime desejado.

Se você pretende fazer merge dessa mudança no GitHub, certifique-se de notificar um funcionário da Meta, pois eles precisarão atualizar o valor de `_XCODE_VERSION` usado no teste iOS RN OSS do Sandcastle interno em `react_native_oss.py` quando importarem seu pull request.
