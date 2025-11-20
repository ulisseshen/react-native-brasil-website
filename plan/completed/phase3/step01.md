<!-- ia-translated: true -->

# Fase 3 - Etapa 1: Posts do Blog 2015-2017

**Alvo:** ~15 arquivos
**Categoria:** Posts Iniciais do Blog React Native (2015-2017)
**Tempo Estimado:** 3-4 horas
**Agente:** `.claude/agents/translator.md`

## Objetivo
Traduzir os posts iniciais do blog React Native de 2015-2017, cobrindo o lançamento inicial e os primeiros marcos importantes.

## Instruções de Tradução

### Diretrizes para Posts do Blog

1. **Contexto Histórico** - Preservar datas e linha do tempo:
   - Manter datas no formato original
   - Números de versão históricos inalterados (ex.: "React Native 0.36")
   - Nomes de eventos e datas preservados

2. **Informações do Autor** - Manter inalterado:
   - Nomes dos autores
   - Handles/usernames dos autores
   - Afiliações de empresa

3. **Exemplos de Código** - Mesmo que documentação:
   - Manter todo código inalterado
   - Traduzir comentários se útil
   - Manter exemplos de linha de comando

4. **Links** - Preservar todos os links:
   - Referências externas
   - Links de documentação (podem precisar de atualização para i18n)
   - Links do GitHub

### Traduções Específicas para Blog

| Inglês | Português |
|---------|-----------|
| Announcement | Anúncio |
| Release | Lançamento |
| New Features | Novos Recursos |
| Breaking Changes | Mudanças que Quebram Compatibilidade |
| Changelog | Changelog / Registro de Alterações |
| Contributors | Contribuidores |
| Thank you | Obrigado |

## Arquivos para Traduzir

Traduzir todos os posts do blog de 2015-2017 (aproximadamente 15 arquivos):

### Posts de 2015
- `2015-03-26-react-native-bringing-modern-web-techniques-to-mobile.md`
- `2015-09-14-react-native-for-android.md`
- `2015-11-23-making-react-native-apps-accessible.md`

### Posts de 2016
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

### Posts de 2017 (primeira metade)
- `2017-01-07-monthly-release-cadence.md`
- `2017-02-14-using-native-driver-for-animated.md`
- ...e quaisquer outros do início de 2017

## Exemplo de Frontmatter

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

Manter o frontmatter praticamente inalterado, traduzir apenas o `title` se fizer sentido.

## Checklist de Qualidade

- [ ] Datas históricas preservadas
- [ ] Números de versão inalterados
- [ ] Informações do autor intactas
- [ ] Exemplos de código preservados
- [ ] Links funcionais
- [ ] Títulos tratados apropriadamente
- [ ] Prosa natural em português
- [ ] Terminologia técnica consistente

## Localização de Saída

```
website/i18n/pt-BR/docusaurus-plugin-content-blog/
```

## Acompanhamento de Progresso

Use este comando para listar todos os posts do blog de 2015-2017:
```bash
find website/blog -name "2015-*.md" -o -name "2016-*.md" -o -name "2017-*.md" | head -15 | sort
```

Marque cada arquivo conforme você o completar.

## Próxima Etapa
Após completar esta etapa, prossiga para **step02.md** (Posts do Blog 2017-2018)
