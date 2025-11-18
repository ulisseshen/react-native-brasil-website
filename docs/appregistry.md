---
ia-translated: true
id: appregistry
title: AppRegistry
---

<div className="banner-native-code-required">
  <h3>Projeto com Código Nativo Necessário</h3>
  <p>Se você está usando o fluxo de trabalho gerenciado do Expo, há apenas um componente de entrada registrado com <code>AppRegistry</code> e ele é tratado automaticamente (ou através do <a href="https://docs.expo.dev/versions/latest/sdk/register-root-component/">registerRootComponent</a>). Você não precisa usar esta API.</p>
</div>

`AppRegistry` é o ponto de entrada JS para executar todos os aplicativos React Native. Os componentes raiz do aplicativo devem se registrar com `AppRegistry.registerComponent`, então o sistema nativo pode carregar o bundle para o aplicativo e então realmente executar o aplicativo quando estiver pronto invocando `AppRegistry.runApplication`.

```tsx
import {Text, AppRegistry} from 'react-native';

const App = () => (
  <View>
    <Text>App1</Text>
  </View>
);

AppRegistry.registerComponent('Appname', () => App);
```

Para "parar" um aplicativo quando uma view deve ser destruída, chame `AppRegistry.unmountApplicationComponentAtRootTag` com a tag que foi passada para `runApplication`. Estes devem sempre ser usados como um par.

`AppRegistry` deve ser importado cedo na sequência de `require` para garantir que o ambiente de execução JS esteja configurado antes que outros módulos sejam importados.

---

# Referência

## Métodos

### `getAppKeys()`

```tsx
static getAppKeys(): string[];
```

Retorna um array de strings.

---

### `getRegistry()`

```tsx
static getRegistry(): {sections: string[]; runnables: Runnable[]};
```

