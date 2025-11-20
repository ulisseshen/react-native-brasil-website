# React Native Documentation - PT-BR Translation Plan

This directory contains the complete translation plan for converting the React Native documentation from English to Brazilian Portuguese (PT-BR).

## 📋 Overview

- **Total Files to Translate**: 363 essential files (1,504 including versioned docs)
- **Translator Agent**: `.claude/agents/translator.md`
- **Translation Phases**: 3 phases
- **Total Steps**: 22 steps

## 🎯 Translation Phases

### Phase 1: Main Documentation (Priority: HIGH)
**Files**: 240 files
**Steps**: 12 steps
**Location**: `/docs/`

Main React Native documentation including:
- Getting Started guides
- Core Components & APIs
- Global Web APIs
- Platform-specific guides
- New Architecture (Turbo Modules & Fabric)
- Legacy Architecture
- Performance & Debugging
- Development Workflow

**Steps**:
1. [Getting Started & Basics](phase1/step01.md) - 20 files
2. [Core Components - Part 1](phase1/step02.md) - 20 files
3. [Platform Components & Style Props](phase1/step03.md) - 20 files
4. [Core APIs - Part 1](phase1/step04.md) - 20 files
5. [Animation APIs, Hooks & Platform-Specific APIs](phase1/step05.md) - 20 files
6. [Global APIs - Part 1 (Web Standards)](phase1/step06.md) - 20 files
7. [Global APIs - Part 2 (Performance & Observer)](phase1/step07.md) - 17 files
8. [Remaining Globals, Debugging & Testing](phase1/step08.md) - 20 files
9. [Workflow, Development & Performance](phase1/step09.md) - 20 files
10. [Platform Guides & Release Documentation](phase1/step10.md) - 20 files
11. [New Architecture - Turbo Modules & Fabric](phase1/step11.md) - 20 files
12. [Legacy Architecture & Remaining Files](phase1/step12.md) - 23 files

### Phase 2: Supplementary Documentation (Priority: MEDIUM)
**Files**: 34 files
**Steps**: 4 steps
**Locations**: `/website/architecture/`, `/website/contributing/`, `/website/community/`, `/website/src/pages/`

Includes:
- Architecture deep-dive documentation
- Contributing guidelines
- Community resources
- Custom pages & UI strings

**Steps**:
1. [Architecture Documentation](phase2/step01.md) - 10 files
2. [Contributing Documentation - Part 1](phase2/step02.md) - 8 files
3. [Contributing Part 2 & Community Documentation](phase2/step03.md) - 12 files
4. [Custom Pages & UI Strings](phase2/step04.md) - 4+ files

### Phase 3: Blog Posts (Priority: OPTIONAL)
**Files**: 89 files
**Steps**: 6 steps
**Location**: `/website/blog/`

Historical blog posts from 2015-2025:
- Release announcements
- Technical articles
- Community highlights
- Conference recaps

**Steps**:
1. [Blog Posts 2015-2017](phase3/step01.md) - ~15 files
2. [Blog Posts 2017-2018](phase3/step02.md) - ~15 files
3. [Blog Posts 2019-2020](phase3/step03.md) - ~15 files
4. [Blog Posts 2021-2022](phase3/step04.md) - ~15 files
5. [Blog Posts 2023-2024](phase3/step05.md) - ~15 files
6. [Blog Posts 2025 & Remaining](phase3/step06.md) - ~14 files

## 🤖 Translator Agent

All translations should reference the translator agent:

**Location**: `.claude/agents/translator.md`

The agent provides:
- Comprehensive translation guidelines
- Technical terminology reference
- Brazilian Portuguese style guide
- Code preservation rules
- Quality checklist
- Common translations dictionary

### Using the Translator Agent

When translating files, use the Task tool or prompt:

```
Using the translator agent at .claude/agents/translator.md, translate the file [path] to Brazilian Portuguese (PT-BR). Follow all guidelines for technical terms, code preservation, and natural Portuguese phrasing.
```

## 📁 Project Structure

```
plan/
├── README.md                          # This file
├── count-files-type.md               # Detailed file count analysis
├── phase1/                            # Main documentation (240 files)
│   ├── step01.md ... step12.md
├── phase2/                            # Supplementary docs (34 files)
│   ├── step01.md ... step04.md
└── phase3/                            # Blog posts (89 files)
    ├── step01.md ... step06.md

.claude/
└── agents/
    └── translator.md                  # Translation agent configuration
```

## 🚀 Getting Started

### Prerequisites

1. Read the translator agent: `.claude/agents/translator.md`
2. Review the file count analysis: `plan/count-files-type.md`
3. Set up Docusaurus i18n (see Phase 2 - Step 4)

### Recommended Workflow

#### 1. Start with Phase 1 - Step 1

```bash
# Read the step plan
cat plan/phase1/step01.md

# Translate the first batch (20 files)
# Use the translator agent for each file
```

#### 2. Follow Each Step Sequentially

Each step file contains:
- ✅ Objective and scope
- 📝 Files to translate
- 📖 Specific translation guidelines
- ✔️ Quality checklist
- 📍 Progress tracking

#### 3. Mark Progress

Each step file has checkboxes. Mark files as you complete them:
```markdown
- [x] docs/getting-started.md
- [ ] docs/introduction.md
```

#### 4. Test After Each Step

```bash
cd website
yarn build --locale pt-BR
yarn start --locale pt-BR
```

## 📊 Progress Tracking

