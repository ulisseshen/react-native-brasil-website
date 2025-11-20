---
ia-translated: true
id: flatlist
title: FlatList
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Uma interface performática para renderizar listas básicas e planas, com suporte aos recursos mais úteis:

- Totalmente multiplataforma.
- Modo horizontal opcional.
- Callbacks de visibilidade configuráveis.
- Suporte a cabeçalho.
- Suporte a rodapé.
- Suporte a separador.
- Pull to Refresh.
- Carregamento ao rolar.
- Suporte a ScrollToIndex.
- Suporte a múltiplas colunas.

Se você precisa de suporte a seções, use [`<SectionList>`](sectionlist.md).

## Example

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Simple%20FlatList%20Example&ext=js
import React from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Simple%20FlatList%20Example&ext=tsx
import React from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

Para renderizar múltiplas colunas, use a prop [`numColumns`](flatlist.md#numcolumns). Usar essa abordagem em vez de um layout `flexWrap` pode evitar conflitos com a lógica de altura dos itens.

Exemplo mais complexo e selecionável abaixo.

- Ao passar `extraData={selectedId}` para `FlatList`, garantimos que o próprio `FlatList` será re-renderizado quando o estado mudar. Sem definir essa prop, `FlatList` não saberia que precisa re-renderizar nenhum item porque é um `PureComponent` e a comparação de props não mostrará nenhuma mudança.
- `keyExtractor` informa à lista para usar os `id`s como chaves do React em vez da propriedade `key` padrão.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=flatlist-selectable&ext=js
import React, {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=flatlist-selectable&ext=tsx
import React, {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

Este é um wrapper conveniente em torno de [`<VirtualizedList>`](virtualizedlist.md), e portanto herda suas props (assim como as de [`<ScrollView>`](scrollview.md)) que não estão explicitamente listadas aqui, juntamente com as seguintes ressalvas:

- O estado interno não é preservado quando o conteúdo rola para fora da janela de renderização. Certifique-se de que todos os seus dados sejam capturados nos dados do item ou em stores externos como Flux, Redux ou Relay.
- Este é um `PureComponent`, o que significa que ele não será re-renderizado se as `props` permanecerem superficialmente iguais. Certifique-se de que tudo do que sua função `renderItem` depende seja passado como uma prop (por exemplo, `extraData`) que não seja `===` após atualizações, caso contrário sua UI pode não atualizar nas mudanças. Isso inclui a prop `data` e o estado do componente pai.
- Para restringir memória e permitir rolagem suave, o conteúdo é renderizado de forma assíncrona fora da tela. Isso significa que é possível rolar mais rápido do que a taxa de preenchimento e ver momentaneamente conteúdo em branco. Este é um compromisso que pode ser ajustado para atender às necessidades de cada aplicação, e estamos trabalhando para melhorá-lo nos bastidores.
- Por padrão, a lista procura por uma prop `key` em cada item e a usa como chave do React. Alternativamente, você pode fornecer uma prop `keyExtractor` personalizada.

---

# Reference

## Props

### [VirtualizedList Props](virtualizedlist.md#props)

Herda [VirtualizedList Props](virtualizedlist.md#props).

---

### <div className="label required basic">Required</div> **`renderItem`**

```tsx
renderItem({
  item: ItemT,
  index: number,
  separators: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  }
}): JSX.Element;
```

Pega um item de `data` e o renderiza na lista.

Fornece metadados adicionais como `index` se você precisar, assim como uma função `separators.updateProps` mais genérica que permite definir quaisquer props que você queira para alterar a renderização do separador inicial ou final, caso os mais comuns `highlight` e `unhighlight` (que definem a prop `highlighted: boolean`) sejam insuficientes para seu caso de uso.

| Type     |
| -------- |
| function |

- `item` (Object): O item de `data` sendo renderizado.
- `index` (number): O índice correspondente a este item no array `data`.
- `separators` (Object)
  - `highlight` (Function)
  - `unhighlight` (Function)
  - `updateProps` (Function)
    - `select` (enum('leading', 'trailing'))
    - `newProps` (Object)

Exemplo de uso:

```tsx
<FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({highlighted}) => (
      <View
        style={[style.separator, highlighted && {marginLeft: 0}]}
      />
    ))
  }
  data={[{title: 'Title Text', key: 'item1'}]}
  renderItem={({item, index, separators}) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{backgroundColor: 'white'}}>
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )}
/>
```

---

### <div className="label required basic">Required</div> **`data`**

Um array (ou lista semelhante a array) de itens para renderizar. Outros tipos de dados podem ser usados direcionando [`VirtualizedList`](virtualizedlist.md) diretamente.

| Type      |
| --------- |
| ArrayLike |

---

### `ItemSeparatorComponent`

Renderizado entre cada item, mas não no topo ou na parte inferior. Por padrão, as props `highlighted` e `leadingItem` são fornecidas. `renderItem` fornece `separators.highlight`/`unhighlight` que atualizarão a prop `highlighted`, mas você também pode adicionar props personalizadas com `separators.updateProps`. Pode ser um React Component (por exemplo, `SomeComponent`), ou um React element (por exemplo, `<SomeComponent />`).

| Type                         |
| ---------------------------- |
| component, function, element |

---

### `ListEmptyComponent`

Renderizado quando a lista está vazia. Pode ser um React Component (por exemplo, `SomeComponent`), ou um React element (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListFooterComponent`

Renderizado na parte inferior de todos os itens. Pode ser um React Component (por exemplo, `SomeComponent`), ou um React element (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListFooterComponentStyle`

Estilo para a View interna de `ListFooterComponent`.

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `ListHeaderComponent`

Renderizado no topo de todos os itens. Pode ser um React Component (por exemplo, `SomeComponent`), ou um React element (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListHeaderComponentStyle`

Estilo para a View interna de `ListHeaderComponent`.

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `columnWrapperStyle`

Estilo personalizado opcional para linhas de múltiplos itens geradas quando `numColumns > 1`.

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `extraData`

Uma propriedade marcadora para informar à lista para re-renderizar (já que implementa `PureComponent`). Se qualquer uma de suas funções `renderItem`, Header, Footer, etc. depender de algo fora da prop `data`, coloque aqui e trate de forma imutável.

| Type |
| ---- |
| any  |

---

### `getItemLayout`

```tsx
(data, index) => {length: number, offset: number, index: number}
```

`getItemLayout` é uma otimização opcional que permite pular a medição de conteúdo dinâmico se você souber o tamanho (altura ou largura) dos itens com antecedência. `getItemLayout` é eficiente se você tiver itens de tamanho fixo, por exemplo:

```tsx
  getItemLayout={(data, index) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  )}
```

Adicionar `getItemLayout` pode ser um grande aumento de desempenho para listas de várias centenas de itens. Lembre-se de incluir o comprimento do separador (altura ou largura) no seu cálculo de offset se você especificar `ItemSeparatorComponent`.

| Type     |
| -------- |
| function |

---

### `horizontal`

Se `true`, renderiza itens um ao lado do outro horizontalmente em vez de empilhados verticalmente.

| Type    |
| ------- |
| boolean |

---

### `initialNumToRender`

Quantos itens renderizar no lote inicial. Isso deve ser o suficiente para preencher a tela, mas não muito mais. Note que esses itens nunca serão desmontados como parte da renderização em janela para melhorar o desempenho percebido das ações de rolar para o topo.

| Type   | Default |
| ------ | ------- |
| number | `10`    |

---

### `initialScrollIndex`

Em vez de começar no topo com o primeiro item, comece em `initialScrollIndex`. Isso desabilita a otimização "rolar para o topo" que mantém os primeiros `initialNumToRender` itens sempre renderizados e imediatamente renderiza os itens começando neste índice inicial. Requer que `getItemLayout` seja implementado.

| Type   |
| ------ |
| number |

---

### `inverted`

Inverte a direção do scroll. Usa transformações de escala de `-1`.

| Type    |
| ------- |
| boolean |

---

### `keyExtractor`

```tsx
(item: ItemT, index: number) => string;
```

Usado para extrair uma chave única para um determinado item no índice especificado. A chave é usada para cache e como chave do React para rastrear a reordenação de itens. O extrator padrão verifica `item.key`, depois `item.id`, e então recorre ao uso do índice, como o React faz.

| Type     |
| -------- |
| function |

---

### `numColumns`

Múltiplas colunas só podem ser renderizadas com `horizontal={false}` e farão zigue-zague como um layout `flexWrap`. Os itens devem ter todos a mesma altura - layouts de alvenaria não são suportados.

| Type   |
| ------ |
| number |

---

### `onRefresh`

```tsx
() => void;
```

Se fornecido, um RefreshControl padrão será adicionado para funcionalidade "Pull to Refresh". Certifique-se de também definir a prop `refreshing` corretamente.

| Type     |
| -------- |
| function |

---

### `onViewableItemsChanged`

Chamado quando a visibilidade das linhas muda, conforme definido pela prop `viewabilityConfig`.

| Type                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]} => void;` |

---

### `progressViewOffset`

Defina isso quando o offset for necessário para que o indicador de carregamento seja exibido corretamente.

| Type   |
| ------ |
| number |

---

### `refreshing`

Defina isso como true enquanto aguarda novos dados de uma atualização.

| Type    |
| ------- |
| boolean |

---

### `removeClippedSubviews`

:::warning
O uso desta propriedade pode levar a bugs (conteúdo ausente) em algumas circunstâncias - use por sua conta e risco.
:::

Quando `true`, as views filhas fora da tela são removidas de sua superview nativa de suporte quando fora da tela. Isso pode melhorar o desempenho de scroll para listas grandes. No Android, o valor padrão é `true`.

| Type    |
| ------- |
| boolean |

---

### `viewabilityConfig`

Veja [`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Lists/ViewabilityHelper.js) para o tipo flow e documentação adicional.

| Type              |
| ----------------- |
| ViewabilityConfig |

`viewabilityConfig` recebe um tipo `ViewabilityConfig`, um objeto com as seguintes propriedades

| Property                         | Type    |
| -------------------------------- | ------- |
| minimumViewTime                  | number  |
| viewAreaCoveragePercentThreshold | number  |
| itemVisiblePercentThreshold      | number  |
| waitForInteraction               | boolean |

Pelo menos um de `viewAreaCoveragePercentThreshold` ou `itemVisiblePercentThreshold` é necessário. Isso precisa ser feito no `constructor` para evitar o seguinte erro ([ref](https://github.com/facebook/react-native/issues/17408)):

```
  Error: Changing viewabilityConfig on the fly is not supported
```

```tsx
constructor (props) {
  super(props)

  this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
  }
}
```

```tsx
<FlatList
    viewabilityConfig={this.viewabilityConfig}
  ...
```

#### minimumViewTime

Quantidade mínima de tempo (em milissegundos) que um item deve estar fisicamente visível antes que o callback de visibilidade seja disparado. Um número alto significa que rolar pelo conteúdo sem parar não marcará o conteúdo como visível.

#### viewAreaCoveragePercentThreshold

Porcentagem da viewport que deve ser coberta para que um item parcialmente ocluído conte como "visível", 0-100. Itens totalmente visíveis são sempre considerados visíveis. Um valor de 0 significa que um único pixel na viewport torna o item visível, e um valor de 100 significa que um item deve estar totalmente visível ou cobrir toda a viewport para contar como visível.

#### itemVisiblePercentThreshold

Semelhante a `viewAreaCoveragePercentThreshold`, mas considera a porcentagem do item que está visível, em vez da fração da área visível que ele cobre.

#### waitForInteraction

Nada é considerado visível até que o usuário role ou `recordInteraction` seja chamado após a renderização.

---

### `viewabilityConfigCallbackPairs`

Lista de pares `ViewabilityConfig`/`onViewableItemsChanged`. Um `onViewableItemsChanged` específico será chamado quando as condições de seu `ViewabilityConfig` correspondente forem atendidas. Veja `ViewabilityHelper.js` para o tipo flow e documentação adicional.

| Type                                   |
| -------------------------------------- |
| array of ViewabilityConfigCallbackPair |

## Methods

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

Exibe os indicadores de scroll momentaneamente.

---

### `getNativeScrollRef()`

```tsx
getNativeScrollRef(): React.ElementRef<typeof ScrollViewComponent>;
```

Fornece uma referência ao componente de scroll subjacente

---

### `getScrollResponder()`

```tsx
getScrollResponder(): ScrollResponderMixin;
```

Fornece um handle para o respondedor de scroll subjacente.

---

### `getScrollableNode()`

```tsx
getScrollableNode(): any;
```

Fornece um handle para o nó de scroll subjacente.

### `scrollToEnd()`

```tsx
scrollToEnd(params?: {animated?: boolean});
```

Rola até o final do conteúdo. Pode ser instável sem a prop `getItemLayout`.

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| params | object |

Chaves válidas de `params` são:

- 'animated' (boolean) - Se a lista deve fazer uma animação durante o scroll. Padrão é `true`.

---

### `scrollToIndex()`

```tsx
scrollToIndex: (params: {
  index: number;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
});
```

Rola para o item no índice especificado de forma que ele seja posicionado na área visível de modo que `viewPosition` 0 o coloca no topo, 1 na parte inferior e 0.5 centralizado no meio.

:::note
Não pode rolar para locais fora da janela de renderização sem especificar a prop `getItemLayout`.
:::

**Parameters:**

| Name                                                        | Type   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

Chaves válidas de `params` são:

- 'animated' (boolean) - Se a lista deve fazer uma animação durante o scroll. Padrão é `true`.
- 'index' (number) - O índice para rolar. Obrigatório.
- 'viewOffset' (number) - Um número fixo de pixels para deslocar a posição final do alvo.
- 'viewPosition' (number) - Um valor de `0` coloca o item especificado por índice no topo, `1` na parte inferior e `0.5` centralizado no meio.

---

### `scrollToItem()`

```tsx
scrollToItem(params: {
  animated?: ?boolean,
  item: Item,
  viewPosition?: number,
});
```

Requer varredura linear através dos dados - use `scrollToIndex` em vez disso, se possível.

:::note
Não pode rolar para locais fora da janela de renderização sem especificar a prop `getItemLayout`.
:::

**Parameters:**

| Name                                                        | Type   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

Chaves válidas de `params` são:

- 'animated' (boolean) - Se a lista deve fazer uma animação durante o scroll. Padrão é `true`.
- 'item' (object) - O item para rolar. Obrigatório.
- 'viewPosition' (number)

---

### `scrollToOffset()`

```tsx
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

Rola para um offset de pixel de conteúdo específico na lista.

**Parameters:**

| Name                                                        | Type   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

Chaves válidas de `params` são:

- 'offset' (number) - O offset para rolar. No caso de `horizontal` ser true, o offset é o valor x, em qualquer outro caso o offset é o valor y. Obrigatório.
- 'animated' (boolean) - Se a lista deve fazer uma animação durante o scroll. Padrão é `true`.
