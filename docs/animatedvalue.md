---
ia-translated: true
id: animatedvalue
title: Animated.Value
---

Valor padrão para controlar animações. Um `Animated.Value` pode controlar múltiplas propriedades de forma sincronizada, mas só pode ser controlado por um mecanismo de cada vez. Usar um novo mecanismo (por exemplo, iniciar uma nova animação, ou chamar `setValue`) irá parar qualquer um anterior.

Normalmente inicializado com `useAnimatedValue(0);` ou `new Animated.Value(0);` em componentes de classe.

---

# Referência

## Métodos

### `setValue()`

```tsx
setValue(value: number);
```

Define o valor diretamente. Isso irá parar qualquer animação em execução no valor e atualizar todas as propriedades vinculadas.

**Parâmetros:**

| Nome  | Tipo   | Obrigatório | Descrição |
| ----- | ------ | ----------- | --------- |
| value | number | Sim         | Valor     |

---

### `setOffset()`

```tsx
setOffset(offset: number);
```

Define um offset que é aplicado sobre qualquer valor definido, seja via `setValue`, uma animação, ou `Animated.event`. Útil para compensar coisas como o início de um gesto de pan.

**Parâmetros:**

| Nome   | Tipo   | Obrigatório | Descrição        |
| ------ | ------ | ----------- | ---------------- |
| offset | number | Sim         | Valor do offset  |

---

### `flattenOffset()`

```tsx
flattenOffset();
```

Mescla o valor do offset no valor base e redefine o offset para zero. A saída final do valor permanece inalterada.

---

### `extractOffset()`

```tsx
extractOffset();
```

Define o valor do offset como o valor base, e redefine o valor base para zero. A saída final do valor permanece inalterada.

---

### `addListener()`

```tsx
addListener(callback: (state: {value: number}) => void): string;
```

Adiciona um listener assíncrono ao valor para que você possa observar atualizações de animações. Isso é útil porque não há como ler o valor de forma síncrona, pois ele pode ser controlado nativamente.

Retorna uma string que serve como identificador para o listener.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                                                             |
| -------- | -------- | ----------- | ------------------------------------------------------------------------------------- |
| callback | function | Sim         | A função de callback que receberá um objeto com uma chave `value` definida para o novo valor. |

---

### `removeListener()`

```tsx
removeListener(id: string);
```

Remove o registro de um listener. O parâmetro `id` deve corresponder ao identificador retornado anteriormente por `addListener()`.

**Parâmetros:**

| Nome | Tipo   | Obrigatório | Descrição                      |
| ---- | ------ | ----------- | ------------------------------ |
| id   | string | Sim         | Id do listener sendo removido. |

---

### `removeAllListeners()`

```tsx
removeAllListeners();
```

Remove todos os listeners registrados.

---

### `stopAnimation()`

```tsx
stopAnimation(callback?: (value: number) => void);
```

Para qualquer animação ou rastreamento em execução. `callback` é invocado com o valor final após parar a animação, o que é útil para atualizar o state para corresponder a posição da animação com o layout.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                |
| -------- | -------- | ----------- | ---------------------------------------- |
| callback | function | Não         | Uma função que receberá o valor final.   |

---

### `resetAnimation()`

```tsx
resetAnimation(callback?: (value: number) => void);
```

Para qualquer animação e redefine o valor para seu original.

**Parâmetros:**

| Nome     | Tipo     | Obrigatório | Descrição                                  |
| -------- | -------- | ----------- | ------------------------------------------ |
| callback | function | Não         | Uma função que receberá o valor original.  |

---

### `interpolate()`

```tsx
interpolate(config: InterpolationConfigType);
```

Interpola o valor antes de atualizar a propriedade, por exemplo, mapeando 0-1 para 0-10.

Veja `AnimatedInterpolation.js`

**Parâmetros:**

| Nome   | Tipo   | Obrigatório | Descrição    |
| ------ | ------ | ----------- | ------------ |
| config | object | Sim         | Veja abaixo. |

O objeto `config` é composto pelas seguintes chaves:

- `inputRange`: um array de números
- `outputRange`: um array de números ou strings
- `easing` (optional): uma função que retorna um número, dado um número de entrada
- `extrapolate` (optional): uma string como 'extend', 'identity', ou 'clamp'
- `extrapolateLeft` (optional): uma string como 'extend', 'identity', ou 'clamp'
- `extrapolateRight` (optional): uma string como 'extend', 'identity', ou 'clamp'

---

### `animate()`

```tsx
animate(animation, callback);
```

Normalmente usado apenas internamente, mas pode ser usado por uma classe Animation customizada.

**Parâmetros:**

| Nome      | Tipo      | Obrigatório | Descrição              |
| --------- | --------- | ----------- | ---------------------- |
| animation | Animation | Sim         | Veja `Animation.js`.   |
| callback  | function  | Sim         | Função de callback.    |
