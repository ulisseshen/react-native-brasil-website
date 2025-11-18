---
ia-translated: true
id: dynamiccolorios
title: DynamicColorIOS
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

A função `DynamicColorIOS` é um tipo de cor de plataforma específico para iOS.

```tsx
DynamicColorIOS({
  light: color,
  dark: color,
  highContrastLight: color, // (optional) will fallback to "light" if not provided
  highContrastDark: color, // (optional) will fallback to "dark" if not provided
});
```

`DynamicColorIOS` recebe um único argumento como um objeto com duas chaves obrigatórias: `dark` e `light`, e duas chaves opcionais `highContrastLight` e `highContrastDark`. Estas correspondem às cores que você deseja usar para "light mode" e "dark mode" no iOS, e quando o modo de acessibilidade de alto contraste está habilitado, suas versões de alto contraste.

Em tempo de execução, o sistema escolherá qual das cores exibir dependendo da aparência atual do sistema e das configurações de acessibilidade. Cores dinâmicas são úteis para cores de marca ou outras cores específicas do aplicativo que ainda respondem automaticamente às mudanças nas configurações do sistema.

#### Notas para desenvolvedores

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["ios", "web"])}>

<TabItem value="web">

:::info
Se você está familiarizado com `@media (prefers-color-scheme: dark)` em CSS, isso é similar! Só que ao invés de definir todas as cores em uma media query, você define qual cor usar sob quais circunstâncias exatamente onde você a está usando. Legal!
:::

</TabItem>
<TabItem value="ios">

:::info
A função `DynamicColorIOS` é similar aos métodos nativos do iOS [`UIColor colorWithDynamicProvider:`](https://developer.apple.com/documentation/uikit/uicolor/3238040-colorwithdynamicprovider).
:::

</TabItem>
</Tabs>

## Exemplo

```tsx
import {DynamicColorIOS} from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue',
});

const customContrastDynamicTextColor = DynamicColorIOS({
  dark: 'darkgray',
  light: 'lightgray',
  highContrastDark: 'black',
  highContrastLight: 'white',
});
```
