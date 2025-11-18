# Phase 1 - Step 1: Getting Started & Basics

**Target:** 20 files
**Category:** Getting Started, Introduction, Environment Setup
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate the foundational documentation that helps developers get started with React Native. These are the most critical files for new users.

## Files to Translate (20 files)

### Getting Started (5 files)
1. `docs/getting-started.md`
2. `docs/introduction.md`
3. `docs/set-up-your-environment.md`
4. `docs/environment-setup.md`
5. `docs/troubleshooting.md`

### React Basics (4 files)
6. `docs/intro-react-native-components.md`
7. `docs/intro-react.md`
8. `docs/handling-text-input.md`
9. `docs/state.md`

### Core Concepts (5 files)
10. `docs/using-a-scrollview.md`
11. `docs/using-a-listview.md`
12. `docs/platform-specific-code.md`
13. `docs/more-resources.md`
14. `docs/tutorial.md`

### Partial/Include Files (6 files)
15. `docs/_getting-started-linux-android.md`
16. `docs/_getting-started-macos-android.md`
17. `docs/_getting-started-macos-ios.md`
18. `docs/_getting-started-windows-android.md`
19. `docs/_remove-global-cli.md`
20. `docs/props.md`

## Translation Instructions

### Using the Translator Agent

For each file, use the following approach:

```bash
# Example command to translate a file
claude task translate --agent=.claude/agents/translator.md \
  --input=docs/getting-started.md \
  --output=website/i18n/pt-BR/docusaurus-plugin-content-docs/current/getting-started.md
```

Or use the Task tool with this prompt:
```
Using the translator agent at .claude/agents/translator.md, translate the file docs/getting-started.md to Brazilian Portuguese (PT-BR). Follow all guidelines for technical terms, code preservation, and natural Portuguese phrasing.
```

### Special Considerations for This Step

1. **Getting Started files** - These are the MOST important files:
   - Ensure the tone is welcoming and encouraging
   - Keep installation commands exactly as-is
   - Translate UI instructions clearly

2. **Environment Setup files** - Highly technical:
   - Keep all commands, paths, and tool names in English
   - Translate explanatory text only
   - Be extra careful with platform-specific instructions

3. **Partial files (starting with `_`)** - These are included in other docs:
   - Maintain exact same structure
   - These will be embedded in other pages
   - Consistency is critical

## Quality Checklist

After translating all 20 files:

- [ ] All file names remain unchanged (only content translated)
- [ ] All code blocks preserved exactly
- [ ] Commands and CLI syntax unchanged
- [ ] Internal links working (../other-doc.md format)
- [ ] Frontmatter properly handled (id unchanged, title translated)
- [ ] Technical terms kept in English (React Native, npm, etc.)
- [ ] Natural Brazilian Portuguese prose
- [ ] Consistent terminology across all 20 files
- [ ] No spelling or grammar errors
- [ ] Special characters properly encoded (UTF-8)

## Testing

After translation:

```bash
# Build the docs to verify no errors
cd website
yarn build --locale pt-BR

# Start dev server to preview
yarn start --locale pt-BR
```

## Output Location

All translated files should be placed in:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs/current/
```

Maintaining the same directory structure as the source.

## Progress Tracking

- [ ] docs/getting-started.md
- [ ] docs/introduction.md
- [ ] docs/set-up-your-environment.md
- [ ] docs/environment-setup.md
- [ ] docs/troubleshooting.md
- [ ] docs/intro-react-native-components.md
- [ ] docs/intro-react.md
- [ ] docs/handling-text-input.md
- [ ] docs/state.md
- [ ] docs/using-a-scrollview.md
- [ ] docs/using-a-listview.md
- [ ] docs/platform-specific-code.md
- [ ] docs/more-resources.md
- [ ] docs/tutorial.md
- [ ] docs/_getting-started-linux-android.md
- [ ] docs/_getting-started-macos-android.md
- [ ] docs/_getting-started-macos-ios.md
- [ ] docs/_getting-started-windows-android.md
- [ ] docs/_remove-global-cli.md
- [ ] docs/props.md

## Next Step
After completing this step, proceed to **step02.md** (Core Components - Part 1)
