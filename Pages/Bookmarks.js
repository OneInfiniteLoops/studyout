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
    <Text >Loading...</Text>
  </View>
)
}

if (locationInfo.length===0) {
  return (
    <View style={styles.loading}>
      <Text >You have no bookmark 😿</Text>
    </View>
  )
  }

console.log(locationInfo)
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
{ locationInfo.map((location, index) => {
          return (
            <View key={location.LocationID}>
            <TouchableOpacity
              style={[
                styles.locationCard,
                index === location.length - 1
                  ? { marginBottom: useBottomTabBarHeight() + 20 }
                  : { marginBottom: 10 },
              ]}
              onPress={() => {
                navigation.navigate("Space info", { location });
              }}
            >
              
              <Text style={styles.locationName}>{location.LocationName}</Text>
              <Text style={styles.locationAddress}>
                {location.Address}
              </Text>
              <Text style={styles.locationAddress}>
                {location.Postcode}
              </Text>
              {/* <Text style={styles.opening_hours}>{location.opening_hours}</Text> */}
              <Image
                source={{ uri: location.ImgUrl }}
                style={styles.locationImage}
              />
            </TouchableOpacity>
              <DeleteBookmark key={"del_" + location.LocationID}location={location} userLogin={userLogin} setDeletedBookmark={setDeletedBookmark}></DeleteBookmark>
            </View> 
          );
        })}
        </View>
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
});

export default Bookmarks;
