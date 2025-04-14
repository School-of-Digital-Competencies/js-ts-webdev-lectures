import { Todo } from "../models/TodoModel";

export function createMinimalTodoView() {
  const root = document.createElement('div');
  root.className = 'minimal-todo-app';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Добавить задачу...';
  input.className = 'minimal-todo-input';
  
  const list = document.createElement('ul');
  list.className = 'minimal-todo-list';
  
  root.append(input);
  root.append(list);

  function render(todos: Todo[]): void {
    list.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `minimal-todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo.id.toString();
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.className = 'minimal-todo-checkbox';
      
      const text = document.createElement('span');
      text.textContent = todo.text;
      text.className = 'minimal-todo-text';
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.className = 'minimal-todo-delete';
      
      li.append(checkbox);
      li.append(text);
      li.append(deleteBtn);
      list.append(li);
    });
  }

  function bindAddTodo(handler: (text: string) => void): void {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        handler(input.value.trim());
        input.value = '';
      }
    });
  }

  function bindToggleTodo(handler: (id: number) => void): void {
    list.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains('minimal-todo-checkbox')) {
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
      if (target.classList.contains('minimal-todo-delete')) {
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