---
ia-translated: true
title: Uma atualização sobre o Rollout da New Architecture
authors: [cortinico]
tags: [announcement]
date: 2022-03-15
---

Olá a todos,
[Como anunciado anteriormente](/blog/2022/01/21/react-native-h2-2021-recap#the-new-architecture-rollout-and-releases):

:::info
2022 será o ano da New Architecture em open source.
:::

Se você ainda não teve tempo de conhecer a New React Native Architecture (o Fabric Renderer e o sistema TurboModule), não há momento melhor para fazê-lo **do que agora**!

Gostaríamos de compartilhar com a comunidade algumas iniciativas e materiais que preparamos para garantir que todos estejam a bordo neste esforço.

<!--truncate-->

### O Working Group

Recentemente, lançamos o [React Native New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture) no GitHub, um repositório _somente para discussões_ para coordenar e apoiar o rollout da New Architecture em todo o ecossistema.

Imaginamos este working group como um espaço onde a comunidade possa se **encontrar**, compartilhar **ideias** e **discutir** desafios durante a adoção da New Architecture. Além disso, vamos usar este working group para **compartilhar** informações e atualizações com a comunidade mais ampla em prol da transparência.

Para manter a discussão focada, decidimos ter este working group **aberto para leitura** publicamente e **restrito para escrita** apenas para usuários aprovados.

Se você deseja participar da conversa, pode [preencher este formulário](https://forms.gle/8emgdwFZXuzEpyyn9) para **se candidatar ou indicar** alguém que você acha que seria uma adição valiosa à discussão.

**Todos são bem-vindos** para se candidatar e participar da conversa.

Como em todo fórum de discussão, gostaríamos de enfatizar mais uma vez a importância de ser **respeitoso** e acolhedor com as opiniões dos outros. Por favor, aproveite para ler nosso [**código de conduta**](https://github.com/reactwg/react-native-new-architecture/blob/main/CODE_OF_CONDUCT.md) se ainda não o fez.

### O Guia de Migração

Após várias rodadas de revisão e feedback, finalmente mesclamos **o Guia de Migração** (anteriormente conhecido como _o Playbook_). Você pode encontrá-lo [no working group da New Architecture](https://github.com/reactwg/react-native-new-architecture#guides).

Este Guia de Migração mostrará **como criar um componente Fabric customizado ou um TurboModule** com uma abordagem passo a passo. O guia também mostrará como **adaptar seu aplicativo ou biblioteca existente** para usar a New Architecture.

Além disso, gostaríamos de lembrá-lo da nova [seção Architecture](/architecture/overview) de nosso website. Lá você pode encontrar vários artigos aprofundados e explicações dos internals do React Native. Especificamente, [a seção Fabric](/architecture/fabric-renderer) pode ajudá-lo a entender o pipeline de renderização no mundo da New Architecture.

Finalmente, considere **compartilhar seu feedback** sobre este material de documentação [no working group](https://github.com/reactwg/react-native-new-architecture/discussions/7). Estamos constantemente buscando a opinião dos desenvolvedores, e queremos ter certeza de que estamos fornecendo o conteúdo que você considera mais útil.

Nos próximos meses, procuraremos refinar e adicionar mais documentação para ajudá-lo ainda mais.

### O Template da New Architecture

React Native **0.68.0** está próximo do lançamento. Esta versão do React Native marca um marco crucial no Rollout da New Architecture, pois é a primeira versão a incluir um **switch opt-in** no **novo template de aplicativo**.

Isso significa que você poderá experimentar a New Architecture **alterando uma linha** no template. Também adicionamos **comentários e documentação** extensivos ao template para garantir que você não precise de leitura extra para usá-lo pronto para uso. Esperamos que isso ajude você a adotar a New Architecture **reduzindo a quantidade de código** que você precisa escrever.

<!-- alex ignore simple -->

Nos próximos lançamentos, continuaremos atualizando o template para torná-lo ainda mais simplificado e simples de usar.

Para habilitar a New Architecture em qualquer plataforma, você pode:

- No iOS, execute `RCT_NEW_ARCH_ENABLED=1 bundle exec pod install` dentro da pasta `ios`.
- No Android, defina a propriedade `newArchEnabled` como `true` através de **uma destas opções**:
  - Alterando a linha correspondente dentro do arquivo `android/gradle.properties`.
  - Definir uma variável de ambiente `ORG_GRADLE_PROJECT_newArchEnabled=true`
  - Invocar o Gradle com `-PnewArchEnabled=true`

Então você pode **executar seu aplicativo** com `yarn react-native run-android` ou `run-ios` e estará rodando com Fabric e TurboModules habilitados.

Considere experimentar este novo template e [reportar quaisquer bugs ou comportamentos inesperados](https://github.com/reactwg/react-native-new-architecture/discussions/5) que você possa encontrar. Nos últimos meses, trabalhamos arduamente para corrigir bugs e falhas de build que teriam sido **difíceis de capturar** sem o feedback e testes constantes da comunidade.

### O Ecossistema de Bibliotecas de Terceiros

A comunidade não poderá migrar para a New Architecture sem o suporte total de **autores e mantenedores de bibliotecas de terceiros**.

Entendemos como isso pode ser um processo tedioso, e compreendemos a importância de suportar usuários em **ambas** as arquiteturas, antiga e nova. Nos próximos meses, vamos nos concentrar em apoiar nossos desenvolvedores de bibliotecas para ajudá-los a migrar.

Se você é um **desenvolvedor de biblioteca**, [convidamos você a postar uma atualização](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries) no working group da New Architecture com o **status de suas bibliotecas**. Isso ajudará você a atrair early adopters e nos ajudará a entender se alguma biblioteca está enfrentando um bloqueador.

Se, em vez disso, você é um **usuário de biblioteca**, pode [postar uma mensagem aqui](https://github.com/reactwg/react-native-new-architecture/discussions/6) para solicitar a migração de uma biblioteca. Se identificarmos uma biblioteca que se torna um bloqueador para um número de usuários, tentaremos entrar em contato com o mantenedor e entender por que eles ainda não migraram.

Finalmente, gostaríamos de dar um destaque especial à Software Mansion por lançar uma nova versão do [`react-native-screens`](https://github.com/software-mansion/react-native-screens), que tem suporte para ambas as arquiteturas. Além disso, eles publicaram um post no blog ([Introducing Fabric to react-native-screens](https://blog.swmansion.com/introducing-fabric-to-react-native-screens-fd17bf18858e)) onde **contam sua história de migração**. Esperamos que você ache esta história inspiradora e útil para enfrentar sua migração.

### Lançamentos

O trabalho no pré-lançamento 0.68 realizou muito do [processo de lançamento aprimorado que definimos no último semestre](/blog/2022/01/19/version-067#improvements-to-release-process).

Ficamos felizes em compartilhar que com 0.68 conseguimos:

- Integrar com sucesso o trabalho de lançamento a uma rotação interna. Muito disso é apoiado por [documentação aprimorada](/contributing/overview) sobre o processo de lançamento, que reduzirá o fator de bus do processo de lançamento.
- Iniciamos discussões com parceiros para apoiar uma [rotação Copilot](https://github.com/reactwg/react-native-releases/blob/main/docs/roles-and-responsibilities.md). Esperamos que este esforço melhore a transparência do processo e informe nossos parceiros onde investir para apoiar os lançamentos do React Native e o ecossistema.
- [Integramos vários Release Supporters e Testers da comunidade](https://github.com/reactwg/react-native-releases/discussions/11). Fizemos um chamado para ajuda no último semestre e muitas pessoas se apresentaram! O feedback de nossos testadores e apoiadores **nos ajudou a corrigir bugs cruciais** e regressões, especialmente em torno da nova arquitetura, para o próximo lançamento. Obrigado a todos que se inscreveram e testaram o lançamento!

Com o React Native 0.69 continuaremos refinando este processo, idealmente obtendo dos parceiros um sinal de lançamento mais cedo e integrando co-pilotos. Como sempre, [qualquer feedback é mais do que bem-vindo](https://github.com/reactwg/react-native-releases/discussions). Se você quiser participar como testador ou apoiador de lançamento, [inscreva-se aqui](https://forms.gle/fPuPE1MZRDGWNqpd6).

### Rumo ao Hermes como engine padrão

Um dos pontos cruciais do Rollout da New Architecture é a adoção do novo engine JavaScript: **Hermes**.

Com a New React Native Architecture, vamos **definir o Hermes como engine padrão**. Isso significa que toda a nova documentação e templates terão o Hermes habilitado.

Observe que continuaremos trabalhando com a comunidade para garantir que **outros engines**, como JSC (JavaScript Core), **sejam suportados**. Você ainda pode usar o engine que desejar, mas terá que **desabilitar explicitamente o Hermes**.

Para melhorar a estabilidade do Hermes, estamos trabalhando para mudar o **modelo de distribuição** do Hermes. Especificamente, imaginamos que o processo de lançamento do Hermes **seja mais próximo** do processo de lançamento do React Native.

Isso nos permitirá enviar uma versão do React Native, com um engine JS integrado que é **totalmente compatível**. Você não terá que lidar com crashes em tempo de execução e incompatibilidades do Hermes que são realmente difíceis de depurar e entender.

Além disso, isso **encurtará o ciclo** para incorporar **melhorias** e correções de bugs no Hermes, o que nos permitirá ser mais **responsivos** às necessidades dos usuários do React Native.

Compartilharemos mais sobre este assunto nos próximos meses. Enquanto isso, sinta-se à vontade para [participar da discussão](https://github.com/reactwg/react-native-new-architecture/discussions/4) sobre isso no Working Group.

Se você ainda não experimentou o Hermes, agora é a hora de experimentá-lo. E certifique-se de sinalizar quaisquer problemas ou bloqueadores que você possa enfrentar.

Com isso, é tudo.

Gostaria de agradecer Andrei, Aleksandar, Dmitry, Eli, Luna, Héctor e Neil por revisar este post do blog e fornecer contribuições valiosas para esses esforços.

E aguardamos ansiosamente **ler suas histórias de migração**.
