---
ia-translated: true
title: 'Avançando Rumo a uma API JavaScript Estável (Novas Mudanças na 0.80)'
authors: [huntie, iwoplaza, jpiasecki, coado]
tags: [announcement]
date: 2025-06-12T16:00
---

No React Native 0.80, estamos introduzindo duas mudanças significativas na API JavaScript do React Native — a depreciação de deep imports e nossa nova Strict TypeScript API. Estas fazem parte de um esforço contínuo para definir com precisão nossa API e oferecer segurança de tipos confiável aos usuários e frameworks.

**Principais destaques:**

- **Depreciação de deep imports**: A partir da 0.80, estamos introduzindo avisos de depreciação para deep imports do pacote `react-native`.
- **Strict TypeScript API opt-in**: Estamos migrando para tipos TypeScript a partir do código-fonte e uma nova baseline de API pública sob TypeScript. Estes permitem maior precisão de tipos e mais resistência a mudanças futuras, e será uma mudança breaking de uma única vez. [Ative](/blog/2025/06/12/moving-towards-a-stable-javascript-api#strict-typescript-api) via `compilerOptions` no `tsconfig.json` do seu projeto.
- Trabalharemos com a comunidade ao longo do tempo para garantir que essas mudanças funcionem para todos, antes de habilitar a Strict TypeScript API por padrão em uma futura versão do React Native.

<!--truncate-->

## O que está mudando e por quê

Estamos nos movendo para melhorar e estabilizar a API JavaScript pública do React Native — ou seja, o que você obtém quando importa `'react-native'`.

Historicamente, temos aproximado isso. O React Native é escrito em [Flow](https://flow.org/), mas a comunidade há muito tempo migrou para TypeScript em open source, que é como a API pública é consumida e validada para compatibilidade. Nossos tipos têm sido (carinhosamente) [contribuídos pela comunidade](https://www.npmjs.com/package/@types/react-native), e desde então mesclados e alinhados em nossa base de código. No entanto, estes têm dependido de manutenção manual e nenhuma ferramenta automatizada, introduzindo lacunas de correção.

Além disso, nossa API JS pública tem sido mal definida em termos de limites de módulos — por exemplo, deep imports internos `'react-native/Libraries/'` eram acessíveis pelo código do aplicativo, mas podiam mudar frequentemente conforme atualizávamos esses internals.

Na 0.80, estamos abordando essas questões depreciando deep imports e introduzindo um opt-in do usuário para uma nova baseline de API gerada em TypeScript. Estamos chamando isso de nossa **Strict TypeScript API**. Em última análise, esta é a base para oferecer uma API React Native estável no futuro.

## Depreciando deep imports do `react-native`

A principal mudança que estamos fazendo em nossa API hoje é depreciar o uso de deep imports ([RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894)), com avisos no ESLint e no console JS. Deep imports de valores e tipos devem ser atualizados para o import raiz do `react-native`.

```js title=""
// Antes - import de subpath
import {Alert} from 'react-native/Libraries/Alert/Alert';

// Depois - import de `react-native`
import {Alert} from 'react-native';
```

Esta mudança reduz a área de superfície total de nossa API JavaScript em um conjunto fixo de exports que podemos controlar e tornar estável em uma versão futura. Estamos visando a remoção desses caminhos de import na 0.82.

:::info Feedback da API

Algumas APIs não são exportadas na raiz e se tornarão indisponíveis sem deep imports. Temos uma **[thread de feedback aberta](https://github.com/react-native-community/discussions-and-proposals/discussions/893)** e trabalharemos com a comunidade para finalizar os exports em nossa API pública. Por favor, compartilhe seu feedback!

:::

**Desativando**

Por favor, tenha em mente que pretendemos remover deep imports da API do React Native em uma versão futura, e estes devem ser atualizados para o import raiz.

<details>
<summary>**Desativando avisos**</summary>

#### ESLint

Desabilite a regra `no-deep-imports` usando `overrides`.

<!-- prettier-ignore -->
```js title=".eslintrc.js"
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        '@react-native/no-deep-imports': 0,
      },
    },
  ]
```

#### Avisos do console

Passe a opção `disableDeepImportWarnings` para `@react-native/babel-preset`.

<!-- prettier-ignore -->
```js title="babel.config.js"
module.exports = {
  presets: [
    ['module:@react-native/babel-preset', {disableDeepImportWarnings: true}]
  ],
};
```

Reinicie seu aplicativo com `--reset-cache` para limpar o cache do Metro.

```sh title=""
npx @react-native-community/cli start --reset-cache
```

</details>
<details>
<summary>**Desativando avisos (Expo)**</summary>

#### ESLint

Desabilite a regra `no-deep-imports` usando `overrides`.

<!-- prettier-ignore -->
```js title=".eslintrc.js"
overrides: [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
      '@react-native/no-deep-imports': 0,
    },
  },
];
```

#### Avisos do console

Passe a opção `disableDeepImportWarnings` para `babel-preset-expo`.

<!-- prettier-ignore -->
```js title="babel.config.js"
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', {disableDeepImportWarnings: true}]],
  };
};
```

Reinicie seu aplicativo com `--clear` para limpar o cache do Metro.

```sh name=""
npx expo start --clear
```

</details>

## Strict TypeScript API (opt-in)

A Strict TypeScript API é um novo conjunto de tipos TypeScript no pacote `react-native`, que pode ser ativado via seu `tsconfig.json`. Estamos disponibilizando estes junto com nossos tipos TS existentes, o que significa que você pode escolher migrar quando estiver pronto.

Os novos tipos são:

1. **Gerados diretamente do nosso código-fonte** — melhorando cobertura e correção, para que você possa esperar garantias de compatibilidade mais fortes.
2. **Restritos ao arquivo index do `react-native`** — definindo mais rigorosamente nossa API pública, e significando que não quebraremos a API ao fazer mudanças em arquivos internos.

Quando a comunidade estiver pronta, a Strict TypeScript API se tornará nossa API padrão no futuro — sincronizada com a remoção de deep imports. Isso significa que é uma **boa ideia** começar a ativar, pois você estará pronto para a futura API JS estável do React Native.

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    ...
    "customConditions": ["react-native-strict-api"]
  }
}
```

:::note Por baixo dos panos

Isso instruirá o TypeScript a resolver os tipos de `react-native` do nosso novo diretório [`types_generated/`](https://www.npmjs.com/package/react-native?activeTab=code), em vez do diretório anterior [`types/`](https://www.npmjs.com/package/react-native?activeTab=code) (mantido manualmente). Nenhum reinício do TypeScript ou do seu editor é necessário.

:::

### Breaking: Deep imports não são permitidos

Como acima, os tipos sob a Strict TypeScript API agora só podem ser resolvidos a partir do caminho de import principal `'react-native'`, aplicando [encapsulamento de pacote](/blog/2023/06/21/package-exports-support), conforme nossa depreciação acima.

```tsx
// Antes - import de subpath
import {Alert} from 'react-native/Libraries/Alert/Alert';

// Depois - DEVE importar de `react-native`
import {Alert} from 'react-native';
```

:::tip Vitória chave

Nós delimitamos nossa API pública aos exports do arquivo `index.js` do React Native, que mantemos cuidadosamente. Isso significa que mudanças de arquivo em outros lugares em nossa base de código não serão mais mudanças breaking.

:::

### Breaking: Alguns nomes / formas de tipos mudaram

Os tipos agora são gerados a partir do código-fonte, em vez de mantidos manualmente. Ao fazer isso:

- Alinhamos diferenças que se acumularam a partir dos tipos contribuídos pela comunidade — e também aumentamos a cobertura de tipos do nosso código-fonte.
- Intencionalmente atualizamos alguns nomes e formas de tipos, onde havia espaço para simplificar ou reduzir ambiguidade.

:::tip Vitória chave

Como os tipos agora são gerados do código-fonte do React Native, você pode confiar que o verificador de tipos é **sempre preciso** para uma determinada versão de `react-native`.

:::

#### Exemplo: Símbolos exportados mais rigorosos

A API `Linking` agora é uma única `interface`, em vez de dois exports. Isso se aplica a várias outras APIs ([veja a documentação](/docs/strict-typescript-api)).

```tsx
// Antes
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);

