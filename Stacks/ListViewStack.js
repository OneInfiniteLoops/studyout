import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ListView from "../Pages/ListView";
import PlaceView from "../Pages/SecondaryPages/PlaceView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function ListViewStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListView"
        component={ListView}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Space info"
        component={PlaceView}
        options={{ headerShown: true }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
