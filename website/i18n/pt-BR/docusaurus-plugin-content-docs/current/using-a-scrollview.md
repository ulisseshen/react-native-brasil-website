---
id: using-a-scrollview
title: Usando um ScrollView
ia-translated: true
---

O [ScrollView](scrollview.md) é um container genérico de rolagem que pode conter múltiplos componentes e views. Os itens roláveis podem ser heterogêneos, e você pode rolar tanto verticalmente quanto horizontalmente (configurando a propriedade `horizontal`).

Este exemplo cria um `ScrollView` vertical com imagens e texto misturados.

```SnackPlayer name=Using%20ScrollView
import React from 'react';
import {Image, ScrollView, Text} from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

const App = () => (
  <ScrollView>
    <Text style={{fontSize: 96}}>Scroll me plz</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>If you like</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>Scrolling down</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>What's the best</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>Framework around?</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 80}}>React Native</Text>
  </ScrollView>
);

export default App;
```

ScrollViews podem ser configurados para permitir paginação através de views usando gestos de deslize, utilizando a prop `pagingEnabled`. Deslizar horizontalmente entre views também pode ser implementado no Android usando o componente [ViewPager](https://github.com/react-native-community/react-native-viewpager).

No iOS, um ScrollView com um único item pode ser usado para permitir que o usuário dê zoom no conteúdo. Configure as props `maximumZoomScale` e `minimumZoomScale` e seu usuário será capaz de usar gestos de pinça e expansão para aumentar e diminuir o zoom.

O ScrollView funciona melhor para apresentar um pequeno número de itens de tamanho limitado. Todos os elementos e views de um `ScrollView` são renderizados, mesmo que não estejam sendo exibidos na tela no momento. Se você tiver uma lista longa de itens que não cabem na tela, você deve usar um `FlatList` em vez disso. Então vamos [aprender sobre list views](using-a-listview.md) a seguir.
