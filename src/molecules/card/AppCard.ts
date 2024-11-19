import { AppText } from "../../atoms";

export function AppCard(product: { title: string; price: number }) {
  const titleNode = AppText("h4", product.title);
  const priceNode = AppText("p", product.price);

  const element = document.createElement("article");

  element.append(...[titleNode, priceNode]);

  return element;
}
