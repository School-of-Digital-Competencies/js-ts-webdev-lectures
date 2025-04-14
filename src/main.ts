import "./style.css";
import { createTodoController } from "./controllers/TodoController";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  
  if (app) {
    const controller = createTodoController();
    app.append(controller.getRoot());
  }
});
