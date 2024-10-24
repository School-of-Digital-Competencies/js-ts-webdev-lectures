import "./AppButton.css";

export function AppButton(text: string) {
  const node = document.createElement("button");

  node.textContent = text;
  node.classList.add("button");
  node.setAttribute("data-i18n", "cta");

  return node;
}
