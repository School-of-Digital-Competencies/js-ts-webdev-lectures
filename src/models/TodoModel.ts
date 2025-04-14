// Define Todo interface
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Function to create a todo model that manages the application state
export function createTodoModel() {
  // Load todos from localStorage or initialize empty array
  let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
  // Array to store change listeners
  let listeners: (() => void)[] = [];

  // Function to add a new todo
  function addTodo(text: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    todos.push(newTodo);
    saveAndNotify();
  }

  // Function to toggle todo completion status
  function toggleTodo(id: number): void {
    todos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveAndNotify();
  }

  // Function to delete a todo
  function deleteTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
    saveAndNotify();
  }

  // Function to get all todos
  function getTodos(): Todo[] {
    return [...todos];
  }

  // Function to save todos to localStorage and notify listeners
  function saveAndNotify(): void {
    localStorage.setItem('todos', JSON.stringify(todos));
    notifyListeners();
  }

  // Function to subscribe to model changes
  function subscribe(listener: () => void): void {
    listeners.push(listener);
  }

  // Function to notify all listeners about changes
  function notifyListeners(): void {
    listeners.forEach(listener => listener());
  }

  // Return public interface
  return {
    addTodo,
    toggleTodo,
    deleteTodo,
    getTodos,
    subscribe
  };
} 