import * as dat from "./apiDat.js";

const searchForm = document.getElementById("searchForm");
const searchBar = document.getElementById("search");
const weatherDetails = document.querySelector(".weatherDetails");
const cityName = document.querySelector(".cityName");
const iconContainer = document.querySelector(".iconContainer");
const iconDesc = document.querySelector(".iconDesc");
const temp = document.querySelector(".temp");

import clearDay from '../icon/clear-day.png';
import clearNight from '../icon/clear-night.png';
import cloudy from '../icon/cloudy.png';
import partlyCloudyDay from '../icon/cloudy.png';
import partlyCloudyNight from '../icon/cloudy.png';
import fog from '../icon/fog.png';
import rain from '../icon/rain.png';
import snow from '../icon/snow.png';
import snowShower from '../icon/snow-shower.png';
import thunderRain from '../icon/thunder-rain.png';
import wind from '../icon/wind.png';

const weatherIcons = {
  'clear-day' : clearDay,
  'clear-night' : clearNight,
  'cloudy' : cloudy,
  'partly-cloudy-day' : partlyCloudyDay,
  'partly-cloudy-night' : partlyCloudyNight,
  'fog' : fog,
  'rain' : rain,
  'snow' : snow,
  'snow-shower' : snowShower,
  'thunder-rain' : thunderRain,
  'wind' : wind
}

function loadWeatherIcon(icon){
  const iconURL = weatherIcons[icon];  
  iconContainer.style.backgroundImage = `url(${iconURL})`;
}

function initButtons() {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let city = searchBar.value;

    loadWeatherRprt(city);

    searchBar.value = "";
  });
}

async function loadWeatherRprt(city) {
  const data = await dat.getData(city);

  if (!data) {
    alert("city not found");
  } else {
    console.log(`${city} city weather data found`);
    console.dir(data, null, 2);

    weatherDetails.classList.add('active');
    cityName.textContent = data.address.replace(/\b\w/g, char => char.toUpperCase());
    temp.textContent = `${data.currentConditions.temp}°C`;

    const iconText = data.currentConditions.icon.replaceAll("-"," ");
    const capIconText = iconText.replace(/\b\w/g, char => char.toUpperCase());
    iconDesc.textContent = capIconText ;

    loadWeatherIcon(data.currentConditions.icon);
  }
}



export { initButtons, loadWeatherRprt };
