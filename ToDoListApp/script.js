document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#todo-input');
    const submitButton = document.querySelector('#submit');
    const todoList = document.querySelector('.todo-lists');

    submitButton.addEventListener('click', () => {
        const inputData = input.value.trim();
        if (inputData) {
            addTodoItem(inputData);
            input.value = '';
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const inputData = input.value.trim();
            if (inputData) {
                addTodoItem(inputData);
                input.value = '';
            }
        }
    });

    function addTodoItem(inputData) {
        const todoEl = document.createElement('div');
        todoEl.classList.add('todo-item');

        const todoContentEl = document.createElement('div');
        todoEl.appendChild(todoContentEl);

        const todoInputEl = document.createElement('input');
        todoInputEl.classList.add('text');
        todoInputEl.type = 'text';
        todoInputEl.value = inputData;
        todoInputEl.setAttribute('readonly', 'readonly');
        todoContentEl.appendChild(todoInputEl);

        const todoActionsEl = document.createElement('div');
        todoActionsEl.classList.add('action-items');

        const todoDoneEl = document.createElement('i');
        todoDoneEl.classList.add('fa', 'fa-check');
        todoActionsEl.appendChild(todoDoneEl);

        const todoEditEl = document.createElement('i');
        todoEditEl.classList.add('fa', 'fa-pen-to-square', 'edit');
        todoActionsEl.appendChild(todoEditEl);

        const todoDeleteEl = document.createElement('i');
        todoDeleteEl.classList.add('fa', 'fa-trash');
        todoActionsEl.appendChild(todoDeleteEl);

        todoEl.appendChild(todoActionsEl);
        todoList.appendChild(todoEl);

        todoDoneEl.addEventListener('click', () => {
            todoInputEl.classList.toggle('done');
        });

        todoEditEl.addEventListener('click', () => {
            if (todoEditEl.classList.contains('edit')) {
                todoEditEl.classList.remove('edit', 'fa-pen-to-square');
                todoEditEl.classList.add('fa-x', 'save');
                todoInputEl.removeAttribute('readonly');
                todoInputEl.focus();
            } else {
                todoEditEl.classList.remove('save', 'fa-x');
                todoEditEl.classList.add('fa-pen-to-square', 'edit');
                todoInputEl.setAttribute('readonly', 'readonly');
            }
        });

        todoDeleteEl.addEventListener('click', () => {
            todoList.removeChild(todoEl);
        });
    }
});