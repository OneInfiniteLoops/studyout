import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import ListView from "./Pages/ListView";
import Map from "./Pages/Map";
import AccountStack from "./Stacks/AccountStack";
import BookmarksStack from "./Stacks/BookmarkStack";
import ListViewStack from "./Stacks/ListViewStack";
import MapStack from "./Stacks/MapStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GOOGLE_MAPS_KEY } from "@env";
import { useState } from "react";
import { UserLoginContext } from "./Contexts/user"

const [userLogin, setUserLogin]  = useState("")

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ListViewStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Map"
          component={MapStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
