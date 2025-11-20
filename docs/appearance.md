---
ia-translated: true
id: appearance
title: Appearance
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

```tsx
import {Appearance} from 'react-native';
```

O módulo `Appearance` expõe informações sobre as preferências de aparência do usuário, como seu esquema de cores preferido (claro ou escuro).

#### Notas do desenvolvedor

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android", "ios", "web"])}>

<TabItem value="web">

:::info
A API `Appearance` é inspirada no [rascunho de Media Queries](https://drafts.csswg.org/mediaqueries-5/) do W3C. A preferência de esquema de cores é modelada após a [feature CSS `prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
:::

</TabItem>
<TabItem value="android">

:::info
A preferência de esquema de cores mapeará para a preferência de tema Claro ou [Escuro](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme) do usuário em dispositivos Android 10 (API level 29) e superiores.
:::

</TabItem>
<TabItem value="ios">

:::info
A preferência de esquema de cores mapeará para a preferência de modo Claro ou [Escuro](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/) do usuário em dispositivos iOS 13 e superiores.
:::

:::note
Ao tirar uma captura de tela, por padrão, o esquema de cores pode piscar entre modo claro e escuro. Isso acontece porque o iOS tira capturas em ambos os esquemas de cores e a atualização da interface do usuário com o esquema de cores é assíncrona.
:::

</TabItem>
</Tabs>

## Exemplo

Você pode usar o módulo `Appearance` para determinar se o usuário prefere um esquema de cores escuro:

```tsx
const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // Use dark color scheme
}
```

Embora o esquema de cores esteja disponível imediatamente, isso pode mudar (por exemplo, mudança programada de esquema de cores ao nascer ou pôr do sol). Qualquer lógica de renderização ou estilos que dependam do esquema de cores preferido do usuário devem tentar chamar esta função em cada renderização, em vez de armazenar o valor em cache. Por exemplo, você pode usar o hook React [`useColorScheme`](usecolorscheme), pois ele fornece e assina atualizações de esquema de cores, ou você pode usar estilos inline em vez de definir um valor em um `StyleSheet`.

---

# Referência

## Métodos

### `getColorScheme()`

```tsx
static getColorScheme(): 'light' | 'dark' | null;
```

Indica o esquema de cores preferido atual do usuário. O valor pode ser atualizado posteriormente, seja através de ação direta do usuário (por exemplo, seleção de tema nas configurações do dispositivo ou estilo de interface do usuário selecionado no nível do aplicativo via `setColorScheme`) ou de forma programada (por exemplo, temas claro e escuro que seguem o ciclo dia/noite).

Esquemas de cores suportados:

- `'light'`: O usuário prefere um tema de cores claro.
- `'dark'`: O usuário prefere um tema de cores escuro.
- `null`: O usuário não indicou um tema de cores preferido.

Veja também: hook `useColorScheme`.

:::note
`getColorScheme()` sempre retornará `light` ao depurar com Chrome.
:::

---

### `setColorScheme()`

```tsx
static setColorScheme('light' | 'dark' | null): void;
```

Força o aplicativo a sempre adotar um estilo de interface claro ou escuro. O valor padrão é `null`, que faz com que o aplicativo herde o estilo de interface do sistema. Se você atribuir um valor diferente, o novo estilo se aplica ao aplicativo e a todos os elementos nativos dentro do aplicativo (Alerts, Pickers etc).

Esquemas de cores suportados:

- `light`: Aplicar estilo de interface do usuário claro.
- `dark`: Aplicar estilo de interface do usuário escuro.
- null: Seguir o estilo de interface do sistema.

:::note
A mudança não afetará o estilo de interface selecionado do sistema ou qualquer estilo definido em outros aplicativos.
:::

---

### `addChangeListener()`

```tsx
static addChangeListener(
  listener: (preferences: {colorScheme: 'light' | 'dark' | null}) => void,
): NativeEventSubscription;
```

Adiciona um manipulador de evento que é disparado quando as preferências de aparência mudam.
