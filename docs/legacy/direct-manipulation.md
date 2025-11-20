---
ia-translated: true
id: direct-manipulation
title: Direct Manipulation
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Às vezes é necessário fazer alterações diretamente em um componente sem usar state/props para disparar uma re-renderização de toda a subárvore. Ao usar React no navegador, por exemplo, às vezes você precisa modificar diretamente um nó DOM, e o mesmo é verdadeiro para views em aplicativos mobile. `setNativeProps` é o equivalente no React Native para definir propriedades diretamente em um nó DOM.

:::caution
Use `setNativeProps` quando re-renderizações frequentes criam um gargalo de performance!

Direct manipulation não será uma ferramenta que você usará frequentemente. Você normalmente só a usará para criar animações contínuas para evitar a sobrecarga de renderizar a hierarquia de componentes e reconciliar muitas views.
`setNativeProps` é imperativo e armazena estado na camada nativa (DOM, UIView, etc.) e não dentro de seus componentes React, o que torna seu código mais difícil de raciocinar.

Antes de usá-lo, tente resolver seu problema com `setState` e [`shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate).
:::

## setNativeProps with TouchableOpacity

[TouchableOpacity](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/Touchable/TouchableOpacity.js) usa `setNativeProps` internamente para atualizar a opacidade de seu componente filho:

```tsx
const viewRef = useRef<View>();
const setOpacityTo = useCallback(value => {
  // Redacted: animation related code
  viewRef.current.setNativeProps({
    opacity: value,
  });
}, []);
```

Isso nos permite escrever o seguinte código e saber que o filho terá sua opacidade atualizada em resposta a toques, sem que o filho tenha qualquer conhecimento desse fato ou exija quaisquer alterações em sua implementação:

```tsx
<TouchableOpacity onPress={handlePress}>
  <View>
    <Text>Press me!</Text>
  </View>
</TouchableOpacity>
```

Vamos imaginar que `setNativeProps` não estivesse disponível. Uma maneira de implementá-lo com essa restrição seria armazenar o valor da opacidade no estado, e então atualizar esse valor sempre que `onPress` for disparado:

```tsx
const [buttonOpacity, setButtonOpacity] = useState(1);
return (
  <TouchableOpacity
    onPressIn={() => setButtonOpacity(0.5)}
    onPressOut={() => setButtonOpacity(1)}>
    <View style={{opacity: buttonOpacity}}>
      <Text>Press me!</Text>
    </View>
  </TouchableOpacity>
);
```

Isso é computacionalmente intensivo comparado ao exemplo original - React precisa re-renderizar a hierarquia de componentes cada vez que a opacidade muda, mesmo que outras propriedades da view e seus filhos não tenham mudado. Geralmente essa sobrecarga não é uma preocupação, mas ao realizar animações contínuas e responder a gestos, otimizar criteriosamente seus componentes pode melhorar a fidelidade de suas animações.

Se você olhar a implementação de `setNativeProps` em [NativeMethodsMixin](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js) você notará que é um wrapper ao redor de `RCTUIManager.updateView` - esta é exatamente a mesma chamada de função que resulta de re-renderizar - veja [receiveComponent in ReactNativeBaseComponent](https://github.com/facebook/react-native/blob/fb2ec1ea47c53c2e7b873acb1cb46192ac74274e/Libraries/Renderer/oss/ReactNativeRenderer-prod.js#L5793-L5813).

## Composite components and setNativeProps

Composite components não são apoiados por uma view nativa, então você não pode chamar `setNativeProps` neles. Considere este exemplo:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=setNativeProps%20with%20Composite%20Components&ext=js
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = props => (
  <View style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
);

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=setNativeProps%20with%20Composite%20Components&ext=tsx
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = (props: {label: string}) => (
  <View style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
);

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
</Tabs>

Se você executar isso, você verá imediatamente este erro: `Touchable child must either be native or forward setNativeProps to a native component`. Isso ocorre porque `MyButton` não é diretamente apoiado por uma view nativa cuja opacidade deve ser definida. Você pode pensar sobre isso assim: se você definir um componente com `createReactClass` você não esperaria poder definir uma prop de estilo nele e que isso funcionasse - você precisaria passar a prop de estilo para um filho, a menos que você esteja envolvendo um componente nativo. Da mesma forma, vamos encaminhar `setNativeProps` para um componente filho apoiado nativamente.

#### Forward setNativeProps to a child

Como o método `setNativeProps` existe em qualquer ref para um componente `View`, é suficiente encaminhar uma ref em seu componente customizado para um dos componentes `<View />` que ele renderiza. Isso significa que uma chamada para `setNativeProps` no componente customizado terá o mesmo efeito como se você chamasse `setNativeProps` no componente `View` envolvido em si.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Forwarding%20setNativeProps&ext=js
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = React.forwardRef((props, ref) => (
  <View {...props} ref={ref} style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
));

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Forwarding%20setNativeProps&ext=tsx
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = React.forwardRef<View, {label: string}>((props, ref) => (
  <View {...props} ref={ref} style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
));

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
</Tabs>

Agora você pode usar `MyButton` dentro de `TouchableOpacity`!

Você pode ter notado que passamos todas as props para a view filho usando `{...props}`. A razão para isso é que `TouchableOpacity` é na verdade um composite component, e então além de depender de `setNativeProps` em seu filho, também requer que o filho execute tratamento de toque. Para fazer isso, ele passa [várias props](view.md#onmoveshouldsetresponder) que fazem callback para o componente `TouchableOpacity`. `TouchableHighlight`, em contraste, é apoiado por uma view nativa e só requer que implementemos `setNativeProps`.

## setNativeProps to edit TextInput value

Outro caso de uso muito comum de `setNativeProps` é editar o valor do TextInput. A prop `controlled` do TextInput pode às vezes descartar caracteres quando o `bufferDelay` é baixo e o usuário digita muito rápido. Alguns desenvolvedores preferem pular essa prop inteiramente e em vez disso usar `setNativeProps` para manipular diretamente o valor do TextInput quando necessário. Por exemplo, o seguinte código demonstra edição do input quando você toca em um botão:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Clear%20text&ext=js
import React from 'react';
import {useCallback, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const inputRef = useRef(null);
  const editText = useCallback(() => {
    inputRef.current.setNativeProps({text: 'Edited Text'});
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} />
      <TouchableOpacity onPress={editText}>
        <Text>Edit text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Clear%20text&ext=tsx
import React from 'react';
import {useCallback, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const inputRef = useRef<TextInput>(null);
  const editText = useCallback(() => {
    inputRef.current?.setNativeProps({text: 'Edited Text'});
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} />
      <TouchableOpacity onPress={editText}>
        <Text>Edit text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
```

</TabItem>
</Tabs>

Você pode usar o método [`clear`](../textinput#clear) para limpar o `TextInput` que limpa o texto de entrada atual usando a mesma abordagem.

## Avoiding conflicts with the render function

Se você atualizar uma propriedade que também é gerenciada pela função render, você pode acabar com alguns bugs imprevisíveis e confusos porque sempre que o componente re-renderizar e essa propriedade mudar, qualquer valor que foi previamente definido de `setNativeProps` será completamente ignorado e sobrescrito.

## setNativeProps & shouldComponentUpdate

Ao [aplicar inteligentemente `shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate) você pode evitar a sobrecarga desnecessária envolvida em reconciliar subárvores de componentes inalteradas, ao ponto onde pode ser performático o suficiente para usar `setState` em vez de `setNativeProps`.

## Other native methods

Os métodos descritos aqui estão disponíveis na maioria dos componentes padrão fornecidos pelo React Native. Observe, no entanto, que eles _não_ estão disponíveis em composite components que não são diretamente apoiados por uma view nativa. Isso geralmente incluirá a maioria dos componentes que você define em seu próprio aplicativo.

### measure(callback)

Determina a localização na tela, largura e altura no viewport da view fornecida e retorna os valores via um callback assíncrono. Se bem-sucedido, o callback será chamado com os seguintes argumentos:

- x
- y
- width
- height
- pageX
- pageY

Observe que essas medições não estão disponíveis até que a renderização tenha sido concluída no nativo. Se você precisa das medições o mais rápido possível e não precisa de `pageX` e `pageY`, considere usar a propriedade [`onLayout`](view.md#onlayout) em vez disso.

Além disso, a largura e altura retornadas por `measure()` são a largura e altura do componente no viewport. Se você precisa do tamanho real do componente, considere usar a propriedade [`onLayout`](view.md#onlayout) em vez disso.

### measureInWindow(callback)

Determina a localização da view fornecida na janela e retorna os valores via um callback assíncrono. Se a view raiz do React está incorporada em outra view nativa, isso lhe dará as coordenadas absolutas. Se bem-sucedido, o callback será chamado com os seguintes argumentos:

- x
- y
- width
- height

### measureLayout(relativeToNativeComponentRef, onSuccess, onFail)

Como `measure()`, mas mede a view relativa a um ancestral, especificado com a referência `relativeToNativeComponentRef`. Isso significa que as coordenadas retornadas são relativas à origem `x`, `y` da view ancestral.

:::note
Este método também pode ser chamado com um handler `relativeToNativeNode` (em vez de referência), mas esta variante está obsoleta com a nova arquitetura.
:::

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=measureLayout%20example&supportedPlatforms=android,ios&ext=js
import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const App = () => {
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const [measure, setMeasure] = useState(null);

  useEffect(() => {
    if (textRef.current && textContainerRef.current) {
      textRef.current.measureLayout(
        textContainerRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
      );
    }
  }, [measure]);

  return (
    <View style={styles.container}>
      <View ref={textContainerRef} style={styles.textContainer}>
        <Text ref={textRef}>Where am I? (relative to the text container)</Text>
      </View>
      <Text style={styles.measure}>{JSON.stringify(measure)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  measure: {
    textAlign: 'center',
    padding: 12,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=measureLayout%20example&ext=tsx
import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

type Measurements = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const App = () => {
  const textContainerRef = useRef<View>(null);
  const textRef = useRef<Text>(null);
  const [measure, setMeasure] = useState<Measurements | null>(null);

  useEffect(() => {
    if (textRef.current && textContainerRef.current) {
      textRef.current?.measureLayout(
        textContainerRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
        () => {
          console.error('measurement failed');
        },
      );
    }
  }, [measure]);

  return (
    <View style={styles.container}>
      <View ref={textContainerRef} style={styles.textContainer}>
        <Text ref={textRef}>Where am I? (relative to the text container)</Text>
      </View>
      <Text style={styles.measure}>{JSON.stringify(measure)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  measure: {
    textAlign: 'center',
    padding: 12,
  },
});

export default App;
```

</TabItem>
</Tabs>

### focus()

Solicita foco para o input ou view fornecido. O comportamento exato disparado dependerá da plataforma e tipo de view.

### blur()

Remove o foco de um input ou view. Este é o oposto de `focus()`.
