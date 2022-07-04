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
        {locationsResults.map((locationResult) => (
          <Marker
            key={locationResult.location_id}
            coordinate={{
              latitude: Number(locationResult.latitude),
              longitude: Number(locationResult.longitude),
            }}
            title={locationResult.location_name}
            onPress={() => {
              setLocation(locationResult);
              mapRef.current.animateToRegion(
                {
                  latitude: Number(locationResult.latitude),
                  longitude: Number(locationResult.longitude),
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0421,
                },
                0 * 1000
              );
            }}
          >
            <Callout tooltip>
              <View style={styles.locationCallout}>
                <Text style={styles.locationCalloutText}>
                  {locationResult.location_name}
                </Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
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
            navigation.navigate("Space info", { location });
          }}
        >
          <Image
            source={{ uri: location.image_url }}
            style={styles.locationCardImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.locationCardTitle}>
              {location.location_name}
            </Text>
            <Text style={styles.locationCardText}>
              {location.location_address}
            </Text>
            <Text style={styles.locationCardOpeningHours}>
              {location.opening_hours}
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
    borderRadius: 5,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  locationCardImage: {
    height: "100%",
    width: "50%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  locationCardOpeningHours: {
    color: "green",
  },
  searchBar: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    top: 50,
  },
});
