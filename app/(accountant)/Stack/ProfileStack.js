import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfilePage from '../Profile/EditProfilePage';
import ResetPassword from '../Profile/ResetPassword';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
