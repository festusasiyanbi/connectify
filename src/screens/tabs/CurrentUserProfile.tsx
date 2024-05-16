import React, {useEffect, useState} from 'react';
import Icon from '../../Helpers/Icon';
import {CleanDigitOutput} from '../../Helpers/CleanDigitOutput';
import {CurrentUser} from '../../interfaces/types';
import ReadMore from '../../Helpers/ReadMore';
import UserPosts from '../../components/UserPosts';
import UserAbout from '../../components/UserAbout';
import {
  faShareNodes,
  faCircleCheck,
  faListUl,
  faAddressBook,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {useTheme} from '../../context/ThemeProvider';
import CustomText from '../../Helpers/CustomText';
import {useAuth} from '../../context/AuthProvider';
import {db} from '../../firebase/Firebase';
import useFetchUserData from '../../hooks/useCurrentUserData';

const CurrentUserProfile = () => {
  const {theme} = useTheme();
  const {currentUser} = useAuth();
  const navigate = useCustomNavigation();
  const currentUserEmail = currentUser?.email || '';
  const userData = useFetchUserData(currentUserEmail);
  const [category, setCategory] = useState<string>('post');

  return (
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.containerBackground}]}>
      <View
        style={[
          styles.container,
          {backgroundColor: theme.containerBackground},
        ]}>
        {userData && (
          <>
            <View>
              <Image
                source={require('../../assets/images/heaven.jpg')}
                style={styles.coverImageStyle}
              />
              <TouchableOpacity
                style={[
                  styles.menuBarBtn,
                  {backgroundColor: theme.transparentBlack},
                ]}
                onPress={() => navigate('Settings')}>
                <Icon name={faBars} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfoView}>
              <View style={styles.avatarBioView}>
                <View style={styles.avatarImageView}>
                  <Image
                    source={require('../../assets/images/nature.jpg')}
                    style={styles.avatarImageStyle}
                  />
                </View>
                <CustomText style={styles.usernameTxt}>
                  {userData.fullName} @{userData.username}
                  <Icon name={faCircleCheck} color="#6780ff" />
                </CustomText>
                <View>
                  {userData.bio ? (
                    <ReadMore caption={userData.bio} />
                  ) : (
                    <View>
                      <CustomText style={styles.defaultBioTxt}>
                        Let your friends know about you.
                      </CustomText>
                    </View>
                  )}
                </View>
                <View style={styles.editShareView}>
                  <TouchableOpacity
                    style={[
                      styles.editProfileBtnStyle,
                      {backgroundColor: theme.pPrimary},
                    ]}>
                    <CustomText style={styles.editProfileBtnTxt}>
                      Edit Profile
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
              <View
                style={[
                  styles.profileActivitiesView,
                  {borderColor: theme.borderColor},
                ]}>
                <View>
                  <View style={styles.activityDetailsView}>
                    <CustomText>
                      {CleanDigitOutput(userData.posts.length)}
                    </CustomText>
                    <CustomText style={styles.activityTypeTxt}>post</CustomText>
                  </View>
                </View>
                <View>
                  <View style={styles.activityDetailsView}>
                    <CustomText>
                      {CleanDigitOutput(userData.followers.length)}
                    </CustomText>
                    <CustomText style={styles.activityTypeTxt}>
                      Followers
                    </CustomText>
                  </View>
                </View>
                <View>
                  <View style={styles.activityDetailsView}>
                    <CustomText>
                      {CleanDigitOutput(userData.following.length)}
                    </CustomText>
                    <CustomText style={styles.activityTypeTxt}>
                      Following
                    </CustomText>
                  </View>
                </View>
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
          </>
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
  menuBarBtn: {
    position: 'absolute',
    top: '25%',
    right: 10,
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
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  editProfileBtnStyle: {
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
    borderBottomColor: '#9747FF',
  },
  activeCategoryTxt: {
    color: '#9747FF',
  },
  defaultBioTxt: {
    fontSize: 10,
  },
});
export default CurrentUserProfile;
