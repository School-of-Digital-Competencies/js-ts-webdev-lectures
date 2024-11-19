import "./AppSubscribe.css";
import { AppText } from "../../atoms";
import { AppInputButton } from "../../molecules";

export function AppSubscribe(label = "Subscribe") {
  const inputButton = AppInputButton(label, "right");
  const labelNode = AppText("h2", label);
  const descNode = AppText("p", "lorem ipsum ...");

  const element = document.createElement("div");

  element.classList.add("subscribe");

  element.append(...[labelNode, descNode, inputButton]);

  return element;
}
