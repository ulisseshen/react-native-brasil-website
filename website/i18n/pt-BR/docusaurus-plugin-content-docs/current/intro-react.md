---
ia-translated: true
id: intro-react
title: Fundamentos do React
description: Para entender completamente o React Native, você precisa de uma base sólida em React. Esta breve introdução ao React pode ajudá-lo a começar ou relembrar os conceitos.
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native é executado sobre [React](https://react.dev/), uma biblioteca popular de código aberto para construir interfaces de usuário com JavaScript. Para aproveitar ao máximo o React Native, é útil entender o React em si. Esta seção pode ajudá-lo a começar ou servir como um curso de atualização.

Vamos cobrir os conceitos fundamentais por trás do React:

- components
- JSX
- props
- state

Se você quiser se aprofundar, recomendamos que consulte a [documentação oficial do React](https://react.dev/learn).

## Seu primeiro component

O restante desta introdução ao React usa gatos em seus exemplos: criaturas amigáveis e acessíveis que precisam de nomes e um café para trabalhar. Aqui está seu primeiro component Cat:

```SnackPlayer name=Your%20Cat
import React from 'react';
import {Text} from 'react-native';

const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};

export default Cat;
```

Veja como fazer isso: Para definir seu component `Cat`, primeiro use o [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) do JavaScript para importar o React e o Core Component [`Text`](/docs/next/text) do React Native:

```tsx
import React from 'react';
import {Text} from 'react-native';
```

Seu component começa como uma função:

```tsx
const Cat = () => {};
```

Você pode pensar nos components como plantas. O que quer que um function component retorne é renderizado como um **React element.** React elements permitem que você descreva o que deseja ver na tela.

Aqui o component `Cat` renderizará um elemento `<Text>`:

```tsx
const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};
```

Você pode exportar seu function component com o [`export default`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) do JavaScript para uso em todo o seu aplicativo assim:

```tsx
const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};

export default Cat;
```

:::tip
Esta é uma das muitas maneiras de exportar seu component. Este tipo de exportação funciona bem com o Snack Player. No entanto, dependendo da estrutura de arquivos do seu aplicativo, você pode precisar usar uma convenção diferente. Esta [folha de dicas útil sobre imports e exports do JavaScript](https://medium.com/dailyjs/javascript-module-cheatsheet-7bd474f1d829) pode ajudar.
:::

Agora dê uma olhada mais de perto nessa instrução `return`. `<Text>Hello, I am your cat!</Text>` está usando um tipo de sintaxe JavaScript que torna conveniente escrever elementos: JSX.

## JSX

React e React Native usam **JSX,** uma sintaxe que permite escrever elementos dentro do JavaScript assim: `<Text>Hello, I am your cat!</Text>`. A documentação do React tem [um guia abrangente sobre JSX](https://react.dev/learn/writing-markup-with-jsx) que você pode consultar para aprender ainda mais. Como JSX é JavaScript, você pode usar variáveis dentro dele. Aqui você está declarando um nome para o gato, `name`, e incorporando-o com chaves dentro de `<Text>`.

```SnackPlayer name=Curly%20Braces
import React from 'react';
import {Text} from 'react-native';

const Cat = () => {
  const name = 'Maru';
  return <Text>Hello, I am {name}!</Text>;
};

export default Cat;
```

Qualquer expressão JavaScript funcionará entre chaves, incluindo chamadas de função como `{getFullName("Rum", "Tum", "Tugger")}`:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Curly%20Braces&ext=js
import React from 'react';
import {Text} from 'react-native';

const getFullName = (firstName, secondName, thirdName) => {
  return firstName + ' ' + secondName + ' ' + thirdName;
};

const Cat = () => {
  return <Text>Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>;
};

export default Cat;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Curly%20Braces&ext=tsx
import React from 'react';
import {Text} from 'react-native';

const getFullName = (
  firstName: string,
  secondName: string,
  thirdName: string,
) => {
  return firstName + ' ' + secondName + ' ' + thirdName;
};

const Cat = () => {
  return <Text>Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>;
};

export default Cat;
```

</TabItem>
</Tabs>

Você pode pensar nas chaves como criando um portal para a funcionalidade JS no seu JSX!

:::tip
Como JSX está incluído na biblioteca React, ele não funcionará se você não tiver `import React from 'react'` no topo do seu arquivo!
:::

## Custom Components

Você já conheceu os [Core Components do React Native](intro-react-native-components). React permite que você aninhe esses components dentro uns dos outros para criar novos components. Esses components aninhados e reutilizáveis estão no coração do paradigma do React.

Por exemplo, você pode aninhar [`Text`](text) e [`TextInput`](textinput) dentro de um [`View`](view) abaixo, e o React Native irá renderizá-los juntos:

```SnackPlayer name=Custom%20Components
import React from 'react';
import {Text, TextInput, View} from 'react-native';

const Cat = () => {
  return (
    <View>
      <Text>Hello, I am...</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Name me!"
      />
    </View>
  );
};

export default Cat;
```

#### Developer notes

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android", "web"])}>

<TabItem value="web">

:::info
Se você está familiarizado com desenvolvimento web, `<View>` e `<Text>` podem lembrá-lo de HTML! Você pode pensar neles como as tags `<div>` e `<p>` do desenvolvimento de aplicações.
:::

</TabItem>
<TabItem value="android">

:::info
No Android, você geralmente coloca suas views dentro de `LinearLayout`, `FrameLayout`, `RelativeLayout`, etc. para definir como os filhos da view serão organizados na tela. No React Native, `View` usa Flexbox para o layout de seus filhos. Você pode aprender mais no [nosso guia sobre layout com Flexbox](flexbox).
:::

</TabItem>
</Tabs>

Você pode renderizar este component várias vezes e em vários lugares sem repetir seu código usando `<Cat>`:

```SnackPlayer name=Multiple%20Components
import React from 'react';
import {Text, View} from 'react-native';

const Cat = () => {
  return (
    <View>
      <Text>I am also a cat!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
};

export default Cafe;
```

Qualquer component que renderiza outros components é um **parent component.** Aqui, `Cafe` é o parent component e cada `Cat` é um **child component.**

Você pode colocar quantos gatos quiser no seu café. Cada `<Cat>` renderiza um elemento único—que você pode customizar com props.

## Props

**Props** é a abreviação de "properties". Props permitem que você customize components React. Por exemplo, aqui você passa para cada `<Cat>` um `name` diferente para o `Cat` renderizar:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Multiple%20Props&ext=js
import React from 'react';
import {Text, View} from 'react-native';

const Cat = props => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </View>
  );
};

export default Cafe;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Multiple%20Props&ext=tsx
import React from 'react';
import {Text, View} from 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </View>
  );
};

export default Cafe;
```

</TabItem>
</Tabs>

A maioria dos Core Components do React Native também pode ser customizada com props. Por exemplo, ao usar [`Image`](image), você passa a ele um prop chamado [`source`](image#source) para definir qual imagem ele mostra:

```SnackPlayer name=Props
import React from 'react';
import {Text, View, Image} from 'react-native';

const CatApp = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
        }}
        style={{width: 200, height: 200}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
};

export default CatApp;
```

`Image` tem [muitos props diferentes](image#props), incluindo [`style`](image#style), que aceita um objeto JS de pares propriedade-valor relacionados a design e layout.

:::note
Observe as chaves duplas `{{ }}` ao redor de `style`'s width e height. No JSX, valores JavaScript são referenciados com `{}`. Isso é útil se você está passando algo diferente de uma string como props, como um array ou número: `<Cat food={["fish", "kibble"]} age={2} />`. No entanto, objetos JS **_também_** são indicados com chaves: `{width: 200, height: 200}`. Portanto, para passar um objeto JS no JSX, você deve envolver o objeto em **outro par** de chaves: `{{width: 200, height: 200}}`
:::

Você pode construir muitas coisas com props e os Core Components [`Text`](text), [`Image`](image) e [`View`](view)! Mas para construir algo interativo, você precisará de state.

## State

Enquanto você pode pensar em props como argumentos que você usa para configurar como os components renderizam, **state** é como o armazenamento de dados pessoal de um component. State é útil para lidar com dados que mudam ao longo do tempo ou que vêm da interação do usuário. State dá aos seus components memória!

:::info
Como regra geral, use props para configurar um component quando ele renderiza. Use state para rastrear quaisquer dados do component que você espera que mudem ao longo do tempo.
:::

O exemplo a seguir ocorre em um café de gatos onde dois gatos famintos estão esperando para serem alimentados. A fome deles, que esperamos que mude ao longo do tempo (ao contrário de seus nomes), é armazenada como state. Para alimentar os gatos, pressione seus botões—o que atualizará seu state.

Você pode adicionar state a um component chamando o [Hook `useState` do React](https://react.dev/learn/state-a-components-memory). Um Hook é um tipo de função que permite que você se "conecte" aos recursos do React. Por exemplo, `useState` é um Hook que permite adicionar state a function components. Você pode aprender mais sobre [outros tipos de Hooks na documentação do React.](https://react.dev/reference/react)

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=State&ext=js
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

const Cat = props => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=State&ext=tsx
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

</TabItem>
</Tabs>

Primeiro, você vai querer importar `useState` do React assim:

```tsx
import React, {useState} from 'react';
```

Então você declara o state do component chamando `useState` dentro de sua função. Neste exemplo, `useState` cria uma variável de state `isHungry`:

```tsx
const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);
  // ...
};
```

:::tip
Você pode usar `useState` para rastrear qualquer tipo de dado: strings, números, Booleans, arrays, objetos. Por exemplo, você pode rastrear o número de vezes que um gato foi acariciado com `const [timesPetted, setTimesPetted] = useState(0)`!
:::

Chamar `useState` faz duas coisas:

- cria uma "variável de state" com um valor inicial—neste caso a variável de state é `isHungry` e seu valor inicial é `true`
- cria uma função para definir o valor dessa variável de state—`setIsHungry`

Não importa quais nomes você usa. Mas pode ser útil pensar no padrão como `[<getter>, <setter>] = useState(<initialValue>)`.

Em seguida, você adiciona o Core Component [`Button`](button) e dá a ele um prop `onPress`:

```tsx
<Button
  onPress={() => {
    setIsHungry(false);
  }}
  //..
/>
```

Agora, quando alguém pressiona o botão, `onPress` será disparado, chamando `setIsHungry(false)`. Isso define a variável de state `isHungry` como `false`. Quando `isHungry` é false, o prop `disabled` do `Button` é definido como `true` e seu `title` também muda:

```tsx
<Button
  //..
  disabled={!isHungry}
  title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
/>
```

:::info
Você pode ter notado que, embora `isHungry` seja uma [const](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const), ela é aparentemente reatribuível! O que está acontecendo é que quando uma função de definição de state como `setIsHungry` é chamada, seu component será re-renderizado. Neste caso, a função `Cat` será executada novamente—e desta vez, `useState` nos dará o próximo valor de `isHungry`.
:::

Finalmente, coloque seus gatos dentro de um component `Cafe`:

```tsx
const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};
```

:::info
Vê o `<>` e `</>` acima? Esses pedaços de JSX são [fragments](https://react.dev/reference/react/Fragment). Elementos JSX adjacentes devem ser envolvidos em uma tag delimitadora. Fragments permitem que você faça isso sem aninhar um elemento envolvente extra e desnecessário como `View`.
:::

---

Agora que você cobriu tanto o React quanto os Core Components do React Native, vamos nos aprofundar em alguns desses core components observando o [tratamento de `<TextInput>`](handling-text-input).
