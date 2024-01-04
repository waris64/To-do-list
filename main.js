let input = document.querySelector('.entered-list');
let addBtn = document.querySelector('.add-list');
let tasks = document.querySelector('.tasks');
let alerts = document.querySelector('.warnings');

// Add Button disabled

input.addEventListener('keyup', () => {
    if (input.value.trim() != 0) {
        addBtn.classList.add('active');
    }
    else {
        addBtn.classList.remove('active');
    }
});

// Add New Tasks

addBtn.addEventListener('click', () => {
    if (input.value !== "") {
        let newitem = document.createElement('div');
        newitem.classList.add('item');
        newitem.innerHTML = `<p>${input.value}</p>
            <div class="item-btn">
                <i class="fa-solid fa-check"></i>
                <i class="fa-solid fa-xmark"></i>
            </div>`;
        tasks.appendChild(newitem);
        input.value = '';
    } else {
        alert("Please enter a task ");
    }
});

function myfunc() {
    alerts.innerHTML = "";
}
// Handle Delete Function

tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-xmark')) {
        e.target.parentElement.parentElement.remove();
    }
});

// Mark Completed
tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-check')) {
        e.target.parentElement.parentElement.classList.toggle('completed');
        e.target.remove();
    }
});

// Load tasks from local storage when the page loads
window.addEventListener('load', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        taskList = storedTasks;
        renderTasks();
    }
});

// Add Button disabled
input.addEventListener('keyup', () => {
    if (input.value.trim() !== '') {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
});

// Add New Tasks
addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText !== '') {
        taskList.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        renderTasks();
        input.value = '';
    } else {
        
        setTimeout(() => {
            alerts.innerHTML = '';
        }, 2000);
    }
});

// Render tasks
function renderTasks() {
    tasks.innerHTML = '';
    taskList.forEach((task, index) => {
        let newitem = document.createElement('div');
        newitem.classList.add('item');
        newitem.innerHTML = `
            <p>${task}</p>
            <div class="item-btn">
                <i class="fa-solid fa-check"></i>
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        tasks.appendChild(newitem);
    });
}

// Handle Delete Function
tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-xmark')) {
        const itemToRemove = e.target.parentElement;
        const taskIndex = Array.from(itemToRemove.parentElement.children).indexOf(itemToRemove);
        taskList.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        renderTasks();
    }
});

// Mark Completed
tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-check')) {
        e.target.parentElement.classList.toggle('completed');
    }
});
