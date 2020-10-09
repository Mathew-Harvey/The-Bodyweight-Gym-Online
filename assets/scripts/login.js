// Checks if user profile exists in local storage
if (localStorage.getItem("userProfile") === null) {
    // update navbar buttons
    if (on_index === true){
    $(".modal").addClass("is-active")
    }
    $(".user-profile").css({ display: "none" });
    $(".favorites-btn").css({ display: "none" });
    $(".signup").css({ display: "block" });
} else {
    // update navbar buttons
    var profileObj = JSON.parse(localStorage.getItem("userProfile"));
    $(".user-profile").css({ display: "block" });
    $(".favorites-btn").css({ display: "block" });
    $(".signup").css({ display: "none" });
    $(".userProfile-name").html(`Welcome, <strong>${profileObj.name}</strong>`);
}

// Check if user submits login
$("#login-submit").on("click", function () {
    if ($("#login-name").val() != "" && $("#login-location").val() != "") {
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${$("#login-location").val()}&units=metric&appid=256b25d2b8a8f2b130f652e84d69f8ee`;
        $.ajax({
            url: url,
            success: function (data) {
                // create object
                var profileObj = {
                    name: $("#login-name").val(),
                    location: data.name
                }
                // save object to local storage
                localStorage.setItem("userProfile", JSON.stringify(profileObj));
                // update navbar buttons
                $(".modal").removeClass("is-active");
                $(".user-profile").css({ display: "block" });
                $(".signup").css({ display: "none" });
                $(".userProfile-name").html(`Welcome, <strong>${profileObj.name}</strong>`);
                // Load weather 
                var weatherCond = data.weather[0].main;
                $("#current-temp").text(Math.floor(data.main.temp) + "\u00B0C");
                $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
                if (weatherCond === "Clear" || weatherCond === "Clouds" || weatherCond === "Mist" || weatherCond === "Fog") {
                    $("#weather-txt").html("Train <strong>outside</strong> today");
                } else {
                    $("#weather-txt").html("Train <strong>inside</strong> today");
                }
            },
            error: function () {
                $("#login-error").text("City not found. Please try again.");
            }
        });
    } else {
        $("#login-error").text("Please fill all fields.");
    }
})

// make sure all scripts are loaded before executing
$(document).ready(function () {
    // check if create profile is clicked
    $("#create-profile").on("click", function (event) {
        event.preventDefault();
        $(".modal").addClass("is-active");
    })

    // check if create profile is clicked
    $(".signup").on("click", function () {
        $(".modal").addClass("is-active")
    })

    // check close login modal
    $(".modal-close").on("click", function (event) {
        $(".modal").removeClass("is-active");
    })
})