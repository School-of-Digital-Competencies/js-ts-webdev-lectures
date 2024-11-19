import { AppSubscribe, AppProducts } from "../../organisms";

export function AppHome({
  products,
}: {
  products: { title: string; price: number }[];
}) {
  const productsNode = AppProducts(products);
  const subscribe = AppSubscribe();

  const element = document.createElement("section");

  element.append(...[productsNode, subscribe]);

  return element;
}
