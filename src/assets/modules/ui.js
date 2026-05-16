import * as dat from "./apiDat.js";

const searchForm = document.getElementById("searchForm");
const searchBar = document.getElementById("search");
const weatherDetails = document.querySelector(".weatherDetails");
const cityName = document.querySelector(".cityName");
const iconContainer = document.querySelector(".iconContainer");
const iconDesc = document.querySelector(".iconDesc");
const temp = document.querySelector(".temp");

const weatherIcons = {
  'clear-day' : '../icon/clear-day.png',
  'clear-night' : '../icon/clear-night.png',
  'cloudy' : '../icon/cloudy.png',
  'partly-cloudy-day' : '../icon/cloudy.png',
  'partly-cloudy-night' : '../icon/cloudy.png',
  'fog' : '../icon/fog.png',
  'rain' : '../icon/rain.png',
  'snow' : '../icon/snow.png',
  'snow-shower' : '../icon/snow-shower.png',
  'thunder-rain' : '../icon/thunder-rain.png',
  'wind' : '../icon/wind.png'
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
  }
}

export { initButtons, loadWeatherRprt };
