---
ia-translated: true
title: Estado do React Native 2018
author: Sophie Alpert
authorTitle: Engineering Manager on React at Facebook
authorURL: 'https://github.com/sophiebits'
authorImageURL: 'https://avatars2.githubusercontent.com/u/6820?s=460&v=4'
authorTwitter: sophiebits
tags: [engineering]
---

Faz um tempo desde que publicamos pela última vez uma atualização de status sobre React Native.

No Facebook, estamos usando React Native mais do que nunca e para muitos projetos importantes. Um dos nossos produtos mais populares é o Marketplace, uma das abas de nível superior em nosso app que é usado por 800 milhões de pessoas a cada mês. Desde sua criação em 2015, todo o Marketplace foi construído com React Native, incluindo mais de cem views de tela cheia em diferentes partes do app.

Também estamos usando React Native para muitas novas partes do app. Se você assistiu ao keynote do F8 no mês passado, você reconhecerá Blood Donations, Crisis Response, Privacy Shortcuts e Wellness Checks – todos recursos recentes construídos com React Native. E projetos fora do app principal do Facebook também estão usando React Native. O novo headset VR Oculus Go inclui [um app móvel complementar](https://www.oculus.com/app/) que é totalmente construído com React Native, sem mencionar React VR alimentando muitas experiências no próprio headset.

Naturalmente, também usamos muitas outras tecnologias para construir nossos apps. [Litho](https://fblitho.com/) e [ComponentKit](https://componentkit.org/) são duas bibliotecas que usamos extensivamente em nossos apps; ambas fornecem uma API de componentes semelhante ao React para construir telas nativas. Nunca foi um objetivo do React Native substituir todas as outras tecnologias – estamos focados em tornar o próprio React Native melhor, mas adoramos ver outras equipes pegarem ideias emprestadas do React Native, como trazer [instant reload](https://instagram-engineering.com/instant-feedback-in-ios-engineering-workflows-c3f6508c76c8) para código não-JavaScript também.

## Arquitetura

Quando começamos o projeto React Native em 2013, projetamos para ter uma única "bridge" entre JavaScript e nativo que é assíncrona, serializável e em lote. Assim como React DOM transforma atualizações de state do React em chamadas imperativas e mutativas para APIs DOM como `document.createElement(attrs)` e `.appendChild()`, React Native foi projetado para retornar uma única mensagem JSON que lista mutações a serem executadas, como `[["createView", attrs], ["manageChildren", ...]]`. Projetamos todo o sistema para nunca depender de obter uma resposta síncrona de volta e para garantir que tudo nessa lista pudesse ser totalmente serializado para JSON e vice-versa. Fizemos isso pela flexibilidade que isso nos deu: em cima desta arquitetura, conseguimos construir ferramentas como [debugging no Chrome](/docs/debugging#chrome-developer-tools), que executa todo o código JavaScript de forma assíncrona sobre uma conexão WebSocket.

Nos últimos 5 anos, descobrimos que esses princípios iniciais tornaram a construção de alguns recursos mais difícil. Uma bridge assíncrona significa que você não pode integrar lógica JavaScript diretamente com muitas APIs nativas esperando respostas síncronas. Uma bridge em lote que enfileira chamadas nativas significa que é mais difícil ter apps React Native chamando funções implementadas nativamente. E uma bridge serializável significa cópia desnecessária em vez de compartilhar memória diretamente entre os dois mundos. Para apps que são totalmente construídos em React Native, essas restrições são geralmente suportáveis. Mas para apps com integração complexa entre React Native e código de app existente, elas são frustrantes.

**Estamos trabalhando em uma rearquitetura em grande escala do React Native para tornar o framework mais flexível e integrar melhor com infraestrutura nativa em apps JavaScript/nativo híbridos.** Com este projeto, aplicaremos o que aprendemos nos últimos 5 anos e incrementalmente traremos nossa arquitetura para uma mais moderna. Estamos reescrevendo muitos dos internos do React Native, mas a maioria das mudanças está sob o capô: apps React Native existentes continuarão a funcionar com poucas ou nenhuma mudança.

Para tornar o React Native mais leve e se encaixar melhor em apps nativos existentes, esta rearquitetura tem três mudanças internas principais. Primeiro, estamos mudando o modelo de threading. Em vez de cada atualização de UI precisar executar trabalho em três threads diferentes, será possível chamar sincronamente JavaScript em qualquer thread para atualizações de alta prioridade, enquanto ainda mantém trabalho de baixa prioridade fora da thread principal para manter a responsividade. Segundo, estamos incorporando capacidades de [async rendering](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) no React Native para permitir múltiplas prioridades de renderização e simplificar o tratamento de dados assíncronos. Finalmente, estamos simplificando nossa bridge para torná-la mais rápida e leve; chamadas diretas entre nativo e JavaScript são mais eficientes e facilitarão a construção de ferramentas de debugging como stack traces cross-language.

Uma vez que essas mudanças sejam concluídas, integrações mais próximas serão possíveis. Hoje, não é possível incorporar navegação nativa e tratamento de gestos ou componentes nativos como UICollectionView e RecyclerView sem hacks complexos. Após nossas mudanças no modelo de threading, construir recursos como este será direto.

Lançaremos mais detalhes sobre este trabalho ainda este ano à medida que se aproxima da conclusão.

## Comunidade

Ao lado da comunidade dentro do Facebook, estamos felizes em ter uma população próspera de usuários e colaboradores React Native fora do Facebook. Gostaríamos de apoiar mais a comunidade React Native, tanto servindo melhor os usuários React Native quanto tornando o projeto mais fácil de contribuir.

Assim como nossas mudanças de arquitetura ajudarão o React Native a interoperar mais limpo com outra infraestrutura nativa, React Native deve ser mais enxuto no lado JavaScript para se encaixar melhor com o ecossistema JavaScript, o que inclui tornar a VM e o bundler trocáveis. Sabemos que o ritmo de mudanças breaking pode ser difícil de acompanhar, então gostaríamos de encontrar maneiras de ter menos lançamentos principais. Finalmente, sabemos que algumas equipes estão procurando por documentação mais completa em tópicos como otimização de inicialização, onde nossa expertise ainda não foi escrita. Espere ver algumas dessas mudanças ao longo do próximo ano.

Se você está usando React Native, você faz parte da nossa comunidade; continue nos informando como podemos tornar o React Native melhor para você.

React Native é apenas uma ferramenta na caixa de ferramentas de um desenvolvedor móvel, mas é uma em que acreditamos fortemente – e estamos tornando-a melhor todos os dias, com mais de 2500 commits no último ano de 500+ contribuidores.
