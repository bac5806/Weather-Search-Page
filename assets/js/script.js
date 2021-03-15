// api key for open weather
var key = "6498bb35097af49fb127c1f13d048b50";

// HTML Elements
var divEl = document.querySelector("#divEl");
var inputEl = document.querySelector("#inputId"); 
var btnEl = document.querySelector("#btnId");
var cityNameContEl = document.querySelector(".cityNameCont");
var weatherContEl = document.querySelector(".weatherCont");

// array for storing cities
var cityNameArr = [];

var icon = document.createElement("i");
icon.className = "fa fa-search fa-lg";
// apend icong to buttons
btnEl.append(icon);

// button event listener
btnEl.addEventListener("click", function(event) {
    event.preventDefault();

    // get input text
    var getCity = inputEl.value;
    if (getCity !== "") {

        weatherContEl.innerHTML = "";
        // check if city is aleady in local storage, if so do not store
        var isDifCity = true;
        for (var i = 0; i < cityNameArr.length; ++i) {
            if (getCity === cityNameArr[i]) {
                isDifCity = false;
            }
        }

        // if city is different, display to page and store in local
        if (isDifCity) {

            var cityBtnEl = document.createElement("button");
            cityBtnEl.className = "cityName";
            cityBtnEl.textContent = getCity;
            cityNameContEl.append(cityBtnEl);

            cityNameArr.push(getCity);
            localStorage.setItem("cityNames", JSON.stringify(cityNameArr));
        }
        
        // concat the api call with input from user along with api key
        var apiLink = "http://api.openweathermap.org/data/2.5/weather?q=" + getCity + "&units=imperial" + "&appid=" + key;

        var todaysForecastEl = document.createElement("div");
        todaysForecastEl.className = "todaysForecast";
        var getDate = moment().format("DD/MM/YYYY");
        var cityName = document.createElement("h2");
        var tempEl = document.createElement("p");
        var humidityEl = document.createElement("p");
        var windSpeedEl = document.createElement("p");
        var uvEl = document.createElement("p");

        var getUv = "";

        // fetch link
        fetch(apiLink, {
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            
                cityName.textContent = (data.name + " " + "(" + getDate + ")");
                tempEl.innerHTML = "Temperature: " + data.main.temp + " " + "&#x2109";
                humidityEl.innerHTML = "Humidity: " + data.main.humidity + "\%";
                windSpeedEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
                
                var lati = data.coord.lat;
                var long = data.coord.lon;

                getUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lati + "&lon=" + long + "&appid=" + key;
                fetch(getUv, {
                })
                    .then(function (response1) {
                        return response1.json();
                    })
                    .then(function (data1) {
                        uvEl.innerHTML = "UV Index: " + data1.value;
                });  

                var fiveDayH2El = document.createElement("h2");
                fiveDayH2El.textContent = "5 Day Forecast";
                fiveDayH2El.className = "fiveDayH2";
                weatherContEl.append(fiveDayH2El);

                var getFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + getCity + "&units=imperial" + "&appid=" + key;
                fetch(getFiveDay, {
                })
                    .then(function (response2) {
                        return response2.json();
                    })
                    .then(function (data2) {
                        console.log(data2);

                        var fiveDayCont = document.createElement("div");
                        fiveDayCont.className = "fiveDayForecast";
                        
                        var addDay = 1;
                        // var fiveDayDate = moment().add("d", addDay).format("M/DD/YYYY");
                        for (var i = 0; i < 40; i+=8) {
                            var dayContEl = document.createElement("div");
                            dayContEl.className = "dayCont";

                            var dateEl = document.createElement("h3");
                            dateEl.innerHTML = moment().add(addDay, "d").format("M/DD/YYYY");

                            var fiveDayTemp = document.createElement("p");
                            fiveDayTemp.innerHTML = "Temp: " + data2.list[i].main.temp + " " + "&#x2109";

                            var fiveDayHumidity = document.createElement("p");
                            fiveDayHumidity.innerHTML = "Humidity: " + data2.list[i].main.humidity + "\%";

                            dayContEl.append(dateEl, fiveDayTemp, fiveDayHumidity);
                            fiveDayCont.append(dayContEl);
                            addDay += 1;
                        }
                        weatherContEl.append(fiveDayCont);
                });  
        }); 

        todaysForecastEl.append(cityName, tempEl, humidityEl, windSpeedEl, uvEl);
        weatherContEl.append(todaysForecastEl);
        inputEl.value = "";
    }
});

