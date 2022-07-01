import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import ListView from "./Pages/ListView";
import Map from "./Pages/Map";
import Bookmarks from "./Pages/Bookmarks";
import Account from "./Pages/Account";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GOOGLE_MAPS_KEY } from "@env";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ListView}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
