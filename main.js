import './style.css'
import { addNewTask, loadTasksLocalStorage } from './js/app';

const typesOfTodos = document.querySelectorAll('.type');

const taskInput = document.querySelector('#task-input');
const addTodoButton = document.querySelector('#addTodo');

export const todosContainer = document.querySelector('.todos-container');

let typeSelected = 'all';

let tasks = loadTasksLocalStorage();

todosContainer.innerHTML = '';
tasks.forEach(task => addNewTask( task ));

typesOfTodos.forEach((type) => {
  type.addEventListener('click', () => {
    typesOfTodos[0].classList.remove('select');
    typesOfTodos[1].classList.remove('select');
    typesOfTodos[2].classList.remove('select');
    if(!type.classList.contains('select')) {
      type.classList.add('select');
    }
    const optionTodos = type.getAttribute('id');
    todosContainer.innerHTML = '';
    tasks = loadTasksLocalStorage();
    if(optionTodos.includes('all')) {
      tasks.forEach(task => addNewTask( task ));
      typeSelected = 'all';
    } else if(optionTodos.includes('active')) {
      tasks.filter(task => !task.completed).forEach(taskActive => addNewTask(taskActive));
      typeSelected = 'active';
    } else if(optionTodos.includes('completed')) {
      tasks.filter(task => task.completed).forEach(taskCompleted => addNewTask(taskCompleted));
      typeSelected = 'completed';
    }
  });
});

taskInput.addEventListener('keypress', ( event ) => {
  const isEnter = event.key;
  if(isEnter === 'Enter' && taskInput.value != '') {
    const newTask = {
      task: taskInput.value,
      completed: false,
    };
    addNewTask( newTask );
    tasks.push( newTask );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
  }
});

addTodoButton.addEventListener('click', () => {
  if(taskInput.value != '') {
    const newTask = {
      task: taskInput.value,
      completed: false,
    };
    addNewTask( newTask );
    tasks.push( newTask );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
  }
});

todosContainer.addEventListener('click', e => {
  const element = e.target;
  const nameElement = e.target.localName;
  
  if(nameElement === 'input' && element.checked) {
    const liElement = e.target.parentElement;
    const nameTask = element.getAttribute('name');
    const task = tasks.find(task => task.task === nameTask);
    liElement.classList.add('completed');
    task.completed = true;
    if(typeSelected === 'active') {
      liElement.remove();
    }
  } else if(nameElement === 'input' && !element.checked) {
    const liElement = e.target.parentElement;
    const nameTask = element.getAttribute('name');
    const task = tasks.find(task => task.task === nameTask);
    liElement.classList.remove('completed');
    task.completed = false;
    if(typeSelected === 'completed') {
      liElement.remove();
    }
  } else if(nameElement === 'img') {
    const liElement = element.parentNode;
    const input = element.previousElementSibling; // Obtenenemos el elemento o etiqueta de encima
    const { task } = tasks.find( task => task.task === input.getAttribute('name'));
    tasks = tasks.filter(todo => todo.task != task);
    liElement.remove();
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
});







