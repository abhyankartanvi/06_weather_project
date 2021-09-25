const APIKey = "01135a449798815354b5421f38d6f89f";
let city;
let citySearch = document.getElementById("city-search");
let clearHistory = document.querySelector("#clear-history");
let displayCity = document.querySelector(".display-cityname");
let displayTemperature = document.querySelector("#temperature");
let displayHumidity = document.querySelector("#humidity");
let displayWSpeed = document.querySelector("#wind-speed");
let displayUVIndex = document.querySelector("#uv-index");

var responseURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;
