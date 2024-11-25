import { TProduct, TProductType } from "../../../types";
import products from "./data.json";

function loadProducts(
  options: { type: TProductType } = { type: "new" }
): Promise<TProduct[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProduct = [...products].filter(
        (product) => product.type === options.type
      );

      resolve(filteredProduct);
    }, 1000);
  });
}

function loadProductById(id: number | string): Promise<TProduct> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(
        (product) => Number(product.id) === Number(id)
      );

      if (product) {
        resolve(product);
      } else {
        reject({
          code: 404,
          message: "Not found",
        });
      }
    }, 1000);
  });
}

async function loadPosts() {
  const repsonse = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await repsonse.json();

  return data;

  // return fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then((response) => {
  //     console.log(response);
  //     return response.json();
  //   })
  //   .then((data: TProduct[]) => {
  //     console.log(data);
  //     return data;
  //   });
}

export default {
  loadProducts,
  loadProductById,
  loadPosts,
};
