---
ia-translated: true
id: timers
title: Timers
---

Timers são uma parte importante de uma aplicação e o React Native implementa os [timers do navegador](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals).

## Timers

- `setTimeout` e `clearTimeout`
- `setInterval` e `clearInterval`
- `setImmediate` e `clearImmediate`
- `requestAnimationFrame` e `cancelAnimationFrame`

`requestAnimationFrame(fn)` não é o mesmo que `setTimeout(fn, 0)` - o primeiro disparará depois que todos os frames forem liberados, enquanto o último disparará o mais rápido possível (mais de 1000x por segundo em um iPhone 5S).

`setImmediate` é executado no final do bloco de execução JavaScript atual, logo antes de enviar a resposta em lote de volta para o nativo. Observe que se você chamar `setImmediate` dentro de um callback `setImmediate`, ele será executado imediatamente, não retornará para o nativo entre as chamadas.

A implementação de `Promise` usa `setImmediate` como sua implementação de assincronia.

:::note
Ao depurar no Android, se os horários entre o debugger e o dispositivo ficarem dessincronizados; coisas como animação, comportamento de eventos, etc., podem não funcionar corretamente ou os resultados podem não ser precisos.
Por favor, corrija isso executando ``adb shell "date `date +%m%d%H%M%Y.%S%3N`"`` na sua máquina de depuração. Acesso root é necessário para uso em dispositivos reais.
:::

## InteractionManager

:::warning Deprecated
O comportamento do `InteractionManager` foi alterado para ser o mesmo que `setImmediate`, que deve ser usado em vez disso.
:::

Uma razão pela qual aplicativos nativos bem construídos parecem tão suaves é evitando operações caras durante interações e animações. No React Native, atualmente temos uma limitação de que existe apenas uma única thread de execução JS, mas você pode usar `InteractionManager` para garantir que trabalhos de longa duração sejam agendados para iniciar após quaisquer interações/animações terem sido concluídas.

Aplicações podem agendar tarefas para serem executadas após interações com o seguinte:

```tsx
InteractionManager.runAfterInteractions(() => {
  // ...long-running synchronous task...
});
```

Compare isso com outras alternativas de agendamento:

- requestAnimationFrame(): para código que anima uma view ao longo do tempo.
- setImmediate/setTimeout/setInterval(): executa código mais tarde, observe que isso pode atrasar animações.
- runAfterInteractions(): executa código mais tarde, sem atrasar animações ativas.

O sistema de manipulação de toque considera um ou mais toques ativos como uma 'interação' e atrasará callbacks `runAfterInteractions()` até que todos os toques tenham terminado ou sido cancelados.

`InteractionManager` também permite que aplicações registrem animações criando um 'handle' de interação no início da animação e limpando-o ao concluir:

```tsx
const handle = InteractionManager.createInteractionHandle();
// run animation... (`runAfterInteractions` tasks are queued)
// later, on animation completion:
InteractionManager.clearInteractionHandle(handle);
// queued tasks run if all handles were cleared
```
