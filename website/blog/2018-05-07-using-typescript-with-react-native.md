---
ia-translated: true
title: Usando TypeScript com React Native
author: Ash Furrow
authorTitle: Software Engineer at Artsy
authorURL: 'https://github.com/ashfurrow'
authorImageURL: 'https://avatars2.githubusercontent.com/u/498212?s=460&v=4'
authorTwitter: ashfurrow
tags: [engineering]
---

JavaScript! Todos nós amamos. Mas alguns de nós também amamos [tipos](https://en.wikipedia.org/wiki/Data_type). Felizmente, existem opções para adicionar tipos mais fortes ao JavaScript. Minha favorita é [TypeScript](https://www.typescriptlang.org), mas React Native suporta [Flow](https://flow.org) out of the box. Qual você prefere é uma questão de preferência, cada um tem sua própria abordagem de como adicionar a mágica dos tipos ao JavaScript. Hoje, vamos ver como usar TypeScript em apps React Native.

Este post usa o repositório [TypeScript-React-Native-Starter](https://github.com/Microsoft/TypeScript-React-Native-Starter) da Microsoft como um guia.

**Atualização**: Desde que este blog post foi escrito, as coisas ficaram ainda mais fáceis. Você pode substituir toda a configuração descrita neste blog post executando apenas um comando:

```sh
npx react-native init MyAwesomeProject --template react-native-template-typescript
```

No entanto, _existem_ algumas limitações ao suporte do Babel ao TypeScript, sobre as quais o blog post acima entra em detalhes. Os passos descritos _neste_ post ainda funcionam, e a Artsy ainda está usando [react-native-typescript-transformer](https://github.com/ds300/react-native-typescript-transformer) em produção, mas a maneira mais rápida de começar com React Native e TypeScript é usando o comando acima. Você sempre pode mudar depois se precisar.

Em todo caso, divirta-se! O blog post original continua abaixo.

## Pré-requisitos

Como você pode estar desenvolvendo em uma de várias plataformas diferentes, visando vários tipos diferentes de dispositivos, a configuração básica pode ser envolvente. Você deve primeiro garantir que pode executar um app React Native simples sem TypeScript. Siga [as instruções no site do React Native para começar](/docs/getting-started). Quando você conseguir fazer deploy para um dispositivo ou emulador, estará pronto para começar um app React Native TypeScript.

Você também precisará de [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com) e [Yarn](https://yarnpkg.com/lang/en).

## Inicialização

Uma vez que você tenha tentado criar um projeto React Native comum, você estará pronto para começar a adicionar TypeScript. Vamos em frente e fazer isso.

```sh
react-native init MyAwesomeProject
cd MyAwesomeProject
```

## Adicionando TypeScript

O próximo passo é adicionar TypeScript ao seu projeto. Os seguintes comandos irão:

- adicionar TypeScript ao seu projeto
- adicionar [React Native TypeScript Transformer](https://github.com/ds300/react-native-typescript-transformer) ao seu projeto
- inicializar um arquivo de configuração TypeScript vazio, que configuraremos a seguir
- adicionar um arquivo de configuração React Native TypeScript Transformer vazio, que configuraremos a seguir
- adiciona [typings](https://github.com/DefinitelyTyped/DefinitelyTyped) para React e React Native

Ok, vamos em frente e executar esses.

```sh
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

O arquivo `tsconfig.json` contém todas as configurações para o compilador TypeScript. Os padrões criados pelo comando acima são em sua maioria bons, mas abra o arquivo e descomente a seguinte linha:

```js
{
  /* Search the config file for the following line and uncomment it. */
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
}
```

O `rn-cli.config.js` contém as configurações para o React Native TypeScript Transformer. Abra-o e adicione o seguinte:

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
```

## Migrando para TypeScript

Renomeie os arquivos `App.js` e `__tests_/App.js` gerados para `App.tsx`. `index.js` precisa usar a extensão `.js`. Todos os novos arquivos devem usar a extensão `.tsx` (ou `.ts` se o arquivo não contiver JSX).

Se você tentasse executar o app agora, receberia um erro como `object prototype may only be an object or null`. Isso é causado por uma falha ao importar o export padrão do React, bem como um export nomeado na mesma linha. Abra `App.tsx` e modifique o import no topo do arquivo:

```diff
-import React, { Component } from 'react';
+import React from 'react'
+import { Component } from 'react';
```

Parte disso tem a ver com diferenças em como Babel e TypeScript interoperam com módulos CommonJS. No futuro, os dois irão se estabilizar no mesmo comportamento.

Neste ponto, você deve ser capaz de executar o app React Native.

## Adicionando Infraestrutura de Teste TypeScript

React Native vem com [Jest](https://github.com/facebook/jest), então para testar um app React Native com TypeScript, queremos adicionar [ts-jest](https://www.npmjs.com/package/ts-jest) às nossas `devDependencies`.

```sh
yarn add --dev ts-jest
```

Então, abriremos nosso `package.json` e substituiremos o campo `jest` pelo seguinte:

```js
{
  "jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "transform": {
      "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "testPathIgnorePatterns": [
      "\\.snap$",
      "<rootDir>/node_modules/"
    ],
    "cacheDirectory": ".jest/cache"
  }
}
```

Isso configurará o Jest para executar arquivos `.ts` e `.tsx` com `ts-jest`.

## Instalando Declarações de Tipo de Dependência

Para obter a melhor experiência em TypeScript, queremos que o verificador de tipos entenda a forma e API de nossas dependências. Algumas bibliotecas publicarão seus pacotes com arquivos `.d.ts` (arquivos de declaração de tipo/definição de tipo), que podem descrever a forma do JavaScript subjacente. Para outras bibliotecas, precisaremos instalar explicitamente o pacote apropriado no escopo npm `@types/`.

Por exemplo, aqui precisaremos de tipos para Jest, React e React Native, e React Test Renderer.

```ts
yarn add --dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

Salvamos esses pacotes de arquivo de declaração em nossas dependências de _dev_ porque este é um _app_ React Native que usa essas dependências apenas durante o desenvolvimento e não durante o runtime. Se estivéssemos publicando uma biblioteca no NPM, poderíamos ter que adicionar algumas dessas dependências de tipo como dependências regulares.

Você pode ler mais [aqui sobre obter arquivos `.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).

## Ignorando Mais Arquivos

Para seu controle de código-fonte, você vai querer começar a ignorar a pasta `.jest`. Se você está usando git, podemos apenas adicionar entradas ao nosso arquivo `.gitignore`.

```config
# Jest
#
.jest/
```

Como um checkpoint, considere commitar seus arquivos no controle de versão.

```sh
git init
git add .gitignore # import to do this first, to ignore our files
git add .
git commit -am "Initial commit."
```

## Adicionando um Componente

Vamos adicionar um componente ao nosso app. Vamos em frente e criar um componente `Hello.tsx`. É um componente pedagógico, não algo que você realmente escreveria em um app, mas algo não trivial que mostra como usar TypeScript em React Native.

Crie um diretório `components` e adicione o seguinte exemplo.

```ts
// components/Hello.tsx
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  enthusiasmLevel: number;
}

export class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error(
        'You could be a little more enthusiastic. :D',
      );
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
    };
  }

  onIncrement = () =>
    this.setState({
      enthusiasmLevel: this.state.enthusiasmLevel + 1,
    });
  onDecrement = () =>
    this.setState({
      enthusiasmLevel: this.state.enthusiasmLevel - 1,
    });
  getExclamationMarks = (numChars: number) =>
    Array(numChars + 1).join('!');

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Hello{' '}
          {this.props.name +
            this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
              color="blue"
            />
          </View>
        </View>
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});
```

Uau! Isso é muito, mas vamos decompor:

- Em vez de renderizar elementos HTML como `div`, `span`, `h1`, etc., estamos renderizando componentes como `View` e `Button`. Esses são componentes nativos que funcionam em diferentes plataformas.
- O estilo é especificado usando a função `StyleSheet.create` que o React Native nos fornece. As stylesheets do React nos permitem controlar nosso layout usando Flexbox, e estilizar usando outros constructos similares aos do CSS.

## Adicionando um Teste de Componente

Agora que temos um componente, vamos tentar testá-lo.

Já temos o Jest instalado como test runner. Vamos escrever testes snapshot para nossos componentes, vamos adicionar o add-on necessário para testes snapshot:

```sh
yarn add --dev react-addons-test-utils
```

Agora vamos criar uma pasta `__tests__` no diretório `components` e adicionar um teste para `Hello.tsx`:

```ts
// components/__tests__/Hello.tsx
import React from 'react';
import renderer from 'react-test-renderer';

import {Hello} from '../Hello';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(<Hello name="World" enthusiasmLevel={1} />)
    .toJSON();
  expect(button).toMatchSnapshot();
});
```

A primeira vez que o teste é executado, ele criará um snapshot do componente renderizado e o armazenará no arquivo `components/__tests__/__snapshots__/Hello.tsx.snap`. Quando você modificar seu componente, precisará atualizar os snapshots e revisar a atualização para mudanças inadvertidas. Você pode ler mais sobre testar componentes React Native [aqui](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).

## Próximos Passos

Confira o [tutorial oficial do React](https://reactjs.org/tutorial/tutorial.html) e a biblioteca de gerenciamento de estado [Redux](https://redux.js.org). Esses recursos podem ser úteis ao escrever apps React Native. Além disso, você pode querer olhar para [ReactXP](https://microsoft.github.io/reactxp/), uma biblioteca de componentes escrita inteiramente em TypeScript que suporta tanto React na web quanto React Native.

Divirta-se em um ambiente de desenvolvimento React Native mais type-safe!
