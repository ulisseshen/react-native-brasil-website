---
ia-translated: true
title: 'Use um framework para construir apps React Native'
authors: [cortinico]
tags: [announcement]
date: 2024-06-25
---

Na [React Conf](https://www.youtube.com/live/0ckOUBiuxVY?si=pU4qP4eB5iWfY0IG&t=2320), atualizamos nossa orientação sobre a melhor ferramenta para começar a construir apps React Native: um **framework React Native** - uma caixa de ferramentas com todas as APIs necessárias para você construir apps prontos para produção.

Usar frameworks React Native, como o Expo, agora é a abordagem **recomendada** para criar novos apps.

Neste post do blog queremos explicar em detalhes o que eles são e o que significam para você como desenvolvedor React Native iniciando um novo projeto.

<!-- truncate  -->

## O que é um framework React Native?

Se você tem construído apps para produção, provavelmente sabe que existe um conjunto de problemas comuns que você precisará resolver mais cedo ou mais tarde.

Ao construir qualquer aplicação seja para web ou nativa, você provavelmente quer que seus usuários naveguem por diferentes telas, busquem dados e armazenem o estado do seu usuário. Mas para apps nativos há ainda mais para lidar: você precisa de ferramentas para atualizar seu código nativo entre versões do React Native, gerenciar versões compatíveis de todas as suas dependências e lidar com ferramentas de build nativas.

É preciso uma aldeia para levar um app da ideia para a produção sem as ferramentas certas.

Queremos que você foque em escrever aplicações e funcionalidades bonitas para seus usuários, e não em resolver esses problemas comuns repetidamente.

É por isso que acreditamos que a melhor maneira para você experimentar o React Native é através de um framework que oferece uma caixa de ferramentas com todas as ferramentas necessárias para construir aplicações prontas para produção.

Descobrimos que **ou você está usando um framework ou você está construindo seu próprio framework**.

Não há nada de errado em construir seu próprio framework, criando suas próprias soluções para routing, navigation, deploy, e assim por diante. Grandes corporações como Meta e Microsoft constroem seus próprios frameworks internamente para integrar profundamente em seus apps brownfield. Mas acreditamos que a maioria das pessoas estará em melhor situação usando um framework existente.

Se você tem usado React na web, provavelmente está familiarizado com um conceito similar de [frameworks React de nível de produção](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks).

Até hoje, o único framework comunitário recomendado para React Native é o [Expo](https://docs.expo.dev/). O pessoal do Expo tem investido no ecossistema React Native desde os primeiros dias do React Native e, até hoje, acreditamos que a experiência de desenvolvedor oferecida pelo Expo é a melhor da categoria.

:::note

Expo, o framework, é e permanecerá gratuito e open source, enquanto o Expo Application Services (EAS) é um serviço pago opcional.

:::

<!--alex ignore he-she retext-equality-->

Se você não tem usado o Expo recentemente, não perca [esta palestra da Kadi @ Expo](https://www.youtube.com/live/0ckOUBiuxVY?si=N-WSfmAJSMfd6wDL&t=3888) onde ela mostra o que você pode fazer com o Expo em 2024.

Também atualizamos a [página Getting Started](https://reactnative.dev/docs/environment-setup) no site para refletir esta recomendação.

## Como os frameworks afetarão você?

Se você já está usando um framework recomendado como o Expo, você já está pronto!

Se você gostaria de migrar seu app existente para o Expo, você pode encontrar instruções no [site oficial do Expo](https://docs.expo.dev/bare/overview/). O Expo oferece muitos benefícios, como uma maneira mais fácil de [atualizar sua versão do React Native](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/), uma experiência de desenvolvedor melhor e muito mais.

No entanto, se você não pode ou não quer migrar para o Expo, tudo bem também. Usar React Native sem um framework oficial continuará sendo suportado. As ferramentas que você tem usado como React Native Community CLI, Template e [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) continuarão funcionando normalmente.

O comando `react-native init` foi movido para fora do core e agora está acessível via:

```
npx @react-native-community/cli@latest init
```

e no GitHub em [react-native-community/cli](https://github.com/react-native-community/cli).

Se você é um desenvolvedor de bibliotecas React Native, coletamos uma lista de recomendações sobre quais APIs usar. [Leia mais no RFC](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0759-react-native-frameworks.md#what-do-we-recommend-to-react-native-library-developers).

## Leitura adicional

Se você está interessado em aprender mais sobre o raciocínio por trás desta decisão, convidamos você a ler o [RFC0759: React Native Frameworks](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0759-react-native-frameworks.md#what-do-we-recommend-to-react-native-library-developers). Este RFC é o resultado de um esforço de vários meses envolvendo inúmeras discussões e brainstorming entre diferentes parceiros e participantes do ecossistema React Native.

Embora o Expo hoje seja o único framework recomendado, o RFC também contém [diretrizes](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0759-react-native-frameworks.md#becoming-a-react-native-framework) sobre como se tornar um framework recomendado, pois esperamos ver mais competição e inovação neste espaço.

Além disso, você deve conferir a palestra [useFrameworks()](https://www.youtube.com/watch?v=lifGTznLBcw) na App.js 2024 onde apresentamos este RFC e as mudanças necessárias em um formato curto.

Acreditamos que ao esclarecer as responsabilidades respectivas do React Native Core e dos Frameworks, podemos fomentar um ecossistema mais saudável e impulsionar o crescimento e inovação para o React Native.
