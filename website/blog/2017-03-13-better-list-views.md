---
ia-translated: true
title: Melhores List Views no React Native
author: Spencer Ahrens
authorTitle: Software Engineer at Facebook
authorURL: 'https://github.com/sahrens'
authorImageURL: 'https://avatars1.githubusercontent.com/u/1509831'
authorTwitter: sahrens2012
tags: [engineering]
---

Muitos de vocês já começaram a brincar com alguns de nossos novos componentes List após nosso [anúncio teaser no grupo da comunidade](https://www.facebook.com/groups/react.native.community/permalink/921378591331053), mas estamos anunciando oficialmente hoje! Sem mais `ListView`s ou `DataSource`s, linhas obsoletas, bugs ignorados ou consumo excessivo de memória - com o último release candidate do React Native de Março de 2017 (`0.43-rc.1`) você pode escolher da nova suíte de componentes o que melhor se adequa ao seu caso de uso, com ótima performance e conjuntos de recursos prontos para uso:

### [`<FlatList>`](/docs/flatlist)

Este é o componente de trabalho para listas simples e performáticas. Forneça um array de dados e uma função `renderItem` e você está pronto:

```
<FlatList
  data={[{title: 'Title Text', key: 'item1'}, ...]}
  renderItem={({item}) => <ListItem title={item.title} />}
/>
```

### [`<SectionList>`](/docs/sectionlist)

Se você quiser renderizar um conjunto de dados dividido em seções lógicas, talvez com cabeçalhos de seção (por exemplo, em uma agenda telefônica alfabética), e potencialmente com dados e renderização heterogêneos (como uma visualização de perfil com alguns botões seguidos de um compositor, depois uma grade de fotos, depois uma grade de amigos e finalmente uma lista de histórias), este é o caminho a seguir.

```
<SectionList
  renderItem={({item}) => <ListItem title={item.title} />}
  renderSectionHeader={({section}) => <H1 title={section.key} />}
  sections={[ // homogeneous rendering between sections
    {data: [...], key: ...},
    {data: [...], key: ...},
    {data: [...], key: ...},
  ]}
/>

<SectionList
  sections={[ // heterogeneous rendering between sections
    {data: [...], key: ..., renderItem: ...},
    {data: [...], key: ..., renderItem: ...},
    {data: [...], key: ..., renderItem: ...},
  ]}
/>
```

### [`<VirtualizedList>`](/docs/virtualizedlist)

A implementação por trás dos bastidores com uma API mais flexível. Especialmente útil se seus dados não estão em um array simples (por exemplo, uma lista imutável).

## Recursos

Listas são usadas em muitos contextos, então empacotamos os novos componentes cheios de recursos para lidar com a maioria dos casos de uso prontos para uso:

- Carregamento por rolagem (`onEndReached`).
- Pull to refresh (`onRefresh` / `refreshing`).
- Callbacks de visibilidade [configuráveis](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Lists/ViewabilityHelper.js) (VPV) (`onViewableItemsChanged` / `viewabilityConfig`).
- Modo horizontal (`horizontal`).
- Separadores inteligentes de itens e seções.
- Suporte multi-coluna (`numColumns`)
- `scrollToEnd`, `scrollToIndex` e `scrollToItem`
- Melhor tipagem Flow.

### Algumas Ressalvas

- O estado interno das subárvores de itens não é preservado quando o conteúdo sai da janela de renderização. Certifique-se de que todos os seus dados sejam capturados nos dados do item ou em stores externos como Flux, Redux ou Relay.

- Esses componentes são baseados em `PureComponent`, o que significa que eles não serão re-renderizados se `props` permanecer shallow-equal. Certifique-se de que tudo do qual sua função `renderItem` depende diretamente seja passado como uma prop que não seja `===` após atualizações, caso contrário sua UI pode não atualizar nas mudanças. Isso inclui a prop `data` e o estado do componente pai. Por exemplo:

  ```jsx
  <FlatList
    data={this.state.data}
    renderItem={({item}) => (
      <MyItem
        item={item}
        onPress={() =>
          this.setState(oldState => ({
            selected: {
              // New instance breaks `===`
              ...oldState.selected, // copy old data
              [item.key]: !oldState.selected[item.key], // toggle
            },
          }))
        }
        selected={
          !!this.state.selected[item.key] // renderItem depends on state
        }
      />
    )}
    selected={
      // Can be any prop that doesn't collide with existing props
      this.state.selected // A change to selected should re-render FlatList
    }
  />
  ```

- Para restringir a memória e permitir rolagem suave, o conteúdo é renderizado de forma assíncrona fora da tela. Isso significa que é possível rolar mais rápido do que a taxa de preenchimento e momentaneamente ver conteúdo em branco. Este é um trade-off que pode ser ajustado para atender às necessidades de cada aplicativo, e estamos trabalhando para melhorá-lo nos bastidores.

- Por padrão, essas novas listas procuram uma prop `key` em cada item e usam isso para a key do React. Alternativamente, você pode fornecer uma prop `keyExtractor` personalizada.

## Performance

Além de simplificar a API, os novos componentes de lista também têm melhorias significativas de performance, sendo a principal o uso de memória quase constante para qualquer número de linhas. Isso é feito 'virtualizando' elementos que estão fora da janela de renderização, desmontando-os completamente da hierarquia de componentes e recuperando a memória JS dos componentes react, junto com a memória nativa da shadow tree e das views UI. Isso tem uma ressalva, que é que o estado interno do componente não será preservado, então **certifique-se de rastrear qualquer estado importante fora dos próprios componentes, por exemplo, em store Relay, Redux ou Flux.**

Limitar a janela de renderização também reduz a quantidade de trabalho que precisa ser feito pelo React e pela plataforma nativa, por exemplo, de travessias de view. Mesmo se você estiver renderizando o último de um milhão de elementos, com essas novas listas não há necessidade de iterar por todos esses elementos para renderizar. Você pode até pular para o meio com `scrollToIndex` sem renderização excessiva.

Também fizemos algumas melhorias com agendamento que devem ajudar com a responsividade do aplicativo. Itens na borda da janela de renderização são renderizados com pouca frequência e em prioridade mais baixa após quaisquer gestos ativos, animações ou outras interações terem sido concluídas.

## Uso Avançado

Ao contrário de `ListView`, todos os itens na janela de renderização são re-renderizados sempre que qualquer prop muda. Frequentemente isso é bom porque o windowing reduz o número de itens para um número constante, mas se seus itens forem complexos, você deve certificar-se de seguir as melhores práticas do React para performance e usar `React.PureComponent` e/ou `shouldComponentUpdate` conforme apropriado dentro de seus componentes para limitar re-renderizações da subárvore recursiva.

Se você pode calcular a altura de suas linhas sem renderizá-las, você pode melhorar a experiência do usuário fornecendo a prop `getItemLayout`. Isso torna muito mais suave rolar para itens específicos com, por exemplo, `scrollToIndex`, e melhorará o indicador de rolagem UI porque a altura do conteúdo pode ser determinada sem renderizá-lo.

Se você tiver um tipo de dados alternativo, como uma lista imutável, `<VirtualizedList>` é o caminho a seguir. Ela recebe uma prop `getItem` que permite retornar os dados do item para qualquer índice dado e tem tipagem flow mais flexível.

Há também vários parâmetros que você pode ajustar se tiver um caso de uso incomum. Por exemplo, você pode usar `windowSize` para compensar uso de memória vs. experiência do usuário, `maxToRenderPerBatch` para ajustar taxa de preenchimento vs. responsividade, `onEndReachedThreshold` para controlar quando o carregamento por rolagem acontece, e mais.

## Trabalho Futuro

- Migração de superfícies existentes (eventualmente deprecação de `ListView`).
- Mais recursos conforme vermos/ouvirmos a necessidade (nos avise!).
- Suporte a cabeçalhos de seção fixos.
- Mais otimizações de performance.
- Suporte a componentes de item funcionais com estado.
