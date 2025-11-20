---
ia-translated: true
id: release-levels
title: Níveis de Release
---

React Native fornece à comunidade a capacidade de adotar recursos novos individuais assim que seu design e implementação estão quase completos, mesmo antes de serem incluídos em um release estável. Esta abordagem é conhecida como **níveis de release** (release levels).

Você pode configurar o nível de release do React Native para que sua instância do React Native seja inicializada com Feature Flags definidas para os modos `EXPERIMENTAL`, `CANARY` ou `STABLE`.

:::note
Esta abordagem é similar aos [releases Canary e Experimental no React](https://react.dev/blog/2023/05/03/react-canaries), mas com uma diferença importante: independentemente do nível de release, a mesma versão do código React JS e React Native é usada.
React Native também não está usando as tags NPM `@canary` ou `@experimental`, pois os níveis de release estão disponíveis tanto para releases estáveis quanto para releases nightly do React Native.
:::

Além disso, definir o nível de release como `EXPERIMENTAL` ou `CANARY` **não** resultará no consumo de `react@nightly` ou `react@canary` devido à forma como react-native consome a versão do React ([você pode ler mais sobre isso aqui](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Renderer/README.md#react--react-native-versions)).

## Quando Usar Cada Nível de Release

- **`STABLE`**:
  - Use para todos os aplicativos de produção e bibliotecas que não precisam de acesso antecipado a recursos não lançados.
  - Este é o nível padrão para releases estáveis e nightly.
- **`CANARY`:**
  - Use se você é um autor de framework, desenvolvedor avançado de aplicativos, ou precisa testar ou adotar novos recursos antes de serem lançados em estável.
  - Não recomendado para produção ou aplicativos voltados ao usuário.
- **`EXPERIMENTAL`:**
  - Use apenas para testar e fornecer feedback sobre novos recursos nos estágios iniciais de desenvolvimento
  - Não recomendado para produção ou aplicativos voltados ao usuário.

## Como inicializar React Native usando Canary e Experimental

### Android

A classe `DefaultNewArchitectureEntryPoint` agora tem uma propriedade `releaseLevel` (padrão: `STABLE`).
O sistema de feature flag usa esta propriedade para selecionar o conjunto apropriado de feature flags para o nível de release escolhido.

```kotlin title="Example usage"
DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.CANARY
DefaultNewArchitectureEntryPoint.load()
```

O sistema de build gera diferentes classes de override de feature flag para cada nível de release, garantindo que os recursos corretos sejam habilitados para cada estágio.

### iOS

A classe `RCTReactNativeFactory` agora tem um inicializador que aceita um parâmetro `releaseLevel`. A configuração de feature flag usa este parâmetro para selecionar os overrides de feature flag corretos.

```objc title="Example usage"
[[RCTReactNativeFactory alloc] initWithDelegate:delegate releaseLevel:Canary];
```

O sistema garante que apenas um nível de release esteja ativo por instância de app, e irá falhar se múltiplas factories forem criadas com níveis de release diferentes.
