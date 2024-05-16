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
  UserProfile: {userId: number};
};

export interface CurrentUser {
  id: number;
  username: string;
  fullName: string;
  bio: string;
  user_avatar: ImageSourcePropType | undefined;
  followers: [];
  following: [];
  posts: [];
}
export interface UserProfile {
  id: number;
  username: string;
  fullName?: string;
  bio: string;
  user_avatar: ImageSourcePropType | undefined;
  followers?: [];
  following?: [];
  posts?: [];
}

export interface BasicInformation {
  title: string;
  name: string | undefined;
  gender: string | undefined;
  birthdate: string | undefined;
  languages: string[];
}

export interface ContactInformation {
  title: string;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  address: string | undefined;
}

export interface Biography {
  title: string;
  about: string | undefined;
  interests: string[];
  achievements: string[];
}

export interface CurrentUserInfo {
  basicInformation: BasicInformation;
  contactInformation: ContactInformation;
  biography: Biography;
}


export interface UserActivity {
  id: number;
  activityCount: number;
  activityType: string;
}
export interface Post {
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
}

export interface UserStory {
  id: number;
  user_avatar: ImageSourcePropType | undefined;
  user_name: string;
}

export interface ToastProviderProps {
  delay?: number;
  type: 'error' | 'success' | 'info' | 'warning';
  text1: string;
  text2?: string;
}
