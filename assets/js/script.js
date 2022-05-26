var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-input");
var searchedCitiesListEl = document.querySelector("#city-list");
// var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");
var currentDate = moment().format('MM/D/YYYY');
var currentCityEl =document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");


// api call to get the forecast
function getForecast(cityName) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=db90f37516c305d620d0e44557fd5bf2";
    var currentWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=6123d81d4878931a77a13018b22cb0ab";
//    call for the current weather
    fetch(currentWeatherUrl).then(function(response) {
    
        if (response.ok) {
         return response.json().then(function(data) {
            console.log(data);
            currentCityEl.innerHTML= cityName + " " + currentDate; 
            currentTempEl.innerHTML = "Temperature: " + data.main.temp + "\xB0" +"F";
            currentWindEl.innerHTML = "Wind: " + data.wind.speed + " mph";
            currentHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

        });
        } else {
        alert("City not found");
        }
})
.catch(function(error) {
    alert("Unable to connect to OpenWeather");
});
// call for the forecast
    fetch(forecastUrl).then(function(response) {
    
        if (response.ok) {
         response.json().then(function(data) {
            for(var i = 0; i<data.list.length; i+=8) {
                console.log(data.list[i]);
                
            }
        });
        } else {
        alert("City not found");
        }
})
.catch(function(error) {
    alert("Unable to connect to OpenWeather");
});
};

// function to call upon name on the buttons
function recallForecast(event) {
    var cityName = event.target.getAttribute("city");
    getForecast(cityName);
};

// get the city name from the user input
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getForecast(cityName);
        cityInputEl.value = "";
        var searchedCities = document.createElement("button");
        searchedCities.innerHTML = cityName;
        searchedCities.setAttribute("city", cityName);
        searchedCitiesListEl.appendChild(searchedCities);
    } else {
        alert("Please enter a valid city name")
    };

};



// event listeners
cityFormEl.addEventListener("submit", formSubmitHandler);
searchedCitiesListEl.addEventListener("click", recallForecast);