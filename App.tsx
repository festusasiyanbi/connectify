import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import StackNavigator from './src/stacks/StackNavigator';
import {ThemeProvider} from './src/context/ThemeProvider';
import {AuthProvider} from './src/context/AuthProvider';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ThemeProvider>
          <StackNavigator />
          <Toast />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
