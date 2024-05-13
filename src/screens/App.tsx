import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from '../stacks/StackNavigator';
import {ThemeProvider} from '../context/ThemeProvider';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <StackNavigator />
        <Toast />
      </ThemeProvider>
    </NavigationContainer>
  );
}
