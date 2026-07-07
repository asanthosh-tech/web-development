//accessing elements
const studentname = document.getElementById("studentname");
const rollnumber = document.getElementById("rollnumber");
const cgpa = document.getElementById("cgpa");
const department = document.getElementById("department");
const addbtn = document.getElementById("addbtn");
const updatebtn = document.getElementById("updatebtn");
const cards = document.getElementById("student-cards");
const form1 = document.getElementById("form1");
const totalcount = document.getElementById("totalcount");
const passedcount = document.getElementById("passedcount");
const failedcount = document.getElementById("failedcount");
const avgcgpa = document.getElementById("avgcgpa");
const tablebody = document.getElementById("tablebody");
const topstudents = document.getElementById("topstudents");
const searchtable = document.getElementById("searchtable");
const searchname = document.getElementById("searchname");


let editindex=-1;
let students = JSON.parse(localStorage.getItem("students")) || []
updatebtn.style.display = "none"

//functions of  students
function savestudents() {
  localStorage.setItem("students", JSON.stringify(students));
}
function addstudents() {
  updatebtn.style.display = "none"
  addbtn.style.display = "block"
  const result = document.querySelector('input[name="result"]:checked');
  let duplicate = false;
  for (let i = 0; i < students.length; i++) {
    if (students[i].rollnumber === rollnumber.value) {
      duplicate = true;
      break;
    }
  }
  if (duplicate) {
    alert("Rollnumber already exist")
  } else {
    if (Number(cgpa.value) >= 0 && Number(cgpa.value) <= 10) {
      if (studentname.value.trim() && rollnumber.value.trim() && department.value && cgpa.value.trim() && result) {
        let student = {
          name: studentname.value.trim(),
          rollnumber: rollnumber.value.trim(),
          department: department.value,
          cgpa: cgpa.value.trim(),
          result: result.value
        };
        students.push(student);
        refreshed();
        alert("Student registered")
        form1.reset();
      } else {
        alert("Enter all details correctly")}
    } else {
      alert("CGPA exceeds 10.0")
    }
  }
}
function resultcolor(result) {
  if (result.toLowerCase() === "fail") {
    return "red"
  } else {
    return "green"
  }
}
function displaystudents(data) {
  cards.innerHTML = ""
  data.forEach((i, index) => {
    let {
      name, rollnumber, department, cgpa, result
    } = i
    cards.innerHTML +=
    `
    <div  class="w-56 h-80 md:w-56 md:h-80 p-2 border-2 border-black rounded-sm overflow-auto shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-center flex flex-col justify-center items-center">
    <div class=" rounded-full overflow-hidden">
    <img src="sandy.jpg" class="w-full h-full object-cover">
    </div>
    <h3 class="font-bold text-lg">${name}</h3>
    <p class="font-mono">
    ${rollnumber}
    </p>
    <p class="font-mono">
    ${department}
    </p>
    <p class="font-mono">
    ${cgpa}
    </p>
    <p class="font-mono px-3 bg-${resultcolor(result)}-400 rounded border border-black">
    ${result}
    </p>
    <a href="#form" class="bg-yellow-400 border-2 border-black mt-1 w-full rounded-md" onclick="editstudent(${index})">
    ✏️ Edit
    </a>
    <button class="bg-red-400 border-2 border-black mt-1  w-full rounded-md" onclick="deleteone(${index})">
    🗑️ Delete
    </button>
    </div>
    `
  })
}
function displaytoppers() {
  let toppers = students.filter(i => Number(i.cgpa > 9.0))
  console.log(toppers)
  topstudents.innerHTML = ""
  toppers.forEach((i, index) => {
    let {
      name, rollnumber, department, cgpa, result
    } = i
    topstudents.innerHTML +=
    `
    <div  class="w-56 h-80 md:w-56 md:h-80 p-2 border-2 border-black rounded-sm overflow-auto shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-center flex flex-col justify-center items-center bg-blue-300">
    <div class="w-18 h-18 rounded-full border-4 border-black overflow-hidden">
    <img src="sandy.jpg" class="w-full h-full object-cover">
    </div>
    <h3 class="font-bold text-lg">${name}</h3>
    <p class="font-mono">
    ${rollnumber}
    </p>
    <p class="font-mono">
    ${department}
    </p>
    <p class="font-mono">
    ${cgpa}
    </p>
    <p class="font-mono px-3 bg-${resultcolor(result)}-400 rounded border border-black">
    ${result}
    </p>
    <a href="#form" class="bg-yellow-400 border-2 border-black mt-1 w-full rounded-md" onclick="editstudent(${index})">
    ✏️ Edit
    </a>
    <button class="bg-red-400 border-2 border-black mt-1  w-full rounded-md" onclick="deleteone(${index})">
    🗑️ Delete
    </button>
    </div>
    `
  })
}
function editstudent(index) {
  editindex = index
  addbtn.style.display = "none"
  updatebtn.style.display = "block"
  studentname.value = students[index].name
  rollnumber.value = students[index].rollnumber
  cgpa.value = students[index].cgpa
  department.value = students[index].department
  if (students[index].result.toLowerCase() === "pass") {
    document.getElementById("pass").checked = true
  } else {
    document.getElementById("fail").checked = true
  }
}
function deleteone(index) {
  students.splice(index, 1);
  refreshed()
}
function updateEditedStudents() {
  const result = document.querySelector('input[name="result"]:checked');
  let duplicate = false;
  for (let i = 0; i < students.length; i++) {
    if (students[i].rollnumber === rollnumber.value && i !== editindex) {
      duplicate = true;
      break;
    }
  }
  if (duplicate) {
    alert("Rollnumber already exist")
  } else {
    if (Number(cgpa.value) >= 0 && Number(cgpa.value) <= 10) {
      if (studentname.value.trim() && rollnumber.value.trim() && department.value && cgpa.value.trim() && result) {
        students[editindex] = {
          name: studentname.value.trim(),
          rollnumber: rollnumber.value.trim(),
          department: department.value,
          cgpa: cgpa.value.trim(),
          result: result.value
        };
        refreshed()
        alert("Student updated")
        form1.reset();
        updatebtn.style.display = "none"
        addbtn.style.display = "block"
        editindex=-1
      } else {
        alert("Enter all details")}
    } else {
      alert("CGPA exceeds 10.0")}
  }
}
function displayStatistics() {
  if (students.length === 0) {
    totalcount.textContent = 0;
    passedcount.textContent = 0;
    failedcount.textContent = 0;
    avgcgpa.textContent = "0.0";
    return;
  } else {
    let totalcgpa = 0.0;
    for (let i = 0; i < students.length; i++) {
      totalcgpa += Number(students[i].cgpa);
    }
    avgcgpa.textContent = (totalcgpa/students.length).toFixed(2)
    let passed = students.filter(i => i.result.trim().toLowerCase() === "pass")
    totalcount.textContent = students.length;
    passedcount.textContent = passed.length;
    failedcount.textContent = students.length-passed.length;
  }
}
function displaytable() {
  tablebody.innerHTML = ""
  students.forEach((i, index)=> {
    let {
      name, rollnumber, department, cgpa, result
    } = i
    tablebody.innerHTML += `
    <tr class="p-1 border">
    <td class="px-2 py-1 border">${rollnumber}</td>
    <td class="px-2 py-1 border">${name}</td>
    <td class="px-2 py-1 border">${department}</td>
    <td class="px-2 py-1 border">${cgpa}</td>
    <td class="px-2 py-1 border">
    <p class="font-mono px-3 bg-${resultcolor(result)}-400 rounded border border-black">
    ${result}
    </p>
    </td>
    <td class="px-2 py-1 border">
    <a href="#form" class="block bg-yellow-400 border-2 border-black mt-1 w-full rounded-md" onclick="editstudent(${index})">
    ✏️
    </a>
    <button class="bg-red-400 border-2 border-black mt-1  w-full rounded-md" onclick="deleteone(${index})">
    🗑
    </button>
    </td>
    </tr>
    `
  })
}
function displaysearchtable() {
  console.log("searching")
  let searchedArray = students.filter(i => i.name.toLowerCase().includes(searchname.value.toLowerCase()) || i.rollnumber.includes(searchname.value.toLowerCase()))
  console.log(searchedArray)
  searchtable.innerHTML = ""
  searchedArray.forEach((i, index)=> {
    let {
      name, rollnumber, department, cgpa, result
    } = i
    searchtable.innerHTML += `
    <tr class="p-1 border">
    <td class="px-2 py-1 border">${rollnumber}</td>
    <td class="px-2 py-1 border">${name}</td>
    <td class="px-2 py-1 border">${department}</td>
    <td class="px-2 py-1 border">${cgpa}</td>
    <td class="px-2 py-1 border">
    <p class="font-mono px-3 bg-${resultcolor(result)}-400 rounded border border-black">
    ${result}
    </p>
    </td>
    <td class="px-2 py-1 border">
    <a href="#form" class="block bg-yellow-400 border-2 border-black mt-1 w-full rounded-md" onclick="editstudent(${index})">
    ✏️
    </a>
    <button class="bg-red-400 border-2 border-black mt-1  w-full rounded-md" onclick="deleteone(${index})">
    🗑
    </button>
    </td>
    </tr>
    `
  })
}
function refreshed() {
  savestudents()
  displaystudents(students)
  displayStatistics()
  displaytable();
  displaytoppers();
}

refreshed()

addbtn.addEventListener("click", addstudents);
updatebtn.addEventListener("click", updateEditedStudents);
searchname.addEventListener("input", displaysearchtable);