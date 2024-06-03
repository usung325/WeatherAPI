const weatherApi = '5680dac342fac3bdf262e90bd5d52dce';

let weatherData;
let cityList = ["Tokyo", "New York", "Sydney", "London", "Cape Town", "Buenos Aires", "Moscow", "Mumbai", "Los Angeles", "Rio de Janeiro", "Beijing", "Cairo", "Jakarta", "Lagos", "Santiago", "Delhi", "Toronto", "Melbourne", "Paris", "Johannesburg", "São Paulo", "Seoul", "Nairobi", "Istanbul", "Mexico City", "Hong Kong", "Bangkok", "Dubai", "Lima", "Singapore", "Riyadh"];

// let city = 'Seoul';
let limit = 1;
let coordInfo;
let lat, lon = 0;

function kToF(Kelvin) {
  return (((Kelvin - 273.15) * 1.8) + 32).toFixed(2);
}

function drawPoint(lon, lat) {
  let lonX = map(lon, -180, 180, 0, width);
  let latY = map(lat, -90, 90, height, 0);

  console.log(lonX, latY);
  noFill();
  stroke('red');
  ellipse(lonX, latY, 10);
}

function weatherMap(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      weatherData = data;
      console.log(weatherData);
      console.log('the current weather @' + weatherData.name + ' is: ' + kToF(weatherData.main.temp) + ' F');
      console.log(weatherData.coord.lon, weatherData.coord.lat);
      drawPoint(weatherData.coord.lon, weatherData.coord.lat);

    })
    .catch(err => console.log(err));
}

async function getCoordByName(city) {
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherApi}`;
  const response = await fetch(url);
  const data = await (response.json());
  // lat = data[0].lat;
  // lon = data[0].lon;
  weatherMap(data[0].lat, data[0].lon);
  // .then(response => response.json())
  // .then(data => {
  //   coordInfo = data;
  //   console.log(coordInfo);
  //   lat = data[0].lat;
  //   lon = data[0].lon;
  //   console.log(lat, lon);

  //this works
  // .catch(err => console.log(err));
}

function setup() {
  createCanvas(800, 800);
  background(220);
  // getCoordByName('Seoul');
  // getCoordByName('London');
  // getCoordByName('Belgium');

  for (city of cityList) {
    getCoordByName(city);
  }
}

function draw() {


}


