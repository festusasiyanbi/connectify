import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import { useTheme } from '../../context/ThemeProvider';

const Notification = () => {
  const {theme} = useTheme();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.containerBackground}]}>
      <ScrollView>
        <View>
          <Text>Notification page</Text>
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
export default Notification;
