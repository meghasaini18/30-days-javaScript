const apiKey = "5e194601a8b127ce7db336272e2eec7f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector("error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
    const data = await response.json();
    console.log(data);

    if(data.code === "404"){
        alert("City not found");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector("error").style.display = "block";
 }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        checkWeather(searchBox.value);
    }
});
// checkWeather();