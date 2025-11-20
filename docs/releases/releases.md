---
ia-translated: true
id: releases
title: Visão Geral de Releases
---

import ReleasesTable from '@site/src/components/releases/ReleasesTable';

Novos releases do React Native são lançados **a cada dois meses**, geralmente resultando em seis (6) novas versões menores por ano.

Abaixo está o cronograma e status atual dos releases recentes e futuros do React Native:

<ReleasesTable />

Os diferentes níveis de suporte apresentados na tabela são definidos da seguinte forma:

- **Future**
  - Depois que um novo branch de versão é cortado, criar novos Release Candidates para permitir que a comunidade teste a versão futura é muito importante. Novos releases RC são feitos em ritmo acelerado, assim que viável.
- **Active**
  - Releases estáveis em suporte ativo recebem atualizações frequentes. A versão estável mais recente tem a maior prioridade, e no início de seu ciclo estável (logo após .0 ser lançado) múltiplos patches serão feitos o mais rápido possível para estabilizar a versão e garantir uma boa experiência de atualização para a comunidade.
- **End of Cycle**
  - Uma versão neste nível de suporte receberá menos patches, a menos que algumas regressões importantes precisem ser abordadas. Uma vez que uma próxima versão se torna a nova versão estável mais recente, antes que a versão em EoC mova para Unsupported, um último patch released será produzido com as últimas solicitações de pick recebidas.
- **Unsupported**
  - Quando uma versão está no estágio unsupported, nenhum novo release é esperado. Apenas regressões muito importantes podem criar exceções a esta regra; é recomendado que bases de código usando uma versão unsupported façam upgrade o mais rápido possível.

## Compromisso com a Estabilidade

Para suportar usuários atualizando versões do React Native, estamos comprometidos em manter as **últimas 3 séries menores** (por exemplo, 0.78.x, 0.77.x e 0.76.x quando 0.78 é o release mais recente).

Para esses releases, publicaremos atualizações regulares e correções de bugs.

Você pode ler mais sobre nossa política de suporte no [grupo de trabalho react-native-releases](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md).

Mais informações sobre nosso versionamento, e o que consideramos uma breaking change estão disponíveis em nossa página de [política de versionamento](./releases/versioning-policy).
