const apiKey = 'YOUR_API_KEY'; // Get free API key from OpenWeatherMap
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

const weatherDiv = document.getElementById('weather');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const desc = document.getElementById('desc');
const error = document.getElementById('error');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) return;
    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === 200) {
                error.textContent = '';
                weatherDiv.classList.remove('hidden');
                cityName.textContent = data.name;
                weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                temp.textContent = `Temperature: ${data.main.temp} °C`;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                desc.textContent = data.weather[0].description;
            } else {
                weatherDiv.classList.add('hidden');
                error.textContent = 'City not found';
            }
        })
        .catch(err => {
            console.error(err);
            error.textContent = 'Error fetching data';
        });
}
