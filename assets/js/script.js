var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-input");
var searchedCitiesEl = document.querySelector("#city-list");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");
var currentDate = moment().format('MM/D/YYYY');
var currentCityEl =document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUvIndexEl = document.querySelector("#current-uv");
var currentIconEl = document.querySelector("#current-icon");
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
var day1El = document.querySelector("#day-1");
var day2El = document.querySelector("#day-2");
var day3El = document.querySelector("#day-3");
var day4El = document.querySelector("#day-4");
var day5El = document.querySelector("#day-5");
var searchIdCounter = 0;
var searches = [];
var currentIcon = document.createElement("img");
var day1icon = document.createElement("img");
var day2icon = document.createElement("img");
var day3icon = document.createElement("img");
var day4icon = document.createElement("img");
var day5icon = document.createElement("img");


// creates data object and fetches lat and lon
function newSearch(cityName) {
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&mode=json&appid=db90f37516c305d620d0e44557fd5bf2";
    fetch(forecastUrl).then(function(response) {
    
        if (response.ok) {
         response.json().then(function(data) {
              
            var searchDataObj = {
                name: cityName,
                tag: data.city.name,
                lat: data.city.coord.lat,
                lon: data.city.coord.lon
            };
            var searchedCities = document.createElement("button");
            searchedCities.innerHTML = data.city.name;
            searchedCities.setAttribute("city", cityName);
            searchedCities.setAttribute("class", "col-12 m-1 rounded")
            searchedCitiesEl.appendChild(searchedCities);
            searches.push(searchDataObj);
            saveSearches();
            getUvIndex(searchDataObj);
        });
        } else {
        alert("City not found");
        }
})
.catch(function(error) {
    alert("Unable to connect to OpenWeather");
});


};

function recallWeather(cityName) {
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&mode=json&appid=db90f37516c305d620d0e44557fd5bf2";
    fetch(forecastUrl).then(function(response) {
    
        if (response.ok) {
         response.json().then(function(data) {
            
            var searchDataObj = {
                name: cityName,
                tag: data.city.name,
                lat: data.city.coord.lat,
                lon: data.city.coord.lon
            };
            getUvIndex(searchDataObj);
        });
        } else {
        alert("City not found");
        }
})
.catch(function(error) {
    alert("Unable to connect to OpenWeather");
});
};

