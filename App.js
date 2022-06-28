import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/homeStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import ListView from "./Components/ListView";
import Map from "./Components/Map";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ListView} />
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
