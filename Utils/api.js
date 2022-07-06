import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

export const createUser = (username, firstName, lastName, email) => {
  const userObj = {
    Username: username,
    FirstName: firstName,
    LastName: lastName,
    Email: email,
  };
  return api.post(`/users`, userObj);
};

export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

export const getLocations = () => {
  return api.get(`/locations`).then((res) => {
    return res.data;
  });
};

export const getBookmarksById = (userId) => {
  return api.get(`/bookmarks/${userId}`);
};

export const getLocationById = (location_id) => {
  return api.get(`/locations/${location_id}`);
};

export const getReviewsByLocationId = (location_id) => {
  return api.get(`/reviews/${location_id}`);
};

export const addLocation = (locationObj, featuresObj) => {
  const requestObj = {
    Location: locationObj,
    LocationFeature: featuresObj,
  };
  return api.post(`/locations`, requestObj);
};


export const deleteBookmark = (location_id,user_id) => {
  const requestObj = {
    LocationId : location_id,
    UserId : user_id
  }

  return api.delete(`/bookmarks`, {data: requestObj} );
  
  }

export const addReview = (locationID, reviewBody) => {
  const requestObj = {
    UserRefer: 1,
    LocationRefer: locationID,
    VisitDate: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
    StarRating: 5,
    ReviewBody: reviewBody,
  };
  console.log(requestObj);

  return api.post(`/reviews`, requestObj);
};
