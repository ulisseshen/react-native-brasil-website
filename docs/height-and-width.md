---
ia-translated: true
id: height-and-width
title: Altura e Largura
---

A altura e largura de um componente determinam seu tamanho na tela.

## Dimensões Fixas

A maneira geral de definir as dimensões de um componente é adicionando `width` e `height` fixos ao estilo. Todas as dimensões no React Native são sem unidade e representam pixels independentes de densidade.

```SnackPlayer name=Height%20and%20Width
import React from 'react';
import {View} from 'react-native';

const FixedDimensionsBasics = () => {
  return (
    <View>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'powderblue',
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'steelblue',
        }}
      />
    </View>
  );
};

export default FixedDimensionsBasics;
```

Definir dimensões dessa maneira é comum para componentes cujo tamanho deve sempre ser fixo em um número de pontos e não calculado com base no tamanho da tela.

:::caution
Não há mapeamento universal de pontos para unidades físicas de medida. Isso significa que um componente com dimensões fixas pode não ter o mesmo tamanho físico em diferentes dispositivos e tamanhos de tela. No entanto, essa diferença é imperceptível para a maioria dos casos de uso.
:::

## Dimensões Flex

Use `flex` no estilo de um componente para fazer o componente expandir e encolher dinamicamente com base no espaço disponível. Normalmente você usará `flex: 1`, que diz a um componente para preencher todo o espaço disponível, compartilhado igualmente entre outros componentes com o mesmo pai. Quanto maior o `flex` dado, maior a proporção de espaço que um componente ocupará comparado aos seus irmãos.

:::info
Um componente só pode se expandir para preencher o espaço disponível se seu pai tiver dimensões maiores que `0`. Se um pai não tiver nem `width` e `height` fixos nem `flex`, o pai terá dimensões de `0` e os filhos `flex` não serão visíveis.
:::

```SnackPlayer name=Flex%20Dimensions
import React from 'react';
import {View} from 'react-native';

const FlexDimensionsBasics = () => {
  return (
    // Try removing the `flex: 1` on the parent View.
    // The parent will not have dimensions, so the children can't expand.
    // What if you add `height: 300` instead of `flex: 1`?
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    </View>
  );
};

export default FlexDimensionsBasics;
```

Depois que você puder controlar o tamanho de um componente, o próximo passo é [aprender como organizá-lo na tela](flexbox.md).

## Dimensões em Porcentagem

Se você quer preencher uma certa porção da tela, mas você _não_ quer usar o layout `flex`, você _pode_ usar **valores de porcentagem** no estilo do componente. Similar a dimensões flex, dimensões em porcentagem exigem um pai com tamanho definido.

```SnackPlayer name=Percentage%20Dimensions
import React from 'react';
import {View} from 'react-native';

const PercentageDimensionsBasics = () => {
  // Try removing the `height: '100%'` on the parent View.
  // The parent will not have dimensions, so the children can't expand.
  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          height: '15%',
          backgroundColor: 'powderblue',
        }}
      />
      <View
        style={{
          width: '66%',
          height: '35%',
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: '33%',
          height: '50%',
          backgroundColor: 'steelblue',
        }}
      />
    </View>
  );
};

export default PercentageDimensionsBasics;
```
