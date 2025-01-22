import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ApiraysScreen from '../screens/ApiraysScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Apiary') {
                            iconName = focused ? 'leaf' : 'leaf-outline';
                        } else if (route.name === 'Calendar') {
                            iconName = focused ? 'calendar' : 'calendar-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Apiary" component={ApiraysScreen} />
                <Tab.Screen name="Calendar" component={CalendarScreen} />
            </Tab.Navigator>
        </NavigationContainer >
    )
}

export default TabNavigator;