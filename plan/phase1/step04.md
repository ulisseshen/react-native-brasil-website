# Phase 1 - Step 4: Core APIs - Part 1

**Target:** 20 files
**Category:** Core React Native APIs
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate documentation for essential React Native APIs that developers use for app functionality.

## Files to Translate (20 files)

### Accessibility & App Info (4 files)
1. `docs/accessibilityinfo.md`
2. `docs/appregistry.md`
3. `docs/appstate.md`
4. `docs/appearance.md`

### User Interaction (4 files)
5. `docs/alert.md`
6. `docs/keyboard.md`
7. `docs/panresponder.md`
8. `docs/share.md`

### Device & System (6 files)
9. `docs/dimensions.md`
10. `docs/pixelratio.md`
11. `docs/platform.md`
12. `docs/platformcolor.md`
13. `docs/vibration.md`
14. `docs/roottag.md`

### Navigation & Linking (2 files)
15. `docs/linking.md`
16. `docs/interactionmanager.md`

### Styling & Animation APIs (4 files)
17. `docs/stylesheet.md`
18. `docs/layoutanimation.md`
19. `docs/easing.md`
20. `docs/transforms.md`

## Translation Instructions

### API Documentation Guidelines

1. **Method Names** - Always keep in English:
   - `Alert.alert()`, `Keyboard.dismiss()`, `Platform.select()`
   - All function/method signatures unchanged

2. **API Parameters** - Keep parameter names:
   - Function parameters: `title`, `message`, `buttons`, `options`
   - Translate parameter descriptions

3. **Return Values** - Keep types in English:
   - `Promise<string>`, `number`, `boolean`, `void`
   - Translate what the return value represents

### Example Pattern

```markdown
<!-- English -->
## Methods

### alert()
Display an alert dialog with a title and message.

```js
Alert.alert(title, message, buttons, options);
```

**Parameters:**
- `title` (string) - The dialog title
- `message` (string) - The message to display

<!-- Portuguese -->
## Métodos

### alert()
Exibe um diálogo de alerta com título e mensagem.

```js
Alert.alert(title, message, buttons, options);
```

**Parâmetros:**
- `title` (string) - O título do diálogo
- `message` (string) - A mensagem a ser exibida
```

## Quality Checklist

- [ ] Method names unchanged (alert(), dismiss(), etc.)
- [ ] Parameter names unchanged
- [ ] Type annotations in English
- [ ] API signatures preserved exactly
- [ ] Descriptions translated clearly
- [ ] Code examples unchanged
- [ ] Platform indicators kept (iOS, Android badges)
- [ ] Consistent API terminology

## Progress Tracking

- [ ] docs/accessibilityinfo.md
- [ ] docs/appregistry.md
- [ ] docs/appstate.md
- [ ] docs/appearance.md
- [ ] docs/alert.md
- [ ] docs/keyboard.md
- [ ] docs/panresponder.md
- [ ] docs/share.md
- [ ] docs/dimensions.md
- [ ] docs/pixelratio.md
- [ ] docs/platform.md
- [ ] docs/platformcolor.md
- [ ] docs/vibration.md
- [ ] docs/roottag.md
- [ ] docs/linking.md
- [ ] docs/interactionmanager.md
- [ ] docs/stylesheet.md
- [ ] docs/layoutanimation.md
- [ ] docs/easing.md
- [ ] docs/transforms.md

## Next Step
After completing this step, proceed to **step05.md** (Core APIs - Part 2 & Hooks)
