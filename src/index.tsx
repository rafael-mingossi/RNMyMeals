import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScreenNavigator} from '@config';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {configureFonts, MD2LightTheme, PaperProvider} from 'react-native-paper';
import {AuthProvider, QueryProvider} from '@providers';
import {Fonts} from '@constants';
// import {PortalProvider} from '@gorhom/portal';

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <AuthProvider>
              <QueryProvider>
                <ScreenNavigator />
              </QueryProvider>
            </AuthProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
