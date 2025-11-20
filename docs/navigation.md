---
id: navigation
title: Navegando Entre Telas
ia-translated: true
---

Aplicativos móveis raramente são compostos de uma única tela. Gerenciar a apresentação e a transição entre múltiplas telas é tipicamente tratado pelo que é conhecido como navigator.

Este guia cobre os vários componentes de navegação disponíveis no React Native. Se você está começando com navegação, provavelmente vai querer usar [React Navigation](navigation.md#react-navigation). React Navigation fornece uma solução de navegação direta, com a capacidade de apresentar navegação em pilha comum e padrões de navegação em abas tanto no Android quanto no iOS.

Se você está integrando React Native em um aplicativo que já gerencia navegação nativamente, ou procurando uma alternativa ao React Navigation, a seguinte biblioteca fornece navegação nativa em ambas as plataformas: [react-native-navigation](https://github.com/wix/react-native-navigation).

## React Navigation

A solução da comunidade para navegação é uma biblioteca standalone que permite aos desenvolvedores configurar as telas de um aplicativo com algumas linhas de código.

### Starter template

Se você está iniciando um novo projeto, você pode usar o template React Navigation para configurar rapidamente um novo projeto com [Expo](https://expo.dev/):

```shell
npx create-expo-app@latest --template react-navigation/template
```

Veja o `README.md` do projeto para mais informações sobre como começar.

### Installation and setup

Primeiro, você precisa instalá-los no seu projeto:

```shell
npm install @react-navigation/native @react-navigation/native-stack
```

Em seguida, instale as dependências peer necessárias. Você precisa executar comandos diferentes dependendo se seu projeto é um projeto gerenciado Expo ou um projeto bare React Native.

- Se você tem um projeto gerenciado Expo, instale as dependências com `expo`:

  ```shell
  npx expo install react-native-screens react-native-safe-area-context
  ```

- Se você tem um projeto bare React Native, instale as dependências com `npm`:

  ```shell
  npm install react-native-screens react-native-safe-area-context
  ```

  Para iOS com projeto bare React Native, certifique-se de ter [CocoaPods](https://cocoapods.org/) instalado. Então instale os pods para completar a instalação:

  ```shell
  cd ios
  pod install
  cd ..
  ```

Uma vez que você instalou e configurou as dependências, você pode passar para configurar seu projeto para usar React Navigation.

Ao usar React Navigation, você configura [navigators](https://reactnavigation.org/docs/glossary-of-terms#navigator) no seu aplicativo. Navigators lidam com a transição entre telas no seu aplicativo e fornecem UI como header, tab bar etc.

Agora você está pronto para compilar e executar seu aplicativo no dispositivo/simulador.

### Usage

Agora você pode criar um aplicativo com uma tela inicial e uma tela de perfil:

```tsx
import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

Neste exemplo, `RootStack` é um navigator com 2 telas (`Home` e `Profile`), definidas na propriedade `screens` em `createNativeStackNavigator`. Similarmente, você pode definir quantas telas quiser.

Você pode especificar opções como o título da tela para cada tela na propriedade `options` de cada tela. Cada definição de tela também precisa de uma propriedade `screen` que é um React component ou outro navigator.

Dentro de cada componente de tela, você pode usar o hook `useNavigation` para obter o objeto `navigation`, que tem vários métodos para vincular a outras telas. Por exemplo, você pode usar `navigation.navigate` para ir para a tela `Profile`:

```tsx
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}

function ProfileScreen({route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}
```

Este navigator `native-stack` usa as APIs nativas: `UINavigationController` no iOS e `Fragment` no Android, de modo que a navegação construída com `createNativeStackNavigator` se comportará da mesma forma e terá características de desempenho similares aos aplicativos construídos nativamente sobre essas APIs.

React Navigation também tem pacotes para diferentes tipos de navigators, como tabs e drawer. Você pode usá-los para implementar vários padrões no seu aplicativo.

Para uma introdução completa ao React Navigation, siga o [Guia de Introdução do React Navigation](https://reactnavigation.org/docs/getting-started).
