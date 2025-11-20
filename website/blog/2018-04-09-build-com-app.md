---
ia-translated: true
title: Construído com React Native - O App Build.com
author: Garrett McCullough
authorTitle: Senior Mobile Engineer
authorURL: 'https://twitter.com/gwmccull'
authorImageURL: 'https://pbs.twimg.com/profile_images/955503100785172486/UrMKkQXc_400x400.jpg'
authorTwitter: gwmccull
tags: [showcase]
---

[Build.com](https://www.build.com/), com sede em Chico, Califórnia, é um dos maiores varejistas online de itens para melhorias residenciais. A equipe tem tido um negócio forte centrado na web por 18 anos e começou a pensar sobre um app móvel em 2015. Construir apps Android e iOS únicos não era prático devido à nossa pequena equipe e experiência nativa limitada. Em vez disso, decidimos arriscar no framework React Native muito novo. Nosso commit inicial foi em 12 de agosto de 2015 usando React Native v0.8.0! Estávamos ao vivo em ambas as App Stores em 15 de outubro de 2016. Nos últimos dois anos, continuamos a atualizar e expandir o app. Atualmente estamos no React Native versão 0.53.0.

Você pode conferir o app em [https://www.build.com/app](https://www.build.com/app).

<p align="center">
  <img src="/blog/assets/build-com-blog-image.jpg" />
</p>

## Recursos

Nosso app tem recursos completos e inclui tudo que você esperaria de um app de e-commerce: listagens de produtos, busca e ordenação, a capacidade de configurar produtos complexos, favoritos, etc. Aceitamos métodos de pagamento com cartão de crédito padrão, bem como PayPal e Apple Pay para nossos usuários iOS.

Alguns recursos de destaque que você pode não esperar incluem:

1. Modelos 3D disponíveis para cerca de 40 produtos com 90 acabamentos
2. Realidade Aumentada (AR) para permitir que o usuário veja como luminárias e torneiras ficarão em sua casa com 98% de precisão de tamanho. O App React Native da Build.com está em destaque na Apple App Store para AR Shopping! AR está agora disponível para Android e iOS!
3. Recursos de gerenciamento de projeto colaborativo que permitem que as pessoas montem listas de compras para as diferentes fases de seu projeto e colaborem em torno da seleção

Estamos trabalhando em muitos recursos novos e empolgantes que continuarão a melhorar nossa experiência de app, incluindo a próxima fase de Compra Imersiva com AR.

## Nosso Fluxo de Trabalho de Desenvolvimento

Build.com permite que cada desenvolvedor escolha as ferramentas que melhor se adequam a ele.

- IDEs incluem Atom, IntelliJ, VS Code, Sublime, Eclipse, etc.
- Para testes unitários, os desenvolvedores são responsáveis por criar testes unitários Jest para quaisquer novos componentes e estamos trabalhando para aumentar a cobertura de partes mais antigas do app usando `jest-coverage-ratchet`.
- Usamos Jenkins para construir nossas versões beta e release candidates. Este processo funciona bem para nós, mas ainda requer trabalho significativo para criar as notas de lançamento e outros artefatos.
- Testes de integração incluem um pool compartilhado de testadores que trabalham em desktop, mobile e web. Nosso engenheiro de automação está construindo nossa suite de testes de integração automatizados usando Java e Appium.
- Outras partes do fluxo de trabalho incluem uma configuração detalhada do eslint, regras customizadas que impõem propriedades necessárias para testes, e hooks pre-push que bloqueiam mudanças ofensivas.

## Bibliotecas Usadas no App

O app Build.com depende de várias bibliotecas open source comuns, incluindo: Redux, Moment, Numeral, Enzyme e um monte de módulos bridge React Native. Também usamos várias bibliotecas open source com fork; com fork seja porque foram abandonadas ou porque precisávamos de recursos customizados. Uma contagem rápida mostra cerca de 115 dependências JavaScript e nativas. Gostaríamos de explorar ferramentas que removem bibliotecas não utilizadas.

Estamos no processo de adicionar tipagem estática via TypeScript e olhando para optional chaining. Esses recursos poderiam nos ajudar a resolver algumas classes de bugs que ainda vemos:

- Dados que são do tipo errado
- Dados que são undefined porque um objeto não continha o que esperávamos

## Contribuições Open Source

Como dependemos tanto de open source, nossa equipe está comprometida em contribuir de volta para a comunidade. Build.com permite que a equipe faça open source de bibliotecas que construímos e nos encoraja a contribuir de volta para as bibliotecas que usamos.

Lançamos e mantemos várias bibliotecas React Native:

- `react-native-polyfill`
- `react-native-simple-store`
- `react-native-contact-picker`

Também contribuímos para uma longa lista de bibliotecas, incluindo: React e React Native, `react-native-schemes-manager`, `react-native-swipeable`, `react-native-gallery`, `react-native-view-transformer`, `react-native-navigation`.

## Nossa Jornada

Vimos muito crescimento em React Native e no ecossistema nos últimos dois anos. No início, parecia que cada versão do React Native corrigiria alguns bugs, mas introduziria vários mais. Por exemplo, Remote JS Debugging estava quebrado no Android por vários meses. Felizmente, as coisas se tornaram muito mais estáveis em 2017.

### Bibliotecas de Navegação

Um dos nossos grandes desafios recorrentes tem sido com bibliotecas de navegação. Por muito tempo, estávamos usando a biblioteca ex-nav do Expo. Funcionou bem para nós, mas acabou sendo descontinuada. No entanto, estávamos em desenvolvimento pesado de recursos na época, então tirar tempo para mudar uma biblioteca de navegação não era viável. Isso significou que tivemos que fazer fork da biblioteca e patcheá-la para suportar React 16 e o iPhone X. Eventualmente, conseguimos migrar para [`react-native-navigation`](https://github.com/wix/react-native-navigation) e esperamos que isso veja suporte contínuo.

### Módulos Bridge

Outro grande desafio tem sido com módulos bridge. Quando começamos, muitas bridges críticas estavam faltando. Um dos meus colegas de equipe escreveu `react-native-contact-picker` porque precisávamos de acesso ao contact picker do Android em nosso app. Também vimos muitas bridges que foram quebradas por mudanças dentro do React Native. Por exemplo, houve uma mudança breaking dentro do React Native v40 e quando atualizamos nosso app, tive que enviar PRs para corrigir 3 ou 4 bibliotecas que ainda não haviam sido atualizadas.

## Olhando para o Futuro

Conforme o React Native continua a crescer, nossa lista de desejos para nossa comunidade inclui:

- Estabilizar e melhorar as bibliotecas de navegação
- Manter suporte para bibliotecas no ecossistema React Native
- Melhorar a experiência de adicionar bibliotecas nativas e módulos bridge a um projeto

Empresas e indivíduos na comunidade React Native têm sido ótimos em voluntariar seu tempo e esforço para melhorar as ferramentas que todos nós usamos. Se você ainda não se envolveu em open source, espero que você dê uma olhada em melhorar o código ou documentação de algumas das bibliotecas que você usa. Existem muitos artigos para ajudá-lo a começar e pode ser muito mais fácil do que você pensa!
