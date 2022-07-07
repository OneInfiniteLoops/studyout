import { Button, View, Text } from "react-native";
import React from "react";
import { deleteBookmark } from "../Utils/api";
export default function DeleteBookmark({location,userLogin,setDeletedBookmark}) {

  const handleClick = (location_id,user_id) => {
    console.log(location_id)
    console.log(user_id)
    deleteBookmark(location_id, user_id).then(()=>{
      alert("This bookmark has been removed")
      setDeletedBookmark((prevBookmark)=>{
        let newBookmark = [...prevBookmark]
        newBookmark.push(location.LocationID)
        return newBookmark
      })
    })
    .catch((err)=>{
      alert("An error occured when deleting this bookmark")
      console.log(err)
    })
  }

  return (
    <Button title="[from delete bookmark component]" onPress={()=>handleClick(location.LocationID,userLogin.ID)}/>
  )
}
