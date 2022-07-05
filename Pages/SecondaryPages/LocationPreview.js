import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { addLocation } from "../../Utils/api";

export default function LocationPreview({ navigation, route }) {
  const { locationObj, featuresObj } = route.params;

  const handleSubmit = () => {
    addLocation(locationObj, featuresObj).then((response) => {
      if (response.body.Location.LocationID) {
        navigation.popToTop();
      }
    });
  };

  return (
    <View>
      <Image
        style={styles.locationImage}
        source={{ uri: locationObj.ImgUrl }}
      />
      <Text style={styles.location_name}>{locationObj.LocationName}</Text>
      <Text style={styles.location_address}>
        Address: {locationObj.Address}
      </Text>
      <Text style={styles.features}>
        Features: {featuresObj.WiFi ? "🌐 Wi-Fi" : ""},{" "}
        {featuresObj.Food ? "🥪 Food" : ""},{" "}
        {featuresObj.Parking ? "🅿️ Parking" : ""}
      </Text>
      <Text style={styles.conditions}>
        Suggested Conditions Of Use: {locationObj.Condition}
      </Text>
      <Button title="submit" onPress={handleSubmit}></Button>
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
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  location_address: {
    margin: 10,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  opening_hours: {
    margin: 10,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  features: {
    margin: 10,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  conditions: {
    margin: 10,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  created_by: {
    padding: 10,
  },
});
