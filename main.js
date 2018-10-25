const allRestaraunts = []
const sidebar = document.getElementsByClassName('sidebar');

async function getRestarauntPages() {  
  fetch('http://localhost:8080/all.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(ids){
    ids.forEach(id => {
      allRestaraunts.push(id + '.json')
    });
  })
};


async function populateSidebar() {
  await getRestarauntPages();
  await allRestaraunts.forEach(restaraunt => {
    fetch(`http://localhost:8080${restaraunt}`)
    .then((response) => {
      console.log(response);
      sidebar.innerHTML += `${response.name}<br>${response.notes}`
    })
  })
}
window.onload = populateSidebar()