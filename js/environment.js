// Plays a sound file 
// ==========================================================
function playSound(sound) {
    var snd = new Audio(sound);
    snd.play();
    return true;
}

// Home screen refresh
// ==========================================================
var refreshTO;
function screenResize() {
    clearTimeout(refreshTO);
    refreshTO = setTimeout(screenRefresh, 200);
}

function screenRefresh() {
    updateMap('7857465136eaa7af', '38.6524', '-90.34', '50');
    updateWeather('63122', '7857465136eaa7af');
    systemClock('system-clock');
    //updateCurrentConditions('63122', '7857465136eaa7af')
    //updateForecast('63122', '7857465136eaa7af')
}
