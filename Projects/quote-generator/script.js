//accessing elements
const getQuoteBtn = document.getElementById("getQuoteBtn")
const status = document.getElementById("status")

status.style.display = "none"

//funtion getquote
async function getquote() {
  status.style.display = "block"
  try {
    let response = await fetch('https://dummyjson.com/quotes')
    let data = await response.json()
    let rindex = Math.floor(0+(data.quotes.length-0)*Math.random())
    const info = data.quotes[rindex]
    displayquote(info)
  }
  catch(error) {
    status.innerHTML = `<B>Error:</B> ${error}`
  }
}

//display quote
function displayquote(info) {
  status.innerHTML = `<p>${info.quote}</p><h5>-${info.author}</h5>`
}

getQuoteBtn.addEventListener("click", getquote)