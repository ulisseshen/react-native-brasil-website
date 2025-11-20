---
ia-translated: true
title: Atualizações da API de Acessibilidade
author: Ziqi Chen
authorTitle: Student at UC Berkeley
authorURL: 'https://ziqichen.com/'
authorImageURL: 'https://avatars2.githubusercontent.com/u/13990087?s=400&u=5841da1b6064341d52ecab70a586b6701d9f6978&v=4'
tags: [engineering]
---

## Motivação

À medida que a tecnologia avança e os apps móveis se tornam cada vez mais importantes para a vida cotidiana, a necessidade de criar aplicações acessíveis também cresceu em importância.

A API de Acessibilidade limitada do React Native sempre foi um grande ponto de dor para os desenvolvedores, então fizemos algumas atualizações na API de Acessibilidade para tornar mais fácil criar aplicações móveis inclusivas.

## Problemas com a API Existente

### Problema Um: Duas Props Completamente Diferentes Porém Similares - accessibilityComponentType (Android) e accessibilityTraits (iOS)

`accessibilityComponentType` e `accessibilityTraits` são duas propriedades que são usadas para dizer ao TalkBack no Android e VoiceOver no iOS que tipo de elemento de UI o usuário está interagindo. Os dois maiores problemas com essas propriedades são que:

1. **Elas são duas propriedades diferentes com métodos de uso diferentes, mas têm o mesmo propósito.** Na API anterior, essas são duas propriedades separadas (uma para cada plataforma), o que não era apenas inconveniente, mas também confuso para muitos desenvolvedores. `accessibilityTraits` no iOS permite 17 valores diferentes enquanto `accessibilityComponentType` no Android permite apenas 4 valores. Além disso, os valores em sua maioria não tinham sobreposição. Até os tipos de entrada para essas duas propriedades são diferentes. `accessibilityTraits` permite que um array de traits seja passado ou um único trait, enquanto `accessibilityComponentType` permite apenas um único valor.
2. **Há funcionalidade muito limitada no Android.** Com a antiga propriedade, os únicos elementos de UI que o Talkback era capaz de reconhecer eram "button," "radiobutton_checked," e "radiobutton_unchecked."

### Problema Dois: Hints de Acessibilidade Inexistentes:

Hints de Acessibilidade ajudam usuários usando TalkBack ou VoiceOver a entender o que acontecerá quando eles executarem uma ação em um elemento de acessibilidade que não é aparente apenas pelo label de acessibilidade. Esses hints podem ser ligados e desligados no painel de configurações. Anteriormente, a API do React Native não suportava hints de acessibilidade de forma alguma.

### Problema Três: Ignorando Cores Invertidas:

Alguns usuários com perda de visão usam cores invertidas em seus telefones celulares para ter maior contraste de tela. A Apple forneceu uma API para iOS que permite aos desenvolvedores ignorar certas views. Dessa forma, imagens e vídeos não são distorcidos quando um usuário tem a configuração de cores invertidas ativada. Esta API atualmente não é suportada pelo React Native.

## Design da Nova API

### Solução Um: Combinando accessibilityComponentType (Android) e accessibilityTraits (iOS)

Para resolver a confusão entre `accessibilityComponentType` e `accessibilityTraits`, decidimos mesclá-las em uma única propriedade. Isso fazia sentido porque tecnicamente tinham a mesma funcionalidade pretendida e ao mesclá-las, os desenvolvedores não precisavam mais se preocupar com peculiaridades específicas da plataforma ao construir recursos de acessibilidade.

**Background**

No iOS, `UIAccessibilityTraits` é uma propriedade que pode ser definida em qualquer NSObject. Cada um dos 17 traits passados através da propriedade javascript para nativo é mapeado para um elemento `UIAccessibilityTraits` em Objective-C. Traits são cada um representados por um long int, e cada trait que é definido é feito OR juntos.

No Android, no entanto, `AccessibilityComponentType` é um conceito que foi inventado pelo React Native, e não mapeia diretamente para quaisquer propriedades no Android. Acessibilidade é tratada por um delegate de acessibilidade. Cada view tem um delegate de acessibilidade padrão. Se você quiser customizar quaisquer ações de acessibilidade, você tem que criar um novo delegate de acessibilidade, sobrescrever métodos específicos que você quer customizar, e então definir o delegate de acessibilidade da view que você está tratando para ser associado com o novo delegate. Quando um desenvolvedor definiu `AccessibilityComponentType`, o código nativo criou um novo delegate baseado no componente que foi passado, e definiu a view para ter aquele delegate de acessibilidade.

**Mudanças Feitas**

Para nossa nova propriedade, queríamos criar um superset das duas propriedades. Decidimos manter a nova propriedade modelada principalmente após a propriedade existente `accessibilityTraits`, já que `accessibilityTraits` tem significativamente mais valores. A funcionalidade do Android para esses traits seria polyfilled modificando o Accessibility Delegate.

