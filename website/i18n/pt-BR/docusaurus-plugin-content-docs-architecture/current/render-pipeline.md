---
ia-translated: true
id: render-pipeline
title: Render, Commit e Mount
---

import FabricWarning from './\_fabric-warning.mdx';

<FabricWarning />

O renderizador do React Native passa por uma sequência de trabalho para renderizar lógica React para uma [plataforma host](architecture-glossary.md#host-platform). Esta sequência de trabalho é chamada de pipeline de renderização e ocorre para renderizações iniciais e atualizações ao estado da UI. Este documento aborda o pipeline de renderização e como ele difere nesses cenários.

O pipeline de renderização pode ser dividido em três fases gerais:

1. **Render:** React executa lógica de produto que cria uma [React Element Trees](architecture-glossary.md#react-element-tree-and-react-element) em JavaScript. A partir desta árvore, o renderizador cria uma [React Shadow Tree](architecture-glossary.md#react-shadow-tree-and-react-shadow-node) em C++.
2. **Commit**: Após uma React Shadow Tree estar totalmente criada, o renderizador dispara um commit. Isso **promove** tanto a React Element Tree quanto a React Shadow Tree recém-criada como a "próxima árvore" a ser montada. Isso também agenda o cálculo de suas informações de layout.
3. **Mount:** A React Shadow Tree, agora com os resultados do cálculo de layout, é transformada em uma [Host View Tree](architecture-glossary.md#host-view-tree-and-host-view).

> As fases do pipeline de renderização podem ocorrer em threads diferentes. Consulte o documento [Threading Model](threading-model) para mais detalhes.

![React Native renderer Data flow](/docs/assets/Architecture/renderer-pipeline/data-flow.jpg)

---

## Renderização Inicial

Imagine que você queira renderizar o seguinte:

```jsx
function MyComponent() {
  return (
    <View>
      <Text>Hello, World</Text>
    </View>
  );
}

// <MyComponent />
```

No exemplo acima, `<MyComponent />` é um [React Element](architecture-glossary.md#react-element-tree-and-react-element). React reduz recursivamente este _React Element_ a um [React Host Component](architecture-glossary.md#react-host-components-or-host-components) terminal invocando-o (ou seu método `render` se implementado com uma classe JavaScript) até que todo _React Element_ não possa ser mais reduzido. Agora você tem uma _React Element Tree_ de [React Host Components](architecture-glossary.md#react-host-components-or-host-components).

### Fase 1. Render

![Phase one: render](/docs/assets/Architecture/renderer-pipeline/phase-one-render.png)

Durante este processo de redução de elementos, à medida que cada _React Element_ é invocado, o renderizador também cria sincronamente um [React Shadow Node](architecture-glossary.md#react-shadow-tree-and-react-shadow-node). Isso acontece apenas para _React Host Components_, não para [React Composite Components](architecture-glossary.md#react-composite-components). No exemplo acima, o `<View>` leva à criação de um objeto `ViewShadowNode`, e o
`<Text>` leva à criação de um objeto `TextShadowNode`. Notavelmente, nunca há um _React Shadow Node_ que represente diretamente `<MyComponent>`.

Sempre que React cria uma relação pai-filho entre dois _React Element Nodes_, o renderizador cria a mesma relação entre os _React Shadow Nodes_ correspondentes. É assim que a _React Shadow Tree_ é montada.

**Detalhes Adicionais**

- As operações (criação de _React Shadow Node_, criação de relação pai-filho entre dois _React Shadow Nodes_) são operações síncronas e thread-safe que são executadas do React (JavaScript) para o renderizador (C++), geralmente na JavaScript thread.
- A _React Element Tree_ (e seus _React Element Nodes_ constituintes) não existem indefinidamente. É uma representação temporal materializada por "fibers" no React. Cada "fiber" que representa um host component armazena um ponteiro C++ para o _React Shadow Node_, possibilitado por JSI. [Saiba mais sobre "fibers" neste documento.](https://github.com/acdlite/react-fiber-architecture#what-is-a-fiber)
- A _React Shadow Tree_ é imutável. Para atualizar qualquer _React Shadow Node_, o renderizador cria uma nova _React Shadow Tree_. No entanto, o renderizador fornece operações de clonagem para tornar atualizações de estado mais performáticas (veja [React State Updates](render-pipeline#react-state-updates) para mais detalhes).

No exemplo acima, o resultado da fase de renderização se parece com isto:

![Step one](/docs/assets/Architecture/renderer-pipeline/render-pipeline-1.png)

Após a _React Shadow Tree_ estar completa, o renderizador dispara um commit da _React Element Tree_.

### Fase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

A fase de commit consiste em duas operações: _Layout Calculation_ e _Tree Promotion_.

- **Layout Calculation:** Esta operação calcula a posição e tamanho de cada _React Shadow Node_. No React Native, isso envolve invocar Yoga para calcular o layout de cada _React Shadow Node_. O cálculo real requer os estilos de cada _React Shadow Node_ que se originam de um _React Element_ em JavaScript. Também requer as restrições de layout da raiz da _React Shadow Tree_, que determina a quantidade de espaço disponível que os nós resultantes podem ocupar.

![Step two](/docs/assets/Architecture/renderer-pipeline/render-pipeline-2.png)

- **Tree Promotion (Nova Árvore → Próxima Árvore):** Esta operação promove a nova _React Shadow Tree_ como a "próxima árvore" a ser montada. Esta promoção indica que a nova _React Shadow Tree_ tem todas as informações para ser montada e representa o último estado da _React Element Tree_. A "próxima árvore" monta no próximo "tick" da UI Thread.

**Detalhes Adicionais**

- Essas operações são executadas assincronamente em uma background thread.
- A maioria do cálculo de layout executa inteiramente dentro de C++. No entanto, o cálculo de layout de alguns componentes depende da _plataforma host_ (por exemplo, `Text`, `TextInput`, etc.). Tamanho e posição de texto são específicos para cada _plataforma host_ e precisam ser calculados na camada da _plataforma host_. Para este propósito, Yoga invoca uma função definida na _plataforma host_ para calcular o layout do componente.

### Fase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

A fase de mount transforma a _React Shadow Tree_ (que agora contém dados do cálculo de layout) em uma _Host_ _View Tree_ com pixels renderizados na tela. Como lembrete, a _React Element Tree_ se parece com isto:

```jsx
<View>
  <Text>Hello, World</Text>
</View>
```

Em alto nível, o renderizador do React Native cria uma [Host View](architecture-glossary.md#host-view-tree-and-host-view) correspondente para cada _React Shadow Node_ e a monta na tela. No exemplo acima, o renderizador cria uma instância de `android.view.ViewGroup` para o `<View>` e `android.widget.TextView` para `<Text>` e a popula com "Hello World". Similarmente para iOS, um `UIView` é criado e o texto é populado com uma chamada para `NSLayoutManager`. Cada host view é então configurada para usar props do seu React Shadow Node, e seu tamanho e posição são configurados usando as informações de layout calculadas.

![Step two](/docs/assets/Architecture/renderer-pipeline/render-pipeline-3.png)

Em mais detalhes, a fase de montagem consiste nestes três passos:

- **Tree Diffing:** Este passo calcula o diff entre a "árvore previamente renderizada" e a "próxima árvore" inteiramente em C++. O resultado é uma lista de operações de mutação atômicas a serem realizadas em host views (por exemplo, `createView`, `updateView`, `removeView`, `deleteView`, etc). Este passo também é onde a React Shadow Tree é achatada para evitar criar host views desnecessárias. Veja [View Flattening](view-flattening) para detalhes sobre este algoritmo.
- **Tree Promotion (Próxima Árvore → Árvore Renderizada)**: Este passo promove atomicamente a "próxima árvore" para "árvore previamente renderizada" para que a próxima fase de mount calcule um diff contra a árvore adequada.
- **View Mounting**: Este passo aplica as operações de mutação atômicas nas host views correspondentes. Este passo executa na _plataforma host_ na UI thread.

**Detalhes Adicionais**

- As operações são executadas sincronamente na UI thread. Se a fase de commit executar em background thread, a fase de montagem é agendada para o próximo "tick" da UI thread. Por outro lado, se a fase de commit executar na UI thread, a fase de montagem executa sincronamente na mesma thread.
- Agendamento, implementação e execução da fase de montagem dependem fortemente da _plataforma host_. Por exemplo, a arquitetura do renderizador da camada de montagem atualmente difere entre Android e iOS.
- Durante a renderização inicial, a "árvore previamente renderizada" está vazia. Como tal, o passo de tree diffing resultará em uma lista de operações de mutação que consiste apenas em criar views, definir props e adicionar views umas às outras. Tree diffing torna-se mais importante para desempenho ao processar [React State Updates](#react-state-updates).
- Em testes de produção atuais, uma _React Shadow Tree_ tipicamente consiste em cerca de 600-1000 _React Shadow Nodes_ (antes do view flattening), as árvores são reduzidas para ~200 nós após view flattening. No iPad ou aplicativos desktop, essa quantidade pode aumentar 10 vezes.

---

## React State Updates

Vamos explorar cada fase do pipeline de renderização quando o estado de uma _React Element Tree_ é atualizado. Digamos que você renderizou o seguinte componente em uma renderização inicial:

```jsx
function MyComponent() {
  return (
    <View>
      <View
        style={{backgroundColor: 'red', height: 20, width: 20}}
      />
      <View
        style={{backgroundColor: 'blue', height: 20, width: 20}}
      />
    </View>
  );
}
```

Aplicando o que foi descrito na seção [Renderização Inicial](#initial-render), você esperaria que as seguintes árvores fossem criadas:

![Render pipeline 4](/docs/assets/Architecture/renderer-pipeline/render-pipeline-4.png)

Observe que **Node 3** mapeia para uma host view com um **fundo vermelho**, e **Node 4** mapeia para uma host view com um **fundo azul**. Assuma que como resultado de uma atualização de estado na lógica de produto JavaScript, o fundo da primeira `<View>` aninhada muda de `'red'` para `'yellow'`. É assim que a nova _React Element Tree_ pode parecer:

```jsx
<View>
  <View
    style={{backgroundColor: 'yellow', height: 20, width: 20}}
  />
  <View
    style={{backgroundColor: 'blue', height: 20, width: 20}}
  />
</View>
```

**Como esta atualização é processada pelo React Native?**

Quando uma atualização de estado ocorre, o renderizador precisa conceitualmente atualizar a _React Element Tree_ para atualizar as host views que já estão montadas. Mas para preservar thread safety, tanto a _React Element Tree_ quanto a _React Shadow Tree_ devem ser imutáveis. Isso significa que ao invés de mutar a _React Element Tree_ e _React Shadow Tree_ atuais, React deve criar uma nova cópia de cada árvore que incorpora as novas props, estilos e filhos.

Vamos explorar cada fase do pipeline de renderização durante uma atualização de estado.

### Fase 1. Render

![Phase one: render](/docs/assets/Architecture/renderer-pipeline/phase-one-render.png)

Quando React cria uma nova _React Element Tree_ que incorpora o novo estado, ele deve clonar todo _React Element_ e _React Shadow Node_ que é impactado pela mudança. Após clonar, a nova _React Shadow Tree_ é commitada.

O renderizador do React Native aproveita compartilhamento estrutural para minimizar a sobrecarga de imutabilidade. Quando um _React Element_ é clonado para incluir o novo estado, todo _React Element_ que está no caminho até a raiz é clonado. **React apenas clonará um React Element se ele requer uma atualização para suas props, estilo ou filhos.** Quaisquer _React Elements_ que não são alterados pela atualização de estado são compartilhados pelas árvores antiga e nova.

No exemplo acima, React cria a nova árvore usando estas operações:

1. CloneNode(**Node 3**, `{backgroundColor: 'yellow'}`) → **Node 3'**
2. CloneNode(**Node 2**) → **Node 2'**
3. AppendChild(**Node 2'**, **Node 3'**)
4. AppendChild(**Node 2'**, **Node 4**)
5. CloneNode(**Node 1**) → **Node 1'**
6. AppendChild(**Node 1'**, **Node 2'**)

Após essas operações, **Node 1'** representa a raiz da nova _React Element Tree_. Vamos atribuir **T** à "árvore previamente renderizada" e **T'** à "nova árvore":

![Render pipeline 5](/docs/assets/Architecture/renderer-pipeline/render-pipeline-5.png)

Observe como **T** e **T'** ambas compartilham **Node 4**. Compartilhamento estrutural melhora desempenho e reduz uso de memória.

### Fase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

Após React criar a nova _React Element Tree_ e _React Shadow Tree_, ele deve commitá-las.

- **Layout Calculation:** Similar a Layout Calculation durante [Renderização Inicial](#initial-render). Uma diferença importante é que cálculo de layout pode fazer com que _React Shadow Nodes_ compartilhados sejam clonados. Isso pode acontecer porque se o pai de um _React Shadow Node_ compartilhado incorre em uma mudança de layout, o layout do _React Shadow Node_ compartilhado também pode mudar.
- **Tree Promotion (Nova Árvore → Próxima Árvore):** Similar a Tree Promotion durante [Renderização Inicial](#initial-render).

### Fase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

- **Tree Promotion (Próxima Árvore → Árvore Renderizada)**: Este passo promove atomicamente a "próxima árvore" para "árvore previamente renderizada" para que a próxima fase de mount calcule um diff contra a árvore adequada.
- **Tree Diffing:** Este passo calcula o diff entre a "árvore previamente renderizada" (**T**) e a "próxima árvore" (**T'**). O resultado é uma lista de operações de mutação atômicas a serem realizadas em _host views_.
  - No exemplo acima, as operações consistem em: `UpdateView(**Node 3**, {backgroundColor: 'yellow'})`
  - O diff pode ser calculado para qualquer árvore atualmente montada com qualquer nova árvore. O renderizador pode pular algumas versões intermediárias da árvore.
- **View Mounting**: Este passo aplica as operações de mutação atômicas nas _host views_ correspondentes. No exemplo acima, apenas o `backgroundColor` do **View 3** será atualizado (para amarelo).

![Render pipeline 6](/docs/assets/Architecture/renderer-pipeline/render-pipeline-6.png)

---

## React Native Renderer State Updates

Para a maioria das informações na _Shadow Tree_, React é o único proprietário e única fonte da verdade. Todos os dados se originam do React e há um fluxo unidirecional de dados.

No entanto, há uma exceção e mecanismo importante: componentes em C++ podem conter estado que não é diretamente exposto ao JavaScript, e JavaScript não é a fonte da verdade. C++ e _Plataforma Host_ controlam este _C++ State_. Geralmente, isso só é relevante se você está desenvolvendo um _Host Component_ complicado que precisa de _C++ State_. A grande maioria dos _Host Components_ não precisa desta funcionalidade.

Por exemplo, `ScrollView` usa este mecanismo para permitir que o renderizador saiba qual é o offset atual. A atualização é disparada da _plataforma host_, especificamente da host view que representa o componente `ScrollView`. A informação sobre offset é usada em uma API como [measure](https://reactnative.dev/docs/direct-manipulation#measurecallback). Como esta atualização provém da plataforma host, e não afeta a React Element Tree, esses dados de estado são mantidos pelo _C++ State_.

Conceitualmente, atualizações de _C++ State_ são similares às [React State Updates](render-pipeline#react-state-updates) descritas acima.
Com duas diferenças importantes:

1. Elas pulam a "fase de renderização" pois React não está envolvido.
2. As atualizações podem se originar e acontecer em qualquer thread, incluindo a main thread.

### Fase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

Ao realizar uma atualização de _C++ State_, um bloco de código solicita uma atualização de um `ShadowNode` (**N**) para definir _C++ State_ para o valor **S**. O renderizador do React Native tentará repetidamente obter a última versão commitada de **N**, cloná-lo com um novo estado **S**, e commitar **N'** à árvore. Se React, ou outra atualização de _C++ State_, realizou outro commit durante este tempo, o commit de _C++ State_ falhará e o renderizador tentará novamente a atualização de _C++ State_ muitas vezes até que um commit seja bem-sucedido. Isso previne colisões de fonte-da-verdade e condições de corrida.

### Fase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

A _Fase Mount_ é praticamente idêntica à [Fase Mount de React State Updates](#react-state-updates). O renderizador ainda precisa recalcular layout, realizar um diff de árvore, etc. Veja as seções acima para detalhes.
