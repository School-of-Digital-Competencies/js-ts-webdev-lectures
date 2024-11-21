import "bulma/css/versions/bulma-prefixed.min.css";
import { $router } from "./app";

document.addEventListener("DOMContentLoaded", () => {
  $router.resolve();
});
