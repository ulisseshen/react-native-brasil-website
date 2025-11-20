---
ia-translated: true
id: performance
title: Visão Geral de Desempenho
---

Uma razão convincente para usar React Native em vez de ferramentas baseadas em WebView é alcançar pelo menos 60 quadros por segundo e fornecer uma aparência e sensação nativas aos seus aplicativos. Sempre que possível, visamos que o React Native lide com otimizações automaticamente, permitindo que você se concentre em seu aplicativo sem se preocupar com desempenho. No entanto, existem certas áreas onde ainda não chegamos a esse nível, e outras onde o React Native (semelhante a escrever código nativo diretamente) não pode determinar a melhor abordagem de otimização para você. Nesses casos, a intervenção manual torna-se necessária. Nós nos esforçamos para oferecer desempenho de UI extremamente suave por padrão, mas pode haver casos em que isso não seja possível.

Este guia pretende ensiná-lo alguns conceitos básicos para ajudá-lo a [solucionar problemas de desempenho](profiling.md), bem como discutir [fontes comuns de problemas e suas soluções sugeridas](performance.md#common-sources-of-performance-problems).

## O que você precisa saber sobre frames

A geração dos seus avós chamava os filmes de ["imagens em movimento"](https://www.youtube.com/watch?v=F1i40rnpOsA) por uma razão: movimento realista em vídeo é uma ilusão criada pela mudança rápida de imagens estáticas em uma velocidade consistente. Nos referimos a cada uma dessas imagens como frames. O número de frames que é exibido a cada segundo tem um impacto direto em quão suave e, em última análise, realista um vídeo (ou interface de usuário) parece ser. Dispositivos iOS e Android exibem pelo menos 60 frames por segundo, o que lhe dá e ao sistema de UI no máximo 16.67ms para fazer todo o trabalho necessário para gerar a imagem estática (frame) que o usuário verá na tela para esse intervalo. Se você não conseguir fazer o trabalho necessário para gerar esse frame dentro do tempo alocado, então você irá "descartar um frame" e a UI parecerá não responsiva.

Agora, para confundir um pouco o assunto, abra o [Dev Menu](debugging.md#opening-the-dev-menu) no seu aplicativo e alterne `Show Perf Monitor`. Você notará que há duas taxas de frames diferentes.

![Performance Monitor screenshot](/docs/assets/PerfUtil.png)

### Taxa de frames JS (thread JavaScript)

Para a maioria dos aplicativos React Native, sua lógica de negócios será executada na thread JavaScript. Este é o lugar onde seu aplicativo React vive, chamadas de API são feitas, eventos de toque são processados e muito mais. Atualizações para views com suporte nativo são agrupadas em lote e enviadas para o lado nativo no final de cada iteração do event loop, antes do prazo do frame (se tudo correr bem). Se a thread JavaScript não responder por um frame, será considerado um frame descartado. Por exemplo, se você fosse definir um novo state no componente raiz de um aplicativo complexo e isso resultasse em re-renderização de subárvores de componentes computacionalmente caras, é concebível que isso possa levar 200ms e resultar em 12 frames sendo descartados. Qualquer animação controlada por JavaScript pareceria congelar durante esse tempo. Se frames suficientes forem descartados, o usuário sentirá.

Um exemplo é responder a toques: se você está fazendo trabalho em múltiplos frames na thread JavaScript, você pode notar um atraso ao responder a `TouchableOpacity`, por exemplo. Isso ocorre porque a thread JavaScript está ocupada e não pode processar os eventos de toque brutos enviados da thread principal. Como resultado, `TouchableOpacity` não pode reagir aos eventos de toque e comandar a view nativa para ajustar sua opacidade.

### Taxa de frames UI (thread principal)

Você pode ter notado que o desempenho dos navegadores de pilha nativos (como o [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator) fornecido pelo React Navigation) é melhor pronto para uso do que os navegadores de pilha baseados em JavaScript. Isso ocorre porque as animações de transição são executadas na thread principal de UI nativa, então elas não são interrompidas por frames descartados na thread JavaScript.

Da mesma forma, você pode rolar para cima e para baixo através de um `ScrollView` quando a thread JavaScript está travada porque o `ScrollView` vive na thread principal. Os eventos de rolagem são despachados para a thread JS, mas sua recepção não é necessária para que a rolagem ocorra.

## Fontes comuns de problemas de desempenho

### Executando em modo de desenvolvimento (`dev=true`)

O desempenho da thread JavaScript sofre muito ao executar em modo de desenvolvimento. Isso é inevitável: muito mais trabalho precisa ser feito em runtime para fornecer bons avisos e mensagens de erro. Sempre certifique-se de testar o desempenho em [builds de release](running-on-device.md#building-your-app-for-production).

### Usando declarações `console.log`

Ao executar um aplicativo empacotado, essas declarações podem causar um grande gargalo na thread JavaScript. Isso inclui chamadas de bibliotecas de depuração, como [redux-logger](https://github.com/evgenyrodionov/redux-logger), então certifique-se de removê-las antes de empacotar. Você também pode usar este [plugin babel](https://babeljs.io/docs/plugins/transform-remove-console/) que remove todas as chamadas `console.*`. Você precisa instalá-lo primeiro com `npm i babel-plugin-transform-remove-console --save-dev`, e então editar o arquivo `.babelrc` no diretório do seu projeto assim:

```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

Isso removerá automaticamente todas as chamadas `console.*` nas versões de release (produção) do seu projeto.

É recomendado usar o plugin mesmo se nenhuma chamada `console.*` for feita em seu projeto. Uma biblioteca de terceiros também poderia chamá-las.

### Renderização do `FlatList` está muito lenta ou desempenho de rolagem está ruim para listas grandes

Se seu [`FlatList`](flatlist.md) está renderizando lentamente, certifique-se de ter implementado [`getItemLayout`](flatlist.md#getitemlayout) para otimizar a velocidade de renderização pulando a medição dos itens renderizados.

Existem também outras bibliotecas de lista de terceiros que são otimizadas para desempenho, incluindo [FlashList](https://github.com/shopify/flash-list) e [Legend List](https://github.com/legendapp/legend-list).

### Descartando FPS da thread JS porque está fazendo muito trabalho na thread JavaScript ao mesmo tempo

"Transições lentas do Navigator" é a manifestação mais comum disso, mas há outros momentos em que isso pode acontecer. Usar [`InteractionManager`](interactionmanager.md) pode ser uma boa abordagem, mas se o custo da experiência do usuário for muito alto para atrasar o trabalho durante uma animação, então você pode querer considerar [`LayoutAnimation`](layoutanimation.md).

A [`API Animated`](animated.md) atualmente calcula cada keyframe sob demanda na thread JavaScript, a menos que você [defina `useNativeDriver: true`](/blog/2017/02/14/using-native-driver-for-animated#how-do-i-use-this-in-my-app), enquanto [`LayoutAnimation`](layoutanimation.md) aproveita o Core Animation e não é afetado por frames descartados na thread JS e thread principal.

Um caso para usar isso é animar em um modal (deslizando para baixo do topo e aparecendo em uma sobreposição translúcida) enquanto inicializa e talvez recebendo respostas para várias solicitações de rede, renderizando o conteúdo do modal e atualizando a view de onde o modal foi aberto. Veja o [guia de Animações](animations.md) para mais informações sobre como usar `LayoutAnimation`.

**Advertências:**

- `LayoutAnimation` funciona apenas para animações fire-and-forget ("estáticas") -- se ela deve ser interrompível, você precisará usar [`Animated`](animated.md).

### Mover uma view na tela (rolando, transladando, rotacionando) descarta FPS da thread UI

Isso é especialmente verdadeiro no Android quando você tem texto com um fundo transparente posicionado em cima de uma imagem, ou qualquer outra situação onde a composição alfa seria necessária para re-desenhar a view em cada frame. Você descobrirá que habilitar `renderToHardwareTextureAndroid` pode ajudar significativamente com isso. Para iOS, `shouldRasterizeIOS` já está habilitado por padrão.

Tenha cuidado para não usar isso em excesso ou seu uso de memória pode ir para o teto. Faça profile do seu desempenho e uso de memória ao usar essas props. Se você não planeja mover uma view mais, desative essa propriedade.

### Animar o tamanho de uma imagem descarta FPS da thread UI

No iOS, cada vez que você ajusta a largura ou altura de um componente [`Image`](image.md), ele é re-cortado e redimensionado da imagem original. Isso pode ser muito caro, especialmente para imagens grandes. Em vez disso, use a propriedade de estilo `transform: [{scale}]` para animar o tamanho. Um exemplo de quando você pode fazer isso é quando você toca em uma imagem e faz zoom para tela cheia.

### Minha view TouchableX não é muito responsiva

Às vezes, se fizermos uma ação no mesmo frame em que estamos ajustando a opacidade ou realce de um componente que está respondendo a um toque, não veremos esse efeito até depois que a função `onPress` retornar. Isso pode ocorrer se `onPress` definir um state que resulta em uma re-renderização pesada e alguns frames forem descartados como resultado. Uma solução para isso é envolver qualquer ação dentro do seu manipulador `onPress` em `requestAnimationFrame`:

```tsx
function handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```
