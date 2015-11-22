var map;
function initMap(latitude, longitude) {  
  map = new google.maps.Map(document.getElementById("google"), {
    center: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
    zoom: 16
  });
};