---
ia-translated: true
id: view
title: View
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

O componente mais fundamental para construir uma UI, `View` é um container que suporta layout com [flexbox](flexbox.md), [style](style.md), [manipulação de toque](handling-touches.md), e controles de [accessibility](accessibility.md). `View` mapeia diretamente para o equivalente de view nativa em qualquer plataforma que o React Native esteja executando, seja um `UIView`, `<div>`, `android.view`, etc.

`View` foi projetado para ser aninhado dentro de outras views e pode ter de 0 a muitos filhos de qualquer tipo.

Este exemplo cria uma `View` que envolve duas caixas com cor e um componente de texto em uma linha com padding.

```SnackPlayer name=View%20Example
import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ViewBoxesWithColorAndText = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flexDirection: 'row'}}>
        <View style={{height: 100, backgroundColor: 'blue', flex: 0.2}} />
        <View style={{height: 100, backgroundColor: 'red', flex: 0.4}} />
        <Text>Hello World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewBoxesWithColorAndText;
```

:::note
`View`s foram projetadas para serem usadas com [`StyleSheet`](style.md) para clareza e performance, embora estilos inline também sejam suportados.
:::

### Synthetic Touch Events

Para props de resposta da `View` (por exemplo, `onResponderMove`), o evento de toque sintético passado para elas está na forma de [PressEvent](pressevent).

---

# Reference

## Props

---

### `accessibilityActions`

Ações de acessibilidade permitem que uma tecnologia assistiva invoque programaticamente as ações de um componente. A propriedade `accessibilityActions` deve conter uma lista de objetos de ação. Cada objeto de ação deve conter os campos name e label.

