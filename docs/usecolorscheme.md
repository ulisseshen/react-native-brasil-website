---
ia-translated: true
id: usecolorscheme
title: useColorScheme
---

```tsx
import {useColorScheme} from 'react-native';
```

O Hook React `useColorScheme` fornece e se inscreve para atualizações de esquema de cores do módulo [`Appearance`](appearance). O valor de retorno indica o esquema de cores preferido atual do usuário. O valor pode ser atualizado posteriormente, seja através de ação direta do usuário (por exemplo, seleção de tema nas configurações do dispositivo) ou em um cronograma (por exemplo, temas claro e escuro que seguem o ciclo dia/noite).

### Esquemas de cores suportados

- `"light"`: O usuário prefere um tema de cores claro.
- `"dark"`: O usuário prefere um tema de cores escuro.
- `null`: O usuário não indicou um tema de cores preferido.

---

## Exemplo

```SnackPlayer
import React from 'react';
import {Text, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>useColorScheme(): {colorScheme}</Text>
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
});

export default App;
```

Você pode encontrar um exemplo completo que demonstra o uso deste hook juntamente com um contexto React para adicionar suporte a temas claro e escuro à sua aplicação em [`AppearanceExample.js`](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/Appearance/AppearanceExample.js).
