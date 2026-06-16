//accessing elements
const cityinput = document.getElementById("cityinput")
const searchbtn = document.getElementById("searchbtn")
const status = document.getElementById("status")
const result = document.getElementById("result")

//display elements
const cityname = document.getElementById("cityname")
const temp = document.getElementById("temp")
const humidity = document.getElementById("humidity")
const climate = document.getElementById("climate")

//show weather info function
function weatherinfo(condition, area) {
  result.style.display = "block"
  //cityname
  cityname.innerHTML = `<b>City: </b>${area.areaName[0].value}, ${area.region[0].value}, ${area.country[0].value}`

  //temperature
  temp.innerHTML = `<b>Temperature: </b>${condition.temp_C}°C`

  //humidity
  humidity.innerHTML = `<b>Humidity: </b>${condition.humidity}%`

  //climate & icon
  climate.innerHTML = `<b>Climate: </b>
  ${condition.weatherDesc[0].value}<br><br> <img
  src="${condition.weatherIconUrl[0].value}" alt="weather logo">`
}

result.style.display = "none"

//get weather function
async function getweather() {
  if (cityinput.value.trim()) {
    status.style.display = "block"
    status.textContent = "Fetching info..."
    try {
      //fetching data
      let url = `https://wttr.in/${cityinput.value}?format=j1`
      let response = await fetch(url)
      let data = await response.json()

      //accessing data
      let condition = data.current_condition[0]
      let area = data.nearest_area[0]

      //calling display function
      weatherinfo(condition, area)

      status.style.display = "none"
      cityinput.value = ""
    }
    catch(error) {
      status.innerHTML = `<b>Fetching Failed</b> ${error}`
      result.style.display = "none"
    }
  } else {
    status.textContent = "Enter the valid city name"
  }
}

//get weather btn functionality
searchbtn.addEventListener("click", getweather)