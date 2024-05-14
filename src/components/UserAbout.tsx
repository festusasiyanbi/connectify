// import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  IconDefinition,
  faAddressCard,
  faBoltLightning,
  faBriefcase,
  faCalendarAlt,
  faEnvelope,
  faLanguage,
  faLocationDot,
  faPen,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Helpers/Icon';
import {UserInfoInterface} from '../interfaces/types';
import {useTheme} from '../context/ThemeProvider';
import CustomText from '../Helpers/CustomText';

const UserAbout = () => {
  const {theme} = useTheme();
  const userInfo: UserInfoInterface = {
    basicInformation: {
      title: 'Basic Information',
      name: 'Festus Asiyanbi',
      gender: 'Male',
      birthdate: '2 May 2001',
      languages: ['English', 'Yoruba', 'Pidgin'],
    },
    contactInformation: {
      title: 'Contact Information',
      name: 'Festus Asiyanbi',
      phone: '+2348149205944',
      email: 'example@festus.com',
      address: '127 Jarvis street, Toronto, ON',
    },
    biography: {
      title: 'Biography',
      about:
        'I am a software engineer with a passion for coding and technology.',
      interests: ['Programming', 'Gaming', 'Reading'],
      achievements: ['Completed coding bootcamp', 'Won hackathon prize'],
    },
  };

  const getKeyInitial = (key: string) => {
    const words = key.split(' ');
    const capitalizedWords = words.map(
      word => word.charAt(0).toUpperCase() + word.slice(1),
    );
    return capitalizedWords.join(' ');
  };

  const getIcon = (icon: string) => {
    let iconName: IconDefinition | null = null;

    switch (icon.toLowerCase()) {
      case 'name':
      case 'gender':
        iconName = faUser;
        break;
      case 'birthdate':
        iconName = faCalendarAlt;
        break;
      case 'languages':
        iconName = faLanguage;
        break;
      case 'phone':
        iconName = faPhone;
        break;
      case 'email':
        iconName = faEnvelope;
        break;
      case 'address':
        iconName = faLocationDot;
        break;
      case 'about':
        iconName = faAddressCard;
        break;
      case 'interests':
        iconName = faBoltLightning;
        break;
      case 'achievements':
        iconName = faBriefcase;
        break;
      default:
        return '';
    }
    return <Icon name={iconName} color={theme.pBackground} />;
  };
  return (
    <View style={styles.container}>
      {Object.entries(userInfo).map(([category, details]) => (
        <View key={category}>
          <CustomText style={styles.titleTxt}>{details.title}</CustomText>
          {Object.entries(details).map(([key, value]) => (
            <View key={key} style={styles.infoView}>
              {key !== 'title' && (
                <View style={styles.infoContainer}>
                  <View style={styles.infoWrapper}>
                    <View style={styles.iconView}>
                      <CustomText>{getIcon(key)}</CustomText>
                    </View>
                    <View style={styles.keyValueView}>
                      <CustomText style={styles.keyTxt}>
                        {getKeyInitial(key)}
                      </CustomText>
                      <CustomText>
                        {Array.isArray(value) ? value.join(', ') : value}
                      </CustomText>
                    </View>
                  </View>
                  <View>
                    <Icon name={faPen} size={12} />
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  titleTxt: {
    marginVertical: 10,
    fontWeight: '400',
  },
  infoView: {
    rowGap: 10,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderColor: '#dddadd',
  },
  infoWrapper: {
    width: '65%',
    flexDirection: 'row',
    columnGap: 30,
    paddingLeft: 10,
  },
  iconView: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: '#dedbf9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyValueView: {
    rowGap: 5,
    marginVertical: 5,
  },
  keyTxt: {
    fontSize: 12,
    color: '#888888',
  },
});
export default UserAbout;
