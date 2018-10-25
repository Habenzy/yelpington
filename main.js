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
            sidebar.innerHTML += `<p class="restaraunt" id="${restaraunt.id}"><a href="restaurant.html#${restaraunt.name.split(' ').join('+')}">${restaraunt.name}</a></p>`
          })
      })
    })
};