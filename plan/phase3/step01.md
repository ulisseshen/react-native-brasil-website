# Phase 3 - Step 1: Blog Posts 2015-2017

**Target:** ~15 files
**Category:** Early React Native Blog Posts (2015-2017)
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate early React Native blog posts from 2015-2017, covering the initial launch and first major milestones.

## Translation Instructions

### Blog Post Guidelines

1. **Historical Context** - Preserve dates and timeline:
   - Keep dates in original format
   - Historical version numbers unchanged (e.g., "React Native 0.36")
   - Event names and dates preserved

2. **Author Information** - Keep unchanged:
   - Author names
   - Author handles/usernames
   - Company affiliations

3. **Code Examples** - Same as documentation:
   - Keep all code unchanged
   - Translate comments if helpful
   - Keep command-line examples

4. **Links** - Preserve all links:
   - External references
   - Documentation links (may need updating for i18n)
   - GitHub links

### Blog-Specific Translations

| English | Portuguese |
|---------|-----------|
| Announcement | Anúncio |
| Release | Lançamento |
| New Features | Novos Recursos |
| Breaking Changes | Mudanças que Quebram Compatibilidade |
| Changelog | Changelog / Registro de Alterações |
| Contributors | Contribuidores |
| Thank you | Obrigado |

## Files to Translate

Translate all blog posts from 2015-2017 (approximately 15 files):

### 2015 Posts
- `2015-03-26-react-native-bringing-modern-web-techniques-to-mobile.md`
- `2015-09-14-react-native-for-android.md`
- `2015-11-23-making-react-native-apps-accessible.md`

### 2016 Posts
- `2016-03-24-introducing-hot-reloading.md`
- `2016-03-28-dive-into-react-native-performance.md`
- `2016-04-13-react-native-a-year-in-review.md`
- `2016-07-06-toward-better-documentation.md`
- `2016-08-12-react-native-meetup-san-francisco.md`
- `2016-08-19-right-to-left-support-for-react-native-apps.md`
- `2016-09-08-exponent-talks-unraveling-navigation.md`
- `2016-10-25-0.36-headless-js-the-keyboard-api-and-more.md`
- `2016-11-08-introducing-button-yarn-and-a-public-roadmap.md`
- `2016-12-05-easier-upgrades.md`

### 2017 Posts (first half)
- `2017-01-07-monthly-release-cadence.md`
- `2017-02-14-using-native-driver-for-animated.md`
- ...and any others from early 2017

## Frontmatter Example

```markdown
---
title: React Native: Bringing modern web techniques to mobile
author: Tom Occhino
authorTitle: Engineering Director at Facebook
authorURL: https://twitter.com/tomocchino
authorImageURL: https://graph.facebook.com/1024847057/picture
authorTwitter: tomocchino
tags: [engineering]
---

<!-- Translate from here -->
```

Keep frontmatter mostly unchanged, only translate `title` if it makes sense.

## Quality Checklist

- [ ] Historical dates preserved
- [ ] Version numbers unchanged
- [ ] Author information intact
- [ ] Code examples preserved
- [ ] Links functional
- [ ] Titles appropriately handled
- [ ] Natural Portuguese prose
- [ ] Technical terminology consistent

## Output Location

```
website/i18n/pt-BR/docusaurus-plugin-content-blog/
```

## Progress Tracking

Use this command to list all 2015-2017 blog posts:
```bash
find website/blog -name "2015-*.md" -o -name "2016-*.md" -o -name "2017-*.md" | head -15 | sort
```

Mark each file as you complete it.

## Next Step
After completing this step, proceed to **step02.md** (Blog Posts 2017-2018)
