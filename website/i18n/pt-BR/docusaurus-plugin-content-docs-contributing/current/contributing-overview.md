---
ia-translated: true
id: overview
title: Visão Geral de Contribuições
description: Como contribuir para o React Native
---

<!-- alex disable simple simply -->

Obrigado pelo seu interesse em contribuir para o React Native! Desde comentar e fazer triagem de issues, até revisar e enviar Pull Requests, todas as contribuições são bem-vindas.
Nosso objetivo é construir um [ecossistema vibrante e inclusivo de parceiros, contribuidores principais e comunidade](https://github.com/facebook/react-native/blob/main/ECOSYSTEM.md) que vai além do repositório principal do React Native no GitHub.

O site [Open Source Guides](https://opensource.guide/) tem uma coleção de recursos para indivíduos, comunidades e empresas que desejam aprender como executar e contribuir para um projeto open source.

Contribuidores e pessoas novas em open source encontrarão os seguintes guias especialmente úteis:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Building Welcoming Communities](https://opensource.guide/building-community/)

### Code of Conduct

Como lembrete, espera-se que todos os contribuidores sigam o [Code of Conduct](https://github.com/facebook/react-native/blob/HEAD/CODE_OF_CONDUCT.md).

## Política de Versionamento

Para entender completamente o versionamento do React Native, recomendamos que você confira a página [Versioning Policy](/docs/releases/versioning-policy).
Nessa página, descrevemos quais versões do React Native são suportadas, com que frequência são lançadas e qual você deve usar com base em suas circunstâncias.

## Formas de Contribuir

Se você está ansioso para começar a contribuir com código imediatamente, temos uma lista de [good first issues](https://github.com/facebook/react-native/labels/good%20first%20issue) que contêm bugs com escopo relativamente limitado.
À medida que você ganha mais experiência e demonstra um compromisso com a evolução do React Native, você pode receber permissões de gerenciamento de issues no repositório.

Existem outras maneiras de contribuir sem escrever uma única linha de código. Aqui estão algumas coisas que você pode fazer para ajudar:

1. **Responder e lidar com issues abertas.**

   Recebemos muitas issues todos os dias, e algumas delas podem não ter informações necessárias. Você pode ajudar guiando as pessoas pelo processo de preenchimento do template de issue, solicitando informações esclarecedoras ou apontando-as para issues existentes que correspondam à sua descrição do problema.
   Cobrimos mais sobre esse processo na página [Triaging GitHub Issues](/contributing/triaging-github-issues).

2. **Revisar pull requests para a documentação.**

   Revisar [atualizações de documentação](https://github.com/facebook/react-native-website/pulls) pode ser tão simples quanto verificar ortografia e gramática.
   Se você encontrar situações que podem ser explicadas melhor na documentação, clique em **Edit** no topo da maioria das páginas de documentação para começar com sua própria contribuição.

3. **Ajudar pessoas a escrever test plans.**

   Alguns pull requests enviados para o repositório principal podem não ter um test plan adequado. Eles ajudam os revisores a entender como a mudança foi testada e podem acelerar o tempo necessário para que uma contribuição seja aceita.

Cada uma dessas tarefas é altamente impactante, e os mantenedores apreciarão muito sua ajuda.

### Nosso Processo de Desenvolvimento

Usamos GitHub issues e pull requests para acompanhar relatórios de bugs e contribuições da comunidade. Todas as mudanças de engenheiros da Meta serão sincronizadas com o [GitHub](https://github.com/facebook/react-native) através de uma ponte com o controle de código-fonte interno da Meta. Mudanças da comunidade são tratadas através de pull requests do GitHub.

Uma vez que uma mudança feita no GitHub é aprovada, ela será primeiro importada para o controle de código-fonte interno do Facebook e testada contra a base de código do Facebook. Uma vez mesclada no Facebook, a mudança eventualmente será sincronizada de volta ao GitHub como um único commit quando tiver passado nos testes internos do Facebook.

Você pode aprender mais sobre o processo de contribuição nos seguintes documentos:

- [Triaging GitHub Issues](/contributing/triaging-github-issues)
- [Managing Pull Requests](/contributing/managing-pull-requests)

Também temos uma comunidade próspera de contribuidores que ficariam felizes em ajudá-lo a começar. Você pode entrar em contato com a equipe do React Native através de [@ReactNative](https://twitter.com/reactnative).

### Repositories

O repositório principal contém o framework React Native em si, e é aqui que acompanhamos relatórios de bugs e gerenciamos pull requests.

Existem alguns outros repositórios com os quais você pode querer se familiarizar:

- **React Native website** que contém o código-fonte do site, incluindo a documentação, localizado [neste repositório](https://github.com/facebook/react-native-website).
- **Releases** conversas estão acontecendo [neste repositório de discussões](https://github.com/reactwg/react-native-releases/discussions).
- **Changelog** para os releases pode ser encontrado [aqui](https://github.com/facebook/react-native/blob/main/CHANGELOG.md).
- **Discussions** sobre React Native acontecem no repositório [Discussions and Proposals](https://github.com/react-native-community/discussions-and-proposals).
- **Discussions** sobre a nova arquitetura do React Native acontecem no repositório [React Native New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture).
- **High-quality plugins** para React Native podem ser encontrados no site [React Native Directory](https://reactnative.directory).

Navegar por esses repositórios deve fornecer alguma visão sobre como o projeto open source do React Native é gerenciado.

## GitHub Issues

Usamos GitHub issues para rastrear bugs exclusivamente. Documentamos nossos processos de tratamento de issues na [Triaging Issues Page](/contributing/triaging-github-issues).

### Security Bugs

A Meta tem um [programa de recompensas](https://www.facebook.com/whitehat/) para a divulgação segura de bugs de segurança. Nesses casos, por favor, siga o processo descrito naquela página e não registre uma issue pública.

## Ajudando com a Documentação

A documentação do React Native está hospedada como parte do repositório do site do React Native. O site é construído usando [Docusaurus](https://docusaurus.io/). Se houver algo que você gostaria de mudar na documentação, você pode começar clicando no botão "Edit" localizado no canto superior direito da maioria das páginas do site.

Se você está adicionando uma nova funcionalidade ou introduzindo uma mudança no comportamento, pediremos que você atualize a documentação para refletir suas mudanças.

### Contribuindo para o Blog

O blog do React Native é gerado [a partir das fontes Markdown do blog](https://github.com/facebook/react-native-website/tree/HEAD/website/blog).

Por favor, abra uma issue no repositório do site do React Native ou nos marque no [@ReactNative no Twitter](https://twitter.com/reactnative) e obtenha a aprovação de um mantenedor antes de escrever um artigo destinado ao blog do React Native.
Na maioria dos casos, você pode querer compartilhar seu artigo em seu próprio blog ou meio de escrita. Vale a pena perguntar, no entanto, caso achemos que seu artigo é uma boa opção para o blog.

Recomendamos consultar o arquivo [Readme](https://github.com/facebook/react-native-website#-contributing) do repositório `react-native-website` para saber mais sobre como contribuir para o site em geral.

## Contribuindo com Código

Contribuições de código para o React Native geralmente vêm na forma de [pull requests](https://help.github.com/en/articles/about-pull-requests). Elas são feitas fazendo fork do repositório e fazendo mudanças localmente.

### Guia Passo a Passo

Sempre que estiver pronto para contribuir com código, confira nosso [guia passo a passo para enviar seu primeiro pull request](/contributing/how-to-open-a-pull-request), ou leia a página [How to Contribute Code](/contributing/how-to-contribute-code) para mais detalhes.

### Tests

Tests ajudam a prevenir que regressões sejam introduzidas na base de código. O repositório do GitHub é continuamente testado usando CircleCI, cujos resultados estão disponíveis através da funcionalidade Checks em [commits](https://github.com/facebook/react-native/commits/HEAD) e pull requests.

Você pode aprender mais sobre executar e escrever tests na página [How to Run and Write Tests](/contributing/how-to-run-and-write-tests).

## Contribuições da Comunidade

Contribuições para o React Native não estão limitadas ao GitHub. Você pode ajudar outros compartilhando sua experiência usando React Native, seja através de posts em blogs, apresentando palestras em conferências, ou simplesmente compartilhando seus pensamentos no Twitter e marcando [@ReactNative](https://twitter.com/reactnative).
