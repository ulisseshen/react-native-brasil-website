<!-- ia-translated: true -->

# Fase 2 - Passo 3: Contribuição Parte 2 & Documentação da Comunidade

**Meta:** 12 arquivos
**Categoria:** Processos de contribuição, Recursos da comunidade
**Tempo Estimado:** 2-3 horas
**Agente:** `.claude/agents/translator.md`

## Objetivo
Completar a tradução da documentação de contribuição e traduzir recursos da comunidade.

## Arquivos para Traduzir (12 arquivos)

### Contribuição - Manutenção & Processo (8 arquivos)
1. `website/contributing/changelogs-in-pull-requests.md`
2. `website/contributing/triaging-github-issues.md`
3. `website/contributing/labeling-github-issues.md`
4. `website/contributing/managing-pull-requests.md`
5. `website/contributing/_markdown-GH-release-notes-prerelease.mdx`
6. `website/contributing/_markdown-async-testing-note.mdx`
7. `website/contributing/_markdown-older-bump-script.mdx`
8. `website/contributing/_markdown-road-to-release-template.mdx`

### Documentação da Comunidade (4 arquivos)
9. `website/community/overview.md`
10. `website/community/communities.md`
11. `website/community/staying-updated.md`
12. `website/community/support.md`

## Instruções de Tradução

### CRÍTICO: Requisitos Obrigatórios

1. **Metadados de Tradução** - DEVE adicionar a TODOS os arquivos:
   ```markdown
   <!-- ia-translated: true -->
   ```
   - Para arquivos .md sem frontmatter: adicionar como primeira linha
   - Para arquivos com frontmatter YAML: adicionar `ia-translated: true` dentro do frontmatter
   - Para arquivos .mdx: seguir as mesmas regras dos arquivos .md

2. **Validação de Links** - DEVE validar após a tradução:
   - Sem chaves de referência vazias: `[text][]` está ERRADO
   - Todas as chaves de referência em inglês: `[texto][reference-in-english]`
   - Todos os IDs de âncora em inglês: `{:#anchor-in-english}`
   - Executar comandos de validação antes da conclusão

### Diretrizes Específicas do GitHub

1. **Labels de Issues** - Manter nomes de labels em inglês:
   ```markdown
   ✅ CORRETO: A label `bug` indica...
   ❌ ERRADO: A label `erro` indica...
   ```
   - Labels são identificadores do sistema GitHub
   - Exemplos: `bug`, `feature request`, `help wanted`, `good first issue`
   - Traduzir descrições explicando o que as labels significam
   - Manter formatação de labels: crases ao redor dos nomes de labels

2. **Terminologia do GitHub** - Manter em inglês:
   - Issue, Pull Request, PR, Commit, Repository, Fork, Clone
   - Merge, Rebase, Squash, Cherry-pick
   - Review, Approve, Request Changes
   - Milestone, Project, Discussion
   - Traduzir explicações: "um Pull Request é..."

3. **Termos do Processo de Triage** - Manter termos do fluxo de trabalho:
   - Triage, Assignee, Reviewer, Maintainer, Contributor
   - Termos de status: Open, Closed, Merged, Draft
   - Traduzir descrições de processo naturalmente

### Diretrizes de Changelog

1. **Categorias de Changelog** - Manter em inglês:
   - `[General]`, `[iOS]`, `[Android]`
   - `[JavaScript]`, `[TypeScript]`
   - São categorias de changelog padronizadas

2. **Tipos de Mudanças** - Manter em inglês:
   - `[Added]`, `[Changed]`, `[Deprecated]`, `[Removed]`, `[Fixed]`, `[Security]`
   - Seguir padrão "Keep a Changelog"
   - São indicadores de versionamento semântico

3. **Descrições de Changelog** - Traduzir para PT-BR:
   ```markdown
   ✅ CORRETO:
   [iOS] [Fixed] - Corrigir crash ao inicializar

   ❌ ERRADO:
   [iOS] [Corrigido] - Corrigir crash ao inicializar
   ```

### Diretrizes de Documentação da Comunidade