Existem 17 valores de UIAccessibilityTraits para os quais `accessibilityTraits` no iOS pode ser definido. No entanto, não incluímos todos eles como valores possíveis para nossa nova propriedade. Isso porque o efeito de definir alguns desses traits na verdade não é muito bem conhecido, e muitos desses valores são virtualmente nunca usados.

Os valores para os quais UIAccessibilityTraits foram definidos geralmente assumiam um de dois propósitos. Eles descreviam um papel que o elemento de UI tinha, ou descreviam o estado em que um elemento de UI estava. A maioria dos usos das propriedades anteriores que observamos geralmente usava um valor que representava um papel e o combinava com "state selected," "state disabled," ou ambos. Portanto, decidimos criar duas novas propriedades de acessibilidade: `accessibilityRole` e `accessibilityState`.

**`accessibilityRole`**

A nova propriedade, `accessibilityRole`, é usada para dizer ao Talkback ou Voiceover o papel de um Elemento de UI. Esta nova propriedade pode assumir um dos seguintes valores:

- `none`
- `button`
- `link`
- `search`
- `image`
- `keyboardkey`
- `text`
- `adjustable`
- `header`
- `summary`
- `imagebutton`

Esta propriedade permite apenas que um valor seja passado porque elementos de UI geralmente não assumem logicamente mais de um desses. A exceção é imagem e botão, então adicionamos um papel imagebutton que é uma combinação de ambos.

**`accessibilityStates`**

A nova propriedade, `accessibilityStates`, é usada para dizer ao Talkback ou Voiceover o estado em que um Elemento de UI está. Esta propriedade assume um Array contendo um ou ambos os seguintes valores:

- `selected`
- `disabled`

### Solução Dois: Adicionando Hints de Acessibilidade

Para isso, adicionamos uma nova propriedade, `accessibilityHint`. Definir esta propriedade permitirá que o Talkback ou Voiceover recite o hint para os usuários.

**`accessibilityHint`**

Esta propriedade recebe o hint de acessibilidade a ser lido na forma de uma String.

No iOS, definir esta propriedade definirá a propriedade nativa correspondente AccessibilityHint na view. O hint será então lido pelo Voiceover se Accessibility Hints estiverem ativados no iPhone.

No Android, definir esta propriedade anexa o valor do hint ao final do label de acessibilidade. O lado positivo desta implementação é que ela imita o comportamento de hints no iOS, mas o lado negativo desta implementação é que esses hints não podem ser desligados nas configurações no Android da maneira que podem ser no iOS.

A razão pela qual tomamos esta decisão no Android é porque normalmente, hints de acessibilidade correspondem com uma ação específica (por exemplo, clique), e queríamos manter comportamentos consistentes entre plataformas.

### Solução para o Problema Três

**`accessibilityIgnoresInvertColors`**

Expusemos a api AccessibilityIgnoresInvertColors da Apple para JavaScript, então agora quando você tem uma view onde não quer que as cores sejam invertidas (por exemplo, imagem), você pode definir esta propriedade como true, e ela não será invertida.

## Novo Uso

Essas novas propriedades estarão disponíveis no lançamento React Native 0.57.

### Como Atualizar

Se você está usando atualmente `accessibilityComponentType` e `accessibilityTraits`, aqui estão os passos que você pode tomar para atualizar para as novas propriedades.

#### 1. Usando jscodeshift

Os casos de uso mais simples podem ser substituídos executando um script jscodeshift.

Este [script](https://gist.github.com/ziqichen6/246e5778617224d2b4aff198dab0305d) substitui as seguintes instâncias:

```
accessibilityTraits="trait"
accessibilityTraits={["trait"]}
```

Com

```
accessibilityRole= "trait"
```

Este script também remove instâncias de `AccessibilityComponentType` (assumindo que em todos os lugares que você define `AccessibilityComponentType`, você também definiria `AccessibilityTraits`).

#### 2. Usando um codemod manual

Para os casos que usaram `AccessibilityTraits` que não têm um valor correspondente para `AccessibilityRole`, e os casos onde múltiplos traits foram passados para `AccessibilityTraits`, um codemod manual teria que ser feito.

Em geral,

```tsx
accessibilityTraits= {["button", "selected"]}
```

seria manualmente substituído com

```tsx
accessibilityRole="button"
accessibilityStates={["selected"]}
```

Essas propriedades já estão sendo usadas na base de código do Facebook. O codemod para o Facebook foi surpreendentemente simples. O script jscodeshift corrigiu cerca de metade de nossas instâncias, e a outra metade foi corrigida manualmente. No geral, todo o processo levou menos de algumas horas.

Esperamos que você ache a API atualizada útil! E por favor continue tornando apps acessíveis! #inclusion
