---
ia-translated: true
id: drawerlayoutandroid
title: DrawerLayoutAndroid
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Componente React que encapsula o `DrawerLayout` da plataforma (somente Android). O Drawer (normalmente usado para navegação) é renderizado com `renderNavigationView` e os filhos diretos são a view principal (onde seu conteúdo fica). A view de navegação inicialmente não está visível na tela, mas pode ser puxada da lateral da janela especificada pela prop `drawerPosition` e sua largura pode ser definida pela prop `drawerWidth`.

## Example

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=js
import React, {useRef, useState} from 'react';
import {Button, DrawerLayoutAndroid, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
          <Button
            title="Change Drawer Position"
            onPress={() => changeDrawerPosition()}
          />
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </SafeAreaView>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=tsx
import React, {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# Reference

## Props

### [View Props](view.md#props)

Herda [View Props](view.md#props).

---

### `drawerBackgroundColor`

Especifica a cor de fundo do drawer. O valor padrão é `white`. Se você quiser definir a opacidade do drawer, use rgba. Exemplo:

```tsx
return (
  <DrawerLayoutAndroid drawerBackgroundColor="rgba(0,0,0,0.5)" />
);
```

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `drawerLockMode`

Especifica o modo de bloqueio do drawer. O drawer pode ser bloqueado em 3 estados:

- unlocked (padrão), significando que o drawer responderá (abrir/fechar) a gestos de toque.
- locked-closed, significando que o drawer permanecerá fechado e não responderá a gestos.
- locked-open, significando que o drawer permanecerá aberto e não responderá a gestos. O drawer ainda pode ser aberto e fechado programaticamente (`openDrawer`/`closeDrawer`).

| Type                                             | Required |
| ------------------------------------------------ | -------- |
| enum('unlocked', 'locked-closed', 'locked-open') | No       |

---

### `drawerPosition`

Especifica o lado da tela de onde o drawer deslizará. Por padrão, é definido como `left`.

| Type                  | Required |
| --------------------- | -------- |
| enum('left', 'right') | No       |

---

### `drawerWidth`

Especifica a largura do drawer, mais precisamente a largura da view que pode ser puxada da borda da janela.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `keyboardDismissMode`

Determina se o teclado é dispensado em resposta a um arrasto.

- 'none' (o padrão), arrastos não dispensam o teclado.
- 'on-drag', o teclado é dispensado quando um arrasto começa.

| Type                    | Required |
| ----------------------- | -------- |
| enum('none', 'on-drag') | No       |

---

### `onDrawerClose`

Função chamada sempre que a view de navegação for fechada.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerOpen`

Função chamada sempre que a view de navegação for aberta.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerSlide`

Função chamada sempre que houver uma interação com a view de navegação.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerStateChanged`

Função chamada quando o estado do drawer mudou. O drawer pode estar em 3 estados:

- idle, significando que não há interação com a view de navegação acontecendo no momento
- dragging, significando que há atualmente uma interação com a view de navegação
- settling, significando que houve uma interação com a view de navegação, e a view de navegação agora está finalizando sua animação de fechamento ou abertura

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderNavigationView`

A view de navegação que será renderizada ao lado da tela e pode ser puxada.

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### `statusBarBackgroundColor`

Faz o drawer ocupar a tela inteira e desenhar o fundo da barra de status para permitir que ele abra sobre a barra de status. Isso terá efeito somente em API 21+.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

## Métodos

### `closeDrawer()`

```tsx
closeDrawer();
```

Fecha o drawer.

---

### `openDrawer()`

```tsx
openDrawer();
```

Abre o drawer.
