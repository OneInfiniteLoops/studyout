import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
})

export const createUser = (username, firstName, lastName, email) => {

    const userObj = { 
        "Username": username,
        "FirstName": firstName,
        "LastName": lastName,
        "Email": email
    }
    return api.post(`/users`,userObj)
  
  }


  export const getUserById = (userId) => {

    return api.get(`/users/${userId}`)
  
  }
