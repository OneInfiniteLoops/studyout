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
//app.Get("/api/bookmarks/:user_id"



function Bookmarks({ navigation }) {
  const { userLogin } = React.useContext(UserLoginContext);
  const [locationIds, setLocationIds] =  React.useState(null)
  const [locationInfo, setLocationInfo] =  React.useState(null)
  const [isLoading,setIsLoading]  = useState(true)
    // userLogin.ID = 1


  useEffect(()=>{
      getBookmarksById(userLogin.ID).then((body)=>{
        const allLocIds =  obtainBookmarkId(body.data)
        return allLocIds;
       })
       .then((allLocIds)=>{
        setLocationIds(allLocIds)
       })    
    }
  ,[])
  

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
},[locationIds])

if (isLoading) {
return (
  <View style={styles.loading}>
    <Text >Loading...</Text>
  </View>
)
}

  return (
    <SafeAreaView>
       
      <ScrollView>
        <View>
    
    <Text>


    </Text>

{ locationInfo.map((location, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.locationCard,
                index === location.length - 1
                  ? { marginBottom: useBottomTabBarHeight() + 20 }
                  : { marginBottom: 10 },
              ]}
              key={locationInfo.location_id}
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
