---
ia-translated: true
id: textinput
title: TextInput
---

Um componente fundamental para inserir texto no aplicativo através de um teclado. As props fornecem configurabilidade para vários recursos, como correção automática, capitalização automática, texto placeholder e diferentes tipos de teclado, como um teclado numérico.

O caso de uso mais básico é colocar um `TextInput` e se inscrever nos eventos `onChangeText` para ler a entrada do usuário. Existem também outros eventos, como `onSubmitEditing` e `onFocus` que podem ser assinados. Um exemplo mínimo:

```SnackPlayer name=TextInput%20Example
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
```

Dois métodos expostos através do elemento nativo são `.focus()` e `.blur()` que focam ou desfocam o TextInput programaticamente.

Note que algumas props estão disponíveis apenas com `multiline={true/false}`. Além disso, estilos de borda que se aplicam a apenas um lado do elemento (por exemplo, `borderBottomColor`, `borderLeftWidth`, etc.) não serão aplicados se `multiline=true`. Para alcançar o mesmo efeito, você pode envolver seu `TextInput` em uma `View`:

```SnackPlayer name=Multiline%20TextInput%20Example
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const MultilineTextInputExample = () => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  // If you type something in the text box that is a color,
  // the background will change to that color.
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: value.toLowerCase(),
        }}>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => onChangeText(text)}
          value={value}
          style={styles.textInput}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    margin: 12,
  },
});

export default MultilineTextInputExample;
```

`TextInput` tem uma borda na parte inferior de sua view por padrão. Esta borda tem seu padding definido pela imagem de fundo fornecida pelo sistema, e não pode ser alterada. Soluções para evitar isso são não definir a altura explicitamente, caso em que o sistema cuidará de exibir a borda na posição correta, ou não exibir a borda definindo `underlineColorAndroid` como transparente.

