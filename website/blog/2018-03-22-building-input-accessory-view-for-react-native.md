---
ia-translated: true
title: 'Construindo <InputAccessoryView> Para React Native'
author: Peter Argany
authorTitle: Software Engineer at Facebook
authorURL: 'https://github.com/PeteTheHeat'
authorImageURL: 'https://avatars3.githubusercontent.com/u/6011080?s=400&u=028e28081107d0ab16a5cb22baca43c080f5fa50&v=4'
authorTwitter: peterargany
tags: [engineering]
---

## Motivação

Três anos atrás, uma issue no GitHub foi aberta para suportar input accessory view do React Native.

<img src="/blog/assets/input-accessory-1.png" />

Nos anos seguintes, houve inúmeros '+1s', várias soluções alternativas e zero mudanças concretas no RN sobre esta issue - até hoje. Começando com iOS, [estamos expondo uma API](/docs/inputaccessoryview) para acessar o input accessory view nativo e estamos animados para compartilhar como construímos isso.

## Background

O que exatamente é um input accessory view? Lendo a [documentação de desenvolvedor da Apple](https://developer.apple.com/documentation/uikit/uiresponder/1621119-inputaccessoryview?language=objc), aprendemos que é uma view customizada que pode ser ancorada ao topo do teclado do sistema sempre que um receiver se torna o first responder. Qualquer coisa que herda de `UIResponder` pode redeclarar a propriedade `.inputAccessoryView` como leitura-escrita, e gerenciar uma view customizada aqui. A infraestrutura de responder monta a view e a mantém em sincronia com o teclado do sistema. Gestos que dispensam o teclado, como um arraste ou toque, são aplicados à input accessory view no nível do framework. Isso nos permite construir conteúdo com dismissal interativo do teclado, um recurso integral em apps de mensagens de primeira linha como iMessage e WhatsApp.

Existem dois casos de uso comuns para ancorar uma view ao topo do teclado. O primeiro é criar uma barra de ferramentas do teclado, como o seletor de fundo do compositor do Facebook.

<img src="/blog/assets/input-accessory-2.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

Neste cenário, o teclado está focado em um campo de entrada de texto, e o input accessory view é usado para fornecer funcionalidade adicional ao teclado. Esta funcionalidade é contextual ao tipo de campo de entrada. Em uma aplicação de mapeamento, poderia ser sugestões de endereço, ou em um editor de texto, poderia ser ferramentas de formatação de rich text.

<hr style={{clear: 'both', marginBottom: 20}} />

O UIResponder Objective-C que possui o `<InputAccessoryView>` neste cenário deve estar claro. O `<TextInput>` se tornou first responder, e sob o capô isso se torna uma instância de `UITextView` ou `UITextField`.

O segundo cenário comum é sticky text inputs:

<img src="/blog/assets/input-accessory-3.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

Aqui, a entrada de texto é na verdade parte do próprio input accessory view. Isso é comumente usado em aplicações de mensagens, onde uma mensagem pode ser composta enquanto se rola através de uma thread de mensagens anteriores.

<hr style={{clear: 'both', marginBottom: 20}} />

Quem possui o `<InputAccessoryView>` neste exemplo? Pode ser o `UITextView` ou `UITextField` novamente? A entrada de texto está _dentro_ do input accessory view, isso parece uma dependência circular. Resolver este problema sozinho é [outro blog post](https://derpturkey.com/uitextfield-docked-like-ios-messenger/) por si só. Spoilers: o proprietário é uma subclasse genérica `UIView` que manualmente dizemos para [becomeFirstResponder](https://developer.apple.com/documentation/uikit/uiresponder/1621113-becomefirstresponder?language=objc).

## Design da API

Agora sabemos o que é um `<InputAccessoryView>`, e como queremos usá-lo. O próximo passo é projetar uma API que faça sentido para ambos os casos de uso, e funcione bem com componentes React Native existentes como `<TextInput>`.

Para barras de ferramentas do teclado, existem algumas coisas que queremos considerar:

1. Queremos ser capazes de elevar qualquer hierarquia de view genérica React Native para o `<InputAccessoryView>`.
2. Queremos que esta hierarquia de view genérica e desanexada aceite toques e seja capaz de manipular o estado da aplicação.
3. Queremos vincular um `<InputAccessoryView>` a um `<TextInput>` particular.
4. Queremos ser capazes de compartilhar um `<InputAccessoryView>` entre múltiplas entradas de texto, sem duplicar código.

Podemos alcançar #1 usando um conceito similar aos [React portals](https://reactjs.org/docs/portals.html). Neste design, portamos views React Native para uma hierarquia `UIView` gerenciada pela infraestrutura de responder. Como as views React Native renderizam como UIViews, isso é na verdade bastante direto - podemos apenas sobrescrever:

`- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex`

e canalizar todas as subviews para uma nova hierarquia UIView. Para #2, configuramos um novo [RCTTouchHandler](https://github.com/facebook/react-native/blob/master/React/Base/RCTTouchHandler.h) para o `<InputAccessoryView>`. Atualizações de estado são alcançadas usando callbacks de evento regulares. Para #3 e #4, usamos o campo [nativeID](https://github.com/facebook/react-native/blob/master/React/Views/UIView%2BReact.h#L28) para localizar a hierarquia UIView do accessory view em código nativo durante a criação de um componente `<TextInput>`. Esta função usa a propriedade `.inputAccessoryView` da entrada de texto nativa subjacente. Fazer isso vincula efetivamente `<InputAccessoryView>` a `<TextInput>` em suas implementações ObjC.

Suportar sticky text inputs (cenário 2) adiciona mais algumas restrições. Para este design, o input accessory view tem uma entrada de texto como filho, então vincular via nativeID não é uma opção. Em vez disso, definimos o `.inputAccessoryView` de uma `UIView` genérica fora da tela para nossa hierarquia nativa `<InputAccessoryView>`. Ao manualmente dizer a esta `UIView` genérica para se tornar first responder, a hierarquia é montada pela infraestrutura de responder. Este conceito é explicado minuciosamente no blog post mencionado anteriormente.

## Armadilhas

É claro que nem tudo foi tranquilo ao construir esta API. Aqui estão algumas armadilhas que encontramos, junto com como as corrigimos.

Uma ideia inicial para construir esta API envolvia escutar `NSNotificationCenter` para eventos UIKeyboardWill(Show/Hide/ChangeFrame). Este padrão é usado em algumas bibliotecas open-source, e internamente em algumas partes do app do Facebook. Infelizmente, eventos `UIKeyboardDidChangeFrame` não estavam sendo chamados a tempo de atualizar o frame do `<InputAccessoryView>` em swipes. Além disso, mudanças na altura do teclado não são capturadas por esses eventos. Isso cria uma classe de bugs que se manifestam assim:

<img src="/blog/assets/input-accessory-4.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

No iPhone X, teclados de texto e emoji têm alturas diferentes. A maioria das aplicações usando eventos de teclado para manipular frames de entrada de texto teve que corrigir o bug acima. Nossa solução foi comprometer-se a usar a propriedade `.inputAccessoryView`, o que significava que a infraestrutura de responder lida com atualizações de frame como esta.

<hr style={{clear: 'both', marginBottom: 20}} />

Outro bug complicado que encontramos foi evitar a home pill no iPhone X. Você pode estar pensando, "Apple desenvolveu [safeAreaLayoutGuide](https://developer.apple.com/documentation/uikit/uiview/2891102-safearealayoutguide?language=objc) por essa razão, isso é trivial!". Fomos igualmente ingênuos. O primeiro problema é que a implementação nativa do `<InputAccessoryView>` não tem window para ancorar até o momento em que está prestes a aparecer. Tudo bem, podemos sobrescrever `-(BOOL)becomeFirstResponder` e forçar restrições de layout lá. Aderir a essas restrições empurra o accessory view para cima, mas outro bug surge:

<img src="/blog/assets/input-accessory-5.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

O input accessory view evita com sucesso a home pill, mas agora o conteúdo atrás da área não segura está visível. A solução está neste [radar](https://www.openradar.me/34411433). Envolvi a hierarquia nativa `<InputAccessoryView>` em um container que não está em conformidade com as restrições `safeAreaLayoutGuide`. O container nativo cobre o conteúdo na área não segura, enquanto o `<InputAccessoryView>` permanece dentro dos limites da área segura.

<hr style={{clear: 'both', marginBottom: 20}} />

## Exemplo de Uso

Aqui está um exemplo que constrói um botão de barra de ferramentas do teclado para resetar o state do `<TextInput>`.

```jsx
class TextInputAccessoryViewExample extends React.Component<
  {},
  *,
> {
  constructor(props) {
    super(props);
    this.state = {text: 'Placeholder Text'};
  }

  render() {
    const inputAccessoryViewID = 'inputAccessoryView1';
    return (
      <View>
        <TextInput
          style={styles.default}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
        />
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={{backgroundColor: 'white'}}>
            <Button
              onPress={() =>
                this.setState({text: 'Placeholder Text'})
              }
              title="Reset Text"
            />
          </View>
        </InputAccessoryView>
      </View>
    );
  }
}
```

Outro exemplo para [Sticky Text Inputs pode ser encontrado no repositório](https://github.com/facebook/react-native/blob/84ef7bc372ad870127b3e1fb8c13399fe09ecd4d/RNTester/js/InputAccessoryViewExample.js).

## Quando poderei usar isso?

O commit completo para esta implementação de recurso está [aqui](https://github.com/facebook/react-native/commit/38197c8230657d567170cdaf8ff4bbb4aee732b8). [`<InputAccessoryView>`](/docs/next/inputaccessoryview) estará disponível no próximo lançamento v0.55.0.

Happy keyboarding :)
