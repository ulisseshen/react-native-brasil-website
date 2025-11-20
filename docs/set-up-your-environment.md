---
ia-translated: true
id: set-up-your-environment
title: Configure Seu Ambiente
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';

import GuideLinuxAndroid from './\_getting-started-linux-android.md';
import GuideMacOSAndroid from './\_getting-started-macos-android.md';
import GuideWindowsAndroid from './\_getting-started-windows-android.md';
import GuideMacOSIOS from './\_getting-started-macos-ios.md';

Neste guia, você aprenderá como configurar seu ambiente, para que possa executar seu projeto com Android Studio e Xcode. Isso permitirá que você desenvolva com emuladores Android e simuladores iOS, compile seu aplicativo localmente e muito mais.

:::info
Este guia requer Android Studio ou Xcode. Se você já tiver um desses programas instalados, deverá conseguir começar a trabalhar em poucos minutos. Se eles não estiverem instalados, você deve esperar gastar cerca de uma hora instalando e configurando-os.

<details>
<summary>É necessário configurar meu ambiente?</summary>

Configurar seu ambiente não é necessário se você estiver usando um [Framework](/architecture/glossary#react-native-framework). Com um React Native Framework, você não precisa configurar Android Studio ou Xcode, pois ele cuidará da compilação do aplicativo nativo para você.

Se você tiver restrições que o impedem de usar um Framework, ou se quiser escrever seu próprio Framework, então configurar seu ambiente local é um requisito. Depois que seu ambiente estiver configurado, aprenda como [começar sem um framework](getting-started-without-a-framework).

</details>
:::

#### Sistema Operacional de Desenvolvimento

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

#### Sistema Operacional Alvo

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'macOS, Android'

<GuideMacOSAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'macOS, iOS'

<GuideMacOSIOS/>

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows">

#### Sistema Operacional Alvo

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Windows, Android'

<GuideWindowsAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Windows, iOS'

## Não Suportado

:::info
Um Mac é necessário para compilar projetos com código nativo para iOS. Você pode usar o [Expo Go](https://expo.dev/go) do [Expo](environment-setup#start-a-new-react-native-project-with-expo) para desenvolver seu aplicativo em seu dispositivo iOS.
:::

</TabItem>
</Tabs>

</TabItem>
<TabItem value="linux">

#### Sistema Operacional Alvo

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Linux, Android'

<GuideLinuxAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Linux, iOS'

## Não Suportado

:::info
Um Mac é necessário para compilar projetos com código nativo para iOS. Você pode usar o [Expo Go](https://expo.dev/go) do [Expo](environment-setup#start-a-new-react-native-project-with-expo) para desenvolver seu aplicativo em seu dispositivo iOS.
:::

</TabItem>
</Tabs>

</TabItem>
</Tabs>
