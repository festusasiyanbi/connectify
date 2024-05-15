import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeProvider';

const Settings = () => {
  const {theme} = useTheme();
  return (
    <SafeAreaView
      style={(styles.container, {backgroundColor: theme.containerBackground})}>
      <ScrollView>
        <View>
          <Text>Settings</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Settings;
