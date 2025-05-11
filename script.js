const taskInput = document.getElementById('task-input');
const datetimeInput = document.getElementById('datetime-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const taskTime = datetimeInput.value;

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';

  const taskContent = document.createElement('div');
  taskContent.className = 'task-content';
  taskContent.innerHTML = `
    <strong class="task-title">${taskText}</strong>
    ${taskTime ? `<div class="task-time">${new Date(taskTime).toLocaleString()}</div>` : ''}
  `;

  const buttons = document.createElement('div');
  buttons.className = 'task-buttons';

  const doneBtn = document.createElement('button');
  doneBtn.textContent = 'Done';
  doneBtn.className = 'done-btn';
  doneBtn.onclick = () => li.classList.toggle('completed');

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => enterEditMode(li, taskContent, editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => taskList.removeChild(li);

  buttons.appendChild(doneBtn);
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  li.appendChild(taskContent);
  li.appendChild(buttons);
  taskList.appendChild(li);

  // Clear inputs
  taskInput.value = '';
  datetimeInput.value = '';
}

function enterEditMode(li, contentDiv, editBtn) {
  const title = contentDiv.querySelector('.task-title').textContent;
  const timeDiv = contentDiv.querySelector('.task-time');
  const originalTime = timeDiv ? new Date(timeDiv.textContent) : null;

  contentDiv.innerHTML = `
    <input type="text" class="edit-title" value="${title}">
    <input type="datetime-local" class="edit-time" value="${originalTime ? originalTime.toISOString().slice(0, 16) : ''}">
  `;

  editBtn.textContent = 'Save';
  editBtn.onclick = () => saveEdit(contentDiv, editBtn);
}

function saveEdit(contentDiv, editBtn) {
  const newTitle = contentDiv.querySelector('.edit-title').value.trim();
  const newTime = contentDiv.querySelector('.edit-time').value;

  if (!newTitle) {
    alert("Task title cannot be empty.");
    return;
  }

  contentDiv.innerHTML = `
    <strong class="task-title">${newTitle}</strong>
    ${newTime ? `<div class="task-time">${new Date(newTime).toLocaleString()}</div>` : ''}
  `;

  editBtn.textContent = 'Edit';
  editBtn.onclick = () => enterEditMode(contentDiv.parentElement, contentDiv, editBtn);
}
