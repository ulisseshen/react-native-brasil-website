---
ia-translated: true
id: upgrading
title: Upgrading to new versions
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Atualizar para novas versões do React Native lhe dará acesso a mais APIs, views, ferramentas de desenvolvedor e outras novidades. Atualizar requer uma pequena quantidade de esforço, mas tentamos torná-lo direto para você.

## Expo projects

Atualizar seu projeto Expo para uma nova versão do React Native requer atualizar as versões dos pacotes `react-native`, `react` e `expo` em seu arquivo `package.json`. O Expo recomenda atualizar versões SDK incrementalmente, uma de cada vez. Fazer isso ajudará você a identificar quebras e problemas que surgem durante o processo de atualização. Veja o [Upgrading Expo SDK Walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) para informações atualizadas sobre como atualizar seu projeto.

## React Native projects

Como projetos típicos React Native são essencialmente compostos por um projeto Android, um projeto iOS e um projeto JavaScript, atualizar pode ser bastante complicado. O [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) é uma ferramenta web para ajudá-lo ao atualizar seus apps, fornecendo o conjunto completo de mudanças que acontecem entre quaisquer duas versões. Ele também mostra comentários em arquivos específicos para ajudar a entender por que aquela mudança é necessária.

### 1. Select the versions

Primeiro você precisa selecionar de e para qual versão você deseja atualizar, por padrão as últimas versões principais são selecionadas. Após selecionar, você pode clicar no botão "Show me how to upgrade".

💡 Atualizações principais mostrarão uma seção "useful content" no topo com links para ajudá-lo ao atualizar.

### 2. Upgrade dependencies

O primeiro arquivo que é mostrado é o `package.json`, é bom atualizar as dependências que estão aparecendo lá. Por exemplo, se `react-native` e `react` aparecem como mudanças, então você pode instalá-los em seu projeto executando os seguintes comandos:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
npm install react-native@{{VERSION}}
npm install react@{{REACT_VERSION}}
```

</TabItem>
<TabItem value="yarn">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
yarn add react-native@{{VERSION}}
yarn add react@{{REACT_VERSION}}
```

</TabItem>
</Tabs>

### 3. Upgrade your project files

A nova versão pode conter atualizações para outros arquivos que são gerados quando você executa `npx react-native init`, esses arquivos são listados após o `package.json` na página do [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/). Se não houver outras mudanças, então você só precisa recompilar o projeto para continuar desenvolvendo. Caso haja mudanças, você precisa aplicá-las manualmente em seu projeto.

### Troubleshooting

#### I have done all the changes but my app is still using an old version

Esses tipos de erros geralmente estão relacionados ao cache, é recomendado instalar [react-native-clean-project](https://github.com/pmadruga/react-native-clean-project) para limpar todo o cache do seu projeto e então você pode executá-lo novamente.
