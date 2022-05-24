var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-input");
var searchedCitiesListEl = document.querySelector("#city-list");
// var searchedCities = document.querySelector("#city-list");


// api call to get the forecast
function getForecast(cityName) {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=db90f37516c305d620d0e44557fd5bf2";

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

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
    } else {
        alert("Please enter a valid city name")
    };
    var searchedCities = document.createElement("button");
    searchedCities.innerHTML = cityName;
    searchedCities.setAttribute("city", cityName);
    searchedCitiesListEl.appendChild(searchedCities);
};


// getApi();

cityFormEl.addEventListener("submit", formSubmitHandler);
searchedCitiesListEl.addEventListener("click", recallForecast);