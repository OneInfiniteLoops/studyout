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
import { getLocations } from "../Utils/api";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

function ListView({ navigation }) {
  const [locationArray, setLocationArray] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPostStatus, setLocationPostStatus] = useState(false);

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
    getLocations()
      .then((resArray) => {
        setLocationArray(resArray);
        if (userLocation !== null) {
          setLocationArray(
            getLocationDistance(
              resArray,
              Number(userLocation.coords.latitude),
              Number(userLocation.coords.longitude)
            )
          );
        }
      })
      .then(() => {
        setLocationPostStatus(false);
      });
  }, [locationPostStatus]);

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
    <SafeAreaView style={styles.backgroundColour}>
      <ScrollView keyboardShouldPersistTaps="always" listViewDisplayed={false}>
        <GooglePlacesAutocomplete
          styles={styles.searchBar}
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
      <TouchableOpacity
        title="Add Study Space"
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("Add Location", { setLocationPostStatus });
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <ScrollView style={styles.list}>
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
                navigation.navigate("More information", { location });
              }}
            >
              <Image
                source={{ uri: location.ImgUrl }}
                style={styles.locationImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.locationName}>{location.LocationName}</Text>
                <Text style={styles.locationAddress}>{location.Address}</Text>
                <Text style={styles.Condition}>{location.Condition}</Text>
                <Text style={styles.opening_hours}>
                  {location.opening_hours}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundColour: { backgroundColor: "#f7f7f7" },
  list: {
    height: "100%",
  },

  addButton: {
    backgroundColor: "#ff385c",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "center",
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 1,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationCard: {
    backgroundColor: "#f7f7f7",
    width: "90%",
    height: "20%",
    alignSelf: "center",
    borderRadius: 15,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  locationImage: {
    width: "40%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 15,
    flexDirection: "row",
    flex: 1,
  },
  textContainer: {
    width: "60%",
    marginLeft: 20,
  },
  locationName: {
    color: "#ff385c",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  locationAddress: {
    fontWeight: "bold",
    color: "#222222",
    paddingBottom: 6,
  },
  opening_hours: {
    color: "green",
    paddingBottom: 10,
  },

  searchBar: {
    textInputContainer: {
      marginBottom: 10,
      borderRadius: 10,
      width: "90%",
      alignSelf: "center",
    },
    listView: {
      alignSelf: "center",
      borderRadius: 15,
      width: "90%",
      marginBottom: 150,
    },
    textInput: {
      height: 45,
      borderRadius: 40,
      color: "#5d5d5d",
      fontSize: 16,
      shadowColor: "black",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    predefinedPlacesDescription: {
      color: "#1faadb",
    },
  },
});

export default ListView;
