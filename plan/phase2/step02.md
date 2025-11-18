# Phase 2 - Step 2: Contributing Documentation - Part 1

**Target:** 8 files
**Category:** How to Contribute to React Native
**Estimated Time:** 2-3 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate contribution guidelines and processes for the React Native repository.

## Files to Translate (8 files)

### Contributing Guides
1. `website/contributing/contributing-overview.md`
2. `website/contributing/contribution-license-agreement.md`
3. `website/contributing/how-to-contribute-code.md`
4. `website/contributing/how-to-open-a-pull-request.md`
5. `website/contributing/how-to-report-a-bug.md`
6. `website/contributing/how-to-build-from-source.md`
7. `website/contributing/how-to-run-and-write-tests.md`
8. `website/contributing/bots-reference.md`

## Translation Instructions

### Contributing Documentation Guidelines

1. **GitHub Terms** - Keep in English:
   - Pull Request (PR), Issue, Fork, Clone
   - Repository, Branch, Commit, Merge
   - GitHub Actions, CI/CD
   - Labels, Milestones, Projects

2. **Git Commands** - Keep unchanged:
   - `git clone`, `git checkout`, `git commit`
   - `git push`, `git pull`, `git rebase`
   - All command-line operations

3. **Legal Terms** - Handle carefully:
   - CLA (Contributor License Agreement)
   - Keep legal document names in English
   - Translate explanations

4. **Bot Names** - Keep unchanged:
   - react-native-bot, Danger Bot
   - CI bot names and commands

### Example Pattern

```markdown
<!-- English -->
## Opening a Pull Request

Before opening a pull request, make sure:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Run tests: `yarn test`

<!-- Portuguese -->
## Abrindo um Pull Request

Antes de abrir um pull request, certifique-se de:
1. Fazer fork do repositório
2. Criar uma nova branch
3. Fazer suas alterações
4. Executar os testes: `yarn test`
```

## GitHub/Git Terminology

| English | Translation Approach |
|---------|---------------------|
| Pull Request | Keep as "Pull Request" (PR) |
| Issue | Keep as "Issue" or "Issue/Problema" |
| Fork | Can use "Fork" or "Fork/Bifurcação" |
| Clone | Keep "Clone/Clonar" |
| Commit | Keep "Commit" |
| Branch | "Branch" or "Branch/Ramificação" |
| Merge | "Merge/Mesclar" |
| Repository | "Repositório" |
| Contributor | "Contribuidor/Contribuidora" |

## Quality Checklist

- [ ] Git commands unchanged
- [ ] GitHub terms consistent
- [ ] Legal documents referenced correctly
- [ ] Bot names unchanged
- [ ] CI/CD terminology consistent
- [ ] Code review process clear
- [ ] Testing commands preserved
- [ ] Links to GitHub intact

## Output Location

All translated files should be placed in:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs-contributing/current/
```

## Progress Tracking

- [ ] website/contributing/contributing-overview.md
- [ ] website/contributing/contribution-license-agreement.md
- [ ] website/contributing/how-to-contribute-code.md
- [ ] website/contributing/how-to-open-a-pull-request.md
- [ ] website/contributing/how-to-report-a-bug.md
- [ ] website/contributing/how-to-build-from-source.md
- [ ] website/contributing/how-to-run-and-write-tests.md
- [ ] website/contributing/bots-reference.md

## Next Step
After completing this step, proceed to **step03.md** (Contributing Documentation - Part 2 & Community)
