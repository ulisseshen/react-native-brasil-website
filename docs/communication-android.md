---
ia-translated: true
id: communication-android
title: Comunicação entre nativo e React Native
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Em [Integração com Apps Existentes](integration-with-existing-apps) e [Componentes de UI Nativos](legacy/native-components-android) aprendemos como incorporar React Native em um componente nativo e vice-versa. Quando misturamos componentes nativos e React Native, eventualmente encontraremos a necessidade de comunicação entre esses dois mundos. Algumas formas de conseguir isso já foram mencionadas em outros guias. Este artigo resume as técnicas disponíveis.

## Introdução

React Native é inspirado pelo React, então a ideia básica do fluxo de informações é similar. O fluxo no React é unidirecional. Mantemos uma hierarquia de componentes, na qual cada componente depende apenas do seu pai e do seu próprio estado interno. Fazemos isso com propriedades: os dados são passados de um pai para seus filhos de forma top-down. Se um componente ancestral depende do estado de seu descendente, deve-se passar um callback para ser usado pelo descendente para atualizar o ancestral.

O mesmo conceito se aplica ao React Native. Enquanto estivermos construindo nossa aplicação puramente dentro do framework, podemos conduzir nosso app com propriedades e callbacks. Mas, quando misturamos componentes React Native e nativos, precisamos de alguns mecanismos específicos entre linguagens que nos permitam passar informações entre eles.

## Propriedades

Propriedades são a forma mais direta de comunicação entre componentes. Então precisamos de uma forma de passar propriedades tanto de nativo para React Native, quanto de React Native para nativo.

### Passando propriedades de nativo para React Native

Você pode passar propriedades para o app React Native fornecendo uma implementação customizada de `ReactActivityDelegate` na sua activity principal. Esta implementação deve sobrescrever `getLaunchOptions` para retornar um `Bundle` com as propriedades desejadas.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
public class MainActivity extends ReactActivity {
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected Bundle getLaunchOptions() {
        Bundle initialProperties = new Bundle();
        ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
                "https://dummyimage.com/600x400/ffffff/000000.png",
                "https://dummyimage.com/600x400/000000/ffffff.png"
        ));
        initialProperties.putStringArrayList("images", imageList);
        return initialProperties;
      }
    };
  }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
class MainActivity : ReactActivity() {
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle {
                val imageList = arrayListOf("https://dummyimage.com/600x400/ffffff/000000.png", "https://dummyimage.com/600x400/000000/ffffff.png")
                val initialProperties = Bundle().apply { putStringArrayList("images", imageList) }
                return initialProperties
            }
        }
    }
}
```

</TabItem>
</Tabs>

```tsx
import React from 'react';
import {View, Image} from 'react-native';

export default class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return <Image source={{uri: imgURI}} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`ReactRootView` fornece uma propriedade de leitura e escrita `appProperties`. Depois que `appProperties` é definida, o app React Native é re-renderizado com as novas propriedades. A atualização é realizada apenas quando as novas propriedades atualizadas diferem das anteriores.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
Bundle updatedProps = mReactRootView.getAppProperties();
ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
        "https://dummyimage.com/600x400/ff0000/000000.png",
        "https://dummyimage.com/600x400/ffffff/ff0000.png"
));
updatedProps.putStringArrayList("images", imageList);

mReactRootView.setAppProperties(updatedProps);
```

</TabItem>

<TabItem value="kotlin">

```kotlin
var updatedProps: Bundle = reactRootView.getAppProperties()
var imageList = arrayListOf("https://dummyimage.com/600x400/ff0000/000000.png", "https://dummyimage.com/600x400/ffffff/ff0000.png")
```

</TabItem>

</Tabs>

É permitido atualizar propriedades a qualquer momento. No entanto, as atualizações precisam ser executadas na thread principal. Você pode usar o getter em qualquer thread.

Não há forma de atualizar apenas algumas propriedades de cada vez. Sugerimos que você construa isso em seu próprio wrapper.

:::info
Atualmente, a função JS `componentWillUpdateProps` do componente RN de nível superior não será chamada após uma atualização de prop. No entanto, você pode acessar as novas props na função `componentDidMount`.
:::

### Passando propriedades de React Native para nativo

O problema de expor propriedades de componentes nativos é coberto em detalhes [neste artigo](legacy/native-components-android#3-expose-view-property-setters-using-reactprop-or-reactpropgroup-annotation). Resumindo, propriedades que devem ser refletidas em JavaScript precisam ser expostas como método setter anotado com `@ReactProp`, e então usá-las no React Native como se o componente fosse um componente React Native comum.

### Limitações das propriedades

A principal desvantagem das propriedades entre linguagens é que elas não suportam callbacks, o que nos permitiria lidar com bindings de dados bottom-up. Imagine que você tem uma pequena view RN que você quer remover da view pai nativa como resultado de uma ação JS. Não há forma de fazer isso com props, pois a informação precisaria ir bottom-up.

Embora tenhamos um tipo de callbacks entre linguagens ([descritos aqui](legacy/native-modules-android#callbacks)), esses callbacks nem sempre são o que precisamos. O problema principal é que eles não são destinados a serem passados como propriedades. Em vez disso, este mecanismo nos permite disparar uma ação nativa a partir de JS, e lidar com o resultado dessa ação em JS.

## Outras formas de interação entre linguagens (eventos e módulos nativos)

Como afirmado no capítulo anterior, usar propriedades vem com algumas limitações. Às vezes, propriedades não são suficientes para conduzir a lógica do nosso app e precisamos de uma solução que dê mais flexibilidade. Este capítulo cobre outras técnicas de comunicação disponíveis no React Native. Elas podem ser usadas para comunicação interna (entre camadas JS e nativas no RN) bem como para comunicação externa (entre RN e a parte 'puramente nativa' do seu app).

React Native permite que você execute chamadas de função entre linguagens. Você pode executar código nativo customizado a partir de JS e vice-versa. Infelizmente, dependendo do lado em que estamos trabalhando, alcançamos o mesmo objetivo de formas diferentes. Para nativo - usamos o mecanismo de eventos para agendar a execução de uma função handler em JS, enquanto para React Native chamamos diretamente métodos exportados por módulos nativos.

### Chamando funções React Native a partir de nativo (eventos)

Eventos são descritos em detalhes [neste artigo](legacy/native-components-android#events). Note que usar eventos não nos dá garantias sobre o tempo de execução, pois o evento é tratado em uma thread separada.

Eventos são poderosos, porque nos permitem mudar componentes React Native sem precisar de uma referência a eles. No entanto, existem algumas armadilhas nas quais você pode cair ao usá-los:

- Como eventos podem ser enviados de qualquer lugar, eles podem introduzir dependências estilo espaguete em seu projeto.
- Eventos compartilham namespace, o que significa que você pode encontrar algumas colisões de nomes. Colisões não serão detectadas estaticamente, o que as torna difíceis de debugar.
- Se você usa várias instâncias do mesmo componente React Native e quer distingui-las da perspectiva do seu evento, você provavelmente precisará introduzir identificadores e passá-los junto com os eventos (você pode usar o `reactTag` da view nativa como um identificador).

### Chamando funções nativas a partir de React Native (módulos nativos)

Módulos nativos são classes Java/Kotlin que estão disponíveis em JS. Tipicamente, uma instância de cada módulo é criada por JS bridge. Eles podem exportar funções e constantes arbitrárias para React Native. Eles foram cobertos em detalhes [neste artigo](legacy/native-modules-android).

:::warning
Todos os módulos nativos compartilham o mesmo namespace. Cuidado com colisões de nomes ao criar novos.
:::
