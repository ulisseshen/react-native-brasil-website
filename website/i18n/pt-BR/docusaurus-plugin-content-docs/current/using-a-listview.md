---
ia-translated: true
id: using-a-listview
title: Usando List Views
---

O React Native fornece um conjunto de componentes para apresentar listas de dados. Geralmente, você vai querer usar [FlatList](flatlist.md) ou [SectionList](sectionlist.md).

O componente `FlatList` exibe uma lista rolável de dados que mudam, mas com estrutura similar. `FlatList` funciona bem para listas longas de dados, onde o número de itens pode mudar ao longo do tempo. Diferente do [`ScrollView`](using-a-scrollview.md) mais genérico, o `FlatList` renderiza apenas os elementos que estão sendo exibidos na tela no momento, não todos os elementos de uma vez.

O componente `FlatList` requer duas props: `data` e `renderItem`. `data` é a fonte de informação para a lista. `renderItem` pega um item da fonte e retorna um componente formatado para renderizar.

Este exemplo cria um `FlatList` básico com dados fixos. Cada item nas props `data` é renderizado como um componente `Text`. O componente `FlatListBasics` então renderiza o `FlatList` e todos os componentes `Text`.

```SnackPlayer name=FlatList%20Basics
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

export default FlatListBasics;
```

Se você quiser renderizar um conjunto de dados dividido em seções lógicas, talvez com cabeçalhos de seção, similar ao `UITableView` no iOS, então [SectionList](sectionlist.md) é o caminho a seguir.

```SnackPlayer name=SectionList%20Basics
import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};

export default SectionListBasics;
```

Um dos usos mais comuns para uma list view é exibir dados que você busca de um servidor. Para fazer isso, você precisará [aprender sobre networking no React Native](network.md).
