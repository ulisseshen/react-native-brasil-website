---
ia-translated: true
title: 'React Native Monthly #5'
author: Tomislav Tenodi
authorTitle: Founder at Speck
authorURL: 'https://github.com/tenodi'
authorImageURL: 'https://pbs.twimg.com/profile_images/877237660225609729/bKFDwfAq.jpg'
authorTwitter: TomislavTenodi
tags: [engineering]
---

A reunião mensal do React Native continua! Vamos ver o que nossas equipes estão fazendo.

### Callstack

- Temos trabalhado no CI do React Native. Mais importante, migramos do Travis para o Circle, deixando o React Native com um único pipeline de CI unificado.
- Organizamos [Hacktoberfest - edição React Native](https://blog.callstack.io/announcing-hacktoberfest-7313ea5ccf4f) onde, junto com os participantes, tentamos enviar muitos pull requests para projetos open source.
- Continuamos trabalhando no [Haul](https://github.com/callstack/haul). No mês passado, enviamos dois novos lançamentos, incluindo suporte ao webpack 3. Planejamos adicionar suporte ao [CRNA](https://github.com/react-community/create-react-native-app) e [Expo](https://github.com/expo/expo), bem como trabalhar em melhor HMR. Nosso roadmap é público no rastreador de issues. Se você gostaria de sugerir melhorias ou dar feedback, nos avise!

### Expo

- Lançou [Expo SDK 22](https://blog.expo.io/expo-sdk-v22-0-0-is-now-available-7745bfe97fc6) (usando React Native 0.49) e atualizou [CRNA](https://github.com/react-community/create-react-native-app) para ele.
  - Inclui API de splash screen melhorada, suporte básico a ARKit, API "DeviceMotion", suporte a SFAuthenticationSession no iOS11 e [mais](https://blog.expo.io/expo-sdk-v22-0-0-is-now-available-7745bfe97fc6).
- Seus [snacks](https://snack.expo.io) agora podem ter múltiplos arquivos JavaScript e você pode fazer upload de imagens e outros assets apenas arrastando-os para o editor.
- Contribuir para [react-navigation](https://github.com/react-community/react-navigation) para adicionar suporte ao iPhone X.
- Focar nossa atenção em arestas ásperas ao construir grandes aplicativos com Expo. Por exemplo:
  - Suporte de primeira classe para deploy em múltiplos ambientes: staging, produção e channels arbitrários. Channels suportarão rollback e definição do release ativo para um determinado channel. Nos avise se você quer ser um testador inicial, [@expo_io](https://twitter.com/expo_io).
  - Também estamos trabalhando em melhorar nossa infraestrutura de build de aplicativos standalone e adicionar suporte para agrupar imagens e outros assets não-código em builds de aplicativos standalone, mantendo a capacidade de atualizar assets over the air.

### Facebook

- Melhor suporte RTL:
  - Estamos introduzindo vários estilos direction-aware.
    - Position:
      - (left|right) → (start|end)
    - Margin:
      - margin(Left|Right) → margin(Start|End)
    - Padding:
      - padding(Left|Right) → padding(Start|End)
    - Border:
      - borderTop(Left|Right)Radius → borderTop(Start|End)Radius
      - borderBottom(Left|Right)Radius → borderBottom(Start|End)Radius
      - border(Left|Right)Width → border(Start|End)Width
      - border(Left|Right)Color → border(Start|End)Color
  - O significado de "left" e "right" foi trocado em RTL para estilos de position, margin, padding e border. Dentro de alguns meses, vamos remover esse comportamento e fazer "left" sempre significar "left", e "right" sempre significar "right". As breaking changes estão ocultas sob uma flag. Use `I18nManager.swapLeftAndRightInRTL(false)` em seus componentes React Native para optar por elas.
- Trabalhando em tipagem [Flow](https://github.com/facebook/flow) de nossos módulos nativos internos e usando-os para gerar interfaces em Java e protocolos em ObjC que as implementações nativas devem implementar. Esperamos que esta codegen se torne open source no próximo ano, no mais cedo.

### Infinite Red

- Nova ferramenta OSS para ajudar React Native e outros projetos. Mais [aqui](https://shift.infinite.red/solidarity-the-cli-for-developer-sanity-672fa81b98e9).
- Reformulando [Ignite](https://github.com/infinitered/ignite) para um novo lançamento de boilerplate (Codinome: Bowser)

### Shoutem

- Melhorando o fluxo de desenvolvimento no Shoutem. Queremos otimizar o processo desde criar um aplicativo até a primeira tela personalizada e torná-lo realmente fácil, reduzindo assim a barreira para novos desenvolvedores React Native. Preparamos alguns workshops para testar novos recursos. Também melhoramos o [Shoutem CLI](https://github.com/shoutem/cli) para suportar novos fluxos.
- [Shoutem UI](https://github.com/shoutem/ui) recebeu algumas melhorias de componentes e correções de bugs. Também verificamos compatibilidade com as versões mais recentes do React Native.
- A plataforma Shoutem recebeu algumas atualizações notáveis, novas integrações estão disponíveis como parte do [projeto de extensões open-source](https://github.com/shoutem/extensions). Estamos realmente animados em ver desenvolvimento ativo em extensões Shoutem de outros desenvolvedores. Ativamente contatamos e oferecemos conselhos e orientação sobre suas extensões.

## Próxima sessão

A próxima sessão está agendada para quarta-feira, 6 de dezembro de 2017. Sinta-se à vontade para me contatar [no Twitter](https://twitter.com/TomislavTenodi) se você tiver alguma sugestão sobre como devemos melhorar o resultado da reunião.
