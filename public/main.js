// Foursquare API Info
const clientId = "GUDFTK3GSUKR0UAI4ADEWL35T1WX40G0FNH0FAUX4QH3X5GC";
const clientSecret = "RWYTIOQJHTBVQYSF1S1AGZIZWNJ5RREKN4BJIQPOW0S0FEHM";
const apiKeyFS = "fsq3ezjD/MS2EfCH7npT8Roe5gRcsL/RMHexXlsYGeDq20A=";
const url = "https://api.foursquare.com/v3/places/search?";

// OpenWeather Info
const openWeatherKey = "88c5fefa9d8ed0c0b220a40126fb6342";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

// Add AJAX functions here:
const getVenues = async() => {
    const city = $input.val();
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `${apiKeyFS}`,
        },
    };
    const urlToFetch = `${url}near=${city}&limit=10`;
    try {
        const response = await fetch(urlToFetch, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            const results = jsonResponse.results;
            const placesArray = [];
            results.forEach((place) => {
                const totalPlace = {
                    name: place.name,
                    address: place.location.address,
                };
                placesArray.push(totalPlace);
            });
            console.log(placesArray);
            return placesArray;
        }
    } catch (error) {
        console.log(error);
    }
};

const getForecast = async() => {
    const q = $input.val();
    const urlToFetch = `${weatherUrl}?q=${q}&APPID=${openWeatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
};

// Render functions
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        // Add your code here:
        const place = venues[index];
        const placeName = place.name;
        const placeLocation = place.address;
        createVenueHTML;
        let venueContent = createVenueHTML(place);
        console.log(venueContent);
        $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
    // Add your code here:

    let weatherContent = "";
    $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
    $venueDivs.forEach((venue) => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues().then((venues) => {
        return renderVenues(venues);
    });
    getForecast();
    return false;
};

$submit.click(executeSearch);