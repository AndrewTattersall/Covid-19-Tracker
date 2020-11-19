//function to get data from covid-19 api
const getData = async (country) => {

  //get data from API
  const covid = await fetch(`https://rapidapi.p.rapidapi.com/statistics?country=${country}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "e4001ca8damsh6b81beab8715d7bp17cb96jsn07848c66249e",
      "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
  })
  //convert data into json 
  const data = await covid.json();

  // organise data in an object
  const object = {
    date: data.response[0].day,
    country: data.response[0].country,
    population: data.response[0].population,
    continent: data.response[0].continent,
    cases: data.response[0].cases,
    deaths: data.response[0].deaths,
    tests: data.response[0].tests.total,
  }
  return object

}
