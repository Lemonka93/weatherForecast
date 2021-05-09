window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let weatherIcon = document.querySelector("#weather-icon");
  let weatherDescription = document.querySelector(".weather-description");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=d15be0ea3376d9b437b022c6e229c119`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("data", data);
          const { temp, feels_like } = data.main;

          temperatureDegree.textContent = Math.round(temp);
          temperatureDescription.textContent =
            "Feels like: " + Math.round(feels_like) + " °C";
          locationTimezone.textContent = data.name;
          weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          weatherDescription.textContent = data.weather[0].description.toUpperCase();
        });

      // const response = await fetch(api);
      // const data = await response.json();
      // console.log(data);
    });
  }
});
