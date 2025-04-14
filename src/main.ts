import "./styles/todoStyles.css";
import { createTodoViewModel } from "./viewmodels/TodoViewModel";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  
  if (app) {
    const viewModel = createTodoViewModel();
    const todoView = viewModel.createTodoView();
    app.append(todoView.getRoot());
  }
});
