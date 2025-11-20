---
ia-translated: true
title: 'Implementando a Animação de Carregamento do App do Twitter em React Native'
authors: [Eli White]
tags: [engineering]
---

O app iOS do Twitter tem uma animação de carregamento que eu acho muito interessante.

<img src="/blog/assets/loading-screen-01.gif" style={{float: 'left', paddingRight: 80, paddingBottom: 20}} />

Quando o app está pronto, o logo do Twitter se expande de forma encantadora, revelando o aplicativo.

Eu queria descobrir como recriar esta animação de carregamento com React Native.

<hr style={{clear: 'both', marginBottom: 40, width: 80}} />

Para entender _como_ construir isso, primeiro tive que entender as diferentes peças da animação de carregamento. A maneira mais fácil de ver a sutileza é desacelerar.

<img src="/blog/assets/loading-screen-02.gif" style={{marginTop: 20, float: 'left', paddingRight: 80, paddingBottom: 20}} />

Existem algumas peças principais nisso que precisaremos descobrir como construir.

1. Escalar o pássaro.
1. À medida que o pássaro cresce, mostrar o app por baixo
1. Reduzir ligeiramente a escala do app no final

Levei um bom tempo para descobrir como fazer esta animação.

Comecei com uma suposição _incorreta_ de que o fundo azul e o pássaro do Twitter eram uma camada em _cima_ do app e que, à medida que o pássaro crescia, ele se tornava transparente, o que revelava o app por baixo. Esta abordagem não funciona porque o pássaro do Twitter se tornando transparente mostraria a camada azul, não o app por baixo!

Felizmente para você, caro leitor, você não precisa passar pela mesma frustração que eu passei. Você tem este tutorial agradável pulando para as coisas boas!

<hr style={{clear: 'both', marginBottom: 40, width: 80}} />

## O caminho certo

