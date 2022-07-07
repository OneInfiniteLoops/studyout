import React, { useEffect,  useState } from "react";
import {
  View,
  Text,
  Input,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { UserLoginContext } from '../Contexts/user';
import {getBookmarksById, getLocationById}from  "../Utils/api"
import { obtainBookmarkId } from "../Utils/obtainBookmarkId";
import { async } from "@firebase/util";
import { AuthErrorCodes, connectAuthEmulator } from "firebase/auth";
import DeleteBookmark from "../Components/DeleteBookmark";


function Bookmarks({ navigation }) {
  const { userLogin } = React.useContext(UserLoginContext);
  const [locationIds, setLocationIds] =  React.useState(null)
  const [locationInfo, setLocationInfo] =  React.useState(null)
  const [isLoading,setIsLoading]  = useState(true)
  const [deletedBookmark, setDeletedBookmark] = useState([])


  useEffect(()=>{
      getBookmarksById(userLogin.ID).then((body)=>{
        const allLocIds =  obtainBookmarkId(body.data)
        return allLocIds;
       })
       .then((allLocIds)=>{
        setLocationIds(allLocIds)
       })    
    }
  ,[deletedBookmark])
  

useEffect(()=>{
if (locationIds !== null) {
  async function getLocations () {
    const allLocInfo = await Promise.all(
    locationIds.map(async (id) => {
      const response = await getLocationById(id)
      return await response.data
    })
  )
  setLocationInfo(allLocInfo) 
  setIsLoading(false)
  }
  getLocations()
}
},[locationIds,deletedBookmark])

if (isLoading) {
return (
  <View style={styles.loading}>
    <Text >You have no bookmarks</Text>
  </View>
)
}

if (locationInfo.length===0) {
  return (
    <View style={styles.loading}>
      <Text >You have no bookmarks</Text>
    </View>
  )
  }

console.log(locationInfo)
  return (
      <ScrollView keyboardShouldPersistTaps="always" listViewDisplayed={false} style={styles.scrollArea}>
      <View>
        <Text></Text>
{ locationInfo.map((location, index) => {
          return (
            <View key={location.LocationID}>
            <TouchableOpacity
            style={[
              styles.locationCard,
              index === locationInfo.length - 1
                ? { marginBottom: useBottomTabBarHeight() + 25 }
                : { marginBottom: 10 },
            ]}
              onPress={() => {
                navigation.navigate("More information", { location });
              }}
            >
              <Image
                source={{ uri: location.ImgUrl }}
                style={styles.locationImage}
              />
              <View style={styles.textContainer}>
              <Text style={styles.locationName}>{location.LocationName}</Text>
              <Text style={styles.locationAddress}>
                {location.Address}
              </Text>
              <Text style={styles.locationAddress}>
                {location.Postcode}
              </Text>
              <TouchableOpacity
              style={styles.addButton}>
              <DeleteBookmark key={"del_" + location.LocationID}location={location} userLogin={userLogin} setDeletedBookmark={setDeletedBookmark}></DeleteBookmark>
              </TouchableOpacity>
              </View>
              
            </TouchableOpacity>
              
            </View> 
          );
        })}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundColour: { backgroundColor: "#f7f7f7" },
  list: {
    height: "100%",
  },
  locationCard: {
    backgroundColor: "#f7f7f7",
    width: "90%",
    height: "20%",
    alignSelf: "center",
    borderRadius: 15,
    padding: 17,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
 

  locationName: {
    color: "#ff385c",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 6,

  },
  locationImage: {
    width: "40%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 15,
    flexDirection: "row",
    flex: 1,
  },
  locationAddress: {
    color: "#222222",
    paddingBottom: 6,
  },
  opening_hours: {
    color: "green",
    paddingBottom: 10,
  },
  Bookmarks: {
    alignSelf: "center",
    borderRadius: 15,
    width: "90%",
    marginBottom: 150,
    
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    
  },
  listView: {
    alignSelf: "center",
    borderRadius: 15,
    width: "90%",
    marginBottom: 150,
  },
  textContainer: {
    width: "60%",
    marginLeft: 20,
  },
  addButton: {
    backgroundColor: "#ff385c",
    width: 37,
    height: 37,
    alignItems: "center",
    borderRadius: 50,
    position: "relative",
    bottom: 100,
    left: 180,
    zIndex: 1,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    
  },
});


export default Bookmarks;
