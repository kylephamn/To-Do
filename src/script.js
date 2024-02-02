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

    // Build the calendar when the DOM content has been loaded
    buildCalendar();

    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        
        if (!taskName || !dueDate) {
            alert('Please fill in all fields.');
            return;
        }

        const newTask = { taskName, dueDate, priority, completed: false };
        
        if (editIndex !== null) {
            tasks[editIndex] = newTask;
            editIndex = null;
        } else {
            tasks.push(newTask);
        }

        saveTasks();
        resetForm();
    });

    function resetForm() {
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Low';
        addTaskBtn.textContent = 'Add Task';
        editIndex = null;
        buildCalendar();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskList(currentFilter);
        buildCalendar();
    }

    function updateTaskList(filter) {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true; // If filter is 'all' or not set
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.taskName} (Due: ${task.dueDate}, Priority: ${task.priority})</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">`;
            taskList.appendChild(li);
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.taskName} (Due: ${task.dueDate}, Priority: ${task.priority})</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="markAsComplete(${index})">Completed</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">`;
            taskList.appendChild(li);
        });
        updateTaskCounter();
    }

    function updateTaskCounter() {
        const count = tasks.length;
        taskCounter.textContent = `Tasks: ${count}`;
        taskCounter.className = count < 6 ? 'green' : 'red';
    }

    function markAsComplete(index) {
        tasks[index].completed = true;
        saveTasks();
    }

    function buildCalendar() {
        calendarEl.innerHTML = ''; // Clear the calendar
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const calendarTitle = document.createElement('div');
        calendarTitle.className = 'calendar-title';
        calendarTitle.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        calendarEl.appendChild(calendarTitle);

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            const taskDueThisDay = tasks.some(task => {
                const taskDate = new Date(task.dueDate);
                return taskDate.getDate() === day &&
                    taskDate.getMonth() === currentMonth &&
                    taskDate.getFullYear() === currentYear;
            });

            if (taskDueThisDay) {
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

    window.editTask = (index) => {
        const task = tasks[index];
        taskInput.value = task.taskName;
        dueDateInput.value = task.dueDate;
        priorityInput.value = task.priority;
        addTaskBtn.textContent = 'Update Task';
        editIndex = index;
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
    };

    window.toggleCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
    };

    // Filter and sort handlers
    document.getElementById('allTasks').addEventListener('click', () => filterTasks('all'));
    document.getElementById('completedTasks').addEventListener('click', () => filterTasks('completed'));
    document.getElementById('pendingTasks').addEventListener('click', () => filterTasks('pending'));
    document.getElementById('sortTasks').addEventListener('change', (e) => sortTasks(e.target.value));

    function filterTasks(filter) {
        currentFilter = filter;
        updateTaskList(filter);
    }

    document.getElementById('addTaskBtn').addEventListener('click', addOrUpdateTask);
    
    function sortTasks(sortBy) {
        if (sortBy === 'dueDate') {
            tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortBy === 'priority') {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }
        updateTaskList(currentFilter);
    }
});
