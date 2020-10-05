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

function heartVideo(which){
    
    var $arrayPos = $.inArray(which, $likedVideos);

    if ($arrayPos == -1){
        $likedVideos.push(which);
    }
    else {
        $likedVideos.splice($arrayPos,1);
    }
}