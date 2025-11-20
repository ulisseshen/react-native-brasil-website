<!-- ia-translated: true -->
# Apêndice

## I. Terminologia

- **Spec** - Código TypeScript ou Flow que descreve a API para um Turbo Native Module ou Fabric Native component. Usado pelo **Codegen** para gerar código boilerplate.

- **Native Modules** - Bibliotecas nativas que não possuem User Interface (UI) para o usuário. Exemplos seriam armazenamento persistente, notificações, eventos de rede. Estes são acessíveis ao código JavaScript da sua aplicação como funções e objetos.
- **Native Component** - Views nativas da plataforma que estão disponíveis para o código JavaScript da sua aplicação através de React Components.

- **Legacy Native Components** - Components que estão executando na arquitetura antiga do React Native.
- **Legacy Native Modules** - Modules que estão executando na arquitetura antiga do React Native.

## II. Tipagens do Codegen

Você pode usar a tabela a seguir como referência para quais tipos são suportados e para o que eles mapeiam em cada plataforma:

| Flow                                                                       | TypeScript                                          | Flow Nullable Support                                   | TypeScript Nullable Support                          | Android (Java)                       | iOS (ObjC)                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| `string`                                                                   | `string`                                            | `?string`                                               | <code>string &#124; null</code>                      | `string`                             | `NSString`                                                     |
| `boolean`                                                                  | `boolean`                                           | `?boolean`                                              | <code>boolean &#124; null</code>                     | `Boolean`                            | `NSNumber`                                                     |
| Object Literal<br /><code>&#123;&#124; foo: string, ...&#124;&#125;</code> | <code>&#123; foo: string, ...&#125; as const</code> | <code>?&#123;&#124; foo: string, ...&#124;&#125;</code> | <code>?&#123; foo: string, ...&#125; as const</code> | \-                                   | \-                                                             |
| Object [[1](#notes)]                                                       | Object [[1](#notes)]                                | `?Object`                                               | <code>Object &#124; null</code>                      | `ReadableMap`                        | `@` (untyped dictionary)                                       |
| <code>Array&lt;T&gt;</code>                                                | <code>Array&lt;T&gt;</code>                         | <code>?Array&lt;T&gt;</code>                            | <code>Array&lt;T&gt; &#124; null</code>              | `ReadableArray`                      | `NSArray` (or `RCTConvertVecToArray` when used inside objects) |
| `Function`                                                                 | `Function`                                          | `?Function`                                             | <code>Function &#124; null</code>                    | \-                                   | \-                                                             |
| <code>Promise&lt;T&gt;</code>                                              | <code>Promise&lt;T&gt;</code>                       | <code>?Promise&lt;T&gt;</code>                          | <code>Promise&lt;T&gt; &#124; null</code>            | `com.facebook.react.bridge.Promise`  | `RCTPromiseResolve` and `RCTPromiseRejectBlock`                |
| Type Unions<br /><code>'SUCCESS'&#124;'FAIL'</code>                        | Type Unions<br /><code>'SUCCESS'&#124;'FAIL'</code> | Only as callbacks                                       |                                                      | \-                                   | \-                                                             |
| Callbacks<br />`() =>`                                                     | Callbacks<br />`() =>`                              | Yes                                                     |                                                      | `com.facebook.react.bridge.Callback` | `RCTResponseSenderBlock`                                       |
| `number`                                                                   | `number`                                            | No                                                      |                                                      | `double`                             | `NSNumber`                                                     |

### Notes:

<b>[1]</b> Recomendamos fortemente usar Object literals ao invés de Objects.

:::info
Você também pode achar útil consultar as especificações JavaScript para os módulos principais do React Native. Estes estão localizados dentro do diretório `Libraries/` no repositório do React Native.
:::
