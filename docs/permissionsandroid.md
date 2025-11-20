---
ia-translated: true
id: permissionsandroid
title: PermissionsAndroid
---

<div className="banner-native-code-required">
  <h3>Projeto com Código Nativo Necessário</h3>
  <p>A seção a seguir se aplica apenas a projetos com código nativo exposto. Se você estiver usando o fluxo de trabalho gerenciado do Expo, consulte o guia sobre <a href="https://docs.expo.dev/guides/permissions/">Permissions</a> na documentação do Expo para a alternativa apropriada.</p>
</div>

`PermissionsAndroid` fornece acesso ao novo modelo de permissões do Android M. As chamadas permissões "normais" são concedidas por padrão quando a aplicação é instalada, desde que apareçam no `AndroidManifest.xml`. No entanto, permissões "perigosas" requerem um diálogo de confirmação. Você deve usar este módulo para essas permissões.

Em dispositivos anteriores à versão 23 do SDK, as permissões são concedidas automaticamente se aparecerem no manifesto, então `check` deve sempre retornar `true` e `request` deve sempre resolver para `PermissionsAndroid.RESULTS.GRANTED`.

Se um usuário desativou previamente uma permissão que você solicita, o sistema operacional irá aconselhar seu aplicativo a mostrar uma justificativa para a necessidade da permissão. O argumento opcional `rationale` mostrará um diálogo apenas se necessário - caso contrário, o diálogo de permissão normal será exibido.

### Exemplo

```SnackPlayer name=PermissionsAndroid%20Example&supportedPlatforms=android
import React from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.item}>Try permissions</Text>
      <Button title="request permissions" onPress={requestCameraPermission} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
```

### Permissões que requerem confirmação do usuário

Disponíveis como constantes em `PermissionsAndroid.PERMISSIONS`:

- `READ_CALENDAR`: 'android.permission.READ_CALENDAR'
- `WRITE_CALENDAR`: 'android.permission.WRITE_CALENDAR'
- `CAMERA`: 'android.permission.CAMERA'
- `READ_CONTACTS`: 'android.permission.READ_CONTACTS'
- `WRITE_CONTACTS`: 'android.permission.WRITE_CONTACTS'
- `GET_ACCOUNTS`: 'android.permission.GET_ACCOUNTS'
- `ACCESS_FINE_LOCATION`: 'android.permission.ACCESS_FINE_LOCATION'
- `ACCESS_COARSE_LOCATION`: 'android.permission.ACCESS_COARSE_LOCATION'
- `ACCESS_BACKGROUND_LOCATION`: 'android.permission.ACCESS_BACKGROUND_LOCATION'
- `RECORD_AUDIO`: 'android.permission.RECORD_AUDIO'
- `READ_PHONE_STATE`: 'android.permission.READ_PHONE_STATE'
- `CALL_PHONE`: 'android.permission.CALL_PHONE'
- `READ_CALL_LOG`: 'android.permission.READ_CALL_LOG'
- `WRITE_CALL_LOG`: 'android.permission.WRITE_CALL_LOG'
- `ADD_VOICEMAIL`: 'com.android.voicemail.permission.ADD_VOICEMAIL'
- `USE_SIP`: 'android.permission.USE_SIP'
- `PROCESS_OUTGOING_CALLS`: 'android.permission.PROCESS_OUTGOING_CALLS'
- `BODY_SENSORS`: 'android.permission.BODY_SENSORS'
- `SEND_SMS`: 'android.permission.SEND_SMS'
- `RECEIVE_SMS`: 'android.permission.RECEIVE_SMS'
- `READ_SMS`: 'android.permission.READ_SMS'
- `RECEIVE_WAP_PUSH`: 'android.permission.RECEIVE_WAP_PUSH'
- `RECEIVE_MMS`: 'android.permission.RECEIVE_MMS'
- `READ_EXTERNAL_STORAGE`: 'android.permission.READ_EXTERNAL_STORAGE'
- `WRITE_EXTERNAL_STORAGE`: 'android.permission.WRITE_EXTERNAL_STORAGE'
- `BLUETOOTH_CONNECT`: 'android.permission.BLUETOOTH_CONNECT'
- `BLUETOOTH_SCAN`: 'android.permission.BLUETOOTH_SCAN'
- `BLUETOOTH_ADVERTISE`: 'android.permission.BLUETOOTH_ADVERTISE'
- `ACCESS_MEDIA_LOCATION`: 'android.permission.ACCESS_MEDIA_LOCATION'
- `ACCEPT_HANDOVER`: 'android.permission.ACCEPT_HANDOVER'
- `ACTIVITY_RECOGNITION`: 'android.permission.ACTIVITY_RECOGNITION'
- `ANSWER_PHONE_CALLS`: 'android.permission.ANSWER_PHONE_CALLS'
- `READ_PHONE_NUMBERS`: 'android.permission.READ_PHONE_NUMBERS'
- `UWB_RANGING`: 'android.permission.UWB_RANGING'
- `BODY_SENSORS_BACKGROUND`: 'android.permission.BODY_SENSORS_BACKGROUND'
- `READ_MEDIA_IMAGES`: 'android.permission.READ_MEDIA_IMAGES'
- `READ_MEDIA_VIDEO`: 'android.permission.READ_MEDIA_VIDEO'
- `READ_MEDIA_AUDIO`: 'android.permission.READ_MEDIA_AUDIO'
- `POST_NOTIFICATIONS`: 'android.permission.POST_NOTIFICATIONS'
- `NEARBY_WIFI_DEVICES`: 'android.permission.NEARBY_WIFI_DEVICES'
- `READ_VOICEMAIL`: 'com.android.voicemail.permission.READ_VOICEMAIL',
- `WRITE_VOICEMAIL`: 'com.android.voicemail.permission.WRITE_VOICEMAIL',

