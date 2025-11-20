<!-- ia-translated: true -->
<h2>Instalando dependências</h2>

Você precisará do Node, da interface de linha de comando do React Native, um JDK e o Android Studio.

Embora você possa usar qualquer editor de sua escolha para desenvolver seu aplicativo, você precisará instalar o Android Studio para configurar as ferramentas necessárias para compilar seu aplicativo React Native para Android.

<h3 id="jdk">Node, JDK</h3>

Recomendamos instalar o Node via [Chocolatey](https://chocolatey.org/install), um gerenciador de pacotes popular para Windows.

É recomendado usar uma versão LTS do Node. Se você quiser poder alternar entre diferentes versões, você pode querer instalar o Node via [nvm-windows](https://github.com/coreybutler/nvm-windows), um gerenciador de versões do Node para Windows.

O React Native também requer o [Java SE Development Kit (JDK)](https://openjdk.java.net/projects/jdk/17/), que também pode ser instalado usando o Chocolatey.

Abra um Prompt de Comando como Administrador (clique com o botão direito em Prompt de Comando e selecione "Run as Administrator"), então execute o seguinte comando:

```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

Se você já instalou o Node no seu sistema, certifique-se de que é o Node 18 ou mais recente. Se você já tem um JDK no seu sistema, recomendamos o JDK17. Você pode encontrar problemas usando versões mais recentes do JDK.

:::note
Você pode encontrar opções de instalação adicionais na [página de Downloads do Node](https://nodejs.org/en/download/).
:::

:::info
Se você estiver usando a versão mais recente do Java Development Kit, você precisará alterar a versão do Gradle do seu projeto para que ele possa reconhecer o JDK. Você pode fazer isso indo para `{project root folder}\android\gradle\wrapper\gradle-wrapper.properties` e alterando o valor de `distributionUrl` para atualizar a versão do Gradle. Você pode conferir [aqui as versões mais recentes do Gradle](https://gradle.org/releases/).
:::

<h3>Android development environment</h3>

Configurar seu ambiente de desenvolvimento pode ser um pouco tedioso se você é novo no desenvolvimento Android. Se você já está familiarizado com o desenvolvimento Android, há algumas coisas que você pode precisar configurar. Em qualquer caso, certifique-se de seguir cuidadosamente os próximos passos.

<h4 id="android-studio">1. Install Android Studio</h4>

[Baixe e instale o Android Studio](https://developer.android.com/studio). Durante o assistente de instalação do Android Studio, certifique-se de que as caixas ao lado de todos os seguintes itens estejam marcadas:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`
- Se você ainda não estiver usando Hyper-V: `Performance (Intel ® HAXM)` ([Veja aqui para AMD ou Hyper-V](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html))

Em seguida, clique em "Next" para instalar todos esses componentes.

:::note
Se as caixas de seleção estiverem acinzentadas, você terá a chance de instalar esses componentes mais tarde.
:::

Uma vez que a configuração tenha finalizado e você seja apresentado à tela de boas-vindas, prossiga para o próximo passo.

<h4 id="android-sdk">2. Install the Android SDK</h4>

O Android Studio instala o Android SDK mais recente por padrão. Compilar um aplicativo React Native com código nativo, no entanto, requer o SDK `Android 15 (VanillaIceCream)` em particular. SDKs Android adicionais podem ser instalados através do SDK Manager no Android Studio.

Para fazer isso, abra o Android Studio, clique no botão "More Actions" e selecione "SDK Manager".

![Android Studio Welcome](/docs/assets/GettingStartedAndroidStudioWelcomeWindows.png)

:::tip
O SDK Manager também pode ser encontrado dentro do diálogo "Settings" do Android Studio, em **Languages & Frameworks** → **Android SDK**.
:::

Selecione a aba "SDK Platforms" dentro do SDK Manager, então marque a caixa ao lado de "Show Package Details" no canto inferior direito. Procure e expanda a entrada `Android 15 (VanillaIceCream)`, então certifique-se de que os seguintes itens estejam marcados:

- `Android SDK Platform 35`
- `Intel x86 Atom_64 System Image` ou `Google APIs Intel x86 Atom System Image`

Em seguida, selecione a aba "SDK Tools" e marque a caixa ao lado de "Show Package Details" aqui também. Procure e expanda a entrada `Android SDK Build-Tools`, então certifique-se de que `35.0.0` esteja selecionado.

Finalmente, clique em "Apply" para baixar e instalar o Android SDK e as ferramentas de compilação relacionadas.

<h4>3. Configure the ANDROID_HOME environment variable</h4>

As ferramentas do React Native requerem que algumas variáveis de ambiente sejam configuradas para compilar aplicativos com código nativo.

1. Abra o **Windows Control Panel.**
2. Clique em **User Accounts,** então clique em **User Accounts** novamente
3. Clique em **Change my environment variables**
4. Clique em **New...** para criar uma nova variável de usuário `ANDROID_HOME` que aponta para o caminho do seu Android SDK:

![ANDROID_HOME Environment Variable](/docs/assets/GettingStartedAndroidEnvironmentVariableANDROID_HOME.png)

O SDK é instalado, por padrão, no seguinte local:

```powershell
%LOCALAPPDATA%\Android\Sdk
```

Você pode encontrar o local real do SDK no diálogo "Settings" do Android Studio, em **Languages & Frameworks** → **Android SDK**.

Abra uma nova janela do Prompt de Comando para garantir que a nova variável de ambiente seja carregada antes de prosseguir para o próximo passo.

1. Abra o powershell
2. Copie e cole **Get-ChildItem -Path Env:\\** no powershell
3. Verifique se `ANDROID_HOME` foi adicionado

<h4>4. Add platform-tools to Path</h4>

1. Abra o **Windows Control Panel.**
2. Clique em **User Accounts,** então clique em **User Accounts** novamente
3. Clique em **Change my environment variables**
4. Selecione a variável **Path**.
5. Clique em **Edit.**
6. Clique em **New** e adicione o caminho para platform-tools à lista.

O local padrão para esta pasta é:

```powershell
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

<h2>Preparing the Android device</h2>

Você precisará de um dispositivo Android para executar seu aplicativo React Native Android. Isso pode ser um dispositivo Android físico, ou mais comumente, você pode usar um Android Virtual Device que permite emular um dispositivo Android no seu computador.

De qualquer forma, você precisará preparar o dispositivo para executar aplicativos Android para desenvolvimento.

<h3>Using a physical device</h3>

Se você tem um dispositivo Android físico, você pode usá-lo para desenvolvimento no lugar de um AVD conectando-o ao seu computador usando um cabo USB e seguindo as instruções [aqui](running-on-device.md).

<h3>Using a virtual device</h3>

Se você usar o Android Studio para abrir `./AwesomeProject/android`, você pode ver a lista de Android Virtual Devices (AVDs) disponíveis abrindo o "AVD Manager" dentro do Android Studio. Procure por um ícone que se parece com este:

<img src="/docs/assets/GettingStartedAndroidStudioAVD.svg" alt="Android Studio AVD Manager" width="100"/>

Se você instalou recentemente o Android Studio, você provavelmente precisará [criar um novo AVD](https://developer.android.com/studio/run/managing-avds.html). Selecione "Create Virtual Device...", então escolha qualquer Phone da lista e clique em "Next", então selecione a imagem **VanillaIceCream** API Level 35.

:::note
Se você não tem o HAXM instalado, clique em "Install HAXM" ou siga [estas instruções](https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows) para configurá-lo, então volte para o AVD Manager.
:::

Clique em "Next" e então "Finish" para criar seu AVD. Neste ponto você deve ser capaz de clicar no botão de triângulo verde ao lado do seu AVD para iniciá-lo.

<h3>That's it!</h3>

Parabéns! Você configurou com sucesso seu ambiente de desenvolvimento.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>Now what?</h2>

- Se você quiser adicionar este novo código React Native a um aplicativo existente, confira o [guia de Integração](integration-with-existing-apps.md).
- Se você está curioso para aprender mais sobre React Native, confira a [Introdução ao React Native](getting-started).
