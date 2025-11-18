---
ia-translated: true
id: animatedvaluexy
title: Animated.ValueXY
---

Value 2D para conduzir animações 2D, como gestos de pan. API quase idêntica ao [`Animated.Value`](animatedvalue) normal, mas multiplexado. Contém dois `Animated.Value`s regulares internamente.

## Exemplo

```SnackPlayer name=Animated.ValueXY%20Example
import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DraggableView = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {toValue: {x: 0, y: 0}, useNativeDriver: true}, // Back to zero
      ).start();
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), styles.box]}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#61dafb',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});

export default DraggableView;
```

---

# Referência

## Métodos

### `setValue()`

```tsx
setValue(value: {x: number; y: number});
```

Define o valor diretamente. Isso irá parar quaisquer animações em execução no valor e atualizar todas as propriedades vinculadas.

**Parâmetros:**

| Nome  | Tipo                     | Obrigatório | Descrição |
| ----- | ------------------------ | ----------- | --------- |
| value | `{x: number; y: number}` | Sim         | Valor     |

---

### `setOffset()`

```tsx
setOffset(offset: {x: number; y: number});
```

Define um offset que é aplicado sobre qualquer valor que esteja definido, seja via `setValue`, uma animação ou `Animated.event`. Útil para compensar coisas como o início de um gesto de pan.

**Parâmetros:**

| Nome   | Tipo                     | Obrigatório | Descrição     |
| ------ | ------------------------ | ----------- | ------------- |
| offset | `{x: number; y: number}` | Sim         | Valor offset  |

---

### `flattenOffset()`

```tsx
flattenOffset();
```

Mescla o valor offset no valor base e redefine o offset para zero. A saída final do valor permanece inalterada.

---

### `extractOffset()`

```tsx
extractOffset();
```

Define o valor offset para o valor base e redefine o valor base para zero. A saída final do valor permanece inalterada.

---

### `addListener()`

```tsx
addListener(callback: (value: {x: number; y: number}) => void);
```

Adiciona um listener assíncrono ao valor para que você possa observar atualizações de animações. Isso é útil porque não há como ler o valor de forma síncrona, já que ele pode ser conduzido nativamente.

Retorna uma string que serve como identificador para o listener.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                                                                   |
| -------- | -------- | ----------- | ------------------------------------------------------------------------------------------- |
| callback | function | Sim         | A função callback que receberá um objeto com uma chave `value` definida para o novo valor.  |

---

### `removeListener()`

```tsx
removeListener(id: string);
```

Remove o registro de um listener. O parâmetro `id` deve corresponder ao identificador retornado anteriormente por `addListener()`.

**Parâmetros:**

| Nome | Tipo   | Obrigatório | Descrição                          |
| ---- | ------ | ----------- | ---------------------------------- |
| id   | string | Sim         | Id do listener sendo removido.     |

---

### `removeAllListeners()`

```tsx
removeAllListeners();
```

Remove todos os listeners registrados.

---

### `stopAnimation()`

```tsx
stopAnimation(callback?: (value: {x: number; y: number}) => void);
```

Para qualquer animação ou rastreamento em execução. O `callback` é invocado com o valor final após parar a animação, o que é útil para atualizar o estado para corresponder à posição da animação com o layout.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                 |
| -------- | -------- | ----------- | ----------------------------------------- |
| callback | function | Não         | Uma função que receberá o valor final.    |

---

### `resetAnimation()`

```tsx
resetAnimation(callback?: (value: {x: number; y: number}) => void);
```

Para qualquer animação e redefine o valor para o seu original.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                    |
| -------- | -------- | ----------- | -------------------------------------------- |
| callback | function | Não         | Uma função que receberá o valor original.    |

---

### `getLayout()`

```tsx
getLayout(): {left: Animated.Value, top: Animated.Value};
```

Converte `{x, y}` em `{left, top}` para uso em style, por exemplo:

```tsx
style={this.state.anim.getLayout()}
```

---

### `getTranslateTransform()`

```tsx
getTranslateTransform(): [
  {translateX: Animated.Value},
  {translateY: Animated.Value},
];
```

Converte `{x, y}` em uma transformação de translação utilizável, por exemplo:

```tsx
style={{
  transform: this.state.anim.getTranslateTransform()
}}
```
