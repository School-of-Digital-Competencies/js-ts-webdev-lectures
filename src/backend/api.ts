import { TProduct } from "../types";
import products from "./data.json";

export function loadProducts(): Promise<TProduct[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...products]);
    }, 1000);
  });
}

export function loadProductById(id: number | string): Promise<TProduct> {
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
