---
ia-translated: true
id: accessibilityinfo
title: AccessibilityInfo
---

Às vezes é útil saber se o dispositivo possui ou não um leitor de tela que está ativo no momento. A API `AccessibilityInfo` foi projetada para esse propósito. Você pode usá-la para consultar o estado atual do leitor de tela, bem como para se registrar e ser notificado quando o estado do leitor de tela mudar.

## Example

```SnackPlayer name=AccessibilityInfo%20Example&supportedPlatforms=android,ios
import React, {useState, useEffect} from 'react';
import {AccessibilityInfo, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      isReduceMotionEnabled => {
        setReduceMotionEnabled(isReduceMotionEnabled);
      },
    );
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      isScreenReaderEnabled => {
        setScreenReaderEnabled(isScreenReaderEnabled);
      },
    );

    AccessibilityInfo.isReduceMotionEnabled().then(isReduceMotionEnabled => {
      setReduceMotionEnabled(isReduceMotionEnabled);
    });
    AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
      setScreenReaderEnabled(isScreenReaderEnabled);
    });

    return () => {
      reduceMotionChangedSubscription.remove();
      screenReaderChangedSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.status}>
          The reduce motion is {reduceMotionEnabled ? 'enabled' : 'disabled'}.
        </Text>
        <Text style={styles.status}>
          The screen reader is {screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
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
  status: {
    margin: 30,
  },
});

export default App;
```

---

# Reference

## Methods

### `addEventListener()`

```tsx
static addEventListener(
  eventName: AccessibilityChangeEventName | AccessibilityAnnouncementEventName,
  handler: (
    event: AccessibilityChangeEvent | AccessibilityAnnouncementFinishedEvent,
  ) => void,
): EmitterSubscription;
```

Adiciona um manipulador de eventos. Eventos suportados:

| Nome do evento                                                                           | Descrição                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityServiceChanged`<br/><div className="label two-lines android">Android</div> | Dispara quando alguns serviços como TalkBack, outras tecnologias assistivas do Android e serviços de acessibilidade de terceiros são ativados. O argumento para o manipulador de eventos é um boolean. O boolean é `true` quando algum serviço de acessibilidade está ativado e `false` caso contrário.                   |
| `announcementFinished`<br/><div className="label two-lines ios">iOS</div>                | Dispara quando o leitor de tela terminou de fazer um anúncio. O argumento para o manipulador de eventos é um dicionário com estas chaves:<ul><li>`announcement`: A string anunciada pelo leitor de tela.</li><li>`success`: Um boolean indicando se o anúncio foi feito com sucesso.</li></ul>                            |
| `boldTextChanged`<br/><div className="label two-lines ios">iOS</div>                     | Dispara quando o estado da alternância de texto em negrito muda. O argumento para o manipulador de eventos é um boolean. O boolean é `true` quando texto em negrito está ativado e `false` caso contrário.                                                                                                                |
| `grayscaleChanged`<br/><div className="label two-lines ios">iOS</div>                    | Dispara quando o estado da alternância de escala de cinza muda. O argumento para o manipulador de eventos é um boolean. O boolean é `true` quando a escala de cinza está ativada e `false` caso contrário.                                                                                                                |
| `invertColorsChanged`<br/><div className="label two-lines ios">iOS</div>                 | Dispara quando o estado da alternância de inversão de cores muda. O argumento para o manipulador de eventos é um boolean. O boolean é `true` quando a inversão de cores está ativada e `false` caso contrário.                                                                                                            |
| `reduceMotionChanged`                                                                    | Dispara quando o estado da alternância de redução de movimento muda. O argumento para o manipulador de eventos é um boolean. O boolean é `true` quando a redução de movimento está ativada (ou quando "Transition Animation Scale" em "Developer options" está como "Animation off") e `false` caso contrário.            |
| `reduceTransparencyChanged`<br/><div className="label two-lines ios">iOS</div>           | Dispara quando o estado da alternância de redução de transparência muda. O argumento para o manipulador de eventos é um boolean. O boolean é `true` quando a redução de transparência está ativada e `false` caso contrário.                                                                                              |
| `screenReaderChanged`                                                                    | Dispara quando o estado do leitor de tela muda. O argumento para o manipulador de eventos é um boolean. O boolean é `true` quando um leitor de tela está ativado e `false` caso contrário.                                                                                                                                |

---

### `announceForAccessibility()`

```tsx
static announceForAccessibility(announcement: string);
```

Posta uma string para ser anunciada pelo leitor de tela.

---

### `announceForAccessibilityWithOptions()`

```tsx
static announceForAccessibilityWithOptions(
  announcement: string,
  options: {queue?: boolean},
);
```

Posta uma string para ser anunciada pelo leitor de tela com opções de modificação. Por padrão, os anúncios interromperão qualquer fala existente, mas no iOS eles podem ser enfileirados atrás da fala existente definindo `queue` como `true` no objeto de opções.

**Parameters:**

| Nome                                                              | Tipo   | Descrição                                                                                       |
| ----------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| announcement <div className="label basic required">Required</div> | string | A string a ser anunciada                                                                        |
| options <div className="label basic required">Required</div>      | object | `queue` - enfileira o anúncio atrás da fala existente <div className="label ios">iOS</div>     |

---

### `getRecommendedTimeoutMillis()` <div className="label android">Android</div>

```tsx
static getRecommendedTimeoutMillis(originalTimeout: number): Promise<number>;
```

Obtém o timeout em milissegundos que o usuário precisa.
Este valor é definido em "Time to take action (Accessibility timeout)" das configurações de "Accessibility".

**Parameters:**

| Nome                                                                 | Tipo   | Descrição                                                                                             |
| -------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| originalTimeout <div className="label basic required">Required</div> | number | O timeout a retornar se "Accessibility timeout" não estiver definido. Especifique em milissegundos.  |

---

### `isAccessibilityServiceEnabled()` <div className="label android">Android</div>

```tsx
static isAccessibilityServiceEnabled(): Promise<boolean>;
```

Verifica se algum serviço de acessibilidade está ativado. Isso inclui o TalkBack, mas também qualquer aplicativo de acessibilidade de terceiros que possa estar instalado. Para verificar apenas se o TalkBack está ativado, use [isScreenReaderEnabled](#isscreenreaderenabled). Retorna uma promise que resolve para um boolean. O resultado é `true` quando algum serviço de acessibilidade está ativado e `false` caso contrário.

:::note
Por favor, use [`isScreenReaderEnabled`](#isscreenreaderenabled) se você quiser apenas verificar o status do TalkBack.
:::

---

### `isBoldTextEnabled()` <div className="label ios">iOS</div>

```tsx
static isBoldTextEnabled(): Promise<boolean>:
```

Consulta se o texto em negrito está ativado no momento. Retorna uma promise que resolve para um boolean. O resultado é `true` quando o texto em negrito está ativado e `false` caso contrário.

---

### `isGrayscaleEnabled()` <div className="label ios">iOS</div>

```tsx
static isGrayscaleEnabled(): Promise<boolean>;
```

Consulta se a escala de cinza está ativada no momento. Retorna uma promise que resolve para um boolean. O resultado é `true` quando a escala de cinza está ativada e `false` caso contrário.

---

### `isInvertColorsEnabled()` <div className="label ios">iOS</div>

```tsx
static isInvertColorsEnabled(): Promise<boolean>;
```

Consulta se a inversão de cores está ativada no momento. Retorna uma promise que resolve para um boolean. O resultado é `true` quando a inversão de cores está ativada e `false` caso contrário.

---

### `isReduceMotionEnabled()`

```tsx
static isReduceMotionEnabled(): Promise<boolean>;
```

Consulta se a redução de movimento está ativada no momento. Retorna uma promise que resolve para um boolean. O resultado é `true` quando a redução de movimento está ativada e `false` caso contrário.

---

### `isReduceTransparencyEnabled()` <div className="label ios">iOS</div>

```tsx
static isReduceTransparencyEnabled(): Promise<boolean>;
```

Consulta se a redução de transparência está ativada no momento. Retorna uma promise que resolve para um boolean. O resultado é `true` quando a redução de transparência está ativada e `false` caso contrário.

---

### `isScreenReaderEnabled()`

```tsx
static isScreenReaderEnabled(): Promise<boolean>;
```

Consulta se um leitor de tela está ativado no momento. Retorna uma promise que resolve para um boolean. O resultado é `true` quando um leitor de tela está ativado e `false` caso contrário.

---

### `prefersCrossFadeTransitions()` <div className="label ios">iOS</div>

```tsx
static prefersCrossFadeTransitions(): Promise<boolean>;
```

Consulta se as configurações de redução de movimento e preferência por transições de cross-fade estão ativadas no momento. Retorna uma promise que resolve para um boolean. O resultado é `true` quando a preferência por transições de cross-fade está ativada e `false` caso contrário.

---

### `setAccessibilityFocus()`

```tsx
static setAccessibilityFocus(reactTag: number);
```

Define o foco de acessibilidade para um componente React.

No Android, isso chama o método `UIManager.sendAccessibilityEvent` com os argumentos `reactTag` passado e `UIManager.AccessibilityEventTypes.typeViewFocused`.

:::note
Certifique-se de que qualquer `View` que você deseja que receba o foco de acessibilidade tenha `accessible={true}`.
:::
