if (localStorage.getItem("userProfile") != null)
{
    loadWeather();
}
else{
    $("#weather-txt").html("<a id='create-profile' href=''>Create profile </a>for weather");
}

function loadWeather() {
    profileObj = JSON.parse(localStorage.getItem("userProfile"))
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${profileObj.location}&units=metric&appid=256b25d2b8a8f2b130f652e84d69f8ee`;
    $.ajax({
        url: url,
        success: function (data) {
            $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            var weatherCond = data.weather[0].main;
            $("#current-temp").text(Math.floor(data.main.temp) + "\u00B0C");
            if (weatherCond === "Clear" || weatherCond === "Clouds" || weatherCond === "Mist" || weatherCond === "Fog") {
                $("#weather-txt").html("Train <strong>outside</strong> today");
            } else {
                $("#weather-txt").html("Train <strong>inside</strong> today");
            }
;        },
        error: function (e) {
            $("#weather-txt").text("Something went wrong");
        }
    });
}