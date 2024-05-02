import { useState,useContext } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { login,getUserInformationById } from "../../services/LoginServices";
import { AuthContext } from "../../store/AuthContext";
import { decodeJwtMiddleware } from '../../middleware/decode';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(AuthContext);

  function handleChangeEmail(email) {
    setEmail(email);
  }

  function handleChangePassword(password) {
    setPassword(password);
  }

  async function handleLogin() {
    try {
      if (email === "" || password === "") {
        Alert.alert("Error", "Please fill in all fields");
      }
      setSubmitting(true);
      const loginResponse = await login(email, password);
      if (!loginResponse) {
        Alert.alert("Failed", "Password or email is incorrect");
        setSubmitting(false);
        return;
      }
      const authObj = loginResponse.result;
      
      authCtx.authenticate(authObj.token);

      console.log(authObj);
      const userLogin = await getUserInformationById(authObj.token, authObj.id)
      console.log(userLogin);
      setUser(userLogin);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      // Giải mã token
      const decodedToken = await decodeJwtMiddleware(authObj.token); 
      if (decodedToken.role === 'SCOPE_MANAGER') {
        router.replace("/ProductManagerHome"); 
      } else if (decodedToken.role === 'CHAIRMAN') {
        router.replace("/ChairmanHome");
      } else if (decodedToken.role === 'ACCOUNTANT') {
        router.replace("/AccountantHome"); 
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={email}
            handleChangeText={handleChangeEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={password}
            handleChangeText={handleChangePassword}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={handleLogin}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
