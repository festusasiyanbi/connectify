import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import CustomText from '../../../Helpers/CustomText';
import Icon from '../../../Helpers/Icon';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import useCustomNavigation from '../../../hooks/useCustomNavigation';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {createTwoButtonAlert} from '../../../Helpers/CreateTwoAlerts';

const Login = () => {
  const navigate = useCustomNavigation();
  const [borderStyle, setBorderStyle] = useState<number>(0.5);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  });

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
    setBorderStyle(1.5);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <Animated.View
          style={[styles.backgroundImageStyle, {opacity: fadeAnim}]}>
          <ImageBackground
            source={require('../../../assets/images/authImage.png')}
            style={styles.backgroundImage}>
            <TouchableOpacity
              style={styles.faTimesBtn}
              onPress={() =>
                createTwoButtonAlert({
                  title: 'Cancel login?',
                  message: 'Are you sure you want to stop signing in?',
                  text1: 'Cancel',
                  text2: 'Yes',
                  myAlertFunc: () => navigate('Authentication'),
                })
              }>
              <CustomText>
                <Icon name={faTimes} size={20} color="#fff" />
              </CustomText>
            </TouchableOpacity>
            <CustomText style={styles.logoTxt}>Connectify</CustomText>
            <View style={styles.formContainer}>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'Username' && {borderWidth: borderStyle},
                ]}
                placeholder="Username or Email"
                onFocus={() => handleFocus('Username')}
                onBlur={handleBlur}
                placeholderTextColor="#ddaadd"
              />
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'Password' && {borderWidth: borderStyle},
                ]}
                placeholder="Password"
                onFocus={() => handleFocus('Password')}
                onBlur={handleBlur}
                placeholderTextColor="#ddaadd"
              />
              <TouchableOpacity
                onPress={() => console.log('Login button pressed')}
                style={styles.authBtn}>
                <CustomText style={styles.loginTxt}>Login</CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpView}>
              <CustomText style={styles.signupTxt}>
                Don't have an account?
              </CustomText>
              <TouchableOpacity onPress={() => navigate('SignUp')}>
                <CustomText style={styles.signupBtn}>sign up</CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.googleOptionView}>
              <TouchableOpacity style={styles.googleOptionBtn}>
                <View style={styles.googleIconView}>
                  <CustomText>
                    <Icon name={faGoogle} size={15} color="#fff" />
                  </CustomText>
                </View>
                <CustomText style={styles.googleTxt}>
                  Login with Google
                </CustomText>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  faTimesBtn: {
    width: '90%',
    alignItems: 'flex-start',
    backgroundColor: 'none',
    position: 'absolute',
    left: 10,
    top: '8%',
  },
  backgroundImageStyle: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTxt: {
    fontSize: 30,
    color: '#8971e1',
    fontWeight: '700',
    paddingBottom: 40,
  },
  formContainer: {
    width: '80%',
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#dddadd',
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: 'monospace',
    fontSize: 12,
    borderWidth: 0.5,
    color: '#ddaadd',
  },
  authBtn: {
    backgroundColor: '#8971e1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 2,
  },
  signupTxt: {
    color: '#fff',
  },
  signupBtn: {
    color: '#8971e1',
  },
  googleOptionView: {
    paddingTop: 30,
  },
  googleOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 5,
    height: 35,
    width: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddaadd',
  },
  googleIconView: {
    height: '100%',
    backgroundColor: '#8971e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    paddingHorizontal: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  googleTxt: {
    color: '#fff',
  },
});
export default Login;
