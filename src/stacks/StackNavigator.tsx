import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces/types';
import Chats from '../screens/stacks/Chats';
import Auth from '../screens/stacks/auth/Auth';
import Home from '../screens/tabs/Home';
import Settings from '../screens/stacks/Settings';
import Icon from '../Helpers/Icon';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Login from '../screens/stacks/auth/Login';
import SignUp from '../screens/stacks/auth/SignUp';
import UserProfile from '../screens/stacks/UserProfile';
import UploadPostScreen from '../screens/tabs/UploadPostScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const CustomScreenHeader = ({
  navigation,
  title,
}: {
  navigation: any;
  title: string;
}) => {
  switch (title) {
    case 'settings':
      title = 'Settings & activity';
      break;
    default:
      title = '';
      break;
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={faAngleLeft} size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View>
          <Text> </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const StackNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Authentication">
      <Stack.Screen
        name="Authentication"
        component={Auth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          header: () => <CustomScreenHeader navigation={navigation} title="" />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          header: () => (
            <CustomScreenHeader navigation={navigation} title="settings" />
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadPostScreen"
        component={UploadPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 3,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
});
export default StackNavigator;
