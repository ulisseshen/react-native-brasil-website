---
ia-translated: true
id: security
title: Segurança
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Segurança é frequentemente negligenciada ao construir aplicativos. É verdade que é impossível construir software que seja completamente impenetrável — ainda temos que inventar uma fechadura completamente impenetrável (cofres de banco, afinal, ainda são arrombados). No entanto, a probabilidade de ser vítima de um ataque malicioso ou ser exposto por uma vulnerabilidade de segurança é inversamente proporcional ao esforço que você está disposto a investir para proteger seu aplicativo contra tal eventualidade. Embora um cadeado comum seja passível de arrombamento, ainda é muito mais difícil de ultrapassar do que um gancho de armário!

<img src="/docs/assets/d_security_chart.svg" width={283} alt=" " style={{float: 'right'}} />

Neste guia, você aprenderá sobre as melhores práticas para armazenar informações sensíveis, autenticação, segurança de rede e ferramentas que ajudarão você a proteger seu aplicativo. Esta não é uma checklist pré-voo — é um catálogo de opções, cada uma das quais ajudará a proteger ainda mais seu aplicativo e usuários.

## Armazenando Informações Sensíveis

Nunca armazene API keys sensíveis no código do seu aplicativo. Qualquer coisa incluída no seu código pode ser acessada em texto simples por qualquer pessoa inspecionando o bundle do aplicativo. Ferramentas como [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv) e [react-native-config](https://github.com/luggit/react-native-config/) são ótimas para adicionar variáveis específicas do ambiente como endpoints de API, mas não devem ser confundidas com variáveis de ambiente server-side, que frequentemente podem conter secrets e API keys.

Se você precisa ter uma API key ou um secret para acessar algum recurso do seu aplicativo, a maneira mais segura de lidar com isso seria construir uma camada de orquestração entre seu aplicativo e o recurso. Isso poderia ser uma função serverless (por exemplo, usando AWS Lambda ou Google Cloud Functions) que pode encaminhar a solicitação com a API key ou secret necessário. Secrets em código server-side não podem ser acessados pelos consumidores da API da mesma forma que secrets no código do seu aplicativo podem.

**Para dados persistidos do usuário, escolha o tipo certo de armazenamento com base em sua sensibilidade.** À medida que seu aplicativo é usado, você frequentemente encontrará a necessidade de salvar dados no dispositivo, seja para suportar o uso do seu aplicativo offline, reduzir solicitações de rede ou salvar o token de acesso do usuário entre sessões para que ele não precise re-autenticar cada vez que usar o aplicativo.

:::info
**Persistido vs não persistido** — dados persistidos são gravados no disco do dispositivo, o que permite que os dados sejam lidos pelo seu aplicativo através de lançamentos de aplicativos sem ter que fazer outra solicitação de rede para buscá-los ou pedir ao usuário para inseri-los novamente. Mas isso também pode tornar esses dados mais vulneráveis a serem acessados por atacantes. Dados não persistidos nunca são gravados no disco — então não há dados para acessar!
:::

### Async Storage

[Async Storage](https://github.com/react-native-async-storage/async-storage) é um módulo mantido pela comunidade para React Native que fornece um armazenamento de chave-valor assíncrono e não criptografado. Async Storage não é compartilhado entre aplicativos: cada aplicativo tem seu próprio ambiente sandbox e não tem acesso a dados de outros aplicativos.

| **Use** async storage quando...              | **Não use** async storage para... |
| --------------------------------------------- | ---------------------------------- |
| Persistir dados não sensíveis entre execuções do aplicativo | Armazenamento de token                      |
| Persistir estado Redux                        | Secrets                            |
| Persistir estado GraphQL                      |                                    |
| Armazenar variáveis globais em todo o aplicativo             |                                    |

#### Notas do Desenvolvedor

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["web"])}>

<TabItem value="web">

:::note
Async Storage é o equivalente React Native ao Local Storage da web
:::

</TabItem>
</Tabs>

### Secure Storage

React Native não vem empacotado com nenhuma maneira de armazenar dados sensíveis. No entanto, existem soluções pré-existentes para plataformas Android e iOS.

#### iOS - Keychain Services

