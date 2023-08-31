import { todosContainer } from "../main";

export function addNewTask( task ) {
  const li = document.createElement('li');
  const completed = task.completed ? 'completed' : 'incompleted';
  li.classList.add('todo');
  li.classList.add(completed);
  li.innerHTML = `
    <input type=checkbox ${task.completed ? 'checked' : ''} name='${task.task}' class='task'>
    ${task.task}
    <img src="./trash.svg">
  `;
  todosContainer.appendChild(li);
}
