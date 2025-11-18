---
ia-translated: true
title: Suporte de Layout da Direita para a Esquerda para Aplicativos React Native
author: Mengjue (Mandy) Wang
authorTitle: Software Engineer Intern at Facebook
authorURL: 'https://github.com/MengjueW'
authorImageURL: 'https://avatars0.githubusercontent.com/u/13987140?v=3&s=128'
tags: [engineering]
---

Depois de lançar um aplicativo nas lojas de aplicativos, a internacionalização é o próximo passo para ampliar ainda mais o alcance do seu público. Mais de 20 países e inúmeras pessoas ao redor do mundo usam idiomas da Direita para a Esquerda (RTL). Portanto, fazer seu aplicativo suportar RTL para eles é necessário.

Estamos felizes em anunciar que React Native foi melhorado para suportar layouts RTL. Isso está disponível agora no branch master do [react-native](https://github.com/facebook/react-native) hoje, e estará disponível no próximo RC: [`v0.33.0-rc`](https://github.com/facebook/react-native/releases).

Isso envolveu mudanças no [css-layout](https://github.com/facebook/css-layout), o motor de layout principal usado pelo RN, e na implementação core do RN, bem como componentes JS OSS específicos para suportar RTL.

Para testar em batalha o suporte RTL em produção, a versão mais recente do aplicativo **Facebook Ads Manager** (o primeiro aplicativo multiplataforma 100% RN) agora está disponível em árabe e hebraico com layouts RTL para [iOS](https://itunes.apple.com/app/id964397083) e [Android](https://play.google.com/store/apps/details?id=com.facebook.adsmanager). Aqui está como ele se parece nesses idiomas RTL:

<>
<img src="/blog/assets/rtl-ama-ios-arabic.png" width={280} style={{ margin: 10 }} />
<img src="/blog/assets/rtl-ama-android-hebrew.png" width={280} style={{ margin: 10 }} />
</>

## Visão Geral das Mudanças no RN para suporte RTL

[css-layout](https://github.com/facebook/css-layout) já tem um conceito de `start` e `end` para o layout. No layout da Esquerda para a Direita (LTR), `start` significa `left`, e `end` significa `right`. Mas em RTL, `start` significa `right`, e `end` significa `left`. Isso significa que podemos fazer o RN depender do cálculo de `start` e `end` para calcular o layout correto, que inclui `position`, `padding` e `margin`.

Além disso, [css-layout](https://github.com/facebook/css-layout) já faz com que a direção de cada componente herde de seu pai. Isso significa que simplesmente precisamos definir a direção do componente raiz para RTL, e o aplicativo inteiro irá inverter.

O diagrama abaixo descreve as mudanças em alto nível:

![](/blog/assets/rtl-rn-core-updates.png)

Estas incluem:

- [suporte RTL do css-layout para posicionamento absoluto](https://github.com/facebook/css-layout/commit/46c842c71a1232c3c78c4215275d104a389a9a0f)
- mapeamento de `left` e `right` para `start` e `end` na implementação core do RN para shadow nodes
- e expor um [módulo utilitário bridged](https://github.com/facebook/react-native/blob/f0fb228ec76ed49e6ed6d786d888e8113b8959a2/Libraries/Utilities/I18nManager.js) para ajudar a controlar o layout RTL

Com esta atualização, quando você permite layout RTL para seu aplicativo:

- o layout de cada componente irá inverter horizontalmente
- alguns gestos e animações automaticamente terão layout RTL, se você estiver usando componentes OSS prontos para RTL
- esforço adicional mínimo pode ser necessário para tornar seu aplicativo totalmente pronto para RTL

## Tornando um Aplicativo Pronto para RTL

1. Para suportar RTL, você deve primeiro adicionar os bundles de idioma RTL ao seu aplicativo.
   - Veja os guias gerais do [iOS](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/LocalizingYourApp/LocalizingYourApp.html#//apple_ref/doc/uid/10000171i-CH5-SW1) e [Android](https://developer.android.com/training/basics/supporting-devices/languages.html).

2. Permita layout RTL para seu aplicativo chamando a função `allowRTL()` no início do código nativo. Fornecemos este utilitário para aplicar apenas um layout RTL quando seu aplicativo estiver pronto. Aqui está um exemplo:

   iOS:

   ```objc
   // in AppDelegate.m
     [[RCTI18nUtil sharedInstance] allowRTL:YES];
   ```

   Android:

   ```java
   // in MainActivity.java
     I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
     sharedI18nUtilInstance.allowRTL(context, true);
   ```

3. Para Android, você precisa adicionar `android:supportsRtl="true"` ao elemento [`<application>`](https://developer.android.com/guide/topics/manifest/application-element.html) no arquivo `AndroidManifest.xml`.

Agora, quando você recompilar seu aplicativo e mudar o idioma do dispositivo para um idioma RTL (por exemplo, árabe ou hebraico), o layout do seu aplicativo deve mudar para RTL automaticamente.

## Escrevendo Componentes Prontos para RTL

Em geral, a maioria dos componentes já está pronta para RTL, por exemplo:

- Layout da Esquerda para a Direita

<img src="/blog/assets/rtl-demo-listitem-ltr.png" width="300" />

- Layout da Direita para a Esquerda

<img src="/blog/assets/rtl-demo-listitem-rtl.png" width="300" />

No entanto, existem vários casos a serem observados, para os quais você precisará do [`I18nManager`](https://github.com/facebook/react-native/blob/f0fb228ec76ed49e6ed6d786d888e8113b8959a2/Libraries/Utilities/I18nManager.js). No [`I18nManager`](https://github.com/facebook/react-native/blob/f0fb228ec76ed49e6ed6d786d888e8113b8959a2/Libraries/Utilities/I18nManager.js), existe uma constante `isRTL` para informar se o layout do aplicativo é RTL ou não, para que você possa fazer as mudanças necessárias de acordo com o layout.

#### Ícones com Significado Direcional

Se seu componente tem ícones ou imagens, eles serão exibidos da mesma forma no layout LTR e RTL, porque o RN não irá inverter sua imagem de origem. Portanto, você deve invertê-los de acordo com o estilo de layout.

- Layout da Esquerda para a Direita

<img src="/blog/assets/rtl-demo-icon-ltr.png" width="300" />

- Layout da Direita para a Esquerda

<img src="/blog/assets/rtl-demo-icon-rtl.png" width="300" />

Aqui estão duas maneiras de inverter o ícone de acordo com a direção:

- Adicionando um estilo `transform` ao componente de imagem:

  ```jsx
  <Image
    source={...}
    style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
  />
  ```

- Ou, mudando a fonte da imagem de acordo com a direção:

  ```jsx
  let imageSource = require('./back.png');
  if (I18nManager.isRTL) {
    imageSource = require('./forward.png');
  }
  return <Image source={imageSource} />;
  ```

#### Gestos e Animações

No desenvolvimento Android e iOS, quando você muda para layout RTL, os gestos e animações são o oposto do layout LTR. Atualmente, no RN, gestos e animações não são suportados no nível de código core do RN, mas no nível de componentes. A boa notícia é que alguns desses componentes já suportam RTL hoje, como [`SwipeableRow`](https://github.com/facebook/react-native/blob/38a6eec0db85a5204e85a9a92b4dee2db9641671/Libraries/Experimental/SwipeableRow/SwipeableRow.js) e [`NavigationExperimental`](https://github.com/facebook/react-native/tree/master/Libraries/NavigationExperimental). No entanto, outros componentes com gestos precisarão suportar RTL manualmente.

Um bom exemplo para ilustrar o suporte RTL de gestos é [`SwipeableRow`](https://github.com/facebook/react-native/blob/38a6eec0db85a5204e85a9a92b4dee2db9641671/Libraries/Experimental/SwipeableRow/SwipeableRow.js).

<p align="center">
  <img src="/blog/assets/rtl-demo-swipe-ltr.png" width={280} style={{margin: 10}} />
  <img src="/blog/assets/rtl-demo-swipe-rtl.png" width={280} style={{margin: 10}} />
</p>

##### Exemplo de Gestos

```js
// SwipeableRow.js
_isSwipingExcessivelyRightFromClosedPosition(gestureState: Object): boolean {
  // ...
  const gestureStateDx = IS_RTL ? -gestureState.dx : gestureState.dx;
  return (
    this._isSwipingRightFromClosed(gestureState) &&
    gestureStateDx > RIGHT_SWIPE_THRESHOLD
  );
},
```

##### Exemplo de Animação

```js
// SwipeableRow.js
_animateBounceBack(duration: number): void {
  // ...
  const swipeBounceBackDistance = IS_RTL ?
    -RIGHT_SWIPE_BOUNCE_BACK_DISTANCE :
    RIGHT_SWIPE_BOUNCE_BACK_DISTANCE;
  this._animateTo(
    -swipeBounceBackDistance,
    duration,
    this._animateToClosedPositionDuringBounce,
  );
},
```

## Mantendo Seu Aplicativo Pronto para RTL

Mesmo após o lançamento inicial do aplicativo compatível com RTL, você provavelmente precisará iterar em novos recursos. Para melhorar a eficiência de desenvolvimento, [`I18nManager`](https://github.com/facebook/react-native/blob/f0fb228ec76ed49e6ed6d786d888e8113b8959a2/Libraries/Utilities/I18nManager.js) fornece a função `forceRTL()` para testes RTL mais rápidos sem mudar o idioma do dispositivo de teste. Você pode querer fornecer um switch simples para isso em seu aplicativo. Aqui está um exemplo do exemplo RTL no RNTester:

<p align="center">
  <img src="/blog/assets/rtl-demo-forcertl.png" width="300" />
</p>

```js
<RNTesterBlock title={'Quickly Test RTL Layout'}>
  <View style={styles.flexDirectionRow}>
    <Text style={styles.switchRowTextView}>forceRTL</Text>
    <View style={styles.switchRowSwitchView}>
      <Switch
        onValueChange={this._onDirectionChange}
        style={styles.rightAlignStyle}
        value={this.state.isRTL}
      />
    </View>
  </View>
</RNTesterBlock>;

_onDirectionChange = () => {
  I18nManager.forceRTL(!this.state.isRTL);
  this.setState({isRTL: !this.state.isRTL});
  Alert.alert(
    'Reload this page',
    'Please reload this page to change the UI direction! ' +
      'All examples in this app will be affected. ' +
      'Check them out to see what they look like in RTL layout.',
  );
};
```

Ao trabalhar em um novo recurso, você pode facilmente alternar este botão e recarregar o aplicativo para ver o layout RTL. O benefício é que você não precisará mudar a configuração de idioma para testar, no entanto, algum alinhamento de texto não mudará, como explicado na próxima seção. Portanto, é sempre uma boa ideia testar seu aplicativo no idioma RTL antes de lançar.

## Limitações e Plano Futuro

O suporte RTL deve cobrir a maior parte da UX em seu aplicativo; no entanto, existem algumas limitações por enquanto:

- Os comportamentos de alinhamento de texto diferem no Android e iOS
  - No iOS, o alinhamento de texto padrão depende do bundle de idioma ativo, eles são consistentemente de um lado. No Android, o alinhamento de texto padrão depende do idioma do conteúdo do texto, ou seja, inglês será alinhado à esquerda e árabe será alinhado à direita.
  - Em teoria, isso deve ser tornado consistente entre plataformas, mas algumas pessoas podem preferir um comportamento ao outro ao usar um aplicativo. Mais pesquisa de experiência do usuário pode ser necessária para descobrir a melhor prática para alinhamento de texto.

* Não há "verdadeiro" esquerda/direita

  Como discutido antes, mapeamos os estilos `left`/`right` do lado JS para `start`/`end`, todo `left` no código para layout RTL se torna "direita" na tela, e `right` no código se torna "esquerda" na tela. Isso é conveniente porque você não precisa mudar muito o código do seu produto, mas significa que não há como especificar "verdadeira esquerda" ou "verdadeira direita" no código. No futuro, permitir que um componente controle sua direção independentemente do idioma pode ser necessário.

* Tornar o suporte RTL para gestos e animações mais amigável para desenvolvedores

  Atualmente, ainda há algum esforço de programação necessário para tornar gestos e animações compatíveis com RTL. No futuro, seria ideal encontrar uma maneira de tornar o suporte RTL de gestos e animações mais amigável para desenvolvedores.

## Experimente!

Confira o [`RTLExample`](https://github.com/facebook/react-native/blob/master/packages/rn-tester/js/examples/RTL/RTLExample.js) no `RNTester` para entender mais sobre o suporte RTL, e nos avise como funciona para você!

Finalmente, obrigado por ler! Esperamos que o suporte RTL para React Native ajude você a expandir seus aplicativos para audiências internacionais!
