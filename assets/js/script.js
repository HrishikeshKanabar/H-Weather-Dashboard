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
    var coords ={}
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        coords.lat=data.coord.lat;
        coords.lon =data.coord.lon;
      })
      .catch((error) => {
        console.error('Error:', error);
      });


     
     return coords;
}

/*
#######################################################################################
Function name : getCoordinatesForSearchedCity
Description :

- Returns weather based on lat and lon
#######################################################################################
*/

function getWeatherFromCoordinates(lat,lon){

    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&e&appid=b28479e979d035f7ced7d5be7412cf38&units=imperial';
    var weather ={}
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        weather.date = moment().format("(L)");
        weather.temp=data.current.temp+' \xB0F';
        weather.wind=data.current.wind_speed + ' MPH';
        weather.humidity=data.current.humidity+' %';
        weather.uvi=data.current.uvi;
        weather.iconnUrl ='http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'.png';
      })
      .catch((error) => {
        console.error('Error:', error);
      });


     //console.log(coords);
     return weather;

}