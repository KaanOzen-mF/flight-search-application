function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(startDate, endDate) {
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

function getRandomTime() {
  let hour = getRandomInt(0, 23);
  let minutes = getRandomInt(0, 59);
  return `${hour.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function getRandomFlightDuration() {
  let hours = getRandomInt(1, 12); // Assuming flight time could be between 1 to 12 hours
  let minutes = getRandomInt(0, 59);
  return `${hours}hr ${minutes}m`;
}

function generateRandomFlightData(countries) {
  let data = [];
  let startDate = new Date("Dec 30, 2023");
  let endDate = new Date("Jan 5, 2024");

  for (let i = 0; i < 100; i++) {
    let countryIndex = getRandomInt(0, countries.length - 1);
    let arrivalCountryIndex = getRandomInt(0, countries.length - 1);

    // Ensure that the country and arrivalCountry are not the same
    while (countryIndex === arrivalCountryIndex) {
      arrivalCountryIndex = getRandomInt(0, countries.length - 1);
    }

    let flight = {
      country: countries[countryIndex],
      arrivalDate: getRandomDate(startDate, endDate).toLocaleDateString(
        "en-US"
      ),
      departureDate: getRandomDate(startDate, endDate).toLocaleDateString(
        "en-US"
      ),
      oneWay: Math.random() < 0.5, // Randomly determine if the flight is one-way
      arrivalTime: getRandomTime(),
      departureTime: getRandomTime(),
      flightTime: getRandomFlightDuration(),
      price: (getRandomInt(100, 1000) + Math.random()).toFixed(2),
      arrivalCountry: countries[arrivalCountryIndex],
      id: (i + 1).toString(),
    };

    data.push(flight);
  }

  return data;
}

const countries = [
  "United States (ATL)",
  "China (PKX)",
  "Japan (NRT)",
  "Germany (FRA)",
  "United Kingdom(LHR)",
];
const randomFlightData = generateRandomFlightData(countries);

console.log(JSON.stringify(randomFlightData));
