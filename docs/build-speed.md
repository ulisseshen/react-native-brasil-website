---
ia-translated: true
id: build-speed
title: Acelerando sua fase de Build
---

Construir seu aplicativo React Native pode ser **caro** e levar vários minutos do tempo dos desenvolvedores.
Isso pode ser problemático à medida que seu projeto cresce e geralmente em organizações maiores com vários desenvolvedores React Native.

Para mitigar esse impacto na performance, esta página compartilha algumas sugestões sobre como **melhorar seu tempo de build**.

:::info

Por favor, note que essas sugestões são recursos avançados que exigem algum conhecimento de como as ferramentas de build nativas funcionam.

:::

## Construir apenas uma ABI durante o desenvolvimento (Somente Android)

Quando você está construindo seu app Android localmente, por padrão você constrói todas as 4 [Application Binary Interfaces (ABIs)](https://developer.android.com/ndk/guides/abis): `armeabi-v7a`, `arm64-v8a`, `x86` & `x86_64`.

No entanto, você provavelmente não precisa construir todas elas se estiver construindo localmente e testando em seu emulador ou em um dispositivo físico.

Isso deve reduzir seu **tempo de build nativo** em aproximadamente 75%.

Se você está usando o React Native CLI, pode adicionar a flag `--active-arch-only` ao comando `run-android`. Esta flag garantirá que a ABI correta seja selecionada do emulador em execução ou do telefone conectado. Para confirmar que essa abordagem está funcionando bem, você verá uma mensagem como `info Detected architectures arm64-v8a` no console.

```
$ yarn react-native run-android --active-arch-only

[ ... ]
info Running jetifier to migrate libraries to AndroidX. You can disable it using "--no-jetifier" flag.
Jetifier found 1037 file(s) to forward-jetify. Using 32 workers...
info JS server already running.
info Detected architectures arm64-v8a
info Installing the app...
```

Este mecanismo depende da propriedade Gradle `reactNativeArchitectures`.

Portanto, se você está construindo diretamente com Gradle a partir da linha de comando e sem o CLI, você pode especificar a ABI que deseja construir da seguinte forma:

```
$ ./gradlew :app:assembleDebug -PreactNativeArchitectures=x86,x86_64
```

Isso pode ser útil se você deseja construir seu app Android em um CI e usar uma matriz para paralelizar o build das diferentes arquiteturas.

Se desejar, você também pode sobrescrever esse valor localmente, usando o arquivo `gradle.properties` que você tem na [pasta de nível superior](https://github.com/facebook/react-native/blob/19cf70266eb8ca151aa0cc46ac4c09cb987b2ceb/template/android/gradle.properties#L30-L33) do seu projeto:

```
# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

Quando você construir uma **versão de release** do seu app, não se esqueça de remover essas flags, pois você quer construir um apk/app bundle que funcione para todas as ABIs e não apenas para a que você está usando em seu fluxo de trabalho de desenvolvimento diário.

## Habilitar Configuration Caching (Somente Android)

Desde o React Native 0.79, você também pode habilitar o Gradle Configuration Caching.

Quando você está executando um build Android com `yarn android`, você estará executando um build Gradle que é composto por duas etapas ([fonte](https://docs.gradle.org/current/userguide/build_lifecycle.html)):

- Fase de configuração, quando todos os arquivos `.gradle` são avaliados.
- Fase de execução, quando as tarefas são realmente executadas, então o código Java/Kotlin é compilado e assim por diante.

Agora você poderá habilitar o Configuration Caching, que permitirá pular a fase de configuração em builds subsequentes.

Isso é benéfico ao fazer alterações frequentes no código nativo, pois melhora os tempos de build.

Por exemplo, aqui você pode ver o quão mais rápido é reconstruir o RN-Tester após uma alteração no código nativo:

![gradle config caching](/docs/assets/gradle-config-caching.gif)

Você pode habilitar o Gradle Configuration Caching adicionando a seguinte linha em seu arquivo `android/gradle.properties`:

```
org.gradle.configuration-cache=true
```

Consulte a [documentação oficial do Gradle](https://docs.gradle.org/current/userguide/configuration_cache.html) para mais recursos sobre Configuration Caching.

## Usando um Maven Mirror (Somente Android)

Ao construir apps Android, seus builds Gradle precisarão baixar as dependências necessárias do Maven Central e outros repositórios da internet.

Se sua organização está executando um espelho de repositório Maven, você deve considerar usá-lo, pois isso acelerará seu build, baixando os artefatos do espelho em vez da internet.

Você pode configurar um espelho especificando a propriedade `exclusiveEnterpriseRepository` em seu arquivo `android/gradle.properties`:

```diff
# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=true

# Use this property to configure a Maven enterprise repository
# that will be used exclusively to fetch all of your dependencies.
+exclusiveEnterpriseRepository=https://my.internal.proxy.net/
```

Ao definir esta propriedade, seu build buscará dependências **exclusivamente** do seu repositório especificado e não de outros.

## Use um cache de compilador

Se você está executando builds nativos frequentes (seja C++ ou Objective-C), pode se beneficiar do uso de um **cache de compilador**.

Especificamente, você pode usar dois tipos de caches: caches de compilador locais e caches de compilador distribuídos.

### Caches locais

:::info
As instruções a seguir funcionarão para **Android e iOS**.
Se você está construindo apenas apps Android, você deve estar pronto para começar.
Se você também está construindo apps iOS, siga as instruções na seção [Configuração Específica do Xcode](#xcode-specific-setup) abaixo.
:::

Sugerimos usar o [**ccache**](https://ccache.dev/) para armazenar em cache a compilação de seus builds nativos.
O Ccache funciona envolvendo os compiladores C++, armazenando os resultados da compilação e pulando a compilação
se um resultado de compilação intermediário foi originalmente armazenado.

O Ccache está disponível no gerenciador de pacotes para a maioria dos sistemas operacionais. No macOS, podemos instalar o ccache com `brew install ccache`.
Ou você pode seguir as [instruções oficiais de instalação](https://github.com/ccache/ccache/blob/master/doc/INSTALL.md) para instalar a partir do código-fonte.

Você pode então fazer dois builds limpos (por exemplo, no Android você pode primeiro executar `yarn react-native run-android`, excluir a pasta `android/app/build` e executar o primeiro comando mais uma vez). Você notará que o segundo build foi muito mais rápido que o primeiro (deve levar segundos em vez de minutos).
Enquanto estiver construindo, você pode verificar se o `ccache` funciona corretamente e verificar a taxa de acertos/erros do cache com `ccache -s`

```
$ ccache -s
Summary:
  Hits:             196 /  3068 (6.39 %)
    Direct:           0 /  3068 (0.00 %)
    Preprocessed:   196 /  3068 (6.39 %)
  Misses:          2872
    Direct:        3068
    Preprocessed:  2872
  Uncacheable:        1
Primary storage:
  Hits:             196 /  6136 (3.19 %)
  Misses:          5940
  Cache size (GB): 0.60 / 20.00 (3.00 %)
```

Note que o `ccache` agrega as estatísticas de todos os builds. Você pode usar `ccache --zero-stats` para redefini-las antes de um build para verificar a taxa de acerto do cache.

Se você precisar limpar seu cache, pode fazer isso com `ccache --clear`

#### Configuração Específica do Xcode

Para garantir que o `ccache` funcione corretamente com iOS e Xcode, você precisa habilitar o suporte do React Native para ccache em `ios/Podfile`.

Abra `ios/Podfile` em seu editor e descomente a linha `ccache_enabled`.

```ruby
  post_install do |installer|
    # https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false,
      # TODO: Uncomment the line below
      :ccache_enabled => true
    )
  end
```

#### Usando esta abordagem em um CI

O Ccache usa a pasta `/Users/$USER/Library/Caches/ccache` no macOS para armazenar o cache.
Portanto, você pode salvar e restaurar a pasta correspondente também no CI para acelerar seus builds.

No entanto, há algumas coisas a serem observadas:

1. No CI, recomendamos fazer um build limpo completo, para evitar problemas de cache envenenado. Se você seguir a abordagem mencionada no parágrafo anterior, você deve ser capaz de paralelizar o build nativo em 4 ABIs diferentes e provavelmente não precisará do `ccache` no CI.

2. O `ccache` depende de timestamps para calcular um acerto de cache. Isso não funciona bem no CI, pois os arquivos são baixados novamente a cada execução do CI. Para superar isso, você precisará usar a opção `compiler_check content` que depende de [fazer hash do conteúdo do arquivo](https://ccache.dev/manual/4.3.html).

### Caches distribuídos

Semelhante aos caches locais, você pode querer considerar o uso de um cache distribuído para seus builds nativos.
Isso pode ser especialmente útil em organizações maiores que estão fazendo builds nativos frequentes.

Recomendamos usar o [sccache](https://github.com/mozilla/sccache) para conseguir isso.
Remetemos ao [guia de início rápido de compilação distribuída](https://github.com/mozilla/sccache/blob/main/docs/DistributedQuickstart.md) do sccache para instruções sobre como configurar e usar esta ferramenta.
