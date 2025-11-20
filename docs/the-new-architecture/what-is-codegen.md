<!-- ia-translated: true -->

# O que é Codegen?

**Codegen** é uma ferramenta para evitar escrever muito código repetitivo. Usar Codegen **não é obrigatório**: você pode escrever todo o código gerado manualmente. No entanto, o Codegen gera código de estrutura que pode economizar muito tempo.

O React Native invoca o Codegen automaticamente toda vez que um app iOS ou Android é compilado. Ocasionalmente, você pode querer executar manualmente os scripts do Codegen para saber quais tipos e arquivos são realmente gerados: este é um cenário comum ao desenvolver [Turbo Native Modules](/docs/turbo-native-modules-introduction) e Fabric Native Components.

<!-- TODO: Add links to TM and FC -->

## Como o Codegen Funciona

**Codegen** é um processo fortemente acoplado a um app React Native. Os scripts do Codegen estão dentro do pacote NPM `react-native` e os apps chamam esses scripts em tempo de compilação.

O Codegen percorre as pastas no seu projeto, começando de um diretório que você especifica no seu `package.json`, procurando por arquivos JS específicos que contêm a especificação (ou specs) para seus módulos e componentes customizados. Arquivos de spec são arquivos JS escritos em um dialeto tipado: o React Native atualmente suporta Flow e TypeScript.

Toda vez que o Codegen encontra um arquivo de spec, ele gera código boilerplate associado a ele. O Codegen gera código de ligação em C++ e então gera código específico da plataforma, usando Java para Android e Objective-C++ para iOS.
