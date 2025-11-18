---
ia-translated: true
id: animations
title: Animações
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Animações são muito importantes para criar uma ótima experiência do usuário. Objetos estacionários devem superar a inércia ao começarem a se mover. Objetos em movimento têm momento e raramente param imediatamente. Animações permitem que você transmita movimento fisicamente crível em sua interface.

React Native fornece dois sistemas de animação complementares: [`Animated`](animations#animated-api) para controle granular e interativo de valores específicos, e [`LayoutAnimation`](animations#layoutanimation-api) para transações de layout global animadas.

## API `Animated`

A API [`Animated`](animated) foi projetada para expressar de forma concisa uma ampla variedade de padrões interessantes de animação e interação de maneira muito performática. `Animated` foca em relações declarativas entre entradas e saídas, com transformações configuráveis entre elas, e métodos `start`/`stop` para controlar a execução de animação baseada em tempo.

`Animated` exporta seis tipos de componentes animáveis: `View`, `Text`, `Image`, `ScrollView`, `FlatList` e `SectionList`, mas você também pode criar os seus próprios usando `Animated.createAnimatedComponent()`.

Por exemplo, uma view container que desvanece ao ser montada pode parecer com isto:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer ext=js
import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer ext=tsx
import React, {useEffect, useRef, type PropsWithChildren} from 'react';
import {Animated, Text, View, type ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
```

</TabItem>
</Tabs>

Vamos detalhar o que está acontecendo aqui. No método render do `FadeInView`, um novo `Animated.Value` chamado `fadeAnim` é inicializado com `useRef`. A propriedade opacity na `View` é mapeada para este valor animado. Nos bastidores, o valor numérico é extraído e usado para definir a opacidade.

Quando o componente é montado, a opacidade é definida como 0. Então, uma animação easing é iniciada no valor animado `fadeAnim`, que irá atualizar todos os seus mapeamentos dependentes (neste caso, apenas a opacidade) em cada frame conforme o valor é animado para o valor final de 1.

Isso é feito de uma maneira otimizada que é mais rápida do que chamar `setState` e re-renderizar. Como toda a configuração é declarativa, poderemos implementar otimizações futuras que serializam a configuração e executam a animação em uma thread de alta prioridade.

### Configurando animações

Animações são altamente configuráveis. Funções de easing customizadas e predefinidas, delays, durações, fatores de decaimento, constantes de mola e muito mais podem ser ajustados dependendo do tipo de animação.

`Animated` fornece vários tipos de animação, sendo [`Animated.timing()`](animated#timing) o mais comumente usado. Ele suporta animar um valor ao longo do tempo usando uma das várias funções de easing predefinidas, ou você pode usar a sua própria. Funções de easing são tipicamente usadas em animação para transmitir aceleração e desaceleração gradual de objetos.

Por padrão, `timing` usará uma curva easeInOut que transmite aceleração gradual até a velocidade máxima e conclui desacelerando gradualmente até parar. Você pode especificar uma função de easing diferente passando um parâmetro `easing`. `duration` customizada ou até mesmo um `delay` antes da animação iniciar também são suportados.

Por exemplo, se quisermos criar uma animação de 2 segundos de um objeto que recua ligeiramente antes de se mover para sua posição final:

```tsx
Animated.timing(this.state.xPosition, {
  toValue: 100,
  easing: Easing.back(),
  duration: 2000,
  useNativeDriver: true,
}).start();
```

Dê uma olhada na seção [Configuring animations](animated#configuring-animations) da referência da API `Animated` para aprender mais sobre todos os parâmetros de configuração suportados pelas animações integradas.

### Compondo animações

Animações podem ser combinadas e executadas em sequência ou em paralelo. Animações sequenciais podem ser executadas imediatamente após a animação anterior terminar, ou podem iniciar após um delay especificado. A API `Animated` fornece vários métodos, como `sequence()` e `delay()`, cada um dos quais recebe um array de animações para executar e automaticamente chama `start()`/`stop()` conforme necessário.

Por exemplo, a seguinte animação desacelera até parar, depois volta como uma mola enquanto gira em paralelo:

```tsx
Animated.sequence([
  // decay, then spring to start and twirl
  Animated.decay(position, {
    // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997,
    useNativeDriver: true,
  }),
  Animated.parallel([
    // after decay, in parallel:
    Animated.spring(position, {
      toValue: {x: 0, y: 0}, // return to start
      useNativeDriver: true,
    }),
    Animated.timing(twirl, {
      // and twirl
      toValue: 360,
      useNativeDriver: true,
    }),
  ]),
]).start(); // start the sequence group
```

Se uma animação for parada ou interrompida, então todas as outras animações no grupo também são paradas. `Animated.parallel` tem uma opção `stopTogether` que pode ser definida como `false` para desabilitar isso.

Você pode encontrar uma lista completa de métodos de composição na seção [Composing animations](animated#composing-animations) da referência da API `Animated`.

### Combinando valores animados

Você pode [combinar dois valores animados](animated#combining-animated-values) através de adição, multiplicação, divisão ou módulo para criar um novo valor animado.

Existem alguns casos onde um valor animado precisa inverter outro valor animado para cálculo. Um exemplo é inverter uma escala (2x --> 0.5x):

```tsx
const a = new Animated.Value(1);
const b = Animated.divide(1, a);

Animated.spring(a, {
  toValue: 2,
  useNativeDriver: true,
}).start();
```

### Interpolação

Cada propriedade pode ser executada através de uma interpolação primeiro. Uma interpolação mapeia intervalos de entrada para intervalos de saída, tipicamente usando uma interpolação linear mas também suporta funções de easing. Por padrão, ela irá extrapolar a curva além dos intervalos fornecidos, mas você também pode fazer com que ela limite o valor de saída.

Um mapeamento básico para converter um intervalo de 0-1 para um intervalo de 0-100 seria:

```tsx
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

Por exemplo, você pode querer pensar no seu `Animated.Value` como indo de 0 a 1, mas animar a posição de 150px para 0px e a opacidade de 0 para 1. Isso pode ser feito modificando o `style` do exemplo acima assim:

```tsx
  style={{
    opacity: this.state.fadeAnim, // Binds directly
    transform: [{
      translateY: this.state.fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  }}
```

[`interpolate()`](animated#interpolate) suporta múltiplos segmentos de intervalo também, o que é útil para definir zonas mortas e outros truques práticos. Por exemplo, para obter uma relação de negação em -300 que vai para 0 em -100, depois volta para 1 em 0, e depois volta para zero em 100 seguido por uma zona morta que permanece em 0 para tudo além disso, você poderia fazer:

```tsx
value.interpolate({
  inputRange: [-300, -100, 0, 100, 101],
  outputRange: [300, 0, 1, 0, 0],
});
```

Que seria mapeado assim:

```
Input | Output
------|-------
  -400|    450
  -300|    300
  -200|    150
  -100|      0
   -50|    0.5
     0|      1
    50|    0.5
   100|      0
   101|      0
   200|      0
```

`interpolate()` também suporta mapeamento para strings, permitindo que você anime cores assim como valores com unidades. Por exemplo, se você quisesse animar uma rotação você poderia fazer:

```tsx
value.interpolate({
  inputRange: [0, 360],
  outputRange: ['0deg', '360deg'],
});
```

`interpolate()` também suporta funções de easing arbitrárias, muitas das quais já estão implementadas no módulo [`Easing`](easing). `interpolate()` também tem comportamento configurável para extrapolar o `outputRange`. Você pode definir a extrapolação configurando as opções `extrapolate`, `extrapolateLeft` ou `extrapolateRight`. O valor padrão é `extend` mas você pode usar `clamp` para evitar que o valor de saída exceda `outputRange`.

### Rastreando valores dinâmicos

Valores animados também podem rastrear outros valores definindo o `toValue` de uma animação para outro valor animado em vez de um número simples. Por exemplo, uma animação "Chat Heads" como a usada pelo Messenger no Android poderia ser implementada com um `spring()` fixado em outro valor animado, ou com `timing()` e uma `duration` de 0 para rastreamento rígido. Eles também podem ser compostos com interpolações:

```tsx
Animated.spring(follower, {toValue: leader}).start();
Animated.timing(opacity, {
  toValue: pan.x.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  }),
  useNativeDriver: true,
}).start();
```

Os valores animados `leader` e `follower` seriam implementados usando `Animated.ValueXY()`. `ValueXY` é uma maneira útil de lidar com interações 2D, como panorâmica ou arrasto. É um wrapper básico que contém duas instâncias de `Animated.Value` e algumas funções auxiliares que chamam através delas, tornando `ValueXY` uma substituição direta para `Value` em muitos casos. Isso nos permite rastrear tanto valores x quanto y no exemplo acima.

### Rastreando gestos

Gestos, como panorâmica ou rolagem, e outros eventos podem mapear diretamente para valores animados usando [`Animated.event`](animated#event). Isso é feito com uma sintaxe de mapa estruturado para que valores possam ser extraídos de objetos de evento complexos. O primeiro nível é um array para permitir mapeamento entre múltiplos argumentos, e esse array contém objetos aninhados.

Por exemplo, ao trabalhar com gestos de rolagem horizontal, você faria o seguinte para mapear `event.nativeEvent.contentOffset.x` para `scrollX` (um `Animated.Value`):

```tsx
 onScroll={Animated.event(
   // scrollX = e.nativeEvent.contentOffset.x
   [{nativeEvent: {
        contentOffset: {
          x: scrollX
        }
      }
    }]
 )}
```

O exemplo a seguir implementa um carrossel de rolagem horizontal onde os indicadores de posição de rolagem são animados usando o `Animated.event` usado no `ScrollView`

#### Exemplo de ScrollView com Animated Event

```SnackPlayer name=Animated&supportedPlatforms=ios,android
import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  useAnimatedValue,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const images = new Array(6).fill(
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const App = () => {
  const scrollX = useAnimatedValue(0);

  const {width: windowWidth} = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}>
            {images.map((image, imageIndex) => {
              return (
                <View
                  style={{width: windowWidth, height: 250}}
                  key={imageIndex}>
                  <ImageBackground source={{uri: image}} style={styles.card}>
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>
                        {'Image - ' + imageIndex}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, {width}]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

Ao usar `PanResponder`, você poderia usar o seguinte código para extrair as posições x e y de `gestureState.dx` e `gestureState.dy`. Usamos um `null` na primeira posição do array, pois estamos interessados apenas no segundo argumento passado para o handler `PanResponder`, que é o `gestureState`.

```tsx
onPanResponderMove={Animated.event(
  [null, // ignore the native event
  // extract dx and dy from gestureState
  // like 'pan.x = gestureState.dx, pan.y = gestureState.dy'
  {dx: pan.x, dy: pan.y}
])}
```

#### Exemplo de PanResponder com Animated Event

```SnackPlayer name=Animated
import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag & Release this box!</Text>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;
```

### Respondendo ao valor atual da animação

Você pode notar que não há uma maneira clara de ler o valor atual durante a animação. Isso ocorre porque o valor pode ser conhecido apenas no runtime nativo devido a otimizações. Se você precisar executar JavaScript em resposta ao valor atual, existem duas abordagens:

- `spring.stopAnimation(callback)` irá parar a animação e invocar `callback` com o valor final. Isso é útil ao fazer transições de gestos.
- `spring.addListener(callback)` irá invocar `callback` assincronamente enquanto a animação está em execução, fornecendo um valor recente. Isso é útil para acionar mudanças de estado, por exemplo, encaixar uma bolha em uma nova opção conforme o usuário a arrasta mais perto, porque essas mudanças de estado maiores são menos sensíveis a alguns frames de lag comparado a gestos contínuos como panorâmica que precisam rodar a 60 fps.

`Animated` foi projetado para ser totalmente serializável para que animações possam ser executadas de maneira de alto desempenho, independente do loop normal de eventos JavaScript. Isso influencia a API, então tenha isso em mente quando parecer um pouco mais complicado fazer algo comparado a um sistema totalmente síncrono. Confira `Animated.Value.addListener` como uma maneira de contornar algumas dessas limitações, mas use-o com moderação, pois pode ter implicações de desempenho no futuro.

### Usando o driver nativo

A API `Animated` foi projetada para ser serializável. Ao usar o [driver nativo](/blog/2017/02/14/using-native-driver-for-animated), enviamos tudo sobre a animação para o nativo antes de iniciar a animação, permitindo que o código nativo execute a animação na thread UI sem ter que passar pela bridge em cada frame. Uma vez que a animação tenha iniciado, a thread JS pode ser bloqueada sem afetar a animação.

Usar o driver nativo para animações normais pode ser feito definindo `useNativeDriver: true` na configuração da animação ao iniciá-la. Animações sem uma propriedade `useNativeDriver` terão padrão false por razões legadas, mas emitirão um aviso (e erro de verificação de tipo em TypeScript).

```tsx
Animated.timing(this.state.animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // <-- Set this to true
}).start();
```

Valores animados são compatíveis apenas com um driver, então se você usar o driver nativo ao iniciar uma animação em um valor, certifique-se de que todas as animações nesse valor também usem o driver nativo.

O driver nativo também funciona com `Animated.event`. Isso é especialmente útil para animações que seguem a posição de rolagem, pois sem o driver nativo, a animação sempre executará um frame atrás do gesto devido à natureza assíncrona do React Native.

```tsx
<Animated.ScrollView // <-- Use the Animated ScrollView wrapper
  onScroll={Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: this.state.animatedValue},
        },
      },
    ],
    {useNativeDriver: true}, // <-- Set this to true
  )}>
  {content}
