import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserLoginContext } from "../Contexts/user";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signInWithEmailAndPassword } from "firebase/auth";

import { authentication } from "../firebase.config";
import { getUserById } from "../Utils/api";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Please enter your password")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  )
});

export default function Account({ navigation }) {
  const { userLogin, setUserLogin } = React.useContext(UserLoginContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      email: "",
      password: "",
    },

    reValidateMode: "onChange",
  });

  const signIn = (data) => {
    reset();

    signInWithEmailAndPassword(authentication, data.email, data.password)
      .then((userCred) => {
        const userId = userCred.user.displayName;
        getUserById(userId).then((userObjFromDb) => {
          setUserLogin(userObjFromDb.data);
        });
      })
      .catch((err) => {
        alert("Log in unsuccessful");
      });
  };

  if (!userLogin) {
    return (
      <SafeAreaView style={styles.safeareacontainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.loggedInContainer}>
          <Text style={styles.title}>StudyOut Login</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                style={styles.input}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
          />
          <Text style={styles.error}>
            {errors.email ? errors.email.message : null}
          </Text>
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
          <Text style={styles.error}>
            {errors.password ? errors.password.message : null}
          </Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(signIn)}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.regButton} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.regButtonText}>Register</Text>
          </TouchableOpacity>
          </View>
     </ScrollView>
     </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeareacontainer}>
      <View style={styles.loggedInContainer}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.message}>Welcome, {userLogin.Username}!</Text>
        <View style={styles.item}>
          <Text style={styles.buttonText}>My saved preference</Text>
        </View>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => navigation.navigate("My Account Details")}
          >
            <Text style={styles.buttonText}>My account details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.buttonText}>Delete my account</Text>
        </View>
        <TouchableOpacity style={styles.regButton}>
          <Text style={styles.regButtonText} onPress={() => setUserLogin("")}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareacontainer: {
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  loggedInContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 30,
    color: "#222222",
  },
  error: {
    fontSize: 16,
    color: "red",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 36,
    marginRight: 36,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 12,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  image: {
    width: 120,
    height: 120,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 100,
  },
  loginButton: {
    backgroundColor: "#ff385c",
    padding: 12,
    borderRadius: 15,
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: "#ff385c",
    padding: 12,
    borderRadius: 15,
    marginTop: 30,
  },
  regButton: {
    backgroundColor: "#ffffff",
    borderColor:"#ff385c",
    borderWidth:1,
    padding: 12,
    borderRadius: 15,
    marginTop: 30,
  },
  regButtonText:{
    color:"#ff385c",
    width: 120,
    borderRadius: 10,
    padding: 8,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
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
  message: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 36,
    marginRight: 36,
  },
  item: {
    backgroundColor: "#ff385c",
    width: "70%",
    margin: 15,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  scrollView: {
    backgroundColor: "#f7f7f7",
  },
});