Veja o [guia de Accessibility](accessibility.md#accessibility-actions) para mais informações.

| Type  |
| ----- |
| array |

---

### `accessibilityElementsHidden` <div className="label ios">iOS</div>

Um valor booleano indicando se o elemento de acessibilidade fornecido, e quaisquer elementos de acessibilidade que ele contenha, estão ocultos. O padrão é `false`.

Veja o [guia de Accessibility](accessibility.md#accessibilityelementshidden-ios) para mais informações.

| Type |
| ---- |
| bool |

---

### `accessibilityHint`

Uma dica de acessibilidade ajuda os usuários a entenderem o que acontecerá quando eles executarem uma ação no elemento de acessibilidade quando esse resultado não estiver claro a partir do rótulo de acessibilidade.

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

Um valor indicando qual idioma deve ser usado pelo leitor de tela quando o usuário interage com o elemento. Deve seguir a [especificação BCP 47](https://www.rfc-editor.org/info/bcp47).

Veja a [documentação do iOS `accessibilityLanguage`](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage) para mais informações.

| Type   |
| ------ |
| string |

---

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

Um valor indicando que esta view deve ou não ser invertida quando a inversão de cores estiver ativada. Um valor de `true` dirá à view para não ser invertida mesmo se a inversão de cores estiver ativada.

Veja o [guia de Accessibility](accessibility.md#accessibilityignoresinvertcolors) para mais informações.

| Type |
| ---- |
| bool |

---

### `accessibilityLabel`

Substitui o texto que é lido pelo leitor de tela quando o usuário interage com o elemento. Por padrão, o rótulo é construído percorrendo todos os filhos e acumulando todos os nós `Text` separados por espaço.

| Type   |
| ------ |
| string |

---

### `accessibilityLiveRegion` <div className="label android">Android</div>

Indica aos serviços de acessibilidade se o usuário deve ser notificado quando esta view mudar. Funciona apenas para Android API >= 19. Valores possíveis:

- `'none'` - Os serviços de acessibilidade não devem anunciar mudanças nesta view.
- `'polite'`- Os serviços de acessibilidade devem anunciar mudanças nesta view.
- `'assertive'` - Os serviços de acessibilidade devem interromper a fala em andamento para anunciar imediatamente mudanças nesta view.

Veja a [documentação do Android `View`](https://developer.android.com/reference/android/view/View.html#attr_android:accessibilityLiveRegion) para referência.

| Type                                |
| ----------------------------------- |
| enum('none', 'polite', 'assertive') |

---

### `accessibilityRole`

`accessibilityRole` comunica o propósito de um componente ao usuário de uma tecnologia assistiva.

`accessibilityRole` pode ser um dos seguintes:

- `'none'` - Usado quando o elemento não tem role.
- `'button'` - Usado quando o elemento deve ser tratado como um botão.
- `'link'` - Usado quando o elemento deve ser tratado como um link.
- `'search'` - Usado quando o elemento de campo de texto também deve ser tratado como um campo de busca.
- `'image'` - Usado quando o elemento deve ser tratado como uma imagem. Pode ser combinado com button ou link, por exemplo.
- `'keyboardkey'` - Usado quando o elemento age como uma tecla de teclado.
- `'text'` - Usado quando o elemento deve ser tratado como texto estático que não pode mudar.
- `'adjustable'` - Usado quando um elemento pode ser "ajustado" (por exemplo, um slider).
- `'imagebutton'` - Usado quando o elemento deve ser tratado como um botão e também é uma imagem.
- `'header'` - Usado quando um elemento age como um cabeçalho para uma seção de conteúdo (por exemplo, o título de uma barra de navegação).
- `'summary'` - Usado quando um elemento pode ser usado para fornecer um resumo rápido das condições atuais no app quando o app é iniciado pela primeira vez.
- `'alert'` - Usado quando um elemento contém texto importante a ser apresentado ao usuário.
- `'checkbox'` - Usado quando um elemento representa um checkbox que pode ser marcado, desmarcado ou ter estado misto.
- `'combobox'` - Usado quando um elemento representa uma caixa de combinação, que permite ao usuário selecionar entre várias opções.
- `'menu'` - Usado quando o componente é um menu de opções.
- `'menubar'` - Usado quando um componente é um container de múltiplos menus.
- `'menuitem'` - Usado para representar um item dentro de um menu.
- `'progressbar'` - Usado para representar um componente que indica o progresso de uma tarefa.
- `'radio'` - Usado para representar um botão de rádio.
- `'radiogroup'` - Usado para representar um grupo de botões de rádio.
- `'scrollbar'` - Usado para representar uma barra de rolagem.
- `'spinbutton'` - Usado para representar um botão que abre uma lista de opções.
- `'switch'` - Usado para representar um switch que pode ser ligado e desligado.
- `'tab'` - Usado para representar uma aba.
- `'tablist'` - Usado para representar uma lista de abas.
- `'timer'` - Usado para representar um temporizador.
- `'toolbar'` - Usado para representar uma barra de ferramentas (um container de botões de ação ou componentes).
- `'grid'` - Usado com ScrollView, VirtualizedList, FlatList, ou SectionList para representar uma grade. Adiciona os anúncios de entrada/saída da grade ao GridView do Android.

| Type   |
| ------ |
| string |

---

### `accessibilityState`

Descreve o estado atual de um componente ao usuário de uma tecnologia assistiva.

Veja o [guia de Accessibility](accessibility.md#accessibilitystate-ios-android) para mais informações.

| Type                                                                                             |
| ------------------------------------------------------------------------------------------------ |
| object: `{disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool}` |

---

### `accessibilityValue`

Representa o valor atual de um componente. Pode ser uma descrição textual do valor de um componente, ou para componentes baseados em intervalo, como sliders e barras de progresso, contém informações de intervalo (mínimo, atual e máximo).

Veja o [guia de Accessibility](accessibility.md#accessibilityvalue-ios-android) para mais informações.

| Type                                                            |
| --------------------------------------------------------------- |
| object: `{min: number, max: number, now: number, text: string}` |

---

### `accessibilityViewIsModal` <div className="label ios">iOS</div>

Um valor indicando se o VoiceOver deve ignorar os elementos dentro de views que são irmãs do receptor. O padrão é `false`.

Veja o [guia de Accessibility](accessibility.md#accessibilityviewismodal-ios) para mais informações.

| Type |
| ---- |
| bool |

---

### `accessible`

Quando `true`, indica que a view é um elemento de acessibilidade e detectável por tecnologias assistivas como leitores de tela e teclados de hardware. Por padrão, todos os elementos tocáveis são acessíveis.

Veja o [guia de Accessibility](accessibility.md#accessible) para mais informações.

---

### `aria-busy`

Indica que um elemento está sendo modificado e que as tecnologias assistivas podem querer esperar até que as mudanças estejam completas antes de informar o usuário sobre a atualização.

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

Indica que o elemento é perceptível mas desabilitado, então não é editável ou operável de outra forma.

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

### `aria-hidden`

Indica se o elemento está oculto das tecnologias assistivas.

Por exemplo, em uma janela que contém views irmãs `A` e `B`, definir `aria-hidden` como `true` na view `B` faz com que o VoiceOver ignore o elemento `B` e seus filhos.

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

### `aria-labelledby` <div className="label android">Android</div>

Identifica o elemento que rotula o elemento ao qual é aplicado. O valor de `aria-labelledby` deve corresponder ao [`nativeID`](view.md#nativeid) do elemento relacionado:

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput aria-label="input" aria-labelledby="formLabel" />
</View>
```

| Type   |
| ------ |
| string |

---

### `aria-live` <div className="label android">Android</div>

Indica que um elemento será atualizado e descreve os tipos de atualizações que os agentes de usuário, tecnologias assistivas e usuário podem esperar da região ativa.

- **off** Os serviços de acessibilidade não devem anunciar mudanças nesta view.
- **polite** Os serviços de acessibilidade devem anunciar mudanças nesta view.
- **assertive** Os serviços de acessibilidade devem interromper a fala em andamento para anunciar imediatamente mudanças nesta view.

| Type                                     | Default |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

Valor booleano indicando se o VoiceOver deve ignorar os elementos dentro de views que são irmãs do receptor. Tem precedência sobre a prop [`accessibilityViewIsModal`](#accessibilityviewismodal-ios).

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-selected`

Indica se um elemento selecionável está atualmente selecionado ou não.

| Type    |
| ------- |
| boolean |

### `aria-valuemax`

Representa o valor máximo para componentes baseados em intervalo, como sliders e barras de progresso. Tem precedência sobre o valor `max` na prop `accessibilityValue`.

| Type   |
| ------ |
| number |

---

### `aria-valuemin`

Representa o valor mínimo para componentes baseados em intervalo, como sliders e barras de progresso. Tem precedência sobre o valor `min` na prop `accessibilityValue`.

| Type   |
| ------ |
| number |

---

### `aria-valuenow`

Representa o valor atual para componentes baseados em intervalo, como sliders e barras de progresso. Tem precedência sobre o valor `now` na prop `accessibilityValue`.

| Type   |
| ------ |
| number |

---

### `aria-valuetext`

Representa a descrição textual do componente. Tem precedência sobre o valor `text` na prop `accessibilityValue`.

| Type   |
| ------ |
| string |

---

### `collapsable`

Views que são usadas apenas para fazer layout de seus filhos ou que de outra forma não desenham nada podem ser removidas automaticamente da hierarquia nativa como uma otimização. Defina esta propriedade como `false` para desabilitar esta otimização e garantir que esta `View` exista na hierarquia de view nativa.

| Type    | Default |
| ------- | ------- |
| boolean | true    |

---

### `collapsableChildren`

Definir como false impede que os filhos diretos da view sejam removidos da hierarquia de view nativa, similar ao efeito de definir `collapsable={false}` em cada filho.

| Type    | Default |
| ------- | ------- |
| boolean | true    |

---

### `experimental_accessibilityOrder`

<ExperimentalAPIWarning />

`experimental_accessibilityOrder` indica a ordem na qual uma tecnologia assistiva foca nos descendentes desta `View`. Esta prop recebe um array de strings onde cada string é um [`nativeID`](view.md#nativeid) de algum componente descendente cuja ordem está sendo definida. Esta prop não habilita acessibilidade por si só, cada componente referenciado ainda precisa ser acessível definindo [`accessible`](view.md#accessible) como true. Esta prop é tanto **aninhável** quanto **exaustiva**, o que significa

- Se `experimental_accessibilityOrder` contém uma referência a algum componente não acessível, ele focará nos descendentes desse componente na ordem padrão. Adicionalmente, também pode conter uma referência a outros componentes que também têm um `experimental_accessibilityOrder`.
- Se algum componente que é acessível de outra forma não for diretamente referenciado em `experimental_accessibilityOrder`, ou aninhado dentro de algum container diretamente referenciado em `experimental_accessibilityOrder`, então ele não será acessível.

Veja o [guia de accessibility](accessibility.md#experimental_accessibilityorder) para mais informações.

| Type             |
| ---------------- |
| array of strings |

---

### `focusable` <div className="label android">Android</div>

Se esta `View` deve ser focalizável com um dispositivo de entrada não-toque, por exemplo, receber foco com um teclado de hardware.

| Type    |
| ------- |
| boolean |

---

### `hitSlop`

Define quão longe um evento de toque pode começar da view. Diretrizes de interface típicas recomendam alvos de toque que tenham pelo menos 30 - 40 pontos/pixels independentes de densidade.

Por exemplo, se uma view tocável tem uma altura de 20, a altura tocável pode ser estendida para 40 com `hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}`

:::note
A área de toque nunca se estende além dos limites da view pai, e o índice Z de views irmãs sempre tem precedência se um toque atingir duas views sobrepostas.
:::

| Type                                                                 |
| -------------------------------------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` |

---

### `id`

Usado para localizar esta view a partir de classes nativas. Tem precedência sobre a prop `nativeID`.

:::warning
Isso desabilita a otimização de 'remoção de view somente de layout' para esta view!
:::

| Type   |
| ------ |
| string |

---

### `importantForAccessibility` <div className="label android">Android</div>

Controla quão importante a view é para acessibilidade, ou seja, se ela dispara eventos de acessibilidade e se é reportada aos serviços de acessibilidade que consultam a tela. Funciona apenas para Android.

Valores possíveis:

- `'auto'` - O sistema determina se a view é importante para acessibilidade - padrão (recomendado).
- `'yes'` - A view é importante para acessibilidade.
- `'no'` - A view não é importante para acessibilidade.
- `'no-hide-descendants'` - A view não é importante para acessibilidade, nem qualquer uma de suas views descendentes.

Veja a [documentação do Android `importantForAccessibility`](https://developer.android.com/reference/android/R.attr.html#importantForAccessibility) para referência.

| Type                                             |
| ------------------------------------------------ |
| enum('auto', 'yes', 'no', 'no-hide-descendants') |

---

### `nativeID`

Usado para localizar esta view a partir de classes nativas.

:::warning
Isso desabilita a otimização de 'remoção de view somente de layout' para esta view!
:::

| Type   |
| ------ |
| string |

---

### `needsOffscreenAlphaCompositing`

Se esta `View` precisa ser renderizada fora da tela e composta com um alpha para preservar 100% de cores corretas e comportamento de mesclagem. O padrão (`false`) volta a desenhar o componente e seus filhos com um alpha aplicado à pintura usada para desenhar cada elemento em vez de renderizar o componente completo fora da tela e compô-lo de volta com um valor alpha. Esse padrão pode ser perceptível e indesejado no caso em que a `View` na qual você está definindo uma opacidade tem múltiplos elementos sobrepostos (por exemplo, múltiplas `View`s sobrepostas, ou texto e um plano de fundo).

Renderizar fora da tela para preservar o comportamento correto do alpha é extremamente caro e difícil de depurar para desenvolvedores não nativos, razão pela qual não está ativado por padrão. Se você precisa habilitar esta propriedade para uma animação, considere combiná-la com renderToHardwareTextureAndroid se o **conteúdo** da view for estático (ou seja, não precisa ser redesenhado a cada frame). Se essa propriedade estiver habilitada, esta View será renderizada fora da tela uma vez, salva em uma textura de hardware, e então composta na tela com um alpha a cada frame sem ter que trocar alvos de renderização na GPU.

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

Designa a próxima view a receber foco quando o usuário navega para baixo. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

Designa a próxima view a receber foco quando o usuário navega para frente. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

Designa a próxima view a receber foco quando o usuário navega para a esquerda. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

Designa a próxima view a receber foco quando o usuário navega para a direita. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

Designa a próxima view a receber foco quando o usuário navega para cima. Veja a [documentação do Android](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp).

| Type   |
| ------ |
| number |

---

### `onAccessibilityAction`

Invocado quando o usuário executa as ações de acessibilidade. O único argumento para esta função é um evento contendo o nome da ação a ser executada.

Veja o [guia de Accessibility](accessibility.md#accessibility-actions) para mais informações.

| Type     |
| -------- |
| function |

---

### `onAccessibilityEscape` <div className="label ios">iOS</div>

Quando `accessible` é `true`, o sistema invocará esta função quando o usuário executar o gesto de escape.

| Type     |
| -------- |
| function |

---

### `onAccessibilityTap` <div className="label ios">iOS</div>

Quando `accessible` é true, o sistema tentará invocar esta função quando o usuário executar o gesto de toque de acessibilidade.

| Type     |
| -------- |
| function |

---

### `onLayout`

Invocado na montagem e em mudanças de layout.

Este evento é disparado imediatamente assim que o layout é calculado, mas o novo layout pode ainda não estar refletido na tela no momento em que o evento é recebido, especialmente se uma animação de layout estiver em andamento.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onMagicTap` <div className="label ios">iOS</div>

Quando `accessible` é `true`, o sistema invocará esta função quando o usuário executar o gesto de toque mágico.

| Type     |
| -------- |
| function |

---

### `onMoveShouldSetResponder`

Esta view quer "reivindicar" responsividade ao toque? Isso é chamado para cada movimento de toque na `View` quando ela não é o respondedor.

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onMoveShouldSetResponderCapture`

Se uma `View` pai quiser impedir que uma `View` filha se torne respondedora em um movimento, ela deve ter este manipulador que retorna `true`.

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onResponderGrant`

A View agora está respondendo a eventos de toque. Este é o momento de destacar e mostrar ao usuário o que está acontecendo.

No Android, retorne true deste callback para impedir que quaisquer outros componentes nativos se tornem respondedores até que este respondedor termine.

| Type                                                              |
| ----------------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void ｜ boolean` |

---

### `onResponderMove`

O usuário está movendo seu dedo.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderReject`

Outro respondedor já está ativo e não o liberará para aquela `View` solicitando ser o respondedor.

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

O respondedor foi retirado da `View`. Pode ser retirado por outras views após uma chamada a `onResponderTerminationRequest`, ou pode ser retirado pelo SO sem perguntar (por exemplo, acontece com a central de controle/central de notificações no iOS)

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminationRequest`

Alguma outra `View` quer se tornar respondedora e está pedindo a esta `View` para liberar seu respondedor. Retornar `true` permite sua liberação.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onStartShouldSetResponder`

Esta view quer se tornar respondedora no início de um toque?

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onStartShouldSetResponderCapture`

Se uma `View` pai quiser impedir que uma `View` filha se torne respondedora no início de um toque, ela deve ter este manipulador que retorna `true`.

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `pointerEvents`

Controla se a `View` pode ser o alvo de eventos de toque.

- `'auto'`: A View pode ser o alvo de eventos de toque.
- `'none'`: A View nunca é o alvo de eventos de toque.
- `'box-none'`: A View nunca é o alvo de eventos de toque mas suas subviews podem ser. Ela se comporta como se a view tivesse as seguintes classes em CSS:

```css
.box-none {
  pointer-events: none;
}
.box-none * {
  pointer-events: auto;
}
```

- `'box-only'`: A view pode ser o alvo de eventos de toque mas suas subviews não podem ser. Ela se comporta como se a view tivesse as seguintes classes em CSS:

```css
.box-only {
  pointer-events: auto;
}
.box-only * {
  pointer-events: none;
}
```

| Type                                         |
| -------------------------------------------- |
| enum('box-none', 'none', 'box-only', 'auto') |

---

### `ref`

Um setter de ref que será atribuído a um [nó de elemento](element-nodes) quando montado.

---

### `removeClippedSubviews`

Esta é uma propriedade de performance reservada exposta por `RCTView` e é útil para rolagem de conteúdo quando há muitas subviews, a maioria das quais está fora da tela. Para que esta propriedade seja eficaz, ela deve ser aplicada a uma view que contenha muitas subviews que se estendem além de seu limite. As subviews também devem ter `overflow: hidden`, assim como a view container (ou uma de suas superviews).

| Type |
| ---- |
| bool |

---

### `renderToHardwareTextureAndroid` <div className="label android">Android</div>

Se esta `View` deve renderizar a si mesma (e todos os seus filhos) em uma única textura de hardware na GPU.

No Android, isso é útil para animações e interações que modificam apenas opacidade, rotação, translação e/ou escala: nesses casos, a view não precisa ser redesenhada e as listas de exibição não precisam ser re-executadas. A textura pode ser reutilizada e recomposta com diferentes parâmetros. A desvantagem é que isso pode usar memória de vídeo limitada, então esta prop deve ser definida de volta como false no final da interação/animação.

| Type |
| ---- |
| bool |

---

### `role`

`role` comunica o propósito de um componente ao usuário de uma tecnologia assistiva. Tem precedência sobre a prop [`accessibilityRole`](view#accessibilityrole).

| Type                       |
| -------------------------- |
| [Role](accessibility#role) |

---

### `shouldRasterizeIOS` <div className="label ios">iOS</div>

Se esta `View` deve ser renderizada como um bitmap antes da composição.

No iOS, isso é útil para animações e interações que não modificam as dimensões deste componente nem de seus filhos; por exemplo, ao transladar a posição de uma view estática, a rasterização permite que o renderizador reutilize um bitmap em cache de uma view estática e o componha rapidamente durante cada frame.

A rasterização incorre em uma passagem de desenho fora da tela e o bitmap consome memória. Teste e meça ao usar esta propriedade.

| Type |
| ---- |
| bool |

---

### `style`

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `tabIndex` <div className="label android">Android</div>

Se esta `View` deve ser focalizável com um dispositivo de entrada não-toque, por exemplo, receber foco com um teclado de hardware.
Suporta os seguintes valores:

- `0` - View é focalizável
- `-1` - View não é focalizável

| Type        |
| ----------- |
| enum(0, -1) |

---

### `testID`

Usado para localizar esta view em testes end-to-end.

:::warning
Isso desabilita a otimização de 'remoção de view somente de layout' para esta view!
:::

| Type   |
| ------ |
| string |
