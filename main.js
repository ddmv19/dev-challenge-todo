import './style.css'
import { addNewTask } from './js/app';
import { tasks } from './js/tasks';

const typesOfTodos = document.querySelectorAll('.type');

const taskInput = document.querySelector('#task-input');

export const todosContainer = document.querySelector('.todos-container');

let typeSelected = 'all';

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

taskInput.addEventListener('keydown', ( event ) => {
  const isEnter = event.key;
  if(isEnter === 'Enter' && taskInput.value != '') {
    const newTask = {
      task: taskInput.value,
      completed: false
    }
    addNewTask( newTask );
    tasks.push( newTask );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
  }
})

todosContainer.addEventListener('click', e => {
  const element = e.target;
  const liElement = e.target.parentElement;
  const nameElement = e.target.localName;
  const task = tasks.find(task => task.task === element.getAttribute('name'));
  if(nameElement === 'input' && element.checked) {
    liElement.classList.add('completed');
    task.completed = true;
    if(typeSelected === 'active') {
      liElement.remove();
    }
  } else if(nameElement === 'input' && !element.checked) {
    liElement.classList.remove('completed');
    task.completed = false;
    if(typeSelected === 'completed') {
      liElement.remove();
    }
  } else if(nameElement === 'img') {
    const liElement = element.parentNode;
    const input = element.previousElementSibling; // Obtenenemos el elemento o etiqueta de encima
    const taskToEliminate = tasks.find( task => task.task === input.getAttribute('name'));
    let newTasks = tasks.filter(todo => todo.task != taskToEliminate.task);
    liElement.remove();
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
});







