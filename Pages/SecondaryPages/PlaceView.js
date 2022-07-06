import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getReviewsByLocationId } from "../../Utils/api";
import { getTimeDate } from "../../Utils/dayjs";

export default function PlaceView(location) {

 const locationId = location.route.params.location.LocationID
 const [reviews, setReviews] = useState(null)
 const [isReviewLoading, setIsReviewLoading] = useState(true)
 const [ reviewLoadingError , setReviewLoadingError] = useState(false)
 const [ author, SetAuthor ] = useState(null)
 const locationName = location.route.params.location.LocationName


 const navigation = useNavigation();
 
useEffect(()=>{
getReviewsByLocationId(locationId).then((res)=>{
  setReviews(res.data)
  console.log(res.data,"Per Caolon's request")
  setIsReviewLoading(false)
})
.catch((err)=>{
  setReviewLoadingError(true)
})
},[])


  return (
    <ScrollView>
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
      <Text style={styles.conditions}>
        Suggested Conditions Of Use:{" "}
        {location.route.params["location"]["Condition"]}
      </Text>
      <Text style={styles.created_by}>
        Posted by: {location.route.params["location"]["CreatedBy"]} (Need to be the username)
      </Text>
      { reviewLoadingError && <Text>No rating is available</Text>}
      {!isReviewLoading && <View>
        <Text>Rating: 5⭐️ </Text>
        <View>
       {reviews.map((review , index)=>{
          return (
        index < 3 && ( 
        <View>
          <Text> { review.ReviewBody}</Text>
          <Text> { review.StarRating}</Text>
          <Text>{ review.VisitDate}</Text>
          <Text> { getTimeDate(review.CreatedAt)}</Text>

        </View>


          
          )
          )
        })}
        <Text></Text>
        <Button title="See all reviews" onPress={()=>{navigation.navigate("Reviews", { "name": locationName , "reviews": reviews})}}/>
        </View>
      </View>}
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
});
