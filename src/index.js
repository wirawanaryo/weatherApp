import "./reset.css";
import "./styles.css";

import * as ui from "./assets/modules/ui.js";

const WEATHER_API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=AXDE6V5ELGREC85KVTJ52UK8L";

async function getData() {
  const response = await fetch(WEATHER_API_URL);
  const data = await response.json();
  console.dir(data, null, 2);
}

const searchBar = document.getElementById('searchForm');

searchBar.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('User pressed Enter!');
});

getData();
