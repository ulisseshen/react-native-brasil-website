---
ia-translated: true
id: i18nmanager
title: I18nManager
---

# I18nManager

O módulo `I18nManager` fornece utilitários para gerenciar o suporte a layout da Direita para a Esquerda (RTL) para idiomas como Árabe, Hebraico e outros. Ele fornece métodos para controlar o comportamento RTL e verificar a direção atual do layout.

## Examples

### Alterar posições e animações baseadas em RTL

Se você posicionar elementos de forma absoluta para alinhá-los com outros elementos flexbox, eles podem não alinhar em idiomas RTL. Usar `isRTL` pode ser usado para ajustar o alinhamento ou animações.

```SnackPlayer name=I18nManager%20Change%20Absolute%20Positions%20And%20Animations
import React from 'react';
import {I18nManager, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  // Change to `true` to see the effect in a non-RTL language
  const isRTL = I18nManager.isRTL;
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View
          style={{
            position: 'absolute',
            left: isRTL ? undefined : 0,
            right: isRTL ? 0 : undefined,
          }}>
          {isRTL ? <Text>Back &gt;</Text> : <Text>&lt; Back</Text>}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

### Durante o Desenvolvimento

```SnackPlayer name=I18nManager%20During%20Development
import React, {useState} from 'react';
import {Alert, I18nManager, StyleSheet, Switch, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [rtl, setRTL] = useState(I18nManager.isRTL);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.forceRtl}>
            <Text>Force RTL in Development:</Text>
            <Switch
              value={rtl}
              onValueChange={value => {
                setRTL(value);
                I18nManager.forceRTL(value);
                Alert.alert(
                  'Reload this page',
                  'Please reload this page to change the UI direction! ' +
                    'All examples in this app will be affected. ' +
                    'Check them out to see what they look like in RTL layout.',
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  forceRtl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
```

# Reference

## Properties

### `isRTL`

```typescript
static isRTL: boolean;
```

Um valor booleano indicando se o aplicativo está atualmente no modo de layout RTL.

O valor de `isRTL` é determinado pela seguinte lógica:

- Se `forceRTL` for `true`, `isRTL` retorna `true`
- Se `allowRTL` for `false`, `isRTL` retorna `false`
- Caso contrário, `isRTL` será `true` dado o seguinte:
  - **iOS:**
    - O idioma preferido do usuário no dispositivo é um idioma RTL
    - As localizações definidas pelo aplicativo incluem o idioma escolhido pelo usuário (conforme definido no arquivo de projeto do Xcode (`knownRegions = (...)`)
  - **Android:**
    - O idioma preferido do usuário no dispositivo é um idioma RTL
    - O `AndroidManifest.xml` do aplicativo define `android:supportsRTL="true"` no elemento `<application>`

### `doLeftAndRightSwapInRTL`

```typescript
static doLeftAndRightSwapInRTL: boolean;
```

Um valor booleano indicando se as propriedades de estilo left e right devem ser automaticamente trocadas quando em modo RTL. Quando habilitado, left se torna right e right se torna left em layouts RTL.

## Methods

### `allowRTL()`

```typescript
static allowRTL: (allowRTL: boolean) => void;
```

Habilita ou desabilita o suporte a layout RTL para o aplicativo.

**Parameters:**

- `allowRTL` (boolean): Se deve permitir layout RTL

**Important Notes:**

- As alterações entram em vigor na próxima inicialização do aplicativo, não imediatamente
- Esta configuração é persistida entre reinicializações do aplicativo

### `forceRTL()`

```typescript
static forceRTL: (forced: boolean) => void;
```

Força o aplicativo a usar layout RTL independentemente das configurações de idioma do dispositivo. Isso é principalmente útil para testar layouts RTL durante o desenvolvimento.

Evite forçar RTL em aplicativos de produção, pois requer uma reinicialização completa do aplicativo para entrar em vigor, o que resulta em uma experiência de usuário ruim.

**Parameters:**

- `forced` (boolean): Se deve forçar o layout RTL

**Important Notes:**

- As alterações entram em vigor completo na próxima inicialização do aplicativo, não imediatamente
- A configuração é persistida entre reinicializações do aplicativo
- Destinado apenas para desenvolvimento e testes. Em produção, você deve desabilitar RTL completamente ou lidar com isso apropriadamente (veja `isRTL`)

### `swapLeftAndRightInRTL()`

```typescript
static swapLeftAndRightInRTL: (swapLeftAndRight: boolean) => void;
```

Troca propriedades de estilo left e right no modo RTL. Quando habilitado, left se torna right e right se torna left em layouts RTL. Não afeta o valor de `isRTL`.
