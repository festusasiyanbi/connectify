import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';

const ReadMore = ({caption}: any) => {
  const [showFullCaption, setShowFullCaption] = useState<boolean>(false);

  const renderCaption = () => {
    if (showFullCaption || caption.length < 100) {
      return caption;
    }
    return `${caption.substring(0, 100)} `;
  };
  return (
    <View>
      <CustomText>
        {renderCaption()}
        {caption.length > 100 && (
          <CustomText
            style={styles.readMoreTxt}
            onPress={() => setShowFullCaption(!showFullCaption)}>
            {showFullCaption ? ' Read less' : ' Read more'}
          </CustomText>
        )}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  readMoreTxt: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4f5ab0',
  },
});
export default ReadMore;
