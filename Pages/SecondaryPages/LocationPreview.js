import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { addLocation, getLocations } from "../../Utils/api";
import { FontAwesome5 } from "@expo/vector-icons";

export default function LocationPreview({ navigation, route }) {
  const { locationObj, featuresObj, setLocationPostStatus } = route.params;

  const handleSubmit = () => {
    addLocation(locationObj, featuresObj)
      .then((response) => {
        Alert.alert("Location Posted Successfully");
        navigation.popToTop();
      })
      .then(() => {
        setLocationPostStatus(true);
      });
  };

  return (
    <View>
      <Image
        style={styles.locationImage}
        source={{ uri: locationObj.ImgUrl }}
      />
      <Text style={styles.location_name}>{locationObj.LocationName}</Text>

      <View style={styles.locationInfo}>
        {featuresObj && (
          <>
            <Text style={styles.facilities}>Facilities:</Text>
            <Text style={styles.features}>
              {featuresObj && featuresObj.Food && (
                <FontAwesome5 name="pizza-slice" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.Beverages && (
                <FontAwesome5 name="faucet" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.WiFi && (
                <FontAwesome5 name="wifi" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.Noisy && (
                <FontAwesome5 name="volume-up" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.NaturalLight && (
                <FontAwesome5 name="cloud-sun" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.FreeParking && (
                <FontAwesome5 name="parking" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.Toilets && (
                <FontAwesome5 name="restroom" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.WheelchairAccess && (
                <FontAwesome5 name="wheelchair" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.PetFriendly && (
                <FontAwesome5 name="paw" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.PowerSockets && (
                <FontAwesome5 name="plug" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.Vegan && (
                <FontAwesome5 name="leaf" size={24} color="#484848" />
              )}{" "}
              {featuresObj && featuresObj.PhoneSignal && (
                <FontAwesome5 name="signal" size={24} color="#484848" />
              )}{" "}
            </Text>
          </>
        )}
        <Text style={styles.moreInfo}>Address:</Text>
        <Text style={styles.location_address}>{locationObj.Address}</Text>
        <Text style={styles.moreInfo}>Usage:</Text>
        <Text style={styles.conditions}>{locationObj.Condition}</Text>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  locationImage: {
    width: 500,
    height: 250,
    alignSelf: "center",
  },
  location_name: {
    fontSize: 32,
    marginTop: 10,
    marginLeft: 15,
    fontWeight: "bold",
    color: "#ff385c",
  },
  locationInfo: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  location_address: {
    margin: 5,
    fontSize: 20,
  },
  moreInfo: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  facilities: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    marginBottom: 10,
  },
  conditions: {
    margin: 5,
    fontSize: 20,
  },
  features: {
    margin: 5,
    fontSize: 20,
  },
  created_by: {
    padding: 10,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "#f7f7f7",
  },
  submitButton: {
    backgroundColor: "#ff385c",
    width: "40%",
    marginTop: "5%",
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
