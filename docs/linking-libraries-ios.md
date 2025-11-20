---
id: linking-libraries-ios
title: Linking Libraries
ia-translated: true
---

Nem todos os aplicativos usam todas as capacidades nativas, e incluir o código para suportar todos esses recursos impactaria o tamanho do binário... Mas ainda queremos suportar a adição desses recursos sempre que você precisar deles.

Com isso em mente, expusemos muitos desses recursos como bibliotecas estáticas independentes.

Para a maioria das libs, será tão rápido quanto arrastar dois arquivos, às vezes um terceiro passo será necessário, mas não mais do que isso.

:::note
Todas as bibliotecas que enviamos com React Native ficam na pasta `Libraries` na raiz do repositório. Algumas delas são JavaScript puro, e você só precisa fazer `require` delas.
Outras bibliotecas também dependem de algum código nativo, nesse caso você terá que adicionar esses arquivos ao seu aplicativo, caso contrário o aplicativo lançará um erro assim que você tentar usar a biblioteca.
:::

## Aqui estão os poucos passos para vincular suas bibliotecas que contêm código nativo

### Automatic linking

Instale uma biblioteca com dependências nativas:

```shell
npm install <library-with-native-dependencies> --save
```

:::info
A flag `--save` ou `--save-dev` é muito importante para este passo. React Native vinculará suas libs com base em `dependencies` e `devDependencies` no seu arquivo `package.json`.
:::

É isso! Da próxima vez que você compilar seu aplicativo, o código nativo será vinculado graças ao mecanismo de [autolinking](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md).

### Manual linking

#### Step 1

Se a biblioteca tiver código nativo, deve haver um arquivo `.xcodeproj` dentro de sua pasta. Arraste este arquivo para seu projeto no Xcode (geralmente sob o grupo `Libraries` no Xcode);

![](/docs/assets/AddToLibraries.png)

#### Step 2

Clique no arquivo principal do seu projeto (aquele que representa o `.xcodeproj`) selecione `Build Phases` e arraste a biblioteca estática da pasta `Products` dentro da Library que você está importando para `Link Binary With Libraries`

![](/docs/assets/AddToBuildPhases.png)

#### Step 3

Nem toda biblioteca precisará deste passo, o que você precisa considerar é:

_Preciso conhecer o conteúdo da biblioteca em tempo de compilação?_

O que isso significa é, você está usando esta biblioteca no lado nativo ou apenas em JavaScript? Se você está usando apenas em JavaScript, você está pronto para ir!

Se você precisa chamá-la do nativo, então precisamos conhecer os headers da biblioteca. Para conseguir isso, você tem que ir para o arquivo do seu projeto, selecionar `Build Settings` e procurar por `Header Search Paths`. Lá você deve incluir o caminho para sua biblioteca. (Esta documentação costumava recomendar usar `recursive`, mas isso não é mais recomendado, pois pode causar falhas sutis de compilação, especialmente com CocoaPods.)

![](/docs/assets/AddToSearchPaths.png)
