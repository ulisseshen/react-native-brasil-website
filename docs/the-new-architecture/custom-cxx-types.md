<!-- ia-translated: true -->
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# Avançado: Tipos C++ Personalizados

:::note
Este guia assume que você está familiarizado com o guia [**Pure C++ Turbo Native Modules**](pure-cxx-modules.md). Isso será construído em cima desse guia.
:::

C++ Turbo Native Modules suportam [funcionalidade de bridging](https://github.com/facebook/react-native/tree/main/packages/react-native/ReactCommon/react/bridging) para a maioria dos tipos padrão `std::`. Você pode usar a maioria desses tipos em seus módulos sem qualquer código adicional necessário.

Se você quiser adicionar suporte para tipos novos e personalizados em seu aplicativo ou biblioteca, você precisa fornecer o arquivo header `bridging` necessário.

## Adicionando um Novo Tipo Personalizado: Int64

C++ Turbo Native Modules ainda não suportam números `int64_t` - porque JavaScript não suporta números maiores que 2^53. Para representar números maiores que 2^53, podemos usar um tipo `string` em JS e convertê-lo automaticamente para `int64_t` em C++.

### 1. Crie o Arquivo Header de Bridging

O primeiro passo para suportar um novo tipo personalizado é definir o header de bridging que cuida da conversão do tipo **da** representação JS para a representação C++, e da representação C++ **para** a JS.

1. Na pasta `shared`, adicione um novo arquivo chamado `Int64.h`
2. Adicione o seguinte código a esse arquivo:

```cpp title="Int64.h"
#pragma once

#include <react/bridging/Bridging.h>

namespace facebook::react {

template <>
struct Bridging<int64_t> {
  // Converts from the JS representation to the C++ representation
  static int64_t fromJs(jsi::Runtime &rt, const jsi::String &value) {
    try {
      size_t pos;
      auto str = value.utf8(rt);
      auto num = std::stoll(str, &pos);
      if (pos != str.size()) {
        throw std::invalid_argument("Invalid number"); // don't support alphanumeric strings
      }
      return num;
    } catch (const std::logic_error &e) {
      throw jsi::JSError(rt, e.what());
    }
  }

  // Converts from the C++ representation to the JS representation
  static jsi::String toJs(jsi::Runtime &rt, int64_t value) {
    return bridging::toJs(rt, std::to_string(value));
  }
};

}
```

Os componentes-chave para seu header de bridging personalizado são:

- Especialização explícita da struct `Bridging` para seu tipo personalizado. Neste caso, o template especifica o tipo `int64_t`.
- Uma função `fromJs` para converter da representação JS para a representação C++
- Uma função `toJs` para converter da representação C++ para a representação JS

:::note
No iOS, lembre-se de adicionar o arquivo `Int64.h` ao projeto Xcode.
:::

### 2. Modifique a Spec JS

Agora, podemos modificar a spec JS para adicionar um método que usa o novo tipo. Como de costume, podemos usar Flow ou TypeScript para nossas specs.

1. Abra o `specs/NativeSampleTurbomodule`
2. Modifique a spec da seguinte forma:

<Tabs groupId="custom-int64" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```diff title="NativeSampleModule.ts"
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+  readonly cubicRoot: (input: string) => number;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```diff title="NativeSampleModule.js"
// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+  +cubicRoot: (input: string) => number;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
</Tabs>

Nestes arquivos, estamos definindo a função que precisa ser implementada em C++.

### 3. Implemente o Código Nativo

Agora, precisamos implementar a função que declaramos na especificação JS.

1. Abra o arquivo `specs/NativeSampleModule.h` e aplique as seguintes mudanças:

```diff title="NativeSampleModule.h"
#pragma once

#include <AppSpecsJSI.h>
#include <memory>
#include <string>

+ #include "Int64.h"

namespace facebook::react {

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
+ int32_t cubicRoot(jsi::Runtime& rt, int64_t input);
};

} // namespace facebook::react

```

2. Abra o arquivo `specs/NativeSampleModule.cpp` e implemente a nova função:

```diff title="NativeSampleModule.cpp"
#include "NativeSampleModule.h"
+ #include <cmath>

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

+int32_t NativeSampleModule::cubicRoot(jsi::Runtime& rt, int64_t input) {
+    return std::cbrt(input);
+}

} // namespace facebook::react
```

A implementação importa a biblioteca C++ `<cmath>` para realizar operações matemáticas, então implementa a função `cubicRoot` usando a primitiva `cbrt` do módulo `<cmath>`.

### 4. Teste seu Código no seu App

Agora, podemos testar o código em nosso aplicativo.

Primeiro, precisamos atualizar o arquivo `App.tsx` para usar o novo método do TurboModule. Então, podemos compilar nossos aplicativos no Android e iOS.

1. Abra o código `App.tsx` e aplique as seguintes mudanças:

```diff title="App.tsx"
// ...
+ const [cubicSource, setCubicSource] = React.useState('')
+ const [cubicRoot, setCubicRoot] = React.useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here the text you want to revert</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
+        <Text>For which number do you want to compute the Cubic Root?</Text>
+        <TextInput
+          style={styles.textInput}
+          placeholder="Write your text here"
+          onChangeText={setCubicSource}
+          value={cubicSource}
+        />
+        <Button title="Get Cubic Root" onPress={() => setCubicRoot(SampleTurboModule.cubicRoot(cubicSource))} />
+        <Text>The cubic root is: {cubicRoot}</Text>
      </View>
    </SafeAreaView>
  );
}
//...
```

2. Para testar o aplicativo no Android, execute `yarn android` da pasta raiz do seu projeto.
3. Para testar o aplicativo no iOS, execute `yarn ios` da pasta raiz do seu projeto.

## Adicionando um Novo Tipo Personalizado Estruturado: Address

A abordagem acima pode ser generalizada para qualquer tipo de tipo. Para tipos estruturados, React Native fornece algumas funções auxiliares que tornam mais fácil fazer o bridge deles de JS para C++ e vice-versa.

Vamos assumir que queremos fazer o bridge de um tipo `Address` personalizado com as seguintes propriedades:

```ts
interface Address {
  street: string;
  num: number;
  isInUS: boolean;
}
```

### 1. Defina o tipo nas specs

Para o primeiro passo, vamos definir o novo tipo personalizado nas specs JS, para que o Codegen possa gerar todo o código de suporte. Dessa forma, não precisamos escrever o código manualmente.

1. Abra o arquivo `specs/NativeSampleModule` e adicione as seguintes mudanças.

<Tabs groupId="custom-int64" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```diff title="NativeSampleModule (Add Address type and validateAddress function)"
import {TurboModule, TurboModuleRegistry} from 'react-native';

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+ readonly validateAddress: (input: Address) => boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```diff title="NativeSampleModule (Add Address type and validateAddress function)"

// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};


export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+ +validateAddress: (input: Address) => boolean;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
</Tabs>

Este código define o novo tipo `Address` e define uma nova função `validateAddress` para o Turbo Native Module. Observe que a `validateFunction` requer um objeto `Address` como parâmetro.

Também é possível ter funções que retornam tipos personalizados.

### 2. Defina o código de bridging

Do tipo `Address` definido nas specs, o Codegen irá gerar dois tipos auxiliares: `NativeSampleModuleAddress` e `NativeSampleModuleAddressBridging`.

O primeiro tipo é a definição do `Address`. O segundo tipo contém toda a infraestrutura para fazer o bridge do tipo personalizado de JS para C++ e vice-versa. O único passo extra que precisamos adicionar é definir a estrutura `Bridging` que estende o tipo `NativeSampleModuleAddressBridging`.

1. Abra o arquivo `shared/NativeSampleModule.h`
2. Adicione o seguinte código no arquivo:

```diff title="NativeSampleModule.h (Bridging the Address type)"
#include "Int64.h"
#include <memory>
#include <string>

namespace facebook::react {
+  using Address = NativeSampleModuleAddress<std::string, int32_t, bool>;

+  template <>
+  struct Bridging<Address>
+      : NativeSampleModuleAddressBridging<Address> {};
  // ...
}
```

Este código define um typealias `Address` para o tipo genérico `NativeSampleModuleAddress`. **A ordem dos genéricos importa**: o primeiro argumento do template refere-se ao primeiro tipo de dado da struct, o segundo refere-se ao segundo, e assim por diante.

Então, o código adiciona a especialização `Bridging` para o novo tipo `Address`, estendendo `NativeSampleModuleAddressBridging` que é gerado pelo Codegen.

:::note
Existe uma convenção que é seguida para gerar esses tipos:

- A primeira parte do nome é sempre o tipo do módulo. `NativeSampleModule`, neste exemplo.
- A segunda parte do nome é sempre o nome do tipo JS definido nas specs. `Address`, neste exemplo.
  :::

### 3. Implemente o Código Nativo

Agora, precisamos implementar a função `validateAddress` em C++. Primeiro, precisamos adicionar a declaração da função no arquivo `.h`, e então podemos implementá-la no arquivo `.cpp`.

1. Abra o arquivo `shared/NativeSampleModule.h` e adicione a definição da função

```diff title="NativeSampleModule.h (validateAddress function prototype)"
  std::string reverseString(jsi::Runtime& rt, std::string input);

+  bool validateAddress(jsi::Runtime &rt, jsi::Object input);
};

} // namespace facebook::react
```

2. Abra o arquivo `shared/NativeSampleModule.cpp` e adicione a implementação da função

```cpp title="NativeSampleModule.cpp (validateAddress implementation)"
bool NativeSampleModule::validateAddress(jsi::Runtime &rt, jsi::Object input) {
  std::string street = input.getProperty(rt, "street").asString(rt).utf8(rt);
  int32_t number = input.getProperty(rt, "num").asNumber();

  return !street.empty() && number > 0;
}
```

Na implementação, o objeto que representa o `Address` é um `jsi::Object`. Para extrair os valores deste objeto, precisamos usar os acessadores fornecidos pelo `JSI`:

- `getProperty()` recupera a propriedade de um objeto por nome.
- `asString()` converte a propriedade para `jsi::String`.
- `utf8()` converte a `jsi::String` para uma `std::string`.
- `asNumber()` converte a propriedade para um `double`.

Uma vez que analisamos manualmente o objeto, podemos implementar a lógica que precisamos.

:::note
Se você quiser aprender mais sobre `JSI` e como funciona, dê uma olhada nesta [ótima palestra](https://youtu.be/oLmGInjKU2U?feature=shared) da App.JS 2024
:::

### 4. Testando o código no aplicativo

Para testar o código no aplicativo, temos que modificar o arquivo `App.tsx`.

1. Abra o arquivo `App.tsx`. Remova o conteúdo da função `App()`.
2. Substitua o corpo da função `App()` com o seguinte código:

```tsx title="App.tsx (App function body replacement)"
const [street, setStreet] = React.useState('');
const [num, setNum] = React.useState('');
const [isValidAddress, setIsValidAddress] = React.useState<
  boolean | null
>(null);

const onPress = () => {
  let houseNum = parseInt(num, 10);
  if (isNaN(houseNum)) {
    houseNum = -1;
  }
  const address = {
    street,
    num: houseNum,
    isInUS: false,
  };
  const result = SampleTurboModule.validateAddress(address);
  setIsValidAddress(result);
};

return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        Welcome to C Turbo Native Module Example
      </Text>
      <Text>Address:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setStreet}
        value={street}
      />
      <Text>Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setNum}
        value={num}
      />
      <Button title="Validate" onPress={onPress} />
      {isValidAddress != null && (
        <Text>
          Your address is {isValidAddress ? 'valid' : 'not valid'}
        </Text>
      )}
    </View>
  </SafeAreaView>
);
```

Parabéns! 🎉

Você fez o bridge dos seus primeiros tipos de JS para C++.
