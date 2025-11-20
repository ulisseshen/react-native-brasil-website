---
ia-translated: true
id: testing-overview
title: Testando
author: Vojtech Novak
authorURL: 'https://twitter.com/vonovak'
description: Este guia apresenta aos desenvolvedores React Native os conceitos-chave por trás de testes, como escrever bons testes e quais tipos de testes você pode incorporar ao seu workflow.
---

À medida que sua base de código se expande, pequenos erros e casos extremos que você não espera podem se transformar em falhas maiores. Bugs levam a uma experiência ruim do usuário e, em última análise, perdas nos negócios. Uma maneira de evitar programação frágil é testar seu código antes de lançá-lo.

Neste guia, abordaremos diferentes maneiras automatizadas de garantir que seu app funcione conforme esperado, desde análise estática até testes end-to-end.

<img src="/docs/assets/diagram_testing.svg" alt="Testar é um ciclo de corrigir, testar e passar para release ou falhar de volta para teste." />

## Por que Testar

Somos humanos e humanos cometem erros. Testar é importante porque ajuda você a descobrir esses erros e verifica se seu código está funcionando. Talvez ainda mais importante, testar garante que seu código continue funcionando no futuro à medida que você adiciona novos recursos, refatora os existentes ou atualiza dependências principais do seu projeto.

Há mais valor em testar do que você pode perceber. Uma das melhores maneiras de corrigir um bug no seu código é escrever um teste que falha e o expõe. Então, quando você corrige o bug e executa o teste novamente, se ele passar, significa que o bug foi corrigido e nunca será reintroduzido na base de código.

Os testes também podem servir como documentação para novas pessoas que se juntam à sua equipe. Para pessoas que nunca viram uma base de código antes, ler testes pode ajudá-las a entender como o código existente funciona.

Por último, mas não menos importante, mais testes automatizados significam menos tempo gasto com <abbr title="Quality Assurance">QA</abbr> manual, liberando tempo valioso.

## Static Analysis

O primeiro passo para melhorar a qualidade do seu código é começar a usar ferramentas de análise estática. A análise estática verifica seu código em busca de erros enquanto você o escreve, mas sem executar nenhum código.

- **Linters** analisam código para detectar erros comuns, como código não utilizado, e para ajudar a evitar armadilhas, para sinalizar itens que não seguem o guia de estilo, como usar tabs em vez de espaços (ou vice-versa, dependendo da sua configuração).
- **Type checking** garante que o construto que você está passando para uma função corresponde ao que a função foi projetada para aceitar, evitando passar uma string para uma função de contagem que espera um número, por exemplo.

