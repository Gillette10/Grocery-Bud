// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


document.addEventListener('DOMContentLoaded', saveToDom);
function saveToDom() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(item){
    const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(item));

  link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
  })
}

form.addEventListener('submit', newItem);
function newItem(e) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  saveToLocalStorage(taskInput.value);

  taskInput.value = '';
  e.preventDefault();
}

function saveToLocalStorage(params) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(params);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', deleteItem)
function deleteItem(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();

    deleteFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function deleteFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

clearBtn.addEventListener('click', clearItems)
function clearItems() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);

    clearTaskFromLocalStorage();
  }
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

filter.addEventListener('keyup', filterItem)
function filterItem(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const items = task.firstChild.textContent;
      if (items.toLowerCase().indexOf(text) == -1) {
        task.style.display = 'none';
      } else {
        task.style.display = 'block';
      }
  })
  
}