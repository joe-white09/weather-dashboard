var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-input");
var searchedCitiesListEl = document.querySelector("#city-list");
// var searchedCities = document.querySelector("#city-list");


// api call to get the forecast
function getForecast(cityName) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=db90f37516c305d620d0e44557fd5bf2";
    var currentWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=6123d81d4878931a77a13018b22cb0ab";
   
    fetch(currentWeatherUrl).then(function(response) {
    
        if (response.ok) {
         response.json().then(function(data) {
            console.log(data);
            // for(var i = 0; i<data.list.length; i++) {
            //     console.log(data.list[i].weather);
            //     console.log(data.list[i].main.temp);
            // }
        });
        } else {
        alert("City not found");
        }
})
.catch(function(error) {
    alert("Unable to connect to OpenWeather");
});
    fetch(forecastUrl).then(function(response) {
    
        if (response.ok) {
         response.json().then(function(data) {
            console.log(data);
            for(var i = 0; i<data.list.length; i+=8) {
                console.log(data.list[i]);
                // console.log(data.list[i].main.temp);
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


// getApi();

cityFormEl.addEventListener("submit", formSubmitHandler);
searchedCitiesListEl.addEventListener("click", recallForecast);