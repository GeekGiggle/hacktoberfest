
        const todoForm = document.getElementById('todoForm');
        const todoInput = document.getElementById('todoInput');
        const todoList = document.getElementById('todoList');
        const totalTasksElement = document.getElementById('totalTasks');
        const completedTasksElement = document.getElementById('completedTasks');
        const pendingTasksElement = document.getElementById('pendingTasks');

        let todos = [];

        function updateDashboard() {
            const totalTasks = todos.length;
            const completedTasks = todos.filter(todo => todo.completed).length;
            const pendingTasks = totalTasks - completedTasks;

            totalTasksElement.textContent = totalTasks;
            completedTasksElement.textContent = completedTasks;
            pendingTasksElement.textContent = pendingTasks;
        }

        function renderTodos() {
            todoList.innerHTML = '';
            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <span>${todo.text}</span>
                    <div>
                        <button class="btn btn-sm btn-success me-2" onclick="toggleComplete(${index})">✓</button>
                        <button class="btn btn-sm btn-danger" onclick="removeTodo(${index})">✕</button>
                    </div>
                `;
                todoList.appendChild(li);
            });
            updateDashboard();
        }

        function addTodo(text) {
            todos.push({ text, completed: false });
            renderTodos();
        }

        function toggleComplete(index) {
            todos[index].completed = !todos[index].completed;
            renderTodos();
        }

        function removeTodo(index) {
            todos.splice(index, 1);
            renderTodos();
        }

        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = todoInput.value.trim();
            if (text) {
                addTodo(text);
                todoInput.value = '';
            }
        });

        renderTodos();
   