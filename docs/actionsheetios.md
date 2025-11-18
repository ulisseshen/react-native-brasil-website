---
ia-translated: true
id: actionsheetios
title: ActionSheetIOS
---

Exibe o componente nativo [Action Sheet](https://developer.apple.com/design/human-interface-guidelines/ios/views/action-sheets/) do iOS.

## Exemplo

```SnackPlayer name=ActionSheetIOS%20Example&supportedPlatforms=ios
import React, {useState} from 'react';
import {ActionSheetIOS, Button, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [result, setResult] = useState('🔮');

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Generate number', 'Reset'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(String(Math.floor(Math.random() * 100) + 1));
        } else if (buttonIndex === 2) {
          setResult('🔮');
        }
      },
    );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.result}>{result}</Text>
        <Button onPress={onPress} title="Show Action Sheet" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  result: {
    fontSize: 64,
    textAlign: 'center',
  },
});

export default App;
```

# Referência

## Métodos

### `showActionSheetWithOptions()`

```tsx
static showActionSheetWithOptions: (
  options: ActionSheetIOSOptions,
  callback: (buttonIndex: number) => void,
);
```

Exibe um action sheet do iOS. O objeto `options` deve conter uma ou mais das seguintes propriedades:

- `options` (array de strings) - uma lista de títulos de botões (obrigatório)
- `cancelButtonIndex` (int) - índice do botão de cancelamento em `options`
- `cancelButtonTintColor` (string) - a [cor](colors) usada para alterar a cor do texto do botão de cancelamento
- `destructiveButtonIndex` (int ou array de ints) - índices dos botões destrutivos em `options`
- `title` (string) - um título para exibir acima do action sheet
- `message` (string) - uma mensagem para exibir abaixo do título
- `anchor` (number) - o nó ao qual o action sheet deve ser ancorado (usado para iPad)
- `tintColor` (string) - a [cor](colors) usada para títulos de botões não destrutivos
- `disabledButtonIndices` (array de números) - uma lista de índices de botões que devem ser desabilitados
- `userInterfaceStyle` (string) - o estilo de interface usado para o action sheet, pode ser definido como `light` ou `dark`, caso contrário, o estilo padrão do sistema será usado

A função 'callback' recebe um parâmetro, o índice baseado em zero do item selecionado.

Exemplo mínimo:

```tsx
ActionSheetIOS.showActionSheetWithOptions(
  {
    options: ['Cancel', 'Remove'],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 0,
  },
  buttonIndex => {
    if (buttonIndex === 1) {
      /* destructive action */
    }
  },
);
```

---

### `dismissActionSheet()`

```tsx
static dismissActionSheet();
```

Descarta o action sheet do iOS apresentado mais acima, se nenhum action sheet estiver presente, um aviso é exibido.

---

### `showShareActionSheetWithOptions()`

```tsx
static showShareActionSheetWithOptions: (
  options: ShareActionSheetIOSOptions,
  failureCallback: (error: Error) => void,
  successCallback: (success: boolean, method: string) => void,
);
```

Exibe o share sheet do iOS. O objeto `options` deve conter `message` e/ou `url` e pode adicionalmente ter `subject` ou `excludedActivityTypes`:

- `url` (string) - uma URL para compartilhar
- `message` (string) - uma mensagem para compartilhar
- `subject` (string) - um assunto para a mensagem
- `excludedActivityTypes` (array) - as atividades a serem excluídas do ActionSheet

:::note
Se `url` apontar para um arquivo local, ou for uma uri codificada em base64, o arquivo para o qual ela aponta será carregado e compartilhado diretamente. Desta forma, você pode compartilhar imagens, vídeos, arquivos PDF, etc. Se `url` apontar para um arquivo ou endereço remoto, ele deve estar em conformidade com o formato de URL conforme descrito em [RFC 2396](https://www.ietf.org/rfc/rfc2396.txt). Por exemplo, uma URL web sem um protocolo adequado (HTTP/HTTPS) não será compartilhada.
:::

A função 'failureCallback' recebe um parâmetro, um objeto de erro. A única propriedade definida neste objeto é uma propriedade opcional `stack` do tipo `string`.

A função 'successCallback' recebe dois parâmetros:

- um valor booleano indicando sucesso ou falha
- uma string que, no caso de sucesso, indica o método de compartilhamento
