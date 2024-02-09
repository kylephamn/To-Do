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

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskList();
        buildCalendar();
    }

    function addOrUpdateTask() {
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
            addTaskBtn.textContent = 'Add Task';
        } else {
            tasks.push(newTask);
        }

        saveTasks();
        resetForm();
    }

    function resetForm() {
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Low';
        editIndex = null;
    }

    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.taskName} (Due: ${task.dueDate}, Priority: ${task.priority})</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                ${!task.completed ? `<button onclick="completeTask(${index})">Complete</button>` : ''}
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">`;
            taskList.appendChild(li);
        });
        updateTaskCounter();
    }

    function updateTaskCounter() {
        taskCounter.textContent = `Tasks: ${tasks.length}`;
        taskCounter.className = tasks.length < 6 ? 'green' : 'red';
    }

    function completeTask(index) {
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

    // Expose functions to global scope
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

    window.completeTask = completeTask;

    // Event listeners for sorting and filtering
    document.getElementById('allTasks').addEventListener('click', () => updateTaskList());
    document.getElementById('completedTasks').addEventListener('click', () => updateTaskList('completed'));
    document.getElementById('pendingTasks').addEventListener('click', () => updateTaskList('pending'));

    // Call initial update and build functions
    updateTaskList();
    buildCalendar();
});
