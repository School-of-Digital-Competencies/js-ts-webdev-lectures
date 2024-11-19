import { AppCard } from "../../molecules";
import { TProduct } from "../../types";

export function AppProduct({ product }: { product: TProduct }) {
  const productNode = AppCard(product);

  const element = document.createElement("section");

  element.append(...[productNode]);

  return element;
}