[Keychain Services](https://developer.apple.com/documentation/security/keychain_services) permite que você armazene com segurança pequenos pedaços de informações sensíveis para o usuário. Este é um lugar ideal para armazenar certificados, tokens, senhas e qualquer outra informação sensível que não pertence ao Async Storage.

#### Android - Secure Shared Preferences

[Shared Preferences](https://developer.android.com/reference/android/content/SharedPreferences) é o equivalente Android para um armazenamento de dados chave-valor persistente. **Dados em Shared Preferences não são criptografados por padrão**, mas [Encrypted Shared Preferences](https://developer.android.com/topic/security/data) envolve a classe Shared Preferences para Android, e automaticamente criptografa chaves e valores.

#### Android - Keystore

O [Android Keystore](https://developer.android.com/training/articles/keystore) system permite que você armazene chaves criptográficas em um container para tornar mais difícil extrair do dispositivo.

Para usar iOS Keychain services ou Android Secure Shared Preferences, você pode escrever uma bridge você mesmo ou usar uma biblioteca que as envolve para você e fornece uma API unificada por sua conta e risco. Algumas bibliotecas a considerar:

- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [react-native-keychain](https://github.com/oblador/react-native-keychain)

:::warning Cuidado
**Seja cuidadoso para não armazenar ou expor informações sensíveis não intencionalmente.** Isso pode acontecer acidentalmente, por exemplo salvando dados de formulário sensíveis no estado redux e persistindo a árvore de estado completa no Async Storage. Ou enviando tokens de usuário e informações pessoais para um serviço de monitoramento de aplicativos como Sentry ou Crashlytics.
:::

## Autenticação e Deep Linking

<img src="/docs/assets/d_security_deep-linking.svg" width={225} alt=" " style={{float: 'right', margin: '0 0 1em 1em'}} />

Aplicativos móveis têm uma vulnerabilidade única que não existe na web: **deep linking**. Deep linking é uma maneira de enviar dados diretamente para um aplicativo nativo de uma fonte externa. Um deep link se parece com `app://` onde `app` é o esquema do seu aplicativo e qualquer coisa após o // pode ser usada internamente para manipular a solicitação.

Por exemplo, se você estivesse construindo um aplicativo de ecommerce, você poderia usar `app://products/1` para deep link para seu aplicativo e abrir a página de detalhes do produto para um produto com id 1. Você pode pensar neles como URLs na web, mas com uma distinção crucial:

Deep links não são seguros e você nunca deve enviar nenhuma informação sensível neles.

A razão pela qual deep links não são seguros é porque não há método centralizado de registro de esquemas de URL. Como desenvolvedor de aplicativo, você pode usar quase qualquer esquema de url que escolher [configurando-o no Xcode](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) para iOS ou [adicionando uma intent no Android](https://developer.android.com/training/app-links/deep-linking).

Não há nada impedindo um aplicativo malicioso de sequestrar seu deep link também se registrando para o mesmo esquema e então obtendo acesso aos dados que seu link contém. Enviar algo como `app://products/1` não é prejudicial, mas enviar tokens é uma preocupação de segurança.

Quando o sistema operacional tem dois ou mais aplicativos para escolher ao abrir um link, Android mostrará ao usuário um [Disambiguation dialog](https://developer.android.com/training/basics/intents/sending#disambiguation-dialog) e pedirá que ele escolha qual aplicativo usar para abrir o link. No iOS, no entanto, o sistema operacional fará a escolha por você, então o usuário ficará completamente alheio. A Apple deu passos para abordar este problema em versões posteriores do iOS (iOS 11) onde instituíram um princípio de primeiro a chegar, primeiro a ser servido, embora esta vulnerabilidade ainda possa ser explorada de diferentes maneiras sobre as quais você pode ler mais [aqui](https://thehackernews.com/2019/07/ios-custom-url-scheme.html). Usar [universal links](https://developer.apple.com/ios/universal-links/) permitirá vincular ao conteúdo dentro do seu aplicativo com segurança no iOS.

### OAuth2 e Redirects

O protocolo de autenticação OAuth2 é incrivelmente popular atualmente, orgulhoso como o protocolo mais completo e seguro por aí. O protocolo OpenID Connect também é baseado neste. No OAuth2, o usuário é solicitado a autenticar via terceiros. Após conclusão bem-sucedida, este terceiro redireciona de volta ao aplicativo solicitante com um código de verificação que pode ser trocado por um JWT — um [JSON Web Token](https://jwt.io/introduction/). JWT é um padrão aberto para transmitir informações com segurança entre partes na web.

Na web, este passo de redirecionamento é seguro, porque URLs na web são garantidamente únicas. Isso não é verdade para aplicativos porque, como mencionado anteriormente, não há método centralizado de registro de esquemas de URL! Para abordar esta preocupação de segurança, uma verificação adicional deve ser adicionada na forma de PKCE.

[PKCE](https://oauth.net/2/pkce/), pronunciado "Pixy" significa Proof of Key Code Exchange, e é uma extensão para a especificação OAuth 2. Isso envolve adicionar uma camada adicional de segurança que verifica que as solicitações de autenticação e troca de token vêm do mesmo cliente. PKCE usa o [SHA 256](https://www.movable-type.co.uk/scripts/sha256.html) Cryptographic Hash Algorithm. SHA 256 cria uma "assinatura" única para um texto ou arquivo de qualquer tamanho, mas é:

- Sempre do mesmo comprimento independentemente do tamanho do arquivo de entrada
- Garantido sempre produzir o mesmo resultado para a mesma entrada
- Unidirecional (ou seja, você não pode fazer engenharia reversa para revelar a entrada original)

Agora você tem dois valores:

- **code_verifier** - uma grande string aleatória gerada pelo cliente
- **code_challenge** - o SHA 256 do code_verifier

Durante a solicitação inicial `/authorize`, o cliente também envia o `code_challenge` para o `code_verifier` que mantém em memória. Depois que a solicitação authorize retornou corretamente, o cliente também envia o `code_verifier` que foi usado para gerar o `code_challenge`. O IDP então calculará o `code_challenge`, verá se corresponde ao que foi definido na primeira solicitação `/authorize`, e só enviará o access token se os valores corresponderem.

Isso garante que apenas o aplicativo que acionou o fluxo de autorização inicial seria capaz de trocar com sucesso o código de verificação por um JWT. Então, mesmo que um aplicativo malicioso obtenha acesso ao código de verificação, ele será inútil por si só. Para ver isso em ação, confira [este exemplo](https://aaronparecki.com/oauth-2-simplified/#mobile-apps).

Uma biblioteca a considerar para OAuth nativo é [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth). React-native-app-auth é um SDK para comunicação com provedores OAuth2. Ele envolve as bibliotecas nativas [AppAuth-iOS](https://github.com/openid/AppAuth-iOS) e [AppAuth-Android](https://github.com/openid/AppAuth-Android) e pode suportar PKCE.

:::note
`react-native-app-auth` pode suportar PKCE apenas se seu Identity Provider o suportar.
:::

![OAuth2 with PKCE](/docs/assets/diagram_pkce.svg)

## Segurança de Rede

Suas APIs devem sempre usar [SSL encryption](https://www.ssl.com/faqs/faq-what-is-ssl/). SSL encryption protege contra os dados solicitados serem lidos em texto simples entre quando sai do servidor e antes de chegar ao cliente. Você saberá que o endpoint é seguro, porque começa com `https://` em vez de `http://`.

### SSL Pinning

Usar endpoints https ainda pode deixar seus dados vulneráveis a interceptação. Com https, o cliente só confiará no servidor se ele puder fornecer um certificado válido que seja assinado por uma Certificate Authority confiável que esteja pré-instalada no cliente. Um atacante poderia tirar vantagem disso instalando um certificado root CA malicioso no dispositivo do usuário, então o cliente confiaria em todos os certificados que são assinados pelo atacante. Assim, confiar apenas em certificados ainda poderia deixá-lo vulnerável a um [man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

**SSL pinning** é uma técnica que pode ser usada no lado do cliente para evitar este ataque. Funciona incorporando (ou fixando) uma lista de certificados confiáveis ao cliente durante o desenvolvimento, para que apenas as solicitações assinadas com um dos certificados confiáveis sejam aceitas, e quaisquer certificados auto-assinados não serão.

:::warning Cuidado
Ao usar SSL pinning, você deve estar atento à expiração de certificados. Certificados expiram a cada 1-2 anos e quando um expira, ele precisará ser atualizado no aplicativo, bem como no servidor. Assim que o certificado no servidor for atualizado, quaisquer aplicativos com o certificado antigo incorporado neles deixarão de funcionar.
:::

## Resumo

Não há maneira à prova de balas de lidar com segurança, mas com esforço consciente e diligência, é possível reduzir significativamente a probabilidade de uma violação de segurança em seu aplicativo. Invista em segurança proporcional à sensibilidade dos dados armazenados em seu aplicativo, o número de usuários e o dano que um hacker poderia fazer ao obter acesso à conta deles. E lembre-se: é significativamente mais difícil acessar informações que nunca foram solicitadas em primeiro lugar.
