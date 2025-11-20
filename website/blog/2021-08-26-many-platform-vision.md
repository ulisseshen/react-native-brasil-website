---
ia-translated: true
title: A Visão de Muitas Plataformas do React Native
authors: [abernathyca, Eli White, lunaleaps, yungsters]
tags: [announcement]
---

O React Native tem sido muito bem-sucedido em elevar o padrão para desenvolvimento mobile, tanto no Facebook quanto em outros lugares da indústria. À medida que interagimos com computadores de novas maneiras e à medida que novos dispositivos são inventados, queremos que o React Native esteja lá para todos. Embora o React Native tenha sido originalmente criado para construir aplicativos móveis, acreditamos que focar em muitas plataformas e construir para os pontos fortes e restrições de cada plataforma tem um efeito simbiótico. Vimos enormes benefícios quando estendemos esta tecnologia para desktop e realidade virtual, e estamos empolgados em compartilhar o que isso significa para o futuro do React Native.

<!--truncate-->

## Respeitando a Plataforma

Nosso primeiro princípio orientador é [atender às expectativas que as pessoas têm para cada plataforma](https://reactnative.dev/blog/2020/07/17/react-native-principles#native-experience). Usuários do Android esperam aplicativos acessíveis usando TalkBack. A navegação deve funcionar da maneira como funciona em outros aplicativos Android. Um botão deve parecer e se comportar como botões parecem e se comportam no Android. Ele não deve parecer e se comportar como um botão do iOS. Embora busquemos oferecer uma experiência de desenvolvedor consistente entre plataformas, resistimos à tentação de sacrificar as expectativas dos usuários.

Acreditamos que o React Native permite que os desenvolvedores atendam às expectativas dos usuários enquanto também ganham os benefícios de uma melhor experiência de desenvolvedor. Nesta seção, compartilhamos o seguinte:

1. Ao abraçar as restrições da plataforma, na verdade melhoramos a experiência em outras plataformas.
2. Podemos aprender com o conhecimento institucional para construir abstrações cross-platform de nível superior.
3. Outros participantes em cada plataforma nos inspiram a construir melhores experiências de desenvolvedor e usuário.

### Abraçando as Restrições da Plataforma

<!-- alex ignore easy -->

Hardware de dispositivo específico ou expectativas do usuário impõem restrições e requisitos únicos. Como exemplo, a memória é tipicamente mais restrita no Android e headsets VR do que no iOS, macOS e Windows. Como outro exemplo, os usuários esperam que aplicativos móveis iniciem quase instantaneamente, mas ficam menos frustrados quando aplicativos desktop demoram mais para iniciar. **Descobrimos que ao abordar esses problemas com React Native, podemos mais facilmente emprestar lições aprendidas e código escrito para uma plataforma, e aplicá-los a outras plataformas.**

<figure>
  <img src="/blog/assets/many-platform-vision-facebook-dating.png" alt="Screenshot of Facebook Dating on mobile" />
  <figcaption>
    React Native e Relay alimentam mais de 1000 superfícies do Facebook no Android e iOS.
  </figcaption>
</figure>

Por exemplo, o React Native depende de uma otimização conhecida como "view flattening" que é crítica para reduzir o uso de memória no Android. Nunca construímos esta otimização para iOS porque ele não tem as mesmas restrições de memória. Nos últimos anos, ao construirmos nosso novo renderer cross-platform, tivemos que reimplementar "view flattening". Mas desta vez, foi escrito em C++ em vez de Java específico da plataforma. Experimentar esta mesma otimização no iOS agora era apenas uma questão de apertar um botão. No aplicativo de produção do Facebook, observamos que isso melhorou o desempenho no iOS! Provavelmente nunca teríamos construído isso para iOS, mas nosso investimento no Android foi capaz de beneficiar nosso investimento no iOS.

### Aprendendo com o Conhecimento Institucional

Uma das razões pelas quais o React Native foi originalmente criado foi para reduzir silos de engenharia. Há uma tendência de engenheiros Android ficarem isolados de engenheiros iOS trabalhando no mesmo produto. Engenheiros Android revisam código para engenheiros Android e participam de meetups e conferências Android. Engenheiros iOS revisam código para engenheiros iOS e participam de meetups e conferências iOS. Engenheiros trabalhando em diferentes plataformas trazem conhecimento de domínio e institucional único sobre como construir grandes experiências de produto.

Um dos melhores resultados de frameworks cross-platform como React Native é como eles reúnem engenheiros com conhecimento de domínio vastamente diferente. **Acreditamos que ao atingir mais plataformas, podemos acelerar a polinização cruzada de conhecimento institucional entre especialistas de plataforma.**

Como exemplo, as abstrações de acessibilidade no React Native são influenciadas por como Android, iOS e web abordam a acessibilidade de maneiras diferentes. Isso nos permitiu construir uma interface comum que melhora como as dicas de acessibilidade são tratadas em ambas as plataformas móveis.

Como outro exemplo, nossa pesquisa sobre percepção do usuário de velocidade na web levou a recursos concorrentes como Suspense. No último ano, esses recursos foram testados pelo novo site [Facebook.com](https://facebook.com/). Agora, com nosso novo renderer, esses recursos estão chegando ao React Native e influenciando como projetamos agendamento de eventos e prioridades. O investimento da equipe do React em melhorar a experiência web está beneficiando o React Native para plataformas nativas.

### Competição Impulsiona Inovação

Além de engenheiros específicos de domínio e meetups e conferências, cada plataforma também traz outros participantes únicos resolvendo problemas semelhantes. Na web, o React (que alimenta diretamente o React Native) frequentemente se inspira em outros frameworks web open source como [Vue](https://vuejs.org/), [Preact](https://preactjs.com/) e [Svelte](https://svelte.dev/). No mobile, o React Native tem sido inspirado por outros frameworks móveis open source, e temos aprendido com outros frameworks móveis construídos dentro do Facebook.

**Acreditamos que a competição leva a melhores resultados para todos no longo prazo.** Ao estudar o que torna outros participantes em cada plataforma excelentes, podemos aprender lições que podem se aplicar a outras plataformas. Por exemplo, a corrida para simplificar sites complexos influenciou o desenvolvimento do React e deu ao React Native uma vantagem inicial para oferecer um framework declarativo para aplicativos móveis. A demanda por ciclos de iteração mais rápidos e tempos de build para a web também levou ao desenvolvimento do Fast Refresh, que beneficiou significativamente o React Native. Da mesma forma, otimizações de desempenho em nossos frameworks móveis internos — especialmente em torno de busca de dados e paralelização — nos desafiaram a melhorar o React Native de uma forma que também influenciou o React quando construímos o novo site [Facebook.com](https://facebook.com/).

<figure>
  <img src="/blog/assets/many-platform-vision-facebook-website.png" alt="Screenshot of the Facebook.com website" />
  <figcaption>
    React e Relay alimentam o site <a href="https://facebook.com/">Facebook.com</a>.
  </figcaption>
</figure>

## Expandindo para Novas Plataformas

O React e o React Native estão em um ponto de virada. O React [começou a estrada para um lançamento do React 18](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html), e [o novo renderer do React Native agora está totalmente alimentando os aplicativos móveis do Facebook](https://twitter.com/reactnative/status/1415099806507167745). Nossa equipe cresceu substancialmente este ano para suportar a crescente adoção no Facebook. Equipes desenvolvendo em outras plataformas notaram a adoção e veem a oportunidade de também colher os benefícios do React Native.

**No último ano, temos feito parceria com a Microsoft e a equipe do Messenger para criar uma experiência de chamada de vídeo verdadeiramente nativa no Windows e macOS.** Devido ao alto escrutínio que colocamos no tempo de inicialização para aplicativos móveis, nossa implementação inicial de chamada de vídeo desktop usando React Native superou completamente o desempenho da implementação Electron que substituiu. Nas primeiras semanas de construção desta experiência, gravamos vídeos de nós redimensionando uma janela com várias chamadas de vídeo ao vivo e nos maravilhamos com as taxas de quadros suaves.

Construir para desktop tem sido muito emocionante para nós. Aplicamos o que sabemos sobre construir experiências móveis e as aplicamos ao desktop com os olhos bem abertos. Expandimos nossos horizontes com múltiplas janelas filhas, barras de menu, bandejas do sistema e muito mais. À medida que continuamos colaborando em novos recursos do Messenger para desktop, esperamos encontrar oportunidades que influenciem como construímos na web e mobile. Se você quer ficar atualizado, nosso trabalho de colaboração em desktop está acontecendo [no GitHub](https://github.com/microsoft/react-native-windows).

<figure>
  <img src="/blog/assets/many-platform-vision-messenger-desktop.png" alt="Screenshot of the Messenger app on macOS" />
  <figcaption>
    React Native alimenta Chamadas de Vídeo no Messenger para Windows e macOS.
  </figcaption>
</figure>

**Também estamos fazendo parceria mais estreitamente com [Facebook Reality Labs](https://tech.fb.com/ar-vr/) para entender como o React está posicionado de forma única para entregar experiências de realidade virtual no Oculus.** Construir experiências em VR com React Native será particularmente interessante devido a restrições de memória mais apertadas e sensibilidade do usuário à latência de interação.

Semelhante a como abordamos o React Native para mobile, estaremos validando nossa tecnologia na escala do Facebook antes de compartilhar qualquer coisa publicamente. Muito ainda está mudando e ainda temos muitas perguntas. Queremos ter confiança de que a tecnologia está pronta para produção e confiável antes de compartilhar com a comunidade.

Embora a maior parte do desenvolvimento para VR ainda seja interna, esperamos compartilhar mais assim que pudermos. Também antecipamos que melhorias no React Native para VR aparecerão no open source. Por exemplo, antecipamos que projetos para reduzir o uso de memória para casos de uso de VR também reduzirão o uso de memória para React Native em experiências mobile e desktop.

<figure>
  <img src="/blog/assets/many-platform-vision-oculus-home.png" alt="Screenshot of Oculus Home in virtual reality" />
  <figcaption>
    React e Relay alimentam o Oculus Home e muitas outras experiências de realidade virtual.
  </figcaption>
</figure>

Quando refletimos sobre como a indústria adotou o React, sempre houve um apetite na comunidade pelo React em mais plataformas. Mesmo antes de anunciarmos o React Native para a comunidade, a Netflix já estava criando o Gibbon, seu renderer personalizado para construir experiências de TV com React. E antes do Facebook começar a construir o Messenger para desktop, [a Microsoft já estava usando React para construir experiências desktop nativas no Office e Windows 10](https://www.youtube.com/watch?v=IUMWFExtDSg&t=382s).

## Resumo

Em resumo, nossa visão é expandir o alcance do React Native além do mobile e já começamos ao fazer parceria com equipes de desktop e VR no Facebook. Sabemos que quando abraçamos as restrições da plataforma de cada plataforma, aprendemos com o conhecimento institucional e coletamos inspiração de outros participantes, isso beneficia todas as plataformas no ecossistema. E mais importante, ao fazer isso, permanecemos fiéis aos [nossos princípios orientadores](https://reactnative.dev/blog/2020/07/17/react-native-principles).

Estamos animados com o que está por vir à medida que continuamos a explorar o que muitas plataformas desbloqueiam para o React Native. Conecte-se conosco ([@reactnative](https://twitter.com/reactnative)) para mais atualizações e compartilhe seus pensamentos!
