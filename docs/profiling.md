---
ia-translated: true
id: profiling
title: Profiling
---

Profiling é o processo de analisar o desempenho, uso de recursos e comportamento de um aplicativo para identificar possíveis gargalos ou ineficiências. Vale a pena fazer uso de ferramentas de profiling para garantir que seu aplicativo funcione suavemente em diferentes dispositivos e condições.

Para iOS, Instruments é uma ferramenta inestimável, e no Android você deve aprender a usar o [Android Studio Profiler](profiling.md#profiling-android-ui-performance-with-system-tracing).

Mas primeiro, [**certifique-se de que o Development Mode está DESLIGADO!**](performance.md#running-in-development-mode-devtrue).

## Profiling de Desempenho de UI Android com System Tracing

Android suporta mais de 10 mil telefones diferentes e é generalizado para suportar renderização de software: a arquitetura do framework e a necessidade de generalizar em muitos alvos de hardware infelizmente significa que você recebe menos de graça em relação ao iOS. Mas às vezes, há coisas que você pode melhorar -- e muitas vezes não é culpa do código nativo!

O primeiro passo para depurar esse jank é responder à questão fundamental de onde seu tempo está sendo gasto durante cada frame de 16ms. Para isso, usaremos o [profiler System Tracing integrado no Android Studio](https://developer.android.com/studio/profile).

### 1. Coletando um trace

Primeiro, conecte um dispositivo que exiba o stuttering que você quer investigar ao seu computador via USB. Abra a pasta `android` do seu projeto no Android Studio, selecione seu dispositivo no painel superior direito e [execute seu projeto como profileable](https://developer.android.com/studio/profile#build-and-run).

Quando seu aplicativo estiver construído como profileable e estiver rodando no dispositivo, coloque seu aplicativo no ponto logo antes da navegação/animação que você quer fazer profile e inicie a tarefa ["Capture System Activities"](https://developer.android.com/studio/profile#start-profiling) no painel Android Studio Profiler.

Assim que o trace começar a coletar, execute a animação ou interação que você se importa. Em seguida, pressione "Stop recording". Agora você pode [inspecionar o trace diretamente no Android Studio](https://developer.android.com/studio/profile/jank-detection). Alternativamente, você pode selecioná-lo no painel "Past Recordings", pressionar "Export recording" e abri-lo em uma ferramenta como [Perfetto](https://perfetto.dev/).

### 2. Lendo o trace

Depois de abrir o trace no Android Studio ou Perfetto, você deve ver algo assim:

![Example](/docs/assets/SystraceExample.png)

:::note Dica
Use as teclas WASD para deslocar e dar zoom.
:::

A UI exata pode ser diferente, mas as instruções abaixo se aplicarão independentemente da ferramenta que você estiver usando.

:::info Habilite o realce de VSync
Marque esta caixa de seleção no canto superior direito da tela para realçar os limites de frame de 16ms:

![Enable VSync Highlighting](/docs/assets/SystraceHighlightVSync.png)

Você deve ver listras zebradas como na captura de tela acima. Se não ver, tente fazer profiling em um dispositivo diferente: Samsung é conhecida por ter problemas ao exibir vsyncs, enquanto a série Nexus é geralmente bastante confiável.
:::

### 3. Encontre seu processo

Role até ver (parte do) nome do seu pacote. Neste caso, eu estava fazendo profiling de `com.facebook.adsmanager`, que aparece como `book.adsmanager` por causa de limites bobos de nome de thread no kernel.

No lado esquerdo, você verá um conjunto de threads que correspondem às linhas da timeline à direita. Há algumas threads com as quais nos importamos para nossos propósitos: a thread UI (que tem o nome do seu pacote ou o nome UI Thread), `mqt_js`, e `mqt_native_modules`. Se você está executando no Android 5+, também nos importamos com a Render Thread.

- **UI Thread.** É aqui que a medida/layout/desenho padrão do Android acontece. O nome da thread à direita será o nome do seu pacote (no meu caso book.adsmanager) ou UI Thread. Os eventos que você vê nesta thread devem se parecer com isso e ter a ver com `Choreographer`, `traversals` e `DispatchUI`:

  ![UI Thread Example](/docs/assets/SystraceUIThreadExample.png)

- **JS Thread.** É aqui que JavaScript é executado. O nome da thread será `mqt_js` ou `<...>` dependendo de quão cooperativo o kernel do seu dispositivo está sendo. Para identificá-la se não tiver um nome, procure por coisas como `JSCall`, `Bridge.executeJSCall`, etc:

  ![JS Thread Example](/docs/assets/SystraceJSThreadExample.png)

- **Native Modules Thread.** É aqui que chamadas de native modules (por exemplo, o `UIManager`) são executadas. O nome da thread será `mqt_native_modules` ou `<...>`. Para identificá-la no último caso, procure por coisas como `NativeCall`, `callJavaModuleMethod` e `onBatchComplete`:

  ![Native Modules Thread Example](/docs/assets/SystraceNativeModulesThreadExample.png)

- **Bônus: Render Thread.** Se você está usando Android L (5.0) e acima, você também terá uma render thread em seu aplicativo. Esta thread gera os comandos OpenGL reais usados para desenhar sua UI. O nome da thread será `RenderThread` ou `<...>`. Para identificá-la no último caso, procure por coisas como `DrawFrame` e `queueBuffer`:

  ![Render Thread Example](/docs/assets/SystraceRenderThreadExample.png)

## Identificando um culpado

Uma animação suave deve se parecer com o seguinte:

![Smooth Animation](/docs/assets/SystraceWellBehaved.png)

Cada mudança de cor é um frame -- lembre-se de que para exibir um frame, todo o nosso trabalho de UI precisa ser feito até o final desse período de 16ms. Observe que nenhuma thread está trabalhando perto do limite do frame. Um aplicativo renderizando assim está renderizando a 60 FPS.

Se você notou engasgos, no entanto, você pode ver algo assim:

![Choppy Animation from JS](/docs/assets/SystraceBadJS.png)

Observe que a thread JS está executando quase o tempo todo, e através dos limites de frame! Este aplicativo não está renderizando a 60 FPS. Neste caso, **o problema está no JS**.

Você também pode ver algo assim:

![Choppy Animation from UI](/docs/assets/SystraceBadUI.png)

Neste caso, as threads UI e render são as que têm trabalho atravessando os limites de frame. A UI que estamos tentando renderizar em cada frame está exigindo muito trabalho a ser feito. Neste caso, **o problema está nas views nativas sendo renderizadas**.

Neste ponto, você terá algumas informações muito úteis para informar seus próximos passos.

## Resolvendo problemas de JavaScript

Se você identificou um problema JS, procure pistas no JavaScript específico que você está executando. No cenário acima, vemos `RCTEventEmitter` sendo chamado várias vezes por frame. Aqui está um zoom na thread JS do trace acima:

![Too much JS](/docs/assets/SystraceBadJS2.png)

Isso não parece certo. Por que está sendo chamado com tanta frequência? São realmente eventos diferentes? As respostas para essas perguntas provavelmente dependerão do código do seu produto. E muitas vezes, você vai querer olhar para [shouldComponentUpdate](https://react.dev/reference/react/Component#shouldcomponentupdate).

## Resolvendo problemas de UI nativa

Se você identificou um problema de UI nativa, geralmente há dois cenários:

1. a UI que você está tentando desenhar em cada frame envolve muito trabalho na GPU, ou
2. Você está construindo nova UI durante a animação/interação (por exemplo, carregando novo conteúdo durante uma rolagem).

### Muito trabalho na GPU

No primeiro cenário, você verá um trace que tem a thread UI e/ou Render Thread parecendo assim:

![Overloaded GPU](/docs/assets/SystraceBadUI.png)

Observe a longa quantidade de tempo gasto em `DrawFrame` que atravessa os limites de frame. Este é o tempo gasto esperando a GPU drenar seu buffer de comando do frame anterior.

Para mitigar isso, você deve:

- investigar o uso de `renderToHardwareTextureAndroid` para conteúdo complexo e estático que está sendo animado/transformado (por exemplo, as animações de deslize/alfa do `Navigator`)
- certifique-se de que você **não** está usando `needsOffscreenAlphaCompositing`, que é desabilitado por padrão, pois aumenta muito a carga por frame na GPU na maioria dos casos.

### Criando novas views na thread UI

No segundo cenário, você verá algo mais parecido com isso:

![Creating Views](/docs/assets/SystraceBadCreateUI.png)

Observe que primeiro a thread JS pensa um pouco, depois você vê algum trabalho feito na thread de native modules, seguido por uma travessia cara na thread UI.

Não há uma maneira rápida de mitigar isso, a menos que você seja capaz de adiar a criação de nova UI até depois da interação, ou você seja capaz de simplificar a UI que está criando. A equipe do react native está trabalhando em uma solução de nível de infraestrutura para isso que permitirá que nova UI seja criada e configurada fora da thread principal, permitindo que a interação continue suavemente.

### Encontrando hotspots de CPU nativa

Se o problema parecer estar no lado nativo, você pode usar o [profiler de hotspot de CPU](https://developer.android.com/studio/profile/record-java-kotlin-methods) para obter mais detalhes sobre o que está acontecendo. Abra o painel Android Studio Profiler e selecione "Find CPU Hotspots (Java/Kotlin Method Recording)".

:::info Escolha a gravação Java/Kotlin

Certifique-se de selecionar "Find CPU Hotspots **(Java/Kotlin Recording)**" em vez de "Find CPU Hotspots (Callstack Sample)". Eles têm ícones semelhantes, mas fazem coisas diferentes.
:::

Execute as interações e pressione "Stop recording". A gravação consome muitos recursos, então mantenha a interação curta. Você pode então inspecionar o trace resultante no Android Studio ou exportá-lo e abri-lo em uma ferramenta online como [Firefox Profiler](https://profiler.firefox.com/).

Ao contrário do System Trace, o profiling de hotspot de CPU é lento, então não lhe dará medições precisas. No entanto, deve dar uma ideia de quais métodos nativos estão sendo chamados e onde o tempo está sendo gasto proporcionalmente durante cada frame.
