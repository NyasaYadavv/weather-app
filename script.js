
let historyList = document.querySelector("#history");
let clearHistoryButton =
    document.querySelector("#clear-history");

let searchHistory = [];
let savedHistory =
    localStorage.getItem("weatherHistory");

if(savedHistory){

    searchHistory = JSON.parse(savedHistory);

    searchHistory.forEach(function(city){

        let li = document.createElement("li");

        li.innerText = city;

        historyList.appendChild(li);

    });

}

    let button = document.querySelector(".search-btn");
let input = document.querySelector(".city-input");

let temperature = document.querySelector("#temperature");
let feelsLike = document.querySelector("#feels-like");
let visibility = document.querySelector("#visibility");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let pressure = document.querySelector("#pressure");
let sunrise = document.querySelector("#sunrise");
let description = document.querySelector("#description");
let lastUpdated = document.querySelector("#last-updated");
let weatherIcon = document.querySelector("#weather-icon");
let cityName = document.querySelector("#city-name");
let message = document.querySelector("#message");

function updateHistory(city){

    searchHistory = searchHistory.filter(function(item){

    return item !== city;

});

searchHistory.unshift(city);

    if(searchHistory.length > 5){
        searchHistory.pop();
    }

    localStorage.setItem(
    "weatherHistory",
    JSON.stringify(searchHistory)
);

    historyList.innerHTML = "";

    searchHistory.forEach(function(city){

        let li = document.createElement("li");

li.innerText = city;

li.style.cursor = "pointer";

li.addEventListener("click", function(){

    input.value = city;

    searchWeather(city);

});

historyList.appendChild(li);

    });

}

function setLoading(){



    temperature.innerText = "Temperature : Loading...";
    feelsLike.innerText = "Feels Like : Loading...";
    visibility.innerText = "Visibility : Loading...";
    humidity.innerText = "Humidity : Loading...";
    wind.innerText = "Wind Speed : Loading...";
    pressure.innerText = "Pressure : Loading...";
    sunrise.innerText = "Sunrise : Loading...";
    description.innerText = "Weather : Loading...";
    lastUpdated.innerText = "Last Updated : Loading...";

}

function searchWeather(city) {

    let apiKey = "0fb05ec72120b6c09c9776ad3c73b31a";

    let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        setLoading();

let currentTime = new Date();

lastUpdated.innerText =
"Last Updated : " + currentTime.toLocaleTimeString();

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

           if (data.cod == "404") {

    alert("City not found!");

    return;

}
message.innerText = "";

 cityName.innerText = 
 data.name + ", " + data.sys.country;

 updateHistory(data.name);

     temperature.innerText = "Temperature : " + data.main.temp + " °C";

     feelsLike.innerText =
"Feels Like : " + data.main.feels_like + " °C";

visibility.innerText =
"Visibility : " + data.visibility + " m";

humidity.innerText = "Humidity : " + data.main.humidity + " %";

wind.innerText = "Wind Speed : " + data.wind.speed + " km/h";

pressure.innerText = "Pressure : " + data.main.pressure + " hPa";

let sunriseTime = new Date(data.sys.sunrise * 1000);

sunrise.innerText =
    "Sunrise : " + sunriseTime.toLocaleTimeString();

  let weatherDescription = data.weather[0].description;

weatherDescription = weatherDescription
    .split(" ")
    .map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

description.innerText =
"Weather : " + weatherDescription; 

let weatherMain = data.weather[0].main;

if (weatherMain === "Clear") {
    document.body.style.backgroundColor = "#87CEEB";
}
else if (weatherMain === "Clouds") {
    document.body.style.backgroundColor = "#D3D3D3";
}
else if (weatherMain === "Rain") {
    document.body.style.backgroundColor = "#6CA6CD";
}
else if (weatherMain === "Snow") {
    document.body.style.backgroundColor = "#F8F8FF";
}
else if (weatherMain === "Thunderstorm") {
    document.body.style.backgroundColor = "#696969";
}
else {
    document.body.style.backgroundColor = "#87CEEB";
}
    
    input.value = "";

    let iconCode = data.weather[0].icon;

weatherIcon.src =
`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

weatherIcon.style.transform = "scale(1.1)";

setTimeout(function(){

    weatherIcon.style.transform = "scale(1)";

},300);

});

}

button.addEventListener("click", function(event) {

    event.preventDefault();

    if (input.value == "") {

        alert("Please enter a city name.");

    } else {

        searchWeather(input.value);

    }

});

input.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        event.preventDefault();

        if(input.value == ""){

            alert("Please enter a city name.");

        }else{

            searchWeather(input.value);

        }

    }

});

clearHistoryButton.addEventListener("click", function(){

    searchHistory = [];

    historyList.innerHTML = "";

    localStorage.removeItem("weatherHistory");

});