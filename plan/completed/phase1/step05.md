<!-- ia-translated: true -->

# Fase 1 - Passo 5: APIs de Animation, Hooks e APIs Específicas de Platform

**Alvo:** 20 arquivos
**Categoria:** Animation, Hooks, APIs Específicas de Platform
**Tempo Estimado:** 3-4 horas
**Agente:** `.claude/agents/translator.md`

## Objetivo
Traduzir APIs avançadas de animation, React hooks e APIs específicas de platform.

## Arquivos para Traduzir (20 arquivos)

### APIs de Animation (4 arquivos)
1. `docs/animated.md`
2. `docs/animatedvalue.md`
3. `docs/animatedvaluexy.md`
4. `docs/animations.md`

### React Hooks (2 arquivos)
5. `docs/usecolorscheme.md`
6. `docs/usewindowdimensions.md`

### APIs Específicas do Android (5 arquivos)
7. `docs/backhandler.md`
8. `docs/permissionsandroid.md`
9. `docs/toastandroid.md`
10. `docs/headless-js-android.md`
11. `docs/communication-android.md`

### APIs Específicas do iOS (5 arquivos)
12. `docs/actionsheetios.md`
13. `docs/dynamiccolorios.md`
14. `docs/settings.md`
15. `docs/communication-ios.md`
16. `docs/app-extensions.md`

### Desenvolvimento e Depuração (4 arquivos)
17. `docs/devsettings.md`
18. `docs/systrace.md`
19. `docs/i18nmanager.md`
20. `docs/document-nodes.md`

## Instruções de Tradução

### Diretrizes Específicas de Animation

1. **Métodos da API Animated** - Manter em inglês:
   - `Animated.timing()`, `Animated.spring()`, `Animated.sequence()`
   - `interpolate()`, `setValue()`, `addListener()`

2. **Funções Easing** - Manter nomes:
   - `Easing.linear`, `Easing.ease`, `Easing.bezier()`

3. **Valores de Animation** - Manter nomes de propriedades:
   - `toValue`, `duration`, `delay`, `useNativeDriver`

### Diretrizes Específicas de Platform

1. **Módulos Nativos** - Manter nomes dos módulos:
   - `PermissionsAndroid`, `ToastAndroid`, `ActionSheetIOS`

2. **Constantes de Platform** - Manter como está:
   - `Platform.OS`, `Platform.Version`
   - Valores de platform: `'ios'`, `'android'`, `'web'`

3. **Strings de Permissão** - Manter inalterado:
   - `PERMISSIONS.CAMERA`, `'android.permission.CAMERA'`

## Lista de Verificação de Qualidade

- [ ] Nomes de métodos de Animation inalterados
- [ ] Nomes de Hooks inalterados (useColorScheme, etc.)
- [ ] Nomes de módulos de Platform inalterados
- [ ] Strings de permissão inalteradas
- [ ] Chamadas de métodos nativos preservadas
- [ ] Indicadores de platform corretos
- [ ] Exemplos de código funcionando
- [ ] Terminologia de platform consistente

## Acompanhamento de Progresso

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

## Próximo Passo
Após completar este passo, prossiga para **step06.md** (APIs Globais - Parte 1)