</Animated.ScrollView>
```

Você pode ver o driver nativo em ação executando o [app RNTester](https://github.com/facebook/react-native/blob/main/packages/rn-tester/), depois carregando o Native Animated Example. Você também pode dar uma olhada no [código-fonte](https://github.com/facebook/react-native/blob/master/packages/rn-tester/js/examples/NativeAnimation/NativeAnimationsExample.js) para aprender como esses exemplos foram produzidos.

#### Ressalvas

Nem tudo que você pode fazer com `Animated` é atualmente suportado pelo driver nativo. A principal limitação é que você só pode animar propriedades não relacionadas a layout: coisas como `transform` e `opacity` funcionarão, mas propriedades Flexbox e de posição não. Ao usar `Animated.event`, ele funcionará apenas com eventos diretos e não eventos de propagação. Isso significa que ele não funciona com `PanResponder` mas funciona com coisas como `ScrollView#onScroll`.

Quando uma animação está em execução, ela pode impedir componentes `VirtualizedList` de renderizar mais linhas. Se você precisar executar uma animação longa ou em loop enquanto o usuário está rolando por uma lista, você pode usar `isInteraction: false` na configuração da sua animação para evitar este problema.

### Tenha em mente

Ao usar estilos de transform como `rotateY`, `rotateX` e outros, certifique-se de que o estilo de transform `perspective` esteja no lugar. Neste momento, algumas animações podem não renderizar no Android sem ele. Exemplo abaixo.

