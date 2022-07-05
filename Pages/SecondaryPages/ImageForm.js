import { View, Image, Button, StyleSheet } from "react-native";
import axios from "axios";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../Components/FormInput";

export default function ImageForm({ navigation, route }) {
  const [imageUrl, setImageUrl] = React.useState("");
  const [submittedImage, setSubmittedImage] = React.useState(
    "https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
  );
  const [isValid, setIsValid] = React.useState(true);
  const { locationObj, setLocationObj } = route.params;

  function handleUpload() {
    setSubmittedImage(imageUrl);
  }

  function handleSubmit() {
    if (isValid) {
      navigation.navigate("Add Features", { locationObj, setLocationObj });
    }
  }

  React.useEffect(() => {
    setLocationObj((currLocationObj) => {
      currLocationObj.ImgUrl = submittedImage;

      return currLocationObj;
    });
  }, [submittedImage]);

  return (
    <View>
      <Image
        style={{
          width: "80%",
          height: "70%",
          alignSelf: "center",
          borderRadius: 10,
        }}
        source={{
          uri: submittedImage,
        }}
      ></Image>
      <FormInput
        inputFunc={setImageUrl}
        isValid={isValid}
        placeholder={"input image URL"}
        errorMessage={"invalid image URL"}
      />
      <Button title="upload" onPress={handleUpload}></Button>
      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
}
