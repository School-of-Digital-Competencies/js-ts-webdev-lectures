import { createMinimalTodoView } from './MinimalTodoView';
import { createModernTodoView } from './ModernTodoView';
import { Todo } from '../models/TodoModel';

export function createTodoViewSwitcher() {
  const root = document.createElement('div');
  root.className = 'todo-switcher';
  
  const select = document.createElement('select');
  select.className = 'todo-view-select';
  
  const options = [
    { value: 'minimal', text: 'Минималистичный стиль' },
    { value: 'modern', text: 'Современный стиль' },
    { value: 'both', text: 'Оба стиля' }
  ];
  
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    select.appendChild(optionElement);
  });
  
  const viewsContainer = document.createElement('div');
  viewsContainer.className = 'todo-views-container';
  
  root.appendChild(select);
  root.appendChild(viewsContainer);
  
  let currentViews: any[] = [];
  let currentTodos: Todo[] = [];
  
  function render(todos: Todo[]): void {
    currentTodos = todos;
    const selectedValue = select.value;
    viewsContainer.innerHTML = '';
    currentViews = [];
    
    if (selectedValue === 'minimal' || selectedValue === 'both') {
      const minimalView = createMinimalTodoView();
      minimalView.bindAddTodo(addTodoHandler);
      minimalView.bindToggleTodo(toggleTodoHandler);
      minimalView.bindDeleteTodo(deleteTodoHandler);
      minimalView.render(currentTodos);
      viewsContainer.appendChild(minimalView.getRoot());
      currentViews.push(minimalView);
    }
    
    if (selectedValue === 'modern' || selectedValue === 'both') {
      const modernView = createModernTodoView();
      modernView.bindAddTodo(addTodoHandler);
      modernView.bindToggleTodo(toggleTodoHandler);
      modernView.bindDeleteTodo(deleteTodoHandler);
      modernView.render(currentTodos);
      viewsContainer.appendChild(modernView.getRoot());
      currentViews.push(modernView);
    }
  }
  
  let addTodoHandler: (text: string) => void = () => {};
  let toggleTodoHandler: (id: number) => void = () => {};
  let deleteTodoHandler: (id: number) => void = () => {};
  
  function bindAddTodo(handler: (text: string) => void): void {
    addTodoHandler = handler;
  }
  
  function bindToggleTodo(handler: (id: number) => void): void {
    toggleTodoHandler = handler;
  }
  
  function bindDeleteTodo(handler: (id: number) => void): void {
    deleteTodoHandler = handler;
  }
  
  select.addEventListener('change', () => {
    render(currentTodos);
  });
  
  return {
    getRoot: () => root,
    render,
    bindAddTodo,
    bindToggleTodo,
    bindDeleteTodo
  };
} 