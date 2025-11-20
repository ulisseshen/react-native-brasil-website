---
ia-translated: true
title: Ajudando a migrar bibliotecas React Native para a New Architecture
authors: [cipolleschi]
tags: [announcement]
date: 2022-06-16
---

**tl; dr**: Estamos trabalhando para melhorar os recursos que suportam a New Architecture do React Native. Já lançamos um repositório para ajudar a migrar seu aplicativo ([RNNewArchitectureApp](https://github.com/react-native-community/RNNewArchitectureApp)) e um para suas bibliotecas ([RNNewArchitectureLibraries](https://github.com/react-native-community/RNNewArchitectureLibraries)). Também estamos reformulando o [guia da New Architecture](https://github.com/facebook/react-native-website/pull/3037) no Website e criamos um [GitHub Working Group](https://github.com/reactwg/react-native-new-architecture/discussions) para responder perguntas relacionadas à New Architecture.

<!--truncate-->

## Introdução

Neste post, compartilhamos uma atualização sobre ferramentas e recursos para ajudá-lo a migrar seus **Native Modules** e **Native Components** para seus equivalentes da **New Architecture**, **TurboModule** e **Fabric Components**.

Os usuários do React Native utilizam um vasto número de bibliotecas open source para construir aplicativos. Para um ecossistema completo e consistente, é necessário que essas bibliotecas migrem para que todos possam se beneficiar das capacidades desbloqueadas e melhorias de performance da New Architecture.

Aqui está o que estamos trabalhando para apoiar os desenvolvedores de bibliotecas na migração para a New Architecture:

- **Documentação:** Estamos expandindo o [guia da New Architecture](https://github.com/facebook/react-native-website/pull/3037) no website para cobrir mais conceitos da New Architecture e como desenvolver seus componentes.
- **Exemplos de Migração:** Configuramos dois repositórios para demonstrar como migrar um aplicativo React Native para a New Architecture ([RNNewArchitectureApp](https://github.com/react-native-community/RNNewArchitectureApp)) e como criar um **Fabric Component** e um **TurboModule** que funcionam com ambas as arquiteturas ([RNNewArchitectureLibraries](https://github.com/react-native-community/RNNewArchitectureLibraries)).
- **Suporte:** No início deste ano, criamos um [GitHub Working Group](https://github.com/reactwg/react-native-new-architecture/discussions) dedicado a discussão e perguntas sobre a New Architecture.

Neste post, vamos nos aprofundar nesses recursos e explicar com mais detalhes como você pode usá-los de forma mais eficiente. Finalmente, forneceremos um panorama do estado atual de migração para as bibliotecas React Native mais usadas.

### Documentação

Nos últimos 6 meses, adicionamos um [guia sobre a adoção da New Architecture](https://github.com/reactwg/react-native-new-architecture#guides) e um [mergulho profundo na arquitetura](/architecture/overview) sobre Fabric. Planejamos expandir isso para incluir mais guias e documentação sobre criação de TurboModules, entendimento do CodeGen e mais. Planejamos ter atualizações para compartilhar até o lançamento 0.70.

Atualmente, o guia da **New Architecture** cobre como [migrar seu aplicativo](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-apps.md) e [suas bibliotecas](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-libraries-prerequisites.md) para suportar a New Architecture adequadamente.

Se você está interessado na evolução deste guia, ou tem feedback, pode acompanhar [este](https://github.com/facebook/react-native-website/pull/3037) pull request.

### Exemplos de Migração

Para desenvolvedores que podem querer acompanhar no código, preparamos dois repositórios de exemplo.

#### RNNewArchitectureApp

[Este repositório](https://github.com/react-native-community/RNNewArchitectureApp) foi criado para demonstrar como migrar um aplicativo, os native modules e os native components da arquitetura legada no React Native versão 0.67 para a New Architecture e a versão mais recente do React Native. Cada commit corresponde a uma etapa de migração isolada.

<figure>
    <img src="/blog/assets/new-arch-example-steps-to-migrate-an-app.png" alt="Example steps to migrate an app" />
    <figcaption>Lista de commits para uma migração no repositório RNNewArchitectureApp</figcaption>
</figure>

O repositório está organizado da seguinte forma:

- Uma branch **main** não tem código, apenas um README.md que divulga outras branches.
- Várias branches de migração que mostram uma migração de uma versão específica do RN para outra.

Algumas das branches de migração também têm um arquivo **RUN.md** que descreve de forma mais legível os passos exatos que foram aplicados em cada commit.

Planejamos manter este exemplo atualizado com os lançamentos estáveis mais recentes, adicionando migrações para qualquer lançamento menor do React Native que vamos lançar. Se você notar problemas com qualquer uma das etapas, por favor, registre uma issue no repositório. Isso será mantido até termos a sensação razoável de que a maioria dos usuários do React Native migrou para a New Architecture.

#### RNNewArchitectureLibraries

Da mesma forma, [este repositório](https://github.com/react-native-community/RNNewArchitectureLibraries) fornece um guia passo a passo sobre como criar um **TurboModule** e um **Fabric Component**. Ele tem foco em garantir compatibilidade retroativa entre a New Architecture e a legada.

O repositório está organizado de maneira similar ao anterior:

- Uma branch **main** não tem código, apenas um README.md que divulga outras branches.
- Outras branches para mostrar como desenvolver **TurboModules** e **Fabric Components**.

Planejamos manter este exemplo atualizado para novos lançamentos do React Native, especialmente lançamentos que afetam o desenvolvimento de bibliotecas, bem como adicionar mais exemplos sobre como usar recursos avançados (por exemplo: implementar commands, event emitters, custom state). Se você notar erros, por favor, registre uma issue no repositório de exemplo.

### Suporte

Criamos um [working group](https://github.com/reactwg/react-native-new-architecture) dedicado para dar à comunidade espaço para fazer perguntas e obter atualizações sobre a New Architecture. Se você é um mantenedor de biblioteca, este é um recurso valioso para encontrar respostas para suas perguntas, e para nós sabermos sobre seus requisitos. Para participar, siga [estas instruções](https://github.com/reactwg/react-native-new-architecture#how-to-join-the-working-group). Todos são bem-vindos.

O working group está organizado em várias seções:

- [Announcements](https://github.com/reactwg/react-native-new-architecture/discussions/categories/announcements): Um lugar para compartilhar marcos e atualizações significativas sobre o Rollout da RN New Architecture
- [Deep Dive](https://github.com/reactwg/react-native-new-architecture/discussions/categories/deep-dive): Um lugar para conversar sobre mergulhos profundos e tópicos técnicos específicos
- [Documentation](https://github.com/reactwg/react-native-new-architecture/discussions/categories/documentation): Um lugar para conversar sobre a documentação da New Architecture e material de migração
- [Libraries](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries): Um lugar para conversar sobre bibliotecas de terceiros e sua história de migração para a New Architecture
- [Q&A](https://github.com/reactwg/react-native-new-architecture/discussions/categories/q-a): Um lugar para pedir ajuda à comunidade sobre tópicos da New Architecture
- [Releases](https://github.com/reactwg/react-native-new-architecture/discussions/categories/releases): Um lugar para conversar sobre bugs específicos de lançamento e problemas de build

Para usar este grupo de forma eficaz:

- **Certifique-se de que sua biblioteca esteja listada dentro da seção [Libraries](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries)**. Isso nos ajudará a compartilhar uma atualização de status sobre a migração de sua biblioteca e nos ajudará a entender quais dificuldades os autores de bibliotecas estão enfrentando para apoiá-lo melhor.
- **Aproveite a seção Q&A [section](https://github.com/reactwg/react-native-new-architecture/discussions/categories/q-a) se você enfrentar um bloqueador e precisar de suporte**. Nossa equipe e especialistas da comunidade estão monitorando e apoiarão da melhor forma possível.
- **Fique de olho nas outras seções para tópicos que podem afetá-lo**. Um novo lançamento pode introduzir exatamente a API que você estava procurando. Você pode se inscrever em discussões específicas via GitHub.

Planejamos apoiar este grupo até que a **New Architecture** esteja habilitada por padrão e todas as principais bibliotecas tenham sido migradas para ela.

### Status de Migração de Bibliotecas Populares

Mantenedores de bibliotecas têm compartilhado conosco [no working group](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries) o status de seu esforço de migração, e queríamos fornecer uma visão geral rápida:

- [react-native-gesture-handler](https://github.com/reactwg/react-native-new-architecture/discussions/15): ✅ Migrado
- [react-native-navigation](https://github.com/reactwg/react-native-new-architecture/discussions/17): 🏃‍♂️ Em andamento
- [react-native-pager-view](https://github.com/reactwg/react-native-new-architecture/discussions/16): 🏃‍♂️ Em andamento
- [react-native-reanimated](https://github.com/reactwg/react-native-new-architecture/discussions/14): ✅ Migrado. Em processo de teste e profiling de performance
- [react-native-screens](https://github.com/reactwg/react-native-new-architecture/discussions/13): 🏃‍♂️ Em andamento
- [react-native-slider](https://github.com/reactwg/react-native-new-architecture/discussions/38): 🎬 Iniciado
- [react-native-template-new-architecture](https://github.com/reactwg/react-native-new-architecture/discussions/21): ✅ Migrado. Adotando/testando gradualmente mais bibliotecas companheiras
- [react-native-template-typescript](https://github.com/reactwg/react-native-new-architecture/discussions/22): ✅ Migrado
- [react-native-webview](https://github.com/reactwg/react-native-new-architecture/discussions/19): 🎬 Iniciado

## Próximos Passos

Estamos investidos em apoiar a adoção da New Architecture pela comunidade React Native. Concretamente, continuaremos a:

- Oferecer suporte de melhor esforço no **Working Group**.
- Fornecer mais exemplos sobre como alcançar resultados incríveis com a New Architecture nos repositórios **RNNewArchitecture**.
- Fornecer documentação clara e atualizada sobre a **New Architecture**.
- Acompanhar o status de migração de bibliotecas essenciais do React Native no **Working Group**.
- Simplificar o caminho de migração para desenvolvedores

Além disso, React Native 0.69 será lançado com devX aprimorado para desenvolvedores de aplicativos e bibliotecas para adoção da New Architecture. Você pode encontrar mais informações sobre o lançamento 0.69.0 [aqui](https://github.com/reactwg/react-native-releases/discussions/21).

Estamos empolgados com o que vamos construir juntos com a **New Architecture**!
