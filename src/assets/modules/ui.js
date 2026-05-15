import * as dat from "./apiDat.js";

const searchForm = document.getElementById('searchForm');
const searchBar = document.getElementById('search');

let curCity;

function initButtons() {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();    
    curCity=searchBar.value;
    console.log(curCity);
    searchBar.value = '';
  });
}



export { initButtons};