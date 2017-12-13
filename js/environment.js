// Plays a sound file 
// ==========================================================
function playSound(sound) {
    var snd = new Audio(sound);
    snd.play();
    return true;
}

// Home screen refresh
// ==========================================================
function screenRefresh(id) {
    systemClock('system-clock');
    updateCurrentConditions('63122', '7857465136eaa7af')
    updateForecast('63122', '7857465136eaa7af')
}



