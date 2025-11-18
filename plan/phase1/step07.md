# Phase 1 - Step 7: Global APIs - Part 2 (Performance & Observer)

**Target:** 17 files
**Category:** Performance APIs, Observers, URL APIs
**Estimated Time:** 2-3 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate documentation for Performance APIs, IntersectionObserver, and URL-related globals.

## Files to Translate (17 files)

### Performance APIs (9 files)
1. `docs/global-performance.md`
2. `docs/global-PerformanceEntry.md`
3. `docs/global-PerformanceEventTiming.md`
4. `docs/global-PerformanceLongTaskTiming.md`
5. `docs/global-PerformanceMark.md`
6. `docs/global-PerformanceMeasure.md`
7. `docs/global-PerformanceObserver.md`
8. `docs/global-PerformanceObserverEntryList.md`
9. `docs/global-EventCounts.md`

### Observer APIs (2 files)
10. `docs/global-intersectionobserver.md`
11. `docs/global-intersectionobserverentry.md`

### URL APIs (2 files)
12. `docs/global-URL.md`
13. `docs/global-URLSearchParams.md`

### Utility Globals (4 files)
14. `docs/global-console.md`
15. `docs/global-queueMicrotask.md`
16. `docs/global-navigator.md`
17. `docs/global-process.md`

## Translation Instructions

### Performance API Guidelines

1. **Performance Metrics** - Keep names in English:
   - `performance.now()`, `performance.mark()`, `performance.measure()`
   - Entry types: `'mark'`, `'measure'`, `'event'`, `'longtask'`

2. **Performance Properties** - Keep unchanged:
   - `duration`, `startTime`, `entryType`, `name`
   - These are standard Web Performance API terms

3. **Observer Patterns** - Keep API structure:
   - `new PerformanceObserver()`, `observe()`, `disconnect()`
   - Callback parameters unchanged

### Example Pattern

```markdown
<!-- English -->
## performance.mark()
Creates a named performance mark at the current timestamp.

```js
performance.mark('my-mark');
```

This is useful for measuring custom timings in your app.

<!-- Portuguese -->
## performance.mark()
Cria uma marca de performance nomeada no timestamp atual.

```js
performance.mark('my-mark');
```

Isso é útil para medir tempos customizados no seu aplicativo.
```

## Quality Checklist

- [ ] Performance method names unchanged
- [ ] Observer API structure preserved
- [ ] Entry type strings unchanged
- [ ] Property names in English
- [ ] Metric names unchanged
- [ ] Code examples preserved
- [ ] Timing concepts translated clearly
- [ ] Web standard compatibility maintained

## Progress Tracking

- [ ] docs/global-performance.md
- [ ] docs/global-PerformanceEntry.md
- [ ] docs/global-PerformanceEventTiming.md
- [ ] docs/global-PerformanceLongTaskTiming.md
- [ ] docs/global-PerformanceMark.md
- [ ] docs/global-PerformanceMeasure.md
- [ ] docs/global-PerformanceObserver.md
- [ ] docs/global-PerformanceObserverEntryList.md
- [ ] docs/global-EventCounts.md
- [ ] docs/global-intersectionobserver.md
- [ ] docs/global-intersectionobserverentry.md
- [ ] docs/global-URL.md
- [ ] docs/global-URLSearchParams.md
- [ ] docs/global-console.md
- [ ] docs/global-queueMicrotask.md
- [ ] docs/global-navigator.md
- [ ] docs/global-process.md

## Next Step
After completing this step, proceed to **step08.md** (Global APIs - Part 3 & Debugging)
