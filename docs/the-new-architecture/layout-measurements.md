<!-- ia-translated: true -->
# Medindo o Layout

Às vezes, você precisa medir o layout atual para aplicar algumas mudanças no layout geral ou para tomar decisões e chamar alguma lógica específica.

React Native fornece alguns métodos nativos para saber quais são as medidas das views.

A melhor maneira de invocar esses métodos é em um hook `useLayoutEffect`: isso lhe dará os valores mais recentes para essas medidas e permitirá que você aplique mudanças no mesmo frame em que as medidas são computadas.

Um código típico será assim:

```tsx
function AComponent(children) {
  const targetRef = React.useRef(null)

  useLayoutEffect(() => {
    targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
      //do something with the measurements
    });
  }, [ /* add dependencies here */]);

  return (
    <View ref={targetRef}>
     {children}
    <View />
  );
}
```

:::note
Os métodos descritos aqui estão disponíveis na maioria dos componentes padrão fornecidos pelo React Native. No entanto, eles _não_ estão disponíveis em componentes compostos que não são diretamente suportados por uma view nativa. Isso geralmente incluirá a maioria dos componentes que você define em seu próprio app.
:::

## measure(callback)

Determina a localização na tela (`x` e `y`), `width` e `height` no viewport da view fornecida. Retorna os valores via um callback assíncrono. Se bem-sucedido, o callback será chamado com os seguintes argumentos:

- `x`: a coordenada `x` da origem (canto superior esquerdo) da view medida no viewport.
- `y`: a coordenada `y` da origem (canto superior esquerdo) da view medida no viewport.
- `width`: a largura da view.
- `height`: a altura da view.
- `pageX`: a coordenada `x` da view no viewport (tipicamente a tela inteira).
- `pageY`: a coordenada `y` da view no viewport (tipicamente a tela inteira).

Além disso, o `width` e `height` retornados por `measure()` são o `width` e `height` do componente no viewport.

## measureInWindow(callback)

Determina a localização (`x` e `y`) da view fornecida na janela e retorna os valores via um callback assíncrono. Se a React root view estiver incorporada em outra view nativa, isso fornecerá as coordenadas absolutas. Se bem-sucedido, o callback será chamado com os seguintes argumentos:

- `x`: a coordenada `x` da view na janela atual.
- `y`: a coordenada `y` da view na janela atual.
- `width`: a largura da view.
- `height`: a altura da view.
