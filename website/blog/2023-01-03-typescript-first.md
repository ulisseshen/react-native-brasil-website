---
ia-translated: true
title: Suporte de Primeira Classe para TypeScript
authors: [lunaleaps, NickGerleman]
tags: [typescript, engineering]
date: 2023-01-03
---

# Suporte de Primeira Classe para TypeScript

Com o lançamento da versão 0.71, o React Native está investindo na experiência TypeScript com as seguintes mudanças:

- [Novo template de app é TypeScript por padrão](/blog/2023/01/03/typescript-first#new-app-template-is-typescript-by-default)
- [Declarações TypeScript incluídas com o React Native](/blog/2023/01/03/typescript-first#declarations-shipped-with-react-native)
- [A documentação do React Native é TypeScript First](/blog/2023/01/03/typescript-first#documentation-is-typescript-first)

Neste post vamos cobrir o que essas mudanças significam para você como usuário de TypeScript ou Flow.

<!--truncate-->

## Novo Template de App é TypeScript Por Padrão

A partir da versão 0.71, quando você cria um novo app React Native via React Native CLI você recebe um app TypeScript por padrão!

```shell
npx react-native init My71App --version 0.71.0
```

![Captura de tela de um simulador de iPhone executando um novo app gerado pelo React Native CLI. Ao lado do simulador está uma captura de tela do editor Visual Studio Code aberto em "App.tsx" para ilustrar que está executando um arquivo TypeScript.](/blog/assets/typescript-first-new-app.png)

O ponto de partida de um app recém-gerado será `App.tsx` ao invés de `App.js` – totalmente tipado com TypeScript. O novo projeto já vem configurado com um `tsconfig.json`, então desde o início seu IDE irá ajudá-lo a escrever código tipado imediatamente!

## Declarações Incluídas com o React Native

0.71 é a primeira versão com declarações TypeScript (TS) integradas.

Anteriormente, as declarações TypeScript para React Native eram fornecidas por [`@types/react-native`](https://www.npmjs.com/package/@types/react-native) hospedadas no repositório [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). A decisão de co-localizar os tipos TypeScript com o código-fonte do React Native foi para melhorar a correção e manutenção.

`@types/react-native` fornece apenas tipos para versões estáveis. Isso significa que se você quisesse desenvolver com uma versão pré-lançamento do React Native em TypeScript, teria que usar tipos de uma versão mais antiga que podem ser imprecisos. Lançar `@types/react-native` também é propenso a erros. Os lançamentos ficam atrás das versões do React Native, e o processo envolve inspecionar manualmente mudanças de tipos feitas na API pública do React Native e atualizar a declaração TS para corresponder.

Com os tipos TS co-localizados com o código-fonte do React Native, há mais visibilidade e responsabilidade sobre os tipos TS. Nossa equipe está trabalhando ativamente em ferramentas para manter o alinhamento entre Flow e TS.

Esta mudança também remove uma dependência que os usuários do React Native precisam gerenciar. Ao atualizar para 0.71 ou superior, você pode remover `@types/react-native` como dependência. [Consulte o novo template de app sobre como configurar o suporte TypeScript.](https://github.com/facebook/react-native/blob/main/template/tsconfig.json)

Planejamos depreciar `@types/react-native` para versões 0.73 em diante. Concretamente isso significa:

- `@types/react-native` rastreando as versões 0.71 e 0.72 do React Native será lançado. Eles serão idênticos aos tipos no React Native nos branches de lançamento relevantes.
- Para React Native 0.73 em diante, os tipos TS estarão disponíveis apenas do React Native.

### Como Migrar

Por favor, migre para os novos tipos co-localizados o mais rápido possível. Aqui estão mais detalhes sobre a migração baseada nas suas necessidades.

#### Mantenedor de App

Uma vez que você atualize para React Native >= 0.71, você pode remover o `@types/react-native` do seu `devDependency`.

:::note

Se você tiver avisos porque uma biblioteca que você usa referencia `@types/react-native` como `peerDependency`, registre uma issue ou abra um PR para essa biblioteca usar [optional peerDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependenciesmeta) e ignore o aviso por enquanto.

:::

#### Mantenedor de Biblioteca

Bibliotecas que visam versões do React Native abaixo de 0.71 podem usar uma `peerDependency` de `@types/react-native` para verificar tipos contra a versão de tipagens do app. Esta dependência deve ser marcada como opcional em [`peerDependenciesMeta`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependenciesmeta) para que as tipagens não sejam necessárias para usuários sem TypeScript ou para usuários da 0.71 onde as tipagens são integradas.

#### Mantenedor de Declarações TypeScript que Dependem de `@types/react-native`

Confira as [breaking changes introduzidas com 0.71](https://github.com/facebook/react-native/blob/main/CHANGELOG.md) para ver se você está pronto para migrar.

### E se Eu Usar Flow?

Usuários de Flow podem continuar a verificar tipos de aplicações visando 0.71+ mas a lógica de configuração para isso não está mais incluída por padrão no template.

Usuários de Flow anteriormente atualizavam os tipos Flow do React Native mesclando o `.flowconfig` do novo template de app e atualizando manualmente o `flow-bin`. O novo template de app não tem mais um `.flowconfig`, mas [um ainda está presente no repositório do React Native](https://github.com/facebook/react-native/blob/main/.flowconfig) que pode ser usado como base para seu app.

Se você precisar iniciar um novo app React Native em Flow, você pode referenciar o [novo template de app da 0.70](https://github.com/facebook/react-native/tree/0.70-stable/template).

### E se Eu Encontrar um Bug na Declaração TypeScript?

Independentemente de você estar usando tipos TS integrados ou `@types/react-native`, se você encontrar um bug por favor envie um PR tanto para o repositório [React Native](https://github.com/facebook/react-native) quanto para o [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). Se você não souber como corrigir, por favor registre uma issue no GitHub no repositório do React Native e mencione [@lunaleaps](https://github.com/lunaleaps) na issue.

## A Documentação é TypeScript First

Para garantir uma experiência TypeScript consistente, fizemos várias atualizações na documentação do React Native para refletir o TypeScript como a nova linguagem padrão.

Os exemplos de código agora permitem TypeScript inline e mais de 170 exemplos de código interativos foram atualizados para passar por linting, formatação e verificação de tipos no novo template. A maioria dos exemplos é válida tanto como TypeScript quanto como JavaScript. Onde eles são incompatíveis, você pode visualizar o exemplo em qualquer linguagem.

Se você encontrar um erro ou tiver uma melhoria, lembre-se que o site também é open source e adoraríamos ver seus PRs!

## Obrigado à comunidade TypeScript do React Native!

Para concluir, queremos reconhecer todo o trabalho feito ao longo dos anos pela comunidade para garantir que o TypeScript seja utilizável pelos desenvolvedores React Native.

Queremos agradecer a todos os [contribuidores](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/index.d.ts#L3) que vêm mantendo `@types/react-native` desde [2015](https://github.com/DefinitelyTyped/DefinitelyTyped/commit/efce0c25ec532a4651859f10eda49e97a5716a42)! Vemos o esforço e cuidado que todos vocês dedicaram para garantir que os usuários do React Native tenham a melhor experiência.

Obrigado a [@acoates](https://github.com/acoates), [@eps1lon](https://github.com/eps1lon), [@kelset](https://github.com/kelset), [@tido64](https://github.com/tido64), [@Titozzz](https://github.com/Titozzz), e [@ZihanChen-MSFT](https://github.com/ZihanChen-MSFT) pela ajuda consultando, questionando, comunicando e revisando mudanças para mover os tipos TypeScript para o React Native.

Da mesma forma, queremos agradecer aos [mantenedores do `react-native-template-typescript`](https://github.com/react-native-community/react-native-template-typescript/graphs/contributors) por apoiar a experiência TypeScript para o desenvolvimento de novos apps no React Native desde o primeiro dia.

Estamos ansiosos para colaborar mais diretamente no repositório do React Native e continuar melhorando a experiência do desenvolvedor React Native!
