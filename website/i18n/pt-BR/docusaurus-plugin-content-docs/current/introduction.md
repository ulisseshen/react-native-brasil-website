---
ia-translated: true
id: getting-started
title: Introdução
description: Este guia útil apresenta os pré-requisitos para aprender React Native, usar esta documentação e configurar seu ambiente.
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="content-banner">
  Bem-vindo ao início da sua jornada com React Native! Se você está procurando instruções para começar, elas foram movidas para <a href="environment-setup">sua própria seção</a>. Continue lendo para uma introdução à documentação, Native Components, React e muito mais!
  <img className="content-banner-img" src="/docs/assets/p_android-ios-devices.svg" alt=" " />
</div>

Muitos tipos diferentes de pessoas usam React Native: desde desenvolvedores avançados de iOS até iniciantes em React, até pessoas que estão começando a programar pela primeira vez em suas carreiras. Esta documentação foi escrita para todos os aprendizes, não importa seu nível de experiência ou formação.

## Como usar esta documentação

Você pode começar aqui e ler esta documentação linearmente como um livro; ou pode ler as seções específicas que precisar. Já está familiarizado com React? Você pode pular [essa seção](intro-react)—ou lê-la para uma breve revisão.

## Pré-requisitos

Para trabalhar com React Native, você precisará ter um conhecimento dos fundamentos de JavaScript. Se você é novo em JavaScript ou precisa de uma revisão, você pode [mergulhar](https://developer.mozilla.org/en-US/docs/Web/JavaScript) ou [relembrar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) no Mozilla Developer Network.

:::info
Embora façamos o nosso melhor para não assumir conhecimento prévio de React, Android ou iOS, esses são tópicos valiosos de estudo para o aspirante a desenvolvedor React Native. Quando sensato, incluímos links para recursos e artigos que se aprofundam mais.
:::

## Exemplos interativos

Esta introdução permite que você comece imediatamente no seu navegador com exemplos interativos como este:

```SnackPlayer name=Hello%20World
import React from 'react';
import {Text, View} from 'react-native';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};

export default YourApp;
```

O acima é um Snack Player. É uma ferramenta útil criada pela Expo para incorporar e executar projetos React Native e compartilhar como eles renderizam em plataformas como Android e iOS. O código está ao vivo e editável, então você pode brincar diretamente com ele no seu navegador. Vá em frente e tente mudar o texto "Try editing me!" acima para "Hello, world!"

:::tip
Opcionalmente, se você quiser configurar um ambiente de desenvolvimento local, [você pode seguir nosso guia para configurar seu ambiente na sua máquina local](set-up-your-environment) e colar os exemplos de código no seu projeto. (Se você é um desenvolvedor web, você pode já ter um ambiente local configurado para testes de navegador móvel!)
:::

## Notas para desenvolvedores

Pessoas de muitas formações diferentes em desenvolvimento estão aprendendo React Native. Você pode ter experiência com uma variedade de tecnologias, desde web até Android, iOS e muito mais. Tentamos escrever para desenvolvedores de todas as formações. Às vezes fornecemos explicações específicas para uma plataforma ou outra assim:

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android","ios","web"])}>

<TabItem value="android">

:::info
Desenvolvedores Android podem estar familiarizados com este conceito.
:::

</TabItem>
<TabItem value="ios">

:::info
Desenvolvedores iOS podem estar familiarizados com este conceito.
:::

</TabItem>
<TabItem value="web">

:::info
Desenvolvedores web podem estar familiarizados com este conceito.
:::

</TabItem>
</Tabs>

## Formatação

Caminhos de menu são escritos em negrito e usam sinais de maior que para navegar em submenus. Exemplo: **Android Studio > Preferences**

---

Agora que você sabe como este guia funciona, é hora de conhecer a base do React Native: [Native Components](intro-react-native-components.md).
