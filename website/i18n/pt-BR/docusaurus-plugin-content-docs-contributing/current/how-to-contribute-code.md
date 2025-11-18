---
ia-translated: true
title: Como Contribuir com Código
---

Obrigado pelo seu interesse em contribuir com o React Native! Desde comentar e classificar issues, até revisar e enviar PRs, [todas as contribuições são bem-vindas](/contributing/overview). Neste documento, abordaremos os passos para contribuir com código para o React Native.

Se você está ansioso para começar a contribuir com código imediatamente, temos uma lista de [`Good first issues`](https://github.com/facebook/react-native/labels/good%20first%20issue) que contêm bugs com escopo relativamente limitado.
Issues rotuladas como [`Help wanted`](https://github.com/facebook/react-native/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22help+wanted+%3Aoctocat%3A%22+sort%3Aupdated-desc+) são boas issues para submeter um PR.

## Pré-requisitos

:::info
Por favor, consulte o guia de [Configuração do Ambiente](/docs/environment-setup) para configurar as ferramentas necessárias e o ambiente de desenvolvimento baseado na plataforma que você usa e na plataforma para a qual você deseja desenvolver.
:::

## Fluxo de Trabalho de Desenvolvimento

Após clonar o React Native, abra o diretório e execute `yarn` para instalar suas dependências.

Agora você está pronto para executar vários comandos:

- `yarn start` inicia o servidor do Metro packager.
- `yarn lint` verifica o estilo do código.
- `yarn format` formata automaticamente seu código.
- `yarn test` executa a suite de testes JavaScript baseada em Jest.
  - `yarn test --watch` executa um observador de testes JavaScript interativo.
  - `yarn test <pattern>` executa testes JavaScript com nomes de arquivo correspondentes.
- `yarn flow` executa as verificações de tipo do [Flow](https://flowtype.org/).
  - `yarn flow-check-android` faz uma verificação completa do Flow sobre arquivos `*.android.js`.
  - `yarn flow-check-ios` faz uma verificação completa do Flow sobre arquivos `*.ios.js`.
- `yarn test-typescript` executa as verificações de tipo do [TypeScript](https://www.typescriptlang.org/).
- `yarn test-ios` executa a suite de testes do iOS (macOS necessário).
- `yarn build` compila todos os pacotes configurados — em geral, este comando só precisa ser executado pelo CI antes da publicação.
  - Pacotes que requerem compilação são configurados em [scripts/build/config.js](https://github.com/facebook/react-native/blob/main/scripts/build/config.js).
- `yarn build-types` gera tipos TypeScript para a API pública e atualiza o snapshot.

## Testando suas Alterações

Os testes nos ajudam a prevenir que regressões sejam introduzidas na base de código. Recomendamos executar `yarn test` ou os scripts específicos de plataforma acima para garantir que você não introduza regressões enquanto trabalha em sua alteração.

O repositório do GitHub é [testado continuamente](/contributing/how-to-run-and-write-tests#continuous-testing) usando CircleCI, cujos resultados estão disponíveis através da funcionalidade Checks em [commits](https://github.com/facebook/react-native/commits/main) e pull requests.

Você pode aprender mais sobre execução e escrita de testes na página [Como Executar e Escrever Testes](/contributing/how-to-run-and-write-tests).

## Estilo de Código

Usamos Prettier para formatar nosso código JavaScript. Isso economiza seu tempo e energia, pois você pode deixar o Prettier corrigir quaisquer problemas de formatação automaticamente através de suas integrações com editores, ou executando manualmente `yarn run prettier`. Também usamos um linter para capturar problemas de estilo que podem existir em seu código. Você pode verificar o status do estilo do seu código executando `yarn run lint`.

No entanto, ainda existem alguns estilos que o linter não consegue capturar, notavelmente em código Java ou Objective-C.

### Objective-C

- Espaço após declarações `@property`
- Chaves em _todo_ `if`, na _mesma_ linha
- Chaves de `- method`, `@interface` e `@implementation` na linha seguinte
- _Tente_ manter em torno de 80 caracteres de comprimento de linha (às vezes não é possível...)
- Operador `*` vai com o nome da variável (por exemplo, `NSObject *variableName;`)

### Java

- Se uma chamada de método abrange várias linhas, a chave de fechamento fica na mesma linha do último argumento.
- Se um cabeçalho de método não cabe em uma linha, cada argumento vai em uma linha separada.
- 100 caracteres de comprimento de linha

## Enviando um Pull Request

Contribuições de código para o React Native geralmente vêm na forma de [um pull request](https://help.github.com/en/articles/about-pull-requests). O processo de propor uma alteração para o React Native pode ser resumido da seguinte forma:

1. Faça um fork do repositório React Native e crie seu branch a partir de `main`.
2. Se você adicionou código que deve ser testado, adicione testes.
3. Se você alterou APIs, atualize a documentação.
4. Certifique-se de que a suite de testes passa, localmente ou no CI assim que você abrir um pull request.
5. Certifique-se de que seu código passa no lint (por exemplo, via `yarn lint --fix`).
6. Verifique se seu código modifica a API pública JS com `yarn build-types --validate`. Se sim, regenere o snapshot usando `yarn build-types`.
7. Faça push das alterações para seu fork.
8. Crie um pull request para o repositório React Native.
9. Revise e responda aos comentários em seu pull request.
10. Um bot pode comentar com sugestões. Geralmente pedimos que você resolva essas primeiro antes que um mantenedor revise seu código.
11. Se você ainda não o fez, submeta o [Contributor License Agreement ("CLA")](#contributor-license-agreement).

Se tudo correr bem, seu pull request será mesclado. Se não for mesclado, os mantenedores farão o melhor para explicar suas razões.

Se esta é sua primeira vez enviando um pull request, criamos um [guia passo a passo para ajudá-lo a começar](/contributing/how-to-open-a-pull-request). Para informações mais detalhadas sobre como pull requests são tratados, consulte a página [Gerenciando Pull Requests](managing-pull-requests).

### Contributor License Agreement

Para aceitar seu pull request, precisamos que você submeta um [Contributor License Agreement (CLA)](/contributing/contribution-license-agreement). Você só precisa fazer isso uma vez para trabalhar em qualquer um dos projetos open source da Meta. Leva apenas um minuto, então você pode fazer isso enquanto espera suas dependências instalarem.

## Licença

Ao contribuir com o React Native, você concorda que suas contribuições serão licenciadas sob o arquivo [LICENSE](https://github.com/facebook/react-native/blob/main/LICENSE) no diretório raiz do repositório React Native.
