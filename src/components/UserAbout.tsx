import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {CurrentUserInfo} from '../interfaces/types';
import {useTheme} from '../context/ThemeProvider';
import CustomText from '../Helpers/CustomText';
import {useAuth} from '../context/AuthProvider';
import useFetchUserData from '../hooks/useCurrentUserData';
import { db } from '../firebase/Firebase';

const UserAbout = () => {
  const {theme} = useTheme();
  const {currentUser} = useAuth();
  const [isEditing, setIsEditing] = useState<string>('');
  const [editedUserInfo, setEditedUserInfo] = useState<CurrentUserInfo | null>(
    null,
  );

  const currentUserEmail = currentUser?.email || '';
  const userData = useFetchUserData(currentUserEmail);
  const [userInfo, setUserInfo] = useState<CurrentUserInfo>({
    basicInformation: {
      title: 'Basic Information',
      name: userData?.fullName,
      gender: '',
      birthdate: '',
      languages: [],
    },
    contactInformation: {
      title: 'Contact Information',
      name: userData?.fullName,
      phone: '',
      email: '',
      address: '',
    },
    biography: {
      title: 'Biography',
      about: '',
      interests: [],
      achievements: [],
    },
  });

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
    return <Icon name={iconName} color={theme.pPrimary} />;
  };

  const handleSave = async () => {
    if (editedUserInfo) {
      try {
        const docRef = db.collection('users').doc(currentUserEmail);
        await docRef.update(editedUserInfo);
        setUserInfo(editedUserInfo);
        setEditedUserInfo(null);
        setIsEditing('');
        Alert.alert('Success', 'Changes saved successfully.');
      } catch (error) {
        Alert.alert('Error', 'Failed to save changes.');
        console.error('Error updating document:', error);
      }
    }
    setIsEditing('');
  };

  const handleInputChange = (
    category: keyof CurrentUserInfo,
    field: keyof any,
    value: string | string[],
  ) => {
    setUserInfo(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [field]: value,
      },
    }));
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
                      {isEditing && isEditing === key ? (
                        <TextInput
                          style={[styles.textInputStyle, {borderColor: theme.borderColor}]}
                          value={
                            Array.isArray(value)
                              ? value.join(', ')
                              : (value as string)
                          }
                          onChangeText={text =>
                            handleInputChange(
                              category as keyof CurrentUserInfo,
                              key,
                              text,
                            )
                          }
                        />
                      ) : (
                        <CustomText>
                          {Array.isArray(value)
                            ? value.join(', ')
                            : (value as React.ReactNode)}
                        </CustomText>
                      )}
                    </View>
                    {isEditing && isEditing === key ? (
                      <TouchableOpacity onPress={handleSave}>
                        <CustomText>save</CustomText>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setIsEditing(key)}>
                        <Icon name={faPen} size={12} />
                      </TouchableOpacity>
                    )}
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
    width: '100%',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  titleTxt: {
    marginVertical: 10,
    fontWeight: '400',
  },
  infoView: {
    width: '100%',
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
    width: '68%',
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
    width: '100%',
    rowGap: 5,
    marginVertical: 5,
  },
  keyTxt: {
    fontSize: 12,
    color: '#888888',
  },
  textInputStyle: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    marginTop: 1,
    paddingVertical: 1,
    fontSize: 12,
  },
});
export default UserAbout;
