const weatherApi = '5680dac342fac3bdf262e90bd5d52dce';

let weatherData;
let cityList = ["Tokyo", "New York", "Sydney", "London", "Cape Town", "Buenos Aires", "Moscow", "Mumbai", "Los Angeles", "Rio de Janeiro", "Beijing", "Cairo", "Jakarta", "Lagos", "Santiago", "Delhi", "Toronto", "Melbourne", "Paris", "Johannesburg", "São Paulo", "Seoul", "Nairobi", "Istanbul", "Mexico City", "Hong Kong", "Bangkok", "Dubai", "Lima", "Singapore", "Riyadh"];

// let city = 'Seoul';
let limit = 1;
let coordInfo;
let lat, lon = 0;

let currLat, currLon;

function kToF(Kelvin) {
  return (((Kelvin - 273.15) * 1.8) + 32).toFixed(2);
}

function drawPoint(lon, lat, currTemp, city) {
  let lonX = map(lon, -180, 180, 0, width);
  let latY = map(lat, -90, 90, height, 0);

  console.log(lonX, latY);

  // noStroke();
  // fill(250);
  // rectMode(CORNER);
  // rect(lonX + 10, latY - 10, 50,20);


  strokeWeight(2);
  noFill();
  stroke('red');
  ellipse(lonX, latY, 10);

  strokeWeight(0.5);
  textSize(10);
  fill('red');
  text(currTemp, lonX + 10, latY);
  text(city, lonX + 10, latY + 10);

}

// function getMyLocation() {
//   navigator.geolocation.getCurrentPosition((position) => {
//     let myLat = position.coords.latitude;
//     let myLon = position.coords.longitude;

//     console.log(myLat, myLon);
    
//     myLat = (map(myLat,  -90, 90, height, 0)).toFixed(4);
//     myLon = (map(myLon, -180, 180, 0, width)).toFixed(4);
//     noFill();
//     strokeWeight(0.2);
//     ellipse(myLon, myLat, 100);
//   })
// }

function weatherMap(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      weatherData = data;
      console.log(weatherData);
      let currTemp = kToF(weatherData.main.temp);
      console.log('the current weather @' + weatherData.name + ' is: ' + currTemp + ' F');
      console.log(weatherData.coord.lon, weatherData.coord.lat);
      drawPoint(weatherData.coord.lon, weatherData.coord.lat, currTemp, weatherData.name);

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
  
  createCanvas(innerWidth, innerHeight);
  background(220);
  // getCoordByName('Seoul');
  // getCoordByName('London');
  // getCoordByName('Belgium');

  for (city of cityList) {
    getCoordByName(city);
  }

  // setTimeout(function() {
  //   getMyLocation()
  // }, 1000);
}

function mouseClicked() {
  let lonX = (map(mouseX, 0, width, -180, 180)).toFixed(4);
  let latY = (map(mouseY,  height, 0, -90, 90)).toFixed(4);
  weatherMap(latY, lonX);
  console.log(lonX, latY);
}

function draw() {

  // getMyLocation();

}


