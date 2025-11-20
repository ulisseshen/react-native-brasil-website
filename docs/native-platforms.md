---
id: native-platform
title: Native Platform
ia-translated: true
---

Seu aplicativo pode precisar de acesso a recursos de plataforma que não estão diretamente disponíveis no react-native ou em uma das centenas de [bibliotecas de terceiros](https://reactnative.directory/) mantidas pela comunidade. Talvez você queira reutilizar algum código Objective-C, Swift, Java, Kotlin ou C++ existente do runtime JavaScript. Qualquer que seja sua razão, React Native expõe um conjunto poderoso de API para conectar seu código nativo ao código JavaScript do seu aplicativo.

Este guia apresenta:

- **Native Modules:** bibliotecas nativas que não têm Interface de Usuário (UI) para o usuário. Exemplos seriam armazenamento persistente, notificações, eventos de rede. Eles são acessíveis ao seu usuário como funções e objetos JavaScript.
- **Native Component:** views, widgets e controllers de plataforma nativa que estão disponíveis para o código JavaScript do seu aplicativo através de React Components.

:::note
Você pode ter se familiarizado anteriormente com:

- [Legacy Native Modules](./legacy/native-modules-intro);
- [Legacy Native Components](./legacy/native-components-android);

Estas são nossas API deprecadas de módulo nativo e componente. Você ainda pode usar muitas dessas bibliotecas legadas com a New Architecture graças às nossas camadas de interop. Você deve considerar:

- usar bibliotecas alternativas,
- atualizar para versões mais recentes de biblioteca que têm suporte de primeira classe para a New Architecture, ou
- portar essas bibliotecas você mesmo para Turbo Native Modules ou Fabric Native Components.

:::

1. Native Modules
   - [Android & iOS](turbo-native-modules.md)
   - [Cross-Platform with C++](the-new-architecture/pure-cxx-modules.md)
   - [Advanced: Custom C++ Types](the-new-architecture/custom-cxx-types.md)
2. Fabric Native Components
   - [Android & iOS](fabric-native-components.md)
