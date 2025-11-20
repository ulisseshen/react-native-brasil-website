---
ia-translated: true
id: architecture-glossary
title: Glossário
slug: /glossary
---

## Dev Menu

O menu de desenvolvedor no aplicativo (disponível em builds de desenvolvimento) que oferece acesso a várias ações de desenvolvimento e depuração. [Saiba mais sobre o Dev Menu na documentação](/docs/debugging).

## Fabric Renderer

React Native executa o mesmo código do framework React que o React para a web. No entanto, React Native renderiza para views gerais da plataforma (host views) em vez de nós DOM (que podem ser considerados host views da web). A renderização para host views é possibilitada pelo Fabric Renderer. Fabric permite que o React se comunique com cada plataforma e gerencie suas instâncias de host view. O Fabric Renderer existe em JavaScript e tem como alvo interfaces disponibilizadas por código C++. [Leia mais sobre renderizadores React neste post de blog.](https://overreacted.io/react-as-a-ui-runtime/#renderers)

## Host platform

A plataforma que incorpora React Native (por exemplo, Android, iOS, macOS, Windows).

## Host View Tree (e Host View)

Representação em árvore de views na plataforma host (por exemplo, Android, iOS). No Android, as host views são instâncias de `android.view.ViewGroup`, `android.widget.TextView`, etc., que são os blocos de construção da host view tree. O tamanho e localização de cada host view são baseados em `LayoutMetrics` calculados com Yoga, e o estilo e conteúdo de cada host view são baseados em informações da React Shadow Tree.

## JavaScript Interfaces (JSI)

Uma API leve para incorporar um motor JavaScript em uma aplicação C++. Fabric a usa para comunicação entre o núcleo C++ do Fabric e React.

## Java Native Interface (JNI)

Uma [API para escrever métodos nativos Java](https://docs.oracle.com/javase/8/docs/technotes/guides/jni/) usada para comunicação entre o núcleo C++ do Fabric e Android, escrito em Java.

## React Component

Uma função ou classe JavaScript que instrui como criar um React Element. [Leia mais sobre React components e elementos neste post de blog.](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

## React Composite Components

React Components com implementações `render` que se reduzem a outros React Composite Components ou React Host Components.

## React Host Components ou Host Components

React Components cuja implementação de view é fornecida por uma host view (por exemplo, `<View>, <Text>`). Na Web, os Host Components do ReactDOM seriam componentes como `<p>` e `<div>`.

## React Element Tree (e React Element)

Uma _React Element Tree_ é criada pelo React em JavaScript e consiste de React Elements. Um _React Element_ é um objeto JavaScript simples que descreve o que deve aparecer na tela. Ele inclui props, estilos e filhos. React Elements existem apenas em JavaScript e podem representar instanciações de React Composite Components ou React Host Components. [Leia mais sobre React components e elementos neste post de blog.](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

## React Native Framework

React Native permite que desenvolvedores usem o [paradigma de programação React](https://react.dev/learn/thinking-in-react) para enviar aplicativos para alvos nativos. A equipe do React Native está focada em criar **APIs principais** e **funcionalidades** que se adequam ao caso de uso mais geral ao desenvolver aplicativos nativos.

Enviar aplicativos nativos para produção geralmente requer um conjunto de ferramentas e bibliotecas que não são fornecidas por padrão como parte do React Native, mas ainda são cruciais para enviar um aplicativo para produção. Exemplos de tais ferramentas são: suporte para publicar aplicativos em uma loja dedicada ou suporte para mecanismos de roteamento e navegação.

Quando essas ferramentas e bibliotecas são coletadas para formar um framework coeso construído em cima do React Native, nós o definimos como um **React Native Framework**.

Um exemplo de React Native Framework de código aberto é [Expo](https://expo.dev/).

## React Shadow Tree (e React Shadow Node)

Uma _React Shadow Tree_ é criada pelo Fabric Renderer e consiste de React Shadow Nodes. Um React Shadow Node é um objeto que representa um React Host Component a ser montado, e contém props que se originam do JavaScript. Eles também contêm informações de layout (x, y, largura, altura). No Fabric, objetos React Shadow Node existem em C++. Antes do Fabric, estes existiam no heap do runtime móvel (por exemplo, Android JVM).

## Yoga Tree (e Yoga Node)

A _Yoga Tree_ é usada pelo [Yoga](https://www.yogalayout.dev/) para calcular informações de layout para uma React Shadow Tree. Cada React Shadow Node tipicamente cria um _Yoga Node_ porque React Native emprega Yoga para calcular layout. No entanto, este não é um requisito rígido. Fabric também pode criar React Shadow Nodes que não usam Yoga; a implementação de cada React Shadow Node determina como calcular layout.
