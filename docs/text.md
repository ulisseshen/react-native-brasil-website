---
ia-translated: true
id: text
title: Text
---

Um componente React para exibir texto.

`Text` suporta nesting, styling e touch handling.

No exemplo a seguir, o título e o corpo do texto aninhados herdarão o `fontFamily` de `styles.baseText`, mas o título fornece seus próprios estilos adicionais. O título e o corpo serão empilhados um sobre o outro devido às quebras de linha literais:

```SnackPlayer name=Text%20Function%20Component%20Example
import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={onPressTitle}>
            {titleText}
            {'\n'}
            {'\n'}
          </Text>
          <Text numberOfLines={5}>{bodyText}</Text>
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TextInANest;
```

## Nested text

Tanto Android quanto iOS permitem que você exiba texto formatado anotando intervalos de uma string com formatação específica, como negrito ou texto colorido (`NSAttributedString` no iOS, `SpannableString` no Android). Na prática, isso é muito tedioso. Para o React Native, decidimos usar o paradigma web para isso, onde você pode aninhar texto para obter o mesmo efeito.

```SnackPlayer name=Nested%20Text%20Example
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const BoldAndBeautiful = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
});

export default BoldAndBeautiful;
```

Nos bastidores, o React Native converte isso em um `NSAttributedString` ou `SpannableString` plano que contém as seguintes informações:

```
"I am bold and red"
0-9: bold
9-17: bold, red
```

## Containers

O elemento `<Text>` é único em relação ao layout: tudo dentro dele não está mais usando o layout Flexbox, mas usando layout de texto. Isso significa que os elementos dentro de um `<Text>` não são mais retângulos, mas quebram quando chegam ao final da linha.

```tsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: the text will be inline, if the space allows it
// |First part and second part|

// otherwise, the text will flow as if it was one
// |First part |
// |and second |
// |part       |

<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part and|
// |second part   |

// otherwise, the text will flow in its own block
// |First part |
// |and        |
// |second part|
```

## Limited Style Inheritance

Na web, a maneira usual de definir uma família de fontes e tamanho para todo o documento é tirar proveito das propriedades CSS herdadas, assim:

```css
html {
  font-family:
    'lucida grande', tahoma, verdana, arial, sans-serif;
  font-size: 11px;
  color: #141823;
}
```

Todos os elementos no documento herdarão essa fonte, a menos que eles ou um de seus pais especifique uma nova regra.

No React Native, somos mais rigorosos sobre isso: **você deve envolver todos os nós de texto dentro de um componente `<Text>`**. Você não pode ter um nó de texto diretamente sob um `<View>`.

```tsx
// BAD: will raise exception, can't have a text node as child of a <View>
<View>
  Some text
</View>

// GOOD
<View>
  <Text>
    Some text
  </Text>
</View>
```

Você também perde a capacidade de configurar uma fonte padrão para toda uma subárvore. Enquanto isso, `fontFamily` aceita apenas um único nome de fonte, o que é diferente de `font-family` no CSS. A maneira recomendada de usar fontes e tamanhos consistentes em toda a sua aplicação é criar um componente `MyAppText` que os inclua e usar esse componente em todo o seu aplicativo. Você também pode usar esse componente para criar componentes mais específicos como `MyAppHeaderText` para outros tipos de texto.

```tsx
<View>
  <MyAppText>
    Text styled with the default font for the entire application
  </MyAppText>
  <MyAppHeaderText>Text styled as a header</MyAppHeaderText>
</View>
```

Assumindo que `MyAppText` é um componente que apenas renderiza seus filhos em um componente `Text` com estilo, então `MyAppHeaderText` pode ser definido da seguinte forma:

```tsx
const MyAppHeaderText = ({children}) => {
  return (
    <MyAppText>
      <Text style={{fontSize: 20}}>{children}</Text>
    </MyAppText>
  );
};
```

Compor `MyAppText` dessa maneira garante que obtemos os estilos de um componente de nível superior, mas nos deixa a capacidade de adicionar/sobrescrever em casos de uso específicos.

O React Native ainda tem o conceito de herança de estilo, mas limitado a subárvores de texto. Neste caso, a segunda parte será tanto negrito quanto vermelha.

```tsx
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>and red</Text>
</Text>
```

Acreditamos que essa maneira mais restrita de estilizar texto resultará em aplicativos melhores:

- (Desenvolvedor) Componentes React são projetados com forte isolamento em mente: Você deve ser capaz de colocar um componente em qualquer lugar em sua aplicação, confiando que, enquanto as props forem as mesmas, ele terá a mesma aparência e se comportará da mesma maneira. Propriedades de texto que pudessem herdar de fora das props quebrariam esse isolamento.

