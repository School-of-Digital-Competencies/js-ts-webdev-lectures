export function AppText(
  tag: "h2" | "h4" | "p" | "button",
  content: string | number,
  isLink: boolean = false
): HTMLElement {
  const el = document.createElement(tag);

  el.innerHTML = content;

  if (isLink) {
    el.setAttribute("class", "is-link");
  }

  return el;
}
