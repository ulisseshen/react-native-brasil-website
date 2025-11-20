---
ia-translated: true
id: environment-setup
title: Comece com React Native
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

**React Native permite que desenvolvedores que conhecem React criem aplicativos nativos.** Ao mesmo tempo, desenvolvedores nativos podem usar React Native para obter paridade entre plataformas nativas escrevendo recursos comuns uma única vez.

Acreditamos que a melhor maneira de experimentar React Native é através de um **Framework**, uma caixa de ferramentas com todas as APIs necessárias para permitir que você construa aplicativos prontos para produção.

Você também pode usar React Native sem um Framework, no entanto, descobrimos que a maioria dos desenvolvedores se beneficia ao usar um Framework React Native como [Expo](https://expo.dev). O Expo fornece recursos como roteamento baseado em arquivos, bibliotecas universais de alta qualidade e a capacidade de escrever plugins que modificam código nativo sem precisar gerenciar arquivos nativos.

<details>
<summary>Posso usar React Native sem um Framework?</summary>

Sim. Você pode usar React Native sem um Framework. **No entanto, se você está construindo um novo aplicativo com React Native, recomendamos usar um Framework.**

Resumindo, você poderá gastar tempo escrevendo seu aplicativo em vez de escrever um Framework inteiro você mesmo além do seu aplicativo.

A comunidade React Native passou anos refinando abordagens para navegação, acesso a APIs nativas, lidar com dependências nativas e muito mais. A maioria dos aplicativos precisa desses recursos essenciais. Um Framework React Native os fornece desde o início do seu aplicativo.

Sem um Framework, você terá que escrever suas próprias soluções para implementar recursos essenciais, ou terá que juntar uma coleção de bibliotecas pré-existentes para criar um esqueleto de um Framework. Isso exige trabalho real, tanto ao iniciar seu aplicativo quanto posteriormente ao mantê-lo.

Se seu aplicativo tem restrições incomuns que não são bem atendidas por um Framework, ou se você prefere resolver esses problemas por conta própria, você pode criar um aplicativo React Native sem um Framework usando Android Studio, Xcode. Se você está interessado neste caminho, aprenda como [configurar seu ambiente](set-up-your-environment) e como [começar sem um framework](getting-started-without-a-framework).

</details>

## Inicie um novo projeto React Native com Expo

<PlatformSupport platforms={['android', 'ios', 'tv', 'web']} />

O Expo é um Framework React Native de nível de produção. O Expo fornece ferramentas de desenvolvedor que tornam o desenvolvimento de aplicativos mais fácil, como roteamento baseado em arquivos, uma biblioteca padrão de módulos nativos e muito mais.

O Framework do Expo é gratuito e de código aberto, com uma comunidade ativa no [GitHub](https://github.com/expo) e [Discord](https://chat.expo.dev). A equipe do Expo trabalha em estreita colaboração com a equipe React Native no Meta para trazer os recursos mais recentes do React Native para o SDK do Expo.

A equipe do Expo também fornece o Expo Application Services (EAS), um conjunto opcional de serviços que complementa o Expo, o Framework, em cada etapa do processo de desenvolvimento.

Para criar um novo projeto Expo, execute o seguinte no seu terminal:

```shell
npx create-expo-app@latest
```

Depois de criar seu aplicativo, confira o restante do guia de introdução do Expo para começar a desenvolver seu aplicativo.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Continue com Expo</BoxLink>
