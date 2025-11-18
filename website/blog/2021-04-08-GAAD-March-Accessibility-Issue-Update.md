---
ia-translated: true
title: O Compromisso GAAD - Atualização de Issues de Acessibilidade de Março
authors: [alexmarlette]
tags: [announcement]
---

Passaram-se quatro semanas desde que entramos em contato com a comunidade do GitHub com uma análise de lacunas minuciosamente revisada e uma lista de issues para melhorar a acessibilidade do React Native. Com a ajuda da comunidade React Native, já estamos fazendo um ótimo progresso na melhoria da acessibilidade. Membros da comunidade têm ajudado contribuidores, revisando testes e trazendo atenção para issues de acessibilidade anteriores. Desde 8 de março, a comunidade fechou seis issues com quatro pull requests e sete outros pull requests estão em andamento para revisão.

Enquanto este trabalho continua, as equipes de React Native e Acessibilidade no Facebook estão avaliando bugs e issues de acessibilidade que foram enviados antes desta iniciativa, para determinar se já estão cobertos por nossa análise de lacunas atual ou se existem issues adicionais que precisam ser incluídas no projeto. Uma nova issue já foi descoberta e movida para o projeto, quatro outras mapearam diretamente para issues existentes e espera-se que duas outras sejam fechadas ao abordar issues existentes que tratam da causa raiz de seu problema.

Obrigado a todos os membros da comunidade que participaram. Vocês estão realmente fazendo a diferença ao tornar o React Native mais acessível para todos!

<!--truncate-->

## Pull Requests Fechados 🎉

- [Added talkback support for button accessibility: disabled prop #31001](https://github.com/facebook/react-native/pull/31001) - fechado por [@huzaifaaak ](https://twitter.com/huzaifaaak)

- [feat: set disabled accessibilityState when TouchableHighlight is disabled #31135](https://github.com/facebook/react-native/pull/31135) fechado por [@natural_clar](https://twitter.com/natural_clar)

- [[Android] Selected State does not annonce when TextInput Component selected #31144](https://github.com/facebook/react-native/pull/31144) fechado por [fabriziobertoglio1987](https://fabriziobertoglio.xyz/)

- [Added talkback support for TouchableNativeFeedback accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224) fechado por [@kyamashiro73](https://twitter.com/kyamashiro73)

- [Accessibility/button test #31189](https://github.com/facebook/react-native/pull/31189) fechado por [@huzaifaaak ](https://twitter.com/huzaifaaak)
  - Adiciona um teste para accessibilityState para button

## Correções

- Componente `Button` (corrigido por [#31001](https://github.com/facebook/react-native/pull/31001)):
  - Agora anuncia quando está desabilitado

  - Desabilita a funcionalidade de clique para leitores de tela quando o botão está desabilitado

  - Anuncia o estado selecionado do botão

- Componente `TextInput` (corrigido por [#31144](https://github.com/facebook/react-native/pull/31144)):
  - Anuncia "selected" quando o accessibilityState "selected" está definido como true e o elemento está em foco

- Componente `TouchableHighlight` (corrigido por [#31135](https://github.com/facebook/react-native/pull/31135)):
  - Desabilita a funcionalidade de clique para leitores de tela quando o componente está desabilitado

- Componente `TouchableNativeFeedback` (corrigido por [#31224](https://github.com/facebook/react-native/pull/31224)):
  - Desabilita a funcionalidade de clique para leitores de tela quando o componente está desabilitado

## Outros Progressos

| Status                                  | Número de Issues |
| --------------------------------------- | :--------------: |
| Issues A Fazer                          |        53        |
| Issues em Progresso pela Comunidade     |        8         |
| Issues em Progresso pela Equipe React Native |        5         |
| Pull Request em Progresso               |        3         |
| Pull Request em Revisão                 |        4         |

## Envolva-se!

- Novos contribuidores devem ler o [guia de contribuição](https://github.com/facebook/react-native/blob/master/CONTRIBUTING.md) e navegar pela lista de 37 [good first issues](https://github.com/facebook/react-native/issues?q=is%3Aopen+is%3Aissue+label%3A%22Good+first+issue%22+label%3AAccessibility) no GitHub do React Native.

- Contribuidores interessados em issues que requerem um pouco mais de esforço devem visitar [a página do projeto para Acessibilidade Melhorada do React Native](https://github.com/facebook/react-native/projects/15) para ver as issues no GitHub que precisam do seu conhecimento de React Native.

- Escritores técnicos interessados em atualizar a documentação do React Native para refletir as lacunas de acessibilidade que estão sendo fechadas devem visitar a [Documentação do React Native](https://github.com/facebook/react-native-website#-overview).

- Compartilhe esta iniciativa com qualquer pessoa que possa ajudar!

- Siga o Gerente de Comunidade de Acessibilidade Open Source do Compromisso GAAD para React Native no [Twitter](https://twitter.com/alexmarlette) ou [Facebook](https://www.facebook.com/React-Native-Open-Source-Accessibility-Community-Manager-102732258549941) para se manter atualizado sobre o progresso.
