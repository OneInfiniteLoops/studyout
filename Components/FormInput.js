import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormInput({
  inputFunc,
  isValid,
  placeholder,
  errorMessage,
}) {
  const [backgroundColor, setBackgroundColor] = React.useState("lightblue");

  React.useEffect(() => {
    isValid ? null : setBackgroundColor("pink");
  }, [isValid]);

  return (
    <SafeAreaView>
      <View>
        {isValid ? null : <Text>{errorMessage}</Text>}
        <TextInput
          placeholder={placeholder}
          onChangeText={inputFunc}
          onFocus={() => {
            setBackgroundColor("grey");
          }}
          onBlur={() => {
            setBackgroundColor("lightblue");
          }}
          style={[styles.inputField, { backgroundColor }]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
});