Retorna um objeto [Registry](appregistry#registry).

---

### `getRunnable()`

```tsx
static getRunnable(appKey: string): : Runnable | undefined;
```

Retorna um objeto [Runnable](appregistry#runnable).

**Parâmetros:**

| Nome                                                            | Tipo   |
| --------------------------------------------------------------- | ------ |
| appKey <div className="label basic required">Obrigatório</div> | string |

---

### `getSectionKeys()`

```tsx
static getSectionKeys(): string[];
```

Retorna um array de strings.

---

### `getSections()`

```tsx
static getSections(): Record<string, Runnable>;
```

Retorna um objeto [Runnables](appregistry#runnables).

---

### `registerCancellableHeadlessTask()`

```tsx
static registerCancellableHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
  taskCancelProvider: TaskCancelProvider,
);
```

Registra uma headless task que pode ser cancelada. Uma headless task é um pedaço de código que executa sem uma UI.

**Parâmetros:**

| Nome                                                                                      | Tipo                                                 | Descrição                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| taskKey<br/><div className="label basic required two-lines">Obrigatório</div>            | string                                               | O id nativo para esta instância de task que foi usado quando startHeadlessTask foi chamado.                                                                                                                                                |
| taskProvider<br/><div className="label basic required two-lines">Obrigatório</div>       | [TaskProvider](appregistry#taskprovider)             | Uma função que retorna uma promise e recebe alguns dados passados do lado nativo como único argumento. Quando a promise é resolvida ou rejeitada, o lado nativo é notificado deste evento e pode decidir destruir o contexto JS.            |
| taskCancelProvider<br/><div className="label basic required two-lines">Obrigatório</div> | [TaskCancelProvider](appregistry#taskcancelprovider) | uma função que retorna void e não recebe argumentos; quando um cancelamento é solicitado, a função sendo executada por taskProvider deve encerrar e retornar o mais rápido possível.                                                       |

---

### `registerComponent()`

```tsx
static registerComponent(
  appKey: string,
  getComponentFunc: ComponentProvider,
  section?: boolean,
): string;
```

**Parâmetros:**

| Nome                                                                       | Tipo              |
| -------------------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">Obrigatório</div>            | string            |
| componentProvider <div className="label basic required">Obrigatório</div> | ComponentProvider |
| section                                                                    | boolean           |

---

### `registerConfig()`

```tsx
static registerConfig(config: AppConfig[]);
```

**Parâmetros:**

| Nome                                                            | Tipo                                 |
| --------------------------------------------------------------- | ------------------------------------ |
| config <div className="label basic required">Obrigatório</div> | [AppConfig](appregistry#appconfig)[] |

---

### `registerHeadlessTask()`

```tsx
static registerHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
);
```

Registra uma headless task. Uma headless task é um pedaço de código que executa sem uma UI.

Esta é uma maneira de executar tarefas em JavaScript enquanto seu aplicativo está em segundo plano. Pode ser usado, por exemplo, para sincronizar dados atualizados, lidar com notificações push, ou tocar música.

**Parâmetros:**

| Nome                                                                            | Tipo                                     | Descrição                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| taskKey <div className="label basic required two-lines">Obrigatório</div>      | string                                   | O id nativo para esta instância de task que foi usado quando startHeadlessTask foi chamado.                                                                                                                                                |
| taskProvider <div className="label basic required two-lines">Obrigatório</div> | [TaskProvider](appregistry#taskprovider) | Uma função que retorna uma promise e recebe alguns dados passados do lado nativo como único argumento. Quando a promise é resolvida ou rejeitada, o lado nativo é notificado deste evento e pode decidir destruir o contexto JS.            |

---

### `registerRunnable()`

```tsx
static registerRunnable(appKey: string, func: Runnable): string;
```

**Parâmetros:**

| Nome                                                            | Tipo     |
| --------------------------------------------------------------- | -------- |
| appKey <div className="label basic required">Obrigatório</div> | string   |
| run <div className="label basic required">Obrigatório</div>    | function |

---

### `registerSection()`

```tsx
static registerSection(
  appKey: string,
  component: ComponentProvider,
);
```

**Parâmetros:**

| Nome                                                               | Tipo              |
| ------------------------------------------------------------------ | ----------------- |
| appKey <div className="label basic required">Obrigatório</div>    | string            |
| component <div className="label basic required">Obrigatório</div> | ComponentProvider |

---

### `runApplication()`

```tsx
static runApplication(appKey: string, appParameters: any): void;
```

Carrega o bundle JavaScript e executa o aplicativo.

**Parâmetros:**

| Nome                                                                   | Tipo   |
| ---------------------------------------------------------------------- | ------ |
| appKey <div className="label basic required">Obrigatório</div>        | string |
| appParameters <div className="label basic required">Obrigatório</div> | any    |

---

### `setComponentProviderInstrumentationHook()`

```tsx
static setComponentProviderInstrumentationHook(
  hook: ComponentProviderInstrumentationHook,
);
```

**Parâmetros:**

| Nome                                                          | Tipo     |
| ------------------------------------------------------------- | -------- |
| hook <div className="label basic required">Obrigatório</div> | function |

Uma função `hook` válida aceita o seguinte como argumentos:

| Nome                                                                             | Tipo               |
| -------------------------------------------------------------------------------- | ------------------ |
| component <div className="label basic required">Obrigatório</div>               | ComponentProvider  |
| scopedPerformanceLogger <div className="label basic required">Obrigatório</div> | IPerformanceLogger |

A função também deve retornar um Component React.

---

### `setWrapperComponentProvider()`

```tsx
static setWrapperComponentProvider(
  provider: WrapperComponentProvider,
);
```

**Parâmetros:**

| Nome                                                              | Tipo              |
| ----------------------------------------------------------------- | ----------------- |
| provider <div className="label basic required">Obrigatório</div> | ComponentProvider |

---

### `startHeadlessTask()`

```tsx
static startHeadlessTask(
  taskId: number,
  taskKey: string,
  data: any,
);
```

Chamado apenas do código nativo. Inicia uma headless task.

**Parâmetros:**

| Nome                                                             | Tipo   | Descrição                                                                      |
| ---------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------ |
| taskId <div className="label basic required">Obrigatório</div>  | number | O id nativo para esta instância de task para acompanhar sua execução.          |
| taskKey <div className="label basic required">Obrigatório</div> | string | A chave para a task a ser iniciada.                                            |
| data <div className="label basic required">Obrigatório</div>    | any    | Os dados para passar para a task.                                              |

---

### `unmountApplicationComponentAtRootTag()`

```tsx
static unmountApplicationComponentAtRootTag(rootTag: number);
```

Para um aplicativo quando uma view deve ser destruída.

**Parâmetros:**

| Nome                                                             | Tipo   |
| ---------------------------------------------------------------- | ------ |
| rootTag <div className="label basic required">Obrigatório</div> | number |

## Definições de Tipo

### AppConfig

Configuração de aplicativo para o método `registerConfig`.

| Tipo   |
| ------ |
| object |

**Propriedades:**

| Nome                                                            | Tipo              |
| --------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">Obrigatório</div> | string            |
| component                                                       | ComponentProvider |
| run                                                             | function          |
| section                                                         | boolean           |

:::note
Espera-se que cada configuração defina ou `component` ou a função `run`.
:::

### Registry

| Tipo   |
| ------ |
| object |

**Propriedades:**

| Nome      | Tipo                                       |
| --------- | ------------------------------------------ |
| runnables | array de [Runnables](appregistry#runnable) |
| sections  | array de strings                           |

### Runnable

| Tipo   |
| ------ |
| object |

**Propriedades:**

| Nome      | Tipo              |
| --------- | ----------------- |
| component | ComponentProvider |
| run       | function          |

### Runnables

Um objeto com chave de `appKey` e valor do tipo [`Runnable`](appregistry#runnable).

| Tipo   |
| ------ |
| object |

### Task

Uma `Task` é uma função que aceita quaisquer dados como argumento e retorna uma Promise que resolve para `undefined`.

| Tipo     |
| -------- |
| function |

### TaskCanceller

Um `TaskCanceller` é uma função que não aceita argumentos e retorna void.

| Tipo     |
| -------- |
| function |

### TaskCancelProvider

Um `TaskCancelProvider` válido é uma função que retorna um [`TaskCanceller`](appregistry#taskcanceller).

| Tipo     |
| -------- |
| function |

### TaskProvider

Um `TaskProvider` válido é uma função que retorna uma [`Task`](appregistry#task).

| Tipo     |
| -------- |
| function |
