import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GOOGLE_MAPS_KEY } from "@env";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getLocations } from "../Utils/api";

const locationsResults = [
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

export default function Map({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [locationsOnMap, setLocationsOnMap] = useState([]);

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
    if (searchedLocation !== null) {
      mapRef.current.animateToRegion(
        {
          latitude: Number(searchedLocation.lat),
          longitude: Number(searchedLocation.lng),
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        },
        0 * 1000
      );
    }
  }, [searchedLocation]);

  useEffect(() => {
    if (userLocation !== null) {
      mapRef.current.animateToRegion(
        {
          latitude: Number(userLocation.coords.latitude),
          longitude: Number(userLocation.coords.longitude),
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        },
        0 * 1000
      );
    }
  }, [userLocation]);

  useEffect(() => {
    getLocations().then((locationsArray) => {
      setLocationsOnMap(locationsArray);
    });
  }, []);

  return (
    <View>
      <MapView
        ref={mapRef}
        style={styles.map}
        apikey={GOOGLE_MAPS_KEY}
        provider={MapView.PROVIDER_GOOGLE}
        moveOnMarkerPress={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialCamera={{
          center: { latitude: 54, longitude: -3 },
          pitch: 0,
          zoom: 6,
          heading: 0,
          altitude: 1000,
        }}
      >
        {locationsOnMap.map((eachLocationOnMap) => (
          <Marker
            key={eachLocationOnMap.LocationID}
            coordinate={{
              latitude: Number(eachLocationOnMap.Latitude),
              longitude: Number(eachLocationOnMap.Longitude),
            }}
            title={eachLocationOnMap.LocationName}
            onPress={() => {
              setLocation(eachLocationOnMap);
              mapRef.current.animateToRegion(
                {
                  latitude: Number(eachLocationOnMap.Latitude),
                  longitude: Number(eachLocationOnMap.Longitude),
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0421,
                },
                0 * 1000
              );
            }}
          >
            <Callout tooltip key={eachLocationOnMap.LocationID}>
              <View style={styles.locationCallout}>
                <Text style={styles.locationCalloutText}>
                  {eachLocationOnMap.LocationName}
                </Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchBarContainer}>
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
            setLocation(null);
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: "en",
            components: "country:gb",
            rankby: "distance",
          }}
        />
      </View>
      {location && (
        <TouchableOpacity
          style={styles.locationCard}
          onPress={() => {
            navigation.navigate("More information", { location });
          }}
        >
          <Image
            key={location.LocationID}
            source={{ uri: location.ImgUrl }}
            style={styles.locationCardImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.locationCardTitle}>
              {location.LocationName}
            </Text>
            <Text style={styles.locationAddressText}>{location.Address}</Text>
            <Text style={styles.locationCardText}>
              {location.Condition.substring(0, 121)}...
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  locationCallout: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#fff",
    borderWidth: 0.5,
    padding: 8,
    width: 150,
    borderradius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  locationCalloutText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationCard: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 590 : 550,
    backgroundColor: "#fff",
    width: "90%",
    height: "20%",
    alignSelf: "center",
    borderRadius: 15,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  textContainer: {
    width: "50%",
    marginLeft: 20,
    fontSize: 12,
  },
  locationCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ff385c",
  },
  locationAddressText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  locationCardImage: {
    height: "100%",
    width: "50%",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  locationCardOpeningHours: {
    color: "green",
  },
  searchBarContainer: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    top: 50,
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
