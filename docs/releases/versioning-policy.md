---
ia-translated: true
title: Política de Versionamento
---

Esta página descreve a política de versionamento que seguimos para o pacote `react-native`.

Testamos cada versão do React Native minuciosamente, tanto com testes manuais quanto automatizados, para garantir que a qualidade não regrida.

O canal `stable` do React Native segue a política de release 0.x.y descrita abaixo.

React Native também oferece um canal de release `nightly` para encorajar feedback antecipado sobre recursos experimentais.

Esta página descreve nossa abordagem para números de versão para `react-native` e para pacotes sob o escopo `@react-native`.

## Versões de Release Estável

React Native lança versões estáveis em uma cadência regular.

Seguimos o esquema de versionamento 0.x.y:

- Breaking changes serão lançadas em uma nova versão menor, ou seja, incrementamos o número x (por exemplo: 0.78.0 para 0.79.0).
- Novos recursos e APIs também serão lançados em uma nova versão menor, ou seja, incrementamos o número x (por exemplo: 0.78.0 para 0.79.0).
- Correções de bugs críticos serão lançadas em uma nova versão de patch, ou seja, incrementamos o número y (por exemplo: 0.78.1 para 0.78.2).

Releases estáveis são lançados regularmente, com o mais recente marcado como `latest` no NPM.

Uma série de releases sob o mesmo número menor é chamada de **série menor** (minor series) (por exemplo, 0.76.x é a série menor para 0.76.0, 0.76.1, 0.76.2, etc.).

Você pode ler mais sobre nosso **compromisso com a estabilidade** na [página de releases](./).

### Breaking changes

Breaking changes são inconvenientes para todos, e estamos tentando minimizá-las ao mínimo possível. Todas as breaking changes que lançamos em cada release estável serão destacadas em:

- A seção _Breaking_ e _Removed_ do [React Native Changelog](https://github.com/facebook/react-native/blob/main/CHANGELOG.md)
- Cada blogpost de release na seção _Breaking Changes_

Para cada breaking change, estamos comprometidos em explicar o raciocínio por trás dela, fornecer uma API de substituição se possível, e minimizar o impacto nos usuários finais.

### O que é uma breaking change?

Consideramos uma breaking change para React Native:

- Uma mudança incompatível de API (ou seja, uma API que é alterada ou removida de forma que seu código não compilará/executará mais devido a essa mudança). Exemplos:
  - Mudanças de quaisquer APIs JS/Java/Kotlin/Obj-c/C++ que exigiriam que seu código fosse alterado para compilar.
  - Mudanças dentro de `@react-native/codegen` que não são retrocompatíveis.
- Uma mudança significativa de comportamento/runtime. Exemplo:
  - A lógica de layout de uma prop é alterada drasticamente.
- Uma mudança significativa na experiência de desenvolvimento. Exemplo:
  - Um recurso de debugging é completamente removido.
- Um bump maior de qualquer uma de nossas dependências transitivas. Exemplos:
  - Fazer bump do React de 18.x para 19.x
  - Fazer bump do Target SDK no Android de 34 para 35).
- Uma redução de qualquer uma de nossas versões de plataforma suportadas. Exemplos:
  - Fazer bump do min SDK no Android de 21 para 23
  - Fazer bump da versão mínima do iOS para 15.1.

Não consideramos essas mudanças como breaking:

- Modificar APIs que começam com prefixo `unstable_`: Essas APIs expõem recursos experimentais, e não estamos confiantes em sua forma final. Ao lançar essas com um prefixo `unstable_`, podemos iterar mais rápido e chegar a uma API estável mais cedo.
- Mudanças em APIs privadas ou internas: Essas APIs são frequentemente prefixadas com `internal_`, `private_` ou vivem dentro de uma pasta/pacote `internal/` ou `private/`. Embora algumas dessas APIs possam ter visibilidade pública devido a restrições de ferramentas, não as consideramos parte de nossa API pública, então as alteraremos sem aviso prévio.
  - Da mesma forma, se você acessar nomes de propriedades internas como `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` ou `__reactInternalInstance$uk43rzhitjg`, não há garantias. Você está por sua conta.
  - Classes anotadas com `@FrameworkAPI` também são consideradas internas
