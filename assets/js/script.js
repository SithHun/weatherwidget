// Get the form element and register a submit event listener
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the city input value
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value;

  // Call the function to fetch weather data for the city
  getWeatherForecast(city);
});

// Function to fetch weather data for a given city
function getWeatherForecast(city) {
  const apiKey = "{b21bfc63c29a44e663efc3901ae33f6a}";
  const baseUrl = "http://api.openweathermap.org/data/2.5/forecast";

  // Make a request to the API with the city name
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the weather data and update the HTML elements
      updateCurrentWeather(data);
      updateForecast(data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to update the current weather information
function updateCurrentWeather(data) {
  const cityName = document.getElementById("cityName");
  const date = document.getElementById("date");
  const weatherIcon = document.getElementById("weatherIcon");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");

  // Extract the necessary data from the API response
  const city = data.city.name;
  const currentDate = new Date(data.list[0].dt * 1000); // Convert timestamp to date
  const iconCode = data.list[0].weather[0].icon;
  const temp = data.list[0].main.temp;
  const humid = data.list[0].main.humidity;
  const wind = data.list[0].wind.speed;

  // Update the HTML elements with the weather data
  cityName.textContent = city;
  date.textContent = currentDate.toDateString();
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">`;
  temperature.textContent = `Temperature: ${temp}°C`;
  humidity.textContent = `Humidity: ${humid}%`;
  windSpeed.textContent = `Wind Speed: ${wind} km/h`;
}

// Function to update the forecast information
function updateForecast(data) {
  const forecastList = document.getElementById("forecastList");
  forecastList.innerHTML = ""; // Clear previous forecast data

  // Iterate over the forecast data for the next 5 days
  for (let i = 1; i < 6; i++) {
    // Extract the necessary data from the API response
    const date = new Date(data.list[i].dt * 1000); // Convert timestamp to date
    const iconCode = data.list[i].weather[0].icon;
    const temp = data.list[i].main.temp;
    const wind = data.list[i].wind.speed;
    const humid = data.list[i].main.humidity;

    // Create an HTML list item for each forecast entry
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <p>Date: ${date.toDateString()}</p>
        <p>Weather: <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon"></p>
        <p>Temperature: ${temp}°C</p>
        <p>Wind Speed: ${wind} km/h</p>
        <p>Humidity: ${humid}%</p>
      `;
      forecastList.appendChild(listItem);
    }
  };