// Set default variables
var $chuckJoke;
var $chuckGif;

// Function to add the chuck gif and quote
function addChuck() {

    // Only change from the loading icon when both API calls finished
    if (($chuckGif != undefined) && ($chuckJoke != undefined)) {

        // Add the quote to the modal
        $("#chucknorris-quote").html('<br/>"' + $chuckJoke + '" - Chuck Norris<br/><br/>');

        // Creates a new img object 
        var chuckImage = $("<img>");

        // Add the image url as the source, and the alt tag
        chuckImage.attr("src", $chuckGif);
        chuckImage.attr("alt", "Chuck Norris");

        // Add the image before the quote
        $("#chucknorris-quote").prepend(chuckImage);

        // Add the close button
        var chuckButton = $('<button>');
        chuckButton.attr("class", "button is-danger is-medium chuck-close");
        chuckButton.text("Get back to work!");
        $("#chucknorris-quote").append(chuckButton);
    }
}

// Function to close the modal
function closeModal() {
    $(".modal-chucknorris").removeClass("is-active");
    $("#chucknorris-quote").html('<i class="fas fa-spinner fa-pulse"></i><br/>Loading ...');
}

// Check the document is ready
$(document).ready(function () {

    // Chuck Close on button click
    $(document).on("click", ".chuck-close", function () {

        closeModal();

    })
    // Chuck close on background click
    $(document).on("click", ".modal-background", function () {

        closeModal();

    })

    // Button to launch chuck norris quotes
    $(".chucknorris-btn").on("click", function () {

        // Display the default loader
        $("#chucknorris-quote").html('<i class="fas fa-spinner fa-pulse"></i>');
        $(".modal-chucknorris").addClass("is-active");

        // Reset the content
        $chuckJoke = undefined;
        $chuckGif = undefined;

        // Chuck Norris Joke
        // The URL of the API that we are calling
        var jokeURL = `http://api.icndb.com/jokes/random`;

        // Ajax call to Chuck API
        $.ajax({

            url: jokeURL,
            method: "GET",

            success: function (data) {

                $chuckJoke = data.value.joke;

                // Check to see if both API calls have returned
                addChuck();
            },
            error: function () {

                $chuckJoke = "GET BACK TO WORK!";

                // Check to see if both API calls have returned
                addChuck();
            }
        });

        // Chuck Norris Gif
        // The URL of the API that we are calling
        var gifURL = "https://api.giphy.com/v1/gifs/random?api_key=hrrTWaVX6XfTcRor8CeKuIB7G8mG2q9R&tag=chucknorris";

        // The ajax method to call the query and retrieve the data
        $.ajax({

            url: gifURL,
            method: "GET",

            success: function (chuckster) {

                // The URL of the image that we've created
                $chuckGif = chuckster.data.image_original_url;

                // Check to see if both API calls have returned
                addChuck();

            },
            error: function () {

                // Creates a new img object 
                $chuckGif = "./assets/img/chucknorris.png";

                // Check to see if both API calls have returned
                addChuck();
            }
        })

    })
})