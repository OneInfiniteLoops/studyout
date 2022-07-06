import { View, Button, StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatureButton from "../../Components/FeatureButton";
import { features } from "../../Utils/features";

export default function AddFeatures({ navigation, route }) {
  const [featuresObj, setFeaturesObj] = React.useState({ ...features });
  const featuresArray = Object.keys(features);
  const { locationObj, setLocationObj, setLocationPostStatus } = route.params;

  const handleSubmit = () => {
    navigation.navigate("Add Suggestion", {
      featuresObj,
      locationObj,
      setLocationObj,
      setLocationPostStatus,
    });
  };

  return (
    <View>
      {featuresArray.map((feature) => {
        return (
          <FeatureButton feature={feature} setFeaturesObj={setFeaturesObj} />
        );
      })}
      <Pressable onPress={handleSubmit}>
        <Text style={styles.submit}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {
    width: "80%",
    backgroundColor: "black",
    color: "white",
    alignSelf: "center",
    padding: 20,
    margin: 20,
    textAlign: "center",
    borderRadius: 5,
  },
});
