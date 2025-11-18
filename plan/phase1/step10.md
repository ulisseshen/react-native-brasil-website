# Phase 1 - Step 10: Platform Guides & Release Documentation

**Target:** 20 files
**Category:** Android/iOS platform guides, Release information, TV platforms
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate platform-specific guides for Android and iOS, release documentation, and specialized platform guides.

## Files to Translate (20 files)

### Android Platform Guides (4 files)
1. `docs/signed-apk-android.md`
2. `docs/react-native-gradle-plugin.md`
3. `docs/native-platforms.md`
4. `docs/get-started-without-a-framework.md`

### iOS Platform Guides (3 files)
5. `docs/linking-libraries-ios.md`
6. `docs/running-on-simulator-ios.md`
7. `docs/publishing-to-app-store.md`

### Release Documentation (3 files)
8. `docs/releases/releases.md`
9. `docs/releases/release-levels.md`
10. `docs/releases/versioning-policy.md`

### Specialized Platforms (2 files)
11. `docs/building-for-tv.md`
12. `docs/out-of-tree-platforms.md`

### Legacy/Deprecated Components (8 files)
13. `docs/alertios.md`
14. `docs/asyncstorage.md`
15. `docs/checkbox.md`
16. `docs/clipboard.md`
17. `docs/datepickerandroid.md`
18. `docs/datepickerios.md`
19. `docs/imagepickerios.md`
20. `docs/progressbarandroid.md`

## Translation Instructions

### Platform Guide Guidelines

1. **Build Commands** - Keep unchanged:
   - Gradle commands, Xcode build settings
   - `./gradlew assembleRelease`
   - All build/deployment commands

2. **File Paths** - Platform-specific paths:
   - Android: `android/app/build.gradle`
   - iOS: `ios/YourApp.xcodeproj`
   - Keep all paths exactly as-is

3. **Platform Tools** - Keep tool names:
   - Android Studio, Xcode, Gradle
   - SDK, NDK, CocoaPods

### Release Documentation Guidelines

1. **Version Numbers** - Keep unchanged:
   - Version format: `0.XX.Y`
   - Release channels: stable, RC, nightly

2. **Release Terms** - Mixed approach:
   - Keep: RC (Release Candidate), stable, nightly
   - Translate: descriptions and policies

### Deprecated Components

These components are deprecated but still documented:
- Add a note at the top indicating deprecation
- Translate but note alternatives

## Quality Checklist

- [ ] Build commands preserved
- [ ] File paths unchanged
- [ ] Platform tool names correct
- [ ] Version numbers intact
- [ ] Release terminology consistent
- [ ] Gradle/CocoaPods syntax preserved
- [ ] App Store process clear
- [ ] Deprecation warnings added

## Progress Tracking

- [ ] docs/signed-apk-android.md
- [ ] docs/react-native-gradle-plugin.md
- [ ] docs/native-platforms.md
- [ ] docs/get-started-without-a-framework.md
- [ ] docs/linking-libraries-ios.md
- [ ] docs/running-on-simulator-ios.md
- [ ] docs/publishing-to-app-store.md
- [ ] docs/releases/releases.md
- [ ] docs/releases/release-levels.md
- [ ] docs/releases/versioning-policy.md
- [ ] docs/building-for-tv.md
- [ ] docs/out-of-tree-platforms.md
- [ ] docs/alertios.md
- [ ] docs/asyncstorage.md
- [ ] docs/checkbox.md
- [ ] docs/clipboard.md
- [ ] docs/datepickerandroid.md
- [ ] docs/datepickerios.md
- [ ] docs/imagepickerios.md
- [ ] docs/progressbarandroid.md

## Next Step
After completing this step, proceed to **step11.md** (New Architecture - Part 1)
