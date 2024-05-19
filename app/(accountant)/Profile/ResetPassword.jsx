import { useState } from "react";
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";

import { images } from "../../../constants";
import { CustomButton, FormField } from "../../../components";
import CustomAlert from "../../../components/CustomAlert";

const ResetPassword = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage1, setAlertMessage1] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (currentPassword === "" || newPassword === "") {
      setModalVisible(true);
      setErrorMessage("Please fill in all fields");
      setAlertMessage1("Close");
      setAlertMessage2("");
      return;
    }

    setSubmitting(true);
  };

  // Function to try again sign in
  const handleTryAgain = () => {
    submit();
    setModalVisible(false); 
  };

  // Function to clear 
  const handClear = () => {
    setCurrentPassword("");
    setNewPassword("");
    setModalVisible(false); 
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4"
          style={{
            minHeight: 0,
          }}
        >
            <Image
                source={images.forgotPassword}
                resizeMode="cover"
                style={{ 
                    width: Dimensions.get("window").width, 
                    height: 300,
                }}
            />

            <Image
                source={images.logo}
                resizeMode="contain"
                style={{marginTop:10}}
                className="w-[150px] h-[104px]"
            />

          <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
            Reset your password
          </Text>

          <FormField
            title="Current password"
            placeholder={"●●●●●●●●"}
            value={currentPassword}
            handleChangeText={setCurrentPassword}
            otherStyles="mt-5"
            edit={true}
          />

          <FormField
            title="New password"
            placeholder={"●●●●●●●●"}
            value={newPassword}
            handleChangeText={setNewPassword}
            otherStyles="mt-5"
            edit={true}
          />

          <CustomButton
            title="Reset Password"
            handlePress={submit}
            containerStyles="mt-5"
            isLoading={isSubmitting}
            unpressable={false}
          />
        </View>
      </ScrollView>

      <CustomAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Error"
        error={errorMessage}
        message1={alertMessage1}
        message2={alertMessage2}
        isSingleButton={currentPassword === "" || newPassword === "" ? true : false}
        onPressButton1={handleTryAgain}
        onPressButton2={handClear}
      />
    </SafeAreaView>
  );
};

export default ResetPassword;
