---
ia-translated: true
title: 'React Native Monthly #1'
author: Tomislav Tenodi
authorTitle: Product Manager at Shoutem
authorURL: 'https://github.com/tenodi'
authorImageURL: 'https://pbs.twimg.com/profile_images/877237660225609729/bKFDwfAq.jpg'
authorTwitter: TomislavTenodi
tags: [engineering]
---

Na [Shoutem](https://shoutem.github.io/), tivemos a sorte de trabalhar com React Native desde seus primórdios. Decidimos que queríamos fazer parte da incrível comunidade desde o primeiro dia. Logo percebemos que é quase impossível acompanhar o ritmo com que a comunidade estava crescendo e melhorando. Por isso decidimos organizar uma reunião mensal onde todos os principais contribuidores do React Native possam apresentar brevemente quais são seus esforços e planos.

## Reuniões mensais

Tivemos nossa primeira sessão da reunião mensal em 14 de junho de 2017. A missão do React Native Monthly é simples e direta: **melhorar a comunidade React Native**. Apresentar os esforços das equipes facilita a colaboração entre equipes feita offline.

## Equipes

Na primeira reunião, tivemos 8 equipes se juntando a nós:

- [Airbnb](https://github.com/airbnb)
- [Callstack](https://github.com/callstack-io)
- [Expo](https://github.com/expo)
- [Facebook](https://github.com/facebook)
- [GeekyAnts](https://github.com/GeekyAnts)
- [Microsoft](https://github.com/microsoft)
- [Shoutem](https://github.com/shoutem)
- [Wix](https://github.com/wix)

Esperamos ter mais contribuidores principais nas próximas sessões!

## Notas

Como os planos das equipes podem ser de interesse para um público mais amplo, estaremos compartilhando-os aqui, no blog do React Native. Então, aqui estão eles:

### Airbnb

- Planeja adicionar algumas APIs de A11y (acessibilidade) ao `View` e ao módulo nativo `AccessibilityInfo`.
- Investigará a adição de algumas APIs aos módulos nativos no Android para permitir especificar threads para eles serem executados.
- Tem investigado potenciais melhorias de performance de inicialização.
- Tem investigado algumas estratégias de bundling mais sofisticadas para usar em cima de "unbundle".

### Callstack

- Investigando melhorar o processo de release usando [Detox](https://github.com/wix/detox) para testes E2E. Pull request deve chegar em breve.
- Pull request de Blob em que estavam trabalhando foi merged, pull requests subsequentes chegando.
- Aumentando a adoção do [Haul](https://github.com/callstack-io/haul) em projetos internos para ver como ele performa comparado ao [Metro Bundler](https://github.com/facebook/metro-bundler). Trabalhando em melhor performance multi-threaded com a equipe webpack.
- Internamente, implementaram uma melhor infraestrutura para gerenciar projetos open source. Planos de lançar mais coisas nas próximas semanas.
- A conferência React Native Europe está chegando, nada interessante ainda, mas todos estão convidados!
- Afastou-se do [react-navigation](https://github.com/react-community/react-navigation) por um tempo para investigar alternativas (especialmente navegações nativas).

### Expo

- Trabalhando em tornar possível instalar módulos npm no [Snack](https://snack.expo.io/), será útil para bibliotecas adicionarem exemplos à documentação.
- Trabalhando com [Krzysztof](https://github.com/kmagiera) e outras pessoas da [Software Mansion](https://github.com/software-mansion) em uma atualização do JSC no Android e uma biblioteca de manipulação de gestos.
- [Adam Miskiewicz](https://github.com/skevy) está transitando seu foco para [react-navigation](https://github.com/react-community/react-navigation).
- [Create React Native App](https://github.com/react-community/create-react-native-app) está no [guia Getting Started](/docs/getting-started) na documentação. Expo quer encorajar autores de biblioteca a explicar claramente se sua lib funciona com CRNA ou não, e se sim, explicar como configurá-la.

### Facebook

- O packager do React Native agora é [Metro Bundler](https://github.com/facebook/metro), em um repositório independente. A equipe Metro Bundler em Londres está animada para atender às necessidades da comunidade, melhorar a modularidade para casos de uso adicionais além do React Native e aumentar a responsividade em issues e PRs.
- Nos próximos meses, a equipe React Native trabalhará em refinar as APIs de componentes primitivos. Espere melhorias em peculiaridades de layout, acessibilidade e tipagem flow.
- A equipe React Native também planeja melhorar a modularidade core este ano, refatorando para suportar totalmente plataformas de terceiros como Windows e macOS.

### GeekyAnts

- A equipe está trabalhando em um aplicativo de design UI/UX (codinome: Builder) que funciona diretamente com arquivos `.js`. Atualmente, suporta apenas React Native. É similar ao Adobe XD e Sketch.
- A equipe está trabalhando duro para que você possa carregar um aplicativo React Native existente no editor, fazer alterações (visualmente, como designer) e salvar as alterações diretamente no arquivo JS.
- Pessoal está tentando preencher a lacuna entre Designers e Desenvolvedores e trazê-los para o mesmo repositório.
- Além disso, [NativeBase](https://github.com/GeekyAnts/NativeBase) recentemente alcançou 5.000 estrelas no GitHub.

### Microsoft

- [CodePush](https://github.com/Microsoft/code-push) foi integrado ao [Mobile Center](https://mobile.azure.com/). Este é o primeiro passo para fornecer uma experiência muito mais integrada com distribuição, analytics e outros serviços. Veja o anúncio [aqui](https://microsoft.github.io/code-push/articles/CodePushOnMobileCenter.html).
- [VS Code](https://github.com/Microsoft/vscode) tem um bug com debugging, estão trabalhando para corrigir isso agora e terão um novo build.
- Investigando [Detox](https://github.com/wix/detox) para testes de integração, olhando para JSC Context para obter variáveis junto com relatórios de crash.

### Shoutem

- Tornando mais fácil trabalhar em aplicativos Shoutem com ferramentas da comunidade React Native. Você poderá usar todos os comandos React Native para executar os aplicativos criados no [Shoutem](https://shoutem.github.io/).
- Investigando ferramentas de profiling para React Native. Tiveram muitos problemas ao configurá-lo e escreverão alguns dos insights que descobriram ao longo do caminho.
- Shoutem está trabalhando para tornar mais fácil integrar React Native com aplicativos nativos existentes. Documentarão o conceito que desenvolveram internamente na empresa, a fim de obter feedback da comunidade.

### Wix

- Trabalhando internamente para adotar [Detox](https://github.com/wix/detox) para mover partes significativas do aplicativo Wix para "zero QA manual". Como resultado, Detox está sendo usado fortemente em um ambiente de produção por dezenas de desenvolvedores e amadurecendo rapidamente.
- Trabalhando para adicionar suporte ao [Metro Bundler](https://github.com/facebook/metro) para sobrescrever qualquer extensão de arquivo durante o build. Em vez de apenas "ios" e "android", suportaria qualquer extensão personalizada como "e2e" ou "detox". Planos de usar isso para mocking E2E. Já existe uma biblioteca chamada [react-native-repackager](https://github.com/wix/react-native-repackager), agora trabalhando em um PR.
- Investigando automação de testes de performance. Este é um novo repositório chamado [DetoxInstruments](https://github.com/wix/DetoxInstruments). Você pode dar uma olhada, está sendo desenvolvido open source.
- Trabalhando com um contribuidor da KPN no Detox para Android e suportando dispositivos reais.
- Pensando em "Detox como plataforma" para permitir construir outras ferramentas que precisam automatizar o simulador/dispositivo. Um exemplo é [Storybook](https://github.com/storybooks/react-native-storybook) para React Native ou a ideia de Ram para testes de integração.

## Próxima sessão

As reuniões serão realizadas a cada quatro semanas. A próxima sessão está agendada para 12 de julho de 2017. Como acabamos de começar com esta reunião, gostaríamos de saber como essas notas beneficiam a comunidade React Native. Sinta-se à vontade para me contatar [no Twitter](https://twitter.com/TomislavTenodi) se você tiver alguma sugestão sobre o que devemos cobrir nas próximas sessões ou como devemos melhorar o resultado da reunião.
