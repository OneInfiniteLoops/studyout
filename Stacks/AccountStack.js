import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Account from '../Pages/Account';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function ListViewStack() {
       const Stack = createNativeStackNavigator();
       return (
         <Stack.Navigator>
           <Stack.Screen
             name="Account page"
             component={Account}
             options={{ headerShown: false }}
           ></Stack.Screen>
         </Stack.Navigator>
       );
}