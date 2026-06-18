//accessing elements
const studentname = document.getElementById("studentname")
const addbtn = document.getElementById("addbtn")
const count = document.getElementById("count")
const clearbtn = document.getElementById("clearbtn")
const removebtn = document.getElementById("removebtn")
const list = document.getElementById("list")

//accessing initial array
let students = JSON.parse(localStorage.getItem("students")) || []

//functions
function displayStudents() {
  count.textContent = `Total Students:${students.length}`
  list.textContent = ""
  students.forEach(i => {
    let li = document.createElement("li");
    li.textContent = i;
    list.appendChild(li);
  })
}
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}
function add() {
  if (studentname.value.trim()) {
    students.push(studentname.value)
    studentname.value = ""
    saveStudents()
  }
  displayStudents()
}
function remove() {
  if (students.length) {
    students.pop();
  }
  saveStudents()
  displayStudents()
}
function clear() {
  if (students.length) {
    if (confirm("Are you sure? Clear all files?")) {
      students = []
    }}
  saveStudents()
  displayStudents()
}

displayStudents()

// btn functionalities
addbtn.addEventListener("click", add);
studentname.addEventListener("keypress", add);
removebtn.addEventListener("click", remove);
clearbtn.addEventListener("click", clear);