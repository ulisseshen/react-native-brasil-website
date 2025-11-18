---
ia-translated: true
title: Como Abrir um Pull Request
---

Estas instruções fornecem o processo passo a passo para configurar sua máquina para fazer contribuições ao repositório principal do React Native e criar seu primeiro pull request.

## Prólogo: Preparando-se

Você precisará de algumas ferramentas e dependências para compilar e desenvolver para o React Native. Elas são cobertas como parte do guia [Configuração do Ambiente](/docs/environment-setup) na seção "Building Projects with Native Code".

Para aceitar seu pull request, precisamos que você envie um [Contributor License Agreement (CLA)](/contributing/contribution-license-agreement). Você só precisa fazer isso uma vez para trabalhar em qualquer um dos projetos open source da Meta. Leva apenas um minuto, então você pode fazer isso enquanto espera suas dependências instalarem.

## Capítulo I: Bem-vindo ao Open Source

### 1. Instale o `git`

O código fonte do React Native está hospedado no GitHub. Você pode interagir com o sistema de controle de versão git através do programa de linha de comando `git`. Recomendamos que você siga as [instruções do GitHub](https://help.github.com/articles/set-up-git/) para configurar o git em sua máquina.

### 2. Obtenha o código fonte

Embora você possa navegar pelo código fonte do React Native no [GitHub](https://github.com/facebook/react-native), recomendamos que você configure um fork em sua máquina local.

1. Vá para https://github.com/facebook/react-native.
2. Clique no botão "Fork" no canto superior direito.
3. Quando perguntado, selecione seu nome de usuário como o host para este fork.

Agora você terá um fork do React Native no GitHub em https://github.com/your_username/react-native. Em seguida, você obterá uma cópia do código fonte para sua máquina local. Abra um shell e digite os seguintes comandos:

```bash
git clone https://github.com/facebook/react-native.git
cd react-native
git remote add fork https://github.com/your_username/react-native.git
```

:::note
Se o que foi dito acima parece novo para você, não tenha medo. Você pode acessar um shell através do aplicativo Terminal no macOS e Linux, ou PowerShell no Windows.
:::

Um novo diretório `react-native` será criado com o conteúdo do repositório principal do React Native. Este diretório é na verdade um clone do repositório git do React Native. Ele está configurado com dois remotes:

- `origin` para o repositório upstream https://github.com/facebook/react-native
- `fork` para o fork do React Native em sua própria conta do GitHub.

### 3. Crie um branch

Recomendamos criar um novo branch em seu fork para acompanhar suas alterações:

```bash
git checkout -b my_feature_branch --track origin/main
```

## Capítulo II: Implementando suas Alterações

### 1. Instale as dependências

React Native é um monorepo JavaScript gerenciado pelo [Yarn Workspaces (Yarn Classic)](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

Execute uma instalação em nível de projeto:

```sh
yarn
```

Você também precisará compilar o pacote `react-native-codegen` uma vez:

```sh
yarn --cwd packages/react-native-codegen build
```

### 2. Faça alterações no código

Agora você pode abrir o projeto usando o editor de código de sua escolha. O [Visual Studio Code](https://code.visualstudio.com/) é popular entre desenvolvedores JavaScript e é recomendado se você estiver fazendo alterações gerais no React Native.

Configurações de projeto para IDE:

- **VS Code**: Abra o arquivo `react-native.code-workspace`. Isso deve abrir com recomendações de extensões e configurar corretamente o Flow Language Service e outras configurações do editor.
- **Android Studio**: Abra a pasta raiz do repositório (contendo o diretório de configuração `.idea`).
- **Xcode**: Abra `packages/rn-tester/RNTesterPods.xcworkspace`.

### 3. Execute suas alterações

O pacote rn-tester pode ser usado para executar e validar suas alterações. Você pode aprender mais no [readme do RNTester](https://github.com/facebook/react-native/blob/main/packages/rn-tester/README.md).

### 4. Teste suas alterações

Certifique-se de que suas alterações estão corretas e não introduzem nenhuma falha de teste. Você pode aprender mais em [Executando e Escrevendo Testes](/contributing/how-to-run-and-write-tests).

### 5. Execute o lint no seu código

Entendemos que pode levar um tempo para se adaptar e ter uma noção do estilo seguido para cada uma das linguagens em uso no repositório principal do React Native. Desenvolvedores não devem se preocupar com pequenos detalhes, então sempre que possível, usamos ferramentas que automatizam o processo de reescrever seu código para seguir as convenções.

Por exemplo, usamos o [Prettier](https://prettier.io/) para formatar nosso código JavaScript. Isso economiza seu tempo e energia, pois você pode deixar o Prettier corrigir quaisquer problemas de formatação automaticamente através de suas integrações com editores, ou executando manualmente `yarn run prettier`.

Também usamos um linter para capturar problemas de estilo que possam existir em seu código. Você pode verificar o status do estilo do seu código executando `yarn run lint`.

Para aprender mais sobre convenções de codificação, consulte o guia [Estilo de Codificação](/contributing/how-to-contribute-code#coding-style).

### 6. Visualize suas alterações

Muitos editores populares se integram com controle de versão de alguma forma. Você também pode usar `git status` e `git diff` na linha de comando para acompanhar o que mudou.

## Capítulo III: Propondo suas Alterações

### 1. Faça commit das suas alterações

Certifique-se de adicionar suas alterações ao controle de versão usando o `git`:

```bash
git add <filename>
git commit -m <message>
```

Você pode usar uma frase descritiva curta como sua mensagem de commit.

:::note
Preocupado em escrever boas mensagens de commit do git? Não se preocupe. Mais tarde, quando seu pull request for mesclado, todos os seus commits serão combinados (squashed) em um único commit. É a descrição do seu pull request que será usada para preencher a mensagem deste commit combinado.
:::

Este guia cobre informações suficientes para ajudá-lo com sua primeira contribuição. O GitHub tem vários recursos para ajudá-lo a começar com o git:

- [Using Git](https://help.github.com/en/categories/using-git)
- [The GitHub Flow](https://guides.github.com/introduction/flow/)

### 2. Envie suas alterações para o GitHub

Depois que suas alterações forem commitadas no controle de versão, você pode enviá-las para o GitHub.

```bash
git push fork <my_feature_branch>
```

Se tudo correr bem, você verá uma mensagem encorajando você a abrir um pull request:

```
remote:
remote: Create a pull request for 'your_feature_branch' on GitHub by visiting:
remote:      https://github.com/your_username/react-native/pull/new/your_feature_branch
remote:
```

Visite a URL fornecida para prosseguir para o próximo passo.

### 3. Crie seu pull request

Você está quase lá! O próximo passo é preencher o pull request. Use um título descritivo que não seja muito longo. Então, certifique-se de preencher todos os campos fornecidos pelo template padrão de pull request:

- **Summary:** Use este campo para fornecer sua motivação para enviar este pull request. O que você está corrigindo?
- **[Changelog](/contributing/changelogs-in-pull-requests):** Ajude os mantenedores de release a escrever notas de release fornecendo uma breve descrição do que será alterado caso o pull request seja mesclado.
- **Test Plan:** Informe aos revisores como você testou suas alterações. Você considerou algum caso extremo? Quais passos você seguiu para garantir que suas alterações tenham o efeito desejado? Consulte [What is a Test Plan?](https://medium.com/@martinkonicek/what-is-a-test-plan-8bfc840ec171) para saber mais.

### 4. Revise e atenda ao feedback

Fique de olho em quaisquer comentários e feedback de revisão deixados em seu pull request no GitHub. Os mantenedores farão o melhor para fornecer feedback construtivo e prático para ajudar a deixar suas alterações prontas para serem mescladas no repositório principal do React Native.
