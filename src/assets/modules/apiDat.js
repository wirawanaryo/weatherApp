const WEATHER_API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=AXDE6V5ELGREC85KVTJ52UK8L";

//Use a getter function for async data to guarantee synchronization. 
//This prevents "undefined" errors by forcing dependent logic to await the data
//rather than accessing a potentially empty global variable.
async function getData() {
  const response = await fetch(WEATHER_API_URL);
  const data =  await response.json();  
  return data;
}

async function logData() {
  const data = await getData(); 
  console.dir(data, null, 2);
}



export {logData};