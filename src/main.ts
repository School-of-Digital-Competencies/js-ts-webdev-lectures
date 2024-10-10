import { Page } from "./components/Page";
import { Loader } from "./components/Loader";
import { loadData } from "./api/loadData";
import { CardData } from "./types";

function renderPage(data: CardData[]) {
  const page = Page(data);

  document.body.append(page);
}

async function initApp() {
  const loader = Loader();

  document.body.append(loader);

  const data = await loadData();

  document.body.innerHTML = "";

  renderPage(data);
}

document.addEventListener("DOMContentLoaded", () => {
  // start to build our page
  initApp();
});
