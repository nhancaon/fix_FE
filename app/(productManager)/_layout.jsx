import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons'
import {createDrawerNavigator } from '@react-navigation/drawer'
import ProductManagerHome from './ProductManagerHome';
const Drawer = createDrawerNavigator()
const COLORS = {
    primary: '#13678A',
    white: "#FFFFFF",
    gray: "#ECF0F4",
}
import SignIn from '../(auth)/sign-in';
import { useGlobalContext } from "../../context/GlobalProvider";
import { AuthContext } from "../../store/AuthContext";

const ProductManagerLayout = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const authCtx = useContext(AuthContext);
  const handleLogout = () => {
    // Clear user data and token
    setUser(null);
    setIsLogged(false);
    authCtx.logout();
    
  };
  return (
    <Drawer.Navigator >
      <Drawer.Screen
        name="ProductManagerHome"
        options={{
          drawerLabel: "ProductManagerHome",
          title: "ProductManagerHome",
          headerShadowVisible: false,
          drawerIcon: () => (
            <SimpleLineIcons
              name="home"
              size={20}
              color={"#808080"} />
          ),
        }}
        component={ProductManagerHome} 
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
export default ProductManagerLayout