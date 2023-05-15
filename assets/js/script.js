// Get the form element and register a submit event listener
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the city input value
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value;

  // Call the function to fetch weather data for the city
  getWeatherForecast(city);

  // Update the search history on the web page
  updateSearchHistory();
});

// Function to save the city to local storage
function saveCityToLocalStorage(city) {
  // Retrieve the existing search history from local storage
  let searchHistory = localStorage.getItem("searchHistory");
  searchHistory = searchHistory ? JSON.parse(searchHistory) : [];

  // Add the new city to the search history
  searchHistory.push(city);

  // Store the updated search history in local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Function to fetch weather data for a given city
function getWeatherForecast(city) {
  const apiKey = "{b21bfc63c29a44e663efc3901ae33f6a}";
  const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

  // Make a request to the API with the city name
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the weather data and update the HTML elements
      updateCurrentWeather(data);
      updateForecast(data);

      // Save the city to local storage
      saveCityToLocalStorage(city);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to update the current weather information
function updateCurrentWeather(data) {
  // Your existing code for updating the current weather information
  // ...
}

// Function to update the forecast information
function updateForecast(data) {
  // Your existing code for updating the forecast information
  // ...
}

// Function to retrieve the search history from local storage
function getSearchHistoryFromLocalStorage() {
  // Retrieve the search history from local storage
  const searchHistory = localStorage.getItem("searchHistory");
  return searchHistory ? JSON.parse(searchHistory) : [];
}

// Function to update the search history on the web page
function updateSearchHistory() {
  const searchHistory = getSearchHistoryFromLocalStorage();
  const searchHistoryElement = document.getElementById("searchHistory");

  // Clear previous search history
  searchHistoryElement.innerHTML = "";

  // Add each city to the search history element
  searchHistory.forEach(city => {
    const cityLink = document.createElement("a");
    cityLink.textContent = city;
    cityLink.href = "#"; // You can specify the link behavior as needed
    cityLink.addEventListener("click", function() {
      getWeatherForecast(city);
    });

    const listItem = document.createElement("li");
    listItem.appendChild(cityLink);
    searchHistoryElement.appendChild(listItem);
  });
}

// Call the updateSearchHistory function when the page loads
window.addEventListener("DOMContentLoaded", function() {
  updateSearchHistory();
});