1. **Plataformas da Comunidade** - Manter nomes de plataformas em inglês:
   - Discord, Stack Overflow, Twitter/X, Reddit, GitHub Discussions
   - Reactiflux, DEV Community
   - Traduzir explicações: "o Discord é..."

2. **Redes Sociais** - Manter handles e hashtags:
   - @reactnative, @reactjs, #ReactNative, #ReactJS
   - Nomes de usuários inalterados
   - URLs inalteradas

3. **Nomes de Eventos** - Manter nomes oficiais:
   - React Conf, Chain React, React Native EU
   - App.js Conf, React Advanced
   - Nomes de meetups locais: traduzir se aplicável

4. **Canais de Suporte** - Traduzir descrições:
   ```markdown
   Inglês: For bug reports, open an issue on GitHub

   ✅ CORRETO:
   Para relatórios de bugs, abra uma issue no GitHub

   Nota: "issue" permanece em inglês, contexto em PT-BR
   ```

### Diretrizes Específicas de MDX

Quatro arquivos são parciais .mdx (incluídos em outros documentos):

1. **Preservar Componentes MDX**:
   ```mdx
   ✅ Manter como está:
   import Component from '@site/src/components/Component';

   <Component prop="value" />
   ```

2. **Preservar Sintaxe JSX**:
   - Manter todas as expressões `{variable}` inalteradas
   - Manter nomes de componentes e props em inglês
   - Traduzir apenas conteúdo de texto dentro de componentes

3. **Comportamento de Arquivos Parciais**:
   - Esses arquivos são incluídos via `import` ou `<MDXInclude>`
   - Devem manter a mesma estrutura da fonte
   - Qualquer sintaxe markdown deve permanecer válida

### Exemplos de Tradução

#### Exemplo 1: Rotulagem de Issues

```markdown
<!-- Inglês -->
## Labeling Issues

Use the `bug` label for confirmed bugs and `feature request` for new features.

<!-- Português -->
## Rotulando Issues

Use a label `bug` para bugs confirmados e `feature request` para novos recursos.
```

#### Exemplo 2: Formato de Changelog

```markdown
<!-- Inglês -->
### Changelog Entry Format

```
[Category] [Type] - Description of change
[iOS] [Fixed] - Fix crash on app startup
[Android] [Added] - Add new permission handling
```

<!-- Português -->
### Formato de Entrada do Changelog

```
[Category] [Type] - Descrição da mudança
[iOS] [Fixed] - Corrigir crash na inicialização do app
[Android] [Added] - Adicionar novo tratamento de permissões
```

Nota: Categorias e tipos permanecem em inglês!
```

#### Exemplo 3: Plataforma da Comunidade

```markdown
<!-- Inglês -->
Join our Discord server to chat with other React Native developers.

<!-- Português -->
Entre no nosso servidor Discord para conversar com outros desenvolvedores React Native.
```

#### Exemplo 4: Processo de Pull Request

```markdown
<!-- Inglês -->
After creating a pull request, wait for a maintainer to review it.

<!-- Português -->
Após criar um pull request, aguarde um maintainer revisá-lo.
```

### Preservação de Blocos de Código

Manter TODOS os blocos de código inalterados:

```markdown
✅ CORRETO: Manter código como está
```bash
git commit -m "Fix: resolve issue #123"
```

❌ ERRADO: Nunca traduzir código
```bash
git commit -m "Corrigir: resolver issue #123"
```
```

## Checklist de Qualidade

### Validações Obrigatórias (DEVEM PASSAR):
- [ ] Metadados `ia-translated: true` adicionados a TODOS os arquivos
- [ ] Sem chaves de referência vazias: `[text][]`
- [ ] Todas as chaves de referência em inglês
- [ ] Todos os IDs de âncora em inglês: `{:#english-anchor}`
- [ ] Todos os links validados e funcionais

