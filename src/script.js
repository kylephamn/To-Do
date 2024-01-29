function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText) {
        let tasksList = document.getElementById('tasks');
        let li = document.createElement('li');
        li.textContent = taskText;
        li.onclick = function() { toggleDone(this); };
        tasksList.appendChild(li);
        taskInput.value = '';
    }
}

function toggleDone(taskItem) {
    taskItem.classList.toggle('done');
}
