import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SaleForecast from '../SaleForecastPage';
import SaleForecastDetail from '../SaleForecastDetailPage';

const Stack = createNativeStackNavigator();

const SaleForecastStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SaleForecastPage" component={SaleForecast} />
            <Stack.Screen name="SaleForecastDetailPage" component={SaleForecastDetail} />
        </Stack.Navigator>
    );
};

export default SaleForecastStack;
