---
ia-translated: true
title: Usando AWS com React Native
author: Richard Threlkeld
authorTitle: Senior Technical Product Manager at AWS Mobile
authorURL: 'https://twitter.com/undef_obj'
authorImageURL: 'https://pbs.twimg.com/profile_images/811239086581227520/APX1eZwF_400x400.jpg'
authorTwitter: undef_obj
tags: [engineering]
---

AWS é bem conhecida na indústria de tecnologia como um provedor de serviços em nuvem. Isso inclui tecnologias de computação, armazenamento e banco de dados, bem como ofertas serverless totalmente gerenciadas. A equipe AWS Mobile tem trabalhado de perto com clientes e membros do ecossistema JavaScript para tornar aplicações móveis e web conectadas à nuvem mais seguras, escaláveis e mais fáceis de desenvolver e implantar. Começamos com um [kit inicial completo](https://github.com/awslabs/aws-mobile-react-native-starter), mas temos alguns desenvolvimentos mais recentes.

Este blog post fala sobre algumas coisas interessantes para desenvolvedores React e React Native:

- [**AWS Amplify**](https://github.com/aws/aws-amplify), uma biblioteca declarativa para aplicações JavaScript usando serviços em nuvem
- [**AWS AppSync**](https://aws.amazon.com/appsync/), um serviço GraphQL totalmente gerenciado com recursos offline e em tempo real

## AWS Amplify

Aplicações React Native são muito fáceis de inicializar usando ferramentas como Create React Native App e Expo. No entanto, conectá-las à nuvem pode ser desafiador de navegar quando você tenta combinar um caso de uso com serviços de infraestrutura. Por exemplo, seu app React Native pode precisar fazer upload de fotos. Elas devem ser protegidas por usuário? Isso provavelmente significa que você precisa de algum tipo de processo de registro ou login. Você quer seu próprio diretório de usuários ou está usando um provedor de mídia social? Talvez seu app também precise chamar uma API com lógica de negócios customizada depois que os usuários fazem login.

Para ajudar desenvolvedores JavaScript com esses problemas, lançamos uma biblioteca chamada AWS Amplify. O design é dividido em "categorias" de tarefas, em vez de implementações específicas da AWS. Por exemplo, se você quiser que os usuários se registrem, façam login e então façam upload de fotos privadas, você simplesmente puxaria as categorias `Auth` e `Storage` para sua aplicação:

```
import { Auth } from 'aws-amplify';

Auth.signIn(username, password)
    .then(user => console.log(user))
    .catch(err => console.log(err));

Auth.confirmSignIn(user, code)
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

No código acima, você pode ver um exemplo de algumas das tarefas comuns com as quais o Amplify ajuda você, como usar códigos de autenticação multifator (MFA) com email ou SMS. As categorias suportadas hoje são:

- **Auth**: Fornece automação de credenciais. A implementação out-of-the-box usa credenciais AWS para assinatura, e tokens OIDC JWT do [Amazon Cognito](https://aws.amazon.com/cognito/). Funcionalidades comuns, como recursos MFA, são suportadas.
- **Analytics**: Com uma única linha de código, obtenha rastreamento para usuários autenticados ou não autenticados no [Amazon Pinpoint](https://aws.amazon.com/pinpoint/). Estenda isso para métricas ou atributos customizados, conforme preferir.
- **API**: Fornece interação com APIs RESTful de forma segura, aproveitando [AWS Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). O módulo API é ótimo em infraestruturas serverless com [Amazon API Gateway](https://aws.amazon.com/api-gateway/).
- **Storage**: Comandos simplificados para fazer upload, download e listar conteúdo no [Amazon S3](https://aws.amazon.com/s3/). Você também pode facilmente agrupar dados em conteúdo público ou privado por usuário.
- **Caching**: Uma interface de cache LRU através de apps web e React Native que usa persistência específica da implementação.
- **i18n e Logging**: Fornece capacidades de internacionalização e localização, bem como capacidades de debugging e logging.

Uma das coisas legais sobre o Amplify é que ele codifica "melhores práticas" no design para o seu ambiente de programação específico. Por exemplo, uma coisa que descobrimos trabalhando com clientes e desenvolvedores React Native é que atalhos tomados durante o desenvolvimento para fazer as coisas funcionarem rapidamente passariam para pilhas de produção. Isso pode comprometer escalabilidade ou segurança, e forçar rearquitetura de infraestrutura e refatoração de código.

Um exemplo de como ajudamos desenvolvedores a evitar isso são as [Arquiteturas de Referência Serverless com AWS Lambda](https://www.allthingsdistributed.com/2016/06/aws-lambda-serverless-reference-architectures.html). Elas mostram melhores práticas sobre usar Amazon API Gateway e AWS Lambda juntos ao construir seu backend. Este padrão é codificado na categoria `API` do Amplify. Você pode usar este padrão para interagir com vários endpoints REST diferentes, e passar headers até sua função Lambda para lógica de negócios customizada. Também lançamos uma [AWS Mobile CLI](https://docs.aws.amazon.com/aws-mobile/latest/developerguide/react-native-getting-started.html) para inicializar projetos React Native novos ou existentes com esses recursos. Para começar, basta instalar via **npm** e seguir os prompts de configuração:

```
npm install --global awsmobile-cli
awsmobile configure
```

Outro exemplo de melhores práticas codificadas que é específico do ecossistema móvel é segurança de senha. A implementação padrão da categoria `Auth` aproveita os user pools do Amazon Cognito para registro e login de usuários. Este serviço implementa [protocolo Secure Remote Password](https://srp.stanford.edu) como uma forma de proteger usuários durante tentativas de autenticação. Se você está inclinado a ler através da [matemática do protocolo](https://srp.stanford.edu/ndss.html#SECTION00032200000000000000), você notará que deve usar um número primo grande ao calcular o verificador de senha sobre uma raiz primitiva para gerar um Group. Em ambientes React Native, [JIT está desabilitado](/docs/javascript-environment). Isso torna cálculos BigInteger para operações de segurança como esta menos performáticos. Para levar isso em conta, lançamos bridges nativos em Android e iOS que você pode linkar dentro do seu projeto:

```
npm install --save aws-amplify-react-native
react-native link amazon-cognito-identity-js
```

Também estamos animados em ver que a equipe do Expo incluiu isso [em seu último SDK](https://blog.expo.io/expo-sdk-v25-0-0-is-now-available-714d10a8c3f7) para que você possa usar o Amplify sem ejetar.

Finalmente, específico para desenvolvimento React Native (e React), o Amplify contém [higher order components (HOCs)](https://reactjs.org/docs/higher-order-components.html) para encapsular facilmente funcionalidades, como para inscrição e login no seu app:

```
import Amplify, { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends React.Component {
...
}

export default withAuthenticator(App);
```

O componente subjacente também é fornecido como `<Authenticator />`, que lhe dá controle total para customizar a UI. Ele também lhe dá algumas propriedades sobre gerenciar o estado do usuário, como se eles fizeram login ou estão esperando confirmação MFA, e callbacks que você pode disparar quando o estado muda.

Da mesma forma, você encontrará componentes React gerais que pode usar para diferentes casos de uso. Você pode customizá-los para suas necessidades, por exemplo, para mostrar todas as imagens privadas do Amazon S3 no módulo `Storage`:

```
<S3Album
  level="private"
  path={path}
  filter={(item) => /jpg/i.test(item.path)}/>
```

Você pode controlar muitos dos recursos do componente via props, como mostrado anteriormente, com opções de armazenamento público ou privado. Existem até capacidades para coletar automaticamente analytics quando usuários interagem com certos componentes de UI:

```
return <S3Album track/>
```

AWS Amplify favorece um estilo de desenvolvimento de convenção sobre configuração, com uma rotina de inicialização global ou inicialização no nível da categoria. A maneira mais rápida de começar é com um [arquivo aws-exports](https://aws.amazon.com/blogs/mobile/enhanced-javascript-development-with-aws-mobile-hub/). No entanto, desenvolvedores também podem usar a biblioteca independentemente com recursos existentes.

Para um mergulho profundo na filosofia e para ver uma demonstração completa, confira o vídeo do [AWS re\:Invent](https://www.youtube.com/watch?v=vAjf3lyjf8c).

## AWS AppSync

Logo após o lançamento do AWS Amplify, também lançamos [AWS AppSync](https://aws.amazon.com/appsync/). Este é um serviço GraphQL totalmente gerenciado que tem capacidades offline e em tempo real. Embora você possa usar GraphQL em diferentes linguagens de programação cliente (incluindo Android e iOS nativos), é bastante popular entre desenvolvedores React Native. Isso porque o modelo de dados se encaixa bem em um fluxo de dados unidirecional e hierarquia de componentes.

AWS AppSync permite que você se conecte a recursos em sua própria conta AWS, o que significa que você possui e controla seus dados. Isso é feito usando data sources, e o serviço suporta [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), [Amazon Elasticsearch](https://aws.amazon.com/elasticsearch-service/) e [AWS Lambda](https://aws.amazon.com/lambda/). Isso permite que você combine funcionalidades (como NoSQL e pesquisa full-text) em uma única API GraphQL como um schema. Isso permite que você misture e combine data sources. O serviço AppSync também pode [provisionar a partir de um schema](https://docs.aws.amazon.com/appsync/latest/devguide/provision-from-schema.html), então se você não está familiarizado com serviços AWS, pode escrever GraphQL SDL, clicar em um botão, e estará automaticamente funcionando.

A funcionalidade em tempo real no AWS AppSync é controlada via [subscriptions GraphQL com um padrão baseado em eventos bem conhecido](https://graphql.org/blog/subscriptions-in-graphql-and-relay/). Como as subscriptions no AWS AppSync são [controladas no schema](https://docs.aws.amazon.com/appsync/latest/devguide/real-time-data.html) com uma diretiva GraphQL, e um schema pode usar qualquer data source, isso significa que você pode disparar notificações de operações de banco de dados com Amazon DynamoDB e Amazon Elasticsearch Service, ou de outras partes da sua infraestrutura com AWS Lambda.

De forma similar ao AWS Amplify, você pode usar [recursos de segurança enterprise](https://docs.aws.amazon.com/appsync/latest/devguide/security.html) em sua API GraphQL com AWS AppSync. O serviço permite que você comece rapidamente com API keys. No entanto, conforme você vai para produção, pode fazer a transição para usar AWS Identity and Access Management (IAM) ou tokens OIDC dos user pools do Amazon Cognito. Você pode controlar o acesso no nível do resolver com políticas em types. Você pode até usar verificações lógicas para [controle de acesso refinado](https://docs.aws.amazon.com/appsync/latest/devguide/security.html#fine-grained-access-control) em tempo de execução, como detectar se um usuário é o proprietário de um recurso específico do banco de dados. Também existem capacidades sobre verificar membership de grupo para executar resolvers ou acesso a registros individuais do banco de dados.

Para ajudar desenvolvedores React Native a aprender mais sobre essas tecnologias, existe um [schema GraphQL de amostra integrado](https://docs.aws.amazon.com/appsync/latest/devguide/quickstart.html) que você pode lançar na página inicial do console AWS AppSync. Esta amostra implanta um schema GraphQL, provisiona tabelas de banco de dados e conecta queries, mutations e subscriptions automaticamente para você. Também existe um [exemplo React Native funcional para AWS AppSync](https://github.com/aws-samples/aws-mobile-appsync-events-starter-react-native) que aproveita este schema integrado (bem como um [exemplo React](https://github.com/aws-samples/aws-mobile-appsync-events-starter-react)), que permitem que você tenha seus componentes cliente e nuvem rodando em minutos.

Começar é simples quando você usa o `AWSAppSyncClient`, que se conecta ao [Apollo Client](https://github.com/apollographql/apollo-client). O `AWSAppSyncClient` lida com segurança e assinatura para sua API GraphQL, funcionalidade offline e o processo de handshake e negociação de subscription:

```
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";

const client = new AWSAppSyncClient({
  url: awsconfig.graphqlEndpoint,
  region: awsconfig.region,
  auth: {type: AUTH_TYPE.API_KEY, apiKey: awsconfig.apiKey}
});
```

O console AppSync fornece um arquivo de configuração para download, que contém seu endpoint GraphQL, AWS Region e API key. Você pode então usar o client com [React Apollo](https://github.com/apollographql/react-apollo):

```
const WithProvider = () => (
  <ApolloProvider client={client}>
      <Rehydrated>
          <App />
      </Rehydrated>
  </ApolloProvider>
);
```

Neste ponto, você pode usar queries GraphQL padrão:

```
query ListEvents {
    listEvents{
      items{
        __typename
        id
        name
        where
        when
        description
        comments{
          __typename
          items{
            __typename
            eventId
            commentId
            content
            createdAt
          }
          nextToken
        }
      }
    }
}
```

O exemplo acima mostra uma query com o schema do app de amostra provisionado pelo AppSync. Ele não apenas mostra a interação com o DynamoDB, mas também inclui paginação de dados (incluindo tokens criptografados) e relações de tipo entre `Events` e `Comments`. Como o app está configurado com o `AWSAppSyncClient`, os dados são automaticamente persistidos offline e sincronizarão quando os dispositivos se reconectarem.

Você pode ver um mergulho profundo da [tecnologia cliente por trás disso e uma demonstração React Native neste vídeo](https://www.youtube.com/watch?v=FtkVlIal_m0).

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/FtkVlIal_m0?rel=0"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen></iframe>

## Feedback

A equipe por trás das bibliotecas está ansiosa para ouvir como essas bibliotecas e serviços funcionam para você. Eles também querem ouvir o que mais podemos fazer para tornar o desenvolvimento React e React Native com serviços em nuvem mais fácil para você. Entre em contato com a equipe AWS Mobile no GitHub para [AWS Amplify](https://github.com/aws/aws-amplify) ou [AWS AppSync](https://github.com/aws-samples/aws-mobile-appsync-events-starter-react-native).
