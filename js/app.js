import { getCurrentWeather } from "./components/current.js";
import { getForecastingWeather } from "./components/forecast.js";
import { getCurrentLocation } from "./components/current-location.js";

export const starter = document.getElementById("starter");
export const loader = document.querySelector("[data-loader]");
loader.remove();
const forms = document.querySelectorAll("[data-form]");
const searchs = document.querySelectorAll("[type='search']");
const userLocationBtns = document.querySelectorAll("[data-my-location]");
let location;
let previousLocation;
export let lat = 0;
export let lon = 0;
const userLocation = document.querySelector("[data-user-location]");
const moreInfo = document.querySelector("[data-more-info]");

let rotate = 0;
export let loaderInterval;

// Check LocalStorage
if (localStorage.getItem("location")) {
  starter.remove();
  removeLoader();
  location = localStorage.getItem("location");
  getCurrentWeather(location);
  getForecastingWeather(location);
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
  form.addEventListener("submit", (e) => searchFunction(e, searchs[idx]));
});

userLocationBtns.forEach((btn) => {
  btn.addEventListener("click", getGeolocation);
  btn.addEventListener("mouseenter", (e) => e.target.classList.add("more"));
  btn.addEventListener("mouseleave", (e) => e.target.classList.remove("more"));
});
moreInfo.addEventListener("click", (e) => {
  e.preventDefault();
  moreInfo.previousElementSibling.classList.toggle("more");
});

function searchFunction(e, search) {
  userLocation.parentElement.append(userLocation);
  e.preventDefault();
  location = search.value;

  if (location) {
    previousLocation = localStorage.getItem("location");
    callLoader();

    localStorage.setItem("location", location);
    getCurrentWeather(location);
    getForecastingWeather(location);

    search.value = "";
    search.blur();
  }
}

export function somethingWrong(message) {
  removeLoader();
  localStorage.setItem("location", previousLocation);

  const wrongBox = document.createElement("div");
  wrongBox.classList.add("wrong-box", "layer");

  wrongBox.innerHTML = `
    <div class="box">
      <h3 class="title">Opps, Sorry we don't find this location.<br>Please try another location</h3>
      <p class="message">"${message}"</p>
      <button class="btn" data-close-btn>OK</button>
    </div>
  `;
  document.body.append(wrongBox);

  document
    .querySelector("[data-close-btn]")
    .addEventListener("click", () => wrongBox.remove());
}

function getGeolocation(e) {
  userLocation.remove();
  callLoader();
  e.preventDefault();

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    getCurrentLocation();
  });
}

export function callLoader() {
  document.body.append(loader);
  loader.style.display = "block";
  loaderIntervalFunction();
}
export function removeLoader() {
  loader.remove();
  clearInterval(loaderInterval);
}

function loaderIntervalFunction() {
  loaderInterval = setInterval(() => {
    loader.children[0].style.transform = `translate(-50%, -50%) rotate(${(rotate += 360)}deg)`;
  }, 600);
}
