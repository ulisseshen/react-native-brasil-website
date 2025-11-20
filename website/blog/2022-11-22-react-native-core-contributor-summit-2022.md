---
ia-translated: true
title: React Native Core Contributor Summit 2022
authors: [thymikee, cortinico]
tags: [announcement]
date: 2022-11-22
---

# React Native Core Contributor Summit 2022

Após anos de pandemia e eventos apenas online, sentimos que era hora de reunir os Core Contributors do React Native!

É por isso que no início de setembro, reunimos alguns dos colaboradores principais ativos do React Native, mantenedores de bibliotecas e as equipes React Native e Metro da Meta para o **Core Contributor Summit 2022**. A [Callstack](https://www.callstack.com/) hospedou o Summit em sua sede em Wrocław, Polônia, como parte da conferência [React Native EU](https://www.react-native.eu/) acontecendo ao mesmo tempo.

Junto com a equipe principal do React Native, elaboramos uma série de **workshops** nos quais os participantes puderam participar. Os tópicos foram:

- ​​React Native Codegen & TypeScript Support
- ​​React Native New Architecture Library Migration
- ​​React Native Monorepo
- Metro Web and Ecosystem Alignment
- Metro Simplified Release Workflow

Ficamos impressionados com a quantidade de compartilhamento de conhecimento e colaboração ao longo desses dois dias. Neste post do blog, gostaríamos de dar a vocês uma prévia dos resultados desta reunião.

<!--truncate-->

### React Native Codegen & TypeScript Support

O [React Native's Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md) é uma parte fundamental da New Architecture do React Native. Apoiá-lo e melhorá-lo está entre nossas principais prioridades para o futuro do React Native. Por exemplo, no início deste ano, adicionamos suporte para código genérico a partir de specs TypeScript em vez de Flow.

Nesta sessão, aproveitamos a oportunidade para integrar novos colaboradores ao Codegen, explicando seu conceito central e descrevendo como funciona. Em seguida, focamos em duas áreas principais:

#### 1. Suporte a **novos tipos** que atualmente não são suportados pelo Codegen. Um dos altamente solicitados foram os [string union types em TypeScript](https://github.com/Titozzz/react-native/tree/codegen-string-union).

Uma equipe de algumas pessoas se mudou para uma sala de reuniões para enfrentar esta tarefa. Eles encontraram e superaram algumas dificuldades ao longo do caminho, como executar testes unitários para Codegen. Eles passaram um bom tempo entendendo o fluxo de execução do código antes de começar a lidar com o código. Após algumas horas de trabalho colaborativo, eles terminaram com o primeiro protótipo que foi capaz de reconhecer string unions. Esta experiência foi extremamente útil para discutir padrões de design e a arquitetura ideal que podemos querer no futuro.

#### 2. Melhorar o **[auto-linking para iOS](https://github.com/facebook/react-native/pull/34580)**, que estava faltando um caso de uso.

Especificamente, o auto-linking não podia funcionar bem em cenários onde bibliotecas e o aplicativo estavam vivendo juntos em um monorepo. Android já suportava este caso de uso, mas estava faltando para iOS.

Trabalhar com os colaboradores no Codegen nos ajudou a perceber que não era trivial trabalhar em sua base de código. Por exemplo, adicionar suporte para um tipo exigia copiar e colar o mesmo código em quatro lugares diferentes: módulos com specs escritas em Flow, módulos com specs escritas em TypeScript, componentes com specs escritas em Flow e componentes com specs escritas em TypeScript.

Essa percepção nos levou a criar uma [tarefa guarda-chuva](https://github.com/facebook/react-native/issues/34872) para buscar ajuda da comunidade a fim de melhorar o status da base de código para uma mais sustentável.

A participação foi excelente: conseguimos atribuir rapidamente as primeiras **40 tarefas em 5 dias**. No final de outubro, a comunidade completou **47 tarefas** e muitas outras estão prontas e esperando para serem mescladas.

Esta iniciativa também contribuiu para o [Hacktoberfest](https://hacktoberfest.com/) para todas as pessoas que contribuíram para essas melhorias!

### ​​React Native New Architecture Library Migration

O tema quente no espaço React Native é a New Architecture. Ter **bibliotecas** que suportam a New Architecture é um ponto crucial na [migração para todo o ecossistema](/blog/2022/06/16/resources-migrating-your-react-native-library-to-the-new-architecture). Portanto, queremos apoiar os mantenedores de bibliotecas na migração para a New Architecture.

Inicialmente, esta sessão começou como um brainstorming, onde os colaboradores principais tiveram a oportunidade de fazer à equipe React Native todas as perguntas que tinham relacionadas à New Architecture. Este loop de feedback presencial foi crucial tanto para os colaboradores principais trazerem clareza quanto para a equipe React Native coletar feedback. Alguns dos feedbacks e preocupações compartilhados acabarão sendo implementados no React Native 0.71.

Em seguida, passamos a migrar praticamente o máximo de bibliotecas possível para a nova arquitetura. Durante esta sessão, iniciamos o processo de migração para vários pacotes da comunidade, como `react-native-document-picker`, `react-native-store-review` e `react-native-orientation`.

Como lembrete, se você também está migrando uma biblioteca e precisa de suporte para fazê-lo, entre em contato com nosso [New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture) no GitHub.

### ​​React Native Monorepo

Lançar uma nova versão do React Native não é trivial hoje. React Native é um dos pacotes mais baixados no NPM, e queremos garantir que nosso processo de lançamento seja suave.

É por isso que queremos refatorar o repositório `react-native` e implementar o **Monorepo RFC** ([#480](https://github.com/react-native-community/discussions-and-proposals/pull/480)).

Nesta sessão, inicialmente fizemos um brainstorming e coletamos opiniões de cada colaborador, pois é crucial que evoluamos nosso repositório para reduzir as breaking changes para nossas dependências downstream.

Em seguida, começamos a trabalhar em duas frentes. Primeiro, tivemos que expandir nossa infraestrutura de Integração Contínua para suportar nosso monorepo, adicionando [Verdaccio](https://verdaccio.org/) à nossa infraestrutura de testes. Em seguida, começamos a renomear e adicionar escopos a vários de nossos pacotes, resultando em 6 contribuições distintas.

Você pode acompanhar o status deste esforço nesta [issue guarda-chuva](https://github.com/facebook/react-native/issues/34692) e esperamos compartilhar mais sobre este esforço em um futuro próximo.

### Metro Web and Ecosystem Alignment

[Metro](https://github.com/facebook/metro), nosso JavaScript Bundler, é uma parte fundamental e integrada da experiência de desenvolvimento React Native e queremos garantir que funcione com os padrões mais recentes no ecossistema JS.

O foco desta sessão foi discutir como melhorar o conjunto de recursos do Metro para funcionar melhor para casos de uso web e com o ecossistema npm e bundler. Duas áreas principais de discussão:

#### 1. Adotar a especificação `"exports"` ([package entry points](https://nodejs.org/api/packages.html#package-entry-points))

Da [documentação do Node.js](https://nodejs.org/api/packages.html#package-entry-points):

<!-- alex ignore clearly -->

:::info
A ["exports"](https://nodejs.org/api/packages.html#exports) fornece uma alternativa moderna à ["main"](https://nodejs.org/api/packages.html#main) permitindo que múltiplos pontos de entrada sejam definidos, suporte de resolução de entrada condicional entre ambientes, e **prevenindo qualquer outro ponto de entrada além daqueles definidos em ["exports"](https://nodejs.org/api/packages.html#exports)**. Este encapsulamento permite que autores de módulos definam claramente a interface pública para seu pacote.
:::

Adotar a especificação `"exports"` tem muito potencial. Nesta sessão, debatemos sobre como lidar com [Código Específico de Plataforma](/docs/platform-specific-code#platform-specific-extensions) com `"exports"`. Considerando muitos fatores, elaboramos um plano de rollout bastante não-disruptivo para `"exports"`, adicionando um modo `"strict"` e `"non-strict"` ao resolver Metro. Discutimos como aproveitar [builder-bob](https://github.com/callstack/react-native-builder-bob) ajudaria os criadores de bibliotecas a adotar o modo strict sem fricção.

Esta discussão resultou em:

1. Uma [RFC](https://github.com/react-native-community/discussions-and-proposals/pull/534) para Metro sobre como package exports funcionariam com React Native.
2. Uma [RFC](https://github.com/nodejs/node/pull/45367) para Node.js para incluir "react-native" como uma Community Condition.

#### 2. Web e ecossistema bundler

A equipe do Metro compartilhou o progresso de sua parceria com Expo e a intenção de continuar este modelo de trabalho para o próximo suporte a bundle splitting e tree-shaking. Tocamos novamente no suporte a módulos ES e consideramos recursos futuros potenciais como Yarn PnP e otimização de saída na web. Discutimos como o núcleo do Metro compartilha lógica e estruturas de dados com o Jest e oportunidades para mais reutilização.

Desenvolvedores apresentaram casos de uso perspicazes para bundle splitting e interoperabilidade com ferramentas de terceiros. Isso nos levou a discutir pontos de extensão potenciais no Metro e melhorar a documentação atual.

Esta discussão nos forneceu uma boa base para a sessão do dia seguinte sobre simplificação do workflow de lançamento.

### Metro Simplified Release Workflow

Como mencionado, lançar React Native não é trivial.

As coisas ficam mais difíceis pois precisamos lançar React Native, o React Native CLI e Metro. Essas ferramentas estão conectadas entre si, pois React Native e CLI dependem do Metro. Isso cria algum atrito quando qualquer um dos pacotes lança uma nova versão.

Atualmente, gerenciamos isso através de comunicação direta e lançamentos sincronizados, mas há espaço para melhoria.

Nesta sessão, reconsideramos as **dependências** entre React Native, Metro e CLI. Descobrimos como algumas decisões de design durante o [esforço "Lean Core"](https://github.com/react-native-community/discussions-and-proposals/issues/6), quando extraímos o CLI do React Native, tornaram esses dois projetos co-dependentes com algumas funcionalidades duplicadas entre esforços. As decisões naquela época faziam sentido e permitiram que a equipe CLI iterasse mais rápido do que nunca.

Era hora de revisitá-las e aproveitar a experiência de ambas as equipes para descobrir o caminho. Como resultado, a equipe do Metro assumirá o desenvolvimento do [`@react-native-community/cli-plugin-metro`](https://github.com/react-native-community/cli/tree/main/packages/cli-plugin-metro), movendo-o temporariamente de volta para o núcleo do React Native, e então provavelmente para o monorepo do Metro.

![](/blog/assets/core-contributor-summit-2022.jpg)

A maior lição, além de três horas desenhando dependências entre os pacotes no quadro branco, foi para as equipes CLI e Metro trocarem seus problemas, experiências e planos, resultando em um melhor entendimento mútuo.

Não seríamos capazes de alcançar este nível de cooperação sem realmente nos encontrarmos.

---

Ainda estamos impressionados com como passar várias horas juntos por alguns dias resultou em tanto compartilhamento de conhecimento e polinização cruzada de ideias. Durante este summit, plantamos as sementes para iniciativas que nos ajudarão a melhorar e remodelar o ecossistema React Native.

Queremos agradecer novamente à [Callstack](https://www.callstack.com/) por nos hospedar e a todos os participantes por se juntarem a nós no Core Contributor Summit 2022.

Se você está interessado em participar do desenvolvimento do React Native, certifique-se de participar de nossas iniciativas abertas e ler o [guia de contribuição](https://reactnative.dev/contributing/overview) que temos em nosso website. Esperamos encontrá-lo pessoalmente também no futuro!
