import { WeatherApp } from "./app_container";
import { CreateBtn } from "./buttons";
import { SearchCity } from "./search";
import { WeatherLoader } from "./weather_loader";
import { WeatherLoaderPL } from "./weather_loaderPL";
import { LocationMap } from "./map";
import { LocationMapPL } from "./mapPL";
import html from "../template.html";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/reset.css";
import "../styles/style.css";

const weatherApp = new WeatherApp();

const containers = document.getElementsByClassName("container-fluid")[0]
  .firstElementChild;

const buttons = new CreateBtn(containers);
const search = new SearchCity(containers);

const weatherContainer = document.getElementsByClassName("weather-container")[0]
  .firstElementChild;
const locationContainer = document.getElementsByClassName("map-container")[0]
  .firstElementChild;

const location = new LocationMap(locationContainer, 19.9167, 50.0833);

const loadBackground = () => {
  let random = Math.round(Math.random() * 11) + 0;
  const images = [
    "url('https://images.unsplash.com/photo-1561583534-09e822ba83ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1312&q=80')",
    "url('https://images.unsplash.com/photo-1466500175961-25431dd05ddd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
    "url('https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1068&q=80')",
    "url('https://images.unsplash.com/photo-1565608221829-f95dd349717f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
    "url('https://images.unsplash.com/photo-1566149097285-d4abca5a107f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1133&q=80')",
    "url('hhttps://images.unsplash.com/photo-1566667937341-0d579faa4597?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80')",
    "url('https://images.unsplash.com/photo-1588943177887-98f2c55a1e71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1078&q=80')",
    "url('https://images.unsplash.com/photo-1562469470-9ecd54546c81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1061&q=80')",
    "url('https://images.unsplash.com/photo-1496245454747-b17bebc37e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
    "url('https://images.unsplash.com/photo-1530105387861-6e2453f541bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
    "url('https://images.unsplash.com/photo-1533907650686-70576141c030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
    "url('https://images.unsplash.com/photo-1471644806490-77c53366b18b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80')",
  ];
  document.getElementById("main").style.backgroundImage = images[random];
};

const getWeatherData = () => {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = `${proxy}http://api.openweathermap.org/data/2.5/forecast?q=${
    document.querySelector("#cityVal").value
  }&appid=ecd61022ece1255dd32aa166c3f623a3`;
  const getForecast = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const newCityWeather = new WeatherLoader(weatherContainer, data);
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZWxsZW5hcnRpdWtoIiwiYSI6ImNrYjhmYThqMjAzbDEzM2pwZzM2cHhoc3EifQ.oMSzSGlyh1yMTWmkUop3sw";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [data.city.coord.lon, data.city.coord.lat],
        zoom: 9,
      });

      var marker = new mapboxgl.Marker()
        .setLngLat([data.city.coord.lon, data.city.coord.lat])
        .addTo(map);

      const locationCoords = new LocationMap(
        locationContainer,
        data.city.coord.lon,
        data.city.coord.lat
      );
      loadBackground();
    });

  document.getElementById("language").addEventListener("change", changeLang);
  document
    .getElementById("toggle-temp")
    .addEventListener("click", switchDegree);
};

