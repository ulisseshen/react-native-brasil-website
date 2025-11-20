---
ia-translated: true
title: 'React Native 0.78 - React 19 e mais'
authors: [vonovak, shubham, fabriziocucci, cipolleschi]
tags: [engineering]
date: 2025-02-19
---

# React Native 0.78 - React 19 e mais

Hoje estamos empolgados em lançar o React Native 0.78!

Este lançamento traz o React 19 para o React Native e alguns outros recursos relevantes como suporte nativo para Android Vector drawables e melhor integração brownfield para iOS.

### Destaques

- [React 19](/blog/2025/02/19/react-native-0.78#react-19)
- [Em direção a lançamentos menores e mais rápidos](/blog/2025/02/19/react-native-0.78#towards-smaller-and-faster-releases)
- [Opt-in para logs JavaScript no Metro](/blog/2025/02/19/react-native-0.78#opt-in-for-javascript-logs-in-metro)
- [Adicionado suporte para XML drawables do Android](/blog/2025/02/19/react-native-0.78#added-support-for-android-xml-drawables)
- [ReactNativeFactory no iOS](/blog/2025/02/19/react-native-0.78#reactnativefactory-on-ios)

<!--truncate-->

## Destaques

### React 19

O React 19 agora está disponível no React Native!

O React 19 requer atualização do seu app, pois introduzimos algumas mudanças do React 18. Por exemplo, removemos algumas APIs como `propTypes`, e você precisa ajustar seu app para torná-lo compatível com a nova versão do React.

Siga nossas [instruções passo a passo para atualizar](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) seu app para o React 19.

Após a migração, você poderá aproveitar todos os novos recursos do React, incluindo (não exaustivamente):

- **[Actions](https://react.dev/blog/2024/12/05/react-19#actions):** são funções que usam transições assíncronas. Transições assíncronas gerenciam automaticamente o envio de dados para você: elas lidam com estados pendentes, atualizações otimistas, tratamento de erros e mais.
- **[useActionState](https://react.dev/reference/react/useActionState):** um hook utilitário construído em cima de Actions. Ele recebe uma função e retorna uma Action encapsulada para chamar. Quando a action é chamada, ela retornará o último resultado da Action e seu estado `pending`.
- **[useOptimistic](https://react.dev/reference/react/useOptimistic):** um novo hook que simplifica mostrar o estado final de uma atualização otimisticamente enquanto a requisição assíncrona está em andamento. Se a requisição der erro, o React mudará de volta para o valor anterior automaticamente.
- **[`use`](https://react.dev/reference/react/use):** esta é uma nova API que permite acesso a recursos durante a renderização. Você agora pode ler uma promise ou um context com `use` e o React fará Suspend até que sejam resolvidos.
- **[`ref` como `props`](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop):** você agora pode passar `ref` como uma `prop` como você faz com qualquer outra prop. Componentes de função não precisarão mais de `forwardRef` e você pode migrar seus componentes agora.
- E muitos outros

Para uma lista completa dos novos recursos disponíveis, dê uma olhada no [post do blog de lançamento do React 19](https://react.dev/blog/2024/12/05/react-19).

#### React Compiler

O React Compiler é uma ferramenta de tempo de build projetada para otimizar aplicações React aplicando automaticamente memoização. Embora desenvolvedores possam usar manualmente APIs como `useMemo`, `useCallback` e `React.memo` para prevenir recomputação desnecessária de partes não modificadas de um app, eles também podem esquecer ou usar incorretamente essas otimizações. O React Compiler resolve isso aproveitando sua compreensão de JavaScript e das [Regras do React](https://react.dev/reference/rules) para memoizar automaticamente valores ou grupos de valores dentro de componentes e hooks.

Com este lançamento, simplificamos o processo para habilitar o React Compiler em seus apps React Native. [Em versões anteriores](https://react.dev/learn/react-compiler#using-react-compiler-with-react-17-or-18), você tinha que instalar dois pacotes: o compilador e seu runtime. Depois que esses pacotes eram instalados, você tinha que configurar um plugin Babel para habilitar o React Compiler através do Metro.

Agora, você só precisa instalar o compilador em si e configurar o plugin Babel. Para aprender como habilitá-lo, você pode seguir nosso [guia](https://react.dev/learn/react-compiler#usage-with-babel) passo a passo.

Para verificar que o compilador está rodando, você pode abrir o React Native DevTools: você deve ver que os componentes que estão memoizados têm a tag `Memo ✨` anexada a eles no Component Inspector.

Se você quiser aprender mais sobre o React Compiler, estes são recursos úteis:

- Documentação do [React Compiler](https://react.dev/learn/react-compiler)
- [React Compiler Deep Dive](https://www.youtube.com/watch?v=uA_PVyZP7AI)

### Em direção a lançamentos menores e mais rápidos

Estamos atualizando nosso processo de lançamento para entregar lançamentos estáveis do React Native com mais frequência em 2025.

Será mais fácil para você atualizar a versão do React Native porque estaremos reduzindo o número de breaking changes que entregamos. Lançamentos mais rápidos também significa que todas as correções de bugs que entregamos internamente estão chegando a você mais cedo, e você pode se beneficiar dos recursos mais recentes que desenvolvemos dentro do React Native.

Acreditamos que este novo modelo beneficiará todos os desenvolvedores no ecossistema React Native, já que menos breaking changes significa um framework mais estável no qual todos podem confiar.

### Opt-in para logs JavaScript no Metro

Adicionamos um opt-in para restaurar o streaming de logs JavaScript via servidor dev do Metro, [removido anteriormente no 0.77](/blog/2025/01/21/version-0.77#removal-of-consolelog-streaming-in-metro) para usuários do Community CLI. Isso é em resposta ao feedback dos usuários, bem como à revisão de onde estamos com nossas ofertas de substituição hoje.

Para fazer opt-in, use a nova flag `--client-logs`. Isso também pode ter um alias via script npm para conveniência.

```sh
npx @react-native-community/cli start --client-logs
```

O streaming de logs no Metro ainda será removido no futuro e permanece desligado por padrão. No entanto, pretendemos dar aos desenvolvedores um período de migração mais longo para se adaptar a essa mudança.

Esta atualização também será disponibilizada no próximo lançamento menor 0.77.1.

### Adicionado suporte para XML drawables do Android

No React Native 0.78, estamos entregando uma nova maneira de carregar ícones, ilustrações e outros elementos gráficos no Android como [recursos XML](https://developer.android.com/guide/topics/resources/drawable-resource). Isso significa que você pode usar [vector drawables](https://developer.android.com/develop/ui/views/graphics/vector-drawable-resources) para exibir imagens vetoriais em qualquer escala sem perder qualidade, ou [shape drawables](https://developer.android.com/guide/topics/resources/drawable-resource#Shape) para desenhar embelezamentos mais básicos. Tudo isso é suportado pelo mesmo componente `Image` que você conhece e adora. Para usar este recurso hoje, você pode importar recursos XML como qualquer outro [recurso estático](/docs/next/images#static-image-resources) referenciando-os na prop `source`. Além disso, usar recursos XML em vez de bitmaps também ajudará você a reduzir o tamanho da sua aplicação e resultará em melhor renderização em telas com diferentes DPIs.

```js
// via require
<Image
  source={require('./img/my_icon.xml')}
  style={{width: 40, height: 40}}
/>;

// or via import
import MyIcon from './img/my_icon.xml';
<Image source={MyIcon} style={{width: 40, height: 40}} />;
```

#### Performance & Qualidade

[Como todos os outros tipos de imagem](/docs/next/images#off-thread-decoding), os recursos XML do Android são carregados e inflados fora da thread principal para que você não perca nenhum frame. Isso significa que o recurso não tem garantia de exibição instantânea, mas também não impede entrada do usuário enquanto o recurso está carregando. Decodificação off-thread é especialmente importante quando você precisa renderizar muitos ícones ao mesmo tempo. Apps internos perceberam algumas melhorias significativas de performance ao usar vector drawables do Android.

Utilizar tipos de recursos como vector drawables são a maneira perfeita de exibir imagens sem perda de qualidade, e podem resultar em arquivos APK menores já que você não precisa incluir um tipo de imagem para cada densidade de tela. Além disso, vector drawables são copiados da memória uma vez que são carregados, então se você renderizar o mesmo ícone mais de uma vez, todos serão exibidos ao mesmo tempo.

#### Trade-offs

É importante notar que recursos XML drawable não são perfeitos, e existem restrições para usá-los:

- Eles devem ser referenciados no tempo de build da sua aplicação Android. Esses recursos são passados para uma etapa de build com a [Android Asset Packaging Tool](https://developer.android.com/tools/aapt2) (AAPT) para converter XML bruto em XML binário. O Android não suporta carregar arquivos XML brutos, [esta é uma limitação conhecida](https://issuetracker.google.com/issues/62435069).
- Eles não podem ser carregados pela rede pelo Metro. Se você mudar o diretório ou nome de um recurso XML, você precisará recompilar sua aplicação Android cada vez.
- Eles não têm dimensões. Por padrão, eles serão exibidos com um tamanho 0x0 e você precisa fornecer uma largura e altura para que apareçam.
- Eles não são totalmente customizáveis em runtime; você só pode controlar dimensões ou a cor de tint geral, mas não pode customizar atributos de elementos individuais _dentro_ do recurso como larguras de traço, border radius ou cores. Esses tipos de customizações requerem diferentes variantes do seu recurso XML.

:::info
Os vector drawables do Android não são uma substituição 1:1 para bibliotecas como `react-native-svg`. Eles são projetados especificamente para Android e não funcionam para iOS. Se você quiser ter os mesmos SVGs em todas as plataformas, você terá que continuar usando `react-native-svg`. Vector drawables meramente oferecem benefícios de performance às custas de customização.
:::

### ReactNativeFactory no iOS

Com o React Native 0.78, melhoramos a integração do React Native no iOS.

Esta versão introduz uma nova classe chamada `RCTReactNativeFactory` que permite criar instâncias do React Native sem a necessidade de um AppDelegate. Isso deve permitir que você crie uma nova versão do React Native em um ViewController, por exemplo. Isso simplifica dramaticamente a integração com apps Brownfield.

Imagine que você quer mostrar uma view React Native em um View Controller do seu app. A partir do React Native 0.78, o que você precisa fazer, depois de instalar todas as dependências conforme mostrado [neste guia](/docs/next/integration-with-existing-apps?language=apple#1-set-up-directory-structure), é adicionar este código:

```diff

+import React
+import React_RCTAppDelegate

public class ViewController {

+  var reactNativeFactory: RCTReactNativeFactory?
+  var reactNativeDelegate: ReactNativeDelegate?

  public func viewdidLoad() {
    super.viewDidLoad()
    // …
+ reactNativeDelegate = ReactNativeDelegate()
+ reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeDelegate!)
+ view = reactNativeFactory.rootViewFactory.view(withModuleName: "<your module name>")
  }

}

+class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {

+  override func sourceURL(for bridge: RCTBridge) -> URL? {
+    self.bundleURL()
+  }
+
+  override func bundleURL() -> URL? {
+    #if DEBUG
+    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
+    #else
+    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
+    #endif
+  }
+}

```

O React Native será carregado no View Controller assim que você navegar para ele.

Este código cria um `RCTReactNativeFactory`, atribui um delegate a ele e pede para criar uma `rootView` para uma view do React Native.

O delegate é definido abaixo, e ele sobrescreve as propriedades `sourceURL` e `bundleURL` para dizer ao React Native onde ele pode encontrar o bundle JS para carregar na view.

## Outras Breaking Changes

### Geral

- React Native DevTools
  - Removido FuseboxClient CDP domain
- Codegen
  - Separar component array types e command array types

### Android

- Mudanças de nullability: migrar `RootView` para Kotlin resultou em mudanças de tipos de parâmetros de nullable para non nullable.
- As seguintes classes foram movidas de públicas para internas, ou removidas, e não podem mais ser acessadas:
  - `com.facebook.react.bridge.GuardedResultAsyncTask`
  - `com.facebook.react.uimanager.ComponentNameResolver`
  - `com.facebook.react.uimanager.FabricViewStateManager`
  - `com.facebook.react.views.text.frescosupport.FrescoBasedReactTextInlineImageViewManager`

### iOS

- Mudança no evento load de Image de tamanho lógico para pixel (Isso afeta apenas a Old Architecture)

## Agradecimentos

O React Native 0.78 contém mais de 509 commits de 87 contribuidores. Obrigado por todo o trabalho árduo!

Agradecimentos a todos os autores adicionais que trabalharam na documentação de recursos neste post de lançamento:

- Time [Dream11](https://github.com/ds-horizon) pelos testes completos dos recursos do React 19 no React Native
- [Nicola Corti](https://github.com/cortinico) pelo trabalho em Lançamentos Mais Rápidos
- [Alex Hunt](https://github.com/huntie) pelo trabalho no opt-in de logs do Metro
- [Peter Abbondanzo](https://github.com/Abbondanzo) pelo trabalho no Suporte a XML Drawable do Android
- [Oskar Kwaśniewski](https://github.com/okwasniewski) pelo trabalho no ReactNativeFactory

## Atualizar para 0.78

Por favor, use o [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) para visualizar mudanças de código entre versões do React Native para projetos existentes, além da documentação de Atualização.

Para criar um novo projeto:

```
npx @react-native-community/cli@latest init MyProject --version latest
```

Se você usa Expo, [o React Native 0.78 será suportado em um lançamento canary do Expo SDK](https://expo.dev/changelog/react-native-78).

:::info
0.78 é agora a versão estável mais recente do React Native e 0.75.x passa a não ter suporte. Para mais informações veja [política de suporte do React Native](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md). Pretendemos publicar uma atualização final de fim de vida do 0.75 num futuro próximo.
:::
