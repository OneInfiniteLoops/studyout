import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (Platform.OS === "android") {
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  }

  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        {locations.map((location) => (
          <Marker
            key={location.location_id}
            coordinate={{
              latitude: Number(location.latitude),
              longitude: Number(location.longitude),
            }}
            title={location.location_name}
            description={`${location.opening_hours}`}
          ></Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