function getUvIndex(searchDataObj) {
    var latEl = searchDataObj.lat;
    var lonEl = searchDataObj.lon;
    var uvIndexUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + "&units=imperial&exclude=minutely,hourly&appid=6123d81d4878931a77a13018b22cb0ab";
    fetch(uvIndexUrl).then(function(response) {
        if (response.ok) {
            return response.json().then(function(data) {
                console.log(data);
            // sets current conditions card
                currentCityEl.innerHTML= searchDataObj.tag + " (" + currentDate + ")";
                currentCityEl.appendChild(currentIcon);
                currentIcon.setAttribute("src", "http://openweathermap.org/img/w/"+ data.current.weather[0].icon + ".png")
                currentTempEl.innerHTML = "Temperature: " + Math.round(data.current.temp) + "\xB0" +"F";
                currentWindEl.innerHTML = "Wind: " + data.current.wind_speed + " mph";
                currentHumidityEl.innerHTML = "Humidity: " + data.current.humidity + "%";
                currentWeatherEl.setAttribute("class", "border border-dark card m-2 p-3 bg-current");
                currentUvIndexEl.innerHTML = "UV Index: " + data.current.uvi;

                if(data.current.uvi<3){
                    currentUvIndexEl.setAttribute("class", "bg-success text-white")
                } else if (data.current.uvi>2 && data.current.uvi<6){
                    currentUvIndexEl.setAttribute("class", "bg-warning text-dark")
                } else if (data.current.uvi>5 && data.current.uvi<8) {
                    currentUvIndexEl.setAttribute("class", "bg-orange text-dark")
                } else if (data.current.uvi>7 && data.current.uvi<11) {
                    currentUvIndexEl.setAttribute("class", "bg-danger text-white")
                } else if (data.current.uvi>10) {
                    currentUvIndexEl.setAttribute("class", "bg-purple text-white")
                };
            
            //sets forecast cards
            day1Date.textContent = moment().add(1, 'days').format('MM/D/YYYY');
            day1Date.appendChild(day1icon);
            day1icon.setAttribute("src", "http://openweathermap.org/img/w/"+ data.daily[0].weather[0].icon + ".png")
            day1Temp.textContent = "Temperature: " + Math.round(data.daily[0].temp.min) + "\xB0" + " - " + Math.round(data.daily[0].temp.max) + "\xB0" +"F";
            day1Wind.textContent= "Wind: " + data.daily[0].wind_speed + " mph";
            day1Humidity.textContent = "Humidity: " + data.daily[0].humidity + "%";
            day1El.setAttribute("class", "card m-1 p-2 text-white bg-forecast");
            day2Date.textContent = moment().add(2, 'days').format('MM/D/YYYY');
            day2Date.appendChild(day2icon);
            day2icon.setAttribute("src", "http://openweathermap.org/img/w/"+ data.daily[1].weather[0].icon + ".png");
            day2Temp.textContent = "Temperature: " + Math.round(data.daily[1].temp.min) + "\xB0" + " - " + Math.round(data.daily[1].temp.max) + "\xB0" +"F";
            day2Wind.textContent= "Wind: " + data.daily[1].wind_speed + " mph";
            day2Humidity.textContent = "Humidity: " + data.daily[1].humidity + "%";
            day2El.setAttribute("class", "card m-1 p-2 text-white bg-forecast");
            day3Date.textContent = moment().add(3, 'days').format('MM/D/YYYY');
            day3Date.appendChild(day3icon);
            day3icon.setAttribute("src",  "http://openweathermap.org/img/w/"+ data.daily[2].weather[0].icon + ".png")
            day3Temp.textContent = "Temperature: " + Math.round(data.daily[2].temp.min) + "\xB0" + " - " + Math.round(data.daily[2].temp.max) + "\xB0" +"F";
            day3Wind.textContent= "Wind: " + data.daily[2].wind_speed + " mph";
            day3Humidity.textContent = "Humidity: " + data.daily[2].humidity + "%";
            day3El.setAttribute("class", "card m-1 p-2 text-white bg-forecast");
            day4Date.textContent = moment().add(4, 'days').format('MM/D/YYYY');
            day4Date.appendChild(day4icon);
            day4icon.setAttribute("src",  "http://openweathermap.org/img/w/"+ data.daily[3].weather[0].icon + ".png");
            day4Temp.textContent = "Temperature: " + Math.round(data.daily[3].temp.min) + "\xB0" + " - " + Math.round(data.daily[3].temp.max) + "\xB0" +"F";
            day4Wind.textContent= "Wind: " + data.daily[3].wind_speed + " mph";
            day4Humidity.textContent = "Humidity: " + data.daily[3].humidity + "%";
            day4El.setAttribute("class", "card m-1 p-2 text-white bg-forecast");
            day5Date.textContent = moment().add(5, 'days').format('MM/D/YYYY');
            day5Date.appendChild(day5icon);
            day5icon.setAttribute("src",  "http://openweathermap.org/img/w/"+ data.daily[4].weather[0].icon + ".png");
            day5Temp.textContent = "Temperature: " + Math.round(data.daily[4].temp.min) + "\xB0" + " - " + Math.round(data.daily[4].temp.max) + "\xB0" +"F";
            day5Wind.textContent= "Wind: " + data.daily[4].wind_speed + " mph";
            day5Humidity.textContent = "Humidity: " + data.daily[4].humidity + "%";
            day5El.setAttribute("class", "card m-1 p-2 text-white bg-forecast");

            })
        }
        
    })
};

// function to call upon name on the buttons
function recallForecast(event) {
    var cityName = event.target.getAttribute("city");
    recallWeather(cityName);
};

// get the city name from the user input
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        newSearch(cityName);
        cityInputEl.value = "";

    } else {
        alert("Please enter a valid city name")
    };

};

// sets recent searches to local storage
var saveSearches = function(){
    localStorage.setItem("searches", JSON.stringify(searches));
};

//returns items from local storage
var loadSearches = function(){
    var savedSearches = localStorage.getItem("searches");
    if(!savedSearches){
        return false;
    }
    console.log("Saved Searches Found");

    savedSearches = JSON.parse(savedSearches);

    for (var i = 0; i < savedSearches.length; i++) {
        newSearch(savedSearches[i].name);
    }
    console.log(searches);
};


// event listeners
cityFormEl.addEventListener("submit", formSubmitHandler);
searchedCitiesEl.addEventListener("click", recallForecast);

loadSearches();