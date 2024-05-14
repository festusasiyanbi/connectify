import {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  Authentication: undefined;
  Feed: undefined;
  Home: undefined;
  Search: undefined;
  UploadPostScreen: undefined;
  Notification: undefined;
  Profile: undefined;
  Chats: undefined;
  Settings: undefined;
  Login: undefined;
  SignUp: undefined;
  // UserProfile: {userId: number};
};

export type User = {
  id: number;
  username: string;
  bio: string;
  user_avatar: ImageSourcePropType | undefined;
  followersCount: number;
};

export type UserInfoInterface = {
  basicInformation: {
    title: string;
    name: string;
    gender: string;
    birthdate: string;
    languages: string[];
  };
  contactInformation: {
    title: string;
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  biography: {
    title: string;
    about: string;
    interests: string[];
    achievements: string[];
  };
};

export type UserActivity = {
  id: number;
  activityCount: number;
  activityType: string;
};
export type Post = {
  id: number;
  name: string;
  username: string;
  images: {image: any}[];
  isVerified: boolean;
  date: string;
  caption: string;
  commentCount: number;
  likeCount: number;
  bookmarkCount: number;
  shareCount: number;
  user_avatar: ImageSourcePropType | undefined;
};

export type UserStory = {
  id: number;
  user_avatar: ImageSourcePropType | undefined;
  user_name: string;
};

export type ToastProviderProps = {
  delay?: number;
  type: 'error' | 'success' | 'info' | 'warning';
  text1: string;
  text2?: string;
};

export type SignUpUser = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};
