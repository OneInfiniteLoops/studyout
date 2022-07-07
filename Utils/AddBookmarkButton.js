import { Button, View, Text } from "react-native";
import React from "react";
import { postBookmark } from "./api";
// import Bookmarks from "../Pages/Bookmarks";
import { useEffect, useState } from "react";
import { getBookmarksById } from "./api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

export function AddBookmarkButton({ locationId, userId }) {
  const [allBookmarksById, setAllBookmarksById] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [added, setAdded] = useState();

  const handleClick = (locationId, userId) => {
    postBookmark(locationId, userId)
      .then(() => {
        alert("This bookmark has been added");
      })
      .catch((err) => {
        alert("An error occured when adding this bookmark");
        console.log(err);
      });
  };
  useEffect(() => {
    getBookmarksById(userId).then((res) => {
      setAllBookmarksById(res.data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <View>
        <Text>You have no Bookmarks</Text>
      </View>
    );
  }

  // console.log(userId,locationId)
  // console.log(allBookmarksById)

  // allBookmarksById.filter((obj)=> (obj.UserId ===userId && obj.LocationId===locationId)

  if (typeof allBookmarksById === "undefined") {
    return (
      <Ionicons
        name="md-checkmark-circle"
        size={32}
        color="green"
        onPress={() => handleClick(locationId, userId)}
      />
    );
  } else {
    if (
      allBookmarksById.filter(
        (obj) => obj.UserId === userId && obj.LocationId === locationId
      ).length === 0
    ) {
      return (
        <FontAwesome5
          name="bookmark"
          size={24}
          color="black"
          onPress={() => handleClick(locationId, userId)}
        />
      );
    } else {
      return <Text></Text>;
    }
  }
}

 import { postBookmark } from "./api";
import Bookmarks from "../Pages/Bookmarks";
import { useEffect, useState} from "react";
import { getBookmarksById } from "./api";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from "@expo/vector-icons";



 export default function AddBookmarkButton ({locationId, userId}) {
  
  const [ allBookmarksById , setAllBookmarksById ] = useState(null)
  const [isLoading,setIsLoading]  = useState(true)
  const [added,setAdded]= useState()

   const handleClick = (locationId, userId) => {

     postBookmark(locationId, userId).then(()=>{
       alert("This bookmark has been added")
       })
     .catch((err)=>{
       alert("An error occured when adding this bookmark")
       console.log(err)
     })
   }
   useEffect(()=>{
    getBookmarksById(userId).then((res)=>{
      setAllBookmarksById(res.data);
      setIsLoading(false)
    })
   },[])
   if (isLoading) {
    return (
      <View >
        <Text >You have no Bookmarks</Text>
      </View>
    )
    }
  
    // console.log(userId,locationId)
    // console.log(allBookmarksById)

    // allBookmarksById.filter((obj)=> (obj.UserId ===userId && obj.LocationId===locationId)



   if (typeof allBookmarksById === "undefined") {

     return (
      <Ionicons name="md-checkmark-circle" size={32} color="green"  onPress={()=>handleClick(locationId,userId)}/>
      )}
   else {
    if ((allBookmarksById.filter((obj)=> (obj.UserId ===userId && obj.LocationId===locationId))).length === 0) {
      return (
        <FontAwesome5 name="bookmark" size={24} color="black"  onPress={()=>handleClick(locationId,userId)}/>
      )
    }
    else {
      return(<Text></Text>)
    }
   }



 }
