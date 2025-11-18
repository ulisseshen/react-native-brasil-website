---
ia-translated: true
title: 'Relatório pós-incidente da interrupção do Android no React Native 0.71-RC0'
authors: [cortinico, kelset]
tags: [engineering]
date: 2023-01-27
---

Agora que a versão 0.71 está [disponível](/blog/2023/01/12/version-071), queremos compartilhar algumas informações importantes sobre o incidente que quebrou builds Android para todas as versões do React Native durante o lançamento do primeiro release candidate da versão 0.71 para builds Android do React Native e Expo em 4 de novembro de 2022.

Os colaboradores que ajudaram a resolver o incidente participaram recentemente de uma reunião pós-incidente para discutir em detalhes o que aconteceu, o que todos nós aprendemos com isso e quais ações vamos tomar para evitar interrupções similares no futuro.

<!--truncate-->

## O que aconteceu

Em 4 de novembro de 2022, publicamos a versão `0.71.0-rc0` do React Native, o primeiro release candidate para a versão 0.71, em diversos repositórios públicos.

Uma mudança importante feita neste release candidate ajudou a melhorar os tempos de build ao publicar artefatos no Maven Central, em vez de compilá-los a partir do código-fonte. Mais detalhes sobre como isso foi feito estão disponíveis na [RFC#508](https://github.com/react-native-community/discussions-and-proposals/pull/508) e nas [discussões relacionadas](https://github.com/reactwg/react-native-new-architecture/discussions/105).

Infelizmente, devido à forma como estruturamos novos projetos a partir do template, isso causou falhas de build para qualquer usuário Android em versões mais antigas, pois eles começaram a baixar novos artefatos para `0.71.0-rc0` em vez da versão que estavam usando em seus projetos (como `0.68.0`).

## Por que isso aconteceu

O template do React Native fornece um arquivo `build.gradle` para compilar aplicativos Android. Este arquivo contém uma dependência na biblioteca Android do React Native da seguinte forma:
`implementation("com.facebook.react:react-native:+")`.

Importante notar que a parte `+` desta dependência (uma [versão dinâmica do Gradle](https://docs.gradle.org/current/userguide/dynamic_versions.html)) instrui o Gradle a escolher a versão mais alta disponível do React Native. Usar versões dinâmicas do Gradle é considerado um antipadrão, pois expõe os usuários a builds menos reproduzíveis.

Estávamos cientes dos problemas que as versões dinâmicas poderiam causar, então na versão `0.71` limpamos o template de novo aplicativo e removemos todas as dependências `+`. No entanto, usuários em versões mais antigas do React Native ainda estavam usando uma versão `+`.

Isso fez com que builds com versões do React Native anteriores a `0.71.0-rc.0` consultassem todos os repositórios pela versão mais alta disponível do React Native. Como o recém-publicado 0.71.0-rc.0 no Maven Central se tornou a versão mais alta disponível, builds com versões do React Native anteriores a 0.71.0-rc.0 começaram a usar artefatos da versão 0.71.0-rc.0. A incompatibilidade de versão do React Native entre o build local (por exemplo, `0.68.0`) e os artefatos do Maven Central (`0.71.0-rc.0`) causou falhas nesses builds.

Mais detalhes técnicos sobre este evento também estão disponíveis [nesta issue do GitHub](https://github.com/facebook/react-native/issues/35210).

## Como mitigamos e resolvemos

Assim que identificamos o problema em 4 de novembro, a comunidade encontrou e compartilhou uma solução alternativa manual para corrigir o problema, que fixaria o React Native a uma versão específica, corrigindo o erro.

Então, durante o fim de semana de 5 e 6 de novembro, a equipe de release lançou versões de correção para todas as versões anteriores do React Native até a 0.63, que aplicavam automaticamente o patch, para que os usuários pudessem atualizar para uma versão corrigida do React Native.

Ao mesmo tempo, [entramos em contato com a Sonatype](https://issues.sonatype.org/browse/OSSRH-86006) para solicitar a remoção dos artefatos problemáticos.

O problema foi totalmente resolvido em 8 de novembro, quando os artefatos foram completamente removidos do Maven Central.

## Cronograma dos eventos

_Esta seção contém uma breve cronologia dos eventos. Todos os horários estão em GMT/UTC +0_

- 4 de nov - 17:06: [0.71-RC0 é lançado](https://github.com/facebook/react-native/releases/tag/v0.71.0-rc.0).
- 4 de nov - 18:20: [Primeiro relato de problema de build é aberto](https://github.com/facebook/react-native/issues/35204).
- 4 de nov - 19:45: [Problema é identificado pela comunidade](https://github.com/facebook/react-native/issues/35204#issuecomment-1304090948).
- 4 de nov - 21:39: [Soluções alternativas são comunicadas, Expo ](https://github.com/facebook/react-native/issues/35204#issuecomment-1304281740)implanta correção para todos os seus usuários.
- 5 de nov - 03:04: [Nova issue é aberta para comunicar status e soluções alternativas](https://github.com/facebook/react-native/issues/35210).
- 6 de nov - 16:11: [Ticket para a SonaType](https://issues.sonatype.org/browse/OSSRH-86006?focusedCommentId=1216303&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1216303) solicitando a remoção dos artefatos é aberto.
- 6 de nov - 16:40: [Primeiro tweet](https://twitter.com/reactnative/status/1589296764678705155) de @reactnative com confirmação + link para a issue.
- 6 de nov - 19:05: Decisão de aplicar patch nas versões do React Native até a 0.63.
- 7 de nov - 00:47: Último release com patch é lançado: [0.63.5](https://github.com/facebook/react-native/releases/tag/v0.63.5).
- 8 de nov - 20:04: Artefatos no Maven Central são [totalmente removidos](https://issues.sonatype.org/browse/OSSRH-86006?focusedCommentId=1216303&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1216303).
- 10 de nov - 11:51: Issue sobre o [incidente é fechada](https://github.com/facebook/react-native/issues/35210#issuecomment-1310170361).

## Lições aprendidas

Embora em muitos aspectos as condições para desencadear este incidente tenham existido desde o React Native 0.12.0, queremos garantir que as fundações sobre as quais desenvolvemos e lançamos o React Native daqui em diante sejam mais fortes. Aqui estão algumas das lições aprendidas e as ações sobre como vamos adaptar nossos processos e infraestrutura para responder mais rápido e com mais força no futuro.

### Estratégia de resposta a incidentes

Este incidente destacou lacunas em nossa estratégia de resposta a incidentes para problemas open-source relacionados ao React Native.

A comunidade rapidamente encontrou uma solução alternativa em menos de 2 horas. Devido à nossa falta de visibilidade sobre o escopo do impacto deste problema, bem como a complexidade necessária para corrigi-lo em versões antigas, confiamos em pessoas impactadas descobrindo a solução alternativa na issue do GitHub.

Levamos 48 horas para reconhecer o escopo maior deste problema e que não podíamos confiar em todos encontrando a issue do GitHub. Precisávamos priorizar mitigações ativas mais complexas para corrigir automaticamente os projetos das pessoas.

Vamos revisar nossos processos para quando confiar em soluções alternativas aplicadas por desenvolvedores versus correções que podemos implantar automaticamente. Também vamos analisar nossas opções para obter uma melhor visão ao vivo da saúde do nosso ecossistema.

### Política de suporte a releases

Como visualizado na [ferramenta rn-versions](https://rn-versions.github.io/), para cobrir mais de 90% da base de desenvolvedores do React Native na época do incidente, tivemos que lançar patches até a versão 0.63.

Acreditamos que isso é causado pela experiência de upgrade do React Native, que historicamente tem sido cheia de atritos. Atualmente estamos analisando maneiras de melhorar a experiência de upgrade para torná-la mais suave e rápida para mitigar essa fragmentação do ecossistema.

Lançar uma versão mais nova do React Native nunca deveria ter um impacto em usuários em versões mais antigas, e queremos nos desculpar pela interrupção que causamos ao seu fluxo de trabalho.

Da mesma forma, queremos também ressaltar a importância de estar atualizado com a versão mais recente de suas dependências e do React Native para se beneficiar das melhorias e salvaguardas que introduzimos. Este incidente aconteceu durante um período em que uma [política oficial de suporte a releases](https://github.com/reactwg/react-native-releases#releases-support-policy) estava sendo definida e ainda não havia sido divulgada ou aplicada.

No futuro, vamos comunicar nossa política de suporte em nossos canais de comunicação e vamos considerar [depreciar versões mais antigas do React Native no npm](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions).

### Testes aprimorados e melhores práticas para bibliotecas de terceiros

Este incidente destacou a importância de ter melhores testes de release e melhor orientação para bibliotecas de terceiros.

No lado dos testes, lançar versões até `0.63.x` provou ser desafiador devido à falta de automação e testes que agora temos em vigor para releases estáveis. Reconhecemos a importância de nossa infraestrutura de release e testes e vamos investir ainda mais nisso no futuro.

Especificamente, agora estamos encorajando e apoiando testes de bibliotecas de terceiros como parte do [lançamento do react native](https://github.com/reactwg/react-native-releases/discussions/41). Também estamos adicionando alguns novos canais e funções no [Discord dos Core Contributors](https://github.com/facebook/react-native/blob/main/ECOSYSTEM.md#core-contributors).

Além disso, iniciamos uma colaboração mais próxima com a Callstack, os mantenedores do [create-react-native-library](https://github.com/callstack/react-native-builder-bob/tree/main/packages/create-react-native-library), para melhorar o template de biblioteca e garantir que ele siga todas as melhores práticas necessárias para se integrar com projetos React Native. A versão mais nova do `create-react-native-library` agora é totalmente compatível com projetos 0.71, enquanto ainda oferece compatibilidade com versões anteriores.

## Conclusões

Queremos nos desculpar pela interrupção que isso causou aos fluxos de trabalho de desenvolvedores em todo o mundo. Como destacado acima, já começamos a tomar medidas para fortalecer nossa fundação - e mais trabalho está por vir.

Esperamos que compartilhar esses insights ajude todos vocês a entender melhor este incidente e que vocês possam aproveitar nossos aprendizados para aplicar melhores práticas em suas próprias ferramentas e projetos.

Para encerrar, queremos mais uma vez agradecer à Sonatype por nos ajudar a remover os artefatos, à nossa comunidade e à equipe de release que trabalhou incansavelmente para resolver isso o mais rápido possível.
