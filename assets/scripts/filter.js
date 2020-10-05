// Query Selectors
$videoDisplayEl = $('#video-display');
$workoutFiltersEl = $('#theWorkouts');
$coachFiltersEl = $('#theCoaches');

// Current Filter Selections
$workoutFilterSelected = "All";
$coachFilterSelected = "All";

// Function to check and return the workouts colour
function checkWorkout(which) {

    for (var w = 0; w < Object.keys($theWorkouts).length; w++) {

        if ($theWorkouts[w].name === which) {
            // Return the Coaches Colour Choice
            return $theWorkouts[w].colour;
        }
    }

    // Default to no colour if not found
    return "";
}

// Function to check and return the coaches colour
function checkCoach(which) {

    for (var c = 0; c < Object.keys($theCoaches).length; c++) {

        if ($theCoaches[c].name === which) {
            // Return the Coaches Colour Choice
            return $theCoaches[c].colour;
        }
    }

    // Default to no colour if not found
    return "";
}

// Function to display the current video selection
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

// Function to display the workout filters
function displayWorkouts() {

    console.log("[DISPLAY WORKOUT FILTERS]");

    // Clear Current Selection
    $workoutFiltersEl.empty();

    // Create the Filter Container
    var $newDivHolder = $('<div>');
    $newDivHolder.attr("class", "tags are-medium mb-0 mt-2");

    // Add the Info
    var $newInfo = $('<span>');
    $newInfo.attr("class", "tag is-white");
    $newInfo.text("Workout Type:");
    $newDivHolder.append($newInfo);

    // Add the Default
    var $newDefault = $('<span>');
    $newDefault.attr("class", "tag is-black");
    $newDefault.text("All");
    // Check if Selected
    if ($workoutFilterSelected != "All") {
        $newDefault.addClass("is-light");
    }
    // Add Data
    $newDefault.data("filter","All");
    // Append to div
    $newDivHolder.append($newDefault);

    for (var w = 0; w < Object.keys($theWorkouts).length; w++) {

        // Add the Filters
        var $newTag = $('<span>');
        $newTag.attr("class", "tag " + checkWorkout($theWorkouts[w].name));
        $newTag.text($theWorkouts[w].name);
        // Check if Selected
        if ($workoutFilterSelected != $theWorkouts[w].name) {
            $newTag.addClass("is-light");
        }
        // Add Data
        $newDefault.data("filter",$theWorkouts[w].name);
        // Append to div
        $newDivHolder.append($newTag);
    }

    // Add the current filters to the div
    $workoutFiltersEl.append($newDivHolder);

}

// Function to display the coach filters
function displayCoaches() {

    console.log("[DISPLAY COACH FILTERS]");

    // Clear Current Selection
    $coachFiltersEl.empty();

    // Create the Filter Container
    var $newDivHolder = $('<div>');
    $newDivHolder.attr("class", "tags are-medium mb-0 mt-2");

    // Add the Info
    var $newInfo = $('<span>');
    $newInfo.attr("class", "tag is-white");
    $newInfo.text("Coaches:");
    $newDivHolder.append($newInfo);

    // Add the Default
    var $newDefault = $('<span>');
    $newDefault.attr("class", "tag is-black");
    $newDefault.text("All");
    // Check if Selected
    if ($coachFilterSelected != "All") {
        $newDefault.addClass("is-light");
    }
    // Add Data
    $newDefault.addClass("coach-filter");
    $newDefault.data("filter","All");
    $newDefault.css('cursor', 'pointer');
    // Append to div
    $newDivHolder.append($newDefault);

    for (var c = 0; c < Object.keys($theCoaches).length; c++) {

        // Add the Filters
        var $newTag = $('<span>');
        $newTag.attr("class", "tag " + checkCoach($theCoaches[c].name));
        $newTag.text($theCoaches[c].name);
        // Check if Selected
        if ($coachFilterSelected != $theCoaches[c].name) {
            $newTag.addClass("is-light");
        }
        // Add Data
        $newTag.addClass("coach-filter");
        $newTag.data("filter",$theCoaches[c].name);
        $newTag.css('cursor', 'pointer');
        // Append to div
        $newDivHolder.append($newTag);
    }

    // Add the current filters to the div
    $coachFiltersEl.append($newDivHolder);
}

// Check the document is ready
$(document).ready(function () {

    // Display the default filters and video
    displayWorkouts();
    displayCoaches();
    displayVideos();

    // Filter Clicks
    $(document).on("click", ".coach-filter", function () {

        // Retrieve the Filter Data
        var $whichCoach = $(this).data("filter");
        
        // Set the filters to the current selection
        $coachFilterSelected = $whichCoach;

        displayCoaches();

    })
})