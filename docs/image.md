---
ia-translated: true
id: image
title: Image
---

Um componente React para exibir diferentes tipos de imagens, incluindo imagens de rede, recursos estáticos, imagens locais temporárias e imagens do disco local, como da galeria de fotos.

Este exemplo mostra como buscar e exibir uma imagem do armazenamento local, bem como uma da rede e até mesmo de dados fornecidos no esquema de URI `'data:'`.

:::note
Para imagens de rede e data, você precisará especificar manualmente as dimensões da sua imagem!
:::

## Examples

```SnackPlayer name=Image%20Example
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DisplayAnImage = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Image
        style={styles.logo}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default DisplayAnImage;
```

Você também pode adicionar `style` a uma imagem:

```SnackPlayer name=Styled%20Image%20Example
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default DisplayAnImageWithStyle;
```

## Suporte a GIF e WebP no Android

Ao construir seu próprio código nativo, GIF e WebP não são suportados por padrão no Android.

Você precisará adicionar alguns módulos opcionais em `android/app/build.gradle`, dependendo das necessidades do seu app.

```groovy
dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:3.6.0'

  // For WebP support, including animated WebP
  implementation 'com.facebook.fresco:animated-webp:3.6.0'
  implementation 'com.facebook.fresco:webpsupport:3.6.0'

  // For WebP support, without animations
  implementation 'com.facebook.fresco:webpsupport:3.6.0'
}
```

