# Phase 1 - Step 6: Global APIs - Part 1 (Web Standards)

**Target:** 20 files
**Category:** Global Web Standard APIs
**Estimated Time:** 3-4 hours
**Agent:** `.claude/agents/translator.md`

## Objective
Translate documentation for Web Standard APIs available in React Native (Fetch, Timers, Console, etc.).

## Files to Translate (20 files)

### Fetch & Network (7 files)
1. `docs/global-fetch.md`
2. `docs/global-XMLHttpRequest.md`
3. `docs/global-Headers.md`
4. `docs/global-Request.md`
5. `docs/global-Response.md`
6. `docs/global-WebSocket.md`
7. `docs/global-AbortController.md`

### File & Blob APIs (5 files)
8. `docs/global-AbortSignal.md`
9. `docs/global-Blob.md`
10. `docs/global-File.md`
11. `docs/global-FileReader.md`
12. `docs/global-FormData.md`

### Timers & Scheduling (6 files)
13. `docs/global-setTimeout.md`
14. `docs/global-setInterval.md`
15. `docs/global-clearTimeout.md`
16. `docs/global-clearInterval.md`
17. `docs/global-requestAnimationFrame.md`
18. `docs/global-cancelAnimationFrame.md`

### Other Globals (2 files)
19. `docs/global-requestIdleCallback.md`
20. `docs/global-cancelIdleCallback.md`

## Translation Instructions

### Web Standard APIs Guidelines

1. **Global Object Names** - Keep in English:
   - `fetch`, `XMLHttpRequest`, `WebSocket`, `Blob`, `File`
   - These are standard Web APIs

2. **Method Names** - Keep unchanged:
   - `fetch()`, `setTimeout()`, `clearInterval()`
   - All Web API method signatures

3. **Web Standard Properties** - Keep as-is:
   - `response.json()`, `request.headers`, `blob.size`
   - Standard property names and methods

4. **HTTP/Web Terms** - Mixed approach:
   - Keep: `HTTP`, `HTTPS`, `URL`, `JSON`, `headers`, `status code`
   - Translate: descriptions of what they do

### Example Pattern

```markdown
<!-- English -->
## fetch()
The global fetch function starts a network request to retrieve a resource.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

<!-- Portuguese -->
## fetch()
A função global fetch inicia uma requisição de rede para recuperar um recurso.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```
```

## Quality Checklist

- [ ] Global function names unchanged
- [ ] Web API signatures preserved
- [ ] HTTP terms handled correctly
- [ ] Code examples unchanged
- [ ] Standard property names kept
- [ ] Descriptions translated naturally
- [ ] Consistent web terminology
- [ ] Links to MDN preserved (if any)

## Progress Tracking

- [ ] docs/global-fetch.md
- [ ] docs/global-XMLHttpRequest.md
- [ ] docs/global-Headers.md
- [ ] docs/global-Request.md
- [ ] docs/global-Response.md
- [ ] docs/global-WebSocket.md
- [ ] docs/global-AbortController.md
- [ ] docs/global-AbortSignal.md
- [ ] docs/global-Blob.md
- [ ] docs/global-File.md
- [ ] docs/global-FileReader.md
- [ ] docs/global-FormData.md
- [ ] docs/global-setTimeout.md
- [ ] docs/global-setInterval.md
- [ ] docs/global-clearTimeout.md
- [ ] docs/global-clearInterval.md
- [ ] docs/global-requestAnimationFrame.md
- [ ] docs/global-cancelAnimationFrame.md
- [ ] docs/global-requestIdleCallback.md
- [ ] docs/global-cancelIdleCallback.md

## Next Step
After completing this step, proceed to **step07.md** (Global APIs - Part 2: Performance & Observer)
