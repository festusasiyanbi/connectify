import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../interfaces/types';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationFunction = (
  screen: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) => void;

const useCustomNavigation = (): NavigationFunction => {
  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigate: NavigationFunction = (screen, params) => {
    navigator.navigate(screen, params);
  };

  return navigate;
};

export default useCustomNavigation;
