import * as dat from "./apiDat.js";

const searchForm = document.getElementById("searchForm");
const searchBar = document.getElementById("search");
const weatherDetails = document.querySelector(".weatherDetails");
const cityName = document.querySelector(".cityName");
const iconContainer = document.querySelector(".iconContainer");
const iconDesc = document.querySelector(".iconDesc");
const temp = document.querySelector(".temp");
const humidityVal = document.querySelector('.humidityVal');
const rainchVal = document.querySelector('.rainchVal');
const uvVal = document.querySelector('.uvVal');
const aqVal = document.querySelector('.aqVal');
const uvbar = document.getElementById('uvbar');
const aqbar = document.getElementById('aqbar');

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

function loadWeatherDetails(data) {
  humidityVal.textContent = `${data.currentConditions.humidity}%`;
  aqVal.textContent = `${data.currentConditions.aqius}`;
  barWidth(aqbar, data.currentConditions.aqius, 500);  
  uvVal.textContent = `${data.currentConditions.uvindex}`;
  barWidth(uvbar, data.currentConditions.uvindex, 12);

  if (data.currentConditions.precip) {
    rainchVal.textContent = `${data.currentConditions.precip}mm`;
  } else {
    rainchVal.textContent = '--';
  } 
}

function barWidth(dom, val, maxval) {
  if (val === 0) {
    dom.style.width = `0%`;
    return;
  }
  let prctg = (val/maxval)*100;  
  dom.style.width = `${prctg}%`;

  barColor(dom,prctg)
  console.log(prctg);
}

function barColor(dom, val) {
  switch (true) {
    case (val<= 100 && val >= 81):
      dom.style.backgroundColor = 'var(--dangerous)';
      break;
    case (val<= 80 && val >= 61):
      dom.style.backgroundColor = 'var(--bad)';
      break;
    case (val<= 60 && val >= 41):
      dom.style.backgroundColor = 'var(--mid)';
      break;
    case (val<= 40 && val >= 21):
      dom.style.backgroundColor = 'var(--fine)';
      break;
    case (val<= 20 && val >= 0):
      dom.style.backgroundColor = 'var(--good)';
      break;  
    default:
      dom.style.backgroundColor = 'var(--good)';
      break;
  }
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
    loadWeatherDetails(data);
  }
}



export { initButtons, loadWeatherRprt };