// Depois
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

#### Exemplo: Tipos corrigidos / mais completos

As definições de tipos manuais anteriores deixavam oportunidade para lacunas de tipos. Sob Flow → TypeScript gerado, estas não estão mais presentes (e na origem, se beneficiam da validação de tipo adicional do Flow para código multi-plataforma).

```tsx
import {Dimensions} from 'react-native';

// Antes - Erro de tipo
// Depois - number | undefined
const {densityDpi} = Dimensions.get();
```

### Outras mudanças breaking

Por favor, consulte nosso [guia dedicado](/docs/strict-typescript-api) na documentação que detalha todas as mudanças de tipos breaking e como atualizar seu código.

## Lançamento

Apreciamos que qualquer mudança breaking no React Native levará tempo para os desenvolvedores atualizarem em seus aplicativos.

#### Agora — Lançamento opt-in (0.80)

O opt-in `"react-native-strict-api"` está estável na versão 0.80.

- Esta é uma migração única. Pretendemos que aplicativos e bibliotecas ativem em seu próprio ritmo ao longo das próximas versões.
- Em qualquer modo, nada mudará para seu aplicativo em runtime — isso afeta apenas a análise TypeScript.
- **E**, receberemos feedback sobre APIs ausentes, via nossa [thread de feedback dedicada](https://github.com/react-native-community/discussions-and-proposals/discussions/893).

:::tip Recomendado

A Strict TypeScript API se tornará nossa API padrão no futuro.

Se você tiver tempo, vale a pena testar o opt-in agora em seu `tsconfig.json`, para preparar seu aplicativo ou biblioteca para o futuro. Isso avaliará imediatamente se há algum erro de tipo introduzido em seu aplicativo sob a Strict API. **Pode não haver nenhum(!)** — nesse caso, você está pronto para usar.

:::

#### Futuro — Strict TypeScript API por padrão

No futuro, exigiremos que todas as bases de código usem nossa Strict API, e removeremos os tipos legados.

O cronograma para isso será baseado no feedback da comunidade. Por pelo menos as próximas duas versões do React Native, a Strict API permanecerá opt-in.

## FAQs

<details>
<summary>
**Estou usando subpath imports hoje. O que devo fazer?**
</summary>

Por favor, migre para o caminho de import raiz `'react-native'`.

- Subpath imports (por exemplo, `'react-native/Libraries/Alert/Alert'`) estão se tornando APIs privadas. Sem prevenir o acesso a arquivos de implementação dentro do React Native, não podemos oferecer uma API JavaScript estável.
- Queremos que nossos avisos de depreciação motivem feedback da comunidade, que pode ser levantado via nossa [thread de discussão centralizada](https://github.com/react-native-community/discussions-and-proposals/discussions/893), se você acredita que não estamos expondo caminhos de código que são cruciais para seu aplicativo. Quando justificado, podemos promover APIs para o export index.

</details>

<details>
<summary>
**Sou mantenedor de biblioteca. Como essa mudança me impacta?**
</summary>

Tanto aplicativos quanto bibliotecas podem ativar em seu próprio ritmo, já que o `tsconfig.json` afetará apenas a base de código imediata.

- Tipicamente, `node_modules` é excluído da validação pelo servidor TypeScript em um projeto React Native. Portanto, as definições de tipos exportadas do seu pacote são a fonte da verdade.

**💡 Queremos feedback!** Assim como com subpath imports alterados, se você encontrar algum problema de integração com a Strict API, por favor nos informe [no GitHub](https://github.com/react-native-community/discussions-and-proposals/discussions/893).

</details>

<details>
<summary>
**Isso garante uma API final para o React Native ainda?**
</summary>

Infelizmente, ainda não. Na 0.80, fizemos um investimento em ferramentas para que a baseline da API JS existente do React Native possa ser consumida com precisão via TypeScript — permitindo futuras mudanças estáveis. Estamos formalizando a API existente que você conhece e ama.

No futuro, tomaremos medidas para finalizar as APIs que atualmente oferecemos no core — em cada superfície de linguagem. Mudanças de API serão comunicadas via RFCs/anúncios, e tipicamente um ciclo de depreciação.

</details>

<details>
<summary>
**Por que o React Native não é escrito em TypeScript?**
</summary>

O React Native é infraestrutura core no Meta. Testamos cada mudança mesclada em nossa Família de Aplicativos, antes de chegarem à disponibilidade geral open source.

Nesta escala e sensibilidade, correção importa. A linha de fundo é que o Flow nos oferece maior desempenho e maior rigor do que o TypeScript, incluindo [suporte multi-plataforma específico para React Native](https://flow.org/en/docs/react/multiplatform/).

</details>

## Agradecimentos

Essas mudanças foram possíveis por [Iwo Plaza](https://x.com/iwoplaza), [Jakub Piasecki](https://x.com/breskin67), [Dawid Małecki](https://github.com/coado), [Alex Hunt](https://x.com/huntie), e [Riccardo Cipolleschi](https://x.com/CipolleschiR).

Agradecemos também a [Pieter Vanderwerff](https://github.com/pieterv), [Rubén Norte](https://github.com/rubennorte), e [Rob Hogan](https://x.com/robjhogan) por sua ajuda e contribuição adicionais.

:::note Saiba mais

<div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
  <div style={{ flex: 1 }}>
    <strong style={{ display: 'block', marginTop: 8, marginBottom: 8 }}>Assista a palestra!</strong>
    <span style={{ display: 'block', marginBottom: 8 }}>Compartilhamos um mergulho profundo em nossas motivações e o trabalho por trás da Strict TypeScript API no <strong>App.js 2025</strong>.</span>
    <p style={{ marginBottom: 8 }}>**[Ver no YouTube](https://www.youtube.com/live/UTaJlqhTk2g?si=SDRmj80kss7hXuGG&t=6520)**</p>
  </div>
  <img
    src="/blog/assets/0.80-js-stable-api-appjs.jpg"
    style={{ flexShrink: 0, maxWidth: '200px', aspectRatio: '16/9', borderRadius: 10 }}
    alt="App.js 2025 Talk"
  />
</div>

:::
