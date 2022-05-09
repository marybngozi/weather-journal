/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "<add_api_key>&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/* Function to GET Web API Data*/
const getWebData = async (zipCode) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

/* Function to POST data */
const postWeatherData = async (data) => {
  const response = await fetch("/add", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.querySelector("#temp").innerHTML = Math.round(allData.temp) + "°";
    document.querySelector("#content").innerHTML = allData.content;
    document.querySelector("#date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function called by event listener */
const eventHandler = async () => {
  const zipCode = document.querySelector("#zip").value.trim();
  const content = document.querySelector("#feelings").value.trim();

  // make sure the zip code is not empty
  if (!zipCode) {
    alert("No Zip Code provided!");
    return;
  }

  // make sure the content is not empty
  if (!content) {
    alert("Please tell me how you are feeling");
    return;
  }

  // call the get web weather api function
  const webData = await getWebData(zipCode);

  // build the post data
  const userData = {
    temp: webData.main.temp,
    date: newDate,
    content: content,
  };

  // call the post data function
  await postWeatherData(userData);

  // update the UI
  await retrieveData();
};

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", eventHandler);
