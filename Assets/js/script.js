window.addEventListener("DOMContentLoaded", function(e) {
    var welcomeScreen = document.getElementById("welcome-screen");
    var fadeComplete = function(e) { welcomeScreen.appendChild(arr[0]); };
    var arr = welcomeScreen.getElementsByTagName("img");
    console.log(arr)
    for(var i=0; i < arr.length; i++) {
        console.log(arr[i].style.display);
        arr[i].addEventListener("animationend", fadeComplete, false);
    }
}, false);
