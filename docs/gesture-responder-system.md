---
ia-translated: true
id: gesture-responder-system
title: Sistema Gesture Responder
---

O sistema gesture responder gerencia o ciclo de vida dos gestos em seu app. Um toque pode passar por várias fases à medida que o app determina qual é a intenção do usuário. Por exemplo, o app precisa determinar se o toque é uma rolagem, deslizando em um widget ou tocando. Isso pode até mudar durante a duração de um toque. Também pode haver múltiplos toques simultâneos.

O sistema touch responder é necessário para permitir que componentes negociem essas interações de toque sem qualquer conhecimento adicional sobre seus componentes pai ou filho.

### Melhores Práticas

Para fazer seu app parecer ótimo, toda ação deve ter os seguintes atributos:

- Feedback/destaque - mostrar ao usuário o que está manipulando seu toque e o que acontecerá quando ele liberar o gesto
- Cancelabilidade - ao fazer uma ação, o usuário deve ser capaz de abortá-la no meio do toque arrastando o dedo para longe

Esses recursos fazem os usuários se sentirem mais confortáveis ao usar um app, porque permite que as pessoas experimentem e interajam sem medo de cometer erros.

### TouchableHighlight e Touchable\*

O sistema responder pode ser complicado de usar. Então fornecemos uma implementação abstrata de `Touchable` para coisas que devem ser "tocáveis". Isso usa o sistema responder e permite que você configure interações de toque declarativamente. Use `TouchableHighlight` em qualquer lugar onde você usaria um button ou link na web.

## Ciclo de Vida do Responder

Uma view pode se tornar o touch responder implementando os métodos de negociação corretos. Existem dois métodos para perguntar à view se ela quer se tornar responder:

- `View.props.onStartShouldSetResponder: evt => true,` - Esta view quer se tornar responder no início de um toque?
- `View.props.onMoveShouldSetResponder: evt => true,` - Chamado para cada movimento de toque na View quando ela não é o responder: esta view quer "reivindicar" responsividade ao toque?

Se a View retorna true e tenta se tornar o responder, um dos seguintes acontecerá:

- `View.props.onResponderGrant: evt => {}` - A View está agora respondendo a eventos de toque. Este é o momento de destacar e mostrar ao usuário o que está acontecendo
- `View.props.onResponderReject: evt => {}` - Algo mais é o responder agora e não o liberará

Se a view está respondendo, os seguintes manipuladores podem ser chamados:

- `View.props.onResponderMove: evt => {}` - O usuário está movendo seu dedo
- `View.props.onResponderRelease: evt => {}` - Disparado no final do toque, ou seja, "touchUp"
- `View.props.onResponderTerminationRequest: evt => true` - Algo mais quer se tornar responder. Esta view deve liberar o responder? Retornar true permite a liberação
- `View.props.onResponderTerminate: evt => {}` - O responder foi tirado da View. Pode ser tirado por outras views após uma chamada para `onResponderTerminationRequest`, ou pode ser tirado pelo OS sem perguntar (acontece com o control center/notification center no iOS)

`evt` é um evento de toque sintético com a seguinte forma:

- `nativeEvent`
  - `changedTouches` - Array de todos os eventos de toque que mudaram desde o último evento
  - `identifier` - O ID do toque
  - `locationX` - A posição X do toque, relativa ao elemento
  - `locationY` - A posição Y do toque, relativa ao elemento
  - `pageX` - A posição X do toque, relativa ao elemento raiz
  - `pageY` - A posição Y do toque, relativa ao elemento raiz
  - `target` - O id do node do elemento que recebe o evento de toque
  - `timestamp` - Um identificador de tempo para o toque, útil para cálculo de velocidade
  - `touches` - Array de todos os toques atuais na tela

### Manipuladores ShouldSet de Captura

`onStartShouldSetResponder` e `onMoveShouldSetResponder` são chamados com um padrão de bubbling, onde o node mais profundo é chamado primeiro. Isso significa que o componente mais profundo se tornará responder quando múltiplas Views retornam true para os manipuladores `*ShouldSetResponder`. Isso é desejável na maioria dos casos, porque garante que todos os controles e botões sejam usáveis.

No entanto, às vezes um pai vai querer ter certeza de que se torne responder. Isso pode ser tratado usando a fase de captura. Antes que o sistema responder borbulhe do componente mais profundo, ele fará uma fase de captura, disparando `on*ShouldSetResponderCapture`. Então, se uma View pai quiser impedir que o filho se torne responder em um início de toque, ela deve ter um manipulador `onStartShouldSetResponderCapture` que retorna true.

- `View.props.onStartShouldSetResponderCapture: evt => true,`
- `View.props.onMoveShouldSetResponderCapture: evt => true,`

### PanResponder

Para interpretação de gestos de nível superior, confira [PanResponder](panresponder.md).