const changeLang = () => {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const urlKrk = `${proxy}https://api.openweathermap.org/data/2.5/forecast?id=3094802&appid=ecd61022ece1255dd32aa166c3f623a3`;
  const urlKrkPL = `${proxy}https://api.openweathermap.org/data/2.5/forecast?id=3094802&appid=ecd61022ece1255dd32aa166c3f623a3&lang=pl`;
  const url = `${proxy}http://api.openweathermap.org/data/2.5/forecast?q=${
    document.querySelector("#cityVal").value
  }&appid=ecd61022ece1255dd32aa166c3f623a3`;
  const urlPL = `${proxy}http://api.openweathermap.org/data/2.5/forecast?q=${
    document.querySelector("#cityVal").value
  }&appid=ecd61022ece1255dd32aa166c3f623a3&lang=pl`;

  let krkCity = document.querySelector(".city-wrapper").firstElementChild
    .innerHTML;
    
  if (krkCity === "Krakow, PL" || krkCity === "Kraków, PL") {
    if (document.getElementById("language").value == "pl") {
      const getForecastKrkPL = fetch(urlKrkPL)
        .then((response) => response.json())
        .then((dataPL) => {
          const weatherLoaderPL = new WeatherLoaderPL(weatherContainer, dataPL);
          const locationPL = new LocationMapPL(
            locationContainer,
            dataPL.city.coord.lon,
            dataPL.city.coord.lat
          );
        });
    } else {
      const getForecastKrk = fetch(urlKrk)
        .then((response) => response.json())
        .then((dataEN) => {
          const weatherLoaderEN = new WeatherLoader(weatherContainer, dataEN);
          const locationEN = new LocationMap(
            locationContainer,
            dataEN.city.coord.lon,
            dataEN.city.coord.lat
          );
        });
    }
  } else {
    if (document.getElementById("language").value == "pl") {
      const getForecastPL = fetch(urlPL)
        .then((response) => response.json())
        .then((dataPL) => {
          const weatherLoaderPL = new WeatherLoaderPL(weatherContainer, dataPL);
          const locationPL = new LocationMapPL(
            locationContainer,
            dataPL.city.coord.lon,
            dataPL.city.coord.lat
          );
        });
    } else {
      const getForecast = fetch(url)
        .then((response) => response.json())
        .then((dataEN) => {
          const weatherLoaderEN = new WeatherLoader(weatherContainer, dataEN);
          const locationEN = new LocationMap(
            locationContainer,
            dataEN.city.coord.lon,
            dataEN.city.coord.lat
          );
        });
    }
  }
};

const switchDegree = (e) => {
  let temperature = document.getElementsByClassName("tempr-data");
  if (e.target.value === "f") {
    e.target.classList.add("active");
    e.target.nextElementSibling.classList.remove("active");
    for (let c of temperature) {
      if (c.innerText.length < 4) {
        let f = Math.round(Number(c.innerText.slice(1, 2)) * (9 / 5) + 32);
        c.innerText = `+${f}°`;
      } else if (c.innerText.length > 4) {
        let f = Math.round(Number(c.innerText.slice(1, 4)) * (9 / 5) + 32);
        c.innerText = `+${f}°`;
      } else {
        let f = Math.round(Number(c.innerText.slice(1, 3)) * (9 / 5) + 32);
        c.innerText = `+${f}°`;
      }
    }
  } else {
    e.target.classList.add("active");
    e.target.previousElementSibling.classList.remove("active");
    for (let f of temperature) {
      if (f.innerText.length < 4) {
        let c = Math.round((Number(f.innerText.slice(1, 2)) - 32) * (5 / 9));
        f.innerText = `+${c}°`;
      } else if (f.innerText.length > 4) {
        let c = Math.round((Number(f.innerText.slice(1, 4)) - 32) * (5 / 9));
        f.innerText = `+${c}°`;
      } else {
        let c = Math.round((Number(f.innerText.slice(1, 3)) - 32) * (5 / 9));
        f.innerText = `+${c}°`;
      }
    }
  }
};

window.addEventListener("load", () => {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = `${proxy}https://api.openweathermap.org/data/2.5/forecast?id=3094802&appid=ecd61022ece1255dd32aa166c3f623a3`;
  const getForecastKrk = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherLoader = new WeatherLoader(weatherContainer, data);
    });

  //load mapbox
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZWxsZW5hcnRpdWtoIiwiYSI6ImNrYjhmYThqMjAzbDEzM2pwZzM2cHhoc3EifQ.oMSzSGlyh1yMTWmkUop3sw";
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [19.9167, 50.0833],
    zoom: 9,
  });
  let marker = new mapboxgl.Marker().setLngLat([19.9167, 50.0833]).addTo(map);

  // onload event listeners
  document.getElementById("language").addEventListener("change", changeLang);

  document
    .querySelector(".refresh-btn")
    .addEventListener("click", loadBackground);
  document.getElementById("language").addEventListener("change", changeLang);
  document
    .getElementById("toggle-temp")
    .addEventListener("click", switchDegree);
  document.querySelector(".text-btn").addEventListener("click", getWeatherData);
  document.body.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      getWeatherData();
    }
  });
});
