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
import {CreateTwoButtonAlert} from '../../../Helpers/CreateTwoAlerts';
import ToastProvider from '../../../Helpers/ToastProvider';
import {ToastProviderProps} from '../../../interfaces/types';
import {db, fireAuth} from '../../../firebase/Firebase';
import {SignUpUser} from '../../../interfaces/auth.types';

const SignUp = () => {
  const navigate = useCustomNavigation();
  const [borderStyle, setBorderStyle] = useState<number>(0.5);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const initialToastProps: ToastProviderProps = {
    type: 'info',
    text1: '',
    text2: '',
  };
  const [signUpForm, setSignUpForm] = useState<SignUpUser>({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [toastProps, setToastProps] =
    useState<ToastProviderProps>(initialToastProps);

  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  const handleSignUp = async () => {
    if (
      !signUpForm.username ||
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.fullName
    ) {
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
      const usernameCheck = await db
        .collection('users')
        .where('username', '==', signUpForm.username)
        .get();
      if (!usernameCheck.empty) {
        setToastProps({
          ...toastProps,
          type: 'error',
          text1: 'Username Taken',
          text2: 'Please choose a different username.',
        });
        setShowToast(true);
        return;
      }

      const userCredential = await fireAuth.createUserWithEmailAndPassword(
        signUpForm.email,
        signUpForm.password,
      );

      await db.collection('users').doc(userCredential.user?.uid).set({
        username: signUpForm.username,
        email: signUpForm.email,
        fullName: signUpForm.fullName,
      });

      setToastProps({
        ...toastProps,
        type: 'success',
        text1: 'Sign Up Successful',
        text2: 'You can now log in with your credentials.',
      });
      setShowToast(true);
      setFocusedInput(null);
      navigate('Login');
    } catch (error: any) {
      let errorMessage = 'An unknown error occurred. Please try again.';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email entered is invalid. Please try again.';
          break;
        case 'auth/email-already-in-use':
          errorMessage =
            'Email is already in use. Please use a different email address.';
          break;
        case 'auth/weak-password':
          errorMessage =
            'Password is too weak. Please choose a stronger password.';
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
        text1: 'An error occurred',
        text2: errorMessage,
      });
      setShowToast(true);
    }
  };

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
                CreateTwoButtonAlert({
                  title: 'Cancel Sign up?',
                  message: 'Are you sure you want to stop signing up?',
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
                  focusedInput === 'FullName' && {borderWidth: borderStyle},
                ]}
                placeholder="Full name"
                value={signUpForm.fullName}
                onChangeText={text =>
                  setSignUpForm({...signUpForm, fullName: text})
                }
                onFocus={() => handleFocus('FullName')}
                onBlur={handleBlur}
                placeholderTextColor="#ddaadd"
              />
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'Username' && {borderWidth: borderStyle},
                ]}
                placeholder="Username"
                value={signUpForm.username}
                autoCapitalize="none"
                onChangeText={text =>
                  setSignUpForm({...signUpForm, username: text.toLowerCase()})
                }
                onFocus={() => handleFocus('Username')}
                onBlur={handleBlur}
                placeholderTextColor="#ddaadd"
              />
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'Email' && {borderWidth: borderStyle},
                ]}
                placeholder="Email"
                value={signUpForm.email}
                autoCapitalize="none"
                onChangeText={text =>
                  setSignUpForm({...signUpForm, email: text.toLowerCase()})
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
                onChangeText={text =>
                  setSignUpForm({...signUpForm, password: text})
                }
                value={signUpForm.password}
                onFocus={() => handleFocus('Password')}
                onBlur={handleBlur}
                placeholderTextColor="#ddaadd"
              />
              <TouchableOpacity style={styles.authBtn} onPress={handleSignUp}>
                <CustomText style={styles.loginTxt}>Sign Up</CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpView}>
              <CustomText style={styles.signupTxt}>
                Already have an account?
              </CustomText>
              <TouchableOpacity onPress={() => navigate('Login')}>
                <CustomText style={styles.signupBtn}>Login</CustomText>
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
export default SignUp;
