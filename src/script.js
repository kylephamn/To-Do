document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    const buildCalendar = () => {
        const calendarEl = document.getElementById('calendar');
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        calendarEl.innerHTML = `<div class="calendar-title">${getMonthName(currentMonth)} ${currentYear}</div>`;
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            const taskDueThisDay = tasks.some(task => new Date(task.dueDate).getDate() === day && new Date(task.dueDate).getMonth() === currentMonth && new Date(task.dueDate).getFullYear() === currentYear);
            if (taskDueThisDay) {
                const dotEl = document.createElement('span');
                dotEl.className = 'task-dot';
                dayEl.appendChild(dotEl);
            }

            calendarEl.appendChild(dayEl);
        }
    };

    const getMonthName = (monthIndex) => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][monthIndex];

    const updateTaskCounter = () => {
        const count = tasks.length;
        taskCounter.textContent = `Tasks: ${count}`;
        taskCounter.className = count < 6 ? 'green' : 'red';
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskList(currentFilter);
        buildCalendar();
    };

    const updateTaskList = (filter = '') => {
        taskList.innerHTML = '';
        let filteredTasks = tasks.filter(task => filter === 'all' || task.completed === (filter === 'completed'));

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${task.taskName} (Due: ${task.dueDate}, Priority: ${task.priority})
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">`;
            taskList.appendChild(li);
        });
        updateTaskCounter();
    };

    const addOrUpdateTask = () => {
        const taskName = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (!taskName || !dueDate) {
            alert('Please fill in all fields.');
            return;
        }

        const newTask = { taskName, dueDate, priority, completed: false };
        tasks = [...tasks, newTask];
        saveTasks();
        resetForm();
    };

    const resetForm = () => {
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Low';
    };

    const editTask = (index) => {
        // Implementation needed based on how you want to enable editing
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
    };

    const toggleCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
    };

    const filterTasks = (filter) => {
        currentFilter = filter;
        updateTaskList(filter);
    };

    const sortTasks = () => {
        const sortBy = document.getElementById('sortTasks').value;
        if (sortBy === 'dueDate') {
            tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortBy === 'priority') {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }
        updateTaskList(currentFilter);
    };

    addTaskBtn.addEventListener('click', addOrUpdateTask);
    buildCalendar();
    updateTaskList();
});
