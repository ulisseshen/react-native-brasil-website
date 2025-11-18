---
ia-translated: true
title: React Native - Resumo do H2 2021
authors: [cortinico]
tags: [announcement]
---

Enquanto todos nós ainda estamos empolgados com o [lançamento do React Native 0.67](/blog/2022/01/19/version-067), queremos aproveitar um momento para **celebrar** o que a comunidade alcançou no último semestre e compartilhar o que temos no **horizonte** para o futuro do React Native.

<!--truncate-->

Especificamente, o H2 2021 foi um [semestre emocionante tanto para nós quanto para a comunidade](/blog/2021/08/19/h2-2021#pushing-the-technology-forward) onde tivemos a oportunidade de investir mais em nosso ecossistema open-source. Reformulamos alguns de nossos processos e criamos novos do zero que ajudarão você, nós e a comunidade a desfrutar de uma experiência **melhor** com React Native.

## Saúde do Repositório

No H2 2021, investimos em lidar com parte da _dívida OSS_ que nosso repositório acumulou ao longo dos anos. Especificamente, a maior parte de nosso foco estava em **pull requests**. Construímos um processo interno para garantir que todos os novos pull requests sejam abordados em tempo hábil.

Embora esta não seja uma lista completa, gostaríamos de destacar alguns PRs **impactantes** que recebemos de nossos colaboradores:

- **Accessibility**
  - [#31630](https://github.com/facebook/react-native/pull/31630) `Added Support for Entrance/exit from collection by Flatlist` por [@anaskhraza](https://github.com/anaskhraza)
- **Crash**
  - [#29452](https://github.com/facebook/react-native/pull/29452) `Fix - TextInput Drawable to avoid Null Pointer Exception RuntimeError` por [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
- **Display**
  - [#31777](https://github.com/facebook/react-native/pull/31777) `fix: TouchableNativeFeedback ripple starts on previous touch location` por [@intergalacticspacehighway](https://github.com/intergalacticspacehighway)
  - [#31789](https://github.com/facebook/react-native/pull/31789) `Fix support for blobs larger than 64 KB on Android` por [@tomekzaw](https://github.com/tomekzaw)
  - [#31007](https://github.com/facebook/react-native/pull/31007) `Fix selectionColor doesn't style Android TextInput selection handles` por [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#32398](https://github.com/facebook/react-native/pull/32398) `Fix Android border positioning regression` por [@oblador](https://github.com/oblador)
  - [#29099](https://github.com/facebook/react-native/pull/29099) `[Android] Allows to set individual (left,top,right,bottom) dotted/dashed` por [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#29117](https://github.com/facebook/react-native/pull/29117) `[Android] Fix font weight numeric values` por [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
- **Interaction**
  - [#28995](https://github.com/facebook/react-native/pull/28995) `[Android] Fix TextInput Cursor jumping to the right when placeholder null` por [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#28952](https://github.com/facebook/react-native/pull/28952) `[Android] Fix non selectable Text in FlatList` por [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#29046](https://github.com/facebook/react-native/pull/29046) `[Android] onKeyPress event not fired with numeric keys` por [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#31500](https://github.com/facebook/react-native/pull/31500) `fix#29319 - ios dismiss modal` por [@intergalacticspacehighway](https://github.com/intergalacticspacehighway)
  - [#32179](https://github.com/facebook/react-native/pull/32179) `Fix: multiline textinput start "jerking" when trying to move cursor.` por [@xiankuncheng](https://github.com/xiankuncheng)
  - [#29039](https://github.com/facebook/react-native/pull/29039) `Fix to make taps on views outside parent bounds work on Android` por [@hsource](https://github.com/hsource)
- **Performance**
  - [#31764](https://github.com/facebook/react-native/pull/31764) `Optimize font handling on iOS` por [@Adlai-Holler](https://github.com/Adlai-Holler)
  - [#32536](https://github.com/facebook/react-native/pull/32536) `Don't reconstruct app component on split-screen` por [@Somena1](https://github.com/Somena1)
- **Testing**
  - [#31401](https://github.com/facebook/react-native/pull/31401) `Add unit tests for VirtualizedList render quirks` por [@NickGerleman](https://github.com/NickGerleman)

Alguns desses PRs abordaram problemas que estavam impactando tanto a Meta quanto a comunidade OSS em geral, dado o número de reações nas issues correspondentes que eles fecharam.

Existem muito mais PRs que gostaríamos de destacar, e queremos **agradecer** novamente todas as pessoas que estão dedicando seu tempo para nos ajudar a resolver bugs e melhorar o React Native.

## Engajamento da Comunidade

No início do semestre, estabelecemos uma meta de **comunicar** mais com nossa comunidade e definir processos para que esse comportamento continue. Aqui estão alguns de nossos engajamentos no H2 2021:

<!--alex ignore gross-->

- Tivemos a oportunidade de participar do [React Native EU](https://www.react-native.eu/) com uma palestra de [Joshua Gross](https://twitter.com/joshuaisgross) - [Bringing the Fabric renderer to the "Facebook" app](https://www.youtube.com/watch?v=xKOkILSLs0Q&t=3987s)
- Hospedamos um ["Ask Us Anything" (AUA) no Reddit](https://www.reddit.com/r/reactnative/comments/pzdo1r/react_native_team_aua_thursday_oct_14_9am_pt/) e recebemos mais de 100 perguntas! AUAs são uma ótima oportunidade tanto para nós, para ter uma noção do engajamento da comunidade, quanto para vocês, para fazer qualquer tipo de pergunta. Se você ainda não conferiu, certifique-se de verificar as respostas, pois algumas delas são extremamente valiosas
- Compartilhamos nossa [Visão de Múltiplas Plataformas](https://reactnative.dev/blog/2021/08/26/many-platform-vision), um guia para armadilhas do [Android 12 e iOS 15](https://reactnative.dev/blog/2021/09/01/preparing-your-app-for-iOS-15-and-android-12), e o progresso e [visão para o Hermes se tornar o engine JavaScript padrão](https://reactnative.dev/blog/2021/10/26/toward-hermes-being-the-default) para React Native!
- Nosso próprio [Kevin Gozali](https://twitter.com/fkgozali) apareceu em [um episódio do podcast React Native Radio](https://reactnativeradio.com/episodes/rnr-222-the-new-architecture-with-kevin-gozali-from-the-rn-core-team) para falar sobre a nova arquitetura.
- Na [ReactConf 2021](https://conf.reactjs.org/), [Rick Hanlon](https://twitter.com/rickhanlonii) compartilhou a visão unificada de múltiplas plataformas para React e React Native. Além disso, [Eric Rozell](https://twitter.com/EricRozell) e [Steven Moyes](https://twitter.com/moyessa) puderam compartilhar o progresso incrível que o React Native Desktop fez no suporte a aplicativos da Meta e Microsoft e apresentar a Visão de Múltiplas Plataformas na prática.

Além de compartilhar mais atualizações no H2 2021, também **contamos** com nossa comunidade mais do que nunca. Confiamos no feedback crítico de colaboradores enquanto eles testavam os primeiros rascunhos do material da New Architecture. Além disso, fomos fortemente apoiados pela expertise de nossa comunidade na depuração de problemas críticos de lançamento e melhorias.

Há uma riqueza de conhecimento que nossa comunidade traz para o React Native, e precisamos continuar a nutri-la.

## Rollout da New Architecture e Lançamentos

2022 será o ano da **New Architecture em open source**.

Temos trabalhado arduamente para entregar a infraestrutura necessária para o rollout da New Architecture para aplicativos e bibliotecas. Envolvemos alguns de nossos parceiros e principais colaboradores/mantenedores de bibliotecas para refinar nosso suporte à nova arquitetura e obter feedback de estágio inicial.

Estamos agora nos preparando para lançar um novo guia em nosso website: [Getting Started with the New Architecture](https://github.com/facebook/react-native-website/pull/2879). Esse será o ponto de entrada para uma coleção de materiais que vamos lançar em 2022 e que ajudarão você a migrar/iniciar seu projeto com a nova arquitetura.

Além disso, gostaríamos de enfatizar a [importância de **dar feedback**](https://github.com/facebook/react-native-website/pull/2879) sobre o material da New Architecture. Ainda estamos no processo de finalizar os últimos detalhes e sua contribuição ajudará todos a adotarem a nova arquitetura de forma mais tranquila.

**Lançamentos** desempenham um papel crítico no rollout da New Architecture. Nossa meta no último semestre foi garantir que quaisquer problemas bloqueadores de lançamento não ficassem estagnados. Abordamos o problema [esclarecendo e melhorando processos e responsabilidades](https://github.com/facebook/react-native/wiki/Releases) para melhor responsabilização. Nossa coordenação de lançamentos agora ocorre em um [repositório de discussões dedicado](https://github.com/reactwg/react-native-releases/discussions) com [relatórios de problemas de lançamento mais claros](https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2CType%3A+Upgrade+Issue&template=upgrade-regression-form.yml).

No H1 2022, continuaremos a iterar sobre as responsabilidades de lançamento para apoiar o rollout da nova arquitetura. Se você quiser ajudar a testar release candidates ou [trabalhar em melhorias](https://github.com/facebook/react-native/projects/18), sinta-se à vontade para [participar da discussão](https://github.com/reactwg/react-native-releases/discussions/categories/improvements)!

## Para Mobile e além

Como você pode ver pela [lista de palestras da ReactConf](https://conf.reactjs.org/), React Native não é apenas Android e iOS.

No início de 2021, compartilhamos nossa [Visão de Múltiplas Plataformas](https://reactnative.dev/blog/2021/08/26/many-platform-vision), e tivemos um tempo de sucesso no rollout do React Native tanto em Desktop quanto em VR.

Estamos ansiosos para **convergir padrões** que são específicos de plataforma na experiência React Native.

Finalmente, queremos agradecer novamente à comunidade pelo enorme apoio no H2 2021. É sempre incrível ver como os colaboradores se unem e apoiam uns aos outros no GitHub, corrigindo bugs, compartilhando e nos ajudando a entregar React Native para milhões de usuários.

Fiquem atentos e aguardem um **2022 ainda mais incrível** 🎉!
