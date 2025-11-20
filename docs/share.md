---
ia-translated: true
id: share
title: Share
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Exemplo

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Example&supportedPlatforms=ios,android&ext=js
import React from 'react';
import {Alert, Share, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Button onPress={onShare} title="Share" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShareExample;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Example&supportedPlatforms=ios,android&ext=tsx
import React from 'react';
import {Alert, Share, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Button onPress={onShare} title="Share" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShareExample;
```

</TabItem>
</Tabs>

# Referência

## Métodos

### `share()`

```tsx
static share(content: ShareContent, options?: ShareOptions);
```

Abre um diálogo para compartilhar conteúdo de texto.

No iOS, retorna uma Promise que será invocada com um objeto contendo `action` e `activityType`. Se o usuário dispensar o diálogo, a Promise ainda será resolvida com action sendo `Share.dismissedAction` e todas as outras chaves sendo undefined. Note que algumas opções de compartilhamento não aparecerão ou funcionarão no simulador iOS.

No Android, retorna uma Promise que sempre será resolvida com action sendo `Share.sharedAction`.

**Propriedades:**

| Nome                                                         | Tipo   | Descrição                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content <div className="label basic required">Obrigatório</div> | object | `message` - uma mensagem para compartilhar<br/>`url` - uma URL para compartilhar <div className="label ios">iOS</div><br/>`title` - título da mensagem <div className="label android">Android</div><hr/>Pelo menos um de `url` e `message` é obrigatório.                                                                                                                                          |
| options                                                      | object | `dialogTitle` <div className="label android">Android</div><br/>`excludedActivityTypes` <div className="label ios">iOS</div><br/>`subject` - um assunto para compartilhar via email <div className="label ios">iOS</div><br/>`tintColor` <div className="label ios">iOS</div><br/>`anchor` - o nó ao qual a action sheet deve ser ancorada (usado para iPad) <div className="label ios">iOS</div> |

---

## Propriedades

### `sharedAction`

```tsx
static sharedAction: 'sharedAction';
```

O conteúdo foi compartilhado com sucesso.

---

### `dismissedAction` <div className="label ios">iOS</div>

```tsx
static dismissedAction: 'dismissedAction';
```

O diálogo foi dispensado.
