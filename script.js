// # EXERCISE ex-js-promise-combinators-dashboard

async function getDashboardData(city) {
  try {
    const destinationPromise = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${city}`
    ).then((res) => res.json());

    const weatherPromise = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${city}`
    ).then((res) => res.json());

    const mainAirportPromise = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${city}`
    ).then((res) => res.json());

    const [destinationResponse, weatherResponse, mainAirportResponse] =
      await Promise.allSettled([
        destinationPromise,
        weatherPromise,
        mainAirportPromise,
      ]);

    /* console.log("destinationResponse", destinationResponse);
    console.log("weatherResponse", weatherResponse);
    console.log("mainAirportResponse", mainAirportResponse); */

    const destination = destinationResponse.value;
    const weather = weatherResponse.value;
    const mainAirport = mainAirportResponse.value;

    if (destinationResponse.status !== `fulfilled`) {
      console.error(
        "Errore nella chiamata per la destinazione, ",
        destinationResponse.reason
      );
    }
    if (weatherResponse.status !== `fulfilled`) {
      console.error(
        "Errore nella chiamata per il meteo, ",
        weatherResponse.reason
      );
    }
    if (mainAirportResponse.status !== `fulfilled`) {
      console.error(
        "Errore nella chiamata per dell'aereoporto, ",
        mainAirportResponse.reason
      );
    }

    const isValidDestination =
      destinationResponse.status === `fulfilled` && destination.length > 0;
    const isValidWeather =
      weatherResponse.status === `fulfilled` && weather.length > 0;
    const isValidAirport =
      mainAirportResponse.status === `fulfilled` && mainAirport.length > 0;

    return {
      city: isValidDestination ? destination[0].name : null,
      country: isValidDestination ? destination[0].country : null,
      temperature: isValidWeather ? weather[0].temperature : null,
      weather: isValidWeather ? weather[0].weather_description : null,
      airport: isValidAirport ? mainAirport[0].name : null,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

getDashboardData("london")
  .then((data) => {
    console.log("Dasboard data:", data);
    let finalPhrase = "";
    if (data.city && data.country) {
      finalPhrase += `${data.city} is in ${data.country}.\n`;
    }
    if (data.weather && data.temperature) {
      finalPhrase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
    }
    if (data.airport) {
      finalPhrase += `The main airport is ${data.airport}.\n`;
    }
    finalPhrase.length > 0 ? console.log(finalPhrase) : null;
  })
  .catch((error) => console.error(error))
  .finally(() => console.log("Fine codice!"));

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
