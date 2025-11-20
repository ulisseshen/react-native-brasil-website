---
ia-translated: true
id: pushnotificationios
title: '🗑️ PushNotificationIOS'
---

:::warning Descontinuado
Use um dos [pacotes da comunidade](https://reactnative.directory/?search=notification) em vez disso.
:::

<div className="banner-native-code-required">
  <h3>Apenas Projetos com Código Nativo</h3>
  <p>A seção a seguir se aplica apenas a projetos com código nativo exposto. Se você está usando o workflow gerenciado do Expo, veja o guia sobre <a href="https://docs.expo.dev/versions/latest/sdk/notifications/">Notifications</a> na documentação do Expo para a alternativa apropriada.</p>
</div>

Manipule notificações para seu aplicativo, incluindo agendamento e permissões.

---

## Começando

Para habilitar push notifications, [configure suas notificações com a Apple](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server) e seu sistema server-side.

Então, [habilite remote notifications](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app#2980038) em seu projeto. Isso habilitará automaticamente as configurações necessárias.

### Habilitar suporte para eventos `register`

Em seu `AppDelegate.m`, adicione:

```objectivec
#import <React/RCTPushNotificationManager.h>
```

Então implemente o seguinte para manipular eventos de registro de notificação remota:

```objectivec
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 // This will trigger 'register' events on PushNotificationIOS
 [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 // This will trigger 'registrationError' events on PushNotificationIOS
 [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}
```

### Manipular notificações

Você precisará implementar `UNUserNotificationCenterDelegate` em seu `AppDelegate`:

```objectivec
#import <UserNotifications/UserNotifications.h>

@interface YourAppDelegate () <UNUserNotificationCenterDelegate>
@end
```

Defina o delegate na inicialização do aplicativo:

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  return YES;
}
```

#### Notificações em primeiro plano

Implemente `userNotificationCenter:willPresentNotification:withCompletionHandler:` para manipular notificações que chegam quando o aplicativo está em primeiro plano. Use o completionHandler para determinar se a notificação será mostrada ao usuário e notifique `RCTPushNotificationManager` de acordo:

```objectivec
// Called when a notification is delivered to a foreground app.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:notification];
  // Decide if and how the notification will be shown to the user
  completionHandler(UNNotificationPresentationOptionNone);
}
```

#### Notificações em segundo plano

Implemente `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:` para manipular quando uma notificação é tocada, tipicamente chamado para notificações em segundo plano que o usuário toca para abrir o aplicativo. No entanto, se você configurou notificações em primeiro plano para serem mostradas em `userNotificationCenter:willPresentNotification:withCompletionHandler:`, este método também será invocado em notificações em primeiro plano quando tocadas. Neste caso, você deve notificar `RCTPushNotificationManager` apenas em um desses callbacks.

Se a notificação tocada resultou na inicialização do aplicativo, chame `setInitialNotification:`. Se a notificação não foi previamente manipulada por `userNotificationCenter:willPresentNotification:withCompletionHandler:`, chame `didReceiveNotification:` também:

```objectivec
- (void)  userNotificationCenter:(UNUserNotificationCenter *)center
  didReceiveNotificationResponse:(UNNotificationResponse *)response
           withCompletionHandler:(void (^)(void))completionHandler
{
  // This condition passes if the notification was tapped to launch the app
  if ([response.actionIdentifier isEqualToString:UNNotificationDefaultActionIdentifier]) {
    // Allow the notification to be retrieved on the JS side using getInitialNotification()
    [RCTPushNotificationManager setInitialNotification:response.notification];
  }
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:response.notification];
  completionHandler();
}
```

---

# Referência

## Methods

### `presentLocalNotification()`

```tsx
static presentLocalNotification(details: PresentLocalNotificationDetails);
```

Agenda uma notificação local para apresentação imediata.

**Parâmetros:**

| Nome    | Tipo   | Obrigatório | Descrição |
| ------- | ------ | -------- | ----------- |
| details | object | Sim      | Veja abaixo.  |

`details` é um objeto contendo:

- `alertTitle` : O texto exibido como o título do alerta de notificação.
- `alertBody` : A mensagem exibida no alerta de notificação.
- `userInfo` : Um objeto contendo dados adicionais de notificação (opcional).
- `category` : A categoria desta notificação, necessária para notificações acionáveis (opcional). ex. notificações com ações adicionais como Reply ou Like.
- `applicationIconBadgeNumber` O número a ser exibido como badge do ícone do aplicativo. O valor padrão desta propriedade é 0, o que significa que nenhum badge é exibido (opcional).
- `isSilent` : Se true, a notificação aparecerá sem som (opcional).
- `soundName` : O som reproduzido quando a notificação é disparada (opcional).
- `alertAction` : OBSOLETO. Isso era usado para UILocalNotification legado do iOS.

---

### `scheduleLocalNotification()`

```tsx
static scheduleLocalNotification(details: ScheduleLocalNotificationDetails);
```

Agenda uma notificação local para apresentação futura.

**Parâmetros:**

| Nome    | Tipo   | Obrigatório | Descrição |
| ------- | ------ | -------- | ----------- |
| details | object | Sim      | Veja abaixo.  |

`details` é um objeto contendo:

- `alertTitle` : O texto exibido como o título do alerta de notificação.
- `alertBody` : A mensagem exibida no alerta de notificação.
- `fireDate` : Quando a notificação será disparada. Agende notificações usando `fireDate` ou `fireIntervalSeconds`, com `fireDate` tendo precedência.
- `fireIntervalSeconds` : Segundos a partir de agora para exibir a notificação.
- `userInfo` : Um objeto contendo dados adicionais de notificação (opcional).
- `category` : A categoria desta notificação, necessária para notificações acionáveis (opcional). ex. notificações com ações adicionais como Reply ou Like.
- `applicationIconBadgeNumber` O número a ser exibido como badge do ícone do aplicativo. O valor padrão desta propriedade é 0, o que significa que nenhum badge é exibido (opcional).
- `isSilent` : Se true, a notificação aparecerá sem som (opcional).
- `soundName` : O som reproduzido quando a notificação é disparada (opcional).
- `alertAction` : OBSOLETO. Isso era usado para UILocalNotification legado do iOS.
- `repeatInterval` : OBSOLETO. Use `fireDate` ou `fireIntervalSeconds` em vez disso.

---

### `cancelAllLocalNotifications()`

```tsx
static cancelAllLocalNotifications();
```

Cancela todas as notificações locais agendadas.

---

### `removeAllDeliveredNotifications()`

```tsx
static removeAllDeliveredNotifications();
```

Remove todas as notificações entregues do Notification Center.

---

### `getDeliveredNotifications()`

```tsx
static getDeliveredNotifications(callback: (notifications: Object[]) => void);
```

Fornece uma lista das notificações do aplicativo que estão atualmente exibidas no Notification Center.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                                  |
| -------- | -------- | -------- | ------------------------------------------------------------ |
| callback | function | Sim      | Função que recebe um array de notificações entregues. |

Uma notificação entregue é um objeto contendo:

- `identifier` : O identificador desta notificação.
- `title` : O título desta notificação.
- `body` : O corpo desta notificação.
- `category` : A categoria desta notificação (opcional).
- `userInfo` : Um objeto contendo dados adicionais de notificação (opcional).
- `thread-id` : O identificador de thread desta notificação, se tiver um.

---

### `removeDeliveredNotifications()`

```tsx
static removeDeliveredNotifications(identifiers: string[]);
```

Remove as notificações especificadas do Notification Center.

**Parâmetros:**

| Nome        | Tipo  | Obrigatório | Descrição                        |
| ----------- | ----- | -------- | ---------------------------------- |
| identifiers | array | Sim      | Array de identificadores de notificação. |

---

### `setApplicationIconBadgeNumber()`

```tsx
static setApplicationIconBadgeNumber(num: number);
```

Define o número do badge para o ícone do aplicativo na Home Screen.

**Parâmetros:**

| Nome   | Tipo   | Obrigatório | Descrição                    |
| ------ | ------ | -------- | ------------------------------ |
| number | number | Sim      | Número do badge para o ícone do aplicativo. |

---

### `getApplicationIconBadgeNumber()`

```tsx
static getApplicationIconBadgeNumber(callback: (num: number) => void);
```

Obtém o número do badge atual para o ícone do aplicativo na Home Screen.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                        |
| -------- | -------- | -------- | -------------------------------------------------- |
| callback | function | Sim      | Função que processa o número do badge atual. |

---

### `cancelLocalNotifications()`

```tsx
static cancelLocalNotifications(userInfo: Object);
```

Cancela quaisquer notificações locais agendadas que correspondam aos campos no `userInfo` fornecido.

**Parâmetros:**

| Nome     | Tipo   | Obrigatório | Descrição |
| -------- | ------ | -------- | ----------- |
| userInfo | object | Não       |             |

---

### `getScheduledLocalNotifications()`

```tsx
static getScheduledLocalNotifications(
  callback: (notifications: ScheduleLocalNotificationDetails[]) => void,
);
```

Obtém a lista de notificações locais que estão atualmente agendadas.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                                                  |
| -------- | -------- | -------- | ---------------------------------------------------------------------------- |
| callback | function | Sim      | Função que processa um array de objetos descrevendo notificações locais. |

---

### `addEventListener()`

```tsx
static addEventListener(
  type: PushNotificationEventName,
  handler:
    | ((notification: PushNotification) => void)
    | ((deviceToken: string) => void)
    | ((error: {message: string; code: number; details: any}) => void),
);
```

Anexa um listener a eventos de notificação incluindo notificações locais, notificações remotas e resultados de registro de notificação.

**Parâmetros:**

| Nome    | Tipo     | Obrigatório | Descrição                         |
| ------- | -------- | -------- | ----------------------------------- |
| type    | string   | Sim      | Tipo de evento a ouvir. Veja abaixo. |
| handler | function | Sim      | Listener.                           |

Tipos de eventos válidos incluem:

- `notification` : Disparado quando uma notificação remota é recebida. O handler será invocado com uma instância de `PushNotificationIOS`. Isso manipulará notificações que chegam em primeiro plano ou foram tocadas para abrir o aplicativo do segundo plano.
- `localNotification` : Disparado quando uma notificação local é recebida. O handler será invocado com uma instância de `PushNotificationIOS`. Isso manipulará notificações que chegam em primeiro plano ou foram tocadas para abrir o aplicativo do segundo plano.
- `register`: Disparado quando o usuário se registra com sucesso para notificações remotas. O handler será invocado com uma string hex representando o deviceToken.
- `registrationError`: Disparado quando o usuário falha ao se registrar para notificações remotas. Tipicamente ocorre devido a problemas com APNS ou se o dispositivo for um simulador. O handler será invocado com `{message: string, code: number, details: any}`.

---

### `removeEventListener()`

```tsx
static removeEventListener(
  type: PushNotificationEventName,
);
```

Remove o event listener. Faça isso em `componentWillUnmount` para prevenir memory leaks.

**Parâmetros:**

| Nome | Tipo   | Obrigatório | Descrição                                       |
| ---- | ------ | -------- | ------------------------------------------------- |
| type | string | Sim      | Tipo de evento. Veja `addEventListener()` para opções. |

---

### `requestPermissions()`

```tsx
static requestPermissions(permissions?: PushNotificationPermissions[]);
```

Solicita permissões de notificação do iOS, solicitando ao usuário com uma caixa de diálogo. Por padrão, isso solicitará todas as permissões de notificação, mas você pode opcionalmente especificar quais permissões solicitar. As seguintes permissões são suportadas:

- `alert`
- `badge`
- `sound`

Se um mapa for fornecido ao método, apenas as permissões com valores truthy serão solicitadas.

Este método retorna uma promise que será resolvida quando o usuário aceitar ou rejeitar a solicitação, ou se as permissões foram previamente rejeitadas. A promise resolve para o estado das permissões após a solicitação ter sido concluída.

**Parâmetros:**

| Nome        | Tipo  | Obrigatório | Descrição            |
| ----------- | ----- | -------- | ---------------------- |
| permissions | array | Não       | alert, badge, ou sound |

---

### `abandonPermissions()`

```tsx
static abandonPermissions();
```

Cancele o registro para todas as notificações remotas recebidas via Apple Push Notification service.

Você deve chamar este método apenas em circunstâncias raras, como quando uma nova versão do aplicativo remove o suporte para todos os tipos de notificações remotas. Os usuários podem temporariamente impedir que os aplicativos recebam notificações remotas através do aplicativo Settings. Aplicativos não registrados através deste método podem sempre se registrar novamente.

---

### `checkPermissions()`

```tsx
static checkPermissions(
  callback: (permissions: PushNotificationPermissions) => void,
);
```

Verifica quais permissões de push estão atualmente habilitadas.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição |
| -------- | -------- | -------- | ----------- |
| callback | function | Sim      | Veja abaixo.  |

`callback` será invocado com um objeto `permissions`:

- `alert: boolean`
- `badge: boolean`
- `sound: boolean`

---

### `getInitialNotification()`

```tsx
static getInitialNotification(): Promise<PushNotification | null>;
```

Este método retorna uma promise. Se o aplicativo foi iniciado por uma push notification, esta promise resolve para um objeto do tipo `PushNotificationIOS` para a notificação que foi tocada. Caso contrário, resolve para `null`.

---

### `getAuthorizationStatus()`

```tsx
static getAuthorizationStatus(): Promise<number>;
```

Este método retorna uma promise que resolve para o status de autorização de notificação atual. Veja [UNAuthorizationStatus](https://developer.apple.com/documentation/usernotifications/unauthorizationstatus?language=objc) para valores possíveis.

---

### `finish()`

```tsx
finish(result: string);
```

Este método está disponível para notificações remotas que foram recebidas via [`application:didReceiveRemoteNotification:fetchCompletionHandler:`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc). No entanto, isso é substituído por `UNUserNotificationCenterDelegate` e não será mais invocado se tanto `application:didReceiveRemoteNotification:fetchCompletionHandler:` quanto os handlers mais novos de `UNUserNotificationCenterDelegate` forem implementados.

Se por alguma razão você ainda está confiando em `application:didReceiveRemoteNotification:fetchCompletionHandler:`, você precisará configurar a manipulação de eventos no lado iOS:

```objectivec
- (void)           application:(UIApplication *)application
  didReceiveRemoteNotification:(NSDictionary *)userInfo
        fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))handler
{
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:handler];
}
```

Chame `finish()` para executar os completion handlers nativos uma vez que você tenha terminado de manipular a notificação no lado JS. Ao chamar este bloco, passe o valor de fetch result que melhor descreve os resultados de sua operação. Para uma lista de valores possíveis, veja `PushNotificationIOS.FetchResult`.

Se você está usando `application:didReceiveRemoteNotification:fetchCompletionHandler:`, você _deve_ chamar este handler e deve fazê-lo o mais rápido possível. Veja a [documentação oficial](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc) para mais detalhes.

---

### `getMessage()`

```tsx
getMessage(): string | Object;
```

Um alias para `getAlert` para obter a mensagem principal da notificação.

---

### `getSound()`

```tsx
getSound(): string;
```

Obtém a string de som do objeto `aps`. Isso será `null` para notificações locais.

---

### `getCategory()`

```tsx
getCategory(): string;
```

Obtém a string de categoria do objeto `aps`.

---

### `getAlert()`

```tsx
getAlert(): string | Object;
```

Obtém a mensagem principal da notificação do objeto `aps`. Veja também o alias: `getMessage()`.

---

### `getContentAvailable()`

```tsx
getContentAvailable(): number;
```

Obtém o número content-available do objeto `aps`.

---

### `getBadgeCount()`

```tsx
getBadgeCount(): number;
```

Obtém o número de badge count do objeto `aps`.

---

### `getData()`

```tsx
getData(): Object;
```

Obtém o objeto de dados na notificação.

---

### `getThreadID()`

```tsx
getThreadID();
```

Obtém o thread ID na notificação.
