import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import StackNavigator from './src/stacks/StackNavigator';
import { ThemeProvider } from './src/context/ThemeProvider';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <StackNavigator />
        {<Toast />}
      </ThemeProvider>
    </NavigationContainer>
  );
}
