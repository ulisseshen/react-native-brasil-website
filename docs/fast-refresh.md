---
ia-translated: true
id: fast-refresh
title: Fast Refresh
---

Fast Refresh é uma funcionalidade do React Native que permite obter feedback quase instantâneo para alterações em seus componentes React. Fast Refresh é habilitado por padrão, e você pode alternar "Enable Fast Refresh" no [React Native Dev Menu](/docs/debugging#accessing-the-in-app-developer-menu). Com Fast Refresh habilitado, a maioria das edições deve ser visível dentro de um ou dois segundos.

## Como Funciona

- Se você editar um módulo que **exporta apenas componente(s) React**, Fast Refresh atualizará o código apenas para aquele módulo e re-renderizará seu componente. Você pode editar qualquer coisa naquele arquivo, incluindo estilos, lógica de renderização, manipuladores de eventos ou effects.
- Se você editar um módulo com exports que _não são_ componentes React, Fast Refresh re-executará tanto aquele módulo quanto os outros módulos que o importam. Então se tanto `Button.js` quanto `Modal.js` importam `Theme.js`, editar `Theme.js` atualizará ambos os componentes.
- Finalmente, se você **editar um arquivo** que é **importado por módulos fora da árvore React**, Fast Refresh **voltará a fazer um reload completo**. Você pode ter um arquivo que renderiza um componente React mas também exporta um valor que é importado por um **componente não-React**. Por exemplo, talvez seu componente também exporte uma constante, e um módulo utilitário não-React a importe. Nesse caso, considere migrar a constante para um arquivo separado e importá-la em ambos os arquivos. Isso reabilitará Fast Refresh para funcionar. Outros casos geralmente podem ser resolvidos de maneira similar.

## Resiliência a Erros

Se você cometer um **erro de sintaxe** durante uma sessão de Fast Refresh, você pode corrigi-lo e salvar o arquivo novamente. A redbox desaparecerá. Módulos com erros de sintaxe são impedidos de executar, então você não precisará recarregar o app.

Se você cometer um **erro de runtime durante a inicialização do módulo** (por exemplo, digitando `Style.create` em vez de `StyleSheet.create`), a sessão de Fast Refresh continuará assim que você corrigir o erro. A redbox desaparecerá, e o módulo será atualizado.

Se você cometer um erro que leva a um **erro de runtime dentro de seu componente**, a sessão de Fast Refresh _também_ continuará depois que você corrigir o erro. Nesse caso, React remontará sua aplicação usando o código atualizado.

Se você tem [error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) em seu app (o que é uma boa ideia para falhas graciosas em produção), eles tentarão renderizar novamente na próxima edição após uma redbox. Nesse sentido, ter um error boundary pode evitar que você sempre seja jogado de volta para a tela raiz do app. No entanto, tenha em mente que error boundaries não devem ser _muito_ granulares. Eles são usados pelo React em produção, e devem sempre ser projetados intencionalmente.

## Limitações

Fast Refresh tenta preservar o state local do React no componente que você está editando, mas somente se for seguro fazê-lo. Aqui estão algumas razões pelas quais você pode ver o state local sendo resetado a cada edição em um arquivo:

- State local não é preservado para componentes de classe (apenas componentes de função e Hooks preservam state).
- O módulo que você está editando pode ter _outras_ exportações além de um componente React.
- Às vezes, um módulo exportaria o resultado de chamar um componente de ordem superior como `createNavigationContainer(MyScreen)`. Se o componente retornado é uma classe, o state será resetado.

No longo prazo, à medida que mais de sua base de código se move para componentes de função e Hooks, você pode esperar que o state seja preservado em mais casos.

## Dicas

- Fast Refresh preserva o state local do React em componentes de função (e Hooks) por padrão.
- Às vezes você pode querer _forçar_ o state a ser resetado e um componente a ser remontado. Por exemplo, isso pode ser útil se você estiver ajustando uma animação que só acontece na montagem. Para fazer isso, você pode adicionar `// @refresh reset` em qualquer lugar no arquivo que você está editando. Esta diretiva é local ao arquivo e instrui Fast Refresh a remontar componentes definidos naquele arquivo a cada edição.

## Fast Refresh e Hooks

Quando possível, Fast Refresh tenta preservar o state de seu componente entre edições. Em particular, `useState` e `useRef` preservam seus valores anteriores desde que você não mude seus argumentos ou a ordem das chamadas de Hook.

Hooks com dependências—como `useEffect`, `useMemo` e `useCallback`—_sempre_ atualizarão durante Fast Refresh. Sua lista de dependências será ignorada enquanto Fast Refresh estiver acontecendo.

Por exemplo, quando você edita `useMemo(() => x * 2, [x])` para `useMemo(() => x * 10, [x])`, ele re-executará mesmo que `x` (a dependência) não tenha mudado. Se React não fizesse isso, sua edição não se refletiria na tela!

Às vezes, isso pode levar a resultados inesperados. Por exemplo, até mesmo um `useEffect` com um array vazio de dependências ainda re-executaria uma vez durante Fast Refresh. No entanto, escrever código resiliente à re-execução ocasional de `useEffect` é uma boa prática mesmo sem Fast Refresh. Isso torna mais fácil para você introduzir novas dependências nele mais tarde.
