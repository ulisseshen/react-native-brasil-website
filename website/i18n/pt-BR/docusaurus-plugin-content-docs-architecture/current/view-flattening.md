---
ia-translated: true
id: view-flattening
title: View Flattening
---

import FabricWarning from './\_fabric-warning.mdx';

<FabricWarning />

#### View Flattening é uma otimização pelo renderizador do React Native para evitar árvores de layout profundas.

A API React é projetada para ser declarativa e reutilizável através de composição. Isso fornece um ótimo modelo para desenvolvimento intuitivo. No entanto, na implementação, essas qualidades da API levam à criação de [React Element Trees](architecture-glossary.md#react-element-tree-and-react-element) profundas, onde uma grande maioria de React Element Nodes apenas afeta o layout de uma View e não renderiza nada na tela. Chamamos esses tipos de nós de nós **"Layout-Only"**.

Conceitualmente, cada um dos Nodes da React Element Tree tem uma relação 1:1 com uma view na tela, portanto renderizar uma React Element Tree profunda que é composta por uma grande quantidade de Nodes "Layout-Only" leva a um desempenho ruim durante a renderização.

Aqui está um caso de uso comum que é afetado pelo custo de views "Layout Only".

Imagine que você queira renderizar uma imagem e um título que é manipulado pelo `TitleComponent`, e você inclui este componente como filho do `ContainerComponent` que tem alguns estilos de margem. Após decompor os componentes, o código React ficaria assim:

```jsx
function MyComponent() {
  return (
    <View>                          // ReactAppComponent
      <View style={{margin: 10}} /> // ContainerComponent
        <View style={{margin: 10}}> // TitleComponent
          <Image {...} />
          <Text {...}>This is a title</Text>
        </View>
      </View>
    </View>
  );
}
```

Como parte do processo de renderização, React Native produzirá as seguintes árvores:

![Diagram one](/docs/assets/Architecture/view-flattening/diagram-one.png)

Note que as Views (2) e (3) são views "Layout Only", porque são renderizadas na tela mas apenas renderizam uma `margin` de `10 px` em cima de seus filhos.

Para melhorar o desempenho desses tipos de React Element Trees, o renderizador implementa um mecanismo de View Flattening que mescla ou achata esses tipos de Nodes, reduzindo a profundidade da hierarquia de [host view](architecture-glossary.md#host-view-tree-and-host-view) que é renderizada na tela. Este algoritmo leva em consideração props como: `margin`, `padding`, `backgroundColor`, `opacity`, etc.

O algoritmo de View Flattening é integrado por design como parte do estágio de diffing do renderizador, o que significa que não usamos ciclos de CPU extras para otimizar o achatamento da React Element Tree desses tipos de views. Como o resto do núcleo, o algoritmo de view flattening é implementado em C++ e seus benefícios são compartilhados por padrão em todas as plataformas suportadas.

No caso do exemplo anterior, as Views (2) e (3) seriam achatadas como parte do "algoritmo de diffing" e como resultado seus estilos serão mesclados na View (1):

![Diagram two](/docs/assets/Architecture/view-flattening/diagram-two.png)

É importante notar que esta otimização permite que o renderizador evite a criação e renderização de duas host views. Da perspectiva do usuário não há mudanças visíveis na tela.