### Preservação de Conteúdo:
- [ ] Nomes de labels do GitHub inalterados (em crases)
- [ ] Categorias de changelog em inglês: `[iOS]`, `[Android]`, `[General]`
- [ ] Tipos de changelog em inglês: `[Fixed]`, `[Added]`, etc.
- [ ] Nomes de plataformas da comunidade corretos
- [ ] Handles de redes sociais inalterados
- [ ] Nomes de eventos apropriados
- [ ] Terminologia do GitHub em inglês
- [ ] Sintaxe de componentes MDX intacta (para arquivos .mdx)
- [ ] Expressões JSX preservadas (para arquivos .mdx)
- [ ] Blocos de código completamente inalterados

### Qualidade da Tradução:
- [ ] Processos de triage claramente explicados em PT-BR
- [ ] Canais de suporte bem explicados
- [ ] Prosa em português natural e fluente
- [ ] Precisão técnica mantida
- [ ] Terminologia consistente em todo o documento

## Comandos de Validação

Execute essas verificações antes de marcar os arquivos como completos:

```bash
# Verificar chaves de referência vazias
grep -E "\[.*\]\[\]" filename.md

# Verificar chaves de referência traduzidas (não deve retornar nada)
grep -E "^\[[^]]*[áéíóúãõçÁÉÍÓÚÃÕÇ][^]]*\]:" filename.md

# Verificar IDs de âncora traduzidos (não deve retornar nada)
grep -E "\{:#[^}]*[áéíóúãõçÁÉÍÓÚÃÕÇ][^}]*\}" filename.md

# Verificar presença de metadados
grep -E "(^ia-translated: true|<!-- ia-translated: true -->)" filename.md
```

## Locais de Saída

### Arquivos de contribuição:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs-contributing/current/
```

Arquivos serão colocados na mesma estrutura:
- `changelogs-in-pull-requests.md` → `current/changelogs-in-pull-requests.md`
- `triaging-github-issues.md` → `current/triaging-github-issues.md`
- `_markdown-*.mdx` → `current/_markdown-*.mdx` (manter prefixo underscore)

### Arquivos da comunidade:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs-community/current/
```

Arquivos serão colocados na mesma estrutura:
- `overview.md` → `current/overview.md`
- `communities.md` → `current/communities.md`
- etc.

## Acompanhamento de Progresso

### Contribuição (8 arquivos)
- [ ] website/contributing/changelogs-in-pull-requests.md
- [ ] website/contributing/triaging-github-issues.md
- [ ] website/contributing/labeling-github-issues.md
- [ ] website/contributing/managing-pull-requests.md
- [ ] website/contributing/_markdown-GH-release-notes-prerelease.mdx
- [ ] website/contributing/_markdown-async-testing-note.mdx
- [ ] website/contributing/_markdown-older-bump-script.mdx
- [ ] website/contributing/_markdown-road-to-release-template.mdx

### Comunidade (4 arquivos)
- [ ] website/community/overview.md
- [ ] website/community/communities.md
- [ ] website/community/staying-updated.md
- [ ] website/community/support.md

## Armadilhas Comuns a Evitar

1. **Não traduza elementos da UI do GitHub**:
   - Manter: "Issues", "Pull Requests", "Discussions"
   - Explicar em PT-BR: "as Issues permitem..."

2. **Não traduza sintaxe de changelog**:
   - Categorias como `[iOS]` são padronizadas
   - Tipos como `[Fixed]` seguem versionamento semântico

3. **Não traduza handles de redes sociais**:
   - @reactnative permanece como está
   - #ReactNative permanece como está

4. **Não traduza imports/componentes MDX**:
   - Nomes de componentes permanecem em inglês
   - Apenas traduzir conteúdo de texto

5. **Não esqueça os metadados**:
   - Cada arquivo precisa de `ia-translated: true`
   - Isso é rastreado para cobertura de tradução

## Critérios de Sucesso

Um arquivo está completo quando:
1. ✅ Metadados adicionados
2. ✅ Todas as validações passam
3. ✅ Termos do GitHub preservados corretamente
4. ✅ Formato de changelog mantido
5. ✅ Plataformas da comunidade nomeadas corretamente
6. ✅ Explicações em PT-BR naturais
7. ✅ Sintaxe MDX intacta (se aplicável)
8. ✅ Arquivo colocado no local de saída correto

## Próximo Passo
Após completar este passo, prossiga para **step04.md** (Páginas Personalizadas & Strings de UI)
