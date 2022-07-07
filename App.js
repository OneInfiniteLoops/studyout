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
import { UserLoginContext } from "./Contexts/user";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  const [userLogin, setUserLogin] = useState({
    ID: 101,
    Username: "garyg",
    FirstName: "Gary",
    LastName: "Summmmm",
    Email: "gary@gmail.com",
  });

  return (
    <UserLoginContext.Provider value={{ userLogin, setUserLogin }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let colour;

              if (route.name === "Home") {
                iconName = focused ? "list" : "list-outline";
                colour = focused ? "#ff385c" : "#484848";
              } else if (route.name === "Map") {
                iconName = focused ? "map" : "map-outline";
                colour = focused ? "#ff385c" : "#484848";
              } else if (route.name === "Account") {
                iconName = focused ? "person" : "person-outline";
                colour = focused ? "#ff385c" : "#484848";
              } else if (route.name === "Bookmarks") {
                iconName = focused ? "star" : "star-outline";
                colour = focused ? "#ff385c" : "#484848";
              }
              return <Ionicons name={iconName} size={size} color={colour} />;
            },
            tabBarLabel: ({ focused, color }) => {
              let label;
              let colour;

              if (route.name === "Home") {
                label = "List";
                colour = focused ? "#ff385c" : "#222222";
              } else if (route.name === "Map") {
                label = "Map";
                colour = focused ? "#ff385c" : "#222222";
              } else if (route.name === "Account") {
                label = "Account";
                colour = focused ? "#ff385c" : "#222222";
              } else if (route.name === "Bookmarks") {
                label = "Bookmarks";
                colour = focused ? "#ff385c" : "#222222";
              }

              return <Text style={{ color: colour }}>{label}</Text>;
            },
          })}
        >
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
    </UserLoginContext.Provider>
  );
}
