---
ia-translated: true
id: accessibility
title: Acessibilidade
description: Crie apps mobile acessíveis a tecnologias assistivas com a suíte de APIs do React Native projetadas para funcionar com Android e iOS.
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

Tanto o Android quanto o iOS fornecem APIs para integrar apps com tecnologias assistivas como os leitores de tela integrados VoiceOver (iOS) e TalkBack (Android). O React Native possui APIs complementares que permitem que seu app acomode todos os usuários.

:::info
Android e iOS diferem ligeiramente em suas abordagens, e portanto as implementações do React Native podem variar por plataforma.
:::

## Propriedades de acessibilidade

### `accessible`

Quando `true`, indica que a view é descobrível por tecnologias assistivas como leitores de tela e teclados de hardware. Note que isso não significa necessariamente que a view será focada pelo VoiceOver ou TalkBack. Existem várias razões para isso, como o VoiceOver não permitir elementos de acessibilidade aninhados, ou o TalkBack optar por focar algum elemento pai.

Por padrão, todos os elementos tocáveis são acessíveis.

No Android, `accessible` será traduzido para o [`focusable`](<https://developer.android.com/reference/android/view/View#setFocusable(boolean)>) nativo. No iOS, ele se traduz para o [`isAccessibilityElement`](https://developer.apple.com/documentation/uikit/uiaccessibilityelement/isaccessibilityelement?language=objc) nativo.

```tsx
<View>
  <View accessible={true} />
  <View />
</View>
```

No exemplo acima, o foco de acessibilidade está disponível apenas na primeira view filha com a propriedade `accessible`, e não para o pai ou irmão sem `accessible`.

### `accessibilityLabel`

Quando uma view é marcada como acessível, é uma boa prática definir um `accessibilityLabel` na view, para que pessoas que usam VoiceOver ou TalkBack saibam qual elemento selecionaram. Um leitor de tela verbalizará essa string quando o elemento associado for selecionado.

Para usar, defina a propriedade `accessibilityLabel` com uma string personalizada em sua View, Text ou Touchable:

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Tap me!"
  onPress={onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableOpacity>
```

No exemplo acima, o `accessibilityLabel` no elemento TouchableOpacity seria por padrão "Press me!". O label é construído concatenando todos os filhos Text node separados por espaços.

### `accessibilityLabelledBy` <div className="label android">Android</div>

Uma referência a outro elemento [nativeID](view.md#nativeid) usado para construir formulários complexos.
O valor de `accessibilityLabelledBy` deve corresponder ao `nativeID` do elemento relacionado:

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput
    accessibilityLabel="input"
    accessibilityLabelledBy="formLabel"
  />
</View>
```

No exemplo acima, o leitor de tela anuncia `Input, Edit Box for Label for Input Field` ao focar no TextInput.

### `accessibilityHint`

Uma dica de acessibilidade pode ser usada para fornecer contexto adicional ao usuário sobre o resultado da ação quando não está claro apenas pelo label de acessibilidade.

Forneça à propriedade `accessibilityHint` uma string personalizada em sua View, Text ou Touchable:

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Go back"
  accessibilityHint="Navigates to the previous screen"
  onPress={onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Back</Text>
  </View>
</TouchableOpacity>
```

<div className="label ios basic">iOS</div>

No exemplo acima, o VoiceOver lerá a dica após o label, se o usuário tiver dicas habilitadas nas configurações do VoiceOver do dispositivo. Leia mais sobre diretrizes para `accessibilityHint` nos [iOS Developer Docs](https://developer.apple.com/documentation/objectivec/nsobject/1615093-accessibilityhint)

<div className="label android basic">Android</div>

No exemplo acima, o TalkBack lerá a dica após o label. Neste momento, dicas não podem ser desativadas no Android.

### `accessibilityLanguage` <div className="label ios">iOS</div>

Ao usar a propriedade `accessibilityLanguage`, o leitor de tela entenderá qual idioma usar ao ler o **label**, **value** e **hint** do elemento. O valor de string fornecido deve seguir a [especificação BCP 47](https://www.rfc-editor.org/info/bcp47).

```tsx
<View
  accessible={true}
  accessibilityLabel="Pizza"
  accessibilityLanguage="it-IT">
  <Text>🍕</Text>
</View>
```

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

Inverter cores da tela é um recurso de acessibilidade disponível no iOS e iPadOS para pessoas com daltonismo, baixa visão ou deficiência visual. Se houver uma view que você não deseja inverter quando essa configuração estiver ativada, possivelmente uma foto, defina esta propriedade como `true`.

### `accessibilityLiveRegion` <div className="label android">Android</div>

Quando componentes mudam dinamicamente, queremos que o TalkBack alerte o usuário final. Isso é possível através da propriedade `accessibilityLiveRegion`. Ela pode ser definida como `none`, `polite` e `assertive`:

- **none** Serviços de acessibilidade não devem anunciar mudanças nesta view.
- **polite** Serviços de acessibilidade devem anunciar mudanças nesta view.
- **assertive** Serviços de acessibilidade devem interromper a fala em andamento para anunciar imediatamente mudanças nesta view.

```tsx
<TouchableWithoutFeedback onPress={addOne}>
  <View style={styles.embedded}>
    <Text>Click me</Text>
  </View>
</TouchableWithoutFeedback>
<Text accessibilityLiveRegion="polite">
  Clicked {count} times
</Text>
```

No exemplo acima, o método `addOne` muda a variável de estado `count`. Quando o TouchableWithoutFeedback é acionado, o TalkBack lê o texto na view Text por causa de sua propriedade `accessibilityLiveRegion="polite"`.

### `accessibilityRole`

`accessibilityRole` comunica o propósito de um componente ao usuário de tecnologia assistiva.

`accessibilityRole` pode ser um dos seguintes:

- **adjustable** Usado quando um elemento pode ser "ajustado" (por exemplo, um slider).
- **alert** Usado quando um elemento contém texto importante a ser apresentado ao usuário.
- **button** Usado quando o elemento deve ser tratado como um botão.
- **checkbox** Usado quando um elemento representa uma checkbox que pode ser marcada, desmarcada ou ter um estado misto.
- **combobox** Usado quando um elemento representa uma combo box, que permite ao usuário selecionar entre várias opções.
- **header** Usado quando um elemento atua como cabeçalho para uma seção de conteúdo (por exemplo, o título de uma barra de navegação).
- **image** Usado quando o elemento deve ser tratado como uma imagem. Pode ser combinado com um botão ou link.
- **imagebutton** Usado quando o elemento deve ser tratado como um botão e também é uma imagem.
- **keyboardkey** Usado quando o elemento atua como uma tecla de teclado.
- **link** Usado quando o elemento deve ser tratado como um link.
- **menu** Usado quando o componente é um menu de opções.
- **menubar** Usado quando um componente é um contêiner de múltiplos menus.
- **menuitem** Usado para representar um item dentro de um menu.
- **none** Usado quando o elemento não tem função.
- **progressbar** Usado para representar um componente que indica o progresso de uma tarefa.
- **radio** Usado para representar um botão de rádio.
- **radiogroup** Usado para representar um grupo de botões de rádio.
- **scrollbar** Usado para representar uma barra de rolagem.
- **search** Usado quando um elemento de campo de texto também deve ser tratado como um campo de busca.
- **spinbutton** Usado para representar um botão que abre uma lista de opções.
- **summary** Usado quando um elemento pode ser usado para fornecer um resumo rápido das condições atuais no app quando o app é iniciado pela primeira vez.
- **switch** Usado para representar um switch que pode ser ligado e desligado.
- **tab** Usado para representar uma aba.
- **tablist** Usado para representar uma lista de abas.
- **text** Usado quando o elemento deve ser tratado como texto estático que não pode mudar.
- **timer** Usado para representar um timer.
- **togglebutton** Usado para representar um botão de alternância. Deve ser usado com accessibilityState checked para indicar se o botão está ativado ou desativado.
- **toolbar** Usado para representar uma barra de ferramentas (um contêiner de botões de ação ou componentes).
- **grid** Usado com ScrollView, VirtualizedList, FlatList ou SectionList para representar uma grade. Adiciona os anúncios de entrada/saída de grade ao GridView do Android.

### `accessibilityShowsLargeContentViewer` <div className="label ios">iOS</div>

Um valor booleano que determina se o visualizador de conteúdo grande é mostrado quando o usuário executa um pressionamento longo no elemento.

Disponível no iOS 13.0 e posterior.

### `accessibilityLargeContentTitle` <div className="label ios">iOS</div>

Uma string que será usada como título do visualizador de conteúdo grande quando ele for mostrado.

Requer que `accessibilityShowsLargeContentViewer` seja definido como `true`.

```tsx
<View
  accessibilityShowsLargeContentViewer={true}
  accessibilityLargeContentTitle="Home Tab">
  <Text>Home</Text>
</View>
```

### `accessibilityState`

Descreve o estado atual de um componente para o usuário de tecnologia assistiva.

`accessibilityState` é um objeto. Ele contém os seguintes campos:

| Name     | Description                                                                                                                                  | Type               | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| disabled | Indica se o elemento está desabilitado ou não.                                                                                               | boolean            | No       |
| selected | Indica se um elemento selecionável está atualmente selecionado ou não.                                                                       | boolean            | No       |
| checked  | Indica o estado de um elemento marcável. Este campo pode receber um booleano ou a string "mixed" para representar checkboxes mistas.        | boolean or 'mixed' | No       |
| busy     | Indica se um elemento está atualmente ocupado ou não.                                                                                        | boolean            | No       |
| expanded | Indica se um elemento expansível está atualmente expandido ou recolhido.                                                                     | boolean            | No       |

Para usar, defina `accessibilityState` como um objeto com uma definição específica.

### `accessibilityValue`

Representa o valor atual de um componente. Pode ser uma descrição textual do valor de um componente ou, para componentes baseados em intervalo, como sliders e barras de progresso, contém informações de intervalo (mínimo, atual e máximo).

`accessibilityValue` é um objeto. Ele contém os seguintes campos:

| Name | Description                                                                                                          | Type    | Required                  |
| ---- | -------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------- |
| min  | O valor mínimo do intervalo deste componente.                                                                        | integer | Required if `now` is set. |
| max  | O valor máximo do intervalo deste componente.                                                                        | integer | Required if `now` is set. |
| now  | O valor atual do intervalo deste componente.                                                                         | integer | No                        |
| text | Uma descrição textual do valor deste componente. Substituirá `min`, `now` e `max` se definido.                      | string  | No                        |

### `accessibilityViewIsModal` <div className="label ios">iOS</div>

Um valor booleano que indica se o VoiceOver deve ignorar os elementos dentro de views que são irmãs do receptor.

Por exemplo, em uma janela que contém views irmãs `A` e `B`, definir `accessibilityViewIsModal` como `true` na view `B` faz com que o VoiceOver ignore os elementos na view `A`. Por outro lado, se a view `B` contém uma view filha `C` e você define `accessibilityViewIsModal` como `true` na view `C`, o VoiceOver não ignora os elementos na view `A`.

### `accessibilityElementsHidden` <div className="label ios">iOS</div>

Um valor booleano indicando se o elemento de acessibilidade fornecido, e quaisquer elementos de acessibilidade que ele contém, estão ocultos.

Por exemplo, em uma janela que contém views irmãs `A` e `B`, definir `accessibilityElementsHidden` como `true` na view `B` faz com que o VoiceOver ignore a view `B` e quaisquer elementos que ela contém. Isso é similar à propriedade Android `importantForAccessibility="no-hide-descendants"`.

### `aria-valuemax`

Representa o valor máximo para componentes baseados em intervalo, como sliders e barras de progresso.

### `aria-valuemin`

Representa o valor mínimo para componentes baseados em intervalo, como sliders e barras de progresso.

### `aria-valuenow`

Representa o valor atual para componentes baseados em intervalo, como sliders e barras de progresso.

### `aria-valuetext`

Representa a descrição textual do componente.

### `aria-busy`

Indica que um elemento está sendo modificado e que tecnologias assistivas podem querer esperar até que as mudanças estejam completas antes de informar o usuário sobre a atualização.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-checked`

Indica o estado de um elemento marcável. Este campo pode receber um booleano ou a string "mixed" para representar checkboxes mistas.

| Type             | Default |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

### `aria-disabled`

Indica que o elemento é perceptível mas desabilitado, então não é editável ou operável de outra forma.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-expanded`

Indica se um elemento expansível está atualmente expandido ou recolhido.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-hidden`

Indica se o elemento está oculto das tecnologias assistivas.

Por exemplo, em uma janela que contém views irmãs `A` e `B`, definir `aria-hidden` como `true` na view `B` faz com que o VoiceOver ignore o elemento `B` e seus filhos.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-label`

Define um valor de string que pode ser usado para nomear um elemento.

| Type   |
| ------ |
| string |

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

### `aria-live` <div className="label android">Android</div>

Indica que um elemento será atualizado e descreve os tipos de atualizações que os agentes de usuário, tecnologias assistivas e usuário podem esperar da região ao vivo.

- **off** Serviços de acessibilidade não devem anunciar mudanças nesta view.
- **polite** Serviços de acessibilidade devem anunciar mudanças nesta view.
- **assertive** Serviços de acessibilidade devem interromper a fala em andamento para anunciar imediatamente mudanças nesta view.

| Type                                     | Default |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

Valor booleano indicando se o VoiceOver deve ignorar os elementos dentro de views que são irmãs do receptor.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-selected`

Indica se um elemento selecionável está atualmente selecionado ou não.

| Type    |
| ------- |
| boolean |

### `experimental_accessibilityOrder`

<ExperimentalAPIWarning />

:::note
Por questões de brevidade, o layout é excluído nos exemplos seguintes, embora ele dite a ordem de foco padrão. Assuma que a ordem do documento corresponde à ordem do layout.
:::

`experimental_accessibilityOrder` permite que você defina a ordem em que as tecnologias assistivas focam os componentes descendentes. É um array de [`nativeIDs`](view.md#nativeid) que são definidos nos componentes cuja ordem você está controlando. Por exemplo:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
</View>
```

Tecnologias assistivas focarão a `View` com `nativeID` de `B`, depois `C`, depois `A`.

`experimental_accessibilityOrder` não "ativará" a acessibilidade para os componentes que ele referencia, isso ainda precisa ser feito. Então, se removermos `accessible={true}` em `C` acima assim:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C"/>
</View>
```

então a nova ordem será `B` depois `A`, mesmo que `C` ainda esteja em `experimental_accessibilityOrder`.

`experimental_accessibilityOrder` "desativará" a acessibilidade de componentes que ele não referencia, no entanto.

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
  <View accessible={true} nativeID="D"/>
</View>
```

A ordem do exemplo acima seria `B`, `C`, `A`. `D` nunca será focado. Neste sentido, `experimental_accessibilityOrder` é _exaustivo_.

Ainda há razões válidas para incluir um componente não acessível em `experimental_accessibilityOrder`. Considere:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C">
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

A ordem de foco será `B`, `D`, `E`, `F`, `A`. Embora `D`, `E` e `F` não sejam diretamente referenciados em `experimental_accessibilityOrder`, `C` é diretamente referenciado. Nesta instância, `C` é um _contêiner de acessibilidade_ - ele contém elementos acessíveis, mas não é acessível por si só. Se um contêiner de acessibilidade é referenciado em `experimental_accessibilityOrder`, então a ordem padrão dos elementos que ele contém é aplicada. Neste sentido, `experimental_accessibilityOrder` é _aninhável_.

`experimental_accessibilityOrder` também pode referenciar outro componente com `experimental_accessibilityOrder`:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C" experimental_accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

A ordem de foco será `B`, `F`, `E`, `D`, `A`.

Um componente não pode ser ao mesmo tempo um contêiner de acessibilidade e um elemento de acessibilidade (`accessible={true}`). Então, se tivermos:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C" experimental_accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

A ordem de foco seria `B`, `C`, `A`. `D`, `E` e `F` não estão mais em um contêiner, então a natureza exaustiva de `experimental_accessibilityOrder` significa que eles serão excluídos.

### `importantForAccessibility` <div className="label android">Android</div>

No caso de dois componentes de UI sobrepostos com o mesmo pai, o foco de acessibilidade padrão pode ter comportamento imprevisível. A propriedade `importantForAccessibility` resolverá isso controlando se uma view dispara eventos de acessibilidade e se é reportada aos serviços de acessibilidade. Pode ser definida como `auto`, `yes`, `no` e `no-hide-descendants` (o último valor forçará os serviços de acessibilidade a ignorar o componente e todos os seus filhos).

```tsx
<View style={styles.container}>
  <View
    style={[styles.layout, {backgroundColor: 'green'}]}
    importantForAccessibility="yes">
    <Text>First layout</Text>
  </View>
  <View
    style={[styles.layout, {backgroundColor: 'yellow'}]}
    importantForAccessibility="no-hide-descendants">
    <Text>Second layout</Text>
  </View>
</View>
```

No exemplo acima, o layout `yellow` e seus descendentes são completamente invisíveis ao TalkBack e a todos os outros serviços de acessibilidade. Portanto, podemos usar views sobrepostas com o mesmo pai sem confundir o TalkBack.

### `onAccessibilityEscape` <div className="label ios">iOS</div>

Atribua esta propriedade a uma função personalizada que será chamada quando alguém executar o gesto de "escape", que é um gesto em forma de Z com dois dedos. Uma função de escape deve retroceder hierarquicamente na interface do usuário. Isso pode significar subir ou voltar em uma hierarquia de navegação ou dispensar uma interface de usuário modal. Se o elemento selecionado não tiver uma função `onAccessibilityEscape`, o sistema tentará percorrer a hierarquia de views até encontrar uma view que tenha ou emitir um som para indicar que não conseguiu encontrar uma.

### `onAccessibilityTap` <div className="label ios">iOS</div>

Use esta propriedade para atribuir uma função personalizada a ser chamada quando alguém ativa um elemento acessível tocando duas vezes nele enquanto está selecionado.

### `onMagicTap` <div className="label ios">iOS</div>

Atribua esta propriedade a uma função personalizada que será chamada quando alguém executar o gesto de "toque mágico", que é um toque duplo com dois dedos. Uma função de toque mágico deve executar a ação mais relevante que um usuário poderia realizar em um componente. No app Telefone do iPhone, um toque mágico atende uma chamada telefônica ou encerra a atual. Se o elemento selecionado não tiver uma função `onMagicTap`, o sistema percorrerá a hierarquia de views até encontrar uma view que tenha.

### `role`

`role` comunica o propósito de um componente e tem precedência sobre a prop [`accessibilityRole`](accessibility#accessibilityrole).

`role` pode ser um dos seguintes:

- **alert** Usado quando um elemento contém texto importante a ser apresentado ao usuário.
- **button** Usado quando o elemento deve ser tratado como um botão.
- **checkbox** Usado quando um elemento representa uma checkbox que pode ser marcada, desmarcada ou ter um estado misto.
- **combobox** Usado quando um elemento representa uma combo box, que permite ao usuário selecionar entre várias opções.
- **grid** Usado com ScrollView, VirtualizedList, FlatList ou SectionList para representar uma grade. Adiciona os anúncios de entrada/saída de grade ao GridView do Android.
- **heading** Usado quando um elemento atua como cabeçalho para uma seção de conteúdo (por exemplo, o título de uma barra de navegação).
- **img** Usado quando o elemento deve ser tratado como uma imagem. Pode ser combinado com um botão ou link, por exemplo.
- **link** Usado quando o elemento deve ser tratado como um link.
- **list** Usado para identificar uma lista de itens.
- **listitem** Usado para identificar um item em uma lista.
- **menu** Usado quando o componente é um menu de opções.
- **menubar** Usado quando um componente é um contêiner de múltiplos menus.
- **menuitem** Usado para representar um item dentro de um menu.
- **none** Usado quando o elemento não tem função.
- **presentation** Usado quando o elemento não tem função.
- **progressbar** Usado para representar um componente que indica o progresso de uma tarefa.
- **radio** Usado para representar um botão de rádio.
- **radiogroup** Usado para representar um grupo de botões de rádio.
- **scrollbar** Usado para representar uma barra de rolagem.
- **searchbox** Usado quando o elemento de campo de texto também deve ser tratado como um campo de busca.
- **slider** Usado quando um elemento pode ser "ajustado" (por exemplo, um slider).
- **spinbutton** Usado para representar um botão que abre uma lista de opções.
- **summary** Usado quando um elemento pode ser usado para fornecer um resumo rápido das condições atuais no app quando o app é iniciado pela primeira vez.
- **switch** Usado para representar um switch que pode ser ligado e desligado.
- **tab** Usado para representar uma aba.
- **tablist** Usado para representar uma lista de abas.
- **timer** Usado para representar um timer.
- **toolbar** Usado para representar uma barra de ferramentas (um contêiner de botões de ação ou componentes).

## Ações de Acessibilidade

Ações de acessibilidade permitem que a tecnologia assistiva invoque programaticamente a(s) ação(ões) de um componente. Para suportar ações de acessibilidade, um componente deve fazer duas coisas:

- Definir a lista de ações que ele suporta através da propriedade `accessibilityActions`.
- Implementar uma função `onAccessibilityAction` para tratar solicitações de ação.

A propriedade `accessibilityActions` deve conter uma lista de objetos de ação. Cada objeto de ação deve conter os seguintes campos:

| Name  | Type   | Required |
| ----- | ------ | -------- |
| name  | string | Yes      |
| label | string | No       |

Ações representam tanto ações padrão, como clicar em um botão ou ajustar um slider, quanto ações personalizadas específicas de um determinado componente, como excluir uma mensagem de e-mail. O campo `name` é obrigatório tanto para ações padrão quanto personalizadas, mas `label` é opcional para ações padrão.

Ao adicionar suporte para ações padrão, `name` deve ser um dos seguintes:

- `'magicTap'` - Apenas iOS - Enquanto o foco do VoiceOver está no ou dentro do componente, o usuário tocou duas vezes com dois dedos.
- `'escape'` - Apenas iOS - Enquanto o foco do VoiceOver está no ou dentro do componente, o usuário executou um gesto de esfregar com dois dedos (esquerda, direita, esquerda).
- `'activate'` - Ativar o componente. Isso deve executar a mesma ação com ou sem tecnologia assistiva. Acionado quando um usuário de leitor de tela toca duas vezes no componente.
- `'increment'` - Incrementar um componente ajustável. No iOS, o VoiceOver gera esta ação quando o componente tem uma função de `'adjustable'` e o usuário coloca o foco nele e desliza para cima. No Android, o TalkBack gera esta ação quando o usuário coloca o foco de acessibilidade no componente e pressiona o botão de aumentar volume.
- `'decrement'` - Decrementar um componente ajustável. No iOS, o VoiceOver gera esta ação quando o componente tem uma função de `'adjustable'` e o usuário coloca o foco nele e desliza para baixo. No Android, o TalkBack gera esta ação quando o usuário coloca o foco de acessibilidade no componente e pressiona o botão de diminuir volume.
- `'longpress'` - Apenas Android - Esta ação é gerada quando o usuário coloca o foco de acessibilidade no componente, depois toca duas vezes e segura um dedo na tela. Isso deve executar a mesma ação com ou sem tecnologia assistiva.
- `'expand'` - Apenas Android - Esta ação "expande" o componente de modo que o TalkBack anunciará uma dica "expandido".
- `'collapse'` - Apenas Android - Esta ação "recolhe" o componente de modo que o TalkBack anunciará uma dica "recolhido".

O campo `label` é opcional para ações padrão e geralmente não é usado por tecnologias assistivas. Para ações personalizadas, é uma string localizada contendo uma descrição da ação a ser apresentada ao usuário.

Para tratar solicitações de ação, um componente deve implementar uma função `onAccessibilityAction`. O único argumento para esta função é um evento contendo o nome da ação a ser executada. O exemplo abaixo do RNTester mostra como criar um componente que define e trata várias ações personalizadas.

```tsx
<View
  accessible={true}
  accessibilityActions={[
    {name: 'cut', label: 'cut'},
    {name: 'copy', label: 'copy'},
    {name: 'paste', label: 'paste'},
  ]}
  onAccessibilityAction={event => {
    switch (event.nativeEvent.actionName) {
      case 'cut':
        Alert.alert('Alert', 'cut action success');
        break;
      case 'copy':
        Alert.alert('Alert', 'copy action success');
        break;
      case 'paste':
        Alert.alert('Alert', 'paste action success');
        break;
    }
  }}
/>
```

## Verificando se um Leitor de Tela está Habilitado

A API `AccessibilityInfo` permite determinar se um leitor de tela está atualmente ativo ou não. Veja a [documentação do AccessibilityInfo](accessibilityinfo) para detalhes.

## Enviando Eventos de Acessibilidade <div className="label android">Android</div>

Às vezes é útil acionar um evento de acessibilidade em um componente de UI (ou seja, quando uma view personalizada aparece em uma tela ou definir o foco de acessibilidade em uma view). O módulo UIManager nativo expõe um método 'sendAccessibilityEvent' para este propósito. Ele aceita dois argumentos: uma tag de view e um tipo de evento. Os tipos de evento suportados são `typeWindowStateChanged`, `typeViewFocused` e `typeViewClicked`.

```tsx
import {Platform, UIManager, findNodeHandle} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.sendAccessibilityEvent(
    findNodeHandle(this),
    UIManager.AccessibilityEventTypes.typeViewFocused,
  );
}
```

## Testando Suporte do TalkBack <div className="label android">Android</div>

Para habilitar o TalkBack, vá para o app Configurações no seu dispositivo ou emulador Android. Toque em Acessibilidade, depois TalkBack. Alterne o switch "Usar serviço" para habilitar ou desabilitar.

Emuladores Android não vêm com o TalkBack instalado por padrão. Você pode instalar o TalkBack no seu emulador através da Google Play Store. Certifique-se de escolher um emulador com a Google Play Store instalada. Eles estão disponíveis no Android Studio.

Você pode usar o atalho de tecla de volume para alternar o TalkBack. Para ativar o atalho de tecla de volume, vá para o app Configurações, depois Acessibilidade. No topo, ative o atalho de tecla de volume.

Para usar o atalho de tecla de volume, pressione ambas as teclas de volume por 3 segundos para iniciar uma ferramenta de acessibilidade.

Além disso, se preferir, você pode alternar o TalkBack através da linha de comando com:

```shell
# disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService

# enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

## Testando Suporte do VoiceOver <div className="label ios">iOS</div>

Para habilitar o VoiceOver no seu dispositivo iOS ou iPadOS, vá para o app Configurações, toque em Geral, depois Acessibilidade. Lá você encontrará muitas ferramentas disponíveis para as pessoas habilitarem seus dispositivos a serem mais utilizáveis, incluindo VoiceOver. Para habilitar o VoiceOver, toque em VoiceOver em "Visão" e alterne o switch que aparece no topo.

Na parte inferior das configurações de Acessibilidade, há um "Atalho de Acessibilidade". Você pode usar isso para alternar o VoiceOver clicando três vezes no botão Home.

O VoiceOver não está disponível através do simulador, mas você pode usar o Accessibility Inspector do Xcode para usar o VoiceOver do macOS através de um aplicativo. Note que é sempre melhor testar com um dispositivo, pois o VoiceOver do macOS pode resultar em experiências variadas.

## Recursos Adicionais

- [Making React Native Apps Accessible](https://engineering.fb.com/ios/making-react-native-apps-accessible/)
