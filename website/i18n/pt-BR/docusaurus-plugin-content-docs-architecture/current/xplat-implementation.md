---
ia-translated: true
id: xplat-implementation
title: Implementação Cross Platform
---

import FabricWarning from './\_fabric-warning.mdx';

<FabricWarning />

#### O renderizador do React Native utiliza uma implementação de renderização central para ser compartilhada entre plataformas

No sistema de renderização anterior do React Native, a **[React Shadow Tree](architecture-glossary.md#react-shadow-tree-and-react-shadow-node)**, lógica de layout e algoritmo de **[View Flattening](view-flattening.md)** eram implementados uma vez para cada plataforma. O renderizador atual foi projetado para ser uma solução cross-platform compartilhando uma implementação central em C++.

A equipe do React Native pretende incorporar um sistema de animação no sistema de renderização e também estender o sistema de renderização do React Native para novas plataformas como Windows, e sistemas operacionais em consoles de jogos, televisões e muito mais.

Aproveitar C++ para o sistema de renderização central introduz várias vantagens. Uma única implementação reduz o custo de desenvolvimento e manutenção. Ela melhora o desempenho de criação de React Shadow Trees e cálculo de layout porque a sobrecarga de integração de [Yoga](architecture-glossary.md#yoga-tree-and-yoga-node) com o renderizador é minimizada no Android (ou seja, não mais [JNI](architecture-glossary.md#java-native-interface-jni) para Yoga). Finalmente, a pegada de memória de cada React Shadow Node é menor em C++ do que seria se alocada a partir de Kotlin ou Swift.

A equipe também está aproveitando recursos de C++ que impõem imutabilidade para garantir que não haja problemas relacionados ao acesso simultâneo a recursos compartilhados mas não protegidos.

É importante reconhecer que o caso de uso do renderizador para Android ainda incorre no custo de [JNI](architecture-glossary.md#java-native-interface-jni) para dois casos de uso primários:

- Cálculo de layout de views complexas (por exemplo, `Text`, `TextInput`, etc.) requer enviar props através de JNI.
- A fase de mount requer enviar operações de mutação através de JNI.

A equipe está explorando substituir `ReadableMap` por um novo mecanismo para serializar dados usando `ByteBuffer` para reduzir a sobrecarga de JNI. Nosso objetivo é reduzir a sobrecarga de JNI em 35-50%.

O renderizador fornece dois lados de suas APIs C++:

- **(i)** para se comunicar com React
- **(ii)** para se comunicar com a plataforma host

Para **(i)**, React se comunica com o renderizador para **renderizar** uma React Tree e para "escutar" **eventos** (por exemplo, `onLayout`, `onKeyPress`, touch, etc).

Para **(ii)**, o renderizador do React Native se comunica com a plataforma host para montar host views na tela (criar, inserir, atualizar ou deletar host views) e escuta **eventos** que são gerados pelo usuário na plataforma host.

![Cross-platform implementation diagram](/docs/assets/Architecture/xplat-implementation/xplat-implementation-diagram.png)
