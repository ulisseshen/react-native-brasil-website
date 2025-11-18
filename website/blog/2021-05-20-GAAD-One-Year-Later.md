---
ia-translated: true
title: O Compromisso GAAD - Um Ano Depois
authors: [alexmarlette]
tags: [announcement]
---

Já se passou um ano desde que o Facebook aceitou o [Compromisso GAAD](https://diamond.la/GAADPledge/) para tornar o React Native acessível e o projeto excedeu nossas expectativas. Estamos animados em anunciar que este projeto continuará ao longo de 2021 e queremos atualizar todos sobre nosso progresso até agora. Após uma análise completa das lacunas de acessibilidade no React Native no ano passado, o trabalho começou para preencher essas lacunas.

Começamos com 90 issues pendentes da análise de lacunas e de março de 2021, quando o projeto foi lançado no GitHub, até agora:

- 11 issues foram fechadas pela comunidade.

- 19 issues foram avaliadas e fechadas pela equipe React Native.

- 9 pull requests foram mesclados.

- 1 pull request foi mesclado na documentação do React Native.

Queremos reconhecer e agradecer à comunidade React Native pelo progresso significativo em direção a um React Native mais acessível no último ano. O esforço de cada contribuidor contou para fazer progresso na melhoria da Acessibilidade do React Native.

<!--truncate-->

## Correções

Dois tipos de issues foram corrigidos em vários componentes e uma nova funcionalidade foi adicionada à API pelos 9 pull requests.

- Uma issue com o estado Disabled foi tratada em sete componentes

- Uma issue com o estado Selected foi tratada em dois componentes

- Uma nova adição à API do React Native adicionou a capacidade de consultar AccessibilityManager.getRecommendedTimeoutMillis().

### Anúncio do Estado Disabled e Desabilitar Função

Uma das issues mais prevalentes encontradas durante a análise de lacunas foi que alguns componentes não anunciam ou desabilitam a funcionalidade. Agora sete componentes anunciam seu estado desabilitado ou desabilitam a funcionalidade de clique.

Anuncia quando Desabilitado

- `Button` - [#31001](https://github.com/facebook/react-native/pull/31001)

- `Images` - [#31252](https://github.com/facebook/react-native/pull/31252)

- `ImageBackground` - [#31252](https://github.com/facebook/react-native/pull/31252)

Desabilita a funcionalidade de clique quando o componente tem uma prop disabled

- `Button` - [#31001](https://github.com/facebook/react-native/pull/31001)

- `Text` - [Commit da equipe React Native](https://github.com/facebook/react-native/commit/33ff4445dcf858cd5e6ba899163fd2a76774b641)

- `Pressable` - [Commit da equipe React Native](https://github.com/facebook/react-native/commit/1c7d9c8046099eab8db4a460bedc0b2c07ed06df)

- `TouchableHighlight` - [#31135](https://github.com/facebook/react-native/pull/31135)

- `TouchableOpacity` - [#31108](https://github.com/facebook/react-native/pull/31108)

- `TouchableNativeFeedback` - [#31224](https://github.com/facebook/react-native/pull/31224)

- `TouchableWithoutFeedback` - [#31297](https://github.com/facebook/react-native/pull/31297)

### Anúncio do Estado Selected

Havia alguns componentes que não anunciavam sua seleção quando em foco. Este comportamento agora foi corrigido quando o componente está em foco e o AccessibilityState está definido como selected ou o componente é alterado para selected.

Anuncia quando Selected

- `Button` - [#31001](https://github.com/facebook/react-native/pull/31001)

- `TextInput` - [#31144](https://github.com/facebook/react-native/pull/31144)

### Configuração de Timeout de Acessibilidade

Anteriormente não havia como consultar a configuração de timeout de acessibilidade no Android. A correção adicionou a capacidade de consultar `AccessibilityManager.getRecommendedTimeoutMillis()`. Isso consulta o "Tempo para agir" antes que os elementos da UI sejam automaticamente descartados ou avancem automaticamente.

## Adições à Documentação

A documentação do React Native deve ser atualizada para refletir cada adição ou mudança nas APIs disponíveis. A [nova adição à documentação do React Native](https://reactnative.dev/docs/next/accessibilityinfo#getrecommendedtimeoutmillis-android) cobriu a adição de `getRecommendedTimeoutMillis()` ao AccessibilityInfo.

## Envolvimento da Comunidade

Queremos agradecer a todos os contribuidores mencionados abaixo que enviaram e mesclaram pull requests, bem como aqueles que revisaram e comentaram em issues.

### Pull Requests Mesclados

- [@huzaifaaak](https://twitter.com/huzaifaaak) fechou 3 issues com:
  - [Added talkback support for button accessibility: disabled prop #31001](https://github.com/facebook/react-native/pull/31001)
  - [Accessibility/button test #31189](https://github.com/facebook/react-native/pull/31189)
- [@natural_clar](https://twitter.com/natural_clar) fechou 1 issue com:
  - [feat: set disabled accessibilityState when `TouchableHighlight` is disabled #31135](https://github.com/facebook/react-native/pull/31135)
- [fabriziobertoglio1987](https://github.com/fabriziobertoglio1987) fechou 2 issues com:
  - [[Android] Selected State does not annonce when `TextInput` Component selected #31144](https://github.com/facebook/react-native/pull/31144)
  - [Accessibility Fix Image does not announce "disabled" #31252](https://github.com/facebook/react-native/pull/31252)
- [@kyamashiro73](https://twitter.com/kyamashiro73) fechou 1 issue com:
  - [Added talkback support for `TouchableNativeFeedback` accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224)
- [@grgr-dkrk](https://twitter.com/dkrk0901) fechou 1 issue e adicionou à documentação do React Native com:
  - [add `getRecommendedTimeoutMillis` to AccessibilityInfo #31063](https://github.com/facebook/react-native/pull/31063)
  - [feat: add `getRecommendedTimeoutMillis` section on accessibilityInfo #2581](https://github.com/facebook/react-native-website/pull/2581)
- [@crloscuesta](https://twitter.com/crloscuesta) fechou 1 issue com:
  - [Disable accessibilityState when `TouchableWithoutFeedback` is disabled #31297](https://github.com/facebook/react-native/pull/31297)
- [@chakrihacker](https://twitter.com/chakrihacker) fechou 1 issue com:
  - [Disable `TouchableOpacity` when accessibility disabled is set #31108](https://github.com/facebook/react-native/pull/31108)

Obrigado aos membros da comunidade que dedicaram seu tempo de outras maneiras!

[Simek](https://github.com/Simek), [saurabhkacholiya](https://github.com/saurabhkacholiya), [meehawk](https://github.com/meehawk), [intergalacticspacehighway](https://github.com/intergalacticspacehighway), [chrisglein](https://github.com/chrisglein), [jychiao](https://github.com/jychiao) e [Waltari10](https://github.com/Waltari10)

## Envolva-se!

Percorremos um longo caminho, mas ainda não terminamos. Precisamos do seu apoio para chegar à linha de chegada. A equipe React Native do Facebook se comprometeu a apoiar os contribuidores trabalhando em issues de análise de lacunas. Eles continuarão a responder comentários sobre issues de Acessibilidade e fazer triagem de pull requests. A equipe React Native também está enfrentando algumas das issues mais difíceis da análise de lacunas. Este trabalho inclui a tradução correta de accessibilityRoles para outros idiomas e especificar texto de erro para componentes específicos.

Junte-se a nós para enfrentar o resto. Ainda há issues de acessibilidade abertas no [quadro de projeto Acessibilidade Melhorada do React Native](https://github.com/facebook/react-native/projects/15). Issues com [Estado Checked/Unchecked](https://github.com/facebook/react-native/issues/30843), [Entrada/saída de Coleção](https://github.com/facebook/react-native/issues/30861) e [Posição na Coleção](https://github.com/facebook/react-native/issues/30977) são ótimas oportunidades para contribuidores atuais e novos contribuírem para um React Native mais acessível.

### Saiba Mais

Leia sobre como a análise de lacunas foi conduzida no [blog Facebook Tech](https://tech.fb.com/react-native-accessibility/) ou sobre o lançamento das issues do GitHub no [Blog do React Native](https://reactnative.dev/blog/2021/03/08/GAAD-React-Native-Accessibility).
