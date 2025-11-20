---
ia-translated: true
id: strict-typescript-api
title: Strict TypeScript API (opt in)
---

import RNRepoLink from '@site/core/RNRepoLink';

A Strict TypeScript API é uma prévia da nossa futura API JavaScript estável para React Native.

Especificamente, este é um novo conjunto de tipos TypeScript para o pacote npm `react-native`, disponível a partir da versão 0.80. Eles fornecem maior precisão de tipos e maior prova de futuro, e nos permitirão evoluir com confiança a API do React Native para uma forma estável. Optar pela Strict TypeScript API traz algumas diferenças estruturais de tipos e, portanto, é uma mudança breaking de uma só vez.

Os novos tipos são:

1. **Gerados diretamente do nosso código-fonte** — melhorando a cobertura e correção, para que você possa esperar garantias de compatibilidade mais fortes.
2. **Restritos ao arquivo index do `react-native`** — definindo mais rigorosamente nossa API pública, e significando que não quebraremos a API ao fazer mudanças internas nos arquivos.

Quando a comunidade estiver pronta, a Strict TypeScript API se tornará nossa API padrão no futuro — sincronizada com a remoção de deep imports.

## Opting in

Estamos fornecendo esses novos tipos ao lado de nossos tipos existentes, o que significa que você pode escolher migrar quando estiver pronto. Encorajamos early adopters e aplicativos recém-criados a optar através do seu arquivo `tsconfig.json`.

Optar é uma **breaking change**, já que alguns de nossos novos tipos têm nomes e formas atualizados, embora muitos aplicativos não sejam afetados. Você pode aprender sobre cada breaking change na próxima seção.

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    ...
    "customConditions": ["react-native-strict-api"]
  }
}
```

:::note Under the hood

Isso instruirá o TypeScript a resolver os tipos do `react-native` a partir do nosso novo diretório [`types_generated/`](https://www.npmjs.com/package/react-native?activeTab=code), em vez do diretório anterior [`types/`](https://www.npmjs.com/package/react-native?activeTab=code) (mantido manualmente). Nenhum restart do TypeScript ou do seu editor é necessário.

:::

A Strict TypeScript API segue nossa [RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894) para remover deep imports do React Native. Portanto, algumas APIs não são mais exportadas na raiz. Isso é intencional, para reduzir a superfície geral da API do React Native.

:::tip API feedback

**Enviando feedback**: Trabalharemos com a comunidade para finalizar quais APIs exportamos ao longo de (pelo menos) as próximas duas versões do React Native. Por favor, compartilhe seu feedback em nossa [feedback thread](https://github.com/react-native-community/discussions-and-proposals/discussions/893).

Veja também nossa [announcement blog post](/blog/2025/06/12/moving-towards-a-stable-javascript-api) para mais informações sobre nossa motivação e cronogramas.

:::

## Migration guide

### Codegen types should now be imported from the `react-native` package

Tipos usados para codegen, como `Int32`, `Double`, `WithDefault`, etc., agora estão disponíveis sob um único namespace `CodegenTypes`. Da mesma forma, `codegenNativeComponent` e `codegenNativeCommands` agora estão disponíveis para importar do pacote react-native em vez de usar o deep import.

O `CodegenTypes` com namespace, bem como `codegenNativeCommands` e `codegenNativeComponent`, também estão disponíveis no pacote `react-native` quando a Strict API não está habilitada para facilitar a adoção para bibliotecas de terceiros.

**Before**

```ts title=""
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

interface NativeProps extends ViewProps {
  enabled?: WithDefault<boolean, true>;
  size?: Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

**After**

```ts title=""
import {CodegenTypes, codegenNativeComponent} from 'react-native';

interface NativeProps extends ViewProps {
  enabled?: CodegenTypes.WithDefault<boolean, true>;
  size?: CodegenTypes.Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

### Removal of `*Static` types

**Before**

```tsx title=""
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);
```

**After**

```tsx title=""
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

