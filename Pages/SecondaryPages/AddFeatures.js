import {
  View,
  Button,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import React from "react";
import FeatureButton from "../../Components/FeatureButton";
import { features } from "../../Utils/features";
import { ScrollView } from "react-native-web";

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
    <SafeAreaView>
      <View style={styles.container}>
        {featuresArray.map((feature) => {
          return (
            <FeatureButton
              key={feature}
              feature={feature}
              setFeaturesObj={setFeaturesObj}
            />
          );
        })}
      </View>
      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  submit: {
    backgroundColor: "#ff385c",
    width: "50%",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 40,
    padding: 10,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    marginTop: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
