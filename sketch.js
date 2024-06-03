const weatherApi = '5680dac342fac3bdf262e90bd5d52dce';

let weatherData;

let city = 'London';
let limit = 1;
let coordInfo;
let lat, lon;


function weatherMap(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      weatherData = data;
      console.log(weatherData);
      console.log(weatherData.main.temp)
    })
    .catch(err => console.log(err));
}

async function getCoordByName() {
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherApi}`;
  const response = await fetch(url);
  const data = await (response.json());
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
  createCanvas(400, 400);
  getCoordByName();
}

function draw() {
  background(220);
}


