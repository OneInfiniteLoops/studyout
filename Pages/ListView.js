import React from "react";
import { View, Text, Input, StyleSheet, TextInput, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

function ListView() {
  const [searchBarClicked, setSearchBarClicked] = React.useState(false);
  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Search for a location..."
          style={searchBarClicked ? styles.inputClicked : styles.input}
          onFocus={() => {
            setSearchBarClicked(true);
          }}
        />
      </View>
      <ScrollView>
        {locations.map((location) => {
          return (
            <View style={styles.locationCard} key={location.location_id}>
              <Text style={styles.locationName}>{location.location_name}</Text>
              <Text style={styles.locationAddress}>
                {location.location_address}
              </Text>
              <Text style={styles.opening_hours}>{location.opening_hours}</Text>
              <Image
                source={{ uri: location.image_url }}
                style={styles.locationImage}
              />
            </View>
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

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    fontSize: 20,
  },
  inputClicked: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    width: "80%",
    borderRadius: 10,
    alignSelf: "center",
    fontSize: 20,
  },
});

export default ListView;
