---
title: Changelogs em Pull Requests
ia-translated: true
---

A entrada de changelog em seu pull request serve como uma espécie de "resumo" das suas alterações: elas afetam o Android? são mudanças que quebram compatibilidade? algo novo está sendo adicionado?

Fornecer um changelog usando um formato padronizado ajuda os coordenadores de release a escrever as notas de versão. Por favor, inclua um changelog como parte da descrição do seu pull request. A descrição do seu pull request será usada como mensagem de commit caso o pull request seja mesclado.

### Formato

Uma entrada de changelog tem o seguinte formato

```
## Changelog:

[Category] [Type] - Message
```

O campo "Category" pode ser um dos seguintes:

- **Android**, para mudanças que afetam o Android.
- **iOS**, para mudanças que afetam o iOS.
- **General**, para mudanças que não se encaixam em nenhuma das outras categorias.
- **Internal**, para mudanças que não seriam relevantes para desenvolvedores consumindo as notas de versão.

O campo "Type" pode ser um dos seguintes:

- **Breaking**, para mudanças que quebram compatibilidade.
- **Added**, para novos recursos.
- **Changed**, para mudanças em funcionalidades existentes.
- **Deprecated**, para recursos que serão removidos em breve.
- **Removed**, para recursos agora removidos.
- **Fixed**, para quaisquer correções de bugs.
- **Security**, em caso de vulnerabilidades.

Por fim, o campo "Message" pode responder "o quê e por quê" em nível de funcionalidade. Use isso para informar brevemente aos usuários do React Native sobre mudanças notáveis.

Para mais detalhes, veja [How do I make a good changelog?](https://keepachangelog.com/en/1.0.0/#how) e [Why keep a changelog?](https://keepachangelog.com/en/1.0.0/#why)

### Exemplos

- `[General] [Added] - Add snapToOffsets prop to ScrollView component`
- `[General] [Fixed] - Fix various issues in snapToInterval on ScrollView component`
- `[iOS] [Fixed] - Fix crash in RCTImagePicker`

### FAQ

#### E se meu pull request contém mudanças tanto para Android quanto para JavaScript?

Use a categoria Android.

#### E se meu pull request contém mudanças tanto para Android quanto para iOS?

Use a categoria General se a mudança for feita em um único pull request.

#### E se meu pull request contém mudanças para Android, iOS e JavaScript?

Use a categoria General se a mudança for feita em um único pull request.

#### E se...?

Qualquer entrada de changelog é melhor do que nenhuma. Se você não tem certeza se escolheu a categoria correta, use o campo "message" para descrever sucintamente sua mudança.

Essas entradas são usadas pelo script [`@rnx-kit/rn-changelog-generator`](https://github.com/microsoft/rnx-kit/tree/main/incubator/rn-changelog-generator) para construir um rascunho inicial, que é então editado por um coordenador de release.

Suas anotações serão usadas para adicionar sua mudança à localização correta nas notas de versão finais.
