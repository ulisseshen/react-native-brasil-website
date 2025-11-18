---
ia-translated: true
id: scrollview
title: ScrollView
---

Component que encapsula o ScrollView da plataforma enquanto fornece integração com o sistema de "responder" de bloqueio de toque.

Tenha em mente que ScrollViews devem ter uma altura limitada para funcionar, pois contêm filhos de altura ilimitada em um container limitado (via uma interação de scroll). Para limitar a altura de um ScrollView, defina a altura da view diretamente (desencorajado) ou certifique-se de que todas as views pai tenham altura limitada. Esquecer de transferir `{flex: 1}` na pilha de views pode levar a erros aqui, que o inspetor de elementos torna rápido de depurar.

Ainda não suporta outros responders contidos bloqueando este scroll view de se tornar o responder.

`<ScrollView>` vs [`<FlatList>`](flatlist.md) - qual usar?

`ScrollView` renderiza todos os seus componentes filhos React de uma vez, mas isso tem uma desvantagem de desempenho.

Imagine que você tem uma lista muito longa de itens que deseja exibir, talvez várias telas de conteúdo. Criar componentes JS e views nativas para tudo de uma vez, muito do que pode nem mesmo ser mostrado, contribuirá para renderização lenta e aumento do uso de memória.

É aqui que `FlatList` entra em jogo. `FlatList` renderiza itens preguiçosamente, quando eles estão prestes a aparecer, e remove itens que saem muito da tela para economizar memória e tempo de processamento.

`FlatList` também é útil se você deseja renderizar separadores entre seus itens, múltiplas colunas, carregamento de scroll infinito, ou qualquer número de outros recursos que ele suporta prontos para uso.

## Example

```SnackPlayer name=ScrollView%20Example
import React from 'react';
import {StyleSheet, Text, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});

export default App;
```

---

# Reference

## Props

### [View Props](view.md#props)

