import { AppHome } from "../../templates";
import { loadData } from "../../backend/api";

export async function AppHomepage() {
  const element = document.createElement("main");

  try {
    const products = await loadData();

    const appHome = AppHome({ products });

    element.append(...[appHome]);
  } catch (err) {
    element.innerHTML = `<h1>Some error</h1> <pre>${JSON.stringify(err)}</pre>`;
  } finally {
    return element;
  }
}
