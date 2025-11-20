---
ia-translated: true
id: style
title: Style
---

Com React Native, você estiliza sua aplicação usando JavaScript. Todos os componentes principais aceitam uma prop chamada `style`. Os nomes de estilo e [valores](colors.md) geralmente correspondem a como o CSS funciona na web, exceto que os nomes são escritos usando camel casing, por exemplo, `backgroundColor` em vez de `background-color`.

A prop `style` pode ser um objeto JavaScript simples. Isso é o que geralmente usamos para código de exemplo. Você também pode passar um array de estilos - o último estilo no array tem precedência, então você pode usar isso para herdar estilos.

À medida que um componente cresce em complexidade, muitas vezes é mais limpo usar `StyleSheet.create` para definir vários estilos em um só lugar. Aqui está um exemplo:

```SnackPlayer name=Style
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LotsOfStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default LotsOfStyles;
```

Um padrão comum é fazer seu componente aceitar uma prop `style` que, por sua vez, é usada para estilizar subcomponentes. Você pode usar isso para fazer estilos "cascata" da mesma forma que fazem em CSS.

Existem muitas outras maneiras de personalizar o estilo do texto. Confira a [referência do componente Text](text.md) para uma lista completa.

Agora você pode tornar seu texto bonito. O próximo passo para se tornar um especialista em estilo é [aprender como controlar o tamanho do componente](height-and-width.md).

## Known issues

- [react-native#29308](https://github.com/facebook/react-native/issues/29308#issuecomment-792864162): Em alguns casos, o React Native não corresponde a como o CSS funciona na web, por exemplo, a área de toque nunca se estende além dos limites da view pai e no Android margem negativa não é suportada.
