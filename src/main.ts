import "bulma/css/versions/bulma-prefixed.min.css";
import { AppHomepage } from "./pages";

document.addEventListener("DOMContentLoaded", async () => {
  const element = await AppHomepage();

  document.body.prepend(...[element]);
});
