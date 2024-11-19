export function AppButton(
  text = "Default button",
  options?: { color: "primary" | "danger" }
) {
  const button = document.createElement("button");

  button.innerText = text;
  button.classList.add("bulma-button");

  if (options) {
    // https://bulma.io/documentation/elements/button/#colors
    button.classList.add(`is-${options.color}`);
  }

  return button;
}
