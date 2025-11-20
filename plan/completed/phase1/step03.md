# Phase 1 - Step 3: Platform Components & Style Props

**Target:** 20 files
**Category:** Platform-Specific Components, Style Properties, Object Types
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate platform-specific components, style prop references, and type definitions.

## Files to Translate (20 files)

### Platform-Specific Components (5 files)
1. `docs/drawerlayoutandroid.md`
2. `docs/inputaccessoryview.md`
3. `docs/safeareaview.md`
4. `docs/statusbar.md`
5. `docs/refreshcontrol.md`

### Style Props Documentation (5 files)
6. `docs/image-style-props.md`
7. `docs/layout-props.md`
8. `docs/shadow-props.md`
9. `docs/text-style-props.md`
10. `docs/view-style-props.md`

### Object Types & References (10 files)
11. `docs/boxshadowvalue.md`
12. `docs/dropshadowvalue.md`
13. `docs/layoutevent.md`
14. `docs/pressevent.md`
15. `docs/targetevent.md`
16. `docs/viewtoken.md`
17. `docs/react-node.md`
18. `docs/rect.md`
19. `docs/nodes.md`
20. `docs/element-nodes.md`

## Translation Instructions

### Style Props Specific Guidelines

1. **CSS Property Names** - Keep in English:
   - `flexDirection`, `justifyContent`, `alignItems`
   - `padding`, `margin`, `width`, `height`
   - `backgroundColor`, `borderRadius`, etc.

2. **Style Values** - Keep as-is:
   - Color values: `'#FF0000'`, `'red'`, `'rgba(255,0,0,0.5)'`
   - Numeric values: `10`, `'50%'`, `{width: 100}`
   - Keywords: `'flex'`, `'none'`, `'auto'`

3. **Type Definitions** - Technical:
   - Keep TypeScript types in English
   - Translate descriptions and explanations
   - Keep interfaces and type names unchanged

### Example Pattern for Style Props

```markdown
<!-- English -->
### backgroundColor
Background color of the component.

| Type | Default |
|------|---------|
| color | transparent |

<!-- Portuguese -->
### backgroundColor
Cor de fundo do componente.

| Tipo | Padrão |
|------|--------|
| color | transparent |
```

## Quality Checklist

- [ ] CSS property names unchanged
- [ ] TypeScript types unchanged
- [ ] Color/number values preserved
- [ ] Prop descriptions translated
- [ ] Type annotations in English
- [ ] Event object properties unchanged
- [ ] Code examples preserved
- [ ] Consistent style terminology

## Progress Tracking

- [ ] docs/drawerlayoutandroid.md
- [ ] docs/inputaccessoryview.md
- [ ] docs/safeareaview.md
- [ ] docs/statusbar.md
- [ ] docs/refreshcontrol.md
- [ ] docs/image-style-props.md
- [ ] docs/layout-props.md
- [ ] docs/shadow-props.md
- [ ] docs/text-style-props.md
- [ ] docs/view-style-props.md
- [ ] docs/boxshadowvalue.md
- [ ] docs/dropshadowvalue.md
- [ ] docs/layoutevent.md
- [ ] docs/pressevent.md
- [ ] docs/targetevent.md
- [ ] docs/viewtoken.md
- [ ] docs/react-node.md
- [ ] docs/rect.md
- [ ] docs/nodes.md
- [ ] docs/element-nodes.md

## Next Step
After completing this step, proceed to **step04.md** (Core APIs - Part 1)
