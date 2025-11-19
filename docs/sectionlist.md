---
ia-translated: true
id: sectionlist
title: SectionList
---

Uma interface performática para renderizar listas com seções, suportando os recursos mais úteis:

- Totalmente multiplataforma.
- Callbacks de visibilidade configuráveis.
- Suporte a cabeçalho de lista.
- Suporte a rodapé de lista.
- Suporte a separador de itens.
- Suporte a cabeçalho de seção.
- Suporte a separador de seção.
- Suporte a dados heterogêneos e renderização de itens.
- Pull to Refresh.
- Carregamento ao rolar.

Se você não precisa de suporte a seções e quer uma interface mais simples, use [`<FlatList>`](flatlist.md).

## Example

```SnackPlayer name=SectionList%20Example
import React from 'react';
import {StyleSheet, Text, View, SectionList, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default App;
```

Este é um wrapper de conveniência em torno do [`<VirtualizedList>`](virtualizedlist.md), e portanto herda suas props (assim como as do [`<ScrollView>`](scrollview.md)) que não estão explicitamente listadas aqui, juntamente com as seguintes ressalvas:

- O estado interno não é preservado quando o conteúdo rola para fora da janela de renderização. Certifique-se de que todos os seus dados sejam capturados nos dados do item ou em stores externos como Flux, Redux ou Relay.
- Este é um `PureComponent`, o que significa que ele não será re-renderizado se as `props` permanecerem superficialmente iguais. Certifique-se de que tudo de que sua função `renderItem` depende seja passado como uma prop (por exemplo, `extraData`) que não seja `===` após atualizações, caso contrário sua UI pode não atualizar nas mudanças. Isso inclui a prop `data` e o estado do componente pai.
- Para restringir a memória e permitir rolagem suave, o conteúdo é renderizado de forma assíncrona fora da tela. Isso significa que é possível rolar mais rápido que a taxa de preenchimento e ver momentaneamente conteúdo em branco. Este é um trade-off que pode ser ajustado para atender às necessidades de cada aplicação, e estamos trabalhando para melhorá-lo nos bastidores.
- Por padrão, a lista procura uma prop `key` em cada item e a usa para a key do React. Alternativamente, você pode fornecer uma prop `keyExtractor` personalizada.

---

# Reference

## Props

### [VirtualizedList Props](virtualizedlist.md#props)

