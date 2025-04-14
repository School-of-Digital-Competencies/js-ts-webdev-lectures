import { getImageUrl } from "../utils";

export type ImageProps = {
  src: string;
  alt: string;
};

export function Image({ src, alt }: ImageProps) {
  const img = document.createElement("img");
  img.src = getImageUrl(src);
  img.alt = alt;

  return img;
}
