// Checks if user profile exists in local storage
if (localStorage.getItem("userProfile") === null) {
    $(".modal").addClass("is-active")
}

// Check if user submits login
$("#login-submit").on("click", function () {
    if ($("#login-name").val() != "" && $("#login-location").val() != "") {
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${$("#login-location").val()}&units=metric&appid=256b25d2b8a8f2b130f652e84d69f8ee`;
        $.ajax({
            url: url,
            success: function (data) {
                profileObj = {
                    name: $("#login-name").val(),
                    location: data.name
                }
                localStorage.setItem("userProfile", JSON.stringify(profileObj));
                $(".modal").removeClass("is-active")
            },
            error: function () {
                $("#login-error").text("City not found. Please try again.");
            }
        });
    }
})