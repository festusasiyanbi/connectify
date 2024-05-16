import React from 'react';
import useCustomNavigation from '../../../hooks/useCustomNavigation';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';
import {useAuth} from '../../../context/AuthProvider';
import Home from '../../tabs/Home';

const Auth = () => {
  const navigate = useCustomNavigation();
  const {currentUser} = useAuth();
  return (
    <View style={styles.container}>
      {currentUser ? (
        <Home />
      ) : (
        <View style={styles.container}>
          <ImageBackground
            source={require('../../../assets/images/authImage.png')}
            style={styles.backgroundImageStyle}>
            <View style={styles.logoView}>
              <Text style={styles.logoTxt}>Connectify</Text>
            </View>
            <View style={styles.operationBtnWrapper}>
              <View style={styles.operationBtnView}>
                <TouchableOpacity
                  onPress={() => navigate('Home')}
                  style={[styles.authBtn, styles.loginBtn]}>
                  <Text style={styles.loginTxt}>Go home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigate('Login')}
                  style={[styles.authBtn, styles.loginBtn]}>
                  <Text style={styles.loginTxt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigate('SignUp')}
                  style={[styles.authBtn, styles.signUpBtn]}>
                  <Text style={styles.signUpTxt}>Create an account</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.copyTxt}>
                  Developer: Festus Asiyanbi &copy; 2024
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoView: {
    marginTop: 120,
  },
  logoTxt: {
    fontSize: 30,
    color: '#8971e1',
    fontWeight: '700',
  },
  operationBtnWrapper: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operationBtnView: {
    width: '90%',
    rowGap: 10,
    marginBottom: 20,
  },
  authBtn: {
    width: '100%',
    height: 35,
    borderWidth: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  loginBtn: {
    borderColor: '#dddadd',
  },
  signUpBtn: {
    borderColor: '#8971e1',
  },
  loginTxt: {
    color: '#fff',
  },
  signUpTxt: {
    color: '#8971e1',
  },
  copyTxt: {
    color: '#fff',
    fontSize: 10,
  },
});
export default Auth;
