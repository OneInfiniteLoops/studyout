import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageForm from "../Pages/SecondaryPages/ImageForm.js";
import AddFeatures from "../Pages/SecondaryPages/AddFeatures.js";
import SuggestionPage from "../Pages/SecondaryPages/SuggestionPage.js";
import ListView from "../Pages/ListView";
import PlaceView from "../Pages/SecondaryPages/PlaceView";
import ReviewView from "../Pages/SecondaryPages/ReviewView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressForm from "../Pages/SecondaryPages/AddressForm.js";
import LocationPreview from "../Pages/SecondaryPages/LocationPreview.js";

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
      <Stack.Screen
        name="Reviews"
        component={ReviewView}
        options={{ headerShown: true }}
      ></Stack.Screen>
      <Stack.Screen
        name="Add Location"
        component={AddressForm}
        options={{ headerShown: true }}
      ></Stack.Screen>
      <Stack.Screen
        name="Add Picture"
        component={ImageForm}
        options={{ headerShown: true }}
      ></Stack.Screen>
      <Stack.Screen
        name="Add Features"
        component={AddFeatures}
        options={{ headerShown: true }}
      ></Stack.Screen>
      <Stack.Screen
        name="Add Suggestion"
        component={SuggestionPage}
        options={{ headerShown: true }}
      ></Stack.Screen>
      <Stack.Screen
        name="Location Preview"
        component={LocationPreview}
        options={{ headerShown: true }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
