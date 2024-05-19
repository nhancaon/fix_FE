import { useState,useContext} from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { login,getUserInformationById } from "../../services/LoginServices";
import { AuthContext } from "../../store/AuthContext";
import { decodeJwtMiddleware } from '../../middleware/decode';
import CustomAlert from "../../components/CustomAlert";


const SignIn = () => {
  const { setUser, setIsLogged, setUserLogin, setToken, setUserId  } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage1, setAlertMessage1] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");

  const authCtx = useContext(AuthContext);

  function handleChangeEmail(email) {
    setEmail(email);
  }

  function handleChangePassword(password) {
    setPassword(password);
  }

  async function handleLogin() {
    if (email === "" || password === "") {
      setModalVisible(true);
      setErrorMessage("Please fill in all fields");
      setAlertMessage1("Close");
      setAlertMessage2("");
      return;
    }
    setSubmitting(true);
    try {
      const loginResponse = await login(email, password); // Corrected line
      if (!loginResponse) {
        setModalVisible(true);
        setErrorMessage("Password or email is incorrect");
        setAlertMessage1("Try again");
        setAlertMessage2("Clear");
        setSubmitting(false);
        return;
      }
      setLoginResponse(loginResponse);
      const authObj = loginResponse.result;
      const token = authObj.token;
      setToken(token);

      const userLogin = await getUserInformationById(authObj.token, authObj.id);
      setUser(userLogin);
      setIsLogged(true);

      // Giải mã token
      const decodedToken = await decodeJwtMiddleware(authObj.token);
      setUserId(decodedToken.userId);
      console.log("Decoded Token: ", decodedToken.userId); 
      if (decodedToken.role === 'PRODUCT_MANAGER') {
        setSubmitting(false);
        router.push("/ProductManagerHome");
      } else if (decodedToken.role === 'CHAIRMAN') {
        setSubmitting(false);
        router.push("/ChairmanHome");
      } else if (decodedToken.role === 'ACCOUNTANT') {
        setSubmitting(false);
        setUserLogin(userLogin.result);
        router.push("/AccountantHome");
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

  // Function to try again sign in
  const handleTryAgain = () => {
    handleLogin();
    setModalVisible(false); 
  };

  // Function to clear email and password fields
  const handClear = () => {
    setEmail("");
    setPassword("");
    setModalVisible(false); 
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 200,
          }}
        >
          <Image
            source={images.thumbnail}
            resizeMode="cover"
            style={{ width: Dimensions.get("window").width, height: 300}}
          />

          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
            Welcome to Manufacturio
          </Text>

          <FormField
            title="Email"
            placeholder={"email@gmail.com"}
            value={email}
            handleChangeText={handleChangeEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
            edit={true}
          />

          <FormField
            title="Password"
            placeholder={"●●●●●●●●"}
            value={password}
            handleChangeText={handleChangePassword}
            otherStyles="mt-7"
            edit={true}
          />

          <CustomButton
            title="Sign In"
            handlePress={handleLogin}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            unpressable={false}
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

          <View className="flex justify-center pt-3 flex-row gap-2">
            <Link
              href="/recover-password"
              className="text-lg font-psemibold text-secondary"
            >
              Forgot your password?
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
        isSingleButton={email === "" || password === "" || !(loginResponse === null)}
        onPressButton1={handleTryAgain}
        onPressButton2={handClear} 
      />
    </SafeAreaView>
  );
};

export default SignIn;
