---
ia-translated: true
title: 'Uma Cadência de Lançamento Mensal: Liberando RC de Dezembro e Janeiro'
author: Eric Vicenti
authorTitle: Engineer at Facebook
authorURL: 'https://twitter.com/EricVicenti'
authorImageURL: 'https://secure.gravatar.com/avatar/077ad5372b65567fe952a99f3b627048?s=128'
authorTwitter: EricVicenti
tags: [announcement]
---

Logo após o React Native ser introduzido, começamos a lançar versões a cada duas semanas para ajudar a comunidade a adotar novos recursos, mantendo as versões estáveis para uso em produção. No Facebook tínhamos que estabilizar a base de código a cada duas semanas para o lançamento de nossos aplicativos iOS em produção, então decidimos lançar as versões open source no mesmo ritmo. Agora, muitos dos aplicativos do Facebook são lançados uma vez por semana, especialmente no Android. Como lançamos a partir da master semanalmente, precisamos mantê-la bastante estável. Então a cadência de lançamento quinzenal não beneficia mais nem mesmo os contribuidores internos.

Frequentemente ouvimos feedback da comunidade de que a taxa de lançamento é difícil de acompanhar. Ferramentas como [Expo](https://expo.io/) tiveram que pular todos os outros lançamentos para gerenciar a mudança rápida de versão. Então parece claro que os lançamentos quinzenais não serviam bem a comunidade.

### Agora lançando mensalmente

Estamos felizes em anunciar a nova cadência de lançamento mensal, e o lançamento de Dezembro de 2016, `v0.40`, que está sendo estabilizado durante todo o mês passado e está pronto para adoção. (Apenas certifique-se de [atualizar os headers em seus módulos nativos no iOS](https://github.com/facebook/react-native/releases/tag/v0.40.0)).

Embora possa variar alguns dias para evitar fins de semana ou lidar com problemas imprevistos, agora você pode esperar que uma determinada versão esteja disponível no primeiro dia do mês e seja lançada no último.

### Use o mês atual para o melhor suporte

O release candidate de Janeiro está pronto para testar, e você pode [ver as novidades aqui](https://github.com/facebook/react-native/releases/tag/v0.41.0-rc.0).

Para ver quais mudanças estão chegando e fornecer melhor feedback aos contribuidores do React Native, sempre use o release candidate do mês atual quando possível. Até o momento em que cada versão for lançada no final do mês, as mudanças que ela contém terão sido enviadas em aplicativos Facebook de produção por mais de duas semanas.

Você pode facilmente atualizar seu aplicativo com o novo comando [react-native-git-upgrade](/blog/2016/12/05/easier-upgrades):

```
npm install -g react-native-git-upgrade
react-native-git-upgrade 0.41.0-rc.0
```

Esperamos que esta abordagem mais simples facilite para a comunidade acompanhar as mudanças no React Native e adotar novas versões o mais rápido possível!

(Agradecimentos vão para [Martin Konicek](https://github.com/mkonicek) por elaborar este plano e [Mike Grabowski](https://github.com/grabbou) por fazê-lo acontecer)
