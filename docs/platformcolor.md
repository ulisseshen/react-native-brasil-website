---
ia-translated: true
id: platformcolor
title: PlatformColor
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

```js
PlatformColor(color1, [color2, ...colorN]);
```

Você pode usar a função `PlatformColor` para acessar cores nativas na plataforma de destino fornecendo o valor de string correspondente da cor nativa. Você passa uma string para a função `PlatformColor` e, desde que ela exista naquela plataforma, ela retornará a cor nativa correspondente, que você pode aplicar em qualquer parte da sua aplicação.

Se você passar mais de um valor de string para a função `PlatformColor`, ela tratará o primeiro valor como padrão e o restante como fallback.

```js
PlatformColor('bogusName', 'linkColor');
```

Como as cores nativas podem ser sensíveis a temas e/ou alto contraste, essa lógica específica da plataforma também se traduz dentro dos seus componentes.

### Cores suportadas

Para uma lista completa dos tipos de cores de sistema suportadas, consulte:

- Android:
  - [R.attr](https://developer.android.com/reference/android/R.attr) - prefixo `?attr`
  - [R.color](https://developer.android.com/reference/android/R.color) - prefixo `@android:color`
- iOS (notações Objective-C e Swift):
  - [UIColor Standard Colors](https://developer.apple.com/documentation/uikit/uicolor/standard_colors)
  - [UIColor UI Element Colors](https://developer.apple.com/documentation/uikit/uicolor/ui_element_colors)

#### Notas para desenvolvedores

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["web"])}>

<TabItem value="web">

:::info
Se você está familiarizado com design systems, outra forma de pensar sobre isso é que o `PlatformColor` permite que você acesse os tokens de cor do design system local para que seu app possa se integrar perfeitamente!
:::

</TabItem>
</Tabs>

## Exemplo

```SnackPlayer name=PlatformColor%20Example&supportedPlatforms=android,ios
import React from 'react';
import {Platform, PlatformColor, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>I am a special label color!</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  label: {
    padding: 16,
    fontWeight: '800',
    ...Platform.select({
      ios: {
        color: PlatformColor('label'),
        backgroundColor: PlatformColor('systemTealColor'),
      },
      android: {
        color: PlatformColor('?android:attr/textColor'),
        backgroundColor: PlatformColor('@android:color/holo_blue_bright'),
      },
      default: {color: 'black'},
    }),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

O valor de string fornecido para a função `PlatformColor` deve corresponder à string como ela existe na plataforma nativa onde o app está sendo executado. Para evitar erros em tempo de execução, a função deve ser envolvida em uma verificação de plataforma, seja através de um `Platform.OS === 'platform'` ou um `Platform.select()`, como mostrado no exemplo acima.

:::note
Você pode encontrar um exemplo completo que demonstra o uso adequado e intencional do `PlatformColor` em [PlatformColorExample.js](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/PlatformColor/PlatformColorExample.js).
:::
