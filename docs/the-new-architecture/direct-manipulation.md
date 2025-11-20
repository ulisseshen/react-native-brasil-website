---
ia-translated: true
id: direct-manipulation-new-architecture
title: Direct Manipulation
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Às vezes é necessário fazer mudanças diretamente em um componente sem usar state/props para disparar uma re-renderização de toda a subárvore. Ao usar React no browser, por exemplo, às vezes você precisa modificar diretamente um node DOM, e o mesmo é verdadeiro para views em aplicativos mobile. `setNativeProps` é o equivalente React Native de definir propriedades diretamente em um node DOM.

:::caution
Use `setNativeProps` quando a re-renderização frequente cria um gargalo de performance!

Direct manipulation não será uma ferramenta que você usará com frequência. Você normalmente só a usará para criar animações contínuas para evitar a sobrecarga de renderizar a hierarquia de componentes e reconciliar muitas views.
`setNativeProps` é imperativo e armazena estado na camada nativa (DOM, UIView, etc.) e não dentro de seus componentes React, o que torna seu código mais difícil de raciocinar.

Antes de usá-lo, tente resolver seu problema com `setState` e [`shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate).
:::

## setNativeProps para editar o valor do TextInput

Outro caso de uso muito comum de `setNativeProps` é editar o valor do TextInput. A prop `controlled` do TextInput às vezes pode perder caracteres quando o `bufferDelay` é baixo e o usuário digita muito rapidamente. Alguns desenvolvedores preferem pular esta prop inteiramente e, em vez disso, usar `setNativeProps` para manipular diretamente o valor do TextInput quando necessário.

Por exemplo, o código a seguir demonstra a edição do input quando você toca em um botão:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=setNativeProps%20on%20TextInput&ext=js
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

## Evitando conflitos com a função render

Se você atualizar uma propriedade que também é gerenciada pela função render, você pode acabar com alguns bugs imprevisíveis e confusos porque sempre que o componente re-renderizar e aquela propriedade mudar, qualquer valor que foi previamente definido por `setNativeProps` será completamente ignorado e substituído.
