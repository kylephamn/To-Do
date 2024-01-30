document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let editIndex = null;

    function resetForm() {
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Low';
        addTaskBtn.textContent = 'Add Task';
        editIndex = null;
    }

    function updateTaskCounter() {
        const count = tasks.length;
        taskCounter.textContent = `Tasks: ${count}`;
        taskCounter.className = count < 6 ? 'green' : 'red';
    }

    function addOrUpdateTask() {
        const taskName = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (taskName === "" || dueDate === "") return;

        const taskDetails = { taskName, dueDate, priority, completed: false };

        if (editIndex !== null) {
            tasks[editIndex] = taskDetails;
        } else {
            tasks.push(taskDetails);
        }
        saveTasks();
        resetForm();
    }

    function editTask(index) {
        const task = tasks[index];
        taskInput.value = task.taskName;
        dueDateInput.value = task.dueDate;
        priorityInput.value = task.priority;
        addTaskBtn.textContent = 'Update Task';
        editIndex = index;
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
    }

    function toggleCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskList();
    }

    function updateTaskList(filter = '') {
        taskList.innerHTML = '';
        tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        }).forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.taskName} (Due: ${task.dueDate}, Priority: ${task.priority})
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})"> Complete`;
            taskList.appendChild(li);
        });
        updateTaskCounter();
    }

    window.editTask = editTask;
    window.deleteTask = deleteTask;
    window.toggleCompletion = toggleCompletion;
    window.filterTasks = (filter) => updateTaskList(filter);

    addTaskBtn.addEventListener('click', addOrUpdateTask);

    // Initial tasks display
    updateTaskList();
});
