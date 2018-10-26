async function getRestarauntPages() {
  let allRestaraunts = []
  let sidebar = document.getElementById('sidebar');
  fetch('http://localhost:8080/all.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (ids) {
      ids.forEach(id => {
        allRestaraunts.push(id + '.json')
      });
    })
    .then(() => {
      allRestaraunts.forEach(restaraunt => {
        fetch(`http://localhost:8080/${restaraunt}`)
          .then((response) => {
            return response.json()
          })
          .then((restaraunt) => {
            sidebar.innerHTML += `<p class="restaraunt" id="${restaraunt.id}"><a href="restaurant.html#${restaraunt.id}">${restaraunt.name}</a></p>`
          })
      })
    })
};

function populateRestaurantPage() {
  let path = window.location.href;
  let restaurantId = path.split('#')[1];
  let currentRestaurant = restaurantId + '.json';
  let sidebar = document.getElementById('sidebar');
  let greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  fetch(`http://localhost:8080/${currentRestaurant}`)
    .then((response) => {
      return response.json()
    })
    .then((thisJson) => {
      thisJson.notes = thisJson.notes.join('<br><br>');
      return thisJson
    })
    .then((thisJson) => {
      sidebar.innerHTML += `<br><div class="sidebar-title"><b>${thisJson.name}<b></div><br><br>${thisJson.phone}<br><br>${thisJson.address}<br><br>${thisJson.website}<br><br>${thisJson.notes}`;
      return thisJson
    })
    .then((thisJson) => {
      let myMap = L.map('map').setView([thisJson.lat, thisJson.long], 19);
      L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(myMap);
      L.marker([thisJson.lat, thisJson.long], { title: `${thisJson.name}`, icon: greenIcon }).addTo(myMap).bindPopup(thisJson.name + '<br>' + thisJson.address)
      return thisJson;
    })
}