Note que no Android, realizar seleção de texto em um input pode alterar o parâmetro `windowSoftInputMode` da activity do aplicativo para `adjustResize`. Isso pode causar problemas com componentes que têm position: 'absolute' enquanto o teclado está ativo. Para evitar esse comportamento, especifique `windowSoftInputMode` no AndroidManifest.xml ( https://developer.android.com/guide/topics/manifest/activity-element.html ) ou controle este parâmetro programaticamente com código nativo.

---

# Reference

## Props

### [View Props](view.md#props)

Herda [View Props](view.md#props).

---

### `allowFontScaling`

Especifica se as fontes devem escalar para respeitar as configurações de acessibilidade de Tamanho de Texto. O padrão é `true`.

| Type |
| ---- |
| bool |

---

### `autoCapitalize`

Diz ao `TextInput` para capitalizar automaticamente certos caracteres. Esta propriedade não é suportada por alguns tipos de teclado, como `name-phone-pad`.

- `characters`: todos os caracteres.
- `words`: primeira letra de cada palavra.
- `sentences`: primeira letra de cada sentença (_padrão_).
- `none`: não capitalizar automaticamente nada.

| Type                                             |
| ------------------------------------------------ |
| enum('none', 'sentences', 'words', 'characters') |

---

### `autoComplete`

Especifica dicas de autocomplete para o sistema, para que ele possa fornecer preenchimento automático. No Android, o sistema sempre tentará oferecer preenchimento automático usando heurísticas para identificar o tipo de conteúdo. Para desativar o autocomplete, defina `autoComplete` como `off`.

Os seguintes valores funcionam em todas as plataformas:

- `additional-name`
- `address-line1`
- `address-line2`
- `birthdate-day` (iOS 17+)
- `birthdate-full` (iOS 17+)
- `birthdate-month` (iOS 17+)
- `birthdate-year` (iOS 17+)
- `cc-csc` (iOS 17+)
- `cc-exp` (iOS 17+)
- `cc-exp-day` (iOS 17+)
- `cc-exp-month` (iOS 17+)
- `cc-exp-year` (iOS 17+)
- `cc-number`
- `country`
- `current-password`
- `email`
- `family-name`
- `given-name`
- `honorific-prefix`
- `honorific-suffix`
- `name`
- `new-password`
- `off`
- `one-time-code`
- `postal-code`
- `street-address`
- `tel`
- `username`

<div className="label basic ios">iOS</div>

Os seguintes valores funcionam apenas no iOS:

- `cc-family-name` (iOS 17+)
- `cc-given-name` (iOS 17+)
- `cc-middle-name` (iOS 17+)
- `cc-name` (iOS 17+)
- `cc-type` (iOS 17+)
- `nickname`
- `organization`
- `organization-title`
- `url`

<div className="label basic android">Android</div>

Os seguintes valores funcionam apenas no Android:

- `gender`
- `name-family`
- `name-given`
- `name-middle`
- `name-middle-initial`
- `name-prefix`
- `name-suffix`
- `password`
- `password-new`
- `postal-address`
- `postal-address-country`
- `postal-address-extended`
- `postal-address-extended-postal-code`
- `postal-address-locality`
- `postal-address-region`
- `sms-otp`
- `tel-country-code`
- `tel-device`
- `tel-national`
- `username-new`

| Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('additional-name', 'address-line1', 'address-line2', 'birthdate-day', 'birthdate-full', 'birthdate-month', 'birthdate-year', 'cc-csc', 'cc-exp', 'cc-exp-day', 'cc-exp-month', 'cc-exp-year', 'cc-number', 'country', 'current-password', 'email', 'family-name', 'given-name', 'honorific-prefix', 'honorific-suffix', 'name', 'new-password', 'off', 'one-time-code', 'postal-code', 'street-address', 'tel', 'username', 'cc-family-name', 'cc-given-name', 'cc-middle-name', 'cc-name', 'cc-type', 'nickname', 'organization', 'organization-title', 'url', 'gender', 'name-family', 'name-given', 'name-middle', 'name-middle-initial', 'name-prefix', 'name-suffix', 'password', 'password-new', 'postal-address', 'postal-address-country', 'postal-address-extended', 'postal-address-extended-postal-code', 'postal-address-locality', 'postal-address-region', 'sms-otp', 'tel-country-code', 'tel-device', 'tel-national', 'username-new') |

---

### `autoCorrect`

Se `false`, desativa a correção automática. O valor padrão é `true`.

| Type |
| ---- |
| bool |

---

### `autoFocus`

Se `true`, foca o input. O valor padrão é `false`.

| Type |
| ---- |
| bool |

---

### `blurOnSubmit`

:::warning Deprecated
Note que `submitBehavior` agora toma o lugar de `blurOnSubmit` e substituirá qualquer comportamento definido por `blurOnSubmit`. Veja [submitBehavior](textinput#submitbehavior).
:::

Se `true`, o campo de texto ficará desfocado quando enviado. O valor padrão é true para campos de linha única e false para campos multilinha. Note que para campos multilinha, definir `blurOnSubmit` como `true` significa que pressionar return desfocará o campo e disparará o evento `onSubmitEditing` em vez de inserir uma nova linha no campo.

| Type |
| ---- |
| bool |

---

### `caretHidden`

Se `true`, o cursor é oculto. O valor padrão é `false`.

| Type |
| ---- |
| bool |

---

### `clearButtonMode` <div className="label ios">iOS</div>

Quando o botão de limpar deve aparecer no lado direito da view de texto. Esta propriedade é suportada apenas para componentes TextInput de linha única. O valor padrão é `never`.

| Type                                                       |
| ---------------------------------------------------------- |
| enum('never', 'while-editing', 'unless-editing', 'always') |

---

### `clearTextOnFocus` <div className="label ios">iOS</div>

Se `true`, limpa o campo de texto automaticamente quando a edição começa.

| Type |
| ---- |
| bool |

---

### `contextMenuHidden`

Se `true`, o menu de contexto é oculto. O valor padrão é `false`.

| Type |
| ---- |
| bool |

---

### `dataDetectorTypes` <div className="label ios">iOS</div>

Determina os tipos de dados convertidos em URLs clicáveis no input de texto. Válido apenas se `multiline={true}` e `editable={false}`. Por padrão, nenhum tipo de dado é detectado.

Você pode fornecer um tipo ou um array de vários tipos.

Valores possíveis para `dataDetectorTypes` são:

- `'phoneNumber'`
- `'link'`
- `'address'`
- `'calendarEvent'`
- `'none'`
- `'all'`

| Type                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), ,array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') |

---

### `defaultValue`

Fornece um valor inicial que mudará quando o usuário começar a digitar. Útil para casos de uso onde você não quer lidar com escutar eventos e atualizar a prop value para manter o estado controlado sincronizado.

| Type   |
| ------ |
| string |

---

### `disableKeyboardShortcuts` <div className="label ios">iOS</div>

Se `true`, os atalhos de teclado (botões de desfazer/refazer e copiar) são desativados.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `cursorColor` <div className="label android">Android</div>

Quando fornecido, definirá a cor do cursor (ou "caret") no componente. Diferente do comportamento de `selectionColor`, a cor do cursor será definida independentemente da cor da caixa de seleção de texto.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `disableFullscreenUI` <div className="label android">Android</div>

Quando `false`, se houver uma pequena quantidade de espaço disponível ao redor de um input de texto (por exemplo, orientação paisagem em um telefone), o SO pode escolher que o usuário edite o texto dentro de um modo de input de texto de tela cheia. Quando `true`, este recurso é desativado e os usuários sempre editarão o texto diretamente dentro do input de texto. O padrão é `false`.

| Type |
| ---- |
| bool |

---

### `editable`

Se `false`, o texto não é editável. O valor padrão é `true`.

| Type |
| ---- |
| bool |

---

### `enablesReturnKeyAutomatically` <div className="label ios">iOS</div>

Se `true`, o teclado desativa a tecla return quando não há texto e automaticamente a ativa quando há texto. O valor padrão é `false`.

| Type |
| ---- |
| bool |

---

### `enterKeyHint`

Determina qual texto deve ser mostrado na tecla return. Tem precedência sobre a prop `returnKeyType`.

Os seguintes valores funcionam em todas as plataformas:

- `done`
- `next`
- `search`
- `send`
- `go`

_Android Only_

Os seguintes valores funcionam apenas no Android:

- `previous`

_iOS Only_

Os seguintes valores funcionam apenas no iOS:

- `enter`

| Type                                                              |
| ----------------------------------------------------------------- |
| enum('enter', 'done', 'next', 'previous', 'search', 'send', 'go') |

---

### `importantForAutofill` <div className="label android">Android</div>

Informa ao sistema operacional se os campos individuais em seu aplicativo devem ser incluídos em uma estrutura de view para fins de preenchimento automático no Android API Level 26+. Os valores possíveis são `auto`, `no`, `noExcludeDescendants`, `yes` e `yesExcludeDescendants`. O valor padrão é `auto`.

- `auto`: Deixe o Sistema Android usar suas heurísticas para determinar se a view é importante para preenchimento automático.
- `no`: Esta view não é importante para preenchimento automático.
- `noExcludeDescendants`: Esta view e seus filhos não são importantes para preenchimento automático.
- `yes`: Esta view é importante para preenchimento automático.
- `yesExcludeDescendants`: Esta view é importante para preenchimento automático, mas seus filhos não são importantes para preenchimento automático.

| Type                                                                       |
| -------------------------------------------------------------------------- |
| enum('auto', 'no', 'noExcludeDescendants', 'yes', 'yesExcludeDescendants') |

---

### `inlineImageLeft` <div className="label android">Android</div>

Se definido, o recurso de imagem fornecido será renderizado à esquerda. O recurso de imagem deve estar dentro de `/android/app/src/main/res/drawable` e referenciado como

```
<TextInput
 inlineImageLeft='search_icon'
/>
```

| Type   |
| ------ |
| string |

---

### `inlineImagePadding` <div className="label android">Android</div>

Padding entre a imagem inline, se houver, e o próprio input de texto.

| Type   |
| ------ |
| number |

---

### `inputAccessoryViewID` <div className="label ios">iOS</div>

Um identificador opcional que vincula um [InputAccessoryView](inputaccessoryview.md) personalizado a este input de texto. O InputAccessoryView é renderizado acima do teclado quando este input de texto está focado.

| Type   |
| ------ |
| string |

---

### `inputAccessoryViewButtonLabel` <div className="label ios">iOS</div>

Um label opcional que substitui o label padrão do botão [InputAccessoryView](inputaccessoryview.md).

Por padrão, o label do botão padrão não é localizado. Use esta propriedade para fornecer uma versão localizada.

| Type   |
| ------ |
| string |

---

### `inputMode`

Funciona como o atributo `inputmode` em HTML, determina qual teclado abrir, por exemplo `numeric` e tem precedência sobre `keyboardType`.

Suporta os seguintes valores:

- `none`
- `text`
- `decimal`
- `numeric`
- `tel`
- `search`
- `email`
- `url`

| Type                                                                        |
| --------------------------------------------------------------------------- |
| enum('decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url') |

---

### `keyboardAppearance` <div className="label ios">iOS</div>

Determina a cor do teclado.

| Type                             |
| -------------------------------- |
| enum('default', 'light', 'dark') |

---

### `keyboardType`

Determina qual teclado abrir, por exemplo `numeric`.

Veja capturas de tela de todos os tipos [aqui](https://davidl.fr/blog/keyboard-react-native-ios-android#all-react-native-keyboard-type-examples-i-os-on-the-left-android-on-the-right).

Os seguintes valores funcionam em todas as plataformas:

- `default`
- `number-pad`
- `decimal-pad`
- `numeric`
- `email-address`
- `phone-pad`
- `url`

_iOS Only_

Os seguintes valores funcionam apenas no iOS:

- `ascii-capable`
- `numbers-and-punctuation`
- `name-phone-pad`
- `twitter`
- `web-search`

_Android Only_

Os seguintes valores funcionam apenas no Android:

- `visible-password`

| Type                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password') |

---

### `lineBreakStrategyIOS` <div className="label ios">iOS</div>

Define a estratégia de quebra de linha no iOS 14+. Os valores possíveis são `none`, `standard`, `hangul-word` e `push-out`.

| Type                                                        | Default  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

---

### `lineBreakModeIOS` <div className="label ios">iOS</div>

Define o modo de quebra de linha no iOS. Os valores possíveis são `wordWrapping`, `char`, `clip`, `head`, `middle` e `tail`.

| Type                                                                       | Default          |
| -------------------------------------------------------------------------- | ---------------- |
| enum(`'wordWrapping'`, `'char'`, `'clip'`, `'head'`, `'middle'`, `'tail'`) | `'wordWrapping'` |

---

### `maxFontSizeMultiplier`

Especifica a maior escala possível que uma fonte pode alcançar quando `allowFontScaling` está habilitado. Valores possíveis:

- `null/undefined` (padrão): herdar do nó pai ou do padrão global (0)
- `0`: sem máximo, ignorar padrão pai/global
- `>= 1`: define o `maxFontSizeMultiplier` deste nó para este valor

| Type   |
| ------ |
| number |

---

### `maxLength`

Limita o número máximo de caracteres que podem ser inseridos. Use isso em vez de implementar a lógica em JS para evitar oscilação.

| Type   |
| ------ |
| number |

---

### `multiline`

Se `true`, o input de texto pode ter várias linhas. O valor padrão é `false`.

:::note
É importante notar que isso alinha o texto ao topo no iOS e o centraliza no Android. Use com `textAlignVertical` definido como `top` para o mesmo comportamento em ambas as plataformas.
:::

| Type |
| ---- |
| bool |

---

### `numberOfLines`

:::note
`numberOfLines` no iOS está disponível apenas na [New Architecture](/architecture/landing-page)
:::

Define o número máximo de linhas para um `TextInput`. Use com multiline definido como `true` para poder preencher as linhas.

| Type   |
| ------ |
| number |

---

### `onBlur`

Callback que é chamado quando o input de texto é desfocado.

:::note
Se você está tentando acessar o valor `text` de `nativeEvent`, tenha em mente que o valor resultante que você obtém pode ser `undefined`, o que pode causar erros não intencionais. Se você está tentando encontrar o último valor do TextInput, você pode usar o evento [`onEndEditing`](textinput#onendediting), que é disparado após a conclusão da edição.
:::

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onChange`

Callback que é chamado quando o texto do input de texto muda.

| Type                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {eventCount, target, text}}`) => void |

---

### `onChangeText`

Callback que é chamado quando o texto do input de texto muda. O texto alterado é passado como um único argumento string para o handler do callback.

| Type     |
| -------- |
| function |

---

### `onContentSizeChange`

Callback que é chamado quando o tamanho do conteúdo do input de texto muda.

Chamado apenas para inputs de texto multilinha.

| Type                                                       |
| ---------------------------------------------------------- |
| (`{nativeEvent: {contentSize: {width, height} }}`) => void |

---

### `onEndEditing`

Callback que é chamado quando o input de texto termina.

| Type     |
| -------- |
| function |

---

### `onPressIn`

Callback que é chamado quando um toque é iniciado.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressOut`

Callback que é chamado quando um toque é liberado.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onFocus`

Callback que é chamado quando o input de texto é focado.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onKeyPress`

Callback que é chamado quando uma tecla é pressionada. Isso será chamado com um objeto onde `keyValue` é `'Enter'` ou `'Backspace'` para as respectivas teclas e o caractere digitado caso contrário, incluindo `' '` para espaço. Dispara antes dos callbacks `onChange`. Nota: no Android, apenas as entradas do teclado virtual são tratadas, não as entradas do teclado físico.

| Type                                        |
| ------------------------------------------- |
| (`{nativeEvent: {key: keyValue} }`) => void |

---

### `onLayout`

Invocado na montagem e nas mudanças de layout.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onScroll`

Invocado na rolagem de conteúdo. Também pode conter outras propriedades de `ScrollEvent`, mas no Android `contentSize` não é fornecido por motivos de desempenho.

| Type                                                |
| --------------------------------------------------- |
| (`{nativeEvent: {contentOffset: {x, y} }}`) => void |

---

### `onSelectionChange`

Callback que é chamado quando a seleção do input de texto é alterada.

| Type                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {selection: {start, end} }}`) => void |

---

### `onSubmitEditing`

Callback que é chamado quando o botão de envio do input de texto é pressionado.

| Type                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {text, eventCount, target}}`) => void |

Note que no iOS este método não é chamado quando usando `keyboardType="phone-pad"`.

---

### `placeholder`

A string que será renderizada antes de qualquer texto ter sido inserido no input de texto.

| Type   |
| ------ |
| string |

---

### `placeholderTextColor`

A cor do texto da string placeholder.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `readOnly`

Se `true`, o texto não é editável. O valor padrão é `false`.

| Type |
| ---- |
| bool |

---

### `returnKeyLabel` <div className="label android">Android</div>

Define a tecla return para o label. Use em vez de `returnKeyType`.

| Type   |
| ------ |
| string |

---

### `returnKeyType`

Determina como a tecla return deve parecer. No Android você também pode usar `returnKeyLabel`.

_Cross platform_

Os seguintes valores funcionam em todas as plataformas:

- `done`
- `go`
- `next`
- `search`
- `send`

_Android Only_

Os seguintes valores funcionam apenas no Android:

- `none`
- `previous`

_iOS Only_

Os seguintes valores funcionam apenas no iOS:

- `default`
- `emergency-call`
- `google`
- `join`
- `route`
- `yahoo`

| Type                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------- |
| enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') |

### `rejectResponderTermination` <div className="label ios">iOS</div>

Se `true`, permite que o TextInput passe eventos de toque para o componente pai. Isso permite que componentes como SwipeableListView sejam deslizáveis a partir do TextInput no iOS, como é o caso no Android por padrão. Se `false`, o TextInput sempre pede para manipular o input (exceto quando desativado). O valor padrão é `true`.

| Type |
| ---- |
| bool |

---

### `rows` <div className="label android">Android</div>

Define o número de linhas para um `TextInput`. Use com multiline definido como `true` para poder preencher as linhas.

| Type   |
| ------ |
| number |

---

### `scrollEnabled` <div className="label ios">iOS</div>

Se `false`, a rolagem da view de texto será desativada. O valor padrão é `true`. Funciona apenas com `multiline={true}`.

| Type |
| ---- |
| bool |

---

### `secureTextEntry`

Se `true`, o input de texto obscurece o texto inserido para que textos sensíveis como senhas permaneçam seguros. O valor padrão é `false`. Não funciona com `multiline={true}`.

| Type |
| ---- |
| bool |

---

### `selection`

O início e o fim da seleção do input de texto. Defina start e end com o mesmo valor para posicionar o cursor.

| Type                                  |
| ------------------------------------- |
| object: `{start: number,end: number}` |

---

### `selectionColor`

A cor do destaque, da alça de seleção e do cursor do input de texto.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `selectionHandleColor` <div className="label android">Android</div>

Define a cor da alça de seleção. Diferente de `selectionColor`, permite que a cor da alça de seleção seja personalizada independentemente da cor da seleção.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `selectTextOnFocus`

Se `true`, todo o texto será automaticamente selecionado no foco.

| Type |
| ---- |
| bool |

---

### `showSoftInputOnFocus`

Quando `false`, impedirá que o teclado virtual apareça quando o campo estiver focado. O valor padrão é `true`.

| Type |
| ---- |
| bool |

---

### `smartInsertDelete` <div className="label ios">iOS</div>

Se `false`, o sistema iOS não inserirá um espaço extra após uma operação de colar nem deletará um ou dois espaços após uma operação de cortar ou deletar.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `spellCheck` <div className="label ios">iOS</div>

Se `false`, desativa o estilo de verificação ortográfica (ou seja, sublinhados vermelhos). O valor padrão é herdado de `autoCorrect`.

| Type |
| ---- |
| bool |

---

### `submitBehavior`

Quando a tecla return é pressionada,

Para inputs de linha única:

- `'newline'` padrão para `'blurAndSubmit'`
- `undefined` padrão para `'blurAndSubmit'`

Para inputs multilinha:

- `'newline'` adiciona uma nova linha
- `undefined` padrão para `'newline'`

Para inputs de linha única e multilinha:

- `'submit'` enviará apenas um evento de envio e não desfocará o input
- `'blurAndSubmit`' desfocará o input e enviará um evento de envio

| Type                                       |
| ------------------------------------------ |
| enum('submit', 'blurAndSubmit', 'newline') |

---

### `textAlign`

Alinha o texto do input para os lados esquerdo, centro ou direito do campo de input.

Valores possíveis para `textAlign` são:

- `left`
- `center`
- `right`

| Type                            |
| ------------------------------- |
| enum('left', 'center', 'right') |

---

### `textContentType` <div className="label ios">iOS</div>

Forneça ao teclado e ao sistema informações sobre o significado semântico esperado para o conteúdo que os usuários inserem.

:::note
[`autoComplete`](#autocomplete), fornece a mesma funcionalidade e está disponível para todas as plataformas. Você pode usar [`Platform.select`](/docs/next/platform#select) para comportamentos de plataforma diferentes.

Evite usar `textContentType` e `autoComplete` juntos. Para compatibilidade com versões anteriores, `textContentType` tem precedência quando ambas as propriedades estão definidas.
:::

Você pode definir `textContentType` como `username` ou `password` para habilitar o preenchimento automático de detalhes de login do keychain do dispositivo.

`newPassword` pode ser usado para indicar um novo input de senha que o usuário pode querer salvar no keychain, e `oneTimeCode` pode ser usado para indicar que um campo pode ser preenchido automaticamente por um código que chega em um SMS.

Para desativar o preenchimento automático, defina `textContentType` como `none`.

Valores possíveis para `textContentType` são:

- `none`
- `addressCity`
- `addressCityAndState`
- `addressState`
- `birthdate` (iOS 17+)
- `birthdateDay` (iOS 17+)
- `birthdateMonth` (iOS 17+)
- `birthdateYear` (iOS 17+)
- `countryName`
- `creditCardExpiration` (iOS 17+)
- `creditCardExpirationMonth` (iOS 17+)
- `creditCardExpirationYear` (iOS 17+)
- `creditCardFamilyName` (iOS 17+)
- `creditCardGivenName` (iOS 17+)
- `creditCardMiddleName` (iOS 17+)
- `creditCardName` (iOS 17+)
- `creditCardNumber`
- `creditCardSecurityCode` (iOS 17+)
- `creditCardType` (iOS 17+)
- `emailAddress`
- `familyName`
- `fullStreetAddress`
- `givenName`
- `jobTitle`
- `location`
- `middleName`
- `name`
- `namePrefix`
- `nameSuffix`
- `newPassword`
- `nickname`
- `oneTimeCode`
- `organizationName`
- `password`
- `postalCode`
- `streetAddressLine1`
- `streetAddressLine2`
- `sublocality`
- `telephoneNumber`
- `URL`
- `username`

| Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enum('none', 'addressCity', 'addressCityAndState', 'addressState', 'birthdate', 'birthdateDay', 'birthdateMonth', 'birthdateYear', 'countryName', 'creditCardExpiration', 'creditCardExpirationMonth', 'creditCardExpirationYear', 'creditCardFamilyName', 'creditCardGivenName', 'creditCardMiddleName', 'creditCardName', 'creditCardNumber', 'creditCardSecurityCode', 'creditCardType', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'newPassword', 'nickname', 'oneTimeCode', 'organizationName', 'password', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'URL', 'username') |

---

### `passwordRules` <div className="label ios">iOS</div>

Ao usar `textContentType` como `newPassword` no iOS, podemos informar ao SO os requisitos mínimos da senha para que ele possa gerar uma que os satisfaça. Para criar uma string válida para `PasswordRules`, dê uma olhada nos [Apple Docs](https://developer.apple.com/password-rules/).

:::tip
Se o diálogo de geração de senhas não aparecer, certifique-se de que:

- AutoFill está habilitado: **Settings** → **Passwords & Accounts** → toggle "On" o **AutoFill Passwords**,
- iCloud Keychain está em uso: **Settings** → **Apple ID** → **iCloud** → **Keychain** → toggle "On" o **iCloud Keychain**.
  :::

| Type   |
| ------ |
| string |

---

### `style`

Note que nem todos os estilos Text são suportados, uma lista incompleta do que não é suportado inclui:

- `borderLeftWidth`
- `borderTopWidth`
- `borderRightWidth`
- `borderBottomWidth`
- `borderTopLeftRadius`
- `borderTopRightRadius`
- `borderBottomRightRadius`
- `borderBottomLeftRadius`

[Styles](style.md)

| Type                  |
| --------------------- |
| [Text](text.md#style) |

---

### `textBreakStrategy` <div className="label android">Android</div>

Define a estratégia de quebra de texto no Android API Level 23+, os valores possíveis são `simple`, `highQuality`, `balanced`. O valor padrão é `highQuality`.

| Type                                      |
| ----------------------------------------- |
| enum('simple', 'highQuality', 'balanced') |

---

### `underlineColorAndroid` <div className="label android">Android</div>

A cor do sublinhado do `TextInput`.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `value`

O valor a mostrar para o input de texto. `TextInput` é um componente controlado, o que significa que o valor nativo será forçado a corresponder a esta prop value se fornecido. Para a maioria dos usos, isso funciona muito bem, mas em alguns casos isso pode causar oscilação - uma causa comum é impedir edições mantendo o valor o mesmo. Além de definir o mesmo valor, defina `editable={false}`, ou defina/atualize `maxLength` para evitar edições indesejadas sem oscilação.

| Type   |
| ------ |
| string |

## Methods

### `.focus()`

```tsx
focus();
```

Faz o input nativo solicitar foco.

### `.blur()`

```tsx
blur();
```

Faz o input nativo perder o foco.

### `clear()`

```tsx
clear();
```

Remove todo o texto do `TextInput`.

---

### `isFocused()`

```tsx
isFocused(): boolean;
```

Retorna `true` se o input estiver atualmente focado; `false` caso contrário.

# Known issues

- [react-native#19096](https://github.com/facebook/react-native/issues/19096): Não suporta o `onKeyPreIme` do Android.
- [react-native#19366](https://github.com/facebook/react-native/issues/19366): Chamar .focus() após fechar o teclado do Android via botão voltar não abre o teclado novamente.
- [react-native#26799](https://github.com/facebook/react-native/issues/26799): Não suporta `secureTextEntry` do Android quando `keyboardType="email-address"` ou `keyboardType="phone-pad"`.
