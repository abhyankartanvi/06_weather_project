const APIKey = "01135a449798815354b5421f38d6f89f";
let city;
let citySearch = document.getElementById("city-search");
let clearHistory = document.querySelector("#clear-history");
var responseURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;
