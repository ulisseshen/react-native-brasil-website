<!-- ia-translated: true -->
## Instalando dependências

Você precisará de Node, a interface de linha de comando do React Native, um JDK e o Android Studio.

Embora você possa usar qualquer editor de sua escolha para desenvolver seu app, será necessário instalar o Android Studio para configurar as ferramentas necessárias para compilar seu app React Native para Android.

<h3>Node</h3>

Siga as [instruções de instalação para sua distribuição Linux](https://nodejs.org/en/download/package-manager/) para instalar o Node 20.19.4 ou mais recente.

<h3>Java Development Kit</h3>

O React Native atualmente recomenda a versão 17 do Java SE Development Kit (JDK). Você pode encontrar problemas ao usar versões superiores do JDK. Você pode baixar e instalar o [OpenJDK](https://openjdk.java.net) do [AdoptOpenJDK](https://adoptopenjdk.net/) ou do gerenciador de pacotes do seu sistema.

<h3>Android development environment</h3>

Configurar seu ambiente de desenvolvimento pode ser um pouco tedioso se você é novo no desenvolvimento Android. Se você já está familiarizado com o desenvolvimento Android, existem algumas coisas que você pode precisar configurar. Em ambos os casos, certifique-se de seguir cuidadosamente os próximos passos.

<h4 id="android-studio">1. Install Android Studio</h4>

[Baixe e instale o Android Studio](https://developer.android.com/studio). Durante o assistente de instalação do Android Studio, certifique-se de que as caixas ao lado de todos os itens a seguir estejam marcadas:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

Em seguida, clique em "Next" para instalar todos esses componentes.

:::note
Se as caixas de seleção estiverem acinzentadas, você terá a oportunidade de instalar esses componentes mais tarde.
:::

Assim que a configuração for finalizada e você for apresentado à tela de boas-vindas, prossiga para o próximo passo.

<h4 id="android-sdk">2. Install the Android SDK</h4>

O Android Studio instala o Android SDK mais recente por padrão. Compilar um app React Native com código nativo, no entanto, requer o SDK `Android 15 (VanillaIceCream)` em particular. SDKs Android adicionais podem ser instalados através do SDK Manager no Android Studio.

Para fazer isso, abra o Android Studio, clique no botão "Configure" e selecione "SDK Manager".

:::tip
O SDK Manager também pode ser encontrado na caixa de diálogo "Settings" do Android Studio, em **Languages & Frameworks** → **Android SDK**.
:::

Selecione a aba "SDK Platforms" dentro do SDK Manager e marque a caixa ao lado de "Show Package Details" no canto inferior direito. Procure e expanda a entrada `Android 15 (VanillaIceCream)` e certifique-se de que os seguintes itens estejam marcados:

- `Android SDK Platform 35`
- `Intel x86 Atom_64 System Image` ou `Google APIs Intel x86 Atom System Image`

Em seguida, selecione a aba "SDK Tools" e marque a caixa ao lado de "Show Package Details" aqui também. Procure e expanda a entrada "Android SDK Build-Tools" e certifique-se de que `35.0.0` esteja selecionado.

Por fim, clique em "Apply" para baixar e instalar o Android SDK e as ferramentas de compilação relacionadas.

<h4>3. Configure the ANDROID_HOME environment variable</h4>

As ferramentas do React Native requerem que algumas variáveis de ambiente sejam configuradas para compilar apps com código nativo.

Adicione as seguintes linhas ao seu arquivo de configuração `$HOME/.bash_profile` ou `$HOME/.bashrc` (se você estiver usando `zsh`, então `~/.zprofile` ou `~/.zshrc`):

```shell
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

:::note
`.bash_profile` é específico para `bash`. Se você estiver usando outro shell, será necessário editar o arquivo de configuração específico do shell apropriado.
:::

Digite `source $HOME/.bash_profile` para `bash` ou `source $HOME/.zprofile` para carregar a configuração no seu shell atual. Verifique se ANDROID_HOME foi definido executando `echo $ANDROID_HOME` e se os diretórios apropriados foram adicionados ao seu path executando `echo $PATH`.

:::note
Certifique-se de usar o caminho correto do Android SDK. Você pode encontrar a localização real do SDK na caixa de diálogo "Settings" do Android Studio, em **Languages & Frameworks** → **Android SDK**.
:::

<h3>Watchman</h3>

Siga o [guia de instalação do Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) para compilar e instalar o Watchman a partir do código-fonte.

:::info
[Watchman](https://facebook.github.io/watchman/docs/install) é uma ferramenta do Facebook para observar mudanças no sistema de arquivos. É altamente recomendável que você o instale para obter melhor desempenho e maior compatibilidade em certos casos extremos (traduzindo: você pode conseguir prosseguir sem instalar isso, mas os resultados podem variar; instalar isso agora pode poupá-lo de uma dor de cabeça mais tarde).
:::

<h2>Preparing the Android device</h2>

Você precisará de um dispositivo Android para executar seu app React Native Android. Pode ser um dispositivo Android físico ou, mais comumente, você pode usar um Android Virtual Device, que permite emular um dispositivo Android no seu computador.

De qualquer forma, você precisará preparar o dispositivo para executar apps Android para desenvolvimento.

<h3>Using a physical device</h3>

Se você tiver um dispositivo Android físico, pode usá-lo para desenvolvimento no lugar de um AVD conectando-o ao seu computador usando um cabo USB e seguindo as instruções [aqui](running-on-device.md).

<h3>Using a virtual device</h3>

Se você usar o Android Studio para abrir `./AwesomeProject/android`, poderá ver a lista de Android Virtual Devices (AVDs) disponíveis abrindo o "AVD Manager" dentro do Android Studio. Procure por um ícone que se parece com este:

<img src="/docs/assets/GettingStartedAndroidStudioAVD.svg" alt="Android Studio AVD Manager" width="100"/>

Se você instalou recentemente o Android Studio, provavelmente precisará [criar um novo AVD](https://developer.android.com/studio/run/managing-avds.html). Selecione "Create Virtual Device...", escolha qualquer Phone da lista e clique em "Next", depois selecione a imagem **VanillaIceCream** API Level 35.

:::tip
Recomendamos configurar [aceleração de VM](https://developer.android.com/studio/run/emulator-acceleration.html#vm-linux) no seu sistema para melhorar o desempenho. Depois de seguir essas instruções, volte ao AVD Manager.
:::

Clique em "Next" e depois em "Finish" para criar seu AVD. Neste ponto, você deve conseguir clicar no botão de triângulo verde ao lado do seu AVD para iniciá-lo.

<h3>That's it!</h3>

Parabéns! Você configurou com sucesso seu ambiente de desenvolvimento.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>Now what?</h2>

- Se você quiser adicionar este novo código React Native a um aplicativo existente, confira o [guia de Integração](integration-with-existing-apps.md).
- Se você está curioso para aprender mais sobre React Native, confira a [Introdução ao React Native](getting-started).
