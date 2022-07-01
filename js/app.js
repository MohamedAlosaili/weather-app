import { loader, starter } from "./config.js";
import { getCurrentWeather } from "./components/current.js";

const forms = document.querySelectorAll("[data-form]");
const searchs = document.querySelectorAll("[type='search']");
const userLocationBtns = document.querySelectorAll("[data-my-location]");
let location;
let previousLocation;
let lat;
let lon;
const userLocation = document.querySelector("[data-user-location]");
const userLocationParent = userLocation.parentElement;
const moreInfo = document.querySelector("[data-more-info]");

const storageLocation = localStorage.getItem("location");
const currentLocation = localStorage.getItem("current-location");
// Check LocalStorage
if (storageLocation) {
  if (storageLocation !== "null" && storageLocation !== "undefined") {
    console.log("storage is here");
    starter.remove();
    location = storageLocation;
    if (currentLocation === storageLocation) userLocation.remove();
    getCurrentWeather(location);
  } else {
    localStorage.removeItem("location");
    loader.remove();
    starter.style.display = "block";
  }
} else {
  loader.remove();
  starter.style.display = "block";
}

searchs.forEach((search) => {
  search.addEventListener("focus", () =>
    search.parentElement.classList.add("active")
  );
  search.addEventListener("blur", () =>
    search.parentElement.classList.remove("active")
  );
});

forms.forEach((form, idx) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchFunction(searchs[idx]);
  });
});

userLocationBtns.forEach((btn) => {
  btn.addEventListener("click", getGeolocation);
  btn.addEventListener("mouseenter", (e) => e.target.classList.add("more"));
  btn.addEventListener("mouseleave", (e) => e.target.classList.remove("more"));
});

moreInfo.addEventListener("click", () =>
  moreInfo.previousElementSibling.classList.toggle("more")
);

function searchFunction(search) {
  userLocationParent.append(userLocation);
  location = search.value;

  if (location) {
    document.body.append(loader);
    if (storageLocation !== "null" && storageLocation !== "undefined") {
      previousLocation = storageLocation;
      localStorage.setItem("location", location);
    }
    getCurrentWeather(location);

    search.value = "";
    search.blur();
  }
}

export function somethingWrong(message) {
  if (typeof message === "object")
    message = message.message || "Unknown reason";

  loader.remove();
  if (storageLocation !== "null" && storageLocation !== "undefined")
    localStorage.setItem("location", previousLocation);

  const wrongBox = document.createElement("div");
  wrongBox.classList.add("wrong-box", "layer");

  wrongBox.innerHTML = `
    <div class="box">
      <h3 class="title">Opps, Something went wrong</h3>
      <p class="message">"${message}"</p>
      <button class="btn" data-close-btn>OK</button>
    </div>
  `;
  document.body.append(wrongBox);

  document
    .querySelector("[data-close-btn]")
    .addEventListener("click", () => wrongBox.remove());
}

function getGeolocation() {
  document.body.append(loader);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, somethingWrong);
  } else {
    somethingWrong(
      "Sorry, We can't get your location, <br> This feature not supported by this browser <br> You can use the search box instead"
    );
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  location = `${lat},${lon}`;

  getCurrentWeather(location);
  localStorage.setItem("location", location);
  localStorage.setItem("current-location", location);
  userLocation.remove();
}
