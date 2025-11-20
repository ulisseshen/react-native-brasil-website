---
ia-translated: true
id: roottag
title: RootTag
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`RootTag` é um identificador opaco atribuído à visualização raiz nativa de sua superfície React Native — ou seja, a instância `ReactRootView` ou `RCTRootView` para Android ou iOS, respectivamente. Em resumo, é um identificador de superfície.

## Quando usar um RootTag?

Para a maioria dos desenvolvedores React Native, você provavelmente não precisará lidar com `RootTag`s.

`RootTag`s são úteis quando uma aplicação renderiza **múltiplas visualizações raiz React Native** e você precisa lidar com chamadas de API nativa de forma diferente dependendo da superfície. Um exemplo disso é quando uma aplicação está usando navegação nativa e cada tela é uma visualização raiz React Native separada.

Na navegação nativa, cada visualização raiz React Native é renderizada em uma visualização de navegação da plataforma (por exemplo, `Activity` para Android, `UINavigationViewController` para iOS). Com isso, você pode aproveitar os paradigmas de navegação da plataforma, como a aparência e as transições de navegação nativas. A funcionalidade para interagir com as APIs de navegação nativa pode ser exposta ao React Native através de um [native module](https://reactnative.dev/docs/next/native-modules-intro).

Por exemplo, para atualizar a barra de título de uma tela, você chamaria a API do módulo de navegação `setTitle("Updated Title")`, mas seria necessário saber qual tela na pilha atualizar. Um `RootTag` é necessário aqui para identificar a visualização raiz e seu contêiner hospedeiro.

Outro caso de uso para `RootTag` é quando sua aplicação precisa atribuir uma determinada chamada JavaScript para nativo com base em sua visualização raiz de origem. Um `RootTag` é necessário para diferenciar a origem da chamada de diferentes superfícies.

## Como acessar o RootTag... se você precisar

Nas versões 0.65 e anteriores, o RootTag é acessado através de um [legacy context](https://github.com/facebook/react-native/blob/v0.64.1/Libraries/ReactNative/AppContainer.js#L56). Para preparar o React Native para recursos Concurrent que virão no React 18 e além, estamos migrando para a [Context API](https://react.dev/reference/react/createContext) mais recente através do `RootTagContext` na versão 0.66. A versão 0.65 suporta tanto o legacy context quanto o `RootTagContext` recomendado para dar tempo aos desenvolvedores de migrar seus pontos de chamada. Veja o resumo das breaking changes.

Como acessar o `RootTag` através do `RootTagContext`.

```js
import {RootTagContext} from 'react-native';
import NativeAnalytics from 'native-analytics';
import NativeNavigation from 'native-navigation';

function ScreenA() {
  const rootTag = useContext(RootTagContext);

  const updateTitle = title => {
    NativeNavigation.setTitle(rootTag, title);
  };

  const handleOneEvent = () => {
    NativeAnalytics.logEvent(rootTag, 'one_event');
  };

  // ...
}

class ScreenB extends React.Component {
  static contextType: typeof RootTagContext = RootTagContext;

  updateTitle(title) {
    NativeNavigation.setTitle(this.context, title);
  }

  handleOneEvent() {
    NativeAnalytics.logEvent(this.context, 'one_event');
  }

  // ...
}
```

Saiba mais sobre a Context API para [classes](https://react.dev/reference/react/Component#static-contexttype) e [hooks](https://react.dev/reference/react/useContext) na documentação do React.

### Breaking Change na versão 0.65

`RootTagContext` era anteriormente chamado de `unstable_RootTagContext` e foi alterado para `RootTagContext` na versão 0.65. Por favor, atualize quaisquer usos de `unstable_RootTagContext` em seu código.

### Breaking Change na versão 0.66

O acesso ao `RootTag` via legacy context será removido e substituído por `RootTagContext`. A partir da versão 0.65, encorajamos os desenvolvedores a migrar proativamente os acessos ao `RootTag` para `RootTagContext`.

## Planos Futuros

Com o progresso da nova arquitetura React Native, haverá iterações futuras no `RootTag`, com a intenção de manter o tipo `RootTag` opaco e evitar mudanças bruscas nas bases de código React Native. Por favor, não confie no fato de que RootTag atualmente é um alias para um número! Se sua aplicação depende de RootTags, fique de olho em nossos logs de mudanças de versão, que você pode encontrar [aqui](https://github.com/facebook/react-native/blob/main/CHANGELOG.md).
