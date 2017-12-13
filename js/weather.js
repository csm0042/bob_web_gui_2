function updateCurrentConditions(zip, apiKey) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            conditions = JSON.parse(this.responseText);
            document.getElementById("curTemp").innerHTML = conditions.current_observation.temp_f;
            document.getElementById("relHumid").innerHTML = conditions.current_observation.relative_humidity;
            document.getElementById("windSpeed").innerHTML = conditions.current_observation.wind_mph;
            document.getElementById("windGust").innerHTML = conditions.current_observation.wind_gust_mph;
            document.getElementById("windDir").innerHTML = conditions.current_observation.wind_dir;
            document.getElementById("feelsLike").innerHTML = conditions.current_observation.feelslike_f;
            document.getElementById("dewPoint").innerHTML = conditions.current_observation.dewpoint_f;
            document.getElementById("precip1hr").innerHTML = conditions.current_observation.precip_1hr_in;
            document.getElementById("precipTot").innerHTML = conditions.current_observation.precip_today_in;
        }
    }
    var url = "http://api.wunderground.com/api/" + apiKey + "/conditions/q/" + zip + ".json";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function updateForecast(zip, apiKey) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            forecast = JSON.parse(this.responseText);
            document.getElementById("forecastSummary0").innerHTML = forecast.forecast.txt_forecast.forecastday[0].fcttext;
            document.getElementById("forecastSummary1").innerHTML = forecast.forecast.txt_forecast.forecastday[1].fcttext;
        }
    }
    var url = "http://api.wunderground.com/api/" + apiKey + "/forecast/q/" + zip + ".json";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}