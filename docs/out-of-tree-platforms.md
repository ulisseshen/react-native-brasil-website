---
ia-translated: true
id: out-of-tree-platforms
title: Out-of-Tree Platforms
---

React Native não é apenas para dispositivos Android e iOS - nossos parceiros e a comunidade mantêm projetos que trazem React Native para outras plataformas, tais como:

**De Parceiros**

- [React Native macOS](https://github.com/microsoft/react-native-macos) - React Native para macOS e Cocoa.
- [React Native Windows](https://github.com/microsoft/react-native-windows) - React Native para Universal Windows Platform (UWP) da Microsoft.
- [React Native visionOS](https://github.com/callstack/react-native-visionos) - React Native para visionOS da Apple.

**Da Comunidade**

- [React Native tvOS](https://github.com/react-native-tvos/react-native-tvos) - React Native para dispositivos Apple TV e Android TV.
- [React Native Web](https://github.com/necolas/react-native-web) - React Native na web usando React DOM.
- [React Native Skia](https://github.com/react-native-skia/react-native-skia) - React Native usando [Skia](https://skia.org/) como renderizador. Atualmente suporta Linux e macOS.

## Criando sua própria plataforma React Native

No momento, o processo de criar uma plataforma React Native do zero não está muito bem documentado - um dos objetivos da próxima rearquitetura ([Fabric](/blog/2018/06/14/state-of-react-native-2018)) é tornar a manutenção de uma plataforma mais fácil.

### Bundling

A partir do React Native 0.57, você pode agora registrar sua plataforma React Native com o bundler JavaScript do React Native, [Metro](https://metrobundler.dev/). Isso significa que você pode passar `--platform example` para `npx react-native bundle`, e ele procurará por arquivos JavaScript com o sufixo `.example.js`.

Para registrar sua plataforma com RNPM, o nome do seu módulo deve corresponder a um desses padrões:

- `react-native-example` - Ele procurará todos os módulos de nível superior que começam com `react-native-`
- `@org/react-native-example` - Ele procurará por módulos que começam com `react-native-` sob qualquer escopo
- `@react-native-example/module` - Ele procurará em todos os módulos sob escopos com nomes começando com `@react-native-`

Você também deve ter uma entrada em seu `package.json` como esta:

```json
{
  "rnpm": {
    "haste": {
      "providesModuleNodeModules": ["react-native-example"],
      "platforms": ["example"]
    }
  }
}
```

`"providesModuleNodeModules"` é um array de módulos que serão adicionados ao caminho de busca do módulo Haste, e `"platforms"` é um array de sufixos de plataforma que serão adicionados como plataformas válidas.