### Strings de resultado para solicitar permissões

Disponíveis como constantes em `PermissionsAndroid.RESULTS`:

- `GRANTED`: 'granted'
- `DENIED`: 'denied'
- `NEVER_ASK_AGAIN`: 'never_ask_again'

---

# Referência

## Métodos

### `check()`

```tsx
static check(permission: Permission): Promise<boolean>;
```

Retorna uma promise que resolve para um valor booleano indicando se a permissão especificada foi concedida.

**Parâmetros:**

| Nome       | Tipo   | Obrigatório | Descrição                       |
| ---------- | ------ | ----------- | ------------------------------- |
| permission | string | Sim         | A permissão a ser verificada.   |

---

### `request()`

```tsx
static request(
  permission: Permission,
  rationale?: Rationale,
): Promise<PermissionStatus>;
```

Solicita ao usuário que habilite uma permissão e retorna uma promise que resolve para um valor string (veja as strings de resultado acima) indicando se o usuário permitiu ou negou a solicitação ou não quer ser perguntado novamente.

Se `rationale` for fornecido, esta função verifica com o sistema operacional se é necessário mostrar um diálogo explicando por que a permissão é necessária (https://developer.android.com/training/permissions/requesting.html#explain) e então mostra o diálogo de permissão do sistema.

**Parâmetros:**

| Nome       | Tipo   | Obrigatório | Descrição                      |
| ---------- | ------ | ----------- | ------------------------------ |
| permission | string | Sim         | A permissão a ser solicitada.  |
| rationale  | object | Não         | Veja `rationale` abaixo.       |

**Rationale:**

| Nome           | Tipo   | Obrigatório | Descrição                           |
| -------------- | ------ | ----------- | ----------------------------------- |
| title          | string | Sim         | O título do diálogo.                |
| message        | string | Sim         | A mensagem do diálogo.              |
| buttonPositive | string | Sim         | O texto do botão positivo.          |
| buttonNegative | string | Não         | O texto do botão negativo.          |
| buttonNeutral  | string | Não         | O texto do botão neutro.            |

---

### `requestMultiple()`

```tsx
static requestMultiple(
  permissions: Permission[],
): Promise<{[key in Permission]: PermissionStatus}>;
```

Solicita ao usuário que habilite múltiplas permissões no mesmo diálogo e retorna um objeto com as permissões como chaves e strings como valores (veja as strings de resultado acima) indicando se o usuário permitiu ou negou a solicitação ou não quer ser perguntado novamente.

**Parâmetros:**

| Nome        | Tipo  | Obrigatório | Descrição                             |
| ----------- | ----- | ----------- | ------------------------------------- |
| permissions | array | Sim         | Array de permissões a serem solicitadas. |
