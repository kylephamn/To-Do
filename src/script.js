document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    const calendarEl = document.getElementById('calendar');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let editIndex = null;
    let currentFilter = 'all';

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

        if (taskName === "" || dueDate === "") {
            alert('Please fill in all fields.');
            return;
        }

        const taskDetails = { taskName, dueDate, priority, completed: false };

        if (editIndex !== null) {
            tasks[editIndex] = taskDetails;
        } else {
            tasks.push(taskDetails);
        }
        saveTasks();
        resetForm();
        buildCalendar();
    }

    function editTask(index) {
        const task = tasks[index];
        taskInput.value = task.taskName;
        dueDateInput.value = task.dueDate;
        priorityInput.value = task.priority;
        addTaskBtn.textContent = 'Save Task';
        editIndex = index;
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        buildCalendar();
    }

    function toggleCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskList(currentFilter);
        buildCalendar(); // Rebuild the calendar when tasks are saved
    }

    function updateTaskList(filter = '') {
        currentFilter = filter;
        taskList.innerHTML = '';
        let filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });

        filteredTasks.forEach((task, index) => {
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

    function buildCalendar() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Clear the calendar grid and set the month name
        const calendarTitle = document.createElement('div');
        calendarTitle.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        calendarTitle.className = 'calendar-title';
        calendarEl.innerHTML = ''; // Clear previous calendar
        calendarEl.appendChild(calendarTitle);

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            const dayString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (tasks.some(task => task.dueDate === dayString)) {
                const dotEl = document.createElement('span');
                dotEl.className = 'task-dot';
                dayEl.appendChild(dotEl);
            }

            calendarEl.appendChild(dayEl);
        }
    }

    function getMonthName(monthIndex) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthIndex];
    }

    window.editTask = editTask;
    window.deleteTask = deleteTask;
    window.toggleCompletion = toggleCompletion;
    window.filterTasks = filterTasks;
    window.sortTasks = sortTasks;

    addTaskBtn.addEventListener('click', addOrUpdateTask);

    // Initial tasks display and calendar build
    updateTaskList();
    buildCalendar();
});

function filterTasks(filter) {
    // This function will need implementation details based on your filtering logic
}

function sortTasks() {
    // This function will need implementation details based on your sorting logic
}
