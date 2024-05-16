import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {CreateTwoButtonAlert} from '../../Helpers/CreateTwoAlerts';
import CustomText from '../../Helpers/CustomText';
import Icon from '../../Helpers/Icon';
import {faImage, faTimes, faVideo} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '../../context/ThemeProvider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {SafeAreaView} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import FormatDateAndTime from '../../Helpers/FormatDateAndTime';

const UploadPostScreen = () => {
  const {theme} = useTheme();
  const navigation = useCustomNavigation();
  const [text, setText] = useState<string>('');
  const [imageUris, setImageUris] = useState<(string | undefined)[]>([]);

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };
  const handleInputChange = (newText: string) => {
    setText(newText);
  };
  const handleOpenCamera = async () => {
    const options: any = {
      mediaType: 'photo',
      saveToPhotos: true,
      includeBase64: false,
    };
    try {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'You need to grant camera permission to use this feature. Would you like to go to app settings?',
          [
            {
              text: 'Cancel',
              onPress: () =>
                console.log('Permission denied, operation canceled.'),
              style: 'cancel',
            },
            {text: 'Settings', onPress: () => Linking.openSettings()},
          ],
        );
        return;
      }
    }
      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('Camera operation cancelled.');
      } else if (response.assets) {
        const newImageUris = response.assets.map(asset => asset.uri);
        if (imageUris.length + newImageUris.length > 5) {
          Alert.alert(
            'Maximum Image Limit Reached',
            'You can only capture up to 5 images.',
          );
        } else {
          setImageUris(prevUris => [...prevUris, ...newImageUris]);
        }
      } else if (response.errorMessage) {
        console.log('Camera error:', response.errorMessage);
        Alert.alert(
          'Camera Error',
          'An error occurred while accessing the camera.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while opening the camera.');
    }
  };
  const handleSelectImagesFromGallery = async () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
    };
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'You need to grant storage permission to access the image gallery. Would you like to go to app settings?',
            [
              {
                text: 'Cancel',
                onPress: () =>
                  console.log('Permission denied, operation canceled.'),
                style: 'cancel',
              },
              {text: 'Settings', onPress: () => Linking.openSettings()},
            ],
          );
          return;
        }
      }
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('Image selection canceled.');
      } else if (response.assets) {
        const newImageUris = response.assets.map(asset => asset.uri);
        if (imageUris.length + newImageUris.length > 5) {
          Alert.alert(
            'Maximum Image Limit Reached',
            'You can only select up to 5 images.',
          );
        } else {
          setImageUris(prevUris => [...prevUris, ...newImageUris]);
        }
      } else if (response.errorMessage) {
        console.log('Image selection error:', response.errorMessage);
        Alert.alert(
          'Image Selection Error',
          'An error occurred while accessing the image gallery.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'An error occurred while selecting images from the gallery.',
      );
    }
  };

  const handleDeleteImage = (imageUrl: any) => {
    const filteredImages = imageUris.filter(image => image !== imageUrl);
    setImageUris(filteredImages);
  };

  // const handlePost = () => {
  //   let postObj = {
  //     id: 1,
  //     images: imageUris,
  //     date: FormatDateAndTime(new Date()),
  //     caption: text,
  //     commentCount: 0,
  //     likeCount: 0,
  //     bookmarkCount: 0,
  //     shareCount: 0,
  //   };
  // };
  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.containerBackground},
        ]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
          <View style={styles.postTopView}>
            <TouchableOpacity
              style={styles.faTimesBtn}
              onPress={() =>
                CreateTwoButtonAlert({
                  title: 'Cancel upload?',
                  message: 'Are you sure you want to stop posting?',
                  text1: 'No',
                  text2: 'Discard',
                  myAlertFunc: () => navigation('Feed'),
                })
              }>
              <CustomText>
                <Icon name={faTimes} />
              </CustomText>
            </TouchableOpacity>
            <CustomText style={styles.composeTxt}>Compose</CustomText>
            <TouchableOpacity
              style={[styles.postBtn, {backgroundColor: theme.pPrimary}]}>
              <CustomText style={styles.postBtnTxt}>Post</CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.postWrapper}>
            <View style={styles.postView}>
              <View style={styles.avatarView}>
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={styles.avatarImage}
                />
                <TouchableOpacity
                  style={[
                    styles.postBtn,
                    styles.postToPublicBtn,
                    {borderColor: theme.borderColor},
                  ]}>
                  <CustomText style={styles.postToPublicTxt}>
                    Post to Public
                  </CustomText>
                </TouchableOpacity>
              </View>
              <View style={styles.postInputView}>
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={350}
                  placeholder="What's on your mind?"
                  placeholderTextColor={theme.textColor}
                  value={text}
                  onChangeText={handleInputChange}
                  style={[styles.input, {color: theme.textColor}]}
                />
              </View>
              <ScrollView
                style={styles.postImageScrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {imageUris.map((uri, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      CreateTwoButtonAlert({
                        title: 'Delete Photo?',
                        message:
                          'Are you sure you want to delete photo? You can not undo this once it is done.',
                        text1: 'Cancel',
                        text2: 'Delete',
                        myAlertFunc: () => handleDeleteImage(uri),
                      })
                    }>
                    <Image source={{uri}} style={styles.postImage} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.postOperationsView}>
              <View style={[styles.operationIconView, styles.cameraView]}>
                <TouchableOpacity onPress={handleSelectImagesFromGallery}>
                  <Icon name={faImage} color={theme.pSecondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenCamera}>
                  <Icon name={faVideo} color={theme.pSecondary} />
                </TouchableOpacity>
              </View>
              <CustomText>({imageUris.length} / 5)</CustomText>
              <View style={[styles.operationIconView, styles.checkBoxView]}>
                <CustomText
                  style={
                    text.length >= 320 && text.length < 345
                      ? styles.orangeTxt
                      : text && text.length >= 345
                        ? styles.redTxt
                        : null
                  }>
                  {text.length} / 350
                </CustomText>
                <BouncyCheckbox
                  size={15}
                  fillColor={theme.pPrimary}
                  unFillColor="transparent"
                  innerIconStyle={styles.bountyCheckBoxInnerIconStyle}
                  isChecked={text.length ? text.length >= 350 : undefined}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  postTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postView: {
    width: '100%',
  },
  faTimesBtn: {
    width: '30%',
  },
  postBtn: {
    height: 30,
    width: '20%',
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  postToPublicBtn: {
    borderWidth: 0.5,
    width: 90,
    height: 25,
  },
  postToPublicTxt: {
    fontSize: 9,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  composeTxt: {
    width: '30%',
    fontSize: 13,
  },
  postBtnTxt: {
    color: '#fff',
  },
  postWrapper: {
    width: '100%',
    height: '95%',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postOperationsView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  operationIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 12,
  },
  bountyCheckBoxInnerIconStyle: {
    borderWidth: 1,
  },
  cameraView: {
    columnGap: 20,
  },
  checkBoxView: {
    columnGap: 10,
  },
  postInputView: {
    height: 150,
    paddingBottom: 10,
  },
  postImageScrollView: {
    gap: 8,
    flexGrow: 1,
  },
  postImage: {
    width: 200,
    height: 250,
    marginRight: 10,
  },
  orangeTxt: {
    color: 'orange',
  },
  redTxt: {
    color: 'red',
  },
});
export default UploadPostScreen;
