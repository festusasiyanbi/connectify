import React from 'react';
import {Text, TextProps, StyleSheet, Platform} from 'react-native';
import {useTheme} from '../context/ThemeProvider';

interface CustomTextProps extends TextProps {
  fontFamily?: string;
}
const font = Platform.OS === 'ios' ? 'monospace' : 'Roboto';
const CustomText: React.FC<CustomTextProps> = ({
  style,
  fontFamily = font,
  ...props
}) => {
  const {theme} = useTheme();
  return (
    <Text
      style={[
        styles.defaultText,
        {fontFamily},
        {color: theme.textColor},
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default CustomText;
