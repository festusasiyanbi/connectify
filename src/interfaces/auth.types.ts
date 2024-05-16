import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface SignUpUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface User extends FirebaseAuthTypes.User {}

export interface AuthContextType {
  currentUser: User | null;
}