React Native vem com duas dessas ferramentas configuradas por padrão: [ESLint](https://eslint.org/) para linting e [TypeScript](typescript) para type checking.

## Writing Testable Code

Para começar com testes, você primeiro precisa escrever código que seja testável. Considere um processo de fabricação de aeronaves - antes que qualquer modelo decole pela primeira vez para mostrar que todos os seus sistemas complexos funcionam bem juntos, partes individuais são testadas para garantir que sejam seguras e funcionem corretamente. Por exemplo, as asas são testadas dobrando-as sob carga extrema; partes do motor são testadas quanto à sua durabilidade; o para-brisa é testado contra impacto simulado de pássaros.

Software é semelhante. Em vez de escrever todo o seu programa em um grande arquivo com muitas linhas de código, você escreve seu código em vários módulos pequenos que você pode testar de forma mais completa do que se testasse o todo montado. Dessa forma, escrever código testável está entrelaçado com escrever código limpo e modular.

Para tornar seu app mais testável, comece separando a parte de visualização do seu app—seus componentes React—da lógica de negócios e do estado do app (independentemente de você usar Redux, MobX ou outras soluções). Dessa forma, você pode manter seu teste de lógica de negócios—que não deve depender de seus componentes React—independente dos próprios componentes, cujo trabalho é principalmente renderizar a UI do seu app!

Teoricamente, você poderia ir tão longe a ponto de mover toda a lógica e busca de dados para fora de seus componentes. Dessa forma, seus componentes seriam dedicados apenas à renderização. O estado do seu app seria inteiramente independente de seus componentes. A lógica do seu app funcionaria sem nenhum componente React!

:::tip
Encorajamos você a explorar mais o tópico de código testável em outros recursos de aprendizagem.
:::

## Writing Tests

Depois de escrever código testável, é hora de escrever alguns testes reais! O template padrão do React Native vem com [Jest](https://jestjs.io) testing framework. Ele inclui um preset que é adaptado para este ambiente, para que você possa ser produtivo sem ajustar a configuração e mocks imediatamente—[mais sobre mocks](#mocking) em breve. Você pode usar Jest para escrever todos os tipos de testes apresentados neste guia.

:::note
Se você faz desenvolvimento orientado a testes, você na verdade escreve testes primeiro! Dessa forma, a testabilidade do seu código é garantida.
:::

### Structuring Tests

Seus testes devem ser curtos e idealmente testar apenas uma coisa. Vamos começar com um exemplo de teste unitário escrito com Jest:

```js
it('given a date in the past, colorForDueDate() returns red', () => {
  expect(colorForDueDate('2000-10-20')).toBe('red');
});
```

O teste é descrito pela string passada para a função [`it`](https://jestjs.io/docs/en/api#testname-fn-timeout). Tenha cuidado ao escrever a descrição para que fique claro o que está sendo testado. Faça o seu melhor para cobrir o seguinte:

1. **Given** - alguma pré-condição
2. **When** - alguma ação executada pela função que você está testando
3. **Then** - o resultado esperado

Isso também é conhecido como AAA (Arrange, Act, Assert).

Jest oferece a função [`describe`](https://jestjs.io/docs/en/api#describename-fn) para ajudar a estruturar seus testes. Use `describe` para agrupar todos os testes que pertencem a uma funcionalidade. Describes podem ser aninhados, se você precisar disso. Outras funções que você usará comumente são [`beforeEach`](https://jestjs.io/docs/en/api#beforeeachfn-timeout) ou [`beforeAll`](https://jestjs.io/docs/en/api#beforeallfn-timeout) que você pode usar para configurar os objetos que está testando. Leia mais na [referência da api do Jest](https://jestjs.io/docs/en/api).

Se o seu teste tem muitas etapas ou muitas expectations, você provavelmente quer dividi-lo em vários menores. Além disso, certifique-se de que seus testes sejam completamente independentes uns dos outros. Cada teste em sua suíte deve ser executável por conta própria sem primeiro executar algum outro teste. Por outro lado, se você executar todos os seus testes juntos, o primeiro teste não deve influenciar a saída do segundo.

Por último, como desenvolvedores gostamos quando nosso código funciona bem e não trava. Com testes, isso geralmente é o oposto. Pense em um teste que falhou como uma _coisa boa!_ Quando um teste falha, muitas vezes significa que algo não está certo. Isso lhe dá a oportunidade de corrigir o problema antes que ele afete os usuários.

## Unit Tests

Testes unitários cobrem as menores partes de código, como funções individuais ou classes.

Quando o objeto sendo testado tem alguma dependência, você frequentemente precisará fazer mock delas, conforme descrito no próximo parágrafo.

A grande vantagem dos testes unitários é que eles são rápidos de escrever e executar. Portanto, enquanto você trabalha, você obtém feedback rápido sobre se seus testes estão passando. O Jest tem até uma opção para executar continuamente testes relacionados ao código que você está editando: [Watch mode](https://jestjs.io/docs/en/cli#watch).

<img src="/docs/assets/p_tests-unit.svg" alt=" " />

### Mocking

Às vezes, quando seus objetos testados têm dependências externas, você vai querer fazer "mock" delas. "Mocking" é quando você substitui alguma dependência do seu código com sua própria implementação.

:::info
Geralmente, usar objetos reais em seus testes é melhor do que usar mocks, mas há situações em que isso não é possível. Por exemplo: quando seu teste unitário JS depende de um módulo nativo escrito em Java ou Objective-C.
:::

Imagine que você está escrevendo um app que mostra o clima atual na sua cidade e você está usando algum serviço externo ou outra dependência que fornece as informações do clima. Se o serviço disser que está chovendo, você quer mostrar uma imagem com uma nuvem chuvosa. Você não quer chamar esse serviço em seus testes, porque:

- Isso poderia tornar os testes lentos e instáveis (por causa das solicitações de rede envolvidas)
- O serviço pode retornar dados diferentes cada vez que você executa o teste
- Serviços de terceiros podem ficar offline quando você realmente precisa executar testes!

Portanto, você pode fornecer uma implementação mock do serviço, substituindo efetivamente milhares de linhas de código e alguns termômetros conectados à internet!

:::note
O Jest vem com [suporte para mocking](https://jestjs.io/docs/en/mock-functions#mocking-modules) desde o nível de função até o nível de módulo.
:::

## Integration Tests

Ao escrever sistemas de software maiores, peças individuais precisam interagir umas com as outras. Em testes unitários, se sua unidade depende de outra, você às vezes acaba fazendo mock da dependência, substituindo-a por uma falsa.

Em testes de integração, unidades individuais reais são combinadas (como no seu app) e testadas juntas para garantir que sua cooperação funcione conforme esperado. Isso não quer dizer que o mocking não aconteça aqui: você ainda precisará de mocks (por exemplo, para fazer mock da comunicação com um serviço de clima), mas você precisará deles muito menos do que em testes unitários.

:::info
Observe que a terminologia em torno do que significa teste de integração nem sempre é consistente. Além disso, a linha entre o que é um teste unitário e o que é um teste de integração nem sempre pode ser clara. Para este guia, seu teste se enquadra em "testes de integração" se ele:

- Combina vários módulos do seu app conforme descrito acima
- Usa um sistema externo
- Faz uma chamada de rede para outra aplicação (como a API do serviço de clima)
- Faz qualquer tipo de <abbr title="Input/Output">I/O</abbr> de arquivo ou banco de dados
  :::

<img src="/docs/assets/p_tests-integration.svg" alt=" " />

## Component Tests

Componentes React são responsáveis por renderizar seu app, e os usuários interagirão diretamente com sua saída. Mesmo que a lógica de negócios do seu app tenha alta cobertura de teste e esteja correta, sem testes de componentes você ainda pode entregar uma UI quebrada aos seus usuários. Os testes de componentes podem se enquadrar tanto em testes unitários quanto de integração, mas como são uma parte tão central do React Native, nós os cobrimos separadamente.

Para testar componentes React, existem duas coisas que você pode querer testar:

- Interaction: para garantir que o componente se comporte corretamente quando interagido por um usuário (por exemplo, quando o usuário pressiona um botão)
- Rendering: para garantir que a saída de renderização do componente usada pelo React esteja correta (por exemplo, a aparência e o posicionamento do botão na UI)

Por exemplo, se você tem um botão que tem um listener `onPress`, você quer testar que o botão aparece corretamente e que tocar no botão é corretamente tratado pelo componente.

Existem várias bibliotecas que podem ajudá-lo a testar isso:

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) é construída em cima do test renderer do React e adiciona APIs `fireEvent` e `query` descritas no próximo parágrafo.
- [Deprecated] [Test Renderer](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#deprecated-react-test-renderer) do React, desenvolvido junto com seu núcleo, fornece um renderer React que pode ser usado para renderizar componentes React em objetos JavaScript puros, sem depender do DOM ou de um ambiente móvel nativo.

:::warning
Testes de componentes são apenas testes JavaScript executando em ambiente Node.js. Eles _não_ levam em conta nenhum código iOS, Android ou outro código de plataforma que está dando suporte aos componentes React Native. Segue-se que eles não podem dar a você 100% de confiança de que tudo funciona para o usuário. Se houver um bug no código iOS ou Android, eles não o encontrarão.
:::

<img src="/docs/assets/p_tests-component.svg" alt=" " />

### Testing User Interactions

Além de renderizar alguma UI, seus componentes lidam com eventos como `onChangeText` para `TextInput` ou `onPress` para `Button`. Eles também podem conter outras funções e callbacks de eventos. Considere o seguinte exemplo:

```tsx
function GroceryShoppingList() {
  const [groceryItem, setGroceryItem] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const addNewItemToShoppingList = useCallback(() => {
    setItems([groceryItem, ...items]);
    setGroceryItem('');
  }, [groceryItem, items]);

  return (
    <>
      <TextInput
        value={groceryItem}
        placeholder="Enter grocery item"
        onChangeText={text => setGroceryItem(text)}
      />
      <Button
        title="Add the item to list"
        onPress={addNewItemToShoppingList}
      />
      {items.map(item => (
        <Text key={item}>{item}</Text>
      ))}
    </>
  );
}
```

Ao testar interações do usuário, teste o componente da perspectiva do usuário—o que está na página? O que muda quando interagido?

Como regra geral, prefira usar coisas que os usuários podem ver ou ouvir:

- faça asserções usando texto renderizado ou [helpers de acessibilidade](https://reactnative.dev/docs/accessibility#accessibility-properties)

Por outro lado, você deve evitar:

- fazer asserções em props ou state do componente
- queries testID

Evite testar detalhes de implementação como props ou state—embora tais testes funcionem, eles não são orientados a como os usuários vão interagir com o componente e tendem a quebrar ao refatorar (por exemplo, quando você gostaria de renomear algumas coisas ou reescrever componente de classe usando hooks).

:::info
Componentes de classe React são especialmente propensos a testar seus detalhes de implementação, como state interno, props ou event handlers. Para evitar testar detalhes de implementação, prefira usar componentes de função com Hooks, o que torna depender de internals do componente _mais difícil_.
:::

Bibliotecas de testes de componentes como [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) facilitam escrever testes centrados no usuário por meio de escolha cuidadosa das APIs fornecidas. O exemplo a seguir usa os métodos `fireEvent` `changeText` e `press` que simulam um usuário interagindo com o componente e uma função de query `getAllByText` que encontra nós `Text` correspondentes na saída renderizada.

```tsx
test('given empty GroceryShoppingList, user can add an item to it', () => {
  const {getByPlaceholderText, getByText, getAllByText} = render(
    <GroceryShoppingList />,
  );

  fireEvent.changeText(
    getByPlaceholderText('Enter grocery item'),
    'banana',
  );
  fireEvent.press(getByText('Add the item to list'));

  const bananaElements = getAllByText('banana');
  expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
});
```

Este exemplo não está testando como algum state muda quando você chama uma função. Ele testa o que acontece quando um usuário muda o texto no `TextInput` e pressiona o `Button`!

### Testing Rendered Output

[Snapshot testing](https://jestjs.io/docs/en/snapshot-testing) é um tipo avançado de teste habilitado pelo Jest. É uma ferramenta muito poderosa e de baixo nível, então atenção extra é aconselhada ao usá-la.

Um "component snapshot" é uma string do tipo JSX criada por um serializador React customizado integrado ao Jest. Este serializador permite ao Jest traduzir árvores de componentes React em string que é legível por humanos. Dito de outra forma: um component snapshot é uma representação textual da saída de renderização do seu componente _gerada_ durante uma execução de teste. Pode parecer assim:

```tsx
<Text
  style={
    Object {
      "fontSize": 20,
      "textAlign": "center",
    }
  }>
  Welcome to React Native!
</Text>
```

Com snapshot testing, você normalmente primeiro implementa seu componente e então executa o snapshot test. O snapshot test então cria um snapshot e o salva em um arquivo no seu repositório como um snapshot de referência. **O arquivo é então commitado e verificado durante a revisão de código**. Quaisquer mudanças futuras na saída de renderização do componente mudarão seu snapshot, o que fará o teste falhar. Você então precisa atualizar o snapshot de referência armazenado para que o teste passe. Essa mudança novamente precisa ser commitada e revisada.

Snapshots têm vários pontos fracos:

- Para você como desenvolvedor ou revisor, pode ser difícil dizer se uma mudança no snapshot é intencional ou se é evidência de um bug. Especialmente snapshots grandes podem rapidamente se tornar difíceis de entender e seu valor agregado torna-se baixo.
- Quando o snapshot é criado, naquele ponto ele é considerado correto—mesmo no caso em que a saída renderizada está realmente errada.
- Quando um snapshot falha, é tentador atualizá-lo usando a opção `--updateSnapshot` do jest sem tomar o devido cuidado para investigar se a mudança é esperada. Certa disciplina de desenvolvedor é necessária.

Snapshots em si não garantem que sua lógica de renderização do componente esteja correta, eles são meramente bons em proteger contra mudanças inesperadas e para verificar que os componentes na árvore React sob teste recebam as props esperadas (styles e etc.).

Recomendamos que você use apenas snapshots pequenos (veja a regra [`no-large-snapshots`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-large-snapshots.md)). Se você quiser testar uma _mudança_ entre dois estados de componente React, use [`snapshot-diff`](https://github.com/jest-community/snapshot-diff). Quando em dúvida, prefira expectations explícitas como descrito no parágrafo anterior.

<img src="/docs/assets/p_tests-snapshot.svg" alt=" " />

## End-to-End Tests

Em testes end-to-end (E2E), você verifica se seu app está funcionando conforme esperado em um dispositivo (ou um simulator / emulator) da perspectiva do usuário.

Isso é feito fazendo build do seu app na configuração release e executando os testes contra ela. Em testes E2E, você não pensa mais em componentes React, APIs React Native, Redux stores ou qualquer lógica de negócios. Esse não é o propósito dos testes E2E e esses nem mesmo estão acessíveis a você durante os testes E2E.

Em vez disso, bibliotecas de testes E2E permitem que você encontre e controle elementos na tela do seu app: por exemplo, você pode _realmente_ tocar botões ou inserir texto em `TextInputs` da mesma forma que um usuário real faria. Então você pode fazer asserções sobre se um determinado elemento existe ou não na tela do app, se está visível ou não, qual texto ele contém e assim por diante.

Testes E2E lhe dão a maior confiança possível de que parte do seu app está funcionando. Os tradeoffs incluem:

- escrevê-los consome mais tempo comparado aos outros tipos de testes
- eles são mais lentos para executar
- eles são mais propensos a flakiness (um teste "flaky" é um teste que passa e falha aleatoriamente sem nenhuma mudança no código)

Tente cobrir as partes vitais do seu app com testes E2E: fluxo de autenticação, funcionalidades principais, pagamentos, etc. Use testes JS mais rápidos para as partes não vitais do seu app. Quanto mais testes você adiciona, maior sua confiança, mas também mais tempo você gastará mantendo-os e executando-os. Considere os tradeoffs e decida o que é melhor para você.

Existem várias ferramentas de testes E2E disponíveis: na comunidade React Native, [Detox](https://github.com/wix/detox/) é um framework popular porque é feito sob medida para apps React Native. Outra biblioteca popular no espaço de apps iOS e Android é [Appium](https://appium.io/) ou [Maestro](https://maestro.mobile.dev/).

<img src="/docs/assets/p_tests-e2e.svg" alt=" " />

## Summary

Esperamos que você tenha gostado de ler e aprendido algo com este guia. Existem muitas maneiras de testar seus apps. Pode ser difícil decidir o que usar no início. No entanto, acreditamos que tudo fará sentido assim que você começar a adicionar testes ao seu incrível app React Native. Então o que você está esperando? Aumente sua cobertura!

### Links

- [React testing overview](https://react.dev/reference/react/act)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest docs](https://jestjs.io/docs/en/tutorial-react-native)
- [Detox](https://github.com/wix/detox/)
- [Appium](https://appium.io/)
- [Maestro](https://maestro.mobile.dev/)

---

_Este guia foi originalmente criado e contribuído integralmente por [Vojtech Novak](https://twitter.com/vonovak)._
