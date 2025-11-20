---
ia-translated: true
id: hermes
title: Usando Hermes
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<a href="https://hermesengine.dev">
  <img width={300} height={300} className="hermes-logo" src="/docs/assets/HermesLogo.svg" style={{height: "auto"}}/>
</a>

[Hermes](https://hermesengine.dev) é um motor JavaScript de código aberto otimizado para React Native. Para muitos apps, usar Hermes resultará em tempo de inicialização melhorado, uso de memória reduzido e tamanho de app menor quando comparado ao JavaScriptCore.
Hermes é usado por padrão pelo React Native e nenhuma configuração adicional é necessária para habilitá-lo.

## Hermes Empacotado

React Native vem com uma **versão empacotada** do Hermes.
Estamos construindo uma versão do Hermes para você sempre que lançamos uma nova versão do React Native. Isso garantirá que você está consumindo uma versão do Hermes que é totalmente compatível com a versão do React Native que você está usando.

Esta mudança é totalmente transparente para usuários do React Native. Você ainda pode desabilitar Hermes usando o comando descrito nesta página.
Você pode [ler mais sobre a implementação técnica nesta página](/architecture/bundled-hermes).

## Confirmando que Hermes está em uso

Se você criou recentemente um novo app do zero, você deve ver se Hermes está habilitado na tela de boas-vindas:

<figure>
<img src="/docs/assets/HermesApp.png" height="600" alt="Where to find JS engine status in the new project?" />
</figure>

Uma variável global `HermesInternal` estará disponível em JavaScript que pode ser usada para verificar se Hermes está em uso:

```jsx
const isHermes = () => !!global.HermesInternal;
```

:::caution
Se você está usando uma maneira não padrão de carregar o bundle JS, é possível que a variável `HermesInternal` esteja disponível mas você não esteja usando o bytecode pré-compilado altamente otimizado.
Confirme que você está usando o arquivo `.hbc` e também faça um benchmark do antes/depois como detalhado abaixo.
:::

Para ver os benefícios do Hermes, tente fazer um build/deployment de release do seu app para comparar. Por exemplo; a partir da raiz do seu projeto:

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Android'

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

</TabItem>
<TabItem value="ios">

[//]: # 'iOS'

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --mode="Release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --mode Release
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

Isso compilará JavaScript para Hermes Bytecode durante o tempo de build, o que melhorará a velocidade de inicialização do seu app no dispositivo.

## Voltando para JavaScriptCore

React Native também suporta usar JavaScriptCore como o [motor JavaScript](javascript-environment). Siga as instruções [do repositório da comunidade](https://github.com/react-native-community/javascriptcore) para optar por não usar Hermes.
