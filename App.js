import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import ListView from "./Pages/ListView";
import Map from "./Pages/Map";
import Bookmarks from "./Pages/Bookmarks";
import Account from "./Pages/Account";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ListView} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Account" component={Account} />
        <Tab.Screen name="Bookmarks" component={Bookmarks} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
