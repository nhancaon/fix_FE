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
import ChairmanHome from './ChairmanHome';

const Drawer = createDrawerNavigator()
const COLORS = {
    primary: '#13678A',
    white: "#FFFFFF",
    gray: "#ECF0F4",
}

const ChairmanLayout = () => {
  return (
    
    <Drawer.Navigator>
      <Drawer.Screen
        name="ChairmanHome"
        options={{
          drawerLabel: "ChairmanHome",
          title: "ChairmanHome",
          headerShadowVisible: false,
          drawerIcon: () => (
            <SimpleLineIcons
              name="home"
              size={20}
              color={"#808080"} />
          ),
        }}
        component={ChairmanHome} 
      />
    </Drawer.Navigator>
  )
}

export default ChairmanLayout