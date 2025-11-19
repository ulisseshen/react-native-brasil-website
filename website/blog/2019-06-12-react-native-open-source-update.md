---
ia-translated: true
title: Atualização Open Source do React Native - Junho de 2019
authors: [cpojer]
tags: [announcement]
---

## Saúde do Código & Comunidade

Nos últimos seis meses, um total de 2800 commits foram feitos no React Native por mais de 550 colaboradores. 400 colaboradores da comunidade criaram mais de [1.150 Pull Requests](https://github.com/facebook/react-native/pulls?page=24&q=is%3Apr+closed%3A%3E2018-12-01&utf8=%E2%9C%93), dos quais [820 Pull Requests](https://github.com/facebook/react-native/pulls?utf8=%E2%9C%93&q=is%3Apr+closed%3A%3E2018-12-01+label%3A%22Merged%22+) foram mesclados.

A média de Pull Requests por dia ao longo dos últimos seis meses aumentou de três para cerca de seis, mesmo tendo separado o website, CLI e muitos módulos do React Native através do esforço Lean Core. A quantidade média de pull requests abertos agora está abaixo de 25 e geralmente respondemos com sugestões e revisões em horas ou dias.

### Contribuições Significativas da Comunidade

Gostaríamos de destacar uma série de contribuições recentes que achamos fantásticas:

- **Accessibility:** React Native 0.60 será lançado com muitas melhorias nas APIs de acessibilidade tanto no Android quanto no iOS. Todos os novos recursos estão usando diretamente APIs fornecidas pela plataforma subjacente, então eles se integrarão com tecnologias de assistência nativas tanto no Android quanto no iOS. Gostaríamos de agradecer [Marc Mulcahy](https://github.com/marcmulcahy), [Alan Kenyon](https://github.com/facebook/react-native/pull/24746), [Estevão Lucas](https://github.com/elucaswork), [Sam Mathias Weggersen](https://github.com/sweggersen) e [Janic Duplessis](https://twitter.com/janicduplessis) por suas contribuições:
  - [Additional Accessibility Roles + States](https://github.com/facebook/react-native/pull/24095) e uma [nova API de Accessibility States](https://github.com/facebook/react-native/pull/24608). Adicionado vários roles de acessibilidade que estavam faltando para vários componentes e uma nova API para melhor suporte web no futuro.
  - [AccessibilityInfo.announceForAccessibility](https://github.com/facebook/react-native/pull/24746). Adicionado suporte para Android, anteriormente apenas para iOS.
  - [Extended Accessibility Actions Support](https://github.com/facebook/react-native/pull/24695). Adicionado callbacks para lidar com acessibilidade em torno de ações definidas pelo usuário.
  - [Support for iOS Accessibility flags](https://github.com/facebook/react-native/pull/23913) e [suporte para "reduce motion"](https://github.com/facebook/react-native/pull/23839).
  - [Melhorias de acessibilidade de teclado no Android](https://github.com/facebook/react-native/pull/24359). Adicionado uma prop `clickable` e um callback `onClick` para invocar ações via navegação por teclado _(observação: isso em breve será renomeado para `focusable`)._
  - [Use CALayers to draw text](https://github.com/facebook/react-native/pull/24387). Corrigido um problema que fazia o texto ampliado desaparecer no iOS.
- **Nova Tela do App:** A comunidade criou um [design para a nova tela do app](https://github.com/react-native-community/discussions-and-proposals/issues/122) que está implementado na 0.60. Esta tela é o que a maioria das pessoas vê quando está usando React Native pela primeira vez. Agora ela direciona os usuários iniciantes para a documentação e o visual combina com nosso próximo redesign do website 🌟. Muito obrigado para [Orta](https://twitter.com/orta), [Adam Shurson](https://www.linkedin.com/in/ashurson/), [Glauber Castro](https://github.com/glauberfc), [Karan Singh](https://github.com/karanpratapsingh), [Eli Perkins](https://twitter.com/_eliperkins), [Lucas Bento](https://twitter.com/lbentosilva) e [Eric Lewis](https://twitter.com/ericlewis) por todo o trabalho e colaboração!
  - Confira a nova tela do app na série de vídeos "_[React Native Show](https://www.youtube.com/watch?v=ImlAqMZxveg)_".
- **TurboModule Types:** O novo [sistema TurboModules](https://github.com/react-native-community/discussions-and-proposals/issues/40) requer [tipos para todos os módulos nativos](https://github.com/facebook/react-native/issues/24875) para garantir operações type safe em código nativo. Em pouco mais de duas semanas, a comunidade enviou ~40 Pull Requests para completar este trabalho para módulos nativos tipados com flow. Além das pessoas já mencionadas acima, gostaríamos de agradecer [Michał Chudziak](https://twitter.com/michalchudziak), [Michał Pierzchała](https://twitter.com/thymikee), [Wojtek Szafraniec](https://github.com/wojteg1337), e [Jean Regisser](https://github.com/jeanregisser) e todos os outros que enviaram um ou mais Pull Requests.
- **Haste:** Desde 2015 o React Native usava o ["sistema de módulos haste"](https://github.com/reactjs/reactjs.org/commit/0629e3e2289ed54fac854472aec9a5f6c8318c98#diff-c42b758729cb89976b3a8fd51d1227fa) que permite importar módulos apenas via um id global ao invés de um caminho relativo, o que é conveniente mas não bem suportado por muitas ferramentas. [James Ide](https://twitter.com/JI) propôs remover o haste, similar a como o React removeu o haste há muitos anos. Ele planejou todo o trabalho através de uma [tarefa guarda-chuva](https://github.com/facebook/react-native/issues/24316) e enviou 18 Pull Requests para fazer isso acontecer! Confira [sua thread no Twitter](https://twitter.com/JI/status/1136369775083319296) para saber mais.
- **Android Fragments:** A proposta de [John Shelley](https://github.com/jpshelley) para fazer o React Native funcionar via [Android Fragments](https://github.com/facebook/react-native/pull/12199) foi mesclada e estará disponível na 0.61. [Leia mais sobre Android Fragments aqui](https://developer.android.com/guide/components/fragments).

### Lean Core

A principal motivação do [Lean Core](https://github.com/react-native-community/discussions-and-proposals/issues/6) tem sido separar módulos do React Native em repositórios distintos para que possam receber melhor manutenção. Em apenas seis meses, repositórios como [WebView](https://github.com/react-native-community/react-native-webview), [NetInfo](https://github.com/react-native-community/react-native-netinfo), [AsyncStorage](https://github.com/react-native-community/react-native-async-storage), o [website](https://github.com/facebook/react-native-website) e o [CLI](https://github.com/react-native-community/cli) receberam mais de 800 Pull Requests combinados. Além de melhor manutenção, esses projetos também podem ser lançados independentemente com mais frequência do que o próprio React Native.

Também aproveitamos a oportunidade para remover polyfills obsoletos e componentes legados do próprio React Native. Polyfills eram necessários no passado para suportar recursos de linguagem como [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) e [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) em versões mais antigas do JavaScriptCore (JSC). Agora que o React Native é distribuído com uma nova versão, esses polyfills foram removidos.

Este trabalho ainda está em progresso e muitas outras coisas ainda precisam ser separadas ou removidas tanto no lado nativo quanto no JavaScript, mas há sinais iniciais de que conseguimos reverter a tendência de aumentar a área de superfície e o tamanho do app: Ao olhar para o bundle JavaScript, por exemplo, cerca de um ano atrás na versão 0.54 o tamanho do bundle JavaScript do React Native era 530kb e cresceu para 607kb (+77kb) até a versão 0.57 em apenas 6 meses. Agora estamos vendo uma redução no tamanho do bundle de 28kb para 579kb no master, uma diferença de mais de 100kb!

Conforme concluímos a primeira iteração do esforço Lean Core, faremos um esforço para ser mais intencionais sobre novas APIs adicionadas ao React Native e avaliaremos continuamente formas de tornar o React Native menor e mais rápido, bem como encontrar maneiras de capacitar a comunidade a assumir a propriedade de vários componentes.

## Feedback dos Usuários

Seis meses atrás perguntamos à comunidade "[O que você não gosta no React Native?](https://github.com/react-native-community/discussions-and-proposals/issues/64)", que deu uma boa visão geral dos problemas que as pessoas estão enfrentando. [Respondemos ao post alguns meses atrás](https://github.com/react-native-community/discussions-and-proposals/issues/104) e é hora de resumir o progresso que foi feito nos principais problemas:

- **Upgrading:** A comunidade do React Native se uniu com múltiplas melhorias na experiência de upgrade: [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md), um comando de upgrade melhor via [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge), um website auxiliar de upgrade (em breve). Também nos certificaremos de comunicar mudanças significativas e novos recursos empolgantes publicando posts de blog para cada grande lançamento. Muitas dessas melhorias tornarão futuros upgrades além do lançamento 0.60 significativamente mais fáceis.
- **Suporte / Incerteza:** Muitas pessoas estavam frustradas com a falta de atividade em Pull Requests e incerteza geral sobre o investimento do Facebook no React Native. Como mostramos acima, podemos dizer com confiança que estamos prontos para muitos mais Pull Requests e estamos ansiosamente aguardando suas propostas e contribuições!
- **Performance:** React Native 0.59 foi lançado com uma versão nova e muito mais rápida do JavaScriptCore (JSC). Separadamente, temos trabalhado para tornar mais fácil habilitar [inline-requires](/docs/performance#ram-bundles-inline-requires) por padrão e temos mais atualizações empolgantes para você nos próximos meses.
- **Documentação:** Recentemente iniciamos um esforço para [revisar e reescrever toda a documentação do React Native](https://github.com/facebook/react-native-website/issues/929). Se você está procurando contribuir, adoraríamos ter sua ajuda!
- **Warnings no Xcode:** [Nos livramos de todos os warnings existentes](https://github.com/facebook/react-native/issues/22609) e estamos fazendo um esforço para não introduzir novos warnings.
- **Hot Reloading:** A equipe React está construindo um [novo sistema de hot reloading](https://twitter.com/dan_abramov/status/1126948870137753605) que em breve será integrado ao React Native.

Infelizmente não conseguimos melhorar tudo ainda:

- **Debugging:** Corrigimos muitos bugs inconvenientes e problemas com os quais temos encontrado todos os dias, mas infelizmente não fizemos tanto progresso nisso quanto gostaríamos. Reconhecemos que o debugging com React Native não é ótimo e priorizaremos melhorar isso no futuro.
- **Symlinks do Metro:** Infelizmente não conseguimos implementar uma solução simples e direta para isso ainda. No entanto, usuários do React Native [compartilharam várias soluções alternativas](https://github.com/facebook/metro/issues/1) que podem funcionar para você.

Dada a grande quantidade de mudanças nos últimos seis meses, gostaríamos de fazer a mesma pergunta novamente. Se você está usando a versão mais recente do React Native e tem coisas sobre as quais gostaria de dar feedback, por favor comente em nossa nova edição de ["O que você não gosta no React Native?"](https://github.com/react-native-community/discussions-and-proposals/issues/134)

## Integração Contínua

O Facebook mescla todos os Pull Requests e mudanças internas diretamente no repositório do Facebook primeiro e depois sincroniza todos os commits de volta para o GitHub. A infraestrutura do Facebook é diferente dos serviços comuns de integração contínua e nem todos os testes open source eram executados dentro do Facebook. Isso significa que commits sincronizados para o GitHub frequentemente quebravam testes no open source, o que levava muito tempo para corrigir.

[Héctor Ramos](https://twitter.com/hectorramos) da equipe React Native passou os últimos dois meses melhorando os sistemas de integração contínua do React Native tanto no Facebook quanto no GitHub. A maioria dos testes open source agora são executados antes que as mudanças sejam commitadas no React Native no Facebook, o que manterá o CI estável no GitHub quando os commits forem sincronizados.

## Próximos Passos

Não deixe de conferir nossas palestras sobre o futuro do React Native! Nos próximos meses, membros da equipe React Native no Facebook falarão na [Chain React](https://infinite.red/ChainReactConf) e na [React Native EU](https://react-native.eu/). Além disso, fique atento ao nosso próximo lançamento, 0.60, que está logo ali na esquina. _Vai ser empolgante_ ✨
