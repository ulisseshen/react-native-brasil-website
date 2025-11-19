---
ia-translated: true
title: 'React Native Monthly #4'
authors: [grabbou]
tags: [engineering]
---

A reunião mensal do React Native continua! Aqui estão as notas de cada equipe:

### Callstack

- [React Native EU](https://react-native.eu) acabou. Mais de 300 participantes de 33 países visitaram Wroclaw. As palestras podem ser encontradas [no YouTube](https://www.youtube.com/channel/UCUNE_g1mQPuyW975WjgjYxA/videos).
- Estamos lentamente voltando ao nosso cronograma open source após a conferência. Uma coisa que vale mencionar é que estamos trabalhando em um próximo lançamento de [react-native-opentok](https://github.com/callstack/react-native-opentok) que corrige a maioria dos problemas existentes.

### GeekyAnts

Tentando diminuir a barreira de entrada para desenvolvedores abraçando React Native com as seguintes coisas:

- Anunciou [BuilderX.io](https://builderx.io/) na [React Native EU](https://react-native.eu). BuilderX é uma ferramenta de design que trabalha diretamente com arquivos JavaScript (apenas React Native é suportado no momento) para gerar código bonito, legível e editável.
- Lançou [ReactNativeSeed.com](https://reactnativeseed.com/) que fornece um conjunto de boilerplates para seu próximo projeto React Native. Vem com uma variedade de opções que incluem TypeScript & Flow para tipos de dados, MobX, Redux e mobx-state-tree para gerenciamento de estado com CRNA e React-Native puro como a stack.

### Expo

- Lançará SDK 21 em breve, que adiciona suporte para react-native 0.48.3 e várias correções de bugs/melhorias de confiabilidade/novos recursos no Expo SDK, incluindo gravação de vídeo, uma nova API de splash screen, suporte para `react-native-gesture-handler` e manipulação de erros melhorada.
- Re: [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler), [Krzysztof Magiera](https://github.com/kmagiera) da [Software Mansion](https://swmansion.com/) continua avançando isso e temos ajudado ele com testes e financiando parte de seu tempo de desenvolvimento. Ter isso integrado na Expo no SDK21 permitirá que as pessoas brinquem com isso facilmente no Snack, então estamos animados para ver o que as pessoas criarão.
- Re: logging/manipulação de erros melhorados - veja [este gist de um PR interno da Expo](https://gist.github.com/brentvatne/00407710a854627aa021fdf90490b958) para detalhes sobre logging, (em particular, "Problem 2"), e [este commit](https://github.com/expo/xdl/commit/1d62eca293dfb867fc0afc920c3dad94b7209987) para uma mudança que lida com tentativas falhadas de importar módulos de biblioteca padrão npm. Há muita oportunidade para melhorar mensagens de erro upstream no React Native desta forma e trabalharemos em PRs upstream de acompanhamento. Seria ótimo para a comunidade se envolver também.
- [native.directory](https://native.directory/) continua crescendo, você pode adicionar seus projetos no [repositório GitHub](https://github.com/react-community/native-directory).
- Visitamos hackathons pela América do Norte, incluindo [PennApps](https://pennapps.com/), [Hack The North](https://hackthenorth.com/), [HackMIT](https://hackmit.org/), e em breve [MHacks](https://mhacks.org/).

### Facebook

- Trabalhando em melhorar os componentes `<Text>` e `<TextInput>` no Android. (Auto-growing nativo para `<TextInput>`; problemas de layout de componentes `<Text>` profundamente aninhados; melhor estrutura de código; otimizações de performance).
- Ainda estamos procurando contribuidores adicionais que gostariam de ajudar a fazer triagem de issues e pull requests.

### Microsoft

- Lançou recurso de Code Signing para CodePush. Desenvolvedores React Native agora podem assinar seus bundles de aplicativo no CodePush. O anúncio pode ser encontrado [aqui](https://microsoft.github.io/code-push/articles/CodeSigningAnnouncement.html)
- Trabalhando em completar a integração do CodePush ao Mobile Center. Considerando integração de teste/crash também.

## Próxima sessão

A próxima sessão está agendada para quarta-feira, 10 de outubro de 2017. Como esta foi apenas nossa quarta reunião, gostaríamos de saber como essas notas beneficiam a comunidade React Native. Sinta-se à vontade para me contatar [no Twitter](https://twitter.com/grabbou) se você tiver alguma sugestão sobre como devemos melhorar o resultado da reunião.
