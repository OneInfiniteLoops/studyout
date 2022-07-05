import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Input,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { LogBox } from "react-native";
import { getLocationDistance } from "../Utils/getLocationDistance";
import * as Location from "expo-location";

const locations = [
  {
    location_id: 1,
    location_name: "Costa Market Street",
    location_address: "28 Market Street, Manchester M1 1PW England",
    postcode: "M11PW",
    latitude: "53.48376591153698",
    longitude: "-2.242955959297516",
    features: {
      wifi: true,
      food: true,
      parking: true,
    },
    conditions: "Buy one coffee",
    opening_hours: "9:00am - 5:00pm",
    image_url:
      "https://media-cdn.tripadvisor.com/media/photo-s/15/0a/f0/52/20181013-164708-largejpg.jpg",
    created_by: "GarySum123",
  },
  {
    location_id: 2,
    location_name: "Manchester Central Library",
    location_address: "St Peter's Square, Manchester M2 5PD",
    postcode: "M2 5PD",
    latitude: "53.478030039764135",
    longitude: "-2.2446160630014624",
    features: {
      wifi: true,
      food: true,
      parking: false,
    },
    conditions: "None",
    opening_hours: "9:00am - 5:00pm",
    image_url:
      "https://eu-assets.simpleview-europe.com/manchester2016/imageresizer/?image=%2Fdmsimgs%2FCentral_Library_publicity_photo.jpg_273973847.png&action=ProductDetail",
    created_by: "CaolanExplores",
  },
  {
    location_id: 3,
    location_name: "Longsight Library",
    location_address: "519 Stockport Rd, Longsight, Manchester M12 4NE",
    postcode: "M12 4NE",
    latitude: "53.458445275050494",
    longitude: "-2.201442223181674",
    features: {
      wifi: true,
      food: true,
      parking: true,
    },
    conditions: "None",
    opening_hours: "9:00am - 5:00pm",
    image_url:
      "https://i0.wp.com/manclibraries.blog/wp-content/uploads/2020/12/longsight-2.jpg?w=1280&ssl=1",
    created_by: "GoCrazyM8",
  },
];

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

function ListView({ navigation }) {
  const [locationArray, setLocationArray] = useState(locations);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  if (Platform.OS === "android") {
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let receivedLocation = await Location.getCurrentPositionAsync({});
        setUserLocation(receivedLocation);
      })();
    }, []);
  }

  if (Platform.OS === "ios") {
    useEffect(() => {
      (async () => {
        let receivedLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setUserLocation(receivedLocation);
      })();
    }, []);
  }

  useEffect(() => {
    if (userLocation !== null) {
      setLocationArray(
        getLocationDistance(
          locationArray,
          Number(userLocation.coords.latitude),
          Number(userLocation.coords.longitude)
        )
      );
    }
  }, [userLocation]);

  useEffect(() => {
    if (searchedLocation !== null) {
      setLocationArray(
        getLocationDistance(
          locationArray,
          searchedLocation.lat,
          searchedLocation.lng
        )
      );
    }
  }, [searchedLocation]);

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.searchBar}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
      >
        <GooglePlacesAutocomplete
          placeholder="Search location here"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setSearchedLocation({
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
            });
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: "en",
            components: "country:gb",
            rankby: "distance",
          }}
        />
      </ScrollView>
      <ScrollView>
        {locationArray.map((location, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.locationCard,
                index === locationArray.length - 1
                  ? { marginBottom: useBottomTabBarHeight() + 25 }
                  : { marginBottom: 10 },
              ]}
              key={location.location_id}
              onPress={() => {
                navigation.navigate("Space info", { location });
              }}
            >
              <Text style={styles.locationName}>{location.location_name}</Text>
              <Text style={styles.locationAddress}>
                {location.location_address}
              </Text>
              <Text style={styles.opening_hours}>{location.opening_hours}</Text>
              <Image
                source={{ uri: location.image_url }}
                style={styles.locationImage}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  locationCard: {
    backgroundColor: "lightblue",
    width: "70%",
    alignSelf: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  locationName: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  locationImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 10,
  },
  locationAddress: {
    fontSize: 18,
    paddingBottom: 6,
  },
  opening_hours: {
    fontSize: 16,
    color: "green",
    paddingBottom: 10,
  },
  searchBar: {
    marginTop: 20,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    fontSize: 20,
    textInputContainer: {
      backgroundColor: "grey",
    },
    textInput: {
      height: 38,
      color: "#5d5d5d",
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: "#1faadb",
    },
  },
});

export default ListView;
