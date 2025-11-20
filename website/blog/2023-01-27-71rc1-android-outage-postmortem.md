---
ia-translated: true
title: 'Análise pós-incidente da interrupção do React Native 0.71-RC0 no Android'
authors: [cortinico, kelset]
tags: [engineering]
date: 2023-01-27
---

Agora que a versão 0.71 está [disponível](/blog/2023/01/12/version-071), queremos compartilhar algumas informações importantes sobre o incidente que quebrou os builds Android para todas as versões do React Native durante o lançamento do primeiro release candidate 0.71 para builds React Native & Expo Android em 4 de novembro de 2022.

Os colaboradores que ajudaram a resolver o incidente participaram recentemente de uma reunião pós-incidente para discutir em detalhes o que aconteceu, o que todos nós aprendemos com isso e quais ações tomaremos para evitar interrupções semelhantes no futuro.

<!--truncate-->

## O que aconteceu

Em 4 de novembro de 2022, publicamos a versão `0.71.0-rc0` do React Native, o primeiro release candidate para 0.71, em vários repositórios públicos.

Uma mudança importante feita neste release candidate ajudou a melhorar os tempos de build ao publicar artifacts no Maven Central, em vez de compilá-los a partir do código-fonte. Mais detalhes sobre como isso foi feito estão disponíveis na [RFC#508](https://github.com/react-native-community/discussions-and-proposals/pull/508) e nas [discussões relacionadas](https://github.com/reactwg/react-native-new-architecture/discussions/105).

Infelizmente, devido à forma como estruturamos novos projetos a partir do template, isso causou falhas de build para qualquer usuário Android em versões mais antigas, porque eles começariam a baixar novos artifacts para `0.71.0-rc0` em vez da versão que estavam usando em seu projeto (como `0.68.0`).

## Por que isso aconteceu

O template do React Native fornece um arquivo `build.gradle` para compilar aplicativos Android. Este arquivo contém uma dependência na biblioteca Android do React Native da seguinte forma:
`implementation("com.facebook.react:react-native:+")`.

Importante notar que a parte `+` desta dependência (uma [versão dinâmica do Gradle](https://docs.gradle.org/current/userguide/dynamic_versions.html)) instrui o Gradle a escolher a versão mais alta disponível do React Native. Usar versões dinâmicas do Gradle é considerado um antipadrão, pois expõe os usuários a builds menos reproduzíveis.

Estávamos cientes dos problemas que as versões dinâmicas poderiam causar, então na versão `0.71` limpamos o template de novo aplicativo e removemos todas as dependências `+`. No entanto, usuários em versões mais antigas do React Native ainda estavam usando uma versão `+`.

Isso fez com que builds com versões do React Native anteriores a `0.71.0-rc.0` consultassem todos os repositórios pela versão mais alta disponível do React Native. Como o `0.71.0-rc.0` recém-publicado no Maven Central se tornou a versão mais alta disponível, builds com versões do React Native anteriores a 0.71.0-rc.0 começaram a usar artifacts de 0.71.0-rc.0. A incompatibilidade de versão do React Native entre o build local (por exemplo, `0.68.0`) e os artifacts do Maven Central (`0.71.0-rc.0`) causou a falha desses builds.

Mais detalhes técnicos sobre este evento também estão disponíveis [neste issue do GitHub](https://github.com/facebook/react-native/issues/35210).

## Como mitigamos e resolvemos

Assim que identificamos o problema em 4 de novembro, a comunidade encontrou e compartilhou uma solução manual para corrigir o problema que fixaria o React Native em uma versão específica, corrigindo o erro.

Então, durante o fim de semana de 5 e 6 de novembro, a equipe de release lançou versões de correção para todas as versões anteriores do React Native até a 0.63, que aplicaram automaticamente o patch, para que os usuários pudessem atualizar para uma versão corrigida do React Native.

Ao mesmo tempo, [entramos em contato com a Sonatype](https://issues.sonatype.org/browse/OSSRH-86006) para solicitar a remoção dos artifacts problemáticos.

O problema foi totalmente resolvido em 8 de novembro, quando os artifacts foram completamente removidos do Maven Central.

## Cronologia dos eventos

_Esta seção contém uma breve cronologia dos eventos. Todos os horários estão em GMT/UTC +0_

- 4 de nov - 5:06 PM: [0.71-RC0 é lançado](https://github.com/facebook/react-native/releases/tag/v0.71.0-rc.0).
- 4 de nov - 6:20 PM: [Primeiro relato do problema de build é aberto](https://github.com/facebook/react-native/issues/35204).
- 4 de nov - 7:45 PM: [Problema é identificado pela comunidade](https://github.com/facebook/react-native/issues/35204#issuecomment-1304090948).
- 4 de nov - 9:39 PM: [Soluções alternativas são comunicadas, Expo ](https://github.com/facebook/react-native/issues/35204#issuecomment-1304281740)implementa correção para todos os seus usuários.
- 5 de nov - 03:04 AM: [Novo issue é aberto para comunicar status e soluções alternativas](https://github.com/facebook/react-native/issues/35210).
- 6 de nov - 04:11 PM: [Ticket para SonaType](https://issues.sonatype.org/browse/OSSRH-86006?focusedCommentId=1216303&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1216303) solicitando remoção dos artifacts é aberto.
- 6 de nov - 04:40 PM: [Primeiro tweet](https://twitter.com/reactnative/status/1589296764678705155) de @reactnative com reconhecimento + link para issue.
- 6 de nov - 07:05 PM: Decisão de corrigir versões do React Native até a 0.63.
- 7 de nov - 12:47 AM: Último release corrigido é lançado: [0.63.5](https://github.com/facebook/react-native/releases/tag/v0.63.5).
- 8 de nov - 08:04 PM: Artifacts no Maven Central são [completamente removidos](https://issues.sonatype.org/browse/OSSRH-86006?focusedCommentId=1216303&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1216303).
- 10 de nov - 11:51 AM: Issue sobre o [incidente é fechado](https://github.com/facebook/react-native/issues/35210#issuecomment-1310170361).

## Lições aprendidas

Embora de muitas maneiras as condições para desencadear este incidente existam desde o React Native 0.12.0, queremos garantir que as bases sobre as quais desenvolvemos e lançamos o React Native no futuro sejam mais fortes. Aqui estão algumas das lições aprendidas e as ações sobre como adaptaremos nossos processos e infraestrutura para responder mais rápido e de forma mais robusta no futuro.

### Estratégia de resposta a incidentes

Este incidente destacou lacunas em nossa estratégia de resposta a incidentes para problemas de código aberto relacionados ao React Native.

A comunidade rapidamente encontrou uma solução alternativa em menos de 2 horas. Devido à nossa falta de visibilidade sobre o escopo do impacto deste problema, bem como a complexidade necessária para corrigi-lo para versões antigas, confiamos em que as pessoas impactadas descobrissem a solução alternativa no issue do GitHub.

Levamos 48 horas para reconhecer o escopo maior deste problema e que não poderíamos confiar em que todos encontrassem o issue do GitHub. Precisávamos priorizar mitigações ativas mais complexas para corrigir automaticamente os projetos das pessoas.

Estaremos revisando nossos processos sobre quando confiar em soluções aplicadas pelo desenvolvedor versus correções que podemos implementar automaticamente. Também analisaremos nossas opções para obter uma melhor percepção em tempo real da saúde do nosso ecossistema.

### Política de suporte a releases

Como visualizado na [ferramenta rn-versions](https://rn-versions.github.io/), para cobrir mais de 90% da base de desenvolvedores do React Native no momento do incidente, tivemos que lançar patches até a versão 0.63.

Acreditamos que isso seja causado pela experiência de upgrade do React Native, que historicamente tem sido cheia de atritos. Atualmente estamos analisando maneiras de melhorar a experiência de upgrade para torná-la mais suave e rápida para mitigar essa fragmentação do ecossistema.

Lançar uma versão mais nova do React Native nunca deveria ter impacto nos usuários em versões mais antigas, e queremos nos desculpar pela interrupção que causamos ao seu fluxo de trabalho.

Da mesma forma, também queremos enfatizar a importância de estar atualizado com a versão mais recente de suas dependências e do React Native para se beneficiar das melhorias e proteções que introduzimos. Este incidente ocorreu durante um período em que uma [política oficial de suporte a releases](https://github.com/reactwg/react-native-releases#releases-support-policy) estava sendo definida e ainda não havia sido divulgada ou aplicada.

No futuro, comunicaremos nossa política de suporte em nossos canais de comunicação e consideraremos [depreciar versões mais antigas do React Native no npm](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions).

### Testes aprimorados e melhores práticas para bibliotecas de terceiros

Este incidente destacou a importância de ter melhores testes de release e melhores orientações para bibliotecas de terceiros.

No lado dos testes, lançar versões até `0.63.x` provou ser desafiador devido à falta de automação e testes que agora temos em vigor para releases estáveis. Reconhecemos a importância de nossa infraestrutura de release e testes e vamos investir ainda mais nela no futuro.

Especificamente, agora estamos incentivando e apoiando testes de bibliotecas de terceiros como parte do [release do react native](https://github.com/reactwg/react-native-releases/discussions/41). Também estamos adicionando alguns novos canais e funções no [Core Contributors Discord Server](https://github.com/facebook/react-native/blob/main/ECOSYSTEM.md#core-contributors).

Além disso, iniciamos uma colaboração mais próxima com a Callstack, os mantenedores do [create-react-native-library](https://github.com/callstack/react-native-builder-bob/tree/main/packages/create-react-native-library), para melhorar o template de biblioteca e garantir que ele siga todas as melhores práticas necessárias para integração com projetos React Native. A versão mais nova do `create-react-native-library` agora é totalmente compatível com projetos 0.71, enquanto ainda oferece compatibilidade retroativa.

## Conclusões

Queremos nos desculpar pela interrupção que isso causou aos fluxos de trabalho de desenvolvedores em todo o mundo. Como destacado acima, já começamos a tomar medidas para fortalecer nossa base - e mais trabalho está por vir.

Esperamos que compartilhar essas percepções ajude todos vocês a entender melhor este incidente e que possam aproveitar nossos aprendizados para aplicar melhores práticas em suas próprias ferramentas e projetos.

Para concluir, queremos mais uma vez agradecer à Sonatype por nos ajudar a remover os artifacts, à nossa comunidade e à equipe de release que trabalhou incansavelmente para resolver isso o mais rápido possível.
