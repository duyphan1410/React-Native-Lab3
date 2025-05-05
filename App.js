import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import { AppNavigator } from './routes/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

// Ignore specific warnings that might not be relevant for this app
LogBox.ignoreLogs([
  'Reanimated 2',
  'AsyncStorage',
]);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;