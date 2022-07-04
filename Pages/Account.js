// import { View, Text } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'

// export default function Account() {
//   return (
//     <SafeAreaView>
//       <Text>Account</Text>
//     </SafeAreaView>
//   )
// }

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserLoginContext } from '../Contexts/user';

import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { authentication } from '../firebase.config'
import { getUserById } from '../Utils/api'

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required('Please Enter your password')
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // ),
});


export default function Account({navigation}) {

  const { userLogin, setUserLogin } = React.useContext(UserLoginContext);
  const { control, handleSubmit,  formState: { errors },  reset } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      'email': '',
      'password': ''
    },

    reValidateMode:'onSubmit'
  });

  const signIn = (data) => {
    // reset();

    signInWithEmailAndPassword(authentication, data.email, data.password)
    .then((userCred)=> {
      const userId = userCred.user.displayName
      getUserById(userId)
      .then((userObjFromDb)=>{
        setUserLogin(userObjFromDb.data)
      })
    })
     .catch((err) => {
        alert("There is an error")
        console.log(err)
      });
  };

  function signOut() {
    signOut(authentication)
      .then(() => {
        alert("Sign-out successful");
        setUserLogin("")
      })
      .catch((error) => {
        alert(error);
      });
  }


  if (!userLogin) {
    return (
      <SafeAreaView style={styles.safeareacontainer}>
        <View style={styles.container}>
          <Text style={styles.title}>StudyOut Login</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                style={styles.input}
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='email'
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
          />
          <Text style={styles.error}>{ errors.email ? errors.email.message : null }</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
          />
          <Text style={styles.error}>{ errors.password ? errors.password.message : null }</Text>

          <TouchableOpacity
            onPress={handleSubmit(signIn)}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Button  
                    title="Register an account"  
                    onPress={() => navigation.navigate("Register")}  
                />  
           </View>  

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeareacontainer}>
      <View style={styles.loggedInContainer}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.message}>Welcome, {userLogin.Username} ({userLogin.Email}) !</Text>
        <View style={styles.item}><Text>My saved preference</Text></View>
        <View style={styles.item}><Text>My account settings</Text></View>
        <View style={styles.item}><Text>Delete my account</Text></View>
        <Text></Text>
        <Button title="Log out" onPress={()=> setUserLogin("")}/>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeareacontainer: {
    flex: 1
  },
  container: {
    flex: 1,
    // backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center'
  },

  loggedInContainer: {
    flex: 1,
    // backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
    marginTop: 16,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
    marginBottom: 16,
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
  image: {
    width: 120,
    height: 120,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 100,
  },
  button: {
    fontSize: 20,
    color: 'white',
    width: 120,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#c01c00',
    padding: 8,
    textAlign: 'center'
  },
  message: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 36,
    marginRight: 36
  },
  item: {
    backgroundColor: "lightblue",
    width: "70%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems:'center'
  },
});




