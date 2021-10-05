let city = "";
let citySearch = document.getElementById("city-search");
let searchButton = document.querySelector("#search-button");
let clearHistory = document.querySelector("#clear-history");
let displayCity = document.querySelector(".display-cityname");
let displayTemperature = document.querySelector("#temperature");
let displayHumidity = document.querySelector("#humidity");
let displayWSpeed = document.querySelector("#wind-speed");
let displayUVIndex = document.querySelector("#uv-index");
let list = [];

if (localStorage.getItem("displayCity")) {
  list = localStorage.getItem("displayCity");
  list = JSON.parse(list);
}

var APIKey = "01135a449798815354b5421f38d6f89f";
// creating ajax function to display current weather
function currentWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric" +
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
    // work on getting the time correct
    const displayDate = new Date(response.dt * 1000).toDateString();
    console.log(displayDate);

    // add the city name, time and icon

    $(displayCity).html(
      response.name + " " + displayDate + "<img src=" + iconURL + ">"
    );
    console.log(displayCity);
    // adding temp
    $(displayTemperature).text(response.main.temp + " celcius");
    $(displayHumidity).text(" " + response.main.humidity + "%");
    $(displayWSpeed).text(" " + response.wind.speed + " meter/sec ");
    weatherForecast(city);

    makeList();

    // UV index to be added later
  });
}

function displayWeather(event) {
  event.preventDefault();
  console.log(citySearch.value);
  if (citySearch.value !== "") {
    city = citySearch.value;
    currentWeather(city);
    list.push(city);
    localStorage.setItem("displayCity", JSON.stringify(list));
  }
}

// 5 day forecast
function weatherForecast(city) {
  var responseURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric" +
    "&appid=" +
    APIKey;
  console.log("this is query URL", responseURL);
  console.log("this is city", city);
  $.ajax({
    url: responseURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (i = 0; i < 5; i++) {
      const iconCode = response.list[i].weather[0].icon;
      console.log(iconCode);
      const fIconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
      console.log(fIconURL);

      const fTemp = response.list[i].main.temp;
      const fHum = response.list[i].main.humidity;
      const fIcon = $("<img>").attr("src", fIconURL);
      const fDate = new Date(response.list[i].dt * 1000).toDateString();
      console.log(fDate);
      $(".futureweatherdate" + i).text(fDate);
      $(".futureweatherlogo" + i).html(fIcon);
      $(".futureTemp" + i).text(fTemp + " celcius");
      $(".futurehumidity" + i).text(fHum + " %");
    }
  });
}
// weatherForecast(city);

// create a fn to add cities as list item
// added as a basic function
function makeList() {
  let storageList = JSON.parse(localStorage.getItem("displayCity"));
  document.querySelector("#city-history").innerHTML = "";
  for (let i = 0; i < storageList.length; i++) {
    document.querySelector("#city-history").append(storageList[i] + ", ");
  }
}

if (list.length > 0) {
  makeList();
}

// work in progress as clear is returning undefined
function clear(event) {
  event.preventDefault();
  document.querySelector("#city-history").innerHTML =
    localStorage.clear("displayCity");
}

$("#search-button").on("click", displayWeather);
$(".clear-history").on("click", clear);
