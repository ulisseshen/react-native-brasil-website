---
ia-translated: true
title: Preparando Seu App para iOS 15 e Android 12
authors: [SamuelSusla]
tags: [engineering]
---

Olá a todos!

Com as novas versões de SO móvel sendo lançadas no final deste ano, recomendamos preparar seus aplicativos React Native antecipadamente para evitar regressões quando os lançamentos se tornarem disponíveis para o público em geral.

<!--truncate-->

## iOS 15

A data de lançamento do iOS 15 ainda não foi anunciada, mas com base nos lançamentos anteriores do iOS, provavelmente será por volta de 16 de setembro. Por favor, também considere o tempo de revisão da App Store se forem necessárias quaisquer mudanças para preparar seu app para o iOS 15.

### O que observar

#### Barra QuickType

A maneira de desabilitar a barra _QuickType_ no _[TextInput](/docs/textinput)_ mudou. A barra _QuickType_ é a barra acima do teclado com três palavras sugeridas. Caso sua UI precise ter a barra oculta, definir [autoCorrect](/docs/textinput#autocorrect) como `false` não desabilita mais a barra _QuickType_ no iOS 15 como nas versões anteriores. Para ocultar a barra _QuickType_, você também precisa definir [spellCheck](/docs/textinput#spellcheck-ios) como `false`. Isso desabilitará a verificação ortográfica, os sublinhados vermelhos, em seu _TextInput_. Desabilitar a barra QuickType com verificação ortográfica habilitada não é mais uma opção.

<figure>
  <img src="/blog/assets/ios-15-quicktype-bar.png" alt="Screenshot of QuickType bar" />
  <figcaption>
    Barra QuickType com três palavras sugeridas
  </figcaption>
</figure>

Para desabilitar a barra QuickType no iOS 15, defina a prop [spellCheck](/docs/textinput#spellcheck-ios) e [autoCorrect](/docs/textinput#autocorrect) como `false`.

```jsx
<TextInput
  placeholder="something"
  autoCorrect={false}
  spellCheck={false}
/>
```

#### Barra de Navegação Transparente

O iOS 15 muda o comportamento padrão da barra de navegação. Ao contrário do iOS 14, a barra de navegação se torna transparente quando o conteúdo é rolado completamente para cima. Certifique-se de observar isso, pois pode dificultar a leitura do conteúdo. Para dicas sobre como contornar esse problema, confira [este tópico](https://developer.apple.com/forums/thread/682420).

![Screenshot of navigation bar on iOS 14 and iOS 15](/blog/assets/ios-15-navigation-bar.jpg)

### Como instalar o iOS 15

#### Dispositivo

Se você tiver um dispositivo sobressalente, pode participar do [programa beta](https://beta.apple.com/sp/betaprogram/) e instalar o iOS 15. Neste ponto, os lançamentos beta geralmente são estáveis, mas lembre-se de que **a atualização para o iOS 15 é irreversível**.

#### Simulador

Para testar seu app em um simulador com iOS 15, você precisará baixar o Xcode 13. Você pode encontrar o Xcode 13 [aqui](https://developer.apple.com/xcode/).

## Android 12

O Android 12 será lançado neste outono e introduz algumas mudanças que podem afetar potencialmente a experiência do seu app. Tradicionalmente, o Google Play exige que o SDK de destino do seu app seja atualizado antes de novembro do ano seguinte. (veja os requisitos para o lançamento anterior [aqui](https://developer.android.com/distribute/best-practices/develop/target-sdk)).

### O que observar

#### Efeito de Overscroll

O Android 12 introduz novo [efeito de overscroll](https://developer.android.com/about/versions/12/overscroll) que afeta todos os containers de rolagem. Como as visualizações de rolagem do React Native são baseadas nas visualizações nativas, recomendamos verificar seus containers roláveis para garantir que o efeito seja aplicado corretamente. Você pode optar por não participar definindo a prop [`overScrollMode`](/docs/scrollview#overscrollmode-android) como `never`.

#### Atualizações de Permissão

O Android 12 permite que os usuários do seu app forneçam apenas acesso à localização aproximada se você solicitá-la com a permissão **`ACCESS_FINE_LOCATION`**. Saiba mais sobre isso [aqui](https://developer.android.com/about/versions/12/approximate-location).

Confira as [mudanças de comportamento detalhadas](https://developer.android.com/about/versions/12/behavior-changes-all) do Google para todos os apps executando no Android 12.

### Como instalar o Android 12

#### Dispositivo

Se você tiver um dispositivo Android sobressalente, verifique se é possível instalar o Android 12 Beta via [instruções aqui.](https://developer.android.com/about/versions/12/get)

#### Emulador

Se você não tiver um dispositivo disponível, pode configurar um emulador seguindo as [instruções aqui](https://developer.android.com/about/versions/12/get#on_emulator).
