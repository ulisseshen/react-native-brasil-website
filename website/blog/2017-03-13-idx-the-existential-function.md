---
ia-translated: true
title: 'idx: A Função Existencial'
author: Timothy Yung
authorTitle: Engineering Manager at Facebook
authorURL: 'https://github.com/yungsters'
authorImageURL: 'https://pbs.twimg.com/profile_images/1592444107/image.jpg'
authorTwitter: yungsters
tags: [engineering]
---

No Facebook, frequentemente precisamos acessar valores profundamente aninhados em estruturas de dados buscadas com GraphQL. No caminho para acessar esses valores profundamente aninhados, é comum que um ou mais campos intermediários sejam anuláveis. Esses campos intermediários podem ser null por várias razões, desde verificações de privacidade falhadas até o mero fato de que null é a maneira mais flexível de representar erros não fatais.

Infelizmente, acessar esses valores profundamente aninhados é atualmente tedioso e verboso.

```jsx
props.user &&
  props.user.friends &&
  props.user.friends[0] &&
  props.user.friends[0].friends;
```

Há [uma proposta ECMAScript para introduzir o operador existencial](https://github.com/claudepache/es-optional-chaining) que tornará isso muito mais conveniente. Mas até o momento em que essa proposta seja finalizada, queremos uma solução que melhore nossa qualidade de vida, mantenha a semântica da linguagem existente e encoraje segurança de tipos com Flow.

Criamos uma _função_ existencial que chamamos de `idx`.

```jsx
idx(props, _ => _.user.friends[0].friends);
```

A invocação neste trecho de código se comporta de forma similar à expressão booleana no trecho de código acima, exceto com significativamente menos repetição. A função `idx` recebe exatamente dois argumentos:

- Qualquer valor, tipicamente um objeto ou array no qual você deseja acessar um valor aninhado.
- Uma função que recebe o primeiro argumento e acessa um valor aninhado nele.

Em teoria, a função `idx` fará try-catch de erros que são resultado de acessar propriedades em null ou undefined. Se tal erro for capturado, retornará null ou undefined. (E você pode ver como isso pode ser implementado em [idx.js](https://github.com/facebookincubator/idx/blob/master/packages/idx/src/idx.js).)

Na prática, fazer try-catch de cada acesso a propriedade aninhada é lento, e diferenciar entre tipos específicos de TypeErrors é frágil. Para lidar com essas limitações, criamos um plugin Babel que transforma a invocação `idx` acima na seguinte expressão:

```jsx
props.user == null
  ? props.user
  : props.user.friends == null
    ? props.user.friends
    : props.user.friends[0] == null
      ? props.user.friends[0]
      : props.user.friends[0].friends;
```

Finalmente, adicionamos uma declaração de tipo Flow personalizada para `idx` que permite que a travessia no segundo argumento seja verificada de tipo adequadamente, permitindo acesso aninhado em propriedades anuláveis.

A função, plugin Babel e declaração Flow agora estão [disponíveis no GitHub](https://github.com/facebookincubator/idx). Eles são usados instalando os pacotes npm **idx** e **babel-plugin-idx**, e adicionando "idx" à lista de plugins em seu arquivo `.babelrc`.
