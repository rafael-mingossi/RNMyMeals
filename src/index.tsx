import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScreenNavigator} from '@config';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {configureFonts, MD2LightTheme, PaperProvider} from 'react-native-paper';
import {
  AuthProvider,
  ListsProvider,
  QueryProvider,
  RecipesProvider,
} from '@providers';
import {Colours, Fonts} from '@constants';
import {PortalProvider} from '@gorhom/portal';

const fontConfig = {
  ios: {
    regular: {
      fontFamily: Fonts.regular,
    },
    medium: {
      fontFamily: Fonts.medium,
    },
    light: {
      fontFamily: Fonts.light,
    },
    thin: {
      fontFamily: Fonts.extraLight,
    },
  },
  android: {
    regular: {
      fontFamily: Fonts.regular,
    },
    medium: {
      fontFamily: Fonts.medium,
    },
    light: {
      fontFamily: Fonts.light,
    },
    thin: {
      fontFamily: Fonts.extraLight,
    },
  },
};

const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({config: fontConfig, isV3: false}),
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AuthProvider>
            <QueryProvider>
              <ListsProvider>
                <RecipesProvider>
                  <PortalProvider>
                    <StatusBar
                      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                      backgroundColor={Colours.green}
                    />
                    <ScreenNavigator />
                  </PortalProvider>
                </RecipesProvider>
              </ListsProvider>
            </QueryProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