Herda [View Props](view#props).

---

### `StickyHeaderComponent`

Um React Component que será usado para renderizar headers fixos, deve ser usado junto com `stickyHeaderIndices`. Você pode precisar definir este componente se seu header fixo usa transforms customizadas, por exemplo, quando você quer que sua lista tenha um header animado e ocultável. Se um componente não foi fornecido, o componente padrão [`ScrollViewStickyHeader`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/ScrollView/ScrollViewStickyHeader.js) será usado.

| Type               |
| ------------------ |
| component, element |

---

### `alwaysBounceHorizontal` <div className="label ios">iOS</div>

Quando true, o scroll view salta horizontalmente quando alcança o fim mesmo se o conteúdo for menor que o próprio scroll view.

| Type | Default                                               |
| ---- | ----------------------------------------------------- |
| bool | `true` when `horizontal={true}`<hr/>`false` otherwise |

---

### `alwaysBounceVertical` <div className="label ios">iOS</div>

Quando true, o scroll view salta verticalmente quando alcança o fim mesmo se o conteúdo for menor que o próprio scroll view.

| Type | Default                                               |
| ---- | ----------------------------------------------------- |
| bool | `false` when `horizontal={true}`<hr/>`true` otherwise |

---

### `automaticallyAdjustContentInsets` <div className="label ios">iOS</div>

Controla se o iOS deve ajustar automaticamente o content inset para scroll views que são colocados atrás de uma barra de navegação ou barra de abas/toolbar.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `automaticallyAdjustKeyboardInsets` <div className="label ios">iOS</div>

Controla se o ScrollView deve ajustar automaticamente seu `contentInset` e `scrollViewInsets` quando o Keyboard muda seu tamanho.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `automaticallyAdjustsScrollIndicatorInsets` <div className="label ios">iOS</div>

Controla se o iOS deve ajustar automaticamente os insets do indicador de scroll. Veja a [documentação da Apple sobre a propriedade](https://developer.apple.com/documentation/uikit/uiscrollview/3198043-automaticallyadjustsscrollindica).

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `bounces` <div className="label ios">iOS</div>

Quando true, o scroll view salta quando alcança o fim do conteúdo se o conteúdo for maior que o scroll view ao longo do eixo da direção do scroll. Quando `false`, desabilita todo o salto mesmo se as props `alwaysBounce*` forem `true`.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `bouncesZoom` <div className="label ios">iOS</div>

Quando `true`, gestos podem impulsionar o zoom além do mín/máx e o zoom animará para o valor mín/máx no fim do gesto, caso contrário o zoom não excederá os limites.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `canCancelContentTouches` <div className="label ios">iOS</div>

Quando `false`, uma vez que o rastreamento começa, não tentará arrastar se o toque se mover.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `centerContent` <div className="label ios">iOS</div>

Quando `true`, o scroll view centraliza automaticamente o conteúdo quando o conteúdo é menor que os limites do scroll view; quando o conteúdo é maior que o scroll view, esta propriedade não tem efeito.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `contentContainerStyle`

Estes estilos serão aplicados ao container de conteúdo do scroll view que encapsula todas as views filhas. Exemplo:

```
return (
  <ScrollView contentContainerStyle={styles.contentContainer}>
  </ScrollView>
);
...
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
```

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `contentInset` <div className="label ios">iOS</div>

A quantidade pela qual o conteúdo do scroll view é inserido das bordas do scroll view.

| Type                                                                 | Default                                  |
| -------------------------------------------------------------------- | ---------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` | `{top: 0, left: 0, bottom: 0, right: 0}` |

---

### `contentInsetAdjustmentBehavior` <div className="label ios">iOS</div>

Esta propriedade especifica como os insets de área segura são usados para modificar a área de conteúdo do scroll view. Disponível no iOS 11 e posterior.

| Type                                                           | Default   |
| -------------------------------------------------------------- | --------- |
| enum(`'automatic'`, `'scrollableAxes'`, `'never'`, `'always'`) | `'never'` |

---

### `contentOffset`

Usado para definir manualmente o offset de scroll inicial.

| Type  | Default        |
| ----- | -------------- |
| Point | `{x: 0, y: 0}` |

---

### `decelerationRate`

Um número de ponto flutuante que determina quão rapidamente o scroll view desacelera após o usuário levantar o dedo. Você também pode usar atalhos de string `"normal"` e `"fast"` que correspondem às configurações do iOS subjacentes para `UIScrollViewDecelerationRateNormal` e `UIScrollViewDecelerationRateFast` respectivamente.

- `'normal'` 0.998 no iOS, 0.985 no Android.
- `'fast'`, 0.99 no iOS, 0.9 no Android.

| Type                               | Default    |
| ---------------------------------- | ---------- |
| enum(`'fast'`, `'normal'`), number | `'normal'` |

---

### `directionalLockEnabled` <div className="label ios">iOS</div>

Quando true, o ScrollView tentará travar apenas para scroll vertical ou horizontal enquanto arrasta.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `disableIntervalMomentum`

Quando true, o scroll view para no próximo índice (em relação à posição de scroll no momento da liberação) independentemente de quão rápido o gesto é. Isso pode ser usado para paginação quando a página é menor que a largura do ScrollView horizontal ou a altura do ScrollView vertical.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `disableScrollViewPanResponder`

Quando true, o pan responder JS padrão no ScrollView é desabilitado, e o controle total sobre toques dentro do ScrollView é deixado para seus componentes filhos. Isso é particularmente útil se `snapToInterval` estiver habilitado, pois não segue padrões de toque típicos. Não use isso em casos de uso regulares do ScrollView sem `snapToInterval`, pois pode causar toques inesperados enquanto rola.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `endFillColor` <div className="label android">Android</div>

Às vezes um scrollview ocupa mais espaço do que seu conteúdo preenche. Quando este é o caso, esta prop preencherá o resto do scrollview com uma cor para evitar definir um background e criar overdraw desnecessário. Esta é uma otimização avançada que não é necessária no caso geral.

| Type            |
| --------------- |
| [color](colors) |

---

### `fadingEdgeLength` <div className="label android">Android</div>

Esmaece as bordas do conteúdo de scroll.

Se o valor for maior que `0`, as bordas de esmaecimento serão definidas de acordo com a direção e posição de scroll atuais, indicando se há mais conteúdo para mostrar.

| Type                                               | Default |
| -------------------------------------------------- | ------- |
| number<hr />object: `{start: number, end: number}` | `0`     |

---

### `horizontal`

Quando `true`, os filhos do scroll view são organizados horizontalmente em uma linha em vez de verticalmente em uma coluna.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `indicatorStyle` <div className="label ios">iOS</div>

O estilo dos indicadores de scroll.

- `'default'` igual a `black`.
- `'black'`, indicador de scroll é `black`. Este estilo é bom contra um fundo claro.
- `'white'`, indicador de scroll é `white`. Este estilo é bom contra um fundo escuro.

| Type                                    | Default     |
| --------------------------------------- | ----------- |
| enum(`'default'`, `'black'`, `'white'`) | `'default'` |

---

### `invertStickyHeaders`

Se headers fixos devem colar na parte inferior em vez do topo do ScrollView. Isso é geralmente usado com ScrollViews invertidos.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `keyboardDismissMode`

Determina se o teclado é dispensado em resposta a um arraste.

- `'none'`, arrastes não dispensam o teclado.
- `'on-drag'`, o teclado é dispensado quando um arraste começa.

**iOS Only**

- `'interactive'`, o teclado é dispensado interativamente com o arraste e se move em sincronia com o toque, arrastar para cima cancela a dispensa. No Android isso não é suportado e terá o mesmo comportamento que `'none'`.

| Type                                                                                                                                                            | Default  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum(`'none'`, `'on-drag'`) <div className="label android">Android</div><hr />enum(`'none'`, `'on-drag'`, `'interactive'`) <div className="label ios">iOS</div> | `'none'` |

---

### `keyboardShouldPersistTaps`

Determina quando o teclado deve permanecer visível após um toque.

- `'never'` tocar fora do input de texto focado quando o teclado está aberto dispensa o teclado. Quando isso acontece, os filhos não receberão o toque.
- `'always'`, o teclado não dispensará automaticamente, e o scroll view não capturará toques, mas filhos do scroll view podem capturar toques.
- `'handled'`, o teclado não dispensará automaticamente quando o toque foi tratado por filhos do scroll view (ou capturado por um ancestral).
- `false`, **_deprecated_**, use `'never'` em vez disso
- `true`, **_deprecated_**, use `'always'` em vez disso

| Type                                                      | Default   |
| --------------------------------------------------------- | --------- |
| enum(`'always'`, `'never'`, `'handled'`, `false`, `true`) | `'never'` |

---

### `maintainVisibleContentPosition`

Quando definido, o scroll view ajustará a posição de scroll para que o primeiro filho que está atualmente visível e em ou além de `minIndexForVisible` não mude de posição. Isso é útil para listas que estão carregando conteúdo em ambas as direções, por exemplo, um thread de chat, onde novas mensagens chegando poderiam de outra forma fazer a posição de scroll pular. Um valor de 0 é comum, mas outros valores como 1 podem ser usados para pular spinners de carregamento ou outro conteúdo que não deveria manter posição.

O `autoscrollToTopThreshold` opcional pode ser usado para fazer o conteúdo rolar automaticamente para o topo após fazer o ajuste se o usuário estava dentro do limite do topo antes do ajuste ser feito. Isso também é útil para aplicações tipo chat onde você quer ver novas mensagens rolarem para o lugar, mas não se o usuário rolou para cima um pouco e seria perturbador rolar muito.

Advertência 1: Reordenar elementos no scrollview com isso habilitado provavelmente causará instabilidade e problemas. Pode ser corrigido, mas atualmente não há planos para fazer isso. Por enquanto, não reordene o conteúdo de quaisquer ScrollViews ou Lists que usem este recurso.

Advertência 2: Isso usa `contentOffset` e `frame.origin` em código nativo para computar visibilidade. Oclusão, transforms e outra complexidade não serão levadas em conta quanto ao conteúdo estar "visível" ou não.

| Type                                                                     |
| ------------------------------------------------------------------------ |
| object: `{minIndexForVisible: number, autoscrollToTopThreshold: number}` |

---

### `maximumZoomScale` <div className="label ios">iOS</div>

A escala de zoom máxima permitida.

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `minimumZoomScale` <div className="label ios">iOS</div>

A escala de zoom mínima permitida.

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `nestedScrollEnabled` <div className="label android">Android</div>

Habilita nested scrolling para Android API level 21+.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `onContentSizeChange`

Chamado quando a view de conteúdo rolável do ScrollView muda.

A função handler receberá dois parâmetros: a largura do conteúdo e a altura do conteúdo `(contentWidth, contentHeight)`.

É implementado usando um handler onLayout anexado ao container de conteúdo que este ScrollView renderiza.

| Type     |
| -------- |
| function |

---

### `onMomentumScrollBegin`

Chamado quando o scroll de momentum começa (scroll que ocorre quando o ScrollView começa a deslizar).

| Type     |
| -------- |
| function |

---

### `onMomentumScrollEnd`

Chamado quando o scroll de momentum termina (scroll que ocorre quando o ScrollView desliza até parar).

| Type     |
| -------- |
| function |

---

### `onScroll`

Dispara no máximo uma vez por frame durante o scroll. O evento tem a seguinte forma (todos os valores com tipo não especificado são números):

```js
{
  nativeEvent: {
    contentInset: {bottom, left, right, top},
    contentOffset: {x, y},
    contentSize: {height, width},
    layoutMeasurement: {height, width},
    velocity: {x, y},
    responderIgnoreScroll: boolean,
    zoomScale,
    // iOS only
    targetContentOffset: {x, y}
  }
}
```

| Type     |
| -------- |
| function |

---

### `onScrollBeginDrag`

Chamado quando o usuário começa a arrastar o scroll view.

| Type     |
| -------- |
| function |

---

### `onScrollEndDrag`

Chamado quando o usuário para de arrastar o scroll view e ele para ou começa a deslizar.

| Type     |
| -------- |
| function |

---

### `onScrollToTop` <div className="label ios">iOS</div>

Dispara quando o scroll view rola para o topo após a barra de status ter sido tocada.

| Type     |
| -------- |
| function |

---

### `overScrollMode` <div className="label android">Android</div>

Usado para sobrescrever o valor padrão do modo over-scroll.

Valores possíveis:

- `'auto'` - Permite um usuário fazer over-scroll nesta view apenas se o conteúdo for grande o suficiente para rolar significativamente.
- `'always'` - Sempre permite um usuário fazer over-scroll nesta view.
- `'never'` - Nunca permite um usuário fazer over-scroll nesta view.

| Type                                  | Default  |
| ------------------------------------- | -------- |
| enum(`'auto'`, `'always'`, `'never'`) | `'auto'` |

---

### `pagingEnabled`

Quando true, o scroll view para em múltiplos do tamanho do scroll view ao rolar. Isso pode ser usado para paginação horizontal.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `persistentScrollbar` <div className="label android">Android</div>

Faz com que as scrollbars não fiquem transparentes quando não estão em uso.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `pinchGestureEnabled` <div className="label ios">iOS</div>

Quando true, ScrollView permite o uso de gestos de pinça para zoom in e out.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `refreshControl`

Um componente RefreshControl, usado para fornecer funcionalidade de pull-to-refresh para o ScrollView. Funciona apenas para ScrollViews verticais (a prop `horizontal` deve ser `false`).

Veja [RefreshControl](refreshcontrol).

| Type    |
| ------- |
| element |

---

### `removeClippedSubviews`

:::warning
Usar esta propriedade pode levar a bugs (conteúdo ausente) em algumas circunstâncias - use por sua conta e risco.
:::

Quando `true`, views filhas fora da tela são removidas de sua superview nativa de suporte quando fora da tela. Isso pode melhorar o desempenho de scroll para listas grandes. No Android o valor padrão é `true`.

| Type    |
| ------- |
| boolean |

---

### `scrollEnabled`

Quando false, a view não pode ser rolada via interação de toque.

Note que a view sempre pode ser rolada chamando `scrollTo`.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `scrollEventThrottle`

Limita com que frequência eventos de scroll serão disparados enquanto rola, especificado como um intervalo de tempo em ms. Isso pode ser útil quando trabalho caro é realizado em resposta ao scroll. Valores &le; `16` desabilitarão o throttling, independentemente da taxa de atualização do dispositivo.

| Type   | Default |
| ------ | ------- |
| number | `0`     |

---

### `scrollIndicatorInsets` <div className="label ios">iOS</div>

A quantidade pela qual os indicadores do scroll view são inseridos das bordas do scroll view. Isso normalmente deve ser definido para o mesmo valor que o `contentInset`.

| Type                                                                 | Default                                  |
| -------------------------------------------------------------------- | ---------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` | `{top: 0, left: 0, bottom: 0, right: 0}` |

---

### `scrollPerfTag` <div className="label android">Android</div>

Tag usada para registrar desempenho de scroll neste scroll view. Forçará eventos de momentum a serem ativados (veja sendMomentumEvents). Isso não faz nada pronto para uso e você precisa implementar um FpsListener nativo customizado para que seja útil.

| Type   |
| ------ |
| string |

---

### `scrollToOverflowEnabled` <div className="label ios">iOS</div>

Quando `true`, o scroll view pode ser rolado programaticamente além de seu tamanho de conteúdo.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `scrollsToTop` <div className="label ios">iOS</div>

Quando `true`, o scroll view rola para o topo quando a barra de status é tocada.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `showsHorizontalScrollIndicator`

Quando `true`, mostra um indicador de scroll horizontal.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `showsVerticalScrollIndicator`

Quando `true`, mostra um indicador de scroll vertical.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `snapToAlignment`

Quando `snapToInterval` está definido, `snapToAlignment` definirá a relação do snap com o scroll view.

Valores possíveis:

- `'start'` alinhará o snap à esquerda (horizontal) ou topo (vertical).
- `'center'` alinhará o snap no centro.
- `'end'` alinhará o snap à direita (horizontal) ou parte inferior (vertical).

| Type                                 | Default   |
| ------------------------------------ | --------- |
| enum(`'start'`, `'center'`, `'end'`) | `'start'` |

---

### `snapToEnd`

Use em conjunto com `snapToOffsets`. Por padrão, o fim da lista conta como um offset de snap. Defina `snapToEnd` como false para desabilitar este comportamento e permitir que a lista role livremente entre seu fim e o último offset de `snapToOffsets`.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `snapToInterval`

Quando definido, faz com que o scroll view pare em múltiplos do valor de `snapToInterval`. Isso pode ser usado para paginar através de filhos que têm comprimentos menores que o scroll view. Tipicamente usado em combinação com `snapToAlignment` e `decelerationRate="fast"`. Sobrescreve a prop menos configurável `pagingEnabled`.

| Type   |
| ------ |
| number |

---

### `snapToOffsets`

Quando definido, faz com que o scroll view pare nos offsets definidos. Isso pode ser usado para paginar através de filhos de tamanhos variados que têm comprimentos menores que o scroll view. Tipicamente usado em combinação com `decelerationRate="fast"`. Sobrescreve as props menos configuráveis `pagingEnabled` e `snapToInterval`.

| Type            |
| --------------- |
| array of number |

---

### `snapToStart`

Use em conjunto com `snapToOffsets`. Por padrão, o início da lista conta como um offset de snap. Defina `snapToStart` como `false` para desabilitar este comportamento e permitir que a lista role livremente entre seu início e o primeiro offset de `snapToOffsets`.

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `stickyHeaderHiddenOnScroll`

Quando definido como `true`, header fixo será ocultado ao rolar para baixo a lista, e ele ancorado no topo da lista ao rolar para cima.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `stickyHeaderIndices`

Um array de índices filhos determinando quais filhos ficam ancorados no topo da tela ao rolar. Por exemplo, passar `stickyHeaderIndices={[0]}` fará com que o primeiro filho seja fixado no topo do scroll view. Você também pode usar como [x,y,z] para fazer múltiplos itens fixos quando eles estão no topo. Esta propriedade não é suportada em conjunto com `horizontal={true}`.

| Type            |
| --------------- |
| array of number |

---

### `zoomScale` <div className="label ios">iOS</div>

A escala atual do conteúdo do scroll view.

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

## Methods

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

Exibe os indicadores de scroll momentaneamente.

---

### `scrollTo()`

```tsx
scrollTo(
  options?: {x?: number, y?: number, animated?: boolean} | number,
  deprecatedX?: number,
  deprecatedAnimated?: boolean,
);
```

Rola para um dado offset x, y, imediatamente ou com uma animação suave.

**Example:**

`scrollTo({x: 0, y: 0, animated: true})`

:::note
A assinatura estranha da função é devido ao fato de que, por razões históricas, a função também aceita argumentos separados como uma alternativa ao objeto de opções. Isso está deprecated devido à ambiguidade (y antes de x), e NÃO DEVE SER USADO.
:::

---

### `scrollToEnd()`

```tsx
scrollToEnd(options?: {animated?: boolean});
```

Se este é um ScrollView vertical rola para o fim. Se este é um ScrollView horizontal rola para a direita.

Use `scrollToEnd({animated: true})` para scroll animado suave, `scrollToEnd({animated: false})` para scroll imediato. Se nenhuma opção for passada, `animated` tem padrão `true`.

---
