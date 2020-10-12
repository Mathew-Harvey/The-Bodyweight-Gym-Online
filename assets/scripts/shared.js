// Watched Videos Array
$watchedVideos = [];

// Liked Videos Array
$likedVideos = [];

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

// Function to "heart" a video
function heartVideo(which) {

    var $arrayPos = $.inArray(which, $likedVideos);

    if ($arrayPos == -1) {
        $likedVideos.push(which);
    }
    else {
        $likedVideos.splice($arrayPos, 1);
    }

    // Update the history
    updateStorage();
}

// Function to mark a video as complete
function finishVideo(which) {

    which = parseInt(which);

    var $arrayPos = $.inArray(which, $watchedVideos);

    if ($arrayPos == -1) {
        $watchedVideos.push(which);
    }

    // Update the history
    updateStorage();
}

// Function to retrieve the stored history
function retrieveStoredHistory() {

    // Call to check for local storage
    var $checkExistingHistory = localStorage.getItem("bodyweightgym-history");
    var $checkExistingLikes = localStorage.getItem("bodyweightgym-likes");

    // If the history isn't empty
    if ($checkExistingHistory != null) {
        $watchedVideos = JSON.parse($checkExistingHistory);
    }
    if ($checkExistingLikes != null) {
        $likedVideos = JSON.parse($checkExistingLikes);
    }
}

// Function to update the storage with latest video history
function updateStorage() {

    // Stringify the $watchedVideos & $likedVideos
    var $addHistory = JSON.stringify($watchedVideos);
    var $addLikes = JSON.stringify($likedVideos);

    // Add to the local storage
    localStorage.setItem("bodyweightgym-history", $addHistory);
    localStorage.setItem("bodyweightgym-likes", $addLikes);

    // Console log the updated search history
    console.log("[SYSTEM] Added to local storage: " + $addHistory);
    console.log("[SYSTEM] Added to local storage: " + $addLikes);
}

$(document).ready(function () {

    // Retrieve local storage
    retrieveStoredHistory();
})
