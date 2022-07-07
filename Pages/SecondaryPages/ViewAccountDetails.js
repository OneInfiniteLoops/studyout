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
import { UserLoginContext } from '../../Contexts/user'


function ViewAccountDetails () {
  const { userLogin } = React.useContext(UserLoginContext);
  return (
    // <SafeAreaView style={styles.safeareacontainer}>
      <ScrollView style={styles.scrollView}>
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update my details</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    // </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeareacontainer: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  avatar: {
    marginTop:10,
    fontSize: 40,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20,
  },

  message: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 36,
    marginRight: 36
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    padding: 12,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: "#ff385c",
    width: "70%",
    margin: 15,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    width: 120,
    borderRadius: 10,
    padding: 8,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  scrollView: {
    backgroundColor: "#f7f7f7",
  },

});

export default ViewAccountDetails ;
