//accessing elements
const name = document.getElementById("name")
const addbtn = document.getElementById("addbtn")
const passbtn = document.getElementById("passbtn")
const count = document.getElementById("count")
const list = document.getElementById("list")

//student Array
let students = []

//passed stds function
function pass() {

  //new array for passed stds
  let passed = students.filter(i => i.stdmarks > 35)
  para.innerHTML = passed.map(i => {
    return i.stdname+"-"+i.stdmarks+"<br>"
  }).join(" ")

  //passed Students count
  pstd.innerHTML = "Passed Students:"+passed.length
}

//add button functionality
addbtn.addEventListener("click", ()=> {
  if (name.value) {
    let rand = 20+(100-20)*Math.random()
    let stdobj = {
      stdname: name.value,
      stdmarks: Math.ceil(rand)
    }
    students.push(stdobj)
    let li = document.createElement("li")
    li.textContent = stdobj.stdname+"-"+stdobj.stdmarks
    list.appendChild(li)
    count.textContent = "Total Students:"+students.length;
    name.value = "";
  }
});

// h4,para for Passed students
let pstd = document.createElement("h4")
let para = document.createElement("p")
pstd.textContent = "Passed students"
document.body.appendChild(pstd)
document.body.appendChild(para)


//passed btn functionality
passbtn.addEventListener("click",pass);

// Remove button
let rbtn = document.createElement("button")
rbtn.textContent = "Remove"
document.body.appendChild(rbtn)

//remove button functionality
rbtn.addEventListener("click", ()=> {
  students.pop()
  let lastli = list.lastElementChild
  list.removeChild(lastli)
  count.textContent = "Total Students:"+students.length
  pass()
})