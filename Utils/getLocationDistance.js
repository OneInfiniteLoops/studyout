export function getLocationDistance(arrayOfLocations, lat, lon) {
  const geolib = require("geolib");
  let copyOfArrayOfLocations = [...arrayOfLocations];
  return copyOfArrayOfLocations
    .map((location) => {
      location["distance"] = geolib.getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: lat, longitude: lon }
      );
      return location;
    })
    .sort((a, b) => {
      return a.distance - b.distance;
    });
}
