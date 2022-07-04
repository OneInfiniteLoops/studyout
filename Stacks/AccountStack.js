import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Account from '../Pages/Account';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from '../Pages/SecondaryPages/Register';

export default function ListViewStack() {
       const Stack = createNativeStackNavigator();
       return (
         <Stack.Navigator>
           <Stack.Screen
             name="Account page"
             component={Account}
             options={{ headerShown: false }}
           ></Stack.Screen>
           <Stack.Screen
             name="Register"
             component={Register}
             options={{ headerShown: true }}
           ></Stack.Screen>
         </Stack.Navigator>
       );
}