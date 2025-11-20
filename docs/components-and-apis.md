---
ia-translated: true
id: components-and-apis
title: Componentes e APIs Principais
---

O React Native oferece uma série de [Core Components](intro-react-native-components) integrados e prontos para uso em seu aplicativo. Você pode encontrá-los todos na barra lateral esquerda (ou no menu acima, se estiver em uma tela estreita). Se você não tiver certeza por onde começar, dê uma olhada nas seguintes categorias:

- [Componentes Básicos](components-and-apis#basic-components)
- [Interface do Usuário](components-and-apis#user-interface)
- [List Views](components-and-apis#list-views)
- [Específico do Android](components-and-apis#android-components-and-apis)
- [Específico do iOS](components-and-apis#ios-components-and-apis)
- [Outros](components-and-apis#others)

Você não está limitado aos componentes e APIs fornecidos com o React Native. O React Native tem uma comunidade com milhares de desenvolvedores. Se você estiver procurando por uma biblioteca que faça algo específico, consulte [este guia sobre como encontrar bibliotecas](libraries#finding-libraries).

## Basic Components

A maioria dos aplicativos acabará usando um ou mais desses componentes básicos.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./view">
      <h3>View</h3>
      <p>O componente mais fundamental para construir uma UI.</p>
    </a>
  </div>
  <div className="component">
    <a href="./text">
      <h3>Text</h3>
      <p>Um componente para exibir texto.</p>
    </a>
  </div>
  <div className="component">
    <a href="./image">
      <h3>Image</h3>
      <p>Um componente para exibir imagens.</p>
    </a>
  </div>
  <div className="component">
    <a href="./textinput">
      <h3>TextInput</h3>
      <p>Um componente para inserir texto no aplicativo via teclado.</p>
    </a>
  </div>
  <div className="component">
    <a href="./pressable">
      <h3>Pressable</h3>
      <p>Um componente wrapper que pode detectar vários estágios de interações de pressionamento em qualquer um de seus filhos.</p>
    </a>
  </div>
  <div className="component">
    <a href="./scrollview">
      <h3>ScrollView</h3>
      <p>Fornece um container de rolagem que pode hospedar múltiplos componentes e views.</p>
    </a>
  </div>
  <div className="component">
    <a href="./stylesheet">
      <h3>StyleSheet</h3>
      <p>Fornece uma camada de abstração similar às stylesheets CSS.</p>
    </a>
  </div>
</div>

## User Interface

Esses controles comuns de interface do usuário serão renderizados em qualquer plataforma.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./button">
      <h3>Button</h3>
      <p>Um componente de botão básico para lidar com toques que deve renderizar bem em qualquer plataforma.</p>
    </a>
  </div>
  <div className="component">
    <a href="./switch">
      <h3>Switch</h3>
      <p>Renderiza uma entrada booleana.</p>
    </a>
  </div>
</div>

## List Views

Ao contrário do mais genérico [`ScrollView`](./scrollview), os seguintes componentes de list view renderizam apenas os elementos que estão sendo exibidos na tela no momento. Isso os torna uma escolha performática para exibir listas longas de dados.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./flatlist">
      <h3>FlatList</h3>
      <p>Um componente para renderizar listas roláveis com performance.</p>
    </a>
  </div>
  <div className="component">
    <a href="./sectionlist">
      <h3>SectionList</h3>
      <p>Como o <code>FlatList</code>, mas para listas seccionadas.</p>
    </a>
  </div>
</div>

## Android Components and APIs

Muitos dos seguintes componentes fornecem wrappers para classes Android comumente usadas.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./backhandler">
      <h3>BackHandler</h3>
      <p>Detecta pressionamentos do botão de hardware para navegação de volta.</p>
    </a>
  </div>
  <div className="component">
    <a href="./drawerlayoutandroid">
      <h3>DrawerLayoutAndroid</h3>
      <p>Renderiza um <code>DrawerLayout</code> no Android.</p>
    </a>
  </div>
  <div className="component">
    <a href="./permissionsandroid">
      <h3>PermissionsAndroid</h3>
      <p>Fornece acesso ao modelo de permissões introduzido no Android M.</p>
    </a>
  </div>
  <div className="component">
    <a href="./toastandroid">
      <h3>ToastAndroid</h3>
      <p>Cria um alerta Toast do Android.</p>
    </a>
  </div>
</div>

## iOS Components and APIs

Muitos dos seguintes componentes fornecem wrappers para classes UIKit comumente usadas.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./actionsheetios">
      <h3>ActionSheetIOS</h3>
      <p>API para exibir um action sheet ou share sheet do iOS.</p>
    </a>
  </div>
</div>

## Others

Esses componentes podem ser úteis para determinados aplicativos. Para uma lista exaustiva de componentes e APIs, confira a barra lateral à esquerda (ou o menu acima, se estiver em uma tela estreita).

<div className="component-grid">
  <div className="component">
    <a href="./activityindicator">
      <h3>ActivityIndicator</h3>
      <p>Exibe um indicador de carregamento circular.</p>
    </a>
  </div>
  <div className="component">
    <a href="./alert">
      <h3>Alert</h3>
      <p>Exibe um diálogo de alerta com o título e mensagem especificados.</p>
    </a>
  </div>
  <div className="component">
    <a href="./animated">
      <h3>Animated</h3>
      <p>Uma biblioteca para criar animações fluidas e poderosas que são fáceis de construir e manter.</p>
    </a>
  </div>
  <div className="component">
    <a href="./dimensions">
      <h3>Dimensions</h3>
      <p>Fornece uma interface para obter as dimensões do dispositivo.</p>
    </a>
  </div>
  <div className="component">
    <a href="./keyboardavoidingview">
      <h3>KeyboardAvoidingView</h3>
      <p>Fornece uma view que se move automaticamente para fora do caminho do teclado virtual.</p>
    </a>
  </div>
  <div className="component">
    <a href="./linking">
      <h3>Linking</h3>
      <p>Fornece uma interface geral para interagir com links de aplicativos recebidos e enviados.</p>
    </a>
  </div>
  <div className="component">
    <a href="./modal">
      <h3>Modal</h3>
      <p>Fornece uma maneira simples de apresentar conteúdo acima de uma view envolvente.</p>
    </a>
  </div>
  <div className="component">
    <a href="./pixelratio">
      <h3>PixelRatio</h3>
      <p>Fornece acesso à densidade de pixels do dispositivo.</p>
    </a>
  </div>
  <div className="component">
    <a href="./refreshcontrol">
      <h3>RefreshControl</h3>
      <p>Este componente é usado dentro de um <code>ScrollView</code> para adicionar a funcionalidade de puxar para atualizar.</p>
    </a>
  </div>
  <div className="component">
    <a href="./statusbar">
      <h3>StatusBar</h3>
      <p>Componente para controlar a barra de status do aplicativo.</p>
    </a>
  </div>
</div>
