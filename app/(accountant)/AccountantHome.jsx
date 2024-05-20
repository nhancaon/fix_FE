import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import SaleForecast from './SaleForecastPage';
import ProduceOrder from './ProduceOrderPage';
import SaleOrder from './SaleOrderPage';
import {TabButton} from '../../components'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SaleForecastDetail from './SaleForecastDetailPage';

const Stack = createNativeStackNavigator();

const SaleForecastStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="SaleForecastPage" component={SaleForecast} options={{ headerShown: false }} />
        <Stack.Screen name="SaleForecastDetailPage" component={SaleForecastDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
);
const AccountantHome = () => {
  const Tab = createBottomTabNavigator()
  const tabs = [
        {
            id: 1,
            title: 'ProduceOrder',
            screen: 'Chat',
            icon: 'layers-triple-outline',
            Component: ProduceOrder
        },
        {
            id: 2,
            title: 'SaleForecast',
            screen: 'Likes',
            icon: 'chart-timeline-variant',
            Component: SaleForecastStack
        },
        {
            id: 3,
            title: 'SaleOrder',
            screen: 'Home',
            icon: 'hexagon-multiple',
            Component: SaleOrder
        }
    ]
  return (
    <Tab.Navigator
                initialRouteName={'SaleForecast'}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar
                }}
            >
                {
                    tabs.map((item, index) => 
                        <Tab.Screen
                            key={item.id}
                            name={item.screen}
                            component={item.Component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton item={item} {...props} />
                            }}
                        />
                    )
                }

            </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        position: 'absolute',
        bottom: 25,
        marginHorizontal: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ffffff',
        backgroundColor: '#ff9c01',
    }
})

export default AccountantHome

