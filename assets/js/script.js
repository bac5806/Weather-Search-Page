// HTML Elements
var divEl = document.querySelector("#divEl");
var inputEl = document.querySelector("#inputId"); 
var btnEl = document.querySelector("#btnId");

// api key for open weather
var key = "6498bb35097af49fb127c1f13d048b50";

// button event listener
btnEl.addEventListener("click", function(event) {
    event.preventDefault();

    // get input text
    var getCity = inputEl.value;
    // concat the api call with input from user along with api key
    var apiLink = "http://api.openweathermap.org/data/2.5/weather?q=" + getCity + "&appid=" + key;

    // fetch link
    fetch(apiLink, {
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    });  
});

