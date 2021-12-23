const createVenueHTML = (location) => {
    return `<h2>${location.name}</h2>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${$input.val()}</p>`;
};

const createWeatherHTML = (currentDay) => {
    console.log(currentDay);
    return `<h2>${weekDays[new Date().getDay()]}</h2>
          <h2>Temperature: ${kelvinToCelcius(currentDay.main.temp)}&deg;C</h2>
          <h2>Condition: ${currentDay.weather[0].description}</h2>
        <img src="https://openweathermap.org/img/wn/${
          currentDay.weather[0].icon
        }@2x.png">`;
};

const kelvinToCelcius = (k) => (k - 273.15).toFixed(0);