```tsx
<Animated.View
  style={{
    transform: [
      {scale: this.state.scale},
      {rotateY: this.state.rotateY},
      {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
    ],
  }}
/>
```

### Exemplos adicionais

O app RNTester tem vários exemplos de `Animated` em uso:

- [AnimatedGratuitousApp](https://github.com/facebook/react-native/tree/main/packages/rn-tester/js/examples/AnimatedGratuitousApp)
- [NativeAnimationsExample](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/NativeAnimation/NativeAnimationsExample.js)

## API `LayoutAnimation`

`LayoutAnimation` permite que você configure globalmente animações `create` e `update` que serão usadas para todas as views no próximo ciclo de render/layout. Isso é útil para fazer atualizações de layout Flexbox sem se preocupar em medir ou calcular propriedades específicas para animá-las diretamente, e é especialmente útil quando mudanças de layout podem afetar ancestrais, por exemplo, uma expansão "ver mais" que também aumenta o tamanho do pai e empurra a linha abaixo para baixo, o que de outra forma exigiria coordenação explícita entre os componentes para animá-los todos em sincronia.

Note que embora `LayoutAnimation` seja muito poderoso e possa ser bastante útil, ele fornece muito menos controle do que `Animated` e outras bibliotecas de animação, então você pode precisar usar outra abordagem se não conseguir fazer `LayoutAnimation` fazer o que você quer.

Note que para fazer isso funcionar no **Android** você precisa definir as seguintes flags via `UIManager`:

```tsx
UIManager.setLayoutAnimationEnabledExperimental(true);
```

```SnackPlayer name=LayoutAnimations
import React, {useState} from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
  const [state, setState] = useState({
    w: 100,
    h: 100,
  });

  const onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    setState({w: state.w + 15, h: state.h + 15});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, {width: state.w, height: state.h}]} />
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Press me!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
```

Este exemplo usa um valor predefinido, você pode customizar as animações conforme necessário, veja [LayoutAnimation.js](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/LayoutAnimation/LayoutAnimation.js) para mais informações.

## Notas adicionais

### `requestAnimationFrame`

`requestAnimationFrame` é um polyfill do navegador que você pode estar familiarizado. Ele aceita uma função como seu único argumento e chama essa função antes da próxima repintura. É um bloco de construção essencial para animações que sustenta todas as APIs de animação baseadas em JavaScript. Em geral, você não deve precisar chamar isso você mesmo - as APIs de animação irão gerenciar atualizações de frame para você.

### `setNativeProps`

Como mencionado [na seção Direct Manipulation](legacy/direct-manipulation), `setNativeProps` nos permite modificar propriedades de componentes com suporte nativo (componentes que são realmente suportados por views nativas, ao contrário de componentes compostos) diretamente, sem ter que usar `setState` e re-renderizar a hierarquia de componentes.

Poderíamos usar isso no exemplo Rebound para atualizar a escala - isso pode ser útil se o componente que estamos atualizando estiver profundamente aninhado e não foi otimizado com `shouldComponentUpdate`.

Se você encontrar suas animações com perda de frames (executando abaixo de 60 frames por segundo), procure usar `setNativeProps` ou `shouldComponentUpdate` para otimizá-las. Ou você poderia executar as animações na thread UI em vez da thread JavaScript [com a opção useNativeDriver](/blog/2017/02/14/using-native-driver-for-animated). Você também pode querer adiar qualquer trabalho computacionalmente intensivo até que as animações sejam concluídas, usando o [InteractionManager](interactionmanager). Você pode monitorar a taxa de frames usando a ferramenta "FPS Monitor" do menu Dev In-App.
