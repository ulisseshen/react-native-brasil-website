---
ia-translated: true
id: appstate
title: AppState
---

`AppState` pode informar se o aplicativo está em primeiro plano ou em segundo plano, e notificá-lo quando o estado mudar.

AppState é frequentemente usado para determinar a intenção e o comportamento adequado ao lidar com notificações push.

### App States

- `active` - O aplicativo está sendo executado em primeiro plano
- `background` - O aplicativo está sendo executado em segundo plano. O usuário está:
  - em outro aplicativo
  - na tela inicial
  - [Android] em outra `Activity` (mesmo que tenha sido iniciada pelo seu aplicativo)
- [iOS] `inactive` - Este é um estado que ocorre ao fazer a transição entre primeiro plano e segundo plano, e durante períodos de inatividade, como ao entrar na visualização de multitarefa, abrir a Central de Notificações ou no caso de uma chamada recebida.

Para mais informações, consulte [a documentação da Apple](https://developer.apple.com/documentation/uikit/app_and_scenes/managing_your_app_s_life_cycle)

## Basic Usage

Para ver o estado atual, você pode verificar `AppState.currentState`, que será mantido atualizado. No entanto, `currentState` será null na inicialização enquanto `AppState` o recupera pela bridge.

```SnackPlayer name=AppState%20Example
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Current state is: {appStateVisible}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStateExample;
```

Este exemplo sempre parecerá mostrar "Current state is: active" porque o aplicativo só é visível para o usuário quando no estado `active`, e o estado null ocorrerá apenas momentaneamente. Se você quiser experimentar com o código, recomendamos usar seu próprio dispositivo ao invés da prévia incorporada.

---

# Reference

## Events

### `change`

Este evento é recebido quando o estado do aplicativo mudou. O listener é chamado com um dos [valores atuais do estado do aplicativo](appstate#app-states).

### `memoryWarning`

Este evento é usado quando há necessidade de lançar um aviso de memória ou liberá-la.

### `focus` <div className="label android">Android</div>

Recebido quando o aplicativo ganha foco (o usuário está interagindo com o aplicativo).

### `blur` <div className="label android">Android</div>

Recebido quando o usuário não está interagindo ativamente com o aplicativo. Útil em situações em que o usuário puxa para baixo a [gaveta de notificações](https://developer.android.com/guide/topics/ui/notifiers/notifications#bar-and-drawer). `AppState` não mudará, mas o evento `blur` será disparado.

## Methods

### `addEventListener()`

```tsx
static addEventListener(
  type: AppStateEvent,
  listener: (state: AppStateStatus) => void,
): NativeEventSubscription;
```

Configura uma função que será chamada sempre que o tipo de evento especificado em AppState ocorrer. Valores válidos para `eventType` estão [listados acima](#events). Retorna o `EventSubscription`.

## Properties

### `currentState`

```tsx
static currentState: AppStateStatus;
```
