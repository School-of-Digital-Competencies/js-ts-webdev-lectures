export function AppInput(type = "number", placeholder = "Enter something...") {
  const element = document.createElement("input");

  element.setAttribute("class", "bulma-input");
  element.setAttribute("type", type);
  element.setAttribute("placeholder", placeholder);

  return element;
}
