const apiKey = '0be74323398dada538647170c35e341c';
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    
    if (city) {
        const savedData = localStorage.getItem(city);
        if (savedData) {
            displayWeatherData(JSON.parse(savedData));
        } else {
            fetchWeatherData(city);
        }
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Cidade não encontrada!');
            return response.json();
        })
        .then(data => {
            saveWeatherData(city, data);
            displayWeatherData(data);
        })
        .catch(error => {
            errorMessage.textContent = `Erro: ${error.message}`;
        });
}

function displayWeatherData(data) {
    weatherInfo.innerHTML = `
        <h2>Clima em ${data.name}:</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Umidade: ${data.main.humidity}%</p>
        <p>Descrição: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Ícone do clima">
    `;
    errorMessage.textContent = '';
}

function saveWeatherData(city, data) {
    localStorage.setItem(city, JSON.stringify(data));
}

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    console.log("Requisição para a API:", url);

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Cidade não encontrada!');
            return response.json();
        })
        .then(data => {
            saveWeatherData(city, data);
            displayWeatherData(data);
        })
        .catch(error => {
            errorMessage.textContent = `Erro: ${error.message}`;
        });
}