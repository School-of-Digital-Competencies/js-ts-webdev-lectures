import products from "./data.json";

// export function loadData() {
//   return [...products];
// }

export function loadData(): Promise<{ title: string; price: number }[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...products]);
      // reject({
      //   code: 404,
      //   message: "Not found",
      // });
    }, 1000);
  });
}
