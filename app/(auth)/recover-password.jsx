import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomAlert from "../../components/CustomAlert";
import { styles } from "../../components/CustomAlert/styles";

const RecoverPassword = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage1, setAlertMessage1] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (email === "") {
      setModalVisible(true);
      setErrorMessage("Please fill in all fields");
      setAlertMessage1("Close");
      setAlertMessage2("");
      return;
    }

    setSubmitting(true);

    // try {
    //   const res = await signUp(form.username, form.email, form.password);
    //   if (!res) {
    //     setModalVisible(true);
    //     setErrorMessage("Password or email is incorrect");
    //     setAlertMessage1("Try again");
    //     setAlertMessage2("Clear");
    //     setSubmitting(false);
    //     return;
    //   }


    //   // Old Code
    //   const result = await createUser(form.email, form.password, form.username);
    //   setUser(result);
    //   setIsLogged(true);
    //   router.replace("/home");
    // } catch (error) {
    //   console.log("Error", error.message);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  // Function to try again sign in
  const handleTryAgain = () => {
    submit();
    setModalVisible(false); 
  };

  // Function to clear email and password fields
  const handClear = () => {
    setEmail("");
    setModalVisible(false); 
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: 0,
          }}
        >
            <Image
                source={images.forgotPassword}
                resizeMode="cover"
                style={{ 
                    width: Dimensions.get("window").width, 
                    height: 370,
                }}
            />

            <Image
                source={images.logo}
                resizeMode="contain"
                style={{marginTop:10}}
                className="w-[150px] h-[104px]"
            />

          <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
            Forgot your password?
          </Text>

          <FormField
            title="Email"
            placeholder={"Please enter your email address"}
            value={email}
            handleChangeText={setEmail}
            otherStyles="mt-5"
            keyboardType="email-address"
            edit={true}
          />

          <CustomButton
            title="Recover Password"
            handlePress={submit}
            containerStyles="mt-5"
            isLoading={isSubmitting}
            unpressable={false}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>

      <CustomAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Error"
        error={errorMessage}
        message1={alertMessage1}
        message2={alertMessage2}
        isSingleButton={email === "" ? true : false}
        onPressButton1={handleTryAgain}
        onPressButton2={handClear}
      />
    </SafeAreaView>
  );
};

export default RecoverPassword;
