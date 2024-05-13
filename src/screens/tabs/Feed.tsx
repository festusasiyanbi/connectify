import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Story from '../../components/Story';
import Header from '../../components/Header';
import Posts from '../../components/Posts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeProvider';

const Feed = () => {
  const {theme} = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.safeareaView,
        {backgroundColor: theme.containerBackground},
      ]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.container,
            {backgroundColor: theme.containerBackground},
          ]}>
          <Header />
          <Story />
          <Posts />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});
export default Feed;
