---
ia-translated: true
id: communication-ios
title: Comunicação entre nativo e React Native
---

No [guia de Integração com Apps Existentes](integration-with-existing-apps) e no [guia de Componentes UI Nativos](legacy/native-components-ios) aprendemos como incorporar React Native em um componente nativo e vice-versa. Quando misturamos componentes nativos e React Native, eventualmente encontraremos a necessidade de comunicação entre esses dois mundos. Algumas formas de alcançar isso já foram mencionadas em outros guias. Este artigo resume as técnicas disponíveis.

## Introdução

React Native é inspirado no React, então a ideia básica do fluxo de informação é similar. O fluxo no React é unidirecional. Mantemos uma hierarquia de componentes, na qual cada componente depende apenas de seu pai e de seu próprio estado interno. Fazemos isso com properties: os dados são passados de um pai para seus filhos de maneira top-down. Se um componente ancestral depende do estado de seu descendente, deve-se passar um callback para ser usado pelo descendente para atualizar o ancestral.

O mesmo conceito se aplica ao React Native. Contanto que estejamos construindo nossa aplicação puramente dentro do framework, podemos dirigir nosso app com properties e callbacks. Mas, quando misturamos React Native e componentes nativos, precisamos de alguns mecanismos específicos, cross-language, que nos permitam passar informações entre eles.

## Properties

Properties são a forma mais direta de comunicação entre componentes. Então precisamos de uma maneira de passar properties tanto de nativo para React Native, quanto de React Native para nativo.

### Passando properties de nativo para React Native

Para incorporar uma view React Native em um componente nativo, usamos `RCTRootView`. `RCTRootView` é uma `UIView` que contém um app React Native. Também fornece uma interface entre o lado nativo e o app hospedado.

`RCTRootView` tem um inicializador que permite passar properties arbitrárias para o app React Native. O parâmetro `initialProperties` deve ser uma instância de `NSDictionary`. O dicionário é internamente convertido em um objeto JSON que o componente JS de nível superior pode referenciar.

```objectivec
NSArray *imageList = @[@"https://dummyimage.com/600x400/ffffff/000000.png",
                       @"https://dummyimage.com/600x400/000000/ffffff.png"];

NSDictionary *props = @{@"images" : imageList};

RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                 moduleName:@"ImageBrowserApp"
                                          initialProperties:props];
```

```tsx
import React from 'react';
import {View, Image} from 'react-native';

export default class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return <Image source={{uri: imgURI}} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`RCTRootView` também fornece uma property de leitura-escrita `appProperties`. Após `appProperties` ser definida, o app React Native é re-renderizado com as novas properties. A atualização é realizada apenas quando as novas properties atualizadas diferem das anteriores.

```objectivec
NSArray *imageList = @[@"https://dummyimage.com/600x400/ff0000/000000.png",
                       @"https://dummyimage.com/600x400/ffffff/ff0000.png"];

