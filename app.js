// Select the elements from the HTML
const locationElement = document.querySelector("#location");
const temperatureElement = document.querySelector("#temperature");
const weatherConditionsElement = document.querySelector("#weather-conditions");
const forecastElement = document.querySelector("#forecast");
const locationForm = document.querySelector("#location-form");

// API key for OpenWeatherMap
const API_KEY = "1ce5f4180d4b54d3df67feadb325265a";

locationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the city or zip code entered by the user
    const city = document.querySelector("#city").value;

    // Fetch data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Extract the data we need from the API response
            const { name, main } = data;
            const { temp, humidity } = main;
            const { description } = data.weather[0];

            // Update the elements on the page with the data
            locationElement.textContent = name;
            temperatureElement.textContent = `Temperature: ${temp} °C`;
            weatherConditionsElement.textContent = `Weather: ${description}`;
            forecastElement.textContent = `Humidity: ${humidity}%`;
        })
        .catch((error) => {
            console.error(error);
        });
});


const loadingSpinner = document.querySelector(".loading-spinner");
locationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loadingSpinner.style.display = "block";
    // Get the city or zip code entered by the user
    const city = document.querySelector("#city").value;
    // Fetch data from the OpenWeatherMap API
    setTimeout(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                loadingSpinner.style.display = "none";
                // Your existing code for updating the elements on the page
            })
            .catch((error) => {
                console.error(error);
            });
    }, 2500);
});

locationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loadingSpinner.style.display = "block";
    // Get the city or zip code entered by the user
    const city = document.querySelector("#city").value;
    // Fetch data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            loadingSpinner.style.display = "none";
            // Update the elements on the page with the data
            locationElement.textContent = data.name;
            temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
            weatherConditionsElement.textContent = `Weather: ${data.weather[0].description}`;
            forecastElement.textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("feedback").innerHTML = "Weather data updated successfully";
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("feedback").innerHTML = "An error occured please try again";
        });
});

locationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = document.querySelector("#city").value;
    if(validateInput(city)) {
        // Fetch data from the OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                // Update the elements on the page with the data
                locationElement.textContent = data.name;
                temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
                weatherConditionsElement.textContent = `Weather: ${data.weather[0].description}`;
                forecastElement.textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById("feedback").innerHTML = "Weather data updated successfully";
            })
            .catch((error) => {
                console.error(error);
                document.getElementById("feedback").innerHTML = "An error occured please try again";
            });
    } else {
        document.getElementById("feedback").innerHTML = "Please enter a valid city or zip code";
    }
});

function validateInput(city) {
    // RegExp for checking if the input is a valid city or zip code
    const cityRegex = /^[a-zA-Z\s]*$/;
    const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

    // Check if the input matches the city or zip code RegExp
    if(cityRegex.test(city) || zipRegex.test(city)) {
        return true;
    } else {
        return false;
    }
}

// Handle the signup form submission
document.querySelector("#signup-form").addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the values from the form
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Send the data to the server for signup
    fetch("signup.php", {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: { "Content-Type": "application/json" }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

// Handle the login form submission
document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the values from the form
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Send the data to the server for login
    fetch("login.php", {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: { "Content-Type": "application/json" }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

const body = document.querySelector("body");

// Check if the user has a saved mode preference
const savedMode = localStorage.getItem("mode");
if (savedMode) {
    body.classList.add(savedMode);
}

// Listen for mode switch button clicks
document.querySelector("#switch-mode-button").addEvent
