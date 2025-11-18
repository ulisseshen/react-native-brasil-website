# Phase 1 - Step 2: Core Components - Part 1

**Target:** 20 files
**Category:** Core UI Components
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate documentation for the most commonly used React Native core components. These are essential for building UIs.

## Files to Translate (20 files)

### Layout Components (6 files)
1. `docs/components-and-apis.md`
2. `docs/view.md`
3. `docs/scrollview.md`
4. `docs/flatlist.md`
5. `docs/sectionlist.md`
6. `docs/virtualizedlist.md`

### Text & Input Components (5 files)
7. `docs/text.md`
8. `docs/textinput.md`
9. `docs/button.md`
10. `docs/pressable.md`
11. `docs/keyboardavoidingview.md`

### Touchable Components (4 files)
12. `docs/touchablehighlight.md`
13. `docs/touchableopacity.md`
14. `docs/touchablewithoutfeedback.md`
15. `docs/touchablenativefeedback.md`

### Image & Media (3 files)
16. `docs/image.md`
17. `docs/imagebackground.md`
18. `docs/activityindicator.md`

### Other Core Components (2 files)
19. `docs/modal.md`
20. `docs/switch.md`

## Translation Instructions

### Component Documentation Specific Guidelines

1. **Props Tables** - Be careful with:
   - Keep prop names in English (e.g., `onPress`, `style`, `children`)
   - Translate prop descriptions
   - Keep type annotations in English (`string`, `number`, `boolean`)
   - Translate examples in descriptions

2. **Code Examples** - Common in component docs:
   - Keep all JSX/TSX code unchanged
   - Translate comments in code if they add clarity
   - Translate text shown in UI (Button titles, Text content in examples)

3. **Platform Badges** - Keep as-is:
   - `iOS`, `Android`, `Web` badges should remain
   - Translate surrounding explanation text

### Example Translation Pattern

```markdown
<!-- English -->
## Props

### onPress
Called when the user taps the button.

| Type | Required |
|------|----------|
| function | No |

<!-- Portuguese -->
## Props

### onPress
Chamado quando o usuário toca no botão.

| Tipo | Obrigatório |
|------|-------------|
| function | Não |
```

## Quality Checklist

- [ ] All prop names unchanged (onPress, style, etc.)
- [ ] Component names unchanged (View, Text, etc.)
- [ ] Type annotations unchanged (string, boolean, etc.)
- [ ] Code examples preserved exactly
- [ ] Tables properly formatted
- [ ] Platform badges unchanged
- [ ] Descriptions translated naturally
- [ ] Consistent terminology for UI terms

## Progress Tracking

- [ ] docs/components-and-apis.md
- [ ] docs/view.md
- [ ] docs/scrollview.md
- [ ] docs/flatlist.md
- [ ] docs/sectionlist.md
- [ ] docs/virtualizedlist.md
- [ ] docs/text.md
- [ ] docs/textinput.md
- [ ] docs/button.md
- [ ] docs/pressable.md
- [ ] docs/keyboardavoidingview.md
- [ ] docs/touchablehighlight.md
- [ ] docs/touchableopacity.md
- [ ] docs/touchablewithoutfeedback.md
- [ ] docs/touchablenativefeedback.md
- [ ] docs/image.md
- [ ] docs/imagebackground.md
- [ ] docs/activityindicator.md
- [ ] docs/modal.md
- [ ] docs/switch.md

## Next Step
After completing this step, proceed to **step03.md** (Core Components - Part 2 & Platform-Specific)
