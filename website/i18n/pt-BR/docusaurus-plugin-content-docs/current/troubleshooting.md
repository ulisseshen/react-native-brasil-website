---
ia-translated: true
id: troubleshooting
title: Solução de Problemas
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Estes são alguns problemas comuns que você pode encontrar ao configurar o React Native. Se você encontrar algo que não está listado aqui, tente [pesquisar o problema no GitHub](https://github.com/facebook/react-native/issues/).

### Porta já em uso

O [Metro bundler][metro] executa na porta 8081. Se outro processo já estiver usando essa porta, você pode encerrar esse processo ou alterar a porta que o bundler usa.

#### Encerrando um processo na porta 8081

Execute o seguinte comando para encontrar o id do processo que está escutando na porta 8081:

```shell
sudo lsof -i :8081
```

Em seguida, execute o seguinte para encerrar o processo:

```shell
kill -9 <PID>
```

No Windows, você pode encontrar o processo usando a porta 8081 usando o [Resource Monitor](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows) e pará-lo usando o Task Manager.

#### Usando uma porta diferente de 8081

Você pode configurar o bundler para usar uma porta diferente de 8081 usando o parâmetro `port`, a partir da raiz do seu projeto execute:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start -- --port=8088
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start --port 8088
```

</TabItem>
</Tabs>

Você também precisará atualizar suas aplicações para carregar o bundle JavaScript da nova porta. Se estiver executando no dispositivo a partir do Xcode, você pode fazer isso atualizando as ocorrências de `8081` para a porta escolhida no arquivo `ios/__App_Name__.xcodeproj/project.pbxproj`.

### Erro de bloqueio do NPM

Se você encontrar um erro como `npm WARN locking Error: EACCES` ao usar o React Native CLI, tente executar o seguinte:

```shell
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### Bibliotecas ausentes para o React

Se você adicionou o React Native manualmente ao seu projeto, certifique-se de ter incluído todas as dependências relevantes que você está usando, como `RCTText.xcodeproj`, `RCTImage.xcodeproj`. Em seguida, os binários construídos por essas dependências precisam ser vinculados ao binário do seu app. Use a seção `Linked Frameworks and Binaries` nas configurações do projeto Xcode. Etapas mais detalhadas estão aqui: [Linking Libraries](linking-libraries-ios.md#content).

Se você estiver usando CocoaPods, verifique se adicionou o React junto com os subspecs ao `Podfile`. Por exemplo, se você estivesse usando as APIs `<Text />`, `<Image />` e `fetch()`, você precisaria adicionar isso no seu `Podfile`:

```
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

Em seguida, certifique-se de ter executado `pod install` e que um diretório `Pods/` foi criado no seu projeto com o React instalado. O CocoaPods irá instruí-lo a usar o arquivo `.xcworkspace` gerado daqui em diante para poder usar essas dependências instaladas.

#### React Native não compila quando usado como CocoaPod

Existe um plugin do CocoaPods chamado [cocoapods-fix-react-native](https://github.com/orta/cocoapods-fix-react-native) que lida com qualquer possível correção pós-instalação do código-fonte devido a diferenças ao usar um gerenciador de dependências.

#### Argument list too long: recursive header expansion failed

Nas configurações de build do projeto, `User Search Header Paths` e `Header Search Paths` são duas configurações que especificam onde o Xcode deve procurar arquivos de header `#import` especificados no código. Para Pods, o CocoaPods usa um array padrão de pastas específicas para procurar. Verifique se essa configuração específica não foi sobrescrita e se nenhuma das pastas configuradas é muito grande. Se uma das pastas for muito grande, o Xcode tentará pesquisar recursivamente todo o diretório e lançará o erro acima em algum momento.

Para reverter as configurações de build `User Search Header Paths` e `Header Search Paths` para seus padrões definidos pelo CocoaPods - selecione a entrada no painel Build Settings e pressione delete. Isso removerá a substituição personalizada e retornará aos padrões do CocoaPod.

### No transports available

O React Native implementa um polyfill para WebSockets. Esses [polyfills](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/InitializeCore.js) são inicializados como parte do módulo react-native que você inclui em sua aplicação através de `import React from 'react'`. Se você carregar outro módulo que requer WebSockets, como [Firebase](https://github.com/facebook/react-native/issues/3645), certifique-se de carregá-lo/requerê-lo após o react-native:

```
import React from 'react';
import Firebase from 'firebase';
```

## Shell Command Unresponsive Exception

Se você encontrar uma exceção ShellCommandUnresponsiveException como:

```
Execution failed for task ':app:installDebug'.
  com.android.builder.testing.api.DeviceException: com.android.ddmlib.ShellCommandUnresponsiveException
```

Reinicie o servidor ADB executando os seguintes comandos no seu terminal:

```
adb kill-server
adb start-server
```

## Unable to start react-native package manager (on Linux)

### Case 1: Error "code":"ENOSPC","errno":"ENOSPC"

Problema causado pelo número de diretórios que o [inotify](https://github.com/guard/listen/blob/master/README.md#increasing-the-amount-of-inotify-watchers) (usado pelo watchman no Linux) pode monitorar. Para resolver, execute este comando na janela do seu terminal

```shell
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Error: spawnSync ./gradlew EACCES

Se você encontrar um problema onde executar `npm run android` ou `yarn android` no macOS lança o erro acima, tente executar o comando `sudo chmod +x android/gradlew` para tornar os arquivos `gradlew` executáveis.

[metro]: https://metrobundler.dev/
