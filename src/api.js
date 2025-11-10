// src/api.js
import mockData from './mock-data';
import NProgress from 'nprogress';

// Helper function to check the validity of an access token
export const checkToken = async (accessToken) => {
 const response = await fetch(
   `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
 );
 const result = await response.json();
 return result;
};

// Helper function to exchange the code for an access token
const getToken = async (code) => {
 const encodeCode = encodeURIComponent(code);
 const response = await fetch(
   "https://ca7b4okylj.execute-api.eu-central-1.amazonaws.com/dev/api/token" + '/' + encodeCode
 );
 const { access_token } = await response.json();
 access_token && localStorage.setItem("access_token", access_token);

 return access_token;
};

// Helper function to remove the code from the URL after using it
const removeQuery = () => {
 let newurl;
 if (window.history.pushState && window.location.pathname) {
   newurl =
     window.location.protocol +
     "//" +
     window.location.host +
     window.location.pathname;
   window.history.pushState("", "", newurl);
 } else {
   newurl = window.location.protocol + "//" + window.location.host;
   window.history.pushState("", "", newurl);
 }
};

/**
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};


// Function to get the access token from local storage or prompt for authorization
export const getAccessToken = async () => {
 const accessToken = localStorage.getItem('access_token');
 // checkToken must be defined globally to be used here
 const tokenCheck = accessToken && (await checkToken(accessToken));


 if (!accessToken || tokenCheck.error) {
   await localStorage.removeItem("access_token");
   const searchParams = new URLSearchParams(window.location.search);
   const code = await searchParams.get("code");
   if (!code) {
     const response = await fetch(
       "https://ca7b4okylj.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
     );
     const result = await response.json();
     const { authUrl } = result;
     return (window.location.href = authUrl);
   }
   return code && getToken(code); // getToken must be defined globally to be used here
 }
 return accessToken;
};

/**
 * This function will fetch the list of all events, with offline support
 */
export const getEvents = async () => {
    // Start progress bar when any data loading begins
    NProgress.start();

    // 1. OFFLINE CHECK: If the user is offline, load event data from cache immediately.
    // This comes BEFORE the token check as instructed.
    if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        NProgress.done();
        // Return cached events (parsed from string) or an empty array if nothing is cached
        return events ? JSON.parse(events) : [];
    }

    // Localhost/Mock Data Check (runs if online)
   if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
       return mockData;
     }

 
     const token = await getAccessToken();

     if (token) {
       removeQuery();
       const url =  "https://ca7b4okylj.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
       const response = await fetch(url);
       const result = await response.json();
       if (result && result.events) {
            NProgress.done();
         // 2. ONLINE SAVE: Storing the new event data to cache for offline use
         localStorage.setItem('lastEvents', JSON.stringify(result.events));
         return result.events;
       } else {
            NProgress.done();
         // Fallback: If fetch fails while online, return cache if available
         const cachedData = localStorage.getItem('lastEvents');
         if (cachedData) {
           return JSON.parse(cachedData);
         }
         return [];
       }
     }
     // Fallback: If token acquisition fails completely while online, return cache if available
     NProgress.done();
    const cachedData = localStorage.getItem('lastEvents');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return [];
};