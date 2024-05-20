import 'react-native-gesture-handler';
import { Text, View, Image } from 'react-native'
import React, { useContext } from 'react';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons'
import { images } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import ProfilePage from './Profile/ProfilePage';
import ProductManagerHome from './ProductManagerHome';
import ProductionSchedule from './ProductionSchedule';
import WorkOrder from './WorkOrder';
import PMBOM from './PMBOM';
import SignIn from '../(auth)/sign-in';
import { useGlobalContext } from "../../context/GlobalProvider";
import { AuthContext } from "../../store/AuthContext";
import BOMDetail from '../../components/BOM/BOMDetail';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const PMBOMStack = () => (
  <Stack.Navigator initialRouteName="PMBOM" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PMBOM" component={PMBOM} />
    <Stack.Screen name="BOMDetail" component={BOMDetail} />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator()

const ProductManagerLayout = () => {
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
    }}>
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
        name="ProductManagerHome"
        options={{
          drawerLabel: "Home",
          title: "Home",
          headerShadowVisible: false,
          drawerIcon: () => (
            <SimpleLineIcons
              name="home"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
        component={ProductManagerHome} 
      />
      <Drawer.Screen
        name="ProductionSchedule"
        options={{
          drawerLabel: "ProductionSchedule",
          title: "ProductionSchedule",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="calendar-clock"
              size={20}
              color={"#ff9c01"} />
          ),
        }}
        component={ProductionSchedule}  
      />
      <Drawer.Screen
        name="WorkOrder"
        options={{
          drawerLabel: "Work Order",
          title: "Work Order",
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
        name="BOM" 
        component={PMBOMStack} 
        headerShadowVisible={false}
        options={{ 
          drawerLabel: 'Bill of material',
          drawerIcon: () => (
            <FontAwesome
              name="list-alt"
              size={20}
              color={"#ff9c01"} 
            />
          ),
        }}
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
export default ProductManagerLayout