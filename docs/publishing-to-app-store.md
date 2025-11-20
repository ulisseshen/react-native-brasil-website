---
ia-translated: true
id: publishing-to-app-store
title: Publicando na Apple App Store
---

O processo de publicação é o mesmo de qualquer outro aplicativo iOS nativo, com algumas considerações adicionais a serem levadas em conta.

:::info
Se você está usando Expo, leia o guia do Expo para [Deploying to App Stores](https://docs.expo.dev/distribution/app-stores/) para compilar e enviar seu aplicativo para a Apple App Store. Este guia funciona com qualquer aplicativo React Native para automatizar o processo de implantação.
:::

### 1. Configurar scheme de release

Compilar um aplicativo para distribuição na App Store requer usar o scheme `Release` no Xcode. Aplicativos compilados para `Release` desabilitarão automaticamente o Dev Menu dentro do aplicativo, o que impedirá que seus usuários acessem inadvertidamente o menu em produção. Ele também empacotará o JavaScript localmente, para que você possa colocar o aplicativo em um dispositivo e testar enquanto não estiver conectado ao computador.

Para configurar seu aplicativo para ser compilado usando o scheme `Release`, vá em **Product** → **Scheme** → **Edit Scheme**. Selecione a aba **Run** na barra lateral, então defina o dropdown Build Configuration para `Release`.

![](/docs/assets/ConfigureReleaseScheme.png)

#### Dicas Profissionais

À medida que o tamanho do seu App Bundle cresce, você pode começar a ver uma tela em branco piscando entre sua splash screen e a exibição da view raiz do aplicativo. Se este for o caso, você pode adicionar o seguinte código ao `AppDelegate.m` para manter sua splash screen exibida durante a transição.

```objectivec
  // Place this code after "[self.window makeKeyAndVisible]" and before "return YES;"
  UIStoryboard *sb = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
  UIViewController *vc = [sb instantiateInitialViewController];
  rootView.loadingView = vc.view;
```

O bundle estático é compilado toda vez que você tem como alvo um dispositivo físico, mesmo em Debug. Se você quiser economizar tempo, desative a geração de bundle em Debug adicionando o seguinte ao seu shell script na Xcode Build Phase `Bundle React Native code and images`:

```shell
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

### 2. Compilar aplicativo para release

Agora você pode compilar seu aplicativo para release tocando <kbd>Cmd ⌘</kbd> + <kbd>B</kbd> ou selecionando **Product** → **Build** na barra de menu. Uma vez compilado para release, você poderá distribuir o aplicativo para testadores beta e enviar o aplicativo para a App Store.

:::info
Você também pode usar o `React Native CLI` para executar esta operação usando a opção `--mode` com o valor `Release` (por exemplo, da raiz do seu projeto: `npm run ios -- --mode="Release"` ou `yarn ios --mode Release`).
:::

Depois de terminar os testes e estiver pronto para publicar na App Store, siga este guia.

- Abra seu terminal e navegue até a pasta iOS do seu aplicativo e digite `open .`.
- Clique duas vezes em YOUR_APP_NAME.xcworkspace. Isso deve abrir o Xcode.
- Clique em `Product` → `Archive`. Certifique-se de definir o dispositivo como "Any iOS Device (arm64)".

:::note
Verifique seu Bundle Identifier e certifique-se de que seja exatamente o mesmo que você criou nos Identifiers no Apple Developer Dashboard.
:::

- Depois que o archive for concluído, na janela de archive, clique em `Distribute App`.
- Clique em `App Store Connect` agora (se você quiser publicar na App Store).
- Clique em `Upload` → Certifique-se de que todas as caixas de seleção estejam marcadas, clique em `Next`.
- Escolha entre `Automatically manage signing` e `Manually manage signing` com base em suas necessidades.
- Clique em `Upload`.
- Agora você pode encontrá-lo no App Store Connect em TestFlight.

Agora preencha as informações necessárias e na seção Build, selecione a build do aplicativo e clique em `Save` → `Submit For Review`.

### 4. Screenshots

A Apple Store requer que você tenha screenshots para os dispositivos mais recentes. A referência para tais dispositivos seria encontrada [aqui](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/). Note que screenshots para alguns tamanhos de tela não são necessários se forem fornecidos para outros tamanhos.
