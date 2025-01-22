import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CalendarScreen from './src/screens/CalendarScreen';
import ApiraysScreen from './src/screens/ApiraysScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BeehivesScreen from './src/screens/BeehivesScreen';
import TabNavigator from './src/navigation/TabNavigator';
import BeehiveCardInfo from './src/components/BeehiveCardInfo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  function ApiaryTabNavigator() {
    return (
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
    );
  }

  return (
    // <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={({ route }) => ({
    //       tabBarIcon: ({ focused, color, size }) => {
    //         let iconName;
    //         if (route.name === 'Apiary') {
    //           iconName = focused ? 'leaf' : 'leaf-outline';
    //         } else if (route.name === 'Calendar') {
    //           iconName = focused ? 'calendar' : 'calendar-outline';
    //         }
    //         return <Ionicons name={iconName} size={size} color={color} />;
    //       },
    //       tabBarActiveTintColor: 'tomato',
    //       tabBarInactiveTintColor: 'gray',
    //     })}
    //   >
    //     <Tab.Screen name="Apiary" component={ApiraysScreen} />
    //     <Tab.Screen name="Calendar" component={CalendarScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer >

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ApiaryTabNavigator} />

        <Stack.Screen
          name="Beehives"
          component={BeehivesScreen}
          options={{ title: 'Вулики' }}
        />

        <Stack.Screen 
          name='Hive'
          component={BeehiveCardInfo}
          options={{title: 'TEst'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