rootView.appProperties = @{@"images" : imageList};
```

É adequado atualizar properties a qualquer momento. No entanto, as atualizações devem ser realizadas na thread principal. Você pode usar o getter em qualquer thread.

:::note
Atualmente, há um problema conhecido onde definir appProperties durante a inicialização do bridge, a mudança pode ser perdida. Veja https://github.com/facebook/react-native/issues/20115 para mais informações.
:::

Não há como atualizar apenas algumas properties de cada vez. Sugerimos que você construa isso em seu próprio wrapper.

### Passando properties de React Native para nativo

O problema de expor properties de componentes nativos é coberto em detalhes [neste artigo](legacy/native-components-ios#properties). Em resumo, exporte properties com a macro `RCT_CUSTOM_VIEW_PROPERTY` em seu componente nativo customizado, então use-as no React Native como se o componente fosse um componente React Native comum.

### Limitações das properties

A principal desvantagem das properties cross-language é que elas não suportam callbacks, o que nos permitiria lidar com bindings de dados bottom-up. Imagine que você tem uma pequena view RN que deseja remover da view pai nativa como resultado de uma ação JS. Não há como fazer isso com props, pois a informação precisaria ir bottom-up.

Embora tenhamos um tipo de callbacks cross-language ([descritos aqui](legacy/native-modules-ios#callbacks)), esses callbacks nem sempre são o que precisamos. O principal problema é que eles não são destinados a serem passados como properties. Em vez disso, este mecanismo nos permite disparar uma ação nativa a partir do JS e lidar com o resultado dessa ação no JS.

## Outras formas de interação cross-language (events e native modules)

Como declarado no capítulo anterior, usar properties vem com algumas limitações. Às vezes properties não são suficientes para dirigir a lógica do nosso app e precisamos de uma solução que dê mais flexibilidade. Este capítulo cobre outras técnicas de comunicação disponíveis no React Native. Elas podem ser usadas para comunicação interna (entre as camadas JS e nativa no RN) assim como para comunicação externa (entre RN e a parte 'puramente nativa' do seu app).

React Native permite que você execute chamadas de função cross-language. Você pode executar código nativo customizado a partir do JS e vice-versa. Infelizmente, dependendo do lado em que estamos trabalhando, alcançamos o mesmo objetivo de maneiras diferentes. Para nativo - usamos o mecanismo de events para agendar a execução de uma função handler no JS, enquanto para React Native chamamos diretamente métodos exportados por native modules.

### Chamando funções React Native a partir do nativo (events)

Events são descritos em detalhes [neste artigo](legacy/native-components-ios#events). Note que usar events não nos dá garantias sobre o tempo de execução, pois o event é tratado em uma thread separada.

Events são poderosos, porque nos permitem mudar componentes React Native sem precisar de uma referência a eles. No entanto, existem algumas armadilhas nas quais você pode cair ao usá-los:

- Como events podem ser enviados de qualquer lugar, eles podem introduzir dependências estilo spaghetti em seu projeto.
- Events compartilham namespace, o que significa que você pode encontrar algumas colisões de nomes. Colisões não serão detectadas estaticamente, o que as torna difíceis de debugar.
- Se você usar várias instâncias do mesmo componente React Native e quiser distingui-las da perspectiva do seu event, você provavelmente precisará introduzir identificadores e passá-los junto com os events (você pode usar o `reactTag` da view nativa como um identificador).

O padrão comum que usamos ao incorporar nativo no React Native é tornar o RCTViewManager do componente nativo um delegate para as views, enviando events de volta para JavaScript via bridge. Isso mantém chamadas de events relacionadas em um só lugar.

### Chamando funções nativas a partir do React Native (native modules)

Native modules são classes Objective-C que estão disponíveis no JS. Tipicamente uma instância de cada módulo é criada por bridge JS. Eles podem exportar funções e constantes arbitrárias para React Native. Eles foram cobertos em detalhes [neste artigo](legacy/native-modules-ios#content).

O fato de que native modules são singletons limita o mecanismo no contexto de incorporação. Digamos que temos um componente React Native incorporado em uma view nativa e queremos atualizar a view pai nativa. Usando o mecanismo de native module, exportaríamos uma função que não apenas recebe os argumentos esperados, mas também um identificador da view pai nativa. O identificador seria usado para recuperar uma referência à view pai para atualizar. Dito isso, precisaríamos manter um mapeamento de identificadores para views nativas no módulo.

Embora esta solução seja complexa, ela é usada no `RCTUIManager`, que é uma classe interna do React Native que gerencia todas as views React Native.

Native modules também podem ser usados para expor bibliotecas nativas existentes ao JS. A [biblioteca Geolocation](https://github.com/michalchudziak/react-native-geolocation) é um exemplo vivo da ideia.

:::caution
Todos os native modules compartilham o mesmo namespace. Cuidado com colisões de nomes ao criar novos.
:::

## Fluxo de computação de layout

Ao integrar nativo e React Native, também precisamos de uma forma de consolidar dois sistemas de layout diferentes. Esta seção cobre problemas comuns de layout e fornece uma breve descrição dos mecanismos para resolvê-los.

### Layout de um componente nativo incorporado no React Native

Este caso é coberto [neste artigo](legacy/native-components-ios#styles). Para resumir, como todas as nossas views react nativas são subclasses de `UIView`, a maioria dos atributos de style e size funcionarão como você esperaria por padrão.

### Layout de um componente React Native incorporado no nativo

#### Conteúdo React Native com tamanho fixo

O cenário geral é quando temos um app React Native com tamanho fixo, que é conhecido pelo lado nativo. Em particular, uma view React Native de tela cheia se enquadra neste caso. Se quisermos uma root view menor, podemos definir explicitamente o frame do RCTRootView.

Por exemplo, para fazer um app RN de 200 pixels (lógicos) de altura, e da largura da view hospedeira, poderíamos fazer:

```objectivec title='SomeViewController.m'
- (void)viewDidLoad
{
  [...]
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:appName
                                            initialProperties:props];
  rootView.frame = CGRectMake(0, 0, self.view.width, 200);
  [self.view addSubview:rootView];
}
```

Quando temos uma root view de tamanho fixo, precisamos respeitar seus limites no lado JS. Em outras palavras, precisamos garantir que o conteúdo React Native possa ser contido dentro da root view de tamanho fixo. A maneira mais fácil de garantir isso é usar layout Flexbox. Se você usar posicionamento absoluto, e componentes React forem visíveis fora dos limites da root view, você terá sobreposição com views nativas, causando comportamento inesperado de alguns recursos. Por exemplo, 'TouchableHighlight' não destacará seus toques fora dos limites da root view.

É totalmente adequado atualizar o tamanho da root view dinamicamente redefinindo sua property frame. React Native cuidará do layout do conteúdo.

#### Conteúdo React Native com tamanho flexível

Em alguns casos gostaríamos de renderizar conteúdo de tamanho inicialmente desconhecido. Digamos que o tamanho será definido dinamicamente no JS. Temos duas soluções para este problema.

1. Você pode envolver sua view React Native em um componente `ScrollView`. Isso garante que seu conteúdo estará sempre disponível e não se sobreporá com views nativas.
2. React Native permite que você determine, no JS, o tamanho do app RN e o forneça ao proprietário do `RCTRootView` hospedeiro. O proprietário é então responsável por refazer o layout das subviews e manter a UI consistente. Alcançamos isso com os modos de flexibilidade do `RCTRootView`.

`RCTRootView` suporta 4 diferentes modos de flexibilidade de tamanho:

```objectivec title='RCTRootView.h'
typedef NS_ENUM(NSInteger, RCTRootViewSizeFlexibility) {
  RCTRootViewSizeFlexibilityNone = 0,
  RCTRootViewSizeFlexibilityWidth,
  RCTRootViewSizeFlexibilityHeight,
  RCTRootViewSizeFlexibilityWidthAndHeight,
};
```

`RCTRootViewSizeFlexibilityNone` é o valor padrão, que torna o tamanho da root view fixo (mas ainda pode ser atualizado com `setFrame:`). Os outros três modos nos permitem rastrear atualizações de tamanho do conteúdo React Native. Por exemplo, definir o modo para `RCTRootViewSizeFlexibilityHeight` fará com que React Native meça a altura do conteúdo e passe essa informação de volta para o delegate do `RCTRootView`. Uma ação arbitrária pode ser executada dentro do delegate, incluindo definir o frame da root view, para que o conteúdo se ajuste. O delegate é chamado apenas quando o tamanho do conteúdo mudou.

:::caution
Tornar uma dimensão flexível tanto no JS quanto no nativo leva a comportamento indefinido. Por exemplo - não torne a largura do componente React de nível superior flexível (com `flexbox`) enquanto você estiver usando `RCTRootViewSizeFlexibilityWidth` no `RCTRootView` hospedeiro.
:::

Vejamos um exemplo.

```objectivec title='FlexibleSizeExampleView.m'
- (instancetype)initWithFrame:(CGRect)frame
{
  [...]

  _rootView = [[RCTRootView alloc] initWithBridge:bridge
  moduleName:@"FlexibilityExampleApp"
  initialProperties:@{}];

  _rootView.delegate = self;
  _rootView.sizeFlexibility = RCTRootViewSizeFlexibilityHeight;
  _rootView.frame = CGRectMake(0, 0, self.frame.size.width, 0);
}

