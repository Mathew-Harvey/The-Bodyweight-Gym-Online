var url = `https://api.openweathermap.org/data/2.5/weather?q=${profileObj.location}&units=metric&appid=256b25d2b8a8f2b130f652e84d69f8ee`;
    $.ajax({
        url: url,
        success: function (data) {
            console.log(data);
        },
        error: function () {
            ;
        }
        });