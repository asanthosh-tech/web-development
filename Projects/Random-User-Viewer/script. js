//accessing elements
const getbtn = document.getElementById("getbtn")
const status = document.getElementById("status")
const table = document.getElementById("con")
const name = document.getElementById("name")
const email = document.getElementById("email")
const country = document.getElementById("country")
const gender = document.getElementById("gender")
const age = document.getElementById("age")
const photo = document.getElementById("photo")

table.style.display = "none"

//show data function
function showdata(user) {
  let {
    first,
    last
  } = user.name
  name.textContent = `${first} ${last}`
  country.textContent = user.location.country
  email.textContent = user.email
  age.textContent = user.dob.age
  gender.textContent = user.gender
  photo.src = user.picture.large
}

//fetch user function
async function getuser() {
  status.textContent = "loading..."
  try {
    let response = await fetch("https://randomuser.me/api/")
    let data = await response.json()
    table.style.display = "block"
    status.textContent = "User Data Found"
    let info = data.results[0]
    showdata(info)
  }
  catch(error) {
    table.style.display = "none"
    status.innerHTML = `<b>🌐 ERROR:</b> ${error}`
  }
}

//getuser button functionality
getbtn.addEventListener("click", getuser);