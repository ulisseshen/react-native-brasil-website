---
ia-translated: true
title: Princípios da Equipe React Native
authors: [Eli White]
tags: [announcement]
---

A equipe React Native no Facebook é guiada por princípios que ajudam a determinar como priorizamos nosso trabalho no React Native. Esses princípios representam nossa equipe especificamente e não necessariamente representam todas as partes interessadas na comunidade React Native. Estamos compartilhando esses princípios aqui para sermos mais transparentes sobre o que nos motiva, como tomamos decisões e como focamos nossos esforços.

## **Experiência Nativa**

Nossa principal prioridade para o React Native é **atender às expectativas que as pessoas têm para cada plataforma**. É por isso que o React Native renderiza para primitivos da plataforma. Valorizamos a aparência e comportamento nativos em vez de consistência entre plataformas.

Por exemplo, o TextInput no React Native renderiza para um UITextField no iOS. Isso garante que a integração com gerenciadores de senha e controles de teclado funcionem imediatamente. Ao usar primitivos da plataforma, os apps React Native também são capazes de se manter atualizados com mudanças de design e comportamento de novos lançamentos do Android e iOS.

Para corresponder à aparência e comportamento dos apps nativos, também precisamos corresponder ao seu desempenho. É aqui que focamos nossos esforços mais ambiciosos. Por exemplo, o Facebook criou o Hermes, [um novo JavaScript Engine construído do zero para React Native no Android](https://facebook.github.io/react-native/blog/2019/07/17/hermes). O Hermes melhora significativamente o tempo de inicialização dos apps React Native. Também estamos trabalhando em grandes mudanças arquiteturais que otimizam o modelo de threading e tornam o React Native mais fácil de interoperar com código nativo.

## Escala Massiva

Centenas de telas no app do Facebook são implementadas com React Native. O app do Facebook é usado por bilhões de pessoas em uma enorme variedade de dispositivos. **É por isso que investimos nos problemas mais desafiadores em escala.**

Implantar o React Native em nossos apps nos permite identificar problemas que não veríamos em uma escala menor. Por exemplo, o Facebook foca em melhorar o desempenho em um amplo espectro de dispositivos, desde o iPhone mais recente até muitas gerações mais antigas de dispositivos Android. Esse foco informa nossos projetos de arquitetura como Hermes, Fabric e TurboModules.

Provamos que o React Native pode escalar para organizações massivas também. Quando centenas de desenvolvedores estão trabalhando no mesmo app, a adoção gradual é essencial. É por isso que garantimos que o React Native possa ser adotado uma tela por vez. Em breve, daremos mais um passo adiante e permitiremos migrar views nativas individuais de uma tela nativa existente para React Native.

Um foco em escala massiva significa que há muitas coisas em que nossa equipe não está trabalhando atualmente. Por exemplo, nossa equipe não conduz a adoção do React Native na indústria. Também não construímos ativamente soluções para problemas que não vemos em escala. Temos orgulho de ter [muitos parceiros e colaboradores principais](https://github.com/facebook/react-native/blob/master/ECOSYSTEM.md) que são capazes de focar nessas áreas importantes para a comunidade.

## Velocidade de Desenvolvimento

Ótimas experiências de usuário são criadas iterativamente. **Deve levar apenas alguns segundos para ver o resultado das alterações de código** em um app em execução. A arquitetura do React Native permite fornecer feedback quase instantâneo durante o desenvolvimento.

Frequentemente ouvimos de equipes que adotar o React Native melhorou significativamente sua velocidade de desenvolvimento. Essas equipes descobrem que o feedback instantâneo durante o desenvolvimento torna muito mais fácil experimentar diferentes ideias e adicionar polimento extra quando não precisam interromper sua sessão de codificação para cada pequena mudança. Quando fazemos alterações no React Native, garantimos preservar essa qualidade da experiência do desenvolvedor.

O feedback instantâneo não é a única maneira que o React Native melhora a velocidade de desenvolvimento. As equipes podem aproveitar o ecossistema de rápido crescimento de pacotes open source de alta qualidade. As equipes também podem compartilhar lógica de negócio entre Android, iOS e web. Isso as ajuda a lançar atualizações mais rapidamente e reduzir silos organizacionais entre equipes de plataforma.

## Todas as Plataformas

Quando introduzimos o React Native em 2014, o apresentamos com nosso lema "Learn once, write anywhere" — e queremos dizer _em qualquer lugar_. **Os desenvolvedores devem ser capazes de alcançar o maior número de pessoas possível sem serem limitados por modelo de dispositivo ou sistema operacional.**

O React Native tem como alvo plataformas muito diferentes, incluindo mobile, desktop, web, TV, VR, consoles de jogos e muito mais. Queremos habilitar experiências ricas em cada plataforma em vez de exigir que os desenvolvedores construam para o mínimo denominador comum. Para conseguir isso, focamos em suportar os recursos únicos de cada plataforma. Isso varia desde diferentes mecanismos de entrada (por exemplo, toque, caneta, mouse) até experiências de consumo fundamentalmente diferentes, como ambientes 3D em VR.

Esse princípio informou nossa decisão de implementar a nova arquitetura principal do React Native em C++ multiplataforma para promover paridade entre plataformas. Também estamos refinando a interface pública destinada a outros mantenedores de plataforma como a Microsoft com Windows e macOS. Nos esforçamos para permitir que qualquer plataforma suporte React Native.

## UI Declarativa

Não acreditamos em implantar a mesma interface de usuário em todas as plataformas, acreditamos em **expor as capacidades únicas de cada plataforma com o mesmo modelo de programação declarativa**. Nosso modelo de programação declarativa é o React.

Em nossa experiência, o fluxo de dados unidirecional popularizado pelo React torna as aplicações mais fáceis de entender. Preferimos expressar uma tela como uma composição de componentes declarativos em vez de views gerenciadas imperativamente. O sucesso do React na web e a direção dos novos frameworks nativos Android e iOS mostram que a indústria também abraçou a UI declarativa.

O React popularizou interfaces de usuário declarativas. No entanto, ainda permanecem muitos problemas não resolvidos que o React está posicionado de forma única para resolver. O React Native continuará a construir sobre as inovações do React e permanecerá na vanguarda do movimento de interface de usuário declarativa.
