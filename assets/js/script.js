/*
Name : Script.js
Description : 
  - Get data from API
  - Store in local storage
  - Display in UI
*/

/*
#######################################################################################
Function name : getCoordinatesForSearchedCity
Description :

- Returns coordinated based on city name
#######################################################################################
*/


function getCoordinatesForSearchedCity(city){

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=b28479e979d035f7ced7d5be7412cf38';
    var weatherCity={};
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        //console.log('Success:', data);
        getWeatherFromCoordinates(data.coord.lat,data.coord.lon,city);
        
        
      })
      .catch((error) => {
        console.error('Error:', error);
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

function getWeatherFromCoordinates(lat,lon,city){

    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&e&appid=b28479e979d035f7ced7d5be7412cf38&units=imperial';
    var weatherCoords ={}
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        //console.log('Success:', data);
        weatherCoords.date = moment().format("(L)");
        weatherCoords.city=city.charAt(0).toUpperCase()+ city.slice(1);;
        weatherCoords.temp=data.current.temp+' \xB0F';
        weatherCoords.wind=data.current.wind_speed + ' MPH';
        weatherCoords.humidity=data.current.humidity+' %';
        weatherCoords.uvi=data.current.uvi;
        weatherCoords.iconUrl ='http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'.png';
        getUIOfCurrentWeather(weatherCoords);
      })
      .catch((error) => {
        console.error('Error:', error);
      });



}

function getUIOfCurrentWeather(currentWeather){

    var currWeathContainer = document.getElementById("currentWeatherCurrent");
    currWeathContainer.textContent="";
    var cardDiv= document.createElement("div");
    cardDiv.classList.add("card");
    var cardBodyDiv=document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    var icon = document.createElement("img");
    var iconUrl = currentWeather.iconUrl;
    icon.setAttribute("src",iconUrl);
    cardTitle.textContent=currentWeather.city +" "+currentWeather.date+" ";
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
    carSubTitleTemp.innerHTML="Temp: " + currentWeather.temp + "<br/><br/>";
    carSubTitleWind.innerHTML="Wind: " + currentWeather.wind + "<br/><br/>";
    carSubTitleHum.innerHTML="Humidity: " + currentWeather.humidity +"<br/><br/>";
    carSubTitleUv.innerHTML="UV Index: " + currentWeather.uvi +"<br/><br/>";
    cardTitle.appendChild(icon);
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(carSubTitleTemp);
    cardBodyDiv.appendChild(carSubTitleWind);
    cardBodyDiv.appendChild(carSubTitleHum);
    cardBodyDiv.appendChild(carSubTitleUv);
    cardDiv.appendChild(cardBodyDiv);
    currWeathContainer.appendChild(cardDiv)


}

searchButton.addEventListener('click', e => {
    e.preventDefault();
    let cityName =document.getElementById('city').value;
    getCoordinatesForSearchedCity(cityName);
 
    
});