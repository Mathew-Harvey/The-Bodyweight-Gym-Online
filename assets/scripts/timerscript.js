
var timerBtn = document.getElementById("showTimer")
var timer = document.getElementsByClassName("timer")
var minutes = document.getElementById("minutes")
var second = document.getElementById("second")
var centiSecond = document.getElementById("centiSecond")

var arnie = new Audio("./assets/audio/Arnie.wav");

function arnieEnergy() { 
  arnie.play();
  
}

minutesCount = 0,secondCount = 0,centiSecondCount = 0

$(document).ready(function() {
    $('#showTimer').click (function() {
             $("#timerEl").toggleClass( "timer" );
    })
});

function startSW() {
   
    $("#pauseCount").removeAttr('disabled');
    $("#resetCount").removeAttr('disabled');
    $("#startCount").attr({'disabled':'disabled'}); 

    minutessetInterval = setInterval(function(){
        minutesCount += 1
        minutes.innerHTML = minutesCount
    },60000)

    secondsetInterval = setInterval(function(){
        secondCount += 1
        if(secondCount >59){
            secondCount = 1
        }
        if (secondCount == 45) {
            arnieEnergy();
            arnie.volume = 0.4;
        }
        second.innerHTML = secondCount
    },1000)

    centiSecondsetInterval = setInterval(function(){
        centiSecondCount += 1
        if(centiSecondCount >99){
            centiSecondCount = 1
        }
        centiSecond.innerHTML = centiSecondCount
    },10)
}

function pauseSW() {
    $("#startCount").removeAttr('disabled');
      $("#pauseCount").attr({'disabled':'disabled'}); 

      clearInterval(minutessetInterval)
      clearInterval(secondsetInterval)
      clearInterval(centiSecondsetInterval)
}

 
function resetSW() {
    $("#startCount").removeAttr('disabled');
    $("#resetCount").attr({'disabled':'disabled'}); 
    $("#pauseCount").attr({'disabled':'disabled'}); 

    clearInterval(minutessetInterval)
    clearInterval(secondsetInterval)
    clearInterval(centiSecondsetInterval)

    minutesCount = 0,secondCount = 0,centiSecondCount = 0
    minutes.innerHTML = minutesCount
    second.innerHTML = secondCount
    centiSecond.innerHTML = centiSecondCount

}
 
// Metronome beeps at 1 second intervals

var snd1 = new Audio("./assets/audio/Low_Woodblock.wav");

function beep2() { 
  snd1.play();
}

$(document).ready(function() {
    $('#metronomeStart').click (function() {
          beepInt = setInterval(beep2, 1000)   
          $("#metronomeStart").attr({'disabled':'disabled'}); 
          $("#metronomeStop").removeAttr('disabled');
    })
});

$(document).ready(function() {
    $('#metronomeStop').click (function() {
        console.log("stop")
          clearInterval(beepInt);   
          $("#metronomeStop").attr({'disabled':'disabled'}); 
          $("#metronomeStart").removeAttr('disabled');
    })
});


// Make timer dragable


dragElement(document.getElementById("timerEl"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}