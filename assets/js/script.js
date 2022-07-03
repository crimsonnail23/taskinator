var formEl = document.querySelector("#task-form")

var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskTypeInput = document.querySelector("select[name='task-type'").value;

    //package data as an object

    var taskDataObj = {

        name: taskNameInput,

        type: taskTypeInput,

    }
//send it as an argument to createTaskEL

createTaskEl(taskDataObj);




}


var createTaskEl = function(taskDataObj){

        //create list Item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
    
        //create div element to hold task info and add to list item.
        var taskInfoEl = document.createElement("div");
    
        //give it a class name.
        taskInfoEl.className = "task-info";
    
        //add html content to div.
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    
    
        listItemEl.appendChild(taskInfoEl);
    
        tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", taskFormHandler);