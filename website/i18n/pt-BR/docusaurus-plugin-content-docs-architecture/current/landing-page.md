---
ia-translated: true
id: landing-page
title: Sobre a Nova Arquitetura
---

Desde 2018, a equipe do React Native tem redesenhado os componentes internos do React Native para permitir que desenvolvedores criem experiências de maior qualidade. A partir de 2024, esta versão do React Native foi comprovada em escala e alimenta aplicativos de produção na Meta.

O termo _Nova Arquitetura_ refere-se tanto à nova arquitetura do framework quanto ao trabalho para trazê-la ao código aberto.

A Nova Arquitetura está disponível para opt-in experimental desde o [React Native 0.68](/blog/2022/03/30/version-068#opting-in-to-the-new-architecture) com melhorias contínuas em cada lançamento subsequente. A equipe está agora trabalhando para tornar essa a experiência padrão para o ecossistema de código aberto do React Native.

## Por que uma Nova Arquitetura?

Após muitos anos construindo com React Native, a equipe identificou um conjunto de limitações que impediam desenvolvedores de criar certas experiências com alto nível de refinamento. Essas limitações eram fundamentais ao design existente do framework, então a Nova Arquitetura começou como um investimento no futuro do React Native.

A Nova Arquitetura desbloqueia capacidades e melhorias que eram impossíveis na arquitetura legada.

### Layout e Effects Síncronos

Construir experiências de UI adaptativas frequentemente requer medir o tamanho e posição das suas views e ajustar o layout.

Hoje, você usaria o evento [`onLayout`](/docs/view#onlayout) para obter as informações de layout de uma view e fazer quaisquer ajustes. No entanto, atualizações de estado dentro do callback `onLayout` podem ser aplicadas após pintar a renderização anterior. Isso significa que usuários podem ver estados intermediários ou saltos visuais entre renderizar o layout inicial e responder às medições de layout.

Com a Nova Arquitetura, podemos evitar completamente esse problema com acesso síncrono às informações de layout e atualizações adequadamente agendadas, de modo que nenhum estado intermediário seja visível aos usuários.

<details>
<summary>Exemplo: Renderizando um Tooltip</summary>

Medir e posicionar um tooltip acima de uma view nos permite demonstrar o que a renderização síncrona desbloqueia. O tooltip precisa conhecer a posição da sua view alvo para determinar onde deve renderizar.

Na arquitetura atual, usamos `onLayout` para obter as medições da view e então atualizar o posicionamento do tooltip baseado em onde a view está.

```jsx
function ViewWithTooltip() {
  // ...

  // We get the layout information and pass to ToolTip to position itself
  const onLayout = React.useCallback(event => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      // This state update is not guaranteed to run in the same commit
      // This results in a visual "jump" as the ToolTip repositions itself
      setTargetRect({x, y, width, height});
    });
  }, []);

  return (
    <>
      <View ref={targetRef} onLayout={onLayout}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

Com a Nova Arquitetura, podemos usar [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect) para medir e aplicar atualizações de layout sincronamente em um único commit, evitando o "salto" visual.

```jsx
function ViewWithTooltip() {
  // ...

  useLayoutEffect(() => {
    // The measurement and state update for `targetRect` happens in a single commit
    // allowing ToolTip to position itself without intermediate paints
    targetRef.current?.measureInWindow((x, y, width, height) => {
      setTargetRect({x, y, width, height});
    });
  }, [setTargetRect]);

  return (
    <>
      <View ref={targetRef}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

<div className="TwoColumns TwoFigures">
 <figure>
  <img src="/img/new-architecture/async-on-layout.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The tooltip is rendered after a short delay after the view moves" />
  <figcaption>Medição e renderização assíncrona do ToolTip. [Ver código](https://gist.github.com/lunaleaps/eabd653d9864082ac1d3772dac217ab9).</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/sync-use-layout-effect.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The view and tooltip move in unison." />
  <figcaption>Medição e renderização síncrona do ToolTip. [Ver código](https://gist.github.com/lunaleaps/148756563999c83220887757f2e549a3).</figcaption>
</figure>
</div>

</details>

### Suporte para Concurrent Renderer e Recursos

A Nova Arquitetura suporta renderização concorrente e recursos que foram lançados no [React 18](https://react.dev/blog/2022/03/29/react-v18) e além. Agora você pode usar recursos como Suspense para busca de dados, Transitions e outras novas APIs do React no seu código React Native, alinhando ainda mais as bases de código e conceitos entre desenvolvimento React web e nativo.

O concurrent renderer também traz melhorias imediatas como batching automático, que reduz re-renderizações no React.

<details>
<summary>Exemplo: Batching Automático</summary>

Com a Nova Arquitetura, você terá batching automático com o renderizador do React 18.

Neste exemplo, um slider especifica quantos tiles renderizar. Arrastar o slider de 0 a 1000 disparará uma rápida sucessão de atualizações de estado e re-renderizações.

Ao comparar os renderizadores para o [mesmo código](https://gist.github.com/lunaleaps/79bb6f263404b12ba57db78e5f6f28b2), você pode notar visualmente que o renderizador fornece uma UI mais suave, com menos atualizações intermediárias de UI. Atualizações de estado de manipuladores de eventos nativos, como este componente Slider nativo, agora são agrupadas em lotes.

<div className="TwoColumns TwoFigures">
 <figure>
  <img src="/img/new-architecture/legacy-renderer.gif" alt="A video demonstrating an app rendering many views according to a slider input. The slider value is adjusted from 0 to 1000 and the UI slowly catches up to rendering 1000 views." />
  <figcaption>Renderizando atualizações frequentes de estado com renderizador legado.</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/react18-renderer.gif" alt="A video demonstrating an app rendering many views according to a slider input. The slider value is adjusted from 0 to 1000 and the UI resolves to 1000 views faster than the previous example, without as many intermediate states." />
  <figcaption>Renderizando atualizações frequentes de estado com renderizador do React 18.</figcaption>
</figure>
</div>
</details>

Novos recursos concorrentes, como [Transitions](https://react.dev/reference/react/useTransition), dão a você o poder de expressar a prioridade das atualizações de UI. Marcar uma atualização como de prioridade mais baixa diz ao React que ele pode "interromper" a renderização da atualização para lidar com atualizações de prioridade mais alta para garantir uma experiência de usuário responsiva onde importa.

<details>
<summary>Exemplo: Usando `startTransition`</summary>

Podemos construir sobre o exemplo anterior para demonstrar como transitions podem interromper renderização em andamento para lidar com uma atualização de estado mais recente.

Envolvemos a atualização de estado do número de tiles com `startTransition` para indicar que renderizar os tiles pode ser interrompido. `startTransition` também fornece uma flag `isPending` para nos dizer quando a transition está completa.

```jsx
function TileSlider({value, onValueChange}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <View>
        <Text>
          Render {value} Tiles
        </Text>
        <ActivityIndicator animating={isPending} />
      </View>
      <Slider
        value={1}
        minimumValue={1}
        maximumValue={1000}
        step={1}
        onValueChange={newValue => {
          startTransition(() => {
            onValueChange(newValue);
          });
        }}
      />
    </>
  );
}

function ManyTiles() {
  const [value, setValue] = useState(1);
  const tiles = generateTileViews(value);
  return (
      <TileSlider onValueChange={setValue} value={value} />
      <View>
        {tiles}
      </View>
  )
}
```

Você notará que com as atualizações frequentes em uma transition, o React renderiza menos estados intermediários porque ele desiste de renderizar o estado assim que ele se torna obsoleto. Em comparação, sem transitions, mais estados intermediários são renderizados. Ambos os exemplos ainda usam batching automático. Ainda assim, transitions dão ainda mais poder aos desenvolvedores para agrupar renderizações em andamento.

<div className="TwoColumns TwoFigures">
<figure>
  <img src="/img/new-architecture/with-transitions.gif" alt="A video demonstrating an app rendering many views (tiles) according to a slider input. The views are rendered in batches as the slider is quickly adjusted from 0 to 1000. There are less batch renders in comparison to the next video." />
  <figcaption>Renderizando tiles com transitions para interromper renderizações em andamento de estado obsoleto. [Ver código](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions).</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/without-transitions.gif" alt="A video demonstrating an app rendering many views (tiles) according to a slider input. The views are rendered in batches as the slider is quickly adjusted from 0 to 1000." />
  <figcaption>Renderizando tiles sem marcá-lo como uma transition. [Ver código](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions).</figcaption>
</figure>
</div>
</details>

### Interface JavaScript/Nativa Rápida

A Nova Arquitetura remove a [bridge assíncrona](https://reactnative.dev/blog/2018/06/14/state-of-react-native-2018#architecture) entre JavaScript e nativo e a substitui por JavaScript Interface (JSI). JSI é uma interface que permite ao JavaScript manter uma referência a um objeto C++ e vice-versa. Com uma referência de memória, você pode invocar métodos diretamente sem custos de serialização.

JSI permite ao [VisionCamera](https://github.com/mrousavy/react-native-vision-camera), uma popular biblioteca de câmera para React Native, processar frames em tempo real. Buffers de frame típicos são ~30 MB, o que equivale a aproximadamente 2 GB de dados por segundo, dependendo da taxa de quadros. Em comparação com os custos de serialização da bridge, JSI lida com essa quantidade de dados de interface com facilidade. JSI pode expor outros tipos complexos baseados em instâncias, como bancos de dados, imagens, amostras de áudio, etc.

A adoção do JSI na Nova Arquitetura remove essa classe de trabalho de serialização de toda interoperabilidade nativa-JavaScript. Isso inclui inicializar e re-renderizar componentes nativos principais como `View` e `Text`. Você pode ler mais sobre nossa [investigação em desempenho de renderização](https://github.com/reactwg/react-native-new-architecture/discussions/123) na Nova Arquitetura e os benchmarks melhorados que medimos.

## O que posso esperar ao habilitar a Nova Arquitetura?

Embora a Nova Arquitetura habilite esses recursos e melhorias, habilitar a Nova Arquitetura para seu aplicativo ou biblioteca pode não melhorar imediatamente o desempenho ou experiência do usuário.

Por exemplo, seu código pode precisar de refatoração para aproveitar novos recursos como layout effects síncronos ou recursos concorrentes. Embora JSI minimize a sobrecarga entre memória JavaScript e nativa, a serialização de dados pode não ter sido um gargalo para o desempenho do seu aplicativo.

Habilitar a Nova Arquitetura no seu aplicativo ou biblioteca é optar pelo futuro do React Native.

A equipe está pesquisando e desenvolvendo ativamente novos recursos que a Nova Arquitetura desbloqueia. Por exemplo, alinhamento com a web é uma área ativa de exploração na Meta que será lançada para o ecossistema de código aberto do React Native.

- [Atualizações para o modelo de loop de eventos](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0744-well-defined-event-loop.md)
- [APIs de Node e layout](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0607-dom-traversal-and-layout-apis.md)
- [Conformidade de estilização e layout](https://github.com/facebook/yoga/releases/tag/v2.0.0)

Você pode acompanhar e contribuir em nosso repositório dedicado de [discussões e propostas](https://github.com/react-native-community/discussions-and-proposals/discussions/651).

## Devo usar a Nova Arquitetura hoje?

Com 0.76, a Nova Arquitetura está habilitada por padrão em todos os projetos React Native.

Se você encontrar algo que não esteja funcionando bem, por favor abra um issue usando [este template](https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2CType%3A+New+Architecture&projects=&template=new_architecture_bug_report.yml).

Se, por qualquer motivo, você não puder usar a Nova Arquitetura, ainda pode optar por não usá-la:

### Android

1. Abra o arquivo `android/gradle.properties`
2. Alterne a flag `newArchEnabled` de `true` para `false`

```diff title="gradle.properties"
# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
-newArchEnabled=true
+newArchEnabled=false
```

### iOS

1. Abra o arquivo `ios/Podfile`
2. Adicione `ENV['RCT_NEW_ARCH_ENABLED'] = '0'` no escopo principal do Podfile ([Podfile de referência](https://github.com/react-native-community/template/blob/0.76-stable/template/ios/Podfile) no template)

```diff
+ ENV['RCT_NEW_ARCH_ENABLED'] = '0'
# Resolve react_native_pods.rb with node to allow for hoisting
require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
```

3. Instale suas dependências do CocoaPods com o comando:

```shell
bundle exec pod install
```
