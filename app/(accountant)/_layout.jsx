import { Text, View, Image } from 'react-native'
import 'react-native-gesture-handler';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerItemList,createDrawerNavigator } from '@react-navigation/drawer'
import AccountantHome from './AccountantHome';
import Inventory from './InventoryPage'
import WorkOrder from './WordOrderPage';
import { images } from "../../constants";
import SignIn from '../(auth)/sign-in';
import { useGlobalContext } from "../../context/GlobalProvider";
import { AuthContext } from "../../store/AuthContext";
import React, { useContext } from 'react';

const Drawer = createDrawerNavigator()
const COLORS = {
    primary: '#13678A',
    white: "#FFFFFF",
    gray: "#ECF0F4",
}

const AccountantLayout = () => {
  const { setUser, setIsLogged } = useGlobalContext();
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
                        backgroundColor: COLORS.white
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
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: COLORS.black,
                            marginBottom: 6
                        }}>Isabella Joanna</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black

                        }}>Accountant</Text>
                    </View>
                    <DrawerItemList {...props} />
                </SafeAreaView>
            )
        }
      }
      screenListeners={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240
        },
        headerStyle: {
          backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTintStyles: {
          fontWeight: 'bold'
        },
        drawerActiveTintColor: 'blue',
        drawerLabelStyle: {
          color: "#111"
        }
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
              color={"#808080"} />
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
              color={"#808080"} />
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
              color={"#808080"} />
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