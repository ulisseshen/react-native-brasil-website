---
ia-translated: true
id: platform-specific-code
title: Código Específico de Plataforma
---

Ao construir um aplicativo multiplataforma, você vai querer reutilizar o máximo de código possível. Podem surgir cenários onde faz sentido que o código seja diferente, por exemplo, você pode querer implementar componentes visuais separados para Android e iOS.

O React Native oferece duas maneiras de organizar seu código e separá-lo por plataforma:

- Usando o [módulo `Platform`](platform-specific-code.md#platform-module).
- Usando [extensões de arquivo específicas de plataforma](platform-specific-code.md#platform-specific-extensions).

Certos componentes podem ter propriedades que funcionam em apenas uma plataforma. Todas essas props são anotadas com `@platform` e têm um pequeno badge ao lado delas no site.

## Módulo Platform

O React Native fornece um módulo que detecta a plataforma na qual o aplicativo está sendo executado. Você pode usar a lógica de detecção para implementar código específico de plataforma. Use esta opção quando apenas pequenas partes de um component forem específicas de plataforma.

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```

`Platform.OS` será `ios` quando executado no iOS e `android` quando executado no Android.

Há também um método `Platform.select` disponível que, dado um objeto onde as chaves podem ser uma de `'ios' | 'android' | 'native' | 'default'`, retorna o valor mais adequado para a plataforma na qual você está executando. Ou seja, se você está executando em um telefone, as chaves `ios` e `android` terão preferência. Se essas não forem especificadas, a chave `native` será usada e depois a chave `default`.

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

Isso resultará em um container tendo `flex: 1` em todas as plataformas, uma cor de fundo vermelha no iOS, uma cor de fundo verde no Android e uma cor de fundo azul em outras plataformas.

Como ele aceita qualquer valor (`any`), você também pode usá-lo para retornar components específicos de plataforma, como abaixo:

```tsx
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```

### Detectando a versão do Android <div className="label android" title="This section is related to Android platform">Android</div>

No Android, o módulo `Platform` também pode ser usado para detectar a versão da Plataforma Android na qual o aplicativo está sendo executado:

```tsx
import {Platform} from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

**Nota**: `Version` é definido para a versão da API Android, não para a versão do sistema operacional Android. Para encontrar um mapeamento, consulte [Android Version History](https://en.wikipedia.org/wiki/Android_version_history#Overview).

### Detectando a versão do iOS <div className="label ios" title="This section is related to iOS platform">iOS</div>

No iOS, o `Version` é resultado de `-[UIDevice systemVersion]`, que é uma string com a versão atual do sistema operacional. Um exemplo da versão do sistema é "10.3". Por exemplo, para detectar o número da versão principal no iOS:

```tsx
import {Platform} from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```

## Extensões específicas de plataforma

Quando seu código específico de plataforma é mais complexo, você deve considerar dividir o código em arquivos separados. O React Native detectará quando um arquivo tem uma extensão `.ios.` ou `.android.` e carregará o arquivo de plataforma relevante quando necessário a partir de outros components.

Por exemplo, digamos que você tenha os seguintes arquivos em seu projeto:

```shell
BigButton.ios.js
BigButton.android.js
```

Você pode então importar o component da seguinte forma:

```tsx
import BigButton from './BigButton';
```

O React Native selecionará automaticamente o arquivo correto com base na plataforma em execução.

## Extensões específicas de Native (ou seja, compartilhando código com NodeJS e Web)

Você também pode usar a extensão `.native.js` quando um módulo precisa ser compartilhado entre NodeJS/Web e React Native, mas não tem diferenças entre Android/iOS. Isso é especialmente útil para projetos que têm código comum compartilhado entre React Native e ReactJS.

Por exemplo, digamos que você tenha os seguintes arquivos em seu projeto:

```shell
Container.js # picked up by webpack, Rollup or any other Web bundler
Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
```

Você ainda pode importá-lo sem a extensão `.native`, da seguinte forma:

```tsx
import Container from './Container';
```

**Dica:** Configure seu bundler Web para ignorar extensões `.native.js` a fim de evitar ter código não utilizado em seu bundle de produção, reduzindo assim o tamanho final do bundle.
