---
ia-translated: true
id: local-library-setup
title: Local libraries setup
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Uma biblioteca local é uma biblioteca contendo views ou módulos que é local ao seu aplicativo e não publicada em um registro. Isso é diferente da configuração tradicional para views e módulos no sentido de que uma biblioteca local é desacoplada do código nativo do seu aplicativo.

A biblioteca local é criada fora das pastas `android/` e `ios/` e faz uso de autolinking para integrar com seu aplicativo. A estrutura com uma biblioteca local pode parecer assim:

```plaintext
MyApp
├── node_modules
├── modules <-- pasta para suas bibliotecas locais
│ └── awesome-module <-- sua biblioteca local
├── android
├── ios
├── src
├── index.js
└── package.json
```

Como o código de uma biblioteca local existe fora das pastas `android/` e `ios/`, fica mais fácil atualizar versões do React Native no futuro, copiar para outros projetos, etc.

Para criar uma biblioteca local usaremos [create-react-native-library](https://callstack.github.io/react-native-builder-bob/create). Esta ferramenta contém todos os templates necessários.

### Getting Started

Dentro da pasta raiz da sua aplicação React Native, execute o seguinte comando:

```shell
npx create-react-native-library@latest awesome-module
```

Onde `awesome-module` é o nome que você gostaria para o novo módulo. Após passar pelos prompts, você terá uma nova pasta chamada `modules` no diretório raiz do seu projeto que contém o novo módulo.

### Linking

Por padrão, a biblioteca gerada é automaticamente vinculada ao projeto usando o protocolo `link:` ao usar Yarn e `file:` ao usar npm:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>

<TabItem value="npm">

```json
"dependencies": {
  "awesome-module": "file:./modules/awesome-module"
}
```

</TabItem>
<TabItem value="yarn">

```json
"dependencies": {
  "awesome-module": "link:./modules/awesome-module"
}
```

</TabItem>
</Tabs>

Isso cria um symlink para a biblioteca em `node_modules` o que faz o autolinking funcionar.

### Installing dependencies

Para vincular o módulo você precisa instalar as dependências:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>

<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

### Using module inside your app

Para usar o módulo dentro do seu aplicativo, você pode importá-lo por seu nome:

```js
import {multiply} from 'awesome-module';
```
