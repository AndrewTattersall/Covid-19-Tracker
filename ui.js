const form = document.querySelector('.change-location');
const input = document.querySelector('.input');
const details = document.querySelector('.details');
const newcases = document.querySelector('.new-cases');
const totalcases = document.querySelector('.total-cases');
const totaltests = document.querySelector('.total-tests');
const newdeaths = document.querySelector('.new-deaths');
const totaldeaths = document.querySelector('.total-deaths');
const casesper1mill = document.querySelector('.cases-1mill');
const display = document.querySelector('.display');
const label = document.querySelector('.label');
const info = document.querySelector('.info');

//function to update UI
const updateUI = (data) => {

  // dynamically add data from API to the cards

  newcases.innerHTML = ` 
  <h3 class="card-title"> ${data.cases.new}</h3>
`
  totalcases.innerHTML = ` 
  <h3 class="card-title">${data.cases.total}</h3>
`
  totaltests.innerHTML = ` 
  <h3 class="card-title">${data.tests}</h3>
`
  newdeaths.innerHTML = ` 
  <h3 class="card-title">${data.deaths.new}</h3>
`
  totaldeaths.innerHTML = ` 
  <h3 class="card-title">${data.deaths.total}</h3>
`
  casesper1mill.innerHTML = ` 
  <h3 class="card-title">${data.cases["1M_pop"]}</h3>
`
  //if there is population data, show the population of the country and data
  if (data.population) {
    info.innerHTML = `
  <p class="label info text-center mb-4 mt-1">${data.country}, population of ${data.population}. All Data live as of ${data.date}.</p>
  `;
  } else {
    info.innerHTML = '';
  }

  // remove the d-none class if present
  if (display.classList.contains('d-none')) {
    display.classList.remove('d-none');
  }
  //scroll down page to display results
  window.scrollTo(0, 1000);

};

//event listener on form submit
form.addEventListener('submit', (e) => {
  e.preventDefault()
  //grab value of the form input
  const value = input.value;

  //when submitted call getData from app.js with the form input value as argument
  getData(value)
    .then(data => updateUI(data))
    //also add new sentence if successful
    .then(data => label.innerHTML = `
    <label for="city" class="label col-form-label col-form-label-md mb-0 mt-0">Enter another country or use 'all' for the world statistics</label>
    `)
    //if unsuccessful add line asking to input correct country
    .catch(err =>
      label.innerHTML = `
    <label for="city" class="label col-form-label col-form-label-md mb-2">Please enter a correct country in the input</label>
    `);
  //reset the input
  input.value = '';
}) 