var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter=0;
var tasksInProgressEl= document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];





var taskFormHandler = function(){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type'").value;

    //check if input has empty strings
    if(!taskNameInput || !taskTypeInput) {

        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if(isEdit){

        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);

    }


    // no data attribute, so create object as normal and pass to createTaskEl function

    else{
     var taskDataObj = {

        name: taskNameInput,

        type: taskTypeInput,

        status: "to do",

    };

    createTaskEl(taskDataObj);
};







}


var createTaskEl = function(taskDataObj){

        //create list Item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

        //add task id as custom attribute
        listItemEl.setAttribute("data-task-id",taskIdCounter);
    
        //create div element to hold task info and add to list item.
        var taskInfoEl = document.createElement("div");
    
        //give it a class name.
        taskInfoEl.className = "task-info";
    
        //add html content to div.
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    
    
        listItemEl.appendChild(taskInfoEl);

        taskDataObj.id = taskIdCounter;

        tasks.push(taskDataObj);

        saveTasks();

        var taskActionsEl = createTaskActions(taskIdCounter);

        listItemEl.appendChild(taskActionsEl);
    
        tasksToDoEl.appendChild(listItemEl);

        //increase task counter for next unique id.
        taskIdCounter++;
        



}

var createTaskActions = function(taskId){

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className="task-actions";

    //create edit button.
    var editButtonEl= document.createElement("button");
    editButtonEl.textContent="Edit";
    editButtonEl.className="btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button.

    var deleteButtonEl = document.createElement("div");
    deleteButtonEl.textContent= "Delete";
    deleteButtonEl.className="btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl= document.createElement("select");
    statusSelectEl.className="select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["to do", "in progress", "completed"];

    for(var i = 0; i <statusChoices.length; i++){

        //create option element.
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;


}

formEl.addEventListener("submit", taskFormHandler);



var taskButtonHandler = function(event){

    //get target event
    var targetEl = event.target;

    //edit button was clicked
    if(targetEl.matches(".edit-btn")) {

        var taskId= targetEl.getAttribute("data-task-id");

        editTask(taskId);

    }


    //deete button was clicked.
    else if(targetEl.matches(".delete-btn")){

        //get elements task id.

        var taskId= event.target.getAttribute("data-task-id");

        deleteTask(taskId);
    };

}

var deleteTask = function(taskId){

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.remove();

    var updatedTaskArr = [];

    for(var i =0;i < tasks.length;i++){

        if(tasks[i].id !== parseInt(taskId)){

            updatedTaskArr.push(tasks[i]);

        }

    }
    tasks = updatedTaskArr;

    saveTasks();

}

var editTask = function(taskId){

    console.log("editing task #" + taskId);

    //get task list item element.
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type.
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value= taskName;
    document.querySelector("select[name='task-type'").value= taskType;
    document.querySelector("#save-task").textContent= "save task";

    formEl.setAttribute("data-task-id", taskId);



}

var completeEditTask= function(taskName, taskType, taskId){

   //find the matching task list item
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

   //set new values
   taskSelected.querySelector("h3.task-name").textContent=taskName;
   taskSelected.querySelector("span.task-type").textContent=taskType;

   for(var i = 0;i<tasks.length;i++){

        if(tasks[i]===parseInt(taskId)){

            tasks[i].name=taskName;
            tasks[i].type=taskType;

        }

   }

    saveTasks();

   alert("task updated");

   formEl.removeAttribute("data-task-id");
   document.querySelector("#save-task").textContent= "add task";



}

var taskStatusChangeHandler = function(event) {

    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get currently selected value and conver to lowercase.
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id= '" +taskId+ "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }

    for(var i = 0;i<tasks.length;i++){

        if(tasks[i].id===parseInt(taskId)){

            tasks[i].status = statusValue;

        }

    }  

    saveTasks();
   
};


var saveTasks = function(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

var loadTasks = function(){

    bobTasks = localStorage.getItem("tasks");

    //console.log(savedTasks);

    if(!bobTasks){

        return false;
    }

    bobTasks = JSON.parse(bobTasks);
    //console.log(tasks);

    //loop through saved tasks array

    for(var i = 0;i<bobTasks.length;i++){

        //pass each task object to the createTaskEl function
        createTaskEl(bobTasks[i])

    }


}

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();