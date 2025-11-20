---
ia-translated: true
id: native-modules-setup
title: Configuração de Pacote NPM para Native Modules
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

Native modules geralmente são distribuídos como pacotes npm, exceto que além do JavaScript usual, eles incluem algum código nativo por plataforma. Para entender mais sobre pacotes npm, você pode achar [este guia](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) útil.

Para configurar a estrutura básica de projeto para um native module, usaremos a ferramenta da comunidade chamada [create-react-native-library](https://callstack.github.io/react-native-builder-bob/create). Você pode ir mais a fundo e explorar como essa biblioteca funciona, mas para nossas necessidades executaremos apenas o script básico:

```shell
npx create-react-native-library@latest react-native-awesome-module
```

Onde `react-native-awesome-module` é o nome que você gostaria para o novo módulo. Depois de fazer isso, você navegará para a pasta `react-native-awesome-module` e inicializará o projeto de exemplo executando:

```shell
yarn
```

Quando a inicialização estiver concluída, você poderá iniciar o aplicativo de exemplo executando um dos seguintes comandos:

```shell
# Android app
yarn example android
# iOS app
yarn example ios
```

Quando todas as etapas acima estiverem concluídas, você poderá continuar com os guias [Android Native Modules](native-modules-android) ou [iOS Native Modules](native-modules-ios) para adicionar algum código.