function cityButtons(){
var getButtons = document.getElementsByClassName("cityName");
for (var i = 0; i < getButtons.length; ++i) {    
    getButtons[i].addEventListener("click", function(event) {
        event.preventDefault();

        weatherContEl.innerHTML = "";

        // get input text
        var getCity = this.innerHTML;
        
        // concat the api call with input from user along with api key
        var apiLink = "http://api.openweathermap.org/data/2.5/weather?q=" + getCity + "&units=imperial" + "&appid=" + key;

        var todaysForecastEl = document.createElement("div");
        todaysForecastEl.className = "todaysForecast";
        var getDate = moment().format("DD/MM/YYYY");
        var cityName = document.createElement("h2");
        var tempEl = document.createElement("p");
        var humidityEl = document.createElement("p");
        var windSpeedEl = document.createElement("p");
        var uvEl = document.createElement("p");

        var getUv = "";

        // fetch link
        fetch(apiLink, {
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            
                cityName.textContent = (data.name + " " + "(" + getDate + ")");
                tempEl.innerHTML = "Temperature: " + data.main.temp + " " + "&#x2109";
                humidityEl.innerHTML = "Humidity: " + data.main.humidity + "\%";
                windSpeedEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
                
                var lati = data.coord.lat;
                var long = data.coord.lon;

                getUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lati + "&lon=" + long + "&appid=" + key;
                fetch(getUv, {
                })
                    .then(function (response1) {
                        return response1.json();
                    })
                    .then(function (data1) {
                        uvEl.innerHTML = "UV Index: " + data1.value;
                });  

        var fiveDayH2El = document.createElement("h2");
        fiveDayH2El.textContent = "5 Day Forecast";
        fiveDayH2El.className = "fiveDayH2";
        weatherContEl.append(fiveDayH2El);

        var getFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + getCity + "&units=imperial" + "&appid=" + key;
        fetch(getFiveDay, {
        })
            .then(function (response2) {
                return response2.json();
            })
            .then(function (data2) {
                console.log(data2);

                var fiveDayCont = document.createElement("div");
                fiveDayCont.className = "fiveDayForecast";
                
                var addDay = 1;
                // var fiveDayDate = moment().add("d", addDay).format("M/DD/YYYY");
                for (var i = 0; i < 40; i+=8) {
                    var dayContEl = document.createElement("div");
                    dayContEl.className = "dayCont";

                    var dateEl = document.createElement("h3");
                    dateEl.innerHTML = moment().add(addDay, "d").format("M/DD/YYYY");

                    var fiveDayTemp = document.createElement("p");
                    fiveDayTemp.innerHTML = "Temp: " + data2.list[i].main.temp + " " + "&#x2109";

                    var fiveDayHumidity = document.createElement("p");
                    fiveDayHumidity.innerHTML = "Humidity: " + data2.list[i].main.humidity + "\%";

                    dayContEl.append(dateEl, fiveDayTemp, fiveDayHumidity);
                    fiveDayCont.append(dayContEl);
                    addDay += 1;
                }
                weatherContEl.append(fiveDayCont);
            });  
        }); 

        todaysForecastEl.append(cityName, tempEl, humidityEl, windSpeedEl, uvEl);
        weatherContEl.append(todaysForecastEl);
        inputEl.value = "";
    });
}
}

// init function
function init() {
    // set class name for city name container element
    cityNameContEl.className = "cityNameCont";

    // get stored cities and add to array
    var storedNames = JSON.parse(localStorage.getItem("cityNames"))
    if (storedNames !== null) {
        cityNameArr = storedNames;
    }

    // loop through city name array and dsiplay cities to page
    for (var i = 0; i < cityNameArr.length; ++i) {
        var cityBtnEl = document.createElement("button");
        cityBtnEl.className = "cityName";
        cityBtnEl.textContent = cityNameArr[i];

        // cityNameEl.textContent = cityNameArr[i];
        cityNameContEl.append(cityBtnEl);
    }
}

// call init function
init();
cityButtons();
