---
ia-translated: true
id: tutorial
title: Aprenda o Básico
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native é como React, mas usa componentes nativos em vez de componentes web como blocos de construção. Então, para entender a estrutura básica de um app React Native, você precisa entender alguns dos conceitos básicos do React, como JSX, components, `state` e `props`. Se você já conhece React, ainda precisa aprender algumas coisas específicas do React Native, como os componentes nativos. Este tutorial é destinado a todos os públicos, independentemente de você ter experiência com React ou não.

Vamos fazer isso.

## Hello World

De acordo com as antigas tradições do nosso povo, primeiro devemos construir um app que não faz nada além de dizer "Hello, world!". Aqui está:

```SnackPlayer name=Hello%20World
import React from 'react';
import {Text, View} from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default HelloWorldApp;
```

Se você estiver curioso, pode brincar com o código de exemplo diretamente nos simuladores web. Você também pode colá-lo no seu arquivo `App.js` para criar um app real na sua máquina local.

## O que está acontecendo aqui?

1. Primeiro de tudo, precisamos importar `React` para poder usar `JSX`, que será então transformado nos componentes nativos de cada plataforma.
2. Na linha 2, importamos os componentes `Text` e `View` do `react-native`

Então definimos a função `HelloWorldApp`, que é um [function component](https://react.dev/reference/react/Component) e se comporta da mesma maneira que no React para a web. Esta função retorna um componente `View` com alguns estilos e um `Text` como seu filho.

O componente `Text` nos permite renderizar um texto, enquanto o componente `View` renderiza um container. Este container tem vários estilos aplicados, vamos analisar o que cada um está fazendo.

O primeiro estilo que encontramos é `flex: 1`, a prop [`flex`](layout-props#flex) vai definir como seus itens vão "preencher" o espaço disponível ao longo do seu eixo principal. Como temos apenas um container, ele ocupará todo o espaço disponível do componente pai. Neste caso, é o único componente, então ele ocupará todo o espaço disponível da tela.

O estilo seguinte é [`justifyContent`](layout-props#justifycontent): "center". Isso alinha os filhos de um container no centro do eixo principal do container. Finalmente, temos [`alignItems`](layout-props#alignitems): "center", que alinha os filhos de um container no centro do eixo transversal do container.

Algumas coisas aqui podem não parecer JavaScript para você. Não entre em pânico. _Este é o futuro_.

Primeiro de tudo, ES2015 (também conhecido como ES6) é um conjunto de melhorias para JavaScript que agora faz parte do padrão oficial, mas ainda não é suportado por todos os navegadores, então muitas vezes ainda não é usado no desenvolvimento web. React Native vem com suporte ES2015, então você pode usar isso sem se preocupar com compatibilidade. `import`, `export`, `const` e `from` no exemplo acima são todos recursos do ES2015. Se você não está familiarizado com ES2015, provavelmente pode aprender lendo código de exemplo como este tutorial tem. Se quiser, [esta página](https://babeljs.io/learn-es2015/) tem uma boa visão geral dos recursos do ES2015.

A outra coisa incomum neste exemplo de código é `<View><Text>Hello world!</Text></View>`. Isso é JSX - uma sintaxe para incorporar XML dentro de JavaScript. Muitos frameworks usam uma linguagem de template especializada que permite incorporar código dentro de linguagem de marcação. No React, isso é invertido. JSX permite que você escreva sua linguagem de marcação dentro do código. Parece HTML na web, exceto que em vez de coisas web como `<div>` ou `<span>`, você usa componentes React. Neste caso, `<Text>` é um [Core Component](intro-react-native-components) que exibe algum texto e `View` é como o `<div>` ou `<span>`.

## Components

Então este código está definindo `HelloWorldApp`, um novo `Component`. Quando você está construindo um app React Native, você estará criando novos componentes frequentemente. Qualquer coisa que você vê na tela é algum tipo de componente.

## Props

A maioria dos componentes pode ser personalizada quando são criados, com diferentes parâmetros. Esses parâmetros de criação são chamados de props.

Seus próprios componentes também podem usar `props`. Isso permite que você faça um único componente que é usado em muitos lugares diferentes no seu app, com propriedades ligeiramente diferentes em cada lugar. Refira-se a `props.YOUR_PROP_NAME` nos seus componentes funcionais ou `this.props.YOUR_PROP_NAME` nos seus componentes de classe. Aqui está um exemplo:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Hello%20Props&ext=js
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

const Greeting = props => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

export default LotsOfGreetings;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Hello%20Props&ext=tsx
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

type GreetingProps = {
  name: string;
};

const Greeting = (props: GreetingProps) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

export default LotsOfGreetings;
```

</TabItem>
</Tabs>

Usar `name` como prop nos permite personalizar o componente `Greeting`, para que possamos reutilizar esse componente para cada uma das nossas saudações. Este exemplo também usa o componente `Greeting` em JSX. O poder de fazer isso é o que torna React tão legal.

A outra coisa nova acontecendo aqui é o componente [`View`](view.md). Um [`View`](view.md) é útil como um container para outros componentes, para ajudar a controlar estilo e layout.

Com `props` e os componentes básicos [`Text`](text.md), [`Image`](image.md) e [`View`](view.md), você pode construir uma grande variedade de telas estáticas. Para aprender como fazer seu app mudar ao longo do tempo, você precisa [aprender sobre State](#state).

## State

Ao contrário das props [que são somente leitura](https://react.dev/reference/react/Component#props) e não devem ser modificadas, o `state` permite que componentes React alterem sua saída ao longo do tempo em resposta a ações do usuário, respostas de rede e qualquer outra coisa.

#### Qual é a diferença entre state e props no React?

Em um componente React, as props são as variáveis que passamos de um componente pai para um componente filho. Da mesma forma, o state também são variáveis, com a diferença de que elas não são passadas como parâmetros, mas sim que o componente as inicializa e gerencia internamente.

#### Existem diferenças entre React e React Native para lidar com o state?

<div className="two-columns">

```tsx
// ReactJS Counter Example using Hooks!

import React, {useState} from 'react';



const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <p>You clicked {count} times</p>
      <button
        onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
};


// CSS
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

```

```tsx
// React Native Counter Example using Hooks!

import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

</div>

Como mostrado acima, não há diferença no tratamento do `state` entre [React](https://react.dev/learn/state-a-components-memory) e `React Native`. Você pode usar o state dos seus componentes tanto em classes quanto em componentes de função usando [hooks](https://react.dev/reference/react/useState)!

No exemplo a seguir, mostraremos o mesmo exemplo de contador acima usando classes.

```SnackPlayer name=Hello%20Classes
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

class App extends Component {
  state = {
    count: 0,
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
```
