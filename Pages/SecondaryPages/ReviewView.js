import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { getTimeDate } from '../../Utils/dayjs'


export default function ReviewView(info) {
  const locName = info.route.params.name
  const reviews = info.route.params.reviews

  return (
    <ScrollView>
      <Text style={styles.location_name}>{ locName }</Text>
      <Text></Text>
      <View style={styles.reviewsCard}>{ reviews.map((review)=>{
        return (
          <View style={styles.singleReview}>
            <Text style={styles.reviewBody}>
              {" "}
              {review.StarRating}⭐️ {review.ReviewBody}
            </Text>
            <Text style={styles.vistedOn}>Visted on: {review.VisitDate}</Text>
          </View>
        );
      }) }</View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  singleReview: {
    margin: 10,
    backgroundColor: "#ff385c",
    borderRadius: 15,
    shadowColor: "#ff385c",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  reviewBody: {
    color: "white",
    fontSize: 20,
    margin: 10,
  },
  vistedOn: {
    textAlign: "right",
    marginRight: 10,
    marginBottom: 10,
    color: "#f7f7f7",
  },
  location_name: {
    fontSize: 32,
    marginTop: 10,
    marginLeft: 15,
    fontWeight: "bold",
    color: "#ff385c",
  },
});