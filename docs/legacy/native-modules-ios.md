---
id: native-modules-ios
title: Módulos Nativos iOS
ia-translated: true
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NativeDeprecated />

Bem-vindo aos Módulos Nativos para iOS. Comece lendo a [Introdução aos Módulos Nativos](native-modules-intro) para entender o que são módulos nativos.

## Criar um Módulo Nativo de Calendário

No guia a seguir, você criará um módulo nativo chamado `CalendarModule`, que permitirá acessar as APIs de calendário da Apple a partir do JavaScript. Ao final, você poderá chamar `CalendarModule.createCalendarEvent('Dinner Party', 'My House');` do JavaScript, invocando um método nativo que cria um evento de calendário.

### Setup

Para começar, abra o projeto iOS dentro da sua aplicação React Native no Xcode. Você pode encontrar seu projeto iOS aqui dentro de um app React Native:

<figure>
  <img src="/docs/assets/native-modules-ios-open-project.png" width="500" alt="Image of opening up an iOS project within a React Native app inside of xCode." />
  <figcaption>Imagem de onde você pode encontrar seu projeto iOS</figcaption>
</figure>

Recomendamos usar o Xcode para escrever seu código nativo. O Xcode é construído para desenvolvimento iOS, e usá-lo ajudará você a resolver rapidamente erros menores como sintaxe de código.

### Criar Arquivos de Módulo Nativo Customizados

O primeiro passo é criar nossos principais arquivos de header e implementação do módulo nativo customizado. Crie um novo arquivo chamado `RCTCalendarModule.h`

<figure>
  <img src="/docs/assets/native-modules-ios-add-class.png" width="500" alt="Image of creating a class called  RCTCalendarModule.h." />
  <figcaption>Imagem da criação de um arquivo de módulo nativo customizado dentro da mesma pasta que AppDelegate</figcaption>
</figure>

e adicione o seguinte a ele:

```objectivec
//  RCTCalendarModule.h
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end

```

Você pode usar qualquer nome que se adeque ao módulo nativo que você está construindo. Nomeie a classe `RCTCalendarModule` já que você está criando um módulo nativo de calendário. Como ObjC não tem suporte em nível de linguagem para namespaces como Java ou C++, a convenção é prefixar o nome da classe com uma substring. Isso pode ser uma abreviação do nome da sua aplicação ou do seu nome de infraestrutura. RCT, neste exemplo, refere-se a React.

Como você pode ver abaixo, a classe CalendarModule implementa o protocolo `RCTBridgeModule`. Um módulo nativo é uma classe Objective-C que implementa o protocolo `RCTBridgeModule`.

Em seguida, vamos começar a implementar o módulo nativo. Crie o arquivo de implementação correspondente usando cocoa touch class no xcode, `RCTCalendarModule.m`, na mesma pasta e inclua o seguinte conteúdo:

```objectivec
// RCTCalendarModule.m
#import "RCTCalendarModule.h"

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

@end

```

### Nome do Módulo

Por enquanto, seu módulo nativo `RCTCalendarModule.m` inclui apenas uma macro `RCT_EXPORT_MODULE`, que exporta e registra a classe do módulo nativo com o React Native. A macro `RCT_EXPORT_MODULE` também aceita um argumento opcional que especifica o nome pelo qual o módulo será acessível no seu código JavaScript.

Este argumento não é uma string literal. No exemplo abaixo, `RCT_EXPORT_MODULE(CalendarModuleFoo)` é passado, não `RCT_EXPORT_MODULE("CalendarModuleFoo")`.

```objectivec
// To export a module named CalendarModuleFoo
RCT_EXPORT_MODULE(CalendarModuleFoo);
```

O módulo nativo pode então ser acessado em JS assim:

```tsx
const {CalendarModuleFoo} = ReactNative.NativeModules;
```

