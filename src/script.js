function addTask() {
    let taskInput = document.getElementById('taskInput');
    let dueDateInput = document.getElementById('dueDateInput');
    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;

    if (taskText && dueDate) {
        let tasksList = document.getElementById('tasks');
        let li = document.createElement('li');

        // Create a span for the task text
        let taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskText} - Due: ${dueDate}`;

        // Create the delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() { deleteTask(li); };

        // Append the text span and delete button to the li element
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        li.setAttribute('data-due-date', dueDate); // Set due date as a data attribute

        li.onclick = function(event) {
            event.stopPropagation(); // Prevent click on li when clicking the button
            toggleDone(this); 
        };
        
        tasksList.appendChild(li);

        sortTasks(); // Sort tasks after adding a new one

        taskInput.value = '';
        dueDateInput.value = '';

        updateTaskCounter();

        // Add event listener to mark the task as done
        taskSpan.addEventListener('click', function() { toggleDone(li); });
    
        // Append the new task and sort the list
        tasksList.appendChild(li);
        sortTasks();
        updateTaskCounter();
    }
}

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let dueDateInput = document.getElementById('dueDateInput');
    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;

    if (taskText && dueDate) {
        let tasksList = document.getElementById('tasks');
        let li = document.createElement('li');

        // Create a span for the task text
        let taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskText} - Due: ${dueDate}`;

        // Create the delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() { deleteTask(li); };

        // Append the text span and delete button to the li element
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        li.setAttribute('data-due-date', dueDate); // Set due date as a data attribute

        li.onclick = function(event) {
            event.stopPropagation(); // Prevent click on li when clicking the button
            toggleDone(this); 
        };
        
        tasksList.appendChild(li);

        sortTasks(); // Sort tasks after adding a new one

        taskInput.value = '';
        dueDateInput.value = '';

        updateTaskCounter();
    }
}
function toggleDone(taskItem) {
    // Toggle a class that marks the item as done
    taskItem.classList.toggle('done');
}

function deleteTask(taskItem) {
    taskItem.remove();
    sortTasks();
    updateTaskCounter();
}

// Update the task counter function
function updateTaskCounter() {
    let tasksList = document.getElementById('tasks');
    let counter = tasksList.children.length;
    let taskCounterElem = document.getElementById('taskCounter');

    taskCounterElem.textContent = `${counter} Task${counter !== 1 ? 's' : ''}`;
    taskCounterElem.className = ''; // Reset the class
    if (counter < 5) {
        taskCounterElem.classList.add('green');
    } else if (counter >= 5 && counter < 10) {
        taskCounterElem.classList.add('yellow');
    } else {
        taskCounterElem.classList.add('red');
    }
}

