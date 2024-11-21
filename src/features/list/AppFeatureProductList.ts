import { TProduct } from "../../types";
import { AppFeatureProductCard } from "../card";
import "./AppFeatureProductList.css";

export type AppFeatureProductListProps = {
  products: TProduct[];
  //   orientation: "horizontal" | "vertical";
};

export function AppFeatureProductList(props: AppFeatureProductListProps) {
  const { products } = props;

  const element = document.createElement("ul");

  element.setAttribute("class", "app-feature-product-list bulma-grid");

  const productsNode = products.map((product) =>
    AppFeatureProductCard({ product })
  );

  element.append(...productsNode);

  return element;
}
