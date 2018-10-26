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
    iconUrl: 'marker-icon-2x-green.png',
    shadowUrl: 'marker-shadow.png',
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
      function phone() {
        if (thisJson.phone.slice(0,3).includes(802)) {
          return thisJson.phone;
        } else return '802' + thisJson.phone;
      }
      sidebar.innerHTML += `<br><div class="sidebar-title"><a href="${thisJson.website}">${thisJson.name}</a></div><ul><li>${marked(thisJson.notes)}</li><li><a href="tel:${phone()}">${thisJson.phone}</a></li><li><a href="https://www.google.com/maps/dir/182+Main+St,+Burlington,+VT/${thisJson.name.split(' ').join('+')}">${thisJson.address}</a></li></ul>`;
      return thisJson
    })
    .then((thisJson) => {
      let myMap = L.map('single-map').setView([thisJson.lat, thisJson.long], 18);
      L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(myMap);
      L.marker([thisJson.lat, thisJson.long], { title: `${thisJson.name}`, icon: greenIcon }).addTo(myMap).bindPopup(thisJson.name + '<br>' + thisJson.address)
      return thisJson;
    })

  fetch(`http://localhost:8080/comments.json`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      document.getElementById('comment-list').innerHTML = '';
        console.log(myJson[restaurantId]);
        for (let property of myJson[restaurantId]) {
        document.getElementById('comment-list').innerHTML += `<div class="comment-email">A comment from <a href="mailto:BurlingtonCodeAcademy@example.com">${property.email}</a>:</div><div class="comment-title">${property.name}</div><div class="comment-body">${property.body}<br><div class="line">&nbsp;</div></div>`;
      }
    });
}
