---
ia-translated: true
id: backhandler
title: BackHandler
---

A API BackHandler detecta pressões de botões físicos para navegação de retorno, permite que você registre event listeners para a ação de voltar do sistema e permite que você controle como sua aplicação responde. É exclusiva para Android.

As subscriptions de eventos são chamadas em ordem reversa (ou seja, a última subscription registrada é chamada primeiro).

- **Se uma subscription retornar true,** então as subscriptions registradas anteriormente não serão chamadas.
- **Se nenhuma subscription retornar true ou nenhuma estiver registrada,** ela invoca programaticamente a funcionalidade padrão do botão de voltar para sair do aplicativo.

:::warning Aviso para usuários de Modal
Se seu aplicativo mostrar um `Modal` aberto, `BackHandler` não publicará nenhum evento ([veja a documentação de `Modal`](modal#onrequestclose)).
:::

## Pattern

```tsx
const subscription = BackHandler.addEventListener(
  'hardwareBackPress',
  function () {
    /**
     * this.onMainScreen and this.goBack are just examples,
     * you need to use your own implementation here.
     *
     * Typically you would use the navigator here to go to the last state.
     */

    if (!this.onMainScreen()) {
      this.goBack();
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      return true;
    }
    /**
     * Returning false will let the event to bubble up & let other event listeners
     * or the system's default back action to be executed.
     */
    return false;
  },
);

// Unsubscribe the listener on unmount
subscription.remove();
```

## Example

O exemplo a seguir implementa um cenário onde você confirma se o usuário deseja sair do aplicativo:

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, {useEffect} from 'react';
import {Text, StyleSheet, BackHandler, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Click Back button!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
```

`BackHandler.addEventListener` cria um event listener e retorna um objeto `NativeEventSubscription` que deve ser limpo usando o método `NativeEventSubscription.remove`.

## Usage with React Navigation

Se você está usando React Navigation para navegar entre diferentes telas, você pode seguir o guia deles sobre [Comportamento customizado do botão de voltar no Android](https://reactnavigation.org/docs/custom-android-back-button-handling/)

## Backhandler hook

[React Native Hooks](https://github.com/react-native-community/hooks#usebackhandler) tem um hook `useBackHandler` muito útil que simplificará o processo de configurar event listeners.

---

# Reference

## Methods

### `addEventListener()`

```tsx
static addEventListener(
  eventName: BackPressEventName,
  handler: () => boolean | null | undefined,
): NativeEventSubscription;
```

---

### `exitApp()`

```tsx
static exitApp();
```
