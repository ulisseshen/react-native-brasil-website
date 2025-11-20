---
ia-translated: true
id: alert
title: Alert
---

Inicia um diálogo de alerta com o título e mensagem especificados.

Opcionalmente forneça uma lista de botões. Tocar em qualquer botão disparará o respectivo callback onPress e dispensará o alerta. Por padrão, o único botão será um botão 'OK'.

Esta é uma API que funciona tanto no Android quanto no iOS e pode mostrar alertas estáticos. Alertas que solicitam ao usuário inserir algumas informações estão disponíveis apenas no iOS.

## Example

```SnackPlayer name=Alert%20Example&supportedPlatforms=ios,android
import React from 'react';
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
        <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;
```

## iOS

No iOS você pode especificar qualquer número de botões. Cada botão pode opcionalmente especificar um estilo ou ser enfatizado, as opções disponíveis são representadas pelo enum [AlertButtonStyle](#alertbuttonstyle-ios) e o campo `isPreferred` em [AlertButton](alert#alertbutton).

## Android

No Android no máximo três botões podem ser especificados. O Android tem um conceito de botão neutro, negativo e positivo:

- Se você especificar um botão, ele será o 'positivo' (como 'OK')
- Dois botões significam 'negativo', 'positivo' (como 'Cancel', 'OK')
- Três botões significam 'neutro', 'negativo', 'positivo' (como 'Later', 'Cancel', 'OK')

Alertas no Android podem ser dispensados tocando fora da caixa de alerta. Isso é desabilitado por padrão e pode ser habilitado fornecendo um parâmetro opcional [AlertOptions](alert#alertoptions) com a propriedade cancelable definida como `true`, ou seja,<br/>`{cancelable: true}`.

O evento de cancelamento pode ser tratado fornecendo uma propriedade de callback `onDismiss` dentro do parâmetro `options`.

### Example <div className="label android">Android</div>

```SnackPlayer name=Alert%20Android%20Dissmissable%20Example&supportedPlatforms=android
import React from 'react';
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Button title="Show alert" onPress={showAlert} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

---

# Reference

## Methods

### `alert()`

```tsx
static alert (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
);
```

**Parameters:**

| Name                                                       | Type                               | Description                                                                     |
| ---------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| title <div className="label basic required">Required</div> | string                             | O título do diálogo. Passar `null` ou string vazia ocultará o título.          |
| message                                                    | string                             | Uma mensagem opcional que aparece abaixo do título do diálogo.                  |
| buttons                                                    | [AlertButton](alert#alertbutton)[] | Um array opcional contendo a configuração de botões.                           |
| options                                                    | [AlertOptions](alert#alertoptions) | Uma configuração opcional do Alert.                                             |

---

### `prompt()` <div className="label ios">iOS</div>

```tsx
static prompt: (
  title: string,
  message?: string,
  callbackOrButtons?: ((text: string) => void) | AlertButton[],
  type?: AlertType,
  defaultValue?: string,
  keyboardType?: string,
);
```

Cria e exibe um prompt para inserir algum texto na forma de Alert.

**Parameters:**

| Name                                                       | Type                                            | Description                                                                                                                                                                                                                        |
| ---------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title <div className="label basic required">Required</div> | string                                          | O título do diálogo.                                                                                                                                                                                                               |
| message                                                    | string                                          | Uma mensagem opcional que aparece acima da entrada de texto.                                                                                                                                                                       |
| callbackOrButtons                                          | function<hr/>[AlertButton](alert#alertButton)[] | Se for passada uma função, ela será chamada com o valor do prompt<br/>`(text: string) => void`, quando o usuário tocar em 'OK'.<hr/>Se for passado um array, os botões serão configurados com base no conteúdo do array.          |
| type                                                       | [AlertType](alert#alerttype-ios)                | Isso configura a entrada de texto.                                                                                                                                                                                                 |
| defaultValue                                               | string                                          | O texto padrão na entrada de texto.                                                                                                                                                                                                |
| keyboardType                                               | string                                          | O tipo de teclado do primeiro campo de texto (se existir). Um dos [keyboardTypes](textinput#keyboardtype) do TextInput.                                                                                                            |
| options                                                    | [AlertOptions](alert#alertoptions)              | Uma configuração opcional do Alert.                                                                                                                                                                                                |

---

## Type Definitions

### AlertButtonStyle <div className="label ios">iOS</div>

Um estilo de botão de Alert do iOS.

| Type |
| ---- |
| enum |

**Constants:**

| Value           | Description                 |
| --------------- | --------------------------- |
| `'default'`     | Estilo de botão padrão.     |
| `'cancel'`      | Estilo de botão de cancelar.|
| `'destructive'` | Estilo de botão destrutivo. |

---

### AlertType <div className="label ios">iOS</div>

Um tipo de Alert do iOS.

| Type |
| ---- |
| enum |

**Constants:**

| Value              | Description                         |
| ------------------ | ----------------------------------- |
| `'default'`        | Alerta padrão sem entradas          |
| `'plain-text'`     | Alerta de entrada de texto simples  |
| `'secure-text'`    | Alerta de entrada de texto seguro   |
| `'login-password'` | Alerta de login e senha             |

---

### AlertButton

Um objeto descrevendo a configuração de um botão no alerta.

| Type             |
| ---------------- |
| array of objects |

**Objects properties:**

| Name                                             | Type                                           | Description                                                                             |
| ------------------------------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| text                                             | string                                         | Rótulo do botão.                                                                        |
| onPress                                          | function                                       | Função de callback quando o botão é pressionado.                                        |
| style <div className="label ios">iOS</div>       | [AlertButtonStyle](alert#alertbuttonstyle-ios) | Estilo do botão, no Android esta propriedade será ignorada.                             |
| isPreferred <div className="label ios">iOS</div> | boolean                                        | Se o botão deve ser enfatizado, no Android esta propriedade será ignorada.              |

---

### AlertOptions

| Type   |
| ------ |
| object |

**Properties:**

| Name                                                    | Type     | Description                                                                                                                                   |
| ------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| cancelable <div className="label android">Android</div> | boolean  | Define se o alerta pode ser dispensado tocando fora da caixa de alerta.                                                                      |
| userInterfaceStyle <div className="label ios">iOS</div> | string   | O estilo de interface usado para o alerta, pode ser definido como `light` ou `dark`, caso contrário o estilo padrão do sistema será usado.   |
| onDismiss <div className="label android">Android</div>  | function | Função de callback disparada quando o alerta foi dispensado.                                                                                 |
