---
ia-translated: true
id: virtualizedlist
title: VirtualizedList
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Implementação base para os componentes mais convenientes [`<FlatList>`](flatlist.md) e [`<SectionList>`](sectionlist.md), que também são melhor documentados. Em geral, isso só deve realmente ser usado se você precisar de mais flexibilidade do que o [`FlatList`](flatlist.md) oferece, por exemplo, para uso com dados imutáveis em vez de arrays simples.

A virtualização melhora massivamente o consumo de memória e o desempenho de listas grandes, mantendo uma janela de renderização finita de itens ativos e substituindo todos os itens fora da janela de renderização por espaço em branco de tamanho apropriado. A janela se adapta ao comportamento de rolagem, e os itens são renderizados incrementalmente com baixa prioridade (depois de quaisquer interações em execução) se estiverem longe da área visível, ou com alta prioridade caso contrário, para minimizar o potencial de ver espaço em branco.

## Example

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=VirtualizedListExample&ext=js
import React from 'react';
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = _data => 50;

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=VirtualizedListExample&ext=tsx
import React from 'react';
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ItemData = {
  id: string;
  title: string;
};

const getItem = (_data: unknown, index: number): ItemData => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = (_data: unknown) => 50;

type ItemProps = {
  title: string;
};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

Algumas ressalvas:

- O estado interno não é preservado quando o conteúdo rola para fora da janela de renderização. Certifique-se de que todos os seus dados sejam capturados nos dados do item ou em armazenamentos externos como Flux, Redux ou Relay.
- Este é um `PureComponent`, o que significa que ele não será re-renderizado se as `props` forem shallow-equal. Certifique-se de que tudo de que sua função `renderItem` depende seja passado como prop (por exemplo, `extraData`) que não seja `===` após atualizações, caso contrário sua UI pode não atualizar quando houver mudanças. Isso inclui a prop `data` e o estado do componente pai.
- Para restringir a memória e permitir rolagem suave, o conteúdo é renderizado de forma assíncrona fora da tela. Isso significa que é possível rolar mais rápido do que a taxa de preenchimento e ver momentaneamente conteúdo em branco. Este é um trade-off que pode ser ajustado para atender às necessidades de cada aplicação, e estamos trabalhando para melhorá-lo nos bastidores.
- Por padrão, a lista procura por uma prop `key` em cada item e a usa para a key do React. Alternativamente, você pode fornecer uma prop `keyExtractor` personalizada.

---

# Reference

## Props

### [ScrollView Props](scrollview.md#props)

