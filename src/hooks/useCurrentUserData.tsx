import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { db } from '../firebase/Firebase';
import { CurrentUser } from '../interfaces/types';

const useFetchUserData = (currentUserEmail: string | undefined) => {
  const [userData, setUserData] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUserEmail) {
        try {
          const userDoc = await db
            .collection('users')
            .where('email', '==', currentUserEmail)
            .get();
          if (!userDoc.empty) {
            setUserData(userDoc.docs[0].data() as CurrentUser);
          } else {
            Alert.alert('User document not found');
          }
        } catch (error: any) {
          Alert.alert('Error fetching user data:', error.message);
        }
      } else {
        Alert.alert('User not authenticated');
      }
    };

    fetchUserData();
  }, [currentUserEmail]);

  return userData;
};

export default useFetchUserData;
