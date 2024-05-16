import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '../../Helpers/Icon';
import {faMagnifyingGlass, faTimes} from '@fortawesome/free-solid-svg-icons';
import {CleanDigitOutput} from '../../Helpers/CleanDigitOutput';
import {UserProfile} from '../../interfaces/types';
import {useTheme} from '../../context/ThemeProvider';
import CustomText from '../../Helpers/CustomText';
import useCustomNavigation from '../../hooks/useCustomNavigation';

export const users: UserProfile[] = [
  {
    id: 1,
    username: 'fapseydolls',
    bio: 'I am who he says I am',
    user_avatar: require('../../assets/images/avatar.png'),
    followers: [],
  },
  {
    id: 2,
    username: 'jenniferneche',
    bio: 'I am who he says I am',
    user_avatar: require('../../assets/images/avatar.png'),
    followers: [],
  },
  {
    id: 3,
    username: 'ayowolemi',
    bio: 'I am who he says I am',
    user_avatar: require('../../assets/images/avatar.png'),
    followers: [],
  },
];

const Search = () => {
  const navigate = useCustomNavigation();
  const {theme} = useTheme();
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (value: string) => {
    setText(value);
  };

  const filteredUsers = () => {
    return users.filter(user =>
      user.username.toLowerCase().includes(text.toLowerCase()),
    );
  };
  const handlePressOutside = () => {
    Keyboard.dismiss();
  };
  const navigateToUserProfile = (userId: number) => {
    navigate('UserProfile', {userId: userId});
  };
  return (
    <TouchableWithoutFeedback onPress={handlePressOutside} accessible={false}>
      <SafeAreaView
        style={[
          styles.safeAreaView,
          {backgroundColor: theme.containerBackground},
        ]}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputView}>
              <Icon name={faMagnifyingGlass} />
              <TextInput
                style={[
                  styles.input,
                  isFocused && styles.inputFocused,
                  {color: theme.textColor},
                ]}
                placeholder="Find what you are looking for"
                placeholderTextColor={theme.textColor}
                autoCapitalize="none"
                autoCorrect={false}
                value={text}
                onChangeText={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {text && (
                <TouchableOpacity onPress={() => setText('')}>
                  <Icon name={faTimes} />
                </TouchableOpacity>
              )}
            </View>
            {Boolean(text) &&
              Array.isArray(filteredUsers()) &&
              filteredUsers().length > 0 && (
                <View style={styles.userListView}>
                  {filteredUsers().map(user => (
                    <TouchableOpacity
                      key={user.id}
                      style={styles.userList}
                      onPress={() => navigateToUserProfile(user.id)}>
                      <Image
                        source={user.user_avatar}
                        style={styles.userAvatarStyle}
                      />
                      <View>
                        <CustomText>{user.username}</CustomText>
                        <CustomText style={styles.bioTxt}>
                          {user.bio.length > 10
                            ? user.bio.slice(0, 10) + '...'
                            : user.bio}{' '}
                          &middot; {CleanDigitOutput(user.followers)}{' '}
                          followers
                        </CustomText>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            {Boolean(text) &&
              (!filteredUsers() || filteredUsers().length === 0) && (
                <View>
                  <CustomText style={styles.noUserTxt}>
                    No user found.
                  </CustomText>
                </View>
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  inputView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#dddadd',
  },
  input: {
    height: 30,
    width: '90%',
    fontSize: 13,
    paddingLeft: 10,
  },
  inputFocused: {},
  userListView: {
    width: '100%',
    rowGap: 5,
  },
  userList: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  userAvatarStyle: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  bioTxt: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  noUserTxt: {
    color: 'red',
  },
});
export default Search;
