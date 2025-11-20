---
ia-translated: true
title: 'React Native Monthly #6'
author: Tomislav Tenodi
authorTitle: Founder at Speck
authorURL: 'https://twitter.com/TomislavTenodi'
authorImageURL: 'https://pbs.twimg.com/profile_images/877237660225609729/bKFDwfAq.jpg'
authorTwitter: TomislavTenodi
tags: [engineering]
---

A reunião mensal do React Native continua forte! Certifique-se de verificar a nota na parte inferior deste post para as próximas sessões.

### Expo

- Parabéns a [Devin Abbott](https://github.com/dabbott) e [Houssein Djirdeh](https://twitter.com/hdjirdeh) pelo pré-lançamento do livro "Full Stack React Native"! Ele orienta você através do aprendizado de React Native construindo vários aplicativos pequenos.
- Lançada a primeira versão (experimental) de [reason-react-native-scripts](https://github.com/react-community/reason-react-native-scripts) para ajudar as pessoas a experimentar facilmente [ReasonML](https://reasonml.github.io/).
- O Expo SDK 24 foi [lançado](https://blog.expo.io/expo-sdk-v24-0-0-is-now-available-bfcac3b50d51)! Ele usa [React Native 0.51](https://github.com/facebook/react-native/releases/tag/v0.51.0) e inclui uma série de novos recursos e melhorias: empacotamento de imagens em apps standalone (não há necessidade de cache no primeiro carregamento!), API de manipulação de imagens (cortar, redimensionar, girar, inverter), API de detecção de rostos, novos recursos de release channel (definir a release ativa para um determinado canal e fazer rollback), dashboard web para rastrear builds de apps standalone, e correção de um bug antigo com a implementação OpenGL Android e o multi-tasker Android, apenas para citar algumas coisas.
- Estamos alocando mais recursos ao React Navigation a partir de janeiro. Acreditamos fortemente que é tanto possível quanto desejável construir navegação React Native com apenas componentes React e primitivos como Animated e `react-native-gesture-handler` e estamos realmente animados com algumas das melhorias que planejamos. Se você está procurando contribuir com a comunidade, confira [react-native-maps](https://github.com/react-community/react-native-maps) e [react-native-svg](https://github.com/react-native-community/react-native-svg), que poderiam usar alguma ajuda!

### Infinite Red

- Temos nossos palestrantes principais para a [Chain React conf](https://infinite.red/ChainReactConf): [Kent C. Dodds](https://twitter.com/kentcdodds) e [Tracy Lee](https://twitter.com/ladyleet). Abriremos o CFP muito em breve.
- [Community chat](https://community.infinite.red/) agora com 1600 pessoas.
- [React Native Newsletter](https://reactnative.cc/) agora com 8500 assinantes.
- Atualmente pesquisando as melhores práticas para tornar o RN resistente a crashes, relatórios a seguir.
- Adicionando capacidade de relatar do [Solidarity](https://shift.infinite.red/effortless-environment-reports-d129d53eb405).
- Publicado um COMO-FAZER para lançamentos no [React Native e Android](https://shift.infinite.red/simple-react-native-android-releases-319dc5e29605).

### Microsoft

- Um [pull request](https://github.com/Microsoft/react-native-windows/pull/1419) foi iniciado para migrar a bridge principal do React Native Windows para .NET Standard, tornando-a efetivamente agnóstica ao SO. A esperança é que muitas outras plataformas .NET Core possam estender a bridge com seus próprios modelos de threading, runtimes JavaScript e UIManagers (pense em opções JavaScriptCore, Xamarin.Mac, Linux Gtk# e Samsung Tizen).

### Wix

- [Detox](https://github.com/wix/detox)
  - Para escalarmos com testes E2E, queremos minimizar o tempo gasto no CI, estamos trabalhando no suporte de paralelização para o Detox.
  - Enviado um [pull request](https://github.com/facebook/react-native/pull/16948) para habilitar suporte para builds de flavor customizados, para melhor suportar mocking em E2E.
- [DetoxInstruments](https://github.com/wix/DetoxInstruments)
  - Trabalhar na funcionalidade killer do DetoxInstruments está se mostrando uma tarefa muito desafiadora, capturar backtrace JavaScript a qualquer momento requer uma implementação customizada do JSCore para suportar suspensão da thread JS. Testar o profiler internamente no app da Wix revelou insights interessantes sobre a thread JS.
  - O projeto ainda não está estável o suficiente para uso geral, mas está sendo ativamente trabalhado, e esperamos anunciá-lo em breve.
- [React Native Navigation](https://github.com/wix/react-native-navigation)
  - O ritmo de desenvolvimento da V2 aumentou substancialmente, até agora, tínhamos apenas 1 desenvolvedor trabalhando nisso 20% do seu tempo, agora temos 3 desenvolvedores trabalhando nisso em tempo integral!
- Performance Android
  - Substituir o antigo JSCore empacotado no RN por sua versão mais recente (tip do projeto webkitGTK, com configuração JIT customizada) produziu 40% de aumento de performance na thread JS. O próximo passo é compilar uma versão 64bit dele. Este esforço é baseado nos [scripts de build do JSC para Android](https://github.com/SoftwareMansion/jsc-android-buildscripts). Acompanhe seu status atual [aqui](https://github.com/DanielZlotin/jsc-android-buildscripts/tree/tip).

## Próximas sessões

Houve alguma discussão sobre redirecionar esta reunião para discutir um único tópico específico (por exemplo, navegação, mover módulos React Native para repositórios separados, documentação, ...). Dessa forma, sentimos que podemos contribuir melhor para a comunidade React Native. Isso pode ocorrer na próxima sessão da reunião. Sinta-se à vontade para tweetar o que você gostaria de ver coberto como tópico.
