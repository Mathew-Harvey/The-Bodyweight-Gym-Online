// Query Selectors
$favouritesDisplayEl = $('#favourites-display');

// Function to display the current video selection
function displayFavourites() {

    console.log('[DISPLAY FAVOURITES]');

    // Clear Current Selection
    $favouritesDisplayEl.empty();

    // Create the Video Container
    var $newDivHolder = $('<div>');
    $newDivHolder.attr("class", "columns is-multiline");

    // Check Video Count
    var $videoCount = 0;

    for (var v = 0; v < Object.keys($theVideos).length; v++) {

        var $thisWorkout = $theVideos[v].tags[0];
        var $thisCoach = $theVideos[v].coach;
        var $thisScreenshot = $theVideos[v].screenshot;

        if (checkSelection($thisCoach, $thisWorkout)) {

            // Increase the Video Count
            $videoCount++;

            // Create the Individual Video Holder
            var $newVidHolder = $('<div>');
            $newVidHolder.attr("class", "column is-3");

            // Create the Thumbnail Div
            var $newOverlay = $('<div>');
            $newOverlay.attr("class","overlay");
            $newOverlay.data("video",v);
            // Create the Play Icon Div
            $newIcon = $('<div>');
            $newIcon.html('<i class="fas fa-play playicon"></i>');
            // Add the Thumbnail
            var $newThumb = $('<img>');
            $newThumb.attr("class","video-buttons");
            $newThumb.attr("src", $thisScreenshot);   
            // Append to the Thumbnail Div
            $newOverlay.append($newThumb);
            $newOverlay.append($newIcon);

            // Create the Tags beneath the video
            var $newTags = $('<div>');
            $newTags.attr("class", "tags are-medium");

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
            $newHeart.data("video", v);
            // Has the Video been Liked?
            var $newIcon = $('<i>');            
            if ($.inArray(v, $likedVideos) == -1){
                $newIcon.attr("class", "far fa-heart");
            }
            else {
                $newIcon.attr("class","fas fa-heart");
            }
            $newHeart.append($newIcon);

            // Create the Viewed Icon
            var $newViewed = $('<i>');
            $newViewed.attr("class", "tag");
            // Has the Video been Viewed?
            var $newTick = $('<i>');               
            if ($.inArray(v, $watchedVideos) == -1){
                $newTick.attr("class", "far fa-check-circle");
            }
            else {
                $newTick.attr("class","fas fa-check-circle");
            }         
            $newViewed.append($newTick);

            // Append Everything
            $newTags.append($newWorkout, $newCoach, $newHeart, $newViewed);
            $newVidHolder.append($newOverlay, $newTags);
            $newDivHolder.append($newVidHolder);

        }
    }

    // Check for zero videos
    if ($videoCount === 0){

        // Create the Individual Video Holder
        var $newVidHolder = $('<div>');
        $newVidHolder.attr("class", "column is-3");

        // Create the Thumbnail
        var $newThumb = $('<img>');
        $newThumb.attr("src", "./assets/img/previews/prev0.png");

        // Create the Tags beneath the video
        var $newTags = $('<div>');
        $newTags.attr("class", "tags are-medium");

        // Create the Zero Tag
        var $newZero = $('<span>');
        $newZero.attr("class", "tag");
        $newZero.text("No Videos Available");

        // Append Everything
        $newTags.append($newZero);
        $newVidHolder.append($newThumb, $newTags);
        $newDivHolder.append($newVidHolder);
    }

    // Add the current video selection to the div
    $videoDisplayEl.append($newDivHolder);

}

// Check the document is ready
$(document).ready(function () {

    // Display the favourites
    displayVideos();

    // Filter Clicks
    // Workouts
    $(document).on("click", ".workout-filter", function () {

        // Retrieve the Filter Data
        var $whichWorkout = $(this).data("filter");

        // Set the filters to the current selection
        $workoutFilterSelected = $whichWorkout;

        // Display the changed filters
        displayWorkouts();
        displayVideos();

    })
    // Coaches
    $(document).on("click", ".coach-filter", function () {

        // Retrieve the Filter Data
        var $whichCoach = $(this).data("filter");

        // Set the filters to the current selection
        $coachFilterSelected = $whichCoach;

        // Display the changed filters
        displayCoaches();
        displayVideos();

    })
    // Hearts
    $(document).on("click", ".heart", function () {

        // Retrieve the Filter Data
        var $whichVideo = $(this).data("video");

        // Add a heart to a video
        heartVideo($whichVideo);

        // Display the videos again
        displayVideos();

    })
    // Videos
    $(document).on("click", ".overlay", function () {

        // Retrieve the Filter Data
        var $whichVideo = $(this).data("video");

        // Load the video to the player.html
        window.location = 'player.html?video=' + $whichVideo;        

    })
})