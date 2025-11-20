---
ia-translated: true
title: Como Reportar um Bug
---

Reportar um bug do React Native é uma das melhores formas de começar a contribuir com o projeto. Usamos as [GitHub issues](https://github.com/facebook/react-native/issues) como canal principal para lidar com novos relatos de bugs.

Antes de abrir um novo bug, por favor [pesquise se o bug já existe](https://github.com/facebook/react-native/issues?q=sort%3Aupdated-desc%20is%3Aissue) em nosso issue tracker. Na maioria das vezes, essa é a forma mais rápida de encontrar uma resposta, pois outra pessoa já pode ter experimentado o mesmo problema.

Se você não conseguir encontrar seu bug no issue tracker, você pode abrir um novo. Ao criar uma nova issue, certifique-se de:

- Adicionar uma descrição do problema.
- Seguir as instruções no [issue template](https://github.com/facebook/react-native/issues/new?template=bug_report.yml).
- Adicionar a versão do React Native que você está usando.
- Adicionar a saída do comando `npx @react-native-community/cli info`.
- Adicionar screenshots e vídeos do problema, se aplicável.

Todos os relatos de bugs também devem incluir um **reproducer**: o código necessário para que possamos entender o que está acontecendo e nos ajudar na depuração.

:::warning

Devido ao alto número de issues que recebemos, reproducers são **obrigatórios**. Issues sem reproducer não podem ser investigadas e provavelmente serão fechadas.

:::

## Fornecendo um Reproducer

O objetivo de um reproducer é fornecer uma forma de _reproduzir_ seu bug. Sem um reproducer, não conseguiremos entender o bug, e também não conseguiremos corrigi-lo.

O reproducer deve ser **mínimo**: tendo o menor número possível de dependências (idealmente nenhuma além de `react-native`), pois isso nos ajudará a isolar melhor o bug.
Quando alguém no GitHub está pedindo um reproducer, eles **não** estão pedindo todo o seu código-fonte.

Você precisa, em vez disso, criar um projeto **mínimo** que reproduza o mesmo crash/bug/issue que você está reportando.

Este processo é crucial, pois frequentemente as issues são de fato resolvidas ao criar um reproducer. Ao criar um reproducer, será mais fácil entender se a issue está relacionada à sua configuração específica ou se é realmente um bug no React Native.

Devido à quantidade de tráfego que temos no React Native, podemos aceitar apenas um destes como um reproducer válido:

1. Para a maioria dos bugs: envie-nos um Pull Request com o arquivo [RNTesterPlayground.js](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/Playground/RNTesterPlayground.js) editado para reproduzir seu bug.
2. Se seu bug é relacionado à UI: um [Snack](https://snack.expo.dev).
3. Se seu bug é relacionado a build/upgrade: um projeto usando nosso [Reproducer Template](https://github.com/react-native-community/reproducer-react-native/generate).

### RNTesterPlayground.js

A melhor forma de você fornecer um reproducer é abrir um Pull Request contra o React Native que edite o arquivo [`RNTesterPlayground.js`](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/Playground/RNTesterPlayground.js).

:::tip

Este reproducer executará seu código contra a branch `main` do `react-native` e é a forma **mais rápida** que temos para investigar e corrigir seus bugs.

:::

O arquivo `RNTesterPlayground.js` está localizado dentro da aplicação RN-Tester, nosso App de referência. Você pode ler mais sobre como ele funciona e como compilá-lo em seu [arquivo README dedicado](https://github.com/facebook/react-native/blob/main/packages/rn-tester/README.md).

Um exemplo desse tipo de reproducer está aqui: [Reproduce modal layout issues #50704](https://github.com/facebook/react-native/pull/50704/).

Depois que você editar o `RNTesterPlayground.js`, você poderá ver seu código sendo executado dentro da aba **Playground** do RNTester:

![Passo um](/docs/assets/RNTesterPlayground.png)

### Expo Snack

Para a maioria dos bugs relacionados à UI, você os reproduz usando um [Expo Snack](https://snack.expo.dev/).

Com o Expo Snack, você pode executar código React Native em seu navegador e vê-lo renderizando imediatamente.

Depois que você conseguir reproduzir sua issue em um Expo Snack, clique no botão **Save** para obter um link compartilhável para anexar ao seu relato de issue

### Reproducer Template

Para a maioria dos bugs relacionados a build, em vez disso, você deve reproduzi-los usando o [community reproducer template](https://github.com/react-native-community/reproducer-react-native).

Este template cria um pequeno projeto que é executado com o React Native Community CLI e que pode ser usado para demonstrar issues de build.

O template também vem com seu próprio CI já configurado com GitHub Actions, pois isso ajudará a identificar quaisquer issues de build que você possa estar tendo.

Para usar este template:

1. Clique no botão [Use this template](https://github.com/new?template_name=reproducer-react-native&template_owner=react-native-community) no GitHub para criar um novo projeto a partir do template.
2. Clone seu repositório recém-criado localmente.
3. Aplique as modificações para reproduzir sua issue.
4. Anexe o link do seu repositório ao novo relato de bug que você está criando.
