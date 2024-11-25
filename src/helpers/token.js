import { jwtDecode } from "jwt-decode";
import { handleResponse } from 'helpers';

// check token in local storage, if any exist then check token time expire 
export const checkTokenValidity = () => {
  try {
    const token          = localStorage.getItem("token")
    const jsonToken      = JSON.parse(token)
    
    if(jsonToken?.data?.access_token) {
      const decodedToken   = jwtDecode(jsonToken.data.access_token);
      const currentTime    = Date.now() / 1000; // Current time in seconds
      const isTokenExpired = decodedToken.exp < currentTime
      let isTokenValid = !isTokenExpired;
  
      if(isTokenExpired) {
        isTokenValid = refreshToken(jsonToken)
      }
  
      return isTokenValid;
    }

    return false;
  } catch (error) {
    console.error("Invalid token:", error);

    return false;
  }
}


export const setToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
}

export const refreshToken = async (jsonToken) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${jsonToken.data.access_token}`
    },
    body: JSON.stringify({ refresh_token: jsonToken.data.refresh_token })
  };

  try {
    const response = await fetch(API_URL + '/token/refresh', requestOptions);
    const refreshedToken = await handleResponse(response);

    if (refreshedToken.access_token) {
      let token = JSON.parse(localStorage.getItem('token'));

      if (token && token.data) {
          // Update the access_token and refresh_token
          token.data.access_token = refreshedToken.access_token;
          token.data.refresh_token = refreshedToken.refresh_token;

          // Save the updated token object back to localStorage
          localStorage.setItem('token', JSON.stringify(token));
      }

      return true
    }
  } catch (error) {
    console.log('error', error);

    return false
  }
}