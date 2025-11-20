<!-- ia-translated: true -->
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# Ciclo de Vida dos Native Modules

No React Native, os Native Modules são singleton. A infraestrutura de Native Module cria preguiçosamente um Native Module na primeira vez que ele é acessado e o mantém sempre que o app precisar dele. Esta é uma otimização de performance que nos permite evitar o overhead de criar Native Modules eagerly, no início do app, e garante tempos de inicialização mais rápidos.

Em um app React Native puro, os Native Modules são criados uma vez e nunca são destruídos. No entanto, em apps mais complexos, pode haver casos de uso onde os Native Modules são destruídos e recriados. Imagine, por exemplo, um app brownfield que mistura algumas views nativas com algumas surfaces React Native, como apresentado no [guia Integração com Apps Existentes](/docs/integration-with-existing-apps). Nesse caso, pode fazer sentido destruir uma instância React Native quando o usuário navega para fora de uma surface React Native e recriá-la quando o usuário navega de volta para aquela surface.

Quando isso acontece, Native Modules que são stateless não causarão problemas. No entanto, para Native Modules stateful, pode ser necessário invalidar adequadamente o Native Module para garantir que o estado seja resetado e os recursos liberados.

Neste guia, você explorará como inicializar e invalidar um Native Module adequadamente. Este guia assume que você está familiarizado com como escrever Native Modules e está confortável escrevendo código nativo. Se você não está familiarizado com Native Modules, por favor leia o [guia de Native Modules](/docs/next/turbo-native-modules-introduction) primeiro.

## Android

Quando se trata de Android, todos os Native Modules já implementam uma interface [TurboModule](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/turbomodule/core/interfaces/TurboModule.kt) que define dois métodos: `initialize()` e `invalidate()`.

O método `initialize()` é chamado pela infraestrutura de Native Module quando o Native Module é criado. Este é o melhor lugar para colocar todo o código de inicialização que precisa acessar o ReactApplicationContext, por exemplo. Estes são alguns Native Modules do core que implementam o método `initialize()`: [BlobModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/blob/BlobModule.java#L155-L157), [NetworkingModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/network/NetworkingModule.java#L193-L197).

O método `invalidate()` é chamado pela infraestrutura de Native Module quando o Native Module é destruído. Este é o melhor lugar para colocar todo o código de limpeza, resetando o estado do Native Module e liberando recursos que não são mais necessários, como memória e arquivos. Estes são alguns Native Modules do core que implementam o método `invalidate()`: [DeviceInfoModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/deviceinfo/DeviceInfoModule.kt#L72-L76), [NetworkModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/network/NetworkingModule.java#L200-L212)

## iOS

No iOS, os Native Modules estão em conformidade com o protocolo [`RCTTurboModule`](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactCommon/react/nativemodule/core/platform/ios/ReactCommon/RCTTurboModule.h#L196-L200). No entanto, este protocolo não expõe os métodos `initialize` e `invalidate` que são expostos pela classe `TurboModule` do Android.

Em vez disso, no iOS, existem dois protocolos adicionais: [`RCTInitializing`](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/Base/RCTInitializing.h) e [`RCTInvalidating`](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/Base/RCTInvalidating.h). Estes protocolos são usados para definir os métodos `initialize` e `invalidate`, respectivamente.

Se o seu módulo precisa executar algum código de inicialização, então você pode estar em conformidade com o protocolo `RCTInitializing` e implementar o método `initialize`. Para fazer isso, você precisa:

1. Modificar o arquivo `NativeModule.h` adicionando as seguintes linhas:

```diff title="NativeModule.h"
+ #import <React/RCTInitializing.h>

//...

- @interface NativeModule : NSObject <NativeModuleSpec>
+ @interface NativeModule : NSObject <NativeModuleSpec, RCTInitializing>
//...
@end
```

2. Implementar o método `initialize` no arquivo `NativeModule.mm`:

```diff title="NativeModule.mm"
// ...

@implementation NativeModule

+- (void)initialize {
+ // add the initialization code here
+}

@end
```

Estes são alguns Native Modules do core que implementam o método `initialize`: [RCTBlobManager](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/Libraries/Blob/RCTBlobManager.mm#L58-L68), [RCTTiming](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/CoreModules/RCTTiming.mm#L121-L124).

Se o seu módulo precisa executar algum código de limpeza, então você pode estar em conformidade com o protocolo `RCTInvalidating` e implementar o método `invalidate`. Para fazer isso, você precisa:

1. Modificar o arquivo `NativeModule.h` adicionando as seguintes linhas:

```diff title="NativeModule.h"
+ #import <React/RCTInvalidating.h>

//...

- @interface NativeModule : NSObject <NativeModuleSpec>
+ @interface NativeModule : NSObject <NativeModuleSpec, RCTInvalidating>

//...

@end
```

2. Implementar o método `invalidate` no arquivo `NativeModule.mm`:

```diff title="NativeModule.mm"

// ...

@implementation NativeModule

+- (void)invalidate {
+ // add the cleanup code here
+}

@end
```

Estes são alguns Native Modules do core que implementam o método `invalidate`: [RCTAppearance](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/CoreModules/RCTAppearance.mm#L151-L155), [RCTDeviceInfo](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/CoreModules/RCTDeviceInfo.mm#L127-L133).
