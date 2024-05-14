import { Text, View, Image } from 'react-native'
import 'react-native-gesture-handler';
import {
  SimpleLineIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerItemList,createDrawerNavigator } from '@react-navigation/drawer'
import AccountantHome from './AccountantHome';
import Inventory from './InventoryPage'
import WorkOrder from './WordOrderPage';
import { images } from "../../constants";
import SignIn from '../(auth)/sign-in';
import { useGlobalContext } from "../../context/GlobalProvider";
import { AuthContext } from "../../store/AuthContext";
import React, { useContext } from 'react';

const Drawer = createDrawerNavigator();

const AccountantLayout = () => {
  const { setUser, setIsLogged ,userLogin} = useGlobalContext();
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
                          {userLogin.result.fullName}
                        </Text>
                        <Text className="text-lg text-black font-bold">
                          Accountant
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
        name="AccountantHome"
        options={{
          drawerLabel: "AccountantHome",
          title: "AccountantHome",
          headerShadowVisible: false,
          drawerIcon: () => (
            <SimpleLineIcons
              name="home"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
        component={AccountantHome} 
      />
      <Drawer.Screen
        name="Inventory"
        options={{
          drawerLabel: "Inventory",
          title: "Inventory",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons
              name="inventory"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
        component={Inventory} 
      />
      <Drawer.Screen
        name="WorkOrder"
        options={{
          drawerLabel: "WorkOrder",
          title: "WorkOrder",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons
              name="work"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
        component={WorkOrder} 
      />
      <Drawer.Screen
        name="logout"
        component={SignIn} 
        listeners={{
          focus: handleLogout,
        }}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  )
}

export default AccountantLayout