---
ia-translated: true
id: handling-touches
title: Manipulando Toques
---

Os usuários interagem com apps mobile principalmente através do toque. Eles podem usar uma combinação de gestos, como tocar em um botão, rolar uma lista ou dar zoom em um mapa. React Native fornece componentes para manipular todos os tipos de gestos comuns, bem como um [sistema gesture responder](gesture-responder-system.md) abrangente para permitir um reconhecimento de gestos mais avançado, mas o componente que você provavelmente estará mais interessado é o Button básico.

## Exibindo um botão básico

[Button](button.md) fornece um componente de botão básico que é renderizado bem em todas as plataformas. O exemplo mínimo para exibir um botão se parece com isso:

```tsx
<Button
  onPress={() => {
    console.log('You tapped the button!');
  }}
  title="Press Me"
/>
```

Isso renderizará um label azul no iOS e um retângulo arredondado azul com texto claro no Android. Pressionar o botão chamará a função "onPress", que neste caso exibe um popup de alerta. Se você quiser, pode especificar uma prop "color" para alterar a cor do seu botão.

![](/docs/assets/Button.png)

Vá em frente e brinque com o componente `Button` usando o exemplo abaixo. Você pode selecionar em qual plataforma seu app é visualizado clicando no toggle no canto inferior direito e então clicando em "Tap to Play" para visualizar o app.

```SnackPlayer name=Button%20Basics
import React from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';

const ButtonBasics = () => {
  const onPress = () => {
    Alert.alert('You tapped the button!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Press Me" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Press Me" color="#841584" />
      </View>
      <View style={styles.alternativeLayoutButtonContainer}>
        <Button onPress={onPress} title="This looks great!" />
        <Button onPress={onPress} title="OK!" color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ButtonBasics;
```

## Touchables

Se o botão básico não parecer certo para seu app, você pode construir seu próprio botão usando qualquer um dos componentes "Touchable" fornecidos pelo React Native. Esses componentes fornecem a capacidade de capturar gestos de toque e podem exibir feedback quando um gesto é reconhecido. No entanto, esses componentes não fornecem nenhum estilo padrão, então você precisará fazer um pouco de trabalho para deixá-los bonitos em seu app.

Qual componente "Touchable" você usa dependerá de que tipo de feedback você quer fornecer:

- Geralmente, você pode usar [**TouchableHighlight**](touchablehighlight.md) em qualquer lugar onde você usaria um button ou link na web. O fundo da view ficará mais escuro quando o usuário pressionar o botão.

- Você pode considerar usar [**TouchableNativeFeedback**](touchablenativefeedback.md) no Android para exibir ripples de reação de superfície de tinta que respondem ao toque do usuário.

- [**TouchableOpacity**](touchableopacity.md) pode ser usado para fornecer feedback reduzindo a opacidade do botão, permitindo que o fundo seja visto através enquanto o usuário está pressionando.

- Se você precisa manipular um gesto de toque mas não quer que nenhum feedback seja exibido, use [**TouchableWithoutFeedback**](touchablewithoutfeedback.md).

Em alguns casos, você pode querer detectar quando um usuário pressiona e segura uma view por um período de tempo definido. Esses pressionamentos longos podem ser manipulados passando uma função para as props `onLongPress` de qualquer um dos componentes "Touchable".

Vamos ver todos eles em ação:

```SnackPlayer name=Touchables
import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Touchables = () => {
  const onPressButton = () => {
    Alert.alert('You tapped the button!');
  };

  const onLongPressButton = () => {
    Alert.alert('You long-pressed the button!');
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPressButton} underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>
      <TouchableNativeFeedback
        onPress={onPressButton}
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackground()
            : undefined
        }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            TouchableNativeFeedback{' '}
            {Platform.OS !== 'android' ? '(Android only)' : ''}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableHighlight
        onPress={onPressButton}
        onLongPress={onLongPressButton}
        underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Touchable with Long Press</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});

export default Touchables;
```

## Rolagem e deslizamento

Gestos comumente usados em dispositivos com telas tocáveis incluem swipes e pans. Esses permitem que o usuário role através de uma lista de itens ou deslize através de páginas de conteúdo. Para estes, confira o [ScrollView](scrollview.md) Core Component.

## Problemas conhecidos

- [react-native#29308](https://github.com/facebook/react-native/issues/29308#issuecomment-792864162): A área de toque nunca se estende além dos limites da view pai e no Android margem negativa não é suportada.
