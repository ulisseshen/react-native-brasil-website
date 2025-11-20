---
ia-translated: true
id: other-debugging-methods
title: Outros Métodos de Depuração
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Esta página cobre como usar métodos de depuração JavaScript legados. Se você está começando com um novo aplicativo React Native ou Expo, recomendamos usar [React Native DevTools](./react-native-devtools).

## Safari Developer Tools (depuração direta de JSC)

Você pode usar o Safari para depurar a versão iOS do seu aplicativo ao usar [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore) (JSC) como runtime do seu aplicativo.

1. **Apenas dispositivos físicos**: Abra o aplicativo Settings e navegue para Safari > Advanced, e certifique-se de que "Web Inspector" está ativado.
2. No seu Mac, abra o Safari e habilite o menu Develop. Isso pode ser encontrado em Safari > Settings..., então na aba Advanced, em seguida selecionando "Show features for web developers".
3. Encontre seu dispositivo no menu Develop e selecione o item "JSContext" do submenu. Isso abrirá o Web Inspector do Safari, que inclui painéis Console e Sources semelhantes ao Chrome DevTools.

![Opening Safari Web Inspector](/docs/assets/debugging-safari-developer-tools.jpg)

:::tip
Embora source maps possam não estar habilitados por padrão, você pode seguir [este guia](https://blog.nparashuram.com/2019/10/debugging-react-native-ios-apps-with.html) ou [vídeo](https://www.youtube.com/watch?v=GrGqIIz51k4) para habilitá-los e definir breakpoints nos lugares certos no código-fonte.
:::

:::tip
Toda vez que o aplicativo é recarregado, um novo JSContext é criado. Escolher "Automatically Show Web Inspectors for JSContexts" evita que você tenha que selecionar o último JSContext manualmente.
:::

## Remote JavaScript Debugging (removido)

:::warning Importante
Remote JavaScript Debugging foi removido a partir do React Native 0.79. Veja o [anúncio de descontinuação](https://github.com/react-native-community/discussions-and-proposals/discussions/734) original.

Se você está em uma versão mais antiga do React Native, por favor vá para a documentação [da sua versão](/versions).
:::

![The remote debugger window in Chrome](/docs/assets/debugging-chrome-remote-debugger.jpg)
