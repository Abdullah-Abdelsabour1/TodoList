let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//  Empty to store tasks 
let ArrayOfTaskes = [];

// Get Data From Local Storage 
// Check if there is Data in Local Storage
if (localStorage.task){
    ArrayOfTaskes = JSON.parse(localStorage.getItem("task"));
}

//  trigger Get data from local storage
getDataFromLocalStorage();


// Add task 
submit.onclick = function (){
    if (input.value !== ""){
        addTaskToArray(input.value); // Add task to Array of tasks
        addDataToLocalStorageFrom(ArrayOfTaskes);
        AddTaskToPageFrom(ArrayOfTaskes); //  Add tasks to page
        input.value = ""; // Empty input Filed
    }
}

// click on tsak Element 
tasksDiv.addEventListener("click" , (e)=>{
  // Delete Button
   if (e.target.classList.contains("del")){
       // Remove Task From Local Storage 
       deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
     // Remove Element From page
      e.target.parentElement.remove();
   }
});



function addTaskToArray(TaskText){
  task = {
    id :Date.now(),
    title :TaskText ,
    complete:false,
  }
  ArrayOfTaskes.push(task);
}

// Add task to page 
function AddTaskToPageFrom(ArrayOfTaskes){
   // Empty tasksDiv 
   tasksDiv.innerHTML = "";
   // looping in array of tasks
   ArrayOfTaskes.forEach(task => {
     // create Main Div 
     let div = document.createElement("div");
     div.className = "task";
     div.setAttribute("data-id" , task.id);
     div.appendChild(document.createTextNode(task.title));
     // create Delete Button
     let span = document.createElement("span");
     span.className = "del";
     span.appendChild(document.createTextNode("Delete"));
     // Appened Delete Button to div 
     div.appendChild(span);
     // Appendd task Div to task container 
     tasksDiv.appendChild(div);
   });
}

// Add DataToLocalStorage 
function addDataToLocalStorageFrom(ArrayOfTaskes){
   localStorage.setItem("task" , JSON.stringify(ArrayOfTaskes));
}

function getDataFromLocalStorage() {
    let data = localStorage.getItem("task");
    if (data) {
      let tasks = JSON.parse(data);
      AddTaskToPageFrom(tasks);
    }
}

 function deleteTaskWith(taskId){
    ArrayOfTaskes = ArrayOfTaskes.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(ArrayOfTaskes);
}
// // localStorage.clear()