#pragma mark - RCTRootViewDelegate
- (void)rootViewDidChangeIntrinsicSize:(RCTRootView *)rootView
{
  CGRect newFrame = rootView.frame;
  newFrame.size = rootView.intrinsicContentSize;

  rootView.frame = newFrame;
}
```

No exemplo temos uma view `FlexibleSizeExampleView` que contém uma root view. Criamos a root view, inicializamos e definimos o delegate. O delegate lidará com as atualizações de tamanho. Então, definimos a flexibilidade de tamanho da root view para `RCTRootViewSizeFlexibilityHeight`, o que significa que o método `rootViewDidChangeIntrinsicSize:` será chamado toda vez que o conteúdo React Native mudar sua altura. Finalmente, definimos a largura e posição da root view. Note que definimos a altura também, mas isso não tem efeito pois tornamos a altura dependente do RN.

Você pode conferir o código fonte completo do exemplo [aqui](https://github.com/facebook/react-native/blob/main/packages/rn-tester/RNTester/NativeExampleViews/FlexibleSizeExampleView.mm).

É adequado mudar o modo de flexibilidade de tamanho da root view dinamicamente. Mudar o modo de flexibilidade de uma root view agendará um recálculo de layout e o método delegate `rootViewDidChangeIntrinsicSize:` será chamado uma vez que o tamanho do conteúdo seja conhecido.

:::note
O cálculo de layout do React Native é realizado em uma thread separada, enquanto as atualizações de view da UI nativa são feitas na thread principal.
Isso pode causar inconsistências temporárias de UI entre nativo e React Native. Este é um problema conhecido e nossa equipe está trabalhando em sincronizar atualizações de UI vindas de diferentes fontes.
:::

:::note
React Native não realiza nenhum cálculo de layout até que a root view se torne uma subview de alguma outra view.
Se você quiser ocultar a view React Native até que suas dimensões sejam conhecidas, adicione a root view como uma subview e a torne inicialmente oculta (use a property `hidden` do `UIView`). Então mude sua visibilidade no método delegate.
:::
