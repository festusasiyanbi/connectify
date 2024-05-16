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
  Alert,
} from 'react-native';
import CustomText from '../../../Helpers/CustomText';
import Icon from '../../../Helpers/Icon';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import useCustomNavigation from '../../../hooks/useCustomNavigation';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {CreateTwoButtonAlert} from '../../../Helpers/CreateTwoAlerts';
import {ToastProviderProps} from '../../../interfaces/types';
import ToastProvider from '../../../Helpers/ToastProvider';
import {fireAuth} from '../../../firebase/Firebase';
import {LoginUser} from '../../../interfaces/auth.types';

const Login = () => {
  const navigate = useCustomNavigation();
  const [borderStyle, setBorderStyle] = useState<number>(0.5);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const initialToastProps: ToastProviderProps = {
    type: 'info',
    text1: '',
    text2: '',
  };
  const [authForm, setAuthForm] = useState<LoginUser>({
    email: '',
    password: '',
  });
  const [toastProps, setToastProps] =
    useState<ToastProviderProps>(initialToastProps);
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

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        setToastProps({
          ...toastProps,
          type: 'error',
          text1: 'Validation Error',
          text2: 'Please fill all the provided inputs.',
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
    setBorderStyle(1.5);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };
  const handleLogin = async () => {
    if (!authForm.email || !authForm.password) {
      setToastProps({
        ...toastProps,
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all the provided inputs.',
      });
      setShowToast(true);
      return;
    }

    try {
      const result = await fireAuth.signInWithEmailAndPassword(
        authForm.email,
        authForm.password,
      );
      if (result) {
        setToastProps({
          ...toastProps,
          type: 'success',
          text1: 'Login Successful',
          text2: 'You are now logged in.',
        });
        setShowToast(true);
        navigate('Home');
      }
    } catch (error: any) {
      let errorMessage = 'An unknown error occurred.';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email entered is invalid. Please try again.';
          break;
        case 'auth/user-not-found':
          errorMessage =
            'No user found with the provided email. Please sign up first.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/network-request-failed':
          errorMessage =
            'Network error. Please check your internet connection and try again.';
          break;
        default:
          break;
      }

      setToastProps({
        ...toastProps,
        type: 'error',
        text1: 'Login Error',
        text2: errorMessage,
      });
      setShowToast(true);
    }
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
                CreateTwoButtonAlert({
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
            {showToast && (
              <ToastProvider
                type={toastProps.type}
                text1={toastProps.text1}
                text2={toastProps.text2}
              />
            )}
            <CustomText style={styles.logoTxt}>Connectify</CustomText>
            <View style={styles.formContainer}>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'Email' && {borderWidth: borderStyle},
                ]}
                placeholder="Email"
                value={authForm.email}
                onChangeText={text =>
                  setAuthForm({...authForm, email: text.toLowerCase()})
                }
                onFocus={() => handleFocus('Email')}
                onBlur={handleBlur}
                placeholderTextColor="#ddaadd"
              />
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'Password' && {borderWidth: borderStyle},
                ]}
                placeholder="Password"
                value={authForm.password}
                onChangeText={text =>
                  setAuthForm({...authForm, password: text})
                }
                onFocus={() => handleFocus('Password')}
                onBlur={handleBlur}
                placeholderTextColor="#ddaadd"
              />
              <TouchableOpacity onPress={handleLogin} style={styles.authBtn}>
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
});
export default Login;