:::note
A versão listada acima pode não estar atualizada. Por favor, verifique [`packages/react-native/gradle/libs.versions.toml`](https://github.com/facebook/react-native/blob/main/packages/react-native/gradle/libs.versions.toml) no repositório principal para ver qual versão do fresco está sendo usada em uma versão específica com tag.
:::

---

# Reference

## Props

### [View Props](view.md#props)

Herda [View Props](view#props).

---

### `accessible`

Quando true, indica que a imagem é um elemento de acessibilidade.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `accessibilityLabel`

O texto que é lido pelo leitor de tela quando o usuário interage com a imagem.

| Type   |
| ------ |
| string |

---

### `alt`

Uma string que define um texto alternativo de descrição da imagem, que será lido pelo leitor de tela quando o usuário interagir com ela. Usar isso marcará automaticamente este elemento como acessível.

| Type   |
| ------ |
| string |

---

### `blurRadius`

blurRadius: o raio de desfoque do filtro de desfoque adicionado à imagem.

| Type   |
| ------ |
| number |

:::tip
No iOS, você precisará aumentar `blurRadius` em mais de `5`.
:::

---

### `capInsets` <div className="label ios">iOS</div>

Quando a imagem é redimensionada, os cantos do tamanho especificado por `capInsets` permanecerão com um tamanho fixo, mas o conteúdo central e as bordas da imagem serão esticados. Isso é útil para criar botões arredondados redimensionáveis, sombras e outros recursos redimensionáveis. Mais informações na [documentação oficial da Apple](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets).

| Type         |
| ------------ |
| [Rect](rect) |

---

### `crossOrigin`

Uma string de uma palavra-chave especificando o modo CORS a ser usado ao buscar o recurso de imagem. Funciona de forma semelhante ao atributo crossorigin em HTML.

- `anonymous`: Nenhuma troca de credenciais do usuário na requisição da imagem.
- `use-credentials`: Define o valor do cabeçalho `Access-Control-Allow-Credentials` como `true` na requisição da imagem.

| Type                                     | Default       |
| ---------------------------------------- | ------------- |
| enum(`'anonymous'`, `'use-credentials'`) | `'anonymous'` |

---

### `defaultSource`

Uma imagem estática para exibir enquanto carrega a fonte da imagem.

| Type                             |
| -------------------------------- |
| [ImageSource](image#imagesource) |

:::note
No Android, a prop default source é ignorada em builds de debug.
:::

---

### `fadeDuration` <div className="label android">Android</div>

Duração da animação de fade em milissegundos.

| Type   | Default |
| ------ | ------- |
| number | `300`   |

---

### `height`

Altura do componente de imagem.

| Type   |
| ------ |
| number |

---

### `loadingIndicatorSource`

De forma semelhante a `source`, esta propriedade representa o recurso usado para renderizar o indicador de carregamento para a imagem. O indicador de carregamento é exibido até que a imagem esteja pronta para ser exibida, normalmente após o download da imagem.

| Type                                                  |
| ----------------------------------------------------- |
| [ImageSource](image#imagesource) (`uri` only), number |

---

### `onError`

Invocado em erro de carregamento.

| Type                                |
| ----------------------------------- |
| (`{nativeEvent: {error} }`) => void |

---

### `onLayout`

Invocado na montagem e em mudanças de layout.

| Type                                                    |
| ------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)} => void` |

---

### `onLoad`

Invocado quando o carregamento é concluído com sucesso.

**Exemplo:** `onLoad={({nativeEvent: {source: {width, height}}}) => setImageRealSize({width, height})}`

| Type                                                                |
| ------------------------------------------------------------------- |
| `md ({nativeEvent: [ImageLoadEvent](image#imageloadevent)} => void` |

---

### `onLoadEnd`

Invocado quando o carregamento é bem-sucedido ou falha.

| Type       |
| ---------- |
| () => void |

---

### `onLoadStart`

Invocado no início do carregamento.

**Exemplo:** `onLoadStart={() => this.setState({loading: true})}`

| Type       |
| ---------- |
| () => void |

---

### `onPartialLoad` <div className="label ios">iOS</div>

Invocado quando um carregamento parcial da imagem está completo. A definição do que constitui um "carregamento parcial" é específica do loader, embora isso seja destinado a carregamentos JPEG progressivos.

| Type       |
| ---------- |
| () => void |

---

### `onProgress`

Invocado no progresso do download.

| Type                                        |
| ------------------------------------------- |
| (`{nativeEvent: {loaded, total} }`) => void |

---

### `progressiveRenderingEnabled` <div className="label android">Android</div>

Quando `true`, habilita streaming jpeg progressivo - https://frescolib.org/docs/progressive-jpegs.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `referrerPolicy`

Uma string indicando qual referenciador usar ao buscar o recurso. Define o valor para o cabeçalho `Referrer-Policy` na requisição da imagem. Funciona de forma semelhante ao atributo `referrerpolicy` em HTML.

| Type                                                                                                                                                                                     | Default                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| enum(`'no-referrer'`, `'no-referrer-when-downgrade'`, `'origin'`, `'origin-when-cross-origin'`, `'same-origin'`, `'strict-origin'`, `'strict-origin-when-cross-origin'`, `'unsafe-url'`) | `'strict-origin-when-cross-origin'` |

---

### `ref`

Um setter de ref que será atribuído a um [element node](element-nodes) quando montado.

---

### `resizeMethod` <div className="label android">Android</div>

O mecanismo que deve ser usado para redimensionar a imagem quando as dimensões da imagem diferem das dimensões da view da imagem. Padrão é `auto`.

- `auto`: Usa heurísticas para escolher entre `resize` e `scale`.

- `resize`: Uma operação de software que altera a imagem codificada na memória antes de ser decodificada. Isso deve ser usado em vez de `scale` quando a imagem é muito maior que a view.

- `scale`: A imagem é desenhada reduzida ou ampliada. Comparado a `resize`, `scale` é mais rápido (geralmente acelerado por hardware) e produz imagens de maior qualidade. Isso deve ser usado se a imagem for menor que a view. Também deve ser usado se a imagem for ligeiramente maior que a view.

- `none`: Nenhuma amostragem é realizada e a imagem é exibida em sua resolução completa. Isso deve ser usado apenas em circunstâncias raras porque é considerado inseguro, pois o Android lançará uma exceção em tempo de execução ao tentar renderizar imagens que consomem muita memória.

Mais detalhes sobre `resize` e `scale` podem ser encontrados em https://frescolib.org/docs/resizing.

| Type                                            | Default  |
| ----------------------------------------------- | -------- |
| enum(`'auto'`, `'resize'`, `'scale'`, `'none'`) | `'auto'` |

---

### `resizeMode`

Determina como redimensionar a imagem quando o quadro não corresponde às dimensões da imagem bruta. Padrão é `cover`.

- `cover`: Escala a imagem uniformemente (mantém a proporção da imagem) de modo que
  - ambas as dimensões (largura e altura) da imagem serão iguais ou maiores que a dimensão correspondente da view (menos o padding)
  - pelo menos uma dimensão da imagem escalonada será igual à dimensão correspondente da view (menos o padding)

- `contain`: Escala a imagem uniformemente (mantém a proporção da imagem) de modo que ambas as dimensões (largura e altura) da imagem sejam iguais ou menores que a dimensão correspondente da view (menos o padding).

- `stretch`: Escala largura e altura independentemente. Isso pode alterar a proporção da src.

- `repeat`: Repete a imagem para cobrir o quadro da view. A imagem manterá seu tamanho e proporção, a menos que seja maior que a view, caso em que será reduzida uniformemente para que seja contida na view.

- `center`: Centraliza a imagem na view em ambas as dimensões. Se a imagem for maior que a view, reduz uniformemente para que seja contida na view.

| Type                                                              | Default   |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `resizeMultiplier` <div className="label android">Android</div>

Quando o `resizeMethod` está definido como `resize`, as dimensões de destino são multiplicadas por este valor. O método `scale` é usado para executar o restante do redimensionamento. Um padrão de `1.0` significa que o tamanho do bitmap é projetado para se ajustar às dimensões de destino. Um multiplicador maior que `1.0` definirá as opções de redimensionamento maiores que as dimensões de destino, e o bitmap resultante será reduzido do tamanho do hardware. Padrão é `1.0`.

Esta prop é mais útil em casos onde as dimensões de destino são bastante pequenas e a imagem de origem é significativamente maior. O método de redimensionamento `resize` executa downsampling e qualidade significativa da imagem é perdida entre os tamanhos de imagem de origem e destino, frequentemente resultando em uma imagem desfocada. Ao usar um multiplicador, a imagem decodificada é ligeiramente maior que o tamanho de destino, mas menor que a imagem de origem (se a imagem de origem for grande o suficiente). Isso permite que artefatos de aliasing produzam qualidade falsa através de operações de escalonamento na imagem multiplicada.

Se você tiver uma imagem de origem com dimensões 200x200 e dimensões de destino de 24x24, um resizeMultiplier de `2.0` dirá ao Fresco para fazer o downsample da imagem para 48x48. O Fresco escolhe a potência de 2 mais próxima (então, 50x50) e decodifica a imagem em um bitmap desse tamanho. Sem o multiplicador, a potência de 2 mais próxima seria 25x25. A imagem resultante é reduzida pelo sistema.

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `source`

A fonte da imagem (seja uma URL remota ou um recurso de arquivo local).

Esta prop também pode conter várias URLs remotas, especificadas juntamente com sua largura e altura e potencialmente com scale/outros argumentos de URI. O lado nativo então escolherá o melhor `uri` para exibir com base no tamanho medido do contêiner de imagem. Uma propriedade `cache` pode ser adicionada para controlar como a requisição em rede interage com o cache local. (Para mais informações, veja [Cache Control for Images](images#cache-control)).

Os formatos atualmente suportados são `png`, `jpg`, `jpeg`, `bmp`, `gif`, `webp`, `psd` (somente iOS). Além disso, o iOS suporta vários formatos de imagem RAW. Consulte a documentação da Apple para a lista atual de modelos de câmera suportados (para iOS 12, veja https://support.apple.com/en-ca/HT208967).

Por favor, note que o formato `webp` é suportado no iOS **somente** quando empacotado com o código JavaScript.

| Type                             |
| -------------------------------- |
| [ImageSource](image#imagesource) |

---

### `src`

Uma string representando a URL remota da imagem. Esta prop tem precedência sobre a prop `source`.

**Exemplo:** `src={'https://reactnative.dev/img/tiny_logo.png'}`

| Type   |
| ------ |
| string |

---

### `srcSet`

Uma string representando uma lista separada por vírgulas de possíveis fontes de imagem candidatas. Cada fonte de imagem contém uma URL de uma imagem e um descritor de densidade de pixels. Se nenhum descritor for especificado, o padrão é descritor de `1x`.

Se `srcSet` não contiver um descritor `1x`, o valor em `src` é usado como fonte de imagem com descritor `1x` (se fornecido).

Esta prop tem precedência sobre as props `src` e `source`.

**Exemplo:** `srcSet={'https://reactnative.dev/img/tiny_logo.png 1x, https://reactnative.dev/img/header_logo.svg 2x'}`

| Type   |
| ------ |
| string |

---

### `style`

| Type                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Image Style Props](image-style-props#props), [Layout Props](layout-props#props), [Shadow Props](shadow-props#props), [Transforms](transforms#props) |

---

### `testID`

Um identificador único para este elemento a ser usado em scripts de teste de automação de UI.

| Type   |
| ------ |
| string |

---

### `tintColor`

Altera a cor de todos os pixels não transparentes para o `tintColor`.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `width`

Largura do componente de imagem.

| Type   |
| ------ |
| number |

## Methods

### `abortPrefetch()` <div className="label android">Android</div>

```tsx
static abortPrefetch(requestId: number);
```

Aborta a requisição de prefetch.

**Parâmetros:**

| Name                                                           | Type   | Description                                     |
| -------------------------------------------------------------- | ------ | ----------------------------------------------- |
| requestId <div className="label basic required">Required</div> | number | ID da requisição retornado por `prefetch()`. |

---

### `getSize()`

```tsx
static getSize(uri: string): Promise<{width: number, height: number}>;
```

Recupera a largura e altura (em pixels) de uma imagem antes de exibi-la. Este método pode falhar se a imagem não puder ser encontrada ou falhar ao baixar.

Para recuperar as dimensões da imagem, a imagem pode primeiro precisar ser carregada ou baixada, após o que será armazenada em cache. Isso significa que, em princípio, você poderia usar este método para pré-carregar imagens, no entanto, ele não é otimizado para esse propósito e pode, no futuro, ser implementado de uma forma que não carrega/baixa completamente os dados da imagem. Uma maneira adequada e suportada de pré-carregar imagens será fornecida como uma API separada.

**Parâmetros:**

| <div className="wideColumn">Name</div>                   | Type   | Description                     |
| -------------------------------------------------------- | ------ | ------------------------------- |
| uri <div className="label basic required">Required</div> | string | A localização da imagem. |

---

### `getSizeWithHeaders()`

```tsx
static getSizeWithHeaders(
  uri: string,
  headers: {[index: string]: string}
): Promise<{width: number, height: number}>;
```

Recupera a largura e altura (em pixels) de uma imagem antes de exibi-la com a capacidade de fornecer os cabeçalhos para a requisição. Este método pode falhar se a imagem não puder ser encontrada ou falhar ao baixar. Ele também não funciona para recursos de imagem estática.

Para recuperar as dimensões da imagem, a imagem pode primeiro precisar ser carregada ou baixada, após o que será armazenada em cache. Isso significa que, em princípio, você poderia usar este método para pré-carregar imagens, no entanto, ele não é otimizado para esse propósito e pode, no futuro, ser implementado de uma forma que não carrega/baixa completamente os dados da imagem. Uma maneira adequada e suportada de pré-carregar imagens será fornecida como uma API separada.

**Parâmetros:**

| <div className="wideColumn">Name</div>                       | Type   | Description                           |
| ------------------------------------------------------------ | ------ | ------------------------------------- |
| uri <div className="label basic required">Required</div>     | string | A localização da imagem.       |
| headers <div className="label basic required">Required</div> | object | Os cabeçalhos para a requisição. |

---

### `prefetch()`

```tsx
await Image.prefetch(url);
```

Faz o prefetch de uma imagem remota para uso posterior baixando-a para o cache de disco. Retorna uma promise que resolve para um boolean.

**Parâmetros:**

| Name                                                     | Type                                                  | Description                                                    |
| -------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| url <div className="label basic required">Required</div> | string                                                | A localização remota da imagem.                         |
| callback                                                 | function <div className="label android">Android</div> | A função que será chamada com o `requestId`. |

---

### `queryCache()`

```tsx
static queryCache(
  urls: string[],
): Promise<Record<string, 'memory' | 'disk' | 'disk/memory'>>;
```

Executa interrogação de cache. Retorna uma promise que resolve para um mapeamento de URL para status de cache, como "disk", "memory" ou "disk/memory". Se uma URL solicitada não estiver no mapeamento, significa que não está no cache.

**Parâmetros:**

| Name                                                      | Type  | Description                                              |
| --------------------------------------------------------- | ----- | -------------------------------------------------------- |
| urls <div className="label basic required">Required</div> | array | Lista de URLs de imagem para verificar no cache. |

---

### `resolveAssetSource()`

```tsx
static resolveAssetSource(source: ImageSourcePropType): {
  height: number;
  width: number;
  scale: number;
  uri: string;
};
```

Resolve uma referência de recurso em um objeto que possui as propriedades `uri`, `scale`, `width` e `height`.

**Parâmetros:**

| <div className="wideColumn">Name</div>                      | Type                                     | Description                                                                                      |
| ----------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| source <div className="label basic required">Required</div> | [ImageSource](image#imagesource), number | Um número (tipo opaco retornado por `require('./foo.png')`) ou um ImageSource. |

## Type Definitions

### ImageCacheEnum <div className="label ios">iOS</div>

Enum que pode ser usado para definir o manuseio de cache ou estratégia para as respostas potencialmente em cache.

| Type                                                               | Default     |
| ------------------------------------------------------------------ | ----------- |
| enum(`'default'`, `'reload'`, `'force-cache'`, `'only-if-cached'`) | `'default'` |

- `default`: Usa a estratégia padrão das plataformas nativas.
- `reload`: Os dados para a URL serão carregados da fonte de origem. Nenhum dado de cache existente deve ser usado para satisfazer uma requisição de carregamento de URL.
- `force-cache`: Os dados em cache existentes serão usados para satisfazer a requisição, independentemente de sua idade ou data de expiração. Se não houver dados existentes no cache correspondentes à requisição, os dados são carregados da fonte de origem.
- `only-if-cached`: Os dados de cache existentes serão usados para satisfazer uma requisição, independentemente de sua idade ou data de expiração. Se não houver dados existentes no cache correspondentes a uma requisição de carregamento de URL, nenhuma tentativa é feita para carregar os dados da fonte de origem, e o carregamento é considerado como tendo falhado.

### ImageLoadEvent

Objeto retornado no callback `onLoad`.

| Type   |
| ------ |
| object |

**Propriedades:**

| Name   | Type   | Description                         |
| ------ | ------ | ----------------------------------- |
| source | object | O [source object](#source-object) |

#### Source Object

**Propriedades:**

| Name   | Type   | Description                                                         |
| ------ | ------ | ------------------------------------------------------------------- |
| width  | number | A largura da imagem carregada.                               |
| height | number | A altura da imagem carregada.                                |
| uri    | string | Uma string representando o identificador de recurso para a imagem. |

### ImageSource

| Type                             |
| -------------------------------- |
| object, array of objects, number |

**Propriedades (se passando como object ou array de objects):**

| <div className="wideColumn">Name</div>     | Type                                       | Description                                                                                                                                                                                                             |
| ------------------------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uri                                        | string                                     | Uma string representando o identificador de recurso para a imagem, que pode ser um endereço http, um caminho de arquivo local ou o nome de um recurso de imagem estática.                                              |
| width                                      | number                                     | Pode ser especificado se conhecido no momento da compilação, caso em que o valor será usado para definir a dimensão padrão do componente `<Image/>`.                                                                   |
| height                                     | number                                     | Pode ser especificado se conhecido no momento da compilação, caso em que o valor será usado para definir a dimensão padrão do componente `<Image/>`.                                                                   |
| scale                                      | number                                     | Usado para indicar o fator de escala da imagem. Padrão é `1.0` se não especificado, significando que um pixel da imagem equivale a um ponto de exibição / DIP.                                                         |
| bundle<div className="label ios">iOS</div> | string                                     | O bundle de recursos iOS no qual a imagem está incluída. O padrão será `[NSBundle mainBundle]` se não definido.                                                                                                        |
| method                                     | string                                     | O método HTTP a ser usado. Padrão é `'GET'` se não especificado.                                                                                                                                                       |
| headers                                    | object                                     | Um objeto representando os cabeçalhos HTTP para enviar junto com a requisição para uma imagem remota.                                                                                                                  |
| body                                       | string                                     | O corpo HTTP para enviar com a requisição. Deve ser uma string UTF-8 válida e será enviado exatamente como especificado, sem codificação adicional (por exemplo, URL-escaping ou base64) aplicada.                     |
| cache<div className="label ios">iOS</div>  | [ImageCacheEnum](image#imagecacheenum-ios) | Determina como as requisições lidam com respostas potencialmente em cache.                                                                                                                                             |

**Se passando um number:**

- `number` - tipo opaco retornado por algo como `require('./image.jpg')`.
