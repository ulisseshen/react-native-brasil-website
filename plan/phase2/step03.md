# Phase 2 - Step 3: Contributing Part 2 & Community Documentation

**Target:** 12 files
**Category:** Contribution processes, Community resources
**Estimated Time:** 2-3 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Complete contributing documentation translation and translate community resources.

## Files to Translate (12 files)

### Contributing - Maintenance & Process (8 files)
1. `website/contributing/changelogs-in-pull-requests.md`
2. `website/contributing/triaging-github-issues.md`
3. `website/contributing/labeling-github-issues.md`
4. `website/contributing/managing-pull-requests.md`
5. `website/contributing/_markdown-GH-release-notes-prerelease.mdx`
6. `website/contributing/_markdown-async-testing-note.mdx`
7. `website/contributing/_markdown-older-bump-script.mdx`
8. `website/contributing/_markdown-road-to-release-template.mdx`

### Community Documentation (4 files)
9. `website/community/overview.md`
10. `website/community/communities.md`
11. `website/community/staying-updated.md`
12. `website/community/support.md`

## Translation Instructions

### Issue Triage & Management Guidelines

1. **Issue Labels** - Keep label names in English:
   - Examples: `bug`, `feature request`, `help wanted`
   - Labels are system identifiers in GitHub
   - Translate descriptions of what labels mean

2. **Triage Process** - Translate clearly:
   - Explain processes in natural Portuguese
   - Keep workflow terminology clear

3. **Changelog Format** - Keep syntax:
   - Changelog categories: `[General]`, `[iOS]`, `[Android]`
   - Change types: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`
   - These follow "Keep a Changelog" standard

### Community Documentation Guidelines

1. **Community Platforms** - Keep platform names:
   - Discord, Stack Overflow, Twitter/X, Reddit
   - GitHub Discussions
   - Reactiflux

2. **Social Media** - Keep handles:
   - @reactnative, #ReactNative
   - Usernames and hashtags unchanged

3. **Event Names** - Keep official names:
   - React Conf, Chain React
   - Local meetup names can be translated if applicable

### Example for Changelog

```markdown
<!-- English -->
### Changelog Format

```
[Category] [Type] - Description
[iOS] [Fixed] - Fix crash on startup
```

<!-- Portuguese -->
### Formato do Changelog

```
[Category] [Type] - Descrição
[iOS] [Fixed] - Corrigir crash na inicialização
```
```

## Quality Checklist

- [ ] GitHub label names unchanged
- [ ] Changelog format preserved
- [ ] Community platform names correct
- [ ] Social media handles unchanged
- [ ] Event names appropriate
- [ ] Triage process clear
- [ ] MDX partial files syntax intact
- [ ] Support channels well explained

## Output Locations

### Contributing files:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs-contributing/current/
```

### Community files:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs-community/current/
```

## Progress Tracking

### Contributing
- [ ] website/contributing/changelogs-in-pull-requests.md
- [ ] website/contributing/triaging-github-issues.md
- [ ] website/contributing/labeling-github-issues.md
- [ ] website/contributing/managing-pull-requests.md
- [ ] website/contributing/_markdown-GH-release-notes-prerelease.mdx
- [ ] website/contributing/_markdown-async-testing-note.mdx
- [ ] website/contributing/_markdown-older-bump-script.mdx
- [ ] website/contributing/_markdown-road-to-release-template.mdx

### Community
- [ ] website/community/overview.md
- [ ] website/community/communities.md
- [ ] website/community/staying-updated.md
- [ ] website/community/support.md

## Next Step
After completing this step, proceed to **step04.md** (Custom Pages & UI Strings)
