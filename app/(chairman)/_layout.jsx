import { Text, View, Image } from 'react-native'
import 'react-native-gesture-handler';
import {
  SimpleLineIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import ProfilePage from './Profile/ProfilePage';
import ChairmanHome from './ChairmanHome';
import SignIn from '../(auth)/sign-in';
import { useGlobalContext } from "../../context/GlobalProvider";
import { AuthContext } from "../../store/AuthContext";
import React, { useContext } from 'react';

const Drawer = createDrawerNavigator()

const ChairmanLayout = () => {
  const { setUser, setIsLogged, userLogin } = useGlobalContext();
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    // Clear user data and token
    setUser(null);
    setIsLogged(false);
    authCtx.logout();
  };

  return (
    <Drawer.Navigator
      drawerContent={
        (props)=>{
          return (
            <SafeAreaView>
              <View style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ff9c01"
              }}>
                <Image
                  source={images.accountant}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    marginBottom: 12
                  }}
                />
                <Text className="text-xl text-black font-bold">
                  {userLogin.fullName}
                </Text>
                <Text className="text-lg text-black font-bold">
                  Role: Chairman
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }
      }
      screenOptions={{
        drawerActiveTintColor: '#ff9c01',
        drawerInactiveTintColor: '#ffffff',
        drawerStyle: {
          backgroundColor: '#161622',
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons
              name="person"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
        component={ProfilePage} 
      />

      <Drawer.Screen
        name="ChairmanHome"
        options={{
          drawerLabel: "Chairman Home",
          title: "Chairman Home",
          headerShadowVisible: false,
          drawerIcon: () => (
            <SimpleLineIcons
              name="home"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
        component={ChairmanHome} 
      />
      <Drawer.Screen
        name="Log Out"
        component={SignIn} 
        listeners={{
          focus: handleLogout,
        }}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <MaterialIcons
              name="logout"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default ChairmanLayout