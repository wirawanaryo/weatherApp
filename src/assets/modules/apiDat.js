const WEATHER_API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=AXDE6V5ELGREC85KVTJ52UK8L";

//Use a getter function for async data to guarantee synchronization.
//This prevents "undefined" errors by forcing dependent logic to await the data
//rather than accessing a potentially empty global variable.
async function getData(city) {
  // const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=AXDE6V5ELGREC85KVTJ52UK8L`;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}
?unitGroup=metric
&elements=datetime,temp,humidity,precip,uvindex,aqius,icon,precipprob
&key=AXDE6V5ELGREC85KVTJ52UK8L
&contentType=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.resolvedAddress) {
      throw new Error("City not found");
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function logData(city) {
  const data = await getData(city);
  if (!data) {
    alert("city not found");
  } else {
    console.log(`${city} city weather data found`);
    console.dir(data, null, 2);
  }
}

export { getData, logData };
