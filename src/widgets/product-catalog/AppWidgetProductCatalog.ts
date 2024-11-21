import { productApi } from "../../entities";
import { AppFeatureProductList } from "../../features";

export type AppWidgetProductCatalogProps = {
  title: string;
  type: "popular" | "new";
};

export async function AppWidgetProductCatalog(
  props: AppWidgetProductCatalogProps
) {
  const element = document.createElement("article");

  try {
    // load data from backend (code from folder entities)
    const products = await productApi.loadProducts({ type: props.type });

    // render feature connected with product catalog
    const productList = AppFeatureProductList({ products });

    const titleNode = document.createElement("h1");
    titleNode.setAttribute("class", "is-size-2");
    titleNode.innerText = props.title;

    element.append(...[titleNode, productList]);
  } catch (err) {
    element.setAttribute("class", "box");

    element.innerHTML = `
        <h1 class="is-size-1">Error</h1>

        <pre class="is-size-4">
            ${err}
        </pre>
    `;
    // element.innerHTML = `
    //     <h4 class="is-size-6">No products available at the moment</h4>
    // `;
    console.error(err);
  } finally {
    return element;
  }
}
