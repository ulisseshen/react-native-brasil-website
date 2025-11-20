---
ia-translated: true
title: Hermes como Padrão
authors: [micleo]
tags: [announcement, release]
---

# Hermes como Padrão

Em outubro passado, [anunciamos](/blog/2021/10/26/toward-hermes-being-the-default) que havíamos começado o trabalho para **tornar** **o Hermes o engine padrão para todos os aplicativos React Native**.

O Hermes forneceu muito valor ao React Native dentro da Meta, e acreditamos que a comunidade open-source também se beneficiará. O Hermes é projetado para dispositivos com recursos limitados e otimiza para inicialização, tamanho do aplicativo e consumo de memória. Uma diferença chave entre o Hermes e outros engines JS é sua capacidade de compilar código-fonte JavaScript para bytecode antes do tempo. Este bytecode pré-compilado é empacotado dentro do binário e evita que o interpretador tenha que realizar esta etapa cara durante a inicialização do aplicativo.

Desde o anúncio, muito trabalho foi feito para tornar o Hermes melhor, e hoje, estamos empolgados em compartilhar que **React Native 0.70 será lançado com Hermes como engine padrão.** Isso significa que todos os novos projetos iniciando na v0.70 terão o Hermes habilitado por padrão. Com o rollout chegando em julho, queremos trabalhar em estreita colaboração com a comunidade e garantir que a transição seja suave e traga valor a todos os usuários. Este post do blog passará pelo que você pode esperar da mudança, benchmarks de performance, novos recursos e muito mais. Observe que você não precisa esperar pelo React Native 0.70 para começar a usar o Hermes - você pode **seguir [estas instruções](/docs/hermes#enabling-hermes) para habilitar o Hermes em seu aplicativo React Native existente**.

Observe que, embora o Hermes seja habilitado por padrão em novos projetos React Native, o suporte para outros engines continuará.

<!--truncate-->

## Benchmarking

Medimos três métricas diferentes importantes para desenvolvedores de aplicativos: TTI, tamanho do binário e consumo de memória. Usamos o aplicativo React Native [Mattermost](https://github.com/mattermost/mattermost-mobile) para testes. Executamos esses experimentos tanto para Android quanto para iOS em hardware de ponta de 2020.

- TTI, ou time to interactive, é a duração do tempo desde que o aplicativo é iniciado até que o usuário possa interagir com ele. Para este benchmark, definimos como o tempo desde pressionar o ícone do aplicativo até a primeira tela ser renderizada. Também mostramos gravações de tela da inicialização do Mattermost.
- O tamanho do binário foi medido como tamanho do APK no Android e tamanho do IPA no iOS.
- Os dados de consumo de memória foram coletados usando o aplicativo Mattermost ao longo de alguns minutos. As mesmas ações foram realizadas no aplicativo em ambos os engines.

## Dados de Benchmarking do Android

Todos os testes do Android foram realizados em um Samsung Galaxy S20.

<figure>
  <img src="/blog/assets/hermes-default-android-data.png" alt="Android Benchmarking Data" />
</figure>

### Vídeo TTI

<figure>
  <img src="/blog/assets/hermes-default-android-video.gif" alt="Android TTI Video" />
</figure>

## Dados de Benchmarking do iOS

Todos os testes do iOS foram realizados em um iPhone 12 Pro.

<figure>
  <img src="/blog/assets/hermes-default-ios-data.png" alt="iOS Benchmarking Data" />
</figure>

### Vídeo TTI

<figure>
  <img src="/blog/assets/hermes-default-ios-video.gif" alt="iOS TTI Video" />
</figure>

### Vídeo TTI em Câmera Lenta, para mostrar melhor a diferença no tempo de inicialização.

<figure>
  <img src="/blog/assets/hermes-default-ios-slow-video.gif" alt="iOS Slowed Down TTI Video" />
</figure>

## Integração React Native/Hermes

Abordamos um problema de longa data que tem causado problemas de compatibilidade e é um problema recorrente ao lançar novas versões do React Native: React Native dependia do Hermes através de binários pré-compilados distribuídos via CocoaPods e npm, o que torna possível ter incompatibilidades de API ou [ABI](https://github.com/react-native-community/discussions-and-proposals/issues/257). Para resolver este problema, a partir do React Native 0.69, o Hermes é compilado junto com cada versão do React Native. Isso garante compatibilidade total com cada versão do React Native. Isso também cria uma integração muito mais estreita. Desbloqueia um tempo de iteração mais rápido para desenvolver recursos ou implantar correções de bugs, e nos dará maior confiança para garantir que grandes mudanças no Hermes sejam feitas corretamente. Há informações mais detalhadas sobre a nova mudança de integração [aqui](https://github.com/facebook/react-native-website/pull/3159/files).

## iOS Intl

Finalizamos a implementação da contraparte iOS para [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), a API de Internacionalização ECMAScript que fornece uma ampla gama de funcionalidades sensíveis ao idioma. Esta era uma [lacuna](https://github.com/facebook/hermes/issues/23) de longa data que impedia alguns desenvolvedores de usar o Hermes. A implementação do Android, feita em parceria com a Microsoft, foi lançada no React Native 0.65. Com o React Native 0.70, os desenvolvedores terão suporte nativo em ambas as plataformas.

Implementações típicas para `Intl` requerem a importação de grandes tabelas de consulta ou dados como [Unicode CLDR](https://cldr.unicode.org/index). No entanto, isso pode vir com um aumento de tamanho caro de até 6MB, então para evitar inflar o tamanho do binário do Hermes, implementamos `Intl` chamando APIs expostas pelo próprio iOS. Isso significa que podemos aproveitar todos os dados de localização e internacionalização que já vêm com o iOS.

## Trabalho em Andamento

À medida que continuamos evoluindo o Hermes, queremos dar à comunidade uma noção de nossas prioridades imediatas: melhorar a experiência do desenvolvedor e garantir que ninguém evite usar o Hermes devido à falta de recursos da linguagem JavaScript. Mais especificamente, estamos:

- Permitindo que desenvolvedores executem o profiler de amostragem diretamente da UI do Chrome devtools.
- Adicionando suporte para [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), uma solicitação de longa data da comunidade que pode bloquear alguns desenvolvedores de usar o Hermes, pois não pode ser polyfilled.
- Adicionando suporte para [`WeakRef`](https://github.com/facebook/hermes/issues/658), que exporá novos controles de gerenciamento de memória aos desenvolvedores.

## Conclusão

O Hermes se tornar o padrão marca o início de uma jornada de longo prazo. Estamos trabalhando em novos recursos que permitirão à comunidade escrever aplicativos eficientes por muitos anos. Também encorajamos a comunidade a entrar em contato em nosso [GitHub Repo](https://github.com/facebook/react-native) para postar quaisquer bugs, perguntas, feedback ou ideias! Criamos uma label `hermes` que pode ser usada para quaisquer posts específicos do Hermes.
