---
ia-translated: true
id: optimizing-flatlist-configuration
title: Otimizando a Configuração do FlatList
---

## Termos

- **VirtualizedList:** O componente por trás do `FlatList` (implementação do React Native do conceito [`Virtual List`](https://bvaughn.github.io/react-virtualized/#/components/List).)

- **Consumo de memória:** Quanta informação sobre sua lista está sendo armazenada na memória, o que pode levar a uma falha do aplicativo.

- **Responsividade:** Capacidade do aplicativo de responder a interações. Baixa responsividade, por exemplo, é quando você toca em um componente e ele espera um pouco para responder, em vez de responder imediatamente como esperado.

- **Áreas em branco:** Quando `VirtualizedList` não consegue renderizar seus itens rápido o suficiente, você pode entrar em uma parte da sua lista com componentes não renderizados que aparecem como espaço em branco.

- **Viewport:** A área visível de conteúdo que é renderizada em pixels.

- **Window:** A área em que os itens devem ser montados, que geralmente é muito maior que o viewport.

## Props

Aqui está uma lista de props que podem ajudar a melhorar o desempenho do `FlatList`:

### `removeClippedSubviews`

| Type    | Default                              |
| ------- | ------------------------------------ |
| Boolean | `true` no Android, caso contrário `false` |

Se `true`, views que estão fora do viewport são automaticamente desacopladas da hierarquia de view nativa.

**Prós:** Isso reduz o tempo gasto na thread principal e, portanto, reduz o risco de frames descartados, excluindo views fora do viewport das travessias de renderização e desenho nativos.

**Contras:** Esteja ciente de que esta implementação pode ter bugs, como conteúdo faltando (principalmente observado no iOS), especialmente se você está fazendo coisas complexas com transforms e/ou posicionamento absoluto. Observe também que isso não economiza memória significativa porque as views não são desalocadas, apenas desacopladas.

### `maxToRenderPerBatch`

| Type   | Default |
| ------ | ------- |
| Number | 10      |

É uma prop do `VirtualizedList` que pode ser passada através do `FlatList`. Isso controla a quantidade de itens renderizados por lote, que é o próximo conjunto de itens renderizados a cada rolagem.

**Prós:** Definir um número maior significa menos áreas em branco visual ao rolar (aumenta a taxa de preenchimento).

**Contras:** Mais itens por lote significa períodos mais longos de execução JavaScript potencialmente bloqueando outro processamento de eventos, como toques, prejudicando a responsividade.

### `updateCellsBatchingPeriod`

| Type   | Default |
| ------ | ------- |
| Number | 50      |

Enquanto `maxToRenderPerBatch` diz a quantidade de itens renderizados por lote, definir `updateCellsBatchingPeriod` diz ao seu `VirtualizedList` o atraso em milissegundos entre renderizações de lote (com que frequência seu componente renderizará os itens em janela).

**Prós:** Combinar esta prop com `maxToRenderPerBatch` dá a você o poder de, por exemplo, renderizar mais itens em um lote menos frequente, ou menos itens em um lote mais frequente.

**Contras:** Lotes menos frequentes podem causar áreas em branco, Lotes mais frequentes podem causar problemas de responsividade.

### initialNumToRender

| Type   | Default |
| ------ | ------- |
| Number | 10      |

A quantidade inicial de itens a renderizar.

**Prós:** Defina um número preciso de itens que cobririam a tela para cada dispositivo. Isso pode ser um grande impulso de desempenho para a renderização inicial.

**Contras:** Definir um `initialNumToRender` baixo pode causar áreas em branco, especialmente se for muito pequeno para cobrir o viewport na renderização inicial.

### `windowSize`

| Type   | Default |
| ------ | ------- |
| Number | 21      |

O número passado aqui é uma unidade de medida onde 1 é equivalente à altura do seu viewport. O valor padrão é 21 (10 viewports acima, 10 abaixo e um no meio).

**Prós:** Um `windowSize` maior resultará em menos chance de ver espaço em branco durante a rolagem. Por outro lado, um `windowSize` menor resultará em menos itens montados simultaneamente, economizando memória.

**Contras:** Para um `windowSize` maior, você terá mais consumo de memória. Para um `windowSize` menor, você terá uma chance maior de ver áreas em branco.

## Itens da lista

Abaixo estão algumas dicas sobre componentes de itens de lista. Eles são o núcleo da sua lista, então eles precisam ser rápidos.

### Use componentes básicos

Quanto mais complexos seus componentes forem, mais lenta será a renderização. Tente evitar muita lógica e aninhamento em seus itens de lista. Se você está reutilizando este componente de item de lista muito em seu aplicativo, crie um componente apenas para suas grandes listas e faça-os com o mínimo de lógica e aninhamento possível.

### Use componentes leves

Quanto mais pesados seus componentes forem, mais lenta será a renderização. Evite imagens pesadas (use uma versão cortada ou miniatura para itens de lista, tão pequena quanto possível). Fale com sua equipe de design, use o mínimo possível de efeitos, interações e informações em sua lista. Mostre-os nos detalhes do seu item.

### Use `memo()`

`React.memo()` cria um componente memoizado que será re-renderizado apenas quando as props passadas para o componente mudarem. Podemos usar esta função para otimizar os componentes no FlatList.

```tsx
import React, {memo} from 'react';
import {View, Text} from 'react-native';

const MyListItem = memo(
  ({title}: {title: string}) => (
    <View>
      <Text>{title}</Text>
    </View>
  ),
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title;
  },
);

export default MyListItem;
```

Neste exemplo, determinamos que MyListItem deve ser re-renderizado apenas quando o título mudar. Passamos a função de comparação como o segundo argumento para React.memo() para que o componente seja re-renderizado apenas quando a prop especificada for alterada. Se a função de comparação retornar true, o componente não será re-renderizado.

### Use imagens otimizadas em cache

Você pode usar os pacotes da comunidade (como [@d11/react-native-fast-image](https://github.com/ds-horizon/react-native-fast-image) da [Dream11](https://github.com/ds-horizon)) para imagens com melhor desempenho. Cada imagem em sua lista é uma instância `new Image()`. Quanto mais rápido ela atinge o hook `loaded`, mais rápido sua thread JavaScript estará livre novamente.

### Use `getItemLayout`

Se todos os componentes de item da sua lista tiverem a mesma altura (ou largura, para uma lista horizontal), fornecer a prop [getItemLayout](flatlist#getitemlayout) remove a necessidade de seu `FlatList` gerenciar cálculos de layout assíncronos. Esta é uma técnica de otimização muito desejável.

Se seus componentes tiverem tamanho dinâmico e você realmente precisar de desempenho, considere perguntar à sua equipe de design se eles podem pensar em um redesign para ter um melhor desempenho.

### Use `keyExtractor` ou `key`

Você pode definir o [`keyExtractor`](flatlist#keyextractor) para seu componente `FlatList`. Esta prop é usada para cache e como a `key` do React para rastrear a reordenação de itens.

Você também pode usar uma prop `key` no seu componente de item.

### Evite função anônima em `renderItem`

Para componentes funcionais, mova a função `renderItem` para fora do JSX retornado. Além disso, certifique-se de que ela está envolvida em um hook `useCallback` para evitar que seja recriada a cada renderização.

Para componentes de classe, mova a função `renderItem` para fora da função render, para que ela não se recrie cada vez que a função render for chamada.

```tsx
const renderItem = useCallback(({item}) => (
   <View key={item.key}>
      <Text>{item.title}</Text>
   </View>
 ), []);

return (
  // ...
  <FlatList data={items} renderItem={renderItem} />;
  // ...
);
```
