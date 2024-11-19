import { AppText } from "../../atoms";
import { AppProductsGrid } from "../../molecules";

export function AppProducts(
  products: { title: string; price: number }[]
): HTMLElement {
  const productsGrid = AppProductsGrid(products);
  const labelNode = AppText("h2", "Our latest products");
  const descNode = AppText("p", "lorem ipsum ...");

  const element = document.createElement("div");

  element.append(...[labelNode, descNode, productsGrid]);

  return element;
}
