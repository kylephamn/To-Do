document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addButton').addEventListener('click', addTask);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('task-input').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    let taskInput = document.getElementById('task-input');
    if (taskInput.value.trim() === '') return;

    let taskList = document.getElementById('task-list');
    let li = document.createElement('li');
    li.innerText = taskInput.value.trim() + ' ';
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
        updateCounter();
    };

    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.onclick = function() {
        let newText = prompt('Edit your task', li.innerText);
        if (newText) li.innerText = newText + ' ';
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
    };

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
    taskInput.value = '';

    updateCounter();
}

function updateCounter() {
    let taskCounter = document.getElementById('task-counter');
    let tasks = document.getElementById('task-list').children.length;
    taskCounter.innerText = 'Tasks: ' + tasks;
    taskCounter.className = tasks < 6 ? 'green' : 'red';
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

    taskCounterElem.className = '';
    if (counter < 5) {
        taskCounterElem.classList.add('green');
    } else if (counter >= 5 && counter < 10) {
        taskCounterElem.classList.add('yellow');
    } else {
        taskCounterElem.classList.add('red');
    }
}

// Add event listeners to the edit buttons (for newly created tasks)
document.getElementById('tasks').addEventListener('click', function(e) {
    if (e.target && e.target.matches('.edit-btn')) {
        let li = e.target.parentNode;
        let name = li.querySelector('.task-name');
        let description = li.querySelector('.task-description');
        let dueDate = li.querySelector('.task-due-date');

        // If you need to save the changes (e.g., to a server or local storage), do it here

        // Switch to 'view' mode by making content uneditable
        name.contentEditable = 'false';
        description.contentEditable = 'false';
        dueDate.contentEditable = 'false';
        e.target.textContent = 'Edit';  // Change button text back to 'Edit'
    }
});

// To handle the edit functionality, you can toggle contenteditable on the task elements
document.getElementById('tasks').addEventListener('click', function(e) {
    if (e.target && e.target.matches('.edit-btn')) {
        let li = e.target.parentNode;
        let name = li.querySelector('.task-name');
        let description = li.querySelector('.task-description');
        let dueDate = li.querySelector('.task-due-date');

        let isEditable = name.isContentEditable;
        name.contentEditable = isEditable ? 'false' : 'true';
        description.contentEditable = isEditable ? 'false' : 'true';
        dueDate.contentEditable = isEditable ? 'false' : 'true';
        e.target.textContent = isEditable ? 'Edit' : 'Save';  // Toggle button text between 'Edit' and 'Save'
    }
});
