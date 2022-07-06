import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AddBookmarkButton from "../../Utils/AddBookmarkButton";
import { UserLoginContext } from "../../Contexts/user";

export default function PlaceView(location) {
    const navigation = useNavigation();
    const locationId = location.route.params.location.LocationID
    const { userLogin } = useContext(UserLoginContext)
    const userId = userLogin.ID

  return (
    <View>

      <Image
        style={styles.locationImage}
        source={{ uri: location.route.params["location"]["ImgUrl"] }}
      />
      <Text style={styles.location_name}>
        {location.route.params["location"]["LocationName"]}
      </Text>
      <Text style={styles.location_address}>
        Address: {location.route.params["location"]["Address"]}
      </Text>
      {/* <Text style={styles.opening_hours}>
        Opening Hours: {location.route.params["location"]["opening_hours"]}
      </Text> */}
      {/* <Text style={styles.features}>
        Features:{" "}
        {location.route.params["location"]["features"]["wifi"]
          ? "🌐 Wi-Fi"
          : ""}
        ,{" "}
        {location.route.params["location"]["features"]["food"] ? "🥪 Food" : ""}
        ,{" "}
        {location.route.params["location"]["features"]["parking"]
          ? "🅿️ Parking"
          : ""}
      </Text> */}
      <Text style={styles.conditions}>
        Suggested Conditions Of Use:{" "}
        {location.route.params["location"]["Condition"]}
      </Text>
      <Text style={styles.created_by}>
        Posted by: {location.route.params["location"]["created_by"]}
      </Text>
      <View>
        <Text>Rating: 5⭐️</Text>
        <ScrollView>
          <TouchableOpacity onPress={() => {
            console.log(navigation)
            navigation.navigate("Reviews");
            console.log('hi')
          }}>
            <Text>This is a dummy review</Text>
          </TouchableOpacity>

          <AddBookmarkButton  locationId={locationId} userId={userId}></AddBookmarkButton>
        </ScrollView>
      </View>
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
