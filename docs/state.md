---
ia-translated: true
id: state
title: State
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Existem dois tipos de dados que controlam um componente: `props` e `state`. As `props` são definidas pelo componente pai e são fixas durante todo o tempo de vida de um componente. Para dados que vão mudar, temos que usar `state`.

Em geral, você deve inicializar o `state` no constructor, e então chamar `setState` quando quiser alterá-lo.

Por exemplo, digamos que queremos fazer um texto que pisca o tempo todo. O texto em si é definido uma vez quando o componente piscante é criado, então o texto em si é um `prop`. O "se o texto está atualmente ligado ou desligado" muda com o tempo, então isso deve ser mantido no `state`.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=State&ext=js
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

const Blink = props => {
  const [isShowingText, setIsShowingText] = useState(true);

  useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(!isShowingText);
    }, 1000);

    return () => clearInterval(toggle);
  });

  if (!isShowingText) {
    return null;
  }

  return <Text>{props.text}</Text>;
};

const BlinkApp = () => {
  return (
    <View style={{marginTop: 50}}>
      <Blink text="I love to blink" />
      <Blink text="Yes blinking is so great" />
      <Blink text="Why did they ever take this out of HTML" />
      <Blink text="Look at me look at me look at me" />
    </View>
  );
};

export default BlinkApp;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=State&ext=tsx
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

type BlinkProps = {
  text: string;
};

const Blink = (props: BlinkProps) => {
  const [isShowingText, setIsShowingText] = useState(true);

  useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(!isShowingText);
    }, 1000);

    return () => clearInterval(toggle);
  });

  if (!isShowingText) {
    return null;
  }

  return <Text>{props.text}</Text>;
};

const BlinkApp = () => {
  return (
    <View style={{marginTop: 50}}>
      <Blink text="I love to blink" />
      <Blink text="Yes blinking is so great" />
      <Blink text="Why did they ever take this out of HTML" />
      <Blink text="Look at me look at me look at me" />
    </View>
  );
};

export default BlinkApp;
```

</TabItem>
</Tabs>

Em uma aplicação real, você provavelmente não estará definindo state com um timer. Você pode definir state quando tiver novos dados do servidor, ou de entrada do usuário. Você também pode usar um container de state como [Redux](https://redux.js.org/) ou [MobX](https://mobx.js.org/) para controlar seu fluxo de dados. Nesse caso, você usaria Redux ou MobX para modificar seu state em vez de chamar `setState` diretamente.

Quando setState é chamado, BlinkApp irá re-renderizar seu Component. Ao chamar setState dentro do Timer, o componente irá re-renderizar toda vez que o Timer dispara.

State funciona da mesma forma que no React, então para mais detalhes sobre manipulação de state, você pode consultar a [React.Component API](https://react.dev/reference/react/Component#setstate). Neste ponto, você pode ter notado que a maioria dos nossos exemplos usa a cor de texto padrão. Para personalizar a cor do texto, você terá que [aprender sobre Style](style.md).
