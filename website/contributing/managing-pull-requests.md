---
title: Gerenciando Pull Requests
ia-translated: true
---

Revisar um pull request pode levar um tempo considerável. Em alguns casos, a revisão pode exigir mais tempo para ser realizada do que alguém levou para escrever e enviar suas mudanças! Portanto, é necessário fazer algum trabalho preliminar para garantir que cada pull request esteja em bom estado para ser revisado.

Um pull request deve consistir em três seções principais:

- Um resumo. Isso nos ajuda a entender a motivação por trás das mudanças.
- Um changelog. Isso nos ajuda a escrever as notas de versão. Também serve como um breve resumo das suas mudanças.
- Um plano de teste. Esta pode ser a parte mais importante do seu pull request. Um plano de teste deve ser um guia passo a passo reproduzível para que um revisor possa verificar se sua mudança está funcionando conforme pretendido. Também é uma boa ideia anexar screenshots ou vídeos para mudanças visíveis ao usuário.

Qualquer pull request pode exigir uma compreensão mais profunda de alguma área do React Native com a qual você pode não estar familiarizado. Mesmo que você não sinta que é a pessoa certa para revisar um pull request, ainda pode ajudar adicionando labels ou pedindo ao autor mais informações.

## Revisando PRs

Pull Requests precisam ser revisados e aprovados usando o recurso de review do GitHub antes que possam ser mesclados. Embora qualquer pessoa tenha a capacidade de revisar e aprovar um pull request, normalmente só consideramos um pull request pronto para ser mesclado quando a aprovação vem de um dos [contribuidores](https://github.com/facebook/react-native/blob/main/ECOSYSTEM.md).

<!-- alex ignore clearly -->

Então você encontrou um pull request que se sente confiante em revisar. Por favor, faça uso do recurso GitHub Review e comunique de forma clara e educada quaisquer mudanças sugeridas.

Considere começar com pull requests que foram sinalizados como faltando um changelog ou plano de teste.

- [PRs que parecem não ter um changelog](https://github.com/facebook/react-native/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aopen+label%3A%22Missing+Changelog%22+) - dê uma olhada e veja se você pode adicionar o changelog você mesmo editando o PR. Depois de fazer isso, remova a label "Missing Changelog".
- [PRs que estão faltando um plano de teste](https://github.com/facebook/react-native/pulls?q=is%3Apr+label%3A%22Missing+Test+Plan%22+is%3Aclosed) - abra o pull request e procure por um plano de teste. Se o plano de teste parecer suficiente, remova a label "Missing Test Plan". Se não houver plano de teste, ou se parecer incompleto, adicione um comentário pedindo educadamente ao autor para considerar adicionar um plano de teste.

Um pull request deve passar em todos os testes antes que possa ser mesclado. Eles são executados em cada commit no `main` e em pull requests. Uma maneira rápida de nos ajudar a deixar pull requests prontos para revisão é [buscar por pull requests que estão falhando nos testes de pré-commit](https://github.com/facebook/react-native/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aopen+label%3A%22CLA+Signed%22+status%3Afailure+) e determinar se eles precisam ser revisados. O teste que falhou geralmente está listado perto do final da thread, em "Some checks were not successful."

- Dê uma olhada rápida nas [últimas execuções de testes no main](https://circleci.com/gh/facebook/react-native/tree/main). O `main` está verde? Se sim,
  - Parece que a falha pode estar relacionada às mudanças neste pull request? Peça ao autor para investigar.
  - Mesmo que o `main` esteja verde atualmente, considere a possibilidade de que os commits no pull request possam estar baseados em um commit de um momento em que o `main` estava quebrado. Se você acredita que este pode ser o caso, peça ao autor para fazer rebase de suas mudanças em cima do `main` para incorporar quaisquer correções que possam ter sido aplicadas depois que eles começaram a trabalhar no pull request.
- Se o `main` parecer estar quebrado, procure por quaisquer [issues rotuladas como "CI Test Failure"](https://github.com/facebook/react-native/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22%E2%9D%8CCI+Test+Failure%22+).
  - Se você encontrar uma issue que parece relacionada à falha no `main`, volte ao pull request e agradeça ao autor por propor essas mudanças, e deixe-o saber que a falha no teste pode não estar relacionada à sua mudança específica (não se esqueça de linkar de volta para a issue CI Test Failure, pois isso ajudará o autor a saber quando pode tentar executar os testes novamente).
  - Se você não conseguir encontrar uma issue CI Test Failure existente que descreva o problema que você observou no `main`, por favor submeta uma nova issue e use a label "CI Test Failure" para avisar outros que o `main` está quebrado (veja [esta issue](https://github.com/facebook/react-native/issues/23108) como exemplo).

## Como priorizamos PRs

Membros da equipe do React Native no Meta visam revisar pull requests rapidamente e a maioria dos PRs receberá uma resposta dentro de uma semana.

## Como um PR é mesclado?

O repositório GitHub do React Native é na verdade um espelho de um subdiretório de um dos monorepos do Meta. Pull requests portanto não são mesclados no sentido tradicional. Em vez disso, eles precisam ser importados para o sistema de revisão de código interno do Meta como um ["diff"](https://www.phacility.com/phabricator/differential/).

Uma vez importado, as mudanças passarão por uma suíte de testes. Alguns desses testes são bloqueadores de merge, o que significa que precisam ter sucesso antes que o conteúdo do diff possa ser mesclado. O Meta sempre executa o React Native a partir do `main` e algumas mudanças podem exigir que um funcionário do Facebook anexe mudanças internas ao seu pull request antes que ele possa ser mesclado. Por exemplo, se você renomear um nome de módulo, todos os locais de chamada internos do Facebook precisam ser atualizados na mesma mudança para que possa ser mesclado. Se o diff for aplicado com sucesso, as mudanças eventualmente serão sincronizadas de volta ao GitHub pelo [ShipIt](https://github.com/facebook/fbshipit) como um único commit.

Funcionários do Meta estão usando uma extensão personalizada de navegador para o GitHub que pode importar um pull request de duas maneiras: o pull request pode ser "landed to fbsource", o que significa que será importado e o diff resultante será aprovado automaticamente e, salvo qualquer falha, as mudanças eventualmente sincronizarão de volta ao `main`. Um pull request também pode ser "imported to Phabricator", o que significa que as mudanças serão copiadas para um diff interno que exigirá revisão e aprovação adicionais antes de poder ser aplicado.

<figure>
  <img src="/img/importing-pull-requests.png" />
  <figcaption>Screenshot da extensão personalizada de navegador. O botão "Import to fbsource" é usado para importar um Pull Request internamente.</figcaption>
</figure>

## Bots

À medida que você revisa e trabalha em pull requests, pode encontrar comentários deixados por algumas contas de bot do GitHub. Esses bots foram configurados para ajudar no processo de revisão de pull requests. Veja a [Referência de Bots](/contributing/bots-reference) para saber mais.

## Labels de Pull Request

- `Merged`: Aplicada a um PR fechado para indicar que suas mudanças foram incorporadas ao repositório principal. Esta label é necessária porque os pull requests não são mesclados diretamente no GitHub. Em vez disso, um patch com as mudanças do PR é importado e enfileirado para revisão de código. Uma vez aprovado, o resultado da aplicação dessas mudanças em cima do monorepositório interno do Meta é sincronizado de volta para o GitHub como um novo commit. O GitHub não atribui esse commit de volta ao PR original, daí a necessidade de uma label que comunique o verdadeiro status do PR.
- `Blocked on FB`: O PR foi importado, mas as mudanças ainda não foram aplicadas.
