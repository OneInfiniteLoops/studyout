import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Account from '../Pages/Account';
import ViewAccountDetails from '../Pages/SecondaryPages/ViewAccountDetails';
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
             options={{ headerShown: false }}
           ></Stack.Screen>
           <Stack.Screen
             name="My Account Details"
             component={ViewAccountDetails}
             options={{ headerShown: true }}
           ></Stack.Screen>
         </Stack.Navigator>
       );
}