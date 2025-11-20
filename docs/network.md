---
id: network
title: Networking
ia-translated: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Muitos aplicativos móveis precisam carregar recursos de uma URL remota. Você pode querer fazer uma requisição POST para uma API REST, ou pode precisar buscar um pedaço de conteúdo estático de outro servidor.

## Usando Fetch

React Native fornece a [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) para suas necessidades de networking. Fetch parecerá familiar se você já usou `XMLHttpRequest` ou outras APIs de networking antes. Você pode consultar o guia da MDN sobre [Usando Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) para informações adicionais.

### Fazendo requisições

Para buscar conteúdo de uma URL arbitrária, você pode passar a URL para fetch:

```tsx
fetch('https://mywebsite.com/mydata.json');
```

Fetch também aceita um segundo argumento opcional que permite você personalizar a requisição HTTP. Você pode querer especificar headers adicionais, ou fazer uma requisição POST:

```tsx
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  }),
});
```

Dê uma olhada na [documentação do Fetch Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) para uma lista completa de propriedades.

### Lidando com a resposta

Os exemplos acima mostram como você pode fazer uma requisição. Em muitos casos, você vai querer fazer algo com a resposta.

Networking é uma operação inerentemente assíncrona. O método Fetch retornará uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) que torna direto escrever código que funciona de maneira assíncrona:

```tsx
const getMoviesFromApi = () => {
  return fetch('https://reactnative.dev/movies.json')
    .then(response => response.json())
    .then(json => {
      return json.movies;
    })
    .catch(error => {
      console.error(error);
    });
};
```

Você também pode usar a sintaxe `async` / `await` em um aplicativo React Native:

```tsx
const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch(
      'https://reactnative.dev/movies.json',
    );
    const json = await response.json();
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};
```

Não se esqueça de capturar quaisquer erros que possam ser lançados por `fetch`, caso contrário eles serão descartados silenciosamente.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Fetch%20Example&ext=js
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Fetch%20Example&ext=tsx
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

type MoviesResponse = {
  title: string;
  description: string;
  movies: Movie[];
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = (await response.json()) as MoviesResponse;
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
```

</TabItem>
</Tabs>

:::info
Por padrão, iOS 9.0 ou posterior impõe App Transport Security (ATS). ATS requer que qualquer conexão HTTP use HTTPS. Se você precisar buscar de uma URL cleartext (uma que comece com `http`) você primeiro precisará [adicionar uma exceção ATS](integration-with-existing-apps.md#test-your-integration). Se você sabe com antecedência quais domínios você precisará acessar, é mais seguro adicionar exceções apenas para esses domínios; se os domínios não forem conhecidos até o runtime você pode [desabilitar ATS completamente](publishing-to-app-store.md#1-enable-app-transport-security). Note, no entanto, que desde janeiro de 2017, [a revisão da App Store da Apple exigirá justificativa razoável para desabilitar ATS](https://forums.developer.apple.com/thread/48979). Veja [documentação da Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33) para mais informações.
:::

:::tip
No Android, a partir do API Level 28, tráfego de texto claro também é bloqueado por padrão. Este comportamento pode ser sobrescrito definindo [`android:usesCleartextTraffic`](https://developer.android.com/guide/topics/manifest/application-element#usesCleartextTraffic) no arquivo manifest do aplicativo.
:::

## Usando Outras Bibliotecas de Networking

A [API XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) está embutida no React Native. Isso significa que você pode usar bibliotecas de terceiros como [frisbee](https://github.com/niftylettuce/frisbee) ou [axios](https://github.com/axios/axios) que dependem dela, ou você pode usar a API XMLHttpRequest diretamente se preferir.

```tsx
const request = new XMLHttpRequest();
request.onreadystatechange = e => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};

request.open('GET', 'https://mywebsite.com/endpoint/');
request.send();
```

:::warning Caution
O modelo de segurança para XMLHttpRequest é diferente da web, pois não há conceito de [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) em aplicativos nativos.
:::

## Suporte a WebSocket

React Native também suporta [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket), um protocolo que fornece canais de comunicação full-duplex sobre uma única conexão TCP.

```tsx
const ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = e => {
  // a message was received
  console.log(e.data);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};
```

## Problemas Conhecidos com `fetch` e autenticação baseada em cookie

As seguintes opções atualmente não estão funcionando com `fetch`

- `redirect:manual`
- `credentials:omit`

* Ter headers de mesmo nome no Android resultará em apenas o mais recente estar presente. Uma solução temporária pode ser encontrada aqui: https://github.com/facebook/react-native/issues/18837#issuecomment-398779994.
* Autenticação baseada em cookie está atualmente instável. Você pode ver algumas das issues levantadas aqui: https://github.com/facebook/react-native/issues/23185
* Como mínimo no iOS, quando redirecionado através de um `302`, se um header `Set-Cookie` estiver presente, o cookie não é definido corretamente. Como o redirecionamento não pode ser tratado manualmente, isso pode causar um cenário onde requisições infinitas ocorrem se o redirecionamento for o resultado de uma sessão expirada.

## Configurando NSURLSession no iOS

Para algumas aplicações pode ser apropriado fornecer uma `NSURLSessionConfiguration` personalizada para a `NSURLSession` subjacente que é usada para requisições de rede em um aplicativo React Native rodando no iOS. Por exemplo, pode ser necessário definir uma user agent string personalizada para todas as requisições de rede vindas do aplicativo ou fornecer à `NSURLSession` uma `NSURLSessionConfiguration` ephemeral. A função `RCTSetCustomNSURLSessionConfigurationProvider` permite tal personalização. Lembre-se de adicionar o seguinte import ao arquivo no qual `RCTSetCustomNSURLSessionConfigurationProvider` será chamado:

```objectivec
#import <React/RCTHTTPRequestHandler.h>
```

`RCTSetCustomNSURLSessionConfigurationProvider` deve ser chamado cedo no ciclo de vida da aplicação de modo que esteja prontamente disponível quando necessário pelo React, por exemplo:

```objectivec
-(void)application:(__unused UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  // set RCTSetCustomNSURLSessionConfigurationProvider
  RCTSetCustomNSURLSessionConfigurationProvider(^NSURLSessionConfiguration *{
     NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
     // configure the session
     return configuration;
  });

  // set up React
  _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
}
```
