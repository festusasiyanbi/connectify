import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import ImageGrid from '../Helpers/ImageGrid';
import Icon from '../Helpers/Icon';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons/faEllipsis';
import ReadMore from '../Helpers/ReadMore';
import {Post} from '../interfaces/types';
import CustomText from '../Helpers/CustomText';
import {useTheme} from '../context/ThemeProvider';

type PostItemProps = {
  item: Post;
};

const PostItem: React.FC<PostItemProps> = ({item}) => {
  const {theme} = useTheme();
  return (
    <View style={[styles.postView, {borderColor: theme.borderColor}]}>
      <View style={[styles.postContainer, {borderColor: theme.borderColor}]}>
        <View style={styles.wrapper}>
          <View style={styles.postTopInfoView}>
            <View style={styles.avatarNameView}>
              <Image source={item.user_avatar} style={styles.avatarStyle} />
              <View style={styles.nameDateView}>
                <CustomText>
                  {item.name} @{item.username}
                </CustomText>
                <CustomText>{item.date}</CustomText>
              </View>
            </View>
            <Icon name={faEllipsis} style={styles.iconStyle} />
          </View>
          <ImageGrid images={item.images} />
          <View style={styles.captionView}>
            <ReadMore caption={item.caption} />
          </View>
          <View style={styles.operationIconsView}>
            <View style={styles.iconStyleView}>
              <Icon name={faComment} style={styles.iconStyle} />
              <CustomText>{item.commentCount}</CustomText>
            </View>
            <View style={styles.iconStyleView}>
              <Icon name={faHeart} style={styles.iconStyle} />
              <CustomText>{item.likeCount}</CustomText>
            </View>
            <View style={styles.iconStyleView}>
              <Icon name={faBookmark} style={styles.iconStyle} />
              <CustomText>{item.bookmarkCount}</CustomText>
            </View>
            <View style={styles.iconStyleView}>
              <Icon name={faPaperPlane} style={styles.iconStyle} />
              <CustomText>{item.shareCount}</CustomText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  postView: {
    width: '100%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  postContainer: {
    height: '70%',
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  iconStyle: {
    fontWeight: '700',
  },
  postTopInfoView: {
    width: '100%',
    height: '10%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarNameView: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameDateView: {
    paddingLeft: 15,
  },
  avatarStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  captionView: {
    marginVertical: 10,
  },
  operationIconsView: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyleView: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
});

export default PostItem;
