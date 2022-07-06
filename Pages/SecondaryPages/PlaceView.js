import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getReviewsByLocationId } from "../../Utils/api";
import { getTimeDate } from "../../Utils/dayjs";
import { addReview } from "../../Utils/api";

export default function PlaceView(location) {
  const locationId = location.route.params.location.LocationID;
  const [reviews, setReviews] = useState(null);
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [reviewLoadingError, setReviewLoadingError] = useState(false);
  const [author, SetAuthor] = useState(null);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const locationName = location.route.params.location.LocationName;

  const navigation = useNavigation();

  useEffect(() => {
    getReviewsByLocationId(locationId)
      .then((res) => {
        setReviews(res.data);
        console.log(res.data, "Per Caolon's request");
        setIsReviewLoading(false);
        setReviewSubmitted(false);
      })
      .catch((err) => {
        setReviewLoadingError(true);
      });
  }, [reviewSubmitted]);

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        style={styles.locationImage}
        source={{ uri: location.route.params["location"]["ImgUrl"] }}
      />
      <Text style={styles.location_name}>
        {location.route.params["location"]["LocationName"]}
      </Text>
      <View style={styles.locationInfo}>
        <Text style={styles.moreInfo}>More information</Text>
        <Text style={styles.features}>Features: 🌐🚻🥤🅿️🍽♿️</Text>
        <Text style={styles.location_address}>
          Address: {location.route.params["location"]["Address"]}
        </Text>
        <Text style={styles.conditions}>
          Usage suggestions: {location.route.params["location"]["Condition"]}
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
              addReview(location.route.params.location.LocationID, reviewBody);
              setReviewSubmitted(true);
              setReviewBody("");
            } else {
              alert("Review cannot be empty");
            }
          }}
        ></Button>
      </View>
    </ScrollView>
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
