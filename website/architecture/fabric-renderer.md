---
ia-translated: true
id: fabric-renderer
title: Fabric
---

Fabric é o novo sistema de renderização do React Native, uma evolução conceitual do sistema de renderização legado. Os princípios fundamentais são unificar mais lógica de renderização em C++, melhorar a interoperabilidade com [plataformas host](architecture-glossary.md#host-platform) e desbloquear novas capacidades para o React Native. O desenvolvimento começou em 2018 e em 2021, o React Native no aplicativo do Facebook é sustentado pelo novo renderizador.

Esta documentação fornece uma visão geral do [novo renderizador](architecture-glossary.md#fabric-render) e seus conceitos. Ela evita especificidades de plataforma e não contém trechos de código ou ponteiros. Esta documentação cobre conceitos-chave, motivação, benefícios e uma visão geral do pipeline de renderização em diferentes cenários.

## Motivações e Benefícios do novo renderizador

A arquitetura de renderização foi criada para desbloquear melhores experiências de usuário que não eram possíveis com a arquitetura legada. Alguns exemplos incluem:

- Com melhor interoperabilidade entre [host views](architecture-glossary.md#host-view-tree-and-host-view) e views React, o renderizador é capaz de medir e renderizar surfaces React sincronamente. Na arquitetura legada, o layout do React Native era assíncrono, o que levava a um problema de "salto" de layout ao incorporar uma view renderizada pelo React Native em uma _host view_.
- Com suporte de eventos multi-prioridade e síncronos, o renderizador pode priorizar certas interações do usuário para garantir que sejam tratadas de maneira oportuna.
- [Integração com React Suspense](https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) que permite design mais intuitivo de busca de dados em aplicativos React.
- Habilitar [Recursos Concorrentes](https://github.com/reactwg/react-18/discussions/4) do React no React Native.
- Mais fácil implementar renderização do lado do servidor para React Native.

A nova arquitetura também fornece benefícios em qualidade de código, desempenho e extensibilidade:

- **Segurança de tipo:** geração de código para garantir segurança de tipo entre o JS e [plataformas host](architecture-glossary.md#host-platform). A geração de código usa declarações de componentes JavaScript como fonte da verdade para gerar structs C++ para armazenar as props. Incompatibilidade entre props de componentes JavaScript e host dispara um erro de compilação.
- **Núcleo C++ compartilhado:** o renderizador é implementado em C++ e o núcleo é compartilhado entre plataformas. Isso aumenta a consistência e facilita a adoção do React Native em novas plataformas.
- **Melhor Interoperabilidade com Plataforma Host:** Cálculo de layout síncrono e thread-safe melhora experiências de usuário ao incorporar componentes host no React Native, o que significa integração mais fácil com frameworks de plataforma host que requerem APIs síncronas.
- **Desempenho Melhorado:** Com a nova implementação cross-platform do sistema de renderização, cada plataforma se beneficia de melhorias de desempenho que podem ter sido motivadas por limitações de uma plataforma. Por exemplo, view flattening foi originalmente uma solução de desempenho para Android e agora é fornecida por padrão tanto no Android quanto no iOS.
- **Consistência:** O novo sistema de renderização é cross-platform, é mais fácil manter consistência entre diferentes plataformas.
- **Inicialização Mais Rápida:** Host components são inicializados preguiçosamente por padrão.
- **Menos serialização de dados entre JS e plataforma host:** React costumava transferir dados entre JavaScript e _plataforma host_ como JSON serializado. O novo renderizador melhora a transferência de dados acessando valores JavaScript diretamente usando [JavaScript Interfaces (JSI)](architecture-glossary.md#javascript-interfaces-jsi).