Se você não especificar um nome, o nome do módulo JavaScript corresponderá ao nome da classe Objective-C, com quaisquer prefixos "RCT" ou "RK" removidos.

Vamos seguir o exemplo abaixo e chamar `RCT_EXPORT_MODULE` sem nenhum argumento. Como resultado, o módulo será exposto ao React Native usando o nome `CalendarModule`, já que esse é o nome da classe Objective-C, com RCT removido.

```objectivec
// Without passing in a name this will export the native module name as the Objective-C class name with "RCT" removed
RCT_EXPORT_MODULE();
```

O módulo nativo pode então ser acessado em JS assim:

```tsx
const {CalendarModule} = ReactNative.NativeModules;
```

### Exportar um Método Nativo para JavaScript

O React Native não exporá nenhum método em um módulo nativo para JavaScript a menos que seja explicitamente instruído. Isso pode ser feito usando a macro `RCT_EXPORT_METHOD`. Métodos escritos na macro `RCT_EXPORT_METHOD` são assíncronos e o tipo de retorno é portanto sempre void. Para passar um resultado de um método `RCT_EXPORT_METHOD` para JavaScript, você pode usar callbacks ou emitir eventos (cobertos abaixo). Vamos em frente e configurar um método nativo para nosso módulo nativo `CalendarModule` usando a macro `RCT_EXPORT_METHOD`. Chame-o de `createCalendarEvent()` e por enquanto faça-o receber argumentos de nome e localização como strings. As opções de tipo de argumento serão cobertas em breve.

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
}
```

:::note
Observe que a macro `RCT_EXPORT_METHOD` não será necessária com TurboModules a menos que seu método dependa da conversão de argumentos RCT (veja tipos de argumentos abaixo). Eventualmente, o React Native removerá `RCT_EXPORT_MACRO`, então desencorajamos as pessoas de usar `RCTConvert`. Em vez disso, você pode fazer a conversão de argumentos dentro do corpo do método.
:::

Antes de construir a funcionalidade do método `createCalendarEvent()`, adicione um log de console no método para que você possa confirmar que ele foi invocado do JavaScript na sua aplicação React Native. Use as APIs `RCTLog` do React. Vamos importar esse header no topo do seu arquivo e então adicionar a chamada de log.

```objectivec
#import <React/RCTLog.h>
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
```

### Métodos Síncronos

Você pode usar `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD` para criar um método nativo síncrono.

```objectivec
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
return [[UIDevice currentDevice] name];
}
```

O tipo de retorno deste método deve ser do tipo object (id) e deve ser serializável para JSON. Isso significa que o hook só pode retornar nil ou valores JSON (por exemplo, NSNumber, NSString, NSArray, NSDictionary).

No momento, não recomendamos usar métodos síncronos, pois chamar métodos de forma síncrona pode ter fortes penalidades de performance e introduzir bugs relacionados a threading nos seus módulos nativos. Além disso, observe que se você optar por usar `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD`, seu app não poderá mais usar o depurador do Google Chrome. Isso porque métodos síncronos exigem que a VM JS compartilhe memória com o app. Para o depurador do Google Chrome, o React Native roda dentro da VM JS no Google Chrome e se comunica de forma assíncrona com os dispositivos móveis via WebSockets.

### Testar o que Você Construiu

Neste ponto, você configurou a estrutura básica para seu módulo nativo no iOS. Teste isso acessando o módulo nativo e invocando seu método exportado em JavaScript.

Encontre um lugar em sua aplicação onde você gostaria de adicionar uma chamada ao método `createCalendarEvent()` do módulo nativo. Abaixo está um exemplo de um componente, `NewModuleButton`, que você pode adicionar no seu app. Você pode invocar o módulo nativo dentro da função `onPress()` do `NewModuleButton`.

```tsx
import React from 'react';
import {Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = () => {
    console.log('We will invoke the native module here!');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
```

Para acessar seu módulo nativo do JavaScript, você precisa primeiro importar `NativeModules` do React Native:

```tsx
import {NativeModules} from 'react-native';
```

Você pode então acessar o módulo nativo `CalendarModule` a partir de `NativeModules`.

```tsx
const {CalendarModule} = NativeModules;
```

Agora que você tem o módulo nativo CalendarModule disponível, você pode invocar seu método nativo `createCalendarEvent()`. Abaixo ele é adicionado ao método `onPress()` em `NewModuleButton`:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent('testName', 'testLocation');
};
```

O passo final é reconstruir o app React Native para que você possa ter o código nativo mais recente (com seu novo módulo nativo!) disponível. Na sua linha de comando, onde está localizada a aplicação react native, execute o seguinte:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

### Compilando Conforme Você Itera

Conforme você trabalha através desses guias e itera em seu módulo nativo, você precisará fazer uma reconstrução nativa da sua aplicação para acessar suas mudanças mais recentes a partir do JavaScript. Isso porque o código que você está escrevendo fica dentro da parte nativa da sua aplicação. Embora o metro bundler do React Native possa observar mudanças no JavaScript e reconstruir o bundle JS em tempo real para você, ele não fará isso para código nativo. Então, se você quiser testar suas mudanças nativas mais recentes, você precisa reconstruir usando o comando acima.

### Resumo✨

Agora você deve ser capaz de invocar seu método `createCalendarEvent()` no seu módulo nativo em JavaScript. Como você está usando `RCTLog` na função, pode confirmar que seu método nativo está sendo invocado [habilitando o modo debug no seu app](https://reactnative.dev/docs/debugging#chrome-developer-tools) e olhando para o console JS no Chrome ou o depurador de app mobile Flipper. Você deve ver sua mensagem `RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);` cada vez que invocar o método do módulo nativo.

<figure>
  <img src="/docs/assets/native-modules-ios-logs.png" width="1000" alt="Image of logs." />
  <figcaption>Imagem dos logs iOS no Flipper</figcaption>
</figure>

Neste ponto, você criou um módulo nativo iOS e invocou um método nele a partir do JavaScript na sua aplicação React Native. Você pode continuar lendo para aprender mais sobre coisas como quais tipos de argumentos seu método de módulo nativo aceita e como configurar callbacks e promises dentro do seu módulo nativo.

## Além de um Módulo Nativo de Calendário

### Melhor Exportação de Módulo Nativo

Importar seu módulo nativo extraindo-o de `NativeModules` como acima é um pouco desajeitado.

Para economizar aos consumidores do seu módulo nativo de ter que fazer isso cada vez que quiserem acessar seu módulo nativo, você pode criar um wrapper JavaScript para o módulo. Crie um novo arquivo JavaScript chamado NativeCalendarModule.js com o seguinte conteúdo:

```tsx
/**
* This exposes the native CalendarModule module as a JS module. This has a
* function 'createCalendarEvent' which takes the following parameters:

* 1. String name: A string representing the name of the event
* 2. String location: A string representing the location of the event
*/
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
export default CalendarModule;
```

Este arquivo JavaScript também se torna um bom local para você adicionar qualquer funcionalidade do lado JavaScript. Por exemplo, se você usa um sistema de tipos como TypeScript, pode adicionar anotações de tipo para seu módulo nativo aqui. Embora o React Native ainda não suporte type safety nativo para JS, com essas anotações de tipo, todo o seu código JS será type safe. Essas anotações também tornarão mais fácil para você mudar para módulos nativos type-safe no futuro. Abaixo está um exemplo de adição de type safety ao Calendar Module:

```tsx
/**
 * This exposes the native CalendarModule module as a JS module. This has a
 * function 'createCalendarEvent' which takes the following parameters:
 *
 * 1. String name: A string representing the name of the event
 * 2. String location: A string representing the location of the event
 */
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void;
}
export default CalendarModule as CalendarInterface;
```

Nos seus outros arquivos JavaScript, você pode acessar o módulo nativo e invocar seu método assim:

```tsx
import NativeCalendarModule from './NativeCalendarModule';
NativeCalendarModule.createCalendarEvent('foo', 'bar');
```

:::note
Isso assume que o lugar onde você está importando `CalendarModule` está na mesma hierarquia que `NativeCalendarModule.js`. Atualize o import relativo conforme necessário.
:::

### Tipos de Argumentos

Quando um método de módulo nativo é invocado no JavaScript, o React Native converte os argumentos de objetos JS para seus análogos de objetos Objective-C/Swift. Então, por exemplo, se seu método de Módulo Nativo Objective-C aceita um NSNumber, em JS você precisa chamar o método com um number. O React Native lidará com a conversão para você. Abaixo está uma lista dos tipos de argumentos suportados para métodos de módulos nativos e os equivalentes JavaScript para os quais eles mapeiam.

| Objective-C                                   | JavaScript         |
| --------------------------------------------- | ------------------ |
| NSString                                      | string, ?string    |
| BOOL                                          | boolean            |
| double                                        | number             |
| NSNumber                                      | ?number            |
| NSArray                                       | Array, ?Array      |
| NSDictionary                                  | Object, ?Object    |
| RCTResponseSenderBlock                        | Function (success) |
| RCTResponseSenderBlock, RCTResponseErrorBlock | Function (failure) |
| RCTPromiseResolveBlock, RCTPromiseRejectBlock | Promise            |

:::info
Os seguintes tipos são atualmente suportados, mas não serão suportados em TurboModules. Evite usá-los.

- Function (failure) -> RCTResponseErrorBlock
- Number -> NSInteger
- Number -> CGFloat
- Number -> float
  :::

Para iOS, você também pode escrever métodos de módulos nativos com qualquer tipo de argumento que seja suportado pela classe `RCTConvert` (veja [RCTConvert](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTConvert.h) para detalhes sobre o que é suportado). As funções helper RCTConvert todas aceitam um valor JSON como entrada e o mapeiam para um tipo ou classe nativa Objective-C.

### Exportando Constantes

Um módulo nativo pode exportar constantes substituindo o método nativo `constantsToExport()`. Abaixo `constantsToExport()` é substituído e retorna um Dictionary que contém uma propriedade de nome de evento padrão que você pode acessar em JavaScript assim:

```objectivec
- (NSDictionary *)constantsToExport
{
 return @{ @"DEFAULT_EVENT_NAME": @"New Event" };
}
```

A constante pode então ser acessada invocando `getConstants()` no módulo nativo em JS assim:

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);
```

Tecnicamente, é possível acessar constantes exportadas em `constantsToExport()` diretamente do objeto `NativeModule`. Isso não será mais suportado com TurboModules, então encorajamos a comunidade a mudar para a abordagem acima para evitar migração necessária no futuro.

:::note
As constantes são exportadas apenas no momento da inicialização, então se você alterar os valores de `constantsToExport()` em tempo de execução, isso não afetará o ambiente JavaScript.
:::

Para iOS, se você substituir `constantsToExport()` então você também deve implementar `+ requiresMainQueueSetup` para informar ao React Native se seu módulo precisa ser inicializado na thread principal, antes de qualquer código JavaScript ser executado. Caso contrário, você verá um aviso de que no futuro seu módulo pode ser inicializado em uma thread de segundo plano, a menos que você explicitamente opte por não participar com `+ requiresMainQueueSetup:`. Se seu módulo não requer acesso ao UIKit, então você deve responder a `+ requiresMainQueueSetup` com NO.

### Callbacks

Módulos nativos também suportam um tipo único de argumento - um callback. Callbacks são usados para passar dados do Objective-C para JavaScript para métodos assíncronos. Eles também podem ser usados para executar JS de forma assíncrona a partir do lado nativo.

Para iOS, callbacks são implementados usando o tipo `RCTResponseSenderBlock`. Abaixo o parâmetro callback `myCallBack` é adicionado ao `createCalendarEventMethod()`:

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                location:(NSString *)location
                myCallback:(RCTResponseSenderBlock)callback)

```

Você pode então invocar o callback no seu método nativo, fornecendo qualquer resultado que você queira passar para JavaScript em um array. Note que `RCTResponseSenderBlock` aceita apenas um argumento - um array de parâmetros para passar para o callback JavaScript. Abaixo você passará de volta o ID de um evento criado em uma chamada anterior.

:::info
É importante destacar que o callback não é invocado imediatamente após a função nativa ser concluída - lembre-se que a comunicação é assíncrona.
:::

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
 NSInteger eventId = ...
 callback(@[@(eventId)]);

 RCTLogInfo(@"Pretending to create an event %@ at %@", title, location);
}

```

Este método poderia então ser acessado em JavaScript usando:

```tsx
const onSubmit = () => {
  CalendarModule.createCalendarEvent(
    'Party',
    '04-12-2020',
    eventId => {
      console.log(`Created a new event with id ${eventId}`);
    },
  );
};
```

Um módulo nativo deve invocar seu callback apenas uma vez. Ele pode, no entanto, armazenar o callback e invocá-lo mais tarde. Esse padrão é frequentemente usado para envolver APIs iOS que requerem delegates - veja [`RCTAlertManager`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/CoreModules/RCTAlertManager.mm) como exemplo. Se o callback nunca for invocado, alguma memória vazará.

Existem duas abordagens para o tratamento de erros com callbacks. A primeira é seguir a convenção do Node e tratar o primeiro argumento passado para o array de callback como um objeto de erro.

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
  NSNumber *eventId = [NSNumber numberWithInt:123];
  callback(@[[NSNull null], eventId]);
}
```

Em JavaScript, você pode então verificar o primeiro argumento para ver se um erro foi passado:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEventCallback(
    'testName',
    'testLocation',
    (error, eventId) => {
      if (error) {
        console.error(`Error found! ${error}`);
      }
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

Outra opção é usar um callback onFailure e onSuccess:

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title
                  location:(NSString *)location
                  errorCallback: (RCTResponseSenderBlock)errorCallback
                  successCallback: (RCTResponseSenderBlock)successCallback)
{
  @try {
    NSNumber *eventId = [NSNumber numberWithInt:123];
    successCallback(@[eventId]);
  }

  @catch ( NSException *e ) {
    errorCallback(@[e]);
  }
}
```

Então em JavaScript você pode adicionar um callback separado para respostas de erro e sucesso:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEventCallback(
    'testName',
    'testLocation',
    error => {
      console.error(`Error found! ${error}`);
    },
    eventId => {
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

Se você quiser passar objetos semelhantes a erros para JavaScript, use `RCTMakeError` de [`RCTUtils.h.`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTUtils.h) Atualmente isso apenas passa um Dictionary em forma de Error para JavaScript, mas o React Native pretende gerar automaticamente objetos Error JavaScript reais no futuro. Você também pode fornecer um argumento `RCTResponseErrorBlock`, que é usado para callbacks de erro e aceita um objeto `NSError \*`. Observe que este tipo de argumento não será suportado com TurboModules.

### Promises

Módulos nativos também podem cumprir uma promise, o que pode simplificar seu JavaScript, especialmente quando se usa a sintaxe `async/await` do ES2016. Quando o último parâmetro de um método de módulo nativo é um `RCTPromiseResolveBlock` e `RCTPromiseRejectBlock`, seu método JS correspondente retornará um objeto Promise JS.

Refatorando o código acima para usar uma promise em vez de callbacks fica assim:

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                 location:(NSString *)location
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
 NSInteger eventId = createCalendarEvent();
 if (eventId) {
    resolve(@(eventId));
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }
}

```

A contraparte JavaScript deste método retorna uma Promise. Isso significa que você pode usar a palavra-chave `await` dentro de uma função async para chamá-lo e aguardar seu resultado:

```tsx
const onSubmit = async () => {
  try {
    const eventId = await CalendarModule.createCalendarEvent(
      'Party',
      'my house',
    );
    console.log(`Created a new event with id ${eventId}`);
  } catch (e) {
    console.error(e);
  }
};
```

### Enviando Eventos para JavaScript

Módulos nativos podem sinalizar eventos para JavaScript sem serem invocados diretamente. Por exemplo, você pode querer sinalizar para o JavaScript um lembrete de que um evento de calendário do aplicativo de calendário nativo do iOS ocorrerá em breve. A maneira preferida de fazer isso é criar uma subclasse de `RCTEventEmitter`, implementar `supportedEvents` e chamar self `sendEventWithName`:

Atualize sua classe header para importar `RCTEventEmitter` e criar uma subclasse de `RCTEventEmitter`:

```objectivec
//  CalendarModule.h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CalendarModule : RCTEventEmitter <RCTBridgeModule>
@end

```

O código JavaScript pode se inscrever nesses eventos criando uma nova instância `NativeEventEmitter` ao redor do seu módulo.

Você receberá um aviso se gastar recursos desnecessariamente emitindo um evento enquanto não há listeners. Para evitar isso e otimizar a carga de trabalho do seu módulo (por exemplo, cancelando a inscrição de notificações upstream ou pausando tarefas de segundo plano), você pode substituir `startObserving` e `stopObserving` na sua subclasse `RCTEventEmitter`.

```objectivec
@implementation CalendarModule
{
  bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if (hasListeners) {// Only send events if anyone is listening
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}

```

### Threading

A menos que o módulo nativo forneça sua própria fila de métodos, ele não deve fazer nenhuma suposição sobre em qual thread está sendo chamado. Atualmente, se um módulo nativo não fornece uma fila de métodos, o React Native criará uma fila GCD separada para ele e invocará seus métodos lá. Observe que este é um detalhe de implementação e pode mudar. Se você quiser fornecer explicitamente uma fila de métodos para um módulo nativo, substitua o método `(dispatch_queue_t) methodQueue` no módulo nativo. Por exemplo, se ele precisa usar uma API iOS somente para a thread principal, deve especificar isso via:

```objectivec
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
```

Da mesma forma, se uma operação pode levar muito tempo para ser concluída, o módulo nativo pode especificar sua própria fila para executar operações. Novamente, atualmente o React Native fornecerá uma fila de métodos separada para seu módulo nativo, mas este é um detalhe de implementação no qual você não deve confiar. Se você não fornecer sua própria fila de métodos, no futuro, as operações de longa execução do seu módulo nativo podem acabar bloqueando chamadas assíncronas sendo executadas em outros módulos nativos não relacionados. O módulo `RCTAsyncLocalStorage` aqui, por exemplo, cria sua própria fila para que a fila React não fique bloqueada esperando por acesso a disco potencialmente lento.

```objectivec
- (dispatch_queue_t)methodQueue
{
 return dispatch_queue_create("com.facebook.React.AsyncLocalStorageQueue", DISPATCH_QUEUE_SERIAL);
}
```

O `methodQueue` especificado será compartilhado por todos os métodos no seu módulo. Se apenas um dos seus métodos é de longa execução (ou precisa ser executado em uma fila diferente das outras por algum motivo), você pode usar `dispatch_async` dentro do método para executar o código daquele método específico em outra fila, sem afetar os outros:

```objectivec
RCT_EXPORT_METHOD(doSomethingExpensive:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
 dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
   // Call long-running code on background thread
   ...
   // You can invoke callback from any thread/queue
   callback(@[...]);
 });
}

```

:::info Compartilhando filas de dispatch entre módulos
O método `methodQueue` será chamado uma vez quando o módulo for inicializado e então retido pelo React Native, portanto não há necessidade de manter uma referência à fila você mesmo, a menos que deseje usá-la dentro do seu módulo. No entanto, se você deseja compartilhar a mesma fila entre vários módulos, precisará garantir que você retenha e retorne a mesma instância de fila para cada um deles.
:::

### Injeção de Dependência

O React Native criará e inicializará automaticamente qualquer módulo nativo registrado. No entanto, você pode querer criar e inicializar suas próprias instâncias de módulos para, por exemplo, injetar dependências.

Você pode fazer isso criando uma classe que implementa o Protocolo `RCTBridgeDelegate`, inicializando um `RCTBridge` com o delegate como argumento e inicializando um `RCTRootView` com a bridge inicializada.

```objectivec
id<RCTBridgeDelegate> moduleInitialiser = [[classThatImplementsRCTBridgeDelegate alloc] init];

RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:moduleInitialiser launchOptions:nil];

RCTRootView *rootView = [[RCTRootView alloc]
                        initWithBridge:bridge
                            moduleName:kModuleName
                     initialProperties:nil];
```

### Exportando Swift

Swift não tem suporte para macros, então expor módulos nativos e seus métodos para JavaScript dentro do React Native requer um pouco mais de configuração. No entanto, funciona de forma relativamente semelhante. Digamos que você tenha o mesmo `CalendarModule` mas como uma classe Swift:

```swift
// CalendarModule.swift

@objc(CalendarModule)
class CalendarModule: NSObject {

 @objc(addEvent:location:date:)
 func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
   // Date is ready to use!
 }

 @objc
 func constantsToExport() -> [String: Any]! {
   return ["someKey": "someValue"]
 }

}
```

:::note
É importante usar os modificadores `@objc` para garantir que a classe e as funções sejam exportadas adequadamente para o runtime Objective-C.
:::

Então crie um arquivo de implementação privado que registrará as informações necessárias com o React Native:

```objectivec
// CalendarModuleBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarModule, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)

@end
```

Para aqueles que são novos em Swift e Objective-C, sempre que você [mistura as duas linguagens em um projeto iOS](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html), você também precisará de um arquivo de bridging adicional, conhecido como bridging header, para expor os arquivos Objective-C ao Swift. O Xcode oferecerá criar este arquivo header para você se você adicionar seu arquivo Swift ao seu app através da opção de menu `File>New File` do Xcode. Você precisará importar `RCTBridgeModule.h` neste arquivo header.

```objectivec
// CalendarModule-Bridging-Header.h
#import <React/RCTBridgeModule.h>
```

Você também pode usar `RCT_EXTERN_REMAP_MODULE` e `_RCT_EXTERN_REMAP_METHOD` para alterar o nome JavaScript do módulo ou métodos que você está exportando. Para mais informações veja [`RCTBridgeModule`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTBridgeModule.h).

:::note
Importante ao fazer módulos de terceiros: Bibliotecas estáticas com Swift são suportadas apenas no Xcode 9 e posterior. Para que o projeto Xcode compile quando você usa Swift na biblioteca estática iOS que você inclui no módulo, seu projeto de app principal deve conter código Swift e um bridging header próprio. Se seu projeto de app não contiver nenhum código Swift, uma solução alternativa pode ser um único arquivo .swift vazio e um bridging header vazio.
:::

### Nomes de Métodos Reservados

#### invalidate()

Módulos nativos podem estar em conformidade com o protocolo [RCTInvalidating](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTInvalidating.h) no iOS implementando o método `invalidate()`. Este método [pode ser invocado](https://github.com/facebook/react-native/blob/0.62-stable/ReactCommon/turbomodule/core/platform/ios/RCTTurboModuleManager.mm#L456) quando a bridge nativa é invalidada (ou seja: no reload do modo dev). Use este mecanismo conforme necessário para fazer a limpeza necessária para seu módulo nativo.
