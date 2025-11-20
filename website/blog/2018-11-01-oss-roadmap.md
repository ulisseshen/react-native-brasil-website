---
ia-translated: true
title: Roadmap Open Source
author: Héctor Ramos
authorTitle: Engineer at Facebook
authorURL: 'https://hectorramos.com/about'
authorImageURL: 'https://s.gravatar.com/avatar/f2223874e66e884c99087e452501f2da?s=128'
authorTwitter: hectorramos
tags: [announcement]
---

![](/blog/assets/oss-roadmap-hero.jpg)

Este ano, a equipe React Native se concentrou em uma [rearquitetura em grande escala do React Native](https://github.com/react-native-community/discussions-and-proposals/issues/4). Como Sophie mencionou em seu [post sobre o Estado do React Native,](/blog/2018/06/14/state-of-react-native-2018) esboçamos um plano para melhor apoiar a próspera população de usuários e colaboradores React Native fora do Facebook. Agora é hora de compartilhar mais detalhes sobre o que temos trabalhado. Antes de fazer isso, gostaria de apresentar nossa visão de longo prazo para React Native em open source.

Nossa visão para React Native é...

- **Um repositório GitHub saudável.** Issues e pull requests são tratados dentro de um período de tempo razoável.
  - Aumento da cobertura de testes.
  - Commits que sincronizam do repositório de código do Facebook não devem quebrar testes open source.
  - Uma escala maior de contribuições significativas da comunidade.
- **APIs estáveis,** tornando mais fácil interfacear com dependências open source.
  - Facebook usa a mesma API pública que o open source
  - Lançamentos React Native que seguem versionamento semântico.
- **Um ecossistema vibrante.** ViewManagers de alta qualidade, módulos nativos e suporte a múltiplas plataformas mantidos pela comunidade.
- **Excelente documentação.** Foco em ajudar usuários a criar experiências de alta qualidade, e documentação de referência de API atualizada.

Identificamos as seguintes áreas de foco para nos ajudar a alcançar esta visão.

## ✂️ Lean Core

Nosso objetivo é [reduzir a área de superfície do React Native](https://github.com/react-native-community/discussions-and-proposals/issues/6) removendo componentes não essenciais e não utilizados. Transferiremos componentes não essenciais para a comunidade para permitir que ela se mova mais rápido. A área de superfície reduzida facilitará o gerenciamento de contribuições ao React Native.

[`WebView`](https://github.com/react-native-community/discussions-and-proposals/blob/master/proposals/0001-webview.md) é um exemplo de um componente que transferimos para a comunidade. Estamos trabalhando em um fluxo de trabalho que permitirá às equipes internas continuar usando esses componentes depois de removê-los do repositório. Identificamos [dezenas de componentes adicionais](https://github.com/react-native-community/discussions-and-proposals/issues/6) dos quais daremos a propriedade à comunidade.

## 🎁 Open Sourcing Internals e 🛠Ferramental Atualizado

A experiência de desenvolvimento React Native para equipes de produto no Facebook pode ser bem diferente do open source. Ferramentas que podem ser populares na comunidade open source não são usadas no Facebook. Pode haver uma ferramenta interna que alcança o mesmo propósito. Em alguns casos, equipes do Facebook se acostumaram com ferramentas que não existem fora do Facebook. Essas disparidades podem apresentar desafios quando fazemos open source do nosso próximo trabalho de arquitetura.

Trabalharemos no lançamento de algumas dessas ferramentas internas. Também melhoraremos o suporte para ferramentas populares com a comunidade open source. Aqui está uma lista não exaustiva de projetos que abordaremos:

- Fazer open source do JSI e permitir que a comunidade traga suas próprias VMs JavaScript, substituindo o JavaScriptCore existente do lançamento inicial do RN. Cobriremos o que é JSI em um post futuro, enquanto isso você pode aprender mais sobre JSI na [palestra de Parashuram na React Conf](https://www.youtube.com/watch?v=UcqRXTriUVI).
- Suportar bibliotecas 64-bit no Android.
- Habilitar debugging sob a nova arquitetura.
- Melhorar o suporte para CocoaPods, Gradle, Maven e novo sistema de build do Xcode.

## ✅ Infraestrutura de Testes

Quando engenheiros do Facebook publicam código, é considerado seguro incluir se passar em todos os testes. Esses testes identificam se uma mudança pode quebrar uma de nossas próprias superfícies React Native. No entanto, há diferenças em como o Facebook usa React Native. Isso nos permitiu quebrar inadvertidamente o React Native em open source.

Reforçaremos nossos testes internos para garantir que eles rodem em um ambiente o mais próximo possível do open source. Isso ajudará a prevenir que código que quebra esses testes chegue ao open source. Também trabalharemos em infraestrutura para permitir melhores testes do repositório principal no GitHub, permitindo que futuros pull requests incluam testes facilmente.

Combinado com a área de superfície reduzida, isso permitirá que contribuidores mesclem pull requests mais rapidamente, com confiança.

## 📜 API Pública

Facebook consumirá React Native via API pública, da mesma forma que o open source, para reduzir mudanças breaking não intencionais. Começamos a converter sites de chamada internos para abordar isso. Nosso objetivo é convergir em uma API pública estável, levando à adoção de versionamento semântico na versão 1.0.

## 📣 Comunicação

React Native é um dos [principais projetos open source no GitHub](https://octoverse.github.com/#top-and-trending-projects) por contagem de contribuidores. Isso nos deixa muito felizes, e gostaríamos de manter isso. Continuaremos trabalhando em iniciativas que levam a contribuidores envolvidos, como aumento de transparência e discussão aberta. A documentação é uma das primeiras coisas que alguém novo no React Native encontrará, mas não tem sido uma prioridade. Gostaríamos de consertar isso, começando por trazer de volta documentação de referência de API gerada automaticamente, criar conteúdo adicional focado em criar [experiências de usuário de qualidade](/docs/improvingux), e melhorar nossas [notas de lançamento](https://github.com/react-native-community/react-native-releases/issues/47).

## Timeline

Estamos planejando incluir esses projetos ao longo do próximo ano ou mais. Alguns desses esforços já estão em andamento, como [JSI que já foi incluído em open source](https://github.com/facebook/react-native/compare/e337bcafb0b017311c37f2dbc24e5a757af0a205...8427f64e06456f171f9df0316c6ca40613de7a20). Outros levarão um pouco mais para completar, como reduzir a área de superfície. Faremos o nosso melhor para manter a comunidade atualizada com nosso progresso. Junte-se a nós no repositório [Discussions and Proposals](https://github.com/react-native-community/discussions-and-proposals), uma iniciativa da comunidade React Native que levou à criação de várias das iniciativas discutidas neste roadmap.
