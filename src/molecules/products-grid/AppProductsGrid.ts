import { AppCard } from "../../molecules";
import { TProduct } from "../../types";

export function AppProductsGrid(products: TProduct[]): HTMLElement {
  const element = document.createElement("div");

  // https://bulma.io/documentation/grid/smart-grid/
  element.setAttribute("class", "bulma-grid");

  const fragment = document.createDocumentFragment();
  const items = products.map((product) => {
    const cell = document.createElement("div");

    cell.setAttribute("class", "bulma-cell");

    const productCard = AppCard(product);

    cell.append(productCard);

    return cell;
  });
  items.forEach((card) => fragment.append(card));

  element.append(...[fragment]);

  return element;
}
