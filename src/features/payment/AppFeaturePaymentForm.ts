// export type AppFeatureProductListProps = {
//   products: TProduct[];
//   //   orientation: "horizontal" | "vertical";
// };

function AppForm(id: string) {
  const element = document.createElement("form");

  element.setAttribute("id", id);
  element.setAttribute("class", "bulma-form");
  element.setAttribute("action", "");
  


  return element;
}

export function AppFeaturePaymentForm() {
  const element = document.createElement("form");

  element.setAttribute("class", "bulma-form");

  const productsNode = products.map((product) =>
    AppFeatureProductCard({ product })
  );

  element.append(...productsNode);

  return element;
}
