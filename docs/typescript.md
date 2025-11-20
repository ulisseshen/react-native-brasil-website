---
ia-translated: true
id: typescript
title: Using TypeScript
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[TypeScript][ts] é uma linguagem que estende JavaScript adicionando definições de tipo. Novos projetos React Native têm TypeScript como padrão, mas também suportam JavaScript e Flow.

## Getting Started with TypeScript

Novos projetos criados pela [React Native CLI](getting-started-without-a-framework#step-1-creating-a-new-application) ou templates populares como [Ignite][ignite] usarão TypeScript por padrão.

TypeScript também pode ser usado com [Expo][expo], que mantém templates TypeScript, ou solicitará que você instale e configure automaticamente o TypeScript quando um arquivo `.ts` ou `.tsx` for adicionado ao seu projeto.

```shell
npx create-expo-app --template
```

## Adding TypeScript to an Existing Project

1. Adicione TypeScript, types e plugins ESLint ao seu projeto.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -D typescript @react-native/typescript-config @types/jest @types/react @types/react-test-renderer
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add --dev typescript @react-native/typescript-config @types/jest @types/react @types/react-test-renderer
```

</TabItem>
</Tabs>

:::note
Este comando adiciona a versão mais recente de cada dependência. As versões podem precisar ser alteradas para corresponder aos pacotes existentes usados pelo seu projeto. Você pode usar uma ferramenta como [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) para ver as versões fornecidas pelo React Native.
:::

2. Adicione um arquivo de configuração TypeScript. Crie um `tsconfig.json` na raiz do seu projeto:

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config"
}
```

3. Renomeie um arquivo JavaScript para ser `*.tsx`

:::warning
Você deve deixar o arquivo entrypoint `./index.js` como está, caso contrário você pode encontrar um problema ao fazer bundle de um build de produção.
:::

4. Execute `tsc` para verificar os tipos dos seus novos arquivos TypeScript.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npx tsc
```

</TabItem>
<TabItem value="yarn">

```shell
yarn tsc
```

</TabItem>
</Tabs>

## Using JavaScript Instead of TypeScript

React Native define novos aplicativos para TypeScript por padrão, mas JavaScript ainda pode ser usado. Arquivos com extensão `.jsx` são tratados como JavaScript em vez de TypeScript, e não terão verificação de tipo. Módulos JavaScript ainda podem ser importados por módulos TypeScript, junto com o inverso.

## How TypeScript and React Native works

Por padrão, fontes TypeScript são transformadas pelo [Babel][babel] durante o bundling. Recomendamos que você use o compilador TypeScript apenas para verificação de tipo. Este é o comportamento padrão do `tsc` para aplicativos recém-criados. Se você tiver código TypeScript existente sendo portado para React Native, há [uma ou duas ressalvas][babel-7-caveats] ao usar Babel em vez de TypeScript.

## What does React Native + TypeScript look like

Você pode fornecer uma interface para as [Props](props) e [State](state) de um React Component via `React.Component<Props, State>` que fornecerá verificação de tipo e auto-completar do editor ao trabalhar com esse componente em JSX.

```tsx title="components/Hello.tsx"
import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

function Hello({name, baseEnthusiasmLevel = 0}: Props) {
  const [enthusiasmLevel, setEnthusiasmLevel] = useState(
    baseEnthusiasmLevel,
  );

  const onIncrement = () =>
    setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () =>
    setEnthusiasmLevel(
      enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0,
    );

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('!') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Hello;
```

Você pode explorar a sintaxe mais no [TypeScript playground][tsplay].

## Where to Find Useful Advice

- [TypeScript Handbook][ts-handbook]
- [React's documentation on TypeScript][react-ts]
- [React + TypeScript Cheatsheets][cheat] tem uma boa visão geral sobre como usar React com TypeScript

## Using Custom Path Aliases with TypeScript

Para usar aliases de caminho customizados com TypeScript, você precisa configurar os aliases de caminho para funcionar tanto do Babel quanto do TypeScript. Veja como:

1. Edite seu `tsconfig.json` para ter seus [mapeamentos de caminho customizados][path-map]. Configure qualquer coisa na raiz de `src` para estar disponível sem referência de caminho anterior, e permita que qualquer arquivo de teste seja acessado usando `tests/File.tsx`:

```diff
{
-  "extends": "@react-native/typescript-config"
+  "extends": "@react-native/typescript-config",
+  "compilerOptions": {
+    "baseUrl": ".",
+    "paths": {
+      "*": ["src/*"],
+      "tests": ["tests/*"],
+      "@components/*": ["src/components/*"],
+    },
+  }
}
```

2. Adicione [`babel-plugin-module-resolver`][bpmr] como um pacote de desenvolvimento ao seu projeto:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install --save-dev babel-plugin-module-resolver
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add --dev babel-plugin-module-resolver
```

</TabItem>
</Tabs>

3. Finalmente, configure seu `babel.config.js` (observe que a sintaxe para seu `babel.config.js` é diferente do seu `tsconfig.json`):

```diff
{
  presets: ['module:metro-react-native-babel-preset'],
+  plugins: [
+    [
+       'module-resolver',
+       {
+         root: ['./src'],
+         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
+         alias: {
+           tests: ['./tests/'],
+           "@components": "./src/components",
+         }
+       }
+    ]
+  ]
}
```

[react-ts]: https://react.dev/learn/typescript
[ts]: https://www.typescriptlang.org/
[flow]: https://flow.org
[ts-template]: https://github.com/react-native-community/react-native-template-typescript
[babel]: /docs/javascript-environment#javascript-syntax-transformers
[babel-7-caveats]: https://babeljs.io/docs/en/next/babel-plugin-transform-typescript
[cheat]: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets
[ts-handbook]: https://www.typescriptlang.org/docs/handbook/intro.html
[path-map]: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
[bpmr]: https://github.com/tleunen/babel-plugin-module-resolver
[expo]: https://expo.io
[ignite]: https://github.com/infinitered/ignite
[tsplay]: https://www.typescriptlang.org/play?strictNullChecks=false&jsx=3#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKFEljgG8AhAVxhggDsAaOAZRgCeAGyS8AFkiQweAFSQAPaXABqwJAHcAvnGy4CRdDAC0HFDGAA3JGSpUFteILBI4ABRxgAznAC8DKnBwpiBIAFxwnjBQwBwA5hSUgQBGKJ5IAKIcMGLMnsCpIAAySFZCAPzhHMwgSUhQCZq2lGickXAAEkhCQhDhyIYAdABiAMIAPO4QXgB8vnAAFPRBKCE8KWmZ2bn5nkUlXXMADHCaAJS+s-QBcC0cbQDaSFk5eQXFpTxpMJsvO3ulAF05v0MANcqIYGYkPN1hlnts3vshKcEtdbm1OABJDhoIghLJzebnHyzL4-BG7d5deZPLavSlIuAAajgAEYUWjWvBOAARJC4pD4+B+IkXCJScn0-7U2m-RGlOCzY5lOCyinSoRwIxsuDhQ4cyicu7wWIS+RoIQrMzATgAWRQUAA1t4RVUQCMxA7PJVqrUoMTZm6PV7FXBlXAAIJQKAoATzIOeqDeFnsgYAKwgMXm+AAhPhzuF8DZDYk4EQYMwoBwFtdAmNVBoIoIRD56JFhEhPANbpCYnVNNNa4E4GM5Iomx3W+2RF3YkQpDFYgOh8OOl0evR8ARGqXV4F6MEkDu98P6KbvubLSBrXaHc6afCpVTkce92MAPRjmCD3fD+tqdQfxPOsWDYTgVz3cwYBbAAibEBVSFw1SlGCINXdA0E7PIkmAIRgEEQoUFqIQfBgmIBSFVDfxPTh3Cw1ssRxPFaVfYCbggHooFIpIhGYJAqLY98gOAsZQPYDg0OHKDYL5BC0lVR8-gEti4AwrDgBwvCCKIrpSIAE35ZismUtjaKITxPAYjhZKMmBWOAlpONIog9JMvchIgj8G0AocvIA4SDU0VFmi5CcZzmfgO3ESQYG7AwYGhK5Sx7FA+ygcIktXTARHkcJWS4IcUDw2IOExBKQG9OAYMwrI6hggrfzTXJzEwAQRk4BKsnCaraTq65NAawI5xixcMqHTAOt4YAAC8wjgAAmQ5BuHCasgAdSQYBYjEGBCySDi9PwZbAmvKBYhiPKADZloGqgzmC+xoHgAzMBQZghHgTpuggBIgA
```

