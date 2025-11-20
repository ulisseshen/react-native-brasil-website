---
id: metro
title: Metro
ia-translated: true
---

React Native usa [Metro](https://metrobundler.dev/) para compilar seu código JavaScript e assets.

## Configurando Metro

Opções de configuração para Metro podem ser personalizadas no arquivo `metro.config.js` do seu projeto. Isso pode exportar:

- **Um objeto (recomendado)** que será mesclado sobre as configurações padrão internas do Metro.
- [**Uma função**](#advanced-using-a-config-function) que será chamada com as configurações padrão internas do Metro e deve retornar um objeto de configuração final.

:::tip
Consulte [**Configurando Metro**](https://metrobundler.dev/docs/configuration) no site do Metro para documentação sobre todas as opções de configuração disponíveis.
:::

No React Native, sua configuração do Metro deve estender [`@react-native/metro-config`](https://www.npmjs.com/package/@react-native/metro-config) ou [`@expo/metro-config`](https://www.npmjs.com/package/@expo/metro-config). Esses pacotes contêm padrões essenciais necessários para compilar e executar aplicativos React Native.

Abaixo está o arquivo `metro.config.js` padrão em um projeto de template React Native:

<!-- prettier-ignore -->
```js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

Opções do Metro que você deseja personalizar podem ser feitas dentro do objeto `config`.

### Advanced: Using a config function

Exportar uma função de configuração é um opt-in para gerenciar a configuração final você mesmo — **Metro não aplicará nenhum padrão interno**. Este padrão pode ser útil quando precisar ler o objeto de configuração base padrão do Metro ou para definir opções dinamicamente.

:::info
**A partir do `@react-native/metro-config` 0.72.1**, não é mais necessário usar uma função de configuração para acessar a configuração padrão completa. Veja a seção **Tip** abaixo.
:::

<!-- prettier-ignore -->
```js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = function (baseConfig) {
  const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
  const {resolver: {assetExts, sourceExts}} = defaultConfig;

  return mergeConfig(
    defaultConfig,
    {
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    },
  );
};
```

:::tip
Usar uma função de configuração é para casos de uso avançados. Um método mais simples do que o acima, por exemplo, para personalizar `sourceExts`, seria ler esses padrões de `@react-native/metro-config`.

**Alternative**

<!-- prettier-ignore -->
```js
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
```

**However!**, recomendamos copiar e editar ao sobrescrever esses valores de configuração — colocando a fonte da verdade no seu arquivo de configuração.

✅ **Recommended**

<!-- prettier-ignore -->
```js
const config = {
  resolver: {
    sourceExts: ['js', 'ts', 'tsx', 'svg'],
  },
};
```

:::

## Saiba mais sobre Metro

- [Site do Metro](https://metrobundler.dev/)
- [Video: "Metro & React Native DevX" talk at App.js 2023](https://www.youtube.com/watch?v=c9D4pg0y9cI)
