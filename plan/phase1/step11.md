# Phase 1 - Step 11: New Architecture - Turbo Modules & Fabric

**Target:** 20 files
**Category:** New Architecture, Turbo Native Modules, Fabric Components
**Estimated Time:** 4-5 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate documentation for React Native's New Architecture, including Turbo Native Modules and Fabric Components.

## Files to Translate (20 files)

### Turbo Native Modules (6 files)
1. `docs/turbo-native-modules.md`
2. `docs/turbo-native-modules-android.md`
3. `docs/turbo-native-modules-ios.md`
4. `docs/the-new-architecture/turbo-modules-with-swift.md`
5. `docs/the-new-architecture/pure-cxx-modules.md`
6. `docs/the-new-architecture/advanced-topics-modules.md`

### Fabric Components (5 files)
7. `docs/fabric-native-components.md`
8. `docs/fabric-native-components-android.md`
9. `docs/fabric-native-components-ios.md`
10. `docs/the-new-architecture/advanced-topics-components.md`
11. `docs/the-new-architecture/fabric-component-native-commands.md`

### Codegen (3 files)
12. `docs/the-new-architecture/what-is-codegen.md`
13. `docs/the-new-architecture/using-codegen.md`
14. `docs/the-new-architecture/codegen-cli.md`

### Advanced Topics (4 files)
15. `docs/the-new-architecture/create-module-library.md`
16. `docs/the-new-architecture/custom-cxx-types.md`
17. `docs/the-new-architecture/direct-manipulation.md`
18. `docs/the-new-architecture/layout-measurements.md`

### Module Lifecycle (2 files)
19. `docs/the-new-architecture/native-modules-custom-events.md`
20. `docs/the-new-architecture/native-modules-lifecycle.md`

## Translation Instructions

### New Architecture Guidelines

1. **Architecture Terms** - Keep in English:
   - Turbo Modules, Fabric, JSI (JavaScript Interface)
   - Codegen, TurboModuleRegistry
   - Bridge (old), JSI (new)

2. **Native Code** - Keep unchanged:
   - Java/Kotlin code blocks
   - Swift/Objective-C code blocks
   - C++ code blocks
   - All native method signatures

3. **Codegen Specifications** - Keep syntax:
   - Flow/TypeScript type definitions
   - `@ReactMethod`, `@ReactProp` annotations
   - Interface definitions

4. **Build Configuration** - Keep unchanged:
   - Gradle configuration
   - CocoaPods specs
   - CMake files

### Example Pattern

```markdown
<!-- English -->
## Creating a Turbo Module

Turbo Modules are the new way to write native modules with better performance.

```java
@ReactModule(name = "MyModule")
public class MyModule extends ReactContextBaseJavaModule {
  // Implementation
}
```

<!-- Portuguese -->
## Criando um Turbo Module

Turbo Modules são a nova forma de escrever módulos nativos com melhor performance.

```java
@ReactModule(name = "MyModule")
public class MyModule extends ReactContextBaseJavaModule {
  // Implementation
}
```
```

## Quality Checklist

- [ ] Architecture terminology in English
- [ ] Native code unchanged
- [ ] Codegen specs preserved
- [ ] Type definitions intact
- [ ] Build configs unchanged
- [ ] Interface names in English
- [ ] Performance explanations clear
- [ ] Migration guides accurate

## Progress Tracking

- [ ] docs/turbo-native-modules.md
- [ ] docs/turbo-native-modules-android.md
- [ ] docs/turbo-native-modules-ios.md
- [ ] docs/the-new-architecture/turbo-modules-with-swift.md
- [ ] docs/the-new-architecture/pure-cxx-modules.md
- [ ] docs/the-new-architecture/advanced-topics-modules.md
- [ ] docs/fabric-native-components.md
- [ ] docs/fabric-native-components-android.md
- [ ] docs/fabric-native-components-ios.md
- [ ] docs/the-new-architecture/advanced-topics-components.md
- [ ] docs/the-new-architecture/fabric-component-native-commands.md
- [ ] docs/the-new-architecture/what-is-codegen.md
- [ ] docs/the-new-architecture/using-codegen.md
- [ ] docs/the-new-architecture/codegen-cli.md
- [ ] docs/the-new-architecture/create-module-library.md
- [ ] docs/the-new-architecture/custom-cxx-types.md
- [ ] docs/the-new-architecture/direct-manipulation.md
- [ ] docs/the-new-architecture/layout-measurements.md
- [ ] docs/the-new-architecture/native-modules-custom-events.md
- [ ] docs/the-new-architecture/native-modules-lifecycle.md

## Next Step
After completing this step, proceed to **step12.md** (Legacy Architecture & Final Files)
