import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getReviewsByLocationId } from "../../Utils/api";
import { getTimeDate } from "../../Utils/dayjs";
import { addReview } from "../../Utils/api";
import { getLocationById } from "../../Utils/api";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function PlaceView(location) {
  const locationId = location.route.params.location.LocationID;
  const [reviews, setReviews] = useState(null);
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [reviewLoadingError, setReviewLoadingError] = useState(false);
  const [author, SetAuthor] = useState(null);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const locationName = location.route.params.location.LocationName;
  const [locationFeatures, setLocationFeatures] = useState(null);
  const [fullLocationInfo, setFullLocationInfo] = useState(null);
  const locationID = location.route.params.location.LocationID;
  const navigation = useNavigation();
  const [isFeaturesLoading, setIsFeaturesLoading] = useState(true);

  useEffect(() => {
    getReviewsByLocationId(locationId)
      .then((res) => {
        setReviews(res.data);
        setIsReviewLoading(false);
        setReviewSubmitted(false);
      })
      .catch((err) => {
        setReviewLoadingError(true);
      });
  }, [reviewSubmitted]);

  useEffect(() => {
    getLocationById(locationId).then((res) => {
      setFullLocationInfo(res.data);
      setLocationFeatures(res.data.Features);
      setIsFeaturesLoading(false);
    });
  }, [locationId]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      behavior={Platform.OS === "ios" ? "position" : null}
    >
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.locationImage}
          source={{ uri: location.route.params["location"]["ImgUrl"] }}
        />
        <Text style={styles.location_name}>
          {location.route.params["location"]["LocationName"]}
        </Text>
        <View style={styles.locationInfo}>
          {locationFeatures && (
            <>
              <Text style={styles.facilities}>Facilities:</Text>
              <Text style={styles.features}>
                {locationFeatures && locationFeatures.Food && (
                  <FontAwesome5 name="pizza-slice" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.Beverages && (
                  <FontAwesome5 name="faucet" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.WiFi && (
                  <FontAwesome5 name="wifi" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.Noisy && (
                  <FontAwesome5 name="volume-up" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.NaturalLight && (
                  <FontAwesome5 name="cloud-sun" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.FreeParking && (
                  <FontAwesome5 name="parking" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.Toilets && (
                  <FontAwesome5 name="restroom" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.WheelchairAccess && (
                  <FontAwesome5 name="wheelchair" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.PetFriendly && (
                  <FontAwesome5 name="paw" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.PowerSockets && (
                  <FontAwesome5 name="plug" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.Vegan && (
                  <FontAwesome5 name="leaf" size={24} color="#484848" />
                )}{" "}
                {locationFeatures && locationFeatures.PhoneSignal && (
                  <FontAwesome5 name="signal" size={24} color="#484848" />
                )}{" "}
              </Text>
            </>
          )}
          <Text style={styles.moreInfo}>Address:</Text>
          <Text style={styles.location_address}>
            {location.route.params["location"]["Address"]}
          </Text>
          <Text style={styles.moreInfo}>Usage:</Text>
          <Text style={styles.conditions}>
            {location.route.params["location"]["Condition"]}
          </Text>
        </View>
        {reviewLoadingError && (
          <Text style={styles.noReviewsText}>No rating is available</Text>
        )}
        {!isReviewLoading && (
          <View style={styles.reviewsCard}>
            <Text style={styles.rating}>Average rating: 5⭐️</Text>
            <View>
              {reviews.map((review, index) => {
                return (
                  index < 3 && (
                    <View style={styles.singleReview}>
                      <Text style={styles.reviewBody}>
                        {" "}
                        {review.StarRating}⭐️ {review.ReviewBody}
                      </Text>
                      <Text style={styles.vistedOn}>
                        Visted on: {review.VisitDate}
                      </Text>
                    </View>
                  )
                );
              })}
              <Button
                color="#ff385c"
                title="See all reviews"
                onPress={() => {
                  navigation.navigate("Reviews", {
                    name: locationName,
                    reviews: reviews,
                  });
                }}
              />
            </View>
          </View>
        )}
        <View style={styles.submitReviewCard}>
          <Text style={styles.submitReviewCardText}>Submit Review</Text>
          <TextInput
            style={styles.input}
            placeholder={"Write a review"}
            value={reviewBody}
            onChangeText={(reviewBody) => setReviewBody(reviewBody)}
            selectionColor={"#ff385c"}
          />
          <Button
            color="#ff385c"
            title="Submit Review"
            onPress={() => {
              if (reviewBody.length > 0) {
                addReview(
                  location.route.params.location.LocationID,
                  reviewBody
                );
                setReviewSubmitted(true);
                setReviewBody("");
              } else {
                alert("Review cannot be empty");
              }
            }}
          ></Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  noReviewsText: {
    fontSize: 20,
    margin: 22,
    fontWeight: "bold",
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

  submitReviewCard: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  reviewsCard: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  submitReviewCardText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },

  input: {
    margin: 5,
    height: 30,
    fontSize: 20,
    color: "red",
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
  rating: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },

  singleReview: {
    margin: 10,
    backgroundColor: "#ff385c",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  reviewBody: {
    fontSize: 20,
    margin: 10,
    color: "white",
  },

  vistedOn: {
    textAlign: "right",
    marginRight: 10,
    marginBottom: 10,
    color: "#f7f7f7",
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
});
