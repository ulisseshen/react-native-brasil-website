<!-- ia-translated: true -->

# [reactnative.dev](https://reactnative.dev/) &middot; [![CC BY 4.0 license](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](LICENSE-docs) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md) <a href="https://twitter.com/intent/follow?screen_name=reactnative"><img src="https://img.shields.io/twitter/follow/reactnative.svg?label=Follow%20@reactnative" alt="Follow @reactnative on X" /></a> <a href="https://bsky.app/profile/reactnative.dev"><img src="https://img.shields.io/badge/Bluesky-0285FF?logo=bluesky&logoColor=fff" alt="Follow @reactnative.dev on Bluesky" /></a>

Este repositório contém a configuração do site e a documentação que alimenta o [site do React Native](https://reactnative.dev/).

> Se você está procurando o código-fonte do [site React Native Archive](https://archive.reactnative.dev/), selecione a branch [`archive`](https://github.com/facebook/react-native-website/tree/archive).

## Conteúdo

- [Começando](#%EF%B8%8F-getting-started)
- [Visão geral](#-overview)
- [Configuração do site](#-website-configuration)
- [Contribuindo](#-contributing)
- [Licença](#-license)

## ✈️ Começando

### Pré-requisitos

1. [Git](https://git-scm.com/downloads).
1. [Node](https://nodejs.org/en/download/) _(versão 22 ou superior)_.
1. [Yarn](https://yarnpkg.com/getting-started/install) _(versão 4)_.
1. Um fork e clone do repositório `react-native-website` _(para quaisquer contribuições)_.

### Instalação

1. `cd react-native-website` para entrar na raiz do projeto.
1. Execute `corepack enable` para habilitar o Corepack.

   > Se o comando acima falhar, execute `npm install -g corepack@latest` para instalar a versão mais recente do [Corepack](https://yarnpkg.com/corepack#installation).

1. Execute `yarn` para instalar as dependências do workspace do site.
   > Se você quiser manter o `yarn` classic instalado globalmente, você pode usar `corepack yarn` em vez disso.

### Executando localmente

1. Execute `yarn start` para iniciar o servidor de desenvolvimento _(alimentado pelo [Docusaurus](https://docusaurus.io))_.
1. Abra o site <http://localhost:3000/> no seu navegador favorito.

## 📖 Visão geral

Se você gostaria de **_contribuir com uma edição ou adição à documentação,_** leia nosso [guia de estilo](STYLEGUIDE.md) antes de escrever qualquer coisa.
Quase todo o nosso conteúdo é gerado a partir de arquivos markdown que você pode encontrar nos diretórios `docs`, `website/architecture` e `website/contributing`.

**_Para editar os componentes internos de como o site é construído,_** você pode querer se familiarizar com como o site é construído. O site do React Native é um site estático gerado usando [Docusaurus](https://docusaurus.io/).
A configuração do site pode ser encontrada no diretório `website`. Visite o site do Docusaurus para saber mais sobre todas as opções de configuração disponíveis.

### Estrutura de Diretórios

O seguinte é uma visão geral de alto nível dos arquivos e pastas relevantes.

```
react-native-website/
├── docs/
│   ├── [BASE VERSIONED DOC FILES]
│   └── ...
└── website/
    ├── architecture/
    │   ├── [ARCHITECTURE DOC FILES]
    │   └── ...
    ├── blog/
    │   ├── [BLOG POSTS]
    │   └── ...
    ├── contributing/
    │   ├── [CONTRIBUTING DOC FILES]
    │   └── ...
    ├── core/
    │   ├── [CUSTOM COMPONENTS]
    │   └── ...
    ├── src/
    │   ├── css/
    │   │   ├── [CUSTOM STYLES]
    │   │   └── ...
    │   ├── pages/
    │   │   ├── [STATIC PAGES]
    │   │   └── ...
    │   └── theme/
    │   │   ├── [SWIZZLED COMPONENTS]
    │   │   └── ...
    ├── static/
    │   ├── blog/
    │   │   └── assets/
    │   ├── docs/
    │   │   └── assets/
    │   └── img/
    ├── versioned_docs/
    │   ├── [GENERATED VERSIONED DOC FILES]
    │   └── ...
    ├── versioned_sidebars/
    │   ├── [GENERATED VERSIONED SIDEBARS]
    │   └── ...
    ├── docusaurus.config.ts
    ├── package.json
    ├── showcase.json
    ├── sidebars.ts
    ├── sidebarsArchitecture.ts
    ├── sidebarsCommunity.ts
    ├── sidebarsContributing.ts
    └── versions.json
```

### Fontes da documentação

Como mencionado acima, a pasta `docs` contém os arquivos-fonte para a documentação das abas "Guides", "Components" e "APIs" no site do React Native (documentação versionada).
Os arquivos de documentação para as abas "Architecture" e "Contribution" estão localizados dentro de `website` nos respectivos diretórios (documentação não versionada/estática).
Na maioria dos casos, você só vai querer editar os arquivos dentro desses diretórios.

Se você está adicionando uma nova documentação ou precisa alterar a ordem em que a documentação aparece na barra lateral, dê uma olhada nos arquivos `sidebars.ts`, `sidebarsArchitecture.ts` e `sidebarsContributing.ts` no diretório `website`. Os arquivos da barra lateral contêm uma lista de IDs de documentos que devem corresponder àqueles definidos nos metadados do cabeçalho (também conhecido como frontmatter) dos arquivos markdown da documentação.

### Documentação versionada

Parte do site do React Native é versionada para permitir que os usuários voltem e vejam os Guias ou a documentação de referência da API para qualquer versão lançada. Uma nova versão do site é geralmente gerada sempre que há um novo lançamento do React Native. Quando isso acontece, quaisquer alterações feitas nos arquivos `docs` e `website/sidebars.ts` serão copiadas para o local correspondente dentro de `website/versioned_docs` e `website/versioned_sidebars`.

> [!NOTE]
> Não edite os arquivos gerados automaticamente dentro de `versioned_docs` ou `versioned_sidebars` a menos que você tenha certeza de que é necessário. Edições feitas em versões mais antigas não serão propagadas para versões mais recentes da documentação versionada.

O Docusaurus mantém o controle da lista de versões do site no arquivo `website/versions.json`. A ordenação das versões neste arquivo deve estar em ordem cronológica reversa.

#### Criando uma nova versão

##### Após RC

O site do React Native faz lint e verificação de tipos em documentos em "next". A versão do React Native usada pelo linter deve ser atualizada antes de um lançamento para consistência e para detectar quaisquer documentos/exemplos onde as APIs mudaram.

Isso pode ser feito atualizando o `package.json` e arquivos de configuração em `script/lint-examples` da mesma forma que uma aplicação React Native seria atualizada. O diff desses arquivos pode ser visto usando uma ferramenta como [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/?from=0.70.6&to=0.71.0).

##### Após o Lançamento

1. `cd react-native-website` para entrar na raiz do projeto.
1. `cd website` para entrar na parte do site do projeto.
1. Execute `yarn version:cut <newVersion>` onde `<newVersion>` é a nova versão sendo lançada (por exemplo, `0.81`).
1. Abra um PR e faça commit dessa alteração como "Cut branch <newVersion>"

## 🔧 Configuração do site

O arquivo de configuração principal do site pode ser encontrado em `website/docusaurus.config.ts`. Este arquivo diz ao [Docusaurus como construir o site](https://docusaurus.io/docs/configuration). Edições neste arquivo são raramente necessárias.

O subdiretório `core` contém componentes JavaScript e React que são a parte central do site.

O subdiretório `src/pages` contém os componentes React que compõem as páginas não documentais do site, como a página inicial.

O subdiretório `src/theme` contém os componentes React swizzled do tema do Docusaurus.

O arquivo `showcase.json` contém a lista de usuários que são destacados no showcase do React Native.

## 👏 Contribuindo

### Criar uma branch

1. `git checkout main` de qualquer pasta no seu repositório local `react-native-website`.
1. `git pull origin main` para garantir que você tenha o código main mais recente.
1. `git checkout -b the-name-of-my-branch` para criar uma branch.
   > substitua `the-name-of-my-branch` por um nome adequado, como `update-animations-page`

### Fazer a alteração

1. Siga as instruções "[Executando localmente](#running-locally)".
1. Salve os arquivos e verifique no navegador.
1. Algumas alterações podem exigir uma reinicialização do servidor para gerar novos arquivos. (Páginas em `docs` sempre exigem!)
1. Edições em páginas em `docs` só serão visíveis na versão mais recente da documentação, chamada "Next", localizada sob o caminho `docs/next`.

Visite **<http://localhost:3000/docs/next/YOUR-DOCS-PAGE>** para ver seu trabalho.

> [!NOTE]
> Visite <http://localhost:3000/versions> para ver a lista de todas as versões da documentação, se você fez backport de algumas das alterações.

> [!TIP]
> Se você está adicionando assets, certifique-se de que eles estejam otimizados para a web. Você pode usar ferramentas como [ImageOptim](https://imageoptim.com/mac) para aplicar automaticamente compressão sem perdas em vários tipos de arquivo.

### Testar a alteração

Se possível, teste quaisquer alterações visuais em todas as versões mais recentes dos seguintes navegadores:

- Chrome e Firefox no desktop.
- Chrome e Safari no mobile.

### Fazer o push

1. Execute `yarn prettier` e `yarn language:lint` no diretório `./website` para garantir que suas alterações sejam consistentes com outros arquivos no repositório.
1. Execute `yarn update-lock` para [deduplicar dependências](https://yarnpkg.com/cli/dedupe).
1. `git add -A && git commit -m "My message"` para preparar e fazer commit das suas alterações.
   > substitua `My message` por uma mensagem de commit, como `Fixed header logo on Android`
1. `git push my-fork-name the-name-of-my-branch`
1. Vá para o [repositório react-native-website](https://github.com/facebook/react-native-website) e você deve ver branches enviadas recentemente.
1. Siga as instruções do GitHub.
1. Descreva brevemente suas alterações (no caso de alterações visuais, por favor inclua screenshots).

## 📄 Licença

React Native é [licenciado sob MIT](./LICENSE).

A documentação do React Native é [licenciada sob Creative Commons](./LICENSE-docs).
