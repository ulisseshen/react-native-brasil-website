---
ia-translated: true
id: switch
title: Switch
---

Renderiza um input booleano.

Este é um componente controlado que requer um callback `onValueChange` que atualiza a prop `value` para que o componente reflita as ações do usuário. Se a prop `value` não for atualizada, o componente continuará a renderizar a prop `value` fornecida ao invés do resultado esperado de quaisquer ações do usuário.

## Exemplo

```SnackPlayer name=Switch&supportedPlatforms=android,ios
import React, {useState} from 'react';
import {Switch, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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

---

# Referência

## Props

### [View Props](view.md#props)

Herda [View Props](view.md#props).

---

### `disabled`

Se verdadeiro, o usuário não será capaz de alternar o switch.

| Tipo | Padrão  |
| ---- | ------- |
| bool | `false` |

---

### `ios_backgroundColor` <div className="label ios">iOS</div>

No iOS, cor customizada para o background. Esta cor de background pode ser vista quando o valor do switch é `false` ou quando o switch está desabilitado (e o switch está translúcido).

| Tipo               |
| ------------------ |
| [color](colors.md) |

---

### `onChange`

Invocado quando o usuário tenta alterar o valor do switch. Recebe o evento de mudança como argumento. Se você quer apenas receber o novo valor, use `onValueChange` ao invés disso.

| Tipo     |
| -------- |
| function |

---

### `onValueChange`

Invocado quando o usuário tenta alterar o valor do switch. Recebe o novo valor como argumento. Se você quer ao invés disso receber um evento, use `onChange`.

| Tipo     |
| -------- |
| function |

---

### `ref`

Um setter de ref que será atribuído a um [element node](element-nodes) quando montado.

---

### `thumbColor`

Cor da alça do switch em primeiro plano. Se isto for definido no iOS, a alça do switch perderá sua sombra.

| Tipo               |
| ------------------ |
| [color](colors.md) |

---

### `trackColor`

Cores customizadas para a trilha do switch.

_iOS_: Quando o valor do switch é `false`, a trilha encolhe para dentro da borda. Se você quiser alterar a cor do background exposto pela trilha encolhida, use [`ios_backgroundColor`](switch.md#ios_backgroundColor).

| Tipo                                                         |
| ------------------------------------------------------------ |
| `md object: {false: [color](colors), true: [color](colors)}` |

---

### `value`

O valor do switch. Se verdadeiro, o switch estará ligado. O valor padrão é false.

| Tipo |
| ---- |
| bool |
