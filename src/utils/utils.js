import moment from "moment";
import weatherIcons from "../weather-icons.js";

const defaultLatAndLong = {
  latitude: "-33.4333",
  longitude: "-70.6083",
  isGeolocation: false,
};

export const getLatitudeAndLongitude = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) resolve(defaultLatAndLong);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!position) resolve(defaultLatAndLong);

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isGeolocation: true,
        });
      },
      (error) => {
        resolve(defaultLatAndLong);
      }
    );
  });
};

export const saveDataInLocalStorage = function (
  latitude,
  longitude,
  cityName,
  weather
) {
  localStorage.setItem("last-time", new Date().toString());
  localStorage.setItem("cityName", cityName);
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
  localStorage.setItem("weather", JSON.stringify(weather));
};

export const getDataOfLocalStorage = function () {
  return [
    localStorage.getItem("latitude"),
    localStorage.getItem("longitude"),
    localStorage.getItem("cityName"),
    JSON.parse(localStorage.getItem("weather")),
  ];
};

export const isThereValidDataInLocalStorage = function () {
  return (
    localStorage.getItem("last-time") &&
    localStorage.getItem("cityName") &&
    localStorage.getItem("latitude") &&
    localStorage.getItem("longitude") &&
    localStorage.getItem("weather") &&
    // Si el tiempo actual no es mayor a 5 min guardado en local
    moment
      .duration(
        moment(new Date()).diff(
          moment(Date.parse(localStorage.getItem("last-time")))
        )
      )
      .asMinutes() < 3 &&
    moment().format("D") ===
      moment(Date.parse(localStorage.getItem("last-time"))).format("D")
  );
};

export const getImageByWeather = (weatherIcon) => {
  const result = weatherIcons.filter((icon) => weatherIcon === icon.icon);
  return result[0].data.icon_url;
};

export const firstUppercase = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const clearCityString = (cityString) =>
  cityString.replace("Regi??n Metropolitana de Santiago", "RM");
