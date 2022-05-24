var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-input");

function getCityName () {

}
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

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getForecast(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city name")
    }
};


// getApi();

cityFormEl.addEventListener("submit", formSubmitHandler);