import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Map from "../Pages/Map";
import PlaceView from "../Pages/SecondaryPages/PlaceView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function ListViewStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map view"
        component={Map}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="More information"
        component={PlaceView}
        options={{
          headerShown: true,
          headerTintColor: "#ff385c",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