Herda as [ScrollView Props](scrollview.md#props).

---

### `data`

Tipo de dados opaco passado para `getItem` e `getItemCount` para recuperar itens.

| Type |
| ---- |
| any  |

---

### <div className="label required basic">Required</div> **`getItem`**

```tsx
(data: any, index: number) => any;
```

Um accessor genérico para extrair um item de qualquer tipo de blob de dados.

| Type     |
| -------- |
| function |

---

### <div className="label required basic">Required</div> **`getItemCount`**

```tsx
(data: any) => number;
```

Determina quantos itens existem no blob de dados.

| Type     |
| -------- |
| function |

---

### <div className="label required basic">Required</div> **`renderItem`**

```tsx
(info: any) => ?React.Element<any>
```

Pega um item de `data` e o renderiza na lista

| Type     |
| -------- |
| function |

---

### `CellRendererComponent`

CellRendererComponent permite personalizar como as células renderizadas por `renderItem`/`ListItemComponent` são envolvidas quando colocadas no ScrollView subjacente. Este componente deve aceitar event handlers que notificam o VirtualizedList sobre mudanças dentro da célula.

| Type                                     |
| ---------------------------------------- |
| `React.ComponentType<CellRendererProps>` |

---

### `ItemSeparatorComponent`

Renderizado entre cada item, mas não no topo ou na base. Por padrão, as props `highlighted` e `leadingItem` são fornecidas. `renderItem` fornece `separators.highlight`/`unhighlight` que atualizará a prop `highlighted`, mas você também pode adicionar props personalizadas com `separators.updateProps`. Pode ser um React Component (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type                         |
| ---------------------------- |
| component, function, element |

---

### `ListEmptyComponent`

Renderizado quando a lista está vazia. Pode ser um React Component (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListItemComponent`

Cada item de dados é renderizado usando este elemento. Pode ser uma React Component Class, ou uma função de renderização.

| Type                |
| ------------------- |
| component, function |

---

### `ListFooterComponent`

Renderizado na parte inferior de todos os itens. Pode ser um React Component (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListFooterComponentStyle`

Estilização para o View interno de `ListFooterComponent`.

| Type          | Required |
| ------------- | -------- |
| ViewStyleProp | No       |

---

### `ListHeaderComponent`

Renderizado no topo de todos os itens. Pode ser um React Component (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListHeaderComponentStyle`

Estilização para o View interno de `ListHeaderComponent`.

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `debug`

`debug` ativará logging extra e overlays visuais para auxiliar na depuração tanto do uso quanto da implementação, mas com uma perda significativa de desempenho.

| Type    |
| ------- |
| boolean |

---

### `disableVirtualization`

:::warning Deprecated
A virtualização fornece otimizações significativas de desempenho e memória, mas desmonta completamente as instâncias React que estão fora da janela de renderização. Você só deve precisar desabilitar isso para fins de depuração.
:::

| Type    |
| ------- |
| boolean |

---

### `extraData`

Uma propriedade marcador para dizer à lista para re-renderizar (já que ela implementa `PureComponent`). Se qualquer uma de suas funções `renderItem`, Header, Footer, etc. depender de qualquer coisa fora da prop `data`, coloque aqui e trate como imutável.

| Type |
| ---- |
| any  |

---

### `getItemLayout`

```tsx
(
  data: any,
  index: number,
) => {length: number, offset: number, index: number}
```

| Type     |
| -------- |
| function |

---

### `horizontal`

Se `true`, renderiza itens próximos uns dos outros horizontalmente em vez de empilhados verticalmente.

| Type    |
| ------- |
| boolean |

---

### `initialNumToRender`

Quantos itens renderizar no lote inicial. Isso deve ser suficiente para preencher a tela, mas não muito mais. Observe que esses itens nunca serão desmontados como parte da renderização em janela, a fim de melhorar o desempenho percebido das ações de rolagem para o topo.

| Type   | Default |
| ------ | ------- |
| number | `10`    |

---

### `initialScrollIndex`

Em vez de começar no topo com o primeiro item, comece em `initialScrollIndex`. Isso desabilita a otimização "scroll to top" que mantém os primeiros `initialNumToRender` itens sempre renderizados e renderiza imediatamente os itens começando neste índice inicial. Requer que `getItemLayout` seja implementado.

| Type   |
| ------ |
| number |

---

### `inverted`

Inverte a direção da rolagem. Usa transformações de escala de `-1`.

| Type    |
| ------- |
| boolean |

---

### `keyExtractor`

```tsx
(item: any, index: number) => string;
```

Usado para extrair uma chave única para um determinado item no índice especificado. A key é usada para cache e como a chave React para rastrear a reordenação de itens. O extractor padrão verifica `item.key`, depois `item.id`, e então volta a usar o índice, como o React faz.

| Type     |
| -------- |
| function |

---

### `maxToRenderPerBatch`

O número máximo de itens a renderizar em cada lote de renderização incremental. Quanto mais renderizado de uma vez, melhor a taxa de preenchimento, mas a responsividade pode sofrer porque a renderização de conteúdo pode interferir ao responder a toques em botões ou outras interações.

| Type   |
| ------ |
| number |

---

### `onEndReached`

Chamado uma vez quando a posição de rolagem fica a `onEndReachedThreshold` do final lógico da lista.

| Type                                        |
| ------------------------------------------- |
| `(info: {distanceFromEnd: number}) => void` |

---

### `onEndReachedThreshold`

Quão longe do final (em unidades de comprimento visível da lista) a borda final da lista deve estar do final do conteúdo para disparar o callback `onEndReached`. Assim, um valor de 0.5 disparará `onEndReached` quando o final do conteúdo estiver dentro de metade do comprimento visível da lista.

| Type   | Default |
| ------ | ------- |
| number | `2`     |

---

### `onRefresh`

```tsx
() => void;
```

Se fornecido, um `RefreshControl` padrão será adicionado para a funcionalidade "Pull to Refresh". Certifique-se de também definir a prop `refreshing` corretamente.

| Type     |
| -------- |
| function |

---

### `onScrollToIndexFailed`

```tsx
(info: {
  index: number,
  highestMeasuredFrameIndex: number,
  averageItemLength: number,
}) => void;
```

Usado para lidar com falhas ao rolar para um índice que ainda não foi medido. A ação recomendada é calcular seu próprio offset e fazer `scrollTo` para ele, ou rolar o máximo possível e então tentar novamente depois que mais itens forem renderizados.

| Type     |
| -------- |
| function |

---

### `onStartReached`

Chamado uma vez quando a posição de rolagem fica a `onStartReachedThreshold` do início lógico da lista.

| Type                                          |
| --------------------------------------------- |
| `(info: {distanceFromStart: number}) => void` |

---

### `onStartReachedThreshold`

Quão longe do início (em unidades de comprimento visível da lista) a borda inicial da lista deve estar do início do conteúdo para disparar o callback `onStartReached`. Assim, um valor de 0.5 disparará `onStartReached` quando o início do conteúdo estiver dentro de metade do comprimento visível da lista.

| Type   | Default |
| ------ | ------- |
| number | `2`     |

---

### `onViewableItemsChanged`

Chamado quando a visibilidade das linhas muda, conforme definido pela prop `viewabilityConfig`.

| Type                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]}) => void` |

---

### `persistentScrollbar`

| Type |
| ---- |
| bool |

---

### `progressViewOffset`

Defina isso quando um offset for necessário para o indicador de carregamento mostrar corretamente.

| Type   |
| ------ |
| number |

---

### `refreshControl`

Um elemento de controle de atualização personalizado. Quando definido, ele sobrescreve o componente padrão `<RefreshControl>` construído internamente. As props onRefresh e refreshing também são ignoradas. Funciona apenas para VirtualizedList vertical.

| Type    |
| ------- |
| element |

---

### `refreshing`

Defina isso como true enquanto aguarda novos dados de uma atualização.

| Type    |
| ------- |
| boolean |

---

### `removeClippedSubviews`

:::warning
Usar esta propriedade pode levar a bugs (conteúdo ausente) em algumas circunstâncias - use por sua própria conta e risco.
:::

Quando `true`, as views filhas fora da tela são removidas de sua superview de apoio nativa quando fora da tela. Isso pode melhorar o desempenho de rolagem para listas grandes. No Android, o valor padrão é `true`.

| Type    |
| ------- |
| boolean |

---

### `renderScrollComponent`

```tsx
(props: object) => element;
```

Renderiza um componente de rolagem personalizado, por exemplo, com um `RefreshControl` estilizado de forma diferente.

| Type     |
| -------- |
| function |

---

### `viewabilityConfig`

Veja `ViewabilityHelper.js` para o tipo de flow e documentação adicional.

| Type              |
| ----------------- |
| ViewabilityConfig |

---

### `viewabilityConfigCallbackPairs`

Lista de pares `ViewabilityConfig`/`onViewableItemsChanged`. Um `onViewableItemsChanged` específico será chamado quando as condições de seu `ViewabilityConfig` correspondente forem atendidas. Veja `ViewabilityHelper.js` para o tipo de flow e documentação adicional.

| Type                                   |
| -------------------------------------- |
| array of ViewabilityConfigCallbackPair |

---

### `updateCellsBatchingPeriod`

Quantidade de tempo entre lotes de renderização de itens de baixa prioridade, por exemplo, para renderizar itens bem fora da tela. Trade-off de taxa de preenchimento/responsividade semelhante ao `maxToRenderPerBatch`.

| Type   |
| ------ |
| number |

---

### `windowSize`

Determina o número máximo de itens renderizados fora da área visível, em unidades de comprimentos visíveis. Então, se sua lista preenche a tela, então `windowSize={21}` (o padrão) renderizará a área da tela visível mais até 10 telas acima e 10 abaixo da viewport. Reduzir esse número reduzirá o consumo de memória e pode melhorar o desempenho, mas aumentará a chance de que a rolagem rápida possa revelar áreas momentâneas em branco de conteúdo não renderizado.

| Type   |
| ------ |
| number |

## Methods

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

---

### `getScrollableNode()`

```tsx
getScrollableNode(): any;
```

---

### `getScrollRef()`

```tsx
getScrollRef():
  | React.ElementRef<typeof ScrollView>
  | React.ElementRef<typeof View>
  | null;
```

---

### `getScrollResponder()`

```tsx
getScrollResponder () => ScrollResponderMixin | null;
```

Fornece um handle para o scroll responder subjacente. Observe que `this._scrollRef` pode não ser um `ScrollView`, então precisamos verificar se ele responde a `getScrollResponder` antes de chamá-lo.

---

### `scrollToEnd()`

```tsx
scrollToEnd(params?: {animated?: boolean});
```

Rola para o final do conteúdo. Pode ser irregular sem a prop `getItemLayout`.

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| params | object |

Chaves válidas de `params` são:

- `'animated'` (boolean) - Se a lista deve fazer uma animação durante a rolagem. O padrão é `true`.

---

### `scrollToIndex()`

```tsx
scrollToIndex(params: {
  index: number;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
});
```

Os `params` válidos consistem em:

- 'index' (number). Required.
- 'animated' (boolean). Optional.
- 'viewOffset' (number). Optional.
- 'viewPosition' (number). Optional.

---

### `scrollToItem()`

```tsx
scrollToItem(params: {
  item: ItemT;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
);
```

Os `params` válidos consistem em:

- 'item' (Item). Required.
- 'animated' (boolean). Optional.
- 'viewOffset' (number). Optional.
- 'viewPosition' (number). Optional.

---

### `scrollToOffset()`

```tsx
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

Rola para um offset de pixel de conteúdo específico na lista.

O parâmetro `offset` espera o offset para rolar. No caso de `horizontal` ser true, o offset é o valor x, em qualquer outro caso o offset é o valor y.

O parâmetro `animated` (`true` por padrão) define se a lista deve fazer uma animação durante a rolagem.
