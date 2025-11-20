---
ia-translated: true
id: button
title: Button
---

Um componente básico de botão que deve renderizar bem em qualquer plataforma. Suporta um nível mínimo de customização.

Se este botão não parecer adequado para seu aplicativo, você pode criar seu próprio botão usando [Pressable](pressable). Para inspiração, veja o [código-fonte do componente Button](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/Button.js).

```tsx
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## Exemplo

```SnackPlayer name=Button%20Example
import React from 'react';
import {StyleSheet, Button, View, Text, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          The title and onPress handler are required. It is recommended to set
          accessibilityLabel to help make your app usable by everyone.
        </Text>
        <Button
          title="Press me"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          Adjust the color in a way that looks standard on each platform. On
          iOS, the color prop controls the color of the text. On Android, the
          color adjusts the background color of the button.
        </Text>
        <Button
          title="Press me"
          color="#f194ff"
          onPress={() => Alert.alert('Button with adjusted color pressed')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          All interaction for the component are disabled.
        </Text>
        <Button
          title="Press me"
          disabled
          onPress={() => Alert.alert('Cannot press this one')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          This layout strategy lets the title define the width of the button.
        </Text>
        <View style={styles.fixToText}>
          <Button
            title="Left button"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="Right button"
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

---

# Referência

## Props

### <div className="label required basic">Required</div>**`onPress`**

Handler a ser chamado quando o usuário toca no botão.

| Type                                           |
| ---------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)})` |

---

### <div className="label required basic">Required</div>**`title`**

Texto a ser exibido dentro do botão. No Android, o título fornecido será convertido para maiúsculas.

| Type   |
| ------ |
| string |

---

### `accessibilityLabel`

Texto a ser exibido para recursos de acessibilidade para cegueira.

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

Um valor indicando qual idioma deve ser usado pelo leitor de tela quando o usuário interage com o elemento. Deve seguir a [especificação BCP 47](https://www.rfc-editor.org/info/bcp47).

Veja a [documentação do `accessibilityLanguage` do iOS](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage) para mais informações.

| Type   |
| ------ |
| string |

---

### `accessibilityActions`

As ações de acessibilidade permitem que uma tecnologia assistiva invoque programaticamente as ações de um componente. A propriedade `accessibilityActions` deve conter uma lista de objetos de ação. Cada objeto de ação deve conter os campos name e label.

Veja o [guia de Acessibilidade](accessibility.md#accessibility-actions) para mais informações.

| Type  | Required |
| ----- | -------- |
| array | No       |

---

### `onAccessibilityAction`

Invocado quando o usuário executa as ações de acessibilidade. O único argumento desta função é um evento contendo o nome da ação a ser executada.

Veja o [guia de Acessibilidade](accessibility.md#accessibility-actions) para mais informações.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `color`

Cor do texto (iOS), ou cor de fundo do botão (Android).

```mdx-code-block
export function ColorDefaults() {
  return (
    <>
      <ins style={{ background: "#2196F3" }} className="color-box" />{" "}<code>'#2196F3'</code>
      {" "}<div className="label android">Android</div>
      <hr />
      <ins style={{ background: "#007AFF" }} className="color-box" />{" "}<code>'#007AFF'</code>
      {" "}<div className="label ios">iOS</div>
    </>
  );
}
```

| Type            | Default          |
| --------------- | ---------------- |
| [color](colors) | <ColorDefaults/> |

---

### `disabled`

Se `true`, desabilita todas as interações para este componente.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `hasTVPreferredFocus` <div className="label tv">TV</div>

Foco preferencial para TV.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `nextFocusDown` <div className="label android">Android</div><div className="label tv">TV</div>

Designa a próxima view a receber o foco quando o usuário navega para baixo. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div><div className="label tv">TV</div>

Designa a próxima view a receber o foco quando o usuário navega para frente. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div><div className="label tv">TV</div>

Designa a próxima view a receber o foco quando o usuário navega para a esquerda. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div><div className="label tv">TV</div>

Designa a próxima view a receber o foco quando o usuário navega para a direita. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div><div className="label tv">TV</div>

Designa a próxima view a receber o foco quando o usuário navega para cima. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp).

| Type   |
| ------ |
| number |

---

### `testID`

Usado para localizar esta view em testes end-to-end.

| Type   |
| ------ |
| string |

---

### `touchSoundDisabled` <div className="label android">Android</div>

Se `true`, não reproduz o som do sistema ao tocar.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |
