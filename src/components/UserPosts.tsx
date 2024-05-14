import {View, StyleSheet} from 'react-native';
import React from 'react';
// import CustomText from '../Helpers/CustomText';

const UserPosts = () => {
  return (
    <View style={styles.container}>
      <CustomText>No posts yet</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
});
export default UserPosts;
