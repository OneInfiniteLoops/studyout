import {
  View,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuggestionPage({ navigation, route }) {
  const [suggestion, setSuggestion] = React.useState("");
  const [backgroundColor, setBackgroundColor] = React.useState("#f7f7f7");
  const [isValid, setIsValid] = React.useState(true);
  const { featuresObj, locationObj, setLocationObj, setLocationPostStatus } =
    route.params;

  const handleSubmit = () => {
    if (suggestion.length < 10) {
      setIsValid(false);
    } else {
      navigation.navigate("Location Preview", {
        featuresObj,
        locationObj,
        setLocationObj,
        setLocationPostStatus,
      });
      setIsValid(true);
    }
  };

  React.useEffect(() => {
    setLocationObj((currLocationObj) => {
      currLocationObj.Condition = suggestion;

      return currLocationObj;
    });
  }, [suggestion]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        behavior={Platform.OS === "ios" ? "position" : null}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Text style={styles.header}>Suggestion of use</Text>
            <Text style={styles.example}>
              E.g: 2 hours of stay when you buy a drink
            </Text>
            <TextInput
              onChangeText={setSuggestion}
              placeholder="Let other users know if they need to do anything to use the space"
              style={[styles.input, { backgroundColor }]}
              multiline={true}
              onFocus={() => {
                setBackgroundColor("white");
              }}
              onBlur={() => {
                setBackgroundColor("#f7f7f7");
              }}
            ></TextInput>
            {isValid ? null : (
              <Text style={styles.errorMessage}>Minimum 20 characters</Text>
            )}
            <Pressable onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    height: "100%",
  },
  header: {
    padding: 20,
    fontSize: 25,
  },
  example: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    fontSize: 15,
    borderRadius: 15,
    backgroundColor: "lightgrey",
  },
  input: {
    height: "50%",
    width: "90%",
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    margin: 15,
    fontSize: 15,
    textAlignVertical: "top",
  },
  errorMessage: {
    width: "80%",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 15,
  },
  submitButton: {
    backgroundColor: "#ff385c",
    width: "40%",
    textAlign: "center",
    alignSelf: "center",
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
});
