import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signUp } from "../../services/SignupService";
import CustomAlert from "../../components/CustomAlert";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage1, setAlertMessage1] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      setModalVisible(true);
      setErrorMessage("Please fill in all fields");
      setAlertMessage1("Close");
      setAlertMessage2("");
      return;
    }

    setSubmitting(true);

    try {
      const res = await signUp(form.username, form.email, form.password);
      if (!res) {
        setModalVisible(true);
        setErrorMessage("Password or email is incorrect");
        setAlertMessage1("Try again");
        setAlertMessage2("Clear");
        setSubmitting(false);
        return;
      }


      // Old Code
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to try again sign in
  const handleTryAgain = () => {
    submit();
    setModalVisible(false); 
  };

  // Function to clear email and password fields
  const handClear = () => {
    setForm({ ...form, username: "", email: "", password: "" });
    setModalVisible(false); 
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height-100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
            Sign up to Manufacturio
          </Text>

          <FormField
            title="Username"
            placeholder={"Username"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-5"
            edit={true}
          />

          <FormField
            title="Email"
            placeholder={"email@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
            edit={true}
          />

          <FormField
            title="Password"
            placeholder={"●●●●●●●●"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            edit={true}
          />

          <FormField
            title="Date of Birth"
            placeholder={"YYYY-MM-DD"}
            value={form.dateOfBirth}
            handleChangeText={(e) => setForm({ ...form, dateOfBirth: e })}
            otherStyles="mt-5"
            edit={true}
          />

          <FormField
            title="Phone Number"
            placeholder={"123-456-7890"}
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-5"
            edit={true}
          />

          <FormField
            title="Address"
            placeholder={"1 Vo Van Ngan"}
            value={form.address}
            handleChangeText={(e) => setForm({ ...form, address: e })}
            otherStyles="mt-5"
            edit={true}
          />

          <CustomButton
            title="Sign Up"
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
        isSingleButton={form.username === ""|| form.email === "" || form.password === ""
        || form.dateOfBirth === "" || form.phoneNumber === "" || form.address === "" ? true : false
        }
        onPressButton1={handleTryAgain}
        onPressButton2={handClear}
      />
    </SafeAreaView>
  );
};

export default SignUp;
