import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserLoginContext } from '../../Contexts/user';

import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { authentication } from '../../firebase.config';
import { createUser, getUserById } from '../../Utils/api';

const schema = yup.object().shape({
  username: yup.string().required("Username is required").min(5, 'Must be at least 5 characters').max(20, 'Must be no longer than 20 characters'),
  firstname: yup.string().required("First Name is required").min(3, 'Must be at least 3 characters').max(35, 'Must be no longer than 35 characters'),
  lastname: yup.string().required("Last Name is required").min(3, 'Must be at least 3 characters').max(35, 'Must be no longer than 35 characters'),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export default function Register({ navigation }) {

  const { userLogin, setUserLogin } = React.useContext(UserLoginContext);
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      'email': '',
      'password': ''
    },

    reValidateMode: 'onSubmit'
  });

  const submit = (data) => {
    reset();
    const firebasePromise = createUserWithEmailAndPassword(authentication, data.email, data.password);
    const createUserPromise = createUser(data.username, data.firstname, data.lastname, data.email);

    Promise.all([firebasePromise, createUserPromise])

      .then((resolvedArr) => {
        const ourId = resolvedArr[1].data.ID;
        updateProfile(resolvedArr[0].user, { displayName: ourId });
        return ourId
      })
      .then((ourId)=>{
        getUserById(ourId)
        .then((res)=> {
          setUserLogin(res.data)
        })
      })
      .catch((err) => {
        alert("An error occured");
      });
  };

  if (userLogin) {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loggedInContainer}>
            <Text style={styles.title}>Your account has been created succssfully!</Text>
            <Text></Text>
            <Button  
                    title="Go to my account"  
                    onPress={() => navigation.navigate("Account page")}  
                />  
          </View>
        </SafeAreaView>
      );
    }

  return (
    <SafeAreaView style={styles.safeareacontainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Username"
              style={styles.input}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <Text style={styles.error}>{errors.username ? errors.username.message : null}</Text>


        <Controller
          control={control}
          name="firstname"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="First Name"
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <Text style={styles.error}>{errors.firstname ? errors.firstname.message : null}</Text>

        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <Text style={styles.error}>{errors.lastname ? errors.lastname.message : null}</Text>

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
        <Text style={styles.error}>{errors.email ? errors.email.message : null}</Text>
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
        <Text style={styles.error}>{errors.password ? errors.password.message : null}</Text>

        <TouchableOpacity
          onPress={handleSubmit(submit)}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>

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
    alignItems: 'center'
  },
});
