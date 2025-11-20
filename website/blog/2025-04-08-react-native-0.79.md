---
ia-translated: true
title: 'React Native 0.79 - Ferramentas mais rápidas e muito mais'
authors: [alanjhughes, shubham, fabriziocucci, cortinico]
tags: [engineering]
date: 2025-04-08
---

# React Native 0.79 - Ferramentas mais rápidas, inicialização mais rápida e muito mais

Hoje estamos animados em lançar o React Native 0.79!

Esta versão traz melhorias de performance em várias frentes, além de diversas correções de bugs. Primeiro, o Metro agora inicia mais rápido graças ao hashing diferido, e tem suporte estável para exports de pacotes. O tempo de inicialização no Android também será melhorado graças a mudanças na compressão do bundle JS e muito mais.

### Destaques

- [Novos Recursos do Metro](/blog/2025/04/08/react-native-0.79#metro-faster-startup-and-package-exports-support)
- [JSC Movendo para um Pacote da Comunidade](/blog/2025/04/08/react-native-0.79#jsc-moving-to-community-package)
- [iOS: Registro de Native Modules Compatível com Swift](/blog/2025/04/08/react-native-0.79#ios-swift-compatible-native-modules-registration)
- [Android: Inicialização Mais Rápida do App](/blog/2025/04/08/react-native-0.79#android-faster-app-startup)
- [Remoção do Remote JS Debugging](/blog/2025/04/08/react-native-0.79#removal-of-remote-js-debugging)

<!--truncate-->

## Destaques

### Metro: Inicialização mais rápida e suporte a exports de pacotes

Esta versão vem com o [Metro 0.82](https://github.com/facebook/metro/releases/tag/v0.82.0). Esta versão usa hashing diferido para melhorar a velocidade do primeiro `yarn start` tipicamente em mais de 3x (mais em projetos maiores e monorepos), tornando sua experiência de desenvolvimento e builds de CI mais rápidos no dia a dia.

![metro startup comparison](../static/blog/assets/0.79-metro-startup-comparison.gif)

Também no Metro 0.82, estamos promovendo a resolução dos campos `"exports"` e `"imports"` do `package.json` para estável. A resolução de `"exports"` foi [introduzida no React Native 0.72](/blog/2023/06/21/package-exports-support), e o suporte a `"imports"` foi adicionado em uma contribuição da comunidade - ambos agora estarão habilitados por padrão para todos os projetos no React Native 0.79.

Isso melhora a compatibilidade com dependências npm modernas e abre novas maneiras compatíveis com os padrões de organizar seus projetos.

:::warning Breaking change

Embora tenhamos testado `"exports"` do `package.json` na comunidade por um tempo, essa mudança pode ser uma breaking change para certos pacotes e configurações de projeto.

Em particular, estamos cientes de incompatibilidades relatadas por usuários para alguns pacotes populares, incluindo Firebase e AWS Amplify, e estamos trabalhando para corrigi-los na origem.

Se você estiver encontrando problemas:

- Por favor, atualize para o [hotfix 0.81.5](https://github.com/facebook/metro/releases/tag/v0.81.5) do Metro, ou defina [`resolver.unstable_enablePackageExports = false`](https://metrobundler.dev/docs/configuration/#unstable_enablepackageexports-experimental) para desativar.
- Veja [expo/expo#36551](https://github.com/expo/expo/discussions/36551) para pacotes afetados e atualizações futuras.

:::

### JSC Movendo para Pacote da Comunidade

Como parte de nosso esforço para reduzir a superfície de API do React Native, estamos no processo de mover o engine JavaScriptCore (JSC) para um pacote mantido pela comunidade: `@react-native-community/javascriptcore`

Esta mudança não afetará usuários que estão usando Hermes.

A partir do React Native 0.79, você pode usar uma versão suportada pela comunidade do JSC seguindo as [instruções de instalação no readme](https://github.com/react-native-community/javascriptcore#installation). A versão do JSC fornecida pelo core do React Native ainda estará disponível na 0.79, mas estamos planejando removê-la [em um futuro próximo](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0836-lean-core-jsc.md).

Mover o JSC para um pacote mantido pela comunidade nos permitirá atualizar a versão do JSC com mais frequência e oferecer a você os recursos mais recentes. O JSC mantido pela comunidade seguirá um cronograma de lançamento separado do React Native.

### iOS: Registro de Native Modules Compatível com Swift

Nesta versão, estamos reformulando a maneira como você pode registrar seu Native Module no runtime do React Native. A nova abordagem segue a mesma abordagem de componentes, descrita na [documentação oficial](/docs/next/the-new-architecture/using-codegen#configuring-codegen).

A partir desta versão do React Native, você pode registrar seus módulos modificando o arquivo `package.json`. Introduzimos um novo campo `modulesProvider` na propriedade `ios`:

```diff
"codegenConfig": {
    "ios": {
+       "modulesProvider": {
+         "JS Name for the module": "ObjC Module provider for the pure C++ TM or a class conforming to RCTTurboModule"
+     }
   }
}
```

O Codegen cuidará de criar todo o código relevante a partir do seu arquivo `package.json`.

Se você usar um Native Module C++ puro, terá que seguir esta configuração recomendada:

<details>
<summary>Configure Native Modules C++ puros em seu app</summary>

Para Native Modules C++ puros, você precisa adicionar uma nova classe ObjectiveC++ para colar o Native Module C++ com o resto do App:

```objc title="CppNativeModuleProvider.h"
#import <Foundation/Foundation.h>
#import <ReactCommon/RCTTurboModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface <YourNativeModule>Provider : NSObject <RCTModuleProvider>

@end
```

```objc title="CppNativeModuleProvider.mm"
NS_ASSUME_NONNULL_END

#import "<YourNativeModule>Provider.h"
#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>
#import "<YourNativeModule>.h"

@implementation NativeSampleModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeSampleModule>(params.jsInvoker);
}
```

</details>

Com esta nova abordagem, unificamos o registro de Native Modules tanto para desenvolvedores de apps quanto para mantenedores de bibliotecas. As bibliotecas podem especificar as mesmas propriedades em seu `package.json` e o Codegen cuidará do resto.

Esta abordagem resolve a limitação que introduzimos na 0.77 que impedia o registro de um Native Module C++ puro com um `AppDelegate` Swift. Como você pode ver, nenhuma dessas mudanças modifica o `AppDelegate` e o código gerado funcionará para `AppDelegate` implementado tanto com Swift quanto com Objective-C.

### Android: Inicialização Mais Rápida do App

Também estamos lançando uma mudança para melhorar seu tempo de inicialização no Android em uma quantidade significativa.

A partir desta versão, não estaremos mais comprimindo o bundle JavaScript dentro do APK. Anteriormente, o sistema Android precisava descomprimir o bundle JavaScript antes que seu app pudesse iniciar. Isso estava causando uma desaceleração significativa durante a inicialização do app.

A partir desta versão, estaremos enviando o bundle JavaScript descomprimido por padrão, então seus apps Android geralmente iniciarão mais rápido.

O time da [Margelo](https://margelo.com) testou este recurso no app Discord e obteve um ganho de performance significativo: o time-to-interactive (TTI) do Discord foi reduzido em 400ms, o que foi uma melhoria de 12% com uma mudança de uma linha (testado em um Samsung A14).

Por outro lado, armazenar o bundle descomprimido resultará em um maior consumo de espaço para sua aplicação no dispositivo do usuário. Se isso é uma preocupação para você, você pode alternar este comportamento usando a propriedade `enableBundleCompression` no seu arquivo `app/build.gradle`.

```kotlin title="app/build.gradle"
react {
  // ...
  // If you want to compress the JS bundle (slower startup, less
  // space consumption)
  enableBundleCompression = true
  // If don't you want to compress the JS bundle (faster startup,
  // higher space consumption)
  enableBundleCompression = false

  // Default is `false`
}
```

Por favor, note que o tamanho do APK aumentará nesta versão, mas seus usuários não pagarão o custo extra no tamanho de download do APK, pois os APKs são comprimidos quando baixados da rede.

## Breaking Changes

### Remoção do Remote JS Debugging

Como parte de nossos esforços contínuos para melhorar a depuração, estamos removendo o Remote JS Debugging via Chrome. Este método de depuração legado foi descontinuado [e movido para um opt-in de runtime no React Native 0.73](/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks#remote-javascript-debugging). Por favor, use o [React Native DevTools](/docs/react-native-devtools) para depuração moderna e confiável.

Isso também significa que o React Native não é mais compatível com o projeto da comunidade [react-native-debugger](https://github.com/jhen0409/react-native-debugger). Para desenvolvedores que querem usar extensões de depuração de terceiros, como Redux DevTools, recomendamos [Expo DevTools Plugins](https://github.com/expo/dev-plugins), ou integrar as versões standalone dessas ferramentas.

Leia mais neste [post dedicado](https://github.com/react-native-community/discussions-and-proposals/discussions/872).

### Módulos internos atualizados para sintaxe `export`

Como parte da modernização de nossa base de código JavaScript, atualizamos vários módulos de implementação dentro do `react-native` para usar consistentemente a sintaxe `export` em vez de `module.exports`.

Atualizamos cerca de **46 APIs** no total, que podem ser encontradas no [changelog](https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0790).

Esta mudança tem um impacto sutil nas importações existentes:

<details>
<summary>**Caso 1: Default export**</summary>

```diff
  // CHANGED - require() syntax
- const ImageBackground = require('react-native/Libraries/Image/ImageBackground');
+ const ImageBackground = require('react-native/Libraries/Image/ImageBackground').default;

// Unchanged - import syntax
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

// RECOMMENDED - root import
import {ImageBackground} from 'react-native';

```

</details>

<details>

<summary>**Caso 2: Secondary exports**</summary>

Existem muito poucos casos deste padrão, novamente não afetados ao usar a importação raiz `'react-native'`.

```diff
  // Unchanged - require() syntax
  const BlobRegistry = require('react-native/Libraries/Blob/BlobRegistry');

  // Unchanged - require() syntax with destructuring
  const {register, unregister} = require('react-native/Libraries/Blob/BlobRegistry');

  // CHANGED - import syntax as single object
- import BlobRegistry from 'react-native/Libraries/Blob/BlobRegistry';
+ import * as BlobRegistry from 'react-native/Libraries/Blob/BlobRegistry';


  // Unchanged - import syntax with destructuring
  import {register, unregister} from 'react-native/Libraries/Blob/BlobRegistry';

  // RECOMMENDED - root import
  import {BlobRegistry} from 'react-native';
```

</details>

Esperamos que o impacto desta mudança seja extremamente limitado, particularmente para projetos escritos em TypeScript e usando sintaxe `import`. Por favor, verifique quaisquer erros de tipo para atualizar seu código.

:::tip

**A importação raiz react-native é fortemente recomendada**

Como uma conclusão geral, recomendamos fortemente importar do caminho raiz `'react-native'`, para evitar breaking changes desnecessárias no futuro. Em nossa próxima versão, descontinuaremos as importações profundas, como parte de uma melhor definição da API JavaScript pública do React Native ([veja o RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894)).

:::

### Outras Breaking Changes

Esta lista contém uma série de outras breaking changes que suspeitamos que podem ter um impacto menor no código do seu produto e que valem a pena mencionar.

- **Comprimentos sem unidade inválidos em box shadows e filters**:
  - Para tornar o React Native mais compatível com as especificações CSS/Web, não suportamos mais comprimentos sem unidade em `box-shadow` e `filter`. Isso significa que se você estava usando um `box-shadow` de `1 1 black`, não iremos renderizar. Você deve em vez disso especificar unidades como `1px 1px black`
- **Remover suporte de sintaxe hwb() incorreta de normalize-color:**
  - Para tornar o React Native mais compatível com as especificações CSS/Web, agora restringimos algumas sintaxes inválidas para `hwb()`. Historicamente o React Native costumava suportar valores separados por vírgula (por exemplo, `hwb(0, 0%, 100%)`) que agora não suportamos mais (você deve migrar para `hwb(0 0% 100%)`). Você pode ler mais sobre esta mudança [aqui](https://github.com/facebook/react-native/commit/676359efd9e478d69ad430cff213acc87b273580).
- **Atualização de exports do Libraries/Core/ExceptionsManager**
  - Como parte de nosso esforço para modernizar a API JS do React Native, atualizamos <code>[ExceptionsManager](https://github.com/facebook/react-native/blob/0.79-stable/packages/react-native/Libraries/Core/ExceptionsManager.js)</code> para agora exportar um objeto `ExceptionsManager` padrão, e `SyntheticError` como uma exportação secundária.

## Agradecimentos

O React Native 0.79 contém mais de 944 commits de 100 contribuidores. Obrigado por todo seu trabalho duro!

Queremos enviar um agradecimento a esses membros da comunidade que enviaram contribuições significativas nesta versão:

- [Marc Rousavy](https://github.com/mrousavy) por desenvolver e documentar o recurso "Android: Faster App Startup"
- [Kudo Chien](https://github.com/Kudo) e [Oskar Kwaśniewski](https://github.com/okwasniewski) por trabalhar no pacote `@react-native-community/javascriptcore` e escrever a seção "JSC moving to Community Package"
- [James Lawson](https://github.com/facebook/metro/pull/1302) por adicionar suporte para resolução de subpath de import [no Metro](https://github.com/facebook/metro/pull/1302).

Além disso, também queremos agradecer aos autores adicionais que trabalharam documentando recursos neste post de versão:

- [Rob Hogan](https://github.com/robhogan) pela seção "New Metro Features"
- [Alex Hunt](https://github.com/huntie) pelas seções "Removal of Remote JS Debugging" e "Internal modules updated to export syntax"
- [Riccardo Cipolleschi](https://github.com/cipolleschi) pelo trabalho no registro de Native Module para iOS

## Atualizar para 0.79

Por favor, use o [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) para visualizar as mudanças de código entre versões do React Native para projetos existentes, além dos documentos de Atualização.

Para criar um novo projeto:

```sh
npx @react-native-community/cli@latest init MyProject --version latest
```

Se você usa Expo, o React Native 0.79 será suportado no próximo Expo SDK 53 como a versão padrão do React Native.

:::info

0.79 agora é a versão estável mais recente do React Native e 0.76.x passa para não suportada. Para mais informações, veja a [política de suporte do React Native](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md). Pretendemos publicar uma atualização final de fim de vida da 0.76 em um futuro próximo.

:::
