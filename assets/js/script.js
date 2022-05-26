var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-input");
var searchedCitiesListEl = document.querySelector("#city-list");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");
var currentDate = moment().format('MM/D/YYYY');
var currentCityEl =document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var day1Date = document.querySelector("#day-1-date");
var day1Temp = document.querySelector("#day-1-temp");
var day1Wind = document.querySelector("#day-1-wind");
var day1Humidity = document.querySelector("#day-1-humidity");
var day2Date = document.querySelector("#day-2-date");
var day2Temp = document.querySelector("#day-2-temp");
var day2Wind = document.querySelector("#day-2-wind");
var day2Humidity = document.querySelector("#day-2-humidity");
var day3Date = document.querySelector("#day-3-date");
var day3Temp = document.querySelector("#day-3-temp");
var day3Wind = document.querySelector("#day-3-wind");
var day3Humidity = document.querySelector("#day-3-humidity");
var day4Date = document.querySelector("#day-4-date");
var day4Temp = document.querySelector("#day-4-temp");
var day4Wind = document.querySelector("#day-4-wind");
var day4Humidity = document.querySelector("#day-4-humidity");
var day5Date = document.querySelector("#day-5-date");
var day5Temp = document.querySelector("#day-5-temp");
var day5Wind = document.querySelector("#day-5-wind");
var day5Humidity = document.querySelector("#day-5-humidity");


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
            for(var i = 0; i<data.list.length; i+=8)                
            day1Date.textContent = moment().add(1, 'days').format('MM/D/YYYY');
            day1Temp.textContent = "Temperature: " + data.list[0].main.temp + "\xB0" +"F";
            day1Wind.textContent= "Wind: " + data.list[0].wind.speed + " mph";
            day1Humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
            day2Date.textContent = moment().add(2, 'days').format('MM/D/YYYY');
            day2Temp.textContent = "Temperature: " + data.list[1].main.temp + "\xB0" +"F";
            day2Wind.textContent= "Wind: " + data.list[1].wind.speed + " mph";
            day2Humidity.textContent = "Humidity: " + data.list[1].main.humidity + "%";
            day3Date.textContent = moment().add(3, 'days').format('MM/D/YYYY');
            day3Temp.textContent = "Temperature: " + data.list[2].main.temp + "\xB0" +"F";
            day3Wind.textContent= "Wind: " + data.list[2].wind.speed + " mph";
            day3Humidity.textContent = "Humidity: " + data.list[2].main.humidity + "%";
            day4Date.textContent = moment().add(4, 'days').format('MM/D/YYYY');
            day4Temp.textContent = "Temperature: " + data.list[3].main.temp + "\xB0" +"F";
            day4Wind.textContent= "Wind: " + data.list[3].wind.speed + " mph";
            day4Humidity.textContent = "Humidity: " + data.list[3].main.humidity + "%";
            day5Date.textContent = moment().add(5, 'days').format('MM/D/YYYY');
            day5Temp.textContent = "Temperature: " + data.list[4].main.temp + "\xB0" +"F";
            day5Wind.textContent= "Wind: " + data.list[4].wind.speed + " mph";
            day5Humidity.textContent = "Humidity: " + data.list[4].main.humidity + "%";

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