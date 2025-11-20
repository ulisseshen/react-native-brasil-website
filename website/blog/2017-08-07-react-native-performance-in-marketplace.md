---
ia-translated: true
title: Performance do React Native no Marketplace
author: Aaron Chiu
authorTitle: Software Engineer at Facebook
authorURL: 'https://www.facebook.com/aaronechiu'
authorFBID: 1057500063
authorTwitter: AaaChiuuu
tags: [engineering]
---

React Native é usado em vários lugares em vários aplicativos da família Facebook, incluindo uma aba de nível superior nos principais aplicativos do Facebook. Nosso foco para este post é um produto altamente visível, [Marketplace](https://newsroom.fb.com/news/2016/10/introducing-marketplace-buy-and-sell-with-your-local-community/). Está disponível em cerca de uma dúzia de países e permite que os usuários descubram produtos e serviços fornecidos por outros usuários.

Na primeira metade de 2017, através do esforço conjunto da equipe Relay, equipe Marketplace, equipe Mobile JS Platform e equipe React Native, cortamos o Time to Interaction (TTI) do Marketplace pela metade para dispositivos Android [Year Class 2010-11](https://code.facebook.com/posts/307478339448736/year-class-a-classification-system-for-android/). O Facebook historicamente considera esses dispositivos como dispositivos Android de baixo desempenho, e eles têm os TTIs mais lentos em qualquer plataforma ou tipo de dispositivo.

Um startup típico do React Native se parece com algo assim:

![](/blog/assets/RNPerformanceStartup.png)

> Aviso: as proporções não são representativas e variarão dependendo de como o React Native é configurado e usado.

Primeiro inicializamos o core do React Native (também conhecido como "Bridge") antes de executar o JavaScript específico do produto que determina quais views nativas o React Native renderizará no Native Processing Time.

### Uma abordagem diferente

Um dos primeiros erros que cometemos foi deixar [Systrace e CTScan](https://code.facebook.com/posts/747457662026706/performance-instrumentation-for-android-apps/) dirigirem nossos esforços de performance. Essas ferramentas nos ajudaram a encontrar muitas frutas ao alcance da mão em 2016, mas descobrimos que tanto Systrace quanto CTScan **não são representativos de cenários de produção** e não podem emular o que acontece no mundo real. As proporções de tempo gasto nos detalhamentos são frequentemente incorretas e, em casos extremos, totalmente fora da realidade. No extremo, algumas coisas que esperávamos levar alguns milissegundos na verdade levam centenas ou milhares de milissegundos. Dito isso, CTScan é útil e descobrimos que ele detecta um terço das regressões antes de atingirem a produção.

No Android, atribuímos as limitações dessas ferramentas ao fato de que 1) React Native é um framework multi-threaded, 2) Marketplace está co-localizado com uma infinidade de views complexas como Newsfeed e outras abas de nível superior, e 3) os tempos de computação variam muito. Assim, nesta metade, deixamos medições e detalhamentos de produção dirigirem quase todas as nossas tomadas de decisão e priorização.

### Pelo caminho da instrumentação de produção

Instrumentar a produção pode parecer simples na superfície, mas acabou sendo um processo bastante complexo. Levou vários ciclos de iteração de 2-3 semanas cada; devido à latência de fazer commit na master, enviar o aplicativo para a Play Store e coletar amostras de produção suficientes para ter confiança em nosso trabalho. Cada ciclo de iteração envolveu descobrir se nossos detalhamentos eram precisos, se tinham o nível certo de granularidade e se somavam adequadamente ao período de tempo total. Não podíamos confiar em lançamentos alpha e beta porque eles não são representativos da população geral. Em essência, construímos muito tediosamente um trace de produção muito preciso baseado no agregado de milhões de amostras.

Uma das razões pelas quais verificamos meticulosamente que cada milissegundo nos detalhamentos somava adequadamente às suas métricas pai foi que percebemos logo cedo que havia lacunas em nossa instrumentação. Descobriu-se que nossos detalhamentos iniciais não contabilizavam travamentos causados por saltos de thread. Saltos de thread por si só não são caros, mas saltos de thread para threads ocupadas já fazendo trabalho são muito caros. Eventualmente reproduzimos esses bloqueios localmente espalhando chamadas `Thread.sleep()` nos momentos certos, e conseguimos corrigi-los:

1. removendo nossa dependência de AsyncTask,
2. desfazendo a inicialização forçada de ReactContext e NativeModules na thread da UI, e
3. removendo a dependência de medir o ReactRootView no tempo de inicialização.

Juntos, remover esses problemas de bloqueio de thread reduziu o tempo de startup em mais de 25%.

Métricas de produção também desafiaram algumas de nossas suposições anteriores. Por exemplo, costumávamos pré-carregar muitos módulos JavaScript no caminho de startup sob a suposição de que co-localizar módulos em um bundle reduziria seu custo de inicialização. No entanto, o custo de pré-carregar e co-localizar esses módulos superou em muito os benefícios. Ao reconfigurar nossas blacklists de inline require e remover módulos JavaScript do caminho de startup, conseguimos evitar carregar módulos desnecessários como Relay Classic (quando apenas [Relay Modern](https://relay.dev/docs/new-in-relay-modern) era necessário). Hoje, nosso detalhamento `RUN_JS_BUNDLE` é mais de 75% mais rápido.

Também encontramos vitórias investigando módulos nativos específicos do produto. Por exemplo, ao injetar preguiçosamente as dependências de um módulo nativo, reduzimos o custo desse módulo nativo em 98%. Ao remover a contenção do startup do Marketplace com outros produtos, reduzimos o startup em um intervalo equivalente.

A melhor parte é que muitas dessas melhorias são amplamente aplicáveis a todas as telas construídas com React Native.

## Conclusão

As pessoas assumem que os problemas de performance de startup do React Native são causados por JavaScript sendo lento ou tempos de rede excessivamente altos. Embora acelerar coisas como JavaScript reduza o TTI em uma quantidade não trivial, cada um desses contribui com uma porcentagem muito menor do TTI do que se acreditava anteriormente.

A lição até agora tem sido _medir, medir, medir!_ Algumas vitórias vêm de mover custos de runtime para tempo de build, como Relay Modern e [Lazy NativeModules](https://github.com/facebook/react-native/commit/797ca6c219b2a44f88f10c61d91e8cc21e2f306e). Outras vitórias vêm de evitar trabalho sendo mais inteligente sobre paralelizar código ou remover código morto. E algumas vitórias vêm de grandes mudanças arquiteturais no React Native, como limpar bloqueios de thread. Não há grande solução para performance, e vitórias de performance a longo prazo virão de instrumentação e melhorias incrementais. Não deixe viés cognitivo influenciar suas decisões. Em vez disso, colete e interprete cuidadosamente dados de produção para guiar trabalhos futuros.

## Planos futuros

A longo prazo, queremos que o TTI do Marketplace seja comparável a produtos similares construídos com Native e, em geral, ter performance do React Native no mesmo nível da performance nativa. Além disso, embora nesta metade tenhamos reduzido drasticamente o custo de startup da bridge em cerca de 80%, planejamos trazer o custo da bridge do React Native perto de zero através de projetos como [Prepack](https://prepack.io/) e mais processamento em tempo de build.
