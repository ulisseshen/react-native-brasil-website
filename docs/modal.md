---
id: modal
title: Modal
ia-translated: true
---

O componente Modal é uma forma básica de apresentar conteúdo acima de uma view envolvente.

## Example

```SnackPlayer name=Modal&supportedPlatforms=android,ios
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
```

---

# Reference

## Props

### [View Props](view.md#props)

Herda [View Props](view.md#props).

---

### `animated`

:::warning Deprecated
Use a prop [`animationType`](modal.md#animationtype) em vez disso.
:::

---

### `animationType`

A prop `animationType` controla como o modal é animado.

Valores possíveis:

- `slide` desliza a partir da parte inferior
- `fade` aparece gradualmente
- `none` aparece sem animação

| Type                                | Default |
| ----------------------------------- | ------- |
| enum(`'none'`, `'slide'`, `'fade'`) | `none`  |

---

### `backdropColor`

O `backdropColor` do modal (ou cor de fundo do container do modal.) O padrão é `white` se não fornecido e transparent for `false`. Ignorado se `transparent` for `true`.

| Type            | Default |
| --------------- | ------- |
| [color](colors) | white   |

---

### `hardwareAccelerated` <div className="label android">Android</div>

A prop `hardwareAccelerated` controla se deve forçar aceleração de hardware para a janela subjacente.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `navigationBarTranslucent` <div className="label android">Android</div>

A prop `navigationBarTranslucent` determina se o seu modal deve ficar sob a barra de navegação do sistema. No entanto, `statusBarTranslucent` também precisa ser definido como `true` para tornar a barra de navegação translúcida.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `onDismiss` <div className="label ios">iOS</div>

A prop `onDismiss` permite passar uma função que será chamada assim que o modal for dispensado.

| Type     |
| -------- |
| function |

---

### `onOrientationChange` <div className="label ios">iOS</div>

O callback `onOrientationChange` é chamado quando a orientação muda enquanto o modal está sendo exibido. A orientação fornecida é apenas 'portrait' ou 'landscape'. Este callback também é chamado na renderização inicial, independentemente da orientação atual.

| Type     |
| -------- |
| function |

---

### `allowSwipeDismissal` <div className="label ios">iOS</div>

Controla se o modal pode ser dispensado deslizando para baixo no iOS.
Isso requer que você implemente a prop `onRequestClose` para lidar com a dispensa.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `ref`

Um setter de ref que será atribuído a um [element node](element-nodes) quando montado.

---

### `onRequestClose`

O callback `onRequestClose` é chamado quando o usuário toca no botão voltar do hardware no Android ou no botão de menu na Apple TV. Devido a esta prop obrigatória, esteja ciente de que eventos `BackHandler` não serão emitidos enquanto o modal estiver aberto.
No iOS, este callback é chamado quando um Modal está sendo dispensado usando um gesto de arrastar quando `presentationStyle` é `pageSheet` ou `formSheet`. Quando `allowSwipeDismissal` está habilitado, este callback será chamado após dispensar o modal.

| Type                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function <div className="label basic required">Required</div><div className="label android">Android</div><div className="label tv">TV</div><hr />function <div className="label ios">iOS</div> |

---

### `onShow`

A prop `onShow` permite passar uma função que será chamada assim que o modal for exibido.

| Type     |
| -------- |
| function |

---

### `presentationStyle` <div className="label ios">iOS</div>

A prop `presentationStyle` controla como o modal aparece (geralmente em dispositivos maiores como iPad ou iPhones Plus). Veja https://developer.apple.com/reference/uikit/uimodalpresentationstyle para detalhes.

Valores possíveis:

- `fullScreen` cobre a tela completamente
- `pageSheet` cobre a visualização de largura retrato centralizada (apenas em dispositivos maiores)
- `formSheet` cobre a visualização de largura estreita centralizada (apenas em dispositivos maiores)
- `overFullScreen` cobre a tela completamente, mas permite transparência

| Type                                                                   | Default                                                                             |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| enum(`'fullScreen'`, `'pageSheet'`, `'formSheet'`, `'overFullScreen'`) | `fullScreen` if `transparent={false}`<hr />`overFullScreen` if `transparent={true}` |

---

### `statusBarTranslucent` <div className="label android">Android</div>

A prop `statusBarTranslucent` determina se o seu modal deve ficar sob a barra de status do sistema.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `supportedOrientations` <div className="label ios">iOS</div>

A prop `supportedOrientations` permite que o modal seja rotacionado para qualquer uma das orientações especificadas. No iOS, o modal ainda é restrito pelo que está especificado no campo UISupportedInterfaceOrientations do Info.plist do seu aplicativo.

:::note
Ao usar `presentationStyle` de `pageSheet` ou `formSheet`, esta propriedade será ignorada no iOS.
:::

| Type                                                                                                           | Default        |
| -------------------------------------------------------------------------------------------------------------- | -------------- |
| array of enums(`'portrait'`, `'portrait-upside-down'`, `'landscape'`, `'landscape-left'`, `'landscape-right'`) | `['portrait']` |

---

### `transparent`

A prop `transparent` determina se o seu modal preencherá toda a view. Definir isso como `true` renderizará o modal sobre um fundo transparente.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `visible`

A prop `visible` determina se o seu modal está visível.

| Type | Default |
| ---- | ------- |
| bool | `true`  |
