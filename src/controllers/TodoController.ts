// Import necessary modules
import { createTodoModel } from "../models/TodoModel";
import { createTodoViewSwitcher } from "../views/TodoViewSwitcher";

// Function to create a todo controller that manages the application state and view
export function createTodoController() {
  // Initialize model and view switcher
  const model = createTodoModel();
  const viewSwitcher = createTodoViewSwitcher();

  // Function to update the view with current todos
  function updateView(): void {
    viewSwitcher.render(model.getTodos());
  }

  // Handler for adding new todos
  function handleAddTodo(text: string): void {
    model.addTodo(text);
  }

  // Handler for toggling todo completion status
  function handleToggleTodo(id: number): void {
    model.toggleTodo(id);
  }

  // Handler for deleting todos
  function handleDeleteTodo(id: number): void {
    model.deleteTodo(id);
  }

  // Subscribe to model changes and bind event handlers
  model.subscribe(updateView);
  viewSwitcher.bindAddTodo(handleAddTodo);
  viewSwitcher.bindToggleTodo(handleToggleTodo);
  viewSwitcher.bindDeleteTodo(handleDeleteTodo);

  // Initial view update
  updateView();

  // Return public interface
  return {
    getRoot: viewSwitcher.getRoot
  };
} 