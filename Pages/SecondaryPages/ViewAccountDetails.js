import React, { useEffect,  useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { UserLoginContext } from '../../Contexts/user'
import {getBookmarksById, getLocationById}from  "../Utils/api"
import { obtainBookmarkId } from "../Utils/obtainBookmarkId";
import { async } from "@firebase/util";
import { AuthErrorCodes, connectAuthEmulator } from "firebase/auth";



function ViewAccountDetails () {
  const { userLogin } = React.useContext(UserLoginContext);
  return (
    <SafeAreaView style={styles.safeareacontainer}>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.avatar}>👤</Text>
          <Text style={styles.title}>{ userLogin.Username} </Text>
          <Text style={styles.message}>First Name:</Text>
          <TextInput
              style={styles.input}
              value={ userLogin.FirstName}
            />
          <Text style={styles.message}>Last Name:</Text>
          <TextInput
              style={styles.input}
              value={ userLogin.LastName}
            />
          <Text style={styles.message}>Email:</Text>
          <TextInput
              style={styles.input}
              value={ userLogin.Email}
            />

        <TouchableOpacity>
          <Text style={styles.button}>Update my details</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeareacontainer: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    fontSize: 50,
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
    fontWeight:'bold'
  },
  message: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 36,
    marginRight: 36
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 12,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    fontSize: 20,
    color: 'white',
    width: 220,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#c01c00',
    padding: 10,
    textAlign: 'center'
  },
});

export default ViewAccountDetails ;
