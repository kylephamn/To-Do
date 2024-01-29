document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addButton').addEventListener('click', addTask);
});

function addTask() {
    let taskNameInput = document.getElementById('taskInput');
    let classNameInput = document.getElementById('classInput');
    let descriptionInput = document.getElementById('descriptionInput');
    let dueDateInput = document.getElementById('dueDateInput');
    let tasksList = document.getElementById('tasks');

    let taskName = taskNameInput.value.trim();
    let className = classNameInput.value.trim();
    let description = descriptionInput.value.trim();
    let dueDate = dueDateInput.value;

    if (!taskName || !dueDate) {
        alert("Please enter at least a task name and a due date.");
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = `
        <span class="task-class">${className}</span>
        <span class="task-name" contenteditable="true">${taskName}</span>
        <span class="task-description" contenteditable="true">${description}</span>
        <span class="task-due-date">${dueDate}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this.parentNode)">Delete</button>
    `;

    tasksList.appendChild(li);

    taskNameInput.value = '';
    classNameInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';

    updateTaskCounter();
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
