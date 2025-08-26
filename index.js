let lists = document.querySelector("#taskLists");
let button1 = document.querySelector("#addTaskButton");

function addTaskToDOM(taskText) {
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.style.width = "20px";
    checkBox.style.height = "20px";
    checkBox.style.borderRadius = "50px";
    checkBox.style.marginRight = "10px";

    let span = document.createElement("span");
    span.textContent = taskText;
    span.style.fontSize = "large";

    let list = document.createElement("li");
    list.classList.add("task-item");
    list.style.listStyle = "none";

    list.appendChild(checkBox);
    list.appendChild(span);
    lists.appendChild(list);

    let button = null;

    checkBox.addEventListener("click", function () {
        if (checkBox.checked) {
            button = document.createElement("button");
            button.textContent = "Delete";
            button.classList.add("delete-btn");
            list.appendChild(button);

            button.addEventListener("click", function () {
                lists.removeChild(list);
                saveTasks(); // save after deleting
            });
        } else {
            if (button) {
                list.removeChild(button);
                button = null;
            }
        }
    });
}

// ✅ Save all tasks
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskLists .task-item span").forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ✅ Load tasks from storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskText => {
        addTaskToDOM(taskText);
    });
}

// ✅ Event: Add new task
button1.addEventListener("click", function () {
    let inputText = document.querySelector("#taskInput");
    let inputValue = inputText.value.trim();
    if (inputValue !== '') {
        addTaskToDOM(inputValue);
        saveTasks();   // save immediately after adding
        inputText.value = '';
    }
});

// ✅ Load tasks on page start
window.addEventListener("DOMContentLoaded", loadTasks);
