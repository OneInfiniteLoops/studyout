import { View, Button, StyleSheet, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuggestionPage({ navigation, route }) {
  const [suggestion, setSuggestion] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  const { featuresObj, locationObj, setLocationObj } = route.params;

  const handleSubmit = () => {
    if (suggestion.length < 10) {
      setIsValid(false);
    } else {
      navigation.navigate("Location Preview", {
        featuresObj,
        locationObj,
        setLocationObj,
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
      <View>
        <Text style={styles.header}>Suggestion of use</Text>
        <Text style={styles.example}>
          E.g: 2 hours of stay when you buy a drink
        </Text>
        <TextInput
          onChangeText={setSuggestion}
          placeholder="Let other users know if they need to do anything to use the space"
          style={styles.input}
          multiline={true}
        ></TextInput>
        {isValid ? null : <Text>Minimum 20 characters</Text>}
        <Button title="submit" onPress={handleSubmit}></Button>
        <Button title="skip"></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    fontSize: 25,
  },
  example: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    fontSize: 15,
    backgroundColor: "lightgrey",
  },
  input: {
    height: "60%",
    width: "90%",
    alignSelf: "center",
    borderWidth: 2,
    padding: 10,
    margin: 15,
    fontSize: 15,
    textAlignVertical: "top",
  },
});
