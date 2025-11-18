---
ia-translated: true
title: Pointer Events no React Native
authors: [lunaleaps, vincentriemer]
tags: [announcement]
date: 2022-12-13
---

# Pointer Events no React Native

Hoje estamos compartilhando uma API experimental cross-platform de pointer para React Native. Vamos abordar as motivações, como funciona e seus benefícios para os usuários do React Native. Há instruções sobre como habilitar e estamos ansiosos para ouvir seu feedback!

Já faz mais de um ano desde que compartilhamos [nossa visão de múltiplas plataformas](https://reactnative.dev/blog/2021/08/26/many-platform-vision) sobre os ganhos de construir além do mobile e como isso estabelece um padrão mais alto para todas as plataformas. Durante este tempo, aumentamos nossos investimentos em React Native para VR, Desktop e Web. Com diferenças em hardware e interações nessas plataformas, levantou a questão de como o React Native deve lidar holisticamente com input.

<!--truncate-->

### Indo Além do Touch

Desktop e VR historicamente dependem de input de mouse e teclado, onde mobile é principalmente touch. Essa narrativa evoluiu com laptops touch-screen e crescentes necessidades de suportar interações via teclado e caneta no mobile. Tudo isso o sistema de eventos touch do React Native não está equipado para lidar.

Como resultado, usuários de plataformas out-of-tree fazem fork do React Native e/ou criam componentes e módulos nativos personalizados para suportar recursos críticos como detecção de hover ou clique esquerdo. Essa divergência leva à redundância de props com event handlers servindo propósitos similares mas para plataformas diferentes. Adiciona complexidade ao framework e torna o compartilhamento de código entre plataformas tedioso. Por essas razões, a equipe foi motivada a fornecer uma API cross-platform de pointer.

React Native visa fornecer APIs robustas e expressivas para construir para muitas plataformas enquanto mantém experiências de plataforma características. Projetar tal API é desafiador, mas felizmente há arte anterior no espaço de pointer que o React Native pode aproveitar.

### Olhando para a Web

Web é uma plataforma com desafios similares em escalar para muitas plataformas enquanto também considera design à prova de futuro. O World Wide Web consortium (W3C) é encarregado de definir padrões e propostas para construir uma Web que seja interoperável entre diferentes plataformas e navegadores.

Mais relevante para nossas necessidades, o W3C definiu comportamento para uma forma abstrata de input, chamada pointer. A especificação [Pointer Events](https://www.w3.org/TR/pointerevents3/) baseia-se em eventos de mouse e visa fornecer um único conjunto de eventos e interfaces para input de pointer cross-device, permitindo ainda manipulação específica do dispositivo quando necessário.

Seguir a especificação Pointer Events fornece aos usuários do React Native muitos benefícios. Além de abordar os problemas mencionados anteriormente, eleva as capacidades de plataformas que historicamente não tiveram que considerar interações de múltiplos tipos de input. Pense em anexar um mouse bluetooth ao seu telefone Android ou o Apple pencil suportando hover no iPad M2.

Ser compatível com a especificação também fornece oportunidade para compartilhamento de conhecimento entre Web e React Native. Educação sobre expectativas da Web em torno de Pointer Events pode servir duplamente aos desenvolvedores React Native. No entanto, também reconhecemos que os requisitos do React Native são diferentes da web e nossa abordagem às especificações é de melhor esforço com desvios bem documentados para que as expectativas sejam claras. Há trabalho relacionado de alinhar certos padrões Web para [reduzir fragmentação de API](https://github.com/react-native-community/discussions-and-proposals/pull/496) em APIs de acessibilidade e performance.

## Portando Web Platform Tests

Embora a especificação Pointer Events forneça interfaces e descrições de comportamento da API, descobrimos que não era específica o suficiente para nós fazermos mudanças com confiança e apontarmos para a especificação como verificação. No entanto, navegadores web usam outro mecanismo para garantir conformidade e interoperabilidade — os [Web Platform Tests](https://web-platform-tests.org/)!

Os Web Platform Tests são escritos para funcionar contra as APIs DOM imperativas do navegador — não suportadas pelo React Native, pois usa suas próprias primitivas de view. Isso significa que não somos capazes de compartilhar código dos testes com navegadores e em vez disso temos uma API de teste análoga para React Native que torna mais fácil portar esses Web Platform Tests.

Implementamos um novo framework de testes manuais que agora estamos usando para verificar nossas implementações através do RNTester. Esses testes são provisoriamente chamados de RNTester Platform Tests e ainda são bastante básicos. Nossa implementação fornece uma API para construir casos de teste como componentes eles mesmos que são renderizados e onde os resultados são reportados apenas através da UI.

![GIF mostrando uma comparação lado a lado do "Pointer Events hoverable pointer attributes test" rodando no React Native (iOS) à esquerda, e Web (a implementação original) à direita.](/blog/assets/pointer-events-wpt-demo.gif)

Esses testes continuarão sendo úteis à medida que avançarmos a completude de nossa implementação de Pointer Events. Esses testes também escalarão para testar implementações de Pointer Events em plataformas além de Android e iOS. À medida que o número de testes em nossa suíte aumentar, procuraremos automatizar a execução desses testes para que estejamos melhor equipados para capturar regressões em nossas implementações.

## Como funciona

Grande parte de nossa implementação de Pointer Events baseia-se na infraestrutura existente para despachar eventos touch. No Android e iOS aproveitamos os eventos MotionEvent e UITouch relevantes. O fluxo geral de despacho de eventos é ilustrado abaixo.

![Diagrama de fluxo de código para interpretar eventos de input de UI do Android e iOS em Pointer Events. No Android, handlers de input "onTouchEvent" e "onHoverEvent" disparam "MotionEvents" que são interpretados em Pointer Events e através do JSI são despachados para o renderizador React. iOS segue um caminho similar com handlers de input "touchesBegan", "touchesMoved", "touchesEnded" e "hovering" interpretando "UITouch" e "UIEvent" em Pointer Events.](/blog/assets/pointer-events-code-flow.png)

Usando Android como exemplo, a abordagem geral para aproveitar eventos de plataforma são:

1. Iterar através de todos os pointers do `MotionEvent` e fazer uma busca depth-first para determinar a view React alvo de cada pointer e seu caminho ancestral.
2. Mapear a categoria do `MotionEvent` para os eventos pointer relevantes. Há uma relação 1-para-muitos entre `MotionEvent` e `PointerEvent`. Na ilustração de sua relação, linhas pontilhadas indicam eventos disparados se o dispositivo apontador não suporta hover.

![Um diagrama ilustrando a relação de tipos de Android MotionEvents em Pointer Events disparados. Alguns pointer events são condicionalmente disparados se o dispositivo apontador não suporta hover. "ACTION_DOWN" e "ACTION_POINTER_DOWN" disparam pointerdown e condicionalmente disparam pointerenter, pointerover. "ACTION_MOVE" e "ACTION_HOVER_MOVE" disparam pointerover, pointermove, pointerout, pointerup. "ACTION_UP" e "ACTION_POINTER_UP" disparam pointerup e condicionalmente disparam pointerout, pointerleave.](/blog/assets/pointer-events-motionevent-relationship.png)

1. Construir a interface `PointerEvent` com detalhes de plataforma do `MotionEvent` e estado cacheado de interações anteriores. (Ex. [a propriedade `button`](https://w3c.github.io/pointerevents/#the-button-property))
2. Despachar os pointer events do Android para a [fila de eventos core](https://github.com/facebook/react-native/blob/main/ReactCommon/react/renderer/core/EventQueueProcessor.cpp#L20) do React Native e aproveitar JSI para chamar o método [`dispatchEvent`](https://github.com/facebook/react/blob/main/packages/react-native-renderer/src/ReactFabricEventEmitter.js#L83) no `react-native-renderer` que itera através da árvore React para a fase de bubble e capture do evento.

## Progresso da Implementação

Quando se trata de nosso progresso atual de implementação da especificação Pointer Events, focamos em uma implementação baseline sólida dos eventos mais comuns que lidam com coisas como pressionar, hover e mover.

### Eventos

| Implementado    | Trabalho em Progresso | Ainda a ser Implementado |
| -------------- | -------------------- | ------------------------ |
| onPointerOver  | onPointerCancel      | onClick                  |
| onPointerEnter |                      | onContextMenu            |
| onPointerDown  |                      | onGotPointerCapture      |
| onPointerMove  |                      | onLostPointerCapture     |
| onPointerUp    |                      | onPointerRawUpdate       |
| onPointerOut   |                      |                          |
| onPointerLeave |                      |                          |

:::info

onPointerCancel foi conectado ao evento "cancel" da plataforma nativa, mas isso não corresponde necessariamente a quando a plataforma web espera que eles disparem.

:::

### Propriedades de Evento

Para cada um dos eventos mencionados acima, também implementamos a maioria das propriedades esperadas no objeto PointerEvent — embora no React Native estas sejam expostas através da propriedade `event.nativeEvent`. Você pode encontrar uma enumeração de todas as propriedades implementadas na [definição da interface Flowtype do objeto de evento](https://github.com/facebook/react-native/blob/59ee57352738f030b41589a450209e51e44bbb06/Libraries/Types/CoreEventTypes.js#L175). Uma exceção notável a ser completamente implementada é a propriedade `relatedTarget`, pois expor uma referência de view nativa desta maneira ad-hoc não é trivial.

## Trabalho Futuro e Exploração

Além dos eventos acima, também existem algumas outras APIs relacionadas a Pointer Events. No futuro, planejamos implementar essas APIs como parte deste esforço. Essas APIs incluem:

- Pointer Capture API
  - Inclui a API imperativa exposta em referências de elementos incluindo `setPointerCapture()`, `releasePointerCapture()` e `hasPointerCapture()`.
- Propriedade de estilo `touch-action`
  - A web usa esta propriedade CSS para declarativamente negociar gestos entre o navegador e o código de manipulação de eventos próprio de um website. No React Native isso poderia ser usado para negociar a manipulação de eventos entre os handlers de pointer event de uma View e um ScrollView pai.
- `click`, `contextmenu`, `auxclick`
  - `click` é uma definição abstrata de interação que pode ser acionada através de paradigmas de acessibilidade ou outras interações características de plataforma.

Outro benefício da implementação nativa de Pointer Events é que nos permitirá revisitar e melhorar várias formas de manipulação de gestos atualmente limitadas apenas a eventos touch e manipuladas em JavaScript pelas APIs Responder, Pressability e PanResponder.

Além disso, estamos continuando a explorar incluir uma implementação da interface `EventTarget` para componentes host do React Native (ou seja, `add`/`removeEventListener`) que acreditamos tornará possíveis mais abstrações user-land para manipulação de interações de pointer.

## Experimentando

Nossa implementação de Pointer Events ainda é experimental, mas estamos interessados em obter feedback da comunidade sobre o que compartilhamos. Se você está interessado em experimentar esta API, precisará habilitar alguns feature flags:

### Habilitar Feature Flags

:::danger

Sobrescrever os feature flags nativos abaixo (como `RCTConstants` e `ReactFeatureFlags`) é tecnicamente alcançar os internals do React Native, então fazê-lo pode quebrar sua configuração em breve, pois estamos trabalhando para eliminá-los gradualmente para que possamos fazer o rollout de Pointer Events de forma mais ampla.

:::

:::note

Pointer Events são implementados apenas para a [New Architecture (Fabric)](https://reactnative.dev/docs/the-new-architecture/use-app-template) e estão disponíveis apenas para React Native 0.71+ que no momento da escrita é um release candidate.

:::

No seu arquivo JavaScript de entrada (index.js no template padrão de aplicativo React Native) você precisará habilitar o flag `shouldEmitW3CPointerEvents` para Pointer Events e `shouldPressibilityUseW3CPointerEventsForHover` para usar Pointer Events em `Pressability`.

```js
import ReactNativeFeatureFlags from 'react-native/Libraries/ReactNative/ReactNativeFeatureFlags';

// enable the JS-side of the w3c PointerEvent implementation
ReactNativeFeatureFlags.shouldEmitW3CPointerEvents = () => true;

// enable hover events in Pressibility to be backed by the PointerEvent implementation
ReactNativeFeatureFlags.shouldPressibilityUseW3CPointerEventsForHover =
  () => true;
```

### Específico do iOS

Para garantir que os pointer events sejam enviados do renderizador nativo do iOS, você precisará inverter um feature flag nativo no código de inicialização do seu aplicativo nativo (tipicamente `AppDelegate.mm`).

```objc
#import <React/RCTConstants.h>

// ...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    RCTSetDispatchW3CPointerEvents(YES);

    // ...
}
```

Observe que para garantir que a implementação de Pointer Event possa distinguir entre pointers mouse e touch no iOS, você precisa adicionar [`UIApplicationSupportsIndirectInputEvents`](https://developer.apple.com/documentation/bundleresources/information_property_list/uiapplicationsupportsindirectinputevents) ao `info.plist` do seu projeto Xcode.

### Específico do Android

Similarmente ao iOS, Android tem um feature flag que você precisará habilitar na inicialização do seu aplicativo — tipicamente seu `onCreate` para sua atividade ou surface React raiz.

```java
import com.facebook.react.config.ReactFeatureFlags;

//... somewhere in initialization

@Override
public void onCreate() {
    ReactFeatureFlags.dispatchPointerEvents = true;
}
```

### JavaScript

```js
function onPointerOver(event) {
  console.log(
    'Over blue box offset: ',
    event.nativeEvent.offsetX,
    event.nativeEvent.offsetY,
  );
}

// ... in some component
<View
  onPointerOver={onPointerOver}
  style={{height: 100, width: 100, backgroundColor: 'blue'}}
/>;
```

## Feedback Bem-vindo

Hoje Pointer Events são usados por nossa plataforma VR e alimentando a Oculus Store, mas também estamos procurando feedback inicial da comunidade tanto sobre nossa abordagem quanto sobre o que temos para uma implementação até agora. Estamos empolgados em compartilhar nosso progresso adicional com você e se você tiver perguntas ou pensamentos sobre este trabalho, junte-se a nós na [discussão dedicada sobre Pointer Events](https://github.com/react-native-community/discussions-and-proposals/discussions/557).
