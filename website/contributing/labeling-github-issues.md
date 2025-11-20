---
title: Rotulando Issues do GitHub
ia-translated: true
---

A maioria das [nossas labels](https://github.com/facebook/react-native/issues/labels) tem um prefixo que fornece uma dica sobre seu propósito.

Você notará imediatamente que há dois prefixos de label que dominam a lista, [API:](https://github.com/facebook/react-native/labels?utf8=%E2%9C%93&q=API%3A) e [Component:](https://github.com/facebook/react-native/labels?utf8=%E2%9C%93&q=Component%3A).

Estes geralmente indicam issues e pull requests relacionados a uma API ou Component na biblioteca principal do React Native. Isso nos ajuda a entender, de relance, quais componentes estão em necessidade urgente de documentação ou suporte.

Essas labels são adicionadas automaticamente por um dos nossos [bots](/contributing/bots-reference), mas sinta-se à vontade para ajustá-las se o bot atribuir incorretamente uma issue.

- A classe de labels `p:` indica uma empresa com a qual mantemos algum tipo de [relacionamento](https://github.com/facebook/react-native/blob/main/ECOSYSTEM.md). Isso inclui Microsoft e Expo, por exemplo. Essas também são adicionadas automaticamente por nossas ferramentas, com base no autor da issue.
- A classe de labels `DX:` indica áreas que lidam com a experiência do desenvolvedor. Use essas para issues que impactam negativamente pessoas que usam o React Native.
- A classe de labels `Tool:` indica ferramentas. CocoaPods, Buck...
- As labels `Resolution:` nos ajudam a comunicar o status de uma issue. Ela precisa de mais informações? O que precisa ser feito antes que ela possa avançar?
- As labels `Type:` são adicionadas por um bot, com base no campo changelog em um pull request. Elas também podem se referir a tipos de issues que não são relatórios de bugs.
- As labels `Platform:` nos ajudam a identificar qual plataforma de desenvolvimento ou SO de destino é afetado pela issue.

Quando não tiver certeza sobre o significado de uma label específica, vá para https://github.com/facebook/react-native/labels e olhe o campo de descrição. Faremos o nosso melhor para documentar adequadamente essas labels.

### Ações de Labels

Aplicar uma das seguintes labels pode resultar em uma interação do bot. O objetivo dessas é ajudar na triagem de issues fornecendo uma resposta pré-definida quando considerada necessária.

- Labels que instruem o bot a deixar um comentário com os próximos passos:
  - `Needs: Issue Template`
  - `Needs: Environment Info`
  - `Needs: Verify on Latest Version`
  - `Needs: Repro`

- Labels que instruem o bot a fechar a issue após deixar um comentário explicativo:
  - `Resolution: For Stack Overflow`
  - `Type: Question`
  - `Type: Docs`

- Labels que simplesmente fecham uma issue sem comentário:
  - `Type: Invalid`
