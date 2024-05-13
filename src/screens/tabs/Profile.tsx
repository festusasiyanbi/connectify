import React, {useState} from 'react';
import Icon from '../../Helpers/Icon';
import {CleanDigitOutput} from '../../Helpers/CleanDigitOutput';
import {UserActivity} from '../../interfaces/types';
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
} from 'react-native';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {useTheme} from '../../context/ThemeProvider';
import CustomText from '../../Helpers/CustomText';

const activities: UserActivity[] = [
  {id: 1, activityCount: 2100000000, activityType: 'Post'},
  {id: 2, activityCount: 1094, activityType: 'Followers'},
  {id: 3, activityCount: 614300, activityType: 'Following'},
];

const Profile = () => {
  const {theme} = useTheme();
  const navigate = useCustomNavigation();
  const [category, setCategory] = useState<string>('post');

  const bioString =
    "There should be something in here, I'll try to find it in next" +
    "life. There should be something in here, I'll try to find it in" +
    "next life.There should be something in here, I'll try to find it" +
    'in next life';

  return (
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.containerBackground}]}>
      <View
        style={[
          styles.container,
          {backgroundColor: theme.containerBackground},
        ]}>
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
              Festus @festusasiyanbi{' '}
              <Icon name={faCircleCheck} color="#6780ff" />
            </CustomText>
            <View>
              <ReadMore caption={bioString} />
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
export default Profile;
