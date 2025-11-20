---
ia-translated: true
id: app-extensions
title: App Extensions
---

App extensions permitem que você forneça funcionalidade e conteúdo personalizados fora do seu aplicativo principal. Existem diferentes tipos de app extensions no iOS, e todos são abordados no [App Extension Programming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/index.html#//apple_ref/doc/uid/TP40014214-CH20-SW1). Neste guia, vamos cobrir brevemente como você pode aproveitar app extensions no iOS.

## Uso de memória em extensions

Como essas extensions são carregadas fora do sandbox regular do aplicativo, é altamente provável que várias dessas app extensions sejam carregadas simultaneamente. Como você pode esperar, essas extensions têm limites pequenos de uso de memória. Mantenha isso em mente ao desenvolver suas app extensions. É sempre altamente recomendado testar seu aplicativo em um dispositivo real, e ainda mais ao desenvolver app extensions: com muita frequência, desenvolvedores descobrem que sua extension funciona bem no iOS Simulator, apenas para receber relatórios de usuários de que sua extension não está carregando em dispositivos reais.

### Today widget

O limite de memória de um Today widget é de 16 MB. Como acontece, implementações de Today widget usando React Native podem funcionar de forma não confiável porque o uso de memória tende a ser muito alto. Você pode saber se seu Today widget está excedendo o limite de memória se ele exibir a mensagem 'Unable to Load':

![](/docs/assets/TodayWidgetUnableToLoad.jpg)

Sempre certifique-se de testar suas app extensions em um dispositivo real, mas esteja ciente de que isso pode não ser suficiente, especialmente ao lidar com Today widgets. Builds configurados para debug têm mais probabilidade de exceder os limites de memória, enquanto builds configurados para release não falham imediatamente. Recomendamos fortemente que você use o [Xcode's Instruments](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/index.html) para analisar seu uso de memória no mundo real, pois é muito provável que seu build configurado para release esteja muito perto do limite de 16 MB. Em situações como essas, você pode rapidamente ultrapassar o limite de 16 MB ao realizar operações comuns, como buscar dados de uma API.

Para experimentar com os limites de implementações de Today widget em React Native, tente estender o projeto de exemplo em [react-native-today-widget](https://github.com/matejkriz/react-native-today-widget/).

### Outras app extensions

Outros tipos de app extensions têm limites de memória maiores do que o Today widget. Por exemplo, extensions de Custom Keyboard são limitadas a 48 MB, e extensions de Share são limitadas a 120 MB. Implementar tais app extensions com React Native é mais viável. Um exemplo de prova de conceito é [react-native-ios-share-extension](https://github.com/andrewsardone/react-native-ios-share-extension).
