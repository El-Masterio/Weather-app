/*
1- connect the api and check if its working ✔
2- display raw data in the browser ✔
3- after displaying orignaize the data to be displayed and take only whats needed from the JSON ✔
4- display the icons of the weather in thier place ✔
5- display one card for the current day ✔ 
6- create a function to get date and format it ✔
7- after implementing the above display two more cards for future forecast ✔
7- check the search functionallity in the api and make it dynamic to the user input ( q = land ) try to implement the Geolocation APi with it ✔
8- TODO: implement a find me option to locate the user and give weather forecast using lon and lat in the json file
and using the Geolocation API to get the location of the user 
*/

// GLOBAL VARIABLES:
const landInput = document.getElementById("land_input");
const locationFinderBtn = document.getElementById("location_finder");
const data = document.querySelector("#data");
const contentRow = document.getElementById("contentRow");
let display;
let content = "";

// step 1: connecting the api
async function GetData() {
  // we can change the number of days we want to fetch buy simply changing the days keyword
  const respone = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5471240e71a44277b48224842240601&q=${landInput.value}&days=3`
  );

  //   document.body.innerHTML = await respone.json();
  display = await respone.json();
  //   console.log(display);
  //   console.log(landInput.value);
  //   console.log(display.location.name);

  return display;
}

// step 2: display the data with event listner to the btn
locationFinderBtn.addEventListener("click", async function () {
  await GetData();
  create_card();
});

// step 3 and 4 and 5: after fetching the data i made a design in javascript sort of a card get created with all the details of the weather
const create_card = function () {
  for (let i = 0; i < 3; i++) {
    content += `  <div class="col-lg-4">
    <div class="weather-card  text-center text-light mt-5">
  <div class="date w-100 d-flex justify-content-between">
    <p>${get_day_name(display.forecast.forecastday[i].date, "en-US")}</p>
    <p>${display.forecast.forecastday[i].date.slice(-2)}. ${get_month_name(
      display.forecast.forecastday[i].date,
      "en-US"
    )}</p>
  </div>
  <div class="">
    <h3 class="location-name pt-2">${display.location.name}</h3>
    <h5 class="location-country pb-2">${display.location.country}</h5>

    <div
      class="dgree d-flex justify-content-center align-items-center gap-3"
    >
      <span class="average-dgree" id="average-temp"
        >${display.forecast.forecastday[i].day.avgtemp_c}<sup>o</sup>C</span
      >

      <img
        src="${display.forecast.forecastday[i].day.condition.icon}"
        alt=""
        class=""
      />
    </div>
    <div>
      <p class="text-primary">
        ${display.forecast.forecastday[i].day.condition.text}
      </p>
    </div>
    <div class="d-flex pt-4 justify-content-between">
      <span class="h5" id="min-temp"
        >min ${display.forecast.forecastday[i].day.mintemp_c}
        <sup>o</sup>C</span
      >
      <span class="h5" id="max-temp"
        >max ${display.forecast.forecastday[i].day.maxtemp_c}
        <sup>o</sup>C</span
      >
    </div>
  </div>
  <div class="condition">
    <div
      class="status d-flex gap-3 py-5 flex-wrap justify-content-center align-items-center"
    >
      <div>
      <img src="./images/icon-umberella.svg" alt="" />
      <p >
      ${display.forecast.forecastday[i].day.daily_chance_of_rain} %
    </p>
    </div>
 
    <div>
    <img src="./images/icon-wind.svg" alt="" />
    <p >
      ${display.forecast.forecastday[i].day.maxwind_kph} Km/h
    </p>
    </div>

    <div> 
    <img
    src="./images/drop-humidity-icon.svg"
    class="text-danger"
    alt=""/>
  <p >
    ${display.forecast.forecastday[i].day.avghumidity} %
  </p>
    </div>

    <div>
    <img src="./images/snow-icon.svg" alt="" />
    <p class="lastChild">
      ${display.forecast.forecastday[i].day.daily_chance_of_snow} %
    </p>
    </div> 
    </div>
  </div>
</div>
</div>`;
  }
  contentRow.innerHTML = content;
  content = "";
  console.log(content);
};
// step 6: here i passed the date from the data to get the name of the current day
const get_day_name = function (datestr, locale) {
  const date = new Date(datestr);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

// here is the same as above we just get the month name
const get_month_name = function (datestr, locale) {
  const date = new Date(datestr);
  return date.toLocaleDateString(locale, { month: "long" });
};
