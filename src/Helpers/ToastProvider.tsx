import React, {useEffect} from 'react';
import {ToastProviderProps} from '../interfaces/types';
// import Toast from 'react-native-toast-message';

const ToastProvider: React.FC<ToastProviderProps> = ({
  delay = 3000,
  type,
  text1,
  text2,
}) => {
  // useEffect(() => {
  //   Toast.show({
  //     type,
  //     text1,
  //     text2,
  //   });

  //   const timeoutId = setTimeout(() => {
  //     Toast.hide();
  //   }, delay);

  //   return () => {
  //     clearTimeout(timeoutId);
  //     Toast.hide();
  //   };
  // }, [delay, type, text1, text2]);

  return null;
};

export default ToastProvider;
