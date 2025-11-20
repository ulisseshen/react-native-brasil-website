<!-- ia-translated: true -->
# iOS - Usando Swift nos seus Native Modules

Swift é a linguagem oficial e padrão para desenvolver aplicações nativas no iOS.

Neste guia, você vai explorar como escrever seus Native Modules usando Swift.

:::note
O núcleo do React Native é principalmente escrito em C++ e a interoperabilidade entre Swift e C++ não é ótima, apesar da [camada de interoperabilidade](https://www.swift.org/documentation/cxx-interop/) desenvolvida pela Apple.

Portanto, o módulo que você vai escrever neste guia não será uma implementação Swift pura devido às incompatibilidades entre as linguagens. Você terá que escrever algum código de ligação em Objective-C++, mas o objetivo do guia é minimizar a quantidade de código Objective-C++ necessária. Se você está migrando Native Modules existentes da arquitetura legada para a Nova Arquitetura, essa abordagem deve permitir que você reutilize a maior parte do código.
:::

Este guia começa a partir da implementação iOS do guia de [Native Module](/docs/next/turbo-native-modules-introduction).
Certifique-se de estar familiarizado com aquele guia antes de mergulhar neste, potencialmente implementando o exemplo do guia.

## O padrão Adapter

O objetivo é implementar toda a nossa lógica de negócio usando um módulo Swift e ter uma camada de ligação fina em Objective-C++ que seja capaz de conectar o app com a implementação Swift.

Você pode conseguir isso aproveitando o padrão de design [Adapter](https://en.wikipedia.org/wiki/Adapter_pattern), para conectar o módulo Swift com a camada Objective-C++.

O objeto Objective-C++ é criado pelo React Native e ele mantém uma referência ao módulo Swift, gerenciando seu ciclo de vida. O objeto Objective-C++ encaminha todas as invocações de métodos para o Swift.

### Criando o módulo Swift

O primeiro passo é mover a implementação da camada Objective-C++ para a camada Swift.

Para conseguir isso, siga estes passos:

1. Crie um novo arquivo vazio no projeto Xcode, e chame-o de `NativeLocalStorage.swift`
2. Adicione a implementação no seu módulo Swift como segue:

```swift title="NativeLocalStorage.swift"
import Foundation

@objcMembers public class NativeLocalStorage: NSObject {
  let userDefaults = UserDefaults(suiteName: "local-storage");

  public func getItem(for key: String) -> String? {
    return userDefaults?.string(forKey: key)
  }

  public func setItem(for key: String, value: String) {
    userDefaults?.set(value, forKey: key)
  }

  public func removeItem(for key: String) {
    userDefaults?.removeObject(forKey: key)
  }

  public func clear() {
    userDefaults?.dictionaryRepresentation().keys.forEach { removeItem(for: $0) }
  }
}

```

Note que você tem que declarar todos os métodos que você precisa chamar do Objective-C como `public` e com a anotação `@objc`.
Lembre-se também de fazer sua classe herdar de `NSObject`, caso contrário não seria possível usá-la do Objective-C.

### Atualize o arquivo `RCTNativeLocalStorage`

Então, você precisa atualizar a implementação do `RCTNativeLocalStorage` para ser capaz de criar o módulo Swift e chamar seus métodos.

1. Abra o arquivo `RCTNativeLocalStorage.mm`
2. Atualize-o como segue:

```diff title="RCTNativeLocalStorage.mm"
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"
+#import "SampleApp-Swift.h"

- static NSString *const RCTNativeLocalStorageKey = @"local-storage";

-@interface RCTNativeLocalStorage()
-@property (strong, nonatomic) NSUserDefaults *localStorage;
-@end

-@implementation RCTNativeLocalStorage
+@implementation RCTNativeLocalStorage {
+    NativeLocalStorage *storage;
+}

-RCT_EXPORT_MODULE(NativeLocalStorage)

 - (id) init {
   if (self = [super init]) {
-    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
+    storage = [NativeLocalStorage new];
   }
   return self;
 }

 - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
   return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
 }

 - (NSString * _Nullable)getItem:(NSString *)key {
-   return [self.localStorage stringForKey:key];
+   return [storage getItemFor:key];
 }

 - (void)setItem:(NSString *)value key:(NSString *)key {
-   [self.localStorage setObject:value forKey:key];
+   [storage setItemFor:key value:value];
 }

 - (void)removeItem:(NSString *)key {
-   [self.localStorage removeObjectForKey:key];
+   [storage removeItemFor:key];
 }

 - (void)clear {
-   NSDictionary *keys = [self.localStorage dictionaryRepresentation];
-   for (NSString *key in keys) {
-     [self removeItem:key];
-   }
+  [storage clear];
 }

++ (NSString *)moduleName
+{
+  return @"NativeLocalStorage";
+}

@end
```

O código não mudou muito. Em vez de criar uma referência ao `NSUserDefaults` diretamente, você cria um novo `NativeLocalStorage` usando a implementação Swift e, sempre que uma função de Native Module é invocada, a invocação é encaminhada ao `NativeLocalStorage` implementado em Swift.

Lembre-se de importar o header `"SampleApp-Swift.h"`. Este é um header gerado automaticamente pelo Xcode que contém a API pública dos seus arquivos Swift, em um formato que é consumível pelo Objective-C. A parte `SampleApp` do header é na verdade o nome do seu App, então se você criou o app com um nome **diferente** de `SampleApp`, você terá que alterá-lo.

Note também que a macro `RCT_EXPORT_MODULE` não é mais necessária, porque os Native Modules são registrados usando o `package.json` conforme descrito [aqui](/docs/next/turbo-native-modules-introduction?platforms=ios#register-the-native-module-in-your-app).

Esta abordagem introduz um pouco de duplicação de código nas interfaces, mas permite que você reutilize o código Swift que você já pode ter na sua base de código, com pouco esforço extra.

### Implementando o Bridging Header

:::note
Se você é um autor de biblioteca, desenvolvendo um Native Module que será distribuído como uma biblioteca separada, este passo não é necessário.
:::

O último passo necessário para conectar o código Swift com a contraparte Objective-C++ é um bridging header.

Um bridging header é um header onde você pode importar todos os arquivos de header Objective-C que precisam ser visíveis pelo seu código Swift.

Você pode já ter um bridging header na sua base de código, mas caso não tenha, você pode criar um novo seguindo estes passos:

1. No Xcode, crie um novo arquivo e chame-o de `"SampleApp-Bridging-Header.h"`
2. Atualize o conteúdo do `"SampleApp-Bridging-Header.h"` assim:

```diff title="SampleApp-Bridging-Header.h"
//
//  Use this file to import your target's public headers that you would like to expose to Swift.
//

+ #import <React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
```

3. Vincule o Bridging header no seu projeto:
   1. No navegador de projeto, selecione o nome do seu app (`SampleApp`, à esquerda)
   2. Clique em `Build Settings`
   3. Filtre por `"Bridging Header"`
   4. Adicione o caminho relativo ao "Bridging Header", no exemplo é `SampleApp-Bridging-Header.h`

![Bridging Header](/docs/assets/BridgingHeader.png)

## Compile e Execute seu App

Agora você pode seguir o último passo do [guia de Native Module](/docs/turbo-native-modules-introduction#build-and-run-your-code-on-a-simulator) e você deve ver seu app executando com um Native Module escrito em Swift.
