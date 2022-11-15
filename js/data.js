/* exported data */
var data = {};

var previousDataJSON = localStorage.getItem('javascript-ajax-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('javascript-ajax-storage', dataJSON);
});
