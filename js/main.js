var $searchbutton = document.getElementById('search-go');
var $searchinput = document.getElementById('airport');
var $form = document.querySelector('form');

$searchbutton.addEventListener('click', function (event) {
  data.airport = $searchinput.value;
  $form.reset();
});
