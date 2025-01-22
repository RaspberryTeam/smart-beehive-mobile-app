import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BeehivesScreen from "../screens/BeehivesScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Screen
                name="Beehives"
                component={BeehivesScreen}
                options={{ title: 'Вулики' }}
            />
        </NavigationContainer>
    )
}

export default AppNavigator;