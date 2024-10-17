const form = document.querySelector('form');
const cityInput = document.getElementById('city-input');
const submitButton = document.getElementById('submit-button');

const cityNameSpan = document.getElementById('city-name');
const conditionsSpan = document.getElementById('conditions');
const descriptionSpan = document.getElementById('description');
const temperatureSpan = document.getElementById('temperature');
const feelsLikeSpan = document.getElementById('feels-like');
const humiditySpan = document.getElementById('humidity');
const rainSpan = document.getElementById('rain');
const rainChanceSpan = document.getElementById('rain-chance');
const sunriseSpan = document.getElementById('sunrise');
const sunsetSpan = document.getElementById('sunset');
const windspeedSpan = document.getElementById('windspeed');

submitButton.addEventListener('click', async (e)=>{
    getWeatherData(cityInput.value.toLowerCase());
});
cityInput.addEventListener('keypress', async (event)=>{
    if(event.key === 'Enter') {
        getWeatherData(cityInput.value.toLowerCase());
    }
});

getWeatherData('bengaluru');

async function getWeatherData(city) {
    const apiKey = 'AA45JLUB9T8ZXU23CDU5ZNPY5';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`;

    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    console.log(data);
    
    updateWeatherDetails(data);
};

function updateWeatherDetails(data) {
    cityNameSpan.innerText = data.resolvedAddress.toUpperCase();
    const conditionsData = data.currentConditions;
    conditionsSpan.innerText = conditionsData.conditions;
    descriptionSpan.innerText = data.description;
    temperatureSpan.innerText = ((Number(conditionsData.temp) - 32) * 5/9).toFixed(2);
    feelsLikeSpan.innerText = ((Number(conditionsData.feelslike) - 32) * 5/9).toFixed(2);
    humiditySpan.innerText = (Number(conditionsData.humidity)).toFixed(2);
    rainSpan.innerText = conditionsData.precip;
    rainChanceSpan.innerText = conditionsData.preciprob;
    sunriseSpan.innerText = conditionsData.sunrise;
    sunsetSpan.innerText = conditionsData.sunset;
    windspeedSpan.innerText = (Number(conditionsData.windspeed) * 1.61).toFixed(2);
}