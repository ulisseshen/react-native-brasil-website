---
ia-translated: true
id: threading-model
title: Threading Model
---

import FabricWarning from './\_fabric-warning.mdx';

<FabricWarning />

#### O renderizador do React Native distribui o trabalho do [pipeline de renderização](render-pipeline) através de múltiplas threads.

Aqui definimos o threading model e fornecemos alguns exemplos para ilustrar o uso de threads do pipeline de renderização.

O renderizador do React Native é projetado para ser thread safe. Em alto nível, thread safety é garantida usando estruturas de dados imutáveis nos componentes internos do framework (imposta pelo recurso de "const correctness" do C++). Isso significa que toda atualização no React cria ou clona novos objetos no renderizador ao invés de atualizar estruturas de dados. Isso permite que o framework exponha APIs thread safe e síncronas ao React.

O renderizador usa duas threads diferentes:

- **UI thread** (frequentemente chamada de main): A única thread que pode manipular host views.
- **JavaScript thread**: É aqui que a fase de renderização do React, assim como layout, são executados.

Vamos revisar os cenários suportados de execução para cada fase:

<figure>
  <img src="/docs/assets/Architecture/threading-model/symbols.png" alt="Threading model symbols" />
</figure>

## Cenários de Renderização

### Render em uma JS Thread

Este é o cenário mais comum onde a maior parte do pipeline de renderização acontece na JavaScript thread.

<figure>
	<img src="/docs/assets/Architecture/threading-model/case-1.jpg" alt="Threading model use case one" />
</figure>

---

### Render na UI Thread

Quando há um evento de alta prioridade na UI Thread, o renderizador é capaz de executar todo o pipeline de renderização sincronamente na UI thread.

<figure>
	<img src="/docs/assets/Architecture/threading-model/case-2.jpg" alt="Threading model use case two" />
</figure>

---

### Interrupção de evento padrão ou contínuo

Este cenário mostra a interrupção da fase de renderização por um evento de baixa prioridade na UI thread. React e o renderizador do React Native são capazes de interromper a fase de renderização e mesclar seu estado com um evento de baixa prioridade que é executado na UI thread. Neste caso, o processo de renderização continua executando na JS thread.

<figure>
	<img src="/docs/assets/Architecture/threading-model/case-3.jpg" alt="Threading model use case three" />
</figure>

---

### Interrupção de evento discreto

A fase de renderização é interrompível. Este cenário mostra a interrupção da fase de renderização por um evento de alta prioridade na UI thread. React e o renderizador são capazes de interromper a fase de renderização e mesclar seu estado com um evento de alta prioridade que foi executado na UI thread. A fase de renderização executa sincronamente na UI thread.

<figure>
	<img src="/docs/assets/Architecture/threading-model/case-4.jpg" alt="Threading model use case four" />
</figure>

---

### Atualização de C++ State

Atualização originando na UI thread e pula a fase de renderização. Veja [React Native Renderer State Updates](render-pipeline#react-native-renderer-state-updates) para mais detalhes.

<figure>
	<img src="/docs/assets/Architecture/threading-model/case-6.jpg" alt="Threading model use case six" />
</figure>
