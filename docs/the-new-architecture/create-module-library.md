<!-- ia-translated: true -->

# Crie uma Biblioteca para Seu Módulo

React Native tem um ecossistema rico de bibliotecas para resolver problemas comuns. Coletamos bibliotecas React Native no site [reactnative.directory](https://reactnative.directory), e este é um ótimo recurso para marcar para todo desenvolvedor React Native.

Às vezes, você pode estar trabalhando em um módulo que vale a pena extrair em uma biblioteca separada para reutilização de código. Isso pode ser uma biblioteca que você quer reutilizar em todos os seus apps, uma biblioteca que você quer distribuir para o ecossistema como um componente open source, ou até mesmo uma biblioteca que você gostaria de vender.

Neste guia, você aprenderá:

- como extrair um módulo em uma biblioteca
- como distribuir a biblioteca usando NPM

## Extraia o Módulo em uma Biblioteca

Você pode usar a ferramenta [`create-react-native-library`](https://callstack.github.io/react-native-builder-bob/create) para criar uma nova biblioteca. Esta ferramenta configura uma nova biblioteca com todo o código boilerplate necessário: todos os arquivos de configuração e todos os arquivos exigidos pelas várias plataformas. Ela também vem com um menu interativo agradável para guiá-lo através da criação da biblioteca.

Para extrair um módulo em uma biblioteca separada, você pode seguir estes passos:

1. Crie a nova biblioteca
2. Mova o código do App para a Biblioteca
3. Atualize o código para refletir a nova estrutura
4. Publique-o.

### 1. Crie uma Biblioteca

1. Inicie o processo de criação executando o comando:

```sh
npx create-react-native-library@latest <Name of Your Library>
```

2. Adicione um nome para seu módulo. Deve ser um nome npm válido, então deve ser todo em minúsculas. Você pode usar `-` para separar palavras.
3. Adicione uma descrição para o pacote.
4. Continue preenchendo o formulário até chegar à pergunta _"What type of library do you want to develop?"_
   ![What type of Library](/docs/assets/what-library.png)
5. Para o propósito deste guia, selecione a opção _Turbo module_. Note que você pode criar bibliotecas tanto para New Architecture quanto para Legacy Architecture.
6. Então, você pode escolher se quer uma biblioteca que acessa a plataforma (Kotlin & Objective-C) ou uma biblioteca C++ compartilhada (C++ para Android e iOS).
7. Finalmente, selecione o `Test App` como última opção. Esta opção cria a biblioteca com um app separado já configurado dentro da pasta da biblioteca.

Uma vez que o prompt interativo termine, a ferramenta cria uma pasta cuja estrutura se parece com isto no Visual Studio Code:

<img className="half-size" alt="Folder structure after initializing a new library." src="/docs/assets/turbo-native-modules/c++visualstudiocode.webp" />

Sinta-se livre para explorar o código que foi criado para você. No entanto, as partes mais importantes:

- A pasta `android`: é aqui que o código Android vive
- A pasta `cpp`: é aqui que o código c++ vive
- A pasta `ios`: é aqui que o código iOS vive
- A pasta `src`: é aqui que o código JS vive.

O `package.json` já está configurado com todas as informações que fornecemos à ferramenta `create-react-native-library`, incluindo o nome e a descrição do pacote. Note que o `package.json` também já está configurado para executar Codegen.

```json
  "codegenConfig": {
    "name": "RN<your module name>Spec",
    "type": "all",
    "jsSrcsDir": "src",
    "outputDir": {
      "ios": "ios/generated",
      "android": "android/generated"
    },
    "android": {
      "javaPackageName": "com.<name-of-the-module>"
    }
  },
```

Finalmente, a biblioteca já contém toda a infraestrutura para permitir que a biblioteca seja linkada com iOS e Android.

### 2. Copie o Código do Seu App

O resto do guia assume que você tem um Turbo Native Module local no seu app, criado seguindo as diretrizes mostradas nos outros guias no site: Turbo Native Modules específicos de plataforma, ou [Turbo Native Modules multiplataforma](./pure-cxx-modules). Mas funciona também para Components e módulos e componentes de legacy architecture. Você terá que adaptar os arquivos que precisa copiar e atualizar.

<!-- TODO: add links for Turbo Native Modules -->

1. **[Não necessário para módulos e componentes de legacy architecture]** Mova o código que você tem na pasta `specs` no seu app para a pasta `src` criada pela pasta `create-react-native-library`.
2. Atualize o arquivo `index.ts` para exportar adequadamente a spec do Turbo Native Module para que seja acessível da biblioteca. Por exemplo:

```ts
import NativeSampleModule from './NativeSampleModule';

export default NativeSampleModule;
```

3. Copie o native module:
   - Substitua o código em `android/src/main/java/com/<name-of-the-module>` com o código que você escreveu no app para seu native module, se houver.
   - Substitua o código na pasta `ios` com o código que você escreveu no seu app para seu native module, se houver.
   - Substitua o código na pasta `cpp` com o código que você escreveu no seu app para seu native module, se houver.

4. **[Não necessário para módulos e componentes de legacy architecture]** Atualize todas as referências do nome da spec anterior para o novo nome da spec, aquele que está definido no campo `codegenConfig` do `package.json` da biblioteca. Por exemplo, se no `package.json` do app você definiu `AppSpecs` como `codegenConfig.name` e na biblioteca é chamado `RNNativeSampleModuleSpec`, você tem que substituir cada ocorrência de `AppSpecs` com `RNNativeSampleModuleSpec`.

É isso! Você moveu todo o código necessário para fora do seu app e em uma biblioteca separada.

## Testando sua Biblioteca

O `create-react-native-library` vem com uma aplicação de exemplo útil que já está configurada para funcionar adequadamente com a biblioteca. Esta é uma ótima maneira de testá-la!

Se você olhar para a pasta `example`, pode encontrar a mesma estrutura de uma nova aplicação React Native que você pode criar do [`react-native-community/template`](https://github.com/react-native-community/template).

Para testar sua biblioteca:

1. Navegue para a pasta `example`.
2. Execute `yarn install` para instalar todas as dependências.
3. Apenas para iOS, você precisa instalar CocoaPods: `cd ios && pod install`.
4. Compile e execute Android com `yarn android` da pasta `example`.
5. Compile e execute iOS com `yarn ios` da pasta `example`.

## Use sua Biblioteca como um Module Local

Existem alguns cenários onde você pode querer reutilizar sua biblioteca como um módulo local para suas aplicações, sem publicá-la no NPM.

Neste caso, você pode acabar em um cenário onde você tem sua biblioteca situada como irmã dos seus apps.

```shell
Development
├── App
└── Library
```

Você pode usar a biblioteca criada com `create-react-native-library` também neste caso.

1. adicione sua biblioteca ao seu app navegando para a pasta `App` e executando `yarn add ../Library`.
2. Apenas para iOS, navegue na pasta `App/ios` e execute `bundle exec pod install` para instalar suas dependências.
3. Atualize o código `App.tsx` para importar o código na sua biblioteca. Por exemplo:

```tsx
import NativeSampleModule from '../Library/src/index';
```

Se você executar seu app agora, Metro não encontraria os arquivos JS que precisa servir para o app. Isso é porque metro estará executando a partir da pasta `App` e não teria acesso aos arquivos JS localizados na pasta `Library`. Para corrigir isso, vamos atualizar o arquivo `metro.config.js` como segue

```diff
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
+ const path = require('path');

- const config = {}
+ const config = {
+  // Make Metro able to resolve required external dependencies
+  watchFolders: [
+    path.resolve(__dirname, '../Library'),
+  ],
+  resolver: {
+    extraNodeModules: {
+      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
+    },
+  },
+};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

A configuração `watchFolders` diz ao Metro para observar arquivos e mudanças em alguns caminhos adicionais, neste caso para o caminho `../Library`, que contém o arquivo `src/index` que você precisa.
A propriedade `resolver` é necessária para alimentar a biblioteca com o código React Native usado pelo app. A biblioteca pode referenciar e importar código do React Native: sem o resolver adicional, as importações na biblioteca falharão.

Neste ponto, você pode compilar e executar seu app como de costume:

- Compile e execute Android com `yarn android` da pasta `example`.
- Compile e execute iOS com `yarn ios` da pasta `example`.

## Publique a Biblioteca no NPM

A configuração para publicar tudo no NPM já está no lugar, graças ao `create-react-native-library`.

1. Instale as dependências no seu módulo `yarn install`.
2. Compile a biblioteca executando `yarn prepare`.
3. Lance-a com `yarn release`.

Depois de um tempo, você encontrará sua biblioteca no NPM. Para verificar isso, execute:

```bash
npm view <package.name>
```

onde `package.name` é o `name` que você configurou no arquivo `package.json` durante a inicialização da biblioteca.

Agora, você pode instalar a biblioteca na sua aplicação executando:

```bash
yarn add <package.name>
```

:::note
Apenas para iOS, sempre que você instalar um novo módulo com algum código nativo, você tem que reinstalar CocoaPods, executando `bundle exec pod install` (recomendado) ou `pod install` se você não estiver usando Ruby's Bundler (não recomendado).
:::

Parabéns! Você publicou sua primeira biblioteca React Native.
