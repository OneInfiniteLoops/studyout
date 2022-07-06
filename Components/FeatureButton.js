import { Button, Pressable, Text } from "react-native";
import React from "react";

export default function FeatureButton({ feature, setFeaturesObj }) {
  const [buttonColor, setButtonColor] = React.useState("grey");
  const [isClicked, setIsClicked] = React.useState(false);

  const handleButton = () => {
    setFeaturesObj((curFeaturesObj) => {
      curFeaturesObj[feature] = !curFeaturesObj[feature];
      return curFeaturesObj;
    });

    setIsClicked(!isClicked);
  };

  React.useEffect(() => {
    isClicked ? setButtonColor("lightgreen") : setButtonColor("lightgrey");
  }, [isClicked]);

  return (
    <Pressable onPress={handleButton}>
      <Text
        style={{
          backgroundColor: buttonColor,
          width: "80%",
          padding: 3,
          margin: 2,
          textAlign: "center",
          alignSelf: "center",
          borderRadius: 5,
        }}
      >
        {feature}
      </Text>
    </Pressable>
  );
}
