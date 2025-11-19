---
ia-translated: true
title: 'React Native Monthly #2'
author: Tomislav Tenodi
authorTitle: Product Manager at Shoutem
authorURL: 'https://github.com/tenodi'
authorImageURL: 'https://pbs.twimg.com/profile_images/877237660225609729/bKFDwfAq.jpg'
authorTwitter: TomislavTenodi
tags: [engineering]
---

A reunião mensal do React Native continua! Nesta sessão, fomos acompanhados pela [Infinite Red](https://infinite.red/), grandes mentes por trás da [Chain React, the React Native Conference](https://infinite.red/ChainReactConf). Como a maioria das pessoas aqui estava apresentando palestras na Chain React, adiamos a reunião para uma semana depois. As palestras da conferência foram [postadas online](https://www.youtube.com/playlist?list=PLFHvL21g9bk3RxJ1Ut5nR_uTZFVOxu522) e encorajo você a conferir. Então, vamos ver o que nossas equipes estão fazendo.

## Equipes

Nesta segunda reunião, tivemos 9 equipes se juntando a nós:

- [Airbnb](https://github.com/airbnb)
- [Callstack](https://github.com/callstack-io)
- [Expo](https://github.com/expo)
- [Facebook](https://github.com/facebook)
- [GeekyAnts](https://github.com/GeekyAnts)
- [Infinite Red](https://github.com/infinitered)
- [Microsoft](https://github.com/microsoft)
- [Shoutem](https://github.com/shoutem)
- [Wix](https://github.com/wix)

## Notas

Aqui estão as notas de cada equipe:

### Airbnb

- Confira o [repositório Airbnb](https://github.com/airbnb) para projetos relacionados ao React Native.

### Callstack

- [Mike Grabowski](https://github.com/grabbou) tem gerenciado os lançamentos mensais do React Native como sempre, incluindo alguns betas que foram lançados. Em particular, trabalhando para publicar um build v0.43.5 no npm, pois isso desbloqueia usuários do Windows!
- Trabalho lento mas consistente está acontecendo no [Haul](https://github.com/callstack-io/haul). Há um pull request que adiciona HMR, e outras melhorias foram enviadas. Recentemente conseguiram alguns líderes da indústria para adotá-lo. Possivelmente planejando começar um trabalho pago em tempo integral nessa área.
- [Michał Pierzchała](https://twitter.com/thymikee) da equipe [Jest](https://github.com/facebook/jest) se juntou a nós na Callstack este mês. Ele ajudará a manter o [Haul](https://github.com/callstack-io/haul) e possivelmente trabalhará no [Metro Bundler](https://github.com/facebook/metro) e [Jest](https://github.com/facebook/jest).
- [Satyajit Sahoo](https://twitter.com/satya164) está agora conosco, yay!
- Temos muitas coisas legais chegando de nosso departamento OSS. Em particular, trabalhando em trazer a API Material Palette para React Native. Planejando finalmente lançar nosso kit iOS nativo que visa fornecer look & feel 1:1 de componentes nativos.

### Expo

- Recentemente lançou [Native Directory](https://native.directory) para ajudar na descoberta e avaliação de bibliotecas no ecossistema React Native. O problema: muitas bibliotecas, difícil de testar, precisa aplicar heurísticas manualmente e não é imediatamente óbvio quais são as melhores que você deveria usar. Também é difícil saber se algo é compatível com CRNA/Expo. Então Native Directory tenta resolver esses problemas. Confira e [adicione sua biblioteca](https://github.com/react-community/native-directory) a ele. A lista de bibliotecas está [aqui](https://github.com/react-community/native-directory/blob/master/react-native-libraries.json). Este é apenas nosso primeiro passo, e queremos que isso seja de propriedade e gerenciado pela comunidade, não apenas pessoas da Expo. Então, por favor, contribua se você acha que isso é valioso e quer torná-lo melhor!
- Adicionou suporte inicial para instalar pacotes npm no [Snack](https://snack.expo.io/) com Expo SDK 19. Nos avise se você encontrar algum problema com isso, ainda estamos trabalhando em alguns bugs. Junto com Native Directory, isso deve facilitar o teste de bibliotecas que têm apenas dependências JS, ou dependências incluídas no [Expo SDK](https://github.com/expo/expo-sdk). Experimente:
  - [react-native-modal](https://snack.expo.io/ByBCD_2r-)
  - [react-native-animatable](https://snack.expo.io/SJfJguhrW)
  - [react-native-calendars](https://snack.expo.io/HkoXUdhr-)
- [Lançou Expo SDK19](https://blog.expo.io/expo-sdk-v19-0-0-is-now-available-821a62b58d3d) com um monte de melhorias em geral, e agora estamos usando o [JSC Android atualizado](https://github.com/SoftwareMansion/jsc-android-buildscripts).
- Trabalhando em um guia na documentação com [Alexander Kotliarskyi](https://github.com/frantic) com uma lista de dicas sobre como melhorar a experiência do usuário de seu aplicativo. Por favor, junte-se e adicione à lista ou ajude a escrever parte dela!
  - Issue: [#14979](https://github.com/facebook/react-native/issues/14979)
  - Pull request inicial: [#14993](https://github.com/facebook/react-native/pull/14993)
- Continuando a trabalhar em: áudio/vídeo, câmera, gestos (com Software Mansion, `react-native-gesture-handler`), integração GL camera e esperando lançar alguns deles pela primeira vez no SDK20 (Agosto), e melhorias significativas a outros até então também. Estamos apenas começando a construir infraestrutura no cliente Expo para trabalho em background (geolocalização, áudio, manipulação de notificações, etc.).
- [Adam Miskiewicz](https://twitter.com/skevy) fez alguns progressos interessantes em imitar as transições de [UINavigationController](https://developer.apple.com/documentation/uikit/uinavigationcontroller) no [react-navigation](https://github.com/react-community/react-navigation). Confira uma versão anterior disso em [seu tweet](https://twitter.com/skevy/status/884932473070735361) - lançamento chegando em breve com isso. Também confira `MaskedViewIOS` que ele [enviou upstream](https://github.com/facebook/react-native/commit/8ea6cea39a3db6171dd74838a6eea4631cf42bba). Se você tem as habilidades e desejo de implementar `MaskedView` para Android, isso seria incrível!

### Facebook

- Facebook está explorando internamente ser capaz de incorporar componentes nativos [ComponentKit](https://componentkit.org/) e [Litho](https://fblitho.com/) dentro do React Native.
- Contribuições para React Native são muito bem-vindas! Se você está se perguntando como pode contribuir, o [guia "How to Contribute"](https://github.com/facebook/react-native-website/blob/master/CONTRIBUTING.md) descreve nosso processo de desenvolvimento e apresenta os passos para enviar seu primeiro pull request. Existem outras maneiras de contribuir que não requerem escrever código, como triagem de issues ou atualização da documentação.
  - No momento da escrita, React Native tem **635** [issues abertas](https://github.com/facebook/react-native/issues) e **249** [pull requests abertos](https://github.com/facebook/react-native/pulls). Isso é avassalador para nossos mantenedores, e quando as coisas são corrigidas internamente, é difícil garantir que as tarefas relevantes sejam atualizadas.
  - Não temos certeza de qual é a melhor abordagem para lidar com isso mantendo a comunidade satisfeita. Algumas (mas não todas!) opções incluem fechar issues obsoletas, dar a significativamente mais pessoas permissões para gerenciar issues e fechar automaticamente issues que não seguem o template de issue. Escrevemos um guia "What to Expect from Maintainers" para definir expectativas e evitar surpresas. Se você tem ideias sobre como podemos tornar essa experiência melhor para mantenedores, bem como garantir que as pessoas que abrem issues e pull requests se sintam ouvidas e valorizadas, por favor nos avise!

### GeekyAnts

- Fizemos demo da Designer Tool que funciona com arquivos React Native na Chain React. Muitos participantes se inscreveram na lista de espera.
- Também estamos olhando para outras soluções cross-platform como [Google Flutter](https://flutter.io/) (uma grande comparação chegando), [Kotlin Native](https://github.com/JetBrains/kotlin-native) e [Apache Weex](https://weex.incubator.apache.org/) para entender as diferenças arquiteturais e o que podemos aprender com eles para melhorar a performance geral do React Native.
- Mudamos para [react-navigation](https://github.com/react-community/react-navigation) para a maioria de nossos aplicativos, o que melhorou a performance geral.
- Além disso, anunciamos [NativeBase Market](https://market.nativebase.io/) - Um marketplace para componentes e apps React Native (para e pelos desenvolvedores).

### Infinite Red

- Queremos apresentar o [Reactotron](https://github.com/infinitered/reactotron). Confira o [vídeo introdutório](https://www.youtube.com/watch?v=tPBRfxswDjA). Estaremos adicionando mais recursos em breve!
- Organizamos a Chain React Conference. Foi incrível, obrigado a todos por virem! [Os vídeos agora estão online!](https://www.youtube.com/playlist?list=PLFHvL21g9bk3RxJ1Ut5nR_uTZFVOxu522)

### Microsoft

- [CodePush](https://github.com/Microsoft/code-push) foi integrado ao [Mobile Center](https://mobile.azure.com/). Usuários existentes não terão mudança em seu fluxo de trabalho.
  - Algumas pessoas relataram um problema com aplicativos duplicados - eles já tinham um aplicativo no Mobile Center. Estamos trabalhando para resolver isso, mas se você tem dois aplicativos, nos avise e podemos mesclá-los para você.
- Mobile Center agora suporta Push Notifications para CodePush. Também mostramos como uma combinação de Notifications e CodePush poderia ser usada para testes A/B de apps - algo único para a arquitetura ReactNative.
- [VS Code](https://github.com/Microsoft/vscode) tem um problema conhecido de debugging com ReactNative - o próximo lançamento da extensão em alguns dias corrigirá o problema.
- Como há muitas outras equipes também trabalhando em React Native dentro da Microsoft, trabalharemos em obter melhor representação de todos os grupos para a próxima reunião.

### Shoutem

- Finalizamos o processo de tornar o desenvolvimento React Native mais fácil no [Shoutem](https://shoutem.github.io/). Você pode usar todos os comandos padrão `react-native` ao desenvolver aplicativos no Shoutem.
- Fizemos muito trabalho tentando descobrir a melhor abordagem para profiling no React Native. Uma grande parte da [documentação](/docs/performance) está desatualizada, e faremos nosso melhor para criar um pull request na documentação oficial ou pelo menos escrever algumas de nossas conclusões em um post de blog.
- Mudando nossa solução de navegação para [react-navigation](https://github.com/react-community/react-navigation), então podemos ter algum feedback em breve.
- Lançamos [um novo componente HTML](https://github.com/shoutem/ui/tree/develop/html) em nosso toolkit que transforma o HTML bruto na árvore de componentes React Native.

### Wix

- Começamos a trabalhar em um pull request para [Metro Bundler](https://github.com/facebook/metro) com capacidades de [react-native-repackager](https://github.com/wix/react-native-repackager). Atualizamos react-native-repackager para suportar RN 44 (que usamos em produção). Estamos usando-o para nossa infraestrutura de mocking para [detox](https://github.com/wix/detox).
- Temos coberto o aplicativo Wix em testes detox nas últimas três semanas. É uma experiência de aprendizado incrível de como reduzir QA manual em um aplicativo desta escala (mais de 40 engenheiros). Resolvemos vários problemas com detox como resultado, uma nova versão foi publicada. Estou feliz em relatar que estamos vivendo a "política de zero flakiness" e os testes estão passando consistentemente até agora.
- Detox para Android está avançando bem. Estamos obtendo ajuda significativa da comunidade. Estamos esperando uma versão inicial em cerca de duas semanas.
- [DetoxInstruments](https://github.com/wix/detoxinstruments), nossa ferramenta de teste de performance, está ficando um pouco maior do que originalmente pretendíamos. Agora estamos planejando transformá-la em uma ferramenta standalone que não estará fortemente acoplada ao detox. Permitirá investigar a performance de aplicativos iOS em geral. Também será integrada com detox para que possamos executar testes automatizados em métricas de performance.

## Próxima sessão

A próxima sessão está agendada para 16 de agosto de 2017. Como esta foi apenas nossa segunda reunião, gostaríamos de saber como essas notas beneficiam a comunidade React Native. Sinta-se à vontade para me contatar [no Twitter](https://twitter.com/TomislavTenodi) se você tiver alguma sugestão sobre como devemos melhorar o resultado da reunião.
