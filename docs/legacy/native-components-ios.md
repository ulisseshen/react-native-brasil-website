---
ia-translated: true
id: native-components-ios
title: iOS Native UI Components
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

Existem toneladas de widgets de UI nativos prontos para serem usados nos aplicativos mais recentes - alguns deles fazem parte da plataforma, outros estão disponíveis como bibliotecas de terceiros, e ainda mais podem estar em uso em seu próprio portfólio. React Native já possui vários dos componentes de plataforma mais críticos encapsulados, como `ScrollView` e `TextInput`, mas não todos eles, e certamente não aqueles que você possa ter escrito para um aplicativo anterior. Felizmente, podemos encapsular esses componentes existentes para integração perfeita com sua aplicação React Native.

Como o guia de native module, este também é um guia mais avançado que assume que você está um pouco familiarizado com programação iOS. Este guia mostrará como construir um componente de UI nativo, guiando você através da implementação de um subconjunto do componente `MapView` existente disponível na biblioteca principal do React Native.

## iOS MapView example

Digamos que queremos adicionar um Map interativo ao nosso aplicativo - podemos muito bem usar [`MKMapView`](https://developer.apple.com/library/prerelease/mac/documentation/MapKit/Reference/MKMapView_Class/index.html), só precisamos torná-lo utilizável a partir de JavaScript.

Views nativas são criadas e manipuladas por subclasses de `RCTViewManager`. Essas subclasses são similares em função a view controllers, mas são essencialmente singletons - apenas uma instância de cada é criada pela bridge. Elas expõem views nativas para o `RCTUIManager`, que delega de volta para elas para definir e atualizar as propriedades das views conforme necessário. Os `RCTViewManager`s também são tipicamente os delegates para as views, enviando eventos de volta para JavaScript via a bridge.

Para expor uma view você pode:

- Fazer subclasse de `RCTViewManager` para criar um manager para seu componente.
- Adicionar a macro marker `RCT_EXPORT_MODULE()`.
- Implementar o método `-(UIView *)view`.

```objectivec title='RNTMapManager.m'
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
```

:::note
Não tente definir as propriedades `frame` ou `backgroundColor` na instância `UIView` que você expõe através do método `-view`.
React Native sobrescreverá os valores definidos por sua classe customizada para corresponder às props de layout do seu componente JavaScript.
Se você precisa desta granularidade de controle, pode ser melhor envolver a instância `UIView` que você deseja estilizar em outra `UIView` e retornar a `UIView` wrapper.
Veja [Issue 2948](https://github.com/facebook/react-native/issues/2948) para mais contexto.
:::

:::info
No exemplo acima, prefixamos nosso nome de classe com `RNT`. Prefixos são usados para evitar colisões de nome com outros frameworks.
Frameworks da Apple usam prefixos de duas letras, e React Native usa `RCT` como prefixo. Para evitar colisões de nome, recomendamos usar um prefixo de três letras diferente de `RCT` em suas próprias classes.
:::

Então você precisa de um pouco de JavaScript para tornar isso um componente React utilizável:

```tsx {3} title="MapView.tsx"
import {requireNativeComponent} from 'react-native';

export default requireNativeComponent('RNTMap');
```

A função `requireNativeComponent` resolve automaticamente `RNTMap` para `RNTMapManager` e exporta nossa view nativa para uso em JavaScript.

```tsx title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  return <MapView style={{flex: 1}} />;
}
```

:::note
Ao renderizar, não esqueça de esticar a view, caso contrário você ficará olhando para uma tela em branco.
:::

Este é agora um componente de view de mapa nativo totalmente funcional em JavaScript, completo com pinch-zoom e outros gestos nativos suportados. No entanto, ainda não podemos realmente controlá-lo a partir de JavaScript.

## Properties

A primeira coisa que podemos fazer para tornar este componente mais utilizável é fazer bridge sobre algumas propriedades nativas. Digamos que queremos ser capazes de desabilitar o zoom e especificar a região visível. Desabilitar o zoom é um booleano, então adicionamos esta linha:

```objectivec title='RNTMapManager.m'
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
```

Note que especificamos explicitamente o tipo como `BOOL` - React Native usa `RCTConvert` por baixo dos panos para converter todos os tipos de dados diferentes ao comunicar pela bridge, e valores ruins mostrarão erros convenientes em "RedBox" para que você saiba que há um problema o mais rápido possível. Quando as coisas são diretas assim, toda a implementação é cuidada para você por esta macro.

Agora para realmente desabilitar o zoom, definimos a propriedade em JavaScript:

```tsx {4} title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  return <MapView zoomEnabled={false} style={{flex: 1}} />;
}
```

Para documentar as propriedades (e quais valores elas aceitam) do nosso componente MapView, adicionaremos um componente wrapper e documentaremos a interface com TypeScript:

```tsx {6-9} title="MapView.tsx"
import {requireNativeComponent} from 'react-native';

const RNTMap = requireNativeComponent('RNTMap');

export default function MapView(props: {
  /**
   * Whether the user may use pinch gestures to zoom in and out.
   */
  zoomEnabled?: boolean;
}) {
  return <RNTMap {...props} />;
}
```

Agora temos um componente wrapper bem documentado para trabalhar.

Em seguida, vamos adicionar a prop mais complexa `region`. Começamos adicionando o código nativo:

```objectivec title='RNTMapManager.m'
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}
```

Ok, isso é mais complicado do que o caso `BOOL` que tínhamos antes. Agora temos um tipo `MKCoordinateRegion` que precisa de uma função de conversão, e temos código customizado para que a view anime quando definimos a region a partir de JS. Dentro do corpo da função que fornecemos, `json` refere-se ao valor bruto que foi passado do JS. Também há uma variável `view` que nos dá acesso à instância da view do manager, e um `defaultView` que usamos para resetar a propriedade de volta ao valor padrão se JS nos enviar um sentinel null.

Você pode escrever qualquer função de conversão que quiser para sua view - aqui está a implementação para `MKCoordinateRegion` via uma categoria em `RCTConvert`. Ela usa uma categoria já existente do ReactNative `RCTConvert+CoreLocation`:

```objectivec title='RNTMapManager.m'
#import "RCTConvert+Mapkit.h"
```

```objectivec title='RCTConvert+Mapkit.h'
#import <MapKit/MapKit.h>
#import <React/RCTConvert.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert+CoreLocation.h>

@interface RCTConvert (Mapkit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json;
+ (MKCoordinateRegion)MKCoordinateRegion:(id)json;

@end

@implementation RCTConvert(MapKit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json
{
  json = [self NSDictionary:json];
  return (MKCoordinateSpan){
    [self CLLocationDegrees:json[@"latitudeDelta"]],
    [self CLLocationDegrees:json[@"longitudeDelta"]]
  };
}

+ (MKCoordinateRegion)MKCoordinateRegion:(id)json
{
  return (MKCoordinateRegion){
    [self CLLocationCoordinate2D:json],
    [self MKCoordinateSpan:json]
  };
}

@end
```

Essas funções de conversão são projetadas para processar com segurança qualquer JSON que o JS possa lançar nelas, exibindo erros em "RedBox" e retornando valores de inicialização padrão quando chaves ausentes ou outros erros de desenvolvedor são encontrados.

Para finalizar o suporte para a prop `region`, podemos documentá-la com TypeScript:

```tsx {6-25} title="MapView.tsx"
import {requireNativeComponent} from 'react-native';

const RNTMap = requireNativeComponent('RNTMap');

export default function MapView(props: {
  /**
   * The region to be displayed by the map.
   *
   * The region is defined by the center coordinates and the span of
   * coordinates to display.
   */
  region?: {
    /**
     * Coordinates for the center of the map.
     */
    latitude: number;
    longitude: number;

    /**
     * Distance between the minimum and the maximum latitude/longitude
     * to be displayed.
     */
    latitudeDelta: number;
    longitudeDelta: number;
  };
  /**
   * Whether the user may use pinch gestures to zoom in and out.
   */
  zoomEnabled?: boolean;
}) {
  return <RNTMap {...props} />;
}
```

Agora podemos fornecer a prop `region` para `MapView`:

```tsx {4-9,12} title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  const region = {
    latitude: 37.48,
    longitude: -122.16,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  return (
    <MapView
      region={region}
      zoomEnabled={false}
      style={{flex: 1}}
    />
  );
}
```

## Events

Então agora temos um componente de mapa nativo que podemos controlar livremente a partir de JS, mas como lidamos com eventos do usuário, como pinch-zooms ou pan para mudar a região visível?

Até agora só retornamos uma instância `MKMapView` do método `-(UIView *)view` do nosso manager. Não podemos adicionar novas propriedades a `MKMapView` então precisamos criar uma nova subclasse de `MKMapView` que usamos para nossa View. Podemos então adicionar um callback `onRegionChange` nesta subclasse:

```objectivec title='RNTMapView.h'
#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end
```

```objectivec title='RNTMapView.m'
#import "RNTMapView.h"

@implementation RNTMapView

@end
```

Note que todos os `RCTBubblingEventBlock` devem ser prefixados com `on`. Em seguida, declare uma propriedade de event handler em `RNTMapManager`, torne-a um delegate para todas as views que ela expõe, e encaminhe eventos para JS chamando o bloco de event handler a partir da view nativa.

```objectivec {9,17,31-48} title='RNTMapManager.m'
#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

#import "RNTMapView.h"
#import "RCTConvert+Mapkit.h"

@interface RNTMapManager : RCTViewManager <MKMapViewDelegate>
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

- (UIView *)view
{
  RNTMapView *map = [RNTMapView new];
  map.delegate = self;
  return map;
}

#pragma mark MKMapViewDelegate

- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onRegionChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}
@end
```

No método delegate `-mapView:regionDidChangeAnimated:` o bloco de event handler é chamado na view correspondente com os dados da region. Chamar o bloco de event handler `onRegionChange` resulta em chamar a mesma prop de callback em JavaScript. Este callback é invocado com o evento bruto, que normalmente processamos no componente wrapper para simplificar a API:

```tsx {3-10,14-17,19} title="MapView.tsx"
// ...

type RegionChangeEvent = {
  nativeEvent: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export default function MapView(props: {
  // ...
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onRegionChange: (event: RegionChangeEvent) => unknown;
}) {
  return <RNTMap {...props} onRegionChange={onRegionChange} />;
}
```

```tsx {6-9,14} title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  // ...

  const onRegionChange = useCallback(event => {
    const {region} = event.nativeEvent;
    // Do something with `region.latitude`, etc.
  });

  return (
    <MapView
      // ...
      onRegionChange={onRegionChange}
    />
  );
}
```

## Handling multiple native views

Uma view React Native pode ter mais de uma view filho na árvore de view, por exemplo:

```tsx
<View>
  <MyNativeView />
  <MyNativeView />
  <Button />
</View>
```

Neste exemplo, a classe `MyNativeView` é um wrapper para um `NativeComponent` e expõe métodos, que serão chamados na plataforma iOS. `MyNativeView` é definido em `MyNativeView.ios.js` e contém métodos proxy de `NativeComponent`.

Quando o usuário interage com o componente, como clicar no botão, o `backgroundColor` de `MyNativeView` muda. Neste caso `UIManager` não saberia qual `MyNativeView` deveria ser tratado e qual deveria mudar o `backgroundColor`. Abaixo você encontrará uma solução para este problema:

```tsx
<View>
  <MyNativeView ref={this.myNativeReference} />
  <MyNativeView ref={this.myNativeReference2} />
  <Button
    onPress={() => {
      this.myNativeReference.callNativeMethod();
    }}
  />
</View>
```

Agora o componente acima tem uma referência a um `MyNativeView` específico que nos permite usar uma instância específica de `MyNativeView`. Agora o botão pode controlar qual `MyNativeView` deveria mudar seu `backgroundColor`. Neste exemplo, vamos assumir que `callNativeMethod` muda o `backgroundColor`.

```tsx title="MyNativeView.ios.tsx"
class MyNativeView extends React.Component {
  callNativeMethod = () => {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.getViewManagerConfig('RNCMyNativeView').Commands
        .callNativeMethod,
      [],
    );
  };

  render() {
    return <NativeComponent ref={NATIVE_COMPONENT_REF} />;
  }
}
```

`callNativeMethod` é nosso método iOS customizado que, por exemplo, muda o `backgroundColor` que é exposto através de `MyNativeView`. Este método usa `UIManager.dispatchViewManagerCommand` que precisa de 3 parâmetros:

- `(nonnull NSNumber \*)reactTag`  -  id da react view.
- `commandID:(NSInteger)commandID`  -  Id do método nativo que deve ser chamado
- `commandArgs:(NSArray<id> \*)commandArgs`  -  Args do método nativo que podemos passar de JS para nativo.

```objectivec title='RNCMyNativeViewManager.m'
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>

RCT_EXPORT_METHOD(callNativeMethod:(nonnull NSNumber*) reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        NativeView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[NativeView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        [view callNativeMethod];
    }];

}
```

Aqui o `callNativeMethod` é definido no arquivo `RNCMyNativeViewManager.m` e contém apenas um parâmetro que é `(nonnull NSNumber*) reactTag`. Esta função exportada encontrará uma view específica usando `addUIBlock` que contém o parâmetro `viewRegistry` e retorna o componente baseado em `reactTag` permitindo que ele chame o método no componente correto.

## Styles

Como todas as nossas views nativas react são subclasses de `UIView`, a maioria dos atributos de estilo funcionará como você esperaria out of the box. Alguns componentes vão querer um estilo padrão, no entanto, por exemplo `UIDatePicker` que é um tamanho fixo. Este estilo padrão é importante para o algoritmo de layout funcionar como esperado, mas também queremos ser capazes de sobrescrever o estilo padrão ao usar o componente. `DatePickerIOS` faz isso envolvendo o componente nativo em uma view extra, que tem estilo flexível, e usando um estilo fixo (que é gerado com constantes passadas do nativo) no componente nativo interno:

```tsx title="DatePickerIOS.ios.tsx"
import {UIManager} from 'react-native';
const RCTDatePickerIOSConsts = UIManager.RCTDatePicker.Constants;
...
  render: function() {
    return (
      <View style={this.props.style}>
        <RCTDatePickerIOS
          ref={DATEPICKER}
          style={styles.rkDatePickerIOS}
          ...
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  rkDatePickerIOS: {
    height: RCTDatePickerIOSConsts.ComponentHeight,
    width: RCTDatePickerIOSConsts.ComponentWidth,
  },
});
```

As constantes `RCTDatePickerIOSConsts` são exportadas do nativo pegando o frame real do componente nativo assim:

```objectivec title='RCTDatePickerManager.m'
- (NSDictionary *)constantsToExport
{
  UIDatePicker *dp = [[UIDatePicker alloc] init];
  [dp layoutIfNeeded];

  return @{
    @"ComponentHeight": @(CGRectGetHeight(dp.frame)),
    @"ComponentWidth": @(CGRectGetWidth(dp.frame)),
    @"DatePickerModes": @{
      @"time": @(UIDatePickerModeTime),
      @"date": @(UIDatePickerModeDate),
      @"datetime": @(UIDatePickerModeDateAndTime),
    }
  };
}
```

Este guia cobriu muitos dos aspectos de fazer bridge sobre componentes nativos customizados, mas há ainda mais que você pode precisar considerar, como hooks customizados para inserir e fazer layout de subviews. Se você quiser ir ainda mais fundo, confira o [código fonte](https://github.com/facebook/react-native/tree/main/packages/react-native/React/Views) de alguns dos componentes implementados.
