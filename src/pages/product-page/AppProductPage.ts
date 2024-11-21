import { AppHeader } from "../../widgets";

export async function AppProductPage() {
  const element = document.createElement("main");

  try {
    const header = AppHeader();

    element.append(...[header]);
  } catch (err) {
    element.innerHTML = `<h1>Some error</h1> <pre>${JSON.stringify(err)}</pre>`;
  } finally {
    return element;
  }
}
