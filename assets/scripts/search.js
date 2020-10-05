// Query Selectors
$videoDisplayEl = $('#video-display');

function checkWorkout(which) {

    console.log("Checking Workout: " + which);

    for (var w = 0; w < Object.keys($theWorkouts).length; w++) {

        if ($theWorkouts[w].name === which) {
            // Return the Coaches Colour Choice
            return $theWorkouts[w].colour;
        }
    }

    // Default to no colour if not found
    return "";
}

function checkCoach(which) {

    console.log("Checking Coach: " + which);

    for (var c = 0; c < Object.keys($theCoaches).length; c++) {

        if ($theCoaches[c].name === which) {
            // Return the Coaches Colour Choice
            return $theCoaches[c].colour;
        }
    }

    // Default to no colour if not found
    return "";
}

function displayVideos() {

    console.log('[DISPLAY VIDEOS]');

    // Clear Current Selection
    $videoDisplayEl.empty();

    // Create the Video Container
    var $newDivHolder = $('<div>');
    $newDivHolder.attr("class", "columns is-multiline");

    for (var v = 0; v < Object.keys($theVideos).length; v++) {

        // Create the Individual Video Holder
        var $newVidHolder = $('<div>');
        $newVidHolder.attr("class", "column is-3");

        // Create the Thumbnail
        var $newThumb = $('<img>');
        $newThumb.attr("src", $theVideos[v].screenshot);

        // Create the Tags beneath the video
        var $newTags = $('<div>');
        $newTags.attr("class", "tags are-medium");

        // Create the Workout Tag
        var $newWorkout = $('<span>');
        $newWorkout.attr("class", "tag");
        $newWorkout.text($theVideos[v].tags[0]);
        // Return the Correct Colouring
        $newWorkout.addClass(checkWorkout($theVideos[v].tags[0]));

        // Create the Coach Tag
        var $newCoach = $('<span>');
        $newCoach.attr("class", "tag");
        $newCoach.text($theVideos[v].coach);
        // Return the Correct Colouring
        $newCoach.addClass(checkCoach($theVideos[v].coach));

        // Create the Heart Icon
        var $newHeart = $("<i>");
        // Has the Video been Liked?
        // $newHeart.attr("class","fas fa-heart");
        $newHeart.attr("class", "far fa-heart");
        $newHeart.attr("style", "margin-left: auto; margin-right: 10px")

        // Create the Viewed Icon
        var $newViewed = $('<i>');
        // Has the Video been Viewed?
        // $newViewed.attr("class","fas fa-check-circle");
        $newViewed.attr("class", "far fa-check-circle");

        // Append Everything
        $newTags.append($newWorkout, $newCoach, $newHeart, $newViewed);
        $newVidHolder.append($newThumb, $newTags);
        $newDivHolder.append($newVidHolder);
    }

    // Add the current video selection to the div
    $videoDisplayEl.append($newDivHolder);

}

displayVideos();