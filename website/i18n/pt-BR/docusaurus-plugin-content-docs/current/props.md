---
ia-translated: true
id: props
title: Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

A maioria dos componentes pode ser customizada quando são criados, com diferentes parâmetros. Esses parâmetros criados são chamados de `props`, abreviação de properties (propriedades).

Por exemplo, um componente básico do React Native é o `Image`. Quando você cria uma imagem, você pode usar um prop chamado `source` para controlar qual imagem ela mostra.

```SnackPlayer name=Props
import React from 'react';
import {Image} from 'react-native';

const Bananas = () => {
  let pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
  };
  return (
    <Image source={pic} style={{width: 193, height: 110, marginTop: 50}} />
  );
};

export default Bananas;
```

Observe as chaves ao redor de `{pic}` - elas incorporam a variável `pic` no JSX. Você pode colocar qualquer expressão JavaScript dentro de chaves no JSX.

Seus próprios componentes também podem usar `props`. Isso permite que você crie um único componente que seja usado em muitos lugares diferentes no seu app, com propriedades ligeiramente diferentes em cada lugar, referenciando `props` na sua função `render`. Aqui está um exemplo:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Props&ext=js
import React from 'react';
import {Text, View} from 'react-native';

const Greeting = props => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={{alignItems: 'center', top: 50}}>
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

```SnackPlayer name=Props&ext=tsx
import React from 'react';
import {Text, View} from 'react-native';

type GreetingProps = {
  name: string;
};

const Greeting = (props: GreetingProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={{alignItems: 'center', top: 50}}>
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

Usar `name` como um prop nos permite customizar o componente `Greeting`, para que possamos reutilizar esse componente para cada uma de nossas saudações. Este exemplo também usa o componente `Greeting` em JSX, similar aos [Core Components](intro-react-native-components). O poder de fazer isso é o que torna o React tão legal - se você deseja ter um conjunto diferente de primitivas de UI para trabalhar, você pode inventar novas.

A outra coisa nova acontecendo aqui é o componente [`View`](view.md). Um [`View`](view.md) é útil como um container para outros componentes, para ajudar a controlar estilo e layout.

Com `props` e os componentes básicos [`Text`](text.md), [`Image`](image.md) e [`View`](view.md), você pode construir uma grande variedade de telas estáticas. Para aprender como fazer seu app mudar ao longo do tempo, você precisa [aprender sobre State](state.md).
