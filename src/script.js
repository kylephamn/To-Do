function addTask() {
    let taskInput = document.getElementById('taskInput');
    let dueDateInput = document.getElementById('dueDateInput');
    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;

    if (taskText) {
        let tasksList = document.getElementById('tasks');
        let li = document.createElement('li');
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() { deleteTask(li); };

        li.textContent = `${taskText} - Due: ${dueDate}`;
        li.appendChild(deleteBtn);
        li.onclick = function(event) {
            event.stopPropagation(); // Prevent click on li when clicking the button
            toggleDone(this); 
        };
        
        tasksList.appendChild(li);
        taskInput.value = '';
        dueDateInput.value = '';

        updateTaskCounter();
    }
}

function toggleDone(taskItem) {
    taskItem.classList.toggle('done');
}

function deleteTask(taskItem) {
    taskItem.remove();
    updateTaskCounter();
}

function updateTaskCounter() {
    let tasksList = document.getElementById('tasks');
    let counter = tasksList.children.length;
    let taskCounterElem = document.getElementById('taskCounter');

    taskCounterElem.textContent = `${counter} Task${counter !== 1 ? 's' : ''}`;
    if (counter < 5) {
        taskCounterElem.className = 'green';
    } else if (counter < 10) {
        taskCounterElem.className = 'yellow';
    } else {
        taskCounterElem.className = 'red';
    }
}
