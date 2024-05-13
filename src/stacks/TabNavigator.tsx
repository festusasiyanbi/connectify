/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Icon from '../Helpers/Icon';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../interfaces/types';
import Feed from '../screens/tabs/Feed';
import Search from '../screens/tabs/Search';
import Notification from '../screens/tabs/Notification';
import Profile from '../screens/tabs/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../context/ThemeProvider';
import useCustomNavigation from '../hooks/useCustomNavigation';
import CustomText from '../Helpers/CustomText';
import UploadPost from '../screens/tabs/UploadPost';
import {
  faBell,
  faPlusSquare,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import {faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons';

const TabNavigator = () => {
  const {theme} = useTheme();
  const navigate = useCustomNavigation();
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => {
          let icon;
          switch (route.name) {
            case 'Feed':
              icon = faHomeAlt;
              break;
            case 'Search':
              icon = faSearch;
              break;
            case 'UploadPostScreen':
              icon = faPlusSquare;
              break;
            case 'Notification':
              icon = faBell;
              break;
            case 'Profile':
              icon = faUserCircle;
              break;
            default:
              icon = faPlusSquare;
          }
          return (
            <View style={styles.iconWrapper}>
              <TouchableOpacity
                onPress={() => navigate(route.name)}
                style={styles.postBtn}>
                <Icon
                  name={icon}
                  color={focused ? theme.pPrimary : ''}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              {route.name === 'Notification' && (
                <View style={styles.notifierView}>
                  <CustomText>{''}</CustomText>
                </View>
              )}
              {focused && <Text style={styles.focusedBox} />}
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: 'lightgray',
          borderTopWidth: 0.2,
          backgroundColor: theme.containerBackground,
        },
      })}>
      <Tab.Screen name="Feed" component={Feed} options={{headerShown: false}} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="UploadPostScreen"
        component={UploadPost}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  iconWrapper: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  focusedBox: {
    width: 15,
    height: 2,
    backgroundColor: '#8971e1',
  },
  iconStyle: {
    marginBottom: 10,
  },
  postBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifierView: {
    position: 'absolute',
    top: 10,
    right: 0,
    height: 7,
    width: 7,
    borderRadius: 50,
    backgroundColor: '#e64545',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
