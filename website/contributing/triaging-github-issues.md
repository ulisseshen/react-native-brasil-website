---
title: Triagem de Issues do GitHub
ia-translated: true
---

Comece procurando por issues que precisam de triagem, identificadas pela [label "Needs: Triage"](https://github.com/facebook/react-native/issues?q=is%3Aissue+is%3Aopen+label%3A%22Needs%3A+Triage+%3Amag%3A%22).

- Esta é uma solicitação de ajuda em nível de código para um aplicativo individual? Seria mais adequado para o Stack Overflow? Se sim, aplique a label "Resolution: For Stack Overflow".
- Esta issue faz uso apropriado do template? Se não, aplique a label "Needs: Template".
- Esta issue menciona a versão do React Native que foi usada? Se não, aplique a label "Needs: Environment Info".
- Esta issue inclui um Snack, um exemplo de código OU uma lista de passos para reproduzir o problema? Se não, aplique a label "Needs: Repro".

:::note
Às vezes recebemos issues que não são apropriadas para o issue tracker do GitHub. Adicione a label "Type: Invalid", e um bot fechará a issue automaticamente.
:::

Uma vez que você chegue a este ponto, pode fazer a transição para analisar o conteúdo da issue em si. Esta issue inclui uma **descrição clara** do problema?

Se não, peça _educadamente_ ao autor da issue para atualizar sua issue com as informações necessárias, e aplique a label "Needs: Author Feedback".

Nosso objetivo é sempre ser amigáveis e prestativos e esperamos o mesmo de cada membro da nossa comunidade.

## Melhorando uma Issue

Se a issue contém todas as informações necessárias, reserve um momento para considerar se a issue ainda pode ser melhorada de alguma forma. A formatação está adequada? Você pode editar levemente a issue para melhorar a legibilidade conforme necessário.

Se a issue contém um bloco de código não formatado, envolva-o com três crases (```) para convertê-lo em um bloco de código markdown.

Há alguma label que você pode adicionar para ajudar a categorizá-la melhor? Se a issue afeta apenas aplicativos Android, você pode adicionar a label "Platform: Android". Talvez a issue só se manifeste ao desenvolver no Windows, caso em que você pode adicionar a label "Platform: Windows".

Temos uma longa lista de [labels](https://github.com/facebook/react-native/issues/labels), por favor dê uma olhada e veja se algo pode ser aplicado!

## Lidando com Duplicatas

Ao trabalhar com essas issues, você começará a ter uma melhor compreensão do tipo de problemas que são relatados. Você pode até começar a notar que a mesma issue é relatada.

Nesses casos, você pode fechar a issue e adicionar um comentário que diga "Duplicate of #issue". Ao seguir esta convenção, o GitHub automaticamente marcará a issue como duplicata.

## Avaliando o Impacto

Em seguida, precisamos determinar quão grave é a issue.

### Esta é uma potencial **bloqueadora de release**?

Essas issues devem ser resolvidas dentro da próxima semana ou duas, pois podem impedir que os coordenadores de release façam um release candidate limpo.

Issues que podem ser rotuladas como tal podem ser regressões que quebram um de nossos testes de pré-commit. Evite marcar uma issue como bloqueadora de release se ela já existe há algum tempo (se a issue já está presente em um ou mais releases, ela não pode ser uma bloqueadora de RC por definição).

### Isso faz o aplicativo **crashar**?

Essas são issues que fazem um aplicativo React Native crashar inesperadamente. Elas podem levar a uma experiência ruim do usuário se não forem detectadas cedo.

### Este é um **bug**?

Descreve algo que não está funcionando como esperado. Seria bom corrigi-lo em algum momento, mas não é sério o suficiente para bloquear o trem de releases. Mesmo se a issue causar um crash, se houver uma solução alternativa razoável disponível, ela pode ser classificada como um bug regular.

### Este é um **good first issue**?

Essas são issues que não exigem uma compreensão profunda e familiaridade com o repositório. O GitHub destacará essas issues para pessoas interessadas em se tornar contribuidores. Tenha em mente que issues rotuladas dessa forma podem não ser corrigidas imediatamente.
