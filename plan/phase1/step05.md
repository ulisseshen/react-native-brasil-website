# Phase 1 - Step 5: Animation APIs, Hooks & Platform-Specific APIs

**Target:** 20 files
**Category:** Animation, Hooks, Platform-Specific APIs
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate advanced animation APIs, React hooks, and platform-specific APIs.

## Files to Translate (20 files)

### Animation APIs (4 files)
1. `docs/animated.md`
2. `docs/animatedvalue.md`
3. `docs/animatedvaluexy.md`
4. `docs/animations.md`

### React Hooks (2 files)
5. `docs/usecolorscheme.md`
6. `docs/usewindowdimensions.md`

### Android-Specific APIs (5 files)
7. `docs/backhandler.md`
8. `docs/permissionsandroid.md`
9. `docs/toastandroid.md`
10. `docs/headless-js-android.md`
11. `docs/communication-android.md`

### iOS-Specific APIs (5 files)
12. `docs/actionsheetios.md`
13. `docs/dynamiccolorios.md`
14. `docs/settings.md`
15. `docs/communication-ios.md`
16. `docs/app-extensions.md`

### Development & Debugging (4 files)
17. `docs/devsettings.md`
18. `docs/systrace.md`
19. `docs/i18nmanager.md`
20. `docs/document-nodes.md`

## Translation Instructions

### Animation-Specific Guidelines

1. **Animated API Methods** - Keep in English:
   - `Animated.timing()`, `Animated.spring()`, `Animated.sequence()`
   - `interpolate()`, `setValue()`, `addListener()`

2. **Easing Functions** - Keep names:
   - `Easing.linear`, `Easing.ease`, `Easing.bezier()`

3. **Animation Values** - Keep property names:
   - `toValue`, `duration`, `delay`, `useNativeDriver`

### Platform-Specific Guidelines

1. **Native Modules** - Keep module names:
   - `PermissionsAndroid`, `ToastAndroid`, `ActionSheetIOS`

2. **Platform Constants** - Keep as-is:
   - `Platform.OS`, `Platform.Version`
   - Platform values: `'ios'`, `'android'`, `'web'`

3. **Permission Strings** - Keep unchanged:
   - `PERMISSIONS.CAMERA`, `'android.permission.CAMERA'`

## Quality Checklist

- [ ] Animation method names unchanged
- [ ] Hook names unchanged (useColorScheme, etc.)
- [ ] Platform module names unchanged
- [ ] Permission strings unchanged
- [ ] Native method calls preserved
- [ ] Platform indicators correct
- [ ] Code examples working
- [ ] Consistent platform terminology

## Progress Tracking

- [ ] docs/animated.md
- [ ] docs/animatedvalue.md
- [ ] docs/animatedvaluexy.md
- [ ] docs/animations.md
- [ ] docs/usecolorscheme.md
- [ ] docs/usewindowdimensions.md
- [ ] docs/backhandler.md
- [ ] docs/permissionsandroid.md
- [ ] docs/toastandroid.md
- [ ] docs/headless-js-android.md
- [ ] docs/communication-android.md
- [ ] docs/actionsheetios.md
- [ ] docs/dynamiccolorios.md
- [ ] docs/settings.md
- [ ] docs/communication-ios.md
- [ ] docs/app-extensions.md
- [ ] docs/devsettings.md
- [ ] docs/systrace.md
- [ ] docs/i18nmanager.md
- [ ] docs/document-nodes.md

## Next Step
After completing this step, proceed to **step06.md** (Global APIs - Part 1)
