# Phase 1 - Step 9: Workflow, Development & Performance

**Target:** 20 files
**Category:** Development workflow, Performance optimization, JavaScript runtime
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate documentation for development workflow, performance optimization, and JavaScript environment.

## Files to Translate (20 files)

### Development Workflow (8 files)
1. `docs/running-on-device.md`
2. `docs/fast-refresh.md`
3. `docs/metro.md`
4. `docs/libraries.md`
5. `docs/typescript.md`
6. `docs/strict-typescript-api.md`
7. `docs/upgrading.md`
8. `docs/integration-with-existing-apps.md`

### Platform Integration (3 files)
9. `docs/integration-with-android-fragment.md`
10. `docs/_integration-with-existing-apps-ios.md`
11. `docs/_integration-with-existing-apps-kotlin.md`

### Performance (5 files)
12. `docs/performance.md`
13. `docs/build-speed.md`
14. `docs/optimizing-flatlist-configuration.md`
15. `docs/optimizing-javascript-loading.md`
16. `docs/profiling.md`

### JavaScript Runtime (3 files)
17. `docs/javascript-environment.md`
18. `docs/timers.md`
19. `docs/hermes.md`

### Network & Security (1 file)
20. `docs/network.md`

## Translation Instructions

### Development Workflow Guidelines

1. **CLI Commands** - Keep unchanged:
   - `npx react-native run-android`
   - `yarn start`, `npm install`
   - All command-line instructions

2. **Configuration Files** - Keep names:
   - `package.json`, `tsconfig.json`, `metro.config.js`
   - File paths and imports

3. **Tool Names** - Keep in English:
   - Metro Bundler, TypeScript, Hermes
   - Fast Refresh, Hot Reloading

### Performance Guidelines

1. **Performance Metrics** - Keep technical terms:
   - FPS, TTI, bundle size, RAM usage
   - Profiling terms in English

2. **Optimization Techniques** - Translate explanations:
   - Keep code unchanged
   - Translate best practices clearly

### Example Pattern

```markdown
<!-- English -->
## Fast Refresh
Fast Refresh is a feature that allows you to see changes instantly.

To enable it, run:
```bash
npm start
```

<!-- Portuguese -->
## Fast Refresh
Fast Refresh é um recurso que permite ver mudanças instantaneamente.

Para habilitar, execute:
```bash
npm start
```
```

## Quality Checklist

- [ ] CLI commands unchanged
- [ ] File names/paths preserved
- [ ] Tool names in English
- [ ] Configuration examples intact
- [ ] Performance metrics consistent
- [ ] Best practices well explained
- [ ] TypeScript types unchanged
- [ ] Hermes documentation accurate

## Progress Tracking

- [ ] docs/running-on-device.md
- [ ] docs/fast-refresh.md
- [ ] docs/metro.md
- [ ] docs/libraries.md
- [ ] docs/typescript.md
- [ ] docs/strict-typescript-api.md
- [ ] docs/upgrading.md
- [ ] docs/integration-with-existing-apps.md
- [ ] docs/integration-with-android-fragment.md
- [ ] docs/_integration-with-existing-apps-ios.md
- [ ] docs/_integration-with-existing-apps-kotlin.md
- [ ] docs/performance.md
- [ ] docs/build-speed.md
- [ ] docs/optimizing-flatlist-configuration.md
- [ ] docs/optimizing-javascript-loading.md
- [ ] docs/profiling.md
- [ ] docs/javascript-environment.md
- [ ] docs/timers.md
- [ ] docs/hermes.md
- [ ] docs/network.md

## Next Step
After completing this step, proceed to **step10.md** (Platform Guides & Releases)
