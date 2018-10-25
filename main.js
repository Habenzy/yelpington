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
  fetch(`http://localhost:8080/${currentRestaurant}`)
  .then((response) => {
    return response.json()
  })
  .then((thisJson) => {
    sidebar.innerHTML += `<br><div class="sidebar-title"><b>${thisJson.name}<b></div><br><br>${thisJson.phone}<br><br>${thisJson.address}<br><br>${thisJson.email}<br><br>${thisJson.notes}`;
    return thisJson
  })
  
}