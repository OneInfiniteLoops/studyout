import {
  View,
  Button,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../Components/FormInput";
import { LocationObj } from "../../Utils/locationObj";

export default function AddressForm({ navigation, route }) {
  const [businessName, setBusinessName] = React.useState("");
  const [buildingNumber, setBuildingNumber] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postcode, setPostCode] = React.useState("");
  const [locationObj, setLocationObj] = React.useState({ ...locationObj });
  const [businessNameValid, setBusinessNameValid] = React.useState(true);
  const [buildingNumberValid, setBuildingNumberValid] = React.useState(true);
  const [streetValid, setStreetValid] = React.useState(true);
  const [cityValid, setCityValid] = React.useState(true);
  const [postcodeValid, setPostcodeValid] = React.useState(true);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { setLocationPostStatus } = route.params;

  function updateLocationObj() {
    setLocationObj((currLocationObj) => {
      currLocationObj.LocationName = businessName;
      currLocationObj.Address = `${buildingNumber}, ${street}, ${city}`;
      currLocationObj.Postcode = postcode;
      currLocationObj.Longitude = -2.238327215;
      currLocationObj.Latitude = 53.47236293;
      currLocationObj.CreatedBy = 101;

      return currLocationObj;
    });
  }
  function handleSubmit() {
    if (businessName.length === 0) {
      setBusinessNameValid(false);
    } else {
      setBusinessNameValid(true);
    }
    if (
      buildingNumber.length === 0 ||
      !Number.isInteger(Number(buildingNumber))
    ) {
      setBuildingNumberValid(false);
    } else {
      setBuildingNumberValid(true);
    }
    if (street.length === 0) {
      setStreetValid(false);
    } else {
      setStreetValid(true);
    }
    if (city.length === 0) {
      setCityValid(false);
    } else {
      setCityValid(true);
    }
    const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

    const isCorrectPostcodeFormat = postcodeRegex.test(postcode);

    if (postcode.length === 0 || !isCorrectPostcodeFormat) {
      setPostcodeValid(false);
    } else {
      setPostcodeValid(true);
    }

    setIsSubmitted(true);
  }

  React.useEffect(() => {
    if (isSubmitted) {
      if (
        (businessNameValid,
        buildingNumberValid,
        streetValid,
        cityValid,
        postcodeValid)
      ) {
        updateLocationObj();
        navigation.navigate("Add Picture", {
          locationObj,
          setLocationObj,
          setLocationPostStatus,
        });
      }
      setIsSubmitted(false);
    }
  }, [isSubmitted]);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        behavior={Platform.OS === "ios" ? "position" : null}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.formContainer}>
            <FormInput
              style={styles.input}
              inputFunc={setBusinessName}
              isValid={businessNameValid}
              placeholder={"Business Name"}
              errorMessage={"Input required"}
            />
            <FormInput
              style={styles.input}
              inputFunc={setBuildingNumber}
              isValid={buildingNumberValid}
              placeholder={"Building Number"}
              errorMessage={"Input required"}
            />
            <FormInput
              style={styles.input}
              inputFunc={setStreet}
              isValid={streetValid}
              placeholder={"Street"}
              errorMessage={"Input required"}
            />
            <FormInput
              style={styles.input}
              inputFunc={setCity}
              isValid={cityValid}
              placeholder={"City"}
              errorMessage={"Input required"}
            />
            <FormInput
              style={styles.input}
              inputFunc={setPostCode}
              isValid={postcodeValid}
              placeholder={"Postcode"}
              errorMessage={"Invalid postcode"}
            />
            <Pressable onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </Pressable>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: "center",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#ff385c",
    width: "40%",
    marginTop: "10%",
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
