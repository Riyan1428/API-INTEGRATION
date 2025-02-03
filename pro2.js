// When the "Get Weather" button is clicked, let's get that weather!
document.getElementById('getWeather').addEventListener('click', async function() {
    // Grab the city name from the input field
    const location = document.getElementById('location').value.trim();

    // Check if the input field is not empty
    if (!location) {
        document.getElementById('weatherInfo').innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
        return;
    }

    try {
        // Fetch the latitude and longitude of the city
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
        const geoData = await geoResponse.json();

        // Check if we found any results for that location
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('Location not found! Try another city.');
        }

        // Get latitude and longitude from the first result
        const { latitude, longitude } = geoData.results[0];

        // Fetch the current weather data using those coordinates
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        // Check if the weather data is available
        if (!weatherData.current_weather) {
            throw new Error('Weather data not available for this location.');
        }

        // Grab the current weather info from our data
        const weatherInfo = weatherData.current_weather;

        // Create a display string with all the important details
        const displayInfo = `
            <h2>Current Weather in ${location}</h2>
            <p><strong>Temperature:</strong> ${weatherInfo.temperature} °C</p>
            <p><strong>Wind Speed:</strong> ${weatherInfo.windspeed} km/h</p>
            <p><strong>Wind Direction:</strong> ${weatherInfo.winddirection}°</p>
        `;

        // Update our weather info section with this new information
        document.getElementById('weatherInfo').innerHTML = displayInfo;
    } catch (error) {
        // If something goes wrong, show an error message in red
        document.getElementById('weatherInfo').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

// Function to create cloud elements for animation
function createClouds() {
    const cloudContainer = document.createElement('div');
    cloudContainer.classList.add('cloud-container');

    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloudContainer.appendChild(cloud);
    }

    document.body.appendChild(cloudContainer);
}

// Call the function to create clouds when the page loads
window.onload = createClouds;
