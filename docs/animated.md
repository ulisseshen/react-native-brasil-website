---
ia-translated: true
id: animated
title: Animated
---

A biblioteca `Animated` foi projetada para tornar as animações fluidas, poderosas e fáceis de criar e manter. `Animated` se concentra em relacionamentos declarativos entre entradas e saídas, transformações configuráveis entre elas, e métodos `start`/`stop` para controlar a execução de animações baseadas em tempo.

O fluxo de trabalho principal para criar uma animação é criar um `Animated.Value`, conectá-lo a um ou mais atributos de estilo de um componente animado e, em seguida, gerar atualizações via animações usando `Animated.timing()`.

:::note
Não modifique o valor animado diretamente. Você pode usar o [Hook `useRef`](https://react.dev/reference/react/useRef) para retornar um objeto ref mutável. A propriedade `current` deste objeto ref é inicializada como o argumento fornecido e persiste durante todo o ciclo de vida do componente.
:::

## Example

O exemplo a seguir contém um `View` que aparecerá gradualmente (fade in) e desaparecerá gradualmente (fade out) com base no valor animado `fadeAnim`

```SnackPlayer name=Animated%20Example
import React, {useRef} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Animated, Text, View, StyleSheet, Button} from 'react-native';

const App = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.fadingText}>Fading View!</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={fadeIn} />
          <Button title="Fade Out View" onPress={fadeOut} />
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
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default App;
```

Consulte o guia [Animations](animations#animated-api) para ver exemplos adicionais de `Animated` em ação.

## Overview

Existem dois tipos de valores que você pode usar com `Animated`:

- [`Animated.Value()`](animated#value) para valores únicos
- [`Animated.ValueXY()`](animated#valuexy) para vetores

`Animated.Value` pode ser vinculado a propriedades de estilo ou outras props, e também pode ser interpolado. Um único `Animated.Value` pode controlar qualquer número de propriedades.

### Configuring animations

`Animated` fornece três tipos de animação. Cada tipo de animação fornece uma curva de animação específica que controla como seus valores são animados do valor inicial até o valor final:

- [`Animated.decay()`](animated#decay) inicia com uma velocidade inicial e gradualmente desacelera até parar.
- [`Animated.spring()`](animated#spring) fornece um modelo básico de física de mola.
- [`Animated.timing()`](animated#timing) anima um valor ao longo do tempo usando [easing functions](easing).

Na maioria dos casos, você usará `timing()`. Por padrão, ele usa uma curva easeInOut simétrica que transmite a aceleração gradual de um objeto até a velocidade máxima e conclui desacelerando gradualmente até parar.

### Working with animations

As animações são iniciadas chamando `start()` na sua animação. `start()` recebe um callback de conclusão que será chamado quando a animação terminar. Se a animação terminar normalmente, o callback de conclusão será invocado com `{finished: true}`. Se a animação terminar porque `stop()` foi chamado nela antes que pudesse terminar (por exemplo, porque foi interrompida por um gesto ou outra animação), então ela receberá `{finished: false}`.

```tsx
Animated.timing({}).start(({finished}) => {
  /* completion callback */
});
```

### Using the native driver

Ao usar o native driver, enviamos tudo sobre a animação para o código nativo antes de iniciar a animação, permitindo que o código nativo execute a animação na thread de UI sem ter que passar pela bridge a cada frame. Uma vez que a animação tenha começado, a thread JS pode ser bloqueada sem afetar a animação.

Você pode usar o native driver especificando `useNativeDriver: true` na sua configuração de animação. Consulte o guia [Animations](animations#using-the-native-driver) para saber mais.

### Animatable components

Apenas componentes animáveis podem ser animados. Esses componentes únicos fazem a mágica de vincular os valores animados às propriedades e fazem atualizações nativas direcionadas para evitar o custo do processo de renderização e reconciliação do React a cada frame. Eles também lidam com a limpeza na desmontagem, então são seguros por padrão.

- [`createAnimatedComponent()`](animated#createanimatedcomponent) pode ser usado para tornar um componente animável.

`Animated` exporta os seguintes componentes animáveis usando o wrapper acima:

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

### Composing animations

As animações também podem ser combinadas de formas complexas usando funções de composição:

- [`Animated.delay()`](animated#delay) inicia uma animação após um determinado atraso.
- [`Animated.parallel()`](animated#parallel) inicia várias animações ao mesmo tempo.
- [`Animated.sequence()`](animated#sequence) inicia as animações em ordem, esperando cada uma completar antes de iniciar a próxima.
- [`Animated.stagger()`](animated#stagger) inicia animações em ordem e em paralelo, mas com atrasos sucessivos.

As animações também podem ser encadeadas definindo o `toValue` de uma animação para ser outro `Animated.Value`. Consulte [Tracking dynamic values](animations#tracking-dynamic-values) no guia de Animations.

Por padrão, se uma animação for interrompida ou parada, todas as outras animações no grupo também serão interrompidas.

### Combining animated values

Você pode combinar dois valores animados via adição, subtração, multiplicação, divisão ou módulo para criar um novo valor animado:

- [`Animated.add()`](animated#add)
- [`Animated.subtract()`](animated#subtract)
- [`Animated.divide()`](animated#divide)
- [`Animated.modulo()`](animated#modulo)
- [`Animated.multiply()`](animated#multiply)

### Interpolation

A função `interpolate()` permite que intervalos de entrada sejam mapeados para diferentes intervalos de saída. Por padrão, ela extrapolará a curva além dos intervalos fornecidos, mas você também pode fazer com que ela limite o valor de saída. Ela usa interpolação linear por padrão, mas também suporta easing functions.

- [`interpolate()`](animatedvalue#interpolate)

Leia mais sobre interpolação no guia [Animation](animations#interpolation).

### Handling gestures and other events

Gestos, como pan ou scroll, e outros eventos podem mapear diretamente para valores animados usando `Animated.event()`. Isso é feito com uma sintaxe de mapa estruturado para que valores possam ser extraídos de objetos de evento complexos. O primeiro nível é um array para permitir mapeamento em múltiplos argumentos, e esse array contém objetos aninhados.

- [`Animated.event()`](animated#event)

Por exemplo, ao trabalhar com gestos de scroll horizontal, você faria o seguinte para mapear `event.nativeEvent.contentOffset.x` para `scrollX` (um `Animated.Value`):

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

---

# Reference

## Methods

Quando o valor fornecido é um ValueXY em vez de um Value, cada opção de configuração pode ser um vetor da forma `{x: ..., y: ...}` em vez de um escalar.

### `decay()`

```tsx
static decay(value, config): CompositeAnimation;
```

Anima um valor de uma velocidade inicial para zero com base em um coeficiente de decaimento.

Config é um objeto que pode ter as seguintes opções:

- `velocity`: Velocidade inicial. Obrigatório.
- `deceleration`: Taxa de decaimento. Padrão 0.997.
- `isInteraction`: Se esta animação cria ou não um "interaction handle" no `InteractionManager`. Padrão true.
- `useNativeDriver`: Usa o native driver quando true. Obrigatório.

---

### `timing()`

```tsx
static timing(value, config): CompositeAnimation;
```

Anima um valor ao longo de uma curva de easing temporizada. O módulo [`Easing`](easing) tem toneladas de curvas predefinidas, ou você pode usar sua própria função.

Config é um objeto que pode ter as seguintes opções:

- `duration`: Duração da animação (milissegundos). Padrão 500.
- `easing`: Função de easing para definir a curva. Padrão é `Easing.inOut(Easing.ease)`.
- `delay`: Inicia a animação após um atraso (milissegundos). Padrão 0.
- `isInteraction`: Se esta animação cria ou não um "interaction handle" no `InteractionManager`. Padrão true.
- `useNativeDriver`: Usa o native driver quando true. Obrigatório.

---

### `spring()`

```tsx
static spring(value, config): CompositeAnimation;
```

Anima um valor de acordo com um modelo de mola analítico baseado em [oscilação harmônica amortecida](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator). Rastreia o estado de velocidade para criar movimentos fluidos conforme o `toValue` é atualizado, e pode ser encadeado.

Config é um objeto que pode ter as seguintes opções.

Observe que você só pode definir um de bounciness/speed, tension/friction, ou stiffness/damping/mass, mas não mais de um:

As opções friction/tension ou bounciness/speed correspondem ao modelo de mola em [`Facebook Pop`](https://github.com/facebook/pop), [Rebound](https://github.com/facebookarchive/rebound), e [Origami](https://origami.design/).

- `friction`: Controla o "quique"/overshoot. Padrão 7.
- `tension`: Controla a velocidade. Padrão 40.
- `speed`: Controla a velocidade da animação. Padrão 12.
- `bounciness`: Controla o quique. Padrão 8.

Especificar stiffness/damping/mass como parâmetros faz com que `Animated.spring` use um modelo de mola analítico baseado nas equações de movimento de um [oscilador harmônico amortecido](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator). Este comportamento é um pouco mais preciso e fiel à física por trás da dinâmica de mola, e imita de perto a implementação no CASpringAnimation do iOS.

- `stiffness`: O coeficiente de rigidez da mola. Padrão 100.
- `damping`: Define como o movimento da mola deve ser amortecido devido às forças de fricção. Padrão 10.
- `mass`: A massa do objeto anexado à extremidade da mola. Padrão 1.

Outras opções de configuração são as seguintes:

- `velocity`: A velocidade inicial do objeto anexado à mola. Padrão 0 (objeto está em repouso).
- `overshootClamping`: Booleano indicando se a mola deve ser limitada e não quicar. Padrão false.
- `restDisplacementThreshold`: O limite de deslocamento do repouso abaixo do qual a mola deve ser considerada em repouso. Padrão 0.001.
- `restSpeedThreshold`: A velocidade na qual a mola deve ser considerada em repouso em pixels por segundo. Padrão 0.001.
- `delay`: Inicia a animação após um atraso (milissegundos). Padrão 0.
- `isInteraction`: Se esta animação cria ou não um "interaction handle" no `InteractionManager`. Padrão true.
- `useNativeDriver`: Usa o native driver quando true. Obrigatório.

---

### `add()`

```tsx
static add(a: Animated, b: Animated): AnimatedAddition;
```

Cria um novo valor Animated composto de dois valores Animated somados.

---

### `subtract()`

```tsx
static subtract(a: Animated, b: Animated): AnimatedSubtraction;
```

Cria um novo valor Animated composto subtraindo o segundo valor Animated do primeiro valor Animated.

---

### `divide()`

```tsx
static divide(a: Animated, b: Animated): AnimatedDivision;
```

Cria um novo valor Animated composto dividindo o primeiro valor Animated pelo segundo valor Animated.

---

### `multiply()`

```tsx
static multiply(a: Animated, b: Animated): AnimatedMultiplication;
```

Cria um novo valor Animated composto de dois valores Animated multiplicados juntos.

---

### `modulo()`

```tsx
static modulo(a: Animated, modulus: number): AnimatedModulo;
```

Cria um novo valor Animated que é o módulo (não-negativo) do valor Animated fornecido

---

### `diffClamp()`

```tsx
static diffClamp(a: Animated, min: number, max: number): AnimatedDiffClamp;
```

Cria um novo valor Animated que é limitado entre 2 valores. Ele usa a diferença entre o último valor, então mesmo que o valor esteja longe dos limites, ele começará a mudar quando o valor começar a se aproximar novamente. (`value = clamp(value + diff, min, max)`).

Isso é útil com eventos de scroll, por exemplo, para mostrar a barra de navegação ao rolar para cima e ocultá-la ao rolar para baixo.

---

### `delay()`

```tsx
static delay(time: number): CompositeAnimation;
```

Inicia uma animação após o atraso fornecido.

---

### `sequence()`

```tsx
static sequence(animations: CompositeAnimation[]): CompositeAnimation;
```

Inicia um array de animações em ordem, esperando cada uma completar antes de iniciar a próxima. Se a animação em execução atual for interrompida, nenhuma animação seguinte será iniciada.

---

### `parallel()`

```tsx
static parallel(
  animations: CompositeAnimation[],
  config?: ParallelConfig
): CompositeAnimation;
```

Inicia um array de animações todas ao mesmo tempo. Por padrão, se uma das animações for interrompida, todas elas serão interrompidas. Você pode substituir isso com a flag `stopTogether`.

---

### `stagger()`

```tsx
static stagger(
  time: number,
  animations: CompositeAnimation[]
): CompositeAnimation;
```

Array de animações pode rodar em paralelo (sobrepostas), mas são iniciadas em sequência com atrasos sucessivos. Bom para fazer efeitos em cascata.

---

### `loop()`

```tsx
static loop(
  animation: CompositeAnimation[],
  config?: LoopAnimationConfig
): CompositeAnimation;
```

Executa uma determinada animação continuamente em loop, de modo que cada vez que ela atinge o final, ela reinicia e começa novamente do início. Executará em loop sem bloquear a thread JS se a animação filha estiver configurada para `useNativeDriver: true`. Além disso, loops podem impedir que componentes baseados em `VirtualizedList` renderizem mais linhas enquanto a animação está em execução. Você pode passar `isInteraction: false` na configuração da animação filha para corrigir isso.

Config é um objeto que pode ter as seguintes opções:

- `iterations`: Número de vezes que a animação deve fazer loop. Padrão `-1` (infinito).

---

### `event()`

```tsx
static event(
  argMapping: Mapping[],
  config?: EventConfig
): (...args: any[]) => void;
```

Recebe um array de mapeamentos e extrai valores de cada argumento de acordo, então chama `setValue` nas saídas mapeadas. Por exemplo:

```tsx
onScroll={Animated.event(
  [{nativeEvent: {contentOffset: {x: this._scrollX}}}],
  {listener: (event: ScrollEvent) => console.log(event)}, // Optional async listener
)}
 ...
onPanResponderMove: Animated.event(
  [
    null, // raw event arg ignored
    {dx: this._panX},
  ], // gestureState arg
  {
    listener: (
      event: GestureResponderEvent,
      gestureState: PanResponderGestureState
    ) => console.log(event, gestureState),
  } // Optional async listener
);
```

Config é um objeto que pode ter as seguintes opções:

- `listener`: Listener assíncrono opcional.
- `useNativeDriver`: Usa o native driver quando true. Obrigatório.

---

### `forkEvent()`

```jsx
static forkEvent(event: AnimatedEvent, listener: Function): AnimatedEvent;
```

API imperativa avançada para espionar eventos animados que são passados através de props. Permite adicionar um novo listener javascript a um `AnimatedEvent` existente. Se `animatedEvent` for um listener javascript, ele mesclará os 2 listeners em um único, e se `animatedEvent` for null/undefined, ele atribuirá o listener javascript diretamente. Use valores diretamente sempre que possível.

---

### `unforkEvent()`

```jsx
static unforkEvent(event: AnimatedEvent, listener: Function);
```

---

### `start()`

```tsx
static start(callback?: (result: {finished: boolean}) => void);
```

As animações são iniciadas chamando start() na sua animação. start() recebe um callback de conclusão que será chamado quando a animação terminar ou quando a animação terminar porque stop() foi chamado nela antes que pudesse terminar.

**Parâmetros:**

| Nome     | Tipo                                    | Obrigatório | Descrição                                                                                                                                                     |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | `(result: {finished: boolean}) => void` | Não       | Função que será chamada após a animação terminar normalmente ou quando a animação terminar porque stop() foi chamado nela antes que pudesse terminar |

Exemplo de start com callback:

```tsx
Animated.timing({}).start(({finished}) => {
  /* completion callback */
});
```

---

### `stop()`

```tsx
static stop();
```

Interrompe qualquer animação em execução.

---

### `reset()`

```tsx
static reset();
```

Interrompe qualquer animação em execução e redefine o valor para o original.

## Properties

### `Value`

Classe de valor padrão para conduzir animações. Tipicamente inicializada com `useAnimatedValue(0);` ou `new Animated.Value(0);` em componentes de classe.

Você pode ler mais sobre a API `Animated.Value` na [página](animatedvalue) separada.

---

### `ValueXY`

Classe de valor 2D para conduzir animações 2D, como gestos de pan.

Você pode ler mais sobre a API `Animated.ValueXY` na [página](animatedvaluexy) separada.

---

### `Interpolation`

Exportado para usar o tipo Interpolation no flow.

---

### `Node`

Exportado para facilitar a verificação de tipo. Todos os valores animados derivam desta classe.

---

### `createAnimatedComponent`

Torna qualquer componente React animável. Usado para criar `Animated.View`, etc.

---

### `attachNativeEvent`

API imperativa para anexar um valor animado a um evento em uma view. Prefira usar `Animated.event` com `useNativeDriver: true` se possível.