Antes de chegarmos ao código, é importante entender como decompor isso. Para ajudar a visualizar este efeito, eu o recriei no [CodePen](https://codepen.io/TheSavior/pen/NXNoJM) (incorporado em alguns parágrafos) para que você possa ver interativamente as diferentes camadas.

<img src="/blog/assets/loading-screen-03.png" style={{float: 'left', paddingRight: 80, paddingBottom: 20}} />

Existem três camadas principais para este efeito. A primeira é a camada de fundo azul. Embora isso pareça aparecer em cima do app, na verdade está no fundo.

Então temos uma camada branca lisa. E então, por último, bem na frente, está nosso app.

<hr style={{clear: 'both', marginBottom: 40, width: 80}} />
<img src="/blog/assets/loading-screen-04.png" style={{float: 'left', paddingRight: 80, paddingBottom: 20}} />

O truque principal desta animação é usar o logo do Twitter como uma `mask` e mascarar tanto o app quanto a camada branca. Não vou me aprofundar muito nos detalhes do masking, existem [muitos](https://www.html5rocks.com/en/tutorials/masking/adobe/) [recursos](https://designshack.net/articles/graphics/a-complete-beginners-guide-to-masking-in-photoshop/) [online](https://www.sketchapp.com/docs/shapes/masking/) para isso.

O básico do masking neste contexto é ter imagens onde pixels opacos da máscara mostram o conteúdo que estão mascarando, enquanto pixels transparentes da máscara escondem o conteúdo que estão mascarando.

Usamos o logo do Twitter como uma máscara, fazendo com que ela mascare duas camadas; a camada branca sólida e a camada do app.

Para revelar o app, escalamos a máscara até que ela seja maior que a tela inteira.

Enquanto a máscara está escalando, fazemos fade in da opacidade da camada do app, mostrando o app e escondendo a camada branca sólida atrás dele. Para finalizar o efeito, começamos a camada do app em uma escala > 1, e a reduzimos para 1 conforme a animação está terminando. Em seguida, escondemos as camadas que não são do app, pois elas nunca mais serão vistas.

Dizem que uma imagem vale 1.000 palavras. Quantas palavras vale uma visualização interativa? Clique através da animação com o botão "Next Step". Mostrar as camadas dá a você uma perspectiva de vista lateral. A grade está lá para ajudar a visualizar as camadas transparentes.

<iframe
  height="750"
  scrolling="no"
  title="Loading Screen Animation Steps"
  src="//codepen.io/TheSavior/embed/NXNoJM/?height=265&theme-id=0&default-tab=result&embed-version=2"
  frameborder="no"
  allowFullScreen={true}
  className="codepen">
  See the Pen{' '}
  <a href="https://codepen.io/TheSavior/pen/NXNoJM/">
    Loading Screen Animation Steps
  </a>
  {' '}by Eli White (
  <a href="https://codepen.io/TheSavior">@TheSavior</a>) on{' '}
  <a href="https://codepen.io">CodePen</a>.
</iframe>

## Agora, para o React Native

Muito bem. Agora que sabemos o que estamos construindo e como a animação funciona, podemos descer para o código — a razão pela qual você está realmente aqui.

A peça principal deste quebra-cabeça é [MaskedViewIOS](https://reactnative.dev/docs/0.63/maskedviewios), um componente principal do React Native.

```jsx
import {MaskedViewIOS} from 'react-native';

<MaskedViewIOS maskElement={<Text>Basic Mask</Text>}>
  <View style={{backgroundColor: 'blue'}} />
</MaskedViewIOS>;
```

`MaskedViewIOS` recebe as props `maskElement` e `children`. Os children são mascarados pelo `maskElement`. Note que a máscara não precisa ser uma imagem, pode ser qualquer view arbitrária. O comportamento do exemplo acima seria renderizar a view azul, mas para ser visível apenas onde as palavras "Basic Mask" estão no `maskElement`. Acabamos de fazer um texto azul complicado.

O que queremos fazer é renderizar nossa camada azul e, em cima, renderizar nossas camadas mascaradas do app e branca com o logo do Twitter.

```jsx
{
  fullScreenBlueLayer;
}
<MaskedViewIOS
  style={{flex: 1}}
  maskElement={
    <View style={styles.centeredFullScreen}>
      <Image source={twitterLogo} />
    </View>
  }>
  {fullScreenWhiteLayer}
  <View style={{flex: 1}}>
    <MyApp />
  </View>
</MaskedViewIOS>;
```

Isso nos dará as camadas que vemos abaixo.

<img src="/blog/assets/loading-screen-04.png" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />

## Agora para a parte Animated

Temos todas as peças que precisamos para fazer isso funcionar, o próximo passo é animá-las. Para fazer esta animação ter uma boa sensação, utilizaremos a API [Animated](/docs/animated) do React Native.

Animated nos permite definir nossas animações de forma declarativa em JavaScript. Por padrão, essas animações rodam em JavaScript e dizem à camada nativa quais mudanças fazer em cada frame. Mesmo que o JavaScript tente atualizar a animação a cada frame, provavelmente não será capaz de fazer isso rápido o suficiente e causará frames perdidos (jank). Não é o que queremos!

Animated tem um comportamento especial para permitir que você tenha animações sem esse jank. Animated tem um flag chamado `useNativeDriver` que envia sua definição de animação do JavaScript para o nativo no início da sua animação, permitindo que o lado nativo processe as atualizações da sua animação sem ter que ir e voltar para o JavaScript a cada frame. A desvantagem do `useNativeDriver` é que você só pode atualizar um conjunto específico de propriedades, principalmente `transform` e `opacity`. Você não pode animar coisas como background color com `useNativeDriver`, pelo menos ainda não — adicionaremos mais ao longo do tempo, e é claro você sempre pode enviar um PR para propriedades que você precisa para o seu projeto, beneficiando toda a comunidade 😀.

Como queremos que esta animação seja suave, trabalharemos dentro dessas restrições. Para uma visão mais aprofundada de como `useNativeDriver` funciona nos bastidores, confira nosso [blog post anunciando isso](/blog/2017/02/14/using-native-driver-for-animated).

## Decompondo nossa animação

Existem 4 componentes para nossa animação:

1. Aumentar o pássaro, revelando o app e a camada branca sólida
1. Fazer fade in do app
1. Reduzir a escala do app
1. Esconder a camada branca e a camada azul quando terminar

Com Animated, existem duas maneiras principais de definir sua animação. A primeira é usando `Animated.timing` que permite que você diga exatamente quanto tempo sua animação vai rodar, junto com uma curva de easing para suavizar o movimento. A outra abordagem é usando as APIs baseadas em física, como `Animated.spring`. Com `Animated.spring`, você especifica parâmetros como a quantidade de fricção e tensão na mola, e deixa a física rodar sua animação.

Temos múltiplas animações que queremos que estejam rodando ao mesmo tempo que estão todas intimamente relacionadas umas com as outras. Por exemplo, queremos que o app comece a fazer fade in enquanto a máscara está no meio da revelação. Como essas animações estão intimamente relacionadas, usaremos `Animated.timing` com um único `Animated.Value`.

`Animated.Value` é um wrapper em torno de um valor nativo que Animated usa para saber o estado de uma animação. Você normalmente quer ter apenas um desses para uma animação completa. A maioria dos componentes que usam Animated armazenará o valor no state.

Como estou pensando sobre esta animação como etapas ocorrendo em diferentes pontos no tempo ao longo da animação completa, começaremos nosso `Animated.Value` em 0, representando 0% completo, e terminaremos nosso valor em 100, representando 100% completo.

Nosso estado inicial do componente será o seguinte.

```jsx
state = {
  loadingProgress: new Animated.Value(0),
};
```

Quando estivermos prontos para começar a animação, dizemos ao Animated para animar este valor para 100.

```jsx
Animated.timing(this.state.loadingProgress, {
  toValue: 100,
  duration: 1000,
  useNativeDriver: true, // This is important!
}).start();
```

Então tento descobrir uma estimativa aproximada das diferentes peças das animações e os valores que quero que elas tenham em diferentes estágios da animação geral. Abaixo está uma tabela das diferentes peças da animação, e o que acho que seus valores devem ser em diferentes pontos conforme progredimos através do tempo.

![](/blog/assets/loading-screen-05.png)

A máscara do pássaro do Twitter deve começar na escala 1, e fica menor antes de disparar em tamanho. Então, em 10% através da animação, deve ter um valor de escala de .8 antes de disparar para escala 70 no final. Escolher 70 foi bem arbitrário para ser honesto, precisava ser grande o suficiente para que o pássaro revelasse totalmente a tela e 60 não era grande o suficiente 😀. Algo interessante sobre esta parte, no entanto, é que quanto maior o número, mais rápido parecerá que está crescendo porque tem que chegar lá no mesmo tempo. Este número levou algumas tentativas e erros para ficar bom com este logo. Logos / dispositivos de tamanhos diferentes exigirão que esta escala final seja diferente para garantir que toda a tela seja revelada.

O app deve ficar opaco por um tempo, pelo menos até o logo do Twitter ficar menor. Com base na animação oficial, quero começar a mostrá-lo quando o pássaro estiver no meio do caminho escalando e revelá-lo completamente bem rapidamente. Então, em 15% começamos a mostrá-lo, e em 30% através da animação geral ele está totalmente visível.

A escala do app começa em 1.1 e escala para sua escala regular até o final da animação.

## E agora, em código.

O que essencialmente fizemos acima é mapear os valores da porcentagem de progresso da animação para os valores das peças individuais. Fazemos isso com Animated usando `.interpolate`. Criamos 3 objetos de estilo diferentes, um para cada peça da animação, usando valores interpolados baseados em `this.state.loadingProgress`.

```jsx
const loadingProgress = this.state.loadingProgress;

const opacityClearToVisible = {
  opacity: loadingProgress.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    // clamp means when the input is 30-100, output should stay at 1
  }),
};

const imageScale = {
  transform: [
    {
      scale: loadingProgress.interpolate({
        inputRange: [0, 10, 100],
        outputRange: [1, 0.8, 70],
      }),
    },
  ],
};

const appScale = {
  transform: [
    {
      scale: loadingProgress.interpolate({
        inputRange: [0, 100],
        outputRange: [1.1, 1],
      }),
    },
  ],
};
```

Agora que temos esses objetos de estilo, podemos usá-los ao renderizar o trecho da view de antes no post. Note que apenas `Animated.View`, `Animated.Text` e `Animated.Image` são capazes de usar objetos de estilo que usam `Animated.Value`.

```jsx
const fullScreenBlueLayer = (
  <View style={styles.fullScreenBlueLayer} />
);
const fullScreenWhiteLayer = (
  <View style={styles.fullScreenWhiteLayer} />
);

return (
  <View style={styles.fullScreen}>
    {fullScreenBlueLayer}
    <MaskedViewIOS
      style={{flex: 1}}
      maskElement={
        <View style={styles.centeredFullScreen}>
          <Animated.Image
            style={[styles.maskImageStyle, imageScale]}
            source={twitterLogo}
          />
        </View>
      }>
      {fullScreenWhiteLayer}
      <Animated.View
        style={[opacityClearToVisible, appScale, {flex: 1}]}>
        {this.props.children}
      </Animated.View>
    </MaskedViewIOS>
  </View>
);
```

<img src="/blog/assets/loading-screen-06.gif" style={{float: 'left', paddingRight: 80, paddingBottom: 20}} />

Eba! Agora temos as peças da animação parecendo como queremos. Agora só temos que limpar nossas camadas azul e branca que nunca mais serão vistas.

Para saber quando podemos limpá-las, precisamos saber quando a animação está completa. Felizmente, onde chamamos `Animated.timing`, `.start` recebe um callback opcional que roda quando a animação está completa.

```jsx
Animated.timing(this.state.loadingProgress, {
  toValue: 100,
  duration: 1000,
  useNativeDriver: true,
}).start(() => {
  this.setState({
    animationDone: true,
  });
});
```

Agora que temos um valor no `state` para saber se terminamos com a animação, podemos modificar nossas camadas azul e branca para usar isso.

```jsx
const fullScreenBlueLayer = this.state.animationDone ? null : (
  <View style={[styles.fullScreenBlueLayer]} />
);
const fullScreenWhiteLayer = this.state.animationDone ? null : (
  <View style={[styles.fullScreenWhiteLayer]} />
);
```

Voilà! Nossa animação agora funciona e limpamos nossas camadas não utilizadas quando a animação termina. Construímos a animação de carregamento do app do Twitter!

## Mas espere, o meu não funciona!

Não se preocupe, caro leitor. Eu também odeio quando guias só te dão pedaços do código e não te dão o código-fonte completo.

Este componente foi publicado no npm e está no GitHub como [react-native-mask-loader](https://github.com/TheSavior/react-native-mask-loader). Para experimentar isso no seu telefone, está [disponível no Expo](https://expo.io/@eliwhite/react-native-mask-loader-example) aqui:

<img src="/blog/assets/loading-screen-07.png" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />

## Mais Leitura / Crédito Extra

1. [Este gitbook](https://browniefed.com/react-native-animation-book/) é um ótimo recurso para aprender mais sobre Animated depois de ter lido a documentação do React Native.
1. A animação real do Twitter parece acelerar a revelação da máscara no final. Tente modificar o loader para usar uma função de easing diferente (ou uma mola!) para combinar melhor com esse comportamento.
1. A escala final atual da máscara está codificada e provavelmente não revelará todo o app em um tablet. Calcular a escala final com base no tamanho da tela e tamanho da imagem seria um PR incrível.
