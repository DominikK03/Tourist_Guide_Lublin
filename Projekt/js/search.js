document.getElementById('button-search').addEventListener('click', function() {
  var selectedValue = document.getElementById('destination-select').value;
  window.location.href = selectedValue;
});

document.getElementById('header-search-button').addEventListener('click', function() {
  var selectedValue = document.getElementById('header-destination-select').value;
  window.location.href = selectedValue;
});
