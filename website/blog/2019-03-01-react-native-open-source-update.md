---
ia-translated: true
title: Atualização do React Native Open Source - Março de 2019
authors: [cpojer]
tags: [announcement]
---

Anunciamos nosso [roadmap do React Native Open Source](/blog/2018/11/01/oss-roadmap) no Q4 de 2018 após decidirmos investir mais na comunidade open source do React Native.

Para nosso primeiro milestone, focamos em identificar e melhorar os aspectos mais visíveis da nossa comunidade. Nossos objetivos eram reduzir os pull requests pendentes, reduzir a área de superfície do projeto, identificar os principais problemas dos usuários e estabelecer diretrizes para gestão da comunidade.

Nos últimos dois meses, fizemos mais progresso do que esperávamos. Continue lendo para mais detalhes:

### Pull Requests

Para construir uma comunidade saudável, devemos responder rapidamente às contribuições de código. Nos últimos anos, despriorizamos a revisão de contribuições da comunidade e acumulamos 280 pull requests (dezembro de 2018). No primeiro milestone, reduzimos o número de pull requests abertos para ~65. Simultaneamente, o número médio de pull requests abertos por dia aumentou de 3.5 para 7, o que significa que lidamos com cerca de [600 pull requests](https://github.com/facebook/react-native/pulls?page=24&q=is%3Apr+closed%3A%3E2018-12-01&utf8=%E2%9C%93) nos últimos três meses.

Fizemos merge em [quase dois terços](https://github.com/facebook/react-native/pulls?utf8=%E2%9C%93&q=is%3Apr+closed%3A%3E2018-12-01+label%3A%22Merged%22+) e fechamos um terço dos pull requests. Eles foram fechados sem merge se estavam obsoletos ou eram de baixa qualidade, ou se aumentavam desnecessariamente a área de superfície do projeto. A maioria dos pull requests com merge corrigiu bugs, melhorou a paridade entre plataformas ou introduziu novos recursos. Contribuições notáveis incluem melhorias na segurança de tipos e o trabalho em andamento para suportar AndroidX.

No Facebook, executamos o React Native a partir do master, então testamos todas as mudanças primeiro antes que elas cheguem a um Release do React Native. De todos os pull requests com merge, apenas seis causaram problemas: quatro afetaram apenas o desenvolvimento interno e dois foram detectados no estado de release candidate.

Uma das contribuições da comunidade mais visíveis foi [a atualização da tela "RedBox"](https://github.com/facebook/react-native/pull/22242). É um bom exemplo de como a comunidade está tornando a experiência do desenvolvedor mais amigável.

### Lean Core

O React Native atualmente tem uma área de superfície muito ampla com muitas abstrações não mantidas que não usamos muito no Facebook. Estamos trabalhando para reduzir a área de superfície a fim de tornar o React Native menor e permitir que a comunidade cuide melhor das abstrações que são pouco usadas no Facebook.

No primeiro milestone, [pedimos à comunidade ajuda no projeto Lean Core](https://twitter.com/reactnative/status/1093171521114247171). A resposta foi esmagadora e mal conseguimos acompanhar todo o progresso. [Confira todo o trabalho concluído em menos de um mês](https://github.com/facebook/react-native/issues/23313)!

O que mais nos anima é que os mantenedores se envolveram corrigindo problemas antigos, adicionando testes e suportando recursos há muito solicitados. Esses módulos estão recebendo mais suporte do que nunca tiveram dentro do React Native, mostrando que este é um ótimo passo para a comunidade. Exemplos de tais projetos são o [WebView](https://github.com/react-native-community/react-native-webview) que [recebeu muitos pull requests](https://twitter.com/titozzz/status/1101283928026034176) desde sua extração, e a CLI que agora é [mantida por membros da comunidade](https://blog.callstack.io/the-react-native-cli-has-a-new-home-79b63838f0e6) e recebeu melhorias e correções muito necessárias.

### Principais Problemas dos Usuários

Em dezembro, perguntamos à comunidade o que eles [não gostavam sobre o React Native](https://github.com/react-native-community/discussions-and-proposals/issues/64). Agregamos as respostas e [respondemos a cada um dos problemas](https://github.com/react-native-community/discussions-and-proposals/issues/104). Felizmente, muitos dos problemas que nossa comunidade enfrenta também são problemas no Facebook. Em nosso próximo milestone, planejamos abordar alguns dos principais problemas.

Um dos problemas mais votados foi a experiência do desenvolvedor ao atualizar para versões mais recentes do React Native. Infelizmente, isso não é algo que experimentamos nós mesmos porque executamos o React Native a partir do master. Felizmente, membros da comunidade já se apresentaram para resolver este problema:

- [Michał Pierzchała](https://github.com/thymikee) da Callstack [melhorou o react-native upgrade](https://github.com/react-native-community/react-native-cli/pull/176/files) usando [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge) internamente. Também atualizamos o site para remover instruções de upgrade desatualizadas.
- [Planejamos recomendar CocoaPods por padrão para projetos iOS](https://github.com/facebook/react-native/pull/23563), o que reduzirá mudanças nos arquivos do projeto ao atualizar o React Native. Isso facilitará a instalação e vinculação de módulos de terceiros, o que é ainda mais importante no contexto do Lean Core, pois esperamos que os projetos vinculem mais módulos por padrão.

### Release 0.59

Sem a ajuda da comunidade React Native, especialmente [Mike Grabowski](https://github.com/grabbou) e [Lorenzo Sciandra](https://github.com/kelset), não seríamos capazes de publicar releases. Queremos melhorar o processo de gestão de releases e planejamos nos envolver mais a partir de agora:

- Trabalharemos com membros da comunidade para criar um post de blog para cada release principal.
- Mostraremos breaking changes diretamente na CLI quando as pessoas atualizarem para novas versões.
- Reduziremos o tempo necessário para fazer um release. Estamos explorando maneiras de aumentar os testes automatizados e também criar um plano de teste manual aprimorado.

Muitos desses planos serão incorporados no próximo [release do React Native 0.59](https://github.com/facebook/react-native/releases/tag/v0.59.0-rc.3). A versão 0.59 será lançada com React Hooks, uma nova versão 64-bit do JavaScriptCore para Android, e muitas melhorias de desempenho e funcionalidade. Atualmente está publicada como release candidate e espera-se que esteja estável nas próximas duas semanas.

### Próximos Passos

Nos próximos dois meses, continuaremos gerenciando pull requests [para nos mantermos no caminho certo](https://k03lwm00zo.codesandbox.io/) enquanto também começamos a reduzir o número de issues pendentes no GitHub. Continuaremos reduzindo a área de superfície do React Native através do projeto Lean Core. Planejamos abordar 5 dos principais problemas da comunidade. À medida que finalizarmos as diretrizes da comunidade, voltaremos nossa atenção para nosso site e documentação.

Estamos muito animados em receber mais de dez colaboradores da nossa comunidade no Facebook London em março para ajudar a impulsionar várias dessas iniciativas. Estamos felizes que você está usando React Native e esperamos que você veja e sinta as melhorias em que estamos trabalhando em 2019. Voltaremos com outra atualização em alguns meses e _estaremos fazendo merge dos seus pull requests nesse meio tempo!_ ⚛️✌️
