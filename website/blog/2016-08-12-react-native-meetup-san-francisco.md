---
ia-translated: true
title: Resumo do Meetup de San Francisco
authors: [hectorramos]
hero: '/blog/img/rnmsf-august-2016-hero.jpg'
tags: [events]
---

Na semana passada tive a oportunidade de participar do [React Native Meetup](https://www.meetup.com/React-Native-San-Francisco/photos/27168649/#452793854) no escritório da Zynga em San Francisco. Com cerca de 200 pessoas presentes, serviu como um ótimo lugar para conhecer outros desenvolvedores perto de mim que também estão interessados em React Native.

![](/blog/assets/rnmsf-august-2016-hero.jpg)

Eu estava particularmente interessado em aprender mais sobre como React e React Native são usados em empresas como Zynga, Netflix e Airbnb. A agenda da noite seria a seguinte:

- Prototipagem Rápida em React
- Projetando APIs para React Native
- Preenchendo a Lacuna: Usando React Native em Bases de Código Existentes

Mas primeiro, o evento começou com uma rápida introdução e um breve resumo de notícias recentes:

- Você sabia que React Native agora é o [principal repositório Java no GitHub](https://twitter.com/jamespearce/status/759637111880359937)?
- [rnpm](https://github.com/rnpm/rnpm) agora faz parte do core do React Native! Agora você pode usar `react-native link` no lugar de `rnpm link` para [instalar bibliotecas com dependências nativas](/docs/linking-libraries-ios).
- A comunidade React Native Meetup está crescendo rapidamente! Agora existem mais de 4.800 desenvolvedores em uma variedade de grupos de meetup React Native em todo o mundo.

Se [um desses meetups](https://www.meetup.com/find/?allMeetups=false&keywords=react+native&radius=Infinity&userFreeform=San+Francisco%2C+CA&mcId=z94105&mcName=San+Francisco%2C+CA&sort=recommended&eventFilter=mysugg) for realizado perto de você, eu recomendo muito participar!

## Prototipagem Rápida em React na Zynga

A primeira rodada de notícias foi seguida por uma rápida introdução pela Zynga, nossos anfitriões da noite. Abhishek Chadha falou sobre como eles usam React para prototipar rapidamente novas experiências em mobile, demonstrando um protótipo rápido de um aplicativo tipo Draw Something. Eles usam uma abordagem semelhante ao React Native, fornecendo acesso a APIs nativas através de uma bridge. Isso foi demonstrado quando Abhishek usou a câmera do dispositivo para tirar uma foto da audiência e depois desenhou um chapéu na cabeça de alguém.

## Projetando APIs para React Native na Netflix

Em seguida, a primeira palestra em destaque da noite. [Clarence Leung](https://twitter.com/clarler), Senior Software Engineer na Netflix, apresentou sua palestra sobre Projetando APIs para React Native. Primeiro ele observou os dois principais tipos de bibliotecas em que se pode trabalhar: componentes como barras de abas e seletores de data, e bibliotecas que fornecem acesso a serviços nativos como a galeria de fotos ou pagamentos in-app. Existem duas maneiras que se pode abordar ao construir uma biblioteca para uso no React Native:

- Fornecer componentes específicos da plataforma
- Uma biblioteca multiplataforma com uma API similar para Android e iOS

Cada abordagem tem suas próprias considerações, e cabe a você determinar o que funciona melhor para suas necessidades.

**Abordagem #1**

Como exemplo de componentes específicos da plataforma, Clarence falou sobre o DatePickerIOS e DatePickerAndroid do core do React Native. No iOS, seletores de data são renderizados como parte da UI e podem ser facilmente incorporados em uma view existente, enquanto seletores de data no Android são apresentados modalmente. Faz sentido fornecer componentes separados neste caso.

**Abordagem #2**

Seletores de fotos, por outro lado, são tratados de forma semelhante no Android e iOS. Existem algumas pequenas diferenças — Android não agrupa fotos em pastas como iOS faz com Selfies, por exemplo — mas essas são facilmente tratadas usando instruções `if` e o componente `Platform`.

Independentemente da abordagem que você escolher, é uma boa ideia minimizar a superfície da API e construir bibliotecas específicas do aplicativo. Por exemplo, o framework In-App Purchase do iOS suporta compras únicas e consumíveis, bem como assinaturas renováveis. Se seu aplicativo só precisará suportar compras consumíveis, você pode dispensar o suporte para assinaturas em sua biblioteca multiplataforma.

![](/blog/assets/rnmsf-august-2016-netflix.jpg)

Houve uma breve sessão de perguntas e respostas no final da palestra de Clarence. Uma das informações interessantes que surgiram foi que cerca de 80% do código React Native escrito para essas bibliotecas na Netflix é compartilhado entre Android e iOS.

## Preenchendo a Lacuna, Usando React Native em Bases de Código Existentes

A palestra final da noite foi de [Leland Richardson](https://twitter.com/intelligibabble) do Airbnb. A palestra focou no uso de React Native em bases de código existentes. Eu já sei como é fácil escrever um novo aplicativo do zero usando React Native, então eu estava muito interessado em ouvir sobre a experiência do Airbnb adotando React Native em seus aplicativos nativos existentes.

Leland começou falando sobre aplicativos greenfield versus brownfield. Greenfield significa começar um projeto sem a necessidade de considerar nenhum trabalho anterior. Isso contrasta com projetos brownfield, onde você precisa levar em conta os requisitos do projeto existente, processos de desenvolvimento e todas as várias necessidades das equipes.

Quando você está trabalhando em um aplicativo greenfield, o CLI do React Native configura um único repositório para Android e iOS e tudo simplesmente funciona. O primeiro desafio contra o uso de React Native no Airbnb foi o fato de que os aplicativos Android e iOS tinham cada um seu próprio repositório. Empresas com múltiplos repositórios têm alguns obstáculos a superar antes de poderem adotar React Native.

Para contornar isso, o Airbnb primeiro configurou um novo repo para a base de código React Native. Eles usaram seus servidores de integração contínua para espelhar os repositórios Android e iOS neste novo repo. Depois que os testes são executados e o bundle é construído, os artefatos de build são sincronizados de volta para os repos Android e iOS. Isso permite que os engenheiros mobile trabalhem em código nativo sem alterar seu ambiente de desenvolvimento. Engenheiros mobile não precisam instalar npm, executar o packager ou lembrar de construir o bundle JavaScript. Os engenheiros que escrevem código React Native de fato não precisam se preocupar em sincronizar seu código entre Android e iOS, pois trabalham diretamente no repositório React Native.

Isso vem com algumas desvantagens, principalmente eles não podiam enviar atualizações atômicas. Mudanças que exigem uma combinação de código nativo e JavaScript exigiriam três pull requests separados, todos os quais tinham que ser cuidadosamente integrados. Para evitar conflitos, o CI falhará ao integrar mudanças de volta aos repos Android e iOS se o master tiver mudado desde que o build começou. Isso causaria longos atrasos durante dias de alta frequência de commits (como quando novos lançamentos são cortados).

O Airbnb desde então mudou para uma abordagem de mono repo. Felizmente isso já estava em consideração, e uma vez que as equipes Android e iOS ficaram confortáveis com o uso de React Native, eles ficaram felizes em acelerar a mudança para o mono repo.

Isso resolveu a maioria dos problemas que eles tinham com a abordagem de repo dividido. Leland notou que isso causa uma maior pressão nos servidores de controle de versão, o que pode ser um problema para empresas menores.

![](/blog/assets/rnmsf-august-2016-airbnb.jpg)

### O Problema da Navegação

A segunda metade da palestra de Leland focou em um tópico que é caro para mim: o problema da Navegação no React Native. Ele falou sobre a abundância de bibliotecas de navegação no React Native, tanto de primeira parte quanto de terceiros. NavigationExperimental foi mencionado como algo que parecia promissor, mas acabou não sendo adequado para o caso de uso deles.

De fato, nenhuma das bibliotecas de navegação existentes parece funcionar bem para aplicativos brownfield. Um aplicativo brownfield requer que o estado de navegação seja totalmente de propriedade do aplicativo nativo. Por exemplo, se a sessão de um usuário expirar enquanto uma view React Native está sendo apresentada, o aplicativo nativo deve ser capaz de assumir o controle e apresentar uma tela de login conforme necessário.

O Airbnb também queria evitar substituir barras de navegação nativas por versões JavaScript como parte de uma transição, pois o efeito poderia ser perturbador. Inicialmente eles se limitaram a views apresentadas modalmente, mas isso obviamente apresentava um problema quando se tratava de adotar React Native de forma mais ampla em seus aplicativos.

Eles decidiram que precisavam de sua própria biblioteca. A biblioteca é chamada `airbnb-navigation`. A biblioteca ainda não foi lançada como código aberto, pois está fortemente vinculada à base de código do Airbnb, mas é algo que eles gostariam de lançar até o final do ano.

Não vou entrar em muitos detalhes sobre a API da biblioteca, mas aqui estão alguns dos principais pontos:

- É necessário pré-registrar cenas antecipadamente
- Cada cena é exibida dentro de seu próprio `RCTRootView`. Elas são apresentadas nativamente em cada plataforma (por exemplo, `UINavigationController`s são usados no iOS).
- A `ScrollView` principal em uma cena deve ser envolvida em um componente `ScrollScene`. Fazer isso permite que você aproveite comportamentos nativos, como tocar na barra de status para rolar para o topo no iOS.
- Transições entre cenas são tratadas nativamente, sem necessidade de se preocupar com performance.
- O botão voltar do Android é automaticamente suportado.
- Eles podem aproveitar o estilo de barra de navegação baseado em View Controller através de um componente UI-less Navigator.Config.

Também há algumas considerações a ter em mente:

- A barra de navegação não é facilmente customizável em JavaScript, pois é um componente nativo. Isso é intencional, pois usar barras de navegação nativas é um requisito difícil para este tipo de biblioteca.
- ScreenProps devem ser serializados/desserializados sempre que são enviados através da bridge, então cuidado deve ser tomado se enviar muitos dados aqui.
- O estado de navegação é de propriedade do aplicativo nativo (também um requisito difícil para a biblioteca), então coisas como Redux não podem manipular o estado de navegação.

A palestra de Leland também foi seguida por uma sessão de perguntas e respostas. No geral, o Airbnb está satisfeito com React Native. Eles estão interessados em usar Code Push para corrigir quaisquer problemas sem passar pela App Store, e seus engenheiros adoram Live Reload, pois não precisam esperar que o aplicativo nativo seja reconstruído após cada pequena mudança.

## Observações Finais

O evento terminou com algumas notícias adicionais sobre React Native:

- Deco anunciou seu [React Native Showcase](https://www.decosoftware.com/showcase), e convidou todos a adicionar seu aplicativo à lista.
- A recente [renovação da documentação](/blog/2016/07/06/toward-better-documentation) recebeu destaque!
- Devin Abbott, um dos criadores do Deco IDE, estará ensinando um [curso introdutório de React Native](https://www.decosoftware.com/course).

![](/blog/assets/rnmsf-august-2016-docs.jpg)

Meetups fornecem uma boa oportunidade para conhecer e aprender com outros desenvolvedores da comunidade. Estou ansioso para participar de mais meetups React Native no futuro. Se você for a um desses, por favor procure por mim e me avise como podemos fazer React Native funcionar melhor para você!
