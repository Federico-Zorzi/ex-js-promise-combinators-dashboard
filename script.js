// # EXERCISE ex-js-promise-combinators-dashboard

async function getDashboardData(city) {
  try {
    const responseDestination = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${city}`
    ).then((res) => res.json());

    const responseWeather = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${city}`
    ).then((res) => res.json());

    const responseMainAirport = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${city}`
    ).then((res) => res.json());

    const [destination, weather, mainAirport] = await Promise.all([
      responseDestination,
      responseWeather,
      responseMainAirport,
    ]);
    /* console.log("destination", destination);
    console.log("weather", weather);
    console.log("mainAirport", mainAirport); */

    return {
      city: destination[0]?.name ?? null,
      country: destination[0]?.country ?? null,
      temperature: weather[0]?.temperature ?? null,
      weather: weather[0]?.weather_description ?? null,
      airport: mainAirport[0]?.name ?? null,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

getDashboardData("vienna")
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
