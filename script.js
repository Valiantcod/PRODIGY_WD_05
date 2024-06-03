const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('weather-data').style.display = 'none';

    fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                showError();
            }
        })
        .catch(() => {
            showError();
        });
}

function displayWeather(data) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('weather-data').style.display = 'block';
    document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('conditions').innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    showError();
                }
            })
            .catch(() => {
                showError();
            });
    });
}
