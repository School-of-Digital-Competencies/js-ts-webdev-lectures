import { loadProductById } from "../../backend/api";
import { AppProduct } from "../../templates";

export async function AppProductPage(params: {
  data: { productId: string | number };
}) {
  const {
    data: { productId },
  } = params;
  const element = document.createElement("main");

  try {
    const product = await loadProductById(productId);

    const appProductPage = AppProduct({ product });

    element.append(...[appProductPage]);
  } catch (err) {
    element.innerHTML = `<h1>Some error</h1> <pre>${JSON.stringify(err)}</pre>`;
  } finally {
    return element;
  }
}
