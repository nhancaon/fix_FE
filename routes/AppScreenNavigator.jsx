import ProductManagerHome from '../app/screens/ProductManagerHome'; // Đảm bảo rằng đường dẫn đến file này là chính xác


<Stack.Navigator
  initialRouteName="Profile"
  screenOptions={{
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: colors.darkgrey,
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontSize: 28,
      fontWeight: "600",
      letterSpacing: 1.5,
    },
    headerBackTitleVisible: false,
  }}
>
  {/* ...các màn hình khác... */}
  <Stack.Screen
    component={ProductManagerHome}
    name="ProductManagerHome"
  />
</Stack.Navigator>