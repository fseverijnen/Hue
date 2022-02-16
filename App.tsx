/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import { DarkTheme, DefaultTheme, Provider } from 'react-native-paper';

import Main from './src/Main';

const theme: ReactNativePaper.Theme = {
  ...DarkTheme,
};

const App = () => {
  return (
    <Provider theme={theme}>
      <Main />
    </Provider>
  );
};

export default App;
