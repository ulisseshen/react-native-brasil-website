<!-- ia-translated: true -->
## Instalando dependências

Você precisará do Node, Watchman, a interface de linha de comando do React Native, um JDK e Android Studio.

Embora você possa usar qualquer editor de sua escolha para desenvolver seu app, você precisará instalar o Android Studio para configurar as ferramentas necessárias para compilar seu app React Native para Android.

<h3>Node &amp; Watchman</h3>

Recomendamos instalar o Node e o Watchman usando o [Homebrew](https://brew.sh/). Execute os seguintes comandos em um Terminal após instalar o Homebrew:

```shell
brew install node
brew install watchman
```

Se você já instalou o Node em seu sistema, certifique-se de que seja Node 20.19.4 ou mais recente.

[Watchman](https://facebook.github.io/watchman) é uma ferramenta do Facebook para observar mudanças no sistema de arquivos. É altamente recomendável que você instale-o para melhor desempenho.

<h3>Java Development Kit</h3>

Recomendamos instalar a distribuição OpenJDK chamada Azul **Zulu** usando o [Homebrew](https://brew.sh/). Execute os seguintes comandos em um Terminal após instalar o Homebrew:

```shell
brew install --cask zulu@17

# Get path to where cask was installed to find the JDK installer
brew info --cask zulu@17

# ==> zulu@17: <version number>
# https://www.azul.com/downloads/
# Installed
# /opt/homebrew/Caskroom/zulu@17/<version number> (185.8MB) (note that the path is /usr/local/Caskroom on non-Apple Silicon Macs)
# Installed using the formulae.brew.sh API on 2024-06-06 at 10:00:00

# Navigate to the folder
open /opt/homebrew/Caskroom/zulu@17/<version number> # or /usr/local/Caskroom/zulu@17/<version number>
```

Após abrir o Finder, clique duas vezes no pacote `Double-Click to Install Azul Zulu JDK 17.pkg` para instalar o JDK.

Após a instalação do JDK, adicione ou atualize sua variável de ambiente `JAVA_HOME` em `~/.zshrc` (ou em `~/.bash_profile`).

Se você usou os passos acima, o JDK provavelmente estará localizado em `/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`:

```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

A distribuição Zulu OpenJDK oferece JDKs para **Macs Intel e M1**. Isso garantirá que suas compilações sejam mais rápidas em Macs M1 em comparação com o uso de um JDK baseado em Intel.

Se você já instalou o JDK em seu sistema, recomendamos JDK 17. Você pode encontrar problemas usando versões mais recentes do JDK.

<h3>Android development environment</h3>

Configurar seu ambiente de desenvolvimento pode ser um pouco tedioso se você é novo no desenvolvimento Android. Se você já está familiarizado com o desenvolvimento Android, há algumas coisas que você pode precisar configurar. De qualquer forma, certifique-se de seguir cuidadosamente os próximos passos.

<h4 id="android-studio">1. Install Android Studio</h4>

[Baixe e instale o Android Studio](https://developer.android.com/studio). Enquanto estiver no assistente de instalação do Android Studio, certifique-se de que as caixas ao lado de todos os seguintes itens estejam marcadas:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

Em seguida, clique em "Next" para instalar todos esses componentes.

:::note
Se as caixas de seleção estiverem acinzentadas, você terá a chance de instalar esses componentes mais tarde.
:::

Quando a configuração for finalizada e você for apresentado à tela de boas-vindas, prossiga para o próximo passo.

<h4 id="android-sdk">2. Install the Android SDK</h4>

O Android Studio instala o Android SDK mais recente por padrão. Compilar um app React Native com código nativo, no entanto, requer o SDK `Android 15 (VanillaIceCream)` em particular. SDKs Android adicionais podem ser instalados através do SDK Manager no Android Studio.

Para fazer isso, abra o Android Studio, clique no botão "More Actions" e selecione "SDK Manager".

![Android Studio Welcome](/docs/assets/GettingStartedAndroidStudioWelcomeMacOS.png)

:::tip
O SDK Manager também pode ser encontrado no diálogo "Settings" do Android Studio, em **Languages & Frameworks** → **Android SDK**.
:::

Selecione a aba "SDK Platforms" dentro do SDK Manager, então marque a caixa ao lado de "Show Package Details" no canto inferior direito. Procure e expanda a entrada `Android 15 (VanillaIceCream)`, então certifique-se de que os seguintes itens estejam marcados:

- `Android SDK Platform 35`
- `Intel x86 Atom_64 System Image` ou `Google APIs Intel x86 Atom System Image` ou (para Apple M1 Silicon) `Google APIs ARM 64 v8a System Image`

Em seguida, selecione a aba "SDK Tools" e marque a caixa ao lado de "Show Package Details" aqui também. Procure e expanda a entrada "Android SDK Build-Tools", então certifique-se de que `35.0.0` esteja selecionado.

Finalmente, clique em "Apply" para baixar e instalar o Android SDK e as ferramentas de compilação relacionadas.

<h4>3. Configure the ANDROID_HOME environment variable</h4>

As ferramentas do React Native requerem que algumas variáveis de ambiente sejam configuradas para compilar apps com código nativo.

Adicione as seguintes linhas ao seu arquivo de configuração `~/.zprofile` ou `~/.zshrc` (se você estiver usando `bash`, então `~/.bash_profile` ou `~/.bashrc`):

```shell
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Execute `source ~/.zprofile` (ou `source ~/.bash_profile` para `bash`) para carregar a configuração em seu shell atual. Verifique se ANDROID_HOME foi definido executando `echo $ANDROID_HOME` e se os diretórios apropriados foram adicionados ao seu path executando `echo $PATH`.

:::note
Certifique-se de usar o caminho correto do Android SDK. Você pode encontrar a localização real do SDK no diálogo "Settings" do Android Studio, em **Languages & Frameworks** → **Android SDK**.
:::

<h2>Preparing the Android device</h2>

Você precisará de um dispositivo Android para executar seu app Android React Native. Isso pode ser um dispositivo Android físico ou, mais comumente, você pode usar um Android Virtual Device que permite emular um dispositivo Android em seu computador.

De qualquer forma, você precisará preparar o dispositivo para executar apps Android para desenvolvimento.

<h3>Using a physical device</h3>

Se você tem um dispositivo Android físico, pode usá-lo para desenvolvimento no lugar de um AVD conectando-o ao seu computador usando um cabo USB e seguindo as instruções [aqui](running-on-device.md).

<h3>Using a virtual device</h3>

Se você usar o Android Studio para abrir `./AwesomeProject/android`, poderá ver a lista de Android Virtual Devices (AVDs) disponíveis abrindo o "AVD Manager" dentro do Android Studio. Procure por um ícone que se parece com este:

<img src="/docs/assets/GettingStartedAndroidStudioAVD.svg" alt="Android Studio AVD Manager" width="100"/>

Se você instalou recentemente o Android Studio, provavelmente precisará [criar um novo AVD](https://developer.android.com/studio/run/managing-avds.html). Selecione "Create Virtual Device...", então escolha qualquer Phone da lista e clique em "Next", depois selecione a imagem **VanillaIceCream** API Level 35.

Clique em "Next" e depois "Finish" para criar seu AVD. Neste ponto, você deve ser capaz de clicar no botão de triângulo verde ao lado do seu AVD para iniciá-lo.

<h3>That's it!</h3>

Parabéns! Você configurou com sucesso seu ambiente de desenvolvimento.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>Now what?</h2>

- Se você quiser adicionar este novo código React Native a uma aplicação existente, confira o [guia de integração](integration-with-existing-apps.md).
- Se você está curioso para aprender mais sobre React Native, confira a [Introdução ao React Native](getting-started).
