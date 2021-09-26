let city = "Melbourne";
let citySearch = document.getElementById("city-search");
let clearHistory = document.querySelector("#clear-history");
let displayCity = document.querySelector(".display-cityname");
let displayTemperature = document.querySelector("#temperature");
let displayHumidity = document.querySelector("#humidity");
let displayWSpeed = document.querySelector("#wind-speed");
let displayUVIndex = document.querySelector("#uv-index");

var APIKey = "01135a449798815354b5421f38d6f89f";
// creating ajax function to display current weather
function currentWeather(city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  console.log("this is query URL", queryURL);
  console.log("this is city", city);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // updating the icon property
    const weatherIcon = response.weather[0].icon;
    console.log(weatherIcon);
    const iconURL =
      "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    console.log(iconURL);
  });
}

currentWeather(city);

// questions to ask TA - WHY DOES THE ICON API PARAT NOT CONTAIN ? IS IT BECAUSE WE ARE NOT ADDING PRESET PARAM AND SIMPLY ASSIGNING VAR
