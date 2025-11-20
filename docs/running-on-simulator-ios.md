---
ia-translated: true
id: running-on-simulator-ios
title: Executando no Simulator
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Iniciando o simulator

Depois que você tiver seu projeto React Native inicializado, você pode executar o seguinte comando dentro do diretório do projeto recém-criado.

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

Se tudo estiver configurado corretamente, você deve ver seu novo app rodando no iOS Simulator em breve.

## Especificando um dispositivo

Você pode especificar o dispositivo que o simulator deve executar com a flag `--simulator`, seguida do nome do dispositivo como string. O padrão é `"iPhone 14"`. Se você deseja executar seu app em um iPhone SE (3rd generation), execute o seguinte comando:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone SE (3rd generation)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone SE (3rd generation)"
```

</TabItem>
</Tabs>

Os nomes dos dispositivos correspondem à lista de dispositivos disponíveis no Xcode. Você pode verificar seus dispositivos disponíveis executando `xcrun simctl list devices` no console.

### Especificando uma versão do dispositivo

Se você tiver várias versões do iOS instaladas, também precisará especificar sua versão apropriada. Por exemplo, para executar seu app em um iPhone 14 Pro (16.0), execute o seguinte comando:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone 14 Pro (16.0)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone 14 Pro (16.0)"
```

</TabItem>
</Tabs>

## Especificando um UDID

Você pode especificar o UDID do dispositivo retornado do comando `xcrun simctl list devices`. Por exemplo, para executar seu app com UDID `AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA`, execute o seguinte comando:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --udid="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --udid "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
</Tabs>
