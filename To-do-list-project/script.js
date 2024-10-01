// Add event listener for adding tasks
document.getElementById('addBtn').addEventListener('click', addTask);

function addTask() {
  let taskInput = document.getElementById('taskInput').value;
  
  if (taskInput === '') {
    alert('Please enter a task.');
    return;
  }
  
  // Create a new list item
  let li = document.createElement('li');
  li.innerHTML = `
    <span>${taskInput}</span>
    <button class="completeBtn">Complete</button>
    <button class="deleteBtn">Delete</button>
  `;

  // Add task to the list
  document.getElementById('taskList').appendChild(li);

  // Clear the input
  document.getElementById('taskInput').value = '';

  // Mark task as completed when "Complete" button is clicked
  li.querySelector('.completeBtn').addEventListener('click', function () {
    li.classList.toggle('completed');
  });

  // Delete task when "Delete" button is clicked
  li.querySelector('.deleteBtn').addEventListener('click', function () {
    li.remove();
  });
}