As seguintes APIs eram anteriormente nomeadas como `*Static` mais uma declaração de variável desse tipo. Na maioria dos casos havia um alias para que o valor e o tipo fossem exportados sob o mesmo identificador, mas alguns estavam faltando.

(Por exemplo, havia um tipo `AlertStatic`, variável `Alert` do tipo `AlertStatic` e tipo `Alert` que era um alias para `AlertStatic`. Mas no caso de `PixelRatio` havia um tipo `PixelRatioStatic` e uma variável `PixelRatio` desse tipo sem aliases de tipo adicionais.)

**Affected APIs**

- `AlertStatic`
- `ActionSheetIOSStatic`
- `ToastAndroidStatic`
- `InteractionManagerStatic` (In this case there was no relevant `InteractionManager` type alias)
- `UIManagerStatic`
- `PlatformStatic`
- `SectionListStatic`
- `PixelRatioStatic` (In this case there was no relevant `PixelRatio` type alias)
- `AppStateStatic`
- `AccessibilityInfoStatic`
- `ImageResizeModeStatic`
- `BackHandlerStatic`
- `DevMenuStatic` (In this case there was no relevant `DevMenu` type alias)
- `ClipboardStatic`
- `PermissionsAndroidStatic`
- `ShareStatic`
- `DeviceEventEmitterStatic`
- `LayoutAnimationStatic`
- `KeyboardStatic` (In this case there was no relevant `Keyboard` type alias)
- `DevSettingsStatic` (In this case there was no relevant `DevSettings` type alias)
- `I18nManagerStatic`
- `EasingStatic`
- `PanResponderStatic`
- `NativeModulesStatic` (In this case there was no relevant `NativeModules` type alias)
- `LogBoxStatic`
- `PushNotificationIOSStatic`
- `SettingsStatic`
- `VibrationStatic`

### Some core components are now function components instead of class components

- `View`
- `Image`
- `TextInput`
- `Modal`
- `Text`
- `TouchableWithoutFeedback`
- `Switch`
- `ActivityIndicator`
- `ProgressBarAndroid`
- `InputAccessoryView`
- `Button`
- `SafeAreaView`

Devido a essa mudança, acessar tipos de ref dessas views requer usar o padrão `React.ComponentRef<typeof View>`, que funciona conforme esperado para componentes de classe e de função, por exemplo:

```ts title=""
const ref = useRef<React.ComponentRef<typeof View>>(null);
```

## Other breaking changes

### Changes to Animated types

Animated nodes eram anteriormente tipos genéricos baseados em sua saída de interpolação. Agora, eles são tipos não genéricos com um método `interpolate` genérico.

`Animated.LegacyRef` não está mais disponível.

### Unified types for optional props

Nos novos tipos, toda prop opcional será tipada como `type | undefined`.

### Removal of some deprecated types

Todos os tipos listados em <RNRepoLink href="/packages/react-native/types/public/DeprecatedPropertiesAlias.d.ts">`DeprecatedPropertiesAlias.d.ts`</RNRepoLink> estão inacessíveis sob a Strict API.

### Removal of leftover component props

Algumas propriedades que foram definidas nas definições de tipo mas não foram usadas pelo componente ou estavam sem definição foram removidas (por exemplo: `lineBreakMode` em `Text`, `scrollWithoutAnimationTo` em `ScrollView`, estilos transform definidos fora do array transform).

### Previously accessible private type helpers may now be removed

Devido à configuração das definições de tipo anteriores, todo tipo definido era acessível a partir do pacote `react-native`. Isso incluía tipos que não foram explicitamente exportados e tipos helper que deveriam ser usados apenas internamente.

Exemplos notáveis disso são tipos relacionados ao StyleSheet (como `RecursiveArray`, `RegisteredStyle` e `Falsy`) e Animated (como `WithAnimatedArray` e `WithAnimatedObject`).
