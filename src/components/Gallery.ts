import { Image, ImageProps } from "./Image";

export function Gallery(elements: ImageProps[]) {
  const gallery = document.createElement("div");

  gallery.classList.add("gallery");

  elements.forEach((element) => {
    const image = Image({ src: element.src, alt: element.alt });
    gallery.append(image);
  });

  return gallery;
}
