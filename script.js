const text_input = document.getElementById("search-bar");
const submit_btn = document.getElementById("submit-btn");
const form = document.querySelector("form");
const error = document.getElementById("error");

const loc = document.getElementById("location");
const description = document.getElementById("desc");
const temperature = document.getElementById("temperature");
const feels_like = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");

form.addEventListener("submit", submitForm);
submit_btn.addEventListener("submit", submitForm);

//use chicago as stoarting location
fetchWeather("Chicago");

function submitForm(e){
    //prevent refreshing of page
    e.preventDefault();
    fetchWeather(text_input.value);
}
async function fetchWeather(location){

    error.classList.remove("show");

const data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
    {
      mode: "cors",
    }
  );
  //check if fetch worked
  if(data.status === 400){
      //alert error
      handleError();
      form.reset();
      return;
  }
  //process data
  updateDisplay(await data.json());
  //reset form
  form.reset();
}

function processData(data){
    let region;
    //handle location, incase location is US
    if(data.location.country === "United States of America"){
        region = data.location.region;
    } else{
        region = data.location.country;
    }

    return {
        description: data.current.condition.text,

        temperature: data.current.temp_f,

        feels_like: data.current.feelslike_f,

        humidity: data.current.humidity,

        region: region,

        city: data.location.name, 
    }
}

function updateDisplay(data){
    const processedData = processData(data)

    description.textContent = processedData.description;

    loc.textContent = processedData.city + ", " + processedData.region;

    temperature.textContent = processedData.temperature;

    feels_like.textContent = "Feels Like: " + processedData.feels_like;

    humidity.textContent = "Humidity: " + processedData.humidity + "%";
}

function handleError(){
    error.classList.toggle("show");
}