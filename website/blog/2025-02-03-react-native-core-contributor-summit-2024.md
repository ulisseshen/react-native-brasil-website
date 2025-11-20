---
ia-translated: true
title: 'Resumo da Cúpula de Contribuidores do React Native Core 2024'
authors: [thymikee, szymonrybczak, mojavad, stmoy]
image: https://raw.githubusercontent.com/facebook/react-native-website/9915d9c0b32ef348958c8119f6e83e571c1c0ba3/website/static/blog/assets/react-native-core-contributor-summit-2024-1.jpeg
tags: [engineering]
date: 2025-02-03
---

Todos os anos, os principais contribuidores da Comunidade React Native se reúnem com a equipe do React Native para moldar colaborativamente a direção deste projeto.

O ano passado não foi diferente—com uma pequena exceção. Normalmente nos reunimos um dia antes da [React Universe Conf](https://www.reactuniverseconf.com) (anteriormente React Native EU) no escritório da [Callstack](https://www.callstack.com/open-source) em Wrocław. Em 2024, aprendendo com experiências passadas, hospedamos a Cúpula por dois dias consecutivos, para que pudéssemos ter mais tempo não estruturado juntos.

![all-participants](../static/blog/assets/react-native-core-contributor-summit-2024-1.jpeg)

<!--truncate-->

Esta tradição anual se tornou uma oportunidade valiosa para os contribuidores compartilharem insights e expressarem suas preocupações, e para a equipe central compartilhar seus planos e coletar feedback de contribuidores-chave para o ecossistema React Native—incluindo empresas parceiras, autores individuais de bibliotecas e amigos.

Dividimos a Cúpula em duas trilhas cobrindo os seguintes tópicos:

- [Releases](#releases)
- [O que vem depois da New Architecture?](#whats-next-after-the-new-architecture)
- [Especificação de Web APIs para Native Modules](#web-apis-for-native-modules)
- [LeanCore 2.0](#leancore-20)
- [Nitro Modules - Desbloqueando View Components ao expor props como jsi::Values](#nitro-modules---unblocking-view-components-by-exposing-props-as-jsivalues)
- [Out Of Tree Platforms & CocoaPods](#out-of-tree-platforms--cocoapods)
- [React Native em Desktop](#react-native-on-desktop)

Neste post do blog, gostaríamos de dar a você uma prévia dos resultados deste encontro.

## Releases

Tivemos uma discussão extensa sobre o processo de release do React Native. A Equipe Central aprecia o valor de ter contribuidores de fora da Meta envolvidos nos releases e enfatiza a importância de ter nightly releases, que são particularmente benéficos para plataformas Out-of-Tree como React Native visionOS, mantenedores de bibliotecas (Reanimated) e frameworks (Expo). Discutimos a frequência de releases, com algumas pessoas pedindo releases mais frequentes para enviar correções mais rapidamente, enquanto outras expressaram preocupações sobre o impacto em bibliotecas de terceiros e esforços de atualização.

Também fizemos brainstorming de maneiras de reduzir breaking changes não intencionais e melhorar a comunicação sobre compatibilidade entre React Native e dependências de terceiros.

Esta sessão mostrou como é complexo gerenciar releases para React Native, e como este tópico é delicado, dados todas as diferentes partes do ecossistema que precisam ser consideradas.

## O que vem depois da New Architecture?

Agora que a New Architecture foi lançada como estável, discutimos no que devemos focar em seguida. Qual poderia ser a próxima grande coisa? Os tópicos giraram em torno de:

- **Compatibilidade Web** – concluído na discussão sobre a direção do projeto React Strict DOM, que deve ser tratado como um polyfill temporário, enquanto a equipe Xplat implementa funcionalidade cross-platform adequada no núcleo do React Native.
- **Estabilização da API central** – descobrimos que precisamos de mais consenso sobre o que isso significa para desenvolvedores de aplicativos, autores de bibliotecas, plataformas Out-of-Tree. Por exemplo, pode ser necessário extrair a lógica nativa da plataforma para iOS e Android da base de código C++ compartilhada. Parte disso foi coberto pela discussão do LeanCore 2.0.
- **Suporte à old architecture** – como esperado, a equipe confirmou que os novos recursos do React 19 baseados em renderização concorrente não funcionarão na old architecture. Novos recursos são direcionados principalmente para a new architecture. Devido a bloqueios no cronograma de lançamento do React 19, ainda não está claro onde traçar a linha entre funcionalidades suportadas por ambas as arquiteturas nova e antiga.
- **Bibliotecas de terceiros para React Native** – hoje nós autores de bibliotecas podemos usar TurboModules, ExpoModules, recentemente NitroModules para alcançar o mesmo objetivo de fazer a ponte com funcionalidades nativas da plataforma. Precisamos de melhor documentação sobre como fazer isso bem.
- **Documentação Brownfield** – no momento da cúpula, a documentação oficial para integrar React Native em aplicativos nativos estava bastante desatualizada. Desde então, a equipe seguiu adiante com documentação atualizada e mais simples para Android e iOS.
- **Tree-shaking para Metro web** – a equipe central do Metro está aberta para fazer merge do trabalho da equipe Expo nesta área.

## Web APIs para Native Modules

Esta sessão foi dedicada ao RFC da Microsoft girando em torno da ideia de trazer um subconjunto de Web APIs para o React Native. Visa melhorar a escalabilidade do React Native e atrair mais desenvolvedores web aproveitando APIs familiares. Abrindo acesso a uma riqueza de bibliotecas web open-source existentes que não têm suporte explícito para React Native.

![web-apis](../static/blog/assets/react-native-core-contributor-summit-2024-2.jpeg)

Padronizar em especificações de Web API não é apenas benéfico, mas também essencial para o crescimento do React Native, e se alinha bem com nossa visão de Muitas Plataformas e o projeto react-strict-dom. A web oferece uma interface unificada através de suas especificações, que os módulos da comunidade React Native atualmente não têm. A Microsoft identificou cerca de 200 Web APIs essenciais que poderiam ser implementadas primeiro para as plataformas que eles suportam: iOS, Android, Windows e macOS.

Encorajamos desenvolvedores de bibliotecas a alinhar suas APIs com especificações web sempre que possível, pois essa padronização melhorará a portabilidade do código e a experiência do desenvolvedor entre plataformas.

Embora a proposta pareça benéfica para o futuro do React Native, ainda estamos fazendo brainstorming dos próximos passos adiante. Uma preocupação que notamos é a governança das APIs, e se elas precisariam viver em um repositório separado das implementações da plataforma. Outra em torno de divergir da especificação oficial no caso de uma plataforma específica permitir comportamentos não especificados pelo W3C. Precisaríamos descobrir como evitar empacotar módulos desnecessários, por exemplo, com um plugin Babel. Sem mencionar que o escopo de tal iniciativa é bastante grande.

A conclusão da sessão reforçou dois pontos-chave: Primeiro, há um forte alinhamento em toda a comunidade React Native sobre a adoção de especificações compatíveis com a web onde possível. Segundo, precisamos estabelecer uma estratégia técnica clara para como essas implementações de Web API podem ser mantidas separadamente para diferentes plataformas. A Microsoft juntamente com a Callstack poderiam trabalhar em refinar o RFC original e produzir uma prova de conceito de implementação para um número menor de APIs como uma iniciativa da comunidade. Esta abordagem incremental nos ajudará a validar o design e a experiência do desenvolvedor antes de expandir o escopo.

## LeanCore 2.0

Em 2019, a equipe do React Native iniciou a iniciativa Lean Core. O objetivo era abordar a área de superfície do núcleo do React Native e reduzir APIs e componentes que estavam desatualizados e legados. Desde então, os componentes e superfícies de API do React Native estão há muito tempo atrasados para outra rodada de limpeza.

Hoje, existem muitos componentes que não estão sendo mantidos ativamente com melhores alternativas da comunidade. Além disso, existem componentes que têm duplicatas que eventualmente devem ser consolidadas para manutenibilidade.

No lado da API, muitas das APIs da camada JS estão vinculadas a implementações nativas de iOS e Android, em vez de serem verdadeiramente agnósticas de plataforma. Por exemplo, com Pressable, temos props como `android_disableSound` e `android_ripple`. Idealmente, os componentes React Native devem ter a menor superfície de API possível que não esteja vinculada a nenhuma plataforma específica.

À medida que as plataformas Out-of-Tree estão crescendo e sendo mais adotadas pelo ecossistema, precisa haver um caminho para reduzir a superfície de componentes e API do núcleo do React Native, reduzindo a carga na equipe central do React Native, e também tornando significativamente mais fácil para mantenedores de plataformas e bibliotecas Out-of-Tree se manterem atualizados.

Como um bônus adicional, isso tornaria mais fácil para desenvolvedores iniciantes de aplicativos aprender React Native, pois há menos componentes duplicados e "pegadinhas" para eles aprenderem. Onde há uma melhor alternativa da comunidade, os desenvolvedores podem ser orientados e encorajados a usar as alternativas da comunidade disponíveis.

Durante a sessão, discutimos:

- As motivações de alto nível do Lean Core e os benefícios para as partes envolvidas (desenvolvedores, mantenedores de bibliotecas, Meta)
- Uma visão agregada de quais componentes estão sendo usados em alguns aplicativos React Native de produção do mundo real
- Os critérios do que é um candidato a ser removido do núcleo
- Um plano de ação claro para executar o Lean Core 2.0 com:
  - O processo de alto nível para depreciação
  - Tratamento de casos onde a Meta está usando componentes internamente que têm melhores alternativas da comunidade,

Como próximo passo, um grupo dos principais contribuidores examinará a coleta de mais telemetria e dados, avaliando alternativas da comunidade, e montando um RFC detalhando as mudanças propostas.

## Nitro Modules - Desbloqueando View Components ao expor props como jsi::Values

Recentemente, Marc Rousavy introduziu Nitro Modules como uma abordagem alternativa para criar Native Modules. Nitro Modules utilizam C++ Swift Interop experimental e incorporam um monte de melhorias que podem levar a desempenho aprimorado em certos cenários. No entanto, durante esta sessão, discutimos as várias compensações envolvidas entre Nitro Modules e TurboModules existentes.

Embora os Nitro Modules ofereçam alguns benefícios de desempenho, eles também têm limitações e considerações que precisam ser abordadas. Por exemplo, o uso de recursos de interop experimental pode introduzir complexidade ou problemas de compatibilidade que não estão presentes nos TurboModules. Nossa discussão se concentrou nessas compensações e no potencial de fazer upstream de algumas melhorias dos Nitro Modules para o React Native Core, o que poderia permitir que os desenvolvedores se beneficiassem de módulos mais performáticos para todos.

## Out-of-Tree Platforms & CocoaPods

Out-of-Tree Platforms apresenta todo o poder do React Native, onde podemos compartilhar uma base de código JS entre diferentes plataformas rodando em nossos dispositivos móveis, desktops ou até mesmo em dispositivos VR/XR. Criar tal plataforma atualmente não é o processo mais fácil, na verdade não há diretrizes sobre como as coisas devem ser criadas, desenvolvidas e mantidas. Também o React Native Core de certa forma está vinculado às plataformas Android e iOS. No futuro, poderíamos almejar um cenário onde todas as plataformas sejam tratadas igualmente e se integrem com um núcleo C++/JS através das mesmas APIs.

![oot-platforms](../static/blog/assets/react-native-core-contributor-summit-2024-3.jpeg)

Durante esta sessão, mantenedores de diferentes plataformas discutiram quais são os problemas, com o que eles lutam e qual deveria ser a solução para unificar o processo de criar e manter novas plataformas Out-of-Tree.

Outro aspecto desta sessão foi discutir CocoaPods e planos futuros relacionados ao gerenciamento de dependências nativas. Recentemente a equipe CocoaPods anunciou que mudou para modo de manutenção e novas melhorias ou recursos importantes não serão enviados. Existem várias alternativas que poderiam ser usadas e durante esta sessão discutimos seus prós e contras, e como seria a migração.

## React Native em Desktop

Steven e Saad da Microsoft, mantenedores do react-native-windows e react-native-macos, hospedaram uma sessão para ouvir e coletar feedback de contribuidores relacionados a plataformas Desktop. Os tópicos discutidos incluíram explorar como aumentar a adoção do React Native para Desktop (como ter um workflow dedicado no Visual Studio, ou expor desktop como parte do Nx), bem como como suportar Expo, que é um ponto de dor contínuo para mais adoção.

Há uma grande discrepância na disponibilidade de módulos da comunidade entre macOS e Windows, em grande parte devido ao fato de que o código iOS é principalmente compatível com macOS, enquanto RNW precisa de implementações sob medida. Ao trabalhar na New Architecture para React Native para Windows, a equipe vê potencial em módulos C++ permitindo ainda mais compartilhamento de código entre plataformas, o que esperamos facilite o fardo de ter como alvo plataformas desktop. Vale notar que no lado da comunidade a Software Mansion está trabalhando em adicionar suporte para desktop para seus módulos mais populares, como React Native Screens, Gesture Handler e Reanimated.

---

Ainda estamos impressionados com como passar várias horas juntos por alguns dias resultou em tanto compartilhamento de conhecimento e polinização cruzada de ideias. Durante esta cúpula, plantamos as sementes para iniciativas que nos ajudarão a melhorar e remodelar o ecossistema React Native.

Se você está interessado em participar do desenvolvimento do React Native, certifique-se de participar de nossas iniciativas abertas e leia o [guia de contribuição](https://reactnative.dev/contributing/overview) que temos em nosso site. Esperamos te encontrar pessoalmente também no futuro!