- Mudanças em APIs de ferramentas/desenvolvimento: Algumas APIs públicas do React Native são reservadas para integração com frameworks e outras ferramentas. Por exemplo, algumas das APIs do Metro ou APIs do React Native DevTools devem ser usadas apenas por outros frameworks ou ferramentas. Mudanças nessas APIs são discutidas diretamente com as ferramentas afetadas e não são consideradas breaking changes (não as comunicaremos amplamente nos blogposts de release).
- Avisos de desenvolvimento: Como avisos não afetam o comportamento de runtime, podemos adicionar novos avisos ou modificar avisos existentes entre quaisquer versões.

Se esperamos que uma mudança cause problemas amplos na comunidade, ainda faremos o nosso melhor para fornecer um caminho de migração gradual para o ecossistema.

### Ciclos de Deprecação

À medida que continuamos desenvolvendo e evoluindo o React Native, escrevemos novas APIs e às vezes precisamos depreciar APIs existentes. Essas APIs passarão por um ciclo de deprecação.

Uma vez que uma API é depreciada, ela permanecerá disponível **também** para os **próximos** releases estáveis.

Por exemplo: se uma API é depreciada no React Native 0.76.x, ela ainda estará disponível em 0.77.x e não será removida antes do React Native 0.78.x.

Às vezes decidimos manter uma API depreciada por mais tempo, se sentimos que o ecossistema precisa de mais tempo para migrar dela. Para essas APIs, geralmente fornecemos avisos para ajudar os usuários a migrarem delas.

## Canais de release

React Native depende de uma próspera comunidade open source para registrar relatórios de bugs, abrir pull requests e enviar RFCs. Para encorajar feedback, suportamos vários canais de release.

:::note
Esta seção será mais relevante para desenvolvedores que trabalham em frameworks, bibliotecas ou ferramentas de desenvolvedor. Desenvolvedores que usam React Native principalmente para construir aplicativos voltados ao usuário não devem precisar se preocupar com canais de release além de latest.
:::

### latest

`latest` é para releases estáveis e semver do React Native. É o que você obtém quando instala React Native do npm. Este é o canal que você já está usando hoje. Aplicativos voltados ao usuário que consomem React Native diretamente usam este canal.

Publicamos uma nova série menor do React Native regularmente, e atualizamos a tag `latest` para refletir a versão estável mais recente.

### next

Antes de declararmos um novo release do React Native estável, publicamos uma série de **release candidate**, começando do RC0. Essas versões são versões de pré-lançamento (seguindo o esquema de versionamento `0.79.0-rc.0`) e são marcadas como `next` no NPM.

Quando um novo branch cut acontece e os RCs começam a ser publicados no NPM e GitHub, é uma boa ideia testar sua biblioteca/framework contra uma versão `next` do React Native.

Isso garantirá que seu projeto continuará funcionando bem com as próximas versões do React Native.

No entanto, não use prereleases/RCs em aplicativos voltados ao usuário diretamente, pois eles não são considerados prontos para produção.

### nightly

Também publicamos um canal de release `nightly`. Nightlies são publicados todos os dias a partir do branch `main` de [facebook/react-native](https://github.com/facebook/react-native). Nightlies são considerados versões instáveis do React Native e não são recomendados para uso em produção.

Nightlies seguem o esquema de versionamento como `0.80.0-nightly-<DATE>-<SHA>` onde `<DATE>` é a data do nightly e `<SHA>` é o SHA do commit que foi usado para publicar este nightly.

Os releases nightly são fornecidos apenas para fins de teste, e não fornecemos garantias de que o comportamento não mudará entre nightlies. Eles não seguem o protocolo semver que usamos para releases de latest/next.

É uma boa ideia configurar um workflow de CI para testar sua biblioteca contra uma versão react-native@nightly todos os dias, para garantir que sua biblioteca continuará funcionando com releases futuros.
