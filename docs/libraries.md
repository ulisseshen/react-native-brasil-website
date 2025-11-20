---
id: libraries
title: Usando Bibliotecas
author: Brent Vatne
authorURL: 'https://twitter.com/notbrent'
description: Este guia apresenta aos desenvolvedores React Native a busca, instalação e uso de bibliotecas de terceiros em seus aplicativos.
ia-translated: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native fornece um conjunto de [Componentes Core e APIs](./components-and-apis) embutidos prontos para uso em seu aplicativo. Você não está limitado aos componentes e APIs que vêm com React Native. React Native tem uma comunidade de milhares de desenvolvedores. Se os Componentes Core e APIs não tiverem o que você está procurando, você pode encontrar e instalar uma biblioteca da comunidade para adicionar a funcionalidade ao seu aplicativo.

## Selecionando um Package Manager

Bibliotecas React Native são tipicamente instaladas do [registro npm](https://www.npmjs.com/) usando um gerenciador de pacotes Node.js como [npm CLI](https://docs.npmjs.com/cli/npm) ou [Yarn Classic](https://classic.yarnpkg.com/en/).

Se você tem Node.js instalado em seu computador, então você já tem o npm CLI instalado. Alguns desenvolvedores preferem usar Yarn Classic para tempos de instalação ligeiramente mais rápidos e recursos avançados adicionais como Workspaces. Ambas as ferramentas funcionam muito bem com React Native. Assumiremos npm para o restante deste guia para simplicidade de explicação.

:::note
Os termos "library" e "package" são usados de forma intercambiável na comunidade JavaScript.
:::

## Instalando uma Biblioteca

Para instalar uma biblioteca em seu projeto, navegue até o diretório do seu projeto no seu terminal e execute o comando de instalação. Vamos tentar isso com `react-native-webview`:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install react-native-webview
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add react-native-webview
```

</TabItem>
</Tabs>

A biblioteca que instalamos inclui código nativo, e precisamos vincular ao nosso aplicativo antes de usá-la.

## Linking Native Code no iOS

React Native usa CocoaPods para gerenciar dependências de projeto iOS e a maioria das bibliotecas React Native segue essa mesma convenção. Se uma biblioteca que você está usando não segue, então consulte o README delas para instruções adicionais. Na maioria dos casos, as seguintes instruções se aplicarão.

Execute `pod install` no nosso diretório `ios` para vinculá-la ao nosso projeto nativo iOS. Um atalho para fazer isso sem mudar para o diretório `ios` é executar `npx pod-install`.

```bash
npx pod-install
```

Uma vez concluído, reconstrua o binário do aplicativo para começar a usar sua nova biblioteca:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

## Linking Native Code no Android

React Native usa Gradle para gerenciar dependências de projeto Android. Depois de instalar uma biblioteca com dependências nativas, você precisará reconstruir o binário do aplicativo para usar sua nova biblioteca:

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

## Encontrando Bibliotecas

[React Native Directory](https://reactnative.directory) é um banco de dados pesquisável de bibliotecas construídas especificamente para React Native. Este é o primeiro lugar para procurar uma biblioteca para seu aplicativo React Native.

Muitas das bibliotecas que você encontrará no diretório são de [React Native Community](https://github.com/react-native-community/) ou [Expo](https://docs.expo.dev/versions/latest/).

Bibliotecas construídas pela React Native Community são impulsionadas por voluntários e indivíduos em empresas que dependem do React Native. Elas geralmente suportam iOS, tvOS, Android, Windows, mas isso varia entre os projetos. Muitas das bibliotecas nesta organização já foram Componentes Core e APIs do React Native.

Bibliotecas construídas pelo Expo são todas escritas em TypeScript e suportam iOS, Android e `react-native-web` sempre que possível.

Depois do React Native Directory, o [registro npm](https://www.npmjs.com/) é o próximo melhor lugar se você não conseguir encontrar uma biblioteca especificamente para React Native no diretório. O registro npm é a fonte definitiva para bibliotecas JavaScript, mas as bibliotecas que ele lista podem não ser todas compatíveis com React Native. React Native é um dos muitos ambientes de programação JavaScript, incluindo Node.js, navegadores web, Electron e mais, e npm inclui bibliotecas que funcionam para todos esses ambientes.

## Determinando Compatibilidade de Biblioteca

### Funciona com React Native?

Geralmente, bibliotecas construídas _especificamente para outras plataformas_ não funcionarão com React Native. Exemplos incluem `react-select` que é construído para a web e especificamente direciona `react-dom`, e `rimraf` que é construído para Node.js e interage com o sistema de arquivos do seu computador. Outras bibliotecas como `lodash` usam apenas recursos da linguagem JavaScript e funcionam em qualquer ambiente. Você ganhará um senso para isso com o tempo, mas até lá a maneira mais fácil de descobrir é tentar você mesmo. Você pode remover pacotes usando `npm uninstall` se descobrir que ele não funciona no React Native.

### Funciona para as plataformas que meu aplicativo suporta?

[React Native Directory](https://reactnative.directory) permite que você filtre por compatibilidade de plataforma, como iOS, Android, Web e Windows. Se a biblioteca que você gostaria de usar não está listada lá atualmente, consulte o README da biblioteca para saber mais.

### Funciona com a versão do meu aplicativo do React Native?

A versão mais recente de uma biblioteca é tipicamente compatível com a versão mais recente do React Native. Se você está usando uma versão mais antiga, deve consultar o README para saber qual versão da biblioteca você deve instalar. Você pode instalar uma versão específica da biblioteca executando `npm install <library-name>@<version-number>`, por exemplo: `npm install @react-native-community/netinfo@^2.0.0`.
