import { somethingWrong, userLocation } from "../app.js";
import { getCurrentWeather } from "../components/current.js";
import { getForecastingWeather } from "../components/forecast.js";

export async function getCurrentLocation(lat, lon) {
  const API_KEY = "AIzaSyDTttOK0BFkVFCiujplZeh4FW3dAaxa3Bg";
  const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`;
  try {
    const res = await fetch(API_URL);
    const locationData = await res.json();
    console.log(locationData);
    extractLocation(locationData.results);
  } catch (err) {
    somethingWrong(err);
  }
}

function extractLocation(results) {
  let locality;
  let postalCode;
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].address_components.length; j++) {
      for (let k = 0; k < results[i].address_components[j].types.length; k++) {
        if (results[i].address_components[j].types[k] === "locality") {
          locality = results[i].address_components[j].long_name;
        }
        if (results[i].address_components[j].types[k] === "postal_code") {
          postalCode = results[i].address_components[j].long_name;
        }
      }
    }
  }
  if (locality !== undefined && postalCode !== undefined) {
    userLocation.remove();
    const currentLocation = `${locality} ${postalCode}`;
    localStorage.setItem("location", currentLocation);
    localStorage.setItem("current-location", localStorage.getItem("location"));
    getCurrentWeather(currentLocation);
    getForecastingWeather(currentLocation);
  } else {
    somethingWrong(
      "Sorry, We can't get your location now,<br>You can use the search box instead"
    );
  }
}
