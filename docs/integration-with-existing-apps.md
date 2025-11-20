---
id: integration-with-existing-apps
title: Integração com Aplicações Existentes
hide_table_of_contents: true
ia-translated: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

import IntegrationApple from './\_integration-with-existing-apps-ios.md'; import
IntegrationKotlin from './\_integration-with-existing-apps-kotlin.md';

React Native é ótimo quando você está iniciando um novo aplicativo móvel do zero. No entanto, também funciona bem para adicionar uma única view ou fluxo de usuário a aplicativos nativos existentes. Com alguns passos, você pode adicionar novos recursos, telas, views, etc. baseados em React Native.

Os passos específicos são diferentes dependendo da plataforma que você está direcionando.

<Tabs groupId="language" queryString defaultValue="kotlin" values={[ {label: 'Android (Java & Kotlin)', value: 'kotlin'}, {label: 'iOS (Objective-C and Swift)', value: 'apple'}, ]}>

<TabItem value="kotlin">

<IntegrationKotlin />

</TabItem>
<TabItem value="apple">

<IntegrationApple />

</TabItem>
</Tabs>
