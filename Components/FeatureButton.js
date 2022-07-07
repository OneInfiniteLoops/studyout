import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import React from "react";

export default function FeatureButton({ feature, setFeaturesObj }) {
  const [backgroundColor, setBackgroundColor] = React.useState("grey");
  const [color, setColor] = React.useState("black");
  const [isClicked, setIsClicked] = React.useState(false);

  const handleButton = () => {
    setFeaturesObj((curFeaturesObj) => {
      curFeaturesObj[feature] = !curFeaturesObj[feature];
      return curFeaturesObj;
    });

    setIsClicked(!isClicked);
  };

  React.useEffect(() => {
    isClicked ? setBackgroundColor("#ff385c") : setBackgroundColor("white");
    isClicked ? setColor("white") : setColor("black");
  }, [isClicked]);

  return (
    // <View style={styles.container}>
    <Pressable
      style={[styles.featureButton, { backgroundColor, color }]}
      onPress={handleButton}
    >
      <Text style={(styles.featureButtonText, { color: color })}>
        {feature}
      </Text>
    </Pressable>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  featureButton: {
    width: "45%",
    padding: 10,
    margin: 7,
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 15,
    flex: "auto",
  },
  featureButtonText: {
    color: "black",
  },
});
