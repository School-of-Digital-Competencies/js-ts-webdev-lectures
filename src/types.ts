export type TProductType = "popular" | "new";

export type TProduct = {
  id: string | number;
  title: string;
  price: number;
  type: TProductType;
};
