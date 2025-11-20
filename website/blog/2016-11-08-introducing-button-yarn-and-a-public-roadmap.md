---
ia-translated: true
title: Introduzindo Button, Instalações Mais Rápidas com Yarn e um Roadmap Público
authors: [hectorramos]
tags: [announcement]
---

Ouvimos de muitas pessoas que há tanto trabalho acontecendo com React Native, pode ser difícil acompanhar o que está acontecendo. Para ajudar a comunicar qual trabalho está em andamento, agora estamos publicando um [roadmap para React Native](https://github.com/facebook/react-native/wiki/Roadmap). Em alto nível, este trabalho pode ser dividido em três prioridades:

- **Bibliotecas Core**. Adicionar mais funcionalidade aos componentes e APIs mais úteis.
- **Estabilidade**. Melhorar a infraestrutura subjacente para reduzir bugs e melhorar a qualidade do código.
- **Experiência do Desenvolvedor**. Ajudar os desenvolvedores React Native a se moverem mais rápido

Se você tem sugestões de recursos que acha que seriam valiosos no roadmap, confira o [Canny](https://react-native.canny.io/feature-requests), onde você pode sugerir novos recursos e discutir propostas existentes.

## O que há de novo no React Native

[Versão 0.37 do React Native](https://github.com/facebook/react-native/releases/tag/v0.37.0), lançada hoje, introduz um novo componente core para facilitar muito a adição de um Button tocável a qualquer aplicativo. Também estamos introduzindo suporte para o novo gerenciador de pacotes [Yarn](https://yarnpkg.com/), que deve acelerar todo o processo de atualização das dependências do seu aplicativo.

## Introduzindo Button

Hoje estamos introduzindo um componente básico `<Button />` que fica ótimo em todas as plataformas. Isso aborda um dos feedbacks mais comuns que recebemos: React Native é um dos únicos kits de desenvolvimento mobile sem um botão pronto para usar imediatamente.

![Simple Button on Android, iOS](/blog/assets/button-android-ios.png)

```
<Button
  onPress={onPressMe}
  title="Press Me"
  accessibilityLabel="Learn more about this Simple Button"
/>
```

Desenvolvedores React Native experientes sabem como fazer um botão: use TouchableOpacity para o visual padrão no iOS, TouchableNativeFeedback para o efeito ripple no Android, depois aplique alguns estilos. Botões customizados não são particularmente difíceis de construir ou instalar, mas nosso objetivo é tornar React Native radicalmente fácil de aprender. Com a adição de um botão básico no core, os recém-chegados serão capazes de desenvolver algo incrível em seu primeiro dia, em vez de gastar esse tempo formatando um Button e aprendendo sobre as nuances dos Touchable.

Button foi feito para funcionar muito bem e parecer nativo em todas as plataformas, então não suportará todos os recursos extras que botões customizados têm. É um ótimo ponto de partida, mas não foi feito para substituir todos os seus botões existentes. Para saber mais, confira a [nova documentação do Button](/docs/button), completa com um exemplo executável!

## Acelere o `react-native init` usando Yarn

Agora você pode usar [Yarn](https://yarnpkg.com/), o novo gerenciador de pacotes para JavaScript, para acelerar significativamente o `react-native init`. Para ver a aceleração, por favor [instale o yarn](https://yarnpkg.com/en/docs/install) e atualize seu `react-native-cli` para 1.2.0:

```sh
$ npm install -g react-native-cli
```

Agora você deve ver "Using yarn" ao configurar novos aplicativos:

![Using yarn](/blog/assets/yarn-rncli.png)

Em testes locais simples, `react-native init` terminou em **cerca de 1 minuto em uma boa rede** (vs cerca de 3 minutos ao usar npm 3.10.8). Instalar yarn é opcional, mas altamente recomendado.

## Obrigado!

Gostaríamos de agradecer a todos que contribuíram para este lançamento. As [notas de lançamento](https://github.com/facebook/react-native/releases/tag/v0.37.0) completas agora estão disponíveis no GitHub. Com mais de duas dúzias de correções de bugs e novos recursos, React Native continua melhorando graças a você.
