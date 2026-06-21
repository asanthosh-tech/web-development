//accessing elements
const task = document.getElementById("task")
const addbtn = document.getElementById("addbtn")
const delbtn = document.getElementById("delbtn")
const count = document.getElementById("count")
const list = document.getElementById("list")

//initializing array
let tasks = JSON.parse(localStorage.getItem("tasks")) || []
count.style.display="none"

//function
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
function displayTasks(){
count.style.display="block"
  list.innerHTML="";
  tasks.forEach((i,index)=>{
    let li=document.createElement("li");
    li.innerHTML=`<b>${index+1}<b> ${i.task} <button class="sdelbtn" onclick="del1(${index})">Delete</button>
    `;
    list.appendChild(li);
  })
  count.textContent=`Total Tasks:${tasks.length}`
}
function add() {
  if (task.value.trim()) {
    let taskinfo = {
      task: task.value,
      completed: false
    }
    tasks.push(taskinfo)
    saveTasks()
    task.value = ""
  }
  displayTasks()
}
function deltask(){
  if(tasks.length){
  tasks.pop()
  saveTasks()
  displayTasks()
}
}
function del1(index){
  tasks.splice(index,1)
  saveTasks()
  displayTasks()
}

displayTasks()

//button fucntionalities
addbtn.addEventListener("click", add)
delbtn.addEventListener("click", deltask)
task.addEventListener("keypress", add)