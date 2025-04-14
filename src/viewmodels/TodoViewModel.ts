import { Todo, createTodoModel } from "../models/TodoModel";
import { createTodoView as createTodoViewComponent } from "../views/TodoView";

// Interface for view bindings
interface ViewBindings {
  render: (todos: Todo[]) => void;
  bindAddTodo: (handler: (text: string) => void) => void;
  bindToggleTodo: (handler: (id: number) => void) => void;
  bindDeleteTodo: (handler: (id: number) => void) => void;
  getRoot: () => HTMLElement;
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
  
  // Create todo view
  function createTodoViewInstance() {
    const view = createTodoViewComponent();
    view.bindAddTodo(handleAddTodo);
    view.bindToggleTodo(handleToggleTodo);
    view.bindDeleteTodo(handleDeleteTodo);
    currentViewBindings = [view];
    updateViews();
    
    return {
      getRoot: () => view.getRoot()
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
    createTodoView: createTodoViewInstance
  };
} 