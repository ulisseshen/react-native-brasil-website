---
id: integration-with-android-fragment
title: Integração com um Android Fragment
ia-translated: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

O guia de [Integração com Aplicações Existentes](/docs/integration-with-existing-apps) detalha como integrar um aplicativo React Native em tela cheia em um aplicativo Android existente como uma **Activity**.

Para usar componentes React Native dentro de **Fragments** em um aplicativo existente requer algumas configurações adicionais.

### 1. Adicione React Native ao seu aplicativo

Siga o guia de [Integração com Aplicações Existentes](/docs/integration-with-existing-apps) até o final para garantir que você possa executar com segurança seu aplicativo React Native em uma Activity em tela cheia.

### 2. Adicione um FrameLayout para o React Native Fragment

Neste exemplo, vamos usar um `FrameLayout` para adicionar um React Native Fragment a uma Activity. Esta abordagem é flexível o suficiente e pode ser adaptada para usar React Native em outros layouts, como Bottom Sheets ou Tab Layouts.

Primeiro, adicione um `<FrameLayout>` com um id, largura e altura ao layout da sua Activity (por exemplo, `main_activity.xml` na pasta `res/layouts`). Este é o layout que você encontrará para renderizar seu React Native Fragment.

```xml
<FrameLayout
    android:id="@+id/react_native_fragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

### 3. Faça sua host Activity implementar `DefaultHardwareBackBtnHandler`

Como sua host activity não é uma `ReactActivity`, você precisa implementar a interface `DefaultHardwareBackBtnHandler` para lidar com o evento de pressionar o botão voltar.
Isso é necessário pelo React Native para lidar com o evento de pressionar o botão voltar.

Vá para sua host activity e certifique-se de que ela implementa a interface `DefaultHardwareBackBtnHandler`:

:::warning Deprecated
`Activity.onBackPressed()` foi [descontinuado](<https://developer.android.com/reference/android/app/Activity#onBackPressed()>) desde o API level 33. Dispositivos Android 16 com aplicativos direcionados ao API level 36 [não chamarão mais](https://developer.android.com/about/versions/16/behavior-changes-16#predictive-back) e [OnBackPressedDispatcher](https://developer.android.com/reference/androidx/activity/OnBackPressedDispatcher) deve ser usado em vez disso.
:::

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

+class MainActivity : AppCompatActivity() {
+class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
            // Handle button click
        }
    }

+   override fun invokeDefaultOnBackPressed() {
+       onBackPressedDispatcher.onBackPressed()
+   }
}
```

</TabItem>
<TabItem value="java">

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

-class MainActivity extends AppCompatActivity {
+class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
            // Handle button click
        });
    }

+   @Override
+   public void invokeDefaultOnBackPressed() {
+       getOnBackPressedDispatcher().onBackPressed();
+   }
}
```

</TabItem>
</Tabs>

### 4. Adicione um React Native Fragment ao FrameLayout

Finalmente, podemos atualizar a Activity para adicionar um React Native Fragment ao FrameLayout.
Neste exemplo específico, vamos assumir que sua Activity tem um botão com id `sample_button` que quando clicado renderizará um React Native Fragment no FrameLayout.

Atualize o método `onCreate` da sua Activity como segue:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.ReactFragment
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

public class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
+           val reactNativeFragment = ReactFragment.Builder()
+               .setComponentName("HelloWorld")
+               .setLaunchOptions(Bundle().apply { putString("message", "my value") })
+               .build()
+           supportFragmentManager
+               .beginTransaction()
+               .add(R.id.react_native_fragment, reactNativeFragment)
+               .commit()
        }
    }

   override fun invokeDefaultOnBackPressed() {
       super.onBackPressed()
   }
}
```

</TabItem>
<TabItem value="java">

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.ReactFragment;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
+           Bundle launchOptions = new Bundle();
+           launchOptions.putString("message", "my value");
+
+           ReactFragment fragment = new ReactFragment.Builder()
+                   .setComponentName("HelloWorld")
+                   .setLaunchOptions(launchOptions)
+                   .build();
+           getSupportFragmentManager()
+                   .beginTransaction()
+                   .add(R.id.react_native_fragment, fragment)
+                   .commit();
        });
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

</TabItem>
</Tabs>

Vamos olhar o código acima.

O `ReactFragment.Builder()` é usado para criar um novo `ReactFragment` e então usamos o `supportFragmentManager` para adicionar esse Fragment ao `FrameLayout`.

Dentro do builder você pode personalizar como o fragment é criado:

- `setComponentName` é o nome do componente que você deseja renderizar. É a mesma string especificada no seu `index.js` dentro do método `registerComponent`.
- `setLaunchOptions` é um método opcional para passar props iniciais para o seu componente. Isso é opcional e você pode removê-lo se não usá-lo.

### 5. Teste sua integração

Certifique-se de executar `yarn start` para rodar o bundler e então execute seu aplicativo Android no Android Studio. O aplicativo deve carregar o código JavaScript/TypeScript do servidor de desenvolvimento e exibi-lo no seu React Native Fragment na Activity.

Seu aplicativo deve se parecer com este:

![Screenshot](/docs/assets/EmbeddedAppAndroidFragmentVideo.gif)