- (Implementador) A implementação do React Native também é simplificada. Não precisamos ter um campo `fontFamily` em cada elemento, e não precisamos potencialmente percorrer a árvore até a raiz toda vez que exibimos um nó de texto. A herança de estilo é codificada apenas dentro do componente Text nativo e não vaza para outros componentes ou para o próprio sistema.

---

# Reference

## Props

### `accessibilityHint`

Uma dica de acessibilidade ajuda os usuários a entender o que acontecerá quando eles executarem uma ação no elemento de acessibilidade quando esse resultado não estiver claro a partir do rótulo de acessibilidade.

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

Um valor indicando qual idioma deve ser usado pelo leitor de tela quando o usuário interagir com o elemento. Deve seguir a [BCP 47 specification](https://www.rfc-editor.org/info/bcp47).

Veja a [iOS `accessibilityLanguage` doc](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage) para mais informações.

| Type   |
| ------ |
| string |

---

### `accessibilityLabel`

Sobrescreve o texto que é lido pelo leitor de tela quando o usuário interage com o elemento. Por padrão, o rótulo é construído percorrendo todos os filhos e acumulando todos os nós `Text` separados por espaço.

| Type   |
| ------ |
| string |

---

### `accessibilityRole`

Diz ao leitor de tela para tratar o elemento atualmente focado como tendo um papel específico.

No iOS, esses papéis mapeiam para Accessibility Traits correspondentes. Image button tem a mesma funcionalidade como se o trait fosse definido como 'image' e 'button'. Veja o [Accessibility guide](accessibility.md#accessibilitytraits-ios) para mais informações.

No Android, esses papéis têm funcionalidade similar no TalkBack como adicionar Accessibility Traits no Voiceover no iOS

| Type                                                 |
| ---------------------------------------------------- |
| [AccessibilityRole](accessibility#accessibilityrole) |

---

### `accessibilityState`

Diz ao leitor de tela para tratar o elemento atualmente focado como estando em um estado específico.

Você pode fornecer um estado, nenhum estado ou múltiplos estados. Os estados devem ser passados através de um objeto, por exemplo `{selected: true, disabled: true}`.

| Type                                                   |
| ------------------------------------------------------ |
| [AccessibilityState](accessibility#accessibilitystate) |

---

### `accessibilityActions`

Ações de acessibilidade permitem que uma tecnologia assistiva invoque programaticamente as ações de um componente. A propriedade `accessibilityActions` deve conter uma lista de objetos de ação. Cada objeto de ação deve conter o campo name e label.

Veja o [Accessibility guide](accessibility.md#accessibility-actions) para mais informações.

| Type  | Required |
| ----- | -------- |
| array | No       |

---

### `onAccessibilityAction`

Invocada quando o usuário executa as ações de acessibilidade. O único argumento para esta função é um evento contendo o nome da ação a executar.

Veja o [Accessibility guide](accessibility.md#accessibility-actions) para mais informações.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `accessible`

Quando definido como `true`, indica que a view é um elemento de acessibilidade.

Veja o [Accessibility guide](accessibility#accessible-ios-android) para mais informações.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `adjustsFontSizeToFit`

Especifica se as fontes devem ser reduzidas automaticamente para caber nas restrições de estilo fornecidas.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `allowFontScaling`

Especifica se as fontes devem ser dimensionadas para respeitar as configurações de acessibilidade de Tamanho de Texto.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `android_hyphenationFrequency` <div className="label android">Android</div>

Define a frequência de hifenização automática a usar ao determinar quebras de palavra no Android API Level 23+.

| Type                                | Default  |
| ----------------------------------- | -------- |
| enum(`'none'`, `'normal'`,`'full'`) | `'none'` |

---

### `aria-busy`

Indica que um elemento está sendo modificado e que as tecnologias assistivas podem querer esperar até que as alterações sejam concluídas antes de informar o usuário sobre a atualização.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-checked`

Indica o estado de um elemento marcável. Este campo pode receber um booleano ou a string "mixed" para representar checkboxes mistos.

| Type             | Default |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

---

### `aria-disabled`

Indica que o elemento é perceptível, mas desabilitado, portanto não é editável ou operável de outra forma.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-expanded`

Indica se um elemento expansível está atualmente expandido ou recolhido.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-label`

Define um valor de string que rotula um elemento interativo.

| Type   |
| ------ |
| string |

---

### `aria-selected`

Indica se um elemento selecionável está atualmente selecionado ou não.

| Type    |
| ------- |
| boolean |

### `dataDetectorType` <div className="label android">Android</div>

Determina os tipos de dados convertidos em URLs clicáveis no elemento de texto. Por padrão, nenhum tipo de dado é detectado.

Você pode fornecer apenas um tipo.

| Type                                                          | Default  |
| ------------------------------------------------------------- | -------- |
| enum(`'phoneNumber'`, `'link'`, `'email'`, `'none'`, `'all'`) | `'none'` |

---

### `disabled` <div className="label android">Android</div>

Especifica o estado desabilitado da view de texto para fins de teste.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `dynamicTypeRamp` <div className="label ios">iOS</div>

A rampa de [Dynamic Type](https://developer.apple.com/documentation/uikit/uifont/scaling_fonts_automatically) a aplicar a este elemento no iOS.

| Type                                                                                                                                                     | Default  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum(`'caption2'`, `'caption1'`, `'footnote'`, `'subheadline'`, `'callout'`, `'body'`, `'headline'`, `'title3'`, `'title2'`, `'title1'`, `'largeTitle'`) | `'body'` |

---

### `ellipsizeMode`

Quando `numberOfLines` está definido, esta prop define como o texto será truncado. `numberOfLines` deve ser definido em conjunto com esta prop.

Pode ser um dos seguintes valores:

- `head` - A linha é exibida de modo que o final caiba no contêiner e o texto faltante no início da linha seja indicado por um glifo de reticências. por exemplo, "...wxyz"
- `middle` - A linha é exibida de modo que o início e o final caibam no contêiner e o texto faltante no meio seja indicado por um glifo de reticências. "ab...yz"
- `tail` - A linha é exibida de modo que o início caiba no contêiner e o texto faltante no final da linha seja indicado por um glifo de reticências. por exemplo, "abcd..."
- `clip` - As linhas não são desenhadas além da borda do contêiner de texto.

:::note
No Android, quando `numberOfLines` está definido para um valor maior que `1`, apenas o valor `tail` funcionará corretamente.
:::

| Type                                           | Default |
| ---------------------------------------------- | ------- |
| enum(`'head'`, `'middle'`, `'tail'`, `'clip'`) | `tail`  |

---

### `id`

Usado para localizar esta view a partir do código nativo. Tem precedência sobre a prop `nativeID`.

| Type   |
| ------ |
| string |

---

### `maxFontSizeMultiplier`

Especifica a maior escala possível que uma fonte pode atingir quando `allowFontScaling` está habilitado. Valores possíveis:

- `null/undefined`: herda do nó pai ou do padrão global (0)
- `0`: sem máximo, ignora padrão pai/global
- `>= 1`: define o `maxFontSizeMultiplier` deste nó para este valor

| Type   | Default     |
| ------ | ----------- |
| number | `undefined` |

---

### `minimumFontScale`

Especifica a menor escala possível que uma fonte pode atingir quando `adjustsFontSizeToFit` está habilitado. (valores 0.01-1.0).

| Type   |
| ------ |
| number |

---

### `nativeID`

Usado para localizar esta view a partir do código nativo.

| Type   |
| ------ |
| string |

---

### `numberOfLines`

Usado para truncar o texto com reticências após calcular o layout do texto, incluindo quebra de linha, de modo que o número total de linhas não exceda este número. Definir esta propriedade como `0` resultará em desativar este valor, o que significa que nenhuma restrição de linhas será aplicada.

Esta prop é comumente usada com `ellipsizeMode`.

| Type   | Default |
| ------ | ------- |
| number | `0`     |

---

### `onLayout`

Invocada na montagem e em mudanças de layout.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onLongPress`

Esta função é chamada em pressão longa.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onMoveShouldSetResponder`

Esta view quer "reivindicar" responsividade ao toque? Isso é chamado para cada movimento de toque na `View` quando ela não é o responder.

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onPress`

Função chamada ao pressionar do usuário, disparada após `onPressOut`.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressIn`

Chamada imediatamente quando um toque é engajado, antes de `onPressOut` e `onPress`.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressOut`

Chamada quando um toque é liberado.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderGrant`

A View agora está respondendo a eventos de toque. Este é o momento de destacar e mostrar ao usuário o que está acontecendo.

No Android, retorne true deste callback para evitar que qualquer outro componente nativo se torne responder até que este responder termine.

| Type                                                              |
| ----------------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void ｜ boolean` |

---

### `onResponderMove`

O usuário está movendo o dedo.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderRelease`

Disparado no final do toque.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminate`

O responder foi tomado da `View`. Pode ser tomado por outras views após uma chamada a `onResponderTerminationRequest`, ou pode ser tomado pelo sistema operacional sem perguntar (por exemplo, acontece com o centro de controle/centro de notificações no iOS)

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminationRequest`

Alguma outra `View` quer se tornar um responder e está pedindo a esta `View` para liberar seu responder. Retornar `true` permite sua liberação.

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onStartShouldSetResponderCapture`

Se uma `View` pai quiser evitar que uma `View` filha se torne um responder no início do toque, ela deve ter este manipulador que retorna `true`.

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onTextLayout`

Invocada na mudança de layout do Text.

| Type                                                 |
| ---------------------------------------------------- |
| ([`TextLayoutEvent`](text#textlayoutevent)) => mixed |

---

### `pressRetentionOffset`

Quando a scroll view está desabilitada, isso define o quão longe seu toque pode se mover para fora do botão, antes de desativar o botão. Uma vez desativado, tente movê-lo de volta e você verá que o botão está novamente reativado! Mova-o para frente e para trás várias vezes enquanto a scroll view estiver desabilitada. Certifique-se de passar uma constante para reduzir alocações de memória.

| Type                 |
| -------------------- |
| [Rect](rect), number |

---

### `ref`

Um setter de ref que será atribuído a um [element node](element-nodes) quando montado.

Note que componentes `Text` não fornecem nós de texto, da mesma forma que elementos de parágrafo (`<p>`) na Web são nós de elemento em vez de nós de texto. Nós de texto podem ser encontrados como seus nós filhos.

---

### `role`

`role` comunica o propósito de um componente ao usuário de uma tecnologia assistiva. Tem precedência sobre a prop [`accessibilityRole`](text#accessibilityrole).

| Type                       |
| -------------------------- |
| [Role](accessibility#role) |

---

### `selectable`

Permite que o usuário selecione texto, para usar a funcionalidade nativa de copiar e colar.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `selectionColor` <div className="label android">Android</div>

A cor de destaque do texto.

| Type            |
| --------------- |
| [color](colors) |

---

### `style`

| Type                                                                 |
| -------------------------------------------------------------------- |
| [Text Style](text-style-props), [View Style Props](view-style-props) |

---

### `suppressHighlighting` <div className="label ios">iOS</div>

Quando `true`, nenhuma mudança visual é feita quando o texto é pressionado. Por padrão, um oval cinza destaca o texto ao pressionar.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `testID`

Usado para localizar esta view em testes end-to-end.

| Type   |
| ------ |
| string |

---

### `textBreakStrategy` <div className="label android">Android</div>

Define a estratégia de quebra de texto no Android API Level 23+, valores possíveis são `simple`, `highQuality`, `balanced`.

| Type                                            | Default       |
| ----------------------------------------------- | ------------- |
| enum(`'simple'`, `'highQuality'`, `'balanced'`) | `highQuality` |

---

### `lineBreakStrategyIOS` <div className="label ios">iOS</div>

Define a estratégia de quebra de linha no iOS 14+. Valores possíveis são `none`, `standard`, `hangul-word` e `push-out`.

| Type                                                        | Default  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

## Type Definitions

### TextLayout

O objeto `TextLayout` é parte do callback [`TextLayoutEvent`](text#textlayoutevent) e contém os dados de medição para a linha `Text`.

#### Example

```js
{
    capHeight: 10.496,
    ascender: 14.624,
    descender: 4,
    width: 28.224,
    height: 18.624,
    xHeight: 6.048,
    x: 0,
    y: 0
}
```

#### Properties

| Name      | Type   | Optional | Description                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------- |
| ascender  | number | No       | A altura do ascendente da linha após as mudanças de layout do texto.        |
| capHeight | number | No       | Altura da letra maiúscula acima da linha de base.                           |
| descender | number | No       | A altura do descendente da linha após as mudanças de layout do texto.       |
| height    | number | No       | Altura da linha após as mudanças de layout do texto.                        |
| width     | number | No       | Largura da linha após as mudanças de layout do texto.                       |
| x         | number | No       | Coordenada X da linha dentro do componente Text.                            |
| xHeight   | number | No       | Distância entre a linha de base e a mediana da linha (tamanho do corpo).    |
| y         | number | No       | Coordenada Y da linha dentro do componente Text.                            |

### TextLayoutEvent

O objeto `TextLayoutEvent` é retornado no callback como resultado de uma mudança de layout do componente. Ele contém uma chave chamada `lines` com um valor que é um array contendo objetos [`TextLayout`](text#textlayout) correspondentes a cada linha de texto renderizada.

#### Example

```js
{
  lines: [
    TextLayout,
    TextLayout,
    // ...
  ];
  target: 1127;
}
```

#### Properties

| Name   | Type                                    | Optional | Description                                                |
| ------ | --------------------------------------- | -------- | ---------------------------------------------------------- |
| lines  | array of [TextLayout](text#textlayout)s | No       | Fornece os dados TextLayout para cada linha renderizada.   |
| target | number                                  | No       | O node id do elemento.                                     |
