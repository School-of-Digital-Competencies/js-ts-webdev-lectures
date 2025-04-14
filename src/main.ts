import "./style.css";

import { Gallery } from "./components/Gallery";
import images from "./db/images.json";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const gallery = Gallery(images);

  app?.append(gallery);
});
