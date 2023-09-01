import { todosContainer } from "../main";

export function addNewTask( {task, completed} ) {
  const li = document.createElement('li');
  const completedClass = completed ? 'completed' : 'incompleted';
  li.classList.add('todo');
  li.classList.add(completedClass);
  li.innerHTML = `
    <input type=checkbox ${completed ? 'checked' : ''} name='${task}' class='task'>
    ${task}
    <img src="./trash.svg">
  `;
  todosContainer.appendChild(li);
}

export function loadTasksLocalStorage() {
  const tasks = localStorage.getItem('tasks') 
                ? JSON.parse(localStorage.getItem('tasks'))
                : [];

  return tasks;
}
