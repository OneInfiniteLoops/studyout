import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getTimeDate } from '../../Utils/dayjs'

export default function ReviewView(info) {
  const locName = info.route.params.name
  const reviews = info.route.params.reviews

  return (
    <View>
      <Text>{ locName }</Text>
      <Text></Text>
      <View>{ reviews.map((review)=>{
        return(
        <View>
          <Text> { review.ReviewBody}</Text>
          <Text> { review.StarRating}</Text>
          <Text> { review.VisitDate}</Text>
          <Text> { getTimeDate(review.CreatedAt)}</Text>
        </View>
        )
      }) }</View>


    </View>
  )
}

const styles = StyleSheet.create({})