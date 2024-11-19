import { AppText } from "../../atoms";
import router from "../../router";
import { TProduct } from "../../types";

export function AppCard(product: TProduct) {
  const titleNode = AppText("button", product.title, true);
  const priceNode = AppText("p", product.price);

  const element = document.createElement("article");

  titleNode.addEventListener("click", () => {
    if (router.getCurrentLocation().url === "") {
      router.navigate(`/products/${product.id}`);
    } else {
      router.navigate("/");
    }
  });

  element.append(...[titleNode, priceNode]);

  return element;
}
