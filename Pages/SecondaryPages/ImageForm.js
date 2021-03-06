import { View, Image, Pressable, StyleSheet, Text } from "react-native";
import axios from "axios";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../Components/FormInput";

export default function ImageForm({ navigation, route }) {
  const [imageUrl, setImageUrl] = React.useState("");
  const [submittedImage, setSubmittedImage] = React.useState(
    "https://www.pulsewednesbury.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
  );
  const [isValid, setIsValid] = React.useState(true);
  const { locationObj, setLocationObj, setLocationPostStatus } = route.params;

  function handleUpload() {
    setSubmittedImage(imageUrl);
  }

  function handleSubmit() {
    if (isValid) {
      navigation.navigate("Add Features", {
        locationObj,
        setLocationObj,
        setLocationPostStatus,
      });
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
        style={styles.imagePreview}
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
      <Pressable onPress={handleUpload} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </Pressable>
      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: "60%",
  },
  uploadButton: {
    backgroundColor: "#ffffff",
    borderColor: "#ff385c",
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    width: "60%",
    textAlign: "center",
    alignSelf: "center",
    maginBottom: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  submitButton: {
    backgroundColor: "#ff385c",
    width: "40%",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 30,
    padding: 10,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  uploadButtonText: {
    color: "#ff385c",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  submitButtonText: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
