---
ia-translated: true
id: getting-started-without-a-framework
title: Começar Sem um Framework
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import PlatformSupport from '@site/src/theme/PlatformSupport';

import RemoveGlobalCLI from './\_remove-global-cli.md';

<PlatformSupport platforms={['android', 'ios', 'macOS', 'tv', 'watchOS', 'web', 'windows', 'visionOS']} />

Se você tem restrições que não são bem atendidas por um [Framework](/architecture/glossary#react-native-framework), ou você prefere escrever seu próprio Framework, você pode criar um app React Native sem usar um Framework.

Para fazer isso, primeiro você precisará [configurar seu ambiente](set-up-your-environment). Uma vez configurado, continue com os passos abaixo para criar uma aplicação e começar a desenvolver.

### Passo 1: Criando uma nova aplicação

<RemoveGlobalCLI />

Você pode usar [React Native Community CLI](https://github.com/react-native-community/cli) para gerar um novo projeto. Vamos criar um novo projeto React Native chamado "AwesomeProject":

```shell
npx @react-native-community/cli@latest init AwesomeProject
```

Isso não é necessário se você está integrando React Native em uma aplicação existente, ou se você instalou [Expo](https://docs.expo.dev/bare/installing-expo-modules/) em seu projeto, ou se você está adicionando suporte Android a um projeto React Native existente (veja [Integração com Apps Existentes](integration-with-existing-apps.md)). Você também pode usar uma CLI de terceiros para configurar seu app React Native, como [Ignite CLI](https://github.com/infinitered/ignite).

:::info

Se você está tendo problemas com iOS, tente reinstalar as dependências executando:

1. `cd ios` para navegar até a pasta `ios`.
2. `bundle install` para instalar [Bundler](https://bundler.io/)
3. `bundle exec pod install` para instalar as dependências iOS gerenciadas pelo CocoaPods.

:::

#### [Opcional] Usando uma versão ou template específico

Se você quiser iniciar um novo projeto com uma versão específica do React Native, você pode usar o argumento `--version`:

```shell
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

Você também pode iniciar um projeto com um template React Native customizado com o argumento `--template`, leia mais [aqui](https://github.com/react-native-community/cli/blob/main/docs/init.md#initializing-project-with-custom-template).

### Passo 2: Iniciar o Metro

[**Metro**](https://metrobundler.dev/) é a ferramenta de build JavaScript para React Native. Para iniciar o servidor de desenvolvimento Metro, execute o seguinte a partir da pasta do seu projeto:

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

:::note
Se você está familiarizado com desenvolvimento web, Metro é similar a bundlers como Vite e webpack, mas é projetado end-to-end para React Native. Por exemplo, Metro usa [Babel](https://babel.dev/) para transformar sintaxe como JSX em JavaScript executável.
:::

### Passo 3: Iniciar sua aplicação

Deixe o Metro Bundler executar em seu próprio terminal. Abra um novo terminal dentro da pasta do seu projeto React Native. Execute o seguinte:

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

Se tudo estiver configurado corretamente, você deve ver seu novo app executando em seu emulador Android em breve.

Esta é uma maneira de executar seu app - você também pode executá-lo diretamente de dentro do Android Studio.

:::tip
Se você não conseguir fazer isso funcionar, veja a página [Troubleshooting](troubleshooting.md).
:::

### Passo 4: Modificando seu app

Agora que você executou o app com sucesso, vamos modificá-lo.

- Abra `App.tsx` em seu editor de texto de escolha e edite algumas linhas.
- Pressione a tecla <kbd>R</kbd> duas vezes ou selecione `Reload` do Dev Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd>) para ver suas alterações!

### É isso!

Parabéns! Você executou e modificou com sucesso seu primeiro app React Native básico.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

### E agora?

- Se você quiser adicionar este novo código React Native a uma aplicação existente, confira o [guia de Integração](integration-with-existing-apps.md).
- Se você está curioso para aprender mais sobre React Native, confira a [Introdução ao React Native](getting-started).
