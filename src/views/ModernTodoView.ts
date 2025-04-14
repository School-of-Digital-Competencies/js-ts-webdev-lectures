import { Todo } from "../models/TodoModel";

export function createModernTodoView() {
  const root = document.createElement('div');
  root.className = 'modern-todo-app';
  
  const header = document.createElement('h1');
  header.textContent = 'Мои задачи';
  header.className = 'modern-todo-header';
  
  const inputContainer = document.createElement('div');
  inputContainer.className = 'modern-todo-input-container';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Что нужно сделать?';
  input.className = 'modern-todo-input';
  
  const addButton = document.createElement('button');
  addButton.textContent = 'Добавить';
  addButton.className = 'modern-todo-add-button';
  
  const list = document.createElement('ul');
  list.className = 'modern-todo-list';
  
  inputContainer.append(input);
  inputContainer.append(addButton);
  
  root.append(header);
  root.append(inputContainer);
  root.append(list);

  function render(todos: Todo[]): void {
    list.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `modern-todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo.id.toString();
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.className = 'modern-todo-checkbox';
      
      const text = document.createElement('span');
      text.textContent = todo.text;
      text.className = 'modern-todo-text';
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Удалить';
      deleteBtn.className = 'modern-todo-delete';
      
      li.append(checkbox);
      li.append(text);
      li.append(deleteBtn);
      list.append(li);
    });
  }

  function bindAddTodo(handler: (text: string) => void): void {
    const addHandler = () => {
      if (input.value.trim()) {
        handler(input.value.trim());
        input.value = '';
      }
    };
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addHandler();
      }
    });
    
    addButton.addEventListener('click', addHandler);
  }

  function bindToggleTodo(handler: (id: number) => void): void {
    list.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains('modern-todo-checkbox')) {
        const id = parseInt(target.closest('li')?.dataset.id || '0');
        if (id) {
          handler(id);
        }
      }
    });
  }

  function bindDeleteTodo(handler: (id: number) => void): void {
    list.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('modern-todo-delete')) {
        const id = parseInt(target.closest('li')?.dataset.id || '0');
        if (id) {
          handler(id);
        }
      }
    });
  }

  return {
    getRoot: () => root,
    render,
    bindAddTodo,
    bindToggleTodo,
    bindDeleteTodo
  };
} 