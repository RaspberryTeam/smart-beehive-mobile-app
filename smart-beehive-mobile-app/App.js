import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './src/screens/CalendarScreen';
import BeehivesScreen from './src/screens/BeehivesScreen';
import BeehiveCardInfo from './src/components/BeehiveCardInfo';
import ApiariesScreen from './src/screens/ApiariesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  function ApiaryTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Apiaries') {
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
        <Tab.Screen name="Apiaries" component={ApiariesScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ApiaryTabNavigator} options={{ headerShown: false }} />

        <Stack.Screen
          name="Beehives"
          component={BeehivesScreen}
          options={{ title: 'Hives' }}
        />

        <Stack.Screen
          name='Hive'
          component={BeehiveCardInfo}
          options={{ title: 'Hive info' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}