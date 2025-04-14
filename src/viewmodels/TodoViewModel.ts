import { Todo, createTodoModel } from "../models/TodoModel";
import { createMinimalTodoView } from "../views/MinimalTodoView";
import { createModernTodoView } from "../views/ModernTodoView";

// Interface for view bindings
interface ViewBindings {
  render: (todos: Todo[]) => void;
  bindAddTodo: (handler: (text: string) => void) => void;
  bindToggleTodo: (handler: (id: number) => void) => void;
  bindDeleteTodo: (handler: (id: number) => void) => void;
}

export function createTodoViewModel() {
  // Initialize model
  const model = createTodoModel();
  
  // Store current view bindings
  let currentViewBindings: ViewBindings[] = [];
  
  // Function to update all views
  function updateViews(): void {
    const todos = model.getTodos();
    currentViewBindings.forEach(view => view.render(todos));
  }
  
  // Subscribe to model changes
  model.subscribe(updateViews);
  
  // Create view switcher
  function createViewSwitcher() {
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
    
    // Function to create and bind views
    function createAndBindViews(selectedValue: string) {
      viewsContainer.innerHTML = '';
      currentViewBindings = [];
      
      if (selectedValue === 'minimal' || selectedValue === 'both') {
        const minimalView = createMinimalTodoView();
        minimalView.bindAddTodo(handleAddTodo);
        minimalView.bindToggleTodo(handleToggleTodo);
        minimalView.bindDeleteTodo(handleDeleteTodo);
        viewsContainer.appendChild(minimalView.getRoot());
        currentViewBindings.push(minimalView);
      }
      
      if (selectedValue === 'modern' || selectedValue === 'both') {
        const modernView = createModernTodoView();
        modernView.bindAddTodo(handleAddTodo);
        modernView.bindToggleTodo(handleToggleTodo);
        modernView.bindDeleteTodo(handleDeleteTodo);
        viewsContainer.appendChild(modernView.getRoot());
        currentViewBindings.push(modernView);
      }
      
      updateViews();
    }
    
    // Initial view creation
    createAndBindViews(select.value);
    
    // Handle view switching
    select.addEventListener('change', () => {
      createAndBindViews(select.value);
    });
    
    return {
      getRoot: () => root
    };
  }
  
  // ViewModel methods
  function handleAddTodo(text: string): void {
    model.addTodo(text);
  }
  
  function handleToggleTodo(id: number): void {
    model.toggleTodo(id);
  }
  
  function handleDeleteTodo(id: number): void {
    model.deleteTodo(id);
  }
  
  // Return public interface
  return {
    createViewSwitcher
  };
} 