import { TProduct } from "../../types";

export type AppFeatureProductCardProps = {
  product: TProduct;
};

export function AppFeatureProductCard(props: AppFeatureProductCardProps) {
  const { product } = props;

  const element = document.createElement("li");

  element.setAttribute("class", "bulma-card");

  element.innerHTML = `
    <div class="card-content">
        <div class="media-content">
            <p class="title is-4">${product.title}</p>
            <p class="subtitle is-6">${product.price}</p>
            <p class="is-5>${product.type}</p>
        </div>
    </div>
  `;

  return element;
}
