import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Map from "../Pages/Map";
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
    </Stack.Navigator>
  );
}
