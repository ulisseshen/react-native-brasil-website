<!-- ia-translated: true -->

## Instalando dependências

Você precisará do Node, Watchman, a interface de linha de comando do React Native, Xcode e CocoaPods.

Embora você possa usar qualquer editor de sua escolha para desenvolver seu app, você precisará instalar o Xcode para configurar as ferramentas necessárias para compilar seu app React Native para iOS.

### Node & Watchman

Recomendamos instalar o Node e o Watchman usando o [Homebrew](https://brew.sh/). Execute os seguintes comandos em um Terminal após instalar o Homebrew:

```shell
brew install node
brew install watchman
```

Se você já instalou o Node no seu sistema, certifique-se de que é o Node 20.19.4 ou mais recente.

[Watchman](https://facebook.github.io/watchman) é uma ferramenta do Facebook para observar mudanças no sistema de arquivos. É altamente recomendado que você o instale para melhor desempenho.

### Xcode

Por favor, use a **versão mais recente** do Xcode.

A maneira mais fácil de instalar o Xcode é via [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Instalar o Xcode também instalará o iOS Simulator e todas as ferramentas necessárias para compilar seu app iOS.

#### Command Line Tools

Você também precisará instalar o Xcode Command Line Tools. Abra o Xcode, depois escolha **Settings... (ou Preferences...)** no menu Xcode. Vá para o painel Locations e instale as ferramentas selecionando a versão mais recente no dropdown Command Line Tools.

![Xcode Command Line Tools](/docs/assets/GettingStartedXcodeCommandLineTools.png)

#### Instalando um iOS Simulator no Xcode

Para instalar um simulator, abra **Xcode > Settings... (ou Preferences...)** e selecione a aba **Platforms (ou Components)**. Selecione um simulator com a versão correspondente do iOS que você deseja usar.

Se você está usando o Xcode versão 14.0 ou superior para instalar um simulator, abra a aba **Xcode > Settings > Platforms**, depois clique no ícone "+" e selecione a opção **iOS…**.

#### CocoaPods

[CocoaPods](https://cocoapods.org/) é um dos sistemas de gerenciamento de dependências disponíveis para iOS. CocoaPods é uma [gem](https://en.wikipedia.org/wiki/RubyGems) Ruby. Você pode instalar o CocoaPods usando a versão do Ruby que vem com a versão mais recente do macOS.

Para mais informações, por favor visite o [guia Getting Started do CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

### [Opcional] Configurando seu ambiente

A partir do React Native versão 0.69, é possível configurar o ambiente do Xcode usando o arquivo `.xcode.env` fornecido pelo template.

O arquivo `.xcode.env` contém uma variável de ambiente para exportar o caminho para o executável `node` na variável `NODE_BINARY`.
Esta é a **abordagem sugerida** para desacoplar a infraestrutura de build da versão do sistema de `node`. Você deve personalizar esta variável com seu próprio caminho ou seu próprio gerenciador de versão de `node`, se diferir do padrão.

Além disso, é possível adicionar qualquer outra variável de ambiente e carregar o arquivo `.xcode.env` em suas fases de script de build. Se você precisar executar um script que requer algum ambiente específico, esta é a **abordagem sugerida**: ela permite desacoplar as fases de build de um ambiente específico.

:::info
Se você já está usando [NVM](https://nvm.sh/) (um comando que ajuda você a instalar e alternar entre versões do Node.js) e [zsh](https://ohmyz.sh/), você pode querer mover o código que inicializa o NVM do seu `~/.zshrc` para um arquivo `~/.zshenv` para ajudar o Xcode a encontrar seu executável Node:

```zsh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

Você também pode querer garantir que todas as "shell script build phase" do seu projeto Xcode estejam usando `/bin/zsh` como seu shell.
:::

<h3>É isso!</h3>

Parabéns! Você configurou com sucesso seu ambiente de desenvolvimento.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>E agora?</h2>

- Se você quiser adicionar este novo código React Native a uma aplicação existente, confira o [guia de Integração](integration-with-existing-apps.md).
- Se você está curioso para aprender mais sobre React Native, confira a [Introdução ao React Native](getting-started).
