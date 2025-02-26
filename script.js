// # EXERCISE ex-js-promise-combinators-dashboard

async function getDashboardData(city) {
  const responseDestination = fetch(
    `https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${city}`
  )
    .then((res) => res.json())
    .catch(() => null);

  const responseWeather = fetch(
    `https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${city}`
  )
    .then((res) => res.json())
    .catch(() => null);

  const responseMainAirport = fetch(
    `https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${city}`
  )
    .then((res) => res.json())
    .catch(() => null);

  const [destination, weather, mainAirport] = await Promise.all([
    responseDestination,
    responseWeather,
    responseMainAirport,
  ]);
  /* console.log("destination", destination);
    console.log("weather", weather);
    console.log("mainAirport", mainAirport); */

  return {
    city: destination[0].name,
    country: destination[0].country,
    temperature: weather[0].temperature,
    weather: weather[0].weather_description,
    airport: mainAirport[0].name,
  };
}

getDashboardData("london")
  .then((data) => {
    console.log("Dasboard data:", data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
        `The main airport is ${data.airport}.\n`
    );
  })
  .catch((error) => console.error(error));

/* 
   Risposta API
  {
    city: "London",
    country: "United Kingdom",
    temperature: 18,
    weather: "Partly cloudy",
    airport: "London Heathrow Airport"
  }

   Output in console
  London is in United Kingdom. 
  Today there are 18 degrees and the weather is Partly cloudy.
  The main airport is London Heathrow Airport.
  */
