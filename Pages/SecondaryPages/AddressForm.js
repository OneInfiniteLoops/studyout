import { View, Button, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../Components/FormInput";
import { LocationObj } from "../../Utils/locationObj";

export default function AddressForm({ navigation }) {
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

  function updateLocationObj() {
    setLocationObj((currLocationObj) => {
      currLocationObj.LocationName = businessName;
      currLocationObj.Address = `${buildingNumber}, ${street}, ${city}`;
      currLocationObj.Postcode = postcode;
      currLocationObj.Longitude = 1.23;
      currLocationObj.Latitude = 2.45;
      currLocationObj.CreatedBy = 1;

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
        navigation.navigate("Add Picture", { locationObj, setLocationObj });
      }
      setIsSubmitted(false);
    }
  }, [isSubmitted]);
  return (
    <SafeAreaView>
      <View>
        <FormInput
          inputFunc={setBusinessName}
          isValid={businessNameValid}
          placeholder={"Business Name"}
          errorMessage={"Input required"}
        />
        <FormInput
          inputFunc={setBuildingNumber}
          isValid={buildingNumberValid}
          placeholder={"Building Number"}
          errorMessage={"Input required"}
        />
        <FormInput
          inputFunc={setStreet}
          isValid={streetValid}
          placeholder={"Street"}
          errorMessage={"Input required"}
        />
        <FormInput
          inputFunc={setCity}
          isValid={cityValid}
          placeholder={"City"}
          errorMessage={"Input required"}
        />
        <FormInput
          inputFunc={setPostCode}
          isValid={postcodeValid}
          placeholder={"Postcode"}
          errorMessage={"Invalid postcode"}
        />
        <Button title="submit" onPress={handleSubmit}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "70%",
    textAlign: "center",
    alignSelf: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  inputField: {
    // backgroundColor: "lightblue",
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});
