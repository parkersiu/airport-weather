var $searchinput = document.getElementById('airport');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $navbar = document.querySelector('nav');
var $airportdiv = document.getElementById('airport-div');
var $searchdiv = document.getElementById('search-div');
var $h1 = document.getElementById('airport-h1');

window.addEventListener('load', function (event) {
  viewSwitcher(data.view);
  getAirportWeather(data.airport);
});

$form.addEventListener('submit', function (event) {
  data.airport = $searchinput.value.toUpperCase();
  $form.reset();
  event.preventDefault();
  viewSwitcher('airport');
  getAirportWeather(data.airport);
});

$navbar.addEventListener('click', function (event) {
  if (event.target.textContent === 'Search') {
    viewSwitcher('search');
  } else if (event.target.textContent === 'Favorites') {
    viewSwitcher('airport');
  }
});

function viewSwitcher(view) {
  data.view = view;
  if (view === 'search') {
    $searchdiv.className = '';
    $airportdiv.className = 'hidden';
  } else if (view === 'airport') {
    $searchdiv.className = 'hidden';
    $airportdiv.className = '';
  } else if (view === 'favorites') {
    $searchdiv.className = '';
    $airportdiv.className = '';
  }
}

function renderWeather(airport) {
  $ul.replaceChildren();
  $h1.textContent = data.airport + ' Weather';
  var metar = document.createElement('li');
  metar.textContent = 'METAR (Raw):';
  $ul.appendChild(metar);
  var rawData = document.createElement('li');
  rawData.textContent = airport.raw;
  $ul.appendChild(rawData);
  var time = document.createElement('li');
  time.textContent = 'Report Time:';
  $ul.appendChild(time);
  var timeData = document.createElement('li');
  timeData.textContent = airport.time_of_obs;
  $ul.appendChild(timeData);
  var category = document.createElement('li');
  category.textContent = 'Flight Category:';
  $ul.appendChild(category);
  var categoryData = document.createElement('li');
  categoryData.textContent = airport.category;
  $ul.appendChild(categoryData);
  var temp = document.createElement('li');
  temp.textContent = 'Temperature / Dewpoint';
  $ul.appendChild(temp);
  var tempData = document.createElement('li');
  tempData.textContent = airport.temp + ' / ' + airport.dewpoint + 'C';
  $ul.appendChild(tempData);
  var wind = document.createElement('li');
  wind.textContent = 'Wind:';
  $ul.appendChild(wind);
  var windData = document.createElement('li');
  windData.textContent = airport.wind + ' @ ' + airport.wind_vel + ' knots';
  $ul.appendChild(windData);
  var visibility = document.createElement('li');
  visibility.textContent = 'Visibility:';
  $ul.appendChild(visibility);
  var visibilityData = document.createElement('li');
  visibilityData.textContent = airport.visibility + ' SM';
  $ul.appendChild(visibilityData);
  var sky = document.createElement('li');
  sky.textContent = 'Sky Conditions:';
  $ul.appendChild(sky);
  var skyData = document.createElement('li');
  for (var i = 0; i < airport.sky_conditions.length; i++) {
    if (airport.sky_conditions[i].base_agl === null) {
      skyData.textContent = airport.sky_conditions[i].coverage;
    } else if (airport.sky_conditions[i].base_agl !== null) {
      skyData.textContent = airport.sky_conditions[i].coverage + ' at ' + airport.sky_conditions[i].base_agl + ' AGL';
    }
  }
  $ul.appendChild(skyData);
}

function getAirportWeather(airport) {
  var targetUrl = encodeURIComponent('https://api.aviationapi.com/v1/weather/metar?apt=' + airport);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.weather = xhr.response;
    renderWeather(xhr.response[airport.toUpperCase()]);
  });
  xhr.send();
}