Herda [VirtualizedList Props](virtualizedlist.md#props).

---

### <div className="label required basic">Required</div>**`renderItem`**

Renderizador padrão para cada item em cada seção. Pode ser sobrescrito por seção. Deve retornar um elemento React.

| Type     |
| -------- |
| function |

A função de renderização receberá um objeto com as seguintes chaves:

- 'item' (object) - o objeto do item conforme especificado na chave `data` desta seção
- 'index' (number) - Índice do item dentro da seção.
- 'section' (object) - O objeto completo da seção conforme especificado em `sections`.
- 'separators' (object) - Um objeto com as seguintes chaves:
  - 'highlight' (function) - `() => void`
  - 'unhighlight' (function) - `() => void`
  - 'updateProps' (function) - `(select, newProps) => void`
    - 'select' (enum) - valores possíveis são 'leading', 'trailing'
    - 'newProps' (object)

---

### <div className="label required basic">Required</div>**`sections`**

Os dados reais a serem renderizados, semelhante à prop `data` em [`FlatList`](flatlist.md).

| Type                                        |
| ------------------------------------------- |
| array of [Section](sectionlist.md#section)s |

---

### `extraData`

Uma propriedade marcadora para informar à lista para re-renderizar (já que ela implementa `PureComponent`). Se qualquer uma de suas funções `renderItem`, Header, Footer, etc. depender de algo fora da prop `data`, coloque aqui e trate-o de forma imutável.

| Type |
| ---- |
| any  |

---

### `initialNumToRender`

Quantos itens renderizar no lote inicial. Isso deve ser suficiente para preencher a tela, mas não muito mais. Note que esses itens nunca serão desmontados como parte da renderização em janela para melhorar o desempenho percebido de ações de rolagem para o topo.

| Type   | Default |
| ------ | ------- |
| number | `10`    |

---

### `inverted`

Inverte a direção da rolagem. Usa transformações de escala de -1.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `ItemSeparatorComponent`

Renderizado entre cada item, mas não no topo ou na parte inferior. Por padrão, as props `highlighted`, `section` e `[leading/trailing][Item/Section]` são fornecidas. `renderItem` fornece `separators.highlight`/`unhighlight` que atualizará a prop `highlighted`, mas você também pode adicionar props personalizadas com `separators.updateProps`. Pode ser um componente React (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type                         |
| ---------------------------- |
| component, function, element |

---

### `keyExtractor`

Usado para extrair uma chave única para um determinado item no índice especificado. A chave é usada para cache e como chave do React para rastrear a reordenação de itens. O extrator padrão verifica `item.key`, depois `item.id` e então volta a usar o índice, como o React faz. Note que isso define chaves para cada item, mas cada seção geral ainda precisa de sua própria chave.

| Type                                    |
| --------------------------------------- |
| (item: object, index: number) => string |

---

### `ListEmptyComponent`

Renderizado quando a lista está vazia. Pode ser um componente React (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListFooterComponent`

Renderizado no final da lista. Pode ser um componente React (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `ListHeaderComponent`

Renderizado no início da lista. Pode ser um componente React (por exemplo, `SomeComponent`), ou um elemento React (por exemplo, `<SomeComponent />`).

| Type               |
| ------------------ |
| component, element |

---

### `onRefresh`

Se fornecido, um RefreshControl padrão será adicionado para a funcionalidade "Pull to Refresh". Certifique-se de também definir a prop `refreshing` corretamente. Para deslocar o RefreshControl do topo (por exemplo, por 100 pts), use `progressViewOffset={100}`.

| Type     |
| -------- |
| function |

---

### `onViewableItemsChanged`

Chamado quando a visibilidade das linhas muda, conforme definido pela prop `viewabilityConfig`.

| Type                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]}) => void` |

---

### `refreshing`

Defina como true enquanto aguarda novos dados de uma atualização.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `removeClippedSubviews`

:::warning
Usar esta propriedade pode levar a bugs (conteúdo ausente) em algumas circunstâncias - use por sua conta e risco.
:::

Quando `true`, as views filhas fora da tela são removidas de sua superview nativa quando fora da tela. Isso pode melhorar o desempenho de rolagem para listas grandes. No Android, o valor padrão é `true`.

| Type    |
| ------- |
| boolean |

---

### `renderSectionFooter`

Renderizado na parte inferior de cada seção.

| Type                                                                      |
| ------------------------------------------------------------------------- |
| `md (info: {section: [Section](sectionlist#section)}) => element ｜ null` |

---

### `renderSectionHeader`

Renderizado no topo de cada seção. Estes ficam fixos no topo do `ScrollView` por padrão no iOS. Veja `stickySectionHeadersEnabled`.

| Type                                                                      |
| ------------------------------------------------------------------------- |
| `md (info: {section: [Section](sectionlist#section)}) => element ｜ null` |

---

### `SectionSeparatorComponent`

Renderizado no topo e na parte inferior de cada seção (note que isso é diferente de `ItemSeparatorComponent`, que é renderizado apenas entre itens). Estes são destinados a separar seções dos cabeçalhos acima e abaixo e normalmente têm a mesma resposta de destaque que `ItemSeparatorComponent`. Também recebe `highlighted`, `[leading/trailing][Item/Section]` e quaisquer props personalizadas de `separators.updateProps`.

| Type               |
| ------------------ |
| component, element |

---

### `stickySectionHeadersEnabled`

Faz com que os cabeçalhos de seção fiquem fixos no topo da tela até que o próximo os empurre para fora. Habilitado por padrão apenas no iOS porque esse é o padrão da plataforma lá.

| Type    | Default                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------- |
| boolean | `false` <div className="label android">Android</div><hr/>`true` <div className="label ios">iOS</div> |

## Methods

### `flashScrollIndicators()` <div className="label ios">iOS</div>

```tsx
flashScrollIndicators();
```

Exibe os indicadores de rolagem momentaneamente.

---

### `recordInteraction()`

```tsx
recordInteraction();
```

Informa à lista que uma interação ocorreu, o que deve acionar cálculos de visibilidade, por exemplo, se `waitForInteractions` for true e o usuário não tiver rolado. Isso é normalmente chamado por toques em itens ou por ações de navegação.

---

### `scrollToLocation()`

```tsx
scrollToLocation(params: SectionListScrollParams);
```

Rola para o item no `sectionIndex` e `itemIndex` especificados (dentro da seção) posicionado na área visível de forma que `viewPosition` definido como `0` o coloca no topo (e pode ser coberto por um cabeçalho fixo), `1` na parte inferior e `0.5` centralizado no meio.

:::note
Você não pode rolar para localizações fora da janela de renderização sem especificar a prop `getItemLayout` ou `onScrollToIndexFailed`.
:::

**Parameters:**

| Name                                                        | Type   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

Chaves válidas de `params` são:

- 'animated' (boolean) - Se a lista deve fazer uma animação durante a rolagem. Padrão é `true`.
- 'itemIndex' (number) - Índice dentro da seção para o item a ser rolado. Obrigatório.
- 'sectionIndex' (number) - Índice da seção que contém o item a ser rolado. Obrigatório.
- 'viewOffset' (number) - Um número fixo de pixels para deslocar a posição alvo final, por exemplo, para compensar cabeçalhos fixos.
- 'viewPosition' (number) - Um valor de `0` coloca o item especificado pelo índice no topo, `1` na parte inferior e `0.5` centralizado no meio.

## Type Definitions

### Section

Um objeto que identifica os dados a serem renderizados para uma determinada seção.

| Type |
| ---- |
| any  |

**Properties:**

| Name                                                      | Type               | Description                                                                                                                                                                  |
| --------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data <div className="label basic required">Required</div> | array              | Os dados para renderizar itens nesta seção. Array de objetos, muito parecido com a [prop data do `FlatList`](flatlist#required-data).                                       |
| key                                                       | string             | Chave opcional para acompanhar a reordenação de seções. Se você não planeja reordenar seções, o índice do array será usado por padrão.                                      |
| renderItem                                                | function           | Opcionalmente define um renderizador de item arbitrário para esta seção, sobrescrevendo o [`renderItem`](sectionlist#renderitem) padrão para a lista.                       |
| ItemSeparatorComponent                                    | component, element | Opcionalmente define um separador de item arbitrário para esta seção, sobrescrevendo o [`ItemSeparatorComponent`](sectionlist#itemseparatorcomponent) padrão para a lista. |
| keyExtractor                                              | function           | Opcionalmente define um extrator de chave arbitrário para esta seção, sobrescrevendo o [`keyExtractor`](sectionlist#keyextractor) padrão.                                   |
