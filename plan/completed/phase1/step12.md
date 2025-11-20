# Phase 1 - Step 12: Legacy Architecture & Remaining Files

**Target:** 23 files
**Category:** Legacy Bridge API, Partial files, Miscellaneous documentation
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Complete Phase 1 by translating the Legacy Architecture documentation, MDX warning files, JSX components, and any remaining miscellaneous files.

## Files to Translate (23 files)

### Legacy Native Modules (5 files)
1. `docs/legacy/native-modules-intro.md`
2. `docs/legacy/native-modules-android.md`
3. `docs/legacy/native-modules-ios.md`
4. `docs/legacy/native-modules-setup.md`
5. `docs/legacy/local-library-setup.md`

### Legacy Native Components (3 files)
6. `docs/legacy/native-components-android.md`
7. `docs/legacy/native-components-ios.md`
8. `docs/legacy/direct-manipulation.md`

### MDX Warning/Admonition Files (5 files)
9. `docs/_canary-channel-api-warning.mdx`
10. `docs/_experimental-api-warning.mdx`
11. `docs/_experimental-channel-api-warning.mdx`
12. `docs/_markdown-new-architecture-warning.mdx`
13. `docs/the-new-architecture/_markdown_native_deprecation.mdx`

### JSX Component Files (2 files)
14. `docs/_fabric-native-components.jsx`
15. `docs/_turbo-native-modules-components.jsx`

### Remaining Documentation (8 files)
16. `docs/appendix.md`
17. `docs/security.md`
18. `docs/text-nodes.md`
19. `docs/virtualview.md`
20. `docs/improvingux.md`
21. `docs/pushnotificationios.md`
22. `docs/segmentedcontrolios.md`
23. `docs/statusbarios.md`

## Translation Instructions

### Legacy Architecture Guidelines

1. **Legacy Terms** - Make clear it's deprecated:
   - Add note: "Esta é documentação do Bridge legado. Para novos projetos, use a New Architecture."
   - Keep technical terms: Bridge, Native Modules, Native Components

2. **Migration Notes** - Add helpful context:
   - Reference New Architecture documentation
   - Note this is maintained for existing projects

### MDX Files Guidelines

1. **MDX Components** - Handle carefully:
   - These are React components embedded in markdown
   - Translate the text content
   - Keep JSX syntax unchanged
   - Keep component names in English

2. **Warning Messages** - Clear translation:
   - Warning/admonition text must be clear
   - Keep severity indicators (warning, caution, note)

### Example MDX Translation

```mdx
<!-- English -->
:::warning Experimental
This API is experimental and may change in future releases.
:::

<!-- Portuguese -->
:::warning Experimental
Esta API é experimental e pode mudar em versões futuras.
:::
```

### JSX Files Guidelines

1. **React Components** - Special handling:
   - These are `.jsx` files with React components
   - Keep component logic unchanged
   - Translate text strings and descriptions
   - Keep import statements unchanged

2. **Props & Interfaces** - Keep in English:
   - Component prop names
   - Function names
   - Variable names

## Quality Checklist

- [ ] Legacy documentation marked as deprecated
- [ ] Migration notes to New Architecture added
- [ ] MDX syntax preserved
- [ ] JSX components functioning correctly
- [ ] Warning messages clear in PT-BR
- [ ] React component code unchanged
- [ ] Text strings in JSX translated
- [ ] All imports/exports intact

## Progress Tracking

### Legacy Architecture
- [ ] docs/legacy/native-modules-intro.md
- [ ] docs/legacy/native-modules-android.md
- [ ] docs/legacy/native-modules-ios.md
- [ ] docs/legacy/native-modules-setup.md
- [ ] docs/legacy/local-library-setup.md
- [ ] docs/legacy/native-components-android.md
- [ ] docs/legacy/native-components-ios.md
- [ ] docs/legacy/direct-manipulation.md

### MDX Files
- [ ] docs/_canary-channel-api-warning.mdx
- [ ] docs/_experimental-api-warning.mdx
- [ ] docs/_experimental-channel-api-warning.mdx
- [ ] docs/_markdown-new-architecture-warning.mdx
- [ ] docs/the-new-architecture/_markdown_native_deprecation.mdx

### JSX Files
- [ ] docs/_fabric-native-components.jsx
- [ ] docs/_turbo-native-modules-components.jsx

### Remaining Files
- [ ] docs/appendix.md
- [ ] docs/security.md
- [ ] docs/text-nodes.md
- [ ] docs/virtualview.md
- [ ] docs/improvingux.md
- [ ] docs/pushnotificationios.md
- [ ] docs/segmentedcontrolios.md
- [ ] docs/statusbarios.md

## Phase 1 Completion

After completing this step:

✅ **Phase 1 Complete!** All 240 main documentation files translated.

### Next Steps:
1. Run full build test: `cd website && yarn build --locale pt-BR`
2. Review translations for consistency
3. Check all internal links are working
4. Proceed to **Phase 2** (Architecture, Contributing, Community docs)

### Phase 1 Summary:
- **Files Translated**: 240
- **Categories Covered**:
  - Getting Started & Basics
  - Core Components & APIs
  - Global Web APIs
  - Platform-Specific Guides
  - New Architecture
  - Legacy Architecture
  - Performance & Debugging
  - Development Workflow

Congratulations on completing Phase 1! 🎉
