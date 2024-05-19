import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { images } from '../../../constants';
import styles from './stylesProfile';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { CustomButton, FormField } from '../../../components';
import { useNavigation } from '@react-navigation/native';

const EditProfilePage = () => {
  const { setUser, setIsLogged, userLogin } = useGlobalContext();
  const [edit, setEdit] = useState(false);
  const [disableEdit, setDisableEditing] = useState(true);

  function handleEdit() {
    setEdit(!edit);
    setDisableEditing(!disableEdit); 
  }

  const navigation = useNavigation();

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4" style={styles.container}>
          <View style={styles.headerContainer}>
            <Image source={images.accountant} resizeMode="cover" style={styles.avatar} />

            <View style={styles.headingContainer}>
              <Text style={styles.first_heading}>{userLogin.fullName}</Text>
              <Text style={styles.first_heading}>Role: Accountant</Text>
            </View>

            <TouchableOpacity style={styles.editIcon} onPress={handleEdit}>
              <Icon name="edit" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.passwordResetIcon} onPress={handleResetPassword}>
              <Icon name="lock" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <FormField
            title="Full name"
            placeholder={userLogin.fullName}
            otherStyles="mt-5"
            keyboardType="default"
            edit={edit}
          />

          <FormField
            title="Email"
            placeholder={userLogin.email}
            otherStyles="mt-5"
            keyboardType="email-address"
            edit={edit}
          />

          <FormField
            title="Date of birth"
            placeholder={userLogin.dateOfBirth}
            otherStyles="mt-5"
            edit={edit}
          />

          <FormField
            title="Phone number"
            placeholder={userLogin.phoneNumber}
            otherStyles="mt-5"
            keyboardType="phone-pad"
            edit={edit}
          />

          <FormField
            title="Address"
            placeholder={userLogin.address}
            otherStyles="mt-5"
            keyboardType="default"
            edit={edit}
          />

          <CustomButton
            title="SAVE"
            // handlePress={handleLogin}
            containerStyles="mt-7"
            // isLoading={true}
            unpressable={disableEdit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfilePage;
