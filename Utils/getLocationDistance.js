export function getLocationDistance(arrayOfLocations, lat, lon) {
  const geolib = require("geolib");
  let copyOfArrayOfLocations = [...arrayOfLocations];
  return copyOfArrayOfLocations
    .map((location) => {
      location["distance"] = geolib.getDistance(
        { Latitude: location.Latitude, Longitude: location.Longitude },
        { Latitude: lat, Longitude: lon }
      );
      return location;
    })
    .sort((a, b) => {
      return a.distance - b.distance;
    });
}
