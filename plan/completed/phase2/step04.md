# Phase 2 - Step 4: Custom Pages & UI Strings

**Target:** 4+ files
**Category:** React/TypeScript Pages, UI Strings, Configuration
**Estimated Time:** 2-3 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate UI strings in custom React pages and extract/translate Docusaurus UI strings.

## Files to Review & Translate (4+ files)

### Custom React Pages (4 TypeScript files)
1. `website/src/pages/index.tsx` - Homepage
2. `website/src/pages/showcase.tsx` - App Showcase
3. `website/src/pages/versions.tsx` - Version Selector
4. `website/src/pages/releases.tsx` - Release Information

### Additional UI Translation Files
5. **Docusaurus Theme Translations** - Generated file
   - `website/i18n/pt-BR/code.json` - UI strings
   - `website/i18n/pt-BR/docusaurus-theme-classic/navbar.json`
   - `website/i18n/pt-BR/docusaurus-theme-classic/footer.json`

## Translation Instructions

### TypeScript/React Page Guidelines

1. **Component Code** - Keep unchanged:
   - Import statements
   - Component names
   - Function names
   - React hooks (useState, useEffect, etc.)
   - CSS class names

2. **String Literals** - Translate these:
   - UI text visible to users
   - Button labels
   - Headings and descriptions
   - Alt text for images
   - SEO meta descriptions

3. **Hardcoded URLs** - Keep unchanged:
   - External links
   - GitHub links
   - Documentation links

### Example Pattern for TSX Files

```tsx
// English
export default function Home() {
  return (
    <div>
      <h1>Learn once, write anywhere</h1>
      <p>Create native apps for Android, iOS, and more using React</p>
      <Link to="/docs/getting-started">Get Started</Link>
    </div>
  );
}

// Portuguese - Only translate visible strings
export default function Home() {
  return (
    <div>
      <h1>Aprenda uma vez, escreva em qualquer lugar</h1>
      <p>Crie aplicativos nativos para Android, iOS e mais usando React</p>
      <Link to="/docs/getting-started">Começar</Link>
    </div>
  );
}
```

### Docusaurus UI Strings

To generate the translation files, run:

```bash
cd website
yarn write-translations --locale pt-BR
```

This will create JSON files that need translation:

1. **code.json** - General UI strings:
   ```json
   {
     "theme.common.skipToMainContent": {
       "message": "Pular para o conteúdo principal"
     },
     "theme.docs.sidebar.collapseButtonTitle": {
       "message": "Recolher sidebar"
     }
   }
   ```

2. **Navbar/Footer** - Navigation translations:
   - Menu items
   - Footer links
   - Button labels

## Common UI Strings to Translate

| English | Portuguese (PT-BR) |
|---------|-------------------|
| Get Started | Começar |
| Learn More | Saiba Mais |
| Documentation | Documentação |
| Tutorial | Tutorial |
| Blog | Blog |
| GitHub | GitHub |
| Community | Comunidade |
| Showcase | Showcase / Galeria |
| Try it out | Experimente |
| See all versions | Ver todas as versões |
| Latest version | Última versão |
| Next | Próximo |
| Previous | Anterior |
| Edit this page | Editar esta página |
| Search | Buscar |

## Quality Checklist

- [ ] React component code unchanged
- [ ] Import statements preserved
- [ ] Function/variable names in English
- [ ] UI strings translated to PT-BR
- [ ] Links and URLs unchanged
- [ ] CSS classes unchanged
- [ ] JSON translation files properly formatted
- [ ] Navigation consistent with docs

## Step-by-Step Process

### 1. Generate Translation Files
```bash
cd website
yarn write-translations --locale pt-BR
```

### 2. Translate Custom Pages

For each `.tsx` file:
- Read the file
- Identify user-facing strings
- Translate only the visible text
- Keep all code structure

### 3. Translate UI JSON Files

Edit the generated JSON files:
- `website/i18n/pt-BR/code.json`
- `website/i18n/pt-BR/docusaurus-theme-classic/*.json`

### 4. Update Configuration

Update `website/docusaurus.config.ts`:

```typescript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'pt-BR'],
  localeConfigs: {
    'pt-BR': {
      label: 'Português (Brasil)',
      direction: 'ltr',
      htmlLang: 'pt-BR',
    },
  },
},
```

## Testing

After translation:

```bash
# Build both locales
cd website
yarn build

# Test Portuguese site
yarn start --locale pt-BR

# Visit pages:
# - Homepage: http://localhost:3000/pt-BR/
# - Showcase: http://localhost:3000/pt-BR/showcase
# - Versions: http://localhost:3000/pt-BR/versions
```

## Output Locations

### Custom pages translations:
Since these are TSX files, translations will be in:
```
website/i18n/pt-BR/docusaurus-plugin-content-pages/
```

Or strings can be extracted to the main translation JSON files.

### UI strings:
```
website/i18n/pt-BR/code.json
website/i18n/pt-BR/docusaurus-theme-classic/
```

## Progress Tracking

### Custom Pages
- [ ] website/src/pages/index.tsx
- [ ] website/src/pages/showcase.tsx
- [ ] website/src/pages/versions.tsx
- [ ] website/src/pages/releases.tsx

### UI Translation Files
- [ ] Generate translation files (`yarn write-translations`)
- [ ] Translate code.json
- [ ] Translate navbar.json
- [ ] Translate footer.json
- [ ] Update docusaurus.config.ts i18n section

### Testing
- [ ] Homepage renders correctly in PT-BR
- [ ] Navigation works in Portuguese
- [ ] All UI strings translated
- [ ] Language selector working
- [ ] No console errors

## Phase 2 Completion

After completing this step:

✅ **Phase 2 Complete!** All supplementary documentation translated.

### Phase 2 Summary:
- **Files Translated**: 34 files
- **Categories Covered**:
  - Architecture Documentation (10 files)
  - Contributing Guidelines (16 files)
  - Community Resources (4 files)
  - Custom Pages & UI (4+ files)

### Next Steps:
1. Full site build and test
2. Review all translated content
3. **Optional**: Proceed to **Phase 3** (Blog Posts)

Congratulations on completing Phase 2! 🎉
