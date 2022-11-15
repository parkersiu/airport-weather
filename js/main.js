var $searchinput = document.getElementById('airport');
var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  data.airport = $searchinput.value;
  $form.reset();
  event.preventDefault();
});
