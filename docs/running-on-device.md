---
ia-translated: true
id: running-on-device
title: Executando em Dispositivo
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

É sempre uma boa ideia testar seu app em um dispositivo real antes de lançá-lo para seus usuários. Este documento irá guiá-lo através das etapas necessárias para executar seu app React Native em um dispositivo e prepará-lo para produção.

:::tip
Se você usou `create-expo-app` para configurar seu projeto, você pode executar seu app em um dispositivo no Expo Go escaneando o código QR que é exibido quando você executa `npm start`. Consulte o guia Expo para [executar seu projeto em seu dispositivo](https://docs.expo.dev/get-started/expo-go/) para mais informações.
:::

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

## Executando seu app em dispositivos Android

#### Development OS

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, Android'

### 1. Habilite a depuração via USB

A maioria dos dispositivos Android só pode instalar e executar apps baixados da Google Play, por padrão. Você precisará habilitar a depuração USB em seu dispositivo para instalar seu app durante o desenvolvimento.

Para habilitar a depuração USB em seu dispositivo, você primeiro precisará habilitar o menu "Developer options" indo em **Settings** → **About phone** → **Software information** e então tocando na linha `Build number` na parte inferior sete vezes. Você pode então voltar para **Settings** → **Developer options** para habilitar "USB debugging".

### 2. Conecte seu dispositivo via USB

Agora vamos configurar um dispositivo Android para executar nossos projetos React Native. Vá em frente e conecte seu dispositivo via USB à sua máquina de desenvolvimento.

Agora verifique se seu dispositivo está se conectando corretamente ao ADB, o Android Debug Bridge, executando `adb devices`.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Ver `device` na coluna da direita significa que o dispositivo está conectado. Você deve ter **apenas um dispositivo conectado** por vez.

:::note
Se você ver `unauthorized` na lista, você precisará executar `adb reverse tcp:8081 tcp:8081` e pressionar allow USB debugging no dispositivo.
:::

### 3. Execute seu app

Na raiz do seu projeto, digite o seguinte no seu prompt de comando para instalar e iniciar seu app no dispositivo:

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

:::note
Se você receber um erro "bridge configuration isn't available", consulte [Using adb reverse](running-on-device.md#method-1-using-adb-reverse-recommended).
:::

:::tip
Você também pode usar o `React Native CLI` para gerar e executar uma compilação `release` (por exemplo, da raiz do seu projeto: `yarn android --mode release`).
:::

<h2>Conectando ao servidor de desenvolvimento</h2>

Você também pode iterar rapidamente em um dispositivo conectando-se ao servidor de desenvolvimento executando em sua máquina de desenvolvimento. Existem várias maneiras de fazer isso, dependendo se você tem acesso a um cabo USB ou uma rede Wi-Fi.

### Method 1: Using adb reverse (recommended)

Você pode usar este método se seu dispositivo estiver executando Android 5.0 (Lollipop) ou mais recente, tiver a depuração USB habilitada e estiver conectado via USB à sua máquina de desenvolvimento.

Execute o seguinte em um prompt de comando:

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

Para encontrar o nome do dispositivo, execute o seguinte comando adb:

```shell
$ adb devices
```

Agora você pode habilitar o Fast Refresh no [Dev Menu](debugging.md#opening-the-dev-menu). Seu app será recarregado sempre que seu código JavaScript for alterado.

### Method 2: Connect via Wi-Fi

Você também pode se conectar ao servidor de desenvolvimento via Wi-Fi. Primeiro, você precisará instalar o app em seu dispositivo usando um cabo USB, mas uma vez feito isso, você pode depurar sem fio seguindo estas instruções. Você precisará do endereço IP atual da sua máquina de desenvolvimento antes de prosseguir.

Você pode encontrar o endereço IP em **System Settings (or System Preferences)** → **Network**.

1. Certifique-se de que seu laptop e seu telefone estejam na **mesma** rede Wi-Fi.
2. Abra seu app React Native no seu dispositivo.
3. Você verá uma [tela vermelha com um erro](debugging.md#logbox). Está tudo bem. Os próximos passos irão corrigir isso.
4. Abra o [Dev Menu](debugging.md#opening-the-dev-menu) no app.
5. Vá para **Dev Settings** → **Debug server host & port for device**.
6. Digite o endereço IP da sua máquina e a porta do servidor de desenvolvimento local (por exemplo, `10.0.1.1:8081`).
7. Volte para o **Dev Menu** e selecione **Reload JS**.

Agora você pode habilitar o Fast Refresh no [Dev Menu](debugging.md#opening-the-dev-menu). Seu app será recarregado sempre que seu código JavaScript for alterado.

## Building your app for production

Você construiu um ótimo app usando React Native e agora está ansioso para lançá-lo na Play Store. O processo é o mesmo de qualquer outro app Android nativo, com algumas considerações adicionais a serem levadas em conta. Siga o guia para [gerar um APK assinado](signed-apk-android.md) para saber mais.

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, Android'

### 1. Habilite a depuração via USB

A maioria dos dispositivos Android só pode instalar e executar apps baixados da Google Play, por padrão. Você precisará habilitar a depuração USB em seu dispositivo para instalar seu app durante o desenvolvimento.

Para habilitar a depuração USB em seu dispositivo, você primeiro precisará habilitar o menu "Developer options" indo em **Settings** → **About phone** → **Software information** e então tocando na linha `Build number` na parte inferior sete vezes. Você pode então voltar para **Settings** → **Developer options** para habilitar "USB debugging".

### 2. Conecte seu dispositivo via USB

Agora vamos configurar um dispositivo Android para executar nossos projetos React Native. Vá em frente e conecte seu dispositivo via USB à sua máquina de desenvolvimento.

Agora verifique se seu dispositivo está se conectando corretamente ao ADB, o Android Debug Bridge, executando `adb devices`.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Ver `device` na coluna da direita significa que o dispositivo está conectado. Você deve ter **apenas um dispositivo conectado** por vez.

### 3. Execute seu app

Na raiz do seu projeto, execute o seguinte no seu prompt de comando para instalar e iniciar seu app no dispositivo:

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

:::tip
Você também pode usar o `React Native CLI` para gerar e executar uma compilação `release` (por exemplo, da raiz do seu projeto: `yarn android --mode release`).
:::

<h2>Conectando ao servidor de desenvolvimento</h2>

Você também pode iterar rapidamente em um dispositivo conectando-se ao servidor de desenvolvimento executando em sua máquina de desenvolvimento. Existem várias maneiras de fazer isso, dependendo se você tem acesso a um cabo USB ou uma rede Wi-Fi.

### Method 1: Using adb reverse (recommended)

Você pode usar este método se seu dispositivo estiver executando Android 5.0 (Lollipop) ou mais recente, tiver a depuração USB habilitada e estiver conectado via USB à sua máquina de desenvolvimento.

Execute o seguinte em um prompt de comando:

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

Para encontrar o nome do dispositivo, execute o seguinte comando adb:

```shell
$ adb devices
```

Agora você pode habilitar o Fast Refresh no [Dev Menu](debugging.md#opening-the-dev-menu). Seu app será recarregado sempre que seu código JavaScript for alterado.

### Method 2: Connect via Wi-Fi

Você também pode se conectar ao servidor de desenvolvimento via Wi-Fi. Primeiro, você precisará instalar o app em seu dispositivo usando um cabo USB, mas uma vez feito isso, você pode depurar sem fio seguindo estas instruções. Você precisará do endereço IP atual da sua máquina de desenvolvimento antes de prosseguir.

Abra o prompt de comando e digite `ipconfig` para encontrar o endereço IP da sua máquina ([mais informações](https://windows.microsoft.com/en-us/windows/using-command-line-tools-networking-information)).

1. Certifique-se de que seu laptop e seu telefone estejam na **mesma** rede Wi-Fi.
2. Abra seu app React Native no seu dispositivo.
3. Você verá uma [tela vermelha com um erro](debugging.md#logbox). Está tudo bem. Os próximos passos irão corrigir isso.
4. Abra o [Dev Menu](debugging.md#opening-the-dev-menu) no app.
5. Vá para **Dev Settings** → **Debug server host & port for device**.
6. Digite o endereço IP da sua máquina e a porta do servidor de desenvolvimento local (por exemplo, `10.0.1.1:8081`).
7. Volte para o **Dev Menu** e selecione **Reload JS**.

Agora você pode habilitar o Fast Refresh no [Dev Menu](debugging.md#opening-the-dev-menu). Seu app será recarregado sempre que seu código JavaScript for alterado.

## Building your app for production

Você construiu um ótimo app usando React Native e agora está ansioso para lançá-lo na Play Store. O processo é o mesmo de qualquer outro app Android nativo, com algumas considerações adicionais a serem levadas em conta. Siga o guia para [gerar um APK assinado](signed-apk-android.md) para saber mais.

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, Android'

### 1. Habilite a depuração via USB

A maioria dos dispositivos Android só pode instalar e executar apps baixados da Google Play, por padrão. Você precisará habilitar a depuração USB em seu dispositivo para instalar seu app durante o desenvolvimento.

Para habilitar a depuração USB em seu dispositivo, você primeiro precisará habilitar o menu "Developer options" indo em **Settings** → **About phone** → **Software information** e então tocando na linha `Build number` na parte inferior sete vezes. Você pode então voltar para **Settings** → **Developer options** para habilitar "USB debugging".

### 2. Conecte seu dispositivo via USB

Agora vamos configurar um dispositivo Android para executar nossos projetos React Native. Vá em frente e conecte seu dispositivo via USB à sua máquina de desenvolvimento.

Em seguida, verifique o código do fabricante usando `lsusb` (no mac, você deve primeiro [instalar lsusb](https://github.com/jlhonora/lsusb)). `lsusb` deve mostrar algo assim:

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 22b8:2e76 Motorola PCS
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Essas linhas representam os dispositivos USB atualmente conectados à sua máquina.

Você quer a linha que representa seu telefone. Se estiver em dúvida, tente desconectar seu telefone e executar o comando novamente:

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Você verá que após remover o telefone, a linha que tem o modelo do telefone ("Motorola PCS" neste caso) desapareceu da lista. Esta é a linha que nos interessa.

`Bus 001 Device 003: ID 22b8:2e76 Motorola PCS`

Da linha acima, você quer pegar os primeiros quatro dígitos do ID do dispositivo:

`22b8:2e76`

Neste caso, é `22b8`. Esse é o identificador da Motorola.

Você precisará inserir isso nas suas regras udev para começar a funcionar:

```shell
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

Certifique-se de substituir `22b8` pelo identificador que você obteve no comando acima.

Agora verifique se seu dispositivo está se conectando corretamente ao ADB, o Android Debug Bridge, executando `adb devices`.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Ver `device` na coluna da direita significa que o dispositivo está conectado. Você deve ter **apenas um dispositivo conectado** por vez.

### 3. Execute seu app

Na raiz do seu projeto, digite o seguinte no seu prompt de comando para instalar e iniciar seu app no dispositivo:

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

:::note
Se você receber um erro "bridge configuration isn't available", consulte [Using adb reverse](running-on-device.md#method-1-using-adb-reverse-recommended).
:::

:::tip
Você também pode usar o `React Native CLI` para gerar e executar uma compilação `release` (por exemplo, da raiz do seu projeto: `yarn android --mode release`).
:::

<h2>Conectando ao servidor de desenvolvimento</h2>

Você também pode iterar rapidamente em um dispositivo conectando-se ao servidor de desenvolvimento executando em sua máquina de desenvolvimento. Existem várias maneiras de fazer isso, dependendo se você tem acesso a um cabo USB ou uma rede Wi-Fi.

### Method 1: Using adb reverse (recommended)

Você pode usar este método se seu dispositivo estiver executando Android 5.0 (Lollipop) ou mais recente, tiver a depuração USB habilitada e estiver conectado via USB à sua máquina de desenvolvimento.

Execute o seguinte em um prompt de comando:

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

Para encontrar o nome do dispositivo, execute o seguinte comando adb:

```shell
$ adb devices
```

Agora você pode habilitar o Fast Refresh no [Dev Menu](debugging.md#opening-the-dev-menu). Seu app será recarregado sempre que seu código JavaScript for alterado.

### Method 2: Connect via Wi-Fi

Você também pode se conectar ao servidor de desenvolvimento via Wi-Fi. Primeiro, você precisará instalar o app em seu dispositivo usando um cabo USB, mas uma vez feito isso, você pode depurar sem fio seguindo estas instruções. Você precisará do endereço IP atual da sua máquina de desenvolvimento antes de prosseguir.

Abra um terminal e digite `/sbin/ifconfig` para encontrar o endereço IP da sua máquina.

1. Certifique-se de que seu laptop e seu telefone estejam na **mesma** rede Wi-Fi.
2. Abra seu app React Native no seu dispositivo.
3. Você verá uma [tela vermelha com um erro](debugging.md#logbox). Está tudo bem. Os próximos passos irão corrigir isso.
4. Abra o [Dev Menu](debugging.md#opening-the-dev-menu) no app.
5. Vá para **Dev Settings** → **Debug server host & port for device**.
6. Digite o endereço IP da sua máquina e a porta do servidor de desenvolvimento local (por exemplo, `10.0.1.1:8081`).
7. Volte para o **Dev Menu** e selecione **Reload JS**.

Agora você pode habilitar o Fast Refresh no [Dev Menu](debugging.md#opening-the-dev-menu). Seu app será recarregado sempre que seu código JavaScript for alterado.

## Building your app for production

Você construiu um ótimo app usando React Native e agora está ansioso para lançá-lo na Play Store. O processo é o mesmo de qualquer outro app Android nativo, com algumas considerações adicionais a serem levadas em conta. Siga o guia para [gerar um APK assinado](signed-apk-android.md) para saber mais.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="ios">

## Executando seu app em dispositivos iOS

#### Development OS

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, iOS'

### 1. Conecte seu dispositivo via USB

Conecte seu dispositivo iOS ao seu Mac usando um cabo USB para Lightning ou USB-C. Navegue até a pasta `ios` no seu projeto e abra o arquivo `.xcodeproj`, ou se você estiver usando CocoaPods abra `.xcworkspace`, dentro dele usando Xcode.

Se esta é a primeira vez que você executa um app em seu dispositivo iOS, pode ser necessário registrar seu dispositivo para desenvolvimento. Abra o menu **Product** na barra de menus do Xcode e vá para **Destination**. Procure e selecione seu dispositivo na lista. O Xcode irá então registrar seu dispositivo para desenvolvimento.

### 2. Configure a assinatura de código

Registre-se para uma [conta de desenvolvedor Apple](https://developer.apple.com/) se você ainda não tiver uma.

Selecione seu projeto no Xcode Project Navigator e selecione seu target principal (ele deve compartilhar o mesmo nome que seu projeto). Procure a aba "General". Vá para "Signing" e certifique-se de que sua conta de desenvolvedor Apple ou team esteja selecionada no dropdown Team. Faça o mesmo para o target de testes (ele termina com Tests e está abaixo do seu target principal).

**Repita** este passo para o target **Tests** no seu projeto.

![](/docs/assets/RunningOnDeviceCodeSigning.png)

### 3. Build and Run your app

Se tudo estiver configurado corretamente, seu dispositivo será listado como o target de build na barra de ferramentas do Xcode, e também aparecerá no painel Devices (<kbd>Shift ⇧</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>2</kbd>). Agora você pode pressionar o botão **Build and run** (<kbd>Cmd ⌘</kbd> + <kbd>R</kbd>) ou selecionar **Run** no menu **Product**. Seu app será iniciado no seu dispositivo em breve.

![](/docs/assets/RunningOnDeviceReady.png)

:::note
Se você encontrar algum problema, consulte a documentação da Apple sobre [Launching Your App on a Device](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4).
:::

<h2>Conectando ao servidor de desenvolvimento</h2>

Você também pode iterar rapidamente em um dispositivo usando o servidor de desenvolvimento. Você só precisa estar na mesma rede Wi-Fi que seu computador. Agite seu dispositivo para abrir o [Dev Menu](debugging.md#opening-the-dev-menu) e então habilite o Fast Refresh. Seu app será recarregado sempre que seu código JavaScript for alterado.

![](/docs/assets/debugging-dev-menu-076.jpg)

### Troubleshooting

:::tip
Se você tiver algum problema, certifique-se de que seu Mac e dispositivo estejam na mesma rede e possam se alcançar. Muitas redes sem fio abertas com portais cativos são configuradas para impedir que dispositivos alcancem outros dispositivos na rede. Você pode usar o recurso Personal Hotspot do seu dispositivo neste caso. Você também pode compartilhar sua conexão de internet (Wi-Fi/Ethernet) do seu Mac para seu dispositivo via USB e se conectar ao bundler através deste túnel para velocidades de transferência muito altas.
:::

Ao tentar se conectar ao servidor de desenvolvimento, você pode receber uma [tela vermelha com um erro](debugging.md#logbox) dizendo:

:::note
Connection to `http://localhost:8081/debugger-proxy?role=client` timed out. Are you running node proxy? If you are running on the device, check if you have the right IP address in `RCTWebSocketExecutor.m`.
:::

Para resolver este problema, verifique os seguintes pontos.

#### 1. Wi-Fi network.

Certifique-se de que seu laptop e seu telefone estejam na **mesma** rede Wi-Fi.

#### 2. IP address

Certifique-se de que o script de build detectou o endereço IP da sua máquina corretamente (por exemplo, `10.0.1.123`).

![](/docs/assets/XcodeBuildIP.png)

Abra a aba **Report navigator**, selecione o último **Build** e procure por `IP=` seguido de um endereço IP. O endereço IP que é incorporado no app deve corresponder ao endereço IP da sua máquina.

## Building your app for production

Você construiu um ótimo app usando React Native e agora está ansioso para lançá-lo na App Store. O processo é o mesmo de qualquer outro app iOS nativo, com algumas considerações adicionais a serem levadas em conta. Siga o guia para [publicar na Apple App Store](publishing-to-app-store.md) para saber mais.

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, iOS'

:::info
Um Mac é necessário para fazer build do seu app para dispositivos iOS. Alternativamente, você pode consultar nosso [guia de configuração de ambiente](environment-setup) para aprender como fazer build do seu app usando Expo CLI, que permitirá que você execute seu app usando o app cliente Expo.
:::

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, iOS'

:::info
Um Mac é necessário para fazer build do seu app para dispositivos iOS. Alternativamente, você pode consultar nosso [guia de configuração de ambiente](environment-setup) para aprender como fazer build do seu app usando Expo CLI, que permitirá que você execute seu app usando o app cliente Expo.
:::

</TabItem>
</Tabs>

</TabItem>
</Tabs>
