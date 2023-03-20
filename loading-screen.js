// Show the loading screen
document.querySelector(".loading-screen").style.display = "flex";

// Hide the loading screen after 20 seconds
setTimeout(function() {
    document.querySelector(".loading-screen").style.display = "none";
}, 20000);
