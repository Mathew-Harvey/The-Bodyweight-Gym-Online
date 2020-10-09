<<<<<<< HEAD
if (localStorage.getItem("userProfile") != null)
{
    profileObj = JSON.parse(localStorage.getItem("userProfile"))
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${profileObj.location}&units=metric&appid=256b25d2b8a8f2b130f652e84d69f8ee`;
    $.ajax({
        url: url,
        success: function (data) {
            $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
            var weatherCond = data.weather[0].main;
            $("#current-temp").text(Math.floor(data.main.temp) + "\u00B0C");
            if (weatherCond === "Clear" || weatherCond === "Clouds" || weatherCond === "Mist" || weatherCond === "Fog") {
                $("#weather-txt").html("Train <strong>outside</strong> today");
            } else {
                $("#weather-txt").html("Train <strong>inside</strong> today");
            }
            console.log(data)
;        },
        error: function (e) {
            $("#weather-txt").text("Something went wrong");
        }
    });
}
else{
    $("#weather-txt").html("<a href='./index.html'>Create profile </a>for weather");
}
=======

>>>>>>> af4b38836b5be67ea101f94894c5059ff690f3a9