### Overall Progress

| Phase | Total Files | Status | Completion |
|-------|-------------|--------|------------|
| Phase 1 | 240 | ⬜ Not Started | 0% |
| Phase 2 | 34 | ⬜ Not Started | 0% |
| Phase 3 | 89 | ⬜ Not Started | 0% |
| **Total** | **363** | ⬜ **0%** | **0/363** |

Update this as you progress!

### Step-by-Step Progress

Check individual step files for detailed checklists.

## 🔧 Configuration Setup

Before starting translation, set up Docusaurus i18n:

### 1. Update `website/docusaurus.config.ts`

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

### 2. Generate Translation Files

```bash
cd website
yarn write-translations --locale pt-BR
```

This creates:
```
website/i18n/pt-BR/
├── code.json
├── docusaurus-plugin-content-docs/
├── docusaurus-plugin-content-docs-architecture/
├── docusaurus-plugin-content-docs-contributing/
├── docusaurus-plugin-content-docs-community/
├── docusaurus-plugin-content-blog/
└── docusaurus-theme-classic/
```

### 3. Create Translation Directory Structure

```bash
mkdir -p website/i18n/pt-BR/docusaurus-plugin-content-docs/current
mkdir -p website/i18n/pt-BR/docusaurus-plugin-content-docs-architecture/current
mkdir -p website/i18n/pt-BR/docusaurus-plugin-content-docs-contributing/current
mkdir -p website/i18n/pt-BR/docusaurus-plugin-content-docs-community/current
mkdir -p website/i18n/pt-BR/docusaurus-plugin-content-blog
```

## ✅ Quality Assurance

### Per-File Checklist

Before marking a file as complete:
- [ ] All prose text translated to PT-BR
- [ ] Technical terms kept in English (as per translator agent)
- [ ] Code blocks unchanged (except comments)
- [ ] Links working and unchanged
- [ ] Markdown syntax preserved
- [ ] Frontmatter properly handled
- [ ] No grammar or spelling errors
- [ ] Natural-sounding Brazilian Portuguese
- [ ] Consistent terminology

### Per-Step Checklist

After completing each step:
- [ ] All files in step translated
- [ ] Build test passes (`yarn build --locale pt-BR`)
- [ ] Preview looks correct (`yarn start --locale pt-BR`)
- [ ] Terminology consistent across all files in step
- [ ] Cross-references working

### Per-Phase Checklist

After completing each phase:
- [ ] Full build test (both locales)
- [ ] Link validation
- [ ] Terminology consistency review
- [ ] Community review (optional but recommended)

## 🧪 Testing

### Build Test
```bash
cd website
yarn build
# Should build both en and pt-BR without errors
```

### Development Server
```bash
yarn start --locale pt-BR
# Preview at http://localhost:3000/pt-BR/
```

### Link Checking
```bash
yarn lint:markdown:links
```

### Full Site Preview
```bash
yarn build
yarn serve
# Test both languages thoroughly
```

## 📚 Reference Documents

1. **File Count Analysis**: `plan/count-files-type.md`
   - Complete file inventory
   - Categorization by type
   - Translation priorities

2. **Translator Agent**: `.claude/agents/translator.md`
   - Translation guidelines
   - Style guide
   - Technical terminology
   - Quality standards

3. **Docusaurus i18n Guide**: https://docusaurus.io/docs/i18n/introduction

## 🎯 Success Criteria

### Phase 1 Complete
- ✅ All 240 main documentation files translated
- ✅ Build passes without errors
- ✅ All links working
- ✅ Terminology consistent
- ✅ Natural Portuguese prose

### Phase 2 Complete
- ✅ All 34 supplementary files translated
- ✅ UI strings translated
- ✅ Custom pages working
- ✅ Full site navigation functional

### Phase 3 Complete
- ✅ All 89 blog posts translated
- ✅ Blog index working
- ✅ Tags functional
- ✅ Historical accuracy maintained

### Project Complete 🎉
- ✅ All 363 files translated
- ✅ Full site builds successfully
- ✅ Both locales fully functional
- ✅ Community reviewed
- ✅ Ready for production deployment

## 🤝 Contributing

If multiple people are translating:

1. **Claim a step**: Comment on the issue/PR which step you're working on
2. **Follow the plan**: Use the step guides religiously
3. **Use the agent**: Always reference `.claude/agents/translator.md`
4. **Maintain consistency**: Review previous translations for terminology
5. **Test your work**: Build and preview before submitting
6. **Coordinate**: Use a shared terminology glossary

## 📝 Notes

- **Versioned Docs**: Not included in this plan (1,141 files)
  - Focus on current version first
  - Versioned docs are historical snapshots
  - Can be auto-generated from current when needed

- **Maintenance**: After initial translation:
  - Monitor English docs for updates
  - Translate new content as it's added
  - Keep translations in sync with English

- **Community Input**:
  - Share preview with Brazilian React Native community
  - Gather feedback on translations
  - Iterate based on native speaker suggestions

## 🔗 Resources

- [React Native Docs](https://reactnative.dev)
- [Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction)
- [Brazilian Portuguese Style Guide](https://www.gov.br/governodigital/pt-br/acessibilidade-digital/guia-de-redacao-digital)

---

**Ready to start?** Begin with [Phase 1 - Step 1](phase1/step01.md)!

**Questions?** Review the [Translator Agent](.claude/agents/translator.md) for guidance.

**Good luck with the translation!** 🇧🇷 🚀
