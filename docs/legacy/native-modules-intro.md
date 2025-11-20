---
ia-translated: true
id: native-modules-intro
title: Native Modules Intro
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

Às vezes um aplicativo React Native precisa acessar uma API de plataforma nativa que não está disponível por padrão em JavaScript, por exemplo as APIs nativas para acessar Apple ou Google Pay. Talvez você queira reutilizar algumas bibliotecas existentes em Objective-C, Swift, Java ou C++ sem ter que reimplementá-las em JavaScript, ou escrever algum código de alta performance e multi-threaded para coisas como processamento de imagem.

O sistema NativeModule expõe instâncias de classes Java/Objective-C/C++ (nativas) para JavaScript (JS) como objetos JS, permitindo assim que você execute código nativo arbitrário de dentro do JS. Embora não esperemos que este recurso faça parte do processo de desenvolvimento usual, é essencial que ele exista. Se o React Native não exporta uma API nativa que seu aplicativo JS precisa, você deve ser capaz de exportá-la você mesmo!

## Native Module Setup

Existem diferentes maneiras de escrever um native module para sua aplicação React Native:

1. Criando uma biblioteca local que pode ser importada em sua aplicação React Native. Leia o guia [Creating local libraries](local-library-setup) para aprender mais.
2. Diretamente dentro dos projetos iOS/Android da sua aplicação React Native
3. Como um pacote NPM que pode ser instalado como uma dependência por sua/outras aplicações React Native.

Este guia primeiro irá guiá-lo através da implementação de um native module diretamente dentro de uma aplicação React Native. No entanto, o native module que você construir no guia a seguir pode ser distribuído como um pacote NPM. Confira o guia [Setting Up a Native Module as an NPM Package](native-modules-setup) se você está interessado em fazer isso.

## Getting Started

Nas seções a seguir, vamos guiá-lo através de guias sobre como construir um native module diretamente dentro de uma aplicação React Native. Como pré-requisito, você precisará de uma aplicação React Native para trabalhar. Você pode seguir os passos [aqui](../getting-started) para configurar uma aplicação React Native se você ainda não tiver uma.

Imagine que você quer acessar as APIs de calendário nativas do iOS/Android a partir de JavaScript dentro de uma aplicação React Native para criar eventos de calendário. React Native não expõe uma API JavaScript para comunicar com as bibliotecas de calendário nativas. No entanto, através de native modules, você pode escrever código nativo que comunica com APIs de calendário nativas. Então você pode invocar esse código nativo através de JavaScript em sua aplicação React Native.

Nas seções a seguir você criará tal native module de Calendar tanto para [Android](native-modules-android) quanto para [iOS](native-modules-ios).
