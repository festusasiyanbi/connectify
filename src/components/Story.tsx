import {View, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {UserStory} from '../interfaces/types';
import CustomText from '../Helpers/CustomText';

const stories: UserStory[] = [
  {
    id: 1,
    user_avatar: require('../assets/images/avatar.png'),
    user_name: 'festusasiyanbi',
  },
  {
    id: 2,
    user_avatar: require('../assets/images/avatar.png'),
    user_name: 'hennyharyor',
  },
  {
    id: 3,
    user_avatar: require('../assets/images/avatar.png'),
    user_name: 'jenniferjude',
  },
  {
    id: 4,
    user_avatar: require('../assets/images/avatar.png'),
    user_name: 'festusasiyanbi',
  },
  {
    id: 5,
    user_avatar: require('../assets/images/avatar.png'),
    user_name: 'hennyharyor',
  },
  {
    id: 6,
    user_avatar: require('../assets/images/avatar.png'),
    user_name: 'jenniferjude',
  },
];
export default function Story({isNewStory = true}: any) {
  return (
    <ScrollView
      style={styles.scrollView}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {stories.map(story => (
        <View key={story.id} style={styles.storyContainer}>
          <View
            style={[
              styles.storyImageView,
              isNewStory && styles.storyBorderGradient,
            ]}>
            <Image source={story.user_avatar} style={styles.image} />
          </View>
          <CustomText>{story.user_name.slice(0, 8) + '...'}</CustomText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  storyContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  storyImageView: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    objectFit: 'contain',
  },
  storyBorderGradient: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#8971e1',
  },
});
