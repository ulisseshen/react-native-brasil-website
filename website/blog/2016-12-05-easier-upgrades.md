---
ia-translated: true
title: Atualizações Mais Fáceis Graças ao Git
author: Nicolas Cuillery
authorTitle: JavaScript consultant and trainer at Zenika
authorURL: 'https://twitter.com/ncuillery'
authorImageURL: 'https://fr.gravatar.com/userimage/78328995/184460def705a160fd8edadc04f60eaf.jpg?size=128'
authorTwitter: ncuillery
tags: [announcement]
---

Atualizar para novas versões do React Native tem sido difícil. Você pode ter visto algo assim antes:

![](/blog/assets/git-upgrade-conflict.png)

Nenhuma dessas opções é ideal. Ao sobrescrever o arquivo perdemos nossas mudanças locais. Ao não sobrescrever, não obtemos as últimas atualizações.

Hoje estou orgulhoso de introduzir uma nova ferramenta que ajuda a resolver este problema. A ferramenta é chamada `react-native-git-upgrade` e usa Git por trás dos panos para resolver conflitos automaticamente sempre que possível.

## Uso

> **Requisito**: Git precisa estar disponível no `PATH`. Seu projeto não precisa ser gerenciado pelo Git.

Instale `react-native-git-upgrade` globalmente:

```shell
$ npm install -g react-native-git-upgrade
```

ou, usando [Yarn](https://yarnpkg.com/):

```shell
$ yarn global add react-native-git-upgrade
```

Então, execute-o dentro do diretório do seu projeto:

```shell
$ cd MyProject
$ react-native-git-upgrade 0.38.0
```

> Nota: **Não** execute 'npm install' para instalar uma nova versão do `react-native`. A ferramenta precisa ser capaz de comparar o template do projeto antigo e novo para funcionar corretamente. Simplesmente execute-o dentro da pasta do seu aplicativo como mostrado acima, enquanto ainda estiver na versão antiga.

Exemplo de saída:

![](/blog/assets/git-upgrade-output.png)

Você também pode executar `react-native-git-upgrade` sem argumentos para atualizar para a versão mais recente do React Native.

Tentamos preservar suas mudanças nos arquivos de build Android e iOS, então você não precisa executar `react-native link` após uma atualização.

Projetamos a implementação para ser o menos intrusiva possível. É inteiramente baseada em um repositório Git local criado dinamicamente em um diretório temporário. Não interferirá com o repositório do seu projeto (não importa qual VCS você use: Git, SVN, Mercurial, ... ou nenhum). Suas fontes são restauradas em caso de erros inesperados.

## Como funciona?

O passo chave é gerar um patch Git. O patch contém todas as mudanças feitas nos templates React Native entre a versão que seu aplicativo está usando e a nova versão.

Para obter este patch, precisamos gerar um aplicativo a partir dos templates incorporados no pacote `react-native` dentro do seu diretório `node_modules` (estes são os mesmos templates que o comando `react-native init` usa). Então, depois que os aplicativos nativos foram gerados a partir dos templates tanto na versão atual quanto na nova versão, o Git é capaz de produzir um patch que é adaptado ao seu projeto (ou seja, contendo o nome do seu aplicativo):

```
[...]

diff --git a/ios/MyAwesomeApp/Info.plist b/ios/MyAwesomeApp/Info.plist
index e98ebb0..2fb6a11 100644
--- a/ios/MyAwesomeApp/Info.plist
+++ b/ios/MyAwesomeApp/Info.plist
@@ -45,7 +45,7 @@
        <dict>
            <key>localhost</key>
            <dict>
-               <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
+               <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
            </dict>
        </dict>
[...]
```

Tudo o que precisamos agora é aplicar este patch aos seus arquivos de origem. Enquanto o antigo processo de `react-native upgrade` teria solicitado a você qualquer pequena diferença, o Git é capaz de mesclar a maioria das mudanças automaticamente usando seu algoritmo de merge de 3 vias e eventualmente nos deixar com delimitadores de conflito familiares:

```
    13B07F951A680F5B00A75B9A /* Release */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
<<<<<<< ours
        CODE_SIGN_IDENTITY = "iPhone Developer";
        FRAMEWORK_SEARCH_PATHS = (
          "$(inherited)",
          "$(PROJECT_DIR)/HockeySDK.embeddedframework",
          "$(PROJECT_DIR)/HockeySDK-iOS/HockeySDK.embeddedframework",
        );
=======
        CURRENT_PROJECT_VERSION = 1;
>>>>>>> theirs
        HEADER_SEARCH_PATHS = (
          "$(inherited)",
          /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
          "$(SRCROOT)/../node_modules/react-native/React/**",
          "$(SRCROOT)/../node_modules/react-native-code-push/ios/CodePush/**",
        );
```

Esses conflitos geralmente são fáceis de raciocinar. O delimitador **ours** representa "sua equipe", enquanto **theirs** pode ser visto como "a equipe React Native".

## Por que introduzir um novo pacote global?

React Native vem com um CLI global (o pacote [react-native-cli](https://www.npmjs.com/package/react-native-cli)) que delega comandos ao CLI local incorporado no diretório `node_modules/react-native/local-cli`.

Como mencionamos acima, o processo precisa ser iniciado a partir da sua versão atual do React Native. Se tivéssemos incorporado a implementação no local-cli, você não seria capaz de aproveitar este recurso ao usar versões antigas do React Native. Por exemplo, você não seria capaz de atualizar de 0.29.2 para 0.38.0 se este novo código de atualização só fosse lançado na 0.38.0.

Atualizar com base em Git é uma grande melhoria na experiência do desenvolvedor e é importante disponibilizá-lo para todos. Ao usar um pacote separado [react-native-git-upgrade](https://www.npmjs.com/package/react-native-git-upgrade) instalado globalmente, você pode usar este novo código hoje, independentemente da versão do React Native que seu projeto está usando.

Mais uma razão é a recente [eliminação do Yeoman](https://twitter.com/martinkonicek/status/800730190141857793) por Martin Konicek. Não queríamos trazer essas dependências do Yeoman de volta para o pacote `react-native` para poder avaliar o template antigo e criar o patch.

## Experimente e dê feedback

Para concluir, eu diria, aproveite o recurso e sinta-se à vontade para [sugerir melhorias, relatar problemas](https://github.com/facebook/react-native/issues) e especialmente [enviar pull requests](https://github.com/facebook/react-native/pulls). Cada ambiente é um pouco diferente e cada projeto React Native é diferente, e precisamos do seu feedback para fazer isso funcionar bem para todos.

### Obrigado!

Gostaria de agradecer às incríveis empresas [Zenika](https://www.zenika.com) e [M6 Web (arquivado)](https://web.archive.org/web/20161230163633/http://www.groupem6.fr:80/le-groupe_en/activites/diversifications/m6-web.html) sem as quais nada disso teria sido possível!
