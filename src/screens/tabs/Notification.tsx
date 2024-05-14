import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const Notification = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Notification page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;