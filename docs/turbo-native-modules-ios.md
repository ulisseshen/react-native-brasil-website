---
ia-translated: true
id: turbo-native-modules-ios
title: 'Turbo Native Modules: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Agora é hora de escrever algum código da plataforma iOS para garantir que `localStorage` sobreviva após o aplicativo ser fechado.

## Prepare seu projeto Xcode

Precisamos preparar seu projeto iOS usando o Xcode. Após completar estes **6 passos**, você terá `RCTNativeLocalStorage` que implementa a interface `NativeLocalStorageSpec` gerada.

1. Abra o Workspace Xcode gerado pelo CocoaPods:

```bash
cd ios
open TurboModuleExample.xcworkspace
```

<img className="half-size" alt="Open Xcode Workspace" src="/docs/assets/turbo-native-modules/xcode/1.webp" />

2. Clique com o botão direito em app e selecione <code>New Group</code>, chame o novo grupo de `NativeLocalStorage`.

<img className="half-size" alt="Right click on app and select New Group" src="/docs/assets/turbo-native-modules/xcode/2.webp" />

3. No grupo `NativeLocalStorage`, crie <code>New</code>→<code>File from Template</code>.

<img className="half-size" alt="Create a new file using the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/3.webp" />

4. Use o <code>Cocoa Touch Class</code>.

<img className="half-size" alt="Use the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/4.webp"  />

5. Nomeie a Cocoa Touch Class como <code>RCTNativeLocalStorage</code> com a linguagem <code>Objective-C</code>.

<img className="half-size" alt="Create an Objective-C RCTNativeLocalStorage class" src="/docs/assets/turbo-native-modules/xcode/5.webp" />

6. Renomeie <code>RCTNativeLocalStorage.m</code> → <code>RCTNativeLocalStorage.mm</code> tornando-o um arquivo Objective-C++.

<img className="half-size" alt="Convert to and Objective-C++ file" src="/docs/assets/turbo-native-modules/xcode/6.webp" />

## Implemente localStorage com NSUserDefaults

Comece atualizando `RCTNativeLocalStorage.h`:

```objc title="NativeLocalStorage/RCTNativeLocalStorage.h"
//  RCTNativeLocalStorage.h
//  TurboModuleExample

#import <Foundation/Foundation.h>
// highlight-add-next-line
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

// highlight-remove-next-line
@interface RCTNativeLocalStorage : NSObject
// highlight-add-next-line
@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>

@end
```

Em seguida, atualize nossa implementação para usar `NSUserDefaults` com um [nome de suite](https://developer.apple.com/documentation/foundation/nsuserdefaults/1409957-initwithsuitename) customizado.

```objc title="NativeLocalStorage/RCTNativeLocalStorage.mm"
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RCTNativeLocalStorage()
@property (strong, nonatomic) NSUserDefaults *localStorage;
@end

@implementation RCTNativeLocalStorage

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}

- (void)setItem:(NSString *)value
          key:(NSString *)key {
  [self.localStorage setObject:value forKey:key];
}

- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

+ (NSString *)moduleName
{
  return @"NativeLocalStorage";
}

@end
```

Coisas importantes a observar:

- Você pode usar o Xcode para pular para o Codegen `@protocol NativeLocalStorageSpec`. Você também pode usar o Xcode para gerar stubs para você.

## Registre o Native Module em seu app

O último passo consiste em atualizar o `package.json` para informar ao React Native sobre o link entre as specs JS do Native Module e a implementação concreta dessas specs em código nativo.

Modifique o `package.json` da seguinte forma:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   "codegenConfig": {
     "name": "AppSpecs",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.sampleapp.specs"
     },
     // highlight-add-start
     "ios": {
        "modulesProvider": {
          "NativeLocalStorage": "RCTNativeLocalStorage"
        }
     }
     // highlight-add-end
   },

   "dependencies": {
```

Neste ponto, você precisa reinstalar os pods para garantir que o codegen execute novamente para gerar os novos arquivos:

```bash
# from the ios folder
bundle exec pod install
open SampleApp.xcworkspace
```

Se você agora compilar seu aplicativo a partir do Xcode, você deve conseguir compilar com sucesso.

## Compile e execute seu código em um Simulator

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">
```bash
npm run ios
```
</TabItem>
<TabItem value="yarn">
```bash
yarn run ios
```
</TabItem>
</Tabs>

<video width="30%" height="30%" playsinline="true" autoplay="true" muted="true" loop="true">
    <source src="/docs/assets/turbo-native-modules/turbo-native-modules-ios.webm" type="video/webm" />
    <source src="/docs/assets/turbo-native-modules/turbo-native-modules-ios.mp4" type="video/mp4" />
</video>
