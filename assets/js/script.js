/*
Name : Script.js
Description : 
  - Get data from API
  - Store in local storage
  - Display in UI
*/

var listOfStoredCity = [];
var ul = document.getElementById("city-list");
var currWeathContainer = document.getElementById("currentWeatherCurrent");
var fiveDay = document.getElementById("fiveDay");

/*
#######################################################################################
Function name : getCoordinatesForSearchedCity
Description :

- Returns coordinated based on city name
#######################################################################################
*/

function getCoordinatesForSearchedCity(city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=b28479e979d035f7ced7d5be7412cf38";
  var weatherCity = {};
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      //console.log('Success:', data);
      getWeatherFromCoordinates(data.coord.lat, data.coord.lon, city);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return weatherCity;
}

/*
#######################################################################################
Function name : getCoordinatesForSearchedCity
Description :

- Returns weather based on lat and lon
#######################################################################################
*/

function getWeatherFromCoordinates(lat, lon, city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&e&appid=b28479e979d035f7ced7d5be7412cf38&units=imperial";
  var weatherCoords = {};
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      setInLocalStorage(city);
      weatherCoords.date = moment().format("(L)");
      weatherCoords.city = city.charAt(0).toUpperCase() + city.slice(1);
      weatherCoords.temp = data.current.temp + " \xB0F";
      weatherCoords.wind = data.current.wind_speed + " MPH";
      weatherCoords.humidity = data.current.humidity + " %";
      weatherCoords.uvi = data.current.uvi;
      weatherCoords.iconUrl =
        "http://openweathermap.org/img/wn/" +
        data.current.weather[0].icon +
        ".png";
      getUIOfCurrentWeather(weatherCoords);
      ul.textContent = "";
      getUIFromLocalStorage();
      getUIForFiveWeatherForecast(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/*
#######################################################################################
Function name : getCoordinatesForSearchedCity
Description :

- Display UI of current weather
#######################################################################################
*/

function getUIOfCurrentWeather(currentWeather) {
  
  currWeathContainer.textContent = "";
  var cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  var cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");
  var cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  var icon = document.createElement("img");
  var iconUrl = currentWeather.iconUrl;
  icon.setAttribute("src", iconUrl);
  cardTitle.textContent = currentWeather.city + " " + currentWeather.date + " ";
  var carSubTitleTemp = document.createElement("h6");
  carSubTitleTemp.classList.add("card-subtitle");
  carSubTitleTemp.classList.add("mb-2");
  carSubTitleTemp.classList.add("text-muted");
  var carSubTitleWind = document.createElement("h6");
  carSubTitleWind.classList.add("card-subtitle");
  carSubTitleWind.classList.add("mb-2");
  carSubTitleWind.classList.add("text-muted");
  var carSubTitleHum = document.createElement("h6");
  carSubTitleHum.classList.add("card-subtitle");
  carSubTitleHum.classList.add("mb-2");
  carSubTitleHum.classList.add("text-muted");
  var carSubTitleUv = document.createElement("h6");
  carSubTitleUv.classList.add("card-subtitle");
  carSubTitleUv.classList.add("mb-2");
  carSubTitleUv.classList.add("text-muted");
  carSubTitleTemp.innerHTML = "Temp: " + currentWeather.temp + "<br/><br/>";
  carSubTitleWind.innerHTML = "Wind: " + currentWeather.wind + "<br/><br/>";
  carSubTitleHum.innerHTML =
    "Humidity: " + currentWeather.humidity + "<br/><br/>";
  carSubTitleUv.innerHTML = "UV Index: " + currentWeather.uvi + "<br/><br/>";
  cardTitle.appendChild(icon);
  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(carSubTitleTemp);
  cardBodyDiv.appendChild(carSubTitleWind);
  cardBodyDiv.appendChild(carSubTitleHum);
  cardBodyDiv.appendChild(carSubTitleUv);
  cardDiv.appendChild(cardBodyDiv);
  currWeathContainer.appendChild(cardDiv);
}

/*
#######################################################################################
Function name : setInLocalStorage
Description :

- Store value in local storage
#######################################################################################
*/

function setInLocalStorage(cityName) {
  var checkLocalStore = JSON.parse(localStorage.getItem("storedCities"));

  if (checkLocalStore != null) {
    checkLocalStore.push(cityName.toUpperCase());
    console.log(checkLocalStore);
    localStorage.setItem("storedCities", JSON.stringify(checkLocalStore));
  } else {
    listOfStoredCity.push(cityName.toUpperCase());
    localStorage.setItem("storedCities", JSON.stringify(listOfStoredCity));
  }
}

/*
#######################################################################################
Function name : getUIFromLocalStorage
Description :

- Display UI of History from local storage
#######################################################################################
*/

function getUIFromLocalStorage() {
  var storedCities = JSON.parse(localStorage.getItem("storedCities"));
  // Create a Set
  const uniqueStoredCities = new Set();

  for (let city in storedCities) {
    uniqueStoredCities.add(storedCities[city]);
  }

  console.log(uniqueStoredCities);

  for (const Ucity of uniqueStoredCities.values()) {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("list-group-item-secondary");
    li.classList.add("list-group-item-action");
    li.textContent =
      Ucity.charAt(0).toUpperCase() + Ucity.toLowerCase().slice(1);
    ul.appendChild(li);
  }
}


/*
#######################################################################################
Function name : getUIForFiveWeatherForecast
Description :

- Display five weather forecast
#######################################################################################
*/

function getUIForFiveWeatherForecast(data){

  fiveDay.textContent="";
  var fiveForecastTitle = document.createElement("h5");
  fiveForecastTitle.textContent="5-Day Forecast";
  fiveDay.appendChild(fiveForecastTitle);
    for(let i=1;i<6;i++){

        
        let resData = data.daily[i];
        console.log(resData);
        var divCol = document.createElement("div");
        divCol.classList.add("col-sm-2");
        var divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.classList.add("five");
        var divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body")
        var cardTitle = document.createElement("h6");
        cardTitle.classList.add("card-title");
        cardTitle.textContent =new Date((resData.dt)*1000).getDate()
        +"/"+new Date((resData.dt)*1000).getMonth()
        +"/"+new Date((resData.dt)*1000).getFullYear();
        var carIcon = document.createElement("img");
        var carIconUrl ="http://openweathermap.org/img/wn/" +
        resData.weather[0].icon +
        ".png" ;
        carIcon.setAttribute("src", carIconUrl);
        var carTemp = document.createElement("p");
        carTemp.classList.add("card-subtitle");
        carTemp.classList.add("mb-2");
        var temp = Math.round((resData.temp.max)+(resData.temp.min))/2;
        carTemp.textContent ="Temp: "+ temp + " \xB0F" ;
        var carWin = document.createElement("p");
        carWin.classList.add("card-subtitle");
        carWin.classList.add("mb-2");
        carWin.textContent="wind: "+ resData.wind_speed+" MPH";
        var carHum = document.createElement("p");
        carHum.classList.add("card-subtitle");
        carHum.classList.add("mb-2");
        carHum.textContent="Humidity: "+ resData.humidity+" %";
        divCardBody.appendChild(cardTitle);
        divCardBody.appendChild(carIcon);
        divCardBody.appendChild(carTemp);
        divCardBody.appendChild(carWin);
        divCardBody.appendChild(carHum);
        divCard.appendChild(divCardBody)
        divCol.appendChild(divCard)
        fiveDay.appendChild(divCol);
        currWeathContainer.appendChild(fiveDay);
        
    }

    

}

/* Event listner search button */

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let cityName = document.getElementById("city").value;
  getCoordinatesForSearchedCity(cityName);
});

/* Event listner history cities */

ul.addEventListener("click", (e) => {
  e.preventDefault();
  let citName = e.target.textContent;
  getCoordinatesForSearchedCity(citName);
});

getUIFromLocalStorage();
