---
ia-translated: true
title: 'Suporte a Package Exports no React Native'
authors: [huntie]
tags: [announcement, metro]
date: 2023-06-21
---

# Suporte a Package Exports no React Native

Com o lançamento do [React Native 0.72](/blog/2023/06/21/0.72-metro-package-exports-symlinks), o Metro — nossa ferramenta de build JavaScript — agora inclui suporte beta para o campo [`"exports"`](https://nodejs.org/docs/latest-v18.x/api/packages.html#exports) do `package.json`. Quando [habilitado](/blog/2023/06/21/package-exports-support#enabling-package-exports-beta), ele adiciona as seguintes funcionalidades:

- [Projetos React Native funcionarão com mais pacotes npm prontos para uso](/blog/2023/06/21/package-exports-support#for-app-developers)
- [Novas capacidades para pacotes definirem sua API e direcionar ao React Native](/blog/2023/06/21/package-exports-support#for-package-maintainers-preview)
- [Algumas mudanças que quebram compatibilidade na resolução de pacotes (em casos extremos)](/blog/2023/06/21/package-exports-support#breaking-changes)

Neste post vamos cobrir como o Package Exports funciona, e o que essas mudanças significam para você como desenvolvedor de aplicativos React Native ou mantenedor de pacotes.

<!-- truncate -->

## O que é Package Exports?

Introduzido no Node.js 12.7.0, Package Exports é a abordagem moderna para pacotes npm especificarem **entry points** — o mapeamento de subpaths de pacotes que podem ser importados externamente e para qual(is) arquivo(s) eles devem resolver.

Suportar `"exports"` melhora como projetos React Native funcionarão com o ecossistema JavaScript mais amplo ([usado em ~16.6k pacotes hoje](https://github.com/search?q=path%3A%2A%2A%2Fpackage.json+%22%5C%22access%5C%22%3A+%5C%22public%5C%22%22+%22%5C%22exports%5C%22%22+NOT+path%3A%2A%2A%2Fnode_modules+NOT+is%3Afork+NOT+is%3Aarchived&type=code)), e dá aos autores de pacotes um conjunto de recursos padronizado para pacotes multiplataforma direcionarem ao React Native.

[`"exports"`](https://nodejs.org/docs/latest-v19.x/api/packages.html#exports) pode ser usado junto com, ou em vez de, [`"main"`](https://nodejs.org/docs/latest-v19.x/api/packages.html#main) em um arquivo `package.json`.

```json
{
  "name": "@storybook/addon-actions",
  "main": "./dist/index.js",
  ...
  "exports": {
    ".": {
      "node": "./dist/index.js",
      "import": "./dist/index.mjs",
      "default": "./dist/index.js"
    },
    "./preview": {
      "import": "./dist/preview.mjs",
      "default": "./dist/preview.js"
    },
    ...
    "./package.json": "./package.json"
  }
}
```

Aqui está um código de aplicativo consumindo o pacote acima importando diferentes subpaths de `@storybook/addon-actions`.

```js
import {action} from '@storybook/addon-actions';
// -> '@storybook/addon-actions/dist/index.js'

import {action} from '@storybook/addon-actions/preview';
// -> '@storybook/addon-actions/dist/preview.js'

import helpers from '@storybook/addon-actions/src/preset/addArgsHelpers';
// Inaccessible - not listed in "exports"!
```

Os recursos principais do Package Exports são:

- **Encapsulamento de pacote**: Apenas subpaths definidos em `"exports"` podem ser importados de fora do pacote — dando aos pacotes controle sobre sua API pública.
- **Aliases de subpath**: Pacotes podem definir subpaths personalizados que mapeiam para uma localização de arquivo diferente (incluindo via [subpath patterns](https://nodejs.org/docs/latest-v19.x/api/packages.html#subpath-patterns)) — permitindo realocação de arquivos enquanto preserva a API pública.
- **Conditional exports**: Um subpath pode resolver para um arquivo subjacente diferente dependendo do ambiente. Por exemplo, para direcionar aos runtimes `"node"`, `"browser"`, ou `"react-native"` — substituindo a [especificação do campo `"browser"`](https://github.com/defunctzombie/package-browser-field-spec).

:::note
As capacidades completas para `"exports"` são detalhadas na [especificação Node.js Package Entry Points](https://nodejs.org/docs/latest-v19.x/api/packages.html#package-entry-points).

Como esses recursos se sobrepõem a conceitos existentes do React Native (como [extensões específicas de plataforma](/docs/platform-specific-code)), e como `"exports"` já estava ativo no ecossistema npm há algum tempo, nós contatamos a comunidade React Native para garantir que nossa implementação atenderia às necessidades dos desenvolvedores ([PR](https://github.com/react-native-community/discussions-and-proposals/pull/534), [RFC final](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0534-metro-package-exports-support.md)).
:::

## Para desenvolvedores de aplicativos

Package Exports pode ser habilitado hoje, em beta.

- Imports de pacotes que dependem de recursos do Package Exports (como [**Firebase**](https://www.npmjs.com/package/firebase) e [**Storybook**](https://www.npmjs.com/search?q=%40storybook)) agora devem funcionar como projetado.
- Projetos React Native for Web usando Metro agora poderão usar o conditional export `"browser"`, removendo a necessidade de workarounds.

Habilitar Package Exports traz algumas [mudanças que quebram compatibilidade em casos extremos](#breaking-changes) que podem afetar projetos específicos, e que você pode [testar hoje](#validating-changes-in-your-project).

**Em uma versão futura do React Native, Package Exports será habilitado por padrão**. Em uma situação de ovo e galinha, aplicativos React Native eram anteriormente um obstáculo para alguns pacotes migrarem para `"exports"` — ou usavam nossa válvula de escape do campo raiz `"react-native"`. Suportar esses recursos no Metro permitirá que o ecossistema avance.

### Habilitando Package Exports (beta)

Package Exports pode ser habilitado no arquivo [**metro.config.js**](https://github.com/facebook/react-native/blob/0.72-stable/packages/react-native/template/metro.config.js) do seu aplicativo via a opção [`resolver.unstable_enablePackageExports`](https://metrobundler.dev/docs/configuration/#unstable_enablepackageexports-experimental).

```js
const config = {
  // ...
  resolver: {
    unstable_enablePackageExports: true,
  },
};
```

O Metro expõe duas opções adicionais de resolver que configuram como os conditional exports se comportam:

- [`unstable_conditionNames`](https://metrobundler.dev/docs/configuration/#unstable_conditionnames-experimental) — O conjunto de [condition names](https://nodejs.org/docs/latest-v19.x/api/packages.html#community-conditions-definitions) para afirmar ao resolver conditional exports. Por padrão, nós combinamos `['require', 'import', 'react-native']`.
- [`unstable_conditionsByPlatform`](https://metrobundler.dev/docs/configuration/#unstable_conditionsbyplatform-experimental) — Os condition names adicionais para afirmar ao resolver para um determinado alvo de plataforma. Por padrão, isso combina `'browser'` quando a plataforma é `'web'`.

:::tip
**Lembre-se de usar o [preset Jest](https://github.com/facebook/react-native/blob/main/template/jest.config.js#L2) do React Native!** Jest inclui suporte para Package Exports por padrão. Nos testes, você pode sobrescrever quais `customExportConditions` são resolvidas usando a opção [`testEnvironmentOptions`](https://jestjs.io/docs/configuration#testenvironmentoptions-object).

**Se você está usando TypeScript**, o comportamento de resolução pode ser correspondido configurando [`moduleResolution: 'bundler'`](https://www.typescriptlang.org/tsconfig#moduleResolution) e [`resolvePackageJsonImports: false`](https://www.typescriptlang.org/tsconfig#resolvePackageJsonExports) dentro do `tsconfig.json` do seu projeto.
:::

#### Validando mudanças no seu projeto

Para projetos existentes, recomendamos que adotantes iniciais sigam estes passos para ver se ocorrem mudanças de resolução após habilitar `unstable_enablePackageExports`. Este é um processo único. É provável que não haverá mudanças nenhuma, mas gostaríamos que os desenvolvedores optassem por isso com certeza.

<details>
<summary>💡 Validando mudanças no seu projeto</summary>

:::note
Se você não está usando Yarn, substitua `yarn` por `npx` (ou a ferramenta relevante usada no seu projeto).
:::

1. Obtenha todas as dependências resolvidas (antes das mudanças):

   ```sh
   # Replace index.js with your entry file if needed, such as App.js
   yarn metro get-dependencies index.js --platform android --output before.txt
   ```

   - **Expo CLI**: Execute `npx expo customize metro.config.js` se seu projeto ainda não tiver um arquivo `metro.config.js`.
   - Para cobertura completa, substitua `--platform android` pelas outras plataformas em uso pelo seu aplicativo (por exemplo, `ios`, `web`).

2. Habilite `resolver.unstable_enablePackageExports` em `metro.config.js`.
3. Obtenha todas as dependências resolvidas (após as mudanças):

   ```sh
   yarn metro get-dependencies index.js --platform android --output after.txt
   ```

4. Compare!

   ```sh
   diff before.txt after.txt
   ```

</details>

### Mudanças que quebram compatibilidade

Decidimos por uma implementação de Package Exports no Metro que seja compatível com a especificação (necessitando algumas mudanças que quebram compatibilidade), mas compatível com versões anteriores de outra forma (ajudando aplicativos com imports existentes a migrarem gradualmente).

A principal mudança que quebra compatibilidade é que quando `"exports"` é fornecido por um pacote, ele será consultado primeiro (antes de quaisquer outros campos `package.json`) — e um alvo de subpath correspondente será usado diretamente.

- O Metro não expandirá [`sourceExts`](https://metrobundler.dev/docs/configuration/#sourceexts) contra o especificador de import.
- O Metro não resolverá [extensões específicas de plataforma](/docs/platform-specific-code) contra o arquivo alvo.

Para mais detalhes, por favor veja todas as [**mudanças que quebram compatibilidade**](https://metrobundler.dev/docs/package-exports#summary-of-breaking-changes) na documentação do Metro.

### Encapsulamento de pacote é leniente

Quando o Metro encontra um subpath que não está listado em `"exports"`, **ele voltará à resolução legada**. Este é um recurso de compatibilidade destinado a reduzir o atrito do usuário para imports anteriormente permitidos em projetos React Native existentes.

Em vez de lançar um erro, o Metro registrará um aviso.

```sh
warn: You have imported the module "foo/private/fn.js" which is not listed in
the "exports" of "foo". Consider updating your call site or asking the package
maintainer(s) to expose this API.
```

:::note
Planejamos implementar um modo estrito para encapsulamento de pacote no futuro, para alinhar com o comportamento padrão do Node. Portanto, **recomendamos que todos os desenvolvedores resolvam esses avisos** se levantados pelos usuários.
:::

## Para mantenedores de pacotes (prévia)

:::info
De acordo com nosso [plano de lançamento](#the-future-stable-exports-enabled-by-default), Package Exports será habilitado para a maioria dos projetos na próxima versão do React Native (0.73) ainda este ano.

**Não temos planos de remover o suporte para o campo `"main"` e outros recursos atuais de resolução de pacotes tão cedo.**
:::

Package Exports fornece a capacidade de restringir acesso aos internos do seu pacote, e capacidades mais previsíveis para bibliotecas direcionarem ao React Native e React Native for Web.

### Se você está usando `"exports"` hoje

Se seu pacote usa `"exports"` junto com o campo raiz `"react-native"` atual, por favor tenha em mente as [mudanças que quebram compatibilidade](#breaking-changes) para usuários acima. Para usuários habilitando esse recurso no Metro, `"exports"` agora será considerado primeiro durante a resolução de módulos.

Na prática, antecipamos que a principal mudança para os usuários será a aplicação (via avisos) de quaisquer subpaths inacessíveis em seus aplicativos, por respeitar o encapsulamento de pacote de `"exports"`.

### Migrando para `"exports"`

**Adicionar um campo `"exports"` ao seu pacote é totalmente opcional**. Recursos de resolução de pacote existentes se comportarão identicamente para pacotes que não usam `"exports"` — e não temos planos de remover este comportamento.

Acreditamos que os novos recursos de `"exports"` fornecem um conjunto de recursos atraente para mantenedores de pacotes React Native.

- **Fortaleça sua API de pacote**: Este é um ótimo momento para revisar a API de módulo do seu pacote, que agora pode ser formalmente definida via aliases de subpath exportados. Isso previne usuários de acessarem APIs internas, reduzindo a área de superfície para bugs.
- **Conditional exports**: Se seu pacote direciona ao React Native for Web (isto é, `"react-native"` e `"browser"`), agora damos aos pacotes controle da ordem de resolução dessas condições (veja o próximo cabeçalho).

Se você decidir introduzir `"exports"`, **recomendamos fazer isso como uma mudança que quebra compatibilidade**. Preparamos um [**guia de migração**](https://metrobundler.dev/docs/package-exports#migration-guide-for-package-maintainers) na documentação do Metro que inclui como substituir recursos como extensões específicas de plataforma.

:::note
**Por favor, não confie nos comportamentos lenientes da implementação do Metro.** Embora o Metro seja compatível com versões anteriores, os pacotes devem seguir como `"exports"` está documentado na especificação e estritamente implementado por outras ferramentas.
:::

### A nova condition `"react-native"`

Introduzimos `"react-native"` como uma community condition (para uso com conditional exports). Isso representa o React Native, o framework, ao lado de outros runtimes reconhecidos como `"node"` e `"deno"` ([RFC](https://github.com/nodejs/node/pull/45367)).

:::info
[Community Conditions Definitions — **`"react-native"`**](https://nodejs.org/docs/latest-v19.x/api/packages.html#community-conditions-definitions)

_Será correspondido pelo framework React Native (todas as plataformas). Para direcionar ao React Native for Web, "browser" deve ser especificado antes desta condição._
:::

Isso substitui o campo raiz `"react-native"` anterior. A ordem de prioridade de como isso era anteriormente resolvido era determinada por projetos, [o que criava ambiguidade ao usar React Native for Web](https://github.com/expo/router/issues/37#issuecomment-1275925758). Sob `"exports"`, _pacotes definem concretamente a ordem de resolução para entry points condicionais_ — removendo essa ambiguidade.

```json
  "exports": {
    "browser": "./dist/index-browser.js",
    "react-native": "./dist/index-react-native.js",
    "default": "./dist/index.js"
  }
```

:::note
Escolhemos não introduzir conditions `"android"` e `"ios"`, devido à prevalência de outros métodos de seleção de plataforma existentes, e à complexidade de como esse comportamento poderia funcionar através de frameworks. Por favor use a API [`Platform.select()`](/docs/platform#select) em vez disso.
:::

## O futuro: `"exports"` estável, habilitado por padrão

Na próxima versão do React Native, estamos mirando remover o prefixo `unstable_` para este recurso (tendo abordado trabalho de performance planejado e quaisquer bugs) e habilitaremos a resolução de Package Exports por padrão.

Com `"exports"` habilitado para todos, podemos começar a levar a comunidade React Native adiante — por exemplo, os pacotes core do React Native poderiam ser atualizados para melhor separar módulos públicos e internos.

![Rollout plan for Package Exports support](../static/blog/assets/package-exports-rollout.png)

## Agradecimentos

Agradecimentos aos membros da comunidade React Native que deram feedback no RFC: [@SimenB](https://github.com/SimenB), [@tido64](https://github.com/tido64), [@byCedric](https://github.com/byCedric), [@thymikee](https://github.com/thymikee).

Enormes agradecimentos a [@motiz88](https://github.com/motiz88) e [@robhogan](https://github.com/robhogan) na Meta por apoiar o desenvolvimento deste recurso.
