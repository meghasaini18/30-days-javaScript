const taskForm = document.querySelector(".task-form");
const taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task" + (task.completed ? " complete" : "");

        taskDiv.innerHTML = `<strong>Project: </strong> ${task.project}<br>
                            <strong>Title: </strong> ${task.title}<br>
                            <small>${task.description} </small><br>
                            <strong>Due: </strong>${task.dueDate}<br>
                            <div class="task-btn">
                            <button class="tick-btn" onclick="toggleTask(${index})">✔</button>
                            <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
                            </div>`;

    taskList.appendChild(taskDiv);                    
    });
}
function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}
function deleteTask(index){
    if(confirm("Delete this task")){
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}
taskForm.addEventListener("submit", addTask);
renderTasks();

function addTask(e){
    e.preventDefault();

    const project = document.querySelector(".project-name").value;
    const title = document.querySelector(".task-title").value;
    const description = document.querySelector(".task-description").value;
    const dueDate = document.querySelector(".task-due").value;

    const newTask = {project, title, description, dueDate, completed: false};

    tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskForm.reset();
}