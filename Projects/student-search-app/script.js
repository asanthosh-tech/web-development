//accessing elements
const name = document.getElementById("name")
const addbtn = document.getElementById("addbtn")
const searchname = document.getElementById("searchname")
const searchbtn = document.getElementById("searchbtn")
const allbtn = document.getElementById("allbtn")
const passcount = document.getElementById("passcount")
const count = document.getElementById("count")
const list = document.getElementById("list")
const result = document.getElementById("result")

//array for students
let students = []

// fucntions
function add() {
  //  console.log("hello")
  if (name.value) {
    let rand = 20+(100-20)*Math.random()
    let std = {
      name: name.value,
      marks: Math.ceil(rand)
    }
    students.push(std)
    count.textContent = `Total Students:${students.length}`
    name.value = ""
  }
}
function search() {
  let found = students.find(i => i.name === searchname.value)
  if (searchname.value) {
    if (found) {
      result.textContent = `Search Result: ${found.name}-${found.marks}`
    } else {
      result.textContent = `Not Found`
    }
  }
}
function all() {
  list.innerHTML = ""
  let allstds = students.map(i => {
    return `<br>${i.name}-${i.marks}<br>`
  }).join(" ");
  list.innerHTML = `<b>All students:</b> ${students.length}<br> ${allstds}`
}
function pass() {
  passcount.style.display = "block"
  let passed = students.filter(i => i.marks >= 35)
  passcount.innerHTML = `Passed students:${passed.length}`

  //showing passed stds
  list.innerHTML = `<b>Passed Students:</b>${passed.length}`
  passed.forEach(i => {
    console.log("pass")
    let li = document.createElement("li")
    li.textContent = `${i.name}-${i.marks}`
    list.appendChild(li)
  })
}

//button functionalities
addbtn.addEventListener("click", add);
searchbtn.addEventListener("click", search)
allbtn.addEventListener("click", all)
passbtn.addEventListener("click", pass)


passcount.style.fontWeight = "bold"
passcount.style.display = "none"