var formEl = document.querySelector("#task-form")

var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskTypeInput = document.querySelector("select[name='task-type'").value;

    console.log(taskTypeInput);


    //create list Item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div element to hold task info and add to list item.
    var taskInfoEl = document.createElement("div");

    //give it a class name.
    taskInfoEl.className = "task-info";

    //add html content to div.
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";



    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);


}


formEl.addEventListener("submit", createTaskHandler);