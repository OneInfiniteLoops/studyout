import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormInput({
  inputFunc,
  isValid,
  placeholder,
  errorMessage,
}) {
  const [backgroundColor, setBackgroundColor] = React.useState("white");

  React.useEffect(() => {
    isValid ? null : setBackgroundColor("pink");
  }, [isValid]);

  return (
    <View>
      {isValid ? null : <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TextInput
        placeholder={placeholder}
        onChangeText={inputFunc}
        onFocus={() => {
          setBackgroundColor("#f7f7f7");
        }}
        onBlur={() => {
          setBackgroundColor("white");
        }}
        style={[styles.inputField, { backgroundColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    width: "80%",
    margin: "5%",
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 15,
  },
  errorMessage: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});
