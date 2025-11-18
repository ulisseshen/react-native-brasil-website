---
ia-translated: true
id: touchablewithoutfeedback
title: TouchableWithoutFeedback
---

:::tip
Se você está procurando uma forma mais extensiva e preparada para o futuro de lidar com entrada baseada em toque, confira a API [Pressable](pressable.md).
:::

Não use a menos que você tenha uma razão muito boa. Todos os elementos que respondem a pressão devem ter um feedback visual quando tocados.

`TouchableWithoutFeedback` suporta apenas um filho (child). Se você deseja ter vários componentes filhos, envolva-os em um View. É importante notar que `TouchableWithoutFeedback` funciona clonando seu filho e aplicando props de resposta (responder props) a ele. Portanto, é necessário que quaisquer componentes intermediários passem essas props para o componente React Native subjacente.

## Padrão de Uso

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableWithoutFeedback>;
```

## Exemplo

```SnackPlayer name=TouchableWithoutFeedback
import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TouchableWithoutFeedbackExample = () => {
  const [count, setCount] = useState(0);

  const onPress = () => {
    setCount(count + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>Count: {count}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});

export default TouchableWithoutFeedbackExample;
```

---

# Referência

## Props

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

Um valor indicando se esta view deve ou não ser invertida quando a inversão de cores está ativada. Um valor `true` dirá à view para não ser invertida mesmo se a inversão de cores estiver ativada.

Veja o [guia de Accessibility](accessibility.md#accessibilityignoresinvertcolors) para mais informações.

| Type    |
| ------- |
| Boolean |

---

### `accessible`

Quando `true`, indica que a view é um elemento de acessibilidade. Por padrão, todos os elementos tocáveis são acessíveis.

| Type |
| ---- |
| bool |

---

### `accessibilityLabel`

Substitui o texto que é lido pelo leitor de tela quando o usuário interage com o elemento. Por padrão, o label é construído percorrendo todos os filhos e acumulando todos os nós `Text` separados por espaço.

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

### `accessibilityHint`

Uma dica de acessibilidade ajuda os usuários a entenderem o que acontecerá quando eles executarem uma ação no elemento de acessibilidade quando esse resultado não está claro a partir do label de acessibilidade.

| Type   |
| ------ |
| string |

---

### `accessibilityRole`

`accessibilityRole` comunica o propósito de um componente ao usuário de uma tecnologia assistiva.

`accessibilityRole` pode ser um dos seguintes:

- `'none'` - Usado quando o elemento não tem papel (role).
- `'button'` - Usado quando o elemento deve ser tratado como um botão.
- `'link'` - Usado quando o elemento deve ser tratado como um link.
- `'search'` - Usado quando o elemento de campo de texto também deve ser tratado como um campo de busca.
- `'image'` - Usado quando o elemento deve ser tratado como uma imagem. Pode ser combinado com button ou link, por exemplo.
- `'keyboardkey'` - Usado quando o elemento atua como uma tecla de teclado.
- `'text'` - Usado quando o elemento deve ser tratado como texto estático que não pode mudar.
- `'adjustable'` - Usado quando um elemento pode ser "ajustado" (por exemplo, um slider).
- `'imagebutton'` - Usado quando o elemento deve ser tratado como um botão e também é uma imagem.
- `'header'` - Usado quando um elemento atua como um cabeçalho para uma seção de conteúdo (por exemplo, o título de uma barra de navegação).
- `'summary'` - Usado quando um elemento pode ser usado para fornecer um resumo rápido das condições atuais no app quando o app é iniciado pela primeira vez.
- `'alert'` - Usado quando um elemento contém texto importante a ser apresentado ao usuário.
- `'checkbox'` - Usado quando um elemento representa uma caixa de seleção (checkbox) que pode ser marcada, desmarcada ou ter estado misto.
- `'combobox'` - Usado quando um elemento representa uma caixa de combinação (combo box), que permite ao usuário selecionar entre várias opções.
- `'menu'` - Usado quando o componente é um menu de opções.
- `'menubar'` - Usado quando um componente é um container de múltiplos menus.
- `'menuitem'` - Usado para representar um item dentro de um menu.
- `'progressbar'` - Usado para representar um componente que indica progresso de uma tarefa.
- `'radio'` - Usado para representar um botão de rádio (radio button).
- `'radiogroup'` - Usado para representar um grupo de botões de rádio.
- `'scrollbar'` - Usado para representar uma barra de rolagem.
- `'spinbutton'` - Usado para representar um botão que abre uma lista de opções.
- `'switch'` - Usado para representar um interruptor (switch) que pode ser ligado e desligado.
- `'tab'` - Usado para representar uma aba (tab).
- `'tablist'` - Usado para representar uma lista de abas.
- `'timer'` - Usado para representar um temporizador.
- `'toolbar'` - Usado para representar uma barra de ferramentas (um container de botões de ação ou componentes).

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

### `accessibilityActions`

As ações de acessibilidade (accessibility actions) permitem que uma tecnologia assistiva invoque programaticamente as ações de um componente. A propriedade `accessibilityActions` deve conter uma lista de objetos de ação. Cada objeto de ação deve conter os campos name e label.

Veja o [guia de Accessibility](accessibility.md#accessibility-actions) para mais informações.

| Type  |
| ----- |
| array |

---

### `aria-busy`

Indica que um elemento está sendo modificado e que tecnologias assistivas podem querer esperar até que as mudanças estejam completas antes de informar o usuário sobre a atualização.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-checked`

Indica o estado de um elemento marcável (checkable). Este campo pode receber um booleano ou a string "mixed" para representar checkboxes mistos.

| Type             | Default |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

---

### `aria-disabled`

Indica que o elemento é perceptível mas desabilitado, portanto não é editável ou operável de outra forma.

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

Indica se o elemento está oculto de tecnologias assistivas.

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

### `aria-live` <div className="label android">Android</div>

Indica que um elemento será atualizado e descreve os tipos de atualizações que os agentes de usuário, tecnologias assistivas e o usuário podem esperar da região ao vivo.

- **off** Serviços de acessibilidade não devem anunciar mudanças nesta view.
- **polite** Serviços de acessibilidade devem anunciar mudanças nesta view.
- **assertive** Serviços de acessibilidade devem interromper a fala em andamento para anunciar imediatamente mudanças nesta view.

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

### `onAccessibilityAction`

Invocado quando o usuário executa as ações de acessibilidade. O único argumento para esta função é um evento contendo o nome da ação a ser executada.

Veja o [guia de Accessibility](accessibility.md#accessibility-actions) para mais informações.

| Type     |
| -------- |
| function |

---

### `accessibilityValue`

Representa o valor atual de um componente. Pode ser uma descrição textual do valor de um componente ou, para componentes baseados em faixa (range), como sliders e barras de progresso, contém informações de faixa (mínimo, atual e máximo).

Veja o [guia de Accessibility](accessibility.md#accessibilityvalue-ios-android) para mais informações.

| Type                                                            |
| --------------------------------------------------------------- |
| object: `{min: number, max: number, now: number, text: string}` |

---

### `aria-valuemax`

Representa o valor máximo para componentes baseados em faixa (range), como sliders e barras de progresso. Tem precedência sobre o valor `max` na prop `accessibilityValue`.

| Type   |
| ------ |
| number |

---

### `aria-valuemin`

Representa o valor mínimo para componentes baseados em faixa (range), como sliders e barras de progresso. Tem precedência sobre o valor `min` na prop `accessibilityValue`.

| Type   |
| ------ |
| number |

---

### `aria-valuenow`

Representa o valor atual para componentes baseados em faixa (range), como sliders e barras de progresso. Tem precedência sobre o valor `now` na prop `accessibilityValue`.

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

### `delayLongPress`

Duração (em milissegundos) de `onPressIn` antes que `onLongPress` seja chamado.

| Type   |
| ------ |
| number |

---

### `delayPressIn`

Duração (em milissegundos), desde o início do toque, antes que `onPressIn` seja chamado.

| Type   |
| ------ |
| number |

---

### `delayPressOut`

Duração (em milissegundos), desde a liberação do toque, antes que `onPressOut` seja chamado.

| Type   |
| ------ |
| number |

---

### `disabled`

Se true, desabilita todas as interações para este componente.

| Type |
| ---- |
| bool |

---

### `hitSlop`

Isso define quão longe seu toque pode começar do botão. Isso é adicionado a `pressRetentionOffset` quando se move para fora do botão.

:::note
A área de toque nunca se estende além dos limites da view pai e o índice Z (Z-index) de views irmãs sempre tem precedência se um toque atingir duas views sobrepostas.
:::

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

### `id`

Usado para localizar esta view a partir de código nativo. Tem precedência sobre a prop `nativeID`.

| Type   |
| ------ |
| string |

---

### `onBlur`

Invocado quando o item perde o foco.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onFocus`

Invocado quando o item recebe foco.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onLayout`

Invocado na montagem e em mudanças de layout.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onLongPress`

Chamado se o tempo após `onPressIn` durar mais de 370 milissegundos. Este período de tempo pode ser customizado com [`delayLongPress`](#delaylongpress).

| Type     |
| -------- |
| function |

---

### `onPress`

Chamado quando o toque é liberado, mas não se cancelado (por exemplo, por uma rolagem que rouba o bloqueio de resposta). O primeiro argumento da função é um evento na forma de [PressEvent](pressevent).

| Type     |
| -------- |
| function |

---

### `onPressIn`

Chamado assim que o elemento tocável é pressionado e invocado até mesmo antes de onPress. Isso pode ser útil ao fazer requisições de rede. O primeiro argumento da função é um evento na forma de [PressEvent](pressevent).

| Type     |
| -------- |
| function |

---

### `onPressOut`

Chamado assim que o toque é liberado mesmo antes de onPress. O primeiro argumento da função é um evento na forma de [PressEvent](pressevent).

| Type     |
| -------- |
| function |

---

### `pressRetentionOffset`

Quando a view de rolagem (scroll view) está desabilitada, isso define quão longe seu toque pode se mover para fora do botão, antes de desativar o botão. Uma vez desativado, tente movê-lo de volta e você verá que o botão está novamente reativado! Mova-o para frente e para trás várias vezes enquanto a view de rolagem está desabilitada. Certifique-se de passar uma constante para reduzir alocações de memória.

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

---

### `nativeID`

| Type   |
| ------ |
| string |

---

### `testID`

Usado para localizar esta view em testes end-to-end.

| Type   |
| ------ |
| string |

---

### `touchSoundDisabled` <div className="label android">Android</div>

Se true, não reproduz um som do sistema no toque.

| Type    |
| ------- |
| Boolean |

---
