import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import CustomText from '../../Helpers/CustomText';
import {users} from '../tabs/Search';
import {RootStackParamList, User} from '../../interfaces/types';
import Icon from '../../Helpers/Icon';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '../../context/ThemeProvider';
import UserPosts from '../../components/UserPosts';
import UserAbout from '../../components/UserAbout';
import {CleanDigitOutput} from '../../Helpers/CleanDigitOutput';
import {UserActivity} from '../../interfaces/types';
import ReadMore from '../../Helpers/ReadMore';
import {
  faShareNodes,
  faCircleCheck,
  faListUl,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

const activities: UserActivity[] = [
  {id: 1, activityCount: 2100000000, activityType: 'Post'},
  {id: 2, activityCount: 1094, activityType: 'Followers'},
  {id: 3, activityCount: 614300, activityType: 'Following'},
];
const UserProfile = ({route}: {route: UserProfileRouteProp}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [category, setCategory] = useState<string>('post');
  const {userId}: {userId: number} = route.params;
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const getUser = () => {
      const userFound = users.find(user => user.id === userId);
      setUserDetails(userFound || null);
    };

    getUser();
  }, [userId]);

  return (
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.containerBackground}]}>
      <View
        style={[
          styles.container,
          {backgroundColor: theme.containerBackground},
        ]}>
        {userDetails ? (
          <View>
            <View>
              <Image
                source={require('../../assets/images/heaven.jpg')}
                style={styles.coverImageStyle}
              />
              <TouchableOpacity
                style={[
                  styles.arrowBackBtn,
                  {backgroundColor: theme.transparentBlack},
                ]}
                onPress={() => navigation.goBack()}>
                <Icon name={faAngleLeft} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfoView}>
              <View style={styles.avatarBioView}>
                <View style={styles.avatarImageView}>
                  <Image
                    source={require('../../assets/images/heaven.jpg')}
                    style={styles.avatarImageStyle}
                  />
                </View>
                <CustomText style={styles.usernameTxt}>
                  {userDetails.username}
                  <Icon name={faCircleCheck} color="#6780ff" />
                </CustomText>
                <View>
                  <ReadMore caption={userDetails.bio} />
                </View>
                <View style={styles.editShareView}>
                  <TouchableOpacity
                    style={[
                      styles.followBtnStyle,
                      {backgroundColor: theme.pPrimary},
                    ]}>
                    <CustomText style={styles.editProfileBtnTxt}>
                      Follow
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.shareBtnStyle,
                      {backgroundColor: theme.pPrimary},
                    ]}>
                    <Icon name={faShareNodes} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.profileActivitiesView}>
                {activities.map(activity => (
                  <View key={activity.id}>
                    <View style={styles.activityDetailsView}>
                      <CustomText>
                        {CleanDigitOutput(activity.activityCount)}
                      </CustomText>
                      <CustomText style={styles.activityTypeTxt}>
                        {activity.activityType}
                      </CustomText>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.categoryView}>
                <TouchableOpacity
                  onPress={() => setCategory('post')}
                  style={[
                    styles.categoryBtn,
                    category === 'post' && styles.activeCategoryBtn,
                  ]}>
                  <Icon
                    name={faListUl}
                    size={12}
                    color={category === 'post' ? '#7752d5' : ''}
                  />
                  <CustomText
                    style={[
                      styles.categoryBtnTxt,
                      category === 'post' && styles.activeCategoryTxt,
                    ]}>
                    Post
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCategory('about')}
                  style={[
                    styles.categoryBtn,
                    category === 'about' && styles.activeCategoryBtn,
                  ]}>
                  <Icon
                    name={faAddressBook}
                    size={12}
                    color={category === 'about' ? '#7752d5' : ''}
                  />
                  <CustomText
                    style={[
                      styles.categoryBtnTxt,
                      category === 'about' && styles.activeCategoryTxt,
                    ]}>
                    About
                  </CustomText>
                </TouchableOpacity>
              </View>
              {category === 'post' ? (
                <UserPosts />
              ) : category === 'about' ? (
                <UserAbout />
              ) : null}
            </View>
          </View>
        ) : (
          <View>
            <CustomText>Nothing to display</CustomText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  profileInfoView: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    top: -80,
  },
  coverImageStyle: {
    height: 200,
    width: '100%',
  },
  arrowBackBtn: {
    position: 'absolute',
    top: '25%',
    left: 10,
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImageView: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  avatarBioView: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10,
  },
  usernameTxt: {
    alignItems: 'center',
    fontSize: 12,
  },
  profileActivitiesView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#dddadd',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    marginVertical: 5,
  },
  editShareView: {
    height: 50,
    width: '35%',
    flexDirection: 'row',
    paddingVertical: 7,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followBtnStyle: {
    borderColor: '#dddadd',
    borderWidth: 0.5,
    borderRadius: 5,
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileBtnTxt: {
    color: '#fff',
    fontSize: 12,
  },
  shareBtnStyle: {
    width: 35,
    height: 35,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activityDetailsView: {
    alignItems: 'center',
  },
  activityTypeTxt: {
    fontSize: 10,
    color: '#888888',
  },
  categoryView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBtn: {
    height: 40,
    width: '50%',
    borderColor: '#dddadd',
    borderBottomWidth: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBtnTxt: {
    fontSize: 12,
  },
  activeCategoryBtn: {
    borderBottomColor: '#7752d5',
  },
  activeCategoryTxt: {
    color: '#7752d5',
  },
});
export default UserProfile;
