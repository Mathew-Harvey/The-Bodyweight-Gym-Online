// Query Selectors
var $videoPlayerEl = $('#videoplayer');

// Set defaults
var $loadThisVideo;

// Function to update the tags on button press
function updateTags(which){

    console.log("Update tags");

    var $thisWorkout = $theVideos[which].tags[0];
    var $thisCoach = $theVideos[which].coach;

    var $newTags = $('.video-tags');  
    $newTags.empty();  

    // Create the Workout Tag
    var $newWorkout = $('<span>');
    $newWorkout.attr("class", "tag");
    $newWorkout.text($thisWorkout);
    // Return the Correct Colouring
    $newWorkout.addClass(checkWorkout($thisWorkout));

    // Create the Coach Tag
    var $newCoach = $('<span>');
    $newCoach.attr("class", "tag");
    $newCoach.text($thisCoach);
    // Return the Correct Colouring
    $newCoach.addClass(checkCoach($thisCoach));

    // Create the Heart Icon
    var $newHeart = $("<span>");
    $newHeart.attr("class", "tag heart");
    $newHeart.css('cursor', 'pointer');
    $newHeart.data("video", which);
    // Has the Video been Liked?
    var $newIcon = $('<i>');
    if ($.inArray(which, $likedVideos) == -1) {
        $newIcon.attr("class", "far fa-heart");
    }
    else {
        $newIcon.attr("class", "fas fa-heart");
    }
    $newHeart.append($newIcon);

    // Create the Viewed Icon
    var $newViewed = $('<i>');
    $newViewed.attr("class", "tag");
    // Has the Video been Viewed?
    // $newViewed.attr("class","fas fa-check-circle");
    var $newTick = $('<i>');
    $newTick.attr("class", "far fa-check-circle");
    $newViewed.append($newTick);

    // Append Everything
    $newTags.append($newWorkout, $newCoach, $newHeart, $newViewed);

}

// Function to check which video to load
function loadVideo() {

    // Check the appended value to string
    var query = window.location.search.substring(1);
    var parms = query.split('&');

    // Loop through video parameters
    for (var i = 0; i < parms.length; i++) {

        // Split based off = identifier
        var pos = parms[i].indexOf('=');

        // If it exists
        if (pos > 0) {
            var val = parms[i].substring(pos + 1);
            $loadThisVideo = val;
        }
    }

    var $whichLink = $theVideos[$loadThisVideo].link;
    $videoPlayerEl.html('<iframe src="https://' + $whichLink + '" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>');

    document.getElementById('vimeo-player').addEventListener('ended', function (event) {
        // Video ended; do something
    });

    // Create the Tags beneath the video
    var $newTags = $('<div>');
    $newTags.attr("class", "tags are-medium video-tags");
    $videoPlayerEl.append($newTags);

    updateTags($loadThisVideo);
    
}


$(document).ready(function () {

    loadVideo();
    console.log("[LOAD VIDEO] " + $loadThisVideo);


    // video-tags

    // Hearts
    $(document).on("click", ".heart", function () {

        // Retrieve the Filter Data
        var $whichVideo = $(this).data("video");

        // Add a heart to a video
        heartVideo($whichVideo);

        updateTags($whichVideo);

    })
})