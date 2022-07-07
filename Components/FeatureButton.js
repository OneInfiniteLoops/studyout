import { StyleSheet, Pressable, Text } from "react-native";
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
    isClicked ? setBackgroundColor("#ff385c") : setBackgroundColor("#f7f7f7");
    isClicked ? setColor("white") : setColor("black");
  }, [isClicked]);

  return (
    <Pressable onPress={handleButton}>
      <Text style={[styles.featureButton, { backgroundColor, color }]}>
        {feature}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  featureButton: {
    width: "80%",
    padding: 3,
    margin: 2,
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
});
