---
ia-translated: true
title: Referência de Bots
---

## pull-bot

Este bot linter de pull request realiza verificações básicas de sanidade sempre que um pull request é criado. Ele pode deixar um comentário no pull request se não conseguir encontrar um test plan ou um changelog na descrição, ou se perceber que o pull request não foi aberto contra o branch `main`. Este bot usa [Danger](https://danger.systems), e sua configuração pode ser encontrada em [`dangerfile.js`](https://github.com/facebook/react-native/blob/main/packages/react-native-bots/dangerfile.js).

## analysis-bot

O bot de análise de código coleta feedback de ferramentas como Prettier, eslint e Flow sempre que um commit é adicionado a um pull request. Se alguma dessas ferramentas encontrar problemas com o código, o bot adicionará esses problemas como comentários de revisão inline no pull request. Sua configuração pode ser encontrada no arquivo [`analyze_code.sh`](https://github.com/facebook/react-native/blob/main/scripts/circleci/analyze_code.sh) no repositório principal.

## label-actions

Um bot que age sobre uma issue ou pull request com base em uma label. Configurado em [`.github/workflows/on-issue-labeled.yml`](https://github.com/facebook/react-native/blob/main/.github/workflows/on-issue-labeled.yml).

## github-actions

Um bot que executa ações definidas em um workflow do GitHub. Workflows são configurados em [`.github/workflows`](https://github.com/facebook/react-native/tree/main/.github/workflows).

## facebook-github-bot

O Facebook GitHub Bot é usado em vários projetos open source na Meta. No caso do React Native, você provavelmente o encontrará quando ele fizer push de um merge commit para `main` após um pull request ser importado com sucesso para o source control interno do Facebook. Ele também informará aos autores se estiverem faltando um Contributor License Agreement.

## react-native-bot

O React Native bot é uma ferramenta que nos ajuda a automatizar vários processos descritos neste wiki. Configurado em [`hramos/react-native-bot`](https://github.com/hramos/react-native-bot).
