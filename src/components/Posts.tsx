import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Post} from '../interfaces/types';
import PostItem from './PostItem';
// import FormatDateAndTime from '../Helpers/FormatDateAndTime';

const posts: Post[] = [
  {
    id: 1,
    name: 'Festus',
    username: 'festusasiyanbi',
    images: [
      {
        image: require('../assets/images/model.jpg'),
      },
      {
        image: require('../assets/images/model.jpg'),
      },
    ],
    isVerified: false,
    date: FormatDateAndTime(new Date()),
    caption:
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.',
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    shareCount: 0,
    user_avatar: require('../assets/images/model.jpg'),
  },
  {
    id: 2,
    name: 'Ayowolemi',
    username: 'festusasiyanbi',
    images: [
      {
        image: require('../assets/images/model.jpg'),
      },
      {
        image: require('../assets/images/model.jpg'),
      },
      {
        image: require('../assets/images/model.jpg'),
      },
      {
        image: require('../assets/images/model.jpg'),
      },
    ],
    isVerified: false,
    date: FormatDateAndTime(new Date()),
    caption:
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.',
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    shareCount: 0,
    user_avatar: require('../assets/images/model.jpg'),
  },
  {
    id: 3,
    name: 'Jennifer',
    username: 'festusasiyanbi',
    images: [
      {
        image: require('../assets/images/model.jpg'),
      },
      {
        image: require('../assets/images/model.jpg'),
      },
    ],
    isVerified: false,
    date: FormatDateAndTime(new Date()),
    caption:
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.' +
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.' +
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.',
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    shareCount: 0,
    user_avatar: require('../assets/images/model.jpg'),
  },
  {
    id: 4,
    name: 'Oyindamola',
    username: 'oyindamola',
    images: [
      {
        image: require('../assets/images/model.jpg'),
      },
      {
        image: require('../assets/images/model.jpg'),
      },
    ],
    isVerified: false,
    date: FormatDateAndTime(new Date()),
    caption:
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.' +
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.' +
      'The sun shall not strike me by day nor the moon by night. The sun shall not strike me by day nor the moon by night.',
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    shareCount: 0,
    user_avatar: require('../assets/images/model.jpg'),
  },
];

const Posts = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => <PostItem item={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
