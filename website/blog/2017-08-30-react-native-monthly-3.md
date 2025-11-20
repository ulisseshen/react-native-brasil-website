---
ia-translated: true
title: 'React Native Monthly #3'
authors: [grabbou]
tags: [engineering]
---

A reunião mensal do React Native continua! A reunião deste mês foi um pouco mais curta, pois a maioria de nossas equipes estava ocupada com lançamentos. No próximo mês, estaremos na conferência [React Native EU](https://react-native.eu/) em Wroclaw, Polônia. Certifique-se de pegar um ingresso e nos vemos lá pessoalmente! Enquanto isso, vamos ver o que nossas equipes estão fazendo.

## Equipes

Nesta terceira reunião, tivemos 5 equipes se juntando a nós:

- [Callstack](https://github.com/callstack)
- [Expo](https://github.com/expo)
- [Facebook](https://github.com/facebook)
- [Microsoft](https://github.com/microsoft)
- [Shoutem](https://github.com/shoutem)

## Notas

Aqui estão as notas de cada equipe:

### Callstack

- Recentemente lançou open source [`react-native-material-palette`](https://github.com/callstack-io/react-native-material-palette). Ele extrai cores proeminentes de imagens para ajudá-lo a criar aplicativos visualmente envolventes. É apenas Android no momento, mas estamos investigando adicionar suporte para iOS no futuro.
- Lançamos suporte HMR no [`haul`](https://github.com/callstack-io/haul) e várias outras coisas legais! Confira os últimos lançamentos.
- React Native EU 2017 está chegando! O próximo mês é tudo sobre React Native e Polônia! Certifique-se de pegar os últimos ingressos disponíveis [aqui](https://react-native.eu/).

### Expo

- Lançou suporte para instalar pacotes npm no [Snack](https://snack.expo.io). Restrições usuais da Expo se aplicam -- pacotes não podem depender de APIs nativas personalizadas que ainda não estão incluídas na Expo. Também estamos trabalhando em suportar múltiplos arquivos e upload de assets no Snack. [Satyajit](https://github.com/satya164) falará sobre Snack na [React Native Europe](https://react-native.eu/).
- Lançou SDK20 com câmera, pagamentos, armazenamento seguro, magnetômetro, pause/resume de downloads fs e tela de splash/carregamento melhorada.
- Continuando a trabalhar com [Krzysztof](https://github.com/kmagiera) no [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler). Por favor, experimente, reconstrua algum gesto que você construiu anteriormente usando PanResponder ou reconhecedores de gestos nativos e nos avise quais problemas você encontra.
- Experimentando com protocolo de debugging JSC, trabalhando em várias solicitações de recursos no [Canny](https://expo.canny.io/feature-requests).

### Facebook

- No mês passado discutimos o gerenciamento do rastreador de issues do GitHub e que tentaríamos fazer melhorias para abordar a manutenibilidade do projeto.
- Atualmente, o número de issues abertas está se mantendo estável em torno de 600, e parece que pode permanecer assim por um tempo. No mês passado, fechamos 690 issues devido à falta de atividade (definida como sem comentários nos últimos 60 dias). Dessas 690 issues, 58 foram reabertas por várias razões (um mantenedor se comprometeu a fornecer uma correção, ou um contribuidor fez um ótimo argumento para manter a issue aberta).
- Planejamos continuar com o fechamento automatizado de issues obsoletas no futuro previsível. Gostaríamos de estar em um estado onde cada issue impactante aberta no rastreador seja atendida, mas ainda não estamos lá. Precisamos de toda a ajuda que pudermos de mantenedores para fazer triagem de issues e garantir que não percamos issues que introduzem regressões ou introduzem breaking changes, especialmente aquelas que afetam projetos recém-criados. Pessoas interessadas em ajudar podem usar o Facebook GitHub Bot para fazer triagem de issues e pull requests. O novo Maintainers Guide contém mais informações sobre triagem e uso do GitHub Bot. Por favor, adicione-se à [força-tarefa de issues](https://github.com/facebook/react-native/blob/master/bots/IssueCommands.txt) e encoraje outros membros ativos da comunidade a fazer o mesmo!

### Microsoft

- O novo aplicativo Skype é construído em cima do React Native para facilitar o compartilhamento do máximo de código possível entre plataformas. O aplicativo Skype baseado em React Native está atualmente disponível nas lojas de aplicativos Android e iOS.
- Ao construir o aplicativo Skype no React Native, enviamos pull requests para React Native para abordar bugs e recursos ausentes que encontramos. Até agora, tivemos cerca de [70 pull requests merged](https://github.com/facebook/react-native/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Arigdern%20).
- React Native nos permitiu alimentar tanto o aplicativo Skype Android quanto iOS a partir da mesma base de código. Também queremos usar essa base de código para alimentar o aplicativo web Skype. Para nos ajudar a alcançar esse objetivo, construímos e lançamos open source uma camada fina em cima do React/React Native chamada [ReactXP](https://microsoft.github.io/reactxp/blog/2017/04/06/introducing-reactxp.html). ReactXP fornece um conjunto de componentes cross platform que são mapeados para React Native ao direcionar iOS/Android e para react-dom ao direcionar a web. Os objetivos do ReactXP são similares a outra biblioteca open source chamada React Native for Web. Há uma breve descrição de como as abordagens dessas bibliotecas diferem no [ReactXP FAQ](https://microsoft.github.io/reactxp/docs/faq.html).

### Shoutem

- Estamos continuando nossos esforços em melhorar e simplificar a experiência do desenvolvedor ao construir aplicativos usando [Shoutem](https://shoutem.github.io/).
- Começamos a migrar todos os nossos aplicativos para react-navigation, mas acabamos adiando isso até que uma versão mais estável seja lançada, ou uma das soluções de navegação nativa se torne estável.
- Atualizando todas as nossas [extensões](https://github.com/shoutem/extensions) e a maioria de nossas bibliotecas open source ([animation](https://github.com/shoutem/animation), [theme](https://github.com/shoutem/theme), [ui](https://github.com/shoutem/ui)) para React Native 0.47.1.

## Próxima sessão

A próxima sessão está agendada para quarta-feira, 13 de setembro de 2017. Como esta foi apenas nossa terceira reunião, gostaríamos de saber como essas notas beneficiam a comunidade React Native. Sinta-se à vontade para me contatar [no Twitter](https://twitter.com/grabbou) se você tiver alguma sugestão sobre como devemos melhorar o resultado da reunião.
