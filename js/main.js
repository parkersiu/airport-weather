var $searchinput = document.getElementById('airport');
var $form = document.querySelector('form');
var $ul = document.getElementById('weather-list');
var $navbar = document.querySelector('nav');
var $airportdiv = document.getElementById('airport-div');
var $searchdiv = document.getElementById('search-div');
var $h1 = document.getElementById('airport-h1');
var $star = document.getElementById('star');
var $favoritesdiv = document.getElementById('favorites-div');
var $favoritesparent = document.getElementById('favorites-parent');

window.addEventListener('load', function (event) {
  viewSwitcher(data.view);
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
    viewSwitcher('favorites');
    renderFavorites(data.favorites);
  }
});

$star.addEventListener('click', function (event) {
  if (event.target.className === 'fa-regular fa-star') {
    event.target.className = 'fa-solid fa-star';
    if (!data.favorites.includes(data.airport)) {
      data.favorites.push(data.airport);
    }
  } else if (event.target.className === 'fa-solid fa-star') {
    event.target.className = 'fa-regular fa-star';
    for (var i = 0; i < data.favorites.length; i++) {
      if (data.favorites[i] === data.airport) {
        data.favorites.splice(i, 1);
      }
    }
  }
});

function viewSwitcher(view) {
  data.view = view;
  if (view === 'search') {
    $searchdiv.className = '';
    $airportdiv.className = 'hidden';
    $favoritesdiv.className = 'hidden';
  } else if (view === 'airport') {
    $searchdiv.className = 'hidden';
    $airportdiv.className = '';
    $favoritesdiv.className = 'hidden';
  } else if (view === 'favorites') {
    $searchdiv.className = 'hidden';
    $airportdiv.className = 'hidden';
    $favoritesdiv.className = '';
  }
}

function renderWeather(airport) {
  for (var i = 0; i < data.favorites.length; i++) {
    if (data.airport === data.favorites[i]) {
      $star.className = 'fa-solid fa-star';
    } else {
      $star.className = 'fa-regular fa-star';
    }
  }
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
  tempData.textContent = airport.temp + 'C / ' + airport.dewpoint + 'C';
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
  for (var j = 0; j < airport.sky_conditions.length; j++) {
    if (airport.sky_conditions[j].base_agl === null) {
      skyData.textContent = airport.sky_conditions[j].coverage;
    } else if (airport.sky_conditions[j].base_agl !== null) {
      skyData.textContent = airport.sky_conditions[j].coverage + ' at ' + airport.sky_conditions[j].base_agl + ' AGL';
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

function renderFavorites(favorites) {
  $favoritesparent.replaceChildren();
  for (var i = 0; i < favorites.length; i++) {
    var column = document.createElement('div');
    column.className = 'column-half fav';
    $favoritesparent.appendChild(column);
    var p = document.createElement('p');
    p.textContent = favorites[i];
    column.appendChild(p);
    var button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.className = 'go-button inline';
    button.textContent = 'Go';
    column.appendChild(button);
    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';
    column.appendChild(icon);
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.view === 'favorites') {
    renderFavorites(data.favorites);
  } else if (data.view === 'airport') {
    getAirportWeather(data.airport);
  }
});

$favoritesparent.addEventListener('click', function (event) {
  if (event.target.textContent === 'Go') {
    var id = event.target.closest('div');
    var p = id.querySelector('p');
    data.airport = p.textContent.toUpperCase();
    viewSwitcher('airport');
    getAirportWeather(data.airport);
  }
});
