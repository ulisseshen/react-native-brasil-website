<!-- ia-translated: true -->

# Fase 1 - Etapa 1: Começando e Fundamentos

**Meta:** 20 arquivos
**Categoria:** Começando, Introdução, Configuração de Ambiente
**Tempo Estimado:** 3-4 horas
**Agente:** `.claude/agents/translator.md`

## Objetivo
Traduzir a documentação fundamental que ajuda desenvolvedores a começar com React Native. Estes são os arquivos mais críticos para novos usuários.

## Arquivos para Traduzir (20 arquivos)

### Getting Started (5 arquivos)
1. `docs/getting-started.md`
2. `docs/introduction.md`
3. `docs/set-up-your-environment.md`
4. `docs/environment-setup.md`
5. `docs/troubleshooting.md`

### React Basics (4 arquivos)
6. `docs/intro-react-native-components.md`
7. `docs/intro-react.md`
8. `docs/handling-text-input.md`
9. `docs/state.md`

### Core Concepts (5 arquivos)
10. `docs/using-a-scrollview.md`
11. `docs/using-a-listview.md`
12. `docs/platform-specific-code.md`
13. `docs/more-resources.md`
14. `docs/tutorial.md`

### Arquivos Parciais/Include (6 arquivos)
15. `docs/_getting-started-linux-android.md`
16. `docs/_getting-started-macos-android.md`
17. `docs/_getting-started-macos-ios.md`
18. `docs/_getting-started-windows-android.md`
19. `docs/_remove-global-cli.md`
20. `docs/props.md`

## Instruções de Tradução

### Usando o Agente Tradutor

Para cada arquivo, use a seguinte abordagem:

```bash
# Example command to translate a file
claude task translate --agent=.claude/agents/translator.md \
  --input=docs/getting-started.md \
  --output=website/i18n/pt-BR/docusaurus-plugin-content-docs/current/getting-started.md
```

Ou use a ferramenta Task com este prompt:
```
Using the translator agent at .claude/agents/translator.md, translate the file docs/getting-started.md to Brazilian Portuguese (PT-BR). Follow all guidelines for technical terms, code preservation, and natural Portuguese phrasing.
```

### Considerações Especiais para Esta Etapa

1. **Arquivos Getting Started** - Estes são os arquivos MAIS importantes:
   - Certifique-se de que o tom seja acolhedor e encorajador
   - Mantenha os comandos de instalação exatamente como estão
   - Traduza as instruções de UI claramente

2. **Arquivos Environment Setup** - Altamente técnicos:
   - Mantenha todos os comandos, caminhos e nomes de ferramentas em inglês
   - Traduza apenas o texto explicativo
   - Tenha cuidado extra com instruções específicas de plataforma

3. **Arquivos parciais (começando com `_`)** - Estes são incluídos em outros documentos:
   - Mantenha exatamente a mesma estrutura
   - Estes serão incorporados em outras páginas
   - Consistência é crítica

## Lista de Verificação de Qualidade

Após traduzir todos os 20 arquivos:

- [ ] Todos os nomes de arquivos permanecem inalterados (apenas o conteúdo foi traduzido)
- [ ] Todos os blocos de código preservados exatamente
- [ ] Comandos e sintaxe CLI inalterados
- [ ] Links internos funcionando (formato ../other-doc.md)
- [ ] Frontmatter manipulado adequadamente (id inalterado, title traduzido)
- [ ] Termos técnicos mantidos em inglês (React Native, npm, etc.)
- [ ] Prosa em português brasileiro natural
- [ ] Terminologia consistente em todos os 20 arquivos
- [ ] Sem erros de ortografia ou gramática
- [ ] Caracteres especiais adequadamente codificados (UTF-8)

## Testes

Após a tradução:

```bash
# Build the docs to verify no errors
cd website
yarn build --locale pt-BR

# Start dev server to preview
yarn start --locale pt-BR
```

## Localização de Saída

Todos os arquivos traduzidos devem ser colocados em:
```
website/i18n/pt-BR/docusaurus-plugin-content-docs/current/
```

Mantendo a mesma estrutura de diretórios da origem.

## Acompanhamento de Progresso

- [ ] docs/getting-started.md
- [ ] docs/introduction.md
- [ ] docs/set-up-your-environment.md
- [ ] docs/environment-setup.md
- [ ] docs/troubleshooting.md
- [ ] docs/intro-react-native-components.md
- [ ] docs/intro-react.md
- [ ] docs/handling-text-input.md
- [ ] docs/state.md
- [ ] docs/using-a-scrollview.md
- [ ] docs/using-a-listview.md
- [ ] docs/platform-specific-code.md
- [ ] docs/more-resources.md
- [ ] docs/tutorial.md
- [ ] docs/_getting-started-linux-android.md
- [ ] docs/_getting-started-macos-android.md
- [ ] docs/_getting-started-macos-ios.md
- [ ] docs/_getting-started-windows-android.md
- [ ] docs/_remove-global-cli.md
- [ ] docs/props.md

## Próxima Etapa
Após completar esta etapa, prossiga para **step02.md** (Core Components - Parte 1)
