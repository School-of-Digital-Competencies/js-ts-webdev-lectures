import { AppButton } from "../../atoms";
import { AppInput } from "../../atoms";

export function AppInputButton(
  text = "Default button",
  dir: "right" | "left" = "right"
) {
  const button = AppButton(text);
  const input = AppInput();

  const element = document.createElement("div");

  // https://bulma.io/documentation/helpers/flexbox-helpers/
  element.setAttribute('class', 'is-flex');

  if (dir === "left") {
    element.append(...[button, input]);
  } else {
    element.append(...[input, button]);
  }

  return element;
}
