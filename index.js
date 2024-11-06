const API_KEY = 'e252674810dc5c10ca26f522f13f0381';


async function fetchWeather(city) {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


function displayWeather(data) {
    console.log(data);
    
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = ''; 
    
    const list = document.createElement('ul');
const icon = data.weather[0].icon;
const iconUrl = ` https://openweathermap.org/img/wn/${icon}@2x.png`;
const iconImage = document.createElement('img');
iconImage.src = iconUrl;
iconImage.alt = data.weather[0].description;
iconImage.style.width = '100px';
weatherInfo.appendChild(iconImage);



let temperature = data.main.temp - 273.15; 
const temperatureInt = Math.floor(temperature);
    let cityProps = [data.name, data.weather[0].description, data.wind.speed,`${temperatureInt}` ];
    const titles = ['City name:', 'Clouds:', 'Wind Speed (m/s):', 'Temperature (celcius):'];

   
    for (let i = 0; i < cityProps.length; i++) {
        let listitem = document.createElement('li');
        listitem.innerText = `${titles[i]} ${cityProps[i]}`;
        list.appendChild(listitem); 
    }

    
    weatherInfo.appendChild(list);

   
    list.style.backgroundColor = 'gray';
    list.style.padding = '10px';
    list.style.color = 'white';
}


document.getElementById('fetch-weather-btn').addEventListener('click', function() {

    const cityInput = document.getElementById('cityinput').value.trim();

    if (cityInput) {
        fetchWeather(cityInput) 
            .then(data => displayWeather(data))
            .catch(error => console.error('An error has occurred', error));
    } else {
        console.error('Please enter a valid city name');
    }
});




/*const API_KEY = 'e252674810dc5c10ca26f522f13f0381';
let city = 'Malmö';
async function fetchWeather(city){
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    try{
        const response = await fetch (BASE_URL);
        if(!response.ok){
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data}
        catch(error){console.error('ERROR', error)}
        
    }
  fetchWeather(city);
  */
  
