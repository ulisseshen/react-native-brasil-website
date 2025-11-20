# Phase 2 - Step 1: Architecture Documentation

**Target:** 10 files
**Category:** React Native Architecture Deep-Dive
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate the technical architecture documentation that explains React Native's internal workings, Fabric renderer, and threading model.

## Files to Translate (10 files)

### Architecture Documentation
1. `website/architecture/landing-page.md`
2. `website/architecture/architecture-overview.md`
3. `website/architecture/architecture-glossary.md`
4. `website/architecture/fabric-renderer.md`
5. `website/architecture/render-pipeline.md`
6. `website/architecture/threading-model.md`
7. `website/architecture/view-flattening.md`
8. `website/architecture/xplat-implementation.md`
9. `website/architecture/bundled-hermes.md`
10. `website/architecture/_fabric-warning.mdx`

## Translation Instructions

### Architecture-Specific Guidelines

1. **Technical Architecture Terms** - Keep in English:
   - Fabric, JSI (JavaScript Interface), Turbo Modules
   - Bridge (legacy), Yoga (layout engine)
   - Shadow Tree, Host Tree, React Element Tree
   - Mounting, Reconciliation, Commit Phase
   - Thread names: UI Thread, JavaScript Thread, Shadow Thread

2. **Glossary** - Handle carefully:
   - Keep term names in English
   - Translate definitions/explanations
   - Add "(termo técnico)" when helpful for clarity

3. **Diagrams & Code** - Keep unchanged:
   - Any ASCII diagrams
   - Code examples in all languages
   - System architecture diagrams (if text-based)

### Example Pattern for Glossary

```markdown
<!-- English -->
## Fabric
The new rendering system for React Native, replacing the old Bridge architecture.

<!-- Portuguese -->
## Fabric
O novo sistema de renderização do React Native, substituindo a antiga arquitetura Bridge.
```

### Example for Technical Explanations

```markdown
<!-- English -->
The Shadow Tree is a tree of React Shadow Nodes that represents the current state of the UI.

<!-- Portuguese -->
A Shadow Tree é uma árvore de React Shadow Nodes que representa o estado atual da UI.
```

## Architecture Concepts to Translate Carefully

| English Term | Keep/Translate | Portuguese (if applicable) |
|--------------|----------------|----------------------------|
| Fabric | Keep | Fabric |
| JSI | Keep | JSI |
| Bridge | Keep | Bridge |
| Shadow Tree | Keep | Shadow Tree |
| Host Tree | Keep | Host Tree |
| Yoga | Keep | Yoga |
| Reconciliation | Keep | Reconciliation / Reconciliação |
| Mounting | Keep | Mounting / Montagem |
| Threading | Translate context | Threading / Modelo de Threads |
| Renderer | Translate | Renderizador |
| Pipeline | Translate | Pipeline / Fluxo |

## Quality Checklist

- [ ] Architecture terms consistent
- [ ] Technical accuracy maintained
- [ ] Glossary terms properly handled
- [ ] Thread names unchanged
- [ ] System component names in English
- [ ] Explanations clear in PT-BR
- [ ] Code examples unchanged
- [ ] MDX warning file syntax preserved

## Output Location

All translated files should be placed in:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs-architecture/current/
```

## Progress Tracking

- [ ] website/architecture/landing-page.md
- [ ] website/architecture/architecture-overview.md
- [ ] website/architecture/architecture-glossary.md
- [ ] website/architecture/fabric-renderer.md
- [ ] website/architecture/render-pipeline.md
- [ ] website/architecture/threading-model.md
- [ ] website/architecture/view-flattening.md
- [ ] website/architecture/xplat-implementation.md
- [ ] website/architecture/bundled-hermes.md
- [ ] website/architecture/_fabric-warning.mdx

## Testing

After translation:

```bash
# Build with architecture docs
cd website
yarn build --locale pt-BR

# Preview architecture section
yarn start --locale pt-BR
# Navigate to /architecture
```

## Next Step
After completing this step, proceed to **step02.md** (Contributing Documentation - Part 1)
