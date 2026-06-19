//accessing elements
const name = document.getElementById("name")
const addbtn = document.getElementById("addbtn")
const removebtn = document.getElementById("removebtn")
const searchname = document.getElementById("searchname")
const searchbtn = document.getElementById("searchbtn")
const allbtn = document.getElementById("allbtn")
const count = document.getElementById("count")
const list = document.getElementById("list")
const result = document.getElementById("result")

//array for students
let students = JSON.parse(localStorage.getItem("students")) || []

result.style.display = "none"
count.style.display = "none"

// fucntions
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}
function displayStudents(stdarr) {
  list.innerHTML = ""
  stdarr.forEach(i => {
    let li = document.createElement("li")
    let {
      name, marks
    } = i
    li.textContent = `${name}-${marks}`
    list.appendChild(li)
  })
}
function add() {
  if (name.value.trim()) {
    const rand = 20+(100-20)*Math.random()
    let std = {
      name: name.value,
      marks: Math.ceil(rand)
    }
    students.push(std);
    saveStudents();
    name.value = ""
  }
}
function all() {
  count.style.display = "block"
  displayStudents(students)
  count.textContent = `Total Students:${students.length}`
}
function search() {
  list.innerHTML=""
  let students = JSON.parse(localStorage.getItem("students"))
  let found = students.find(i => i.name === searchname.value)
  if (searchname.value.trim()) {
    if (found) {
      result.style.display = "block"
      result.textContent = `Search Result: ${found.name}-${found.marks}`
      searchname.value=""
    } else {
      result.textContent = `Not Found`
    }
  }
}
function pass() {
  let passed = students.filter(i => i.marks >= 35)
  count.innerHTML = `Passed students:${passed.length}`
  displayStudents(passed)
}
function remove() {
  if (students.length) {
    students.pop();
    saveStudents();
    displayStudents(students)
    count.textContent = `Total Students:${students.length}`
  }
}
/*
*/

//button functionalities
searchbtn.addEventListener("click", search)
passbtn.addEventListener("click", pass)
allbtn.addEventListener("click", all)
addbtn.addEventListener("click", add);
name.addEventListener("keypress", add);
removebtn.addEventListener("click", remove);