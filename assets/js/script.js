    // Get the form element and register a submit event listener
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the city input value
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value;

  // Call the function to fetch weather data for the city
  getCoordinates(city);
});

// Function to fetch latitude and longitude coordinates for a given city
function getCoordinates(city) {
  const apiKey = "{b21bfc63c29a44e663efc3901ae33f6a}";
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

  // Make a request to the API with the city name
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { coord } = data;
      // Call the function to fetch weather forecast using the coordinates
      getWeatherForecast(coord.lat, coord.lon);
    })
    .catch(error => {
      console.error("Error fetching coordinates:", error);
    });
}

// Function to fetch weather data for a given latitude and longitude
function getWeatherForecast(lat, lon) {
  const apiKey = "{YOUR_API_KEY}";
  const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

  // Make a request to the API with the latitude and longitude
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
};